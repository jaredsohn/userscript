// ==UserScript==
// @name          Google Image Directer
// @namespace     http://mynook.info/
// @description   Go directly to target image when visiting Google Image search result
// @include       http://www.google.com/*
// @include       https://www.google.com/*
// @include       http://www.google.com.hk/*
// @include       https://www.google.com.hk/*
// @include       http://www.google.com/imgres*
// @include       https://www.google.com/imgres*
// @include       http://www.google.com.hk/imgres*
// @include       https://www.google.com.hk/imgres*
// @exclude       http://diveintogreasemonkey.org/*
// ==/UserScript==
Request={
	queryString: function(item){
		var svalue=location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
		return svalue?svalue[1]:svalue;
	},
	query: function(link, item){
		var svalue=link.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
		return svalue?svalue[1]:svalue;
	}
}
if(Request.queryString('tbm') == 'isch'){
	function convertImgLinks(){
		var _imgLinks = Array.prototype.slice.call(document.querySelectorAll('a.rg_l:not(.converted)'));
		_imgLinks.forEach(function(item){
			var _imgURL = Request.query(item, 'imgurl');
			item.href = _imgURL;
			item.className += ' converted';
			item.target = '_blank';
		});
	};
	window.onload = function(){
		convertImgLinks();
	};
	window.onscroll = function(){
		convertImgLinks();
	};
}
