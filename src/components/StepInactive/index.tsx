import { useViewContext } from "../../contexts/View";
import { StepData, STEPS_DATA } from "../../utils/steps";

type StepInactiveProps = Pick<StepData, "label"> & {
  stepIndex: number;
};

const StepInactive = ({ label, stepIndex }: StepInactiveProps) => {
  const { mobile } = useViewContext();

  if (mobile) {
    return null;
  }

  return (
    <div className="step-inactive">
      <span>
        Step {stepIndex}/{STEPS_DATA.length} - {label}
      </span>
    </div>
  );
};

export default StepInactive;
