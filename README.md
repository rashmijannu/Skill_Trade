# 🛠️ Skilltrade

**Skilltrade** is a web-based platform that allows users to book skilled professionals such as electricians, painters, plumbers, and more. It’s built to simplify the process of finding and hiring trusted service providers.

## 🧰 Tech Stack

**Frontend:** next.js  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Others:** Mongoose, JWT (Authentication), and more

---

## 🧑‍💻 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js installed
- MongoDB instance (local or cloud)
- Git installed

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/AyushSharma72/Skill_Trade_Next_15.git
```
frontend set up:
```bash
cd skill
npm install
npm run dev
```

create .env.local file in the skill folder:

```
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_HERE_API_KEY=you api key (Go to https://developer.here.com to generate api key)  
```

---

backend set up:

create .env file in the server folder:
```
DB_CONNECT=your mongodb database link
email_id=your email(only needed when working with email functionality)
pass_key=email pass key 
PORT=8000
SECRET=UJSBBFGSIERNFDJDKKSJ
```

```
move to the server folder: cd server
install dependancy : npm install 
start the server : nodemon server
```


