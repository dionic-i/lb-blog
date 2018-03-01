'use strict';

module.exports = function (app) {

	const ADD_DATA = false;

	/**
	 * Добавление данных в БД.
	 */
	const Article = app.models.Article;
	const Blog = app.models.Blog;
	const Menu = app.models.Menu;

	function emptyDb(cb) {
		Article.destroyAll((err, info) => {
			console.log('Destroy all articles', err, info);
			Blog.destroyAll((err, info) => {
				console.log('Destroy all blogs', err, info);
				cb(err);
			});
		});
	}

	function addRecords() {
		let blogs = [];

		for (let i = 0; i < 10; i++) {
			blogs.push({
				title: 'Blog ' + i,
				description: 'Blog about ' + i
			})
		}

		Blog.create(blogs, (err, blogs) => {
			console.log('Blogs create', err, blogs);

			for (let blog of blogs) {

				console.log('Add article to blog', blog);

				let articles = [];

				for (let i = 0; i < 10; i++) {
					articles.push({
						title: `Article of blog ${blog.id} - ${i}`,
						body: 'Blog about ' + i,
						blog_id: blog.id
					})
				}

				Article.create(articles, (err) => {
					console.log('Add article to blog', err);
				});

			}
		});
	}

	function addMenu() {
		console.log('Menu create');

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

		Menu.count((err, count) => {
			if (count === 0) {
				console.log('Menu create');
				Menu.create(menu, (err) => {
					console.log('Add menu success:', err);
				});
			}
		});
	}

	if (ADD_DATA) {
		emptyDb(addRecords);
	}

	addMenu();

};
