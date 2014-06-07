// ==UserScript==
// @name          Amazon Ichikawa City Lib linky
// @namespace     
// @author        haktasky
// @changelog	  Nov 21 2011
// @description   Lookup from Amazon book listings.
// @include       http://*.amazon.*
// ==/UserScript==

libsearch();

function libsearch() {
	// mainmatch = window._content.location.href.match(/\/(\d{9}[\d|X])\//);
	var href = document.location.href;
	var index_1 = href.indexOf('product');
	var index_2 = href.indexOf('dp');
	var asin = "";
	
	if (index_1 > 0) {
		var asin = href.substring(index_1 + 8,index_1 + 18);
	} else if (index_2 > 0) {
		var asin = href.substring(index_2 + 3,index_2 + 13);
	}

	if (asin.match(/(\d{9}[\d|X])/)){
		var header = document.evaluate("//div[@id='priceBlock']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (header) {
			var spl_link = document.createElement('a');
			spl_link.setAttribute('href', 'https://opac.city.ichikawa.chiba.jp/winj/opac/search-detail.do?opt_pagesize=10&txt_stpubdate=&txt_edpubdate=&cmb_volume_column=volume&txt_stvolume=&txt_edvolume=&cmb_code_column=isbn&txt_code=' + asin + '&txt_lom=&txt_cln1=&txt_cln2=&txt_cln3=&submit_btn_searchDetailSelAr=%E6%89%80%E8%94%B5%E6%A4%9C%E7%B4%A2');
			spl_link.setAttribute('title', 'To Ichikawa Library');
			spl_link.innerHTML = '</br><span style=\"font-size:90%; background-color:#ffffcc;\">&raquo; &#x5e02;&#x5ddd;&#x5e02;&#x56f3;&#x66f8;&#x9928;&#x3067;&#x691c;&#x7d22;</span>';
			header.parentNode.insertBefore(spl_link, header.nextSibling);
		}
	}
}