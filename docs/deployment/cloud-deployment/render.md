# Deploying Silobase to Render

[Render](https://render.com) is a developer-friendly cloud platform that simplifies backend deployments. You can run Silobase on Render in minutes by pointing to your Git repository and configuring environment variables.


## Prerequisites

- A [Render account](https://render.com)
- A GitHub (or GitLab) repository containing your Silobase project
- Access to an existing database (PostgreSQL or MSSQL)


## Step 1: Create a Web Service

1. Log in to your Render dashboard.
2. Click **“New” → “Web Service”**
3. Connect your GitHub repository containing Silobase.
4. Configure the following settings:

   | Setting            | Value                        |
   |--------------------|------------------------------|
   | **Name**           | `silobase` (or your choice)  |
   | **Environment**    | `Node`                       |
   | **Build Command**  | `npm install && npm run build`              |
   | **Start Command**  | `npm run serve`                  |
   | **Region**         | Closest to your database     |


## Step 2: Add Environment Variables

In the “Environment” section of the Render service, add the following variables to connect to your database and secure the API:

```env
DB_CLIENT=pg           # or 'mssql'
DB_HOST=your-db-host
DB_PORT=5432           # or 1433 for MSSQL
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

API_KEY_READ=your-read-key
API_KEY_WRITE=your-write-key
API_KEY_FULL=your-full-key
````

> Render automatically provides `PORT`, which Silobase reads from `process.env.PORT`. No need to set it manually.


## Step 3: Deploy

Click **“Create Web Service”**. Render will:

* Clone your repo
* Install dependencies
* Build the project
* Start the server

Once the deployment is complete, you’ll get a public URL like:

```
https://silobase.onrender.com
```


## Test the Deployment

Use `curl` or Postman to confirm everything is working:

```bash
curl https://silobase.onrender.com/rest/v1/users \
  -H "x-api-key: your-read-key"
```

You should receive JSON output from your database.


## Notes

* Ensure your database allows external connections from Render’s IPs.
* If you’re using a private DB (e.g., AWS RDS, Azure SQL), update firewall or VPC rules accordingly.
