import { STEPS_DATA } from "../../utils/steps";
import Indicator from "../Indicator";

interface IndicatorsProps {
  currentStep: number;
}

const Indicators = ({ currentStep }: IndicatorsProps) => {
  return (
    <div className="mobile-steps-indicator">
      {STEPS_DATA.map((_, index) => (
        <Indicator key={`indicator-${index}`} currentStep={currentStep} index={index} />
      ))}
    </div>
  );
};

export default Indicators;
