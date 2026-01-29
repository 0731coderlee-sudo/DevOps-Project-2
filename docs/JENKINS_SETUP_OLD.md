# Jenkins Setup Guide 🛠️

This guide details how to configure Jenkins to deploy **DevOps Project 2**.

## 1. Installation (Ubuntu/Debian)

If you haven't installed Jenkins yet, follow these steps to install it on your VPS or local machine.

### Step 1: Install Java
Jenkins requires Java. We recommend OpenJDK 17.

```bash
sudo apt update
sudo apt install fontconfig openjdk-17-jre
java -version
```

### Step 2: Install Jenkins
Add the Jenkins repository and install the package.

```bash
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/" | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt-get update
sudo apt-get install jenkins
```

### Step 3: Start Jenkins
Enable and start the Jenkins service.

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins
```

### Step 4: Unlock Jenkins
Get the initial admin password to unlock the dashboard.

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```
Visit `http://<your-server-ip>:8080` and enter the password.

---

## 2. Configuration & Plugins

### Install Required Plugins
Go to **Manage Jenkins > Plugins > Available Plugins** and install:
*   **Docker**
*   **Docker Pipeline**
*   **Pipeline: Stage View** (For the visualization below)
*   **Ansible** (Optional, if using Ansible plugin)

### Configure Credentials
Go to **Manage Jenkins > Credentials > System > Global credentials**.

| ID | Kind | Description | Content |
| :--- | :--- | :--- | :--- |
| `dockerhub-username` | Username with password | Docker Hub Access | User: `your-user`, Pass: `your-token` |
| `vps-credentials` | Username with password | VPS SSH Access | User: `root`, Pass: `your-password` |
| `vps-ip` | Secret text | VPS IP Address | `165.22.54.216` |
| `DEVOPS2_DOMAIN` | Secret text | Domain Name | `devops2.himanmanduja.fun` |

![Jenkins Credentials](./docs/images/jenkins_credentials.png)

> **Note**: For Docker Hub, use an **Access Token** with Read & Write permissions.

---

## 3. Pipeline Setup

### Dashboard View
Here is how your Jenkins Dashboard should look with the project folder:

![Jenkins Dashboard](./docs/images/jenkins_dashboard.png)

### Creating the CI Job (`DevOps-CI`)

1.  **New Item** -> **Pipeline** -> Name it `DevOps-CI`.
2.  **Definition**: Pipeline script from SCM.
3.  **SCM**: Git.
4.  **Repository URL**: `https://github.com/HimanM/DevOps-Project-2.git`.
5.  **Script Path**: `Jenkinsfile`.

**Configuration View:**
![Job Configuration](./docs/images/jenkins_config.png)

### Pipeline Visualization
Once configured and run, the pipeline stages will appear as follows:

![Pipeline Stage View](./docs/images/jenkins_pipeline_stage_view.png)

The stages are:
1.  **Checkout SCM**: Pulls code from GitHub.
2.  **Code Quality**: Runs linters/tests.
3.  **Build Docker Images**: Builds Frontend and Backend images.
4.  **Push to DockerHub**: Pushes images to registry.
5.  **Post Actions**: Triggers CD pipeline.

### Creating the CD Job (`DevOps-CD`)

1.  **New Item** -> **Pipeline** -> Name it `DevOps-CD`.
2.  **Definition**: Pipeline script from SCM.
3.  **SCM**: Git.
4.  **Repository URL**: `https://github.com/HimanM/DevOps-Project-2.git`.
5.  **Script Path**: `Jenkinsfile.deploy`.

**Configuration View:**
![CD Job Configuration](./docs/images/jenkins_cd_config.png)

**Pipeline Visualization:**
![CD Pipeline Stage View](./docs/images/jenkins_cd_pipeline.png)

### Creating the Infra Job (`DevOps-InitDomain`)

1.  **New Item** -> **Pipeline** -> Name it `DevOps-InitDomain`.
2.  **Definition**: Pipeline script from SCM.
3.  **SCM**: Git.
4.  **Repository URL**: `https://github.com/HimanM/DevOps-Project-2.git`.
5.  **Script Path**: `Jenkinsfile.initdomain`.

**Configuration View:**
![Infra Job Configuration](./docs/images/jenkins_infra_config.png)

**Pipeline Visualization:**
![Infra Pipeline Stage View](./docs/images/jenkins_infra_pipeline.png)

---

## 4. Troubleshooting

*   **Permission Denied (Docker)**: Ensure Jenkins user is in the docker group: `sudo usermod -aG docker jenkins`.
*   **SSH Host Key Verification**: The pipelines use `-o StrictHostKeyChecking=no` to avoid interactive prompts.
*   **Nginx 502 Bad Gateway**: Check if the backend container is running: `docker ps`.

