"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
    { tier: 1, price: 5, features: ["Basic content access"] },
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
  const handleSelectTier = (tier: Tier) => {
    if (onSelectTier) {
      onSelectTier(tier)
    } else {
      // Default behavior - open payment link
      window.open("https://razorpay.me/@hridaypushpgirigoswami", "_blank")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#cdd2b7] text-black hover:bg-[#bfc3a8]">{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between gap-4 py-4">
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
                <Button onClick={() => handleSelectTier(tier)} className="bg-[#cdd2b7] text-black hover:bg-[#bfc3a8]">
                  Select
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

