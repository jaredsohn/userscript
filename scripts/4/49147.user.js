// ==UserScript==
// @name			WassrUnkGmnIineCounter
// @namespace		mkfs
// @description		Wassr のあげたイイネ数を表示する
// @include			http://wassr.jp/my/
// @author			mkfs http://wassr.jp/user/manasvin
// @version			0.31
// ==/UserScript==
//
// くせれさんの「もらったイイネ数を表示する」スクリプトを改造したものでっす。
// 数えるのに十数回ページアクセスする処理なので、ボタン連打は控えてねｗ　たま～にやってみてください。
// 0.31
// 2009/05/15	無限に計測出来てなかったバカスｗｗｗ
// 0.3
// 2009/05/15	探索ロジックを無限に計測出来るよう修正。近似値が四未満になったら１つずつチェックするようにした。
// 0.2
// 2009/05/15	初回探索開始ページをランダムに。（負担かけさせないため）
// 2009/05/15	探索ロジックが間違ってたので修正
//
//


var iJumpPage = 5000 + Math.floor(Math.random()* 100);	// 検索ページ単位
var iPageMax = 20;		// 件数/ページ

var iPage = 0;			// 現在探索中のページ
var iMaxPage = 0;		// 最終ページ
var iMoxPage = 0;		// わかっている最高ページ
var iMinPage = 0;		// わかっている最低ページ

var id = '';
var cnt = 0;
var nir = 0;
var chk = 0;
var pls = 0;
var link = $x('//a[@title="あげたイイネ!"]')[0];

// 初期処理
(function(){

	// id を取得する
	var work = $x('//div[@id="My-URL"]/p/a')[0].href;
	id = work.substring( work.lastIndexOf('/') + 1 );

	//計測ボタンの設置
	var mkfs = $x('//div[@class="MySub"]')[0];
	var btnElem = document.createElement('p');
	btnElem.innerHTML = "<input id='btnWassrIineCount' type='button' value='☆あげたイイネを計測☆' />";
	mkfs.appendChild(btnElem);
	btnElem = btnElem.firstChild;
	btnElem.addEventListener("click", WassrIineCount_btnClick, false);

//	WassrIineCount_btnClick();
})();

//ボタンを押されたら探索開始
function WassrIineCount_btnClick(){
	link.innerHTML = "あげたイイネ!";
	
	//探索開始
	setTimeout(WassrMyFavoriteIineCounter_Timer , 100 );

	// 途中経過表示
	link.innerHTML = link.innerHTML + " (算出中)";
}
//})();



// メイン処理
function WassrMyFavoriteIineCounter_Timer(){

	var url;

	// 状況に応じて取得ページ数を調整
	if( iPage == 0 ){
		iPage = iJumpPage;
		iMaxPage = iPage;
	}else if( iMaxPage == 0 ){
		iPage = iPage + iJumpPage;
	}else{
		iPage = iMaxPage;
	}

	// アドレス生成
	url = "http://wassr.jp/user/" + id + "/favorites?page=" + iPage + "&ajax_response=0";

	// 途中経過表示
	link.innerHTML = link.innerHTML.split(" ").shift() + " (p"+ iPage + "･･･" + cnt + str_repeat2( "", ++cnt) + ")";

	// GM系関数が使えるかそうでないかで処理を分ける
	if(typeof GM_xmlhttpRequest == 'undefined'){
		// GM 関数無効時

		// 指定ページを非同期取得
		var xmlhttp = createHttpRequest();
		
		xmlhttp.open("GET", url, "False");
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				RecvData( xmlhttp.responseText );
			}
		}
		xmlhttp.send(null);
	}else{
		// GM 関数有効時

		// 指定ページを非同期取得
		GM_xmlhttpRequest({
		  method:'GET',
		  url:url,
		  onload: function( responseDetails ){
		  	RecvData( responseDetails.responseText );
		  }
		});
	}
}

// 取得データの解析処理
function RecvData( responseText ){
	if( responseText.match( /<a id="PagerNextLink" href/ )){
		//初回でまだ増やしたりなかったら最大ページを倍にする。
		if(iMoxPage == 0){
			iMaxPage = iPage * 2;
			setTimeout(WassrMyFavoriteIineCounter_Timer , 100 );
		}
		//減らし過ぎたか、まだ増やし足りないのでこのページを最低ページとする。
		iMinPage = iMaxPage;								//50
		//前回の最大ページと現在のページを割った分増やす
		nir = Math.ceil((iMoxPage -iMaxPage) / 2)  ;			//25
		iMaxPage = iMaxPage + nir + 1;							//75
		//もう差異が3以下になったら一つずつ増やす
		if(nir < 5){
			iMaxPage = iMinPage +1;
		}
		setTimeout(WassrMyFavoriteIineCounter_Timer , 100 );
	}else if( responseText.match( /<a id="PagerPreviousLink" href/ )){
		// 最終ページが確定しているので取得ページより計算を行って表示する
		ShowCount( responseText );
		return;
	}else{
		//減らせちゃったので最大ページをこのページにしておく。
		iMoxPage = iMaxPage;						//100
		//前回の最小ページから現在のページを半分にした値まで少なくしてみる
		chk = Math.ceil((iMaxPage - iMinPage) / 2) ;	//50
		iMaxPage = iMinPage + chk;					//50
		//もう差異が3以下になったら一つずつ足す
		if(chk < 5){
			iMaxPage = iMinPage +1;
		}
		setTimeout(WassrMyFavoriteIineCounter_Timer , 100 );
	}
}

// ページ数と最終ページのイイネ件数からもらったイイネ件数を算出して表示を行う
function ShowCount( responseText ){
	var regex = responseText.match( /<p class="message description">/g );
	var lastPageCount = regex.length;
	var count = ( iMaxPage - 1 ) * iPageMax + lastPageCount;

	// 結果表示
	link.innerHTML = link.innerHTML.split(" ").shift() + "(☆" + count + "☆)";
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

