import { Suspense } from "react";
import type { Metadata } from "next";
import ProfileSettingsForm from "@/components/ProfileSettingsForm";
import ProfileSettingsSkeleton from "@/components/ProfileSettingsSkeleton";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile settings and preferences.",
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Suspense fallback={<ProfileSettingsSkeleton />}>
        <ProfileSettingsForm />
      </Suspense>
    </div>
  );
}

