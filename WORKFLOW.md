# AI Development Workflow Comparison

## Overview

This assignment compares two different AI-assisted development workflows while building the same feature: a Profile Settings page.

### Round 1 – Vague Prompt

For the first implementation, I intentionally used a minimal prompt:

> "Build me a profile settings form using React."

The AI generated a surprisingly complete solution containing validation, avatar upload, social links, loading states, and responsive styling. However, the implementation relied heavily on a single large component with manual state management using React's `useState`. There were no automated tests, no reusable UI components, and validation logic was manually implemented.

Although the generated feature worked correctly, reviewing the code required more effort because many responsibilities were combined into one file.

---

### Round 2 – Detailed Prompt

For the second implementation, I started a completely new AI session and provided detailed project context, technical constraints, accessibility requirements, folder structure, verification steps, and best practices.

The AI produced a significantly more maintainable architecture.

Improvements included:

- React Hook Form for state management
- Zod schema validation
- Reusable UI components
- Better separation of concerns
- Strong TypeScript typing
- Accessibility improvements
- Loading skeleton
- Next.js Image
- Explicit verification process

The generated code required much less manual review because the prompt clearly defined expectations before generation.

---

## AI Mistake I Caught

The AI initially placed the first implementation under `/profile`, while the assignment example referred to a settings feature. During review, I recognized that organizing the final implementation under `/settings` aligned better with the project structure and assignment intent.

---

## Reflection

This exercise demonstrated that prompt quality has a direct impact on code quality.

Although writing a detailed prompt required more upfront effort, it reduced review time, improved maintainability, and resulted in cleaner architecture.

The biggest lesson I learned is that AI performs much better when given project context, clear constraints, and explicit verification instructions rather than vague requests.