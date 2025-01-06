import express from 'express'
import {} from 'dotenv/config'
import routes from './routes/routes.js'
// import {} from './db/connect.js'
import connectDB from './db/connect.js'
import bodyParser from 'body-parser'

//create app
const app = express()

app.use(bodyParser.json()) //needs to be before routes
app.use('/api/v1/employees', routes)

//load routes into our main file

const PORT = process.env.PORT || 5000
/*app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`)
}) */

//returning a promise so using async

const init = async () => {
    try{
        await connectDB(process.env.DB)
        console.log("Connected to the database...")
        app.listen(PORT,() => {
            console.log(`Listening on port ${PORT}`)
        }) 
    }catch(err){
        console.log(err)
    }
}

init()