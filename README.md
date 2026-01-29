# DevOps Project 2

> Full-Stack Web Application with Automated CI/CD Pipeline and Infrastructure as Code

A comprehensive hands-on DevOps project demonstrating real-world CI/CD automation, containerization, and infrastructure management using Jenkins, Docker, Ansible, and Nginx.

![Project Banner](https://img.shields.io/badge/DevOps-Project%202-blue?style=for-the-badge&logo=jenkins)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![Python](https://img.shields.io/badge/Python-Flask-yellow?style=flat-square&logo=python)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square&logo=docker)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-red?style=flat-square&logo=jenkins)
![Ansible](https://img.shields.io/badge/Ansible-Infrastructure-black?style=flat-square&logo=ansible)

## Table of Contents

- [About This Project](#about-this-project)
- [Technologies Used](#technologies-used)
- [Techniques & Concepts](#techniques--concepts)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
  - [Jenkins Installation](#jenkins-installation)
  - [Plugin Configuration](#plugin-configuration)
  - [Credentials Management](#credentials-management)
  - [Pipeline Configuration](#pipeline-configuration)
- [Deployment](#deployment)
- [Verification](#verification)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [License](#license)
- [Author](#author)

---

## About This Project

This project is built for **learning DevOps** through hands-on experience with industry-standard tools and real-world workflows. It demonstrates how to build, deploy, and maintain a full-stack web application using automated CI/CD pipelines, containerization, and infrastructure as code.

**What You'll Learn:**
- Setting up a complete CI/CD pipeline with Jenkins
- Implementing chained pipeline architecture for separation of concerns
- Containerizing applications with Docker and Docker Compose
- Automating infrastructure configuration with Ansible
- Managing SSL certificates with Let's Encrypt
- Setting up reverse proxy with Nginx
- Implementing monitoring with Prometheus and Grafana

**Live Demo:** [https://devops2.himanmanduja.fun](https://devops2.himanmanduja.fun)  
**GitHub Repository:** [https://github.com/HimanM/DevOps-Project-2](https://github.com/HimanM/DevOps-Project-2)  
**Docker Hub:**
- Frontend: [himanm/devops-project-2-frontend](https://hub.docker.com/r/himanm/devops-project-2-frontend)
- Backend: [himanm/devops-project-2-backend](https://hub.docker.com/r/himanm/devops-project-2-backend)

---

## Technologies Used

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS, Shadcn UI
- **Animation**: Framer Motion
- **Deployment**: Docker container (port 3000)

### Backend
![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)

- **Framework**: Python Flask
- **API**: RESTful endpoints with Prometheus metrics
- **Deployment**: Docker container (port 5000)

### DevOps & Infrastructure
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![Ansible](https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)

- **Containerization**: Docker, Docker Compose
- **CI/CD**: Jenkins (chained pipelines)
- **Configuration Management**: Ansible
- **Reverse Proxy**: Nginx (port 80 → 57002)
- **SSL**: Let's Encrypt (Certbot)
- **Monitoring**: Prometheus, Grafana

---

## Techniques & Concepts

This project demonstrates the following DevOps techniques and best practices:

- **Chained Pipeline Architecture**: Separate Jenkins jobs for CI, CD, and Infrastructure, with automatic triggering between stages
- **Continuous Integration (CI)**: Automated linting, testing, building, and Docker image publishing on every code commit
- **Continuous Deployment (CD)**: Automated deployment to production VPS triggered by successful CI builds
- **Infrastructure as Code (IaC)**: Ansible playbooks for automated Nginx and SSL configuration
- **Containerization**: Docker containers for consistent development and production environments
- **Docker Compose Orchestration**: Multi-container application management
- **Automated SSL Management**: Let's Encrypt certificate generation and renewal
- **Reverse Proxy Configuration**: Nginx for routing and load balancing
- **Monitoring & Observability**: Prometheus metrics collection and Grafana dashboards
- **Secret Management**: Jenkins credentials for secure handling of sensitive data
- **Git-based Workflows**: SCM integration with automatic pipeline triggers

---

## Architecture

The project implements a multi-stage CI/CD pipeline with automated infrastructure provisioning and deployment.

### Infrastructure Flow

The complete workflow from code commit to production deployment:

1. **Code Push**: Developer commits code to GitHub repository
2. **CI Pipeline (DevOps-CI)**: Jenkins detects changes via webhook, runs linting and tests, builds Docker images, and pushes to Docker Hub
3. **CD Trigger**: Successful CI build automatically triggers the CD pipeline
4. **CD Pipeline (DevOps-CD)**: Jenkins connects to VPS via SSH, pulls latest images, and restarts containers
5. **Infrastructure Setup (DevOps-InitDomain)**: Ansible configures Nginx reverse proxy and SSL certificates (manual trigger for initial setup)

### Pipeline Architecture

This project uses a **chained pipeline architecture** with three distinct Jenkins jobs that work together:

#### 1. DevOps-CI (`Jenkinsfile`)

**Purpose**: Continuous Integration - builds and publishes Docker images

**Trigger**: GitHub webhook on push to main branch

**Stages**:
1. **Checkout**: Pulls source code from GitHub
2. **Code Quality**: Runs ESLint on frontend code
3. **Unit Tests**: Executes pytest for backend validation
4. **Build Docker Images**: Builds frontend and backend containers
5. **Push to DockerHub**: Publishes images to Docker Hub registry
6. **Trigger CD**: Automatically triggers DevOps-CD on success

**Jenkinsfile Path**: `Jenkinsfile`

#### 2. DevOps-CD (`Jenkinsfile.deploy`)

**Purpose**: Continuous Deployment - deploys application to production VPS

**Trigger**: Upstream job (DevOps-CI) success

**Stages**:
1. **SSH Connection**: Establishes connection to VPS
2. **Prepare Environment**: Creates project directory structure
3. **Pull Images**: Downloads latest Docker images from registry
4. **Deploy**: Executes `docker compose up -d` to restart services

**Jenkinsfile Path**: `Jenkinsfile.deploy`

#### 3. DevOps-InitDomain (`Jenkinsfile.initdomain`)

**Purpose**: Infrastructure as Code - configures web server and SSL

**Trigger**: Manual (one-time setup or domain changes)

**Stages**:
1. **Install Ansible**: Ensures Ansible is available on Jenkins agent
2. **Run Playbook**: Executes Ansible configuration
3. **Configure Nginx**: Sets up reverse proxy (port 80 → 57002)
4. **SSL Certificates**: Generates Let's Encrypt certificates for HTTPS

**Jenkinsfile Path**: `Jenkinsfile.initdomain`

---

## Prerequisites

Before setting up this project, ensure you have the following:

### For Local Development
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Node.js**: Version 18 or higher (for local frontend development)
- **Python**: Version 3.9 or higher (for local backend development)
- **Git**: For cloning the repository

### For Production Deployment
- **VPS/Server**: Ubuntu 20.04 or higher with root access
- **Jenkins**: For CI/CD automation (installation covered below)
- **Docker Hub Account**: For storing Docker images
- **Domain Name**: For SSL certificate (optional but recommended)

---

## Getting Started

Follow these steps to clone and replicate this project on your local machine or server.

### Step 1: Clone the Repository

First, clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/HimanM/DevOps-Project-2.git
cd DevOps-Project-2
```

> This command downloads the entire project including all source code, Dockerfiles, Jenkinsfiles, and Ansible playbooks.

### Step 2: Local Development Setup

Start all services using Docker Compose for local testing:

```bash
docker compose -f docker-compose.local.yml up --build
```

> The `--build` flag rebuilds images to include any local changes. This command starts the frontend and backend services in containers for testing.

### Step 3: Access the Application

Once the containers are running, access the services:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

> [!NOTE]
> The first startup may take a few minutes as Docker downloads base images and installs dependencies.

> [!NOTE]
> The monitoring services (Prometheus and Grafana) are commented out in the docker-compose files by default. To enable them, uncomment the monitoring sections in `docker-compose.yml`.

---

## Setup Instructions

This section provides detailed step-by-step instructions for setting up the complete CI/CD pipeline with Jenkins.

### Jenkins Installation

Follow these steps to install Jenkins on Ubuntu/Debian systems.

> [!IMPORTANT]
> The Jenkins machine must have **Node.js (npm)** and **Python (pip)** installed to run frontend linting and backend tests in the CI pipeline. These are installed in Steps 2 and 3 below.

#### Step 1: Install Java

Jenkins requires Java Runtime Environment. OpenJDK 17 is recommended.

```bash
sudo apt update
sudo apt install fontconfig openjdk-17-jre
java -version
```

**What this does**: Updates package lists and installs OpenJDK 17, which is the Java runtime required by Jenkins. The final command verifies the installation.

#### Step 2: Install Node.js and npm

Required for frontend linting in the CI pipeline.

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

**What this does**: Downloads and runs the NodeSource setup script to add Node.js 18.x repository, installs Node.js and npm, then verifies the installation. This is essential for running ESLint on the frontend code during CI builds.

#### Step 3: Install Python and pip

Required for backend testing in the CI pipeline.

```bash
sudo apt install python3 python3-pip -y
python3 --version
pip3 --version
```

**What this does**: Installs Python 3 and pip (Python package manager), then verifies the installation. This is required for running pytest on the backend code during CI builds.

#### Step 4: Add Jenkins Repository

```bash
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/" | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
```

**What this does**: Downloads the Jenkins GPG key for package verification and adds the official Jenkins Debian repository to your system's sources list. This ensures you get the latest stable Jenkins version.

#### Step 5: Install Jenkins

```bash
sudo apt-get update
sudo apt-get install jenkins
```

**What this does**: Refreshes the package list to include Jenkins packages from the newly added repository, then installs Jenkins along with its dependencies.

#### Step 6: Start Jenkins Service

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```

**What this does**: Enables Jenkins to start automatically on system boot, starts the Jenkins service immediately, and displays its current status to verify it's running correctly.

#### Step 7: Unlock Jenkins

Retrieve the initial admin password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

**What this does**: Displays the auto-generated admin password needed for first-time Jenkins setup.

Navigate to `http://<your-server-ip>:8080` and enter the password to complete the initial setup wizard. Install the suggested plugins when prompted.

---

### Plugin Configuration

Navigate to **Manage Jenkins > Plugins > Available Plugins** and install the following:

| Plugin Name | Purpose |
|------------|---------|
| **Docker** | Build and manage Docker containers in Jenkins pipelines |
| **Docker Pipeline** | Enables using Docker commands in pipeline scripts |
| **NodeJS** | Provides Node.js and npm for frontend linting (if not using Docker agent) |
| **Pipeline: Stage View** | Visualize pipeline execution stages in the UI |
| **Ansible** | Execute Ansible playbooks from Jenkins (optional) |
| **SSH Agent** | Enables SSH credentials for remote server deployment |

After installation, restart Jenkins if prompted.

> [!NOTE]
> The Docker and Docker Pipeline plugins are essential for this project as all build and deployment steps use Docker containers.

---

### Credentials Management

Navigate to **Manage Jenkins > Credentials > System > Global credentials (unrestricted)**.

Create the following credentials:

| ID | Kind | Description | Example Value |
|----|------|-------------|---------------|
| `dockerhub-username` | Username with password | Docker Hub authentication | Username: `himanm`<br>Password: `<access-token>` |
| `vps-credentials` | Username with password | VPS SSH access | Username: `root`<br>Password: `<server-password>` |
| `vps-ip` | Secret text | VPS IP address | `165.22.54.216` |
| `DEVOPS2_DOMAIN` | Secret text | Domain name | `devops2.himanmanduja.fun` |

> [!IMPORTANT]
> For Docker Hub, use an **Access Token** instead of your password. Generate one at [Docker Hub Security Settings](https://hub.docker.com/settings/security). This is more secure and can be easily revoked if compromised.

> [!NOTE]
> Ensure the VPS user has Docker permissions by running: `sudo usermod -aG docker <username>` and then log out and back in for the changes to take effect.

---

### Pipeline Configuration

#### Creating DevOps-CI Pipeline

Create the Continuous Integration pipeline that builds and publishes Docker images:

1. Click **New Item** in Jenkins dashboard
2. Enter name: `DevOps-CI`
3. Select **Pipeline** and click OK
4. Under **Pipeline** section:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/HimanM/DevOps-Project-2.git` (or your fork)
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile`
5. Click **Save**

**What this does**: Creates a pipeline that pulls the `Jenkinsfile` from your repository and executes it. This pipeline runs linting, tests, builds Docker images, pushes them to Docker Hub, and triggers the CD pipeline.

---

#### Creating DevOps-CD Pipeline

Create the Continuous Deployment pipeline that deploys to your VPS:

1. Click **New Item** in Jenkins dashboard
2. Enter name: `DevOps-CD`
3. Select **Pipeline** and click OK
4. Under **Build Triggers**:
   - Check **Build after other projects are built**
   - Projects to watch: `DevOps-CI`
   - Trigger only if build is stable
5. Under **Pipeline** section:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/HimanM/DevOps-Project-2.git` (or your fork)
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile.deploy`
6. Click **Save**

**What this does**: Creates a pipeline that automatically runs when DevOps-CI completes successfully. It connects to your VPS via SSH, pulls the latest Docker images, and restarts the containers with the new versions.

---

#### Creating DevOps-InitDomain Pipeline

Create the Infrastructure as Code pipeline for Nginx and SSL setup:

1. Click **New Item** in Jenkins dashboard
2. Enter name: `DevOps-InitDomain`
3. Select **Pipeline** and click OK
4. Under **Pipeline** section:
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/HimanM/DevOps-Project-2.git` (or your fork)
   - **Branch**: `*/main`
   - **Script Path**: `Jenkinsfile.initdomain`
5. Click **Save**

**What this does**: Creates a pipeline that runs Ansible playbooks to configure Nginx reverse proxy and generate Let's Encrypt SSL certificates. This is typically run once during initial setup or when changing domain names.

---

## Deployment

### Initial Setup

Follow these steps to deploy the application to production:

#### Step 1: Run Infrastructure Pipeline

Manually trigger the `DevOps-InitDomain` job in Jenkins:

```bash
# From Jenkins UI: Click on DevOps-InitDomain > Build Now
```

**What this does**: Executes Ansible playbooks to configure Nginx as a reverse proxy and generates Let's Encrypt SSL certificates for HTTPS. This is a one-time setup unless you change domain names.

> [!NOTE]
> Before running this pipeline, ensure your domain's DNS A record points to your VPS IP address.

#### Step 2: Trigger CI Pipeline

Push code to the GitHub repository to trigger the CI pipeline automatically via webhook:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

**What this does**: GitHub webhook notifies Jenkins of the push, which triggers the DevOps-CI pipeline. The pipeline runs linting, tests, builds Docker images, and pushes them to Docker Hub.

Alternatively, you can manually trigger the `DevOps-CI` job from the Jenkins UI by clicking **Build Now**.

#### Step 3: Automatic Deployment

Upon successful CI build, the `DevOps-CD` pipeline automatically triggers and deploys to your VPS.

**What this does**: Jenkins connects to your VPS via SSH, pulls the latest Docker images from Docker Hub, and runs `docker compose up -d` to start/restart the containers with the new images.

---

## Verification

After deployment, verify that the application is running correctly:

### Step 1: Check Container Status

SSH into your VPS and verify all containers are running:

```bash
# SSH into VPS
ssh root@<vps-ip>

# Check running containers
docker ps

# Expected output should show containers for:
# - frontend (port 57002 mapped to 3000)
# - backend (port 5000)
```

**What this does**: Lists all running Docker containers to ensure the deployment was successful.

> [!NOTE]
> The monitoring services (Prometheus and Grafana) are commented out by default. If you enabled them in your docker-compose.yml, you'll also see those containers.

### Step 2: View Container Logs

Check logs for any errors:

```bash
# View frontend logs
docker logs devops-project-2-frontend-1

# View backend logs
docker logs devops-project-2-backend-1

# View Nginx logs (if configured)
sudo tail -f /var/log/nginx/access.log
```

**What this does**: Displays real-time logs from the containers to troubleshoot any startup or runtime issues.

### Step 3: Test Application Endpoints

Test the application from your local machine:

```bash
# Test frontend (via domain with SSL)
curl -I https://your-domain.com

# Test backend API
curl https://your-domain.com/api/data

# Test backend metrics
curl https://your-domain.com/metrics
```

**What this does**: Verifies that the application is accessible via HTTPS and the API endpoints are responding correctly.

### Step 4: Access Monitoring Stack (Optional)

If you enabled the monitoring services in docker-compose.yml:

- **Grafana Dashboard**: `http://<vps-ip>:3001` (credentials: admin/admin)
- **Prometheus Metrics**: `http://<vps-ip>:9090`

> [!NOTE]
> The monitoring services are commented out by default. To enable them, uncomment the prometheus and grafana sections in `docker-compose.yml` and redeploy.

---

## Screenshots

### Jenkins Dashboard and Job View

![Jenkins Dashboard](./docs/images/jenkins_dashboard.png)
*Jenkins dashboard showing all three pipeline jobs*

![Jenkins Job View](./docs/images/jenkins_job_view.png)
*Overview of Jenkins jobs with build history*

### Pipeline Visualizations

![Jenkins Pipeline Stage View](./docs/images/jenkins_pipeline_stage_view.png)
*CI Pipeline stages showing the complete build workflow*

![Jenkins CD Pipeline](./docs/images/jenkins_cd_pipeline.png)
*CD Pipeline stages showing deployment workflow*

![Jenkins Infrastructure Pipeline](./docs/images/jenkins_infra_pipeline.png)
*Infrastructure Pipeline stages showing Ansible configuration*

### Pipeline Configurations

![Jenkins CI Configuration](./docs/images/jenkins_config.png)
*DevOps-CI pipeline configuration with SCM settings*

![Jenkins CD Configuration](./docs/images/jenkins_cd_config.png)
*DevOps-CD pipeline configuration with upstream trigger*

![Jenkins Infrastructure Configuration](./docs/images/jenkins_infra_config.png)
*DevOps-InitDomain pipeline configuration*

### Credentials Setup

![Jenkins Credentials](./docs/images/jenkins_credentials.png)
*Jenkins credentials management showing required secrets*

---

## Monitoring Stack

The project includes a pre-configured monitoring stack for observability (currently commented out by default).

### Enabling Monitoring

To enable Prometheus and Grafana monitoring:

1. Uncomment the `prometheus` and `grafana` services in `docker-compose.yml`
2. Redeploy the application with `docker compose up -d`

### Prometheus

- **URL**: `http://<vps-ip>:9090`
- **Configuration**: `monitoring/prometheus.yml`
- **Metrics Endpoint**: Backend exposes metrics at `/metrics`
- **Targets**: Monitors backend Flask application

### Grafana

- **URL**: `http://<vps-ip>:3001`
- **Default Credentials**: `admin` / `admin`
- **Data Source**: Pre-configured Prometheus connection
- **Dashboards**: Import from `monitoring/grafana/dashboards/`

> [!NOTE]
> Remember to change the default Grafana admin password after first login for security.

---

## Troubleshooting

### Common Issues and Solutions

#### Docker Permission Denied

**Error**: `permission denied while trying to connect to the Docker daemon socket`

**Cause**: The Jenkins user doesn't have permission to access the Docker daemon.

**Solution**:
```bash
# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins service to apply changes
sudo systemctl restart jenkins
```

**What this does**: Grants the Jenkins user permission to run Docker commands without sudo.

---

#### SSH Host Key Verification Failed

**Error**: `Host key verification failed`

**Cause**: SSH strict host key checking prevents connection to unknown hosts.

**Solution**: The pipelines use `-o StrictHostKeyChecking=no` to bypass this. If issues persist, manually SSH once:
```bash
ssh root@<vps-ip>
# Type 'yes' when prompted to add the host to known_hosts
```

**What this does**: Adds the VPS host key to the known_hosts file, preventing future verification prompts.

---

#### Nginx 502 Bad Gateway

**Error**: Nginx returns 502 Bad Gateway error

**Cause**: Backend service is not running or not accessible.

**Solution**:
```bash
# Check if backend container is running
docker ps | grep backend

# Check backend logs for errors
docker logs devops-project-2-backend-1

# Check backend API endpoint
curl http://localhost:5000/api/data

# Restart containers if needed
cd ~/devops-project-2
docker compose restart
```

**What this does**: Diagnoses whether the backend service is running and accessible, then restarts it if necessary.

---

#### Jenkins Build Fails on npm install

**Error**: `EACCES: permission denied` or `npm: command not found`

**Cause**: Node.js/npm is not installed on the Jenkins agent.

**Solution**:
```bash
# Install Node.js on Jenkins machine
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**What this does**: Installs Node.js and npm on the Jenkins agent, allowing the CI pipeline to run frontend linting.

---

#### Let's Encrypt Certificate Failure

**Error**: Certificate generation fails in DevOps-InitDomain pipeline

**Cause**: Domain DNS not properly configured or rate limit reached.

**Solution**:
```bash
# Verify DNS points to your VPS
nslookup your-domain.com

# Check Certbot logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Test with dry-run mode
sudo certbot --nginx --dry-run -d your-domain.com
```

**What this does**: Verifies DNS configuration and tests certificate generation without hitting rate limits.

---

#### Docker Compose Service Fails to Start

**Error**: `container exited with code 1`

**Cause**: Environment variables missing or incorrect configuration.

**Solution**:
```bash
# Check environment variables
cat docker-compose.yml

# View detailed logs
docker compose logs backend
docker compose logs frontend

# Recreate containers
docker compose down
docker compose up -d --force-recreate
```

**What this does**: Inspects configuration and logs to identify the root cause, then recreates containers with fresh configuration.

---

## License

This project is open source and available for educational purposes. Feel free to use, modify, and distribute it for learning DevOps practices.

**MIT License**

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

This project is intended for educational and learning purposes. It demonstrates DevOps best practices and is not intended for production use without proper security hardening and configuration.

---

## Author

**Name**: Himan Manduja  
**GitHub**: [@HimanM](https://github.com/HimanM)  
**Repository**: [github.com/HimanM/DevOps-Project-2](https://github.com/HimanM/DevOps-Project-2)  
**Live Demo**: [devops2.himanmanduja.fun](https://devops2.himanmanduja.fun)

### Contact

For questions, suggestions, or collaboration opportunities:
- **GitHub Issues**: [Open an issue](https://github.com/HimanM/DevOps-Project-2/issues)
- **Email**: Contact via GitHub profile

### Contributing

Contributions are welcome! If you'd like to improve this project:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

> **Learning Resource**: This project was created as a hands-on learning exercise for DevOps practices. Feel free to use it as a reference for your own DevOps journey!

**Star this repository** if you find it helpful!
