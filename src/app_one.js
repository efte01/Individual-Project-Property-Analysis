const test_input = document.getElementById('test_input')
test_input.addEventListener('change', test_function)

function test_function(event) {
    event.preventDefault()
    console.log(test_input.value)
}

function formSubmitted(event) {
    event.preventDefault()

    getSearchResults(searchTerm)
        .then(showResults);
}// Get input value and push through to next function

function getSearchResults(searchTerm) {
    const searchTerm2 = searchTerm.replace(/ /g, '+')+"4"; // Replace all spaces in postcode with +
    return fetch(`${BASE_URL}${searchTerm2}`)
        .then(res => res.json());
}// Fetch the array from the localhost:8000/custom url

function showResults(results) {

}//

// Reads from http://localhost:8000/results, then converts it to a HTML format

