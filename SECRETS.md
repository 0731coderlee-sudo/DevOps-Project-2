# Required Environment Variables & Secrets

This document lists the environment variables and secrets required for the CI/CD pipeline and the application to run.

## GitHub Secrets
These secrets should be added to your GitHub Repository settings under **Secrets and variables > Actions**.

| Secret Name | Description | Example Value |
| :--- | :--- | :--- |
| `DOCKERHUB_USERNAME` | Your DockerHub username. | `johndoe` |
| `DOCKERHUB_TOKEN` | Your DockerHub access token (must have **Read & Write** permissions). | `dckr_pat_...` |
| `VPS_IP` | The IP address of your VPS. | `192.168.1.100` |
| `VPS_USER` | The SSH username for your VPS. | `root` or `ubuntu` |
| `VPS_PASSWORD` | The password to access your VPS. | `mypassword123` |

## Application Environment Variables
These variables are used by the application (Frontend/Backend) and can be defined in `.env` files or Docker Compose.

### Backend (`backend/.env`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `FLASK_ENV` | The environment to run the app in. | `development` |
| `PORT` | The port the backend runs on. | `5000` |

### Frontend (`frontend/.env.local`)
| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | The URL of the backend API (for client-side calls if not proxied). | `http://localhost:5000` |
