// eslint-disable-next-line import/no-unresolved
import React, { FC, memo, ReactNode, createContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { RequestConfig } from "../types";

interface NetworkRequestContextProps {
  children?: ReactNode;
  requestConfig: RequestConfig;
  queryClient: QueryClient;
}

const initialContextData: RequestConfig = {
  baseUrl: "",
  userAuth: {
    token: "",
    userId: "",
  },
  globalErrorCallback: null,
};

export const NetworkRequestContext = createContext(initialContextData);

const NetworkRequestContextProvider: FC<NetworkRequestContextProps> = ({ children, requestConfig, queryClient }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NetworkRequestContext.Provider value={{ ...requestConfig }}>{children}</NetworkRequestContext.Provider>
    </QueryClientProvider>
  );
};

export default memo(NetworkRequestContextProvider);
