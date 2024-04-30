import mongoose, { Schema, Document } from "mongoose";


export interface Message extends Document {
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    userName: string;
    email: string;
    password: string;

    verifyCode: string
    verifyCodeExpiry: string;
    isVerified: boolean
    isAcceptingMessage: boolean;
    messages: Message[]
}

const UserSchema: Schema<User> = new Schema({
    userName: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "please use a valid email address"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, "enter strong password"],

    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"],
    },
    verifyCodeExpiry: {
        type: String,
        required: [true, "verifyCodeExpiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false

    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
})


const userModel= (mongoose.models.user as mongoose.Model<User>) || ( mongoose.model<User>("User",UserSchema))

export default userModel;