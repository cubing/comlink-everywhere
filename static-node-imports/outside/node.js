import { Worker as NodeWorker } from "worker_threads";
import { default as nodeEndpoint } from "comlink/dist/esm/node-adapter.mjs";

function construct(url, nodeOptions) {
  const worker = new NodeWorker(url, nodeOptions);
  // Avoid holding up the entire program exit if only workers are running.
  // https://nodejs.org/api/worker_threads.html#worker_threads_broadcastchannel_unref
  worker.unref();
  const wrappedWorker = nodeEndpoint(worker);
  return wrappedWorker;
}

let cachedNodeWorkerWrapper = null;
export async function NodeWorkerWrapper() {
  return (
    cachedNodeWorkerWrapper ||
    (cachedNodeWorkerWrapper = class {
      constructor(url, _options) {
        return construct(url);
      }
    })
  );
}

let cachedNodeWorkerStringWrapper = null;
export async function NodeWorkerStringWrapper() {
  return (
    cachedNodeWorkerStringWrapper ||
    (cachedNodeWorkerStringWrapper = class {
      constructor(url, _options) {
        return construct(url, { eval: true });
      }
    })
  );
}
