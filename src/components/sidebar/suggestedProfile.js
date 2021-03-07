import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { updateFollowersOfFollowedUser, updateFollowingOfLoggedInUser } from '../../services/firebase'

export default function SuggestedProfile({ 
  profileDocId, 
  username, 
  profileId, 
  userId, 
  loggedInUserDocId 
}) {
  const [followed, setFollowed] = useState(false)

  const handleFollow = async () => {
    setFollowed(true)

    // add followed user to current user's followed array
    await updateFollowingOfLoggedInUser(loggedInUserDocId, profileId, false)

    // add current user to followers of followed user
    await updateFollowersOfFollowedUser(profileDocId, userId, false)
  }

  return !followed ? (
    <div className='flex flex-row items-center align-items justify-between'>
      <Link to={`/p/${username}`}>
        <div className='flex items-center justify-between'>
          <img 
            className='rounded-full w-8 flex mr-3'
            src={`/images/avatars/${username}.jpg`}
            alt=''
          />
          <p className='font-bold text-sm'>{username}</p>
        </div>
      </Link>
      <button 
        type='button'
        className='text-xs font-bold text-blue-medium'
        onClick={ handleFollow }
      >
        Follow
      </button>
    </div>
  ) : null
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired
}