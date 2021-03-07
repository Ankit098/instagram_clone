import { useEffect, useState, useContext } from 'react'

import UserContext from '../context/user'
import { getUserFromFirestoreByUserId } from '../services/firebase'

export default function useUser() {
  const [activeUser, setActiveUser] = useState({})
  const { user } = useContext(UserContext)

  useEffect(() => {
    async function getUserObjectByUserId() {
      const [response] = await getUserFromFirestoreByUserId(user.uid)
      setActiveUser(response)
    }
    if(user?.uid) {
      getUserObjectByUserId()
    }
  }, [user])

  return { user: activeUser }
}