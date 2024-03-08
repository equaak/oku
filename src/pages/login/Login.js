import './Login.css'
import axios from 'axios'
import chel from './chel.png'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import userStore from '../../store/UserStore'
const Login = observer(() => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        if(userStore.user !== null){
            console.log(userStore.user)
            navigate('/main')
        }
    }, [])
    const handleClick = async () => {
        let responce = await axios.get('http://localhost:5000/users')

        let users = responce.data;

        for(let i = 0; i < users.length; i++) {
            if(users[i].email === email){
                if(users[i].password === password){
                    userStore.setUser({email: email});
                    navigate("/main");
                }
                else{
                    setError(1)
                }
            }
            else{
                setError(2)
            }
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return(
        <main>
            <div className='wrapper'>
                <header className='login-header'>
                    Войти в аккаунт администратора
                </header>
                <div className='login-form'>
                    <div className='form-left'>
                        <div className='form-part'>
                            <p className='part-title'>Эл.почта</p>
                            <input value={email} onChange={handleEmail} className='login-input' placeholder='Ваша эл.почта'></input>
                        </div>
                        <div className='form-part'>
                            <p className='part-title'>Пароль</p>
                            <input value={password} onChange={handlePassword} className='login-input' placeholder='Ваш пароль' type='password'></input>
                        </div>
                        {error === 1 ? <p className='error'>Логин или пароль не корректный</p> : ''}
                        {error === 2 ? <p className='error'>Администратор с таким эл.адресом не был найден</p> : ''}
                        <button className='login-button' onClick={handleClick}>Войти</button>
                    </div>
                    <img src={chel} />
                </div>  
            </div>
        </main>
    )
})

export default Login;