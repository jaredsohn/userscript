// ==UserScript==
// @id             shoutwall 
// @name           erepublik shoutwall centered 
// @version        1.0
// @namespace      
// @author         doomg4ster
// @description    
// @include        http://*.erepublik.com/*
// @run-at         document-end
// ==/UserScript==
var s = document.getElementsByClassName("column"); 
 s[0].style.cssFloat = "right";
 s[1].style.cssFloat = "left";