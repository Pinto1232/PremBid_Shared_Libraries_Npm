import { useContext } from "react";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { QueryArgs, RequestConfig } from "../types";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";

type Response = { notificationCount: number };

type QueryParams = {
  profileId: string;
  includeRead: boolean;
};

type PathParams = undefined;

export type Params = QueryArgs<QueryParams, PathParams>;

export const queryKey = "FetchNotificationCount";

export const fetchNotificationCount = async ({ queryParams, pathParams }: Params = {}, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).get<QueryParams, PathParams>({ path: apiPaths.notification.getNotificationCountByProfileId, queryParams, pathParams }, requestOptionsInit);
};

export const useFetchNotificationCount = (params: Params, options?: UseQueryOptions<Response, Error>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { queriesErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};
  const generatedQueryKey = [queryKey, params, userAuth, baseUrl, requestOptionsInit];

  const { data, ...rest } = useQuery({
    queryKey: generatedQueryKey,
    queryFn: () => fetchNotificationCount(params, { userAuth, baseUrl }, requestOptionsInit),
    meta: {
      createdAt: Date.now(),
    },
    onError: (error: any) => {
      queriesErrorHandler<Response>({ key: generatedQueryKey, refetch: rest.refetch, error, options, onError });
    },
    ...optionsWithoutErrorHandling,
  });

  return {
    data,
    generatedQueryKey,
    ...rest,
  };
};
