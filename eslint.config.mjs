import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                ...globals.browser,
            }
        },
        rules: {
            "semi": ["error", "always"],
            "no-unused-vars": "warn",
            "no-console": "off"
        }
    },
    {
        ignores: ["node_modules/**", "data/**"]
    }
];