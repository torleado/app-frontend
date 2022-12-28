import { useMarketersContext } from '../hooks/useMarketersContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MarketerDetails = ({ marketer }) => {
  const { dispatch } = useMarketersContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('https://torleado.herokuapp.com/api/marketers/' + marketer._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_MARKETER', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{marketer.titleMarketer}</h4>
      <p><strong>Load (kg): </strong>{marketer.loadMarketer}</p>
      <p><strong>Reps: </strong>{marketer.repsMarketerPrice}</p>
      <p>{formatDistanceToNow(new Date(marketer.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default MarketerDetails