import globals from "globals";
import pluginJs from "@eslint/js";
import { jquery } from "globals";


export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];