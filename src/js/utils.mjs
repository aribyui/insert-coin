export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const header = document.querySelector("#main-header");

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footer = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);
} 

export async function fetchJoke() {
  try {
    const res = await fetch(
      "https://geek-jokes.sameerkumar.website/api?format=json"
    );
    const data = await res.json();
    document.getElementById("game-joke").textContent = data.joke;
  } catch (error) {
    console.error("Failed to load joke", error);
    document.getElementById("game-joke").textContent = "No joke available 😢";
  }
}

export function getYear() {
  const year = new Date().getFullYear();
  const span = document.querySelector("#year");
  span.textContent = year;
}

export function applyThemePreference() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.add(`${savedTheme}-theme`);

  const toggleBtn = document.getElementById("toggle-theme");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.classList.remove(`${currentTheme}-theme`);
    document.body.classList.add(`${newTheme}-theme`);
    localStorage.setItem("theme", newTheme);
  });
}

