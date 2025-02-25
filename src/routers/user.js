const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const { sendWelcomeEmail } = require('../emails/account')
const { sendCancellationEmail } = require('../emails/account')
const multer = require('multer')
const sharp = require('sharp')

// SHOW ALL USERS
router.get('/users', async (req, res) => {
    const users = await User.find({})
    try {
        res.send(users)
    } catch (e) {
        res.status(501).send()
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// })
// CREATE A USER
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)

        const token = await user.generateAuthToken()
        // res.status(201).send(user)
        res.status(201).send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(500).send()
        //res.status(400).send(e)
    }

})
// USER LOGIN
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })

    } catch (e) {
        res.status(400).send()
    }
})

// USER LOGOUT #111
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// USER LOGOUT FROM ALL SESSIONS or DEVICE #111
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send()

        //res.status(500).send()
    }
})


// UPDATE A USER
router.patch('/users/me', auth, async (req, res) => {
    // ERROR HANDLING TO LIMIT THE UPDATES JUST WITHIN THE ALLOWED UPDATES
    // --------------------------- START ---------------------------------
    const updates = Object.keys(req.body)
    // Object.key() method returns an ARRAY of a given object own enumerable property names
    const allowedUpdates = ['name', 'email', 'password', 'age'] // THESE ARE THE PROPERTIES WE LET USER TO UPDATE
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }
    // ---------------------- END OF ERROR HANDLING ---------------------
    try {
        updates.forEach((update) => { req.user[update] = req.body[update] })
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

const upload = multer({
    //dest: 'avatars', // this was commented in lesson #127
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// DELETE AVATAR
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

// DELETE A USER
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router