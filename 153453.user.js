// ==UserScript==
// @name           Hide Facebook Recommandation
// @namespace      hi
// @description    Hide "Facebook Recommandation" on Clubic
// @include        http://*.clubic.com/*
// ==/UserScript==
if (document.getElementById) { // DOM3 = IE5, NS6
document.getElementById('FacebookRecommendationsBar_8e65a84d5bac7354a59a13af7d265157').style.visibility = 'hidden';
}
else {
if (document.layers) { // Netscape 4
document.ssponsor.visibility = 'hidden';
}
else { // IE 4
document.all.ssponsor.style.visibility = 'hidden';
}
}