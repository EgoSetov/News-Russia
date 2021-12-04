import { useState } from "react"
import { useDispatch } from "react-redux"
import { addPostServer } from "../../store/newsReducer"
import s from '../../styles/formAddPost.module.css'

export default function FormAddPost(props){
	const dispatch = useDispatch()
	const [inputsValue, setInputsValue] = useState({
		title: '',
		body: '',
		url: ''
	})

	const changeInputsValue = (e) => {
		setInputsValue(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const addPosts = () => {
		dispatch(addPostServer({
			imageUrl: inputsValue.url,
			title: inputsValue.title,
			body: inputsValue.body
		}))
		setInputsValue({
			title: '',
			body: '',
			url: ''
		})
		props.setForm(false)
	}

	return (
		<div className={`${s.form} ${props.form ? '' : 'hide'}`}>
			<div className="row">
				<div className="row">
					<div className="input-field col s12">
						<input onChange={changeInputsValue} name="title" value={inputsValue.title} required placeholder="Title" type="text" className="validate" />
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input onChange={changeInputsValue} name="body" value={inputsValue.body} required placeholder="Text body" type="text" className="validate" />
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<input onChange={changeInputsValue} name="url" value={inputsValue.url} placeholder="Url image" type="text" className="validate" />
					</div>
				</div>
				<div className={s.btnAddPost}>
					<button disabled={!(inputsValue.title && inputsValue.body)} onClick={addPosts} className="btn">Опубликовать</button>
				</div>
			</div>
		</div>
	)
}