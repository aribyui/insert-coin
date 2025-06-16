import { loadHeaderFooter, applyThemePreference, getYear, fetchJoke } from "./utils.mjs";
import { getData } from "./GamesData.mjs";

loadHeaderFooter().then(() => {
  getData();
  applyThemePreference();
  getYear();
  fetchJoke();
});
