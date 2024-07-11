import mongoose from 'mongoose'

const connectToMongoDB=async()=>{
    try {
        mongoose.connect(process.env.MONGO_DB_URI,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            // useCreateIndex:true,
            // useFindAndModify:false
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}

export default connectToMongoDB

