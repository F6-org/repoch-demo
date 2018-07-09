import React            from 'react';
import {
	Router,
	Route,
	IndexRoute,
	// hashHistory,
	// useRouterHistory,
	browserHistory
}                         from 'react-router';


import App from './App.jsx';
import paths from './routePath';

import Home from '../views/home/route';
import Share from '../views/share/route';

export const routes = [
	{
		path: '/',
		component: App,
		indexRoute: {
			onEnter: (next, replace, go) => {
				if(next.location.pathname === '/') {
					replace('/home' + next.location.search);
					go();
				}
			}
		},
		childRoutes: [
			Home(paths),
			Share(paths),
		
		]
	}
];

export const Routes = () => {
	return (
		<Router history={browserHistory}>
			{routes}
		</Router>
	);
};
