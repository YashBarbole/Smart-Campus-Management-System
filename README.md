# Campus Management System

This project is a full-stack Campus Management System built using Express.js, MongoDB, and Passport.js for authentication. It provides functionalities for managing users (students, teachers, admins), clubs, and events within a college environment. The system supports user registration, login, and CRUD operations for clubs and events.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Images](#images)
- [Contributing](#contributing)

## Features

- User registration and authentication for different roles (students, teachers, admins, and clubs).
- Club management including creation and details submission.
- Event creation and retrieval associated with clubs.
- Secure password handling using bcrypt for hashing.
- Session management using express-session with cookie handling.
- MongoDB as the database to store user, club, and event information.

## Technologies Used

- **React**: JavaScript library for building user interfaces, enabling a dynamic and responsive frontend.
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express**: Web framework for building APIs.
- **MongoDB**: NoSQL database for storing user and club data.
- **Passport.js**: Authentication middleware for Node.js, supporting local strategy for different user roles.
- **bcryptjs**: Library for hashing passwords securely.
- **dotenv**: Module for managing environment variables.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.


# File Structure

## Frontend

```plaintext
my-project/
├── node_modules/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── Assets/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── Adashboard.jsx
│   │   │   ├── ALogin.jsx
│   │   │   ├── Anotice.jsx
│   │   │   ├── Cregistration.jsx
│   │   │   ├── Sregistration.jsx
│   │   │   ├── Timetable.jsx
│   │   │   └── Tregistration.jsx
│   │   ├── authentications/
│   │   │   ├── Login.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Register.jsx
│   │   ├── club/
│   │   │   ├── AddClubDetails.jsx
│   │   │   ├── AddEventForm.jsx
│   │   │   ├── CDashboard.jsx
│   │   │   └── CLogin.jsx
│   │   ├── homepages/
│   │   │   ├── About.jsx
│   │   │   └── Homepage.jsx
│   │   ├── student/
│   │   ├── teacher/
│   │   │   └── Home.jsx
│   ├── context/
│   │   └── index.css
│   ├── App.jsx
│   ├── main.jsx
├── .gitignore
├── index.html
├── eslint.config.js
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── package-lock.json
└── package.json
```

## Backend

```
server

├── node_modules
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies for both the frontend:
   ```bash
   cd my-project
   npm install
   ```

3. Install dependencies for both the backend:
   ```bash
   cd server
   npm install
   ```

## Running the Project

1. To run the frontend, use the following command:
```bash
npm run dev
```

2. To run the frontend, use the following command:
```bash
npm start
```

### Environment Variables

Create a `.env` file in the root directory to manage environment variables. Example:
```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/campus_management
SESSION_SECRET=your_secret_key
```

# Images

## Login Page
<img width="1440" alt="Screenshot 2024-09-27 at 8 23 00 PM" src="https://github.com/user-attachments/assets/c8440ce6-db24-4f24-ad86-2b2577649aac">

## Student Dashboard
![Screenshot 2024-09-27 at 8 21 23 PM](https://github.com/user-attachments/assets/7c031db4-4b54-452d-9289-71f8e19392c5)
![Screenshot 2024-09-27 at 8 21 32 PM](https://github.com/user-attachments/assets/93dee319-fd11-4b86-a2f7-ab839a1fc856)
![Screenshot 2024-09-27 at 8 21 45 PM](https://github.com/user-attachments/assets/c9daf6a7-62a6-462f-9b1b-d532873598b1)

## Teacher Dashboard
![Screenshot 2024-09-27 at 8 21 51 PM](https://github.com/user-attachments/assets/29352b2e-a0c8-4d24-980b-a455c5321426)
![Screenshot 2024-09-27 at 8 21 32 PM](https://github.com/user-attachments/assets/0772f13a-4f0e-4e87-b94b-4ff0d60162cd)

## Admin Dashboard
![Screenshot 2024-09-27 at 8 22 12 PM](https://github.com/user-attachments/assets/e428757e-7001-4d9f-a38f-28e19491f58e)
<img width="1440" alt="Screenshot 2024-09-27 at 8 22 16 PM" src="https://github.com/user-attachments/assets/f3901eae-3974-4251-a0a7-907d8fc41ea0">
<img width="1440" alt="Screenshot 2024-09-27 at 8 22 21 PM" src="https://github.com/user-attachments/assets/988c3ee4-dcbb-4111-a293-c2a16ddee1bd">
<img width="1440" alt="Screenshot 2024-09-27 at 8 22 25 PM" src="https://github.com/user-attachments/assets/0f2ea570-f51e-48e7-994f-acbd6abfa0cc">
<img width="1440" alt="Screenshot 2024-09-27 at 8 22 42 PM" src="https://github.com/user-attachments/assets/c978710a-5be1-46f9-9d2c-06a679debd76">

## Club Dashboard
![Screenshot 2024-09-27 at 8 23 15 PM](https://github.com/user-attachments/assets/6f6e643b-cb00-4db9-b911-41c293104d22)
![Screenshot 2024-09-27 at 8 23 25 PM](https://github.com/user-attachments/assets/5bab09f2-44cf-4151-9b3a-fda307e08a4c)


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.
