import { useState } from "react"
import Router from 'next/router'
import CardNews from "../../components/CardNews"
import { useDispatch } from "react-redux"
import { addPostInFavoritsAC, deleteInFavoritsAC } from '../../store/profileReducer'

export default function News(props) {
	const { dataNews, dataProfile } = props
	const [news, setNews] = useState(dataNews || [])
	const [profile, setProfile] = useState(dataProfile)
	const dispatch = useDispatch()

	const addPostInFavorits = async (idNews) => {
		if (!profile.name) return Router.push('/profile')
		dispatch(addPostInFavoritsAC(idNews, profile.id))
	}

	const deleteInFavorits = async (idNews) => {
		dispatch(deleteInFavoritsAC(idNews, profile.id))
	}

	return (
		<div>
			{news.map(news => (
			<CardNews
			key={news.id} 
			info={news}  
			profile={profile} 
			deleteInFavorits={deleteInFavorits} 
			addPostInFavorits={addPostInFavorits} 
			/>))}
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