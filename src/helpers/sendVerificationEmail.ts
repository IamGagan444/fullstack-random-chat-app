import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(email:string,userName:string,verifyCode:string):Promise<ApiResponse> {

try {
    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verification email from random message',
        react: VerificationEmail({username:userName,otp:verifyCode,})
      });
      return {success:false, message:"failed to send verification email"}

} catch (errorEmail) {
    console.log("verification email error",errorEmail)
    return {success:false, message:"failed to send verification email"}
}
    
}
