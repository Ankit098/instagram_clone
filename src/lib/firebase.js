import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// for hydrating firestone with dummy data
// import { seedDatabase } from '../seed'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

const firebase = Firebase.initializeApp(config)
const { FieldValue } = Firebase.firestore

// seedDatabase(firebase)

export { firebase, FieldValue }