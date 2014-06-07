// Copyright (C) 2007, reedom
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Contributor(s): FUJINAKA Tohru as reedom
//                 
//
// ==UserScript==
// @name           ATPTennis.com Player Career/Bio Page Petit Beautifier
// @namespace      http://www.nakarika.com
// @include        http://www.atptennis.com/5/en/players/playerprofiles/*
// ==/UserScript==

function addGlobalStyle(css) {
   var head, style;
   head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
      style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = css;
   head.appendChild(style);
}

(function() {
   addGlobalStyle('div.paragraphspace { margin: 0.5em 4em 0.2em 0em; line-height: 0.5em; border-top: 1px dotted #aaf; }');

   var divs = document.getElementsByTagName("div");
   for (var i = 0; i < divs.length; ++i) {
      var div = divs[i];
      if (div.id.match('margin')) {
	 div.innerHTML = div.innerHTML.replace(/(…|\.\.\.)/g, ".<br><div class='paragraphspace'></div>");
	 div.innerHTML = div.innerHTML.replace(/~{2,}/g, "");
      }
   }      
})();
 
