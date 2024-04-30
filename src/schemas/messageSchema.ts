import { z } from "zod"

export const messageSchema = z.object({
    content: z.string().min(5, "content must be atleast 5 charectors").max(300, "content must be no longer than 300 charectors"),

})