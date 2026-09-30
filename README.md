# Zero-Downtime Deployment Workshop

## Overview

This project demonstrates a zero-downtime deployment using Docker, NGINX, multiple application versions, traffic routing, rollback, and basic CI/CD.

The deployment uses two application versions:

- Version 1 (v1)
- Version 2 (v2)

Both versions run simultaneously in separate Docker containers. NGINX acts as a reverse proxy and controls which version receives traffic.

## Project Structure

```text
zero-downtime-deployment/
├── .github/
│   └── workflows/
│       └── docker-build.yml
│
└── app/
    ├── nginx/
    │   └── nginx.conf
    │
    ├── v1/
    │   ├── Dockerfile
    │   └── server.js
    │
    └── v2/
        ├── Dockerfile
        └── server.js



Technologies Used
Node.js
Docker
NGINX
GitHub Actions
PowerShell
Git/GitHub
Deployment
Version 1

The first application version runs on:

http://localhost:8080

Docker mapping:

Host port 8080 → Container port 3001
Version 2

The second application version runs on:

http://localhost:8081

Docker mapping:

Host port 8081 → Container port 3002
NGINX

NGINX runs on:

http://localhost:8000

NGINX acts as the reverse proxy and routes incoming traffic to the selected application version.

Zero-Downtime Deployment

Both application versions remain running during deployment.

Initially, NGINX routes traffic to Version 1:

User
  |
  v
NGINX :8000
  |
  v
Version 1 :8080

The routing can then be changed to Version 2:

User
  |
  v
NGINX :8000
  |
  v
Version 2 :8081

The NGINX configuration can be reloaded without stopping NGINX:

docker exec nginx-proxy nginx -s reload

This allows traffic to be switched between versions without stopping the reverse proxy or the application versions.

Rollback

If required, NGINX can be changed back to Version 1 and reloaded:

docker exec nginx-proxy nginx -s reload

This demonstrates a simple rollback strategy.

Docker Containers

The deployment uses three containers:

app-v1
app-v2
nginx-proxy

Check running containers with:

docker ps

Expected port mappings:

app-v1       8080 -> 3001
app-v2       8081 -> 3002
nginx-proxy  8000 -> 80
Building the Images

Version 1:

cd app\v1
docker build -t zero-downtime-v1 .

Version 2:

cd ..\v2
docker build -t zero-downtime-v2 .
Running the Applications

Version 1:

docker run -d --name app-v1 -p 8080:3001 zero-downtime-v1:latest

Version 2:

docker run -d --name app-v2 -p 8081:3002 zero-downtime-v2:latest
Running NGINX

From the app\nginx directory:

docker run -d --name nginx-proxy -p 8000:80 -v "${PWD}\nginx.conf:/etc/nginx/nginx.conf:ro" nginx:alpine
CI/CD

A GitHub Actions workflow is included in:

.github/workflows/docker-build.yml

The workflow automatically builds both Docker images when changes are pushed to the main branch or when a pull request targets main.

This provides a basic CI/CD pipeline for validating the Docker builds.

Demonstrated Concepts

This workshop demonstrates:

Multi-version deployment
Docker containerization
NGINX reverse proxy routing
Blue/Green deployment concepts
Traffic switching
Rollback
Zero-downtime application switching
Basic CI/CD using GitHub Actions