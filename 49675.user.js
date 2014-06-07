// ==UserScript==
// @name				TradeMe ThumbMe
// @namespace				http://devx.co.nz/gscripts
// @description			Load thumbnails for all auction listings
// @include				http://www.trademe.co.nz/*
// ==/UserScript==

$ = unsafeWindow.jQuery;	// TradeMe is using jQuery!
$.ajaxSetup({beforeSend:function(req){req.setRequestHeader("User-Agent",navigator.userAgent)}});

$("img[src$='hasPhoto.png']").each(function(){
	var auctionUrl = $(this).parent().attr('href');
	$.ajax({
		url: auctionUrl,
		obj: $(this),
		success: function(res){
			var img = res.match(/<img[^>]+src=\"([^\"]+)\"[^>]+id=\"mainImage\"[^>]+>/i);
			if (img.length == 2) {
				var imgSrc = img[1].replace(/\/tq\//i, '/lv/');
				this.obj.attr('src', imgSrc);
			}
		}
	});
});