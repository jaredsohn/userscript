// ==UserScript==
// @name           Page Blocker
// @namespace      http://userscripts.org/users/23652
// @description    Blocks included pages from loading (goes back if possible)
// @include        http://www.rocashbux.info/viewp.php?ad=29
// @copyright      JoeSimmons
// ==/UserScript==

if(history.length > 1) { history.go(-1); } else { document.body.innerHTML=''; document.title='';}