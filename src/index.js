const express = require('express')
require('./db/mongoose')
const fs = require('fs')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT

// THIS IS HOW WE GET THE DATA
// 1ST CONFIGURING THE EXPRESS -- express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

process.on('uncaughtException', (err, origin) => {
    fs.writeSync(
        process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`
    )
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})