import type { Metadata } from "next";
import ProfileSettingsForm from "@/components/ProfileSettingsForm";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Update your profile information",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-1 items-start justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Manage your public profile and personal information.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
          <ProfileSettingsForm />
        </div>
      </div>
    </div>
  );
}

