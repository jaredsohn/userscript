// ==UserScript==
// @name           ubuntuusers.de Icons fuer interne Links
// @namespace      http://flopage.de.hm/
// @description    Fuegt zur Kennzeichnung eines Linkziels ein passendes Icon hinzu
// @include        http://*.ubuntuusers.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){ // wenn Seite geladen
    var img = {
        'wiki' : 'http://wiki.ubuntuusers.de/_image?width=18&target=Wiki%2FIcons%2FPortal%2Fwiki.png',
        'forum' : 'http://wiki.ubuntuusers.de/_image?width=18&target=Wiki%2FIcons%2FPortal%2Fforum.png',
        'ikhaya' : 'http://wiki.ubuntuusers.de/_image?width=18&target=Wiki%2FIcons%2FPortal%2Fikhaya.png',
        'planet' : 'http://wiki.ubuntuusers.de/_image?width=18&target=Wiki%2FIcons%2FPortal%2Fplanet.png'
    };
    // alle internen Links innerhalb des Inhaltsbereichs wählen, die kein Bild enthalten
    for(w in img) {
        $('div.content a[href^="http://'+w+'.ubuntuusers.de"]:not(:has(img)):not(.pageselect):not(.prev):not(.next):not(.action)').before('<img class="image-default" alt="Wiki/Icons/Portal/'+w+'.png" src="'+img[w]+'">');
    }
});
