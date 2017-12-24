const request = require('request');

const log = console.log;

function create ( config ) {
    return (body, sourceIp) => {

        return new Promise( (resolve, reject) => {

            log("Processing isHuman, secret is ", config.secret);
            if(body['g-recaptcha-response'] === undefined || body['g-recaptcha-response'] === '' || body['g-recaptcha-response'] === null) {
                log("missing captcha");
                return resolve(false);
            }

            const secretKey = config.secret;
            const verificationUrl = config.url + secretKey + "&response=" + body['g-recaptcha-response'] + "&remoteip=" + sourceIp;
            // Hitting GET request to the URL, Google will respond with success or error scenario.
            request.get( {
                url: verificationUrl,
                json: true
            }, (error,response,body) => {

                if ( error ) {
                    log("error while making request to captcha service ", error)
                    return resolve(false);
                }

                if(body.success !== undefined && !body.success) {
                    log("invalid captcha verification")
                    return resolve(false);
                }

                log("valid captcha");
                return resolve(true);
            });
        })
    }
}
module.exports.create = create;