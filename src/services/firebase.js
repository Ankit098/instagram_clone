import { firebase, FieldValue } from '../lib/firebase'

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get()

  return result.docs.length > 0
}

export async function getUserFromFirestoreByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
  return user
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase
    .firestore()
    .collection('users')
    .limit(10)
    .where('userId', '!=', userId)
    .get()

  const suggestedProfiles = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  })).filter((profile) => !following.includes(profile.userId))

  return suggestedProfiles
}

export async function updateFollowersOfFollowedUser(
  profileDocId, 
  loggedInUserId, 
  isFollowingProfile
) {
  return firebase 
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserId) 
        : FieldValue.arrayUnion(loggedInUserId)
    })
}

export async function updateFollowingOfLoggedInUser(
  loggedInUserDocId, 
  profileId, 
  isFollowingProfile
) {
  return firebase 
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId) 
        : FieldValue.arrayUnion(profileId)
    })
}