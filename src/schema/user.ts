import { string, z } from "zod";

export type UserType = {
  id: string;
  email: string;
  name: string;
};

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export default schema;
