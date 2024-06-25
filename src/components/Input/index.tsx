import "./index.css";

import { ChangeEvent } from "react";

import { StepData } from "../../utils/steps";

type InputProps = Omit<StepData, "validate"> & {
  error?: string;
  loading: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ error, id, label, loading, onChange, placeholder, required, type, value }: InputProps) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>
        <b>{`${label}${required ? " *" : ""}`}</b>
      </label>
      <input
        id={id}
        autoComplete="off"
        disabled={loading}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
      {error && <small className="error">{error}</small>}
    </div>
  );
};

export default Input;
