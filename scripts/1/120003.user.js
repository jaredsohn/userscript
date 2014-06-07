// ==UserScript==
// @name           imdbindirici
// @description    Add links from IMDB movie pages to torrent sites -- easy downloading from IMDB
// @include http://*.imdb.com/title/*
// ==/UserScript==

//
window.addEventListener('DOMContentLoaded', function() {	

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
		
	// Download Links --------------------------
	
	sectionHead("İndirme Bağlantıları:");
	
	searchEngine("KickAssTorrents",
					"http://www.kat.ph/search/%title",
					"http://www.kat.ph/content/images/favicon.ico");
	searchEngine("The Pirate Bay",
					"http://thepiratebay.org/search/%title/0/99/0",
					"http://mycroft.mozdev.org/installos.php/24748/the_piratebay.ico");
	searchEngine("Torrentz",
					"http://www.torrentz.com/search?q=%title",
					"http://www.torrentz.com/favicon.ico");
	searchEngine("IsoHunt",
					"http://isohunt.com/torrents/%title",
					"http://mycroft.mozdev.org/installos.php/14497/isohuntbt.ico");
	horizontalrule();
	
	// Movie Information -----------------------
	sectionHead("Film Bilgileri:");
	
	searchEngine("Beyazperde", // Title
					"http://www.beyazperde.com/hizliarama.asp?keyword=%title&x=0&y=0", // Search URL
					"http://files.myopera.com/metude/files/beyazperde.ico"); // Favicon URL
	searchEngine("Ekşi Sözlük",
					"http://www.eksisozluk.com/show.asp?t=%title",
					"http://static.eksisozluk.com/favicon.ico");
	searchEngine("Google Görseller",
					"http://images.google.com/images?hl=tr&q=%title",
					"http://mycroft.mozdev.org/installos.php/14945/googleNL.ico");
	searchEngine("MyBilet",
					"http://www.mybilet.com/search.php?q=%title",
					"http://www.mybilet.com/favicon.ico");					
	searchEngine("Sinema.com",
					"http://www.sinema.com/Search.aspx?Search=%title",
					"http://sinema.com/Clients/Tikle/images/favicon.ico");
	searchEngine("Sinemalar - Filmler",
					"http://www.sinemalar.com/filmler/%title/",
					"http://www.sinemalar.com/favicon.ico");
	searchEngine("Sinemalar - Diziler",
					"http://www.sinemalar.com/diziler/%title/",
					"http://www.sinemalar.com/favicon.ico");
	searchEngine("Wikipedia Türkçe",
					"http://tr.wikipedia.org/wiki/Özel:Ara?search=%title&go=Ara",
					"http://tr.wikipedia.org/favicon.ico");
	searchEngine("Dailymotion",
					"http://www.youtube.com/results?search_query=%title",
					"http://www.dailymotion.com/images/favicon.ico");
	searchEngine("YouTube",
					"http://www.youtube.com/results?search_query=%title",
					"http://mycroft.mozdev.org/installos.php/13110/youtube.ico");
	searchEngine("Rotten Tomatoes",
					"http://www.rottentomatoes.com/search/full_search.php?search=%title",
					"http://www.rottentomatoes.com/favicon.ico");
	searchEngine("Box Office Mojo",
					"http://www.boxofficemojo.com/search/?q=%title",
					"http://www.boxofficemojo.com/favicon.ico");
	searchEngine("Wikipedia English",
					"http://en.wikipedia.org/wiki/Special:Search?search=%title",
					"http://en.wikipedia.org/favicon.ico");

	
	horizontalrule();

	// Subtitles -------------------------------	
	sectionHead("Altyazılar:");
	
	searchEngine("DivXPlanet",
					"http://divxplanet.com/index.php?page=arama&arama=%title",
					"http://divxplanet.com/favicon.ico");
	searchEngine("Türkçe Altyazı.org",
					"http://www.turkcealtyazi.org/find.php?cat=sub&find=%title",
					"http://www.turkcealtyazi.org/images/favicon.ico");
	searchEngine("All4Divx Türkçe",
					"http://www.all4divx.com/altyazı/%title/Turkish/1",
					"http://files.myopera.com/metude/images/icons/all4divx.ico");
	searchEngine("PodNapisi",
					"http://www.podnapisi.net/en/ppodnapisi/search?tbsl=1&asdp=0&sK=%title&sM=0&sJ=0&sY=&sAKA=1",
					"http://www.podnapisi.net/favicon.ico");
	searchEngine("OpenSubtitles",
					"http://www.opensubtitles.org/tr/search2/sublanguageid-all/moviename-%title",
					"http://static.opensubtitles.org/favicon.ico");
		
	// Buy -------------------------------------
	sectionHead("Satın al:");
	
	searchEngine("Gitti Gidiyor",
					"http://arama.gittigidiyor.com/?aramakelime=%title&aramakategori=",
					"http://www.gittigidiyor.com/favicon.ico");
	searchEngine("Hepsiburada",
					"http://www.hepsiburada.com/liste/search.aspx?sText=%title",
					"http://www.hepsiburada.com/favicon.ico");
	searchEngine("Sahibinden.com",
					"http://www.sahibinden.com/search.php?b%5Bsearch_text%5D=%title",
					"http://www.sahibinden.com/favicon.ico");
	searchEngine("Amazon.com",
					"http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=%title&x=0&y=0",
					"http://www.amazon.com/favicon.ico");
	searchEngine("eBay.com",
					"http://shop.ebay.com/?_from=R40&_trksid=p5197.m570.l1313&_nkw=%title&_sacat=See-All-Categories",
					"http://shop.ebay.nl/favicon.ico");
	horizontalrule();
	
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
		
}, false);	

