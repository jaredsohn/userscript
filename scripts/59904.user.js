// ==UserScript==
// @name           Tokyo Toshokan Search Cleaner
// @include        http://tokyo-tosho.net/*
// @include        http://www.tokyo-tosho.net/*
// @include        http://tokyotosho.se/*
// @include        http://www.tokyotosho.se/*
// @include        http://tokyotosho.info/*
// @include        http://www.tokyotosho.info/*
// @description    Removes certain categories from Tokyo Toshokan's search results.  Modify the script to set the categories.
// @grant          GM_deleteValue
// @version        2014.02.09
// ==/UserScript==

var style = document.createElement("style");
style.textContent = "xx"
//////////////////////////////////////////////////
//	+", tr.category_1"//Anime
//	+", tr.category_2"//Music
//	+", tr.category_3"//Manga
	+", tr.category_4"//Hentai
//	+", tr.category_5"//Other
	+", tr.category_7"//Raws
	+", tr.category_8"//Drama
	+", tr.category_9"//Music Video
	+", tr.category_10"//Non-English
//	+", tr.category_11"//Batch
	+", tr.category_12"//Hentai (Anime)
	+", tr.category_13"//Hentai (Manga)
	+", tr.category_14"//Hentai (Games)
	+", tr.category_15"//JAV
//////////////////////////////////////////////////////////
+" { display:none }";

document.head.appendChild(style);

if( typeof GM_deleteValue != "undefined" )
{
	GM_deleteValue('last_check');
	GM_deleteValue('local_version');
	GM_deleteValue( 'day_delay' );
}
