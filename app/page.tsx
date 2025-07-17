"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    import("@twa-dev/sdk")
      .then(({ default: WebApp }) => {
        if (WebApp.initDataUnsafe.user) {
          setUserData(WebApp.initDataUnsafe.user as UserData);
          document.body.style.setProperty(
            "--tg-viewport-height",
            `${window.innerHeight}px`
          );
          document.body.style.setProperty(
            "--tg-viewport-stable-height",
            `${window.innerHeight}px`
          );
        }
      })
      .catch((error) => {
        console.error("Failed to initialize Telegram SDK:", error);
      });
  }, []);

  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen px-4 pb-24 pt-6 font-sans">
      {/* Header */}
      <div className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <Image src="/avatar.jpg" width={64} height={64} alt="Avatar" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-500">
            @{userData?.username || "Username"}
          </div>
          <div className="text-lg font-bold text-gray-800">
            {userData?.first_name}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-orange-400 font-semibold">🍜 {1500}</div>
          <div className="text-xs text-blue-500 underline">How to earn?</div>
        </div>
      </div>

      {/* Statistics */}
      <h2 className="text-xl font-bold mt-6 mb-2">Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-100 p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-purple-700">1.500</div>
          <div className="text-sm text-purple-900 font-semibold">Level</div>
        </div>
        <div className="bg-green-100 p-4 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-700">1h 23m</div>
          <div className="text-sm text-green-900 font-semibold">Time</div>
        </div>
      </div>

      {/* Recommended Games */}
      <h2 className="text-xl font-bold mt-8 mb-4">Recommended games</h2>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["Survival", "Action", "Collector"].map((cat) => (
          <button
            key={cat}
            className="px-4 py-1 rounded-full border border-gray-300 bg-white text-sm font-semibold shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md flex items-center gap-4">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <Image
            src="/images/02.jpg"
            alt="Game Icon"
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1">
          <div className="text-md font-bold">Personal assistant</div>
          <div className="text-xs text-gray-500">🔥🔥🔥 • 87% • 315.6K</div>
        </div>
        <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-xl">
          Let's Go
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 rounded-t-3xl">
        {[
          { label: "Home", icon: "🏠", href: "/" },
          { label: "Store", icon: "🛒", href: "/store" },
          { label: "Settings", icon: "⚙️", href: "/settings" },
        ].map(({ label, icon, href }) => (
          <Link href={href} key={label} className="text-center text-sm">
            <div className="text-xl">{icon}</div>
            <div>{label}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
