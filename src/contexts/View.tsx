import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";

interface ViewContextData {
  mobile: boolean;
}

type ViewContextProps = PropsWithChildren<
  Partial<ViewContextData> & {
    breakpoint?: number;
  }
>;

const DEFAULT_BREAKPOINT = 768;

const ViewContext = createContext<ViewContextData | undefined>(undefined);

const ViewContextProvider = ({ children, breakpoint = DEFAULT_BREAKPOINT, mobile = false }: ViewContextProps) => {
  const [viewData, setViewData] = useState<ViewContextData>({ mobile });

  const recalcViewData = useCallback(() => {
    const windowWidth = window.innerWidth;
    setViewData({ mobile: windowWidth < breakpoint });
  }, [breakpoint]);

  useEffect(() => {
    recalcViewData();
    window.addEventListener("resize", recalcViewData);
    return () => window.removeEventListener("resize", recalcViewData);
  }, [recalcViewData]);

  return <ViewContext.Provider value={viewData}>{children}</ViewContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useViewContext must be used within a ViewContextProvider");
  }

  return context;
};

export default ViewContextProvider;
