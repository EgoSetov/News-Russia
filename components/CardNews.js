import Link from 'next/link'
import Router from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { addPostInFavoritsAC, deleteInFavoritsAC } from '../store/profileReducer'

export default function CardNews(props) {
	const dispatch = useDispatch()
	const { imageUrl, id, title, body } = props.info
	const profile = useSelector(state => state.profile.profile)

	const addPostInFavorits = async (idNews) => {
		if (!profile.name) return Router.push('/profile')
		dispatch({
			type: 'addPostsInFavorits',
			news: props.info
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
		<div className="row">
			<div className="col s12">
				<div className="card blue-grey darken-1">
					<div className="card-image">
						{imageUrl ?
							<img src={imageUrl} atl="imageNewsPhoto" />
							:
							''}
					</div>
					<div className="card-content white-text">
						<span className="card-title">{title}</span>
						<p>
							{body}
						</p>
					</div>
					<div className="card-action">
						<Link href={`/news/${id}`}>
							<a>Подробнее</a>
						</Link>
						{!profile.favoritsPost?.some(news => news.id === id) ? 
						<button className="btn" onClick={() => addPostInFavorits(id)} className="btn">Добавить в избранное</button>
						:
						<button className="btn" onClick={() => deleteInFavorits(id)} className="btn">Убрать из избранного</button>
						}
						
					</div>
				</div>
			</div>
		</div>
	)
}