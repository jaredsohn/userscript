// ==UserScript==
// @name        La7.tv direct link
// @namespace   http://andrealazzarotto.com/
// @include     http://la7.it/*
// @include     http://*.la7.it/*
// @include     http://la7.tv/*
// @include     http://*.la7.tv/*
// @version     2.5.2
// @description This script gives you the direct link while watching a video on La7.tv.
// @copyright   2012+, Andrea Lazzarotto - GPLv3 License
// @require     http://code.jquery.com/jquery-latest.min.js
// @grant       GM_xmlhttpRequest
// @updateURL	https://userscripts.org/scripts/source/158622.user.js
// @downloadURL https://userscripts.org/scripts/source/158622.user.js
// ==/UserScript==

appendURL = function(element, url) {
	element.after('<div id="direct-link"></div>');
	$('#direct-link').css({
		'padding': '5px 0',
		'margin': '15px auto',
		'width': '90%',
		'border': '1px solid #888',
		'text-align': 'center',
		'background-color': '#cfc',
		'box-shadow': '0px 5px 15px 0px rgba(0, 0, 0, .7)',
		'font-family': 'sans-serif'
	}).append("<a href='" + url + "'>MP4 Direct Link</a>");
	$("#direct-link a")
		.css('color', 'black')
		.css('text-decoration', 'none')
		.css('font-size', '15px');
}

$(document).ready(function(){
	var obj = $('script:contains("entry_id")');
	if (obj.length > 0){
		var entry_id = obj.text().split('entry_id')[1].split('"')[2];
		
		// Thanks to: http://www.leoiannacone.com/2014/03/il-caso-la7-it-e-la-questione-del-nuovo-player/
		var data_url = 'http://kdam.iltrovatore.it/p/103/sp/10300/playManifest/entryId/' + entry_id;
		GM_xmlhttpRequest({
			method: 'GET',
			url: data_url,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails) {
				var r = responseDetails.responseText;
				var doc = $.parseXML(r);
				var $xml = $(doc);
				
				var media_url = $xml.find("media").attr('url');
				$('div.kaltura').parent().css('display', 'inline-block');
				$('div.kaltura').parent().parent().css('text-align', 'center');
				$('div.wrapper-media').css('height', 'auto');
				appendURL(obj.parent().parent(), media_url);
			}
		});
	}

	var meride = $('script[src*="meride.tv/scripts/latest/embed.js"]');
	if(meride.length > 0){
		var video_id = $('div.meride-video-container').attr('data-embed');
		var dataURL = 'http://mediasp.meride.tv/embedproxy.php/sp/folder1/' +
						video_id + '/desktop';
		GM_xmlhttpRequest({
			method: 'GET',
			url: dataURL,
			headers: {
				'Accept': 'application/atom+xml,application/xml,text/xml'
			},
			onload: function(responseDetails) {
				var r = responseDetails.responseText;
				var doc = $.parseXML(r);
				var $xml = $(doc);
				
				var iphone = $xml.find("iphone").text();
				var mp4 = $xml.find("mp4").text();
				var qualities = iphone.split('sp,')[1].split(',.mp4')[0].split(',');
				qualities = qualities.reverse();
				if(qualities.length > 0)
					mp4 = mp4.split('_sp')[0] + '_sp' + qualities[0] + '.mp4';
				appendURL(meride.parent(), mp4);
			}
		});
	}
});