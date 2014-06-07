// ==UserScript==
// @name           westwars map bar en
// @version        0.1.5
// ==/UserScript==
var newScript = document.createElement("script");
newScript.src = "http://jamestodd1994.50webs.com/westwars/scripts/map/westwarsen_en_de.user.js";
newScript.id = "westwarsTondasToolboxScript";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);

var newStyle = document.createElement("link");
newStyle.href = "http://jamestodd1994.50webs.com/westwars/scripts/map/toolbox.css";
newStyle.id = "westwarsTondasToolboxStyle";
newStyle.rel = "stylesheet";
newStyle.type = "text/css";
document.getElementsByTagName("head")[0].appendChild(newStyle);