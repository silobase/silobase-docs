# Setting Up MySQL for Silobase

Silobase supports connecting to your existing (or new) **MySQL** database — whether hosted locally or in the cloud (e.g., AWS MySQL Database). Once connected, it automatically exposes your tables as RESTful APIs with no extra configuration.


##  1. Environment Configuration

To configure Silobase for MySQL, define the following variables in your `.env` file:

```env
DB_CLIENT=mysql
DB_HOST=your-hostname-or-ip      # e.g., localhost or mysqltest.<cloud-url>.rds.amazonaws.com
DB_PORT=3306                     # use Default port for MySQL 
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
````

>  `DB_CLIENT=mysql` is required for SQL Server connections.

## 2. Connect to a Local MySQL Instance

If you're running SQL Server locally (via Docker, Windows install, or SQL Server for Linux):

### Sample `.env`:

```env
DB_CLIENT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=            # (fill this in if your root user has a password)
DB_NAME=silobase
```

>Make sure the MySQL service is running and that TCP connections on port `3306` are allowed.

### Using Docker (optional)

You can run MySQL locally using Docker:

> Install Docker from (here)[https://www.docker.com/] 

```bash
docker run -d \
  --name mysql \
  -e MYSQL_ROOT_PASSWORD=<root_password> \
  -e MYSQL_DATABASE=<database_name> \
  -e MYSQL_USER=<database_user> \
  -e MYSQL_PASSWORD=<database_password> \
  -p 3306:3306 \
  mysql:8.0

```

## 3. Connect to a Cloud-Hosted MySQL

To connect Silobase to a cloud-hosted MySQL service (e.g., Azure MySQL Database, AWS MySQL Database):

Retrieve the following from your cloud provider dashboard:

* Server name / Hostname (e.g., `your-db.database.windows.net`)
* Port (usually 3306)
* Admin username
* Password
* Database name

### Example `.env`:

```env
DB_CLIENT=mysql
DB_HOST=your-db.database.windows.net
DB_PORT=3306
DB_USER=youradmin
DB_PASSWORD=yourpassword
DB_NAME=silobase
```

> Make sure to configure firewall or network rules in your Azure/AWS portal to allow access from Silobase’s IP address or development machine.

## 4. Test the Connection

Once your credentials are in place, start Silobase:

```bash
npm run build && npm start
```

Then navigate to:

```
http://localhost:3000/rest/v1/:table
```

Silobase will auto-detect your existing tables and serve them through a secure REST API.

## Best Practices

* Ensure your database user has at least **read/write** permissions to the required tables.
* Avoid using the default `sa` account in production environments.
* Use strong passwords and never commit credentials to version control.
* Consider securing production secrets via environment managers or cloud secrets managers.
* When using Any Cloud Provider, configure **firewall rules** to whitelist the Silobase deployment origin.

