const form = document.getElementById("form");
const recipeContainer = document.getElementById("recipe-container");

const formData = (form.onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const searchText = form.search.value;
  searchRecipe(searchText);
});

async function searchRecipe(text) {
  const apiURL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
  await fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      displayRecipe(data.meals);
    });
}

function displayRecipe(items) {
  recipeContainer.innerHTML = ""; // Clear previous results

  if (!items) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
            <img src="${item.strMealThumb}" alt="photo" class="card-img">
            <h2>${item.strMeal}</h2>
            <p>${item.strInstructions.substring(0, 100)}...</p>
            <button>View</button>
        `;

    recipeContainer.appendChild(card);
  });
}
