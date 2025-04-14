
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.prepr.io/ac_eec56c7a559e214618d2980f0e6e4e53f5f844b1c6f91a31179fa55d7b39788b",
  documents: ['!src/gql/**/*', 'src/queries/**/*.{ts,tsx}'],
  generates: {
    "src/gql/": {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
      },
      config: {
        reactApolloVersion: 3,
      },
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
