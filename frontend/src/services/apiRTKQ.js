//unused because using RTKQ

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const llistApi = createApi({
  reducerPath: 'llistApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
  endpoints: (build) => ({ 
    getLlist: build.query({
      query: () => `llist/`,
    }), 
    getL: build.query({
      query: (id) => `llist/${id}`,
    }),
    createL: build.mutation({
      query: (content) => ({
        url: `llist/`,
        method: 'POST',
        body: content,
      }) 
    }),
    updateL: build.mutation({
      query: ({ id, ...update }) => ({
        url: `llist/${id}`,
        method: 'PUT',
        body: update,
      }),
    }),
    deleteL: build.mutation({
      query: ({ id }) => ({
        url: `llist/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetLlistQuery, useGetLQuery, useUpdateLMutation, useCreateLMutation, useDeleteLMutation } = llistApi;