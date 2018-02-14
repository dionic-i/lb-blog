/**
 * Description of acl.js.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 12.02.18 13:53
 */
'use strict';

const {app, expect, request} = require('../common');

const Article = app.models.Article;
const Blog = app.models.Blog;

describe('ACL', function () {

	describe('Blog', function () {

		it('list should be 200', function () {
			return request
				.get('/api/Blogs')
				.expect(200);
		});

		it('create should be 401', function () {
			return request
				.post('/api/Blogs')
				.send({title: 'New title'})
				.expect(401);
		});

		it('update should be 401', function () {
			return request
				.patch('/api/Blogs/1')
				.send({title: 'New title'})
				.expect(401);
		});

		it('delete should be 401', function () {
			return request
				.delete('/api/Blogs/1')
				.expect(401);
		});

	});

	describe('Article', function () {

		it('list should be 200', function () {
			return request
				.get('/api/Articles')
				.expect(200);
		});

		it('create should be 401', function () {
			return request
				.post('/api/Articles')
				.send({title: 'New title', body: '111'})
				.expect(401);
		});

		it('update should be 401', function () {
			return request
				.patch('/api/Articles/1')
				.send({title: 'New title', body: '111'})
				.expect(401);
		});

		it('delete should be 401', function () {
			return request
				.delete('/api/Articles/1')
				.send({title: 'New title'})
				.expect(401);
		});

		it('Vote Article should be 200', function () {
			return Blog.create({title: 'New empty blog'})
				.then((res) => {
					return Article.create({title: 'New empty article', body: 'Empty', blog_id: res.id})
				})
				.then((res) => {
					return request
						.put(`/api/Articles/${res.id}/vote`)
						.send({up: true})
						.expect(200)
				})
		});

	});

});
