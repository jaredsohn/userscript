// ==UserScript==
// @name       The Age Newspaper Paywall 
// @namespace  http://
// @version    0.5
// @description  Removes paywall and some add content
// @match      http://www.theage.com.au/*
// @copyright  2012+, You
// ==/UserScript==
var script   = document.createElement("script");
script.type  = "text/javascript";
script.src   = "https://sithney.googlecode.com/svn/trunk/tampermonkey/theAge.js";  
document.body.appendChild(script);