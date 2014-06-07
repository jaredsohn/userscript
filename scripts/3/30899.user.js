/*
 *	Author:		Tim Dupree
 *			http://www.tdupree.com
 *			(c) 2008
 *
 *	Date:		June 1, 2007
 *
 *	Summary:	Re-style the ugly red notice at the top of every userscripts script page
 *
 */
 
// ==UserScript==
// @name           Userscripts Notice Re-Style
// @namespace      http://www.tdupree.com
// @description    Re-style the ugly red notice at the top of every userscripts script page
// @include        http://userscripts.org/*
// ==/UserScript==

(function() {
	head = document.getElementsByTagName('head')[0];

	if (head)
	{
	 style = document.createElement('style');
	 style.type = 'text/css';
	 style.innerHTML = 'p.error { background: #FFFFFF; color: #000000;}\n' +
	 			'p.error a { color: #FF0000; }';
	 head.appendChild(style);
	}
})();