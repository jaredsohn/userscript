// ==UserScript==
// @name          script I 
// @namespace     PadovaWifi login
// @description   non appena la famigerata prima pagina del login è caricata, redirige immediatamente alla seconda
// @include       http://login.padovawifi.it/?loginurl=*
// ==/UserScript==

document.location="http://10.192.0.1:3990/prelogin"