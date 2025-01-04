# Inventory Management UI

A simple inventory management system that tracks the receipt and dispatch of quantities, with automated alerts when inventory levels hit predefined thresholds.

### Overview
* [Development environment setup](#development-environment-setup)
* [Environment variables](#environment-variables)

## Development environment setup

This repository is designed to use a development container.

### Prerequisites

The prerequisites for working on this repo are:

-   Docker Desktop (MacOS, Windows) or docker engine (Linux)
-   GIT
-   VS Code
-   VS Code Extension "Remote Development"

All other prerequisites are provided by the dev container and its dependencies.

VSCode and other IDEA-based IDEs can use devcontainers to set up the development environment. Simply open the project in the IDE and choose the 'Open in Container' option to get started.

### Install dependencies

```bash
npm ci
```

### Copy env sample file

```bash
cp .env.sample .env
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Environment variables

* VITE_API_URL : Base URL of the REST API gateway
