module.exports = {
    captcha : {
        url : "https://www.google.com/recaptcha/api/siteverify?secret=",
        secret: process.env.CAPTCHA_SECRET
    },
    dynamodb : {
        tableName : process.env.TABLE_NAME,
        dateFormat: "DD-MM-YYYY HH:mm:ss"
    }
}