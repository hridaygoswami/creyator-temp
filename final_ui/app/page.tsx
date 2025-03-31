"use client";

import SubscriptionTierSelector from "@/app/subscription-tier-selector"

export default function Home() {
  const tiers = [
    { tier: 1, price: 1, features: ["Basic content access"] },
    { tier: 2, price: 10, features: ["Premium content access", "Ad-free experience"] },
    {
      tier: 3,
      price: 15,
      features: ["Exclusive content", "Early access to new posts", "Direct messaging with creator"],
    },
  ]


  return (

  
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Subscription Tier Selector</h1>
      <SubscriptionTierSelector
        tiers={tiers}
        buttonText="Subscribe Now"
        dialogTitle="Choose Your Subscription Plan"
        />
    </div>

  )
}

