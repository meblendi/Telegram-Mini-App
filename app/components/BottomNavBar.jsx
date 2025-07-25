"use client";

import { motion } from "framer-motion";
import { Home, Search, User, Settings } from "lucide-react";
import { useState } from "react";

const tabs = [
  { id: "home", icon: <Home size={24} />, label: "Home" },
  { id: "search", icon: <Search size={24} />, label: "Search" },
  { id: "profile", icon: <User size={24} />, label: "Profile" },
  { id: "settings", icon: <Settings size={24} />, label: "Settings" },
];

export default function BottomNavBar() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-2 flex items-center gap-6 z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="relative flex flex-col items-center justify-center"
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute -top-2 w-10 h-10 rounded-full bg-blue-500"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <div className="relative z-10 text-white">
            {tab.icon}
          </div>
        </button>
      ))}
    </div>
  );
}
