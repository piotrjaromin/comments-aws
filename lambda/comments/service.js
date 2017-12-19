'use strict';

const moment = require('moment')
const log = console.log;

function create(config, dynamoDb) {

    function tableName() {
        return config.tableName;
    }

    function create(body) {
        log("Started creation of comment");

        const now = moment();
        var params = {
            TableName: tableName(),
            Item: {
                id: now.valueOf() + "_" + Math.floor(Math.random() * 100000) ,
                author: body.author,
                timestamp: now.format(config.dateFormat),
                text: body.text,
                articleId : body.articleId
            }
        };

        return dynamoDb.put(params).promise();
    }

    function list(articleId) {
        const params = {
            TableName : tableName(),
            KeyConditionExpression: "#articleId = :aId",
            ExpressionAttributeNames: {
                "#articleId":"articleId"
            },
            ExpressionAttributeValues: {
                ":aId": articleId
            }
        };

        return new Promise( (resolve, reject) => {
            dynamoDb.query(params, (err, data) => {
                if (err) {
                    return reject("Unable to query. Error: " + err);
                }

                log("Query succeeded.");
                return resolve(data.Items);
            });
        });
    }

    return {
        create,
        list
    }
}

module.exports.create = create;