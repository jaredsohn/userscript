// ==UserScript==
// @name        eRepublik "New" remover
// @namespace   erepubliknewremover
// @include     *erepublik.com/*
// @version     1.1
// @author      ZordaN
// @downloadURL	http://userscripts.org/scripts/source/180084.user.js
// @updateURL	http://userscripts.org/scripts/source/180084.meta.js
// ==/UserScript==

function GM_wait(){if(typeof unsafeWindow.jQuery=='undefined'){window.setTimeout(GM_wait,100);}
else{$=unsafeWindow.jQuery;letsJQuery();}}
GM_wait();function letsJQuery(){$("A.notify.newleaderboard EM.fadeInUp").remove();}