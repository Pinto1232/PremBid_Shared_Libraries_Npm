import { useQueryClient as useReactQueryClient } from "@tanstack/react-query";

export const useQueryClient = () => {
  const queryClient = useReactQueryClient();
  return queryClient;
};
