# Configuration via `.env`

Silobase is configured entirely through environment variables, making it easy to connect to your infrastructure and deploy across different environments. Below is a complete overview of the required and upcoming configuration options available through the `.env` file.


## 🛠 Required Configuration

These are the core environment variables required to run Silobase:

```env
DB_CLIENT=pg
DATABASE_URL=postgres://user:password@host:port/database

API_KEY_READ=your-read-key
API_KEY_WRITE=your-write-key
API_KEY_FULL=your-full-key
````

### 🔑 Environment Variable Descriptions

| Variable        | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| `DB_CLIENT`     | The database driver to use. Currently supports `pg` (PostgreSQL).            |
| `DATABASE_URL`  | Full connection string to your database (e.g., PostgreSQL DSN).              |
| `API_KEY_READ`  | API key used to authorize `GET` requests (read-only access).                 |
| `API_KEY_WRITE` | API key used to authorize `POST`, `PUT`, and `DELETE` requests.            |
| `API_KEY_FULL`  | Master key with full access to all operations (read, write, update, delete). |

> ⚠️ All API requests to Silobase must include the appropriate key in the `x-api-key` header.

---

## 🚧 Coming Soon

These environment variables are planned for future releases as Silobase expands its provider support and feature set:

### 📦 Storage Configuration (Planned)

| Variable              | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `STORAGE_PROVIDER`    | Storage provider (e.g., `aws`, `azure`, `gcs`).               |
| `STORAGE_BUCKET_NAME` | Name of the storage bucket or container.                      |
| `STORAGE_ACCESS_KEY`  | Access key for the storage service.                           |
| `STORAGE_SECRET_KEY`  | Secret key or credential used to authenticate storage access. |

### 📧 Email Provider Configuration (Planned)

| Variable             | Description                                                   |
| -------------------- | ------------------------------------------------------------- |
| `EMAIL_PROVIDER`     | Email service provider (e.g., `resend`, `mailgun`, `smtp`).   |
| `EMAIL_API_KEY`      | API key or SMTP credentials for sending transactional emails. |
| `EMAIL_FROM_ADDRESS` | Default "from" email address for outgoing messages.           |

---

## ✅ Best Practices

* **Never commit `.env` files to version control.** Use `.env.example` to provide a safe template.
* **Use strong, unique API keys** for each permission level.
* **Scope keys appropriately** in production to limit exposure and follow the principle of least privilege.
* **Use secrets management tools** (e.g., GitHub Actions secrets, Docker secrets, Vault) in CI/CD pipelines.

---

## Example `.env` Template

```env
# Database
DB_CLIENT=pg
DATABASE_URL=postgres://postgres:password@localhost:5432/mydb

# API Keys
API_KEY_READ=read-only-key
API_KEY_WRITE=write-access-key
API_KEY_FULL=admin-master-key
```

---

Silobase’s environment-first design enables you to stay backendless and flexible — just plug in your infrastructure and start building with clean HTTP APIs.

