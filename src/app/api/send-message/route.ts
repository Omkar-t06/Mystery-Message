import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { Message } from "@/model/user.model";

export async function POST(req: Request) {
    await dbConnect();

    const { username, content }: {username: string, content: string} = await req.json();
    
    try {
        const user = await UserModel.findOne({username});
        if(!user) {
            return Response.json({
                success: false,
                body: { error: "User not found" }
            },{status: 404});
        }

        if(!user.isAcceptingMessages) {
            return Response.json({
                success: false,
                message: "User is not accepting messages"
            },{status: 403});
        }

        const newMessage = {
            content,
            createdAt: new Date()
        }
        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json({
            success: true,
            message: "Message sent successfully",
            newMessage
        },{status: 200});
    } catch (error) {
        console.error("Error sending message", error);
        return Response.json({
            success: false,
            body: { error: "Error sending message" }
        },{status: 500});
    }
}