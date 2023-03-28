import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from "../../data/coffee-store.json";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

export const getStaticProps: GetStaticProps = ({ params }) => {
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (store) => store.id.toString() === params?.id
      ),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

export default function CoffeeStore({ coffeeStore }: { coffeeStore: any }) {
  const rotuer = useRouter();
  return (
    <div>
      Coffee Store Page {rotuer.query.id}
      <Link href="/">Back to Home</Link>
      <Link href="/coffee-store/dynamic">go to page ddynamic</Link>
      <p>{coffeeStore.address}</p>
      <p>{coffeeStore.name}</p>
    </div>
  );
}
