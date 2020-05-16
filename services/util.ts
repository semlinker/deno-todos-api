import { v4 as uuid } from "https://deno.land/std/uuid/mod.ts";

export const createId = () => uuid.generate();