// ==UserScript==
// @name           systemrequirementslab instant results
// @namespace      systemrequirementslab instant results
// @include        http://www.systemrequirementslab.com/CYRI/analysis.aspx
// ==/UserScript==

unsafeWindow.onload = function(){
	document.getElementById("precontent_ad").parentNode.removeChild(document.getElementById("precontent_ad"));
	document.getElementById("content_wrapper").style.display = "block";
}