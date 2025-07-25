"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const avatarList = Array.from({ length: 9 }, (_, i) => `Av0${i + 1}.jpg`);

export default function SelectAvatarPage() {
  const router = useRouter();

  const handleSelect = async (avatar: string) => {
    try {
      const userId = (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user
        ?.id;

      if (!userId) return;

      const res = await fetch(
        "https://newbi-django-render-app.onrender.com/api/telusers/avatar/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ telegram_id: userId, avatar }),
        }
      );

      const result = await res.json();
      console.log("Avatar updated:", result);

      router.push("/");
    } catch (err) {
      console.error("Failed to update avatar:", err);
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
