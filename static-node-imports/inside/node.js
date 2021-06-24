import { parentPort } from "worker_threads";
import { default as nodeEndpoint } from "comlink/dist/esm/node-adapter.mjs";

export async function port() {
  return nodeEndpoint(parentPort);
}
