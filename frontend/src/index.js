'use strict';


require('./comments.css');

import './comments.tag';
riot.mount('comments', {
    articleId: "testArt",
    commentsUrl: "LAMBDA_URL/comments"
});
