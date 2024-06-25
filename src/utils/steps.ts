/* eslint-disable @typescript-eslint/no-explicit-any */
interface BaseStepData {
  id: string;
  value?: string;
}

export type ServerData = {
  [key: string]: string;
};

type ValidateFn = (value?: string) => boolean;

export interface StepData extends BaseStepData {
  label: string;
  placeholder: string;
  required?: boolean;
  type: "string" | "number" | "email";
  validate: ValidateFn;
}

/**
 * Validates a required string
 * @param value input string
 * @returns throws if not valid or returns true
 */
const validateRequiredString = (value?: string) => {
  if (!value || value.length === 0) {
    throw new Error("This field is required");
  }

  return true;
};

/**
 * Validates age input
 * @param value input string
 * @returns throws if not valid or returns true
 */
const validateRequiredAge = (value?: string) => {
  if (value == undefined || value == null) {
    throw new Error("This field is required");
  }

  const numericValue = parseInt(value, 10);
  if (isNaN(numericValue)) {
    throw new Error("Age must be a number");
  }

  if (numericValue <= 0) {
    throw new Error("Please enter a valid age");
  }

  return true;
};

/**
 * Validates a required email
 * @param value input string
 * @returns throws if not valid or returns true
 */
const validateRequiredEmail = (value?: string) => {
  validateRequiredString(value);

  if (!value!.includes("@")) {
    throw new Error("Please enter a valid email address");
  }

  return true;
};

export const STEPS_DATA_KEY = "steps-data";

export const STEPS_DATA: StepData[] = [
  {
    id: "name",
    label: "Name",
    placeholder: "Enter your name",
    required: true,
    type: "string",
    validate: validateRequiredString,
  },
  {
    id: "age",
    label: "Age",
    placeholder: "Enter your age",
    required: true,
    type: "number",
    validate: validateRequiredAge,
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email",
    required: true,
    type: "email",
    validate: validateRequiredEmail,
  },
];

/**
 * Simulates a server write (in local storage)
 * @param data the data to store
 */
const fakeServerWrite = (data: BaseStepData) => {
  const serverData = localStorage.getItem(STEPS_DATA_KEY);
  const parsedData = serverData ? (JSON.parse(serverData) as ServerData) : {};
  localStorage.setItem(STEPS_DATA_KEY, JSON.stringify({ ...parsedData, [data.id]: data.value }));
};

/**
 * Simulates a server-side validation with data store (in local storage)
 * @param validate the validation function
 * @returns a promise that resolves to a boolean
 */
export const fakeServerValidation = (data: BaseStepData, validate: ValidateFn): Promise<boolean> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        validate(data.value);
        fakeServerWrite(data);
        resolve(true);
      } catch (error: any) {
        reject(error.message);
      }
    }, 1000)
  );
