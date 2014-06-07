// ==UserScript==
// @name           ALIR
// @namespace      http://www.alushinrio.com/
// @description    Does things to ALIR
// @include        http://www.alushinrio.com/*
// @include        http://alushinrio.com/*
// ==/UserScript==

GM_addStyle('#wholepage { width: auto !important;} #reader { overflow: visible !important; height: auto !important; clear: both !important; } #content, #contentarticle { width: auto !important; float: none !important; clear: both !important; border: 0 !important; margin-left: 10% !important; margin-right: 10% !important;} #footer{padding-bottom: 50px !important; margin-left: 15px !important;}');

header = document.getElementById("header");
if(header)
{
	hih = header.innerHTML;
	header.innerHTML = '<a href="/">Index</a> <a href="/journal.php">Journal</a> <a href="/radio.php">Radio</a> <a href="/olio.php">Olio</a> <a href="/lore.php">Lore</a>' + hih;
}
else
{
	cnode = document.getElementById("content");
	if(!cnode)
	{
		cnode = document.getElementById("contentarticle");
	}
	header = document.createElement('div');
	header.id = 'header';
	cnode.insertBefore(header, cnode.firstChild);
	header.innerHTML = '<a href="/">Index</a> <a href="/journal.php">Journal</a> <a href="/radio.php">Radio</a> <a href="/olio.php">Olio</a> <a href="/lore.php">Lore</a>';
}

footer = document.getElementById("footer");
if(footer)
{
	fih = footer.innerHTML;
	footer.innerHTML = '<div style="text-align: center;"><a href="/">Index</a> <a href="/journal.php">Journal</a> <a href="/radio.php">Radio</a> <a href="/olio.php">Olio</a> <a href="/lore.php">Lore</a></div>' + fih;
}
else
{
	
}

navbar = document.getElementById("navbar");
if(!navbar)
{
	navbar = document.getElementById("navbarsmall");
}

navbar.parentNode.removeChild(navbar);