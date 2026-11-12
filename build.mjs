import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("lib", { recursive: true });
const result = await build({
  entryPoints: ["src/client.jsx"],
  bundle: true,
  format: "cjs",
  platform: "browser",
  write: false,
  jsx: "automatic",
  external: ["react", "react/jsx-runtime"],
  minify: true,
});
await writeFile(
  "lib/client.js",
  `window.__ModuleLoader__.load({id:"@caidazi/dsh-boards",factory:(require)=>{var module={exports:{}};var exports=module.exports;\n${result.outputFiles[0].text}\nreturn module.exports;}});`,
);
