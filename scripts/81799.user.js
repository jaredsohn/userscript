// ==UserScript==
// @name           IQDB original picture link
// @namespace      http://userscripts.org/scripts/show/81799
// @include        http://danbooru.iqdb.org/*
// @include        http://iqdb.org/*
// @include        http://danbooru.iqdb.hanyuu.net/*
// @include        http://iqdb.hanyuu.net/*
// @description    Links the "Your image" thumbnail in an IQDB image search to the original picture if uploading from a URL.
// @grant          none
// @version        2013.03.29
// ==/UserScript==

//Blank out Source URL field
document.getElementById("url").value = "";

//Add link to "Your image" if the source is a URL
if( /url=/.test(location.search) && (yourImage = document.getElementsByTagName("img")).length > 0 )
{
	yourImage = yourImage[0];
	
	//The "fullimage" attribute is created by my other scripts, so that the URL being searched for can be a thumbnail.
	var link = document.createElement("a");
	link.href = location.href.replace(/.*(url|fullimage)=/g,'');
	yourImage.parentNode.insertBefore( link, yourImage );
	link.appendChild( yourImage );
}
