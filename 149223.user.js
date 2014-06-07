// ==UserScript==
// @name        APK-Suchhilfe (Google Play)
// @namespace   searchapk
// @include     https://play.google.com/store/apps/details?*
// @match       https://play.google.com/store/apps/details?*
// @author      ChDFT
// @version     3
// @grant       none
// @description fügt den Google Play App Seiten Buttons zum suchen der APK(Installationsdateien) mit Bing und Google hinzu
// ==/UserScript==

var data = document.getElementsByClassName("title");
var label = document.getElementsByClassName("content");
var version = "";
var name = document.getElementsByClassName("document-title")[0].getElementsByTagName("div")[0].innerHTML;
for (i = 0; i < data.length; i++) {
    if (data[i].inerHTML == "Aktuelle Version") {
        version = label[i].innerHTML;
    }
}

if (version == "Variiert je nach Gerät") { version = ""; }

//Bing
var a = document.createElement("a");
a.id = "searchapkbing";
a.className = "play-button wishlist-content wishlist-yet-to-add";
a.href = "http://www.bing.de?q=" + name + " " + version + " apk Download";
a.innerHTML = "APK SUCHEN (B)";
document.getElementsByClassName("wishlist-container")[0].appendChild(a);

//Google
var a = document.createElement("a");
a.id = "searchapkgoogle";
a.className = "play-button wishlist-content wishlist-yet-to-add";
a.href = "http://www.google.de?q=android " + name + " " + version + " apk Download";
a.innerHTML = "APK SUCHEN (G)";
document.getElementsByClassName("wishlist-container")[0].appendChild(a);
