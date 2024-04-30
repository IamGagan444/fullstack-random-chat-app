import {z} from "zod"


export const userNameValidation=z.string().min(2,"user name should be more than 2 charectors").max(20,"user name should be lessthan 20").regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm,"username like instagram")

export const signupSchema=z.object({
    userName:userNameValidation,
    email:z.string().email({message:"invalid email"}),
    password:z.string().min(6,"minimum 6 charectors").max(8,"maximum 8 charectors").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,"enter strong password")
})
