const express = require('express')
const dbHandler = require('./dbHandler')
const JWT = require('jsonwebtoken')
const cors = require('cors')
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

server.get('/user', async (req, res) => {
    res.status(200).json(await dbHandler.user.findAll()).end()
})

server.get('/firstUser', async (req, res) => {
    res.status(200).json(await dbHandler.user.findOne()).end()
})

server.post('/login', async (req,res) => {
    console.log(req.body)
    const oneUser = await dbHandler.user.findOne({
        where:{
            userName: req.body.loginUser,
            userPassword: req.body.loginPass
        }
    })
    if(!oneUser){
        res.status(401).json({'message':'Hibás felhasználó vagy jelszó'})
        return
    }
    const token = await JWT.sign({userName: req.body.loginUser}, SECRETKEY, {expiresIn:'1h'})
    res.json({'message':'Sikeres bejelentkezés', 'token': token}).end()
})

server.post('/registration', async (req,res) => {
    console.log(req.body)
    const oneUser = await dbHandler.user.findOne({
        where:{
            userName: req.body.regUser
        }
    })
    if(oneUser){
        res.status(409).json({'message':'Már létezik ilyen felhasználó'}).end()
        return
    }
    await dbHandler.user.create({
        userName: req.body.regUser,
        userPassword: req.body.regPassword
    })
    res.status(201).json({'message':'Sikeres regisztráció'}).end()
})

server.post('/user', async (req, res) => {
    console.log('Ez itt a body:')
    console.log(req.body)
    const oneUser = await dbHandler.user.findOne({
        where: {
            userName: req.body.newUserName
        }
    })
    if(!oneUser){
        res.status(409).json({'message':'Sikertelen létrehozás, már létező felhasználónév!'}).end()
        return
    }
    await dbHandler.user.create({
        userName: req.body.newUserName,
        userEmail: req.body.newUserEmail,
        userPassword: req.body.newUserPassword,
        role: req.body.newRole
    })
    res.status(201).json({ 'message': 'Sikeres létrehozás' }).end()
})




server.listen(PORT, () => console.log(`A szerver fut a ${PORT} porton`))