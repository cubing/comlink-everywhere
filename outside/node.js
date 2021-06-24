export const { NodeWorker } = import("worker_threads");
import { default as nodeEndpoint } from "comlink/dist/esm/node-adapter.mjs";

class NodeWorkerWrapper {
  constructor(url, _options) {
    return nodeEndpoint(new NodeWorker(url));
  }
}

class NodeWorkerStringWrapper {
  constructor(url, _options) {
    return nodeEndpoint(new NodeWorker(url, eval: true}));
  }
}
