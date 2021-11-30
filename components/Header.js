import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import s from '../styles/header.module.css'

export default function Header(props) {

	const state = useSelector(state => state.profile.profile)

	return (
		<>
			<nav>
				<div className="nav-wrapper">
					<Link href="/news"><a className="brand-logo p-10">News Russia</a></Link>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						<li><Link href="/news"><a>News</a></Link></li>
						<li className={s.favoriteLink}><Link href="/profile"><a>{state.name || 'Profile'}</a></Link></li>
					</ul>
				</div>
			</nav>
			<style jsx>{`
				.nav-wrapper{
					padding: 0 30px;
				}
			`}</style>
		</>
	)
}
