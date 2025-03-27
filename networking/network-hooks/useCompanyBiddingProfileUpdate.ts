import { useContext } from "react";

import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { apiPaths } from "../api/ApiPaths";
import { requestClient } from "../api/requestClient";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { useNetworkErrorHandlers } from "../hooks/useNetworkErrorHandlers";
import { RequestConfig } from "../types";

type Response = null;

export type Params = {
  companyName: string;
  tradingName: string;
  contactPersonFirstName: string;
  contactPersonLastName: string;
  phoneNumber: string;
  email: string;
  registrationNumber: string;
  vatNumber: string;
  isDefaultProfile: boolean;
  address: {
    addressLine1: string;
    addressLine2: string;
    country: string;
    state: string;
    city: string;
    zip: string;
  };
  dataCapturedDictionary: object;
};

export const mutationKey = ["CompanyBiddingProfileUpdate"];

export const companyBiddingProfileUpdate = async (params: Params, { userAuth, baseUrl }: RequestConfig, requestOptionsInit?: RequestOptionsInit): Promise<Response> => {
  return await requestClient({ userAuth, baseUrl }).post<Params>(
    {
      path: apiPaths.profile.companyBiddingProfileUpdate,
      payload: params,
    },
    requestOptionsInit
  );
};

export const useCompanyBiddingProfileUpdate = (options?: UseMutationOptions<Response, Error, Params>, requestOptionsInit?: RequestOptionsInit) => {
  const { userAuth, baseUrl } = useContext(NetworkRequestContext);
  const { mutationsErrorHandler } = useNetworkErrorHandlers();
  const { onError, ...optionsWithoutErrorHandling } = options ?? {};

  const mutation = useMutation({
    mutationFn: (params: Params) => companyBiddingProfileUpdate(params, { userAuth, baseUrl }, requestOptionsInit),
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
