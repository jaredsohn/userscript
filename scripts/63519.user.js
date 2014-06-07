// ==UserScript==
// @name           eJahan redirect
// @namespace      whatever
// @description    Redirects from ejahan.com/* to www.ejahan.com/*
// @include        http://ejahan.com/*
// ==/UserScript==
location = window.location.href;
if(location.substr(0,10)!=="http://www"){
	window.location.href="http://www."+location.substr(7)
}