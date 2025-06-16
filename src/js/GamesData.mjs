const url =
  "https://api.rawg.io/api/games?key=ddf29ff3ce484fbc8cd28a2042f26085";

export async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Bad response: ${response.status}`);
    } else {
      const data = await response.json();
      insertData(data);
    }
  } catch (error) {
    console.error(error);
  }
}

function formatEsrbRating(rating) {
  if (!rating || !rating.name) return "❓ Not Rated";

  const name = rating.name.toLowerCase();

  if (name.includes("everyone 10")) return "👦 Everyone 10+";
  if (name.includes("everyone")) return "🧒 Everyone";
  if (name.includes("teen")) return "👨 Teen";
  if (name.includes("mature")) return "🔞 Mature";
  if (name.includes("adults")) return "🚫 Adults Only";

  return `❔ ${rating.name}`;
}

function insertData(data) {
  const cards = document.querySelector(".cards");

  cards.innerHTML = `
    <h1 class="section-title">Games You Must Play 🎮</h1>
    <div class="cards-grid"></div>
  `;

  const gridContainer = cards.querySelector(".cards-grid");

  data.results.forEach((game) => {
    const id = game.id;
    const name = game.name;
    const image = game.background_image;
    const metacriticValue = game.metacritic ?? "N/A";

    const element = `
      <a href="./game_pages/detail.html?id=${id}" class="link-article">
        <article class="card-container">
          <div class="img-container">          
            <img src="${image}" alt="${name}" loading="lazy" width="400" height="200">
          </div>   
          <div class="description-container">
            <h2 id="game-title">${name}</h2>                   
          </div>   
          <div class="description-content">
            <p><span>ESRB:</span> ${formatEsrbRating(game.esrb_rating)}</p>
            <p>🏆 <span>Metacritic:</span> ${metacriticValue}</p>
          </div>
        </article>
      </a>
    `;

    gridContainer.insertAdjacentHTML("beforeend", element);
  });
}


// function getScoreColor(score) {
//   if (score === null || score === undefined) return "score-gray";
//   if (score >= 75) return "score-green";
//   if (score >= 50) return "score-yellow";
//   return "score-red";
// }

setTimeout(() => {
  getData();
}, 2000);
