// pages/period-app.tsx
'use client';

import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function PeriodApp() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    import('@twa-dev/sdk').then(({ default: WebApp }) => {
      if (WebApp.initDataUnsafe.user) {
        setUserData(WebApp.initDataUnsafe.user as UserData);
      }
    }).catch((error) => {
      console.error('Failed to initialize Telegram SDK:', error);
    });
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-sky-50 p-4">
      <h1 className="text-center text-2xl font-bold mb-4">
        Welcome Dear {userData.first_name}
      </h1>
    </main>
  );
}
