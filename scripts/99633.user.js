// ==UserScript==
// @name          Partis Odstranjevalec cakanja
// @description   Nizko razmerje in moras cakati na torrente na partisu?
// @version       1.0
// @include       http://*partis.si/torrent/pocakaj* 
// ==/UserScript==

var lokacija=String(location.href)
var isotmp=lokacija.lastIndexOf("/")
location.href='http://www.partis.si/torrent/prenesi/'+lokacija.substring(isotmp +1)+'?dl=ok'