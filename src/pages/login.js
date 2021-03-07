import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import FirebaseContext from '../context/firebase'

export default function Login() {
  useEffect(() => {
    document.title = 'Login - Instagram'
  }, [])

  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const isInvalidData = password === '' || emailAddress === ''

  const handleLogin = () => {

  }

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      {/* <div className="flex">

      </div> */}
      <p>Login page</p>
    </div>
  )
}