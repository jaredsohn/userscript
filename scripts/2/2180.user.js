/*
    Indicate off-site links using an image
    version 1.3
    Copyright (C) 2005 Gopalarathnam Venkatesan

    This program is free software; you can redistribute it and/or modify it
    under the terms of the GNU General Public License as published by the
    Free Software Foundation; either version 2 of the License, or (at your
    option) any later version. This program is distributed in the hope that it
    will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty
    of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
    Public License for more details.

    Version History
    ---------------------------------------------------------------------------

    1.4		Use XPath

    1.3		Fix a bug in handling sub-domains
    
    1.2		Distinguish links that opens in the same window, and those that
    		open a new window
		Handle sub-domains
		
    1.1		Fix bug in handling protocols
    		Ignore image links
		
    1.0		Initial release
*/

// ==UserScript==
// @name	Indicate off-site Links
// @namespace	http://gopalarathnam.com/software/2180.user.js
// @description	Indicate off-site links using an image
// ==/UserScript==

var protocol = window.location.protocol;
if (protocol.indexOf("http") == -1)
	return;			// do not handle non-web requests

// Image for links that open in the same window
var sameWindowImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00" +
"%00%00%0A%00%00%00%0A%08%03%00%00%00%BA%EC%3F%8F%00%00%00%15PLTEf%99%CC3" +
"%99%CC%99%CC%FF%00f%CC%00f%FF%FF%FF%FF%FF%FF%FFD%EA%08%95%00%00%00%07tRN" +
"S%FF%FF%FF%FF%FF%FF%00%1AK%03F%00%00%008IDAT%18W%25%CBA%12%00%40%04%03A%" +
"22%EB%FFO%DE%C1%1CT%1F%24%9A%BC%05%CAx%B4l%E7%B2%C8%3Ar%F4%94%CB%11%A3%A" +
"1B%AE%CE%9E%07%F9%15%E3!%1D%2F%F8%01Y%EC%01%9B%9B%C45f%00%00%00%00IEND%A" +
"EB%60%82";

// Image for links that open in a different (new) window
var otherWindowImg = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%0" +
"0%00%00%0A%00%00%00%0A%08%06%00%00%00%8D2%CF%BD%00%00%00eIDAT%18%D3u%90K" +
"%16%C0%20%08%03%87%3E%CF%0Ag%C2%CB%A6%8B~D%5B%B3%13%86%104V9%E2G6C.%00e%" +
"CEP%D8%CF%A8%23%DCU%85%A3%B6%5B%B5%EA%B8V%09%A5%86e%26%16%81E%BC%60%9Bs%" +
"0C%08%FA%5D%2F%8E%8F%D3%D5%18%10%FD%3E%B6c%E0%94%D0%AE%E7%FD%CD%5E%C0%F5" +
"%D2%8A%B5%FD%3F%CD%3A%01%3D~R%11q%B0%05%01%00%00%00%00IEND%AEB%60%82";

// Match domain name
var domainRE = /^.*?(\.[^\.]*\.[^\.]*)$/i;

// Host name of the server
var thisHostName = window.location.host;

// Domain name of the server
var thisDomain;
if ((thisDomain = domainRE.exec(thisHostName)) == null)
	thisDomain = "." + thisHostName;
else
	thisDomain = thisDomain[1];

/*
    All the links in this document
    Would converting this to XPath be better/faster?
*/
var links = document.evaluate('//a[@href]', document, null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// Traverse the links in the document and do stuff...
for (var i = 0; i < links.snapshotLength; i++) {
	var link = links.snapshotItem(i);

	// Skip non-HTTP links
	if (link.protocol.indexOf("http") == -1)
		continue;

	// Skip image links
	if (link.hasChildNodes() &&
	    link.firstChild.nodeType == 1)
		continue;

	/*
	    This link is an external one (not even a sub-domain), and this
	    doesn't have some background defined already.
	*/
	var linkDomain = domainRE.exec(link.host);
	if (linkDomain == null)
		linkDomain = "." + link.host;
	else
		linkDomain = linkDomain[1];
	if (linkDomain != thisDomain && link.style.background == "") {
		link.style.background = "url(" +
		    (link.target ? otherWindowImg : sameWindowImg) +
		    ") right center no-repeat";
		link.style.paddingRight = "13px";
	}
}
