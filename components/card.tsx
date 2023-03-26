import Image from "next/image";
import {} from "react";
import Link from "next/link";

export default function Card({
  name,
  imgUrl,
  href,
}: {
  name: string;
  imgUrl: string;
  href: string;
}) {
  return (
    <div className="bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-4 w-80 h-64">
      <Link href={href} className="font-bold text-xl text-gray-800 ">
        <h2>{name}</h2>
        <Image
          src={imgUrl}
          width={260}
          height={160}
          alt={"coffee shop image"}
          className="mt-5 h-44  w-72 object-cover rounded"
        ></Image>
      </Link>
    </div>
  );
}
