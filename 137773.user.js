// ==UserScript==
// @name        Spickmich: Meine Schule in der Navigationsleiste
// @namespace   schattenfeuer
// @description Fuegt "Meine Schule" in die seitliche Navigationsleiste ein.
// @include       http://spickmich.de/*
// @include       https://spickmich.de/*
// @include       http://*.spickmich.de/*
// @include       https://*.spickmich.de/*
// @version     1
// ==/UserScript==

document.getElementById("mainmenu").innerHTML='<ul class="box" id="mainmenu"><li><a class="" href="/home">Meine Zentrale</a></li><li><a class="" href="/meine-seite">Meine Seite</a></li><li><a class="" href="/clubs">Meine Clubs</a></li><li><a class="" href="/foto">Meine Fotos</a></li><li><a class="" href="/videos">Meine Videos</a></li><li><a class="" href="/meine-freunde">Meine Freunde</a></li><li><a class="" href="/schule">Meine Schule</a></li><li><a class="" href="/nachrichten">Nachrichten</a></li></ul>';