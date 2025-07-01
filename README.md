<div align="center">

# 🚧 Hindalco Safety & Maintenance Platform

### *A powerful full-stack industrial web platform for modern factory safety and efficiency*

**Manage machines • Track maintenance • Handle incidents • Analyze performance**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

🔗 **Live Demo**: [safety-management-f.onrender.com](https://safety-management-f.onrender.com/)

---

</div>

## 📸 **Screenshots**

<div align="center">

<table>
<tr>
<td align="center" width="33%">

### 📊 **Dashboard**
<img src="frontend/ss/Dashboard.png" alt="Dashboard Screenshot" width="280" height="180">

</td>
<td align="center" width="33%">

### 📈 **Analytics**
<img src="frontend/ss/Analytics.png" alt="Analytics Page" width="280" height="180">

</td>
<td align="center" width="33%">

### 🏭 **Machine View**
<img src="frontend/ss/Machines.png" alt="Sidebar Example" width="280" height="180">

</td>
</tr>
</table>

*Click images to view full size*

</div>

---

## ✨ **Features**

<table>
<tr>
<td width="50%">

### 🔐 **Security & Access**
- 🔑 JWT Authentication system
- 🛡️ Role-based access control
- 👥 Users, Admins, and Managers
- 🔒 Secure login & registration

</td>
<td width="50%">

### 🏭 **Machine Management**
- ⚙️ Add, edit, and monitor machines
- 📊 Real-time machine status
- 🔧 Equipment tracking
- 📋 Machine documentation

</td>
</tr>
<tr>
<td width="50%">

### 🎫 **Ticketing & Incidents**
- 🎯 Raise and track tickets
- 🚨 Industrial safety incident logging
- 📝 Detailed incident reports
- ✅ Ticket closure workflow

</td>
<td width="50%">

### 📊 **Analytics & Maintenance**
- 📅 Preventive maintenance scheduler
- 📈 Interactive charts with Recharts
- 📁 File uploads via Cloudinary
- 📱 Fully responsive design

</td>
</tr>
</table>

---

## 🧰 **Tech Stack**

<div align="center">

### **Frontend**
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### **Backend**
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

### **Tools & Services**
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

</div>

---

## 🚀 **Quick Installation**

> **Get the platform running locally in just a few steps!**

### **Prerequisites**
- Node.js v18 or later
- MongoDB (Local or Atlas)
- Cloudinary account (for uploads)

### **Step 1:** Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/imsp.git
cd imsp
\`\`\`

### **Step 2:** Backend Setup
\`\`\`bash
cd backend
npm install
\`\`\`

Create a `.env` file:
\`\`\`env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/imsp
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
\`\`\`

Start the server:
\`\`\`bash
npm start
\`\`\`

### **Step 3:** Frontend Setup
\`\`\`bash
cd ../frontend
npm install
npm run dev
\`\`\`

### **Step 4:** You're Ready! 🎉
Open [http://localhost:5173](http://localhost:5173) in your browser

---

## 📂 **Project Structure**

\`\`\`
📁 imsp/
├── 📁 backend/
│   ├── 📁 config/
│   │   ├── 📄 database.js          # MongoDB connection
│   │   └── 📄 cloudinary.js        # Cloudinary setup
│   ├── 📁 models/
│   │   ├── 📄 User.js              # User schema
│   │   ├── 📄 Machine.js           # Machine schema
│   │   ├── 📄 Ticket.js            # Ticket schema
│   │   └── 📄 Incident.js          # Incident schema
│   ├── 📁 routes/
│   │   ├── 📄 auth.js              # Authentication routes
│   │   ├── 📄 machines.js          # Machine management
│   │   ├── 📄 tickets.js           # Ticketing system
│   │   └── 📄 incidents.js         # Incident reporting
│   ├── 📁 middlewares/
│   │   ├── 📄 auth.js              # JWT verification
│   │   └── 📄 upload.js            # File upload handling
│   ├── 📄 server.js                # Main server file
│   ├── 📄 package.json             # Backend dependencies
│   └── 📄 .env                     # Environment variables
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 assets/              # Static assets
│   │   ├── 📁 components/
│   │   │   ├── 📄 Navbar.jsx       # Navigation component
│   │   │   ├── 📄 Sidebar.jsx      # Sidebar component
│   │   │   └── 📄 Charts.jsx       # Chart components
│   │   ├── 📁 contexts/
│   │   │   └── 📄 AuthContext.jsx  # Authentication context
│   │   ├── 📁 pages/
│   │   │   ├── 📄 Dashboard.jsx    # Main dashboard
│   │   │   ├── 📄 Machines.jsx     # Machine management
│   │   │   ├── 📄 Tickets.jsx      # Ticket system
│   │   │   ├── 📄 Analytics.jsx    # Analytics page
│   │   │   └── 📄 Login.jsx        # Authentication
│   │   ├── 📄 App.jsx              # Main app component
│   │   └── 📄 main.jsx             # Entry point
│   ├── 📁 ss/                      # Screenshots
│   │   ├── 🖼️ Dashboard.png
│   │   ├── 🖼️ Analytics.png
│   │   └── 🖼️ Machines.png
│   ├── 📄 index.html               # HTML template
│   ├── 📄 package.json             # Frontend dependencies
│   ├── 📄 tailwind.config.js       # Tailwind configuration
│   └── 📄 vite.config.js           # Vite configuration
└── 📄 README.md                    # This file
\`\`\`

---

## 🛠 **Customization**

| Component | Description | File Location |
|-----------|-------------|---------------|
| 🎨 **Themes** | Customize colors and styling | `tailwind.config.js` |
| ☁️ **File Upload** | Configure Cloudinary settings | `backend/config/cloudinary.js` |
| 📊 **Charts** | Modify analytics visualizations | Uses [Recharts](https://recharts.org) |
| 🔐 **Authentication** | JWT configuration | `backend/middlewares/auth.js` |

---

## 🧪 **Available Scripts**

### **Backend Commands**
\`\`\`bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start production server
npm start

# Start development server with nodemon
npm run dev

# Run tests
npm test
\`\`\`

### **Frontend Commands**
\`\`\`bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Create production build
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
\`\`\`

---

## 🧯 **Troubleshooting**

<details>
<summary><strong>🎨 Tailwind CSS not loading?</strong></summary>

- Ensure `@tailwind` directives are in `src/index.css`
- Restart Vite development server
- Check `tailwind.config.js` configuration

</details>

<details>
<summary><strong>🗄️ MongoDB connection issues?</strong></summary>

- Verify MongoDB URI in `.env` file
- Ensure MongoDB server is running
- Check network connectivity for Atlas

</details>

<details>
<summary><strong>☁️ Cloudinary upload problems?</strong></summary>

- Double-check credentials in `.env`
- Verify Cloudinary account is active
- Check file size limits

</details>

---

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔄 **Open** a Pull Request

---

## 🧑‍💻 **Author**

<div align="center">

### **Ayush Patel**

*Full Stack Developer & Industrial Safety Enthusiast*

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ayush-patel1)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ayush-patel05/)

</div>

---

## 📄 **License**

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

*Free to use, modify, and share* 🎉

</div>

---

## 🙏 **Credits**

Special thanks to these amazing tools and libraries:

- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [Recharts](https://recharts.org/) - Powerful charting library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Cloudinary](https://cloudinary.com/) - Media management platform

---

<div align="center">

### ⭐ **Star this repo if you found it helpful!**

**Made with ❤️ by [Ayush Patel](https://github.com/ayush-patel1)**

*Building safer industrial environments, one line of code at a time* 🏭

</div>

**Made with ❤️ by [Ayush Patel](https://github.com/ayush-patel1)**

*Building safer industrial environments, one line of code at a time* 🏭

</div>
