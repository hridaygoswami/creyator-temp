"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import crypto from "crypto";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;


export async function verifyPayment(paymentId: string, paymentLinkId: string, signature: string) {
    try {
      const generatedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET!)
        .update(`${paymentLinkId}|${paymentId}`)
        .digest("hex");
      
      const isValid = generatedSignature === signature;
      
      if (isValid) {
        (await
              // Update the payment status in your database
              cookies()).delete("paymentLinkId");
        // Revalidate the page
        revalidatePath("/");
        return { success: true };
      } else {
        return { success: false, error: "Invalid signature" };
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      return { success: false, error: "Failed to verify payment" };
    }
  }