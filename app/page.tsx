'use client';

import { useEffect, useState } from "react";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photo?: { small_file_id: string; big_file_id: string }; // Add this field if Telegram provides it
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hydrated, setHydrated] = useState(false); // Ensures we wait for client-side hydration

  useEffect(() => {
    setHydrated(true); // Mark the component as hydrated

    import("@twa-dev/sdk").then(({ default: WebApp }) => {
      if (WebApp.initDataUnsafe.user) {
        const user = WebApp.initDataUnsafe.user as UserData;
        console.log("User Data:", user); // Log the full user data for debugging
        setUserData(user);

        // Fix viewport height styles if necessary
        document.body.style.setProperty(
          "--tg-viewport-height",
          `${window.innerHeight}px`
        );
        document.body.style.setProperty(
          "--tg-viewport-stable-height",
          `${window.innerHeight}px`
        );
      }
    }).catch((error) => {
      console.error("Failed to initialize Telegram SDK:", error);
    });
  }, []);

  if (!hydrated) {
    // Avoid rendering anything until the component is hydrated
    return null;
  }

  return (
    <main className="p-4">
      {userData ? (
        <UserInfo userData={userData} />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}

const UserInfo = ({ userData }: { userData: UserData }) => (
  <>
    <div className="flex justify-center mb-4">
      <img
        src={userData.photo ? `https://api.telegram.org/file/bot<7613683117:AAE3HPxnX0XjLzuJSAyDX0FFZlg7bVHakoA>/${userData.photo.big_file_id}` : "/default-profile.png"}
        alt={`${userData.first_name}'s profile`}
        className="rounded-full w-32 h-32 object-cover"
      />
    </div>
    <h1 className="text-2xl font-bold mb-4">User Data</h1>
    <ul>
      <li>ID: {userData.id}</li>
      <li>First Name: {userData.first_name}</li>
      <li>Last Name: {userData.last_name || "N/A"}</li>
      <li>Username: {userData.username || "N/A"}</li>
      <li>Language Code: {userData.language_code}</li>
      <li>Is Premium: {userData.is_premium ? "Yes" : "No"}</li>
    </ul>
  </>
);
