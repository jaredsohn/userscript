// ==UserScript==
// EN CONSTRUCTION!
// @name           Skippub
// @namespace      tt
// @description    regroupement de scripts de redirections personels
// @include        http://www.streamiz.com/link.php*
// @include        http://www.streamiz.com/link2.php*
// @include        *.lemondedembr.com/pubs*/pubs*
// ==/UserScript==

if(document.location.href.match(/http:\/\/www\.streamiz\.com\/link[0-9].php*/)){
    var noeud = document.getElementById('megaup').getElementsByTagName("a")[0];
    var evt = document.createEvent("MouseEvent");
    evt.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);

    // Possible danger
    unsafeWindow.linkRedirectSecs = 1;
    noeud.dispatchEvent(evt);
}

if(document.location.href.match(*\.lemondedembr\.com\/pubs*\/pubs*/)){
    var link = document.getElementsByTagName("a")[0];
    location.href = link.href;
}