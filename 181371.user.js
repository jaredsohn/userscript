// ==UserScript==
// @author         jmkl
// @name           KickIMDBAss
// @description    add Kickass Torrent List on IMDB
// @grant          none
// @include        http://*.imdb.*/title/*
// @include        http://imdb.*/title/*
// @include        http://kickass.to/usearch/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @version        1.0
// ==/UserScript==
var pageurl = window.location.href;
if (pageurl.contains("kickass.to")) {
	var list = $('table.data');
	$('body > :not(table.data)').remove();
	list.appendTo('body');
} else {
	var parent = $('#pagecontent');
	var judulfilem;
	judulfilem = $('span.itemprop').html();
	judulfilem = judulfilem.replace(/[^\w\s]/gi, '');
	judulfilem = judulfilem.replace(/\s/g, "%20");
	$('a#home_img').replaceWith('<div class="showKat" style="position:absolute;z-index:9999999;float:right;border:none;width:132px;height:95px;"></div>');
	$('span.alt_logo').html('');

	function getKAT(link) {
		parent.prepend('<iframe id="kat" src="' + link + '" allowtransparency="true" frameborder="0" border="0" style="border:none;width:100%;height:500px;"/>');
		$('#kat').hide();
		$("#kat").load(function() {
			$('.showKat').css({
				'cursor': 'pointer',
				'background': 'url("http://kastatic.com/images/kickasslogosmall.png") no-repeat',
				'color': '#fff'
			});
			$('.showKat').click(function() {
				if ($('#kat').is(":visible")) {
					$('#kat').slideUp('slow');
				} else
				$('#kat').slideDown('slow');
			});
		});
	}
	var url = 'http://kickass.to/usearch/' + $.trim(judulfilem) + '%20category%3Amovies/';
	if (judulfilem.length > 0) getKAT(url);
}