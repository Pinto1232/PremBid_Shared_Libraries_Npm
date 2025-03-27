import { useCallback, useContext } from "react";
import { NetworkRequestContext } from "../context/NetworkRequestContext";
import { MutationsErrorHandlerArgs, QueriesErrorHandlerArgs } from "../types";

export const useNetworkErrorHandlers = () => {
  const { globalErrorCallback } = useContext(NetworkRequestContext);

  const mutationsErrorHandler = useCallback(
    <Params, Response>({ key, mutation, params, error, options, context, onError }: MutationsErrorHandlerArgs<Params, Response>) => {
      globalErrorCallback?.({ key, mutation, params, error, options, context, onError, requestType: "mutation" });

      //react-query hook instance onError();
      onError?.(error, params, context);
    },
    [globalErrorCallback]
  );

  const queriesErrorHandler = useCallback(
    <Response>({ key, refetch, error, options, onError }: QueriesErrorHandlerArgs<Response>) => {
      globalErrorCallback?.({
        key,
        refetch,
        error,
        options,
        onError,
        requestType: "query",
      });

      //react-query hook instance onError();

      onError?.(error);
    },
    [globalErrorCallback]
  );

  return {
    mutationsErrorHandler,
    queriesErrorHandler,
  };
};
