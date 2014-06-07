// This is a Greasemonkey user script.
// ==UserScript==
// @name           pbtwv0.01
// @namespace      www.tribalwars.com
// @description    testcase
// @include        http://*.tribalwars.*
// @include        https://*.tribalwars.*  
// @version        0.01
// ==/UserScript==

addOnloadHook(function () {
addPortletLink( "p-personal", 
 wgServer + wgScriptPath + "/index.php?title=Template:Admin_dashboard",
 "admin dashboard", "pt-admindashboard", "Link to admin dashboard",
 "A", document.getElementById("pt-logout"));
});
 
addOnloadHook(function () {
addPortletLink( "p-personal", 
 wgServer + wgScriptPath + "/index.php?title=Special:Log/newusers",
 "new users", "pt-newusers", "Link to user creation log",
 "j", document.getElementById("pt-admindashboard"));
});
 
addOnloadHook(function () {
addPortletLink( "p-personal", 
 wgServer + wgScriptPath + "/index.php?title=Special:NewPages",
 "new pages", "pt-newpages", "Link to newpage list",
 "z", document.getElementById("pt-newusers"));
});
 
addOnloadHook(function () {
addPortletLink( "p-personal", 
 wgServer + wgScriptPath + "/index.php?title=WP:CSD",
 "csd", "pt-csd", "Link to newpage list",
 "9", document.getElementById("pt-newpages"));
});
 
addOnloadHook(function () {
addPortletLink( "p-personal", 
 wgServer + wgScriptPath + "/index.php?title=WP:UAA",
 "uaa", "pt-uaa", "Link to newpage list",
 "o", document.getElementById("pt-csd"));
});
 
addOnloadHook(function () {
addPortletLink( "p-personal", 
 wgServer + wgScriptPath + "/index.php?title=WP:AIV",
 "aiv", "pt-aiv", "Link to newpage list",
 "6", document.getElementById("pt-uaa"));
});