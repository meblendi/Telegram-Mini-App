"use client";

import { useEffect } from "react";
import { updateTimeSpent } from "./fetcher";

export default function TimeTrackingProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const initTimeTracking = async () => {
      try {
        const { default: WebApp } = await import("@twa-dev/sdk");
        const user = WebApp.initDataUnsafe.user;
        
        if (user?.id) {
          let seconds = 0;
          const interval = setInterval(() => {
            seconds += 1;
            if (seconds % 60 === 0) {
              updateTimeSpent(user.id, 60).catch(console.error);
            }
          }, 1000);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Time tracking initialization error:", error);
      }
    };

    initTimeTracking();
  }, []);

  return <>{children}</>;
}