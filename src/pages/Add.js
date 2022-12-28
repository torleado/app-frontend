import { useEffect }from 'react'
import { useMarketersContext } from "../hooks/useMarketersContext"
import { useAuthContext } from "../hooks/useAuthContext"

// ----> THIS IS ADD LANDING PAGE <------

// components
import MarketerDetails from '../components/MarketerDetails'
import MarketerForm from '../components/MarketerForm'

const Add = () => {
const {marketers, dispatch} = useMarketersContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchMarketers = async () => {
      const response = await fetch('https://torleado.herokuapp.com/api/marketers', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_MARKETERS', payload: json})
      }
    }

    if (user) {
      fetchMarketers()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {marketers && marketers.map((marketer) => (
          <MarketerDetails key={marketer._id} marketer={marketer} />
        ))}
      </div>
      <MarketerForm />
     <h1>You're in add</h1>
    </div>
  )
}

export default Add