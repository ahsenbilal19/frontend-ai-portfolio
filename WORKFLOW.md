# AI Workflow Comparison (FE-03)

## Overview

For this assignment, I built the same Profile Settings feature twice using two different AI prompting approaches. The purpose was to compare the quality of the generated code and understand how prompt quality affects the final implementation.

## Round 1 – Vague Prompt

For the first attempt, I used a simple prompt:

> "Build me a profile settings form using React."

The AI generated a functional form with common fields such as Full Name, Username, Email, Bio, and Social Links. It also included avatar upload functionality and basic validation.

Although the UI looked good, the generated code was contained mostly in one component. There was little separation of concerns, reusable components were not created, and validation logic was relatively simple. The implementation required manual review to verify accessibility, maintainability, and project structure.

## Round 2 – Detailed Prompt

For the second attempt, I used a much more detailed prompt that included project context, folder structure, coding constraints, accessibility requirements, reusable components, Zod validation, React Hook Form, and verification instructions.

The generated implementation was significantly better. The AI organized the project into multiple reusable components, separated validation schemas, constants, and TypeScript types into dedicated files, and followed modern Next.js practices.

The implementation also included:

- React Hook Form
- Zod schema validation
- Accessible form controls
- Reusable UI components
- Loading skeleton
- Better project organization
- Responsive layout

## AI Mistakes I Caught

The AI did not install all required dependencies automatically, which caused missing module errors for `react-hook-form` and `@hookform/resolvers`.

There was also a React Compiler warning caused by using `watch()`, which I fixed by replacing it with `useWatch()`.

I also corrected a Tailwind CSS warning by replacing `min-h-[80px]` with the equivalent utility class.

## Comparison

Although Round 2 required more planning and a longer prompt, it reduced the amount of manual cleanup needed afterward. The generated code was easier to understand, easier to maintain, and followed better engineering practices.

This exercise demonstrated that investing time in writing a detailed prompt produces higher-quality AI-generated code and reduces review effort in the long run.