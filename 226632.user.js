// ==UserScript==
// @name        	SteamGifts Plus Alternative
// @version     	1.0.0-LATEST
// @namespace   	steamgiftsplus
// @description    	Adds various features.
// @copyright      	2012 Kaitlyn <reowkaitlyn@gmail.com>
// @license        	MIT; http://en.wikipedia.org/wiki/Mit_license
// @include			http://www.steamgifts.com/*
// @match			http://www.steamgifts.com/*
// @run-at        	document-end
// @icon 			data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmpJREFUeNp8k81OFEEUhc+tmuZPdGBAWCgkECSiRF1I4oINCYkrn8CFibpxZ+LGx3ClK5/AhDXGRB5BEl25YMAhJijM6GCgu7rqXm/VwDizsWcq3dV969Tp754mvJShtfrzxUnTfJNZs2ysuYT/HMLSdj58OeTas625V19p6uba3fmxsDVz9cqosRVYa0FkQLGazlelP0QYPgRI8LHm5FcYfWAvDtLbVqt1A8agNj4Oa6wuJKgTXa8/vSZDSSDNRRB0OFdmFcmXDHNYFS3aa+xjp15PG8YiCYyfq6/RXH6BoNfMnISDKjGrCKsT9ncqwjwK3QFisPttPwksLlxL51IylNXrGHZODRp9BUGWZSjyAsGraPADFZYoCRg9k6Uk4vXW/OxsF5xTgfMjMnKuQFkW8D6gEq1FaEwhCcWjsddAWZSYWu/MT3VH6umEL50u9ih1UHViWhJ1hdd63Ohr2fw4Y65m+tt4coB84yG8K5WFhwkJSCQbQO3dvuKdlkG9yX33aGQa+WmOwuXIo7ML1QmJLaQek5RaCRw//Z7mM++WMFYd6z5XeJoHrw4SA4WnuwvZ3rgpF+lOj45aCs1jZHDoXwlCaq92Qa1LfM9eq/22y8Kh3T4GNOTWdJwGBRhlDAf5EzSeEUiMae+gY4XK5ZlIjsMfB4mXy/PU2tK5E6oMVz8Ih/UYJpIYW9PNfudjkDM+jJhYBYBsYCA5IVv5SOby8j38rr/XJ2rQpLim1aaTe+niVQHdAJGNMrJk21RbuG/4yedtTN1eUYibGtWmxIxrgaTX4rQjp6FiETZrDeymn7y14h592v4rwAAJ42bBRk+RFwAAAABJRU5ErkJggg==
// ==/UserScript==

if (window.top == window) {
	var steamgiftsPlus = document.createElement('script');
	steamgiftsPlus.type = 'text/javascript';
	steamgiftsPlus.src = 'http://github.com/sgplus-alternative/release/raw/master/steamgifts-plus.js';
	document.body.appendChild(steamgiftsPlus);
}