const form = document.querySelector('form')
const searchInput = document.querySelector('input')

const BASE_URL = "http://localhost:8000/"

form.addEventListener('submit', formSubmitted);

var feed_div = document.createElement("div")
feed_div.id = "feed";
document.getElementsByTagName('body')[0].appendChild(feed_div);

const feedDisplay = document.querySelector('#feed')

function formSubmitted(event) {
    event.preventDefault()

    const searchTerm = searchInput.value;
    getSearchResults(searchTerm)
        .then(showResults);
}

function getSearchResults(searchTerm) {

    const searchTerm2 = searchTerm.replace(/ /g, '+');
    return fetch(`${BASE_URL}${searchTerm2}`)
        .then(res => res.json());
}

function showResults(results) {
    results.forEach(names_array => {
        const title = `<div><h3>` + names_array.name + `</h3><p>` + names_array.address + `</p><p>` + names_array.publication_date + `</p><h4>`
            + names_array.deadline_date + `</h4><h4>` + names_array.link + `</h4><h4>` + names_array.executor_name + `</h4><h4>` + names_array.executor_address + `</h4></div>`
        feedDisplay.insertAdjacentHTML("beforeend",title)
    })
}

//
// fetch(`${BASE_URL}results`)
//     .then(response => {return response.json()})
//     .then(data => {
//
//     })// Reads from http://localhost:8000/results, then converts it to a HTML format