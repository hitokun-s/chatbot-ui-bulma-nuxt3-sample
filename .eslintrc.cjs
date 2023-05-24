module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    "ecmaVersion": 2020
  },
  extends: [
    "eslint:recommended",
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": "off", // allow using console.log()
    "no-constant-condition": "off",
    "no-unused-vars": "off",
    semi: ["error", "never"], // No semicolon at the end
  },
}
