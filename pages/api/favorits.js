export default async function favorits(req, res) {
	const { idNews, idProfile } = req.body

	//получение всех постов
	const AllNews = await fetch('http://localhost:4200/news')
		.then(data => data.json())

	//получение данных пользователя
	const dataProfile = await fetch(`http://localhost:4200/users/${idProfile}`)
		.then(data => data.json())

	const news = AllNews.filter(news => +news.id === +idNews)[0]

	// проверка на существование поста
	if (JSON.stringify(news) === '{}' || !news) {
		return res.status(404).json({
			message: 'There is no such news'
		})
	}

	const { id, name, email, password, favoritsPost } = dataProfile

	// проверка на тот случай, если пост уже находится в favoritsPost у пользователя
	const validateFavoritsPost = favoritsPost.filter(news => news.id === idNews)
	if (validateFavoritsPost.length) {
		return res.status('201').json({
			message: 'The post is already in your favorites'
		})
	}

	// добавление поста в favoritsPost пользователю users
	await fetch(`http://localhost:4200/users/${idProfile}`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			email,
			password,
			favoritsPost: [...favoritsPost, news],
			id
		})
	})

	// добавление поста в favoritsPost пользователю profile
	await fetch(`http://localhost:4200/profile`, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			email,
			password,
			favoritsPost: [...favoritsPost, news],
			id
		})
	})

	res.status(200).json({
		message: 'The post has been successfully added to favorites'
	})

}