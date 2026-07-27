export default function ProfileSettingsSkeleton() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-2 h-8 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-72 rounded bg-zinc-100 dark:bg-zinc-800" />
      </div>

      <div className="space-y-8 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 sm:p-10">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-9 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
        </div>

        {/* Grid fields */}
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-20 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        </div>

        {/* URLs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-4 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
          </div>
        ))}

        {/* Toggles */}
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="h-4 w-32 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-3 w-48 rounded bg-zinc-100 dark:bg-zinc-800" />
            </div>
            <div className="h-6 w-11 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <div className="h-10 flex-1 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-10 w-24 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
}

