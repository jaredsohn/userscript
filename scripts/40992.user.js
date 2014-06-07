// ==UserScript==
// @name           VG Demo
// @namespace      http://userscripts.org/scripts/show/40992
// @description    Demo only
// @version        22012009
// @license        GNU GPL version 3 or later; http://www.gnu.org/copyleft/gpl.html
// @include        http://www.lefigaro.fr/le-talk/2009/01/09/01021-20090109ARTFIG00561-juge-d-instruction-les-mises-en-garde-de-guigou-.php
// ==/UserScript==


//---------------------------------- 
// History
// Previous version 09092998
//----------------------------------


alert(1);

	function configuration(){

	var node = document.createElement("div");
	node.setAttribute("id", "addedDiv");

	node.innerHTML ="<h1>Test</h1>";
	
	                
	node.innerHTML += "<div id=subsconfig>"+	                 
                 "<img src='http://www.videogenome.net' />"+
                  "</div>";
                  
	var existingobject = document.getElementsByTagName("body");

	existingobject[0].parentNode.insertBefore(node,existingobject[0]);	


