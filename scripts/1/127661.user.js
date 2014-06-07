// ==UserScript==
// @name Download From SoundCloud
// @description A script that allows for downloading any song from SoundCloud
// @include *.soundcloud.com
// @include soundcloud.com/*
// ==/UserScript==

(function(b) {
var a = b.createElement("a");
var s = b.createElement("span");
s.innerText = "Download";
a.appendChild(s);
a.href="http://media.soundcloud.com/stream/"+b.querySelector("#main-content-inner img[class=waveform]").src.match(/\.com\/(.+)\_/)[1];
a.setAttribute("class", "pl-button");
a.setAttribute("style", "background-image: url(http://soundcloud.com/images/icons_mini.png?unicorn26); background-repeat: no-repeat; padding-left: 18px; background-position: -77px -236px;");
a.download = b.querySelector("em").innerText+".mp3";
b.querySelector(".primary").appendChild(a);
})(document);