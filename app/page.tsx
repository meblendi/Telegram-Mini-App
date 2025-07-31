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
  points?: number;
  streak?: number;
  time_spent?: number;
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

          const fullUser = await getUser(user.id);
          const updatedUser = await createOrUpdateUser({ user });

          setUserData({
            ...user,
            points: updatedUser.points ?? fullUser.points ?? 0,
            streak: updatedUser.streak ?? fullUser.streak ?? 0,
            time_spent: updatedUser.time_spent ?? fullUser.time_spent ?? 0,
          });

          setCurrentAvatar(`/images/${fullUser.avatar}`);
        }
      } catch (error) {
        console.error("Initialization error:", error);
        // Set default points if API fails
        setUserData((prev) => (prev ? { ...prev, points: 0 } : null));
      }
    };

    init();
  }, []);

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen px-4 pb-24 pt-6 font-sans">
      {/* Header */}
      <div
        className="rounded-3xl p-4"
        style={{
          background: "linear-gradient(45deg, #EEE8F2 0%, #DDEFF9 100%)",
        }}
      >
        {/* Custom Header */}
        <div className="mainInfo">
          <div className="circle"></div>
          <div className="circle2">
            <Link href="/pages/profile">
              <Image
                src={currentAvatar}
                alt="Avatar"
                width={100}
                height={100}
                className="circle-img"
              />
            </Link>
          </div>
          <p className="maintext">
            {userData?.first_name} {userData?.last_name ?? ""} <br />
            🪙 {userData?.points ?? 0}
          </p>
          <a href="/pages/referral" className="bot1">
            <p>Earn More</p>
          </a>
        </div>

        <div className="secondaryInfo">
          <div className="second-text">
            <p>@{userData?.username || "Username"}</p>
          </div>
        </div>

        {/* Statistics */}
        <h2 className="text-center text-xl font-bold mt-6 mb-2">Statistics</h2>
        <div className="grid grid-cols-2 gap-4 mt-7">
          <div className="bg-white p-1 rounded-xl text-center shadow-md overflow-visible">
            <div className="bg-[url('/images/back02.jpg')] bg-cover bg-center rounded-xl text-sm text-blue-700 font-semibold pb-1 mb-1 overflow-visible relative">
              <div className="flex justify-center absolute -top-12 left-1/2 transform -translate-x-1/2 w-full">
                <Image
                  src="/images/3d01.png"
                  alt="Streak"
                  width={100}
                  height={100}
                  className=""
                />
              </div>
              <br />
              <br />
              <br />
              Day
            </div>
            <div className="text-3xl font-bold text-blue-700">
              {userData?.streak ?? 0}
            </div>
          </div>
          <div className="bg-white p-1 rounded-xl text-center shadow-md overflow-visible">
            <div className="bg-[url('/images/back03.jpg')] bg-cover bg-center rounded-xl text-sm text-green-700 font-semibold pb-1 mb-1 overflow-visible relative">
              <div className="flex justify-center absolute -top-12 left-1/2 transform -translate-x-1/2 w-full">
                <Image
                  src="/images/3d02.png"
                  alt="Time"
                  width={100}
                  height={100}
                  className=""
                />
              </div>
              <br />
              <br />
              <br />
              Time
            </div>
            <div className="text-3xl font-bold text-green-700">
              {formatTime(userData?.time_spent ?? 0)}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Apps */}
      <h2 className="text-center text-xl font-bold mt-8 mb-4">
        Recommended Apps
      </h2>
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

      <div className="grid grid-rows-2 gap-4 items-center ">
        <div className="bg-white rounded-xl p-4 shadow-md flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <Image
              src="/images/app01.png"
              alt="App Icon"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <div className="text-md font-bold">Manager</div>
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
              src="/images/app02.png"
              alt="App Icon"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1">
            <div className="text-md font-bold">Finance</div>
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
