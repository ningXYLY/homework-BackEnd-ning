const admin = require("firebase-admin")
const config = require("./config")
const serviceAccount = require("./node-16ebc-firebase-adminsdk-79c93-c639880773.json")
const firebaseConfig = config.firebaseConfig

const database = admin.initializeApp({
    firebaseConfig,
    credential:admin.credential.cert(serviceAccount)
})

module.exports = {
    database
}