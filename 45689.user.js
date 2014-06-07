// ==UserScript==
// @name           WassrWatchList
// @namespace      ksr
// @description    Wassr のお気に入りのユーザーを /my/ に追加表示する
// @include        http://wassr.jp/my/
// @include        http://wassr.jp/user/*
// @include        http://wassr.jp/my/users_reply/
// @exclude        http://wassr.jp/user/*/favorites
// @exclude        http://wassr.jp/user/*/received_favorites
// @author         ksr http://wassr.jp/user/ksr
// @version        0.5
// ==/UserScript==
//
// 2009/04/02 0.1 初版公開
// 2009/04/03 0.2 【不具合修正】Cookieに不要なデータまで格納して、最悪 400 Error (Bad Request)でWassrにアクセス出来なくなる問題に暫定対応（根本の解決に至っていない、ウォッチリストに多量のユーザーを追加すると発生してしまう。Cookieのサイズオーバーが問題）
// 2009/04/03 0.3 ウォッチリストにユーザー名が正しく表示されない不具合を修正
// 2009/04/19 0.4 退会ユーザーがリストから消せない不具合に対応(自動で消えます)
// 2009/06/21 0.5 localStorage が使える場合は使うように、退会ユーザーを消すときにはAlert表示、Cookie利用時は登録件数に制限を
//

var theDay = 60;	// cookie 保存期間
var id;				// ユーザーID
var name;			// ユーザー名

var imglist_total;	// リストアイコン件数
var imglist_cnt=0;	// リストアイコン読み込み完了
var objHttps = [];
var urls = [];

var cookie_regist_maxuser = 100;	// cookie利用時に登録できるのは 100件までに


	// Opera で実行された場合は、console.log を追加
	if(window.opera&&!window.console){console={log:opera.postError}}

	// DOMストレージのオブジェクトの準備
	var w = this.unsafeWindow || window;
	var ls = w.localStorage;

	// データ移行処理
	cookieToStorage();


(function(){

	// ユーザーリストの取得
	var user_list = loadValue( "WassrWatchList_UserList" );
	
	// URL取得（動作モード判定のため）
	var this_location = window.location.href;

	if( this_location.indexOf( "/my/" ) != -1 ){
		// 自分のホームなので一覧を表示する
		
		// 自分の名前を取得
		name = $x('//h1[@class="username"]')[0].innerHTML;
		
		// 見た目の定義
		var areaHtml1 = "\
			<div class='WatchList'>\
				<div>\
					<div id='User-Friends-title' class='Side-hd'>\
						<h2>\
		";
//							<a title="" href="">
//								のウォッチリスト
//								<span class="num"> (999) </span>
//							</a>
		var areaHtml2 = "\
						</h2>\
					</div>\
					<div id='User-Friends' class='Side-contents'>\
						<p>\
		";
//							<a title="" href="">
//								<img width="32" height="32" alt="" src="" />
//							</a>
		var areaHtml3 = "\
						</p>\
					</div>\
					<div class='Side-ft'>   </div>\
				</div>\
			</div>\
		";
		
		// アイコンリストの生成
		var list = user_list.split("|");
		var i;
		var cnt=0;
		var profHtml="";
		for( i = 0 ; i < list.length ; i++ ){
			var list_id = list[i].replace("[","").replace("]","");
			if( list_id != "" ){
				var profile_src = "/user/" + list_id + "/profile_img.png.32";
				var list_name = loadName( list_id );
				profHtml += "<a title='" + list_name + "' href='/user/" + list_id + "'><img id='WassrWatchList_ImgList' width='32' height='32' alt='" + list_name + "' src='" + profile_src + "' /></a>";
				cnt++;
			}
		}
		var areaHtml = areaHtml1;
		if( ls ){
			// DOMストレージの場合はNoLimit
			areaHtml += name + "さんのウォッチリスト<span id='WassrWatchList_num' class='num'> (" + cnt + ") </span>";
		}else{
			// Cookieの場合はLimit有り
			areaHtml += name + "さんのウォッチリスト<span id='WassrWatchList_num' class='num'> (" + cnt + "/" + cookie_regist_maxuser + ") </span>";
		}
		areaHtml += areaHtml2;
		areaHtml += profHtml;
		areaHtml += areaHtml3;

		imglist_total = cnt;
		
		// 追加する Element を作成して所定の位置に追加
		var areaElem = document.createElement('div');
		areaElem.innerHTML = areaHtml.replace(/\t/g,"");;
		areaElem = areaElem.firstChild;
		
		var friends = $x('//div[@class="UserFriends"]')[0];
		friends.parentNode.insertBefore(areaElem, friends);

		var img_list = $x('//img[@id="WassrWatchList_ImgList"]');
		if( img_list ){
			for( i = 0 ; i < img_list.length ; i++ ){
				img_list[i].addEventListener("load", WassrWatchList_ImgLoadHandler, false);
				img_list[i].addEventListener("error", WassrWatchList_ImgLoadHandler, false);
			}
		}
	}else if( this_location.indexOf( "/user/" ) != -1 ){
		// 各ユーザーページなので、ウォッチリストに追加 or 削除ボタンを作って追加する

		// 自分のページなら処理無し
		if( !$x('//div[@class="UserSub"]/p') ) return;
		if( $x('//div[@class="UserSub"]/p')[0].innerHTML.indexOf( "あなたの" ) != -1 )	return;
		
		// ID 保存
		id = $x('//div[@id="User-URL"]/p')[0].innerHTML.split("/").pop();

		// リストに表示中のユーザーが含まれている場合は追加済みフラグ On
		var Enabled = false;
		if( user_list.indexOf( "[" + id + "]" ) != -1 ){
			Enabled = true;
		}

		// 名前を取得して DOMストレージ/cookie に保存（/my/で表示用に使う）
		name = $x('//h1[@class="username"]')[0].innerHTML;
		if( Enabled ){
			saveName( Enabled );
		}

		// ボタンの追加処理
		var h1name = $x('//h1[@class="username"]')[0];
		var btnElem = document.createElement('div');
		if( Enabled ){
			btnElem.innerHTML = "<input id='btnWassrWatchList' type='button' value='ウォッチリストから削除する' />";
		}else{
			btnElem.innerHTML = "<input id='btnWassrWatchList' type='button' value='ウォッチリストに追加する' />";
		}
		btnElem = btnElem.firstChild;
		btnElem.addEventListener("click", WassrWatchList_btnClick, false);
		h1name.parentNode.insertBefore(btnElem, h1name);

		// もし、Cookie利用時で登録件数以上の登録がされている場合は「追加」ボタンを無効化
		if( !ls && !Enabled ){
			if( ( user_list.split("|").length - 1 ) >= cookie_regist_maxuser ){
				// ボタンを無効化
				var btn = $x('//input[@id="btnWassrWatchList"]')[0].disabled = true;
			}
		}


		// リストに表示ページのユーザーが含まれている場合は、一番前に持ってくる処理して cookie 更新
		if( Enabled ){
			user_list = user_list.replace("[" + id + "]|", "" );
			user_list = "[" + id + "]|" + user_list;
			saveValue( "WassrWatchList_UserList" , user_list );
		}
	}

})();

// 追加削除ボタン押下時の処理
function WassrWatchList_btnClick(){

	// ユーザーリストを取得し直す
	var user_list = loadValue( "WassrWatchList_UserList" );

	// ボタンを無効化
	var btn = $x('//input[@id="btnWassrWatchList"]')[0]
	btn.disabled = true;

	// ボタンが「追加」だった場合はフラグOn
	var flg = false;
	if( btn.value.indexOf( "追加" ) != -1 ){
		flg = true;
	}

	// もし、Cookie利用時で登録件数以上の登録がされている場合は無効
	if( !ls && flg ){
		if( ( user_list.split("|").length - 1 ) >= cookie_regist_maxuser ){
			alert( cookie_regist_maxuser + "件以上登録出来ません" );
			return;
		}
	}

	// 該当のユーザーをリストの一番前に追加してリストを保存
	user_list = user_list.replace( "[" + id + "]|" , "" );
	if( flg ){
		user_list = "[" + id + "]|" + user_list;
		saveName( true )
	}else{
		saveName( false )
	}
	saveValue( "WassrWatchList_UserList" , user_list );

	// ボタンを有効化する仕込み
	if( flg ){
		setTimeout( setBtnEnableDel, 300 );
	}else{
		setTimeout( setBtnEnableAdd, 300 );
	}
}

// ボタンの文言を変更して再有効化
function setBtnEnableAdd(){
	var btn = $x('//input[@id="btnWassrWatchList"]')[0]
	btn.value = "ウォッチリストに追加する";

	// 解除後に登録件数を超えていた場合は、再有効化しない
	var user_list = loadValue( "WassrWatchList_UserList" );
	if( !ls ){
		if( ( user_list.split("|").length - 1 ) < cookie_regist_maxuser ){
			btn.disabled = false;
		}
	}else{
		btn.disabled = false;
	}
}
function setBtnEnableDel(){
	var btn = $x('//input[@id="btnWassrWatchList"]')[0]
	btn.value = "ウォッチリストから削除する";
	btn.disabled = false;
}

// id=名前 を DOMストレージ/cookie に保存する
function saveName( Enabled ){

	var value="";
	var gKey="";

	if( ls ){
		// DOMストレージ利用の場合は ID=NAME で保存
		gKey = "WassrWatchList_Name_" + id;
		if( Enabled ){
			value = name.replace( /<.*?>/g , "□" );;
		}
	}else{
		// Cookie利用の場合は 同じCookie値に複数の名前を保存

		// まずは id から格納するクッキーのキーを決める
		gKey = "WassrWatchList_Name" + getId4num( id );
		var names = loadValue( gKey );

		// 名前の更新処理
		var re = new RegExp( id + "=[^\n]+" );
		var work = names.match( re );
		if( work ){
			names = names.replace( work + String.fromCharCode(10) , "" );
		}
		if( Enabled ){
			names += id + "=" + name.replace( /<.*?>/g , "□" ) + String.fromCharCode(10);
		}
		value = names;
	}

	saveValue( gKey , value );
}

// id=名前 を cookie から取得する
function loadName( id ){

	var value="";
	var gKey="";

	if( ls ){
		// DOMストレージ利用の場合
		gKey = "WassrWatchList_Name_" + id;
		value = loadValue( gKey );
	}else{
		// Cookie利用の場合

		// まずは id から格納するクッキーのキーを決める
		gKey = "WassrWatchList_Name" + getId4num( id );

		// Cookie値の取得
		var names = loadValue( gKey );

		// 指定のidの名前を探す
		var re = new RegExp( id + "=([^\n]+)" );
		var value = names.match( re );

		value= RegExp.$1;
	}

	return value;
}

// cookie の保存できるサイズって 4kb だっけ？なので、分散して保存する為のキーの数値をidから生成してる
function getId4num( id ){
	var i;
	var total = 0;
	for( i = 0 ; i < id.length ; i++ ){
		total += id.charCodeAt( i );
	}
	return total % 5;
}

// アイコン読み込み完了時のイベント処理
function WassrWatchList_ImgLoadHandler( img ){

	// 読み込み完了した件数を数える
	imglist_cnt++;

	// 全部読み込み完了したら
	if( imglist_total == imglist_cnt ){
		var imgs = $x('//img[@id="WassrWatchList_ImgList"]');
		var ary_cnt=0;
		for( var i = 0 ; i < imgs.length ; i++ ){
			// 1px 画像を探す
			if( imgs[i].naturalHeight == 1 ){

				// 1px 画像をリストに追加
				urls[ary_cnt] = imgs[i].parentNode.href;

				///// そのユーザーの存在確認作業を行う
				// ユーザーページだと 302 でリダイレクトされてわからないので、 /photos ページにアクセス (404になる)
				objHttps[ary_cnt] = createHttpRequest();
				objHttps[ary_cnt].open("GET", urls[ary_cnt] + "/photos" , "True");
				objHttps[ary_cnt].onreadystatechange = function(){ var hoge = arguments[0]; return function() { handleResult(hoge) }; }(ary_cnt);
				objHttps[ary_cnt].send(null);

				ary_cnt++;
			}
		}
	}
}

// 存在確認アクセスStatusChangeイベント処理
function handleResult(i) {
	// 読み込み完了して && 404 エラーの場合
	if( objHttps[i].readyState == 4 && objHttps[i].status == 404 ){
		// アクセスURLからユーザーidを取得
		var del_id = urls[i].split("/").pop();
		
		var imgs = $x('//img[@id="WassrWatchList_ImgList"]');
		for( var i = 0 ; i < imgs.length ; i++ ){
			if( imgs[i].src.split("/")[4] == del_id ){
				// 対象の画像Elementを特定して
				
				// リストからElementを削除
				imgs[i].parentNode.removeChild( imgs[i] );
				
				// リストの件数を更新
				$x('//span[@id="WassrWatchList_num"]')[0].innerHTML = "(" + --imglist_total + ")";

				// ユーザーリストから、退会ユーザーを削除
				var name = loadName( del_id );
				alert( name + "(@" + del_id + ")さんは退会された様なのでウォッチリストから削除しました" );

				var user_list = loadValue( "WassrWatchList_UserList" );
				user_list = user_list.replace( "[" + del_id + "]|" , "" );
				saveValue( "WassrWatchList_UserList" , user_list );

				if( ls ){
					saveValue( "WassrWatchList_Name_" + del_id, "" );
				}else{
					// まずは id から格納するクッキーのキーを決める
					var gKey = "WassrWatchList_Name" + getId4num( del_id );
					var names = loadValue( gKey );

					// 名前の更新処理
					var re = new RegExp( del_id + "=[^\n]+" );
					var work = names.match( re );
					if( work ){
						names = names.replace( value + String.fromCharCode(10) , "" );
					}
					saveValue( gKey, value );
				}
			}
		}
	}
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

// 値の保存処理
function saveValue( key, value ){
	if( ls ){
		// DOMストレージが使えるなら使う
		if( value != "" ){
			ls.setItem( key, value );
		}else{
			ls.removeItem( key );
		}
	}else{
		// Cookie を使用する
		setCookie( key, value );
	}
}

// 値の取得処理
function loadValue( key ){
	if( ls ){
		// DOMストレージが使えるなら使う
		if( ls[ key ] ){
			return ""+ls[ key ];
		}else{
			return "";
		}
	}else{
		// Cookie を使用する
		var value = getCookie( key );
		if( value == false ){
			return "";
		}else{
			return value;
		}
	}
}

// DOMストレージを使えるにもかかわらず、Cookieに情報が保存されていた場合は、Cookieの情報を DOMストレージへ移して、Cookieを削除する
function cookieToStorage(){
	var user_list = getCookie("WassrWatchList_UserList");
	if( !ls || user_list == false )	return;

	// ユーザーリストを保存
	saveValue( "WassrWatchList_UserList", user_list );

	var ls_bak = ls;
	ls = null;

	var list = user_list.split("|");
	for( var i = 0 ; i < list.length ; i++ ){
		var list_id = list[i].replace("[","").replace("]","");
		if( list_id != "" ){
			var list_name = loadName( list_id );
			ls = ls_bak;
			id = list_id;
			name = list_name;
			saveName( true );
			ls = null;
		}
	}

	setCookie( "WassrWatchList_UserList", "" );
	setCookie( "WassrWatchList_Name0", "" );
	setCookie( "WassrWatchList_Name1", "" );
	setCookie( "WassrWatchList_Name2", "" );
	setCookie( "WassrWatchList_Name3", "" );
	setCookie( "WassrWatchList_Name4", "" );

	name = "";
	ls = ls_bak;
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

