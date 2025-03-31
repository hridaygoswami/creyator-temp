import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="bg-red-100 rounded-full p-4 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-2">Payment Failed</h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        We couldn't process your payment. Please try again or contact support if the issue persists.
      </p>
      <div className="flex space-x-4">
        <Link href="/">
          <Button className="bg-[#cdd2b7] text-black hover:bg-[#bfc3a8]">
            Return to Home
          </Button>
        </Link>
        <Link href="/support">
          <Button variant="outline">
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
}