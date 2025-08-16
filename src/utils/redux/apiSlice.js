import { createApi } from "@reduxjs/toolkit/query/react";

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
const dummyBaseUrl = "https://dummyjson.com";

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: dummyBaseUrl }),
    tagTypes: [],
    keepUnusedDataFor: 5,
    refetchOnFocus: true,
    endpoints: (builder) => ({
        // Define your endpoints here
        // Example:
        // getProducts: builder.query({
        //     query: () => '/products',
        // }),
        getProducts: builder.query({
            query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
        }),
        getProductById: builder.query({
            query: (id) => `/products/${id}`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice;