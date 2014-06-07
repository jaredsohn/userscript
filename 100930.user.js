// ==UserScript==
// @name          Partis.si - remove waiting
// @description   Only for Partis.si, by SiByte
// @version       1.0
// @include       http://*partis.si/torrent/pocakaj* 
// ==/UserScript==

var link = String(location.href)
var isotmp = link.lastIndexOf("/")
location.href = 'http://www.partis.si/torrent/prenesi/' + link.substring(isotmp +1) + '?dl=ok'