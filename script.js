//API VARIABLES
const apiKey = "bd0cc269e37b44dc9363d356be6f251a";
const url = `https://api.spoonacular.com/recipes/random?number=5&apiKey=${apiKey}`;
const url2 = `https://api.spoonacular.com/recipes/complexSearch?number=5&addRecipeInformation=true&apiKey=${apiKey}&cuisine=Asian,Italian,Mexican,Mediterranean,Middle Eastern,European`;



//DOM ELEMENTS
const recipesContainer = document.getElementById('recipesContainer');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortBtns = document.querySelectorAll('.sort-btn');
const randomBtn = document.getElementById('randomBtn');

//GLOBALS



// API GOES HERE
// let recipesData = [
//   {
//     id: 1,
//     title: "Vegan Lentil Soup",
//     image: "./chicken.webp",
//     readyInMinutes: 30,
//     servings: 4,
//     sourceUrl: "https://example.com/vegan-lentil-soup",
//     diets: ["vegan"],
//     cuisine: "Mediterranean",
//     ingredients: [
//       "red lentils",
//       "carrots",
//       "onion",
//       "garlic",
//       "tomato paste",
//       "cumin",
//       "paprika",
//       "vegetable broth",
//       "olive oil",
//       "salt"
//     ],
//     pricePerServing: 2.5,
//     popularity: 85
//   },
//   {
//     id: 2,
//     title: "Vegetarian Pesto Pasta",
//     image: "./chicken.webp",
//     readyInMinutes: 25,
//     servings: 2,
//     sourceUrl: "https://example.com/vegetarian-pesto-pasta",
//     diets: ["vegetarian"],
//     cuisine: "Italian",
//     ingredients: [
//       "pasta",
//       "basil",
//       "parmesan cheese",
//       "garlic",
//       "pine nuts",
//       "olive oil",
//       "salt",
//       "black pepper"
//     ],
//     pricePerServing: 3.0,
//     popularity: 92
//   },
//   {
//     id: 3,
//     title: "Gluten-Free Chicken Stir-Fry",
//     image: "./chicken.webp",
//     readyInMinutes: 20,
//     servings: 3,
//     sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
//     diets: ["gluten-free"],
//     cuisine: "Asian",
//     ingredients: [
//       "chicken breast",
//       "broccoli",
//       "bell pepper",
//       "carrot",
//       "soy sauce (gluten-free)",
//       "ginger",
//       "garlic",
//       "sesame oil",
//       "cornstarch",
//       "green onion",
//       "sesame seeds",
//       "rice"
//     ],
//     pricePerServing: 4.0,
//     popularity: 78
//   },
//   {
//     id: 4,
//     title: "Dairy-Free Tacos",
//     image: "./chicken.webp",
//     readyInMinutes: 15,
//     servings: 2,
//     sourceUrl: "https://example.com/dairy-free-tacos",
//     diets: ["dairy-free"],
//     cuisine: "Mexican",
//     ingredients: [
//       "corn tortillas",
//       "ground beef",
//       "taco seasoning",
//       "lettuce",
//       "tomato",
//       "avocado"
//     ],
//     pricePerServing: 2.8,
//     popularity: 88
//   },
//   {
//     id: 5,
//     title: "Middle Eastern Hummus",
//     image: "./chicken.webp",
//     readyInMinutes: 10,
//     servings: 4,
//     sourceUrl: "https://example.com/middle-eastern-hummus",
//     diets: ["vegan", "gluten-free"],
//     cuisine: "Middle Eastern",
//     ingredients: [
//       "chickpeas",
//       "tahini",
//       "garlic",
//       "lemon juice",
//       "olive oil"
//     ],
//     pricePerServing: 1.5,
//     popularity: 95
//   },
//   {
//     id: 6,
//     title: "Quick Avocado Toast",
//     image: "./chicken.webp",
//     readyInMinutes: 5,
//     servings: 1,
//     sourceUrl: "https://example.com/quick-avocado-toast",
//     diets: ["vegan"],
//     cuisine: "Mediterranean",
//     ingredients: [
//       "bread",
//       "avocado",
//       "lemon juice",
//       "salt"
//     ],
//     pricePerServing: 2.0,
//     popularity: 90
//   },
//   {
//     id: 7,
//     title: "Beef Stew",
//     image: "./chicken.webp",
//     readyInMinutes: 90,
//     servings: 5,
//     sourceUrl: "https://example.com/beef-stew",
//     diets: [],
//     cuisine: "European",
//     ingredients: [
//       "beef chunks",
//       "potatoes",
//       "carrots",
//       "onion",
//       "garlic",
//       "tomato paste",
//       "beef broth",
//       "red wine",
//       "bay leaves",
//       "thyme",
//       "salt",
//       "black pepper",
//       "butter",
//       "flour",
//       "celery",
//       "mushrooms"
//     ],
//     pricePerServing: 5.5,
//     popularity: 80
//   }
// ]

let recipesData = [];
let currentRecipes = [];

//test

const normalizeCuisine = (cuisine) => {
  if (!cuisine) return "Unknown";

  const asianCuisines = ["Chinese", "Japanese", "Thai", "Korean", "Vietnamese", "Indian"];
  const middleEasternCuisines = ["Turkish", "Lebanese", "Persian", "Israeli", "Egyptian"];
  const europeanCuisines = ["French", "Spanish", "German", "Greek", "British"];

  if (asianCuisines.includes(cuisine)) return "Asian";
  if (middleEasternCuisines.includes(cuisine)) return "Middle Eastern";
  if (europeanCuisines.includes(cuisine)) return "European";

  return cuisine;
};


const fetchData = () => {
  fetch(url2)
    .then(res => res.json())
    .then(data => {
      recipesData = data.results.map(recipe => ({
        // ändrat till results från recipes för att fixa complexsearch
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        cuisine: normalizeCuisine(recipe.cuisines?.[0]),
        //    cuisine: recipe.cuisines[0] || "Unknown",  detta ör ändrat till den över
      }));
      currentRecipes = recipesData;
      showRecipes(recipesData);
    })
    .catch(err => console.error("Error fetching data:", err)); //lagg till api quota been reacheddddd
};


fetchData();



// FUNCTION TO SHOW RECIPES
const showRecipes = (recipesToShow = recipesData) => {

  currentRecipes = recipesToShow; // store the current state
  recipesContainer.innerHTML = '';

  recipesToShow.forEach(recipe => {
    recipesContainer.innerHTML += `
      <div class="recipe-card"> 
        <p>Title: ${recipe.title}</p>
        <p>This dish is from ${recipe.cuisine}</p>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>This dish is ready in ${recipe.readyInMinutes} minutes!</p>
      </div>


    `;
  });
};

// FUNCTION FOR BUTTONS

//filTER BUTTONS
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedCuisine = btn.id.toLowerCase();

    const filtered =
      selectedCuisine === "all"
        ? recipesData
        : recipesData.filter(r => r.cuisine.toLowerCase() === selectedCuisine);

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    showRecipes(filtered);
  });
});

// filterBtns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     const selectedCuisine = btn.id.toLowerCase();

//     const filtered =
//       selectedCuisine === "all"
//         ? recipesData
//         : recipesData.filter(r => r.cuisine.toLowerCase() === selectedCuisine);

//     filterBtns.forEach(b => b.classList.remove("active"));
//     btn.classList.add("active");

//     if (filtered.length === 0) {
//       showMessage(`No ${selectedCuisine} recipes found.`);
//     } else {
//       showRecipes(filtered);
// //     }
// //   });
// // });




// SORT BUTTONS
sortBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const order = btn.id; // "ascending" or "descending"

    const sorted = [...currentRecipes].sort((a, b) =>
      order === "ascending"
        ? a.readyInMinutes - b.readyInMinutes
        : b.readyInMinutes - a.readyInMinutes
    );

    sortBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    showRecipes(sorted);
  });
});



// RANDOMBUTTON


randomBtn.addEventListener('click', () => {
  //RANDOMNUMBER
  const randomIndex = Math.floor(Math.random() * recipesData.length);

  //GETRECIPE
  const randomRecipe = recipesData[randomIndex];

  //SHOW THAT RECIPE
  showRecipes([randomRecipe]);
});