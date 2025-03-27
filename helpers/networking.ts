import { Message } from "../networking/types";

export const handleNetworkError = (error: any, cb: () => void) => {
  if (error.message !== Message.NetworkError) cb();
};
