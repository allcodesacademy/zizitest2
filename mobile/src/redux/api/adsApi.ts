import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:5000";

export const adsApi = createApi({
  reducerPath: "adsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAds: builder.query({
      query: (params) => ({
        url: "/ads",
        params,
      }),
    }),
    getAdDetail: builder.query({
      query: (id) => `/ads/${id}`,
    }),
    createAd: builder.mutation({
      query: ({ token, data }) => ({
        url: "/ads",
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
    searchAds: builder.query({
      query: ({ searchTerm, category }) => ({
        url: "/ads/search",
        params: { searchTerm, category },
      }),
    }),
  }),
});

export const {
  useGetAdsQuery,
  useGetAdDetailQuery,
  useCreateAdMutation,
  useSearchAdsQuery,
} = adsApi;
