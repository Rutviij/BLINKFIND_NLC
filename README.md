

# BlinkFind STEM

**A secure, student-friendly lost & found platform — reunite students with their belongings in the blink of an eye.**


---

##  Table of Contents

- [About](#-about)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Authors](#-authors)

---

##  About

**BlinkFind STEM** is a full-stack lost and found web application built specifically for schools and STEM programs. Students can report found items, browse unclaimed belongings, and submit claims — all through a clean, intuitive interface. Admins get a dedicated dashboard to review, approve, or reject claims with full control.

No more paper sign-up sheets. No more cluttered lost-and-found bins nobody checks.

---

## Features

| Feature | Description |
|---|---|
| **Report Items** | Submit found items with photos, descriptions, and location details |
|  **Search & Filter** | Browse and filter lost items to find what you're looking for |
|  **Claim Items** | Submit a claim for an item — securely and easily |
| **Admin Dashboard** | Approve, reject, or delete item reports and claims |
| **Image Preview** | Live image preview when uploading found items |
| **Session Persistence** | Login state saved via `localStorage` for seamless experience |

---

## 📁 Project Structure

/project-root
│
├── index.html          → Landing page
├── report.html         → Form to report found items
├── claim.html          → Browse and claim items
├── admin.html          → Admin dashboard
├── login.html          → Admin login page
│
├── styles.css          → Global site styling
│
├── report.js           → Item submission + image preview logic
├── claim.js            → Search, filter, and claim items
├── admin.js            → Dashboard logic (approve / reject / delete)
├── login.js            → Frontend login system
├── supabase.js         → API layer (communicates with Flask backend)
│
├── server.py           → Flask backend server
└── requirements.txt    → Python dependencies

---

##  Tech Stack

### Frontend
- **HTML5** — structure and markup
- **CSS3** — design, layout, and responsiveness
- **Vanilla JavaScript (ES6)** — interactivity and client-side logic
- **localStorage** — session and login state persistence

### Backend
- **Python / Flask** — REST API server
- **SQLite** — lightweight local database
- **Flask-CORS** — cross-origin request support

---


### Prerequisites

- Python 3.x
- A virtual environment (recommended)


### 1. Set Up the Virtual Environment

```bash
python -m venv venv
source venv/bin/activate        # macOS/Linux
# OR
venv\Scripts\activate           # Windows
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

**Dependencies:**

Flask==2.3.2
flask-cors==3.0.10
werkzeug==3.0.0

### 4. Start the Flask Backend

Open **Terminal 1** and run:

```bash
source venv/bin/activate
python server.py
```

You should see:

Running on http://127.0.0.1:4000

### 5. Start the Frontend Server

Open **Terminal 2** and run:

```bash
source venv/bin/activate
python -m http.server 8000
```

### 6. Open in Your Browser

http://localhost:8000

---

##  Usage

| Page | URL | Description |
|---|---|---|
| Home | `/index.html` | Landing page |
| Report | `/report.html` | Submit a found item |
| Claim | `/claim.html` | Browse and claim items |
| Admin Login | `/login.html` | Log in to the admin panel |
| Admin Dashboard | `/admin.html` | Manage all reports and claims |

---


##  Authors

**Rutviij Casula**
 [Rutviij.Casula21@gmail.com](mailto:Rutviij.Casula21@gmail.com)

Made with ❤️ for Downingtown STEM Students.


