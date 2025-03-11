import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
// import Image from "next/image";
export function DotPatternLinearGradient() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <div className="flex items-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Creyator%20Logo%20(1)-j294jkKch6xJ2FK01DhvQ3lC4CDAUG.png" // Or your logo path
          alt="Creyator Logo"
          width={120} // Increased width
          height={120} // Increased height
          className="mr-6" // Increased margin
        />
        <p className="z-10 whitespace-pre-wrap text-center text-6xl font-medium tracking-tighter text-black dark:text-white">
          {/* Increased text size */}
          Creyator
        </p>
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}