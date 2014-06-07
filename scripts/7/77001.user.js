// ==UserScript==
// @name           Deezer NoLimit 
// @description    Removes "are you here again?" limit 
// @version	   v1.1- By TwK
// @include        http://*.deezer.*/*
// ==/UserScript==
 

// On retire les messages qui s'affichent, etc etc...
var msgout = document.getElementById("popup_inactive");
if (msgout) {
    msgout.parentNode.removeChild(msgout);
}
var msgout2 = document.getElementById("bg_inactive");
if (msgout2) {
    msgout2.parentNode.removeChild(msgout2);
}

if () {
window.setTimeout(music.run_start_object,0);
music.start_count = 0;
music.window_status = true;
music.inactive_count = 9000:

}

// ancienne version. On la garde.
unsafeWindow.window.onblur = function()
 {
 };

unsafeWindow['run_inactive_object'] = function();