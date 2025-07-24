"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from next/link

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
  const [hydrated, setHydrated] = useState(false); // Ensures we wait for client-side hydration
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false); // State to toggle user info visibility

  useEffect(() => {
    setHydrated(true); // Mark the component as hydrated

    import("@twa-dev/sdk")
      .then(({ default: WebApp }) => {
        if (WebApp.initDataUnsafe.user) {
          setUserData(WebApp.initDataUnsafe.user as UserData);

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

  if (!hydrated) {
    // Avoid rendering anything until the component is hydrated
    return null;
  }

  const toggleUserInfo = () => {
    setIsUserInfoVisible(!isUserInfoVisible); // Toggle the visibility of user info
  };

  return (
    <main className="bg-sky-100 p-4">
      <button
        onClick={toggleUserInfo}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        {isUserInfoVisible ? "Hide User Info" : "Show User Info"}
      </button>

      {userData ? (
        isUserInfoVisible && <UserInfo userData={userData} />
      ) : (
        <div>App Is Loading...</div>
      )}

      {/* Button to navigate to PeriodApp */}
      <div className="text-center mt-4">
        <Link href="/pages/period_app">
          <button className="bg-green-500 text-white py-2 px-4 rounded mt-4">
            Period App
          </button>
        </Link>
      </div>
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
      <li>Premium User: {userData.is_premium ? "Yes" : "No"}</li>
      <li>Language Code: {userData.language_code}</li>
    </ul>
  </>
);
