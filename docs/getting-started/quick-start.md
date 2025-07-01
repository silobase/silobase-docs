# Quickstart (Local Setup)

Get Silobase up and running locally in just a few steps.

## 1. Clone the Repository

```bash
git clone https://github.com/silobase/silobase.git
cd Silobase
npm install
````

## 2. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=3000
DB_CLIENT=pg
DATABASE_URL=postgres://username:password@localhost:5432/yourdb

API_KEY_READ=your-read-key
API_KEY_WRITE=your-write-key
API_KEY_FULL=your-full-key
```
> **Note:** Currently, Silobase supports PostgreSQL. Support for MySQL, SQLite, and MSSQL is coming soon.


## 3. Start the Server

```bash
npm run build && npm start
```

Once running, your Silobase API will be available at `http://localhost:3000`.

## 4. Create a Test Table (or Use an Existing Table)

Before making API requests, ensure you have a table in your database. Here’s an example schema for a `users` table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT
);
```

## 5. Send a Sample Request

Silobase automatically generates RESTful endpoints for each table in your database. Here's how to insert a record using `curl`:

```bash
curl --location 'http://localhost:3000/rest/v1/users' \
  --header 'x-api-key: your-write-key' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }'
```

> Make sure the API key in `x-api-key` matches your `API_KEY_WRITE` from the `.env`.

## REST Endpoints Overview

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/rest/v1/:table`     | Create a new record |
| GET    | `/rest/v1/:table`     | Retrieve records    |
| PUT  | `/rest/v1/:table/:id` | Update a record     |
| DELETE | `/rest/v1/:table/:id` | Delete a record     |

> All requests must include a valid API key in the `x-api-key` header.

## 🔐 API Key Permissions

| Key Type | Permissions                |
| -------- | -------------------------- |
| `read`   | GET only                   |
| `write`  | POST, PUT, DELETE        |
| `full`   | Full access to all actions |

Define your keys in the `.env` file as shown above.

---

You’re now ready to build with Silobase 🚀
---

This format:
- Flows naturally from setup → configuration → usage
- Adds the **missing database schema** step developers often overlook
- Keeps everything in **one self-contained page**

