# 🏋️ FitLog — Workout Library

> **Train with intent. Log every set.**

FitLog is a modern, responsive workout library built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to explore workouts, view detailed exercise information, build a daily workout plan, save favorite exercises, and track their progress through a clean, focused interface.

🔗 **Live Demo:** https://fitlog26.netlify.app/

---

## 📑 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Pages & Sections](#-pages--sections)
* [Workout Management](#-workout-management)
* [Responsive Design](#-responsive-design)
* [Data Persistence](#-data-persistence)
* [Getting Started](#-getting-started)
* [Project Structure](#-project-structure)
* [Available Scripts](#-available-scripts)
* [Deployment](#-deployment)
* [Future Improvements](#-future-improvements)
* [Author](#-author)

---

## 📌 About the Project

**FitLog** is a workout discovery and planning application designed for people who want a simple way to find exercises and organize their training.

The application provides a curated workout library covering major muscle groups, with detailed information such as equipment, duration, calories burned, ratings, and instructions.

Users can:

* Browse workouts from the library
* Search workouts by name or muscle group
* Sort workouts by duration, calories, or rating
* View complete workout details
* Add exercises to today's workout plan
* Save workouts for later
* Mark planned workouts as completed
* Remove workouts from their plan
* Track workout statistics
* Keep their plan and saved workouts after refreshing the page

---

## ✨ Features

### 🏋️ Workout Library

* Fetches workout data from an API
* Responsive workout card grid
* Workout images and categories
* Muscle group information
* Equipment details
* Duration
* Estimated calories burned
* Workout rating

### 🔎 Search & Sorting

* Search workouts by name
* Search by muscle group/tag
* Sort by:

  * Duration
  * Calories
  * Rating
* Default sorting by duration

### 📖 Workout Details

Each workout has a dedicated details page containing:

* Workout image
* Exercise name
* Description
* Muscle groups
* Equipment
* Duration
* Calories burned
* Rating
* Step-by-step instructions

### 📋 Today's Plan

Users can create a daily workout plan with a maximum of **5 exercises**.

The plan provides live statistics for:

* Total exercises
* Total workout minutes
* Estimated calories

Users can also:

* View workout details
* Mark workouts as done
* Remove workouts from the plan
* Receive toast notifications for actions

### ❤️ Save for Later

Users can save workouts they want to revisit later.

The Saved section allows users to:

* View saved workouts
* Open workout details
* Remove saved workouts

### 💾 Persistent Data

Workout plans and saved workouts are stored using **localStorage**, allowing the data to remain available after refreshing the browser.

### 🔔 Toast Notifications

Interactive actions provide immediate feedback through toast notifications, including:

* Workout added
* Workout saved
* Workout removed
* Workout marked as completed
* Plan limit reached

### 📱 Fully Responsive

The interface is designed for:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

The layout adapts across screen sizes while maintaining usability and visual consistency.

### ⚠️ Additional UX

* Loading states
* Empty states
* Custom 404 page
* Smooth navigation
* Responsive buttons and controls
* Persistent workout data

---

## 🛠️ Tech Stack

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| **Next.js**         | React framework and application routing |
| **React**           | User interface                          |
| **TypeScript**      | Type safety                             |
| **Tailwind CSS**    | Styling and responsive design           |
| **React Hot Toast** | Toast notifications                     |
| **LocalStorage**    | Client-side data persistence            |
| **REST API**        | Workout data                            |

---

## 📄 Pages & Sections

### Home Page

The home page contains:

* Navigation bar
* Hero section
* Workout library
* Search
* Sorting controls
* Workout cards
* Footer

### Workout Details

Dynamic route:

```text
/workout/[id]
```

Displays detailed information about the selected workout.

### My Plan

Route:

```text
/my-plan
```

Contains:

* Today's Plan
* Saved workouts
* Exercise count
* Total minutes
* Estimated calories
* Sorting controls
* Workout actions
* Empty states

### 404 Page

A custom not-found page is displayed when users visit an invalid route.

---

## 🏋️ Workout Management

### Add to Today's Plan

Users can add a workout directly from its details page.

FitLog limits the daily plan to:

```text
5 workouts
```

Once the limit is reached, additional workouts cannot be added until an existing workout is removed or completed.

### Mark as Done

Users can mark an exercise as completed from Today's Plan.

The workout is removed from the active plan and the user receives a confirmation toast.

### Remove Workout

Users can remove workouts using the dedicated **✕** button.

### Save for Later

Users can save workouts without adding them to today's active plan.

---

## 🎨 Design

FitLog follows a modern fitness-focused visual style featuring:

* Dark interface
* High-contrast typography
* Lime accent color
* Rounded cards
* Minimal navigation
* Responsive layouts
* Clear action buttons

The design focuses on keeping workout information easy to scan while making important actions immediately accessible.

---

## 📱 Responsive Design

FitLog uses Tailwind CSS responsive utilities to provide an optimized experience across devices.

### Mobile

* Single-column workout layout
* Compact navigation
* Stacked controls
* Touch-friendly buttons

### Tablet

* Two-column workout grid
* Adaptive spacing
* Responsive controls

### Desktop

* Three-column workout grid
* Two-column workout detail layout
* Expanded navigation
* Optimized content width

---

## 💾 Data Persistence

FitLog uses browser `localStorage` to persist user-specific workout data.

The following data is persisted:

* Today's Plan
* Saved Workouts

This means users can refresh or revisit the application without immediately losing their selected workouts.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sajidraian/fitlog-app.git
```

### 2. Navigate to the Project

```bash
cd fitlog-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📂 Project Structure

```text
fitlog-app/
│
├── public/
│   └── assets/
│
├── src/
│   ├── app/
│   │   ├── my-plan/
│   │   │   └── page.tsx
│   │   │
│   │   ├── workout/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── LibrarySection.tsx
│   │   ├── WorkoutCard.tsx
│   │   └── Footer.tsx
│   │
│   ├── context/
│   │   └── PlanContext.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── utils/
│       └── api.ts
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

Starts the development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Runs the production build locally.

### Lint

```bash
npm run lint
```

Checks the project for linting issues.

---

## 🌐 Deployment

The project is deployed using **Netlify**.

### Live Application

https://fitlog26.netlify.app/

Every update can be deployed from the connected GitHub repository.

---

## 🔮 Future Improvements

Possible future improvements include:

* User authentication
* Personal workout history
* Progress charts
* Custom workout creation
* Exercise difficulty filters
* Advanced muscle-group filtering
* Workout streak tracking
* Cloud-based user profiles
* Drag-and-drop workout planning

---

## 👨‍💻 Author

**Sajid Raihan**

GitHub:
https://github.com/sajidraian

Project Repository:
https://github.com/sajidraian/fitlog-app

---

## 📄 License

This project was created for educational purposes as part of a **Programming Hero** assignment.

---

<div align="center">

### 💪 Train Hard. Log Honest.

**FitLog — Workout Library**

</div>
