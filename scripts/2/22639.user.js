// ==UserScript==
// @name           YouTube Country Server Selector
// @namespace      slim.amamou@gmail.com/greasemonkey/youtube_country_selector
// @description    Replaces YouTube embedded videos server with your country server (the one you choose).
// @include        *
// ==/UserScript==

var country = "it";

var allFlashs = document.evaluate(

  "//embed[@type='application/x-shockwave-flash' and contains(@src, 'youtube')]",

  document,

  null,

  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

  null);


for (var i = 0; i < allFlashs.snapshotLength; i++) {

  var thisTube = allFlashs.snapshotItem(i);
  thisTube.src = thisTube.src.replace("www", country);

  var newHref = thisTube.getAttribute('src');
  newHref = newHref.replace("/v/", "/watch?v=");
  newHref = newHref.replace("&rel=1", "");

  var newLink = document.createElement('a');
  newLink.setAttribute('href', newHref);
  newLink.setAttribute('target', '_blank');

  newLink.appendChild(document.createTextNode('[watch on YouTube .'+country+']'));

  thisTube.parentNode.parentNode.insertBefore(newLink, thisTube.parentNode.nextSibling);

}


var allMovs = document.evaluate(

  "//param[@name='movie' and contains(@value, 'youtube')]",

  document,

  null,

  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

  null);

for (var i = 0; i < allMovs.snapshotLength; i++) {

  var thisTube = allMovs.snapshotItem(i);
  thisTube.value = thisTube.value.replace("www", country);

}
