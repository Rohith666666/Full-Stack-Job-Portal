# Job Portal REST API

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933)
![Express](https://img.shields.io/badge/Express.js-4.x-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248)

A robust REST API backend engineered for a scalable job board platform. This microservice handles job data management with a heavy emphasis on dynamic query construction and multi-criteria search filtering using MongoDB.

## 🚀 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ORM
* **Architecture:** MVC (Model-View-Controller)

## ⚡ Core Architecture & Features
* **Dynamic Query Handling:** Constructs MongoDB (`$regex`, `$options`) query objects dynamically based on incoming request parameters, preventing database payload bloat.
* **Multi-Criteria Filtering:** Allows clients to filter job records concurrently by `status`, `jobType`, and text-based `search` strings.
* **Pagination & Sorting:** Implements native database `skip()` and `limit()` logic to optimize response times for large datasets, alongside multi-criteria sorting (latest, oldest, alphabetical).
* **Secure Routing:** Clean separation of concerns with isolated controller logic and modular routing.

## 🛠️ Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/Job-Portal-API.git](https://github.com/your-username/Job-Portal-API.git)
   cd Job-Portal-API

2. **Install dependencies::**
   npm install

3.  **Configure Environment Variables:
Create a .env file in the root directory and add your MongoDB URI:**
   PORT=5000
MONGO_URI=your_mongodb_connection_string

4. **Run the development server:**
npm run dev


## 📡 API Usage
GET /api/v1/jobs
Fetches a paginated list of jobs based on dynamic filter parameters.

**Query Parameters (All Optional):**

status: Filter by application status (e.g., pending, interview, declined).

jobType: Filter by employment type (e.g., full-time, remote).

search: Text-based search against the job position field.

sort: Sort order (latest, oldest, a-z, z-a).

page: Page number for pagination (default: 1).

limit: Number of results per page (default: 10).

**Example cURL Request (Multi-Criteria Filter):**

curl -X 'GET' \
  'http://localhost:5000/api/v1/jobs?status=pending&jobType=remote&search=engineer&sort=latest&page=1&limit=5' \
  -H 'accept: application/json'

**Example Response**

{
  "count": 2,
  "jobs": [
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "company": "Juspay",
      "position": "Backend Engineer",
      "status": "pending",
      "jobType": "remote",
      "jobLocation": "Bangalore",
      "createdAt": "2026-05-28T10:00:00.000Z"
    },
    {
      "_id": "64f1a2b3c4d5e6f7a8b9c0d2",
      "company": "Google",
      "position": "Cloud Engineer",
      "status": "pending",
      "jobType": "remote",
      "jobLocation": "Hyderabad",
      "createdAt": "2026-05-27T09:30:00.000Z"
    }
  ]
}

***
