# MERN Calculator Frontend

## Overview

This repository contains the frontend of a MERN Stack Calculator application developed using **React** and **Vite**.

The application provides a clean and responsive calculator interface capable of performing arithmetic operations while communicating with the backend through the **Fetch API** to store and retrieve calculation history.

---

## Features

* Responsive calculator interface
* Perform basic arithmetic operations
* Percentage operation
* Modulus operation
* Display calculation history
* Fetch calculation history from backend
* Save calculations using Fetch API
* Delete calculations (soft delete)
* Filter history by calculation date
* Component-based React architecture

---

## Tech Stack

* React
* Vite
* JavaScript
* CSS
* Fetch API

---

## Supported Operations

* Addition (+)
* Subtraction (-)
* Multiplication (*)
* Division (/)
* Percentage (%)
* Modulus (Mod)

---

## Folder Structure

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── Calculator.jsx
│   │   ├── Button.jsx
│   │   ├── Display.jsx
│   │   └── History.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

---

## Backend Connection

The frontend communicates with the backend using the native **Fetch API**.

Example backend URL:

```text
http://localhost:5000/api/history
```

---

## Future Improvements

* Scientific calculator functions
* Dark mode
* Keyboard input support
* Calculation statistics
* Export history
* User authentication

---

## Author

**Ahmad Mujtaba**