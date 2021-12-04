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
		case 'addPostsInFavorits': {
			return {
				profile: {
					...state.profile,
					favoritsPost: [...state.profile.favoritsPost, action.news]
				}
			}
		}
		case 'deletePostsInFavorits': {
			return {
				profile: {
					...state.profile,
					favoritsPost: state.profile.favoritsPost.filter(news => news.id !== action.id)
				}
			}
		}
		default: {
			return state
		}
	}
}

export const addProfileAC = (profile) => ({ type: 'addProfile', profile })

export const registAC = (profile) => async (dispatch) => {
	const { name, email, password } = profile
	try {
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
	catch (e) {
		console.log(e);
	}
}

export const authAC = (profile) => async (dispatch) => {
	const { email, password } = profile
	try {
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
	catch (e) {
		console.log(e);
	}

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
		method: 'POST',
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

export const deleteInFavoritsAC = (idNews, idProfile) => async (dispatch) => {
	try {
		return fetch('http://localhost:3000/api/favorits', {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idNews,
				idProfile
			})
		})
	} catch (e) {
		console.log(e);
	}
}

export default profileReducer;