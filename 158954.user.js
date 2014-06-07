// ==UserScript==
// @name       AmateurTV Mod - Chrome
// @namespace  localhost
// @version    0.2
// @description  enter something useful
// @match      http://www.amateur.tv/*
// @copyright  2012+, You
// ==/UserScript==


function remove() {
    document.getElementById('viewerswf').style.width='800px';
    document.getElementById('viewerswf').style.height='800px';
    document.getElementById("mensajes").style.display = "none";
    document.getElementById("chat").style.display = "none";
}

remove();