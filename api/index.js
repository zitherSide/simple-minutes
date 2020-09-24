const express = require('express')
const app = express()
const fs = require('fs')
const sqlite = require('sqlite3')
const db = new sqlite.Database('assets/db')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/api/getNames', (req, res) => {
    db.serialize( () =>{
        db.all("SELECT id, name from names", (err, rows)=>{
            res.send(rows)
        })
    })
})

app.get('/api/getTags', (req, res) => {
    db.serialize( () => {
        db.all("SELECT id, tag from tags", (err, rows) => {
            res.send(rows)
        })
    })    
})

app.get('/api/getDepartments', (req, res) => {
    db.serialize( ()=>{
        db.all("SELECT id, department from departments", (err, rows) => {
            res.send(rows)
        })
    })
})

app.get('/api/getTypes', (req,res) => {
    db.serialize( () => {
        db.all('SELECT id, type from types', (err, rows) => {
            res.send(rows)
        })
    })
})

app.get('/api/getItems', (req, res) => {
    db.serialize( () => {
        db.all("SELECT * from items", (err, rows) => {
            res.send(rows)
        })
    })
})

app.post('/api/addTag', async (req, res) => {
    console.log(req.body.tag)
    db.serialize( () => {
        db.run('INSERT into tags(tag) VALUES(?)', req.body.tag, (err) =>{
            if(err){
                console.log(err)
            }
        })
    })
    await res.end()
})

app.post('/api/addItem', async (req, res) => {
    db.serialize( () => {
        let type = req.body.type
        let department = req.body.department
        let names = JSON.stringify(req.body.names)
        let tags = JSON.stringify(req.body.tags)
        let content = req.body.content
        let created = req.body.created
        let updated = req.body.updated
        db.run('INSERT into items(type, department, names, tags, content, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [type, department, names, tags, content, created, updated], (err) => {
                if(err){
                    console.log(err)
                }
            })
    })
    await res.end()
})

export default app