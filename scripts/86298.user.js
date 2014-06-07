// ==UserScript==
// @name           nCore - remove banners
// @namespace      ncore
// @include        http://ncore.cc/torrents.php*
// @include        http://ncore.us/torrents.php*
// @include        http://ncore.nu/torrents.php*
// @include        https://ncore.cc/torrents.php*
// @include        https://ncore.us/torrents.php*
// @include        https://ncore.nu/torrents.php*
// ==/UserScript==
(function(){var a=document.getElementById('main_tartalom');r1=a.children[3];if(a.children.length==8){r2=a.children[7];if(a.children[4].children[2].children.length>2){r0=a.children[2]}else{r0=a.children[4]}}else if(a.children.length==7){}else{r0=a.children[4];r2=a.children[8]}a.removeChild(r0);a.removeChild(r1);a.removeChild(r2)})();