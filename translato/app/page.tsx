import Image from "next/image";
import Link from "next/link"
import TranslatePage from "./translate/page";

export default function Home() {
  return (
    <main className="">
      <h1>Translato</h1>

      <Link href="/translate">
        Go to translate page
      </Link>
    </main>
  );
}
