// ==UserScript==
// @name           SaunaVisio Download Link
// @namespace      SaunaVisioDLLink
// @description    Add download link to SaunaVisio IPTV-service
// @include        http://www.saunavisio.fi/tvrecorder/program.sl*view=true
// ==/UserScript==

function getProgInfoElement() {
  var all = document.getElementsByTagName('td');
  for (var e = 0; e < all.length; e++)
    if (all[e].className == 'prgrinfo1a')
      return all[e];
  return false;
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
sv_infoElement.innerHTML += '<br/><p><a href="'+getURL()+'">Download</a></p>';
