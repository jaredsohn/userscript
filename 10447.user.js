// ==UserScript==
// @name           	HBBG Community
// @description    	Adds link to Handsome Boys & Beautiful Girl community to any Orkut.com page.
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
headerHTMLModified	=	headerHTML + ' | <a href="http://www.orkut.com/Community.aspx?cmm=1507419">HBBG</a>';
headerMenu.innerHTML	=	headerHTMLModified;