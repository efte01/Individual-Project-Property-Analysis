const form = document.querySelector('form') // Reference form class in html
const searchInput = document.querySelector('input') // Reference input box in html
const BASE_URL = "http://localhost:8000/" // Base url for server, which we add onto at the end

form.addEventListener('submit', formSubmitted); // Listener to the submit button, anytime its clicked run function

// Create a HTML List, so we can dynamically add 10 elements
var list_div = document.createElement("div")
list_div.id = "names";
document.getElementsByTagName('body')[0].appendChild(list_div);
const feedDisplay = document.querySelector('#names')

function formSubmitted(event) {
    event.preventDefault()

    const searchTerm = searchInput.value;
    getSearchResults(searchTerm)
        .then(showResults);
}// Get input value and push through to next function

function getSearchResults(searchTerm) {
    const searchTerm2 = searchTerm.replace(/ /g, '+'); // Replace all spaces in postcode with +
    return fetch(`${BASE_URL}${searchTerm2}`)
        .then(res => res.json());
}// Fetch the array from the localhost:8000/custom url

function showResults(results) {
    while (list_div.hasChildNodes()) {
        list_div.removeChild(list_div.firstChild);
    } // If divs exist already, remove all of them, so we can input new ones
    results.forEach(names_array => {
        const title = `<div><p>` + names_array.name + `</p><p>` + names_array.address + `</p><p>` + names_array.publication_date + `</p><p>`
            + names_array.deadline_date + `</p><p>` + names_array.link + `</p><p>` + names_array.executor_name + `</p><p>` + names_array.executor_address + `</p></div>`

        feedDisplay.insertAdjacentHTML("beforeend",title)
    }) // For each item in array, create a HTML element and append
}//

// Reads from http://localhost:8000/results, then converts it to a HTML format