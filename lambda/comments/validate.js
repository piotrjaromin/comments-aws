'use strict';

const MIN_LENGTH = 3;

function validate(body) {
    const errors = []
    if ( !isStringWithMinLength( body.text, MIN_LENGTH) ) {
        errors.push(`text is required, and length cannot be smaller than ${MIN_LENGTH}`);
    }

    if ( !isStringWithMinLength( body.articleId, 0) ) {
        errors.push("articleId is required");
    }

    if ( ! isStringWithMinLength( body.author, 0) ) {
        errors.push("author field is required")
    }

    return errors;
}

function isStringWithMinLength(str, len) {
    if ( !str || str.length < len || typeof str !== 'string' ) {
        return false;
    }

    return true;
}


module.exports = validate;