import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals
        ...globals.jest, // Jest globals for test files
        process: "readonly", // Add 'process' as a global, readonly object
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      "prettier/prettier": "error", // Enforce Prettier formatting as errors
      "react/react-in-jsx-scope": "off", // Disable the rule requiring React in scope
      "react/no-unescaped-entities": "off", // Optionally turn off the unescaped entities rule
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the version of React
      },
    },
  },
  prettier,
];
