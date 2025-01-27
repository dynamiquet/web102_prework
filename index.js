/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let game of games) {
        // create a new div element, which will become the game card
        const game_Card = document.createElement("div");

        // add the class game-card to the list
        game_Card.classList.add("game-card");
        
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_Card.innerHTML = `
        <img src="${game.img}" alt="${game.name}" class="game-img">
        <h2>${game.name}</h2>
        <p>Backers: ${game.backers}</p>
        <p>Pledged: $${game.pledged.toLocaleString()}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(game_Card)
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const individual_Contributions = GAMES_JSON.reduce((acc, game) => {
    return game.backers + acc;
}, 0) 

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${individual_Contributions.toLocaleString("en-US")}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_raised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `${total_raised.toLocaleString("en-US")}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const number_of_games = GAMES_JSON.length;
gamesCard.innerHTML = `${number_of_games.toLocaleString("en-US")}`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const not_yet_fully_funded_games = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(not_yet_fully_funded_games);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fully_funded_games = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fully_funded_games);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
allBtn.addEventListener("click", showAllGames)
fundedBtn.addEventListener("click", filterFundedOnly)
unfundedBtn.addEventListener("click", filterUnfundedOnly)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const number_of_unfunded_games = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const total_number_of_games = GAMES_JSON.length;
const unfunded_games_message = `A total of $${total_raised.toLocaleString("en-US")} has been raised for ${total_number_of_games - number_of_unfunded_games} games. Currently, ${number_of_unfunded_games} ${number_of_unfunded_games > 1 ? "games remain" : "game remains"} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const unfunded_games_message_DOM = document.createElement("p");
unfunded_games_message_DOM.innerHTML = unfunded_games_message;
descriptionContainer.appendChild(unfunded_games_message_DOM);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [top_game, second_top_game, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top_game_name = document.createElement("p");
top_game_name.innerHTML = top_game.name;
firstGameContainer.appendChild(top_game_name);

// do the same for the runner up item
const second_top_game_name = document.createElement("p");
second_top_game_name.innerHTML = second_top_game.name;
secondGameContainer.appendChild(second_top_game_name);