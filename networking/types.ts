import { UseInfiniteQueryOptions, UseMutationOptions, UseMutationResult, UseQueryOptions } from "@tanstack/react-query";

type Refetch = (options?: UseQueryOptions) => void;
type Mutation<Params = unknown> = UseMutationResult<any, Error, Params, unknown>;

type OnMutationError<I = any> = (error: Error, variables: I, context: unknown) => unknown;

export type MutationsErrorHandlerArgs<Params = any, Response = any> = StoreMutationNetworkErrorArgs<Params, Response> & { context: unknown; onError?: OnMutationError<Params> };

export type QueriesErrorHandlerArgs<Response = any> = StoreQueryNetworkErrorArgs<Response> & { onError?: (error: Error) => void };

type StoreMutationNetworkErrorArgs<Params, Response> = {
  key: unknown[];
  mutation: Mutation<Params>;
  params: Params;
  refetch?: null;
  error: Error;
  options?: UseMutationOptions<Response, Error, Params>;
  requestType?: "mutation";
};

type StoreQueryNetworkErrorArgs<Response> = {
  key: unknown[];
  mutation?: null;
  params?: null;
  refetch: Refetch;
  error: Error;
  options?: UseQueryOptions<Response, Error> | UseInfiniteQueryOptions<Response, Error>;
  requestType?: "query";
};

export type NetworkRequestError = MutationsErrorHandlerArgs | QueriesErrorHandlerArgs;

export type GetRequestArgs<I, J> = {
  path: string;
  queryParams?: I;
  pathParams?: J;
};

export type PostRequestArgs<I> = {
  path: string;
  payload: I;
};

export type DeleteRequestArgs<I, J> = {
  path: string;
  payload?: I;
  pathParams?: J;
};

export type QueryArgs<I, J> =
  | {
      queryParams?: I;
      pathParams?: J;
    }
  | undefined;

export type DeleteArgs<I, J> =
  | {
      payload?: I;
      pathParams?: J;
    }
  | undefined;

export type RequestConfig = { userAuth?: UserAuth; baseUrl: string; globalErrorCallback?: null | ((networkError: NetworkRequestError) => void) };

export type UserAuth = {
  userId?: string;
  token?: string;
};

export type QueryClientPathParams = {
  [property: string]: string | number | boolean;
} | null;

export enum Message {
  NetworkError = "It seems that your internet connection is unstable. Please check to see that you are connected to the internet and try again.",
}
