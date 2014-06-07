// ==UserScript==
// @name          Flickr Accesibilty Hacks
// @author        Erik Kastner <kastner@gmail.com>
// @namespace     http://metaatem.net/greasemonkey
// @description   Flickr Accesibilty Hacks - make tabing out of text areas go to the post submit button
// @include       http://*flickr.com/*
// ==/UserScript==

(
function() {
    var text = "";

    var url = window.location.href;
    if (url.match(/messages_write/)) text = "SEND THIS";
    else if (url.match(/new/)) text = "START TOPIC";
    else if (url.match(/groups/)) text = "POST NOW";
    else text = "SUBMIT";

    var tas = document.getElementsByTagName("textarea");
    for (var i=0; i<tas.length; i++) {
        if (tas[i].name == "message" || tas[i].name == "body") {
            var t = tas[i];
            var sub = document.createElement("INPUT");
            sub.type = "submit";
            sub.className = "Butt";
            sub.value = text;
            if (t.nextSibling) {
                // we do nextSibling.nextSibling so as to preserve "br" after the textarea - not great- kinda "hacky"
                if (t.nextSibling.nextSibling) t.parentNode.insertBefore(sub, t.nextSibling.nextSibling);
                else t.parentNode.insertBefore(sub, t.nextSibling);
            }
            else t.parentNode.appendChild(sub);
        }
    }
}
)();
