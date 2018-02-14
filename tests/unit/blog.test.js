/**
 * Description of blog.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 12.02.18 10:58
 */

const {app, expect} = require('../common');

const Article = app.models.Article;
const Blog = app.models.Blog;

describe('Blog - It should resolve', function () {

	it('A blog find', function () {
		return Blog
			.find()
			.then(res => console.log(res));
	});

	it('Create a blog', function () {
		const title = new Date().toDateString();
		return Promise.resolve()
			.then(() => Blog.create({title: `Blog ${title}`}))
			.then(() => Blog.count())
			.then(res => {
				expect(res).to.be.equal(1);
			})
	});

});

describe('Blog - Validation', function () {

	it('It should reject Blog title less the 3 characters', function () {
		return Blog.create({title: 'Fi'})
			.then(res => Promise.reject('Blog should not be created'))
			.catch(err => {
				expect(err.message).to.contain('`title` too short');
				expect(err.statusCode).to.be.equal(422);
			})

	});

	it('It should reject Blog duplicate title', function () {
		return Promise.resolve()
			.then(() => Blog.create({title: 'My own blog'}))
			.then(() => Blog.create({title: 'My own blog'}))
			.then(res => Promise.reject('Second blog record should not be created'))
			.catch(err => {
				expect(err.message).to.contain('`title` is not unique');
				expect(err.statusCode).to.be.equal(422);
			})
	});

});

describe('Blog - Hooks', function () {

	it('should not delete Blog with Articles', function () {
		return Promise.resolve()
			.then(() => Blog.create({title: 'My interesting blog'}))
			.then(res => Article.create({title: `Article in the blog`, body: `Article 111`, blog_id: res.id}))
			.then(res => Blog.destroyById(res.blog_id))
			.then(res => expect(res).to.equal(null))
			.catch(err => {
				expect(err).to.equal('Error deleting blog with articles.');
			})
	});

});
