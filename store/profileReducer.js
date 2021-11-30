const initialState = {
	profile: {}
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'addProfile': {
			const { profile } = action
			return {
				profile
			}
		}
		default: {
			return state
		}
	}
}

export const addProfileAC = (profile) => ({ type: 'addProfile', profile })

export const addUserAC = (profile) => async (dispatch) => {
	const { name, email, password } = profile
	return await fetch('http://localhost:3000/api/register', {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name,
			email,
			password
		})
	})
}

export const authAC = (profile) => async (dispatch) => {
	const { email, password } = profile
	const response = await fetch('http://localhost:3000/api/auth', {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			emailReq: email,
			passwordReq: password
		})
	})
	const dataprofile = await fetch('http://localhost:4200/profile').
		then(data => data.json())
	dispatch(addProfileAC(dataprofile))
	return response
}

export const getProfile = () => async (dispatch) => {
	const data = await fetch('http://localhost:3000/api/auth')
		.then(data => data.json())
}

export const exitAccount = () => async (dispatch) => {
	const data = await fetch('http://localhost:4200/profile', {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify({})
	})
		.then(data => data.json())
	dispatch(addProfileAC({}))
}

export const addPostInFavoritsAC = (idNews, idProfile) => async (dispatch) => {
	await fetch('http://localhost:3000/api/favorits', {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			idNews,
			idProfile
		})
	})
}

export default profileReducer;