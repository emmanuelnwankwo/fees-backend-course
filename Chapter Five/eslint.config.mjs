import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    files: ["**/*.js"],
    languageOptions:
      { sourceType: "commonjs" },
    override: [
      {
        "files": ["tests/**/*"],
        "env": {
          "jest": true
        }
      }
    ]
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];