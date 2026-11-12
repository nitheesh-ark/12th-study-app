# FOCUS – Personal Study Workspace

**FOCUS** is a minimal, personal productivity and study management application designed to help students organize their daily activities, manage subjects, and keep track of upcoming examinations.

The application provides a clean, distraction-free interface with simple navigation and essential study management features. It is built using React and Tailwind CSS, with Capacitor support for Android deployment.

## ✨ Features

### 1. Todo List
- Create and manage daily tasks.
- Track completed and pending activities.
- Delete completed tasks.
- Organize daily work efficiently.

### 2. Subject Management
- Manage academic subjects.
- Browse individual subjects and their chapters.
- Rate chapter preparation levels:
  - Excellent
  - Good
  - Average
  - Poor
- Save chapter progress across page refreshes.

### 3. Exam Countdown
- Set a custom examination date.
- Track the remaining days until the examination.
- Stay aware of upcoming academic deadlines.

### 4. Minimal Dashboard
- Simple and clean dark-themed interface.
- Four dashboard sections.
- Easy navigation between application modules.
- Responsive layout for different screen sizes.

### 5. Android Support
- Built with Capacitor for Android compatibility.
- Supports native Android back-button handling.
- Can be installed and used as an Android application.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| Tailwind CSS | UI styling |
| HTML & CSS | Application structure and design |
| Capacitor | Android application integration |
| Vite | Development server and build tool |

## 📂 Project Structure

```text
FOCUS/
│
├── public/
│
├── src/
│   ├── App.jsx
│   ├── Todo.jsx
│   ├── subject.jsx
│   ├── exam_countdown.jsx
│   └── ...
│
├── android/
│   └── Android application files
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

*Note: The structure above represents the main application files. Additional configuration and component files may be present.*

## 🚀 Installation and Setup

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git (optional)

### Step 1: Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### Step 2: Navigate to the Project

```bash
cd FOCUS
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

Open the local development URL provided by Vite in your browser.

## 📱 Android Build

The project uses Capacitor to package the web application as an Android application.

Build the web application:

```bash
npm run build
```

Synchronize the web assets with Android:

```bash
npx cap sync android
```

Open the Android project:

```bash
npx cap open android
```

You can then build and run the application using Android Studio.

## 🎯 Project Objective

The main objective of FOCUS is to provide students with a lightweight and accessible workspace for managing academic responsibilities.

Instead of using multiple applications for task management, subject tracking, and examination reminders, FOCUS brings these essential features together in one place.

## 🔮 Future Improvements

- Daily study-time tracking.
- Study statistics and progress visualization.
- Custom reminders and notifications.
- Additional productivity tools.
- More dashboard modules.
- Improved data backup and synchronization.

## 👨‍💻 Developer

**Developed as a personal productivity and study management project.**

---

*FOCUS – One thing at a time.*
