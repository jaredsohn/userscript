// ==UserScript==
// @name           	Jawa Link on every Orkut page

// @description    	Add Jawa link to any Orkut.com page.
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
headerHTMLModified	=	headerHTML + ' | <a href="http://www.orkut.com/Community.aspx?cmm=34373013">Jawa</a> | <a href="http://www.orkuting.au.eu.org">Website</a>';
headerMenu.innerHTML	=	headerHTMLModified;