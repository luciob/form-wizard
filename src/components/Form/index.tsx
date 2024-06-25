import "./index.css";

import { useCallback, useState } from "react";

import { useViewContext } from "../../contexts/View";
import { STEPS_DATA } from "../../utils/steps";
import Box from "../Box";
import Indicators from "../Indicators";
import Step from "../Step";

interface StepsProps {
  onComplete: () => void;
}

const Form = ({ onComplete }: StepsProps) => {
  const { mobile } = useViewContext();
  const [currentStep, setCurrentStep] = useState(0);

  const onBack = useCallback(() => setCurrentStep((currentStep) => currentStep - 1), [setCurrentStep]);

  const onNext = useCallback(() => setCurrentStep((currentStep) => currentStep + 1), [setCurrentStep]);

  return (
    <div>
      <h3>Insert your data below</h3>
      <Box>
        {STEPS_DATA.map((step, index) => {
          const active = index === currentStep;
          const last = index === STEPS_DATA.length - 1;
          return (
            <Step
              key={index}
              active={active}
              index={index}
              last={last}
              onBack={onBack}
              onComplete={onComplete}
              onNext={onNext}
              {...step}
            />
          );
        })}
      </Box>
      {mobile && <Indicators currentStep={currentStep} />}
    </div>
  );
};

export default Form;
