/**
 * Description of commo.js.
 *
 *
 * @author: Ilya Petrushenko <ilya.petrushenko@yandex.ru>
 * @since: 12.02.18 10:55
 */
'use strict';

const app = require('../server/server');
const chai = require('chai');
const supertest = require('supertest');

const expect = chai.expect;
const request = supertest(app);

module.exports = {
	app,
	expect,
	request
};
