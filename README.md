# `comlink-everywhere`

```js
// index.js
import { workerConstructor, wrap } from "comlink-everywhere/outside";

(async () => {
  const Worker = await workerFileConstructor();
  const api = wrap(
    new Worker(new URL("./worker.js", import.meta.url), { type: "module" })
  );
  console.log(await api.add(3, 4));
})();
```

```js
// worker.js
import { expose } from "comlink-everywhere/inside";

const insideAPI = {
  add: (x, y) => x + y,
};
expose(insideAPI);
```

## Construct from string

```js
import { constructWorkerFromString } from "comlink-everywhere/outside";

(async () => {
  const worker = await constructWorkerFromString(
    // Note this example only works in browsers.
    `self.postMessage("from worker");`
  );
  worker.addEventListener("message", (message) => console.log(message.data));
})();
```

## Tradeoffs

- If you're running `node` , the `type` option will be ignored and the worker will be instantiated as a classic/module worker matching the calling code. See <https://github.com/nodejs/node/issues/30682>
- This library is written as ESM. It is only meant to be used with ESM, except specifically for workers instantiated from strings (as a workaround for Firefox and Safari's lack of module worker support).
- TODO: document more tradeoffs.
