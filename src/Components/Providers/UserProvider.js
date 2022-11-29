import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export const UserContext = createContext({
    user: null
})

export default (props) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                const { displayName, email } = user;
                setUser({
                    displayName, email
                })
            }
        })
    }, [])

    return <UserContext.Provider value={user}>
        {props.children}
    </UserContext.Provider>

}