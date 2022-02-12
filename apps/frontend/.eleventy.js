const dotenv = require("dotenv");

const markdownLib = require("markdown-it")({});

module.exports = (config) => {
  if (process.env.NODE_ENV !== "production") {
    dotenv.config();
  }

  config.addGlobalData("env", {
    API_URL: process.env.API_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL || `${process.env.API_URL}/graphql`,
  });

  config.setLibrary("md", markdownLib);

  config.addPassthroughCopy("./src/static");
  config.addWatchTarget("./src/static");
  config.addWatchTarget("./tailwind.config.js");

  config.addShortcode("version", () => String(Date.now()));
  config.addFilter("json", (value) => JSON.stringify(value, null, 2));
  config.addFilter("markdown", (value) => markdownLib.render(value));

  return {
    dir: {
      input: "./src",
    },
  };
};
