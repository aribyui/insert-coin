import js from "@eslint/js";

export default [
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    ...js.configs.recommended,
    rules: {
      // Puedes añadir tus reglas aquí
      // "no-console": "warn",
    },
  },
];
