# 🛒 Server-Rendered E-commerce Product Management Dashboard

A **server-side rendered (SSR) administrative dashboard** built using **Next.js** for managing products in an e-commerce system.  
The project focuses on **performance, SEO, scalability, and secure admin workflows**, closely aligned with real-world product management systems.

---

## 🎯 Project Overview

This application provides an **admin-only dashboard** designed for managing products in an e-commerce platform.

Product data is fetched on the **server side** and rendered before reaching the browser, ensuring:
- ⚡ Fast page loads
- 🔍 Improved SEO
- 🔐 Secure handling of sensitive data

The dashboard allows administrators to manage product listings, upload images, monitor stock and sales metrics, and maintain overall catalog health through a clean and intuitive interface.

---

## 📦 Product Management Overview

Each product in the system includes:
- Product name and description
- Pricing information
- Available stock
- Product image(s)
- Metadata used for analytics and visualization

Admins can:
- ➕ Add new products using a **multi-step form**
- ✏️ Edit existing product details
- 🗑 Delete products from the catalog
- 📊 View stock and sales-related insights through charts

All changes are reflected through server-rendered updates to ensure data consistency.

---

## ✨ Key Features

- ⚡ **Server-Side Rendering (SSR)** using Next.js App Router
- 📦 **Complete Product Management (CRUD)**
- 🧭 **Multi-step Product Creation Forms**
  - Input validation using **Zod**
- 📊 **Interactive Dashboard Analytics**
  - Stock and sales visualization using **Recharts**
- 🖼 **Secure Image Upload**
  - Cloud-based image storage
- 🔐 **Authentication & Authorization**
  - Admin-only access
  - Protected routes
  - Logout functionality
- 🛡 **Hidden Admin Onboarding**
  - Admin onboarding routes are not accessible to general users
- 🚀 **Live Deployment**
  - Publicly deployed using Vercel

---

## 🛠 Tech Stack

- 🧩 **Frontend & Backend:** Next.js (App Router), TypeScript  
- 🎨 **Styling:** Tailwind CSS  
- ✅ **Form Validation:** Zod  
- 🔄 **Data Fetching:**  
  - Server-side data fetching using Next.js  
  - Client-side data revalidation patterns supported via **React Query or SWR** (as per PS)  
- 📈 **Charts & Visualization:** Recharts  
- 🗄 **Database:** MongoDB  
- ☁️ **Image Storage:** Cloudinary  
- 🚀 **Deployment:** Vercel  

---

## 🔄 Data Fetching & Rendering Flow

Admin requests dashboard page  
→ Server fetches product data from the database  
→ Page is rendered on the server (SSR)  
→ HTML is sent to the browser  
→ Admin performs CRUD operations  
→ Updated data is fetched again to keep UI in sync  

This architecture ensures both **performance and reliability**, while remaining extensible for client-side data revalidation strategies.

---

## ⚙️ Setup Instructions

1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2️⃣ Install Dependencies
```bash
npm install
```
3️⃣ Configure Environment Variables
Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

NEXTAUTH_SECRET=your_secret

NEXTAUTH_URL=http://localhost:3000


4️⃣ Start the Development Server
```bash
npm run dev
```
Open 👉 http://localhost:3000


### 🔐 Dummy Admin Credentials (For Demo)

Email: admin@example.com
Password: admin123

These credentials are provided only for demonstration and evaluation purposes.


### 🌐 Live Demo

🌍 Live Application: https://your-vercel-deployment-link.vercel.app

🎥 Demo Video: https://your-demo-video-link

### 📌 Notes

This project was developed as part of a Web Development Problem Statement (PS) emphasizing:

Server-side rendering

Product management systems

Secure admin dashboards

Data visualization and analytics


