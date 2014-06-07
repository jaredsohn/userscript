// ==UserScript==
// @name        sadpanda Redirect
// @namespace   sandbox
// @include     http://www.jkforum.net/thread-*.html
// @version     0.1
// @grant       none
// @run-at      document-end
// ==/UserScript==

var is = document.querySelectorAll('img[id^=aimg][src^="http://sadpanda.us/images/"]');
Array.prototype.forEach.call(is, function (i) {
    i.src = i.src.replace('http://', 'http://www.');
});