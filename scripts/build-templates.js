import { resolve } from "node:path";
import { cwd } from "node:process";
import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";
import { renderFile } from "pug";
import { code } from "./code-highlight-filter.js";

const srcFile = "src/templates/index.pug";
const targetFile = resolve(cwd(), "src/index.html");
const render = promisify(renderFile);

render(srcFile, {
  basedir: resolve(cwd(), "src"),
  filters: {
    code,
  },
}).then((data) => writeFile(targetFile, data));
