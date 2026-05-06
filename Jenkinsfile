pipeline {
    agent any
 
    environment {
        DEPLOY_HOST = "65.0.52.178"
        DEPLOY_USER = "ubuntu"
        REGISTRY = "gopinathbca35"
        IMAGE_BACKEND = "app-backend"
        IMAGE_FRONTEND = "app-frontend"
    }
 
    stages {
 
        stage('Clone Code') {
            steps {
                git branch: 'main', credentialsId: 'Git-cred', url: 'https://github.com/gopinathbca35/react-node-mysql-app.git'
            }
        }
 
        stage('SonarQube Scan') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('sonar') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=three-tier-app -Dsonar.sources=."
                    }
                }
            }
        }
        /*stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t $REGISTRY/$IMAGE_BACKEND:latest -f backend/Dockerfile backend/
                docker build -t $REGISTRY/$IMAGE_FRONTEND:latest -f frontend/Dockerfile frontend/
                '''
            }
        }

       stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push $REGISTRY/$IMAGE_BACKEND:latest
                    docker push $REGISTRY/$IMAGE_FRONTEND:latest
                    '''
                }
            }
        } */
         
       stage('Deploy to K8s') {
            steps {
               sshagent(credentials: ['ec2-server-key']) {
                  sh '''
            ssh -tt -o StrictHostKeyChecking=no ubuntu@65.0.52.178 << EOF
 
            rm -rf app
            git clone https://github.com/gopinathbca35/react-node-mysql-app.git app
            cd app/k8s
 
            # Apply all YAML files
            microk8s kubectl apply -f mysql.yaml
            microk8s kubectl apply -f backend.yaml
            microk8s kubectl apply -f frontend.yaml
            microk8s kubectl apply -f ingress.yaml
 
            # Check rollout status
            microk8s kubectl rollout status deployment backend
            microk8s kubectl rollout status deployment frontend
 
            exit
            EOF
            '''
        }
    }
}
    }
}
