// ==UserScript==
// @name           imdb ratings adder II.
// @description    adds ratings to titles on imdb company and name pages.
// @namespace      Fladvad built on znerps script
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
        //rating = res.slice(res.indexOf('<b>User Rating:</b>')+19,res.indexOf("</b>",res.indexOf('<b>User Rating:</b>')+19)+4);
        rating = res.match(/<b>User Rating:<\/b>\s*<b>([^<]*)\/10<\/b>/);
        if (rating) node.insertBefore(document.createElement("font"),node.getElementsByTagName("a")[node.getElementsByTagName("a").length-1]).innerHTML = " ("+rating[1]+")&nbsp;&nbsp;";
        else node.insertBefore(document.createElement("font"),node.getElementsByTagName("a")[node.getElementsByTagName("a").length-1]).innerHTML = " (?.?)&nbsp;&nbsp;";
      }}(links[i].parentNode)
    });
  }
}