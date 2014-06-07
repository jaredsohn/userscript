// ==UserScript==
// @name           HDBits: Hide Featured Torrents
// @description    Hide random old torrents showing at the top of the browsing-list
// @include        https://hdbits.org/browse.php
// @include        http://hdbits.org/browse.php
// @include        https://hdbits.org/browse.php?update_last_browse=1
// @include        http://hdbits.org/browse.php?update_last_browse=1
// ==/UserScript==

var all=document.getElementsByTagName("*");
for (var i=0;i < all.length;i++){
	if (all[i].className=="featured"){
		all[i].style.display="none";
	}
}