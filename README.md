# 📢 Campus Notice Board

A full-stack, responsive web application for creating, managing, and broadcasting campus notices. Built to demonstrate end-to-end CRUD capabilities, server-side rendering, and secure database management.

**[View Live Demo]** *(Replace this text with your actual Vercel link!)*

## ✨ Features
* **Full CRUD Functionality:** Create, Read, Update, and Delete notices.
* **Server-Side Validation:** Secure API routes that validate incoming data before database interaction.
* **Smart Sorting:** Urgent priority notices automatically float to the top of the feed.
* **Optimistic UI Updates:** Instantaneous state updates on the frontend for destructive actions (like Delete) before requiring a page refresh.
* **Fully Responsive:** Mobile-first design using Tailwind CSS.

## 🛠️ Tech Stack
* **Frontend:** Next.js (Pages Router), React, Tailwind CSS
* **Backend:** Next.js API Routes (Node.js)
* **Database:** PostgreSQL (Hosted on Neon)
* **ORM:** Prisma v7 (with native PostgreSQL adapter)
* **Deployment:** Vercel

## 🚀 Getting Started (Local Development)

If you want to run this project locally, follow these steps:

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/Mansi2510105/notice-board.git
cd notice-board
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up Environment Variables
Create a `.env` file in the root directory and add your PostgreSQL connection string:
\`\`\`env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
\`\`\`

### 4. Initialize the Database
Run the Prisma migrations to set up your database schema:
\`\`\`bash
npx prisma migrate dev
\`\`\`

### 5. Start the Development Server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💡 Future Improvements

Given more time, I would implement user authentication and role-based access control so that only authorized users can create, edit, or delete notices. I would also add image upload support and advanced filtering options.

## 🤖 AI Usage

AI tools (ChatGPT and Gemini) were used during development for:

Understanding Prisma and Neon database setup
Debugging configuration and deployment issues
Reviewing implementation approaches
Generating ideas for UI improvements and project structure

All code was reviewed, tested, modified, and integrated manually before being used in the final project.