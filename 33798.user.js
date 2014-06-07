// ==UserScript==
// @name           add IMDb rating
// @author         Guybrush
// @description    adds movie ratings to any imdb link   
// @include        *
// @exclude http://*imdb*/title/*
// ==/UserScript==
// modified version of http://userscripts.org/scripts/show/9174
var links = document.links;
for (i = 0; i < links.length; i++) {
  if (links[i].href.indexOf("/title/") != -1) {
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: links[i].href,
      onload: function (i) {return function(result) {
      rating = result.responseText.match(/<div class="starbar-meta">\n<b>(.*)\/10<\/b>/);
        links[i].parentNode.insertBefore(document.createElement("a"), links[i]).innerHTML = (rating ? "<b> [" + rating[1] + "] </b>" : "<b style='color: red;'>[NA] </b>&nbsp;");
      }}(i)
    });
  }
}