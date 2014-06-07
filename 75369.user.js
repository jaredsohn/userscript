// ==UserScript==
// @name           Random xkcd, clientcopia, bash.org generator +others to rule them all 
// @namespace      RXCBAOTRTA
// @description    Random xkcd, clientcopia, bash.org generator +others to rule them all
// @require http://sizzlemctwizzle.com/updater.php?id=75369
// @include        http://*.*
// ==/UserScript==

GM_registerMenuCommand('Cliencopia - Random Link', doLinkC);
GM_registerMenuCommand('xkcd - Random Link', doLinkX);
GM_registerMenuCommand('bash.org - Random Link', doLinkB)

function doLinkC(e)
{
	try
	{
		var rnd = Math.floor(Math.random()*8157);

		var add = "http://www.clientcopia.com/quotes.php?id=" + rnd;

		window.location.href = add;
	}
	catch (ex) 
	{
		alert(ex);
	}
}

function doLinkX(e)
{
	try
	{
		var rnd = Math.floor(Math.random()*1116);

		var add = "http://www.xkcd.com/" + rnd + "/";

		window.location.href = add;
	}
	catch (ex) 
	{
		alert(ex);
	}
}

function doLinkB(e)
{
	window.location.href = "http://bash.org/?random";	
}
