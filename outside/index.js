export { wrap } from "comlink";

const useNodeWorkarounds = typeof globalThis.Worker === "undefined";

export async function workerFileConstructor() {
  if (useNodeWorkarounds) {
    return (await import("./node")).NodeWorkerWrapper;
  } else {
    console.log("globalThis.Worker", globalThis.Worker);
    return globalThis.Worker;
  }
}

export async function workerStringConstructor(stringSource: string, { type: "classic" | "module" }): void {
  // TODO: trampoline??
  // let terminate: () => void;
  let worker: Worker;
  if (useNodeWorkarounds) {
    const nodeWorkerStringWrapper = (await import("./node")).NodeWorkerWrapper;
    // terminate = rawWorker.terminate.bind(rawWorker);
    // @ts-ignore
    const adapter = (await import("comlink/dist/esm/node-adapter.mjs")).default;
    worker = adapter(rawWorker);
  } else {
    const blob = new Blob([workerSource], { type: "application/javascript" });
    const workerURL = URL.createObjectURL(blob);
    worker = new globalThis.Worker(workerURL, {
      type
    });
    // terminate = worker.terminate.bind(worker);
  }
  return { wrappedWorker: wrap(worker) as WorkerInsideAPI, terminate };
}
