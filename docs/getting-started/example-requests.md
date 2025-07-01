# Example Requests (cURL & Postman)

Silobase automatically generates RESTful endpoints based on your database schema. This section demonstrates how to interact with the API using **cURL** and **Postman**, with the assumption that a valid database and tables already exist.

> 🧠 **Pre-requisite**: Ensure your database is configured and running, and contains the appropriate tables. For the following examples, we'll use a sample `users` table with the following schema:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT
);
````

> 🔐 All requests must include a valid API key in the `x-api-key` header. Keys are defined in your `.env` file.

## Create a Record

**Endpoint:** `POST /rest/v1/:table`

Creates a new record in the specified table.

### Example (cURL)

```bash
curl --location 'http://localhost:3000/rest/v1/users' \
  --header 'x-api-key: <API_KEY_WRITE>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "admin"
  }'
```

## Retrieve Records

**Endpoint:** `GET /rest/v1/:table`

Supports filtering, pagination, and deep joins using query parameters.

### Example (cURL)

```bash
curl --location --request GET 'http://localhost:3000/rest/v1/users?join=students:on=users.id=students.user_id&join=enrollments:on=students.id=enrollments.student_id&role=eq.admin' \
  --header 'x-api-key: <API_KEY_READ>' \
  --header 'Content-Type: application/json'
```

## Update a Record

**Endpoint:** `PUT /rest/v1/:table/:id`

Updates specific fields of a record by ID.

### Example (cURL)

```bash
curl --location --request PUT 'http://localhost:3000/rest/v1/users/1' \
  --header 'x-api-key: <API_KEY_WRITE>' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "role": "editor"
  }'
```


## Delete a Record

**Endpoint:** `DELETE /rest/v1/:table/:id`

Deletes a record by ID from the specified table.

### Example (cURL)

```bash
curl --location --request DELETE 'http://localhost:3000/rest/v1/users/6' \
  --header 'x-api-key: <API_KEY_WRITE>'
```


## Using Postman

You can also test Silobase endpoints in Postman. Here’s how:

1. **Set the request URL**: `http://localhost:3000/rest/v1/:table`
2. **Choose HTTP method**: `GET`, `POST`, `PUT`, or `DELETE`
3. **Set Headers**:

   ```
   Key: x-api-key
   Value: <YOUR_API_KEY>
   ```
4. **Set Body (if applicable)**:

   * Go to the **Body** tab
   * Choose `raw` and select `JSON`
   * Paste your request payload


## API Key Permissions

| Key Type | Allowed Methods           |
| -------- | ------------------------- |
| `read`   | `GET`                     |
| `write`  | `POST`, `PUT`, `DELETE` |
| `full`   | All operations            |

> Define your keys in the `.env` file during configuration.


## Next Steps

* Build your frontend or connect tools like Zapier, Retool, or custom dashboards.
* Secure your deployment for production use.
* Explore joins, filters, and advanced querying.

Silobase lets you focus on your product, not boilerplate backend code.
