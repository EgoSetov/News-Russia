const initialState = {
	news: []
}

const newsReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'addPosts': {
			return {
				news: action.posts
			}
		}
		case 'addPost': {
			const post = {
				...action.post,
				id: state.news.length + 1
			}
			return {
				news: [...state.news, post]
			}
		}
		default: {
			return state
		}
	}
}

export const addPostsAC = (posts) => ({ type: 'addPosts', posts })
export const addPostServer = (post) => async (dipsatch) => {
	try {
		await fetch('http://localhost:4200/news', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify(post)
		})
		dipsatch({
			type: 'addPost',
			post
		})
	} catch (e) {
		console.log(e);
	}
}

export default newsReducer