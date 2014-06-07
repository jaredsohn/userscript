// ==UserScript==
// @name		IMDB Info Overlay
// @description 	Displays the top IMDB info on a modal dialog. Detects and includes direct link to imdb if found on page.
// @namespace	http://www.crawler.com/software/greasemonkey/piratebay-imdb
// @author	ov3rhear
// @include	http://www.torrentbytes.net/*
// @include http://www.torrentshack.net/*
// @require	http://code.jquery.com/jquery-latest.min.js
// @require     http://code.jquery.com/ui/1.10.3/jquery-ui.js
// @resource    http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css
// @version	0.0.3
// ==/UserScript==


/*
 * VERSION HISTORY
 *
 * version 0.0.3
 * Cleaned up some code. A bit better styled
 * version 0.0.2
 * Cleaned up some code
 * version 0.0.1
 * Created the script
 *
 */

var timeout = 1;

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
	
    var decoded = $('<div/>').html(content);
    var mainInfo = decoded.find('#title-overview-widget');
    
    mainInfo.find('#overview-bottom').remove();
	
    return { url: url, mainInfo: mainInfo };
}

function appendMovieInfo(element, movieInfo) {
	
    var linkElement = ' <a id="imdbLink" style="text-decoration: underline; background: #f5de50;font-size: 32px;" href="'+movieInfo.url+'" target="_blank">IMDB</a>';
    
    var modal = $('<div id="dialog" style="background: white; width: 800px !important;"></div>');
    
    $('body').append(modal);
    modal.prepend(linkElement);
    modal.append(movieInfo.mainInfo);
    $( "#dialog" ).dialog();    
}

function processTorrentDetails(details, index) {
	var url2 = details.match(/(http:\/\/(?:.*?\.)?imdb.com\/title\/tt\d*\/?)/i);
	if (url2 != null) {
        
		url2 = url2[1];
        
		if (findImdbID(url2) != null) {
            getMovieInfo(url2, index, function(movieInfo) {
				appendMovieInfo($processElement, movieInfo);
			});
		}
		return true;
	}
	return false;
}

$(document).ready(function() {
    
    $processElement = $('#mainframe');
    
    if($processElement.length < 1)
        $processElement = $('.torrent_table .pad');

    processTorrentDetails($processElement.text(), 1);
});	