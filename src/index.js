const app = require('./app')
const port = process.env.PORT

// THIS IS HOW WE GET THE DATA
// 1ST CONFIGURING THE EXPRESS -- express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})