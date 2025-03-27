import { useContext } from "react";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";
import { RequestConfig } from "../types";

// TODO: this must be updated to be the actual response shape

export type Response = any;

export type Params = {
  auctionId?: string;
  profileId?: string;
  profileType?: string;
};

export const queryKey = "RetrieveRegistrationProcessStatus";

export const retrieveRegistrationProcessStatus = async (params: Params, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).post<Params>({ path: apiPaths.profile.retrieveRegistrationProcessStatus, payload: params }, requestOptionsInit);
};

export const useRetrieveRegistrationProcessStatus = (params: Params, options?: UseQueryOptions<Response, Error>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { queriesErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};
  const generatedQueryKey = [queryKey, params, userAuth, baseUrl, requestOptionsInit];

  const { data, ...rest } = useQuery({
    queryKey: generatedQueryKey,
    queryFn: () => retrieveRegistrationProcessStatus(params, { userAuth, baseUrl }, requestOptionsInit),
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
