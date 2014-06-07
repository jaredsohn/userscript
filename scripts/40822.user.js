// ==UserScript==
// @name        Google Cache Browser
// @namespace   qixinglu.com
// @description Continue browsing the page in Google cache
// @grant       none
// @include     http://webcache.googleusercontent.com/search?*
// @include     https://webcache.googleusercontent.com/search?*
// ==/UserScript==

var convertCacheLinks = function(url) {
    var selector = 'body > div[style="position:relative"] a';
    var links = document.querySelectorAll(selector);
    var i, link;
    for (i = 0; i < links.length; i += 1) {
        link = links[i];
        link.href = location.href.replace(url, encodeURIComponent(link.href));
    }
};

var addOriginalLink = function(url) {
    var html = 'Go back to <a href="${href}">original page</a>.';
    var paragraph = document.createElement('p');
    paragraph.innerHTML = html.replace('${href}',decodeURIComponent(url));
    document.body.appendChild(paragraph);
};

var url = location.href.match(/q=cache:([^&+]+)/)[1];
if (document.title === 'Error 404 (Not Found)!!1') {
    addOriginalLink(url);
} else {
    convertCacheLinks(url);
}
