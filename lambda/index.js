/*global require, module*/
const ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	api = new ApiBuilder(),
	config = require('./config'),
	isHuman = require('./recaptcha').create(config.captcha),
	validate = require('./comments/validate'),
	dynamoDb = new AWS.DynamoDB.DocumentClient(),
	comments = require('./comments/service').create(config.dynamodb, dynamoDb);

const log = console.log;

module.exports = api;
api.corsOrigin('*')

// Create new user
api.post('/comments', function (request) {
	'use strict';
	const body = request.body;
	const errors = validate(body);
	if ( errors.length > 0 ) {
		return badRequestResponse("Invalid payload", errors);
	}

	log("Content is valid")
	return isHuman(body, request.context.sourceIp)
		.then( human => {
			if (! human ) {
				return Prosmie.reject("Invalid reCaptcha");
			}
			return comments.create(body)
		})
		.then(okResponse)
		.catch(err => errorRequestResponse("could not create comment", err));
});

api.get('/comments/{articleId}', request => {
	'use strict';
	const articleId = request.pathParams.articleId
	return comments
		.list(articleId)
		.then(okResponse)
		.catch(err => errorRequestResponse(`could not list comments for article ${articleId}`, err));
});

function badRequestResponse(msg, details)  {
	return new api.ApiResponse({message : msg, details}, headers(), 400);
}

function errorRequestResponse(msg, details)  {
	console.error("Could not process request", msg, details);
	return new api.ApiResponse({message : msg, details: details}, headers(), 500);
}

function okResponse(body) {
	return new api.ApiResponse(body, headers(), 200);
}

function headers() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Content-type': 'application/json'
	};
}