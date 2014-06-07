// ==UserScript==
// @name          Reference.com Ad Remover
// @namespace     http://www.reference.com/
// @description   Removes the ad region on reference.com sites, including dictionary and thesaurus
// @include       http://*.reference.com/*
// ==/UserScript==

// YouTube URL: http://www.youtube.com/watch.php?v=[video_id]
// YouTube download link: http://youtube.com/get_video.php?l=165&video_id=[video_id] 

var allAdvertisementDivs = getElementsByTheirClassName("banner ad");
for (var i=0; i<allAdvertisementDivs.length;i++) {
	allAdvertisementDivs[i].style.display = "none";
}
document.getElementById("primary").style.width = "100%";
document.getElementById("primary").style.borderRight = "none";

function getElementsByTheirClassName(clsName) { 	var arr = new Array(); 	var elems = document.getElementsByTagName("*");	for ( var cls, i = 0; ( elem = elems[i] ); i++ )	{		if ( elem.className == clsName )		{			arr[arr.length] = elem;		}	}	return arr;}