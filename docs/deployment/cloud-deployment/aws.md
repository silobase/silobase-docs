# Deploying Silobase to AWS

You can deploy Silobase to AWS using a variety of services, including **Elastic Beanstalk**, **EC2**, or **App Runner**. This guide provides a simple deployment approach using **Elastic Beanstalk** for running Node.js applications in a managed environment.

> Silobase is a backend-only app. You'll need access to a PostgreSQL or MSSQL database — either hosted on AWS (like RDS or Azure SQL) or externally.


## 1. Prepare Your Project

Make sure your project is production-ready:

- Build the app:

```bash
npm run build
````

* Create a `Procfile` in your root directory:

```
web: npm start
```

* Ensure your `package.json` has the correct `start` script:

```json
"scripts": {
  "start": "node server.js",
  "build": "tsc -p tsconfig.json"
}
```

* Confirm `.env` is configured with production database credentials:

```env
DB_CLIENT=pg
DB_HOST=your-db-endpoint.amazonaws.com
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=yourpassword
DB_NAME=silobase

API_KEY_READ=your-read-key
API_KEY_WRITE=your-write-key
API_KEY_FULL=your-full-key
```

> Do **not** commit `.env` to Git. Use Elastic Beanstalk environment variables instead (see below).

---

## 2. Deploy Using Elastic Beanstalk

### Step 1: Install EB CLI

```bash
pip install awsebcli --upgrade
```

Authenticate with your AWS credentials:

```bash
aws configure
```

### Step 2: Initialize Beanstalk App

From your project root:

```bash
eb init
```

* Select your AWS region
* Choose `Node.js` as your platform
* Create a new application or choose an existing one

### Step 3: Create Environment and Deploy

```bash
eb create silobase-env --instance_type t2.micro
```

Once created:

```bash
eb deploy
```

---

## 3. Set Environment Variables in AWS

After deploying, configure your database and API keys as environment variables:

```bash
eb setenv DB_CLIENT=pg DB_HOST=... DB_PORT=5432 DB_USER=... DB_PASSWORD=... DB_NAME=...
eb setenv API_KEY_READ=... API_KEY_WRITE=... API_KEY_FULL=...
```

Or do this from the AWS Console:

* Go to **Elastic Beanstalk → Your Environment → Configuration → Software**
* Add your `.env` variables under **Environment Properties**

---

## 4. Verify Deployment

Visit your Beanstalk environment URL:

```
https://<your-env>.elasticbeanstalk.com/rest/v1/:table
```

Try a basic GET request with `x-api-key`:

```bash
curl --location --request GET 'https://your-env.elasticbeanstalk.com/rest/v1/users' \
  --header 'x-api-key: your-read-key'
```

---

## Notes

* Make sure your RDS or MSSQL instance is accessible from the Elastic Beanstalk network (adjust security groups).
* Logs can be checked via:

```bash
eb logs
```

* To redeploy changes:

```bash
npm run build
eb deploy
```

