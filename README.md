# Next.js Complete Starter

Check out the [Complete guide to Next.js and Prepr](https://docs.prepr.io/connecting-front-end-apps/next-complete-guide) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Add the environment file

Copy the .env.example file in this directory to .env (which will be ignored by Git) by running the following command:

```bash
cp .env.example .env
```

## Update the environment file

In the `.env` file, replace `<YOUR_PREPR_GRAPHQL_URL>` with the *API URL* of the Prepr *GraphQL Preview* access token from your Acme Lease Demo environment.

![preview API URL](https://assets-site.prepr.io//35k5a4g45wuy-preview-access-token.png)

## Update the code generator schema 

In the `codegen.ts` file, replace the schema value `<YOUR_PREPR_GRAPHQL_URL>` with the *API URL* of the Prepr *GraphQL Preview* access token from your Acme Lease Demo environment.

![preview API URL](https://assets-site.prepr.io//35k5a4g45wuy-preview-access-token.png)

## Add the Prepr tracking pixel

Go to the `src/app/layout.tsx` file and replace the placeholder `YOUR-PREPR-TRACKING-CODE` with your own tracking code in Prepr.

![event tracking page](https://assets-site.prepr.io//1j41fnhj1305-tracking-code.png)

Don't forget to remove the HTML tags `<!-- Prepr Tracking Code -->`, `<script>` and `</script>` tags from the embedded code.


## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Start the production build:

```bash
npm run start
```

Check out the [deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more
information.
