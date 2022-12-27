import { useAuthContext } from "../hooks/useAuthContext"

import InfluForm from '../components/InfluForm'
const Add = () => {

     const {user} = useAuthContext()
return(
    <div>
        <h1>Hello {user.email}</h1>
        <InfluForm />
    </div>
)
}

export default Add