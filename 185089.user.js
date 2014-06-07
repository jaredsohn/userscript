// ==UserScript==
// @name       KalóriaBázis hide head
// @namespace  http://kaloriabazis.hu/
// @version    0.1
// @description  Elrejti a <div class="head"></div> -et
// @match      http://kaloriabazis.hu/fooldal
// @match      http://kaloriabazis.hu/index.php
// @match      http://kaloriabazis.hu
// @copyright  2013+, Caleb
// ==/UserScript==

$(document).ready(function() {
    var a = new Array();
    a[0] = $("div.facebook");
    a[1] = $("div.headtext1");
    a[2] = $("div.headtext2");
    a[3] = $("div.stat");
    a[4] = $("div.comment");
    for (var i in a) {
        a[i].remove();
    }
    GM_addStyle( "div.pageMain div.head { height: 38px; }");
    GM_addStyle( "div.pageMain div.head div.dates { top: 2px; }");    
});