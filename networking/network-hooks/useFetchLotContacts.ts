import { useContext } from "react";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { RequestOptionsInit } from "umi-request";

import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";
import { RequestConfig } from "../types";
import { LotContact } from "../../types";

type Response = LotContact[];

export type Params = {
  contactIds: string[];
};

export const queryKey = "FetchLotContacts";

export const fetchLotContacts = async (params: Params, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).post<Params>({ path: apiPaths.contact.list, payload: params }, requestOptionsInit);
};

export const useFetchLotContacts = (params: Params, options?: UseQueryOptions<Response, Error>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { queriesErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};
  const generatedQueryKey = [queryKey, params, userAuth, baseUrl, requestOptionsInit];

  const { data, ...rest } = useQuery({
    queryKey: generatedQueryKey,
    queryFn: () => fetchLotContacts(params, { userAuth, baseUrl }, requestOptionsInit),
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
