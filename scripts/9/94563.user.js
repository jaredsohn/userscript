// ==UserScript==
// @name           AllAmazon
// @namespace      http://semifo.pa.land.to/
// @description    楽天ブックスやYahoo!ショッピング等の商品個別紹介ページに同商品のAmazon.co.jpへのリンクを表示します。
// @version        1.0.0
// @include        http://books.rakuten.co.jp/rb/*
// @include        http://store.shopping.yahoo.co.jp/*
// @include        http://www.7netshopping.jp/*/detail/*
// @include        http://www.amiami.jp/shop/ProductInfo/product_id/*
// @include        http://www.amiami.jp/shop/?vgForm=ProductInfo&sku=*
// @include        http://item.rakuten.co.jp/*
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
    var rakuten_books_url = 'http://books.rakuten.co.jp/rb/';
    var rakuten_url = 'http://item.rakuten.co.jp/';
    var seven_net_url = 'http://www.7netshopping.jp/';
    var seven_net_book_url = 'http://www.7netshopping.jp/books/detail/';
    var seven_net_cd_url = 'http://www.7netshopping.jp/cd/detail/';
    var seven_net_dvd_url = 'http://www.7netshopping.jp/dvd/detail/';
    var yahoo_shopping_url = 'http://store.shopping.yahoo.co.jp/';
    var amiami_url = 'http://www.amiami.jp/shop/ProductInfo/product_id/';
    var amiami_url2 = 'http://www.amiami.jp/shop/?vgForm=ProductInfo&sku=';
    
    
    var url = location.href;
 	var keyword = '';
 	var id_type = '';
 	var xmlhttp = '';
 	var selector = '';
 	var br = false;
 	
 	
 	function show_all_amazon(url) {
    	$('.allAmazonLoad').remove();
        if (br === true) {
        	$(selector).after('<br /><div class="allamazon" style="padding:0px;border:0;display:inline;"><a href="'+url+'" target="_blank" style="text-decoration:none;color:#0B529A">Amazonで購入する</a></div>');
        } else {
        	$(selector).after('<div class="allamazon" style="padding:0px;border:0;display:inline;"><a href="'+url+'" target="_blank" style="text-decoration:none;color:#0B529A">Amazonで購入する</a></div>');
        }
		css_button();
    }
    
    function show_search_miss(message) {
    	$('.allAmazonLoad').remove();
    	if (br === true) {
        	$(selector).after('<br /><div class="allamazon" style="padding:0px;border:0;display:inline;" style="text-decoration:none;color:#0B529A">'+message+'</div>');
		} else {
			$(selector).after('<div class="allamazon" style="padding:0px;border:0;display:inline;" style="text-decoration:none;color:#0B529A">'+message+'</div>');
		}
		css_button();
    }
    
    function keyword_search_amazon(keyword) {
    	$('.allAmazonLoad').remove();
    	if (br === true) {
    		$(selector).after('<br /><div class="allamazon" style="padding:0px;border:0;display:inline;"><a href="http://www.amazon.co.jp/s/ref=nb_sb_noss?__mk_ja_JP=カタカナ&url=search-alias=aps&field-keywords='+keyword+'&x=0&y=0" target="_blank" style="text-decoration:none;color:#0B529A">Amazonで検索する</a></div>');
		} else {
			$(selector).after('<div class="allamazon" style="padding:0px;border:0;display:inline;"><a href="http://www.amazon.co.jp/s/ref=nb_sb_noss?__mk_ja_JP=カタカナ&url=search-alias=aps&field-keywords='+keyword+'&x=0&y=0" target="_blank" style="text-decoration:none;color:#0B529A">Amazonで検索する</a></div>');
		}
		css_button();
    }
    
    function css_button() {
    	$('.allamazon').css('font-size','14px').css('color','#050505').css('-moz-border-radius','22px').css('padding-left','5px').css('padding-right','5px').css('border-radius','22px')
    	.css('border','1px solid #000000').css('margin-top','30px')
    	.css('background','-moz-linear-gradient(top,#ffffff 0%,#ff9100)')
    	.css('background','-webkit-gradient(linear,left top,left bottom,from(#ffffff),to(#ff9100))')
    	.css('-moz-box-shadow','px 1px 3px rgba(000,000,000,0.5),inset 0px 0px 2px rgba(255,255,255,1)')
    	.css('-wbkit-box-shadow','px 1px 3px rgba(000,000,000,0.5),inset 0px 0px 2px rgba(255,255,255,1)')
    	.css('text-decoration','none').css('font-weight','bold').hover(
    		function() {$('.allamazon a').css('color','#1489FF');},
    		function() {$('.allamazon a').css('color','#0B529A');}
    	);
    	
    }
    
    function get_amazon(xmlhttp) {
    
        var responseText = xmlhttp.responseText;
        var pattern = /{.*}/;
        responseText = responseText.match(pattern)
        
        var response = eval('('+responseText+')');
        if (response['keyword'] == null) {
	        if (response['miss'] == null) {
	        	show_all_amazon(response['url']);
	        } else {
	        	show_search_miss(response['miss']);
	        }
	    } else {
	    	keyword_search_amazon(response['keyword']);
	    }
    }
    
    function allamazon_error(xmlhttp) {
    	$('.allAmazonLoad').remove();
        if (br === true) {
        	$(selector).after('<br /><div class="allamazon" style="padding:0px;border:0;display:inline;color:red;">All-AMAZON-ERROR</div>');
        } else {
        	$(selector).after('<div class="allamazon" style="padding:0px;border:0;display:inline;color:red;">ALL-AMAZON-ERROR</div>');
        }
    }
    
    function request_amazon(keyword, id_type) {
//    	xmlhttp = GM_xmlhttpRequest({
//                method : 'GET',
//                url : "http://semifo.pa.land.to/ichigo/allamazon.php?keyword="+keyword+"&type="+id_type,
//                onload : get_amazon
//                //onerror : get_amazon_error
//        });
		var req = new XMLHttpRequest();
	    req.open('GET', 'http://allow-any-origin.appspot.com/http://semifo.pa.land.to/ichigo/allamazon.php?keyword='+keyword+'&type='+id_type, true);
	    req.onload = function (event) {
	        get_amazon(req);
	        req = null;
	    }
	    req.onerror = function (event) {
	        allamazon_error(req);
	        req = null;
	    }
	    req.send(null);
    }
    
    
    
    
    if (url.indexOf(rakuten_books_url) === 0) {
    	var jan = '';
    	var isbn = '';
    	$('ul.productSubData').after('<div class="allAmazonLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		$('#productIdentifier dl').map(function(i) {
			jan = $('span',this).text().substring(0,7);
			isbn = $('span',this).text().substring(0,8);
			if (jan === "・JANコード") {
				keyword = $('dd',this).text();
				id_type = 'JAN';
			} else if (isbn === "・ISBNコード") {
				keyword = $('dd',this).text();
				id_type = 'ISBN';
			}
		});
		selector = 'ul.productSubData';
		request_amazon(keyword, id_type);
		
	} else if (url.indexOf(seven_net_book_url) === 0) {
		$('p.detail_item_line').after('<div class="allAmazonLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		$('div.detail_item_summary').map(function(i) {
				if($('.detail_item_summary_title',this).text().substring(0,4) === "ISBN") {
					keyword = $('.detail_item_summary_txt',this).text();
					id_type = 'ISBN-';
				}
		});
		if (keyword == '') {
			keyword = $('span.detail_item_name').text();
			id_type = 'else2';
		}
		selector = 'p.detail_item_line';
		request_amazon(keyword, id_type);
		
	} else if ((url.indexOf(seven_net_cd_url) === 0) || url.indexOf(seven_net_dvd_url) === 0) {
		$('p.detail_item_line').after('<div class="allAmazonLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		$('div.detail_item_summary').map(function(i) {
				if($('.detail_item_summary_title',this).text().substring(0,4) === "規格番号") {
					keyword = $('.detail_item_summary_txt',this).text();
					id_type = 'else1';
				}
		});
		if (keyword == '') {
			keyword = $('span.detail_item_name').text();
			id_type = 'else2';
		}
		selector = 'p.detail_item_line';
		request_amazon(keyword, id_type);
		
	} else if (url.indexOf(seven_net_url) === 0) {
		$('p.detail_item_line').after('<div class="allAmazonLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		keyword = $('span.detail_item_name').text();
		id_type = 'else2';
		selector = 'p.detail_item_line';
		request_amazon(keyword, id_type);
		
	} else if (url.indexOf(yahoo_shopping_url) === 0) {
		$('h2 span').after('<br /><div class="allAmazonLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		keyword = $('.jan').text();
		if (keyword == '') {
			keyword = $('h2 span').text();
			id_type = 'else2';
		} else {
			keyword = keyword.replace('JANコード：','');
			id_type = 'JAN';
		}
		selector = 'h2 span';
		br = true;
		request_amazon(keyword, id_type);
	} else if (url.indexOf(amiami_url) === 0 || url.indexOf(amiami_url2) === 0) {
		$('h3.productp_title').after('<br /><div class="allAmazonLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		keyword = $('h3.productp_title').text();
		var pattern = /^.*\[/;
		keyword = keyword.match(pattern);
		keyword = keyword[0].substring(0,keyword[0].length-1);
		id_type = 'else2';
		selector = 'h3.productp_title';
		request_amazon(keyword, id_type);
	} else if (url.indexOf(rakuten_url) === 0) {
		$('span.item_name').after('<br /><div class="allAmazonLoad" style="margin:0px 0px 0px 10px;padding:0;border:0;display:inline;vertical-align:middle;"><img src="http://semifo.pa.land.to/load.gif" /></div>');
		keyword = $('title').text();
		var check = true;
		while (check === true) {
			var i = keyword.indexOf('】');
			keyword = keyword.substring(i+1,keyword.length);
			if ('【' != keyword.substring(0,1)) {
				check = false;
			} 
		}
		if (keyword.indexOf('【') != -1) {
			keyword = keyword.substring(0,keyword.indexOf('【'));
		}
		id_type = 'else2';
		selector = 'span.item_name';
		br = true;
		request_amazon(keyword, id_type);
	}
});