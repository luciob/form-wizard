import "./index.css";

import { PropsWithChildren } from "react";

import AppBar from "../AppBar";

type LayoutProps = PropsWithChildren;

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <AppBar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
