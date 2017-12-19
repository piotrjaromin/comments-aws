module.exports = {
    captcha : {
        url : "https://www.google.com/recaptcha/api/siteverify?secret=",
        secret : "secret-from-google"
    },
    dynamodb : {
        tableName : "comments-blog",
        dateFormat: "DD-MM-YYYY HH:mm:ss"
    }
}