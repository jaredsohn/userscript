// ==UserScript==
// @name           AddGoogleBooks
// @namespace      http://semifo.pa.land.to/
// @description    This script displays a link of GoogleBooks on the product pages such as Amazon or bk1. / Amazonやbk1等の商品ページにGoogleBooksへのリンクを表示します。 
// @version        0.5.0
// @include        http://www.7netshopping.jp/*/detail/*
// @include        http://www.amazon.*/*
// @include        http://www.junkudo.co.jp/detail.jsp?ISBN=*
// @include        http://www.bk1.jp/*
// @include        http://boox.jp/index.php*
// @include        http://www.honya-town.co.jp/hst/*
// @include        http://books.livedoor.com/item/*
// ==/UserScript==

(function (d, func) {
	var h = d.getElementsByTagName('head')[0];
	var s1 = d.createElement('script');
	s1.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js');
	s1.addEventListener('load', function() {
		var s2 = d.createElement('script');
		s2.textContent = 'jQuery.noConflict();(' + func.toString() + ')(jQuery);';
		h.appendChild(s2);
	}, false);
	h.appendChild(s1);
})(document, function($) {
	// main 

	//対応ページ
	var seven_net_book_url = 'http://www.7netshopping.jp/books/detail/';
	var amazon_product_url = 'http://www.amazon';
	var junk_url = 'http://www.junkudo.co.jp/detail.jsp?ISBN=';
	var bk1_url = 'http://www.bk1.jp/';
	var boox_url = 'http://boox.jp/index.php';
	var honya_url = 'http://www.honya-town.co.jp/hst/';
	var livedoor_url = 'http://books.livedoor.com/item/';


	var url = location.href;
	var selector = '';
	var count = 0;
    
	function show_google_books(xmlhttp) {
		var responseText = xmlhttp.responseText;
		eval(responseText);
		var book_data;
		for(var i in _GBSBookInfo) {
			book_data = _GBSBookInfo[i];
		}
		$('.allGoogleBooksLoad').remove();
		if (book_data) {
			if(book_data.embeddable && book_data.preview !== 'noview') {
				$(selector).after('<span style="display:block;"><a href="'+book_data.preview_url+'" target="_blank">'+
									'<img src="http://books.google.com/intl/en/googlebooks/images/gbs_preview_button1.gif"></a></span>');
			} else {
				$(selector).after('<span style="display:block;">Google Books Preview is not found.</span>');
			}
		} else {
			$(selector).after('<span style="display:block;">Google Books is not found.</span>');
		}
	}

	function request_google_books_error(xmlhttp) {
		$('.allGoogleBooksLoad').remove();
		$(selector).after('<span style="display:block;">Google Books is error.</span>');
	}

	function request_google_books(isbn) {
		var req = new XMLHttpRequest();
		req.open('GET', 'http://allow-any-origin.appspot.com/'+
				'http://books.google.com/books?bibkeys=ISBN:'+isbn+'&jscmd=viewapi', true);
		req.onload = function(event) {
			show_google_books(req);
			req = null;
		}
		req.onerror = function (event) {
			request_google_books_error(req);
			req = null;
		}
		req.send(null);
	}

	function show_load_image(br_cheak) {
		if (typeof br_cheak == 'undefined') {
			br_check = false;
		}
		if (br_cheak) {
			$(selector).after('<br /><div class="allGoogleBooksLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load2.gif" /></div>');
		} else {
			$(selector).after('<div class="allGoogleBooksLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load2.gif" /></div>');
		}
	}

	if (url.indexOf(seven_net_book_url) === 0) {
		$('div.detail_item_summary').map(function(i) {
			if($('.detail_item_summary_title',this).text().substring(0,4) === "ISBN") {
				isbn = $('.detail_item_summary_txt',this).text();
				selector = 'p.detail_item_line';
				show_load_image();
				request_google_books(isbn);
			}
		});
	} else if (url.indexOf(amazon_product_url) === 0) {
		var include_isbn_text = $('div.content>ul>li').text();
		var isbn = include_isbn_text.match(/[\d]{9}([\d]|[X]{1})/);
		if (isbn[0] != '') {
			selector = 'form>hr[noshade="noshade"]';
			show_load_image();
			request_google_books(isbn[0]);
		}
	} else if (url.indexOf(junk_url) === 0) {
		var include_isbn_text = location.href;
		var isbn = '';
		var isbn13 = include_isbn_text.match(/[\d]{13}/);
		if (isbn13 != null) {
			isbn = isbn13[0].substring(0,3)+'-'+isbn13[0].substring(3);
		} else {
			var isbn10 = include_isbn_text.match(/[\d]{9}([\d]|[X]{1})/);
			if (isbn10[0] != '') {
				isbn = isbn10[0];
			}
		}
		if (isbn != '') {
			selector = 'div[style="font-size:12pt;"]+font[color="#777777"]';
			$(selector).append('<br />');
			show_load_image();
			request_google_books(isbn);
		}
	} else if (url.indexOf(bk1_url) === 0) {
		var include_isbn_text = $('div.col02>table>tbody>tr>td:eq(1)').text();
		var isbn = jQuery.trim(include_isbn_text);
		if (isbn != '') {
			selector = '.postage';
			$(selector).append('<div style="margin-top:5px;"></div>');
			show_load_image();
			request_google_books(isbn);
		}
	} else if (url.indexOf(boox_url) === 0) {
		var include_isbn_text = $('tr').text();
		var isbn = include_isbn_text.match(/[\d]{13}/);
		isbn = isbn[0].substring(0,3)+'-'+isbn[0].substring(3);
		var jan_text = include_isbn_text.match('JANコード');
		if (isbn != '' && jan_text == null) {
			selector = '.detail_img';
			$(selector).after('<div style="margin-top:7px;"></div>');
			show_load_image(true);
			request_google_books(isbn);
		}
	} else if (url.indexOf(honya_url) === 0) {
		var include_isbn_text = $('small').text();
		var isbn = include_isbn_text.match(/[\d]{13}/);
		isbn = isbn[0].substring(0,3)+'-'+isbn[0].substring(3);
		if (isbn != '') {
			selector = 'img[height="180"]';
			show_load_image(true);
			request_google_books(isbn);
		}
	} else if (url.indexOf(livedoor_url) === 0) {
		var include_isbn_text = $('.itemData').text();
		var isbn = include_isbn_text.match(/[\d]{13}/);
		isbn = isbn[0].substring(0,3)+'-'+isbn[0].substring(3);
		if (isbn != '') {
			selector = 'p.itemImage';
			show_load_image();
			request_google_books(isbn);
		}
	}
});
