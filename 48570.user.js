// ==UserScript==
// @name           BuschFunk-Button
// @namespace      SVZ-Buschfunk-Button
// @include       http://schuelerVZ.net/Start*
// @include       http://*.schuelerVZ.net/Start*
// @include       http://studiVZ.net/Start*
// @include       http://*.studiVZ.net/Start*
// @include       http://meinVZ.net/Start*
// @include       http://*.meinVZ.net/Start*

// ==/UserScript==

var buschfunk = document.getElementById('Mod-Feedbox-Snipplet');
var buttons = document.createElement("div");


function swich() {
var button1 = document.getElementById('1');
if (buschfunk.style.display != 'none') {
buschfunk.style.display = 'none';
button1.childNodes[0].nodeValue='Buschfunk einblenden';
}
else {
buschfunk.style.display = 'block';
button1.childNodes[0].nodeValue='Buschfunk ausblenden';
}
}




if (buschfunk) {
buttons.innerHTML = '<center><div><button id="1" />Buschfunk einblenden</div></center>';
buschfunk.parentNode.insertBefore(buttons, buschfunk);

var button1 = document.getElementById('1');

button1.addEventListener('click', swich, false);
buschfunk.style.display = 'none';
}
