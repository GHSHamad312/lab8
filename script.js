let recipes = [];
let editIndex = -1;

function addOrUpdateRecipe() {
  const title = document.getElementById("title").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const instructions = document.getElementById("instructions").value.trim();
  const imageInput = document.getElementById("image");

  if (title === "" || ingredients === "" || instructions === "") {
    alert("Please fill in all fields!");
    return;
  }

  let imageURL = "";
  if (imageInput.files && imageInput.files[0]) {
    imageURL = URL.createObjectURL(imageInput.files[0]);
  }

  if (editIndex === -1) {
    recipes.push({ title, ingredients, instructions, imageURL });
  } else {
    recipes[editIndex] = { title, ingredients, instructions, imageURL };
    editIndex = -1;
  }

  // Clear form fields
  document.getElementById("title").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("instructions").value = "";
  document.getElementById("image").value = "";

  displayRecipes();
}

function displayRecipes() {
  const recipeList = document.getElementById("list");
  recipeList.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const div = document.createElement("div");
    div.classList.add("recipe-item");
    div.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
      <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      ${recipe.imageURL ? `<img src="${recipe.imageURL}" alt="${recipe.title}">` : ""}
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
  document.getElementById("title").value = recipe.title;
  document.getElementById("ingredients").value = recipe.ingredients;
  document.getElementById("instructions").value = recipe.instructions;
  editIndex = index;
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  displayRecipes();
}

displayRecipes();
