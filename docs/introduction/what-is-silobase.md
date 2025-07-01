# Introduction

## What is Silobase?

**Silobase** is an open-source Backend-as-a-Service (BaaS) project that lets you expose your own infrastructure — like databases and file storage — over a simple, RESTful HTTP API with zero backend code.

The idea started when I wanted to use Supabase for a project, but I didn’t want to be locked into a managed database. I already had a database I wanted to use — all I needed was a clean way to insert and retrieve data over HTTP.

That was the inspiration behind Silobase: a backend service that works with *your* infrastructure, not one it chooses for you.

## Key Features

- ⚙️ **Use Your Own Infrastructure**  
  Bring your own PostgreSQL, SQLite, or other databases — no vendor lock-in.

- 🌐 **Instant REST API**  
  Expose tables and endpoints instantly over HTTP using standard verbs like `GET`, `POST`, `PUT`, and `DELETE`.

- 🧩 **.env-Based Configuration**  
  Set everything up using a single `.env` file — no backend code or server logic required.

- 🗂 **Pluggable File Storage (Coming Soon)**  
  Upload and serve files via API by plugging in your own storage service.

- 📬 **Future Extensibility**  
  Plans to support email, caching, queues, and more — just connect them via `.env`.

## Architecture Overview

Silobase is designed to be minimal and infrastructure-agnostic.

```text
  [ Client App ]
        ↓ HTTP
  +---------------------+
  |     Silobase API    |
  | ------------------- |
  |  REST Handler       |
  |  Config Loader      |
  |  DB Connector       |
  |  File Gateway       |
  +---------------------+
        ↓
[ Your Database / File Storage ]
```
Everything is configured via `.env`. Once set up, you can make HTTP calls to perform CRUD operations on your database or interact with other connected services.

No custom backend code. No frameworks. Just your stack, exposed cleanly over HTTP.

## Comparison with Supabase / Firebase

| Feature                        | **Silobase** | Supabase | Firebase |
|-------------------------------|--------------|----------|----------|
| Open-source                   | ✅           | ✅        | ❌       |
| Use your own database         | ✅           | ⚠️ Limited | ❌       |
| REST API                      | ✅           | ✅        | ⚠️ Realtime DB only |
| File storage support          | 🔜 Planned   | ✅        | ✅       |
| Email / Queue integration     | 🔜 Planned   | ❌        | ✅       |
| Self-hosted, no lock-in       | ✅           | ✅        | ❌       |
| Requires backend code         | ❌           | ❌        | ❌       |

Silobase is focused on developers who want control over their stack, flexibility in how they structure infrastructure, and simplicity in how they access it.

## Supported Providers

Silobase is designed to be pluggable — bring your own infrastructure and wire it up through environment variables.

### ✅ Currently Supported

| Resource     | Provider     |
|--------------|--------------|
| Database     | PostgreSQL   |

### 🚧 Coming Soon

| Resource      | Providers                              |
|---------------|-----------------------------------------|
| Database      | MySQL, SQLite, MSSQL                   |
| File Storage  | AWS S3, Azure Blob Storage             |
| Email (Future) | SMTP, Mailgun, SendGrid (planned)     |


---

*Want to start using Silobase? Head over to the [Getting Started](/getting-started/quick-start) guide.*
