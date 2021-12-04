import Router from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { addPostInFavoritsAC, deleteInFavoritsAC } from "../../store/profileReducer"

export default function News(props) {
	const dispatch = useDispatch()
	const { imageUrl, id, title, body } = props.data
	const profile = useSelector(state => state.profile.profile)
	const news = useSelector(state => state.news.news)

	const addPostInFavorits = async (idNews) => {
		if (!profile.name) return Router.push('/profile')
		dispatch({
			type: 'addPostsInFavorits',
			news: props.data
		})
		dispatch(addPostInFavoritsAC(idNews, profile.id))
	}

	const deleteInFavorits = async (idNews) => {
		dispatch(deleteInFavoritsAC(idNews, profile.id))
		dispatch({
			type: 'deletePostsInFavorits',
			id: idNews
		})
	}
	
	return (
		<div id={id}>
			<div>
				<h1>{title}</h1>
			</div>
			<img width="50%" src={imageUrl} />
			<p>
				{body}
			</p>
			<div style={{ display: 'flex', gap: '10px' }}>
				<button onClick={() => Router.back()} className="btn blue">Вернуться назад</button>
				{!profile.favoritsPost?.some(news => news.id === id) ?
					<button className="btn" onClick={() => addPostInFavorits(id)} className="btn">Добавить в избранное</button>
					:
					<button className="btn" onClick={() => deleteInFavorits(id)} className="btn">Убрать из избранного</button>
				}
			</div>
		</div>
	)
}

export async function getServerSideProps(ctx) {
	const { query } = ctx

	const data = await fetch(`http://localhost:4200/news/${query.id}`)
		.then(data => data.json())

	return {
		props: {
			data
		}
	}
}