// ==UserScript==
// @name       Neues Duggy Logo
// @namespace  http://userscripts.org/users/474816
// @version    1.0
// @description  Ersetzt das 4Ducky logo permanent.
// @include        http://*.4ducky.com/*
// @include        https://*.4ducky.com/*
// @exclude        http://*.4ducky.com/r/*
// @exclude        https://*.4ducky.com/r/*
// @match          http://*.4ducky.com/*
// @match          https://*.4ducky.com/*
// @copyright      2013, Eckbert Kuhno Egon
// ==/UserScript==

addcss("#logo{ background: url(http://i.imm.io/STW0.gif) !important; background-repeat: no-repeat; height: 26px; width: 155px; float: left; margin-left: 15px; margin-right: 10px; margin-top: 8px;}");
addcss("#logo:hover{ }");

function addcss(css){
    var head = document.getElementsByTagName('head')[0];
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    if (styleElement.styleSheet) {   // IE
        styleElement.styleSheet.cssText = css;
    } else {                // the world
        styleElement.appendChild(document.createTextNode(css));
    }
    head.appendChild(styleElement);
 }