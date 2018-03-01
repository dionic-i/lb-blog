'use strict';

module.exports = function (App) {

	const userSchema = {
		id         : 0,
		realname   : '',
		username   : '',
		email      : '',
		permissions: [],
		auth       : false // Если залогинен, то объект auth
	};

	/**
	 * Methods
	 */

	App.checkStatus = function (options, callback) {
		let me = this,
			currentUser;

		const {accessToken} = options;

		if (accessToken) {

			const User = me.app.models.User;
			const {userId} = accessToken;

			User.findById(userId, (err, model) => {
				if (!err) {
					callback(null, {currentUser: model, success: true});
				}
				else {
					callback(err);
				}
			});
		}
		else {
			callback(null, {currentUser: userSchema, success: true});
		}
	};

};
