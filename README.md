# `comlink-everywhere`

```js
// index.js
import { workerConstructor } from "comlink-everywhere/from-file/outside";

(() => {
  const Worker = await workerConstructor();
  const outsideAPI = warp(
    new Worker(new URL("./worker.js", { type: "module" }))
  );
})();
```

NOTE: If you're running `node` , the `type` option will be ignored and the worker will be instantiated as a classic/module worker matching the calling code. See <https://github.com/nodejs/node/issues/30682>

```js
// worker.js
import { expose } from "comlink-everywhere/from-file/inside";

const insideAPI = { ... };
expose(insideAPI);
```
