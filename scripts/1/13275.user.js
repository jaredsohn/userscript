// ==UserScript==
// @name           imdb ratings adder III.
// @description    adds ratings to titles on imdb company and name pages.
// @namespace      Fladvad built on znerps script, and fixed by Szaki
// @include        *.imdb.com/company/*
// @include        *.imdb.com/name/*
// ==/UserScript==

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
      onload: function (node) {return function(result) {
        res=result.responseText;
        rating = res.match(/<b>User Rating:<\/b>\s*<b>([^<]*)\/10<\/b>/);
        var newnode = node.parentNode.insertBefore( document.createElement("font"), node);
        if (rating) newnode.innerHTML = " ("+rating[1]+")&nbsp;&nbsp;";
        else        newnode.innerHTML = " (?.?)&nbsp;&nbsp;";
      }}(links[i])
    });
  }
}