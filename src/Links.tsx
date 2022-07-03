/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
import {
  Link as RRLink,
  LinkProps,
  NavLink as RRNavLink,
  NavLinkProps
} from "react-router-dom";
import { usePrefetchLink } from "./usePrefetchLink";

// @ts-ignore
export const Link: React.ForwardRefExoticComponent<
  LinkProps & React.RefAttributes<HTMLAnchorElement>
> = (props) => {
  const prefetchLink = usePrefetchLink(true);
  const onMouseEnter = React.useCallback(() => prefetchLink(props.to), [
    prefetchLink,
    props.to
  ]);
  return <RRLink onMouseEnter={onMouseEnter} {...props} />;
};

// @ts-ignore
export const NavLink: React.ForwardRefExoticComponent<
  NavLinkProps & React.RefAttributes<HTMLAnchorElement>
> = (props) => {
  const prefetchLink = usePrefetchLink(true);
  const onMouseEnter = React.useCallback(() => prefetchLink(props.to), [
    prefetchLink,
    props.to
  ]);
  return <RRNavLink onMouseEnter={onMouseEnter} {...props} />;
};
