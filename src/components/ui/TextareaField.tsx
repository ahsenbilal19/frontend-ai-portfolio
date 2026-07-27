"use client";

import { type TextareaHTMLAttributes, useId } from "react";

interface TextareaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  error?: string;
}

export default function TextareaField({
  label,
  error,
  id: externalId,
  ...props
}: TextareaFieldProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`rounded-lg border bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-offset-1 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500 resize-y min-h-[80px] ${
          error
            ? "border-red-500 focus:ring-red-400 dark:border-red-400"
            : "border-zinc-300 focus:ring-indigo-500 dark:border-zinc-600 dark:focus:ring-indigo-400"
        } disabled:cursor-not-allowed disabled:opacity-60`}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

