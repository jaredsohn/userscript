// ==UserScript==
// @name           Appulos Fix
// @namespace      userscripts
// @description    Fixes appulos
// @include        http://appulo.us/appdb/
// ==/UserScript==
var place = document.getElementsByName('trollans')[0];
place.value = "kyek";

var click = document.createEvent("MouseEvents");
click.initEvent("click", true, true);
var place2 = document.getElementById('submit')[0];
place2.dispatchEvent(click);