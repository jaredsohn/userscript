// ==UserScript==
// @name			GWO Help Section Logo Link Fix
// @author			Erik Vold
// @namespace		gwoHelpSectionLogoLinkFix
// @include			http://www.google.com/support/websiteoptimizer/*
// @version			1.0
// @datecreated		2010-01-27
// @lastupdated		2010-01-27
// @description		This userscript will change the link around the Google Website Optimizer logo in the header from pointing at google.com to point at www.google.com/websiteoptimizer
// ==/UserScript==

(function(){
	var logo = document.evaluate("//img[@class='logo']",document,null,9,null).singleNodeValue;
	if(!logo) return;
	var link = logo.parentNode;
	if(link.tagName.toUpperCase()!='A') return;
	link.setAttribute("onclick","");
	link.href="http://www.google.com/websiteoptimizer";
})();