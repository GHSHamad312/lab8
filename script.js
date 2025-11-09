let recipes = [];
let editIndex = -1;

function addOrUpdateRecipe() {
  const name = document.getElementById("name").value.trim();
  const desc = document.getElementById("desc").value.trim();

  if (name === "" || desc === "") {
    alert("Please fill in all fields!");
    return;
  }

  if (editIndex === -1) {
    recipes.push({ name, desc });
  } else {
    recipes[editIndex] = { name, desc };
    editIndex = -1;
  }

  document.getElementById("name").value = "";
  document.getElementById("desc").value = "";

  displayRecipes();
}

function displayRecipes() {
  const recipeList = document.getElementById("list");
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const div = document.createElement("div");
    div.classList.add("recipe-item");
    div.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>${recipe.desc}</p>
      <div class="recipe-actions">
        <button onclick="editRecipe(${index})">Edit</button>
        <button class="delete" onclick="deleteRecipe(${index})">Delete</button>
      </div>
    `;
    recipeList.appendChild(div);
  });
}

function editRecipe(index) {
  const recipe = recipes[index];
  document.getElementById("name").value = recipe.name;
  document.getElementById("desc").value = recipe.desc;
  editIndex = index;
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    displayRecipes();
}


displayRecipes();
