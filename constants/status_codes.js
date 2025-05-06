const ACCEPTED = { code: 202, status: 'Accepted' }; //Accepted
const BAD_GATEWAY = { code: 502, status: 'Bad Gateway' }; //Bad Gateway
const BAD_REQUEST = { code: 400, status: 'Bad Request' }; //Bad Request
const CONFLICT = { code: 409, status: 'Conflict' }; //Conflict
const CONTINUE = { code: 100, status: 'Continue' }; //Continue
const CREATED = { code: 201, status: 'Created' }; //Created
const EXPECTATION_FAILED = { code: 417, status: 'Expectation Failed' }; //Expectation Failed
const FAILED_DEPENDENCY = { code: 424, status: 'Failed Dependency' }; //Failed Dependency
const FORBIDDEN = { code: 403, status: 'Forbidden' }; //Forbidden
const GATEWAY_TIMEOUT = { code: 504, status: 'Gateway Timeout' }; //Gateway Timeout
const GONE = { code: 410, status: 'Gone' }; //Gone
const HTTP_VERSION_NOT_SUPPORTED = { code: 505, status: 'HTTP Version Not Supported' }; //HTTP Version Not Supported
const IM_A_TEAPOT = { code: 418, status: 'Im a teapot' }; //I'm a teapot
const INSUFFICIENT_SPACE_ON_RESOURCE = { code: 419, status: 'Insufficient Space on Resource' }; //Insufficient Space on Resource
const INSUFFICIENT_STORAGE = { code: 507, status: 'Insufficient Storage' }; //Insufficient Storage
const INTERNAL_SERVER_ERROR = { code: 500, status: 'Internal Server Error' }; //Server Error
const LENGTH_REQUIRED = { code: 411, status: 'Length Required' }; //Length Required
const LOCKED = { code: 423, status: 'Locked' }; //Locked
const METHOD_FAILURE = { code: 420, status: 'Method Failure' }; //Method Failure
const METHOD_NOT_ALLOWED = { code: 405, status: 'Method Not Allowed' }; //Method Not Allowed
const MOVED_PERMANENTLY = { code: 301, status: 'Moved Permanently' }; //Moved Permanently
const MOVED_TEMPORARILY = { code: 302, status: 'Moved Temporarily' }; //Moved Temporarily
const MULTI_STATUS = { code: 207, status: 'Multi-Status' }; //Multi-Status
const MULTIPLE_CHOICES = { code: 300, status: 'Multiple Choices' }; //Multiple Choices
const NETWORK_AUTHENTICATION_REQUIRED = { code: 511, status: 'Network Authentication Required' }; //Network Authentication Required
const NO_CONTENT = { code: 204, status: 'No Content' }; //No Content
const NON_AUTHORITATIVE_INFORMATION = { code: 203, status: 'Non Authoritative Information' }; //Non Authoritative Information
const NOT_ACCEPTABLE = { code: 406, status: 'Not Acceptable' }; //Not Acceptable
const NOT_FOUND = { code: 404, status: 'Not Found' }; //Not Found
const NOT_IMPLEMENTED = { code: 501, status: 'Not Implemented' }; //Not Implemented
const NOT_MODIFIED = { code: 304, status: 'Not Modified' }; //Not Modified
const OK = { code: 200, status: 'Ok' }; //Ok
const PARTIAL_CONTENT = { code: 206, status: 'Partial Content' }; //Partial Content
const PAYMENT_REQUIRED = { code: 402, status: 'Payment Required' }; //Payment Required
const PERMANENT_REDIRECT = { code: 308, status: 'Permanent Redirect' }; //	Permanent Redirect
const PRECONDITION_FAILED = { code: 412, status: 'Precondition Failed' }; //	Precondition Failed
const PRECONDITION_REQUIRED = { code: 428, status: 'Precondition Required' }; //	Precondition Required
const PROCESSING = { code: 102, status: 'Processing' }; //	Processing
const PROXY_AUTHENTICATION_REQUIRED = { code: 407, status: 'Proxy Authentication Required' }; //	Proxy Authentication Required
const REQUEST_HEADER_FIELDS_TOO_LARGE = { code: 431, status: 'Request Header Fields Too Large' }; //	Request Header Fields Too Large
const REQUEST_TIMEOUT = { code: 408, status: 'Request Timeout' }; //	Request Timeout
const REQUEST_TOO_LONG = { code: 413, status: 'Request Entity Too Large' }; //	Request Entity Too Large
const REQUEST_URI_TOO_LONG = { code: 414, status: 'Request-URI Too Long' }; //	Request-URI Too Long
const REQUESTED_RANGE_NOT_SATISFIABLE = { code: 416, status: 'Requested Range Not Satisfiable' }; //	Requested Range Not Satisfiable
const RESET_CONTENT = { code: 205, status: 'Reset Content' }; //	Reset Content
const SEE_OTHER = { code: 303, status: 'See Other' }; //	See Other
const SERVICE_UNAVAILABLE = { code: 503, status: 'Service Unavailable' }; //	Service Unavailable
const SWITCHING_PROTOCOLS = { code: 101, status: 'Switching Protocols' }; //	Switching Protocols
const TEMPORARY_REDIRECT = { code: 307, status: 'Temporary Redirect' }; //	Temporary Redirect
const TOO_MANY_REQUESTS = { code: 429, status: 'Too Many Requests' }; // Too Many Requests
const UNAUTHORIZED = { code: 401, status: 'Unauthorized' };  //Unauthorized
const UNPROCESSABLE_ENTITY = { code: 422, status: 'Unprocessable Entity' }; //Unprocessable Entity
const UNSUPPORTED_MEDIA_TYPE = { code: 415, status: 'Unsupported Media Type' }; //Unsupported Media Type
const USE_PROXY = { code: 305, status: 'Use Proxy' }; //Use Proxy
const EMAIL_SENT = { code: 306, status: 'Email Sent' }; //email sent
const EMAIL_NOT_SEND = { code: 399, status: 'Email Not Sent' }; //email sent

module.exports = {
    ACCEPTED,
    BAD_GATEWAY,
    BAD_REQUEST,
    CONFLICT,
    CONTINUE,
    CREATED,
    EXPECTATION_FAILED,
    FAILED_DEPENDENCY,
    FORBIDDEN,
    GATEWAY_TIMEOUT,
    GONE,
    HTTP_VERSION_NOT_SUPPORTED,
    IM_A_TEAPOT,
    INSUFFICIENT_SPACE_ON_RESOURCE,
    INSUFFICIENT_STORAGE,
    INTERNAL_SERVER_ERROR,
    LENGTH_REQUIRED,
    LOCKED,
    METHOD_FAILURE,
    METHOD_NOT_ALLOWED,
    MOVED_PERMANENTLY,
    MOVED_TEMPORARILY,
    MULTI_STATUS,
    MULTIPLE_CHOICES,
    NETWORK_AUTHENTICATION_REQUIRED,
    NO_CONTENT,
    NON_AUTHORITATIVE_INFORMATION,
    NOT_ACCEPTABLE,
    NOT_FOUND,
    NOT_IMPLEMENTED,
    NOT_MODIFIED,
    OK,
    PARTIAL_CONTENT,
    PAYMENT_REQUIRED,
    PERMANENT_REDIRECT,
    PRECONDITION_FAILED,
    PRECONDITION_REQUIRED,
    PROCESSING,
    PROXY_AUTHENTICATION_REQUIRED,
    REQUEST_HEADER_FIELDS_TOO_LARGE,
    REQUEST_TIMEOUT,
    REQUEST_TOO_LONG,
    REQUEST_URI_TOO_LONG,
    REQUESTED_RANGE_NOT_SATISFIABLE,
    RESET_CONTENT,
    SEE_OTHER,
    SERVICE_UNAVAILABLE,
    SWITCHING_PROTOCOLS,
    TEMPORARY_REDIRECT,
    TOO_MANY_REQUESTS,
    UNAUTHORIZED,
    UNPROCESSABLE_ENTITY,
    UNSUPPORTED_MEDIA_TYPE,
    USE_PROXY,
    EMAIL_NOT_SEND,
    EMAIL_SENT
};