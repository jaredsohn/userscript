// ==UserScript==
// @name		   WassrNoDrink
// @namespace	   ksr
// @description    「今日は飲みに行けないよ！」ボタンを追加する
// @include 	   http://wassr.jp/my/
// @author		   ksr http://wassr.jp/user/ksr
// @version 	   0.2
// ==/UserScript==
//
// 2009/07/12	0.1	初版リリース
// 2009/07/15	0.2	名前に絵文字は含まれていた場合に名前の置換で不具合が発生する問題を修正、自動追加文章を変更
//


var theDay = 60;	// cookie 保存期間


// 初期処理
(function(){

	var w = this.unsafeWindow || window;
	if( typeof(contentWindow) != 'undefined' ){
		w = contentWindow;
	}
	w.WassrNoDrink_Recv = recvJsonp;

	// ボタンの準備
	initialButton();
	
})();

// starus 更新処理
function postStatus( status ){

	initialIframe();

	var n = document.createElement("form");
	n.setAttribute( "name", "WassrNoDrink_PostForm");
	n.setAttribute( "action", "http://api.wassr.jp/statuses/update.json" );
	n.setAttribute( "method", "POST" );
	n.setAttribute( "target", "WassrNoDrink_PostFrame" );

	var p = document.createElement("input");
	p.setAttribute( "name", "status");
	p.setAttribute( "type", "text");
	p.setAttribute( "value", status);
	n.appendChild( p );

	var p = document.createElement("input");
	p.setAttribute( "name", "source");
	p.setAttribute( "type", "text");
	p.setAttribute( "value", "WassrNoDrink");
	n.appendChild( p );
	
	$x('//body')[0].appendChild( n );
	n.submit();
}

// status 更新処理後の完了待ち処理
function checkStatusResult(){

	var r = $x('//iframe[@id="WassrNoDrink_PostFrame"]')[0];
	console.log( r.innerHTML );

	if( r.innerHTML == "" ){
		setTimeout( checkStatusResult, 200 );
		return;
	}

//	if( r.innerHTML.indexOf("<pre>") != -1 && r.innerHTML.indexOf("<pre>{"error":"")
	if( r.innerHTML.indexOf("api[WassrNoDrink]") != -1 ){
		setCookie( "WassrNoDrink", ""+getYYYYMMDDserial() );
		window.location.href = window.location.href;
	}else{
		alert( "何らかのエラーが発生したようです。すみません「" + r.innerHTML + "」" );
	}
}

// 文言追加処理
function postNewMsg( msg ){

	// id を取得する
	var user = $x('//a[@title="あげたイイネ!"]')[0].href.match( /user\/(.*?)\// )[1];

	initialIframe();

	var n = document.createElement("form");
	n.setAttribute( "name", "WassrNoDrink_NewMsg");
	n.setAttribute( "action", "http://ksr-tools.appspot.com/WassrNoDrink/post" );
	n.setAttribute( "method", "POST" );
	n.setAttribute( "target", "WassrNoDrink_PostFrame" );


	var p = document.createElement("input");
	p.setAttribute( "name", "id");
	p.setAttribute( "type", "text");
	p.setAttribute( "value", user);
	n.appendChild( p );

	var p = document.createElement("input");
	p.setAttribute( "name", "msg");
	p.setAttribute( "type", "text");
	p.setAttribute( "value", msg);
	n.appendChild( p );
	
	$x('//body')[0].appendChild( n );
	n.submit();
}

// ボタン初期処理
function initialButton(){

	var b = $x('//h1[@class="username"]')[0];

	var n = document.createElement("div");
	n.innerHTML = "<input id='WassrNoDrink_Button' type='button' value='今夜は飲み行けないよ!' />";
	n = n.firstChild;
	n.addEventListener("click", clickButton, false);
	n.disabled = true;
	b.parentNode.appendChild(n);

	var c = getCookie("WassrNoDrink");
	if( c == false ){
		n.disabled = false;
	}else{
		if( parseInt(c) < getYYYYMMDDserial() ){
			n.disabled = false;
		}
	}
}

// ボタン押下時の処理
function clickButton(){
	$x('//input[@id="WassrNoDrink_Button"]')[0].disabled = true;

	// id を取得する
	var user = $x('//a[@title="あげたイイネ!"]')[0].href.match( /user\/(.*?)\// )[1];

	addScriptTag( "http://ksr-tools.appspot.com/WassrNoDrink/recv.jsonp?callback=WassrNoDrink_Recv&id=" + user );
}

// クロスドメイン回避post用iframe生成
function initialIframe(){

	var i = $x('//iframe[@id="WassrNoDrink_PostFrame"]');
	if( i ){
		i[0].parentNode.removeChild( i[0] );
	}

	var n = document.createElement("iframe");
	n.setAttribute( "id", "WassrNoDrink_PostFrame");
	n.setAttribute( "name", "WassrNoDrink_PostFrame");
	n.setAttribute( "style", "display:none;" );

	$x('//body')[0].appendChild( n );
}

// json取得用SCRIPTタグ生成
function addScriptTag( src ){

	var n = document.createElement("script");
	n.setAttribute( "type", "text/javascript");
	n.setAttribute( "src", src );

	$x('//head')[0].appendChild( n );
}

// jsonコールバック用 文言受信処理
function recvJsonp( data , sample ){

	if( sample != "" ){
		newInput( data , sample );
		return;
	}

	var name = $x('//h1[@class="username"]')[0].innerHTML;

// <img class="emoji" src="/img/pictogram/E72C.gif" alt="猫2" title="猫2" height="16" width="16"> -> {emoji:E72C}
	console.log( name );
	name = name.replace( /<img class="emoji" src="\/img\/.*?pictogram\/(.*?).gif".*?>/ig, function(){return "{emoji:" + RegExp.$1 + "}"} );
	console.log( name );

	data = data.replace(/__NAME__/,name);

//	alert( data );
//	if( true == confirm( data ) ){
		postStatus( data );
//	}

	setCookie( "WassrNoDrink", ""+getYYYYMMDDserial() );

//	window.location.href = window.location.href;
//	setTimeout( checkStatusResult, 200 );
}

// jsonコールバック用 文言受信処理(入力促し)
function newInput( data , sample ){

	var new_text = "";
	var flg = false;
	var msg = "あなたの「飲みに行けないよ！」メッセージを下さい！例えば「" + sample + "」な感じで 220文字以内位で・・・__NAME__って書くとその部分はボタン押した人の名前になるよ♪" ;

	while( !flg ){
		var input = prompt(msg,new_text);
		if( !input || input == "" ){
			var c = confirm("通常通りにランダムポストしますね？");
			if( c == true ){
				flg = true;
			}
		}else{
			var c = confirm( '"' + input + '"で登録してもよろしいですか？' );
			if( c == true ){
				flg = true;
				new_text = input;
			}
		}
	}
	if( new_text != "" ){
		postNewMsg( new_text );

		// id を取得する
		var user = $x('//a[@title="あげたイイネ!"]')[0].href.match( /user\/(.*?)\// )[1];

		data = "{emoji:E72F}{emoji:E672}" + new_text + " {color:silver:(@" + user + ")}"
	}
	
	var w = this.unsafeWindow || window;
//	if( typeof(contentWindow) != 'undefined' ){
		w = contentWindow;
//	}
	w.WassrNoDrink_Recv( data, "" );
}

// 本日YYYYMMDDでのシリアル値取得
function getYYYYMMDDserial(){
	var dd = new Date();
	var dd2 = new Date( dd.getFullYear() , dd.getMonth() , dd.getDate() );
	return dd2.getTime();
}


//--------------------------------------------------------------------------
//　Cookieを参照する関数（Cookieから指定されたデータを抜きだす）
//　成功した時はnull以外、失敗した時はfalseを返す
//--------------------------------------------------------------------------
function getCookie(theName)
{
	theName += "="; //　= を追加
	theCookie = document.cookie+";"; //　検索時最終項目で-1になるのを防ぐ
	start = theCookie.indexOf(theName); //　指定されたセクション名を検索する
	if (start != -1)
	{
		end = theCookie.indexOf(";",start); //　データを抜きだす
		return unescape(theCookie.substring(start+theName.length,end));
	}
	return false;
}

//--------------------------------------------------------------------------
//　Cookieを設定する関数（Cookieにデータを保存する）
//　成功した時はtrue、失敗した時はfalseを返す
//--------------------------------------------------------------------------
function setCookie(theName,theValue)
{
	if ((theName != null) && (theValue != null))
	{
		expDay = new Date(); //　現在の日時を取得
		if( theValue != "" ){
			expDay.setTime(expDay.getTime()+(theDay*1000*60*60*24)); //　Cookie期限の設定
		}else{
			expDay.setTime(expDay.getTime()+(-1*1000*60*60*24)); //　Cookie期限の設定
		}
		expDay = expDay.toGMTString();
		document.cookie = theName + "="+escape(theValue)+"; path=/; expires="+expDay; // データ保存
		return true;
	}
	return false;
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

