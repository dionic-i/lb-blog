'use strict';

module.exports = function(Blog) {

	/**
	 * Validation rules
	 */

	Blog.validatesLengthOf('title', {min: 3});
	Blog.validatesUniquenessOf('title');

	/**
	 * Hooks
	 */

	Blog.observe('before delete', (ctx) => {
		return Blog.app.models.Article
			.count({blog_id: ctx.where.id})
			.then(res => {
				if (res > 0) {
					return Promise.reject('Error deleting blog with articles.');
				}
			});
	});

};
