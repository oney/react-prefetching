import * as React from "react";

export const IsPrefetchContext = React.createContext(false);

export function useIsPrefetch() {
  return React.useContext(IsPrefetchContext);
}
