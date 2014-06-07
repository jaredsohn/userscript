// ==UserScript==
// @id             63467347567376
// @name           Remove +you from google home page
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://*.google.*
// @run-at         document-end
// ==/UserScript==

var elem = document.getElementById("gb_119");
if (elem == null) 
	return;
elem.parentNode.parentNode.removeChild(elem.parentNode);