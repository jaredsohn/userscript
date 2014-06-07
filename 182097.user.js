// ==UserScript==
// @name       Reddit Comment Context
// @namespace  http://mattman00000.com
// @version    0.2
// @description  automatic display of context on comment links
// @match      http://*.reddit.com/r/*/comments/*
// @copyright  2013+, mattman00000
// ==/UserScript==

    console.warn("Activating Reddit Contextor");
    if (window.location.href.substring(window.location.href.lastIndexOf("/")+1)!=""&&window.location.href.indexOf("?context=30")==-1) window.location.assign( window.location.protocol + "//" + window.location.host + window.location.pathname + "?context=30" );
