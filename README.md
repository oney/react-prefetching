# react-prefetching

[![npm](https://img.shields.io/npm/v/react-prefetching?style=flat-square)](https://www.npmjs.com/package/react-prefetching)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-prefetching?style=flat-square)](https://bundlephobia.com/result?p=react-prefetching)
[![npm type definitions](https://img.shields.io/npm/types/typescript?style=flat-square)](https://github.com/oney/react-prefetching/blob/master/src/index.tsx)
[![GitHub](https://img.shields.io/github/license/oney/react-prefetching?style=flat-square)](https://github.com/oney/react-prefetching/blob/master/LICENSE)

## React Prefetching

Use this package by 3 steps to prefetch hovered links and fix fetch waterfalls to make your apps lightning fast.

You can read [this article](https://medium.com/@anokyy/the-easiest-way-to-prefetch-links-and-fix-fetch-waterfalls-in-react-query-useswr-apollo-client-or-33ae59409bf4) to know more.

## Problem

Assume you have an app using `react-router-dom` and `react-query`.

```tsx
import { useQuery } from "react-query";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Link to="/a">A</Link>
        <Route path="a" element={<A />} />
      </Routes>
    </BrowserRouter>
  );
}

function A() {
  const { isLoading, data } = useQuery("A", () => fetchA());
  if (isLoading) return <p>Loading</p>;
  return <div> {data} <B/> </div>;
}

function B() {
  const { isLoading, data } = useQuery("B", () => fetchB());
  if (isLoading) return <p>Loading</p>;
  return <div> {data} <C/> </div>;
}

function C() {
  const { isLoading, data } = useQuery("C", () => fetchC());
  if (isLoading) return <p>Loading</p>;
  return <div>{data}</div>;
}
```
Then your app has fetch waterfalls issue and doesn't have the prefetching feature.

# Solution

```
npm i react-prefetching
```

1. Replace `BrowserRouter` from `react-router-dom` with `PrefetchRouter` from `react-prefetching`
2. Replace `Link` and `NavLink` from `react-router-dom` with `react-prefetching`
3. In components, after `uesQuery`, if `useIsPrefetch()` is true, return the child components.

```tsx
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import { Link, PrefetchRouter, useIsPrefetch } from "./Prefetch";

export default function App() {
  return (
    <PrefetchRouter> // <- 1. replace BrowserRouter
      <Routes>
        <Link to="/a">A</Link> // <- 2. use Link from prefetch
        <Route path="a" element={<A />} />
      </Routes>
    </PrefetchRouter>
  );
}

function A() {
  const { isLoading, data } = useQuery("A", () => fetchA());
  if (useIsPrefetch()) return <B />; // <- 3. return Child if isPrefetch
  
  if (isLoading) return <p>Loading</p>;
  return <div> {data} <B /> </div>;
}

function B() {
  const { isLoading, data } = useQuery("B", () => fetchB());
  if (useIsPrefetch()) return <C />; // <- 3. return Child if isPrefetch

  if (isLoading) return <p>Loading</p>;
  return <div> {data} <C /> </div>;
}

function C() {
  const { isLoading, data } = useQuery("C", () => fetchC());
  if (isLoading) return <p>Loading</p>;
  return <div>{data}</div>;
}
```

Then fetch waterfalls issue is totally solved and the queries will be prefetched when users hover links. That makes your frontend app look blazingly fast. No more loading spinners!

## Demo

Check this [codesandbox demo](https://codesandbox.io/s/react-prefetching-4lu8fh?file=/src/Main.tsx:1402-1416) to play with it.