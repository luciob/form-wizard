import { PropsWithChildren } from "react";

type BoxProps = PropsWithChildren;

const Box = ({ children }: BoxProps) => {
  return <div className="box">{children}</div>;
};

export default Box;
