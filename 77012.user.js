// ==UserScript==
// @name           IMDb -> nzbsrus.com
// @namespace      imdb2nzbsrus.com
// @include        http://*.imdb.com/title/*
// ==/UserScript==

function getIMDB()
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
n = getIMDB();
unsafeWindow.$('<a>')
   .attr('href', 'http://www.nzbsrus.com/nzbbrowse.php?searchwhere=title&searchtext=imdb:'+n)
   .css({ marginRight: '.25em', position: 'relative', top: 3 })
   .append('<img src="http://a.imagehost.org/0996/favicon_16.png">')
   .prependTo('#pagecontent h1 span:first');