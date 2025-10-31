import type { RuleSetRule } from 'webpack';
import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    const imageRule = config.module.rules.find(
      (rule) =>
        typeof rule === 'object' &&
        rule !== null &&
        'test' in rule &&
        rule['test'] instanceof RegExp &&
        rule?.['test']?.test('.svg'),
    );

    if (imageRule) {
      (imageRule as RuleSetRule['exclude']) = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
export default config;
