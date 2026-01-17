# 📅 Calendar Call Reminder

A full-stack **Next.js (App Router)** application that allows users to log in with **Google**, save their phone number, and receive **calendar-based call reminders** powered by **background jobs (BullMQ)**.

Built with **NextAuth**, **shadcn/ui**, and production-grade architecture.

---

## 🚀 Tech Stack

- **Next.js 13+ (App Router)**
- **NextAuth (Auth.js)** – Google OAuth
- **TypeScript**
- **shadcn/ui + Tailwind CSS**
- **MongoDB** – User & phone data
- **BullMQ** – Background job processing
- **Redis** – Queue backend for BullMQ
- **Twilio** – Phone call reminders
- **Google Calendar API** – Event scheduling

---

##  Features

-  Google OAuth login
-  Secure dashboard access
- Save & update phone number
-  Background job scheduling with BullMQ
-  Automated phone call reminders
-  Non-blocking async processing
-  Modern UI with shadcn/ui
-  Scalable architecture

---
🔧 Installation
1️⃣ Clone the repository
git clone https://github.com/your-username/calendar-call-reminder.git
cd calendar-call-reminder

2️⃣ Install dependencies
npm install

🔐 Environment Variables

Create a .env.local file:

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

MONGODB_URI=your-mongodb-uri

REDIS_URL=redis://127.0.0.1:6379

TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-number

🧵 BullMQ Setup
Install BullMQ & Redis client
npm install bullmq ioredis

Redis must be running
redis-server

▶️ Run the App
npm run dev


For workers (separate terminal):

npx tsx src/worker/calendarWorker.ts
