import { fetchData, persistData } from "./db.ts";
import { Todo } from "../models/todo.ts";
import { createId } from "../services/util.ts";

type TodoData = Pick<Todo, "userId" | "title" | "completed">;

// 获取Todo列表
export const getTodos = async (): Promise<Todo[]> => {
  const todos = await fetchData();
  return todos.sort((a, b) => a.title.localeCompare(b.title));
};

// 获取Todo详情
export const getTodo = async (todoId: string): Promise<Todo | undefined> => {
  const todos = await fetchData();

  return todos.find(({ id }) => id === todoId);
};

// 新建Todo
export const createTodo = async (todoData: TodoData): Promise<string> => {
  const todos = await fetchData();

  const newTodo: Todo = {
    ...todoData,
    id: createId(),
  };

  await persistData([...todos, newTodo]);

  return newTodo.id;
};

// 更新Todo
export const updateTodo = async (
  todoId: string,
  todoData: TodoData
): Promise<void> => {
  const todo = await getTodo(todoId);

  if (!todo) {
    throw new Error("Todo not found");
  }

  const updatedTodo = {
    ...todo,
    ...todoData,
  };

  const todos = await fetchData();
  const filteredTodos = todos.filter((todo) => todo.id !== todoId);

  persistData([...filteredTodos, updatedTodo]);
};

// 删除Todo
export const deleteTodo = async (todoId: string): Promise<void> => {
  const todos = await getTodos();
  const filteredTodos = todos.filter((todo) => todo.id !== todoId);

  persistData(filteredTodos);
};
