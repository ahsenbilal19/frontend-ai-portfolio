"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  profileSettingsSchema,
  type ProfileSettingsFormValues,
} from "@/lib/schemas/profileSettings";
import { DEFAULT_PROFILE_SETTINGS } from "@/lib/constants/profileSettings";
import InputField from "@/components/ui/InputField";
import TextareaField from "@/components/ui/TextareaField";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import AvatarUpload from "@/components/ui/AvatarUpload";

export default function ProfileSettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
  register,
  handleSubmit,
  reset,
  control,
  setValue,
  formState: { errors, isDirty },
} = useForm<ProfileSettingsFormValues>({
  resolver: zodResolver(profileSettingsSchema),
  defaultValues: DEFAULT_PROFILE_SETTINGS,
});

  const darkMode = useWatch({
  control,
  name: "darkMode",
});

const emailNotifications = useWatch({
  control,
  name: "emailNotifications",
});

const profilePicture = useWatch({
  control,
  name: "profilePicture",
});

  const onSubmit = async (data: ProfileSettingsFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Submitted data:", data);
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    reset(DEFAULT_PROFILE_SETTINGS);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Manage your public profile and notification preferences.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Profile settings form"
        className="space-y-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 sm:p-10"
      >
        {/* Profile Picture */}
        <AvatarUpload
          value={profilePicture}
          onChange={(val) => setValue("profilePicture", val, { shouldDirty: true })}
          name="profilePicture"
        />

        <hr className="border-zinc-200 dark:border-zinc-700" />

        {/* Personal Info */}
        <fieldset className="space-y-6">
          <legend className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Personal Information
          </legend>

          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              label="Full Name"
              placeholder="Jane Doe"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <InputField
              label="Username"
              placeholder="janedoe"
              error={errors.username?.message}
              {...register("username")}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="jane@example.com"
              error={errors.email?.message}
              autoComplete="email"
              {...register("email")}
            />
          </div>

          <TextareaField
            label="Bio"
            placeholder="Tell us about yourself..."
            error={errors.bio?.message}
            {...register("bio")}
          />
        </fieldset>

        <hr className="border-zinc-200 dark:border-zinc-700" />

        {/* Social Links */}
        <fieldset className="space-y-6">
          <legend className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Social Links
          </legend>

          <InputField
            label="Website"
            type="url"
            placeholder="https://yourwebsite.com"
            error={errors.website?.message}
            {...register("website")}
          />
          <InputField
            label="GitHub"
            type="url"
            placeholder="https://github.com/username"
            error={errors.github?.message}
            {...register("github")}
          />
          <InputField
            label="LinkedIn"
            type="url"
            placeholder="https://linkedin.com/in/username"
            error={errors.linkedin?.message}
            {...register("linkedin")}
          />
        </fieldset>

        <hr className="border-zinc-200 dark:border-zinc-700" />

        {/* Preferences */}
        <fieldset className="space-y-6">
          <legend className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
            Preferences
          </legend>

          <ToggleSwitch
            label="Dark Mode"
            description="Use dark theme across the application."
            pressed={darkMode}
            id="darkMode"
            onClick={() => setValue("darkMode", !darkMode, { shouldDirty: true })}
          />

          <ToggleSwitch
            label="Email Notifications"
            description="Receive email notifications about account activity."
            pressed={emailNotifications}
            id="emailNotifications"
            onClick={() =>
              setValue("emailNotifications", !emailNotifications, {
                shouldDirty: true,
              })
            }
          />
        </fieldset>

        <hr className="border-zinc-200 dark:border-zinc-700" />

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

