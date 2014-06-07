// ==UserScript==
// @name       Allow HU Student portal to run in Google chrome, and Firefox
// @namespace  http://www.yousef.co
// @include	http://reg2.hu.edu.jo*
// @include	http://reg1.hu.edu.jo*
// @include	reg1.hu.edu.jo*
// @include	reg2.hu.edu.jo*
// @version    0.1
// @description  IE Sucks!	
// @match      http://*/*
// @copyright  2012+, Yousef Shanti - Hashemite University
// @updateURL       http://userscripts.org/scripts/source/155929.user.js
// @downloadURL     http://userscripts.org/scripts/source/155929.user.js
// ==/UserScript==
document.body.setAttribute('onload','');
document.getElementById('Label2').innerHTML = '<a href="http://www.yousef.co"><img src="http://yousef.co/images/logo-yousef.png"/></a>';