import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

export async function POST(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if(!session || !session.user) {
        return Response.json({
            success: false,
            body: { error: "Unauthorized" }
        },{status: 401});
    }

    const user = session.user;
    const userId = user._id;
    const {acceptMessage} = await req.json();

    try {
        const upadateUser = await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessages: acceptMessage},
            {new: true}
        );

        if(!upadateUser) {
            return Response.json({
                success: false,
                body: { error: "User not found" }
            },{status: 404});
        }

        return Response.json({
            success: true,
            message: "User updated successfully",
            upadateUser 
        },{status: 200});
    } catch (error) {
        console.error("Error updating accepting message", error);
        return Response.json({
            success: false,
            body: { error: "Error updating accepting message" }
        },{status: 500});
    }
}

export async function GET(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if(!session || !session.user) {
        return Response.json({
            success: false,
            body: { error: "Unauthorized" }
        },{status: 401});
    }

    const user = session.user;
    const userId = user._id;

    try {
        const user = await UserModel.findById(userId);
        if(!user) {
            return Response.json({
                success: false,
                body: { error: "User not found" }
            },{status: 404});
        }

        return Response.json({
            success: true,
            isAcceptingMessages: user.isAcceptingMessages
        },{status: 200});
    } catch (error) {
        console.error("Error Getting Accepting Status", error);
        return Response.json({
            success: false,
            body: { error: "Error Getting Accepting Status" }
        },{status: 500});
    }
}