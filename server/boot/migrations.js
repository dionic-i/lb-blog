'use strict';

module.exports = function (app) {
	let appModels = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Blog', 'Article', 'Menu'];

	let ds = app.dataSources.mysqlDs;
	ds.isActual(appModels, function (err, actual) {
		if (!actual) {
			ds.autoupdate(appModels, function (err) {
				if (err) throw (err);
			});
		}
	});
};
