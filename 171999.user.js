// ==UserScript==
// @name          Torrent links for IMDB watch list
// @namespace     http://yankov.us
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @description   A Greasemonkey script that finds torrent links for your IMDB watch list
// @include       http://www.imdb.com/user*
// @author        Hristo Yankov <hristo.yankov@gmail.com> http://yankov.us
// @version       1.9.1
// ==/UserScript==

/* SETTINGS */
var minimumSeeders = 20;
var maxLinksPerTitle = 5;

// Fallback order
var arrTorrents = [ 
	"http://yts.re/rss/{title}/All/All/0" // YIFY
	,"http://kickass.to/usearch/{title} category:movies seeds:{seeds} verified:1/?rss=1"  // Kick ass torrents
	//,"http://isohunt.com/js/rss/{title}?iht=1&noSL" // ISO Hunt is shit full of unverified uploads
];

// Exclude torrents that have those in the title
var blockedWords = [
	"XVIDCAM",
	"CAM",
	"HDCAM",
	"CAMRIP",
	"(CAM)",
	" CAM ",
	" CAM",

	"DVDSCR",
	"SCR",
	
	"R6", //China

	"TELESYNC",
	"(TS)",
	"TS",
	"French",
	"German",
	"TSRIP",
	"TS-",
	"TS2",
	".TS",
	"TS.",
	" TS ",
	" TS",

	" Trailer ",
	" Trailer",
	"Trailer ",
	
	" making of ",
	"making of "
];

/* End of SETTINGS */


var blockedTorrents = [];

function deleteTorrent(torrentSpan) {
	if (confirm('Remove this torrent?')) {
		var target = $(torrentSpan).parent().parent();
		$(target).hide('slow', function(){ $(target).remove(); });
		
		// Persist as removed (add to blocklist)
		var link = $(torrentSpan).parent().attr('href');
		blockedTorrents.push(link) ;
		GM_setValue('blockedTorrents', uneval(blockedTorrents));
	}
	
	return false;
}

function insertLink(movie, torrentLink) {
	var ul = $(movie).parent().prev().find("div.hover-over-image").find("ul.downloadLinks");
	
	if (ul.length == 0) {
		$("<ul />", {
			'class' : 'downloadLinks'
		}).insertBefore($(movie).parent().prev().find("div.hover-over-image").find("img"));
		
		ul = $(movie).parent().prev().find("div").find("ul.downloadLinks");
	}
	
	var li = $("<li />", {
	}).appendTo($(ul));
	
	var a = $("<a />", {
		'class': torrentLink.contains("yts.re") ? 'downloadLinkYIFY' : 'downloadLink',
		'href': torrentLink,
		html: "DL <span onclick='return false;' title='remove'>[x]</span>",
		'title': torrentLink,
		'target': '_blank'
	}).appendTo($(li));
	
	$(a).find("span").click(function() {
		deleteTorrent(this);
	});
	
	// Keep searching if not enough links (e.g. link count = 4, max links = 5)
	return $(ul).find("li").length >= maxLinksPerTitle;
}

function processRSS(movie, rssResponse, year) {
	var hasEnoughLinks = false;
	
	// With every item in the RSS feed
	$.each($(rssResponse).find("item"), function() {
		// Did we get enough links for this movie title?
		if (!hasEnoughLinks) {
			// get the title of the item
			var title = $(this).find("title").text().toLowerCase().replace(/\+/g, " ").replace(/\./g, " ");
			//console.log(normalizeString(title));
			//console.log(normalizeString($(movie).text().toLowerCase()));
			// the torrent title matches our movie title
			if (title.indexOf(normalizeString($(movie).text().toLowerCase())) !== -1) {
				// check if it contains a blocked word
				var hasBlockedWord = false;
				$.each(blockedWords, function(idx, blockedWord) {
					if (title.indexOf(blockedWord.toLowerCase()) !== -1) {
						hasBlockedWord = true;
					}
				});
                
                
                var isRightYear = (title.indexOf(year) !== -1);
				var link = $(this).find("link").text();

				// it is the right year, it doesn't contain a blocked word and the link is not blocked (deleted by the user)
				if (isRightYear && !hasBlockedWord && $.inArray(link, blockedTorrents) == -1) {
					hasEnoughLinks = insertLink(movie, link);
				}
			}
		}
	});
	
	return hasEnoughLinks;
}

function normalizeString(string) {
    return string
            .replace(/&/g, "and")
			.replace(/\?/g, "")
			.replace(/:/g, "")
			.replace(/'/g, "");
}

function getSearchString(rssFeed, movie) {
	var feedStr = rssFeed
	.replace("{title}", normalizeString($(movie).text()))
	.replace("{seeds}", minimumSeeders);
	
	// Special handling for yify
	if (feedStr.contains("yts.re")) {
		var findtmp = ' ';
		var re = new RegExp(findtmp, 'g');

		feedStr = feedStr.replace(re, '_');
	}
	
	return feedStr;
}

// Search for a particular movie title in all torrents, one after the other (until entry is found or list is exhausted)
function searchForTorrents(movie, idxArrTorrents, year) {
	var img = $(movie).parent().prev().find("img.zero-z-index");
	if (typeof img.attr("realSrc") === 'undefined') {
		img.attr("realSrc", img.attr('src'));
		img.attr('src', "/images/spinning-progress-large.gif");
	}
	
	var torrentRSS = arrTorrents[idxArrTorrents];
	
	// If we haven't exhausted the list of RSS feeds yet...
	if (torrentRSS != null) {
		var searchUrl = getSearchString(torrentRSS, movie);
		
		GM_xmlhttpRequest({
			method: "GET",
			url: searchUrl,
			onload: function (response) {
				var rssResponse;
				var enoughResult = false;
				
				try {
					rssResponse = jQuery.parseXML(response.responseText);
					enoughResult = processRSS(movie, rssResponse, year)
				} catch (err) {
					enoughResult = false;
					console.log("Error: " + searchUrl);
				}
				
				// Should we keep searching?
				if (!enoughResult) {
					searchForTorrents(movie, idxArrTorrents + 1, year);
				} else {
					img.attr("src", img.attr('realSrc'));
				}
			}
		});
	} else {
		img.attr("src", img.attr('realSrc'));
	}
}

function init() {
	$("head").append(
	"<style type='text/css'>" +
		"ul.downloadLinks { " +
			"position:absolute;" +
			"z-index:5000;" + 
			"list-style:none;" +
			"padding-left:5px;" +
			"margin-left:0px;" + 
			"margin-top:5px;" +
		"}" +
		
		"a.downloadLink {" +
			"background-color:yellow;" + 
			"color:black;" +
			"font-weight:bold;" + 
			"padding:2px;" + 
			"vertical-align:middle;" + 
		"}" + 
		
		"a.downloadLinkYIFY {" +
			"background-color:#00FF00;" + 
			"color:#FF0000;" +
			"font-weight:bold;" + 
			"padding:2px;" + 
			"vertical-align:middle;" + 
		"}" + 

		".ho-hoverover.medium-pane {" +
			"z-index: 50001;"+
		"}" +
		
		"a.downloadLink span {" +
			"color:red;" +
			"z-index:5001;" + 
		"}" + 
	"</style>");
	
	blockedTorrents = eval(GM_getValue('blockedTorrents', '[]'));
}

// INIT
init();

// * START *
$.each($("div.list div.desc > a"), function(index, value) {
	var hoverUrl = "/widget/hover/_ajax/get_hover_info?list_class=WATCHLIST&movies_showing_nearby=none&tconst=" + $(value).attr('href').split("/")[2];
	
	// Determine the year of the movie
	var response = GM_xmlhttpRequest({
		method: "GET",
		url: hoverUrl,
		onload: function (response) {
			try {
				var hoverResponse = jQuery.parseJSON(response.responseText);
				var hoverDiv = $(hoverResponse.html_title_info);
				
				var year = hoverDiv.find("span.ho-title")
					.clone()    //clone the element
					.children() //select all the children
					.remove()   //remove all the children
					.end()  //again go back to selected element
					.text().trim().replace("(", "").replace(")", "");
					
                // With each title in your watch list - search torrents for it
                searchForTorrents(value, 0, year);
			} catch (err) {
				console.warn("Could not determine year. Error: " + hoverUrl);
			}
		}
	});
});