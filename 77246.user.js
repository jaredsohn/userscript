// Script pour afficher le contenu d'une fanpage Facebooksans cliquer sur "j'aime"







// version 0.1 BETA!







// 2010-05-21







// Copyright (c) 2010, Gwendal Le Bihan







// Released under the GPL license







// http://www.gnu.org/copyleft/gpl.html

// Javascript code from http://blog.p4ul.info/2010/04/facebook-voir-le-contenu-dune-fanpage-sans-avoir-a-devenir-fan/





//







// --------------------------------------------------------------------







//







// This is a Greasemonkey user script.  To install it, you need







// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/







// Then restart Firefox and revisit this script.







// Under Tools, there will be a new menu item to "Install User Script".







// Accept the default configuration and install.







//







// To uninstall, go to Tools/Manage User Scripts,







// select "Afficher le contenu des fanpages facebook", and click Uninstall.







//







// --------------------------------------------------------------------







//







// ==UserScript==







// @name          Afficher le contenu des fanpages facebook







// @namespace     http://diveintomark.org/projects/greasemonkey/







// @description   Afficher le contenu d'une fanpage Facebook sans cliquer sur "j'aime"







// @include       htt*://www.facebook.com*







// ==/UserScript==









spans=document.getElementById("tab_canvas").getElementsByTagName("span");

for(var sp in spans){spans[sp].style.visibility="visible"}





