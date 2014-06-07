// ==UserScript==
// @name           [743049] Temporary URL fix
// @namespace      http://www.torn.com/profiles.php?XID=743049
// @description    Fixes the URL problem on the forum until CHED fixes it.
// @include        http://www.torn.com/*
// @version        1.1
// ==/UserScript==

// How the broke URL looks:
// http://www.torn.com/leaving.php?URL=http://http://www.google.com/
//
// How the URL should Look.
// http://www.torn.com/leaving.php?URL=http://www.google.com/
//
// This code looks for "http://http://" and removes it, whilst the start of the URL is "http://www.torn.com/leaving.php?URL="
//
// Simplez.


var URIs=document.getElementsByTagName("a");

for (i=0; i<URIs.length; i++)
{
	if (URIs[i].href.substr(0,36) == "http://www.torn.com/leaving.php?URL=")
	{
		URIs[i].href=URIs[i].href.replace("http://http://", "http://");
		URIs[i].href=URIs[i].href.replace("http://https://", "https://");
		URIs[i].href=URIs[i].href.replace("http://ftp://", "ftp://");
	}
}

// PS: I know that I refer to the URI as a URL... so sush!