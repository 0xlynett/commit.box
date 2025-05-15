"use client";
import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="p-8 rounded-xl">
        <ConnectKitButton />
        <h1 className="font-semibold text-4xl mt-6 mb-4">
          You can just (force yourself to) do things.
        </h1>
        <ol className="text-xl mb-6 list-inside list-decimal">
          <li>Deposit ETH, USDC or any other supported token.</li>
          <li>Choose a good trustworthy friend.</li>
          <li>Set a deadline and resolution deadline.</li>
          <li>Get back your money or lose it.</li>
        </ol>
        <Button asChild>
          <Link href="/create">Create a commitment</Link>
        </Button>
      </div>
    </div>
  );
}
