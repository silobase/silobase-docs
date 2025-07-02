# Deploying Silobase to Azure

You can deploy Silobase to **Azure App Service**, a fully managed platform for building and running Node.js apps in the cloud.

This guide walks you through deploying your backend-only Silobase app to Azure and connecting it to your existing PostgreSQL or MSSQL database.


## 1. Prerequisites

Before you begin:

- Install the [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
- Log in to your Azure account:

```bash
az login
````

* Have an existing Azure PostgreSQL / MSSQL database (or connection credentials to any external DB)

## 2. Prepare Your Project

Make sure your Silobase app is ready for production:

### Required Files

* Build your app:

```bash
npm run build
```

* Ensure your `package.json` includes:

```json
"scripts": {
  "start": "node server.js",
  "build": "tsc -p tsconfig.json"
}
```

* Create a `.production.env` or keep `.env` locally with the following:

```env
DB_CLIENT=mssql        # or 'pg' for PostgreSQL
DB_HOST=your-db-host.database.windows.net
DB_PORT=1433           # or 5432 for PostgreSQL
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=silobase

API_KEY_READ=your-read-key
API_KEY_WRITE=your-write-key
API_KEY_FULL=your-full-key
```

> You’ll configure these securely in Azure App Service as environment variables — no need to upload `.env`.


## 3. Deploy to Azure App Service

### Step 1: Create a Resource Group (if needed)

```bash
az group create --name silobase-rg --location eastus
```

### Step 2: Create an App Service Plan

```bash
az appservice plan create --name silobase-plan --resource-group silobase-rg --sku B1 --is-linux
```

### Step 3: Create the Web App

```bash
az webapp create \
  --resource-group silobase-rg \
  --plan silobase-plan \
  --name silobase-api \
  --runtime "NODE|18-lts" \
  --deployment-local-git
```

This will return a Git deployment URL like:

```
https://<username>@silobase-api.scm.azurewebsites.net/silobase-api.git
```

Copy and add it as a remote in your Git project:

```bash
git remote add azure https://<username>@silobase-api.scm.azurewebsites.net/silobase-api.git
```

---

## 4. Set Environment Variables

Set your database credentials and API keys securely:

```bash
az webapp config appsettings set \
  --resource-group silobase-rg \
  --name silobase-api \
  --settings DB_CLIENT=mssql DB_HOST=... DB_USER=... DB_PASSWORD=... DB_NAME=... DB_PORT=1433 \
             API_KEY_READ=... API_KEY_WRITE=... API_KEY_FULL=...
```

---

## 5. Push Code to Azure

Push your app to trigger a deployment:

```bash
git push azure main
```

Azure will automatically install dependencies, run the build step, and start your app using `npm start`.

---

## 6. Verify Your Deployment

Visit:

```
https://silobase-api.azurewebsites.net/rest/v1/:table
```

Example:

```bash
curl --location 'https://silobase-api.azurewebsites.net/rest/v1/users' \
  --header 'x-api-key: your-read-key'
```

If your `.env` values are correct and your database is reachable, you’ll get RESTful access to your data immediately.


## Notes

* Ensure your database (e.g., Azure SQL or PostgreSQL) allows inbound traffic from Azure App Service.
* Use **App Configuration** or **Key Vault** for production-level secret management.
* To view logs:

```bash
az webapp log tail --name silobase-api --resource-group silobase-rg
```
