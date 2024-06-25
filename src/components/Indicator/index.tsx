import { useMemo } from "react";

interface IndicatorProps {
  currentStep: number;
  index: number;
}

const Indicator = ({ currentStep, index }: IndicatorProps) => {
  const active = useMemo(() => index === currentStep, [currentStep, index]);

  return <span>{active ? "🟢" : "⚪️"}</span>;
};

export default Indicator;
