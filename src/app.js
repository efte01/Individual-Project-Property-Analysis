const form = document.querySelector('form') // Reference form class in html
const searchInput = document.querySelector('input') // Reference input box in html
const BASE_URL = "http://localhost:8000/" // Base url for server, which we add onto at the end

form.addEventListener('submit', formSubmitted); // Listener to the submit button, anytime its clicked run function

// Create a table, with a 'thead', and blank 'tbody'. the loop will then create a 'tr' and then all the 'th' + 'td' attributes
var table_class = document.createElement("table")
table_class.className = "table table-hover";
table_class.id = "table_id"
table_class.style.display = "none"
document.getElementsByTagName('body')[0].appendChild(table_class);
const thead_html = `<thead><tr class="table-active"><th scope="col">NAME</th><th scope="col">ADDRESS</th><th scope="col">PUBLICATION DATE</th><th scope="col">DEADLINE DATE</th><th scope="col">URL</th><th scope="col">EXECUTOR NAME</th><th scope="col">EXECUTOR ADDRESS</th></tr></thead>`
const table_class_id = document.querySelector('#table_id')
table_class_id.insertAdjacentHTML("beforeend",thead_html)
var tbody_class = document.createElement("tbody")
tbody_class.id = "names";
document.getElementsByTagName('table')[0].appendChild(tbody_class);
const names_id = document.querySelector('#names')

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
    table_class.style.display = "block"
    while (tbody_class.hasChildNodes()) {
        tbody_class.removeChild(tbody_class.firstChild);
    } // If divs exist already, remove all of them, so we can input new ones
    results.forEach(names_array => {
        const title = `<tr><th scope="row">` + names_array.name + `</th><td>` + names_array.address + `</td><td>` + names_array.publication_date + `</td><td>`
            + names_array.deadline_date + `</td><td>` + names_array.link + `</td><td>` + names_array.executor_name + `</td><td>` + names_array.executor_address + `</td></tr>`

        names_id.insertAdjacentHTML("beforeend",title)
    }) // For each item in array, create a HTML element and append
}//

// Reads from http://localhost:8000/results, then converts it to a HTML format