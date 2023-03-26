import { useRouter } from "next/router";
import Link from "next/link";

export default function CoffeeStore() {
  const rotuer = useRouter();
  return (
    <div>
      Coffee Store Page {rotuer.query.id}
      <Link href="/">Back to Home</Link>
      <Link href="/coffee-store/dynamic">go to page ddynamic</Link>
    </div>
  );
}
