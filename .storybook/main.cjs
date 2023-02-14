const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/preset-create-react-app',
  ],
  framework: "@storybook/react",
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    interactionsDebugger: true
  },
  webpackFinal: async (config) => {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ]
    config.module.rules.push({
      test: /.storybook\/preview.ts/,
      resolve: { fullySpecified: false },
    })
    return config
  },
}
