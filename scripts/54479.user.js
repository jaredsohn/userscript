// ==UserScript==
// @name          heise.de Navi
// @include       http://www.heise.de/*
// @include       https://www.heise.de/*
// @include       http://heise.de/*
// @include       https://heise.de/*
// @description	  Durch dieses Script bleibt das Menue beim runterscrollen sichtbar
// @version	  0.99
// @author        Christian Aysner
// @homepage      http://aysner.at/stuff/heisenavi
// ==/UserScript==

var navi = document.getElementById('navi_top');

if (navi) {

    navi.style.position = "fixed";
    navi.style.zIndex = "1000"; //10 wasn't enough
    navi.style.width = "100%";
    navi.style.top = "0px";

    menuplaceholder = document.createElement("div");
    menuplaceholder.style.height = "48px";
    menuplaceholder.style.width  = "100%";
    document.body.insertBefore(menuplaceholder, document.body.firstChild);
} 