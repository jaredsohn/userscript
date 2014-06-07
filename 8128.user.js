// ==UserScript==
// @name          GeoWiki
// @namespace     http://labs.geody.com/greasemonkey/
// @description   Links coordinates on Wikipedia to Geody
// @author        GeodyWorks
// @include       http://*.wikipedia.*/*
// ==/UserScript==

document.wrappedJSObject.onclick = null;
var allLinks = document.getElementsByTagName('a')
for (var i = 0; i < allLinks.length; i++) {
  var thisLink = allLinks[i];
  if (thisLink.href.match("/geo/geohack.php")!=null && thisLink.href.match("_E_")!=null) {
    var jsUrl = thisLink.href;
    thisLink.href = 'http://www.geody.com/geolook.php?world=terra&q='+jsUrl.substring(jsUrl.indexOf("params=")+7,jsUrl.indexOf("_E_")+2)+'&refer=greasegeowiki';
  } else if (thisLink.href.match("/geo/geohack.php")!=null && thisLink.href.match("_W_")!=null) {
    var jsUrl = thisLink.href;
    thisLink.href = 'http://www.geody.com/geolook.php?world=terra&q='+jsUrl.substring(jsUrl.indexOf("params=")+7,jsUrl.indexOf("_W_")+2)+'&refer=greasegeowiki';
  }
}