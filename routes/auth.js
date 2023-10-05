const express = require('express')
const route = express.Router()
require("dotenv").config()
const { userCollection } = require('../schemas/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

route.post('/register', async (req, res) => {
    const { full_name, username, password, role } = req.body
    const salt = bcrypt.genSaltSync(10)

    const hashedPassword = bcrypt.hashSync(password, salt)

    await userCollection.create({
        full_name,
        username,
        role,
        password: hashedPassword
    })

    res.status(201).json({
        isRequestSuccesful: true,
        message: "account created succesfully"
    })
})

route.post('/login', async (req, res) => {
    const { username, password } = req.body

    const userDetail = await userCollection.findOne({username: username })
    if(!userDetail) return res.status(404).send("user not found")

    const { username: userUsername, password: userPassword, _id, role } = userDetail

    const doesPasswordMatch = bcrypt.compareSync(password, userPassword)

    if(!doesPasswordMatch) return res.status(400).send("invalid credential")

    const token = jwt.sign({
        username: userUsername,
        user_id: _id,
        role: role
    }, secret)

    res.status(200).send({
        isRequestSuccesful: true,
        message: "user logged in successfully",
        token
    })
})

module.exports = route