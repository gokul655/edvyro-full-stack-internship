const internships = [
  {
    title: "Junior Full Stack Developer",
    domain: "Full Stack Development",
    company: "TechBridge",
    mode: "Remote",
    duration: "8 weeks",
    description:
      "Build responsive web features using HTML, CSS, JavaScript and REST APIs."
  },
  {
    title: "Java Backend Intern",
    domain: "Java Development",
    company: "CodeWorks",
    mode: "Remote",
    duration: "6 weeks",
    description:
      "Practice Java, object-oriented programming, APIs and database integration."
  },
  {
    title: "Frontend Developer Intern",
    domain: "Frontend Development",
    company: "PixelLabs",
    mode: "Hybrid",
    duration: "4 weeks",
    description:
      "Create accessible, responsive interfaces and improve user experience."
  },
  {
    title: "AI & ML Intern",
    domain: "AI & Machine Learning",
    company: "DataNova",
    mode: "Remote",
    duration: "8 weeks",
    description:
      "Explore Python, machine learning workflows, data preparation and evaluation."
  },
  {
    title: "Cloud Computing Intern",
    domain: "Cloud Computing",
    company: "CloudPath",
    mode: "Remote",
    duration: "6 weeks",
    description:
      "Learn cloud fundamentals, deployment concepts and basic cloud services."
  },
  {
    title: "Full Stack Web Intern",
    domain: "Full Stack Development",
    company: "WebForge",
    mode: "Remote",
    duration: "6 weeks",
    description:
      "Develop a complete web application with frontend, backend and database concepts."
  }
];

const searchInput = document.getElementById("search");
const domainSelect = document.getElementById("domain");
const clearBtn = document.getElementById("clearBtn");
const cards = document.getElementById("cards");
const count = document.getElementById("count");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");
const status = document.getElementById("status");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

function render(list) {
  cards.innerHTML = "";

  count.textContent =
    list.length + " result" + (list.length === 1 ? "" : "s");

  if (list.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  list.forEach(function (item) {
    const article = document.createElement("article");

    article.className = "card";
    article.tabIndex = 0;

    article.innerHTML = `
      <span class="badge">${escapeHtml(item.domain)}</span>

      <h3>${escapeHtml(item.title)}</h3>

      <p>${escapeHtml(item.description)}</p>

      <p class="meta">
        <strong>Company:</strong>
        ${escapeHtml(item.company)}
      </p>

      <p class="meta">
        <strong>Mode:</strong>
        ${escapeHtml(item.mode)}
        ·
        <strong>Duration:</strong>
        ${escapeHtml(item.duration)}
      </p>
    `;

    cards.appendChild(article);
  });
}

function filterInternships() {
  try {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedDomain = domainSelect.value;

    const filtered = internships.filter(function (item) {
      const searchableText =
        item.title +
        " " +
        item.domain +
        " " +
        item.company +
        " " +
        item.description;

      const matchesSearch =
        searchableText.toLowerCase().includes(searchTerm);

      const matchesDomain =
        selectedDomain === "all" ||
        item.domain === selectedDomain;

      return matchesSearch && matchesDomain;
    });

    render(filtered);

    if (searchTerm || selectedDomain !== "all") {
      status.textContent = "Showing filtered results.";
    } else {
      status.textContent = "";
    }

    errorState.classList.add("hidden");

  } catch (error) {
    cards.innerHTML = "";
    emptyState.classList.add("hidden");
    errorState.classList.remove("hidden");
    status.textContent = "";
  }
}

searchInput.addEventListener("input", filterInternships);

domainSelect.addEventListener("change", filterInternships);

clearBtn.addEventListener("click", function () {
  searchInput.value = "";
  domainSelect.value = "all";

  searchInput.focus();

  filterInternships();
});

document.addEventListener("keydown", function (event) {
  if (
    event.key === "/" &&
    document.activeElement !== searchInput
  ) {
    event.preventDefault();
    searchInput.focus();
  }
});

render(internships);
