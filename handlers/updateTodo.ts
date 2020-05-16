import { Request, Response } from "https://deno.land/x/oak/mod.ts";
import { updateTodo } from "../services/todos.ts";

export default async ({
  params,
  request,
  response,
}: {
  params: any;
  request: Request;
  response: Response;
}) => {
  const todoId = params.id;

  if (!todoId) {
    response.status = 400;
    response.body = { msg: "Invalid todo id" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid todo data" };
    return;
  }

  const {
    value: { title, completed, userId },
  } = await request.body();

  await updateTodo(todoId, { userId, title, completed });

  response.body = { msg: "Todo updated" };
};
