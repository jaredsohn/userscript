// ==UserScript==
// @name           Mapy.cz fix on Geocaching.com cache listing
// @namespace      no
// @description    Mapy.cz fix on Geocaching.com cache listing
// @include        http://*.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

document.getElementById('ctl00_ContentBody_MapLinks_MapLinks').innerHTML = document.getElementById('ctl00_ContentBody_MapLinks_MapLinks').innerHTML.replace("http://www.mapy.cz/?st=search&amp;fr=Loc:", "http://www.mapy.cz/?st=search&amp;fr=");