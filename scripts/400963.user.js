// ==UserScript==
// @name        Muzie Quick Download
// @namespace   http://userscripts.org/users/450869
// @description Add quick download button for Muzie list page
// @include     http://www.muzie.ne.jp/*
// @version     0.1
// @copyright   2014+, Zero
// @grant       none
// ==/UserScript==

$(document).on('click', '.get-muzie-url', function(){
	var a = $(this);
	$.getScript('http://www.muzie.ne.jp/js/player.php/' + a.data('muzie-id') + '/', function(js){
		var url = js.match(/mp3:\s*"([^"]+)"/)[1];
		if( url ){
			a.replaceWith('<a href="' + url + '">Download</a>');
		}
	});
});
$('a:has(img[alt="mp3再生"])').each(function(){
	var id = $(this).attr('href').match(/.*\/(\d+)\//)[1];
	$(this).after('<a href="javascript:;" class="get-muzie-url" data-muzie-id="' + id + '">Get URL</a>');
});