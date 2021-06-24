export { wrap } from "comlink";

const useNodeWorkarounds = typeof globalThis.Worker === "undefined";

export async function workerFileConstructor() {
  if (useNodeWorkarounds) {
    return (await import("./node.js")).NodeWorkerWrapper;
  } else {
    return globalThis.Worker;
  }
}

export async function constructWorkerFromString(stringSource, options) {
  // TODO: trampoline??
  // let terminate: () => void;
  let worker;
  if (useNodeWorkarounds) {
    const nodeWorkerStringWrapper = (await import("./node.js"))
      .NodeWorkerWrapper;
    // terminate = rawWorker.terminate.bind(rawWorker);
    // @ts-ignore
    const adapter = (await import("comlink/dist/esm/node-adapter.mjs")).default;
    worker = adapter(rawWorker);
  } else {
    const blob = new Blob([stringSource], { type: "application/javascript" });
    const workerURL = URL.createObjectURL(blob);
    worker = new globalThis.Worker(workerURL, {
      type: options ? options.type : undefined, // TODO: Is it safe to use `options?.type`?
    });
    // terminate = worker.terminate.bind(worker);
  }
  return worker;
}
