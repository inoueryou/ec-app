import React from 'react'
import { getUserId } from '../reducks/users/selectors'
import { getUserName } from '../reducks/users/selectors'
import { useSelector } from 'react-redux'

const Home = () => {
  const selector = useSelector(state => state)
  const uid = getUserId(selector)
  const username = getUserName(selector)
  return (
    <>
      <h2>Home</h2>
      <p>userid:{uid}</p>
      <p>username:{username}</p>
    </>
  )
}

export default Home