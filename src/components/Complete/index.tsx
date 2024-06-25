import { useCallback, useMemo } from "react";

import { ServerData, STEPS_DATA_KEY } from "../../utils/steps";

const Complete = () => {
  const onReset = useCallback(() => window.location.reload(), []);

  const serverData = useMemo(() => JSON.parse(localStorage.getItem(STEPS_DATA_KEY) || "{}") as ServerData, []);

  return (
    <div className="step complete">
      <h3>✅ Form Complete</h3>
      <p>Thank you for submitting the form, below is the data you submitted:</p>
      <pre>
        <code>{JSON.stringify(serverData, null, 2)}</code>
      </pre>
      <span>Click the reset button to try again!</span>
      <div className="actions">
        <button onClick={onReset} type="button">
          ❌ Reset
        </button>
      </div>
    </div>
  );
};

export default Complete;
