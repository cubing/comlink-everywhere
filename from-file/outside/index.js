export { wrap } from "comlink";

const useNodeWorkarounds = typeof globalThis.Worker === "undefined";

export async function workerConstructor() {
  if (useNodeWorkarounds) {
    return (await import("./node")).NodeWorkerWrapper;
  } else {
    console.log("globalThis.Worker", globalThis.Worker);
    return globalThis.Worker;
  }
}
