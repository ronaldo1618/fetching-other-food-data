fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {

            // Fetching food from food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "Ingredients not listed"
                    }
                    if (productInfo.product.countries) {
                        food.country = productInfo.product.countries
                    } else {
                        food.country = "Country not listed"
                    }
                    if (productInfo.product.nutriments["energy-kcal_100g"]) {
                        food.calories = productInfo.product.nutriments["energy-kcal_100g"] + " calories"
                    } else {
                        food.calories = "Calories not listed"
                    }
                    if (productInfo.product.nutriments["fat_100g"]) {
                        food.fat = productInfo.product.nutriments["fat_100g"]
                    } else {
                        food.fat = "Fat per serving not listed"
                    }
                    if (productInfo.product.nutriments["sugars_100g"]) {
                        food.sugar = productInfo.product.nutriments["sugars_100g"]
                    } else {
                        food.sugar = "Sugar per serving not listed"
                    }

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })

// Function to add to DOM
addFoodToDom = (food4DOM) => {
    document.querySelector(".foodList").innerHTML += food4DOM
}

// Function to return a string template
foodFactory = (foodObj) => {
    return `
        <div class="horizontal_contain">
            <h1>${foodObj.name}</h1>
            <p>${foodObj.ethnicity}<br>${foodObj.category}</p>
            <p>${foodObj.ingredients}</p>
            <p>${foodObj.country}</p>
            <p>${foodObj.calories}</p>
            <p>${foodObj.fat} grams of fat per serving</p>
            <p>${foodObj.sugar} grams of sugar per serving</p>
        </div>
    ` 
}