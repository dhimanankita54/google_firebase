import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./Providers/UserProvider"
import { signInWithGoogle, logInWithEmailAndPassword, auth } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Login = () => {

    const navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);

    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user])

    return (
        <>
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#212121' }}>
                <div style={{
                    flexDirection: 'column', display: 'flex', gap: '10px', fontWeight: 'bold', backgroundColor: '#263238',
                    padding: '60px', borderRadius: '10px'
                }}>
                    <div>
                        <input type='email' name='email' placeholder='Enter Email' onChange={handleChange} />
                    </div>
                    <div>
                        <input type='password' name='password' placeholder='Enter Password' onChange={handleChange} />
                    </div>
                    <div>
                        <button onClick={() => logInWithEmailAndPassword(value.email, value.password)}>Login</button>
                    </div>
                    <div>
                        <button onClick={signInWithGoogle}>Continue with google</button>
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        <Link to='/reset'><p style={{ margin: 0, padding: 0, color: 'white' }}>Forgot Password ?</p></Link>
                        <p style={{ margin: 0, padding: 0, color: 'white' }}>Don't have an account ?
                            <Link to='/register'><span style={{ color: '#03A9F4' }}> Register</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}