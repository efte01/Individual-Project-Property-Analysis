const BASE_URL = "http://localhost:8000/2" // Base url for server, which we add onto at the end

// Create a table, with a 'thead', and blank 'tbody'. the loop will then create a 'tr' and then all the 'th' + 'td' attributes
var div = document.createElement("div")
div.id = "container"
div.className ="d-flex justify-content-center"
document.getElementsByTagName('body')[0].appendChild(div);

var table_class = document.createElement("table")
table_class.className = "table table-active";
table_class.style = "width:auto; color:white;"
table_class.id = "table_id"
table_class.style.display = "none"
document.getElementsByTagName('div')[2].appendChild(table_class);
var tbody_class = document.createElement("tbody")
tbody_class.id = "names";
document.getElementsByTagName('table')[0].appendChild(tbody_class);
const names_id = document.querySelector('#names')

function formSubmitted() {
    console.log("called formsubmitted")
    getSearchResults()
        .then(showResults);
}// Get input value and push through to next function

function getSearchResults() {
    return fetch(`${BASE_URL}`)
        .then(res => res.json());
}// Fetch the array from the localhost:8000/custom url

function showResults(results) {
    table_class.style.display = "block"
    while (tbody_class.hasChildNodes()) {
        tbody_class.removeChild(tbody_class.firstChild);
    } // If divs exist already, remove all of them, so we can input new ones

    results.forEach(array => {
        if (array.auction_name !== "London Auctioneer Name") {
            const title = `<tr><th scope="row">` + array.auction_name + `</th><td>` + array.auction_date_one + `</td><td>`
                + array.auction_date_two + `</td><td>` + array.auction_date_three + `</td></tr>`
            names_id.insertAdjacentHTML("beforeend",title)
        }else {
            const table_class_id = document.querySelector('#table_id')
            const thead_html = `<thead><tr class="table-active"><th scope="col">AUCTIONEER</th><th scope="col">` + array.auction_date_one + `</th><th scope="col">`
                + array.auction_date_two + `</th><th scope="col">` + array.auction_date_three + `</th></tr></thead>`
            table_class_id.insertAdjacentHTML("beforeend",thead_html)
        }

    }) // For each item in array, create a HTML element and append
}//

// Reads from http://localhost:8000/results, then converts it to a HTML format