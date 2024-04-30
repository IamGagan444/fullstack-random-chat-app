import { Message } from "@/model/User";
export interface ApiResponse{
    message:string;
    success:boolean
    isAcceptingMessages?:boolean
    messages?:Array<Message>
}