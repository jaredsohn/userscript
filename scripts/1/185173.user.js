// ==UserScript==
// @name          Comunio Popup Size and Position
// @namespace     http://www.mwld.de/
// @description   Changes default popup window position to the upper left and default size to 600 x 1000 px
// @version       0.1
// @date          2013-12-01
// @include       http://*.comunio.de/*
// @include       http://comunio.de/*
// @author        Martin Moehwald
// ==/UserScript==

var overwriteScript = 'function openSmallWindow(n,t) {return info_popup=window.open(n,t,"width=600,height=1000,left=0,top=0,scrollbars=yes,resizable=yes,dependent=yes"),info_popup.focus(),!1}';

var script = document.createElement("script");
script.setAttribute('type','text/javascript');
script.text=overwriteScript;
document.body.appendChild(script);