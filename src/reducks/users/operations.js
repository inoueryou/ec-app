import { signInAction } from './actions'
import {push} from 'connected-react-router'
import {auth, db, firebaseTimestamp} from '../../firebase/index'



export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState()
    const isSignedIn = state.users.isSignedIn

    if (!isSignedIn) {
      const url = 'https://api.github.com/users/inoueryou'

      const response = await fetch(url)
       .then(res => res.json())
       .catch(() => null)

       const username = response.login

       dispatch(signInAction({
        isSignedIn: true,
        uid: '0001',
        username: username
       }))
       dispatch(push('/'))
    }
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    //validation
    if (username === '' || email === '' || password === '' || confirmPassword ==='') {
      alert('必須項目が未入力です')
      return false
    }

    if (password !== confirmPassword) {
      alert('パスワードは一致しません。もう一度お試し下さい')
      return false
    }

    return auth.createUserWithEmailAndPassword (email, password)
      .then(result => {
        const user = result.user
        
        if (user) {
          const uid = user.uid
          const timestamp = firebaseTimestamp.now()

          const userInitialData = {
            created_at: timestamp,
            email: email,
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)
          .then(() => {
            dispatch(push('/'))
          })
        }
      })
  }
}
