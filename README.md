# Server-Rendered E-commerce Product Management Dashboard

## 📌 Project Overview

This project is a **server-rendered (SSR) administrative dashboard** built using **Next.js** for managing products in an e-commerce system.  
It focuses on performance, SEO, and real-world admin workflows such as product CRUD, secure image uploads, analytics dashboards, and role-based access control.

All product data is fetched and rendered on the **server side**, ensuring fast page loads, improved SEO, and reliable data consistency.

---

## 🎯 Objective

To design and develop a **server-side rendered e-commerce admin dashboard** that allows administrators to efficiently manage products with strong validation, analytics, and secure access.

---

## ✨ Key Features

- ⚡ **Server-Side Rendering (SSR)** using Next.js App Router
- 📦 **Complete Product Management (CRUD)**
  - Create, Read, Update, Delete products
- 🧭 **Multi-step Product Creation Form**
  - Strong validation using **Zod**
- 📊 **Interactive Dashboard Analytics**
  - Sales and stock visualization using **Recharts**
- 🖼 **Secure Image Upload**
  - Cloud-based image storage and retrieval
- 🔐 **Authentication & Authorization**
  - Admin-only access
  - Protected routes
  - Logout functionality
- 🛡 **Hidden Admin Onboarding**
  - Admin creation routes are not accessible to general users
- 🚀 **Live Deployment**
  - Deployed on Vercel

---

## 🛠 Tech Stack

- **Frontend & Backend:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS
- **Validation:** Zod
- **Charts:** Recharts
- **Database:** PostgreSQL (Prisma ORM)
- **Image Storage:** Cloudinary
- **Deployment:** Vercel
---

## 🔄 Application Workflow

Admin requests dashboard page  
→ Server fetches product data from database  
→ Page rendered on the server (SSR)  
→ Admin interacts with forms and charts  
→ Product data is created / updated / deleted  
→ UI refreshes with latest server data  

---

## 🔐 Admin Credentials (Dummy)

Email: admin@example.com
Password: admin123

> These credentials are provided only for demo and evaluation purposes.

---

## 🚀 Live Deployment

🔗 **Live App URL:**  
👉 https://your-vercel-deployment-link.vercel.app

---

## 🎥 Demo Video

📹 **Demo Video (3–5 mins):**  
👉 https://your-demo-video-link

The video demonstrates:
- Admin login
- Dashboard analytics (charts)
- Product creation (multi-step form)
- Edit and delete product
- Image upload
- Logout flow

---

## ⚙️ Local Setup Instructions

1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2️⃣ Install Dependencies
```bash
npm install
```
3️⃣ Setup Environment Variables

Create a .env.local file:

DATABASE_URL=your_database_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

4️⃣ Run Database Migrations
```bash
npx prisma migrate dev
```
5️⃣ Start Development Server
```bash
npm run dev
```


Open 👉 http://localhost:3000

📦 Deliverables Checklist

✅ Product CRUD functionality

✅ SSR Admin Dashboard

✅ Analytics using charts

✅ Secure image upload

✅ Authentication & authorization

✅ Live deployed application

✅ Demo video

✅ README documentation



📄 License

This project is developed for educational and evaluation purposes.