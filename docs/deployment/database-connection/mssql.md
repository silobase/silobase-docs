# Setting Up MSSQL (SQL Server) for Silobase

Silobase supports connecting to your existing **Microsoft SQL Server (MSSQL)** database — whether hosted locally or in the cloud (e.g., Azure SQL Database). Once connected, it automatically exposes your tables as RESTful APIs with no extra configuration.


##  1. Environment Configuration

To configure Silobase for MSSQL, define the following variables in your `.env` file:

```env
DB_CLIENT=mssql
DB_HOST=your-hostname-or-ip      # e.g., localhost or your-sql.database.windows.net
DB_PORT=1433                     # Default port for MSSQL
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
````

>  `DB_CLIENT=mssql` is required for SQL Server connections.

## 2. Connect to a Local MSSQL Instance

If you're running SQL Server locally (via Docker, Windows install, or SQL Server for Linux):

### Sample `.env`:

```env
DB_CLIENT=mssql
DB_HOST=localhost
DB_PORT=1433
DB_USER=sa
DB_PASSWORD=YourStrong!Passw0rd
DB_NAME=silobase
```

Make sure the MSSQL service is running and that TCP connections on port `1433` are allowed.

### Using Docker (optional)

You can run MSSQL locally using Docker:

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Passw0rd" \
  -p 1433:1433 --name mssql \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

## 3. Connect to Azure SQL or Cloud-Hosted MSSQL

To connect Silobase to a cloud-hosted MSSQL service (e.g., Azure SQL Database):

Retrieve the following from your cloud provider dashboard:

* Server name / Hostname (e.g., `your-db.database.windows.net`)
* Port (usually 1433)
* Admin username
* Password
* Database name

### Example `.env`:

```env
DB_CLIENT=mssql
DB_HOST=your-db.database.windows.net
DB_PORT=1433
DB_USER=youradmin
DB_PASSWORD=yourpassword
DB_NAME=silobase
```

> Make sure to configure firewall or network rules in your Azure portal to allow access from Silobase’s IP address or development machine.

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

