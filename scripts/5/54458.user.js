// ==UserScript==
// @name           Underground Gamer + BitGAMER Torrent Title Search only
// @namespace	http://userscripts.org/scripts/show/54458
// @description    searches only in torrent title on ug and bg
// @include        *bitgamer.com/browse.php?search=*
// @include        *underground-gamer.com/browse.php?search=*
// @exclude        *searchtitle=1*
// @exclude        *searchtitle=0*
// ==/UserScript==

location.href+='&searchtitle=1';