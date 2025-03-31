"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from "next/image"
// Fix the import path here - make sure this matches where you put the server action file
import { createPaymentOrder } from "@/actions/payment"

interface Tier {
  tier: number
  price: number
  features: string[]
}

interface SubscriptionTierSelectorProps {
  tiers: Tier[]
  onSelectTier?: (tier: Tier) => void
  buttonText?: string
  dialogTitle?: string
}

export default function SubscriptionTierSelector({
  tiers = [
    { tier: 1, price: 1, features: ["Basic content access"] },
    { tier: 2, price: 10, features: ["Premium content access", "Ad-free experience"] },
    {
      tier: 3,
      price: 15,
      features: ["Exclusive content", "Early access to new posts", "Direct messaging with creator"],
    },
  ],
  onSelectTier,
  buttonText = "Subscribe",
  dialogTitle = "Choose a Subscription Tier",
}: SubscriptionTierSelectorProps) {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null)
  const [paymentQR, setPaymentQR] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSelectTier = async (tier: Tier) => {
    setSelectedTier(tier)
    
    if (onSelectTier) {
      onSelectTier(tier)
      return
    }
    
    try {
      console.log('Handling tier selection:', tier);
      setIsLoading(true)
      setError(null)
      
      // Log before calling server action
      console.log('About to call createPaymentOrder with:', {
        amount: tier.price,
        currency: "INR",
        tierNumber: tier.tier
      });
      
      const result = await createPaymentOrder({
        amount: tier.price,
        currency: "INR",
        tierNumber: tier.tier
      })
      
      // Log result from server action
      console.log('Server action result:', result);
      
      if (result.success) {
        // Generate QR code URL using a QR code API
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(result.paymentLink)}`
        setPaymentQR(qrCodeUrl)
      } else {
        setError(result.error || "Failed to create payment")
      }
    } catch (err) {
      console.error('Error in handleSelectTier:', err);
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const resetPayment = () => {
    setPaymentQR(null)
    setSelectedTier(null)
    setError(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#13140c] text-white hover:bg-[#2a2c19]">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle>{paymentQR ? "Scan to Pay" : dialogTitle}</DialogTitle>
        </DialogHeader>
        
        {paymentQR ? (
          <div className="flex flex-col items-center justify-center py-6">
            <p className="text-center mb-4">
              Scan this QR code to pay ₹{selectedTier?.price} for Tier {selectedTier?.tier}
            </p>
            <div className="border p-4 rounded-md bg-white">
              <Image
                src={paymentQR}
                alt="Payment QR Code"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              This QR code is valid for a limited time. Do not close this window until payment is complete.
            </p>
            <Button 
              onClick={resetPayment} 
              variant="outline" 
              className="mt-4"
            >
              Cancel Payment
            </Button>
          </div>
        ) : (
          <div className="flex justify-between gap-4 py-4">
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4 w-full">
                {error}
              </div>
            )}
            
            {isLoading ? (
              <div className="flex items-center justify-center w-full py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                {tiers.map((tier) => (
                  <Card key={tier.tier} className="cursor-pointer hover:bg-gray-100 flex-1">
                    <CardContent className="flex flex-col p-4">
                      <h3 className="font-semibold">Tier {tier.tier}</h3>
                      <p className="text-sm text-gray-500">₹{tier.price}/month</p>
                      <ul className="text-xs text-gray-400 list-disc list-inside mt-2 mb-4 flex-grow">
                        {tier.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => handleSelectTier(tier)} 
                        className="bg-[#cdd2b7] text-black hover:bg-[#bfc3a8]"
                      >
                        Select
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}