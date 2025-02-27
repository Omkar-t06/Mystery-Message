import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function GET(req: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if(!session || !session.user) {
        return NextResponse.json({
            success: false,
            body: { error: "Unauthorized" }
        },{status: 401});
    }

    const user = session.user;
    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const userMessages = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: {path : "$messages", preserveNullAndEmptyArrays: true} },
            { $sort: {'messages.createdAt': -1} },
            { $group: {_id: "$_id", messages: { $push: "$messages" } } }
        ])

        // if(!userMessages || userMessages.length === 0) {
        //     return NextResponse.json({
        //         message: "User not found",
        //         success: false,
        //     },{status: 404});
        // }

        const messages = userMessages.length > 0 ? userMessages[0].messages.filter((msg: string) => msg !== null) : [];

        return NextResponse.json({
            success: true,
            messages: messages || []
        },{status: 200});
    } catch (error) {
        console.error("Error getting messages", error);
        return NextResponse.json({
            success: false,
            body: { error: "Error getting messages" }
        },{status: 500});
    }
}