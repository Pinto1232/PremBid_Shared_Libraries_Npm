import { useCallback, useState } from "react";

import { UseQueryOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { useRetrieveRegistrationProcessStatus, Params, Response } from "./useRetrieveRegistrationProcessStatus";

type ReactQueryOptions = UseQueryOptions<Response, Error>;

type NetworkConfig = {
  paramsToSend?: Params;
  queryOptions?: ReactQueryOptions;
};

export const useInlineRetrieveRegistrationProcessStatus = (requestOptionsInit?: RequestOptionsInit) => {
  const [networkConf, setNetworkConfig] = useState<NetworkConfig>({ paramsToSend: undefined, queryOptions: undefined });

  const returnedQueryObject = useRetrieveRegistrationProcessStatus(networkConf?.paramsToSend ?? {}, { ...networkConf.queryOptions, enabled: !!networkConf.paramsToSend }, requestOptionsInit);

  const fetchInline = useCallback((params: Params, options?: ReactQueryOptions) => {
    setNetworkConfig((prev) => ({ ...prev, paramsToSend: { ...prev.paramsToSend, ...params }, queryOptions: { ...prev.queryOptions, ...options } }));
  }, []);

  return { ...returnedQueryObject, fetchInline };
};
