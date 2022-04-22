const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const names = []

let url ='https://www.thegazette.co.uk/wills-and-probate/notice/data.htm?text=&location-postcode-1=&location-distance-1=1&location-local-authority-1=&numberOfLocationSearches=1&start-date-of-death=&end-date-of-death=&start-publish-date=&end-publish-date=&start-claim-expiry-date=&end-claim-expiry-date=&edition=&london-issue=&edinburgh-issue=&belfast-issue=&sort-by=&results-page-size=10&results-page=1';

axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.feed-item').each(function (){
            let name = $(this).find('h3').text()
            let address = $(this).find('div[class=content]').find('dd:first').text()
            const publication_date = $(this).find('dl[class="metadata publication-date"]').find('time').text()
            const deadline_date = $(this).find('div[class=content]').find('dd:last').find('time').text()
            const link ="https://www.thegazette.co.uk" + $(this).find('a[class="btn btn-full-notice"]').attr('href') + "?view=linked-data"

            names.push({
                name,
                address,
                publication_date,
                deadline_date,
                link
            })
        })
        console.log(names)
    })

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))