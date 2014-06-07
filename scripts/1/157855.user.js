// ==UserScript==
// @name       CheckGoogleImageExists
// @version    0.1
// @description  Change color of button according to whether or not exists of Image
// @match      http://www.google.co.jp/search?*&tbm=isch*
// @match      https://www.google.co.jp/search?*&tbm=isch*
// ==/UserScript==

var imgExists = function(src, callback) {
    if (!src) return;
    var img = new Image();
    img.onload = function() {
        callback(true);
    }
    img.onerror = function() {
        callback(false);
    }
    img.src = src;
}
document.addEventListener('DOMNodeInserted',function(e){
    if (e.relatedNode.id != "irc_fn") return;
    var atag = document.getElementById("irc_fsl");
    atag.style.backgroundColor = "rgb(34,34,34)";
    if (/^\/url\?sa/.test(atag.href)) {
        atag.style.backgroundColor = "green";
    } else {
        imgExists(atag.href, function (ret) {
        atag.style.backgroundImage = "none";
        atag.style.backgroundColor = ret ? "midnightblue" : "maroon";
        })
    }
}, false);