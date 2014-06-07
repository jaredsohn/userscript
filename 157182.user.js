// ==UserScript==
// @name           Auto Page Reload on Error & Gateway Problem Fixer
// @description    Refresh on failed page loading & Gateway problems, '502 Bad Gateway','504 Gateway Time-out', 'Problem loading page', '503 Service Temporarily Unavailable', '500 Internal Server Error', 'Error 503 Service Unavailable', '404 Not Found', '504 Gateway Time-out' 
// @author        aireca
// @namespace     http://userscripts.org/scripts/show/112519
// @version       201204130704
// @include        *
// @exclude        http://ddlani.me/*
// ==/UserScript==

(function () 
{
	if (document.title == '502 Bad Gateway' )
	{window.location.reload(true);}
	else if (document.title == '504 Gateway Time-out' )
	{window.location.reload(true);}
	else if (document.title == 'Problem loading page' )
	{window.location.reload(true);}
	else if (document.title == '503 Service Temporarily Unavailable' )
	{window.location.reload(true);}
	else if (document.title == 'Service Unavailable' )
	{window.location.reload(true);}
	else if (document.title == '500 Internal Server Error' )
	{window.location.reload(true);}
	else if (document.title == 'The connection was interrupted' )
	{window.location.reload(true);}
	else if (document.title == 'FastCGI Error' )
	{window.location.reload(true);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'The connection was interrupted')
	{window.location.reload(true);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Service Unavailable')
	{window.location.reload(true);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == 'Error 503 Service Unavailable')
	{window.location.reload(true);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '404 Not Found')
	{window.location.reload(true);}
	else if (document.getElementsByTagName('h1')[0].innerHTML == '504 Gateway Time-out')
	{window.location.reload(true);}
})();
