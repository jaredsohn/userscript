// ==UserScript==
// @name           IMDb Links
// @description    IMDb Links extension adds some informative links to movies on IMDb
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// ==/UserScript==

// This script is based IMDb External Sites + YouTube by Natty Dreed.
// Modification by Mimimi
// Adapted to Safari 5 extension by Vidal
// 3 november 2010
// Current version 2.1

// New:
nameEl2 = document.evaluate( '//h1[@class = "header"]', document, null,  window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos2 = document.evaluate( '//div[@id = "maindetails_sidebar_top"]/div', document, null,  window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
// Old:
nameEl = document.evaluate( '//div[@id = "tn15crumbs"]/b', document, null,  window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
namePos = document.evaluate( '//div[@id = "tn15content"]/div', document, null,  window.XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);


var div = document.createElement("div");
if (namePos2 == null) {
  div.className = 'strip toplinks';
  // var title = nameEl.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
} else {
  div.className = 'strip toplinks aux-content-widget-3';
  // var title = nameEl2.innerHTML.replace(/<[^>]+>/g, ''); // strip any HTML
};

var title = document.title;
title = title.match(/^(.*) \(/)[1];

title = title.replace(/(\([^\)]+\))/g, ''); // strip the date
title = title.replace(/^\s+|\s+$/g, ''); // trim

// Cus im stuupid....
title = title.replace('\"', ''); // strip double quotes 1
title = title.replace('\"', ''); // strip double quotes 2

// GROUP Search Engines --------------------------------------------------

// Movie Information -----------------------

sectionHead("Movie Info:");

searchEngine("Rotten Tomatoes", // Title
				"http://www.rottentomatoes.com/search/full_search.php?search=%title", // Search URL
				"http://www.rottentomatoes.com/favicon.ico"); // Favicon URL
searchEngine("Film1",
				"http://www.film1.nl/zoek/?cx=009153552854938002534%3Aaf0ze8etbks&cof=FORID%3A9&ie=ISO-8859-1&q=%title&sa=%A0#918",
				"http://www.film1.nl/images/film1/favicon.ico");
searchEngine("Cinema",
				"http://www.cinema.nl/zoeken/?query=%title",
				"http://mycroft.mozdev.org/updateos.php/id0/cinemanl.ico");
searchEngine("Filmtotaal",
				"http://www.filmtotaal.nl/search.php?q=%title",
				"http://www.filmtotaal.nl/favicon.ico");
searchEngine("MovieMeter",
				"http://www.moviemeter.nl/film/search/%title",
				"http://www.moviemeter.nl/images/favicon_new.gif");
searchEngine("Movie 2 Movie",
				"http://www.movie2movie.nl/index.php?item=263&searchString=%title",
				"http://i50.tinypic.com/2djs22w.gif");
searchEngine("Wikipedia",
				"http://en.wikipedia.org/wiki/Special:Search?search=%title",
				"http://en.wikipedia.org/favicon.ico");
searchEngine("Google Images",
				"http://images.google.com/images?hl=en&q=%title",
				"http://mycroft.mozdev.org/installos.php/14945/googleNL.ico");
searchEngine("Freecovers",
				"http://www.freecovers.net/search.php?search=%title",
				"http://mycroft.mozdev.org/installos.php/18044/freecovers.png");
searchEngine("YouTube",
				"http://www.youtube.com/results?search_query=%title",
				"http://mycroft.mozdev.org/installos.php/13110/youtube.ico");
searchEngine("NetFlix",
				"http://www.netflix.com/Search?v1=%title",
				"http://cdn-0.nflximg.com/us/icons/nficon.ico");
searchEngine("Roger Ebert",
				"http://www.google.com/search?q=site:rogerebert.suntimes.com%20%title&ie=utf-8&oe=utf-8",
				"http://rogerebert.suntimes.com/graphics/global/roger.jpg");

horizontalrule();

// Buy -------------------------------------

sectionHead("Buy:");

searchEngine("Amazon.com",
				"http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=%title&x=0&y=0",
				"http://www.amazon.com/favicon.ico");
searchEngine("Amazon.co.uk",
				"http://www.amazon.co.uk/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=%title&x=0&y=0",
				"http://www.amazon.com/favicon.ico");
searchEngine("Vergelijk",
				"http://www.vergelijk.nl/?cat_id=2464&searchwords=%title",
				"http://www.vergelijk.nl/images/favicon.ico");
searchEngine("Marktplaats",
				"http://kopen.marktplaats.nl/search.php?o=1&ftb=1&searchmode=marktplaats&q=%title&qsf=0&submit1=Zoek",
				"http://mycroft.mozdev.org/update.php/id2/marktplaats.png");
searchEngine("Bol.com",
				"http://www.bol.com/nl/s/algemeen/zoekresultaten/Ntt/%title/Ntk/media_all/Nty/1/N/0/Ne/0/search/true/searchType/qck/index.html?_requestid=68715",
				"http://www.bol.com/nl/static/images/favicon.ico");
searchEngine("eBay.com",
				"http://shop.ebay.com/?_from=R40&_trksid=p5197.m570.l1313&_nkw=%title&_sacat=See-All-Categories",
				"http://shop.ebay.nl/favicon.ico");
searchEngine("eBay.nl",
				"http://shop.ebay.nl/?_from=R40&_trksid=p3907.m570.l1313&_nkw=%title&_sacat=See-All-Categories",
				"http://shop.ebay.nl/favicon.ico");

horizontalrule();

// Download Links --------------------------

sectionHead("Download Links:");

searchEngine("Torrentz",
				"http://www.torrentz.com/search?q=%title",
				"http://www.torrentz.com/favicon.ico");
searchEngine("KickAssTorrents",
				"http://www.kickasstorrents.com/search/%title",
				"http://www.kickasstorrents.com/content/images/favicon.ico");
searchEngine("The Pirate Bay",
				"http://thepiratebay.org/search/%title/0/99/0",
				"http://mycroft.mozdev.org/installos.php/24748/the_piratebay.ico");
searchEngine("IsoHunt",
				"http://isohunt.com/torrents/%title",
				"http://mycroft.mozdev.org/installos.php/14497/isohuntbt.ico");
searchEngine("ExtraTorrent",
				"http://extratorrent.com/search/?search=%title&new=1&x=0&y=0",
				"http://extratorrent.com/images/favicon.ico");
searchEngine("1337x",
				"http://1337x.org/search/%title/0/",
				"http://1337x.org/favicon.ico");
searchEngine("Demonoid",
				"http://www.demonoid.com/files/?category=1&subcategory=All&quality=All&seeded=0&external=2&query=%title&uid=0&sort=",
				"http://www.demonoid.com/favicon.ico");

horizontalrule();

// Subtitles -------------------------------

sectionHead("Subtitles:");

searchEngine("SubScene",
				"http://subscene.com/filmsearch.aspx?q=%title",
				"http://subscene.com/themes/base/images/logoIcon.gif");
searchEngine("OpenSubtitles EN",
				"http://www.opensubtitles.org/nl/sublanguageid-eng/moviename-%title",
				"http://mycroft.mozdev.org/installos.php/25094/opensubtitle_imdb.ico");
searchEngine("OpenSubtitles NL",
				"http://www.opensubtitles.org/nl/sublanguageid-dut/moviename-%title",
				"http://mycroft.mozdev.org/installos.php/25094/opensubtitle_imdb.ico");
searchEngine("Bierdopje",
				"http://www.bierdopje.com/search/shows/%title",
				"http://cdn.bierdopje.eu/favicon.ico");

// horizontalrule();

// Movie Information -----------------------

// sectionHead(":");
//
// searchEngine("",
//                 "%title",
//                 "");
//
// horizontalrule();


// END Search Engines ----------------------------------------------------

function sectionHead(text) {
  var label = document.createElement("h5");
  label.innerHTML = text;
  div.appendChild(label);
}

function horizontalrule() {
  div.appendChild(document.createElement("hr"));
}

function searchEngine(mTitle, searchurl, favicon) {
  var aLink = document.createElement("a");
  aLink.setAttribute("target","_blank");
  aLink.style.textDecoration = 'none';

  aLink.href = getSearchURL(searchurl);
  aLink.title = "Search " + mTitle + " for: " + title;
  aLink.innerHTML = '<img src="' + favicon + '" align="absmiddle" border="0" vspace="3" height="16px"> <u>' + mTitle + '</u>';
  div.appendChild(aLink);
  if (namePos2 != null) {
	aLink.style.marginLeft = "20px";
	div.appendChild(document.createElement("br"));
  } else {
	aLink.setAttribute("style","white-space: pre-wrap; display: inline-block; width: 125px");
	aLink.style.marginLeft = "10px";
  };
};

function getSearchURL(url) {
  url = url.replace(/%title/, encodeURIComponent(title));
  // console.log(url);
  return url;
}

if (namePos2 == null) {
  namePos.parentNode.insertBefore(div, namePos.nextSibling);
} else {
  namePos2.parentNode.insertBefore(div, namePos2.nextSibling);
};