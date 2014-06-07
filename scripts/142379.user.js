// ==UserScript==
// @name        VoD lovefilm
// @namespace   http://www.top-info.de/thein
// @description Bessere Video on Demand Suche und Sortierung bei lovefilm.de
// @include     http://www.lovefilm.de/browse/filme/video-on-demand/*
// @require     http://code.jquery.com/jquery-1.8.0.min.js
// @version     1.0.2
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

//var $j = unsafeWindow.jQuery;

var currpage = 1;
var suchtext = "";
var maxpages = 1;
var $allFilms = [];

window.addEventListener('load', function() {
	$('<div id="vodsuche" style="position: relative; float: right;"><input type="text" id="vodsuchtext"/><input type="button" id="vodsuchbutton" value="VoD Suche" /><br/><input type="checkbox" id="vodsuchov" value="ov"/> <label for="vodsuchov">Originalversionen</label></div>').appendTo('#wo-player');
	$('<img src="http://www.sptg.de/Teaser/App_Pictures/loading.gif" id="loadinggif" style="display: none; clear: both;"/>').appendTo('#wo-player');
	if(GM_getValue("vodsuchov")) {
		$('#vodsuchov').prop("checked", GM_getValue("vodsuchov"));
	} else {
		GM_setValue("vodsuchov", false);
	}
	$('#vodsuchbutton').click(function() {
		suchtext = escape($('#vodsuchtext').val().replace(/\s/, "+"));
		window.location.href = "http://www.lovefilm.de/browse/filme/video-on-demand/?query=" + suchtext + "&rows=50";
	});
	$('#vodsuchov').change(function() {
		var myvalue = $(this).prop("checked");
		GM_setValue("vodsuchov", myvalue);
		// wenn TRUE dann evtl vorhandene OV anzeigen, sonst verbergen
		if(myvalue) {
			$('.film_listing').show();
		} else {
			$('.film_listing').each(function() {
				if($(this).find('.fl_detail_info h2 a').text().indexOf('- OV') != -1) $(this).hide();
			});
		}
	});
	if(window.location.href.indexOf('?query=') != -1) {
		// Suchfeld vorbefüllen
		suchtext = unescape(window.location.search.match(/\?query=(.*)\&/)[1]);
		suchtext = suchtext.replace(/\+/, ' ');
		$('#vodsuchtext').val(suchtext);
		if($('.pagination').length > 0) {
			maxpages = $('.pagination:first > ul li').length - 2;
			$('#loadinggif').show();
			window.setTimeout(getNextPage, 10);
		} else {
			$('#loadinggif').show();
			window.setTimeout(sortThem, 10);
		}
	}
}, false);

function getNextPage() {
	currpage++;
	//console.log(currpage + "/" + maxpages);
	var split1 = "http://www.lovefilm.de/browse/filme/video-on-demand/p" + currpage;
	var split2 = window.location.href;
	split2 = split2.substring(split2.indexOf("/?query="));
	var theURL =  split1 + split2;
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: theURL,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/html',
	    },
		overrideMimeType: "text/html; charset=ISO-8859-1",
	    onload: function(responseDetails) {
			var $newPageEntries = $(responseDetails.responseText).find('.film_listing');
			$newPageEntries.each(function() {
				$('.box_title').after($(this));
			});
			if(currpage < maxpages) {
				window.setTimeout(getNextPage, 10);
			} else {
				// letzte Seite wurde eingelesen
				// - OV entfernen, falls notwendig
				if(!GM_getValue("vodsuchov")) {
					$('.film_listing').each(function() {
						if($(this).find('.fl_detail_info h2 a').text().indexOf('- OV') != -1) $(this).hide();
					});
				}
				// sortieren
				window.setTimeout(sortThem, 10);
			}
	    }
	});
}

function sortThem() {
	// zunächst alle Elemente clone
	$('.film_listing').each(function() {
		$allFilms.push($(this).clone());
		console.log($(this).find('.fl_detail_info h2 a').text());
	});
	// jetzt sortieren
	for(i=0; i < $allFilms.length - 1; i++) {
		for(j=i+1; j < $allFilms.length; j++) {
			var titel1 = $allFilms[i].find('.fl_detail_info h2 a').text();
			var titel2 = $allFilms[j].find('.fl_detail_info h2 a').text();
			if(titel2 > titel1) {
				var help = $allFilms[i];
				$allFilms[i] = $allFilms[j];
				$allFilms[j] = help;
			}
		}
	}
	// schließlich die alten löschen und die Klone einfügen
	$('.film_listing').remove();
	$.each($allFilms, function() {
		$('.box_title').after($(this));
	});
	$('.pagination').remove();
	$('.box_title').html("");
	$('#itemsperpage').html("");
	$('#loadinggif').hide();
}