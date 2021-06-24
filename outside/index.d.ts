export { wrap } from "comlink";
export async function workerFileConstructor(): Promise<typeof Worker>;
export async function constructWorkerFromString(
  stringSource: string,
  options?: { type: "classic" | "module" }
): Promise<Worker>;
