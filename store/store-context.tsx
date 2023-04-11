import { Fragment, createContext, useReducer } from "react";

const defaultValue = {
  state: {
    latLong: "",
    coffeeStores: [] as any[],
  },
  dispatch: (action: CoffeeStoreAction) => {},
};

export const StoreContext = createContext(defaultValue);

// An enum with all the types of actions to use in our reducer
export enum CoffeeStoreActionType {
  SET_LAT_LONG = "SET_LAT_LONG",
  SET_COFFEE_STORE = "SET_COFFEE_STORE",
}

// An interface for our actions
export interface CoffeeStoreAction {
  type: CoffeeStoreActionType;
  payload: any;
}

// An interface for our state
export interface CoffeeStoreState {
  latLong: string;
  coffeeStores: any[];
}

// Our reducer function that uses a switch statement to handle our actions
export function storeReducer(state: CoffeeStoreState, action: CoffeeStoreAction) {
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

export default StoreContext;
