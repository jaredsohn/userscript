// ==UserScript==
// @name           Ta bort header på mensaforum
// @description    Detta script tar bort headern på mensas forum
// @namespace      http://userscripts.org/users/effata
// @include        http://forum.mensa.se/*
// ==/UserScript==
document.getElementById('logodesc').parentNode.removeChild(document.getElementById('logodesc'));
document.getElementById('menubar').style.marginTop = '10px';
document.getElementById('wrapheader').style.minHeight = '0';
document.title = document.title.replace("Mensa", "O.o");
var icon = document.createElement('link');
icon.type = "image/x-icon";
icon.rel = "shortcut icon";
icon.href = "http://userscripts.org/images/script_icon.png";
document.getElementsByTagName("head")[0].appendChild(icon);
