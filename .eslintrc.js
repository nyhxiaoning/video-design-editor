module.exports = {
  extends: require.resolve("umi/eslint"),
  rules: {
    "@typescript-eslint/no-use-before-define": "off",
    eqeqeq: "warn",
  },
};
