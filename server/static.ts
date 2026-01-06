import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Try multiple paths to find dist/public
  const possiblePaths = [
    path.resolve(__dirname, "public"), // Standard build structure (dist/public sibling to dist/index.cjs)
    path.resolve(process.cwd(), "dist", "public"), // Vercel / Standard Monorepo structure
    path.resolve(process.cwd(), "public"), // Fallback
  ];

  let distPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Checked: ${possiblePaths.join(", ")}`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
