import { useCallback, useState } from "react";

import { UseQueryOptions } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { useLotWishlistItemStatusCheck, Params, Response } from "./useLotWishlistItemStatusCheck";

type ReactQueryOptions = UseQueryOptions<Response, Error>;

type NetworkConfig = {
  paramsToSend?: Params;
  queryOptions?: ReactQueryOptions;
};

export const useInlineFetchLotWishlistItemStatusCheck = (requestOptionsInit?: RequestOptionsInit) => {
  const [networkConf, setNetworkConfig] = useState<NetworkConfig>({ paramsToSend: undefined, queryOptions: undefined });

  const returnedQueryObject = useLotWishlistItemStatusCheck(networkConf.paramsToSend, { ...networkConf.queryOptions, enabled: !!networkConf.paramsToSend }, requestOptionsInit);

  const fetchInline = useCallback((params: Params, options?: ReactQueryOptions) => {
    setNetworkConfig((prev) => ({ ...prev, paramsToSend: { ...prev.paramsToSend, ...params }, queryOptions: { ...prev.queryOptions, ...options } }));
  }, []);

  return { ...returnedQueryObject, fetchInline };
};
