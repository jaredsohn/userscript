// ==UserScript==
// @name          All Sites: Light on Dark
// @description   Changes the colors on web pages to light text on a dark background, particularly usefull when browsing at night 
// ==/UserScript==

(function()
{

   var newSS;
   var styles = '* { background: black ! important; color: lightgrey !important } :link, :link * { color: #0000EE !important } :visited, :visited * { color: #551A8B !important }';
   newSS = window.document.createElement('link');
   newSS.rel='stylesheet';
   newSS.href='data:text/css,' + escape(styles);

	window.document.getElementsByTagName("head")[0].appendChild(newSS);
})();