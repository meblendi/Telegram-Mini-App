// app/select-avatar/page.tsx (or pages/select-avatar.tsx if using Pages Router)
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const avatarList = Array.from({ length: 9 }, (_, i) => `Av0${i + 1}.jpg`);

export default function SelectAvatarPage() {
  const router = useRouter();

  const handleSelect = (avatar: string) => {
    // TODO: Save to localStorage, backend, or context
    console.log("Selected avatar:", avatar);
    // Navigate back to homepage
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Select Your Avatar</h1>
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
