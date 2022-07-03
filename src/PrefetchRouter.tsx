import * as React from "react";
import { BrowserRouter, MemoryRouter, useNavigate } from "react-router-dom";
import { IsPrefetchContext } from "./IsPrefetchContext";
import { PrefetchContext } from "./PrefetchContext";
import { displayNone } from "./utils";
import { Children } from "./types";

export function Prefetch({ children }: { children: Children }) {
  const ctx = React.useContext(PrefetchContext);
  const navigate = useNavigate();
  ctx.navigate = navigate;
  return <div style={displayNone}>{children}</div>;
}

export function PrefetchRouter({ children }: { children: Children }) {
  return (
    <PrefetchContext.Provider value={{}}>
      <MemoryRouter>
        <IsPrefetchContext.Provider value={true}>
          <Prefetch>{children}</Prefetch>
        </IsPrefetchContext.Provider>
      </MemoryRouter>
      <BrowserRouter>
        <IsPrefetchContext.Provider value={true}>
          <div style={displayNone}>{children}</div>
        </IsPrefetchContext.Provider>
        <IsPrefetchContext.Provider value={false}>
          {children}
        </IsPrefetchContext.Provider>
      </BrowserRouter>
    </PrefetchContext.Provider>
  );
}
