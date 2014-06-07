// ==UserScript==
// @name       nicekb
// @version    0.1
// @description  remove boring onclick shit on killboards
// @match      http://*zkillboard.com/*
// @match      http://*.eve-kill.net/*
// @copyright  2012+, You
// ==/UserScript==

//$("tbody>tr").attr("onclick", null);
var t = document.querySelectorAll("tbody>tr");
for(var i = 0; i<t.length; i++) {
    t[i]["onclick"] = null;
}
