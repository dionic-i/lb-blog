'use strict';

module.exports = function (Menu) {

	/**
	 * Methods
	 */

	Menu.getMenu = function (options, callback) {
		let me = this;

		const menu = [{
			key        : 'main',
			title      : 'Главная',
			icon       : '',
			route      : '/',
			right      : false,
			permissions: ''
		}, {
			key        : 'blogs',
			title      : 'Блоги',
			icon       : '',
			route      : '/blogs',
			right      : false,
			permissions: ''
		}, {
			key        : 'login',
			title      : 'Вход',
			icon       : '',
			route      : '/login',
			right      : true,
			permissions: 'GUEST'
		}, {
			key        : 'profile',
			title      : 'Профиль',
			icon       : '',
			route      : '/profile',
			right      : true,
			permissions: 'AUTH'
		}];

		return callback(null, {menu});
	};

};
