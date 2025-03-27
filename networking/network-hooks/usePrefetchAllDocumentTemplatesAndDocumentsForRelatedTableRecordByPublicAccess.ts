import { useCallback, useContext } from "react";

import { useQueryClient } from "@tanstack/react-query";

import { RequestOptionsInit } from "umi-request";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { retrieveAllDocumentTemplatesAndDocumentsForRelatedTableRecordByPublicAccess, Params, queryKey } from "./useRetrieveAllDocumentTemplatesAndDocumentsForRelatedTableRecordByPublicAccess";

export const usePrefetchAllDocumentTemplatesAndDocumentsForRelatedTableRecordByPublicAccess = (requestOptionsInit?: RequestOptionsInit) => {
  const { baseUrl, userAuth } = useContext(NetworkRequestContext);
  const queryClient = useQueryClient();

  const prefetchAllDocumentTemplatesAndDocumentsForRelatedTableRecordByPublicAccess = useCallback(
    (params: Params) => {
      const generatedQueryKey = [queryKey, params, userAuth, baseUrl, requestOptionsInit];

      const execute = async () => {
        await queryClient.prefetchQuery({
          queryKey: generatedQueryKey,
          queryFn: () => retrieveAllDocumentTemplatesAndDocumentsForRelatedTableRecordByPublicAccess(params, { userAuth, baseUrl }, requestOptionsInit),
        });
      };

      execute();

      return { generatedQueryKey };
    },
    [baseUrl, queryClient, requestOptionsInit, userAuth]
  );

  return { prefetchAllDocumentTemplatesAndDocumentsForRelatedTableRecordByPublicAccess };
};
