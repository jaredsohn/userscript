// ==UserScript==
// @name           PC INpact - Supprimer l'affichage de l'avatar et du login
// @namespace      *
// @description    Supprime l'affichage de l'avatar et du login dans la barre social de PC INpact (v5)
// @include        http://www.pcinpact.com/*
// ==/UserScript==

function addNewStyle(newStyle) {
    var styleElement = document.getElementById('styles_js');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = 'styles_js';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }
    styleElement.appendChild(document.createTextNode(newStyle));
}

var avatar_socialbar = document.getElementById('avatar_socialbar');

var div = avatar_socialbar.getElementsByTagName('div')[0];
var span = div.getElementsByTagName('span')[0];
var a = div.getElementsByTagName('a')[0];

div.removeChild(span);
a.innerHTML = '<span class="logo_socialbar bg_url_sprite-pci"></span>Mon profil';

addNewStyle('#avatar_socialbar span.logo_socialbar {background-position: -81px -120px;}');
addNewStyle('#avatar_socialbar > div > a:hover span.logo_socialbar {background-position: -81px -136px;}');
addNewStyle('#avatar_socialbar > div > a:hover {color: #CF670C !important;}');

div.style.cssText = 'line-height: 24px; padding-left: 4px;';

