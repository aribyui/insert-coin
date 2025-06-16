export default class GameDetails {
  constructor(gameId) {
    this.gameId = gameId;
    this.apiKey = "ddf29ff3ce484fbc8cd28a2042f26085";
    this.gameData = null;
  }

  async init() {
    await this.fetchGame();
    this.render();
  }

  async fetchGame() {
    try {
      const url = `https://api.rawg.io/api/games/${this.gameId}?key=${this.apiKey}`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Error fetching game: ${response.status}`);
      this.gameData = await response.json();
      console.log(this.gameData);
    } catch (error) {
      console.error(error);
      this.gameData = null;
    }
  }

  render() {
    if (!this.gameData) {
      document.querySelector(".game-detail").innerHTML =
        "<p>Failed to load game details.</p>";
      return;
    }

    const rawDesc = this.gameData.description || "No description available.";
    const englishDesc = rawDesc.split("Español")[0];

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = englishDesc;
    const cleanText = tempDiv.textContent || tempDiv.innerText || "";

    document.getElementById("game-title").textContent = this.gameData.name;
    document.getElementById("game-image").src = this.gameData.background_image;
    document.getElementById("game-image").alt = this.gameData.name;
    
    const platformsElement = document.getElementById("game-platforms");

    if (this.gameData.parent_platforms && platformsElement) {
      const platformNames = this.gameData.parent_platforms.map(
        (p) => p.platform.name
      );
      platformsElement.textContent = platformNames.join(", ");
    } else if (platformsElement) {
      platformsElement.textContent = "No platforms listed.";
    }

    document.getElementById("game-released").textContent = this.gameData.released;
    document.getElementById("game-score").textContent =
      this.gameData.metacritic ?? "N/A";

    // Aquí ponemos el texto limpio, no HTML para evitar mostrar código
    document.getElementById("game-description").textContent = cleanText;

    // ✅ Enlace al sitio web del juego
    const websiteElement = document.getElementById("game-website");
    if (this.gameData.website && websiteElement) {
      websiteElement.href = this.gameData.website;
      websiteElement.textContent = this.gameData.website;
      websiteElement.target = "_blank";
      websiteElement.rel = "noopener noreferrer";
    } else if (websiteElement) {
      websiteElement.style.display = "none";
    }
  }
}
