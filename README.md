# Documents Manager

A Next.js application with TypeScript for managing and storing regulatory documents in a PostgreSQL database.

## 🚀 Demo

**Live Demo:** [Deployed Link](https://saha-documents-manager.vercel.app)

**Demo Video:** [Watch Demo](https://drive.google.com/file/d/1wjLOufm_dTaC7uDjBJFVApot3zNBYv58/view?usp=sharing)

## ✨ Features

- View, add regulatory documents
- Material UI interface
- PostgreSQL database integration
- Full TypeScript support
- Prisma ORM
- Docker container for easy deployment

## 🛠️ Technologies Used

- Next.js 14 with App Router
- TypeScript
- Material UI
- PostgreSQL
- Prisma ORM
- Docker

## 🚀 Getting Started

### Option 1: Docker 

```bash
# Pull the Docker image
docker pull sahanashre/docuemntsmanagement

# Run the container
docker run -p 3000:3000 -e DATABASE_URL="your-connection-string" sahanashre/documentsmanagement
```

### Option 2: Local Development


1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/documents-manager.git
cd my-app
```

2. Install Dependencies
```bash
npm install
```

3. Set up local .env
```bash
DATABASE_URL = 
```

4. Run the development Server
```bash
npm run dev
```

## Developed by Sahanashre.
