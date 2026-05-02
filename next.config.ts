import type { NextConfig } from "next";
import path from "path";

// Turbopack picks up /Users/jbrao/Projects/package.json as workspace root and
// fails to resolve bare CSS imports like `@import "tailwindcss"`. We force
// the correct root and alias the package to its absolute location.
const projectRoot = path.resolve(__dirname || process.cwd());
const nodeModules = path.join(projectRoot, "node_modules");

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
    resolveAlias: {
      tailwindcss: path.join(nodeModules, "tailwindcss"),
    },
  },
};

export default nextConfig;
