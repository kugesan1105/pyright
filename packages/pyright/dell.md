```
graph TD
    builtins_pyi["builtins.pyi"] --> _ast;
    builtins_pyi --> _sitebuiltins;
    builtins_pyi --> _typeshed;
    builtins_pyi --> sys;
    builtins_pyi --> types;
    builtins_pyi --> _collections_abc;
    builtins_pyi --> collections_abc["collections.abc"];
    builtins_pyi --> io;
    builtins_pyi --> os;
    builtins_pyi --> typing;
    builtins_pyi --> typing_extensions;
```