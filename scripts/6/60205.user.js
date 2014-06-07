// ==UserScript==
// @name           GrooveShark No Ads !
// @namespace      GrooveSharkNoAds
// @description    Removes the ads from groove shark site
// @include        http://*grooveshark.com/*
// ==/UserScript==
var capital = document.getElementById("capital")
capital.parentNode.removeChild(capital)
var application = document.getElementById("application")
application.style.width = "100%"