/*
   Recolor a Page using a simpler scheme
   (c) Patrick Cavit, pcavit@gmail.com
   http://patcavit.com

   Copy, use, modify, spread as you see fit.
   Massive thanks go out to Jesse Ruderman, this code
   is just a quick modification of his bookmarklet at
   http://www.squarefree.com/bookmarklets/zap.html
*/

// ==UserScript==
// @name          Page Recolorization
// @namespace     http://patcavit.com/greasemonkey/
// @description   Changes the colors on web pages to be more simple
// @include       *
// ==/UserScript==

(function()
{
   //To modify your color settings, edit these lines
   var background  	= 'white';
   var text			= 'black';
   var linknormal  	= '#0000EE';
   var linkvisited 	= '#551A8B';

   var newSS;
   var styles = '* { background: ' + background + ' !important; color: ' + text + ' !important } :link, :link * { color: ' + linknormal + ' !important } :visited, :visited * { color: ' + linkvisited + ' !important }';

   newSS = window.document.createElement('link');
   newSS.rel='stylesheet';
   newSS.href='data:text/css,' + escape(styles);

	window.document.getElementsByTagName("head")[0].appendChild(newSS);
})();