import crypto from 'crypto'

export default async function Register(req, res) {
	if (req.method === 'GET') {
		return res.status(404).json({
			message: 'only POST'
		})
	}

	//проверка на уникальность email
	const { name, email, password, favoritsPost = [] } = req.body
	const users = await fetch('http://localhost:4200/users')
		.then(data => data.json())
	const validateEmail = users.filter(user => user.email === email)
	if (validateEmail.length) {
		res.status(201).json({
			message: 'Such a user already exists'
		})
		return
	}

	const hashPassword = crypto.createHash('md5').update(password).digest('hex')
	//запрос на добавление пользователя
	await fetch('http://localhost:4200/users', {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name,
			email,
			password: hashPassword,
			favoritsPost
		})
	})

	res.status(200).json({
		message: "You have successfully registered"
	})
}
