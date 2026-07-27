import type { ProfileSettingsData } from "@/lib/types/profileSettings";

export const DEFAULT_PROFILE_SETTINGS: ProfileSettingsData = {
  profilePicture: null,
  fullName: "Jane Doe",
  username: "janedoe",
  email: "jane@example.com",
  bio: "Full-stack developer passionate about building beautiful, accessible web applications.",
  website: "https://janedoe.dev",
  github: "https://github.com/janedoe",
  linkedin: "https://linkedin.com/in/janedoe",
  darkMode: false,
  emailNotifications: true,
};

