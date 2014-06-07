// ==UserScript==
// @name            Amazon book in MILAI
// @namespace       http://penguinlab.jp/
// @include         http://*.amazon.*
// ==/UserScript==

(function(){
	//検索URL：ISBNの前まで
	var searchurl_before = "https://idx.milai.pref.mie.jp/MEPUTL/servlet/search.result?code_genre1=2&code_value1=";
	//検索URL：ISBNの後
	var searchurl_after = "";
	//ヒットしなかった際に表示されるHTML（正規表現）
	var nohitstring = "該当件数は.*0.*件です。";
	//ヒットした際に挿入するHTML（リンクはあとで付与）
	var html_hit = "○MILAI";
	//ヒットしなかった際に挿入するHTML
	var html_nohit = "<span style=\"color:#ff0000\">×MILAI</span>";
	
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

	if (isbn.match(/(\d{9}[\d|X])/)){
		var searchurl = searchurl_before + isbn + searchurl_after;
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