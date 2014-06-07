// Version 1.0
// Tuesday, February, 29, 2006.
// NewYorker.com Auto-Printer-Friendlyness
// Daniel Teichman
// danielteichman[xATx]gmail[xDOTx]com
//
// Daniel Teichman
// danielteichman[xATx]gmail[xDOTx]com
// ==UserScript==
// @name         NewYorker.com Auto-Printer-Friendlyness
// @description  Automatically views articles in printer-friendly mode.
// @include      http://*.newyorker.com/*/content/*
// @include      http://*.newyorker.com/*/articles/*
// ==/UserScript==
/*
COPYRIGHT NOTICE:
Copyright (C) 2006 and onwards  Daniel Teichman

This script is provided free of charge and may be distributed
free of charge.  This script may only be bundled with other software
that is to be provided free of charge.  If you wish to use this script
for any other use, ask the author.

This script is distributed WITHOUT ANY WARRANTY whatsoever.

If you suddenly find that you computer won't boot or that someone stole
your credit cards, it wasn't my fault.
*/
var links = document.getElementsByTagName("a");
var i;
for (i = links.length - 1; i >=0; i--) {
if (links[i].parentNode.getAttribute("class") == "printablepage")
	document.location = links[i].href;
}

