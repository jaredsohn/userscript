// ==UserScript==
// @name        IMDb.com Enchanter
// @namespace   IMDb.com Enchanter
// @description Enchants IMDb.com, Torrents, similar movies, and much more will come! 
// @author      Robin Steen
// @include     http://*.imdb.com/*
// @include     http://imdb.com/*
// @version     2.4.1
// @updateURL	https://userscripts.org/scripts/source/155945.meta.js
// @downloadURL https://userscripts.org/scripts/source/155945.user.js
// @homepage    https://userscripts.org/scripts/show/155945
// @require	http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

if(imdbid = document.URL.match(/http:\/\/.*\.imdb\.com\/title\/(tt\d*)/));


//TV Series
if (($(".infobar").text().indexOf("TV Series") >= 0) || ($(".infobar").text().indexOf("TV Episode") >= 0) || (document.URL.match(/http:\/\/.*\.imdb\.com\/title\/tt[\d]*\/episodes/))) {
	//Make torrent div
	jQuery(
	"<div id='module_user_options_TorrentZ' class='aux-content-widget-2 TorrentZ' >" + 
		"<h3>Torrents</h3> " + 
		"<div class='torrentMenu' id='torrentMenu'></div>" +
	"</div>"
	).insertBefore("div.aux-content-widget-3.links");
	
	
	//Make search options and set events to them
	/*jQuery("<a href='#SxxExx' id='SxxExxLink'>SxxExx</a>").appendTo("div.aux-content-widget-2.TorrentZ div.torrentMenu");
	//Kanskje sette inn denne en annen plass enn torrentmenu, eventuelt lage en meny med sesons og en dynamisk med episoder?
	
	
	document.getElementById("torrentTableLink1080p").addEventListener('click', function(event) { showonlyone('searchOptions1080p') }, false);
	document.getElementById("torrentTableLink720p").addEventListener('click', function(event) { showonlyone('searchOptions720p') }, false);
	document.getElementById("torrentTableLinkPlain").addEventListener('click', function(event) { showonlyone('searchOptionsPlain') }, false);*/
	
	//Start request for getting the stuff, first we do a request to omdbapi.com
	GM_xmlhttpRequest({
		method: "GET",
		headers: {"Accept": "application/json"},
		url: "http://www.omdbapi.com/?i=" + imdbid[1],
		onload: function(resimdb) {
			var imdbjson = eval("("+resimdb.responseText+")");
			
			//For singel episodes
			if($(".infobar").text().indexOf("TV Episode") >= 0) {
				//var seregex = /Season ([0-9]*), Episode ([0-9]*)/;
				var tvHeader = $(".tv_header").text();
				var se = /Season ([0-9]*), Episode ([0-9]*)/.exec(tvHeader);
				var tvTitle = /([a-zA-Z0-9\- ]*): Season/.exec(tvHeader);
					
				//Get torrents
				GM_xmlhttpRequest({
					method: "GET",
					url: "https://torrentz.eu/verified?f=" + tvTitle[1] + " S" + se[1] + "E" + se[2],
					onload: function(restorrentz) {
						jQuery(
							"<div id='S" + se[1] + "E" + se[2] + "' class='searchOptions' style='display: block;'>" +
								"<table border='0' id='S" + se[1] + "E" + se[2] + "Table'></table>" + 
							"</div>"
						).appendTo("#module_user_options_TorrentZ");
					
						var torrent = /<a href="\/([0-9a-f]{40})">([a-zA-Z0-9:<>\/ ]+)<\/a>[&#0-9;:a-zA-Z <>=\\\/"\-,]*<span class="s">([0-9]+ [a-zA-Z]{1,2})<\/span> <span class="u">([0-9]+)<\/span><span class="d">([0-9]+)<\/span>/g;
						var stripTags = /<\/?[a-z]>/g;
						var matches;
						if(torrent.exec(restorrentz.responseText) == null) {
							jQuery(
								"<tr><th colspan='4'>No results. Try another search option!</th></tr>"
							).appendTo("#module_user_options_TorrentZ #S" + se[1] + "E" + se[2] + "");
						}
						for ( var i = 0; i < 10 && (matches = torrent.exec(restorrentz.responseText)) !== null; i++ ) {
							matches[2] = matches[2].replace(stripTags, '');
							
							jQuery(
								"<tr><th colspan='4'>" + matches[2] + "</th></tr>" +
								
								"<tr><td> Size </td><td> Seeds </td>" + 
								"<td> Peers </td><td> Download </td></tr>" +
					
								"<tr><td>" + matches[3] + "</td><td>" + matches[4] + "</td>" +
								"<td>" + matches[5] + "</td><td><a href='magnet:?xt=urn:btih:" + matches[1] + "&tr=http://genesis.1337x.org:1337/announce&tr=http://nemesis.1337x.org:80/announce&tr=http://inferno.demonoid.com:3407/announce&tr=http://exodus.desync.com:6969/announce&tr=http://tracker.ilibr.org:6969/announce&tr=http://tracker2.istole.it:6969/announce&tr=http://tracker.istole.it:80/announce&tr=http://tracker.openbittorrent.com:80/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=http://tracker.prq.to/announce&tr=http://tracker.publicbt.com:80/announce&tr=udp://tracker.publicbt.com:80/announce&tr=http://9.rarbg.com:2710/announce&tr=http://bt1.the9.com:6969/announce&tr=http://tracker.torrent.to:2710/announce'>Magnet</a></td></tr>" + 
					
								"<tr><td colspan='4'>&nbsp;</td></tr>"
							).appendTo("#module_user_options_TorrentZ #S" + se[1] + "E" + se[2] + "Table");
							
						}
						
					}
				});
			}
			
			//For whole tv serie
			if($(".infobar").text().indexOf("TV Series") >= 0) {
				//Get torrents
				GM_xmlhttpRequest({
					method: "GET",
					url: "https://torrentz.eu/verified?f=" + imdbjson.Title,
					onload: function(restorrentz) {
						jQuery(
							"<div id='Series' class='searchOptions' style='display: block;'>" +
								"<table border='0' id='SeriesTable'></table>" + 
							"</div>"
						).appendTo("#module_user_options_TorrentZ");
					
						var torrent = /<a href="\/([0-9a-f]{40})">([a-zA-Z0-9:<>\/ ]+)<\/a>[&#0-9;:a-zA-Z <>=\\\/"\-,]*<span class="s">([0-9]+ [a-zA-Z]{1,2})<\/span> <span class="u">([0-9]+)<\/span><span class="d">([0-9]+)<\/span>/g;
						var stripTags = /<\/?[a-z]>/g;
						var matches;
						if(torrent.exec(restorrentz.responseText) == null) {
							jQuery(
								"<tr><th colspan='4'>No results. Try another search option!</th></tr>"
							).appendTo("#module_user_options_TorrentZ #Series");
						}
						for ( var i = 0; i < 10 && (matches = torrent.exec(restorrentz.responseText)) !== null; i++ ) {
							matches[2] = matches[2].replace(stripTags, '');
							
							jQuery(
								"<tr><th colspan='4'>" + matches[2] + "</th></tr>" +
								
								"<tr><td> Size </td><td> Seeds </td>" + 
								"<td> Peers </td><td> Download </td></tr>" +
					
								"<tr><td>" + matches[3] + "</td><td>" + matches[4] + "</td>" +
								"<td>" + matches[5] + "</td><td><a href='magnet:?xt=urn:btih:" + matches[1] + "&tr=http://genesis.1337x.org:1337/announce&tr=http://nemesis.1337x.org:80/announce&tr=http://inferno.demonoid.com:3407/announce&tr=http://exodus.desync.com:6969/announce&tr=http://tracker.ilibr.org:6969/announce&tr=http://tracker2.istole.it:6969/announce&tr=http://tracker.istole.it:80/announce&tr=http://tracker.openbittorrent.com:80/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=http://tracker.prq.to/announce&tr=http://tracker.publicbt.com:80/announce&tr=udp://tracker.publicbt.com:80/announce&tr=http://9.rarbg.com:2710/announce&tr=http://bt1.the9.com:6969/announce&tr=http://tracker.torrent.to:2710/announce'>Magnet</a></td></tr>" + 
					
								"<tr><td colspan='4'>&nbsp;</td></tr>"
							).appendTo("#module_user_options_TorrentZ #SeriesTable");
							
						}
						
					}
				});
			}
			
			//For episode list
			if(document.URL.match(/http:\/\/.*\.imdb\.com\/title\/tt[\d]*\/episodes/)) {
				var sNum = /([0-9]+)/.exec($("#episode_top").text());
				
				if(sNum[1].length == 1) var sNum = "0"+sNum[1];
				else var sNum = sNum[1];
				//alert(sNum);
				
				//Get torrents
				GM_xmlhttpRequest({
					method: "GET",
					url: "https://torrentz.eu/verified?f=" + imdbjson.Title + " S" + sNum + "E",
					onload: function(restorrentz) {
						jQuery(
							"<div id='S" + sNum + "E' class='searchOptions' style='display: block;'>" +
								"<table border='0' id='S" + sNum + "ETable'></table>" + 
							"</div>"
						).appendTo("#module_user_options_TorrentZ");
					
						var torrent = /<a href="\/([0-9a-f]{40})">([a-zA-Z0-9:<>\/ ]+)<\/a>[&#0-9;:a-zA-Z <>=\\\/"\-,]*<span class="s">([0-9]+ [a-zA-Z]{1,2})<\/span> <span class="u">([0-9]+)<\/span><span class="d">([0-9]+)<\/span>/g;
						var stripTags = /<\/?[a-z]>/g;
						var matches;
						if(torrent.exec(restorrentz.responseText) == null) {
							jQuery(
								"<tr><th colspan='4'>No results. Try another search option!</th></tr>"
							).appendTo("#module_user_options_TorrentZ #S" + sNum + "E");
						}
						for ( var i = 0; i < 10 && (matches = torrent.exec(restorrentz.responseText)) !== null; i++ ) {
							matches[2] = matches[2].replace(stripTags, '');
							
							jQuery(
								"<tr><th colspan='4'>" + matches[2] + "</th></tr>" +
								
								"<tr><td> Size </td><td> Seeds </td>" + 
								"<td> Peers </td><td> Download </td></tr>" +
					
								"<tr><td>" + matches[3] + "</td><td>" + matches[4] + "</td>" +
								"<td>" + matches[5] + "</td><td><a href='magnet:?xt=urn:btih:" + matches[1] + "&tr=http://genesis.1337x.org:1337/announce&tr=http://nemesis.1337x.org:80/announce&tr=http://inferno.demonoid.com:3407/announce&tr=http://exodus.desync.com:6969/announce&tr=http://tracker.ilibr.org:6969/announce&tr=http://tracker2.istole.it:6969/announce&tr=http://tracker.istole.it:80/announce&tr=http://tracker.openbittorrent.com:80/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=http://tracker.prq.to/announce&tr=http://tracker.publicbt.com:80/announce&tr=udp://tracker.publicbt.com:80/announce&tr=http://9.rarbg.com:2710/announce&tr=http://bt1.the9.com:6969/announce&tr=http://tracker.torrent.to:2710/announce'>Magnet</a></td></tr>" + 
					
								"<tr><td colspan='4'>&nbsp;</td></tr>"
							).appendTo("#module_user_options_TorrentZ #S" + sNum + "ETable");
							
						}
						
					}
				});
			}
		}
	});
}

//Movies
else if(document.URL.match(/http:\/\/.*\.imdb\.com\/title\/tt[\d]*\//)) {
	//Make torrent div
	jQuery(
	"<div id='module_user_options_TorrentZ' class='aux-content-widget-2 TorrentZ' >" + 
		"<h3>Torrents</h3> " + 
		"<div class='torrentMenu' id='torrentMenu'></div>" +
		"<div id='searchOptions1080p' class='searchOptions' style='display: block;'>" +
			"<table border='0' id='torrentTable1080p'></table>" + 
		"</div>" + 
		"<div id='searchOptions720p' class='searchOptions' style='display: none;'>" + 
			"<table border='0' id='torrentTable720p'></table>" + 
		"</div>" +
		"<div id='searchOptionsPlain' class='searchOptions' style='display: none;'>" + 
			"<table border='0' id='torrentTablePlain'></table>" + 
		"</div>"+ 
	"</div>"
	).insertBefore("div.aux-content-widget-3.links");
	
	//Make similar movies div
	jQuery(
	"<div id='module_user_options_Similar' class='aux-content-widget-2 Similar'>" +
		"<h3>Similar movies</h3>" +
		"<table border='0' id='similarTable'></table>" +
	"</div>"
	).insertBefore("div.aux-content-widget-2.TorrentZ");
	
	//Make search options and set events to them
	jQuery("<a href='#module_user_options_TorrentZ' id='torrentTableLink1080p'>1080p</a> - <a href='#module_user_options_TorrentZ' id='torrentTableLink720p'>720p</a> - <a href='#module_user_options_TorrentZ' id='torrentTableLinkPlain'>Plain</a>").appendTo("div.aux-content-widget-2.TorrentZ div.torrentMenu");
	
	document.getElementById("torrentTableLink1080p").addEventListener('click', function(event) { showonlyone('searchOptions1080p') }, false);
	document.getElementById("torrentTableLink720p").addEventListener('click', function(event) { showonlyone('searchOptions720p') }, false);
	document.getElementById("torrentTableLinkPlain").addEventListener('click', function(event) { showonlyone('searchOptionsPlain') }, false);
	
	
	//Start request for getting the stuff, first we do a request to omdbapi.com
	GM_xmlhttpRequest({
		method: "GET",
		headers: {"Accept": "application/json"},
		url: "http://www.omdbapi.com/?i=" + imdbid[1],
		onload: function(resimdb) {
			var imdbjson = eval("("+resimdb.responseText+")");
	
			// Torrents 1080p
			GM_xmlhttpRequest({
				method: "GET",
				url: "https://torrentz.eu/verified?f=" + imdbjson.Title + " 1080p",
				onload: function(restorrentz) {
					var torrent = /<a href="\/([0-9a-f]{40})">([a-zA-Z0-9:<>\/ ]+)<\/a>[&#0-9;:a-zA-Z <>=\\\/"\-,]*<span class="s">([0-9]+ [a-zA-Z]{1,2})<\/span> <span class="u">([0-9]+)<\/span><span class="d">([0-9]+)<\/span>/g;
					var stripTags = /<\/?[a-z]>/g;
					var matches;
					if(torrent.exec(restorrentz.responseText) == null) {
						jQuery(
							"<tr><th colspan='4'>No results. Try another search option!</th></tr>"
						).appendTo("#module_user_options_TorrentZ #torrentTable1080p");
					}
					for ( var i = 0; i < 10 && (matches = torrent.exec(restorrentz.responseText)) !== null; i++ ) {
						matches[2] = matches[2].replace(stripTags, '');
						
						jQuery(
							"<tr><th colspan='4'>" + matches[2] + "</th></tr>" +
							
							"<tr><td> Size </td><td> Seeds </td>" + 
							"<td> Peers </td><td> Download </td></tr>" +
				
							"<tr><td>" + matches[3] + "</td><td>" + matches[4] + "</td>" +
							"<td>" + matches[5] + "</td><td><a href='magnet:?xt=urn:btih:" + matches[1] + "&tr=http://genesis.1337x.org:1337/announce&tr=http://nemesis.1337x.org:80/announce&tr=http://inferno.demonoid.com:3407/announce&tr=http://exodus.desync.com:6969/announce&tr=http://tracker.ilibr.org:6969/announce&tr=http://tracker2.istole.it:6969/announce&tr=http://tracker.istole.it:80/announce&tr=http://tracker.openbittorrent.com:80/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=http://tracker.prq.to/announce&tr=http://tracker.publicbt.com:80/announce&tr=udp://tracker.publicbt.com:80/announce&tr=http://9.rarbg.com:2710/announce&tr=http://bt1.the9.com:6969/announce&tr=http://tracker.torrent.to:2710/announce'>Magnet</a></td></tr>" + 
				
							"<tr><td colspan='4'>&nbsp;</td></tr>"
						).appendTo("#module_user_options_TorrentZ #torrentTable1080p");
						
					}
					
				}
			});
			
			// Torrents 720p
			GM_xmlhttpRequest({
				method: "GET",
				url: "https://torrentz.eu/verified?f=" + imdbjson.Title + " 720p",
				onload: function(restorrentz) {
					var torrent = /<a href="\/([0-9a-f]{40})">([a-zA-Z0-9:<>\/ ]+)<\/a>[&#0-9;:a-zA-Z <>=\\\/"\-,]*<span class="s">([0-9]+ [a-zA-Z]{1,2})<\/span> <span class="u">([0-9]+)<\/span><span class="d">([0-9]+)<\/span>/g;
					var stripTags = /<\/?[a-z]>/g;
					var matches;
					if(torrent.exec(restorrentz.responseText) == null) {
						jQuery(
							"<tr><th colspan='4'>No results. Try another search option!</th></tr>"
						).appendTo("#module_user_options_TorrentZ #torrentTable720p");
					}
					for ( var i = 0; i < 10 && (matches = torrent.exec(restorrentz.responseText)) !== null; i++ ) {
						matches[2] = matches[2].replace(stripTags, '');
	
						jQuery(
							"<tr><th colspan='4'>" + matches[2] + "</th></tr>" +
							
							"<tr><td> Size </td><td> Seeds </td>" + 
							"<td> Peers </td><td> Download </td></tr>" +
				
							"<tr><td>" + matches[3] + "</td><td>" + matches[4] + "</td>" +
							"<td>" + matches[5] + "</td><td><a href='magnet:?xt=urn:btih:" + matches[1] + "&tr=http://genesis.1337x.org:1337/announce&tr=http://nemesis.1337x.org:80/announce&tr=http://inferno.demonoid.com:3407/announce&tr=http://exodus.desync.com:6969/announce&tr=http://tracker.ilibr.org:6969/announce&tr=http://tracker2.istole.it:6969/announce&tr=http://tracker.istole.it:80/announce&tr=http://tracker.openbittorrent.com:80/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=http://tracker.prq.to/announce&tr=http://tracker.publicbt.com:80/announce&tr=udp://tracker.publicbt.com:80/announce&tr=http://9.rarbg.com:2710/announce&tr=http://bt1.the9.com:6969/announce&tr=http://tracker.torrent.to:2710/announce'>Magnet</a></td></tr>" + 
				
							"<tr><td colspan='4'>&nbsp;</td></tr>"
						).appendTo("#module_user_options_TorrentZ #torrentTable720p");
						
					}
					
				}
			});
			
			// Torrents Plain
			GM_xmlhttpRequest({
				method: "GET",
				url: "https://torrentz.eu/verified?f=" + imdbjson.Title,
				onload: function(restorrentz) {
					var torrent = /<a href="\/([0-9a-f]{40})">([a-zA-Z0-9:<>\/ ]+)<\/a>[&#0-9;:a-zA-Z <>=\\\/"\-,]*<span class="s">([0-9]+ [a-zA-Z]{1,2})<\/span> <span class="u">([0-9]+)<\/span><span class="d">([0-9]+)<\/span>/g;
					var stripTags = /<\/?[a-z]>/g;
					var matches;
					if(torrent.exec(restorrentz.responseText) == null) {
						jQuery(
							"<tr><th colspan='4'>No results. Try another search option!</th></tr>"
						).appendTo("#module_user_options_TorrentZ #torrentTablePlain");
					}
					for ( var i = 0; i < 10 && (matches = torrent.exec(restorrentz.responseText)) !== null; i++ ) {
						matches[2] = matches[2].replace(stripTags, '');
	
						jQuery(
							"<tr><th colspan='4'>" + matches[2] + "</th></tr>" +
							
							"<tr><td> Size </td><td> Seeds </td>" + 
							"<td> Peers </td><td> Download </td></tr>" +
				
							"<tr><td>" + matches[3] + "</td><td>" + matches[4] + "</td>" +
							"<td>" + matches[5] + "</td><td><a href='magnet:?xt=urn:btih:" + matches[1] + "&tr=http://genesis.1337x.org:1337/announce&tr=http://nemesis.1337x.org:80/announce&tr=http://inferno.demonoid.com:3407/announce&tr=http://exodus.desync.com:6969/announce&tr=http://tracker.ilibr.org:6969/announce&tr=http://tracker2.istole.it:6969/announce&tr=http://tracker.istole.it:80/announce&tr=http://tracker.openbittorrent.com:80/announce&tr=udp://tracker.openbittorrent.com:80/announce&tr=http://tracker.prq.to/announce&tr=http://tracker.publicbt.com:80/announce&tr=udp://tracker.publicbt.com:80/announce&tr=http://9.rarbg.com:2710/announce&tr=http://bt1.the9.com:6969/announce&tr=http://tracker.torrent.to:2710/announce'>Magnet</a></td></tr>" + 
				
							"<tr><td colspan='4'>&nbsp;</td></tr>"
						).appendTo("#module_user_options_TorrentZ #torrentTablePlain");
						
					}
					
				}
			});
			
			//Similar movies
			var linktitle;
			linktitle = imdbjson.Title.replace(/ /g, "+");
			linktitle = linktitle.replace(/:/g, "%3A");
	
			GM_xmlhttpRequest({
				method: "GET",
				url: "http://www.tastekid.com/like/" +  linktitle + "/movies",
				onload: function(ressimilar) {
					var similars = /<a  id="r_[0-9]+" class="rsrc" data-name="[a-zA-Z0-9:\-.,+ ]+" data-type="m" href="http:\/\/www\.tastekid\.com\/like\/[a-zA-Z0-90:\-.,+%]+"><span>([a-zA-Z0-9:\-.,+ ]+)<\/span><\/a>/g;
					var matches;
					for ( var i = 0; i < 9 && (matches = similars.exec(ressimilar.responseText)) !== null; i++ ) {
						if (i==0) continue;
						GM_xmlhttpRequest({
							method: "GET",
							headers: {"Accept": "application/json"},
							url: "http://www.omdbapi.com/?t=" + matches[1],
							onload: function(resimdb2) {
								var imdbjson2 = eval("("+resimdb2.responseText+")");
								if(imdbjson2.Poster !== "N/A") {
									jQuery("<a href='http://imdb.com/title/" + imdbjson2.imdbID + "'><img src='" + imdbjson2.Poster.replace("SX300", "SX67_CR0,0,67,98_") + "' alt='" + imdbjson2.Title + "' title='" + imdbjson2.Title + "' </a>").appendTo("div.aux-content-widget-2.Similar #similarTable");
								}
							}
						});
					}			
				}
			});
		}
	});
}

//Function for only show one search option and for changing
function showonlyone(thechosenone) {
     $('.searchOptions').each(function(index) {
          if ($(this).attr("id") == thechosenone) {
               $(this).show();
          }
          else {
               $(this).hide();
          }
     });
}
