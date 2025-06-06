# Hindalco Safety & Maintenance Platform

A full-stack web application for managing machines, tickets, incidents, maintenance schedules, analytics, and user profiles in an industrial environment.

---

## Screenshots

<!-- Add your images to the `frontend/screenshots/` folder or similar and update the paths below -->
![Dashboard Screenshot](frontend/ss/Dashboard.png)
![Analytics Page](frontend/ss/Analytics.png)
![Sidebar Example](frontend/ss/Machines.png)

---

## Features

- **Authentication:** JWT-based login and registration
- **Role-based Access:** User roles and permissions
- **Machine Management:** Add, edit, and view machines
- **Ticketing System:** Create and track maintenance/service tickets
- **Incident Reporting:** Log and manage incidents
- **Maintenance Scheduling:** Preventive, predictive, and corrective maintenance
- **Analytics Dashboard:** Visualize key metrics with charts (Recharts)
- **File Uploads:** Cloudinary integration for attachments
- **Responsive UI:** Built with React, Tailwind CSS, and Lucide icons

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Recharts, Lucide React
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer, Cloudinary
- **Other:** dotenv, cors, react-hot-toast

---

## Getting Started

### Prerequisites

- Node.js (v18 or v20 recommended)
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)

---

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/imsp.git
cd imsp
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file in `backend/` (see `.env.example` or below):

  ```
  NODE_ENV=development
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/imsp
  JWT_SECRET=your-super-secret-jwt-key-here
  CORS_ORIGIN=http://localhost:5173

  # Cloudinary
  CLOUDINARY_CLOUD_NAME=your-cloud-name
  CLOUDINARY_API_KEY=your-api-key
  CLOUDINARY_API_SECRET=your-api-secret
  ```

- Start the backend server:

  ```bash
  npm start
  # or
  node server.js
  ```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

- Start the frontend dev server:

  ```bash
  npm run dev
  ```

- The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Scripts

### Backend

- `npm start` — Start the Express server

### Frontend

- `npm run dev` — Start the Vite dev server
- `npm run build` — Build for production

---

## Folder Structure

```
backend/
  models/
  routes/
  middlewares/
  config/
  .env
  server.js

frontend/
  src/
    components/
    pages/
    contexts/
    assets/
    App.jsx
    index.css
  tailwind.config.js
  vite.config.js
  screenshots/
```

---

## Customization

- **Tailwind CSS:** Edit `tailwind.config.js` and `src/index.css` for custom styles.
- **Cloudinary:** Configure your credentials in `backend/config/cloudinary.js` and `.env`.
- **Analytics:** Charts are powered by [Recharts](https://recharts.org/).

---

## Troubleshooting

- **Tailwind not working?**
  - Ensure `@tailwind` directives are in `src/index.css`
  - Check `tailwind.config.js` has `./src/**/*.{js,jsx,ts,tsx}` in `content`
  - Restart your dev server after changes

- **MongoDB connection issues?**
  - Make sure MongoDB is running and `MONGODB_URI` is correct

- **Cloudinary upload issues?**
  - Check your Cloudinary credentials in `.env` and `config/cloudinary.js`

---

## License

MIT

---

## Credits

- [Lucide Icons](https://lucide.dev/)
- [Recharts](https://recharts.org/)
- [Tailwind CSS](https://tailwindcss.com/)
