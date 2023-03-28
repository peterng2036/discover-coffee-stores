import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "../components/banner";
import Card from "@/components/card";
import coffeeStoresData from "../data/coffee-store.json";
import { GetStaticProps } from "next";
import { Key } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      coffeeStores: coffeeStoresData,
    },
  };
};

export default function Home(props: {
  coffeeStores: { id: Key | null | undefined; name: string; imgUrl: string }[];
}) {
  const handleOnBannerClick = () => {
    console.log("hi banner button");
  };

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
          buttonText="View Stores Nearby"
          handleOnClick={handleOnBannerClick}
        />
        {coffeeStoresData.length > 0 && (
          <>
            <h2 className="mt-24 text-3xl font-bold text-white">
              Toronto Stores
            </h2>
            <div className="mt-4 grid gap-4 justify-items-center-center md:grid-cols-2 lg:grid-cols-3">
              {props.coffeeStores.map(
                (coffeeStore: {
                  id: Key | null | undefined;
                  name: string;
                  imgUrl: string;
                }) => {
                  return (
                    <Card
                      key={coffeeStore.id}
                      name={coffeeStore.name}
                      href={`/coffee-store/${coffeeStore.id}`}
                      imgUrl={coffeeStore.imgUrl}
                    ></Card>
                  );
                }
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
