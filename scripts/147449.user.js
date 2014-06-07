// ==UserScript==
// @name       My Little Reddit Logo
// @namespace  http://userscripts.org/users/465594
// @version    1.3
// @description  Permanently replace the reddit logo with the My Little Reddit Icon!
// @include        http://*.reddit.com/*
// @include        https://*.reddit.com/*
// @exclude        http://*.reddit.com/r/*
// @exclude        https://*.reddit.com/r/*
// @match          http://*.reddit.com/*
// @match          https://*.reddit.com/*
// @copyright  2012, Cloud Chiller
// @updateURL  http://userscripts.org/scripts/source/147449.user.js
// ==/UserScript==

addcss("#header-img{ background: url(http://i.imgur.com/21qu5.png) !important; background-repeat: no-repeat; height: 40px; width: 120px;}");

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