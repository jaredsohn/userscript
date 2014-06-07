// ==UserScript==
// @name        Facebook Gags: ziiiip
// @namespace   gags
// @description ziiip -> Rust zip sound
// @include     https://www.facebook.com/
// @include     https://www.facebook.com/?*
// @require     http://pastebin.com/raw.php?i=2GyZd2Dy
// @version     1
// @grant       none
// ==/UserScript==

var ZIP_SOUND_SRC = "https://dl.dropboxusercontent.com/u/84590655/zipper.ogg";

function playZip() {
    var ziiip = document.getElementById("facebook_gags_zip");
    if (ziiip === null) {
        ziiip = document.createElement("audio");
        ziiip.src = ZIP_SOUND_SRC;
        ziiip.id = "facebook_gags_zip";
        document.body.appendChild(ziiip);
    }
    ziiip.play();
}

addMessageHook(function(msg, currentUser) {
    if (msg.body.search(/zii+p/i) > -1) {
        playZip();
    }
});