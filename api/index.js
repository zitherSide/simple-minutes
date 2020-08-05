const express = require('express')
const app = express()
const fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/api/save', async (req, res) => {
    console.log("save Received")
    console.log()
    fs.writeFile('assets/json/items.json', JSON.stringify(req.body.data), (err) => {
        if(err)
            console.log(err)
        else
            console.log("content wrote: " + req.body.data)
    })
    await res.end(req.body)
})

app.post('/api/saveAttrib', async (req, res) => {
    console.log("saveAttrib Received")
    console.log(req.body.typename)
    fs.writeFile(`assets/json/${req.body.typename}.json`, JSON.stringify(req.body.data), (err) =>{
        if(err)
            console.log(err)
        else
            console.log("attrib wrote: " + req.body.data)
    })
    await res.end(req.body)
})

app.get('/api/get', (req, res) => {
    let content = fs.readFileSync('assets/json/items.json')
    res.send(JSON.parse(content));
})

export default app