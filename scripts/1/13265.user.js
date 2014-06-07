// ==UserScript==
// @name          FogBugz 6 Hide "Add Case" Row
// @namespace     http://atellis.com/ns/userscripts
// @description	  Hides the "Add Case" row from grid view and allows you to view more cases per page
// @include       http://your.fogbugz.com/*
// ==/UserScript==

(function() {
	
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ".newCase { display: none }";
    head.appendChild(style);

})();
