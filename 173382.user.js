// ==UserScript==
// @name        Hide H and Yaoi images
// @namespace   http://localhost
// @description Hides images on H and Yaoi entries on MAL.
// @include     http://myanimelist.net/manga/*
// @include     http://myanimelist.net/manga.php?id=*
// @include     http://myanimelist.net/anime/*
// @include     http://myanimelist.net/anime.php?id=*
// @version     1
// ==/UserScript==

var geners = $('.dark_text:contains("Genres:")');
if (geners != null && geners !== undefined)
{
	geners = geners.parent();
	var img = $('.borderClass img:first');
	if (geners.text().indexOf("Hentai") >= 0)
	{
		img.replaceWith('<h1 style="color:red">Hentai</h1>');
	}
	if (geners.text().indexOf("Yaoi") >= 0)
	{
		img.replaceWith('<h1 style="color:red">Yaoi</h1>');
	}
}
