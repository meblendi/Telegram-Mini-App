import Link from "next/link";

export default function Settings() {
  return (
    <main>
      
      <div className="text-center mt-10">You need to Unlock this App first</div>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-3 rounded-t-3xl">
        {[
          { label: "Home", icon: "🏠", href: "/" },
          { label: "Upgrade", icon: "🌟", href: "../../store" },
          { label: "Settings", icon: "⚙️", href: "../../settings" },
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
