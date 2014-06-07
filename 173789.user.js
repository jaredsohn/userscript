// ==UserScript==
// @name       trendcounter no login
// @namespace  http://userscripts.org/users/475731
// @version    1
// @include      http://*.trendcounter.com/*
// @description  this removes the login on trendcounter.com
// @copyright  2013+, Kolpa
// ==/UserScript==

document.getElementsByClassName('ui-dashboard-hero-message-content')[0].style.display ='none';
document.getElementsByClassName('ui-dashboard-hero-message-full-shim')[0].style.display = 'none';
document.getElementsByClassName('ui-dashboard-hero-message-full-fader')[0].style.display = 'none';
document.getElementById('content-wrapper').style.height = '100%';