import { MutationsErrorHandlerArgs, NetworkRequestError, QueriesErrorHandlerArgs } from "./types";

export const isMutationError = (networkError: NetworkRequestError): networkError is MutationsErrorHandlerArgs => {
  return "mutation" in networkError;
};

export const isQueryError = (networkError: NetworkRequestError): networkError is QueriesErrorHandlerArgs => {
  return "refetch" in networkError;
};
