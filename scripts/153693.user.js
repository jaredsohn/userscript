// ==UserScript==
// @id             www.youtube.com-34870f4c-d722-4567-be20-27bb531caa6e@scriptish
// @name           YouTube Logo Link to Uploads Feed
// @version        1.1
// @namespace      
// @author         
// @description    
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @run-at         document-end
// ==/UserScript==
var logoLink = document.getElementById("logo-container");
logoLink.setAttribute("href","http://www.youtube.com/feed/subscriptions");