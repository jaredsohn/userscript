// ==UserScript==
// @name        Fix google back functionality
// @namespace   http://nowhereyet
// @description Googles onmousedown event on search results prevents the back button working properly for me, this is a quick fix(works for me).
// @include     https://www.google.co.uk/search?q=*
// @include     https://www.google.com/search?q=*
// @version     1
// ==/UserScript==

var searchresultlinks = document.body.querySelectorAll("a.l");
for( var index = 0, linkleg = searchresultlinks.length; index < linkleg; index++ )
    searchresultlinks[index].onmousedown = null;
