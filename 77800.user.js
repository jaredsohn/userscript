// ==UserScript==
// @name           disable_key_navigation
// @namespace      pardus.at
// @description    disables navigation from pressing the numpad
// @include        http://*.pardus.at/main.php*
// @author         ratchet freak
// @version        1.1

// ==/UserScript==

var allowNumpad = false


if(!unsafeWindow)unsafeWindow = window;
if(allowNumpad){
unsafeWindow.document.onkeydown = function(e){
    if (unsafeWindow.waiting) return;
    if (document.getElementById('useform')) return;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    var d = "";
	if(code == 38 ||code == 39 || code == 40 || code == 37)return;
	
    if (code == 104) d = "n";
    else if (code == 105) d = "ne";
    else if (code == 102) d = "e";
    else if (code == 99) d = "se";
    else if (code == 98) d = "s";
    else if (code == 97) d = "sw";
    else if (code == 100) d = "w";
    else if (code == 103) d = "nw";
    var to = unsafeWindow.userloc;
    if (unsafeWindow.dir2field[d]) {
        to = unsafeWindow.dir2field[d];
    }
    if (to != unsafeWindow.userloc) {
        if (unsafeWindow.ajax) {
            unsafeWindow.navAjax(to);
        } else {
            unsafeWindow.nav(to);
        }
    }

};

}else unsafeWindow.document.onkeydown = function(){};