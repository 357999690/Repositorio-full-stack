require('dotenv').config()

// let PORT = process.env.PORT
// let MONGODB_URI = process.env.MONGODB_URI

// if(process.env.NODE_ENV === 'test'){
//   MONGODB_URI = process.env.TEST_MONGODB_URI
// }

const PORT = process.env.PORT
// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}