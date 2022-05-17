const form = document.querySelector('form') // Reference form class in html
const searchInput = document.querySelector('input') // Reference input box in html
const BASE_URL = "http://localhost:8000/" // Base url for server, which we add onto at the end

form.addEventListener('submit', formSubmitted); // Listener to the submit button, anytime its clicked run function

// Create a table, with a 'thead', and blank 'tbody'. the loop will then create a 'tr' and then all the 'th' + 'td' attributes
var table_class = document.createElement("table")
table_class.className = "table table-active";
table_class.style = "color:white; padding:0px 100px 50px 100px"
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

var email_text = `
    <div class="d-flex justify-content-center" style="width: auto; margin: 10px 0 10px 0">
        <form class="text-center">
            <p style="font-size: 12px; color: white; width: 800px; text-align:left;" id="email_text">
                Dear whom it may concern,<br><br>
                
                I have been notified that; you are the Administrating Executor of the deceased estate for names in subject.<br><br>

                In regards to the properties, of the deceased. I wanted to check if the properties are up for sale. As a property investor I have personal interest within the area in regards to properties and was notified that these may be potentially available.<br>          
                If the properties named above are up for sale, I'd appreciate it if we could have a quick chat before the properties are listed through Agents or Auction.<br><br><br>
                
                
                Kind Regards,
            </p>
            <button class="btn btn-outline-light" id="copy_button" >Copy</button>
        </form>
    </div>`
document.getElementsByTagName('body')[0].insertAdjacentHTML("beforeend",email_text)

const copy_button = document.getElementById('copy_button')
copy_button.addEventListener('click',function(event) {
    navigator.clipboard.writeText(document.getElementsByTagName('p')[1].innerText).then(function() {
        alert("Copied to clipboard");
    }, function() {
        alert("Try again");
    });
});

const submit = document.getElementById('submit')
const input = document.getElementById('postcode_id')
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
    const searchTerm2 = searchTerm.replace(/ /g, '+')+"3"; // Replace all spaces in postcode with +
    return fetch(`${BASE_URL}${searchTerm2}`)
        .then(res => res.json());
}// Fetch the array from the localhost:8000/custom url

function showResults(results) {
    table_class.style.display = "block"
    while (tbody_class.hasChildNodes()) {
        tbody_class.removeChild(tbody_class.firstChild);
    } // If divs exist already, remove all of them, so we can input new ones
    results.forEach(array => {
        const title = `<tr><th scope="row">` + array.name + `</th><td>` + array.address + `</td><td>` + array.publication_date + `</td><td>`
            + array.deadline_date + `</td><td>` + array.link + `</td><td>` + array.executor_name + `</td><td>` + array.executor_address + `</td></tr>`

        names_id.insertAdjacentHTML("beforeend",title)
    }) // For each item in array, create a HTML element and append
}//

// Reads from http://localhost:8000/results, then converts it to a HTML format