import Router from "next/router"

export default function News(props) {
	const { imageUrl, id, title, body } = props.data
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
				<button className="btn green">Добавить в избранное</button>
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