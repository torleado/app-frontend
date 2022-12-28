import { MarketersContext } from '../context/MarketerContext'
import { useContext } from 'react'

export const useMarketersContext = () => {
  const contextMarketer = useContext(MarketersContext)

  if (!contextMarketer) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return contextMarketer
}