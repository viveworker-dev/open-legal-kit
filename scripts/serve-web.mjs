#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const webDir = path.join(rootDir, "web");

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml"
};

export function startWebServer(options = {}) {
  const port = Number(options.port || process.env.PORT || 4173);
  const host = options.host || "127.0.0.1";

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error("Invalid port. Use --port <number>.");
  }

  const server = http.createServer((req, res) => {
    const requestUrl = new URL(req.url || "/", `http://${host}:${port}`);
    const pathname = decodeURIComponent(requestUrl.pathname);
    const safePath = pathname === "/" ? "/index.html" : pathname;
    const target = path.normalize(path.join(webDir, safePath));
    const relative = path.relative(webDir, target);

    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(target, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": types[path.extname(target)] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      res.end(data);
    });
  });

  server.listen(port, host, () => {
    console.log(`open-legal-kit web wizard: http://${host}:${port}`);
  });

  return server;
}

function parsePort(argv) {
  const portIndex = argv.indexOf("--port");
  if (portIndex >= 0) return Number(argv[portIndex + 1]);
  if (argv[0]) return Number(argv[0]);
  return undefined;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startWebServer({ port: parsePort(process.argv.slice(2)) });
}
