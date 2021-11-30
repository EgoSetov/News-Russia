import crypto from 'crypto'

export default async function auth(req, res) {
	const { emailReq, passwordReq } = req.body

	const hashPassword = crypto.createHash('md5').update(passwordReq).digest('hex')

	// получение данных всех пользователей
	const dataProfile = await fetch('http://localhost:4200/users')
		.then(data => data.json())

	const userIsAuth = dataProfile.filter(user => (user.password === hashPassword) && (user.email === emailReq))[0]
	
	if (!userIsAuth) {
		return res.status(201).json({
			message: 'Incorrect login or password'
		})
	}

	const { id, name, email, password, favoritsPost } = userIsAuth

	//запрос на добавление profile пользователя
	await fetch('http://localhost:4200/profile', {
		method: "PUT",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			email,
			password,
			favoritsPost,
			id
		})
	})
	res.status(200).json({
		message: "You have successfully logged in"
	})
}