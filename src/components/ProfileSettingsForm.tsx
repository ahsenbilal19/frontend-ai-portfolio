"use client";

import { useState, useCallback, useRef, type FormEvent, type ChangeEvent, type DragEvent } from "react";

/* ─── Types ─── */

interface FormData {
  avatar: string | null;
  fullName: string;
  username: string;
  email: string;
  bio: string;
  website: string;
  twitter: string;
  github: string;
  linkedin: string;
}

interface FormErrors {
  fullName?: string;
  username?: string;
  email?: string;
  bio?: string;
  website?: string;
}

type ToastType = "success" | "error" | null;

/* ─── Validation helpers ─── */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+/;
const USERNAME_RE = /^[a-zA-Z0-9_]+$/;

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.fullName.trim() || form.fullName.trim().length < 2)
    errors.fullName = "Full name is required (min. 2 characters).";

  if (!form.username.trim())
    errors.username = "Username is required.";
  else if (!USERNAME_RE.test(form.username))
    errors.username = "Username can only contain letters, numbers, and underscores.";

  if (!form.email.trim())
    errors.email = "Email is required.";
  else if (!EMAIL_RE.test(form.email))
    errors.email = "Please enter a valid email address.";

  if (form.bio.length > 300)
    errors.bio = "Bio must be under 300 characters.";

  if (form.website.trim() && !URL_RE.test(form.website))
    errors.website = "Please enter a valid URL (http/https).";

  return errors;
}

/* ─── Default data ─── */

const DEFAULT_FORM: FormData = {
  avatar: null,
  fullName: "",
  username: "",
  email: "",
  bio: "",
  website: "",
  twitter: "",
  github: "",
  linkedin: "",
};

/* ─── Component ─── */

export default function ProfileSettingsForm() {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<ToastType>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Field updater ── */

  const update = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      const next = { ...form, [field]: value };
      setForm(next);
      // re-validate touched fields
      if (touched.has(field)) {
        setErrors(validate(next));
      }
    },
    [form, touched],
  );

  const handleBlur = useCallback(
    (field: keyof FormData) => {
      setTouched((prev) => new Set(prev).add(field));
      setErrors(validate(form));
    },
    [form],
  );

  /* ── File / Avatar ── */

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
        setErrors((prev) => ({ ...prev, fullName: "Only PNG, JPG, or WebP images are allowed." }));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => update("avatar", reader.result as string);
      reader.readAsDataURL(file);
    },
    [update],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile],
  );

  const removeAvatar = useCallback(() => update("avatar", null), [update]);

  /* ── Submit ── */

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const allTouched = new Set(Object.keys(form));
      setTouched(allTouched);
      const errs = validate(form);
      setErrors(errs);
      if (Object.keys(errs).length > 0) return;

      setSaving(true);
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1200));
      setSaving(false);
      setToast("success");
      setTimeout(() => setToast(null), 3000);
    },
    [form],
  );

  const handleReset = useCallback(() => {
    setForm(DEFAULT_FORM);
    setErrors({});
    setTouched(new Set());
  }, []);

  /* ── Shared input class ── */

  const inputCls =
    "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-400 dark:focus:ring-zinc-700";
  const errorCls =
    "w-full rounded-lg border border-red-400 bg-white px-4 py-2.5 text-sm text-zinc-900 outline-none ring-2 ring-red-100 dark:border-red-500 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-red-900/40";
  const labelCls = "mb-1 block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400";

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-2xl space-y-8">
      {/* ── Toast ── */}
      {toast && (
        <div
          role="alert"
          className={`rounded-lg px-4 py-3 text-sm font-medium ${
            toast === "success"
              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
              : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {toast === "success" ? "✅ Profile saved successfully!" : "❌ Something went wrong."}
        </div>
      )}

      {/* ══════ Avatar ══════ */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">Avatar</h2>
        <div className="flex items-center gap-6">
          {/* Preview */}
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
            {form.avatar ? (
              <img src={form.avatar} alt="Avatar preview" className="h-full w-full object-cover" />
            ) : (
              <svg className="h-full w-full text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            {/* Dropzone label */}
            <label
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`cursor-pointer rounded-lg border-2 border-dashed px-4 py-2 text-xs font-medium transition-colors ${
                dragOver
                  ? "border-zinc-400 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-800"
                  : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-500"
              }`}
            >
              Click to upload or drag & drop
            </label>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500">PNG, JPG or WebP</p>

            {form.avatar && (
              <button type="button" onClick={removeAvatar} className="text-left text-xs text-red-500 hover:text-red-600 dark:text-red-400">
                Remove
              </button>
            )}
          </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-700" />

      {/* ══════ Personal Info ══════ */}
      <section className="grid gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className={labelCls}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            className={errors.fullName ? errorCls : inputCls}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className={labelCls}>
            Username <span className="text-red-500">*</span>
          </label>
          <input
            id="username"
            value={form.username}
            onChange={(e) => update("username", e.target.value)}
            onBlur={() => handleBlur("username")}
            className={errors.username ? errorCls : inputCls}
            placeholder="johndoe"
          />
          {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username}</p>}
        </div>

        {/* Email */}
        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelCls}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={errors.email ? errorCls : inputCls}
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-700" />

      {/* ══════ Bio ══════ */}
      <section>
        <div className="flex items-end justify-between">
          <label htmlFor="bio" className={labelCls}>
            Bio
          </label>
          <span className={`text-xs ${form.bio.length > 300 ? "text-red-500" : "text-zinc-400 dark:text-zinc-500"}`}>
            {form.bio.length}/300
          </span>
        </div>
        <textarea
          id="bio"
          rows={4}
          value={form.bio}
          onChange={(e) => update("bio", e.target.value)}
          onBlur={() => handleBlur("bio")}
          className={errors.bio ? errorCls : inputCls}
          placeholder="Tell us about yourself..."
        />
        {errors.bio && <p className="mt-1 text-xs text-red-500">{errors.bio}</p>}
      </section>

      <hr className="border-zinc-200 dark:border-zinc-700" />

      {/* ══════ Links ══════ */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-100">Links</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="website" className={labelCls}>Website</label>
            <input
              id="website"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              onBlur={() => handleBlur("website")}
              className={errors.website ? errorCls : inputCls}
              placeholder="https://johndoe.com"
            />
            {errors.website && <p className="mt-1 text-xs text-red-500">{errors.website}</p>}
          </div>
          <div>
            <label htmlFor="twitter" className={labelCls}>Twitter / X</label>
            <input
              id="twitter"
              value={form.twitter}
              onChange={(e) => update("twitter", e.target.value)}
              className={inputCls}
              placeholder="@johndoe"
            />
          </div>
          <div>
            <label htmlFor="github" className={labelCls}>GitHub</label>
            <input
              id="github"
              value={form.github}
              onChange={(e) => update("github", e.target.value)}
              className={inputCls}
              placeholder="johndoe"
            />
          </div>
          <div>
            <label htmlFor="linkedin" className={labelCls}>LinkedIn</label>
            <input
              id="linkedin"
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
              className={inputCls}
              placeholder="johndoe"
            />
          </div>
        </div>
      </section>

      <hr className="border-zinc-200 dark:border-zinc-700" />

      {/* ══════ Actions ══════ */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          disabled={saving}
          className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {saving && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
          )}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

