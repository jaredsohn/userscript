// ==UserScript==
// @name           imdb.de to imdb.com
// @description    switches german IMDB to english IMDB
// @include        http://www.imdb.de/title/tt*/
// ==/UserScript==

(
function() 
{    
    var url = window.location.href;
    url = url.replace("imdb.de/","imdb.com/");    
    window.location = url;
}
)();