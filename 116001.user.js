// ==UserScript==
// @name	Dcdnet Links
// @version	0.6
// @updateURL   http://userscripts.org/scripts/source/115991.meta.js
// @updateURL   http://userscripts.org/scripts/source/116001.meta.js
// @namespace	schreque-uso
// @author	schreque
// @description	Adds search links to dcdnet.ru
// @require	http://userscripts.org/scripts/source/115991.user.js
// @include	http://dcdnet.ru/artists/*
// @include	http://dcdnet.ru/albums/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function()
{
/*

http://dcdnet.ru/artists/*
<h2><span class="inner">ARTIST</span></h2>

http://dcdnet.ru/albums/*

<h2><span class="inner"><span class="inner2">
  <span class="artist"><a href="/artists/XXX/">ARTIST</a></span>
  <span class="album">ALBUM</span>
  <span class="year">YEAR</span>
</span></span></h2>

*/

//	var text = $('h2 .inner .album').text() || $('h2 .inner').text();
	var folder = document.querySelector('h2 .inner');
	var text = (folder.querySelector('.album') || folder).innerHTML;

	var html = GMX.SearchLinkPanel(text, {
		tmplItem: ',\n        <a href="{HREF}">{TEXT}</a>', 
		tmplList: '{LIST}', 

		links: [
			{
				addr:	'http://www.nnm-club.ru/forum/tracker.php?f=-1&nm={SEEK}'
			}, 
			{
				addr:	'http://tapochek.net/tracker.php?max=1&to=1&nm={SEEK}#results'
			}, 
			{
				addr:	'http://tfile.ru/forum/ssearch.php?q={SEEK}'
			}, 
			{
				addr:	'http://musicmp3.spb.ru/search/?Content={SEEK}&category=1'
			}, 

			{
				addr:	'http://www.discogs.com/search?q={SEEK}&btn=&type=all'
			}, 

			{
				addr:	'http://ru.wikipedia.org/w/index.php?title=Служебная%3ASearch&search={SEEK}'
			}, 
			{
				addr:	'http://en.wikipedia.org/w/index.php?title=Special:Search&search={SEEK}'
			}, 
		]
	});

//	$('div.usertext:nth(1) a:last-child').after(html);
	var folder = document.querySelector('div.usertext > a:last-child').parentNode;
	folder.innerHTML = folder.innerHTML.replace(/\s+$/, function($0)
	{
		return html + $0;
	});

}, false);
