"use strict";
//Include the link to your Github Repository here:
//Link: https://github.com/melissasjostedt/U2

// Adds a new character object and returns it
function createNewCharacter(name, age, gender, breed) {
    let character = {
        name: name,
        age: age,
        gender: gender,
        breed: breed,
       

    };
    return character;

} 
// Adds a new character to the database
function addCharacterToDatabase (database, character) {
    database.push(character);
}

// To remove a character from our database we use this for loop to remove the character with the right id.
function removeCharacterById(characters, id) {
    for (let i = 0; i < characters.length; i++) {
        let character = characters[i];
        if (character.id == id){
         characters.splice(i, 1);
         return;

        }
    }
}

// calls characters by their gender
function getCharactersByGender(characters, gender) {
    let charactersByGender = [];

    for (let character of characters) {
        if (character.gender.toLowerCase() == gender.toLowerCase()) {
            charactersByGender.push(character);
        }
    }

    return charactersByGender;
}

// Calls characters by their breed
function getCharactersByBreed(characters, breed) {
    let charactersByBreed = [];

    for (let character of characters) {
        if (character.breed.toLowerCase() == breed.toLowerCase()) {
            charactersByBreed.push(character);
        }
    }

    return charactersByBreed;
}

// calls characters by their age 
function getCharactersByAge(characters, age) {
    let charactersByAge= [];

    for (let character of characters)  {
        if (character.age == age) {
            charactersByAge.push(character);
        }
    }
    return charactersByAge;
}

// character objectet becomes an HTMLelement
function renderCharacter(character) {
    let div = document.createElement("div");
    div.classList.add("character");
    div.id = character.id;
    

    div.innerHTML=`
    <div>${character.id}</div>
    <div>${character.name}</div>
    <div>${character.age}</div>
    <div>${character.gender}</div>
    <div>${character.breed}</div>
    <button type="button">Remove</button>
  `;

return div;

}
// arrayen with caracters turns into HTML
function renderCharacters(characters){
    let charactersElement = document.getElementById("characters");
    charactersElement.innerHTML= "";

    // Go through all characters and insert their HTML
    for (let character of characters) {
        let characterElement = renderCharacter(character);
        charactersElement.appendChild(characterElement);
    }
    // Add remove-handlers for the characters
    setRemoveCharacterHandlers();
}


// When <form id="add-character-form"> is submitted
function onAddCharacterSubmit(event) {
    event.preventDefault();

    let name= document.getElementById("name").value;
    let age= Number(document.getElementById("age").value);
    let gender= document.getElementById("gender").value;
    let breed= document.getElementById("breed").value;
    


    let character = createNewCharacter(name, age, gender,breed);
    // Check if any input is empty then the character should not be added! 
    if(name == ""){
        return alert("Fill in all the information please.");
    }
     if(age == ""){
        return alert("Fill in all the information please.");
    }
     if(gender == ""){
        return alert("Fill in all the information please.");
    }
    if(breed == ""){
        return alert("Fill in all the information please.");
    }
   
   // Calculate the newly created characters ID
    character.id =database[database.length -1].id +1; 

    addCharacterToDatabase(database, character);
    renderCharacters(database);

    // Reset (empty) all form fields
    let form = document.getElementById("add-character-form");
    form.reset();
}

//Form above the characters grid. Handlers diffrent filters, adds characters
function setAddCharacterHandler() {
    let form = document.getElementById("add-character-form");
    form.addEventListener("submit", onAddCharacterSubmit);
}

 // Add "click" event handler to all remove-buttons
//When user clicks the remove-character-button  
function onRemoveCharacterClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    if (confirm(`Are you sure you want to remove this Character?`)) {
    removeCharacterById(database, id);
    renderCharacters(database);
    }
} 


 
// Add "click" event handler to all remove-buttons
function setRemoveCharacterHandlers() {
    let buttons = document.querySelectorAll(".character button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveCharacterClick);
    }
}

// Filter characters by gender
function onFilterByGenderSubmit(event) {
    event.preventDefault();
    // Get the characters by gender
    // Re-render them
    let gender = document.getElementById("filter-gender").value;
    let characters = getCharactersByGender(database, gender);
    renderCharacters(characters);
}


//Filters by age in database
function onFilterByAgeSubmit(event) {
    event.preventDefault();
// Age?
    let age = document.getElementById("filter-age").value;
// Get the characters by age 
    let characters = getCharactersByAge(database, age);
// Re-render them 
    renderCharacters(characters); 
}


// Filter characters by breed
function onFilterByBreedSubmit(event) {
    event.preventDefault();
    // Get the characters by breed
    // Re-render them
    let breed = document.getElementById("filter-breed").value;
    let characters = getCharactersByBreed(database, breed);
    renderCharacters(characters);
}

// after filtrering of characters, the show all button resets the filters and show all objects again
function onShowAllClick() {
    document.getElementById("filter-gender").value = "";
    document.getElementById("filter-age").value = "";
    document.getElementById("filter-breed").value = "";
    renderCharacters(database);
}

// Add addEventListener to filter buttons
function setFilterCharacterHandlers() {
    let genderForm = document.getElementById("filter-by-gender");
    let ageForm = document.getElementById("filter-by-age");
    let breedForm = document.getElementById("filter-by-breed");
    let showAll = document.getElementById("show-all");

    genderForm.addEventListener("submit", onFilterByGenderSubmit);
    breedForm.addEventListener("submit", onFilterByBreedSubmit);
    ageForm.addEventListener("submit", onFilterByAgeSubmit);
    showAll.addEventListener("click", onShowAllClick);
}

// Initialize the page
renderCharacters(database);
setAddCharacterHandler();
setFilterCharacterHandlers();
