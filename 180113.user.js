// ==UserScript==
// @name        IMDB -> GingaDaddy
// @namespace   www.imdbgingadaddy.com
// @include     http*://*.imdb.com/title/*
// @version     1.1
// @grant       none
// ==/UserScript==

function getTT()
{

  var regexS = "[0-9]{6,}";
  var regex = new RegExp( regexS );
var results = regex.exec( document.location );
if( results == null ) {
    return "";
} else{
    return results;


}
}
n = getTT();
unsafeWindow.$('<a>')
   .attr('href','https://www.gingadaddy.com/nzbbrowse.php?b=2&st=2&k=http%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt'+n+'%2F&c=0&g=0&sr=1&o=0')
   .css({ marginRight: '.25em', position: 'relative', top: 0 })
   .append('<img src="https://www.gingadaddy.com/themes/ICGstation/images/fav.gif">')
   .prependTo('#pagecontent h1 span:first');