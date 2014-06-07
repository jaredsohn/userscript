// ==UserScript==
// @name           Elisa Viihde Download Link
// @namespace      ElisaViihdeDLLink
// @description    Add download link to Elisa Viide IPTV-service
// @include        http://elisaviihde.fi/etvrecorder/program.sl*view=true
// ==/UserScript==

function getProgInfoElement() {
  var description = document.getElementById('prgrminfo2');
  return description;
}

function getURL() {
  var all = document.getElementsByTagName('script');
  for (var e = 0; e < all.length; e++) {
    var url = /doGo\(\'(.+?)\'\)/(all[e].innerHTML);
    if (url)
	  return url[1];
  }
}

var sv_infoElement = getProgInfoElement();
sv_infoElement.innerHTML += '<p><a href="'+getURL()+'">Lataa tiedosto</a></p>';