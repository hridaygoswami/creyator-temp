import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/actions/payment";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("razorpay_payment_id");
    const paymentLinkId = searchParams.get("razorpay_payment_link_id");
    const signature = searchParams.get("razorpay_signature");
    
    if (!paymentId || !paymentLinkId || !signature) {
      return NextResponse.json(
        { success: false, message: "Missing required parameters" },
        { status: 400 }
      );
    }
    const result = await verifyPayment(paymentId, paymentLinkId, signature);
    if (result.success) {
      return NextResponse.redirect(new URL("/payment/success", request.url));
    } else {
      return NextResponse.redirect(new URL("/payment/failed", request.url));
    }
  } catch (error) {
    console.error("Error in payment verification:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}