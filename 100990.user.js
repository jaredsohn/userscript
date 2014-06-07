// ==UserScript==
// @name           DanGeo2Google
// @namespace      http://www.dan.co.il/
// @description    Changes station links from eMap to Google Maps
// @include        http://dan.co.il/search/lines_details.asp?*
// @include        http://www.dan.co.il/search/lines_details.asp?*
// ==/UserScript==

var d = {};
d.links = document.links;
d.regex = /CenterMap\('([0-9.]+)','([0-9.]+)'\)/i;
d.glink = 'http://maps.google.com/?hl=iw&z=17&q=';

for (i in d.links) {
  a = i;
  var onclick = d.links[a].getAttribute('onclick');
  result = d.regex.exec(onclick);
  if (result!=null) {
    name = d.links[a].text.replace(/^\s(.*)\s\((.*)\)\s/, '$1 "$2"');
    longitude = result[1];
    latitude = result[2];
	d.links[a].setAttribute('onclick', "window.open('"+d.glink+latitude+","+longitude+"+("+name+")','GmapFromDan');return false;");
  }
}
