const form = document.querySelector('form') // Reference form class in html
const searchInput = document.querySelector('input') // Reference input box in html
const BASE_URL = "http://localhost:8000/" // Base url for server, which we add onto at the end

form.addEventListener('submit', formSubmitted); // Listener to the submit button, anytime its clicked run function


var div = document.createElement("div")
div.id = "container"
div.className ="d-flex justify-content-center"
document.getElementsByTagName('body')[0].appendChild(div);

// Create a table, with a 'thead', and blank 'tbody'. the loop will then create a 'tr' and then all the 'th' + 'td' attributes
var table_class = document.createElement("table")
table_class.className = "table table-active flex justify-content-center";
table_class.style = "width:auto; color:white;"
table_class.id = "table_id"
table_class.style.display = "none"
document.getElementsByTagName('div')[4].appendChild(table_class);
const thead_html = `<thead><tr class="table-active"><th scope="col">ADDRESS</th><th scope="col">ADDRESS TYPE</th><th scope="col">PRICE SOLD</th><th scope="col">DATE SOLD</th></tr></thead>`
const table_class_id = document.querySelector('#table_id')
table_class_id.insertAdjacentHTML("beforeend",thead_html)
var tbody_class = document.createElement("tbody")
tbody_class.id = "names";
document.getElementsByTagName('table')[0].appendChild(tbody_class);
const names_id = document.querySelector('#names')

const submit = document.getElementById('submit')
const input = document.getElementById('dropdown')
const result_html = document.createElement("div");
result_html.style = "margin: 0 0 20px 0"
result_html.style.display = "none"
form.insertBefore(result_html,submit)

function formSubmitted(event) {
    event.preventDefault()

    const searchTerm = searchInput.value;
    const regex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/; //Reused code

    if (searchTerm.match(regex) !== null) {
        getSearchResults(searchTerm)
            .then(showResults);

        input.className = "form-control is-valid";
        result_html.style.display = "block"
        result_html.className = "valid-feedback"
        result_html.innerText = "Success!"
    }else {
        input.className = "form-control is-invalid";
        result_html.style.display = "block"
        result_html.className = "invalid-feedback"
        result_html.innerText = "Postcode is invalid. Try again?"
    }
}// Get input value and push through to next function

function getSearchResults(searchTerm) {
    const searchTerm2 = searchTerm.replace(/ /g, '+')+"4"; // Replace all spaces in postcode with +
    return fetch(`${BASE_URL}${searchTerm2}`)
        .then(res => res.json());
}// Fetch the array from the localhost:8000/custom url

function showResults(results) {
    table_class.style.display = "block"
    while (tbody_class.hasChildNodes()) {
        tbody_class.removeChild(tbody_class.firstChild);
    } // If divs exist already, remove all of them, so we can input new ones

    results.forEach(array => {
        const title = `<tr><th scope="row">` + array.address + `</th><td>` + array.address_type + `</td><td>`
            + array.address_price + `</td><td>` + array.address_date + `</td></tr>`
        names_id.insertAdjacentHTML("beforeend",title)
    }) // For each item in array, create a HTML element and append

    if (!tbody_class.hasChildNodes()) {
        input.className = "form-control is-invalid";
        result_html.style.display = "block"
        result_html.className = "invalid-feedback"
        result_html.innerText = "No results found, with this Postcode."
    }
}//

// Reads from http://localhost:8000/results, then converts it to a HTML format