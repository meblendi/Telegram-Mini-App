import Link from "next/link";

export default function Store() {
  return (
    <main>
      <div className="text-center mt-4">
        <Link href="/">
          <button className="bg-red-500 text-white py-2 px-4 rounded">
            Back to Home
          </button>
        </Link>
      </div>
      <div className="text-center mt-10">Settings Page COMING SOON</div>
    </main>
  );
}
