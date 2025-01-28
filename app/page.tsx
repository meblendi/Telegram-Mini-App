"use client";

import { useEffect, useState } from "react";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  profile_picture?: string; // Added profile picture URL
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hydrated, setHydrated] = useState(false); // Ensures we wait for client-side hydration

  useEffect(() => {
    setHydrated(true); // Mark the component as hydrated

    import("@twa-dev/sdk")
      .then(({ default: WebApp }) => {
        if (WebApp.initDataUnsafe.user) {
          const user = WebApp.initDataUnsafe.user as UserData;
          console.log("User Data:", user); // Inspect all available properties
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
      })
      .catch((error) => {
        console.error("Failed to initialize Telegram SDK:", error);
      });
  }, []);

  return (
    <main className="bg-sky-300 p-4">
      {userData ? (
        <>
          {/* Display profile picture at the top center */}
          {userData.profile_picture ? (
            <div className="flex justify-center mb-4">
              <img
                src={userData.profile_picture || "/default-profile.png"} // Use a default image if no profile picture
                alt={`${userData.first_name}'s profile`}
                className="rounded-full w-32 h-32 object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-4">
              <img
                src="/default-profile.png" // You can replace this with your fallback image
                alt="Default Profile"
                className="rounded-full w-32 h-32 object-cover"
              />
            </div>
          )}

          <UserInfo userData={userData} />
        </>
      ) : (
        <div>The App Is Loading...</div>
      )}
    </main>
  );
}

const UserInfo = ({ userData }: { userData: UserData }) => (
  <>
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
