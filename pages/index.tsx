import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "../components/banner";
import Card from "@/components/card";
import coffeeStoresData from "../data/coffee-store.json";
import { GetStaticProps } from "next";
import { CoffeeStoreData, fetchCoffeeStores } from "@/lib/coffee-stores";
import useTrackLocation from "@/hooks/use-track-location";
import { useEffect, useState } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStores,
    },
  };
};

export default function Home(props: { coffeeStores: CoffeeStoreData[] }) {
  const { handleTrackLocation, latlong, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const handleOnBannerClick = () => {
    handleTrackLocation();
  };

  const [coffeeStores, setCoffeeStores] = useState<CoffeeStoreData[]>([]);
  const [coffeeStoresError, setCoffeeStoresError] = useState<string>("");

  useEffect(() => {
    async function fetchMyAPI() {
      try {
        if (latlong) {
          let response = await fetchCoffeeStores(latlong, 30);
          setCoffeeStores(response);
        }
      } catch (error: any) {
        setCoffeeStoresError(error.message);
      }
    }
    fetchMyAPI();
  }, [latlong]);

  return (
    <>
      <Head>
        <title>Coffee Connoisseru</title>
        <meta name="description" content="Coffee Connoisseru" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View Stores Nearby"}
          handleOnClick={handleOnBannerClick}
        />
        {locationErrorMsg && (
          <p className="text-blue-900 mt-2">
            Something went wrong : {locationErrorMsg}
          </p>
        )}

        {coffeeStoresError && (
          <p className="text-blue-900 mt-2">
            Something went wrong : {coffeeStoresError}
          </p>
        )}

        {coffeeStores.length > 0 && (
          <>
            <h2 className="mt-24 text-3xl font-bold text-white">
              Stores near me
            </h2>
            <div className="mt-4 grid gap-4 justify-items-center-center md:grid-cols-2 lg:grid-cols-3">
              {coffeeStores.map((coffeeStore: CoffeeStoreData) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.id}`}
                    imgUrl={coffeeStore.imgUrl}
                  ></Card>
                );
              })}
            </div>
          </>
        )}
        {coffeeStoresData.length > 0 && (
          <>
            <h2 className="mt-24 text-3xl font-bold text-white">
              Toronto Stores
            </h2>
            <div className="mt-4 grid gap-4 justify-items-center-center md:grid-cols-2 lg:grid-cols-3">
              {props.coffeeStores.map((coffeeStore: CoffeeStoreData) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.id}`}
                    imgUrl={coffeeStore.imgUrl}
                  ></Card>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}
