// ==UserScript==
// @name           	Software Download (Full)(Free) Community
// @description    	Adds link to Software Download (Full)(Free) Community to any Orkut.com page.
// @include      	http://orkut.com/*
// @include        	http://*.orkut.com/*
// @exclude        	http://orkut.com/GLogin.aspx*
// @exclude        	http://*.orkut.com/GLogin.aspx*
// ==/UserScript==

// Variables declared.
var headerHTMLModified;
var headerMenu		=	document.getElementById("headerMenu");
var headerHTML		=	headerMenu.innerHTML;

// Modification of the header with the Scrapbook and Profile links.
headerHTMLModified	=	headerHTML + ' | <a href="http://www.orkut.com/Community.aspx?cmm=20844581">Software Download</a>';
headerMenu.innerHTML	=	headerHTMLModified;