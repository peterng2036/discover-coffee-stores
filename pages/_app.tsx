import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment, createContext, useReducer } from "react";

const defaultValue = {
  state: {
    latLong: "",
    coffeeStores: [] as any[],
  },
  dispatch: (action: CoffeeStoreAction) => {},
};

export const StoreContext = createContext(defaultValue);

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

// An enum with all the types of actions to use in our reducer
export enum CoffeeStoreActionType {
  SET_LAT_LONG = "SET_LAT_LONG",
  SET_COFFEE_STORE = "SET_COFFEE_STORE",
}

// An interface for our actions
interface CoffeeStoreAction {
  type: CoffeeStoreActionType;
  payload: any;
}

// An interface for our state
interface CoffeeStoreState {
  latLong: string;
  coffeeStores: any[];
}

// Our reducer function that uses a switch statement to handle our actions
function storeReducer(state: CoffeeStoreState, action: CoffeeStoreAction) {
  const { type, payload } = action;
  switch (type) {
    case CoffeeStoreActionType.SET_LAT_LONG:
      return {
        ...state,
        latLong: payload.latLong,
      };
    case CoffeeStoreActionType.SET_COFFEE_STORE:
      return {
        ...state,
        coffeeStores: payload.coffeeStores,
      };
    default:
      return state;
  }
}
