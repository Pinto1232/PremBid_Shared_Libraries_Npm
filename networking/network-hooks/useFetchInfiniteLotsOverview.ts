import { useContext, useMemo } from "react";

import { useInfiniteQuery, UseQueryOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";
import { RequestConfig } from "../types";
import { Pagination } from "../../types";

type Response = any;

export type Params = {
  auctionId?: string;
  pagination?: Pagination;
  searchQuery?: string;
};

export const queryKey = "FetchInfiniteLotsOverview";

export const fetchInfiniteLotsOverview = async (params: Params, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).post<Params>({ path: apiPaths.lot.retrieveLotsOverviewDataWithPagination, payload: params }, requestOptionsInit);
};

export const useFetchInfiniteLotsOverview = (params: Params, options?: UseQueryOptions<Response, Error>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { queriesErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};
  const generatedQueryKey = [queryKey, params, params?.pagination, userAuth, baseUrl, requestOptionsInit];

  const { data, ...rest } = useInfiniteQuery({
    queryKey: generatedQueryKey,
    queryFn: ({ pageParam = 1 }) =>
      fetchInfiniteLotsOverview(
        {
          ...params,
          pagination: { ...params?.pagination, currentPage: pageParam },
        },
        { userAuth, baseUrl },
        requestOptionsInit
      ),
    getNextPageParam: (lastPage) => {
      const { currentPage, pageSize, total } = lastPage.pagination ?? {};

      if (!currentPage || !pageSize || !total) return undefined;

      const totalPages = Math.ceil(total / pageSize);
      const nextPage = currentPage + 1;
      return totalPages === currentPage ? undefined : nextPage;
    },
    meta: {
      createdAt: Date.now(),
    },
    onError: (error: any) => {
      queriesErrorHandler<Response>({ key: generatedQueryKey, refetch: rest.refetch, error, options, onError });
    },
    ...optionsWithoutErrorHandling,
  });

  const paginatedData = useMemo(() => data?.pages?.find((page) => page?.pagination) ?? {}, [data?.pages]);

  return {
    data: paginatedData,
    generatedQueryKey,
    ...rest,
  };
};
