// ==UserScript==
// @name           westwars Energypack
// @include        http://apps.facebook.com/westwarsgame/?ref=bookmarks&count=0
// @include        http://apps.facebook.com/westwarsintbeta/?ref=bookmarks&count=0
// @include        http://apps.facebook.com/westwarsgame/*
// @include        http://apps.facebook.com/westwarsintbeta/*
// @include        http://fb.westwars.com/*
// @version        0.0.1
// ==/UserScript==
var newScript = document.createElement("script");
newScript.src = "http://jamestodd1994.50webs.com/westwars/scripts/Energy/ep.user.js";
newScript.id = "westwarsTondasToolboxScript";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);

var newStyle = document.createElement("link");
newStyle.href = "http://jamestodd1994.50webs.com/westwars/scripts/Energy/ep.css";
newStyle.id = "westwarsTondasToolboxStyle";
newStyle.rel = "stylesheet";
newStyle.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(newStyle);