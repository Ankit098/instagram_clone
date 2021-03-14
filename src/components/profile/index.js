import { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import Photos from './photos'
import { getPhotosByUserId } from '../../services/firebase'

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState })
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
  }

  const [{ 
    profile, 
    photosCollection, 
    followerCount 
  }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUserId(user.userId)
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length })
    }

    getProfileInfoAndPhotos()
  }, [user])

  return (
    <>
    <Header 
      photosCount={photosCollection.length}
      profile={profile}  
      followerCount={followerCount}
      updateFollowerCount={dispatch}
    />
    <Photos photos={photosCollection} />
    </>
  )
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
}