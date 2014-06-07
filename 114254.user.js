// ==UserScript==
// @name        FButt - Barra Superior Mejorada
// @description (29-SEP-2011) Fija la barra superior de facebook y le agrega un efecto de sombra.
// @include     http://facebook.com/*
// @include     http://www.facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://www.facebook.com/*
// @include     https://*.facebook.com/*
// @exclude     http://*.facebook.com/plugins/*
// @exclude     https://*.facebook.com/plugins/*
// @author      Manuel Alejandro Gonzalez
// @version     2.0
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#blueBar {box-shadow: 0px -2px 15px black !important; position: relative;}');

// obliga a usar la fuente Tahoma
addGlobalStyle('body, button.as_link, textarea, .inputtext, .inputpassword, .uiLinkButton input {font-family: tahoma,verdana,arial,sans-serif ! important;}');


if (/class="loggedOut"/i.test (document.body.innerHTML) )
{return;}
else
{
// sombra en la barra superior
addGlobalStyle(
'#blueBar {top: 0px !important;position: fixed !important; z-index:15 !important;} '
//+'.fbx #globalContainer #content { padding-top: 41px ! important; }'
//+'#globalContainer { padding-top: 41px ! important; }'
+'#blueBar { position: fixed !important; z-index: 999;}'
+'.fbx #pageHead {top: 0px ! important; z-index: 99999 !important; width: 981px !important;background: #3B5998;}'
)
;
}

// Facebook Group, Login Page,Chat Sidebar FIXES
addGlobalStyle(
 'div#blueBar.nphLoggedOut {position: relative ! important;}'
+'#blueBar.nph{z-index: 15 !important;}'
+'.loggedOut { z-index: -1 !important; }'
+'#blueBar.nphLoggedOut { position: relative !important; }'
);