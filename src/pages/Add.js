import { useAuthContext } from "../hooks/useAuthContext"
import WorkoutForm from '../components/WorkoutForm'
import InfluForm from '../components/InfluForm'
const Add = () => {

     const {user} = useAuthContext()
return(
    <div>
        <h1>Hello</h1>
        <InfluForm />
    </div>
)
}

export default Add