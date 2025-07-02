# CI/CD with GitHub Actions (Azure App Service)
This guide shows how to set up continuous deployment of Silobase to **Azure App Service** using **GitHub Actions**.

> Each time you push to the `main` branch, your app will automatically build and deploy to Azure.

## Prerequisites

* You’ve already deployed Silobase manually to Azure App Service
* You have **Azure CLI** installed locally (for generating credentials)
* You know your **App Service name** and **resource group**


## 1. Create Azure Deployment Credentials

Run the following command to create a **deployment user** and generate credentials for GitHub Actions:

```bash
az ad sp create-for-rbac --name "github-actions-silobase" --role contributor \
  --scopes /subscriptions/<SUBSCRIPTION_ID>/resourceGroups/<RESOURCE_GROUP>/providers/Microsoft.Web/sites/<APP_NAME> \
  --sdk-auth
```

This returns a JSON output like:

```json
{
  "clientId": "...",
  "clientSecret": "...",
  "subscriptionId": "...",
  "tenantId": "...",
  "activeDirectoryEndpointUrl": "...",
  "resourceManagerEndpointUrl": "...",
  ...
}
```

Copy this entire output and save it. You'll use it in the next step.


## 2. Add GitHub Repository Secrets

In your GitHub repo, go to **Settings → Secrets → Actions**, and add a new secret:

* **Name:** `AZURE_CREDENTIALS`
* **Value:** Paste the full JSON output from the previous step

Also add secrets for your environment variables if needed:

| Secret Name     | Description                  |
| --------------- | ---------------------------- |
| `DB_CLIENT`     | e.g., `pg` or `mssql`        |
| `DB_HOST`       | Your database hostname       |
| `DB_USER`       | DB username                  |
| `DB_PASSWORD`   | DB password                  |
| `DB_PORT`       | DB port                      |
| `DB_NAME`       | DB name                      |
| `API_KEY_READ`  | Silobase read-only API key   |
| `API_KEY_WRITE` | Silobase write-only API key  |
| `API_KEY_FULL`  | Silobase full-access API key |

## 3. Add GitHub Actions Workflow

Create the file `.github/workflows/deploy-azure.yml` in your project:

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Dependencies
        run: npm install

      - name: Build the App
        run: npm run build

      - name: Deploy to Azure
        uses: azure/webapps-deploy@v3
        with:
          app-name: <YOUR_APP_SERVICE_NAME>
          slot-name: production
          publish-profile: ${{ secrets.AZURE_CREDENTIALS }}
          package: .
```

> Replace `<YOUR_APP_SERVICE_NAME>` with the name of your Azure App Service.


## Done!

Now, every push to `main` will:

1. Install dependencies
2. Build the TypeScript code
3. Deploy your Silobase API to Azure

You can monitor the build in the **Actions** tab of your GitHub repo.

