const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./internships.db");

const internships = [
  {
    title: "Java Developer Intern",
    company: "EdVyro",
    domain: "Java",
    location: "Remote",
    description: "Work on Java application development."
  },
  {
    title: "Full Stack Developer Intern",
    company: "Tech Solutions",
    domain: "Web Development",
    location: "Remote",
    description: "Build frontend and backend applications."
  },
  {
    title: "AI Intern",
    company: "AI Labs",
    domain: "Artificial Intelligence",
    location: "Chennai",
    description: "Work on beginner-level AI projects."
  }
];

db.serialize(() => {

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

  const statement = db.prepare(`
    INSERT INTO internships
    (title, company, domain, location, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  internships.forEach((internship) => {
    statement.run(
      internship.title,
      internship.company,
      internship.domain,
      internship.location,
      internship.description
    );
  });

  statement.finalize();

  console.log("Seed data inserted successfully.");

  db.close();
});
