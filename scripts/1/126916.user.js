// ==UserScript==
// @name           SourLemon
// @namespace      Eli Colner
// @version        1.0.0
// @copyright      Copyright 2012 Eli Colner
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// @description    Change parislemon.com style back to classic green. v1.0.0 2012-02-27
// @include        http*://www.parislemon.com/*
// @include        http*://parislemon.com/*
// ==/UserScript==
// DISCLAIMER:     Use at your own risk. Functionality and harmlessness cannot be guaranteed.

function addNewStyle(newStyle) {
   var styleElement = document.createElement('style');
   styleElement.type = 'text/css';
   styleElement.id = 'styles_js';
   document.getElementsByTagName('head')[0].appendChild(styleElement);
   styleElement.appendChild(document.createTextNode(newStyle));
}

document.body.style.backgroundColor = '#DFE094';
addNewStyle('.type-link .post-title a {background-color:#F5FAF9 !important;}')