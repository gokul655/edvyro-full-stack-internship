# EdVyro Internship REST API

A simple REST API for managing internship records using Node.js, Express.js and SQLite.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript

## Database Schema

The `internships` table contains:

| Field | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| title | TEXT | Internship title |
| company | TEXT | Company name |
| domain | TEXT | Internship domain |
| location | TEXT | Internship location |
| description | TEXT | Internship description |

## API Endpoints

### GET all internships

```text
GET /api/internships
