// Author		Arun Kumar
// Version		1.5 | 20|06|2007

// ==UserScript==
// @name           	Orkut.com Scrapbook and Profile Links
// @namespace      	http://heruka.deviantart.com/
// @description    	Adds link to your Scrapbook and Profile to any Orkut.com page.
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
headerHTMLModified	=	headerHTML + ' | <a href="http://www.orkut.com/Scrapbook.aspx">Scrapbook</a> | <a href="http://www.orkut.com/Profile.aspx">Profile</a>';
headerMenu.innerHTML	=	headerHTMLModified;