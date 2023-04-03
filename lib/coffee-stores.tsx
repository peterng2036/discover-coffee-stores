import { PlacesSearchResponse } from "@/pages/modals/PlacesSearchResponse";

import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNPLASH_ACCESS_KEY || "",
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY || "",
  },
};

export const fetchCoffeeStores = async (
  latLong: string = "22.40%2C113.96",
  limit: number = 6
) => {
  const defaultImgURL =
    "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80";

  const photos = await getListOfCoffeeStorePhotos();

  const res = await fetch(
    getUrlForCoffeeStores(latLong, "coffee%20store", limit),
    options
  );

  const data = (await res.json()) as PlacesSearchResponse;

  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address || "",
      imgUrl: photos[index] || defaultImgURL,
    };
  });
};

export interface CoffeeStoreData {
  id: string;
  name: string;
  address: string;
  imgUrl: string;
}

const getListOfCoffeeStorePhotos = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 30,
  });

  return photos.response?.results.map((result) => result.urls.small) || [];
};

const getUrlForCoffeeStores = (
  latlong: string,
  query: string,
  limit: number
) => {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
};
