"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateUserAvatar } from "../../fetcher";

const avatarList = Array.from({ length: 9 }, (_, i) => `Av0${i + 1}.jpg`);

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initDataUnsafe?: {
          user?: {
            id: number;
          };
        };
      };
    };
  }
}

export default function SelectAvatarPage() {
  const router = useRouter();

  const handleSelect = async (avatar: string) => {
    try {
      const telegram_id = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      if (telegram_id) {
        await updateUserAvatar(telegram_id, avatar);

        // Update the avatar in localStorage or state management
        if (window && window.localStorage) {
          localStorage.setItem("currentAvatar", `/images/${avatar}`);
        }
      }
      router.push("/");
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Select Your Avatar
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {avatarList.map((filename) => (
          <button
            key={filename}
            onClick={() => handleSelect(filename)}
            className="rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition"
          >
            <Image
              src={`/images/${filename}`}
              alt={filename}
              width={100}
              height={100}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </main>
  );
}
