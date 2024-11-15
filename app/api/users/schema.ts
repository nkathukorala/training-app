import { z } from "zod";

const schema=z.object({
  username: z.string().min(1,"Username cannot be empty"),
  password: z.string().min(1,"Password cannot be empty"),
});
// export type FormData = z.infer<typeof schema>;
export default schema;