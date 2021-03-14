import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'

import useUser from '../../hooks/use-user'
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'

export default function Header({ 
  photosCount, 
  followerCount, 
  updateFollowerCount, 
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername
  }
}) {
  const { user } = useUser()
  const [isFollowing, setIsFollowing] = useState(false)
  const activeBtnFollow = user.username && user.username !== profileUsername

  useEffect(() => {
    async function isLoggedInUserFollowingProfile() {
      const following = await isUserFollowingProfile(user.username, profileUserId)
      setIsFollowing(following)
    }
    if(user.username && profileUserId) {
      isLoggedInUserFollowingProfile()
    }
  }, [user.username, profileUserId])

  const handleToggleFollow = async () => {
    setIsFollowing(isFollowing => !isFollowing)
    updateFollowerCount({
      followerCount: isFollowing ? followerCount - 1 : followerCount + 1
    })
    await toggleFollow(isFollowing, user.docId, profileDocId, profileUserId, user.userId)
  }

  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg'>
      <div className='container flex justify-center'>
        {!profileUsername ? 
          <Skeleton count={1} height={160} width={160} circle={true} />
        :
        <img 
          className='rounded-full h-40 w-40 flex'
          alt={`${profileUsername} profile`}
          src={`/images/avatars/${profileUsername}.jpg`}
        />
        }
      </div>
      {(!fullName || !followers || !following || !profileUsername) ? 
        <Skeleton count={1} height={160} />
        : 
        <div className='flex items-center justify-center flex-col col-span-2'>
          <div className='container flex items-center'>
            <p className='text-2xl mr-4'>{profileUsername}</p>
            {activeBtnFollow &&(
              <button 
                className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'
                type='button'
                onClick={handleToggleFollow}
                onKeyDown={event => {
                  if(event.key === 'Enter') {
                    handleToggleFollow()
                  }
                }}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </div>
          <div className='container flex mt-4'>
            <p className='mr-10'>
              <span className='font-bold'>{photosCount}</span>{` `}
              {photosCount === 1 ? 'photo' : 'photos'}
            </p>
            <p className='mr-10'>
              <span className='font-bold'>{followerCount}</span>{` `}
              {followerCount === 1 ? 'follower' : 'followers'}
            </p>
            <p className='mr-10'>
              <span className='font-bold'>{following.length}</span>{` following`}
            </p>
          </div>
          <div className='container mt-4'>
            <p className='font-medium'>{fullName}</p>
          </div>
        </div>
      }
    </div>
  )
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  updateFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    following: PropTypes.array,
    followers: PropTypes.array
  }).isRequired
}