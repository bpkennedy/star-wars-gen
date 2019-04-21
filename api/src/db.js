import * as admin from 'firebase-admin'
let firebaseAppInstance

export const initializeDb = (callback) => {
  if (process.env.NODE_ENV === 'development') {
    const serviceAccount = require('../dev-firebase-security.json')
    firebaseAppInstance = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://star-wars-generations-dev.firebaseio.com/'
    })
  } else if (process.env.NODE_ENV === 'ci') {
    firebaseAppInstance = admin.initializeApp({
      credential: admin.credential.cert({
        'project_id': process.env.FB_UAT_PROJECT_ID,
        'client_email': process.env.FB_UAT_CLIENT_EMAIL,
        'private_key': process.env.FB_UAT_PRIVATE_KEY,
      }),
      databaseURL: 'https://star-wars-generations-dev.firebaseio.com/'
    })
  } else {
    const functions = require('firebase-functions')
    firebaseAppInstance = admin.initializeApp(functions.config().firebase)
  }
  const db = admin.firestore()
  callback(db)
}

export const deleteFirestore = async () => {
  await firebaseAppInstance.delete()
}
