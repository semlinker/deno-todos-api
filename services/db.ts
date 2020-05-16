import { DB_PATH } from "../config.ts";
import { Todo } from "../models/todo.ts";

export const fetchData = async (): Promise<Todo[]> => {
  const data = await Deno.readFile(DB_PATH);

  const decoder = new TextDecoder();
  const decodedData = decoder.decode(data);

  return JSON.parse(decodedData);
};

export const persistData = async (data: Todo[]): Promise<void> => {
  const encoder = new TextEncoder();
  await Deno.writeFile(DB_PATH, encoder.encode(JSON.stringify(data)));
};
