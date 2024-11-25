import dbConnect from "@/lib/dbConnect";
import { getSession } from "next-auth/react";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/model/user.model";

export async function DELETE(
    req: Request,
    { params } : { params: {messageid: string} }
) {
    const messageid = params.messageid;
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json(
          { success: false, message: 'Not authenticated' },
          { status: 401 }
        );
    }

    const user = session.user;

    try {
        const updatedResult = await UserModel.updateOne(
            { _id: user._id},
            { $pull: { messages: { _id: messageid}}}
        );

        if (updatedResult.modifiedCount === 0) {
            return Response.json({
                success: false,
                message: 'Message not found or already deleted'
            }, { status: 404});
        }

        return Response.json({
            success: true,
            message: 'Message deleted'
        }, { status: 200});
    } catch (error) {
        console.error('Error deleting message', error);
        return Response.json(
            { success: false, message: 'Error deleting message' },
            { status: 500 }
        );
    }
}