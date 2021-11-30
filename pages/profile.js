import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import FormRegister from "../components/Form/FormRegister"
import FormAuth from '../components/Form/FormAuth'
import { addProfileAC, exitAccount } from "../store/profileReducer"
import CardNews from "../components/CardNews";

export default function Profile(props) {
	const { profile } = props
	const dispatch = useDispatch()
	const stateProfile = useSelector(state => state.profile.profile)

	useEffect(() => {
		dispatch(addProfileAC(profile))
	}, [profile])

	const [formsShow, setFormsShow] = useState({
		formReg: true,
		formAuth: false
	})

	const changeFormsShow = (form) => {
		setFormsShow(prev => ({
			...prev,
			[form]: !prev[form]
		}))
	}

	function exit() {
		dispatch(exitAccount())
	}

	console.log(profile.favoritsPost);

	return (
		stateProfile.name
			? < div className="container" >
				<div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
					<h1>{stateProfile.name}</h1>
					<button onClick={exit} className="btn red">Выйти</button>
				</div>
				<h4 style={{ color: 'grey' }}>{stateProfile.email}</h4>
				<hr />
				<div>
					<h2>Favorits</h2>
					{!stateProfile.favoritsPost?.length ? '' : stateProfile.favoritsPost.map(news => <CardNews profile={stateProfile} info={news} />)}
				</div>
			</div >
			:
			<>
				<FormRegister changeFormsShow={changeFormsShow} show={formsShow.formReg} />
				<FormAuth changeFormsShow={changeFormsShow} show={formsShow.formAuth} />
			</>

	)
}

export async function getStaticProps(ctx) {
	const profile = await fetch('http://localhost:4200/profile')
		.then(data => data.json())
	return {
		props: {
			profile
		}
	}
}