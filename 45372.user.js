// ==UserScript==
// @name		   WassrReceivedFavoritesCounter
// @namespace	   ksr
// @description    Wassr のもらったイイネ数を表示する
// @include 	   http://wassr.jp/my/
// @author		   ksr http://wassr.jp/user/ksr
// @version 	   0.4
// ==/UserScript==
//
// 0.1
// 2009/03/29 0.2 Opera , Safari + GreaseKit , Chrome + GreaseMetal に対応
// 2009/04/02 0.3 途中経過を表示するようにした
// 2009/06/24 0.4 GM関数部を無くした、Chrome2で動かなくなっていたのを修正
//

var iJumpPage = 5000;	// 検索ページ単位
var iPageMax = 20;		// 件数/ページ

var iPage = 0;			// 現在探索中のページ
var iMaxPage = 0;		// 最終ページ

var id = '';
var cnt=0;

var link = $x('//a[@title="もらったイイネ!"]')[0];

// 初期処理
(function(){

	// id を取得する
	var work = $x('//div[@id="My-URL"]/p/a')[0].href;
	id = work.substring( work.lastIndexOf('/') + 1 );

	// 探索開始
	setTimeout(WassrReceivedFavoritesCounter_Timer , 100 );

	// 途中経過表示
	link.innerHTML = link.innerHTML + " (算出中)";
})();

// メイン処理
function WassrReceivedFavoritesCounter_Timer(){

	var url;

	// 状況に応じて取得ページ数を調整
	if( iPage == 0 ){
		iPage = iJumpPage;
	}else if( iMaxPage == 0 ){
		iPage = iPage + iJumpPage;
	}else{
		iPage = iMaxPage;
	}

	// アドレス生成
	url = "http://wassr.jp/user/" + id + "/received_favorites?page=" + iPage + "&ajax_response=0";

	// 途中経過表示
	link.innerHTML = link.innerHTML.split(" ").shift() + " (算出中" + str_repeat2( ".", ++cnt) + ")";

	// 指定ページを非同期取得
	var xmlhttp = createHttpRequest();
	
	xmlhttp.open("GET", url, "False");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			RecvData( xmlhttp.responseText );
		}
	}
	xmlhttp.send(null);
}

// 取得データの解析処理
function RecvData( responseText ){
  	if( iMaxPage == 0 ){
		// 最終ページが未確定

		var regex = responseText.match( /<span class="current">(\d*)<\/span>/ );
		var current = RegExp.$1;
		
		if( iPage != current ){
			// 指定ページと現在ページが違う（行き過ぎた、ページナビゲーションから最終ページを取得）
			iMaxPage = current;
		}else{
			// 指定ページと現在ページが同じ
			if( responseText.match( /<a id="PagerNextLink" href/ ) ){
				// Next が有るので最終ページはまだ先
			}else{
				// Next が無いのでこのページが最終ページ
				ShowCount( responseText );
				return;
			}
		}
		setTimeout(WassrReceivedFavoritesCounter_Timer , 100 );
	}else{
		// 最終ページが確定しているので取得ページより計算を行って表示する
		ShowCount( responseText );
	}
}

// ページ数と最終ページのイイネ件数からもらったイイネ件数を算出して表示を行う
function ShowCount( responseText ){
	var regex = responseText.match( /<p class="message description">/g );
	var lastPageCount = regex.length;
	var count = ( iMaxPage - 1 ) * iPageMax + lastPageCount;

	// 結果表示
	link.innerHTML = link.innerHTML.split(" ").shift() + " (" + count + ")";
}


//XMLHttpRequestオブジェクト生成
function createHttpRequest(){

	//Win ie用
	if(window.ActiveXObject){
		try {
			//MSXML2以降用
			return new ActiveXObject("Msxml2.XMLHTTP") //[1]'
		} catch (e) {
			try {
				//旧MSXML用
				return new ActiveXObject("Microsoft.XMLHTTP") //[1]'
			} catch (e2) {
				return null
			}
		 }
	} else if(window.XMLHttpRequest){
		//Win ie以外のXMLHttpRequestオブジェクト実装ブラウザ用
		return new XMLHttpRequest() //[1]'
	} else {
		return null
	}
}



// hir90 - http://d.hatena.ne.jp/hir90/20080620/1213987444
function str_repeat2(str,num){
 var ans = "";
 if(num<0)return "error";
 while(num){
  if(num&1)ans += str;
  num = num>>1;
  str += str;
 }
 return ans;
}

// cho45 - http://lowreal.net/
function $x(exp, context) {
  if (!context) context = document;
	var resolver = function (prefix) {
	  var o = document.createNSResolver(context)(prefix);
	  return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
	}
  var exp = document.createExpression(exp, resolver);
  
  var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
  switch (result.resultType) {
	case XPathResult.STRING_TYPE : return result.stringValue;
	case XPathResult.NUMBER_TYPE : return result.numberValue;
	case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
	case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
	  result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	  var ret = [];
	  for (var i = 0, len = result.snapshotLength; i < len ; i++) {
		ret.push(result.snapshotItem(i));
	  }
	  return len != 0 ? ret : null;
	}
  }
  return null;
}

