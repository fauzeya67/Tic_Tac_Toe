# 🎮 Tic Tac Toe - React app

A modern, animated, and responsive Tic Tac Toe game built from scratch using:

- ⚛️ React 
- 💅 Tailwind CSS
- 🎞️ Framer Motion (for smooth UI animations)
- 📁 Clean modular components
- 🧠 Custom game logic with winner and draw detection

## 🔍 Features

- Two-player turn-based gameplay
- Winner and draw detection
- Highlighting winning combinations
- Beautiful animated UI
- Mobile responsive design


## 🚀 Getting Started
## 💻 How to Run This App Locally

Follow these steps to set up the project on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/note-app.git
cd note-app
```

### 2. Install Dependance 
```bash
npm install
```
### 3. Run the Application 
```bash
npm run dev 
```
This helps ensure your app keeps fetching fresh weather data smoothly.

## 📸 Screenshots
<img width="1672" alt="Screenshot 2025-06-07 at 2 46 53 PM" src="https://github.com/user-attachments/assets/6a9238b1-b4c9-420e-ad78-e596284f81c5" />















# 🎮 Tic Tac Toe - CI/CD Deployment on AWS  

This repository contains a **Tic Tac Toe web application** and instructions to deploy it on **AWS EC2** using **Docker** and automate builds with **Jenkins CI/CD**.  

---

## 🚀 1. Launch AWS EC2 Instance

1. Log in to your **AWS Console** → Launch an instance.  
2. Choose **Ubuntu 20.04/22.04 LTS**.  
3. Configure **Security Group**:  
   - `22` → SSH  
   - `5173` → Application  
   - `8080` → Jenkins  
4. Launch and download your **key pair (.pem)**.  

---

## 🔑 2. Connect to EC2 Instance

```bash
ssh -i your-key.pem ubuntu@<EC2-Public-IP>
```

---

## 📂 3. Clone the Repository

```bash
git clone https://github.com/fauzeya67/Tic_Tac_Toe.git
cd Tic_Tac_Toe
```

---

## 🐳 4. Install Docker & Run the App

1. Install Docker:
   ```bash
   sudo apt update
   sudo apt install -y docker.io
   sudo usermod -aG docker ubuntu
   ```

2. Build Docker image:
   ```bash
   docker build -t tic-tac-toe-app .
   ```

3. Run container:
   ```bash
   docker run -d -p 5173:5173 --name tic-tac-toe tic-tac-toe-app
   ```

👉 Open in browser:  
`http://<EC2-Public-IP>:5173`

---

## 🔧 5. Install Jenkins on EC2

1. Install Java & Jenkins:
   ```bash
   sudo apt update
   sudo apt install -y openjdk-11-jdk
   curl -fsSL https://pkg.jenkins.io/debian/jenkins.io.key | sudo tee    /usr/share/keyrings/jenkins-keyring.asc > /dev/null
   echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]    https://pkg.jenkins.io/debian binary/ | sudo tee    /etc/apt/sources.list.d/jenkins.list > /dev/null
   sudo apt update
   sudo apt install -y jenkins
   sudo systemctl enable jenkins
   sudo systemctl start jenkins
   ```

2. Install Docker for Jenkins:
   ```bash
   sudo apt install -y docker.io
   sudo usermod -aG docker jenkins
   sudo systemctl restart jenkins
   ```

3. Get Jenkins password:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

4. Open Jenkins in browser:  
   👉 `http://<EC2-Public-IP>:8080`

---

## 📜 6. Create Jenkins Pipeline

In Jenkins, create a **Pipeline Job** and use this script:

```groovy
pipeline {
    agent any
    
    stages {
        stage("Code Clone") {
            steps {
                git url: "https://github.com/fauzeya67/Tic_Tac_Toe.git", branch: "main"
                echo "✅ Code cloned successfully"
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "docker build -t tic-tac-toe-app ."
                echo "🐳 Docker image built"
            }
        }

        stage("Deploy") {
            steps {
                sh "docker stop tic-tac-toe || true"
                sh "docker rm tic-tac-toe || true"
                sh "docker run -d -p 5173:5173 --name tic-tac-toe tic-tac-toe-app"
                echo "🚀 App running on port 5173"
            }
        }
    }
}
```

---

## 🔔 7. Configure GitHub Webhook

1. Go to your repo → **Settings → Webhooks → Add Webhook**  
2. Enter Payload URL:  
   ```
   http://<EC2-Public-IP>:8080/github-webhook/
   ```
3. Set Content type: `application/json`  
4. Select: **Just the push event**  
5. Save ✅  

Now, every push to GitHub will trigger Jenkins automatically.  

---

## ⚡ Workflow Overview

1. Developer pushes code → GitHub sends **webhook** to Jenkins.  
2. Jenkins pipeline runs → clones repo, builds Docker image, deploys container.  
3. Updated Tic Tac Toe app is live on EC2.  

👉 App URL:  
`http://<EC2-Public-IP>:5173`

---

## ✅ Tech Stack

- **AWS EC2 (Ubuntu)** – Hosting  
- **Docker** – Containerization  
- **Jenkins** – CI/CD Automation  
- **GitHub Webhooks** – Auto Build Triggers  

---

## 📊 Deployment Architecture

```
Developer → GitHub → Webhook → Jenkins (on EC2) → Docker → Tic Tac Toe App
```

---

🚀 With this setup, your Tic Tac Toe app is **fully automated** — every code change is built and deployed instantly!

🤝 Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.
