import React from "react";
import Wrapper from "./style";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Wrapper>{children}</Wrapper>
    </>
  );
}

export default Layout;
