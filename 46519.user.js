// ==UserScript==
// @name            Amazon.co.jp 選書ヘルパー
// @namespace       http://penguinlab.jp/
// @include         http://www.amazon.co.jp/*
// ==/UserScript==

//左右の空白を削除する関数
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
};

(function(){
	//タイトル・著者
	var temp = document.evaluate('/HTML[1]/BODY[1]/FORM[1]/DIV[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	var title = document.evaluate('H1[1]/SPAN[1]/text()', temp, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;
	title = title.trim();
	var authornodes = document.evaluate('A', temp, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var authors = "";
	for ( var i = 0 ; i < authornodes.snapshotLength; i++ ){
		authors += authornodes.snapshotItem(i).textContent + ", ";
	}
	authors = authors.substr(0, authors.length - 2).trim();
	
	//価格
	var price = "";
	price = document.evaluate('/HTML[1]/BODY[1]/FORM[1]/TABLE[3]/TBODY[1]/TR[1]/TD[1]/DIV[1]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/B[1]/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;
	price = price.replace(/.*?([\d,]+).*/,"$1").trim();

	//出版者とISBN
	var bibs = document.evaluate('/HTML[1]/BODY[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/DIV[1]/UL[1]/LI', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var pub = "";
	var isbn = "";
	var field = "";
	for ( var i = 0 ; i < bibs.snapshotLength; i++ ){
		field = document.evaluate('B[1]/text()', bibs.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;
		if(field == "出版社:"){pub = document.evaluate('text()', bibs.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;}
		if(field == "ISBN-13:"){isbn = document.evaluate('text()', bibs.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.nodeValue;}
	}
	pub = pub.replace(/ \(\d\d\d\d[\/\d]*?\)/,"").trim();
	isbn = isbn.replace(/-/,"").trim();
	
	var res = title + "\t" + authors + "\t" + pub + "\t" + isbn + "\t" + price;
	res = '<form><textarea name="bib" style="font-size:small;width:30em;font-family:sans-serif;">' + res + '</textarea></form>';

	html_insert_before(res, document.evaluate('/HTML[1]/BODY[1]/HR[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);
})();

function html_insert_before(html, node){
	var e = document.createElement('span');
	e.innerHTML = html;
	e.setAttribute('class','amazon_book_in_library');
    node.parentNode.insertBefore(e, node);
}

