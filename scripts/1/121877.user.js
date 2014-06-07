// ==UserScript==
// @name           tvtv.de title link imdb
// @namespace      tvtv.de
// @include        http://www.tvtv.de/detailansicht.php?sendungs_id=*
// ==/UserScript==

var title;
var plainTitle;

var spans = document.getElementsByTagName('span');
for (i=0; i<spans.length; i++) {
  if(spans[i].className=='DetailblockOrig') {
    var s=spans[i];
	plainTitle=title=s.innerHTML;
  }
}

plainTitle=plainTitle.replace(/&amp;/g,"&");

var u="http://www.imdb.com/find?s=all&q="+encodeURIComponent(plainTitle);

var newtitle="<a href=\""+u+"\" target=\"_new\">"+title+"</a>";
s.innerHTML=newtitle;

