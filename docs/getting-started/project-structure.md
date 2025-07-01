# Project Structure

Silobase follows a modular and extensible architecture designed for clarity, maintainability, and scalability. Below is a detailed breakdown of the project’s layout and the responsibilities of each component.

## Directory Overview
```

silobase/
├── .env.example             # Sample environment file for configuration
├── server.ts                # Application entry point
├── src/
│   ├── app.ts               # Core application setup (plugins, routes, middleware)
│
│   ├── config/              # Environment and runtime configuration loaders
│
│   ├── auth/
│   │   ├── authPlugin.ts    # Fastify plugin for API key authentication
│   │   └── dbPlugin.ts      # Fastify plugin for database setup using Knex
│
│   ├── routes/
│   │   └── crudRoute.ts     # Route definitions for CRUD operations
│
│   ├── service/
│   │   └── crudService.ts   # Core logic for interacting with the database
│
│   ├── types/
│   │   ├── fastify.d.ts     # Custom type extensions for Fastify context
│   │   └── responseType.ts  # Generic types for API responses
│
│   └── utils/
│       └── buildQueryFilters.ts # Query parser for transforming client queries into SQL

```


---

## File and Directory Descriptions

### `.env.example`
A template for defining environment variables required to run the application. Includes database credentials, port configuration, and API keys.

---

### `server.ts`
The top-level entry point that bootstraps and starts the Fastify application by invoking the setup logic defined in `app.ts`.

---

### `src/app.ts`
Handles core server setup:
- Registers routes and plugins
- Configures CORS, logging, and error handling
- Initializes core middleware and application lifecycle hooks

---

### `src/config/`
Responsible for loading and validating environment variables (e.g., database connection strings, API keys) to ensure the runtime environment is correctly configured.

---

### `src/auth/`

#### `authPlugin.ts`
Implements a Fastify plugin for authenticating API requests using static API keys provided via the `x-api-key` header.

#### `dbPlugin.ts`
Initializes a Knex database client using values from the `.env` file and attaches it to the Fastify instance for use across the application.

---

### `src/routes/crudRoute.ts`
Defines RESTful routes for CRUD operations on any table configured in the connected database. Each route maps to an HTTP verb (POST, GET, PUT, DELETE) and delegates logic to the service layer.

---

### `src/service/crudService.ts`
Implements the business logic for creating, reading, updating, and deleting records. This service communicates directly with the database via Knex and applies any necessary query transformations or validations.

---

### `src/utils/buildQueryFilters.ts`
Provides utility functions to transform incoming HTTP query parameters (e.g., filters, sort, pagination) into SQL-compatible instructions that Knex can execute.

---

### `src/types/`

#### `fastify.d.ts`
Extends native Fastify types to include additional application-specific context, such as authenticated API keys or shared services.

#### `responseType.ts`
Defines reusable, typed response formats to enforce consistency and type safety across endpoints.

---

## Summary

The Silobase project structure emphasizes clear separation of concerns:

- **Configuration** is isolated for flexibility and environment portability.
- **Authentication and database plugins** are encapsulated for modularity.
- **Route and service layers** follow a clean abstraction pattern, promoting testability and maintainability.
- **Type definitions and utilities** ensure robustness across the application.

This structure enables contributors to onboard quickly and build confidently while providing users with a performant, configurable Backend-as-a-Service.

