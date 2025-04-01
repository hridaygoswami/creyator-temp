import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="bg-green-100 rounded-full p-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Thank you for your subscription. Your payment has been processed successfully.
      </p>
      <Link href="/">
        <Button className="bg-[#cdd2b7] text-black hover:bg-[#bfc3a8]">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
