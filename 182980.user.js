// ==UserScript==
// @name        SunnyBeach
// @namespace   Sunny
// @description Installs SunnyBeach for Sandcastle Builder
// @include     http://castle.chirpingmustard.com/castle.html
// @version     1
// @grant       none
// ==/UserScript==

window.onload = function(){
	if(!Molpy.molpish) Molpy.Wake();
    loadSunnyBeach();
}

function loadSunnyBeach(){
    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', 'http://pastebin.com/raw.php?i=dKFneHu5');
    document.body.appendChild(js);
};