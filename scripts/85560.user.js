// ==UserScript==
// @name           Facebook Page Width
// @namespace      http://userscripts.org/users/127643
// @include        http://www.facebook.com/*
// @author         John Green
// @version        1.0
// @description    Changes Facebook to 100% rather than 981px (for narrow displays)
// ==/UserScript==
//
// 1.0 - 2010/09/06

document.getElementById("globalContainer").style.width = "100%";
