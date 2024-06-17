import { useQuery, useMutation } from "@tanstack/react-query";
import { parseFilterArgs } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const CONTROLLER = "https://api.thecatapi.com/v1/images/search";
const API_KEY = process.env.REACT_APP_API_KEY;

export const queryClient = new QueryClient();

export const getCategories = async () => {
  const data = await fetch("https://api.thecatapi.com/v1/categories");
  const jsonData = await data.json();
  return jsonData;
};

export const useCategories = ({ queryOptions } = {}) => {
  const { data, ...rest } = useQuery(["categories"], getCategories, {
    ...queryOptions,
  });
  return { data, ...rest };
}; // Q about queryOptions to Eftychia: Initialized as an object, to take into account a variety of types of query options?

export const getBreeds = async () => {
  const data = await fetch("https://api.thecatapi.com/v1/breeds");
  const jsonData = await data.json();
  return jsonData;
};

export const useBreeds = ({ queryOptions } = {}) => {
  return useQuery(["breeds"], getBreeds, {
    ...queryOptions,
  });
};
export const getCats = async (limit) => {
    const url = `${CONTROLLER}?limit=${limit || 9}`;
    const headers = {
      'x-api-key': API_KEY,
    };
  
    const data = await fetch(url, { headers });
    const jsonData = await data.json();
    return jsonData;
  };
  

export const useCats = ({ queryOptions, limit } = {}) => {
  const { data, ...rest } = useQuery(["cats", limit], () => getCats(limit), {
    ...queryOptions,
  });
  return { data, ...rest };
};

export const searchCats = async (payload) => {
  let filters = "";
  if (payload.limit) {
    filters += `?limit=${payload.limit}`;
  } else {
    filters += `?limit=9`;
  }
  if (payload.selectedBreed) {
    filters += `&breed_ids=${payload.selectedBreed}`;
  }
  if (payload.selectedCategory) {
    filters += `&category_ids=${payload.selectedCategory}`;
  }
  if (payload.order) {
    filters += `&order=${payload.order}`;
  }
  if (payload.type) {
    filters += `&mime_types=${payload.type}`;
  }
  const headers = {
    'x-api-key': API_KEY,
  };
  const data = await fetch(`${CONTROLLER}${filters}`, { headers });
  const jason = await data.json();
  return jason;
};


export const useSearchCats = ({ queryOptions } = {}) => {
    return useMutation(searchCats, {
        ...queryOptions,
        mutationKey: ["searchCats"],
    });
};