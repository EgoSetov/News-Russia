import Link from 'next/link'

export default function CardNews(props) {
	const { imageUrl, id, title, body } = props.info
	const { favoritsPost, email } = props.profile

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
						<button className="btn" disabled={email ? favoritsPost.some(news => news.id === id) : false} onClick={() => props.addPostInFavorits(id)} className="btn">Добавить в избранное</button>
					</div>
				</div>
			</div>
		</div>
	)
}