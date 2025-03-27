import { useContext } from "react";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";
import { RequestConfig } from "../types";

// TODO: this must be updated to be the actual response shape

type Response = null;

export type Params = {
  email: string;
  password: string;
  FirebaseToken: string;
};

export const mutationKey = ["Login"];

export const login = async (params: Params, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).post<Params>(
    {
      path: apiPaths.account.login,
      payload: params,
    },
    requestOptionsInit
  );
};

export const useLogin = (options?: UseMutationOptions<Response, Error, Params>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { mutationsErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};

  const mutation = useMutation({
    mutationFn: (params: Params) => login(params, { userAuth, baseUrl }, requestOptionsInit),
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
