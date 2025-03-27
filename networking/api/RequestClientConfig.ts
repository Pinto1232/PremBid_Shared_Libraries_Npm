import { extend } from "umi-request";

const errorHandler = (error: any) => {
  (console as any)?.networkLogError?.(error);
  return error;
};

const request = extend({
  credentials: "include",
  errorHandler,
});

request.interceptors.request.use((url, options) => {
  (console as any)?.networkLogRequest?.(url, options);
  return {
    url,
    options: { ...options },
  };
});

request.interceptors.response.use((response, options) => {
  (console as any)?.networkLogResponse?.(response, options);
  return response;
});

export default request;
