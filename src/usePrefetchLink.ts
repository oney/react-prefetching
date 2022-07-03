import * as React from "react";
import { To } from "react-router-dom";
import { PrefetchContext } from "./PrefetchContext";
import { delay } from "./utils";

export const usePrefetchLink = (skipFisrtDelay = false) => {
  const ctx = React.useContext(PrefetchContext);
  return React.useCallback(
    async (to: To | To[]) => {
      const links = Array.isArray(to) ? to : [to];
      if (!skipFisrtDelay) await delay(0);
      for (let i = 0; i < links.length; i++) {
        ctx.navigate?.(links[i]);
        await delay(0);
      }
    },
    [ctx, skipFisrtDelay]
  );
};
