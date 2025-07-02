# CI/CD with GitHub Actions (AWS Elastic Beanstalk)

Set up continuous deployment of Silobase to **AWS Elastic Beanstalk** using **GitHub Actions**. This ensures that every push to your `main` branch will automatically trigger a build and deployment.

## Prerequisites

* You have an existing Elastic Beanstalk environment running for Silobase (Node.js platform)
* You have the AWS CLI installed and configured locally
* Your Silobase project includes a `package.json` and `server.js` file


## 1. Create an IAM User for GitHub Actions

Create a user in AWS IAM with programmatic access and assign it the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "elasticbeanstalk:*",
        "ec2:*",
        "elasticloadbalancing:*",
        "autoscaling:*",
        "cloudwatch:*",
        "s3:*"
      ],
      "Resource": "*"
    }
  ]
}
```

Save the **Access Key ID** and **Secret Access Key**.


## 2. Add GitHub Repository Secrets

In your GitHub repo, go to:

> **Settings → Secrets → Actions**

Add the following secrets:

| Secret Name             | Value                           |
| ----------------------- | ------------------------------- |
| `AWS_ACCESS_KEY_ID`     | From the IAM user above         |
| `AWS_SECRET_ACCESS_KEY` | From the IAM user above         |
| `AWS_REGION`            | e.g., `us-east-1`               |
| `EB_APP_NAME`           | Your Elastic Beanstalk app name |
| `EB_ENV_NAME`           | Your Beanstalk environment name |

Optionally add secrets for your `.env` if you inject them via GitHub Actions (e.g., `DB_HOST`, `API_KEY_READ`, etc.).


## 3. Create `.elasticbeanstalk/config.yml`

If not already present, run:

```bash
eb init
```

This creates a `.elasticbeanstalk/config.yml` with your Beanstalk configuration. Example:

```yaml
global:
  application_name: silobase
  default_region: us-east-1
  environment_name: silobase-env
  platform: Node.js 20
  branch: main
```

## 4. Add GitHub Actions Workflow

Create a file at `.github/workflows/deploy-eb.yml`:

```yaml
name: Deploy to AWS Elastic Beanstalk

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Zip source code
        run: zip -r deploy.zip . -x '*.git*'

      - name: Deploy to Elastic Beanstalk
        uses: einaregilsson/beanstalk-deploy@v21
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: ${{ secrets.EB_APP_NAME }}
          environment_name: ${{ secrets.EB_ENV_NAME }}
          region: ${{ secrets.AWS_REGION }}
          version_label: ${{ github.sha }}
          deployment_package: deploy.zip
```

## Done!

Your `main` branch is now wired to automatically deploy Silobase to AWS Elastic Beanstalk. Push to `main` and GitHub Actions will:

1. Build your app
2. Package it
3. Deploy it to your Beanstalk environment

