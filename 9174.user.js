// ==UserScript==
// @name           imdb ratings adder.
// @description    adds ratings to titles on imdb search results.
// @namespace      znerp
// @include        http://www.imdb.tld/find?q=*
// @include        http://www.imdb.tld/find?s=*&q=*
// @include        http://imdb.tld/find?q=*
// @include        http://imdb.tld/find?s=*&q=*
// @include        http://imdb.tld/name/nm*
// @include        http://www.imdb.tld/name/nm*
// ==/UserScript==

var links = document.links;
for (i = 0; i < links.length; i++) {
  if (/\/title\/tt\d+\/$/.test(links[i].href) &&
      links[i].textContent != "") {
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: links[i].href,
      onload: function (i) {return function(result) {
        rating = result.responseText.match(/<b>(\d+[\.,]\d\/10)<\/b>/);
        links[i].parentNode.insertBefore(document.createElement("b"), links[i]).innerHTML = (rating ? "[" + rating[1] + "] " : "[??/10] ");
      }}(i)
    });
  }
}