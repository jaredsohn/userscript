// ==UserScript==
// @name    Anime Planet Auto Forward
// @description   When there is an exact-text match for the search, it forwards to user to that.
// @include   http://www.anime-planet.com/search.php*
// ==/UserScript==

var area = document.body.childNodes[1].childNodes[9];

var search = area.childNodes[8].innerHTML.match(/You searched for: <strong>(.*)<\/strong>/i)[1];

var loc=area.childNodes[14].innerHTML.match(new RegExp('<a href="(\/anime\/.*?)">'+search+'</a>', 'i'));

if(loc)

{

  setTimeout('document.location="'+loc[1]+'"',3000);

}