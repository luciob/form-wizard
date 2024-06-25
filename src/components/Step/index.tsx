import "./index.css";

import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { fakeServerValidation, StepData, STEPS_DATA } from "../../utils/steps";
import Input from "../Input";
import StepInactive from "../StepInactive";

type StepProps = StepData & {
  active: boolean;
  index: number;
  last: boolean;
  onBack: () => void;
  onComplete: () => void;
  onNext: () => void;
};

const Step = ({
  active,
  id,
  index,
  label,
  last,
  onBack,
  onComplete,
  onNext,
  placeholder,
  required = false,
  type,
  validate,
  value: initialValue = "",
}: StepProps) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue);

  const toggleLoading = useCallback(() => setLoading((loading) => !loading), []);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (error) {
        setError("");
      }

      setValue(e.target.value);
    },
    [error]
  );

  const onSubmit = useCallback(
    (successCallback: () => void) => {
      setError("");
      toggleLoading();
      fakeServerValidation({ id, value }, validate).then(successCallback).catch(setError).finally(toggleLoading);
    },
    [id, toggleLoading, validate, value]
  );

  const onSubmitNext = useCallback(() => onSubmit(onNext), [onNext, onSubmit]);

  const onSubmitComplete = useCallback(() => onSubmit(onComplete), [onComplete, onSubmit]);

  const stepIndex = useMemo(() => index + 1, [index]);

  if (!active) {
    return <StepInactive label={label} stepIndex={stepIndex} />;
  }

  return (
    <div className="step">
      <small>
        Step {stepIndex}/{STEPS_DATA.length}
      </small>
      <Input
        id={id}
        error={error}
        label={label}
        loading={loading}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      <div className="actions">
        {!!index && (
          <button disabled={loading} onClick={onBack} type="button">
            ⬅️ Back
          </button>
        )}
        {!last && (
          <button disabled={loading} onClick={onSubmitNext} type="button">
            {loading ? "🔄 Wait..." : "➡️ Next"}
          </button>
        )}
        {last && (
          <button disabled={loading} onClick={onSubmitComplete} type="button">
            {loading ? "🔄 Wait..." : "✅ Complete"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Step;
