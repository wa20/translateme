import mongoose from 'mongoose'


// const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@translato.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000`

const connectionString = process.env.MONGO_DB_URI

if(!connectionString) {
    throw new Error ("Define correct environment variables")
}

const connectDB = async () => {
     if(mongoose.connection?.readyState >= 1){
        console.log("---- Conencted to MongoDB----")
     }

    try {
        await mongoose.connect(connectionString);
        console.log("--- Connection started with MongoDB ---")
    } catch (error) {
        console.error("Could not conenct to MongoDB", error)
        
    }

};

export default connectDB