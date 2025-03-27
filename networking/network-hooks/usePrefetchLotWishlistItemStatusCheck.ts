import { useCallback, useContext } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { lotWishlistItemStatusCheck, Params, queryKey } from "./useLotWishlistItemStatusCheck";

export const usePrefetchLotWishlistItemStatusCheck = (requestOptionsInit?: RequestOptionsInit) => {
  const { baseUrl, userAuth } = useContext(NetworkRequestContext);
  const queryClient = useQueryClient();

  const prefetchLotWishlistItemStatusCheck = useCallback(
    (params: Params) => {
      const generatedQueryKey = [queryKey, params, userAuth, baseUrl, requestOptionsInit];

      const execute = async () => {
        await queryClient.prefetchQuery({
          queryKey: generatedQueryKey,
          queryFn: () => lotWishlistItemStatusCheck(params, { userAuth, baseUrl }, requestOptionsInit),
        });
      };

      execute();

      return { generatedQueryKey };
    },
    [baseUrl, queryClient, requestOptionsInit, userAuth]
  );

  return { prefetchLotWishlistItemStatusCheck };
};
