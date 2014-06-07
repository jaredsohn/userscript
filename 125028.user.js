// ==UserScript==
// @name           YahooForCopy
// @namespace      http://www.trojanbear.net/
// @description		Yahooオークションの落札済み商品ページを表示すると、URL、商品名、落札者、金額などをまとめたテキストをページ上部に表示します
// @version        3.2
// @include        http://page*.auctions.yahoo.co.jp/jp/auction/*
// @include        http://page*.auctions.yahoo.co.jp/jp/show/contact*
// @include     http://*.auctions.yahoo.co.jp/show/contact_detail*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js

// ==/UserScript==


// Main noname function
(function () {


//ページ読み込み完了後の処理
jQuery(document).ready( function() {	

	var uri = location.href;
	
	
	// on detail message page
	if (uri.match(/jp\/show\/contact_detail/) ){
		//おまけ機能 文字サイズ補正
		jQuery('span > small').css('font-size','95%');
		
	}else {
		onMain();
	}
});


function onMain(){

	//作成した文字列の追加先 要素
	var toNode2 = jQuery("#mastHead:first");

	
	//該当項目がなければ終了
	if (toNode2 == null){
		return false;
	}
	
	//追加する要素（外枠）

	toNode2.append('<div id="addNode"></div>');
	$("#addNode").css({ backgroundColor:"#ffffcc", margin:"4px" , padding:"12px" ,width:"500px" , fontSize:"90%" , clear:"Both" });



	//★タイトル項目を追加
	var text =document.title;
	
	//ページタイトルより定型句を除去 
	var textReplace = text.replace("- ヤフオク!","");


	$("#addNode").append(textReplace + "<br>");


	//★URL項目を追加
	var txtUrl = location.href;
	$("#addNode").append(txtUrl + "<br>");

	// ★金額欄  特定クラスでテキストに「円」が含まれるtdを検索
	var child2 =  $('div.wrapper > div.modListTable table tr td.decBg01:contains("円")');


	if (child2 != null){
		var text = child2.text();

		if (text != null){

			//該当項目を見つけたとき
			$("#addNode").append("価格 " + text + "<br>");

		}
	}
	
	//★個数
	var itemNumber =$('div.wrapper > div.modListTable table tr td.decBg01:contains("取引ナビで連絡")').next();
	if (itemNumber != null){
		var text = itemNumber.text();

		if (text != null){

			//該当項目を見つけたとき
			$("#addNode").append("個数 " + text + "<br>");

		}
	}




	//★落札者名 特定クラスで 文字列「評価」が含まれるtdを検索
	var child3 =  $('div.modListTable table tr td:contains("評価")');

//console.log("child3 :" + child3.text() );
	if (child3 != null){
		var text = child3.text();

		//該当項目を見つけたとき
		if (text != null){

			var text3 = text.split(" /")[0];
			$("#addNode").append(text3);
		}
	}


}


//end of noname function
})();
