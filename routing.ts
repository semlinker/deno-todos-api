import { Router } from "https://deno.land/x/oak/mod.ts";

import getTodos from "./handlers/getTodos.ts";
import getTodoDetail from "./handlers/getTodoDetail.ts";
import createTodo from "./handlers/createTodo.ts";
import updateTodo from "./handlers/updateTodo.ts";
import deleteTodo from "./handlers/deleteTodo.ts";

const router = new Router();

router
  .get("/todos", getTodos)
  .get("/todos/:id", getTodoDetail)
  .post("/todos", createTodo)
  .put("/todos/:id", updateTodo)
  .delete("/todos/:id", deleteTodo);

export default router;
