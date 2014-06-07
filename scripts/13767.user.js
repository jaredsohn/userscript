// ==UserScript==
// @name           Hide Facebook Ads
// @namespace      hi
// @description    Hide "Facebook Flyer" adverts on Facebook
// @include        http://*.facebook.com/*
// ==/UserScript==
if (document.getElementById) { // DOM3 = IE5, NS6
document.getElementById('ssponsor').style.visibility = 'hidden';
}
else {
if (document.layers) { // Netscape 4
document.ssponsor.visibility = 'hidden';
}
else { // IE 4
document.all.ssponsor.style.visibility = 'hidden';
}
}