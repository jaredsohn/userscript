// ==UserScript==
// @name            Amazon book in mulib
// @namespace       http://penguinlab.jp/
// @include         http://*.amazon.*
// ==/UserScript==

(function(){
	//検索URL：ISBNの前まで
	var searchurl_before = "http://opac.lib.mie-u.ac.jp/cgi-bin/opc/seek.cgi?isbn=";
	//検索URL：ISBNの後
	var searchurl_after = "";
	//ヒットしなかった際に表示される文字列
	var nohitstring = "検索に該当する書誌情報はありませんでした。";
	//ヒットした際に挿入するHTML（リンクはあとで付与）
	var html_hit = "○mulib";
	//ヒットしなかった際に挿入するHTML
	var html_nohit = "<span style=\"color:red;\">×mulib</span>";
	
	var node = document.evaluate("//span[@id='btAsinTitle']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var href = document.location.href;
	var index_1 = href.indexOf('product');
	var index_2 = href.indexOf('dp');
	var index_3 = href.indexOf('ASIN');
	var isbn = "";
	if (index_1 > 0) {
		var isbn = href.substring(index_1 + 8,index_1 + 18);
	} else if (index_2 > 0) {
		var isbn = href.substring(index_2 + 3,index_2 + 13);
	} else if (index_3 > 0) {
		var isbn = href.substring(index_3 + 5,index_3 + 15);
	}
	
	var searchurl = searchurl_before + isbn + searchurl_after;
	if (isbn.match(/(\d{9}[\d|X])/)){
		GM_xmlhttpRequest({
			method:"GET",
			url: searchurl,
			onload:function(details){
				if(details.responseText.match(nohitstring)){
					html_insert_after(html_nohit, node);
				}else{
					html_insert_after("<a href=\"" + searchurl + "\">" + html_hit + "</a>", node);
				}
			}
		});
	}
})();

function html_insert_after(html, node){
	var e = document.createElement('span');
	e.innerHTML = html;
	e.setAttribute('class','amazon_book_in_library');
	if(node.nextSibling != null){
		node.parentNode.insertBefore(e, node.nextSibling);
	}else{
		node.parentNode.appendChild(e);
	};
}
