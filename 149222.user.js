// ==UserScript==
// @name        APK-Suchhilfe (Android PIT)
// @namespace   searchapk
// @author      ChDFT
// @include     http://www.androidpit.de/de/android/market/apps/app/*
// @match       http://www.androidpit.de/de/android/market/apps/app/*
// @version     1.3
// @grant       none
// @description fügt den Android-Pit App Seiten Buttons zum suchen der APK(Installationsdateien) mit Bing und Google hinzu
// ==/UserScript==
var data = document.getElementsByClassName("data");
var label = document.getElementsByClassName("label");
var version = ""; var preis = "";
for (i = 0; i < data.length; i++) {
	if (label[i].innerHTML == "AKTUELLE VERSION") {
		version = data[i].innerHTML;
	}
	if (label[i].innerHTML == "PREIS") {
		preis = data[i].innerHTML;
	}
}

//Bing
var a = document.createElement("a");
a.id = "searchapkbing";
a.className = "btnBig btnBlue buttonLink loginPopupButton";
a.href = "http://www.bing.de?q=" + document.getElementsByTagName("h1")[0].innerHTML + " " + version + " apk Download";
a.innerHTML = "APK suchen -Bing";
a.style.marginTop = "7px";
document.getElementsByClassName("leftBox")[0].appendChild(a);

//Google
a = document.createElement("a");
a.id = "searchapkgoogle";
a.className = "btnBig btnBlue buttonLink loginPopupButton";
a.href = "http://www.google.de#q=android " + document.getElementsByTagName("h1")[0].innerHTML + " " + version + " apk Download";
a.innerHTML = "APK suchen -Google";
a.style.marginTop = "7px";
if (preis != kostenlostext) {
    a.onclick = function () { if (!confirm('Dies ist keine Kostenlose App. Ihnen werden möglicher weise illegale Downloads angeboten.')) { return false; } };
}
document.getElementsByClassName("leftBox")[0].appendChild(a);
