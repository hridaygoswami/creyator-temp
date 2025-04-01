"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import crypto from "crypto";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

interface PaymentDetails {
  amount: number;
  currency: string;
  tierNumber: number;
  orderId?: string;
}

export async function createPaymentOrder(details: PaymentDetails) {
  try {
    const referenceId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    const amountInPaise = details.amount * 100;
    const callbackUrl = "http://localhost:3000/api/payment/verify";
    console.log(`Using callback URL: ${callbackUrl}`);
    
    const requestBody = {
      amount: amountInPaise,
      currency: details.currency,
      accept_partial: false,
      description: `Subscription for Tier ${details.tierNumber}`,
      customer: {
        name: "Customer",
        contact: "",
        email: ""
      },
      notify: {
        sms: false,
        email: false
      },
      reminder_enable: false,
      notes: {
        tier: details.tierNumber.toString()
      },
      callback_url: callbackUrl,
      callback_method: "get"
    };

    const response = await fetch("https://api.razorpay.com/v1/payment_links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`
        ).toString("base64")}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Razorpay API error:', errorText);
      return {
        success: false,
        error: `API error: ${response.status} - ${errorText || response.statusText}`
      };
    }

    const paymentLink = await response.json();
    console.log('Payment link created:', paymentLink);
    
    if (paymentLink.error) {
      console.error('Payment link error:', paymentLink.error);
      throw new Error(paymentLink.error.description);
    }
    
    const cookieStore = cookies();
    (await cookieStore).set("paymentLinkId", paymentLink.id, {
      httpOnly: true,
      maxAge: 3600,
      path: "/",
    });
    
    return {
      success: true,
      paymentLink: paymentLink.short_url,
      paymentLinkId: paymentLink.id,
      qrCode: paymentLink.short_url
    };
  } catch (error) {
    console.error("Error creating payment order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create payment order"
    };
  }
}