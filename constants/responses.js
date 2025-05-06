/**
 * success response
 * @param {*} code 
 * @param {*} status
 * @param {*} message 
 * @param {*} details 
 * @param {*} content 
 */
function success(code, status, details, content) {

    const response = {
        code: code,
        status: status,
        message: "success",
        details: details,
        content: content
    }

    return response;
}

/**
 * failed response
 * @param {*} code 
 * @param {*} status 
 * @param {*} message 
 * @param {*} details 
 * @param {*} errorCode 
 */
function failed(code, status, details, errorCode) {

    const response = {
        code: code,
        status: status,
        message: "failed",
        details: details,
        errorCode: errorCode
    }

    return response;
}

module.exports = { success, failed };