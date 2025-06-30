# Python Imports Visualization

This document visualizes the import relationships between Python modules as detected by Pyright.

## Pyright Import Resolution Process

```mermaid
sequenceDiagram
    participant User as User
    participant Pyright as Pyright
    participant ImportResolver as ImportResolver
    participant FileSystem as FileSystem
    
    User->>Pyright: Analyze Python files
    Pyright->>ImportResolver: Resolve imports
    loop For each import
        ImportResolver->>FileSystem: Check if module exists
        FileSystem-->>ImportResolver: Module status
        alt Module found
            ImportResolver->>Pyright: Load and parse module
            Note over Pyright,ImportResolver: Only parses files needed for type checking
            Pyright->>ImportResolver: Resolve dependencies
        else Module not found
            ImportResolver->>Pyright: Report unresolved import
        end
    end
    Pyright->>User: Report analysis results
```

## Selective Parsing: Only Files Needed for Type Checking

Pyright optimizes performance by only parsing files that are actually needed for type checking. This means that if a module is imported but not used in a way that requires type information, it may not be parsed.

### Example Scenario


## Case 1:

**main.py:**
```python
from a import A
```

**a.py:**
```python
from b import B

class A:
    pass
```

**b.py:**
```python
class B:
    pass
```

### B is not needed for type checking main.py
If `main.py` only uses class `A` and doesn't actually use `B` for type checking purposes, then:
- ✅ `main.py` gets parsed (entry point)
- ✅ `a.py` gets parsed (needed for `A`)
- ❌ `b.py` might NOT be parsed (not needed for type checking `main.py`)

## Case 2:

**main.py:**
```python
from a import A, B
```

**a.py:**
```python
from b import B

class A:
    pass
```

**b.py:**
```python
class B:
    pass
```

### B is needed for type checking main.py
If `main.py` uses both `A` and `B` in ways that require type information, then:
- ✅ `main.py` gets parsed (entry point)
- ✅ `a.py` gets parsed (needed for `A`)
- ✅ `b.py` gets parsed (needed for `B` type checking)

The diagrams below show examples of actual import relationships that Pyright detected during parsing - these represent files that were actually needed for type checking in your project.






## Case 1:


![alt text](image-1.png)


## Case 2:


![alt text](image-2.png)




## builtins.pyi Imports

```mermaid
graph TD
    builtins["builtins.pyi"]
    _ast["_ast"]
    _sitebuiltins["_sitebuiltins"]
    _typeshed["_typeshed"]
    sys["sys"]
    types["types"]
    _collections_abc["_collections_abc"]
    collections_abc["collections.abc"]
    io["io"]
    os["os"]
    typing["typing"]
    typing_extensions["typing_extensions"]
    
    builtins --> _ast
    builtins --> _sitebuiltins
    builtins --> _typeshed
    builtins --> sys
    builtins --> types
    builtins --> _collections_abc
    builtins --> collections_abc
    builtins --> io
    builtins --> os
    builtins --> typing
    builtins --> typing_extensions
```

## your_python_file.py Imports

```mermaid
graph TD
    your_python_file["your_python_file.py"]
    __builtins__["__builtins__"]
    builtins["builtins"]
    _typeshed_type_checker_internals["_typeshed._type_checker_internals"]
    concurrent_futures["concurrent.futures"]
    typing["typing"]
    types["types"]
    string_templatelib["string.templatelib"]

    your_python_file --> __builtins__
    your_python_file --> builtins
    your_python_file --> _typeshed_type_checker_internals
    your_python_file --> concurrent_futures
    your_python_file --> typing
    your_python_file --> types
    your_python_file --> string_templatelib
```

## _typeshed/_type_checker_internals.pyi Imports

```mermaid
graph TD
    _type_checker_internals["_typeshed/_type_checker_internals.pyi"]
    builtins["builtins"]
    sys["sys"]
    typing_extensions["typing_extensions"]
    _collections_abc["_collections_abc"]
    abc["abc"]
    collections_abc["collections.abc"]
    typing["typing"]

    _type_checker_internals --> builtins
    _type_checker_internals --> sys
    _type_checker_internals --> typing_extensions
    _type_checker_internals --> _collections_abc
    _type_checker_internals --> abc
    _type_checker_internals --> collections_abc
    _type_checker_internals --> typing
```

## types.pyi Imports

```mermaid
graph TD
    types["types.pyi"]
    builtins["builtins"]
    sys["sys"]
    _typeshed["_typeshed"]
    _typeshed_importlib["_typeshed.importlib"]
    collections_abc["collections.abc"]
    importlib_machinery["importlib.machinery"]
    typing["typing"]
    typing_extensions["typing_extensions"]

    types --> builtins
    types --> sys
    types --> _typeshed
    types --> _typeshed_importlib
    types --> collections_abc
    types --> importlib_machinery
    types --> typing
    types --> typing_extensions
```

## typing.pyi Imports

```mermaid
graph TD
    typing["typing.pyi"]
    builtins["builtins"]
    collections["collections"]
    sys["sys"]
    typing_extensions["typing_extensions"]
    _collections_abc["_collections_abc"]
    _typeshed["_typeshed"]
    abc["abc"]
    re["re"]
    types["types"]
    annotationlib["annotationlib"]
    contextlib["contextlib"]

    typing --> builtins
    typing --> collections
    typing --> sys
    typing --> typing_extensions
    typing --> _collections_abc
    typing --> _typeshed
    typing --> abc
    typing --> re
    typing --> types
    typing --> annotationlib
    typing --> contextlib
```

## _typeshed/__init__.pyi Imports

```mermaid
graph TD
    _typeshed["_typeshed/__init__.pyi"]
    builtins["builtins"]
    sys["sys"]
    collections_abc["collections.abc"]
    dataclasses["dataclasses"]
    os["os"]
    types["types"]
    typing["typing"]
    typing_extensions["typing_extensions"]
    enum["enum"]
    annotationlib["annotationlib"]

    _typeshed --> builtins
    _typeshed --> sys
    _typeshed --> collections_abc
    _typeshed --> dataclasses
    _typeshed --> os
    _typeshed --> types
    _typeshed --> typing
    _typeshed --> typing_extensions
    _typeshed --> enum
    _typeshed --> annotationlib
```

## concurrent/futures/__init__.pyi Imports

```mermaid
graph TD
    futures_init["concurrent/futures/__init__.pyi"]
    builtins["builtins"]
    sys["sys"]
    _base["_base"]
    process["process"]
    thread["thread"]
    interpreter["interpreter"]

    futures_init --> builtins
    futures_init --> sys
    futures_init --> _base
    futures_init --> process
    futures_init --> thread
    futures_init --> interpreter
```

## concurrent/futures/thread.pyi Imports

```mermaid
graph TD
    thread["concurrent/futures/thread.pyi"]
    builtins["builtins"]
    queue["queue"]
    sys["sys"]
    collections_abc["collections.abc"]
    threading["threading"]
    types["types"]
    typing["typing"]
    typing_extensions["typing_extensions"]
    weakref["weakref"]
    my_lib["my_lib"]
    _base["_base"]

    thread --> builtins
    thread --> queue
    thread --> sys
    thread --> collections_abc
    thread --> threading
    thread --> types
    thread --> typing
    thread --> typing_extensions
    thread --> weakref
    thread --> my_lib
    thread --> _base
```





## Import Resolution Flow

```mermaid
flowchart TD
    Start[Start Import Resolution] --> ParseFile[Parse Python File]
    ParseFile --> FindImports[Find Import Statements]
    FindImports --> ImportResolve[Resolve Import]
    ImportResolve --> CheckExists{Import Exists?}
    CheckExists -- Yes --> LoadModule[Load Module]
    CheckExists -- No --> ReportFailure[Report Failed Import]
    LoadModule --> ProcessDependencies[Process Module Dependencies]
    ProcessDependencies --> Complete[Complete]
    ReportFailure --> Complete
```
