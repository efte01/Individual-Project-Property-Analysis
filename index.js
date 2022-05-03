const PORT = 8000
const express = require('express')
const scraper = require('./scraper')
const app = express()
const cors = require('cors')

app.use(cors())
app.get('/:result',(req,res)=>{
    const temp_postcode = req.params.result.replace(/ /g, '+');

    scraper
        .searchDead(temp_postcode)
        .then(names => {
            res.json(names)
        })
})/*Reads from URL, then publishes to http://localhost:8000/results*/

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))