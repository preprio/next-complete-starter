
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "<YOUR_PREPR_GRAPHQL_URL>",
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
