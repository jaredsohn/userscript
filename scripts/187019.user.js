// ==UserScript==
// @name       Madcraft Notification Removal Script
// @namespace  http://www.google.com/+AsifMallik
// @version    0.1
// @description  With this userscript you can remove the annoying madcraft notification that urges you to vote for them everytime you visit a new page.
// @match      http://*.madcraftgaming.com/*
// @copyright  2012+, Asif Mallik
// ==/UserScript==
$(".s_popup-canvas-separator, .element_popup").remove();