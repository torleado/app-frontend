import { createContext, useReducer } from 'react'

export const MarketersContext = createContext()

export const marketersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MARKETERS': 
      return {
        marketers: action.payload
      }
    case 'CREATE_MARKETER':
      return {
        marketers: [action.payload, ...state.workouts]
      }
    case 'DELETE_MARKETER':
      return {
        marketers: state.marketers.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const MarketersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(marketersReducer, {
    marketers: null
  })

  return (
    <MarketersContext.Provider value={{...state, dispatch}}>
      { children }
    </MarketersContext.Provider>
  )
}