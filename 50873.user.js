// ==UserScript==
// @name           TurbofilmSpoiler
// @namespace      http://serkys.habrahabr.ru
// @description    Spoilers cutter at turbofilm.ru
// @include        http://*turbofilm.ru/*
// @source         http://serkys.habrahabr.ru
// @version        0.1
// ==/UserScript==

var aElm=document.body.getElementsByTagName('*');
for(var i=0; i<aElm.length; i++) {
    if(aElm[i].className == 'note' || aElm[i].className == 'edesc') {
    	aElm[i].innerHTML = '<a href="#" onclick="this.parentNode.innerHTML = \'' + aElm[i].innerHTML.split("\n").join('') + '\'; return false;">Щёлкните, чтобы просмотреть спойлер</a>';
    }        
}