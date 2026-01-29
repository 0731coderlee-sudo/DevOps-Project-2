pipeline {
    // agent {
    //     docker {
    //         image 'docker:latest'
    //         // Mount the host Docker socket to allow building images
    //         // Run as root to access the socket
    //         args '-u root -v /var/run/docker.sock:/var/run/docker.sock'
    //     }
    // }
    agent any
    environment {
        DOCKER_CRED =  credentials('dockerhub-username')
        IMAGE_TAG = "latest"
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Code Quality') {
            steps {
                echo 'Running linting...'
                sh 'cd frontend && npm install && npm run lint'
            }
        }
        stage('Unit Tests') {
            steps {
                echo 'Running tests...'
                sh 'pip install --break-system-packages pytest flask prometheus_client werkzeug'
                sh 'cd backend && /var/lib/jenkins/.local/bin/pytest'
            }
        }
        stage('Build Docker Images') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    script {
                        sh 'docker build -t $DOCKER_CRED_USR/devops-project-2-frontend:$IMAGE_TAG ./frontend'
                        sh 'docker build -t $DOCKER_CRED_USR/devops-project-2-backend:$IMAGE_TAG ./backend'
                    }
                }
            }
        }
        stage('Push to DockerHub') {
            steps {
                script {
                    sh 'echo $DOCKER_CRED_PSW | docker login -u $DOCKER_CRED_USR --password-stdin'
                    sh 'docker push $DOCKER_CRED_USR/devops-project-2-frontend:$IMAGE_TAG'
                    sh 'docker push $DOCKER_CRED_USR/devops-project-2-backend:$IMAGE_TAG'
                }
            }
        }
    }
    post {
        success {
            build job: 'DevOps-CD', wait: false
        }
    }
}
