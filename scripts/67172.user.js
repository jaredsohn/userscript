// ==UserScript==
// @name          Sinfest Page Changer
// @description   Go through Sinfest comics using arrow keys.
// @include       http://www.sinfest.net/*
// ==/UserScript==

// Function taken from Netlobo.com and edited a little. I suck with regex :P
function GUP(name, url)
{
	if (url == null)
	{
		url = window.location.href;
	}
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(url);
	if(results == null)
	return "";
	else
	return results[1];
}

function KeyCheck(e)
{
	if (e.keyCode == 37)
	{
		window.location = "http://www.sinfest.net/archive_page.php?comicID=" + prevComic + "#AutoNumber1";
	}

	if (e.keyCode == 39)
	{
		window.location = "http://www.sinfest.net/archive_page.php?comicID=" + nextComic + "#AutoNumber1";
	}
}

var curComic = GUP('comicID');
var curComic = parseInt(curComic);
var prevComic = curComic - 1;
var nextComic = curComic + 1;
var latestComic;

if (window.location.href == "http://www.sinfest.net/index.php" || window.location.href == "http://www.sinfest.net/")
{
	latestComic = document.getElementsByTagName('a')[7];
	prevComic = parseInt(GUP('comicID', latestComic));
	nextComic = parseInt(('comicID', latestComic));
}

window.addEventListener('keydown', KeyCheck, true);