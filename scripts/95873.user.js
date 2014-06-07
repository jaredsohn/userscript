// ==UserScript==
// @name		Imdb Rating on Pirate Bay
// @description 	Displays Imdb ratings and highlights the best movies
// @namespace	http://www.crawler.com/software/greasemonkey/piratebay-imdb
// @include	http://thepiratebay.*/top/2*
// @include http://tpb.piraten.*/top/2*
// @include http://tpb.piraten.*/browse/2*
// @include http://thepiratebay.*/browse/2*
// @include http://thepiratebay.*/search/*/*/*/201
// @include http://thepiratebay.*/search/*/*/*/201/
// @include http://tpb.piraten.*/search/*/*/*/201
// @include http://tpb.piraten.*/search/*/*/*/201/
// @author	Crawler
// @grant   GM_xmlhttpRequest
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js
// @require	http://datatables.net/download/build/jquery.dataTables.min.js
// @version	1.8.0
// ==/UserScript==


/*
 * VERSION HISTORY
 *
 * version 1.8.0
 * added some additional URLs in the @includes as requested by the users of the script.
 * The IMDB link now displays the plot summary as a link title so you take a quick look on the 
 * summary without navigating on the IMDB site. 
 *
 * version 1.7.3
 * removed the param string in genres.
 * added the http://tpb.piraten.lu to the @include url
 *
 * version 1.7.2
 * Changed the PirateBay url to thepiratebay.se
 *
 * version 1.7.1:
 * Refactored the source code and fixed the filtering functionality.
 *
 * version 1.7:
 * Added sorting funtions to the torrents table.
 *
 * version 1.6:
 * Changed the pattern to get the rating and the votes from IMDB due to the change of IMDB.
 *
 * version 1.5:
 * IMDB changed again and there was the same problem as in version 1.2 retrieving the rating
 * Pattern changed again to resolve the issue.
 *
 * version 1.4:
 * Gets from IMDB the movie's genres and displays them under the title.
 *
 * version 1.3:
 * IMDB changed the style of its pages so the
 * rating could not be retrieved 
 * Changed the rating pattern in order to be parsed correctly by the script.
 *
 * version 1.2:
 * If the script can't find the IMDB url in the first page of the torrent details then it loads the 1st comment screen
 * where usually some user has added the IMDB url as a comment. This adds approximately 25% additional IMDB votes and links
 *
 * version 1.1:
 * Added a loading indicator in each row in the torrents table to indicate that some processing occurs regarding this row.
 * Because the loading happens asynchronously each rating will appear without any specific order. If no info can be found about the movie then a warning message appears. 
 *
 * version 1.0:
 * Initial version. The script loads with AJAX the page that the Piratebay link points to and searches the link to the IMDB that provides the movie info.
 * When it finds it, gets the IMDB page with AJAX, gets the rating and the number of votes and updates the pirate bay torrents table. 
 */

// Images
var loadingImg = "data:image/gif;base64,R0lGODlhEAAQAPQAAPbx7pmZmfPu662sq8jGxJqamqampefj4NXS0KCfn8PAv727uuvn5NDNy+Dc2rKxsLi2tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==";
var timeout = 1;

var dataTablesCss1 = "http://datatables.net/release-datatables/media/css/demo_table.css";
var dataTablesCss2 = "http://datatables.net/release-datatables/media/css/demo_page.css";

function addStyle(style) {
	var head = document.getElementsByTagName("HEAD")[0];
	var ele = head.appendChild(window.document.createElement( 'style' ));
	ele.innerHTML = style;
	return ele;
}

function findImdbID(url) {
	if (url == null) {
		return null;
	}
	var m = url.match(/^http:\/\/(.*\.)?imdb.com\/title\/(tt\d*)/i);
	if (m) return m[2];
	return null;
}

function getMovieInfo(imdbUrl, index, callback) {
	setTimeout(function() {
		var url = imdbUrl;
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(details) {
				callback(extractMovieInfo(details.responseText, index, imdbUrl));
			}
		});
	}, timeout);
}

function extractMovieInfo(content, index, url) {
	//var match = content.match(/<span class="rating-rating">(\d.\d)<span>\/10<\/span><\/span>/);
	//var match = content.match(/<span class="value" itemprop="ratingValue">(\d.\d)<\/span>/);
	//var match = content.match(/<span class="rating-rating"><span class="value">(\d.\d)<\/span>/);
	var ratingValue = content.match(/<span itemprop="ratingValue">(\d.\d)<\/span>/);
	//var match2 = content.match(/([\d,]+ votes)/);
	var votes = content.match(/<span itemprop="ratingCount">([\d,]+)<\/span>/);
	
	var pattern = /href="\/genre\/([^"]*)\?ref_=tt_ov_inf"/g;
	var match3, count, genres = new Array();
	if (ratingValue == null) {
		ratingValue = '-';
	} else {
		ratingValue = ratingValue[1];
	}
	if (votes == null) {
		votes = '-';
	} else {
		votes = votes[1] + ' votes';
	}
	
	count = 0;
	while ( match3 = pattern.exec(content)){
		var gen = ' ' + match3[1];
		if (genres.indexOf(gen) == -1) {
			// put each genre only once
			genres[count++] = gen;
		}
		
	}

	var plot = content.match(/<p itemprop="description">\s([^<]*)(?:<a href.*)?\s?<\/p>/);
	if (plot == null) {
		plot = "";
	} else {
		plot = plot[1];
	}

	return { rating: ratingValue, index: index, votecount: ""+votes, url: url, genres: genres, plot: plot };
}

function getPage1Comments(details, index) {
	setTimeout(function() {
		var page=1;
		
		var match1 = details.match(/<a href="#" onclick="comPage\(1,\s*(\d+),\s*'([a-fA-F0-9]+)',\s*'(\d+)'\).*>1<\/a>/i);
		if (match1 != null) {
			var pages=match1[1];
			var crc=match1[2];
			var id=match1[3];
			
			$.ajax({
				type: 'POST',
				url: 'http://thepiratebay.se/ajax_details_comments.php',
				data: 'id='+id+'&page='+page+'&pages='+pages+'&crc='+crc,
				success: function(data, textStatus, jqXHR) {
					if (!processTorrentDetails(data, index)) {
						$('#loading_'+index).html('<em>Could not find IMDB info</em>');
					}
				}
			});
		} else {
			$('#loading_'+index).html('<em>Could not find IMDB info</em>');
		}
	}, timeout);
}

function highlightByRating(element, movieInfo) {
	var bestColor = "red";
	var otherColor = "green";

	if(movieInfo.votecount.length >= 12 && parseFloat(movieInfo.rating) >= 7.5 ) {
		element.eq(movieInfo.index).css('color', bestColor);
	}
	else {
		element.eq(movieInfo.index).css('color', otherColor);
	}
	var linkElement = ' <a href="'+movieInfo.url+'" title="' + movieInfo.plot + '" target="_blank">IMDB</a>';
	element.eq(movieInfo.index).html(movieInfo.rating + " " + element.eq(movieInfo.index).text() + "    (" + movieInfo.votecount + ")");
	element.eq(movieInfo.index).parent().append(linkElement);
	element.eq(movieInfo.index).parent().parent().append('<br/><div class="movie-genres">Genres: ' + movieInfo.genres + '</div>');
	$('#loading_'+movieInfo.index).remove();
}

function processTorrentDetails(details, index) {
	var url2 = details.match(/(http:\/\/(?:.*?\.)?imdb.com\/title\/tt\d*\/?)/i);
	if (url2 != null) {
		url2 = url2[1];
		if (findImdbID(url2) != null) {
			getMovieInfo(url2, index, function(movieInfo) {
				highlightByRating($processElement, movieInfo);
			});
		}
		return true;
	}
	return false;
}

$.fn.dataTableExt.afnSortData['title-text'] = function  ( oSettings, iColumn )
{
	var aData = [];
	console.log('iColumn: ' + iColumn);
	
	$( 'td:eq('+iColumn+')', oSettings.oApi._fnGetTrNodes(oSettings) ).each( function () {
		// keep the text under the <a class="detLink" ...></a>
		var d = $('.detLink', this).text();
		aData.push( d );
	} );
	return aData;
}

jQuery.fn.dataTableExt.oSort['rating-asc']  = function(a,b) {
// keep the first 3 characters where the rating is expected
// handle the titles with no rating (they start with "-") or the titles with no rating at all	
    var x = (a.match("^[-a-zA-Z]")) ? 0 : a.substring(0,3);
    var y = (b.match("^[-a-zA-Z]")) ? 0 : b.substring(0,3);

    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ? -1 : ((x > y) ?  1 : 0));
};
 
jQuery.fn.dataTableExt.oSort['rating-desc'] = function(a,b) {
// keep the first 3 characters where the rating is expected
// handle the titles with no rating (they start with "-") or the titles with no rating at all	
    var x = (a.match("^[-a-zA-Z]")) ? 0 : a.substring(0,3);
    var y = (b.match("^[-a-zA-Z]")) ? 0 : b.substring(0,3);

    x = parseFloat( x );
    y = parseFloat( y );
    return ((x < y) ?  1 : ((x > y) ? -1 : 0));
};

$(document).ready(function() {
	addStyle('@import "' + dataTablesCss1 + '"');
	addStyle('@import "' + dataTablesCss2 + '"');

	var elementName = ".detLink";
	$processElement = $(elementName);
	var url1;
	$(elementName).each(function(i) {
		url1 = $(this).attr('href');
		$(this).parent().append("&nbsp;<span id='loading_"+i+"'><img src='" + loadingImg + "' alt='Loading...'></span>");
		$.ajax({
			type:"GET",
			url:url1,
			success:function(details) {
				if (!processTorrentDetails(details, i)) {
					getPage1Comments(details, i);
				} 
			}
		});
	});

	var rowsLength = 31;
	console.log('document.URL: ' + document.URL);
	if (document.URL.indexOf('top') > -1) {
		rowsLength = 100;
	}

	$('#searchResult').dataTable( {
		"iDisplayLength": rowsLength,
		"sDom": '<f><"clear">rt<i>',
		"aoColumns": [
            null,
            { "sSortDataType": "title-text", "sType": "rating", "asSorting": [ "desc", "asc" ] },
            null,
            null
        ]

    } );
});	