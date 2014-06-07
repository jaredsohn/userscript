// ==UserScript==
// @name        duell_helper
// @namespace   Fairbanks
// @description Collects and provides information about the-west duells
// @include     http://de16.the-west.de/game.php*
// @version     1
// ==/UserScript==

var action_init = function() {
    var jq = unsafeWindow.jQuery;
    var elem_duell = document.createElement("div");
    elem_duell.id = "duell_helper";
    elem_duell.style.position = "absolute";
    elem_duell.style.left = "143px";
    elem_duell.style.top = "135px";

    var elem_duell_link = document.createElement("a");
    elem_duell_link.href = "http://skylet.de/alabama/sheriff/index.html";
    elem_duell_link.id = "duell_helper_link";

    var elem_duell_img = document.createElement("img");
    elem_duell_img.id = "duell_helper_img";
    elem_duell_img.src = "http://skylet.de/alabama/static/images/colts.png";
    elem_duell_img.target = "_blank";

    jq("#ui_character_container").append(elem_duell);
    jq("#duell_helper").append(elem_duell_link);
    jq("#duell_helper_link").append(elem_duell_img);
}

var wait_jquery_loaded = function() {
    if (typeof unsafeWindow.jQuery != 'undefined') {
        // Remove the listener that called this function.
        document.removeEventListener("load",wait_jquery_loaded,true);
        action_init();
    }
}

document.addEventListener("load",wait_jquery_loaded,true);
