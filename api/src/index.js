import express from 'express'
import bodyParser from "body-parser"
import { initializeDb, deleteFirestore } from './db'

const app = express()

initializeDb(db => {
  // app.use('/api', routes(db, logger))
  // View all ships
  app.get('/ships', async (req, res) => {
    let ships = []
    try {
      const shipSnapshot = await db.collection('ships').get()
      shipSnapshot.forEach((doc) => {
        ships.push(doc.data())
      })
      res.status(200).send(ships)
    } catch(error) {
      res.status(400).send(error)
    }
  })
})

const main = express()
main.use('/api/v1', app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }))

const startupForGoogleCloudFunction = (expressApp) => {
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'ci') {
    // we are running the api locally here
    const port = 3000
    return main.listen(port, () => {
      console.log('Listening on port ' + port)
    })
  } else {
    // we are in Google's cloud function environment here
    const functions = require('firebase-functions')
    return functions.https.onRequest(expressApp)
  }
}

export default main

export const stop = async () => {
  await deleteFirestore()
  api.close()
}

export const api = startupForGoogleCloudFunction(main)
