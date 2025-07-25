"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createOrUpdateUser, getUser } from "./fetcher";

interface TelegramUserCore {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<TelegramUserCore | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState("/images/Av01.jpg");

  useEffect(() => {
    const init = async () => {
      try {
        const { default: WebApp } = await import("@twa-dev/sdk");

        if (WebApp.initDataUnsafe.user) {
          const user = WebApp.initDataUnsafe.user as TelegramUserCore;
          setUserData(user);

          // Create/update user - response not used here
          await createOrUpdateUser({ user });

          // Get complete user data including avatar
          const fullUser = await getUser(user.id);
          setCurrentAvatar(`/images/${fullUser.avatar}`);
        }
      } catch (error) {
        console.error("Initialization error:", error);
        // Fallback to default avatar if API fails
      }
    };

    init();
  }, []);

  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen px-4 pb-24 pt-6 font-sans">
      {/* Header */}
      <div
        className="rounded-3xl p-4"
        style={{
          background: "linear-gradient(45deg, #EEE8F2 0%, #DDEFF9 100%)",
        }}
      >
        <div className="bg-white rounded-3xl p-4 shadow-md flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden cursor-pointer">
            <Link href="/pages/select-avatar">
              <Image
                src={currentAvatar}
                width={64}
                height={64}
                alt="Avatar"
                className="object-cover w-full h-full"
                onError={() => setCurrentAvatar("/images/Av01.jpg")}
              />
            </Link>
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
            <div className="text-sm text-orange-400 font-semibold">
              💎 {1500}
            </div>
            <div className="text-xs text-blue-500 underline">How to earn?</div>
          </div>
        </div>

        {/* Statistics */}
        <h2 className="text-xl font-bold mt-6 mb-2">Statistics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-4 rounded-xl text-center shadow-md">
            <div className="text-3xl font-bold text-purple-700">2.600</div>
            <div className="text-sm text-purple-900 font-semibold">Streak</div>
          </div>
          <div className="bg-green-100 p-4 rounded-xl text-center shadow-md">
            <div className="text-3xl font-bold text-green-700">1h 23m</div>
            <div className="text-sm text-green-900 font-semibold">Time</div>
          </div>
        </div>
      </div>

      {/* Recommended Apps */}
      <h2 className="text-xl font-bold mt-8 mb-4">Recommended Apps</h2>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["Newest", "Top", "Favourite"].map((cat) => (
          <button
            key={cat}
            className="px-4 py-1 rounded-full border border-gray-300 bg-white text-sm font-semibold shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md grid grid-rows-2 gap-4 items-center ">
        <div className="bg-white rounded-xl p-4 shadow-md flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image
              src="/images/app01.jpg"
              alt="App Icon"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <div className="text-md font-bold">Personal assistant</div>
            <div className="text-xs text-gray-500">🔥🔥🔥 • 87% • 315.6K</div>
          </div>
          <Link href="/pages/personal_assistant">
            <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-xl">
              Let&apos;s Go
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-md flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image
              src="/images/app01.jpg"
              alt="App Icon"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <div className="text-md font-bold">Personal accountant</div>
            <div className="text-xs text-gray-500">👌👌👌 • 73% • 56.3K</div>
          </div>
          <Link href="/pages/Personal accountant">
            <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-xl">
              Unlock
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 rounded-t-3xl">
        {[
          { label: "Home", icon: "🏠", href: "/" },
          { label: "Upgrade", icon: "🌟", href: "/store" },
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
