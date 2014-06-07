// ==UserScript==
// @name           IMDB Downloads - Racha
// @namespace      IMDB Downloads - Racha
// @description    Search for Torrents of movies from IMDB Zamunda.NET, ThePirateBay, Podnapisi.NET, YouTube(Trailers)
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// ==/UserScript==


function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	regexp = /\(.*\)/g;
	title = title.replace(regexp, "");
	return title;
}
var title = getTitle();

//YouTube
unsafeWindow.$('<a>')
	.attr('href', 'http://www.youtube.com/results?search_query='+ title + ' Trailer')
	.attr('target','_blank')
	.css({ float: 'right', marginRight: '1px', position: 'relative', top: 3 })
	.append('<img src="http://img87.imageshack.us/img87/6546/youtubedg.png" width="24px" hight="24px">')
	.appendTo('div.infobar');
	
//OpenSubtitles
unsafeWindow.$('<a>')
	.attr('href', 'http://www.opensubtitles.org/en/search2/sublanguageid-all/moviename-'+ title)
	.attr('target','_blank')
	.css({ float: 'right', marginRight: '10px', position: 'relative', top: 3 })
	.append('<img src="http://img183.imageshack.us/img183/6804/opensub.png" width="24px" hight="24px">')
	.appendTo('div.infobar');

//Podnapisi
unsafeWindow.$('<a>')
	.attr('href', 'http://www.podnapisi.net/en/ppodnapisi/search?tbsl=1&asdp=0&sK='+ title)
	.attr('target','_blank')
	.css({ float: 'right', marginRight: '10px', position: 'relative', top: 3 })
	.append('<img src="http://img195.imageshack.us/img195/2891/subw.png" width="24px" hight="24px">')
	.appendTo('div.infobar');
	
//btjunkie
unsafeWindow.$('<a>')
	.attr('href', 'http://btjunkie.org/search?q='+ title)
	.attr('target','_blank')
	.css({ float: 'right', marginRight: '10px', position: 'relative', top: 3 })
	.append('<img src="http://img2.imageshack.us/img2/35/btj.png" width="24px" hight="24px">')
	.appendTo('div.infobar');
	
//Zamunda
unsafeWindow.$('<a>')
	.attr('href', 'http://www.zamunda.net/browse.php?search='+ title +'&cat=0&incldead=1')
	.attr('target','_blank')
	.css({ float: 'right', marginRight: '10px', position: 'relative', top: 3 })
	.append('<img src="http://img824.imageshack.us/img824/6462/zamunda.png" width="24px" hight="24px">')
	.appendTo('div.infobar');

//ThePirateBay
unsafeWindow.$('<a>')
	.attr('href', 'http://thepiratebay.org/search/' + title)
	.attr('target','_blank')
	.css({ float: 'right', marginLeft: '10px', marginRight: '10px', position: 'relative', top: 3 })
	.append('<img src="http://img836.imageshack.us/img836/5091/piratex.png" width="24px" hight="24px">')
	.appendTo('div.infobar');