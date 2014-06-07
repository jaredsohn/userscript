// ==UserScript==
// @name           Odnoklassniki Hide Game List
// @description    Odnoklassniki Hide Game List.
// @include        http://*.odnoklassniki.ru/*
// @include        http://*.odnoklasniki.ru/*
// @version        1.01 2011-08-24
// ==/UserScript==


/* Written 2011 by Ktak, Rinet
 * This script is Public Domain.
 */

var div = document.getElementById("hook_Block_MiddleColumnTopCard_MenuUser");
if (div != undefined) {
    tags = div.getElementsByTagName("a");
    tags[4].style.display = "none";
}

var tbl = document.getElementById("globalNavPanel");
if (tbl != undefined) {
    tbl.children[0].children[0].cells[1].style.display = "none";
}
