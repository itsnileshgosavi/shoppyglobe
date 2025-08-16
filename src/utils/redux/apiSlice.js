import { createApi } from "@reduxjs/toolkit/query/react";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit = 20, skip = 0 }) => `/products?limit=${limit}&skip=${skip}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (currentCache) {
          return {
            ...newItems,
            products: [...currentCache.products, ...newItems.products],
          };
        }
        return newItems;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;