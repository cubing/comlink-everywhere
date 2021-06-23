# `comlink-everywhere

```js
// index.js
import { workerConstructor } from "comlink-everywhere/from-file/outside";

(() => {
  const Worker = await workerConstructor();
  const outsideAPI = warp(new Worker(new URL()));
})();
```

```js
// worker.js
import { expose } from "comlink-everywhere/from-file/inside";

const insideAPI = { ... };
expose(insideAPI);
```
