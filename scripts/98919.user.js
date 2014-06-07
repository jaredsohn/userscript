// ==UserScript==
// @name           Might and Magic: Heroes Kingdoms - Tondas Toolbox
// @namespace      Might and Magic: Heroes Kingdoms - Tondas Toolbox
// @description    Some little tools for Might and Magic: Heroes Kingdoms. Einige kleine Tools für Might and Magic: Heroes Kingdoms.
// @include        http://mightandmagicheroeskingdoms.ubi.com/play
// ==/UserScript==


var newScript = document.createElement("script");
newScript.src = "http://zeldaner.ze.funpic.de/anderes/MMHK/tondas_toolbox.js";
newScript.id = "MMHKTondasToolboxScript";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);

var newStyle = document.createElement("link");
newStyle.href = "http://zeldaner.ze.funpic.de/anderes/MMHK/tondas_toolbox.css";
newStyle.id = "MMHKTondasToolboxStyle";
newStyle.rel = "stylesheet";
newStyle.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(newStyle);