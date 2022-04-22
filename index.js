const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const names = []
const links = []

const url ='https://www.thegazette.co.uk/wills-and-probate/notice/data.htm?text=&location-postcode-1=&location-distance-1=1&location-local-authority-1=&numberOfLocationSearches=1&start-date-of-death=&end-date-of-death=&start-publish-date=&end-publish-date=&start-claim-expiry-date=&end-claim-expiry-date=&edition=&london-issue=&edinburgh-issue=&belfast-issue=&sort-by=&results-page-size=10&results-page=1';

axios.get(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.feed-item').each(function (){
            let name = $(this).find('h3').text()
            let address = $(this).find('div[class=content]').find('dd:first').text()
            const publication_date = $(this).find('dl[class="metadata publication-date"]').find('time').text()
            const deadline_date = $(this).find('div[class=content]').find('dd:last').find('time').text()
            const link = "https://www.thegazette.co.uk" + $(this).find('a[class="btn btn-full-notice"]').attr('href') + "/data.html?view=linked-data"

            let executor_name;
            let executor_address;

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
        console.log(names[0])
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
        console.log(names[1])
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
        console.log(names[2])
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
        console.log(names[3])
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
        console.log(names[4])
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
        console.log(names[5])
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
        console.log(names[6])
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
        console.log(names[7])
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
        console.log(names[8])
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
        console.log(names[9])
        return axios.get(links[10])
    }) //10
    .catch((err) =>{

    })

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))