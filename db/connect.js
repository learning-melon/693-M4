import mongoose from 'mongoose'
//import {} from 'dotenv/config'

/* mongoose
    .connect(process.env.DB)
    .then(()=> console.log('Connected to the database'))
    .catch((err) => console.log(err)) */

//also allows for multiple db connections
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB