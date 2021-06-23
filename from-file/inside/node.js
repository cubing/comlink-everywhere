export const { parentPort } = import("worker_threads"));
import { default as nodeEndpoint} from "comlink/dist/esm/node-adapter.mjs";

export const port = nodeEndpoint(parentPort);
