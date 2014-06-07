// ==UserScript==
// @name           BitBurner
// @namespace      http://mohag.net
// @description    Adds Burnbit links on abvious mirrors, more sites can manually be added. This allows most HTTP files to be downloaded using BitTorrent. (It currently should match common mirror sites, but other patterns can be added)
// @include        /^http://((www\|[a-z][a-z])\.)?(ftp|releases?|downloads?)\./
// @include        /^http://([^/]+\.)?mirrors?\.[^/]+/
// @include        http://www.ibiblio.org/pub/*
// @include        /^http://[^/]+\.ibiblio\.org//
// @include        http://fedoraproject.org/*get*
// @include        http://www.fedoraproject.org/*get*
// ==/UserScript==


// Desired result
//<a class="burnbit_torrent" burnbit_file="FILE_URL" burnbit_style="BUTTON_STYLE"></a>
//<script src="http://api.burnbit.com/js/button.js" type="text/javascript"></script> 


var style="compact";

var tmplinks;
tmplinks = document.getElementsByTagName("a");

var numlinks = tmplinks.length;

var links = new Array(numlinks);

// Save links to prevent double burning...
for (var i = 0; i < numlinks; i++) {
   links[i] = tmplinks.item(i);
}

for (var i = 0; i < numlinks; i++) {
	var link = links[i];
	var regexp = /^http:\/\/.*\.(iso|exe|gz|bz2|tar|zip|tgz|tbz2|7z|rar|bin|deb|rpm|squashfs|xz|pkg|img|avi|ace|mkv|mp4|m4v|msi|mp3|ogg|ogm|dmg|sit|wav|mov|mds|mpg|mpeg)$/;
	if ( (! regexp.test(link.href)) || link.burned == true) { 
		continue; 
	}

	link.setAttribute('burned',true);


	var burnbitlink = document.createElement("a");
	burnbitlink.setAttribute('class','burnbit_torrent');
	burnbitlink.setAttribute('burnbit_file',link.href);
	burnbitlink.setAttribute('burnbit_style',style);

	var burnbitscript = document.createElement("script");
	burnbitscript.src = "http://api.burnbit.com/js/button.js";
	burnbitscript.type = "text/javascript";
	burnbitscript.setAttribute('async','async');

	link.parentNode.insertBefore(burnbitlink,link);
	link.parentNode.insertBefore(burnbitscript,link);
}
