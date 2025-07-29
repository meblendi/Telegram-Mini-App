"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUser } from "../../fetcher";

interface TelegramUserCore {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
}

interface FullUser extends TelegramUserCore {
  avatar: string;
  points?: number;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<FullUser | null>(null);
  const [avatar, setAvatar] = useState("/images/Av01.jpg");

  useEffect(() => {
    const init = async () => {
      const { default: WebApp } = await import("@twa-dev/sdk");
      const tgUser = WebApp.initDataUnsafe.user;
      if (tgUser) {
        const fullUser = await getUser(tgUser.id);
        setUserData(fullUser);
        setAvatar(`/images/${fullUser.avatar}`);
      }
    };
    init();
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div className="relative rounded-b-3xl px-6 pt-10 pb-6 text-center bg-[url('/images/back01.jpg')] bg-cover bg-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#ffffff00] to-[#ffffff08] rounded-b-3xl z-0" />
        <div className="z-10 relative">
          <Link href="/pages/select-avatar">
            <Image
              src={avatar}
              alt="User Avatar"
              width={100}
              height={100}
              className="rounded-full mx-auto border-4 border-white"
            />
          </Link>
          <h1 className="text-xl font-bold mt-2">
            {userData?.first_name} {userData?.last_name}
          </h1>
          <p className="text-sm text-gray-700">
            @{userData?.username || "Username"}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-4 bg-white px-4 py-2 rounded-full inline-flex items-center gap-2 shadow-md">
          <div className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
            🪙 {userData?.points ?? 0}
          </div>
          <div className="text-sm font-medium text-blue-500">
            How to earn coins?
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 px-6">
        <StatCard label="Level" value="14" icon="🏆" color="green" />
        <StatCard label="Time" value="1h 23m" icon="⏱️" color="blue" />
        <StatCard label="Skills" value="1.500" icon="🗡️" color="pink" />
        <StatCard label="Apps" value="28" icon="📱" color="yellow" />
      </div>

      {/* Recommended Apps */}
      <h2 className="text-xl font-bold px-6 mt-8">Recommended Apps</h2>
      <div className="flex gap-2 px-6 mt-4 overflow-x-auto">
        {["Survival", "Action", "Collector"].map((type) => (
          <span
            key={type}
            className="bg-white border px-4 py-1 rounded-full text-sm font-medium shadow-sm"
          >
            {type}
          </span>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-inner flex justify-around py-3 rounded-t-2xl">
        {[
          { label: "Home", icon: "🏠", href: "../" },
          { label: "Upgrade", icon: "🌟", href: "../store" },
          { label: "Settings", icon: "⚙️", href: "../settings" },
        ].map(({ icon, label, href }) => (
          <a
            href={href}
            key={label}
            className="flex flex-col items-center text-sm"
          >
            <div className="text-xl">{icon}</div>
            <div>{label}</div>
          </a>
        ))}
      </nav>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon, // Now used
  color,
}: {
  label: string;
  value: string;
  icon: string;
  color: "green" | "blue" | "pink" | "yellow";
}) {
  const colors: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    pink: "bg-pink-100 text-pink-700",
    yellow: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className={`rounded-xl p-4 text-center shadow-sm ${colors[color]}`}>
      <div className="flex items-center justify-center gap-2">
        <span>{icon}</span>
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
}
