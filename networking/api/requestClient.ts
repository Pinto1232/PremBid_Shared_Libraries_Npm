import { RequestOptionsInit } from "umi-request";
import { isNetworkError } from "../helpers";
import { DeleteRequestArgs, GetRequestArgs, Message, PostRequestArgs, QueryClientPathParams, RequestConfig } from "../types";
import request from "./RequestClientConfig";

export const requestClient = function ({ userAuth, baseUrl }: RequestConfig) {
  const { token = "", userId = "" } = userAuth ?? { token: undefined, userId: undefined };

  async function get<I = URLSearchParams, J = QueryClientPathParams>(getRequestArgs: GetRequestArgs<I, J>, requestOptionsInit?: RequestOptionsInit) {
    try {
      const result = await getUrl<I, J>(getRequestArgs, requestOptionsInit);

      const { success, response, error } = result;

      if (!success) {
        (console as any)?.networkLogError?.("RequestClient=> ", getRequestArgs, result);
        throw new Error(error ?? "An unexpected error occurred. Please try again.");
      }

      return response;
    } catch (error: any) {
      (console as any)?.networkLogError?.("RequestClient=> ", error);
      throw new Error(isNetworkError(error?.message) ? Message.NetworkError : String(error?.message));
    }
  }

  const post = async function <I>(postRequestArgs: PostRequestArgs<I>, requestOptionsInit?: RequestOptionsInit) {
    try {
      const result = await postUrl<I>(postRequestArgs, requestOptionsInit);

      const { success, response, error } = result;

      if (!success) {
        (console as any)?.networkLogError?.("RequestClient=> ", postRequestArgs, result);
        throw new Error(error ?? "An unexpected error occurred. Please try again.");
      }

      return response;
    } catch (error: any) {
      (console as any)?.networkLogError?.("RequestClient=> ", error);
      throw new Error(isNetworkError(error?.message) ? Message.NetworkError : String(error?.message));
    }
  };

  const del = async function <I, J = QueryClientPathParams>(deleteRequestArgs: DeleteRequestArgs<I, J>, requestOptionsInit?: RequestOptionsInit) {
    try {
      const result = await deleteUrl<I, J>(deleteRequestArgs, requestOptionsInit);

      const { success, response, error } = result;

      if (!success) {
        (console as any)?.networkLogError?.("RequestClient=> ", deleteRequestArgs, result);
        throw new Error(error ?? "An unexpected error occurred. Please try again.");
      }

      return response;
    } catch (error: any) {
      (console as any)?.networkLogError?.("RequestClient=> ", error);
      throw new Error(isNetworkError(error?.message) ? Message.NetworkError : String(error?.message));
    }
  };

  const getUrl = async function <I = URLSearchParams, J = QueryClientPathParams>({ path, queryParams, pathParams }: GetRequestArgs<I, J>, requestOptionsInit?: RequestOptionsInit) {
    // path params

    if (pathParams) {
      for (const key in pathParams) {
        path = path.replace(`:${key}`, String(pathParams[key]));
      }
    }

    const authHeaders = { Authorization: `Bearer ${token}`, UserId: userId };
    const requestType = requestOptionsInit?.requestType ?? "json";

    return request(`${baseUrl}${path}`, {
      method: "get",
      params: queryParams ?? {},
      ...requestOptionsInit,
      requestType,
      headers: { ...authHeaders, ...requestOptionsInit?.headers },
      responseType: requestOptionsInit?.responseType ?? "json",
    });
  };

  const postUrl = async function <I>({ path, payload }: PostRequestArgs<I>, requestOptionsInit?: RequestOptionsInit) {
    const headers: HeadersInit & { UserId: string } = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };

    const requestType = requestOptionsInit?.requestType ?? "json";

    return request(`${baseUrl}${path}`, {
      method: "post",
      ...requestOptionsInit,
      requestType,
      body: JSON.stringify(payload ?? {}),
      headers: {
        ...headers,
        ...requestOptionsInit?.headers,
      },
    });
  };

  const deleteUrl = async function <I, J = QueryClientPathParams>({ path, payload, pathParams }: DeleteRequestArgs<I, J>, requestOptionsInit?: RequestOptionsInit) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };

    // path params

    if (pathParams) {
      for (const key in pathParams) {
        path = path.replace(":" + key, String(pathParams[key]));
      }
    }

    const requestType = requestOptionsInit?.requestType ?? "json";

    return request(`${baseUrl}${path}`, {
      method: "delete",
      ...requestOptionsInit,
      requestType,
      body: JSON.stringify(payload),
      headers: {
        ...headers,
        ...requestOptionsInit?.headers,
      },
    });
  };

  return { get, post, delete: del };
};
