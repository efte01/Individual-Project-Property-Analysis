const cheerio = require('cheerio')
const axios = require('axios')
const names = []
const links = []

function searchDead(searchTerm) {
    const temp_postcode = searchTerm.replace(/ /g, '+');
    const temp_url = 'https://www.thegazette.co.uk/wills-and-probate/notice/data.htm?text=&location-postcode-1=' + temp_postcode + '&location-distance-1=1&location-local-authority-1=&numberOfLocationSearches=1&start-date-of-death=&end-date-of-death=&start-publish-date=&end-publish-date=&start-claim-expiry-date=&end-claim-expiry-date=&edition=&london-issue=&edinburgh-issue=&belfast-issue=&sort-by=&results-page-size=10&results-page=1';

    return axios.get(temp_url)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            let num = 0

            let name = null
            let address = null
            let publication_date = null
            let deadline_date = null
            let link = null
            let executor_name = null
            let executor_address = null

            $('.feed-item').each(function (){
                name = $(this).find('h3').text()
                address = $(this).find('div[class=content]').find('dd:first').text()
                publication_date = $(this).find('dl[class="metadata publication-date"]').find('time').text()
                deadline_date = $(this).find('div[class=content]').find('dd:last').find('time').text()
                link = "https://www.thegazette.co.uk" + $(this).find('a[class="btn btn-full-notice"]').attr('href') + "/data.html?view=linked-data"

                if (names[num] == null) {
                    names.push({
                        name,
                        address,
                        publication_date,
                        deadline_date,
                        link,
                        executor_name,
                        executor_address
                    })
                    links.push(link)
                }else{
                    names[num].name = name
                    names[num].address = address
                    names[num].publication_date = publication_date
                    names[num].deadline_date = deadline_date
                    names[num].link = link
                    names[num].executor_name = executor_name
                    names[num].executor_address = executor_address

                    links[num] = link
                }
                num = num + 1
            })
            return axios.get(links[0])
        }) // get all names
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[0].executor_name = executor_name
            names[0].executor_address = executor_address
            return axios.get(links[1])
        }) //1
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[1].executor_name = executor_name
            names[1].executor_address = executor_address
            return axios.get(links[2])
        }) //2
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[2].executor_name = executor_name
            names[2].executor_address = executor_address

            return axios.get(links[3])
        }) //3
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[3].executor_name = executor_name
            names[3].executor_address = executor_address
            return axios.get(links[4])
        }) //4
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[4].executor_name = executor_name
            names[4].executor_address = executor_address
            return axios.get(links[5])
        }) //5
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[5].executor_name = executor_name
            names[5].executor_address = executor_address
            return axios.get(links[6])
        }) //6
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[6].executor_name = executor_name
            names[6].executor_address = executor_address
            return axios.get(links[7])
        }) //7
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[7].executor_name = executor_name
            names[7].executor_address = executor_address
            return axios.get(links[8])
        }) //8
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[8].executor_name = executor_name
            names[8].executor_address = executor_address
            return axios.get(links[9])
        }) //9
        .then(response => {
            let html = response.data
            let $ = cheerio.load(html)
            let executor_name = ""
            let executor_address = ""

            $('.hasPersonalRepresentative-row').each(function (){
                const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
                const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
                const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

                if (name_row === "") {
                    executor_name = first_name + " " + family_name
                } else {
                    executor_name = name_row
                }

                const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
                const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
                const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
                const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()
                executor_address = address1 + " " + address2 + " " + address3 + " " + address4

            })
            names[9].executor_name = executor_name
            names[9].executor_address = executor_address
            // console.log(names[9])
            // res.json()
            console.log(names.length)
            return names
        }) //10
        .catch((err) =>{
            console.log(err)
        })
}

module.exports = {
    searchDead
}