import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "https://graphql.prepr.io/a5025a21849d0c5846bbd398781ed2452dd03be66b3f92e41574f0f43dc270da",
    documents: ['!src/gql/**/*', 'src/queries/**/*.{ts,tsx}'],
    generates: {
        "src/gql/": {
            preset: 'client',
            plugins: [],
            presetConfig: {
                fragmentMasking: {unmaskFunctionName: 'getFragmentData'},
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
