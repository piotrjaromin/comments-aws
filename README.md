# What is it?

Demo app showing how to make simple comments section wit usage of dynamodb, aws lambda(cluadiajs), and some riotjs frontend.
Google recaptcha support is also included.


# How to use it?

Before running any commands you need to habe installed and configured [aws-cli](http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html).

also install:
```bash
npm install -g claudia
npm install -g webpack
npm install -g webpack-dev-server
```

## backend - lambda

First we need to create dynamodb database for our commnets:
```bash
aws dynamodb create-table --table-name comments-aws --attribute-definitions AttributeName=id,AttributeType=S AttributeName=articleId,AttributeType=S --key-schema AttributeName=articleId,KeyType=HASH AttributeName=id,KeyType=RANGE   --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 --query TableDescription.TableArn --output text
```

As result we will get dynamodb database arn which should be pasted into ```lambda/policies/access-dynamodb.json```.

We will also need recaptcha secret from [here](https://www.google.com/recaptcha/intro/invisible.html). Recaptcha will be used to validate that human is the one making comments.

Lambda code is stored in lambda directory.

To create lambda run(remember about replacing RECAPTCHA_SECRET with valid value):

```bash
claudia create --region eu-central-1 --api-module index --policies policies --configure-db --set-env CAPTCHA_SECRET=RECAPTCHA_SECRET,TABLE_NAME=comments-aws
```

As result you should have running lambda.

To update existing lambda
```bash
npm run deploy
```

## frontend

First in ```frontend/index.js``` provide url for lambda which was created in backend step.

Go to directory frontend and then:
```bash
npm install
webpack-dev-server
```

frontend application should start working on [http://localhost:8080](http://localhost:8080).
