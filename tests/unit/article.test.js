/**
 * Description of article.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 12.02.18 10:57
 */

const {app, expect} = require('../common');

const Article = app.models.Article;
const Blog = app.models.Blog;

describe('Article - It should resolve', function () {

	it('An article find', function () {
		return Article
			.find()
			.then(res => console.log(res));
	});

});

describe('Article - Validation', function () {

	it('It should reject Article title less the 3 characters', function () {
		return Article.create({title: 'Fi'})
			.then(res => Promise.reject('Article should not be created'))
			.catch(err => {
				expect(err.message).to.contain('`title` too short');
				expect(err.statusCode).to.be.equal(422);
			})

	});

	it('It should reject Article duplicate title', function () {
		const title = new Date().toDateString();
		const body = new Date().toDateString();

		return Promise.resolve()
			.then(() => Blog.create({title: 'My own PHP blog'}))
			.then((res) => {
				return Article.create({title: `My own article`, body: `Article ${body}`, blog_id: res.id});
			})
			.then((res) => {
				return Article.create({title: `My own article`, body: `Article ${body}`, blog_id: res.id});
			})
			.then(res => Promise.reject('Second Article record should not be created'))
			.catch(err => {
				expect(err.message).to.contain('`title` is not unique');
				expect(err.statusCode).to.be.equal(422);
				return Article.destroyAll();
			})
			.then(() => Blog.destroyAll())
	});

	it('Create an article', function () {
		const title = new Date().toDateString();
		const body = new Date().toDateString();
		return Promise.resolve()
			.then(() => Blog.create({title: 'My own PHP blog'}))
			.then((res) => {
				return Article.create({title: `Article ${title}`, body: `Article ${body}`, blog_id: res.id});
			})
			.then(res => {
				expect(res.title).to.contains(`Article ${title}`);
				return Article.destroyAll();
			})
			.then(() => Blog.destroyAll());
	});

});

describe('Article - Custom methods', function () {

	it('Vote article', function () {
		const title = new Date().toDateString();
		const body = new Date().toDateString();

		let article = new Article({title: `Article ${title}`, body: `Article ${body}`, blog_id: 1});

		article.vote(true, function (err, result) {
			expect(result.votes).to.be.equal(1);
			article.vote(false, function (err, result) {
				expect(result.votes).to.be.equal(0);
				article.vote(false, function (err, result) {
					expect(result.votes).to.be.equal(0);
				});
			});
		});
	});

});
