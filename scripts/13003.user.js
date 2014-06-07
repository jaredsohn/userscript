// ==UserScript==
// @name Redirect Battlemaster.org URL
// @description Redirect Battlemaster Scribe Notes to Military Tab. Based on Redirect Blogspot.com blogs script @ http://userscripts.org/scripts/show/8057
// @author AJ (http://ramblings.ajaxed.net/)
// @version 0.1
// @date 2007-10-14
// @include http://*
// ==/UserScript==

(function()
{
	var aregexp = /battlemaster\.org\/ShowScribeNote\.php\?(\S*)/;
	var rRegexp = /battlemaster\.org\/(\S+)\/RegionDetails\.php\?ID=-1/;
	if (document.location.href.match(aregexp))
	{
		document.location.href = "http://battlemaster.org/ShowScribeNote.php?"+RegExp.$1+RegExp.$2+"\#military";
	}
	if (document.location.href.match(rRegexp))
	{
		document.location.href = "http://battlemaster.org/stable/RegionDetails.php?ID=-1"+"\#military";
	}
})();



