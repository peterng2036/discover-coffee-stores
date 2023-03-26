import { useRouter } from "next/router";
import Head from "next/head";


export default function App() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title> {router.query.text}</title>
      </Head>
      <div>
        <p>Route : {router.query.text}</p>
      </div>
    </>
  );
}
