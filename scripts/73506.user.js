// ==UserScript==
// @name        twitter search with googlereader
// @description TSGR - twitter search with googlereader
// @include     htt*://*.google.*/reader/*
// @author      TSGR by daiji harada (http://hrd.slack77.net)
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



(function($){
	var markup = '<div class="section lhn-section" id="lhn-twittersearch">\
		<div style="padding-left:10px">\
			<span style="font-weight: bold;">twitter 検索</span>\
		</div>\
		<div style="padding-left:20px;margin-bottom:5px;">\
			<form id="twittersearch" onsubmit="return false;">\
			<input type="text" id="twittersearch-query" style="border:1px solid #B2B2B2;margin:0;padding:3px 2px;width:150px;">\
			<input type="submit" id="twittersearch-button" value="検索">\
			</form>\
		</div>\
	</div>';
	$('#lhn-add-subscription-section').after(markup);
	$('#twittersearch').submit(function(){
		if($('#twittersearch-query').val()){
			var query = encodeURIComponent($('#twittersearch-query').val().replace(/　/g,' '));
			location.href = 'http://www.google.com/reader/view/#stream/feed%2F'+encodeURIComponent('http://search.twitter.com/search.atom?lang=ja&rpp=100&q='+ query);
		}
	});
})(jQuery);


