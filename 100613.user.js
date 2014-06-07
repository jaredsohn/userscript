// ==UserScript==
// @id             errorhandlerscript@userscripts.org
// @name           Error Handler
// @version        2.2
// @release        2011-09-03
// @author         Benjamin Harris
// @license        Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License
// @namespace      errorhandlerscript@userscripts.org
// @updateURL      http://userscripts.org/scripts/source/100613.meta.js
// @description    Upon page error (403, 404, 500, etc.), this describes the error, and can redirect you to a search using the terms of the page you were looking for.
// @include        *
// ==/UserScript==

var descriptions = {
	'400 Bad Request': 'The request cannot be fulfilled due to bad syntax.',
	'401 Unauthorized': 'The request was a legal request, but the server is refusing to respond to it. Authentication is possible but has failed or not yet been provided.',
	'402 Payment Required': '',
	'403 Forbidden': 'Access Denied. The request was a legal request, but the server is refusing to respond to it.',
	'404 Not Found': 'The requested resource could not be found/does not exist.',
	'405 Method Not Allowed': 'A request was made of a resource using a request method not supported by that resource. For example, using GET on a form which requires data to be presented via POST, or using PUT on a read-only resource.',
	'406 Not Acceptable': 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request.',
	'407 Proxy Authentication Required': '',
	'408 Request Timeout': 'The server timed out waiting for the request. According to W3 HTTP specifications: "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."',
	'409 Conflict': 'Indicates that the request could not be processed because of conflict in the request, such as an edit conflict.',
	'410 Gone': 'Indicates that the resource requested is no longer available and will not be available again. Used when a resource has been intentionally removed and the resource should be purged. The resource should not be requested again in the future.',
	'411 Length Required': 'The request did not specify the length of its content, which is required by the requested resource.',
	'412 Precondition Failed': 'The server does not meet one of the preconditions that the requester put on the request.',
	'413 Request Entity Too Large': 'The request is larger than the server is willing or able to process.',
	'414 Request URI Too Long': 'The URI provided was too long for the server to process.',
	'415 Unsupported Media Type': 'The request entity has a media type which the server or resource does not support. For example, the client uploads an image as a .svg, but the server requires that images use a different format.',
	'416 Requested Range Not Satisfiable': 'The client has asked for a portion of the file, but the server cannot supply that portion. For example, if the client asked for a part of the file that lies beyond the end of the file.',
	'417 Expectation Failed': 'The server cannot meet the requirements of the Expect request-header field.',
	'422 Unprocessable Entity (WebDAV) (RFC 4918)': 'The request was well-formed but was unable to be followed due to semantic errors.',
	'423 Locked (WebDAV) (RFC 4918)': 'The resource that is being accessed is locked.',
	'424 Failed Dependency (WebDAV) (RFC 4918)': 'The request failed due to failure of a previous request (e.g. a PROPPATCH).',
	'426 Upgrade Required (RFC 2817)': 'The client should switch to a different protocol such as TLS/1.0.',
	'440 Login Timeout': 'Your login timed out or expired.',
	'444 No Response': 'An Nginx HTTP server extension. The server returns no information to the client and closes the connection (useful as a deterrent for malware).',
	'449 Retry With': 'A Microsoft extension. The request should be retried after performing the appropriate action. Actions include: making sure the website is a valid address, refreshing the page, clearing the cache, making sure you are connected to the internet, restarting the browser, checking your internet speed, etc.',
	'450 Blocked by Windows Parental Controls': 'A Microsoft extension. Windows Parental Controls are turned on and are blocking access to this webpage. Please talk to your system administrator, who can change Parental Control settings. If this page has been allowed, try clearing your cache and refreshing the page.',
	'499 Client Closed Request': 'An Nginx HTTP server extension. The connection was closed by the client while HTTP server was processing its request, making the server unable to send the HTTP header back.',
	'500 Internal Server Error': 'A generic error message, no more specific message is suitable.',
	'501 Not Implemented': 'The server either does not recognise the request method, or it lacks the ability to fulfill the request.',
	'502 Bad Gateway': 'The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
	'503 Service Unavailable': 'The server is currently unavailable (because it is overloaded or down for maintenance). Generally, this is a temporary state.',
	'504 Gateway Timeout': 'The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
	'505 HTTP Version Not Supported': 'The server does not support the HTTP protocol version used in the request.',
	'506 Variant Also Negotiates (RFC 2295)': 'Transparent content negotiation for the request results in a circular reference.',
	'507 Insufficient Storage (WebDAV) (RFC 4918)[6]': 'The server does not have enough storage left to process the request.',
	'509 Bandwidth Limit Exceeded (Apache bw/limited extension)': 'The bandwidth limit for the server or website you are trying to visit has been exceeded. This is usually a temporary state.',
	'510 Not Extended (RFC 2774)': 'Further extensions to the request are required for the server to fulfill it.'
};

var title = String(document.title);

// startsWith() and endsWith() functions
String.prototype.startsWith = function(str) {return (this.match("^"+str)==str)}
String.prototype.endsWith = function(str) {return (this.match(str+"$")==str)}

// Configure title
var error = 'false';
for (var key in descriptions) {
	if (title.startsWith(key) || title.endsWith(key)) {
		title = key;
		error = 'true';
		break;
	} else if (title.startsWith('403 Permission Denied') || title.endsWith('403 Permission Denied') || title.startsWith('403 Access Denied') || title.endsWith('403 Access Denied') || title.startsWith('403 Request Denied') || title.endsWith('403 Request Denied')) {
		title = '403 Forbidden';
		error = 'true';
		break;
	} else if (title.startsWith('The page cannot be found') || title.endsWith('The page cannot be found') || title.startsWith('Page Not Found') || title.endsWith('Page Not Found') || title.startsWith('Error 404') || title.endsWith('Error 404')) {
		title = '404 Not Found';
		error = 'true';
		break;
	} else if (title.startsWith('401 Authorization') || title.endsWith('401 Authorization')) {
		title = '401 Unauthorized';
		error = 'true';
		break;
	} else if (title.startsWith('500 Server Error') || title.endsWith('500 Server Error')) {
		title = '500 Internal Server Error';
		error = 'true';
		break;
	}
}

var errorType;
if (title[0] === '4') {
	errorType = 'CLIENT';
} else if (title[0] === '5') {
	errorType = 'SERVER';
}
function makeSearchTerms(url) {
	var terms = url.slice(7).split('/');
	var first = String(terms.slice(0, 1));
	var last = String(terms.slice(-1));
	if (first.search('www.') !== -1) {
		first = first.replace('www.', '');
		terms[0] = first;
	}
	if (last.match(/\.[A-z]+$/)) {
		last = last.replace(/\.[A-z]+$/, '');
		terms[terms.length-1] = last;
	}
	var newURL = '';
	for (var i=0; i < terms.length; i++) {
		newURL += String(terms[i]);
		newURL += '+';
	}
	return newURL.slice(0, -1);
}
var location = document.location.href;
var googleSearch = 'http://www.google.com/search?q=' + makeSearchTerms(location);
var bingSearch = 'http://www.bing.com/search?q=' + makeSearchTerms(location);
var yahooSearch = 'http://search.yahoo.com/search?p=' + makeSearchTerms(location);
var divbeg = '<head><title>' + title + '</title></head><body><div style="border: solid black 2px; text-align: center; padding: 10px;"><h2>' + errorType + ' ERROR: ' + title + '</h2><div style="font-size:20px;">';
var divend = '</div><br /><br />Page tools: <input type="button" value="Reload page" onclick="window.location.reload();" /> <input type="button" value="Previous page" onclick="history.go(-1);" /> &nbsp;&nbsp;&nbsp;<b>:|:</b>&nbsp;&nbsp;&nbsp; Search for this page on: <input type="button" value="Google" onclick="window.location.href = \'' + googleSearch + '\';" /> <input type="button" value="Yahoo" onclick="window.location.href = \'' + yahooSearch + '\';" /> <input type="button" value="Bing" onclick="window.location.href = \'' + bingSearch + '\';" /></div></body>';

if (error === 'true') {
	document.getElementsByTagName('html')[0].innerHTML = divbeg + descriptions[title] + divend;
}
