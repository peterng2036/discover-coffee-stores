import { useRouter } from "next/router";
import Link from "next/link";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CoffeeStoreData, fetchCoffeeStores } from "@/lib/coffee-stores";
import { PlacesSearchResult } from "../modals/PlacesSearchResponse";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStore: coffeeStores.find(
        (store) => store.id.toString() === params?.id
      ),
    },
  };
};

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores?.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default function CoffeeStore({
  coffeeStore,
}: {
  coffeeStore: CoffeeStoreData;
}) {
  const rotuer = useRouter();

  if (rotuer.isFallback) return <div>Loading...</div>;

  const { address, name, imgUrl } = coffeeStore;

  return (
    <div>
      <Head>{name}</Head>

      <div className="grid grid-cols-1 h-screen items lg:grid-cols-2 mt-4 lg:items-center">
        <div className="flex flex-col gap-4 mx-4">
          <Link href="/">Back to Home</Link>
          <h2 className="font-bold text-3xl gap-2">{name}</h2>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            alt={"coffee store image"}
            className="w-96 h-80 object-cover rounded-lg"
          ></Image>
        </div>

        <div
          className="w-auto h-80 bg-gray-100 rounded-md 
        bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20
        flex flex-col p-12 mx-4 lg:mt-24 lg:w-3/4"
        >
          <FontAwesomeIcon icon={faLocation} className="text-white w-4 h-4" />
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
}
