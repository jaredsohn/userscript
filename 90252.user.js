// ==UserScript==
// @name           Westwars Tondas Toolbox
// @namespace      Westwars Tondas Toolbox
// @description    Some little tools for Westwars. Einige kleine Tools für Westwars.
// @include        http://fb.westwars.com/game/*
// @include        http://fs.westwars.com/game/*
// @include        https://fb.westwars.com/game/*
// @include        https://fs.westwars.com/game/*
// ==/UserScript==


var newScript = document.createElement("script");
newScript.src = "http://marco93.de/westwars/tondas_toolbox.js";
newScript.id = "westwarsTondasToolboxScript";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);

var newStyle = document.createElement("link");
newStyle.href = "http://marco93.de/westwars/tondas_toolbox.css";
newStyle.id = "westwarsTondasToolboxStyle";
newStyle.rel = "stylesheet";
newStyle.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(newStyle);