export interface ProfileSettingsData {
  profilePicture: string | null;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  website: string;
  github: string;
  linkedin: string;
  darkMode: boolean;
  emailNotifications: boolean;
}

export interface ProfileSettingsErrors {
  fullName?: string;
  username?: string;
  email?: string;
  bio?: string;
  website?: string;
  github?: string;
  linkedin?: string;
}

