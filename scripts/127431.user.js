// ==UserScript==
// @name           	Demonoid Beta Redirect
// @author		spiralout987
// @version		1.1
// @description    	Redirects all Demonoid links to Demonoid Beta.
// @include        	*://demonoid.me/*
// @include        	*://www.demonoid.me/*
// @exclude        	*://beta.demonoid.me/*
// @run-at         	document-start
// ==/UserScript==

location.href=location.href.replace("www.demonoid.me","beta.demonoid.me");
