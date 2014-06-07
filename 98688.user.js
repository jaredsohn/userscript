// ==UserScript==
// @name           Page Blocker (PRO)
// @description    Blocks included pages from loading (goes back if possible).
// @include        http://www.rocashbux.info/viewp.php?ad=29
// @copyright      Tony White
// ==/UserScript==

if(history.length > 1) { history.go(-1); } else { document.body.innerHTML=''; document.title='';}