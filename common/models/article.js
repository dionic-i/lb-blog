'use strict';

module.exports = function (Article) {

	/**
	 * Validation rules
	 */

	Article.validatesNumericalityOf('votes', {int: true});
	Article.validatesLengthOf('title', {min: 3});
	Article.validatesUniquenessOf('title');

	/**
	 * Hooks
	 */

	Article.observe('before save', (ctx, next) => {
		if (ctx.instance && ctx.instance.blog_id) {
			return Article.app.models.Blog
				.count({id: ctx.instance.blog_id})
				.then(res => {
					if (res < 1) {
						return Promise.reject('Error adding article to non-existing blog.');
					}
				});
		}

		if (ctx.instance.blog_id === 0) {
			return Promise.reject('Error adding article without blog.');
		}

		return next();
	});

	/**
	 * Methods
	 */

	Article.prototype.vote = function (up, callback) {
		let me = this,
			result = {
				votes: 0
			};

		me.votes = up ? me.votes + 1 : me.votes - 1;

		if (me.votes < 0) {
			me.votes = 0;
		}

		me.save({validate: true}, (err, article) => {
			result = {
				votes: me.votes
			};
			callback(err, result);
		});
	};

};
