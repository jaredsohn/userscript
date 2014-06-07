// ==UserScript==
// @name           AndroLib Market Linker
// @namespace      Jack in the box
// @include        http://*.androlib.com/*
// @description    Adds a market:// link next to the QR Code on AndroLib websites. Use it with Chrome2Phone !
// ==/UserScript==
var imgs, img;
var qrCodeSrc, marketLink;

var googleCharUrl = "http://chart.apis.google.com/";

imgs = document.getElementsByTagName('img');

var i=0;
do {
	img = imgs[i++];
} while (!(img.getAttribute("src").match("^"+googleCharUrl) == googleCharUrl));

qrCodeSrc = img.getAttribute("src");
marketLink = qrCodeSrc.substring(qrCodeSrc.lastIndexOf("market://"), qrCodeSrc.length);

var newDiv = document.createElement('DIV');
newDiv.setAttribute("style", "vertical-align:center");
newDiv.innerHTML = "<br><img src='https://www.sonyericsson.com/cws/file/1.768562.1269256631/Android_market.png'><a href='" + marketLink + "'>Market Link </a>";

img.parentNode.insertBefore(newDiv,img);