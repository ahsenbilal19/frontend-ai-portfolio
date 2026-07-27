"use client";

import { useId, type ButtonHTMLAttributes } from "react";

interface ToggleSwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "className"> {
  label: string;
  pressed: boolean;
  description?: string;
}

export default function ToggleSwitch({
  label,
  pressed,
  description,
  id: externalId,
  ...props
}: ToggleSwitchProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const descriptionId = `${id}-desc`;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={id}
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
        {description && (
          <p
            id={descriptionId}
            className="text-xs text-zinc-500 dark:text-zinc-400"
          >
            {description}
          </p>
        )}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={pressed}
        aria-describedby={description ? descriptionId : undefined}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 ${
          pressed
            ? "bg-indigo-600 dark:bg-indigo-500"
            : "bg-zinc-300 dark:bg-zinc-600"
        }`}
        {...props}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            pressed ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

