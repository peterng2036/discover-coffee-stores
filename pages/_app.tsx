import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import StoreContext, { storeReducer } from "../store/store-context";

export default function App({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(storeReducer, {
    latLong: "",
    coffeeStores: [],
  });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
      <footer></footer>
    </StoreContext.Provider>
  );
}
