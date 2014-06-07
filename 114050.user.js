// ==UserScript==
// @name           Remove Twitter Trends & Who-to-follow components.
// @namespace      http://pierrechamberlain.ca/userscripts
// @description    Annoyed by Twitter's ridiculous Trends and irrelevant users you should follow? Execute this script so you never have to worry about it again!
// @include        http://twitter.com/*
// ==/UserScript==

/*
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-1.6.4.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
*/

setTimeout(function() {
$('span:contains("Who to follow"), h2:contains("Trends:")').each(function(i, item) {
  $(item).parent().parent().remove();
});
}, 2000);