// ==UserScript==
// @name           Wowhead - Popunder fix & Auto-Expand
// @description    Tired of getting popunders ALL the time, when you click somewhere on Wowhead.com? This fixes it.
// @include        http://*wowhead.com/*
// @run-at         document-end
// @version        1.0.8
// ==/UserScript==

// Fix Wowhead.com's popunders when clicking somewhere on the page
var inject = document.createElement("script");
inject.setAttribute("type", "text/javascript");
inject.appendChild(document.createTextNode("(function($){ setInterval(function(){document.onclick = function(){}; }, 100); $(function(){ $('#header-expandsite').trigger('click'); }); })(jQuery)"));
document.body.appendChild(inject);