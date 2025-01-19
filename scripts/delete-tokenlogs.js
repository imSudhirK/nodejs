require('dotenv').config();
const connect = require("mongoose").connect;
const { TokenLogModel } = require("@imsudhirk/models")

const mongoUri = process.env.MONGO_URI

async function connectDb() {
    connect(mongoUri).then(() => {
        console.log("Mongo DB Connected");
    }).catch((err) => {
        console.log("Error Connecting to Mongo: ", err);
    });
}

async function deleteTokenLogs() {
    await connectDb();
    // const tokenlog00 = await TokenLogModel.default.find({});
    const currDate = new Date();
    const result = await TokenLogModel.default.deleteMany({
        accessTokenExpiresAt: { $lt: currDate }
    })
    console.log(result)
}

deleteTokenLogs()