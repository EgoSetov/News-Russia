import { useEffect, useState } from "react"
import CardNews from "../../components/CardNews"
import { useDispatch, useSelector } from "react-redux"
import { addProfileAC } from '../../store/profileReducer'
import { addPostsAC } from "../../store/newsReducer"
import FormAddPost from "../../components/Form/FormAddPost"

export default function News(props) {
	const dispatch = useDispatch()
	const news = useSelector(state => state.news.news)
	const profile = useSelector(state => state.profile.profile)
	const [form, setForm] = useState(false)

	useEffect(() => {
		const { dataNews, dataProfile } = props
		dispatch(addPostsAC(dataNews))
		dispatch(addProfileAC(dataProfile))
	}, [])

	return (
		<div>
			{news.map(news => (
				<CardNews
					key={news.id}
					info={news}
				/>))}
			{!profile.email ?
				''
				:
				<a onClick={() => setForm(prev => !prev)} style={{ position: 'absolute', top: '35px', right: '50%' }} className="btn-floating btn-large waves-effect waves-light blue"><i className="material-icons">add</i></a>}
			<FormAddPost setForm={() => setForm(prev => !prev)} form={form} />
		</div>
	)
}

export async function getStaticProps(ctx) {
	const dataNews = await fetch('http://localhost:4200/news')
		.then(data => data.json())
	const dataProfile = await fetch('http://localhost:4200/profile')
		.then(data => data.json())

	return {
		props: {
			dataNews,
			dataProfile
		}
	}
}