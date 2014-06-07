// ==UserScript==
// @name        Facebook Gags: [drop]
// @namespace   gags
// @description [drop] -> wub wub wub wub
// @include     https://www.facebook.com/
// @include     https://www.facebook.com/?*
// @require     http://pastebin.com/raw.php?i=2GyZd2Dy
// @version     1
// @grant       none
// ==/UserScript==

var DROP_SOUND_SRC = "https://dl.dropboxusercontent.com/u/84590655/drop.ogg";

function playDrop() {
    var drop = document.getElementById("facebook_gags_drop");
    if (drop === null) {
        drop = document.createElement("audio");
        drop.src = DROP_SOUND_SRC;
        drop.id = "facebook_gags_drop";
        document.body.appendChild(drop);
    }
    drop.play();
}

addMessageHook(function(msg, currentUser) {
    if (msg.body.indexOf("[drop]") > -1) {
        playDrop();
    }
});