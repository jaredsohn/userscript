// ==UserScript==
// @name           IMDb (Dutch) linking
// @namespace      http://userscripts.org/users/68293
// @description    Adds links on IMDb pages to other sites.
// @include        http://*.imdb.com/title/tt*
// @include        http://imdb.com/title/tt*
// @exlude         http://*imdb.com/*/board*

// Update 2013-10-21 Removed isoHunt (RIP); removed ExtraTorrents; added Torrentz, FilmVandaag
// Update 2013-08-06 Torrent Butler link, new moviemeter ico
// update 2010-10-07 several links fixed
// update 2010-09-23 fixed movie2movie icon
// update 2010-04-16 added extratorrent.com; 1337x.org; isohunt.com; demonoid.com
//                   removed mininova.org; film-torrents.nl 
//                   some ads removal
// update 2009-09-24 added YouTube
// update 2009-07-17 added freecovers.net
// update 2009-04-27 added subscene.com for NL subs (opensubtitles.org frequently has server problems) 
//                   added google images (search for movie pics)
//                   fixed filmtotaal.nl search  
// update 2008-11-11 fixed vergelijk.nl search 
//                   added cinema.nl; filmtotaal.nl; movie2movie.nl
// update 2008-10-05 added target blank 
// update 2008-10-03 added subsLink
// ==/UserScript==

// This script is based IMDb External Sites + YouTube by Natty Dreed.
// Modification by Mimimi
// 1 october  2008
// Current version 0.7 


// some ads removal making it cleaner
// removed 2013-10-21
// some ads removal making it cleaner end


nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);

var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

var div = document.createElement("div");
div.className = 'strip toplinks';

div.innerHTML += '<table><tr><td>';

// For TV Series & movie pages
//var nulLink = document.createElement("a");
//nulLink.setAttribute("target","_blank");
//nulLink.href = 'http://userscripts.org/scripts/show/34798';
//nulLink.style.marginLeft = "10px";
//nulLink.title = "IMDb Dutch Linking";
//nulLink.innerHTML = '<b>IMDb Dutch Linking</b>';
//div.appendChild(nulLink);


div.innerHTML += '</td></tr></table>';
div.innerHTML += '<table><tr><td>'

var fvLink = document.createElement("a");
fvLink.setAttribute("target","_blank");
fvLink.href = 'http://www.filmvandaag.nl/zoek/' + title;
fvLink.style.marginLeft = "10px";
fvLink.title = "FilmVandaag.nl";
fvLink.innerHTML = '<img src="http://www.filmvandaag.nl/images/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>FilmVandaag</b>';
div.appendChild(fvLink);

var mmLink = document.createElement("a");
mmLink.setAttribute("target","_blank");
mmLink.href = 'http://www.moviemeter.nl/film/search/' + title;
mmLink.style.marginLeft = "10px";
mmLink.title = "MovieMeter.nl";
mmLink.innerHTML = '<img src="http://www.moviemeter.nl/images/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>MovieMeter</b>';
div.appendChild(mmLink);

var cinLink = document.createElement("a");
cinLink.setAttribute("target","_blank");
cinLink.href = 'http://www.cinema.nl/zoeken/?query=' + title; 
cinLink.style.marginLeft = "10px";
cinLink.title = "Cinema.nl";
cinLink.innerHTML = '<img src="http://www.cinema.nl/images/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Cinema</b>';
div.appendChild(cinLink);

var ft2Link = document.createElement("a");
ft2Link.setAttribute("target","_blank");
ft2Link.href = 'http://www.filmtotaal.nl/search.php?q=' + title; 
ft2Link.style.marginLeft = "10px";
ft2Link.title = "FilmTotaal.nl";
ft2Link.innerHTML = '<img src="http://www.filmtotaal.nl/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>FilmTotaal</b>';
div.appendChild(ft2Link);

var m2mLink = document.createElement("a");
m2mLink.setAttribute("target","_blank");
m2mLink.href = 'http://cinemagazine.nl/?s=' + title; 
m2mLink.style.marginLeft = "10px";
m2mLink.title = "cinemagazine.nl";
m2mLink.innerHTML = '<img src="http://i277.photobucket.com/albums/kk49/all1409/sys/6b8d9b19.gif" align="absmiddle" border="0" vspace="3"> <b>Cinemagazine</b>';
div.appendChild(m2mLink);

var ffLink = document.createElement("a");
ffLink.setAttribute("target","_blank");
ffLink.href = 'http://www.film1.nl/zoek/?cx=009153552854938002534%3Aaf0ze8etbks&cof=FORID%3A9&ie=ISO-8859-1&q=' + title;
ffLink.style.marginLeft = "10px";
ffLink.title = "Film1.nl";
ffLink.innerHTML = '<img src="http://www.film1.nl/images/film1/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Film1</b>';
div.appendChild(ffLink);

div.innerHTML += '</td></tr></table>';
div.innerHTML += '<table><tr><td>'

var mpLink = document.createElement("a");
mpLink.setAttribute("target","_blank");
mpLink.href = 'http://www.marktplaats.nl/z.html?query=' + title+ '&categoryId=1744';
mpLink.style.marginLeft = "10px";
mpLink.title = "DVD/CD Marktplaats.nl";
mpLink.innerHTML = '<img src="http://i277.photobucket.com/albums/kk49/all1409/sys/d92f3128.gif" align="absmiddle" border="0" vspace="3"> <b>Marktplaats</b>';
div.appendChild(mpLink);

var verLink = document.createElement("a");
verLink.setAttribute("target","_blank");
verLink.href = 'http://www.vergelijk.nl/?cat_id=2464&searchwords=' + title;
verLink.style.marginLeft = "10px";
verLink.title = "DVD Vergelijk.nl";
verLink.innerHTML = '<img src="http://www.vergelijk.nl/images/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Vergelijk</b>';
div.appendChild(verLink);

var bolLink = document.createElement("a");
bolLink.setAttribute("target","_blank");
bolLink.href = 'http://www.bol.com/nl/s/dvd/zoekresultaten/Ntt/' + title+ '/sc/dvd_all/Nty/1/suggestedFor/title/N/0/Ne/0/search/true/searchType/qck/index.html';
bolLink.style.marginLeft = "10px";
bolLink.title = "Bol.com - DVD/BR";
bolLink.innerHTML = '<img src="http://www.bol.com/nl/static/images/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>Bol.com</b>';
div.appendChild(bolLink);

var fcLink = document.createElement("a");
fcLink.setAttribute("target","_blank");
fcLink.href = 'http://www.freecovers.net/search.php?search=' + title;
fcLink.style.marginLeft = "10px";
fcLink.title = "FreeCovers";
fcLink.innerHTML = '<img src="http://freecovers.net/favicon.ico" align="absmiddle" border="0" vspace="3"> <b>FreeCovers</b>';
div.appendChild(fcLink);

var giLink = document.createElement("a");
giLink.setAttribute("target","_blank");
giLink.href = 'http://images.google.nl/images?hl=nl&q=' + title;
giLink.style.marginLeft = "10px";
giLink.title = "afbeeldingen Google";
giLink.innerHTML = '<img src="http://www.fabricoffolly.co.uk/images/google_favicon.gif" align="absmiddle" border="0" vspace="3"> <b>Google images</b>';
div.appendChild(giLink);

var ytLink = document.createElement("a");
ytLink.setAttribute("target","_blank");
ytLink.href = 'http://www.youtube.com/results?search_query=' + title;
ytLink.style.marginLeft = "10px";
ytLink.title = "YouTube";
ytLink.innerHTML = '<img src="http://s.ytimg.com/yt/favicon-vflZlzSbU.ico" align="absmiddle" border="0" vspace="3"> <b>YouTube</b>';
div.appendChild(ytLink);

div.innerHTML += '</td></tr></table>';
div.innerHTML += '<table><tr><td>'

var tpbLink = document.createElement("a");
tpbLink.setAttribute("target","_blank");
tpbLink.href = 'http://pirateproxy.net/search/' + title+'/0/99/200'; 
tpbLink.style.marginLeft = "10px";
tpbLink.title = "The Pirate Bay";
tpbLink.innerHTML = '<img src="http://i277.photobucket.com/albums/kk49/all1409/sys/624affa2.png" align="absmiddle" border="0" vspace="3"> <b>The Pirate Bay</b>';
div.appendChild(tpbLink);

var tbutLink = document.createElement("a");
tbutLink.setAttribute("target","_blank");
tbutLink.href = 'http://torrentbutler.eu/search/' + title+' #better-than:0%'; 
tbutLink.style.marginLeft = "10px";
tbutLink.title = "TorrentButler";
tbutLink.innerHTML = '<img src="http://favicon.domainsigma.com/torrentbutler.eu.ico" align="absmiddle" border="0" vspace="3"> <b>Torrent Butler</b>';
div.appendChild(tbutLink);

var torzLink = document.createElement("a");
torzLink.setAttribute("target","_blank");
torzLink.href = 'http://torrentz.eu/search?f=' + title; 
torzLink.style.marginLeft = "10px";
torzLink.title = "torrentz.eu";
torzLink.innerHTML = '<img src="http://www.isdown.in/web_images/favicon/t/torrentz.eu.ico" align="absmiddle" border="0" vspace="3"> <b>Torrentz</b>';
div.appendChild(torzLink);

//var demonoidLink = document.createElement("a");
//demonoidLink.setAttribute("target","_blank");
//demonoidLink.href = 'http://www.demonoid.me/files/?category=1&subcategory=All&quality=All&//seeded=0&external=2&query=' + title + '&uid=0&sort='; 
//demonoidLink.style.marginLeft = "10px";
//demonoidLink.title = "Demonoid";
//demonoidLink.innerHTML = '<img src="http://www.demonoid.me/favicon.ico" align="absmiddle" //border="0" vspace="3"> <b>Demonoid</b>';
//div.appendChild(demonoidLink);

var subs1Link = document.createElement("a");
subs1Link.setAttribute("target","_blank");
subs1Link.href = 'http://subscene.com/filmsearch.aspx?q=' + title;
subs1Link.style.marginLeft = "10px";
subs1Link.title = "SubScene.com";
subs1Link.innerHTML = '<img src="http://i277.photobucket.com/albums/kk49/all1409/sys/e02ea99b.gif" align="absmiddle" border="0" vspace="3" > <b>SubScene</b>';
div.appendChild(subs1Link);

var subsLink = document.createElement("a");
subsLink.setAttribute("target","_blank");
subsLink.href = 'http://www.opensubtitles.org/nl/sublanguageid-dut/moviename-' + title;
subsLink.style.marginLeft = "10px";
subsLink.title = "Opensubtitles.org";
subsLink.innerHTML = '<img src="http://cdn.static.opensubtitles.org/favicon.ico" align="absmiddle" border="0" vspace="3"  > <b>Opensubtitles</b>';
div.appendChild(subsLink);

div.innerHTML += '</td></tr></table>';

namePos.parentNode.insertBefore(div, namePos.nextSibling);
