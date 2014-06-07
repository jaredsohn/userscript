// ==UserScript==
//
//Displayable Name of your script 
// @name           Readability for Flipboard 
//
// brief description
// @description    Open external URLs in flipboard to readability. Requires Userscript loader ipad tweak. 
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://www.sarathonline.com/dyn/userscripts/hello/
//
// Your name, userscript userid link (optional)   
// @author         Me
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http://*
//
// @exclude      http://cdn.flipboard.com
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// ==/UserScript==

javascript:(
(function(){window.baseUrl='//www.readability.com';window.readabilityToken='';var s=document.createElement('script');s.setAttribute('type','text/javascript');s.setAttribute('charset','UTF-8');s.setAttribute('src',baseUrl+'/bookmarklet/read.js');document.documentElement.appendChild(s);})())