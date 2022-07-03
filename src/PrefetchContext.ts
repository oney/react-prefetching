import * as React from "react";
import { NavigateFunction } from "react-router-dom";

export const PrefetchContext = React.createContext<{
  navigate?: NavigateFunction;
}>({});
