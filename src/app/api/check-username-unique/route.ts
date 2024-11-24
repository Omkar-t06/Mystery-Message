import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
});

export async function GET(req: Request) {
    await dbConnect();

    try {
        const {searchParams} = new URL(req.url);
        const queryParam = {
            username: searchParams.get("username")
        }

        const result = UsernameQuerySchema.safeParse(queryParam);

        // console.log(result);
        if(!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];

            return Response.json({
                success: false,
                message: usernameErrors?.length > 0? usernameErrors.join(", ") : "Invalid username"
            },{status: 400});
        }
        
        const {username} = result.data;

        const existingVerifiedUser = await UserModel.findOne({username, isVerified: true});

        if(existingVerifiedUser) {
            return Response.json({
                success: false,
                message: "Username already exists"
            },{status: 400});
        }

        return Response.json({
            success: true,
            message: "Username is unique"
        },{status: 200});
    } catch (error) {
        console.log("Error in checking username", error);
        return Response.json(
            {
                success: false,
                message: "Error in checking username"
            }, {status: 400}
        )
    }
}