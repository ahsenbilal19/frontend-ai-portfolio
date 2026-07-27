import { existsSync } from "fs";
import { resolve } from "path";

const root = "c:/Users/unitec/Desktop/frontend-ai-portfolio/node_modules";
const deps = ["react-hook-form", "@hookform/resolvers", "zod"];

for (const dep of deps) {
  const p = resolve(root, dep, "package.json");
  console.log(`${dep}: ${existsSync(p) ? "INSTALLED" : "MISSING"}`);
}

