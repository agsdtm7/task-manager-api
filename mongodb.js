// UNUSED!!!
// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

// const { MongoClient, ObjectID } = require('mongodb')

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const databaseName = 'task-manager'

//const id = new ObjectID()
//console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('tasks').findOne({ _id: new ObjectID("5f737ee022bc4c27753f912b") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log(user)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, users) => {
    //     if (error) {
    //         return console.log('unable to fetch')
    //     }
    //     console.log(users)
    // })

    // --- SAMPLE TO DELETE ONE DOCUMENT ---
    // db.collection('tasks').deleteOne({
    //     description: 'wash dishes'
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // --- SAMPLE TO DELETE MANY DOCUMENT ---
    // db.collection('users').deleteMany({
    //     age: 36
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // --- SAMPLE TO UPDATE MANY DOCUMENTS ---
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // --- SAMPLE TO UPDATE ONE DOCUMENT ---
    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("5f6a3d65acdcbee6ad27616d")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // IMPORTANT NOTE: You could also chain the update above WITHOUT creating the function
    // i.e: db.collection(...).updateOne({...},{...}).then((result) => {...}).catch((error) => {...}) 

    // --- SAMPLE TO INSERT MANY DOCUMENTS ---
    // db.collection('tasks').insertMany([
    //     { description: 'purchase stocks', completed: false },
    //     { description: 'buy bra', completed: false },
    //     { description: 'withdraw $200', completed: false }], (error, result) => {
    //         if (error) {
    //             return console.log('unable to insert documents')
    //         }
    //         console.log(result.ops)
    //     })
    // --- SAMPLE TO FIND ONE DOCUMENT ---
    // db.collection('users').findOne({ name: 'Zen' }, (error, user) => {
    //     if (error) {
    //         return console.log('unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 28 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 28 }).count((error, count) => {
    //     console.log(count)
    // })
})