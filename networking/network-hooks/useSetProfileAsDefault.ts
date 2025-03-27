import { useContext } from "react";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";
import { RequestConfig } from "../types";

type Response = any;

export type Params = {
  profileId: string;
};

export const mutationKey = ["SetProfileAsDefault"];

export const setProfileAsDefault = async (params: Params, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).post<Params>({ path: apiPaths.profile.setProfileAsDefault, payload: params }, requestOptionsInit);
};

export const useSetProfileAsDefault = (options?: UseMutationOptions<Response, Error, Params>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { mutationsErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};

  const mutation = useMutation({
    mutationFn: (params: Params) => setProfileAsDefault(params, { userAuth, baseUrl }, requestOptionsInit),
    mutationKey,
    meta: {
      createdAt: Date.now(),
    },
    onError: (error: any, params, context) => {
      mutationsErrorHandler<Params, Response>({ key: mutationKey, mutation, params, error, options, context, onError });
    },
    ...optionsWithoutErrorHandling,
  });

  return {
    ...mutation,
    generatedMutationKey: mutationKey,
  };
};
