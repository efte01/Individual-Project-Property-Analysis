const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const names = []

//const url ='https://www.thegazette.co.uk/wills-and-probate/notice/data.htm?text=&location-postcode-1=&location-distance-1=1&location-local-authority-1=&numberOfLocationSearches=1&start-date-of-death=&end-date-of-death=&start-publish-date=&end-publish-date=&start-claim-expiry-date=&end-claim-expiry-date=&edition=&london-issue=&edinburgh-issue=&belfast-issue=&sort-by=&results-page-size=10&results-page=1';
const url = 'https://www.thegazette.co.uk/notice/4053555/data.html?view=linked-data'
let temp_url =''
let temp_html = null
let temp_$ = null

let name = null
let address = null

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.hasPersonalRepresentative-row').each(function (){
            const first_name = $(this).find('tr[class="firstName-row"]').find('td[class="value"]').text()
            const family_name = $(this).find('tr[class="familyName-row"]').find('td[class="value"]').text()
            const name_row = $(this).find('tr[class="name-row"]').find('td[class="value"]').text()

            if (name_row === "") {
                name = first_name + " " + family_name
            }else
                name = name_row

            const address1 = $(this).find('tr[class="streetAddress-row"]').find('td[class="value"]').text()
            const address2 = $(this).find('tr[class="extendedAddress-row"]').find('td[class="value"]').text()
            const address3 = $(this).find('tr[class="locality-row"]').find('td[class="value"]').text()
            const address4 = $(this).find('tr[class="postalCode-row"]').find('td[class="value"]').text()

            address = address1 + ", " + address2 + ", " + address3 + ", " + address4
        })
        console.log("")

        // $('.feed-item').each(function (){
        //     const name = $(this).find('h3').text()
        //     const address = $(this).find('div[class=content]').find('dd:first').text()
        //     const publication_date = $(this).find('dl[class="metadata publication-date"]').find('time').text()
        //     const deadline_date = $(this).find('div[class=content]').find('dd:last').find('time').text()
        //     const link ="https://www.thegazette.co.uk" + $(this).find('a[class="btn btn-full-notice"]').attr('href') + "?view=linked-data"
        //     names.push({
        //         name,
        //         address,
        //         publication_date,
        //         deadline_date,
        //         link
        //     })
        //     // temp_url = link
        //     // axios(temp_url).then(response => {
        //     //     temp_html = response.data
        //     //     temp_$ = cheerio.load(temp_html)
        //     //
        //     //     console.log(temp_$)
        //     // })
        //
        //
        // })
    })

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))