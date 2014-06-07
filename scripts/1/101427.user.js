// ==UserScript==
// @name           Add To Booklog From Amazon
// @namespace      http://4dez.org/2011/04/19/greasemonkey-amazon-booklog/
// @description    Amazon product page will appear Booklog icon. Click to bookshelf transition to the registration page.
// @include        http://www.amazon.co.jp/*
// @version        1.0.2
// ==/UserScript==
(function (d, func) {
	var h = d.getElementsByTagName('head')[0];
	var s1 = d.createElement("script");
	s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	s1.addEventListener('load', function() {
		var s2 = d.createElement("script");
		s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
		h.appendChild(s2);
	}, false);
	h.appendChild(s1);
})(document, function($) {
	//main program.
	var ASIN = $("#ASIN").attr("value");
	var add = "http://booklog.jp/blet?s=" +ASIN;
	var rev = "http://booklog.jp/asin/" +ASIN;

	if ($("#storeID").attr("value").match(/books|english-books|dvd|music|videogames|software/g)) {
		$("#priceBlock").prepend("<div id='booklog' style='margin-bottom:10px; font-size:13px;'><a href='"+add+"' target=\"_blank\" style='margin-right:5px'><img src='http://p.booklog.jp/image/icon/booklog_link.png' style='margin-bottom:-10px'><span>ブクログに追加</span></a>/<a href='"+rev+"' target=\"_blank\" style='margin-left:5px'><span>みんなのレビューページ</span></a></div>");
	}
});
