// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://userscripts.org/scripts/create
// @copyright  2012+, You
// ==/UserScript==
var links = document.querySelectorAll('.result a[href^="http://www.baidu.com/link?url="]');
for (var i = 0, length = links.length; i < length; i++) {
    decode(links[i].href, links[i]);
}

function decode(url, target) {
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://noe132.duapp.com/baidu2.php?url=' + url,
        onload: function(response) {
            target.href = response.responseText;
        }
    });
}