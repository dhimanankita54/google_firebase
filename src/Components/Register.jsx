import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./Providers/UserProvider"
import { signInWithGoogle, registerWithEmailAndPassword, auth } from "./services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Register = () => {

    const navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);

    const [value, setValue] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value
        })
    }

    const register = () => {
        if (!value.name) alert("Please enter name");
        registerWithEmailAndPassword(value.name, value.email, value.password);
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user])

    return (
        <>
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#212121' }}>
                <div style={{
                    flexDirection: 'column', display: 'flex', gap: '13px', fontWeight: 'bold', backgroundColor: '#263238',
                    padding: '60px', borderRadius: '10px'
                }}>
                    <div>
                        <input type='text' name='name' placeholder='Enter Name' onChange={handleChange} />
                    </div>
                    <div>
                        <input type='email' name='email' placeholder='Enter Email' onChange={handleChange} />
                    </div>
                    <div>
                        <input type='password' name='password' placeholder='Enter Password' onChange={handleChange} />
                    </div>
                    <div>
                        <button onClick={register}>Register</button>
                    </div>
                    <div>
                        <button onClick={signInWithGoogle}>Continue with google</button>
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        <p style={{ margin: 0, padding: 0, color: 'white' }}>Already have an account ?
                            <Link to='/'><span style={{ color: '#03A9F4' }}> Login</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}