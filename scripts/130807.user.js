// ==UserScript==
// @name		youtube logo chenger
// @description	YoutubeのLOGOをケロマスクのTeraTubeにします。URLカスタマイズで各自変更も出来ます。
// @include		http://www.youtube.com/*
// @include		https://www.youtube.com/*
// @version		0.1.1
// @namespace  	http://twitter.com/teraminato
// @author      Teraminato
// ==/UserScript==
(function() {
var image = document.getElementById("logo");
image.src = "https://sites.google.com/a/apap.co4.jp/teraminato/_/rsrc/1334287608925/Home/teratube.png"; 
})();