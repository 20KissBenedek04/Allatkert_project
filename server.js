const express = require('express')
const dbHandler = require('./dbHandler')
const JWT = require('jsonwebtoken')
const cors = require('cors')
const { where } = require('sequelize')
require('dotenv').config()

const server = express()
const PORT = process.env.PORT
const SecretKey = process.env.SECRETKEY
const expireTime = process.env.EXPIRESIN

dbHandler.zoo.sync({ alter: true })
dbHandler.user.sync({ alter: true })
dbHandler.animals.sync({alter: true})
dbHandler.species.sync({alter: true})
dbHandler.animalType.sync({alter: true})
dbHandler.enclosure.sync({alter: true})
dbHandler.medicalRecord.sync({alter: true})

server.use(express.json())
server.use(cors())

function Auth(){
    return async (req,res,next) => {
        const token = req.headers.authorization
        try {
            await JWT.verify(token, SECRETKEY)
            next()
        }
        catch(error){
            console.log('Hiba az auth-ban' + error)
            res.json({'message':'sikertelen autentikáció'}).end()
            return
        }
    }
}

server.get('/animals', async (req, res) => {
    res.status(200).json(await dbHandler.animals.findAll()).end()
})


server.post('/login', Auth(), async (req,res) => {
    const oneUser = await dbHandler.user.findOne({
        where:{
            userEmail: req.body.loginEmail,
            userPassword: req.body.loginPass
        }
    })
    if(!oneUser){
        res.status(401).json({'message':'Hibás felhasználó vagy jelszó'})
        return
    }
    const token = await JWT.sign({userName: req.body.loginUser},SECRETKEY,{expiresIn:'1h'})
    res.json({'message':'Sikeres bejelentkezés', 'token': token}).end()
})

server.post('/registration', async (req,res) => {
    const oneUser = await dbHandler.user.findOne({
        where:{
            userName: req.body.regEmail
        }
    })
    if(oneUser){
        res.status(409).json({'message':'Már létezik ilyen felhasználó'}).end()
        return
    }
    await dbHandler.user.create({
        userName: req.body.regEmail,
        userPassword: req.body.regPassword,
        userRole: req.body.regRole
    })
    res.status(201).json({'message':'Sikeres regisztráció'}).end()
})

server.post('/animals', Auth(), async (req, res) => {
    const animal = await dbHandler.findOne({
        where:{
            animalName: req.body.newAnimalName
        }
    })
    if(animal){
        res.status(409).json({'message':'Már van ilyen állat létrehozva'})
        return
    }
    await dbHandler.animals.create({
        animalName: req.body.newAnimalName,
        typeId: req.body.newTypeId,
        speciesId: req.body.newSpeciesId,
        dateofbirth: req.body.newDateofbirth,
        weight: req.body.newWeight,
        enclousre: req.body.newEnclousre,
        isActive: req.body.newIsActive
    })
})

server.get('/animals/:id/records', Auth(), async(req,res) => {
    res.status(200).json(await dbHandler.animals.findAll()).end()
})

server.post('/animals/:id/records', Auth(), async(req,res) => {
    const record = await dbHandler.findOne({
        where:{
            
        }
    })
})

server.put('/animals/:id', Auth(), async(req,res) => {
    const oneAnimals = await dbHandler.animals.findOne({
        where:{
            ID: req.params.id
        }
    })
    if(!oneAnimals){
        res.status(404).json({'message':'Nincs ilyen ID-val rendelkező állat'})
    }
    await dbHandler.animals.update({
        animalName: req.body.newAnimalName,
        speciesId: req.body.newSpeciesId,
        isActive: req.body.newisActive
    })
})




server.listen(PORT, () => console.log(`A szerver fut a ${PORT} porton`))