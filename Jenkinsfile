pipeline {
    agent any

    tools {
        nodejs 'node18'
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Learn-It-Right-Way/lirw-react-node-mysql-app.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('SonarQube Scan') {
            steps {
                echo 'SonarQube scan stage ready'
            }
        }

        stage('Build Complete') {
            steps {
                echo 'Pipeline Success'
            }
        }
    }
}
