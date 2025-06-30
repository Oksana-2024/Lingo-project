import { string, object, enum as variable } from "zod";

export const schemaBookForm = object({
  name: string().min(2).max(30),
  email: string().max(32).email(),
  phone: string()
    .trim()
    .regex(/^\+\d{10,15}$/, {
      message: "Enter a valid international phone number",
    }),
  reason: variable(["career", "kids", "abroad", "exams", "culture"]),
});
