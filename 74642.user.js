// ==UserScript==
// @name           GrooveShark No Ads(Chrome Supported) !
// @namespace      GrooveSharkNoAds
// @description    Removes the ads from Grooveshark
// @include        http://*grooveshark.com/*
// ==/UserScript==
if (document.getElementById("adBar")){
adBar = document.getElementById("adBar")
w1 = adBar.offsetWidth
adBar.parentNode.removeChild(adBar)
gsliteswf = document.getElementById("gsliteswf")
w2 = gsliteswf.offsetWidth
gsliteswf.setAttribute("width", screen.availWidth )
}