# Canara Gym 🏋️‍♂️

Canara Gym is a full-stack web application designed to help gym members seamlessly book, manage, and view their workout slots. Built with the MERN stack, the application features a robust authentication system, intuitive slot booking, and a personalized user dashboard.

## ✨ Features

* **User Authentication**: Secure sign-up and login utilizing JSON Web Tokens (JWT) and encrypted passwords (bcrypt).
* **Protected Routes**: Private routing on the frontend ensures only authenticated users can access the dashboard and booking features.
* **Slot Management**: View available gym slots in real-time through interactive `SlotCard` components.
* **Booking System**: Users can seamlessly book slots, view their active bookings, and receive a confirmation upon successful reservation.
* **Personalized Dashboard**: A dedicated dashboard to keep track of upcoming gym schedules.

## 🛠️ Tech Stack

**Frontend**
* **React.js**: UI and component-based architecture.
* **React Router DOM**: Client-side routing (`Home`, `Login`, `SignUp`, `Dashboard`, `Slot`, `Confirmation`).
* **Context API**: Global state management for User Authentication (`AuthContext`).

**Backend**
* **Node.js & Express.js**: High-performance RESTful API.
* **MongoDB & Mongoose**: NoSQL database for managing `Users`, `Slots`, and `Bookings`.
* **JWT & bcrypt**: Secure authorization and password hashing (`auth.js` middleware).

## 📂 Project Structure

The repository is structured into two main directories: `client` (frontend) and `server` (backend).

\`\`\`text
canaragym/
├── client/                     # React Frontend
│   ├── public/                 # Static assets (index.html, logos, etc.)
│   └── src/
│       ├── components/         # Reusable UI components (NavBar, SlotCard)
│       ├── pages/              # Route views (Home, Login, Dashboard, etc.)
│       ├── utils/              # Helper functions (AuthContext, PrivateRoute)
│       ├── App.js              # Root component & Route definitions
│       └── index.js            # React entry point
│
├── server/                     # Node.js/Express Backend
│   ├── config/                 # Configuration files (db.js for MongoDB)
│   ├── middleware/             # Express middlewares (auth.js for JWT verification)
│   ├── models/                 # Mongoose schemas (User, Slot, Booking)
│   ├── routes/                 # API endpoints (auth.js, slot.js, bookings.js)
│   └── index.js                # Express server entry point
│
└── OFFLINE_MODE_SETUP.md       # Guide for setting up the app locally/offline
\`\`\`

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
* [Node.js](https://nodejs.org/) installed (v14 or higher recommended)
* [MongoDB](https://www.mongodb.com/) installed locally or a MongoDB Atlas cloud cluster URI.

### 1. Backend Setup

1. Navigate to the server directory:
   \`\`\`bash
   cd server
   \`\`\`
2. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a `.env` file in the `server` directory and add the following variables:
   \`\`\`env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   \`\`\`
4. Start the backend server:
   \`\`\`bash
   npm start
   # or run using nodemon for development:
   npm run dev
   \`\`\`

### 2. Frontend Setup

1. Open a new terminal and navigate to the client directory:
   \`\`\`bash
   cd client
   \`\`\`
2. Install the dependencies:
   \`\`\`bash
   npm install
   \`\`\`
3. Create a `.env` file in the `client` directory and configure your API URL (if necessary):
   \`\`\`env
   REACT_APP_API_URL=http://localhost:5000
   \`\`\`
4. Start the React development server:
   \`\`\`bash
   npm start
   \`\`\`

The frontend should now be running on [http://localhost:3000](http://localhost:3000) and securely communicating with your backend!

## 🧪 Demo User Testing

If you want to quickly test the application without manually registering a user through the UI, you can run the provided demo registration script from the `server` directory:

\`\`\`bash
cd server
node registerDemoUser.js
\`\`\`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
