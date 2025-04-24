// Import the axios lib
// Axios = promis based HTTP client; makes async requests to external APIs & handles responses
const axios = require('axios');

// Middleware function : records all requests on client website & transfers to QG endpoint
function qgMiddleware(req, res, next) {
    // log object
    const logData = {
        method : req.method,            // HTTP method (GET, POST, ...)
        endpoint : req.originalUrl,     // where req made (/login, /search, ...)
        ip : req.ip,                    // IP addy of user making req
        headers : req.headers,          // headers (agent, cookies, ...)
        body : req.body,                 // data send by user (what they type into field)
        timestamp : new Date().toISOString(), // save date & time
    };

    // send log data to QG API endpoint
    axios.post('ENDPOINT URL', logData).catch(err => {
        console.error("Query Guard log failed: ", err.message);
    });

    // Express.js fnc to pass control to the next middleware in the stack
    next();
}

MediaSourceHandle.exports = queryguardMiddleware;

