import { z } from "zod";

const urlOrEmpty = z
  .string()
  .optional()
  .or(z.literal(""))
  .or(z.string().url("Must be a valid URL"));

export const profileSettingsSchema = z.object({
  profilePicture: z.string().nullable(),
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(500, "Bio must be at most 500 characters").optional().or(z.literal("")),
  website: urlOrEmpty,
  github: urlOrEmpty,
  linkedin: urlOrEmpty,
  darkMode: z.boolean(),
  emailNotifications: z.boolean(),
});

export type ProfileSettingsFormValues = z.infer<typeof profileSettingsSchema>;

