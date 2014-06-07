// ==UserScript==
// @name           Nexus Download Ad Killer
// @namespace      http://userscripts.org/users/161086
// @description    A simple fix for the problems some people have been having with the ads on server selection pages at the Nexus sites. For some people (usually because of adblockers/NoScript) the ads won't be run properly, preventing the user from ever downloading the file. This fixes these issues by killing those ads (and only those ads!), but keep in mind that these sites run off the profits from ads: be a nice person and disable your adblocker if you can. 
// @include        http://newvegasnexus.com/downloads/download.php?id=*
// @include        http://www.newvegasnexus.com/downloads/download.php?id=*
// @include        http://fallout3nexus.com/downloads/download.php?id=*
// @include        http://www.fallout3nexus.com/downloads/download.php?id=*
// @include        http://tesnexus.com/downloads/download.php?id=*
// @include        http://www.tesnexus.com/downloads/download.php?id=*
// @include        http://dragonagenexus.com/downloads/download.php?id=*
// @include        http://www.dragonagenexus.com/downloads/download.php?id=*
// @author         Argomirr
// ==/UserScript==

function killThatAd(){
	unsafeWindow.onMediaEnd(); //Skip the video ad by directly calling the onMediaEnd function
	document.getElementById("precontent_ad") = null; // Just in case, null the ad
}

killThatAd();