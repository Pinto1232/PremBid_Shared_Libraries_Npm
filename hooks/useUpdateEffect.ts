import { useEffect, useMemo, useRef } from "react";

export const useUpdateEffect = (callback: () => void, dependencies: unknown[]) => {
  const initialRender = useRef(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedDependencies = useMemo(() => [callback, ...dependencies], dependencies);

  useEffect(() => {
    if (initialRender.current === false) {
      callback();
    }

    initialRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, memoizedDependencies);
};
