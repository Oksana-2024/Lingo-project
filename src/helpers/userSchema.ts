import { string, object} from "zod";

export const schemaRegisterForm = object({
  name: string().min(2).max(20),
  email: string().max(32).email(),
  password: string().min(8).max(32),
});

export const schemaLoginForm = object({
  email: string().max(32).email(),
  password: string().min(8).max(32),
});


