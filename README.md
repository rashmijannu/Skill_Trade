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

### 1. Fork the repository

- Click the **Fork** button on the top right of the repo
- Clone your forked repo instead of the main one
- 
```bash
git clone "link of your forked repo"
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



## 🚀 How to Push Code
create a new branch 
```
git checkout -b your-feature-name
```

Stage and Commit Your Changes
```
git add .
git commit -m "Add: your meaningful commit message"
```

push to github
```
git push origin  your-feature-name
```

Open a Pull Request
Go to your GitHub repository

You’ll see an option to "Compare & pull request"

Add a title, description,images and submit the pull request


