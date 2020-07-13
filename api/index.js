const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/api/post', async (req, res) => {
    fs.writeFile('assets/json/items.json', JSON.stringify(req.body.data), (err) => {
        if(err)
            console.log(err)
        else
            console.log("wrote")
    })
    await res.end(req.body)
})

app.get('/api/get', (req, res) => {
    let content = fs.readFileSync('assets/json/items.json')
    res.send(content);
})

export default app