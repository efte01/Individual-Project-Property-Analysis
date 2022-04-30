function read_url_data(host_url, document){
    var feed_div = document.createElement("div")
    feed_div.id = "feed";
    document.getElementsByTagName('body')[0].appendChild(feed_div);

    const feedDisplay = document.querySelector('#feed')

    fetch('http://localhost:8000'+host_url)
        .then(response => {return response.json()})
        .then(data => {
            data.forEach(names_array => {
                const title = `<div><h3>` + names_array.name + `</h3><p>` + names_array.address + `</p><p>` + names_array.publication_date + `</p><h4>`
                    + names_array.deadline_date + `</h4><h4>` + names_array.link + `</h4><h4>` + names_array.executor_name + `</h4><h4>` + names_array.executor_address + `</h4></div>`
                feedDisplay.insertAdjacentHTML("beforeend",title)
            })
        })// Reads from http://localhost:8000/results, then converts it to a HTML format
}// read_url_data('/results')