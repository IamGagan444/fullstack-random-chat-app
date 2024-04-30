import bcrypt from "bcryptjs"
import dbConnect from "@/lib/dbConnect"
import userModel from "@/model/User"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { userName, email, password } = await request.json()
        const exsitingUserVerifiedByUserName = await userModel.findOne({
            userName,
            isVerified: true
        })

        if (exsitingUserVerifiedByUserName) {

            return Response.json({
                success: false,
                message: "username is already in use"

            }, { status: 400 })

        }
        const exsitingUserByEmail = await userModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()


        if (exsitingUserByEmail) {

            if(exsitingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"user already exists with this email"
                },{status:400})
            }else{
                const hassedPassword=await bcrypt.hash(password,10)
                exsitingUserByEmail.password=hassedPassword;
                exsitingUserByEmail.verifyCode=verifyCode
                exsitingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000).toString()
                await exsitingUserByEmail.save();
            }


        } else {

            const hassedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date();

            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new userModel({
                userName,
                email,
                password: hassedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })
            await newUser.save()


        }


        //serd verification email

        const emailResponse = await sendVerificationEmail(
            email,
            verifyCode,
            userName
        )

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 })
        }
        return Response.json({
            success: true,
            message: "user regtistered succesfully, please verify your email"
        }, { status: 201 })

    } catch (error) {
        console.log("Error registering user", error)
        return Response.json({
            success: false,
            message: "Error registering user"
        }, {
            status: 500
        })

    }

}








