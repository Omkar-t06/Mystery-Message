import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verificationCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            to: email,
            from: "tavvaomkar2@gmail.com",
            subject: "Mystery Message | Verification Code",
            react: VerificationEmail({username, otp: verificationCode}),
        });
        return {
            success: true,
            message: "Verification email sent successfully",
        }
    } catch (error) {
        console.error("Error sending verification email: ", error);
        return {
            success: false,
            message: "Error sending verification email",
        }        
    }
}