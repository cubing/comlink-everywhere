export { wrap } from "comlink";

const useNodeWorkarounds = typeof globalThis.Worker === "undefined";

export async function workerConstructor() {
  if (useNodeWorkarounds) {
    return Worker;
  } else {
    return (await import("./node")).NodeWorker;
  }
}
