import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authAC } from '../../store/profileReducer'
import s from '../../styles/formRegister.module.css'

export default function FormRegister(props) {
	const dispatch = useDispatch()
	const [inputValue, setInputValue] = useState({
		email: '',
		password: ''
	})
	const changeInputValue = (e) => {
		setInputValue(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const [messageError, setMessageError] = useState({
		show: false,
		text: ''
	})

	const sendInputValue = async (e) => {
		e.preventDefault()
		const response = await dispatch(authAC({
			email: inputValue.email,
			password: inputValue.password
		}))
		if (response.status === 201) {
			setMessageError({
				show: true,
				text: 'Неправильный логин или пароль'
			})
			return
		}

	}
	
	return (
		<div className={`row z-depth-3 ${s.form} ${props.show ? '': 'hide'}`}>
			<form className="col s12">
				<h2 className={s.title}>Вход</h2>
				<span style={{ display: messageError.show ? '' : 'none', color: 'red' }}>* {messageError.text}</span>
				<div className="row">
					<div className="input-field col s12">
						<input required value={inputValue.email} onChange={changeInputValue} name="email" placeholder="Email" type="email" className="validate" />
					</div>
					<div className="input-field col s12">
						<input required value={inputValue.password} onChange={changeInputValue} name="password" placeholder="Password" type="password" className="validate" />
					</div>
				</div>
				<div className={s.btnSend}>
					<button onClick={sendInputValue} disabled={!(inputValue.email && inputValue.password)} className="btn">Войти</button>
				</div>
				<div style={{ fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>
					<span >Нет аккаунта? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {props.changeFormsShow('formReg'); props.changeFormsShow('formAuth')}}>Зарегистрироваться</span></span>
				</div>
			</form>
		</div>

	)
}
