import { useSelector, shallowEqual } from "react-redux";

export const useShallowEqualSelector = (selector: (state: object) => unknown) => {
  return useSelector(selector, shallowEqual);
};
