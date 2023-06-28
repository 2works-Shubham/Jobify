import mongoose from 'mongoose'

const connectDB = (url) => {
    return mongoose.connect(url).then(()=>{console.log("DB success");})
}

export default connectDB
