import { loadHeaderFooter, applyThemePreference, getYear, fetchJoke } from "./utils.mjs";
import GameDetails from "./GameDetails.mjs";

loadHeaderFooter().then(() => {
  applyThemePreference();
  getYear();  
  fetchJoke();
})

const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");

if (!gameId) {
  document.querySelector(".game-detail").innerHTML = "<p>Invalid game ID.</p>";
} else {
  const gameDetails = new GameDetails(gameId);
  gameDetails.init();
}
