import Link from "next/link";

export default function Referral() {
  return (
    <main className="bg-gradient-to-b from-white to-blue-50 min-h-screen px-4 pb-24 pt-6 font-sans">
      
      <div className="text-center mt-10">https://t.me/meblendi_super_app_bot?start=r_(userData?.telegram_id)</div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 rounded-t-3xl">
        {[
          { label: "Home", icon: "🏠", href: "/" },
          { label: "Upgrade", icon: "🌟", href: "/store" },
          { label: "Settings", icon: "⚙️", href: "/settings" },
        ].map(({ label, icon, href }) => (
          <Link href={href} key={label} className="text-center text-sm">
            <div className="text-xl">{icon}</div>
            <div>{label}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
