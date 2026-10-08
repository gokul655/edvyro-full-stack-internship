const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const db = new sqlite3.Database("./internships.db");

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    domain TEXT NOT NULL,
    location TEXT,
    description TEXT
  )
`);

// Home
app.get("/", (req, res) => {
  res.json({
    message: "EdVyro Internship REST API is running"
  });
});

// GET - list internships with pagination
app.get("/api/internships", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.all(
    "SELECT * FROM internships LIMIT ? OFFSET ?",
    [limit, offset],
    (err, rows) => {
      if (err) {
        return res.status(500).json({
          error: "Database error"
        });
      }

      res.json({
        page: page,
        limit: limit,
        data: rows
      });
    }
  );
});

// GET - single internship
app.get("/api/internships/:id", (req, res) => {
  db.get(
    "SELECT * FROM internships WHERE id = ?",
    [req.params.id],
    (err, row) => {
      if (err) {
        return res.status(500).json({
          error: "Database error"
        });
      }

      if (!row) {
        return res.status(404).json({
          error: "Internship not found"
        });
      }

      res.json(row);
    }
  );
});

// POST - create internship
app.post("/api/internships", (req, res) => {
  const {
    title,
    company,
    domain,
    location,
    description
  } = req.body;

  if (!title || !company || !domain) {
    return res.status(400).json({
      error: "title, company and domain are required"
    });
  }

  db.run(
    `INSERT INTO internships
     (title, company, domain, location, description)
     VALUES (?, ?, ?, ?, ?)`,
    [
      title,
      company,
      domain,
      location || "",
      description || ""
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Database error"
        });
      }

      res.status(201).json({
        message: "Internship created",
        id: this.lastID
      });
    }
  );
});

// PUT - update internship
app.put("/api/internships/:id", (req, res) => {
  const {
    title,
    company,
    domain,
    location,
    description
  } = req.body;

  if (!title || !company || !domain) {
    return res.status(400).json({
      error: "title, company and domain are required"
    });
  }

  db.run(
    `UPDATE internships
     SET title = ?, company = ?, domain = ?,
         location = ?, description = ?
     WHERE id = ?`,
    [
      title,
      company,
      domain,
      location || "",
      description || "",
      req.params.id
    ],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Database error"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Internship not found"
        });
      }

      res.json({
        message: "Internship updated"
      });
    }
  );
});

// DELETE - delete internship
app.delete("/api/internships/:id", (req, res) => {
  db.run(
    "DELETE FROM internships WHERE id = ?",
    [req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({
          error: "Database error"
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Internship not found"
        });
      }

      res.json({
        message: "Internship deleted"
      });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
