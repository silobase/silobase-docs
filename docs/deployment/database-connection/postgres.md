# Setting Up PostgreSQL for Silobase

Silobase connects to your **existing PostgreSQL database**, whether it's hosted locally or in the cloud. Once connected, it automatically introspects your tables and exposes them as RESTful APIs — no migrations or schema setup required.


## 1. Environment Configuration

To connect Silobase to PostgreSQL, update your `.env` file with the following:

```env
DB_CLIENT=pg
DB_HOST=your-hostname-or-ip      # e.g., localhost or cloud-db.rds.amazonaws.com
DB_PORT=5432                     # Default PostgreSQL port
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
````

> `DB_CLIENT=pg` tells Silobase to use PostgreSQL as the driver.


## 2. Connect to a Local PostgreSQL Instance

If you're running PostgreSQL locally (e.g., via Homebrew, Docker, or directly installed):

```env
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=yourdb
```

Ensure the PostgreSQL server is running and listening on port `5432`.


## 3. Connect to PostgreSQL in the Cloud

Silobase works with cloud-hosted PostgreSQL services such as:

* **AWS RDS**
* **Supabase**
* **Render PostgreSQL**
* **Neon**, **ElephantSQL**, and more

Obtain the following credentials from your provider dashboard:

* Hostname / Endpoint
* Port
* Username
* Password
* Database name

### Example:

```env
DB_CLIENT=pg
DB_HOST=mydb.abcdefg.us-east-1.rds.amazonaws.com
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=securepassword
DB_NAME=silobase
```

> Be sure your database allows inbound traffic from the Silobase server (adjust **security groups**, **firewalls**, or **allowed IPs** if needed).


## 4. Test the Connection

After setting the environment variables, start the server:

```bash
npm run build && npm start
```

Visit:

```
http://localhost:3000/rest/v1/:table
```

Silobase will automatically expose all tables in your PostgreSQL database as REST endpoints.


## Best Practices

* Grant the database user only the necessary **read/write** permissions.
* Use strong credentials and avoid committing `.env` files to source control.
* For production, manage credentials securely (e.g., environment managers, secret stores).
* On cloud setups, ensure IP whitelisting or VPC rules allow access to the database from your deployed Silobase instance.

