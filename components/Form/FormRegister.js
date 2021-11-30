import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUserAC } from '../../store/profileReducer'
import FormAuth from './FormAuth'
import s from '../../styles/formRegister.module.css'

export default function FormRegister(props) {
	const dispatch = useDispatch()
	const [inputValue, setInputValue] = useState({
		name: '',
		email: '',
		password: ''
	})

	const [messageError, setMessageError] = useState({
		show: false,
		text: ''
	})

	const changeInputValue = (e) => {
		setInputValue(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const sendInputValue = async (e) => {
		e.preventDefault()
		const responce = await dispatch(addUserAC({
			name: inputValue.name,
			email: inputValue.email,
			password: inputValue.password
		}))
		if (responce.status === 201) {
			setMessageError({
				show: true,
				text: "Пользователь с такой почтой уже существует"
			})
		}
	}

	return (
		<>
			<div className={`row z-depth-3 ${s.form} ${props.show ? '' : 'hide'}`}>
				<form className="col s12">
					<h2 className={s.title}>Регистрация</h2>
					<span style={{ display: messageError.show ? '' : 'none', color: 'red' }}>* {messageError.text}</span>
					<div className="row">
						<div className="input-field col s12">
							<input required value={inputValue.name} onChange={changeInputValue} name="name" placeholder="Name" id="icon_prefix" type="text" className="validate" />
						</div>
						<div className="input-field col s12">
							<input required value={inputValue.email} onChange={changeInputValue} name="email" placeholder="Email" id="icon_telephone" type="tel" className="validate" />
						</div>
						<div className="input-field col s12">
							<input required value={inputValue.password} onChange={changeInputValue} name="password" placeholder="Password" id="icon_telephone" type="tel" className="validate" />
						</div>
					</div>
					<div className={s.btnSend}>
						<button onClick={sendInputValue} disabled={!(inputValue.name && inputValue.email && inputValue.password)} className="btn">Зарегистрироваться</button>
					</div>
					<div style={{ fontSize: '20px', textAlign: 'center', marginTop: '10px' }}>
						<span >Есть аккаунт? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {props.changeFormsShow('formReg'); props.changeFormsShow('formAuth')}}>Войти</span></span>
					</div>
				</form>
			</div>
			<FormAuth />
		</>
	)
}
