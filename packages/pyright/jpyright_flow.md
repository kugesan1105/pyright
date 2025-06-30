# Pyright Type Checking Flow Documentation



## Source File Discovery

Pyright identifies the Python files to analyze. In this case, it finds one source file: `main.py`.

**Log Excerpt**:
```
Found 1 source file
```

### Buitins and Type Stubs

pyright/packages/pyright/dist/typeshed-fallback/stdlib/builtins.pyi



## Parsing

Parsing involves reading and interpreting the source file's content to build an Abstract Syntax Tree (AST). Pyright logs this process with debug statements from its codebase.

**Log Excerpt**:
```
[Copilot Debug] Program._parseFile: Parsing file:///home/kuggix/pyright/packages/pyright/main.py
[SourceFile.parse] --- Preparing to parse content for file: /home/kuggix/pyright/packages/pyright/main.py ---
```

## Import Resolution

When parsing encounters import statements, Pyright resolves them by searching configured paths for corresponding modules or type stubs (`.pyi` files). This is a recursive process:

- **Attempts Resolution**: It tries to locate imports like `__builtins__`, `builtins`, and user-defined modules (e.g., `a`).
- **Recursive Parsing**: If an import resolves to a file (e.g., `builtins.pyi`), Pyright parses that file too.

**Log Excerpt**:
```
[ImportResolver] Attempting to resolve import: 'builtins' from file: /home/kuggix/pyright/packages/pyright/main.py
[Copilot Debug] Program._parseFile: Parsing file:///home/kuggix/pyright/packages/pyright/dist/typeshed-fallback/stdlib/builtins.pyi
```

Failed resolutions, like `__builtins__`, are expected for special modules, while successful resolutions lead to further parsing.

## Binding

Binding links symbols (variables, functions, etc.) to their definitions or types, enabling Pyright to understand their context and scope.

**Log Excerpt**:
```
[SourceFile.bind] *** Starting binding for file: /home/kuggix/pyright/packages/pyright/dist/typeshed-fallback/stdlib/builtins.pyi ***
[SourceFile.bind] *** Starting binding for file: /home/kuggix/pyright/packages/pyright/main.py ***
```

## Type Checking

The final step is type checking, where Pyright verifies type consistency and reports issues like unused imports or type mismatches.

**Log Excerpt**:
```
[SourceFile.check] +++ Starting type check for file: /home/kuggix/pyright/packages/pyright/main.py +++
/home/kuggix/pyright/packages/pyright/main.py:2:15 - error: Import "A" is not accessed (reportUnusedImport)
```

Here, Pyright flags an unused import "A" in `main.py`.

## Example: Type Checking with Concurrent Library

Below is an example using the `concurrent.futures` library, demonstrating how Pyright handles type annotations in concurrent code.

### Sample Code
```python
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Callable

def square(n: int) -> int:
    """Compute the square of a number."""
    return n * n

def compute_squares(numbers: List[int], worker: Callable[[int], int]) -> List[int]:
    """Compute squares of numbers concurrently using a worker function."""
    results = []
    with ThreadPoolExecutor() as executor:
        futures = {executor.submit(worker, n): n for n in numbers}
        for future in as_completed(futures):
            results.append(future.result())
    return results

# Example usage
nums = [1, 2, 3, 4]
squares = compute_squares(nums, square)
print(squares)  # Expected: [1, 4, 9, 16]
```

### Pyright's Processing
1. **Parsing**: Pyright parses the file, identifying imports and function definitions.
2. **Import Resolution**: Resolves `concurrent.futures`, `typing`, and their submodules using type stubs from typeshed.
3. **Binding**: Links `square` to its definition and `compute_squares` parameters to their annotated types.
4. **Type Checking**:
   - Verifies `numbers` is a `List[int]`.
   - Ensures `worker` matches `Callable[[int], int]`.
   - Confirms `compute_squares` returns `List[int]`.
   - Checks `executor.submit` and `future.result()` usage aligns with type expectations.

If errors existed (e.g., passing a string to `square`), Pyright would report them. Here, the code is type-safe, so no errors are expected.

## Conclusion

Pyright's flow—configuration loading, file discovery, parsing, import resolution, binding, and type checking—ensures comprehensive static analysis of Python code. The recursive nature of import resolution and detailed type checking make it a powerful tool for developers, as demonstrated in the concurrent example.