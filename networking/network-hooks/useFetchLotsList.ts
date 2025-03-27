import { useContext, useMemo } from "react";

import { UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";
import { flatMap } from "lodash";

import { RequestOptionsInit } from "umi-request";
import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { HistoricNotifications, HistoricNotificationsListEntry, Pagination } from "../../types";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";
import { RequestConfig } from "../types";

type Response = HistoricNotifications;

type Params = {
  auctionId?: string;
  lotTypeIds?: any;
  searchString?: any;
  lotNumber?: any;
  sortBy?: any;
  pagination: Pagination;
  profileId?: any;
};

export const queryKey = "FetchLotsList";

export const fetchLotsList = async (params: Params, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).post<Params>({ path: apiPaths.lots.RetrieveFilteredLotPageData, payload: params }, requestOptionsInit);
};

export const useFetchLotsList = (params: Params, options?: UseInfiniteQueryOptions<Response, Error>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { queriesErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};
  const generatedQueryKey = [queryKey, params, params?.pagination, userAuth, baseUrl, requestOptionsInit];

  const { data, ...rest } = useInfiniteQuery({
    queryKey: generatedQueryKey,
    queryFn: ({ pageParam = 1 }) =>
      fetchLotsList(
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

  const paginatedData: HistoricNotificationsListEntry[] = useMemo(() => flatMap(data?.pages ?? [], (page) => page?.list ?? []), [data?.pages]);

  return {
    data: paginatedData,
    generatedQueryKey,
    ...rest,
  };
};
