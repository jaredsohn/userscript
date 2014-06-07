// ==UserScript==
// @name wiki_popup_ver_01_revise01
// @namespace akage_no_fan
// @description http://ja.wikipedia.org/*
// @include http://ja.wikipedia.org/*
// ==/UserScript==


// メイン関数
(function(){
	// データ初期化
	InitFunc();

	// スタイルを設定
	SetPUStyle();
	// マウスイベント設定
	window.addEventListener("mousemove",On_MouseMove,false);
	// リンクにマウス属性追加
	LinkAddMouseElmts();
})();

// グローバルデータ初期化
function InitFunc(){
	// 状態遷移関連
	bLinkMouseover = false; // マウスオーバー(リンク上にマウス)状態
	bActiveGuidShowTimer = false; // PUGuideタイマー起動状態
	bActivePUGuideShow = false; // ポップアップGuide表示状態
	bActiveGuideOffTimer = false; // PUGuide表示消去タイマー起動状態
	bGuideMouseover = false; // ポップアップマウスオーバー
	bActiveHttpRequest = false; // HTTPリクエスト状態
	bActivePUContentsShow = false; // ポップアプContents表示状態
	bActiveContentsOffTimer = false;// PUContents表示消去タイマー起動状態
	bContentsMouseover = false; // コンテンツマウスオーバー

	// リンク取得関連
	link_url = ""; // マウス位置のリンク(プロフorBBS ページURL)
	last_link_url = ""; // 前回表示したプロフページURL
	last_link_data = ""; // 前回表示したプロフページデータ
	httpWikiObj = ""; // httpデータ取得用 オブジェクト

	// タイマー関連
	const_guide_wait = 500; // リンクONから案内ポップアプが出るまでの待ち時間
	const_popupoff_wait = 300; // ポップアップ消去待機時間　書き換え無し
	timer_id = 0;
	guideoff_timer_id = 0; // PUGタイマーID
	
	// 取得http種別
	const_accses_error = "ac_error";
	const_not_error = "not_error";
	link_http_kind = const_not_error;
}

// ポップアップ案内タグ追加
function CreatePUGuideTag(){
	var element = document.createElement('div');
	element.id = "popup_guide";
	var body_elem = document.getElementsByTagName("body").item(0); 
	body_elem.appendChild(element); 
	// ポップアップガイド属性追加
	PUGuideAddElmts();
}

// ポップアップコンテンツタグ追加
function CreatePUContentsTag(){
	var element = document.createElement('div');
	element.id = "contents_popup";
	var body_elem = document.getElementsByTagName("body").item(0); 
	body_elem.appendChild(element); 
	// ポップアプコンテンツに属性追加
	PUContentsAddElmts();
}

// タグIDを指定
function DeleteTag(del_tag_id){
	var element = document.getElementById(del_tag_id);
	element.innerHTML = "";
	var parent = element.parentNode;
    parent.removeChild(element);
}


// プロフページへのリンクに属性追加
function LinkAddMouseElmts(){
	//ページのリンク
	var elements = document.getElementsByTagName("a");

	for( var num= 0; num < elements.length ; num++ ){
		// 属性からリンクを取得
		var link_str = elements[num].getAttribute('href');
		if( link_str == null ) continue;
		if( 0 != link_str.indexOf( "/wiki/", 0 ) ) continue;
		// リンクにマウスイベント設定
		elements[num].addEventListener( 'mouseover', function(){ On_LinkMouseover(this) }, true);
		elements[num].addEventListener( 'mouseout', function(){ On_LinkMouseout() }, true);
	}
}


// ポップアプガイドに属性追加 v2
function PUGuideAddElmts(){
	var element = document.getElementById("popup_guide");
	element.style.display = 'none';
	element.style.width = "0px";

	// マウスイベント設定
	element.addEventListener( 'mouseover', function(){ On_PUGuideMouseover() }, true);
	element.addEventListener( 'mouseout', function(){ On_PUGuideMouseout() }, true);
}

// ポップアプコンテンツに属性追加
function PUContentsAddElmts(){
	var element = document.getElementById("contents_popup");
	element.style.display = 'none';
	element.style.width = "0px";

	// マウスイベント設定
	element.addEventListener( 'mouseover', function(){ On_PUContentsMouseover() }, true);
	element.addEventListener( 'mouseout', function(){ On_PUContentsMouseout() }, false);
}


/////////////////////////////////////////////////////////////////
//マウスイベント関連


// マウス移動
function On_MouseMove(evt){
	// マウス座標 記録
	var tmpevt;
	if (!evt){
		tmpevt=window.event;
	}else{
		tmpevt=evt;
	}
	Mouse_Left = tmpevt.clientX;
	Mouse_Top = tmpevt.clientY;
}

// 1-a リンク上にマウス
function On_LinkMouseover(ThisObj){
	// 既にマウスオーバー中 現行イベント中止
	// PUGuide上からリンクオーバーされた際
	if( bGuideMouseover == true ) return ;
	if( bActivePUGuideShow == true ) return ;
	// 既にマウスオーバー中 現行イベント中止
	if( bLinkMouseover == true ){
		if( bActiveGuideOffTimer == true){
			// タイマーを切る
			KillTimer_PUGuideOff();
		}
	}

	// リンクマウスオーバー記録
	bLinkMouseover = true;

	// リンクURL取得
	link_url = ThisObj.getAttribute('href');
	//ポップアップガイド呼び出しタイマー起動
	SetTimer_PUGuide();
}

// 1-b リンク上からマウスが降りた
function On_LinkMouseout(){
	if( bLinkMouseover == false ) return ;

	// 各種イベント中止
	if( bActiveGuidShowTimer == true ){
		// タイマー起動中 - タイマー中止
		KillTimer_PUGuideShow();
		// リンクマウスオーバー終了
		bLinkMouseover = false;
	}else if(bActivePUGuideShow == true ){
		if( bGuideMouseover == false ){
			// PUGuide表示済みでマウスオーバーがされていない場合
			// PUGuide表示消去タイマー起動
			SetTimer_PUGuideOff();
		}
	}
	bLinkMouseover = false;
}


// 2-a PUGuideにマウスオーバー v2
function On_PUGuideMouseover(){
	// 既にPUGuideにマウスオーバー中
	if( bGuideMouseover == true ) return ;

	// PUGuideマウスオーバー記録
	bLinkMouseover = false;
	bGuideMouseover = true;
	// 色を変える
	var element = document.getElementById("popup_guide");
	element.style.background = '#E6E6FA';
	element.style.color = '#00008B';

	// 前回のプロフィールと同じかをチェック
	if( last_link_url == link_url ){
		// コンテンツタグ作成
		CreatePUContentsTag();
		// 前回と同じ場合は前回のデータでPopUp
		document.getElementById("contents_popup").innerHTML = last_link_data;
		PUContentsShow();
		return;
	}

	//リクエスト呼び出し
	HttpRequest(link_url);
}

// 2-b PUGuideからマウスが降りた
function On_PUGuideMouseout(){
	if( bGuideMouseover == false ) return ;

	// 各種イベント中止
	if( bActiveHttpRequest == true ){
	// http リクエスト中 リクエスト中止
	if( httpWikiObj ) httpWikiObj.abort();
		bActiveHttpRequest = false;
	}else if(bActivePUGuideShow == true ){
		// ポップアップ消去
		PUGuideOff();
		// PUContentsが表示状態でマウスオーバーされてない時
		if(bActivePUContentsShow == true ){
			if( bContentsMouseover == false ){
				// PUGuide表示済みでマウスオーバーがされていない場合は表示消去
				SetTimer_PUContentsOff();
			}
		}
	}

	// マウスオーバー終了
	bLinkMouseover = false;
	bGuideMouseover = false;
}

// 3-a PUコンテンツにマウスオーバー v2
function On_PUContentsMouseover(){
	if( bContentsMouseover == true ){
	return ;
	}
	// PUContentsマウスオーバー記録
	bGuideMouseover = false;
	bContentsMouseover = true;

	// ガイドポップアップ消去
	if(bActivePUGuideShow == true ){
		PUGuideOff();
	}
}

// 3-b PUコンテンツからマウスが降りた
function On_PUContentsMouseout(){
	if( bContentsMouseover == false ) return ;
	// 各種イベント中止
	if(bActivePUGuideShow == true ){
		PUGuideOff();
	}

	if(bActivePUContentsShow == true ){
		// ポップアップ消去
		SetTimer_PUContentsOff();
	}

	bGuideMouseover = false;
	bContentsMouseover = false;
}


/////////////////////////////////////////////////////////////////

// PUGuide表示タイマーを起動 
function SetTimer_PUGuide(){
	// 連続アクセス対策 - 表示までチョイ待つ
	// タイマーを設定
	bActiveGuidShowTimer = true;
	timer_id = setTimeout( CallBack_TimerPUGuide, const_guide_wait );
}

// PUGuide消去待機タイマー
function SetTimer_PUGuideOff(){
	guideoff_timer_id = setTimeout( CallBack_TimerPUGuideOff, const_popupoff_wait );
	bActiveGuideOffTimer = true;
}

// PUContents消去待機タイマー
function SetTimer_PUContentsOff(){
	setTimeout( CallBack_TimerPUContentsOff, const_popupoff_wait );
	bActiveContentsOffTimer = true;
}

// PUGuide表示タイマーを中止
function KillTimer_PUGuideShow(){
	if( bActiveGuidShowTimer == true ){
		clearTimeout(timer_id);
		bActiveGuidShowTimer = false;
		timer_id = 0;
	}
}

// PUGuide消去タイマーを中止
function KillTimer_PUGuideOff(){
	if( bActiveGuideOffTimer == true ){
		clearTimeout(guideoff_timer_id);
		guideoff_timer_id = 0;
		bActiveGuideOffTimer = false;
	}
}

// 連続アクセス対策 - タイマーコールバック(popup_guideを出すまでチョイ待つ)
function CallBack_TimerPUGuide(){
	// タイマー終了
	bActiveGuidShowTimer = false;
	PUGuideShow();
}

// PUGuide消去待機
function CallBack_TimerPUGuideOff(){
	// PUGuide表示済みでマウスオーバーがされていない場合は表示消去
	bActiveGuideOffTimer = false;
	if(bActivePUGuideShow == false ) return;
	if( bGuideMouseover == true ) return ;

	PUGuideOff(); // リンクマウスオーバー終了
}

// PUContents消去待機
function CallBack_TimerPUContentsOff(){
	// PUContents表示済みでマウスオーバーがされていない場合は表示消去
	bActiveContentsOffTimer = false;
	if( bActivePUContentsShow == false ) return;
	if( bContentsMouseover == true ) return ;

	PUContentsOff(); // リンクマウスオーバー終了
}

/////////////////////////////////////////////////////////////////
// httpリクエスト関連

// Http取得リクエスト
function HttpRequest(access_url){
	if( bActiveHttpRequest == true ) return ;
	
	// リクエストON
	bActiveHttpRequest = true;
	if(!httpWikiObj) httpWikiObj = new XMLHttpRequest();
	httpWikiObj.open("GET", access_url, true);
	httpWikiObj.onreadystatechange = CallBack_HttpReqRyStChange;
	httpWikiObj.send(null);
}

// Http取得時 コールバックメソッド
function CallBack_HttpReqRyStChange(){
	// memo == 0 を == 200に変える事
	if( httpWikiObj ){
		if ( (httpWikiObj.readyState == 4) && (httpWikiObj.status == 200)) {
			bActiveHttpRequest = false;
			// 読み込み完了
			HttpRecvComplete();
		}
	}
}

/////////////////////////////////////////////////////////////////


// Http読み込み完了
function HttpRecvComplete(){
	if(!httpWikiObj) return ;

	// コンテンツタグ作成
	CreatePUContentsTag();
	// データ成型
	CastingLinkData(httpWikiObj.responseText);
	// 読み込みデータチェック
	if( link_http_kind != const_accses_error ){
		// 読み込みOK バックアップ
		last_link_data = document.getElementById("contents_popup").innerHTML;
		last_link_url = link_url;
	}
	// ポップアップ
	PUContentsShow();
}


// データ成型
function CastingLinkData(str_casting){
	link_http_kind = const_not_error;
	// ユーザーページ
	var str_link_contents = ChildTagExtraction( str_casting, '<body ', '</body>', '<body ');
	// 読み込みデータチェック
	if( str_link_contents == "\0" ){
		// アクセスエラー
		link_http_kind = const_accses_error;
		return ;
	}
	document.getElementById("contents_popup").innerHTML = str_link_contents;
}


// タグ子供データ抽出
//function ChildTagExtraction( SrcStr ){
// 引数指定 例<div id="profile"> ～ </div>を取得
// 第1引数 htmlデータ 引数指定 - 例 str_data
// 第2引数 抽出タグ先頭全体文字列 引数指定 - 例 '<div id="profile">'
// 第3引数 タグ終了文字列 引数指定 - 例 "/div>"
// 第4引数 同名入れ子タグ対策 引数指定 - 例 "<div"
function ChildTagExtraction( SrcStr, tag_top_all_str, tag_end, tag_top_part ){
	var startPos = SrcStr.indexOf( tag_top_all_str ,0);
	if(startPos == -1) return "\0";

	var checkStartPos = SrcStr.indexOf( ">" , startPos);
	if(checkStartPos == -1) return "\0";
	var retStartPos = checkStartPos+1;
	var endPos = checkStartPos;
	var retEndPos = 0;

	// カウントを加算
	var cnt = 1;

	// カウントが０になるまでループ
	while( cnt != 0 ){
		// 終了タグ探す
		retEndPos = SrcStr.indexOf( tag_end , endPos);
		if(retEndPos == -1) return "\0";
		// 終了タグの終わりまで移動
		endPos = SrcStr.indexOf( ">" , retEndPos);
		if(endPos == -1) return "\0";

		// カウントを減らす
		cnt -=1;

		while(1){
			// 終了タグの前に開始タグが無いかをチェック
			var checkPos = SrcStr.indexOf( tag_top_part , checkStartPos);
			if(checkPos == -1) break;
			if( endPos > checkPos ){
				// 開始タグが終了タグの前にあったのでカウント加算
				checkStartPos = SrcStr.indexOf( ">" , checkPos);
				if( checkStartPos == -1 ) return "\0"
				cnt +=1;
			}else{
				// チェックOK
				break;
			}
		}
	}

	if( retEndPos == 0 ) return "\0";
	return SrcStr.slice(retStartPos, retEndPos);
}


/////////////////////////////////////////////////////////////////
// ポップアップ関連

// 1-a ポップアップガイド表示
function PUGuideShow(){
	bActivePUGuideShow = true;
	// タグ作成
	CreatePUGuideTag();

	var element = document.getElementById("popup_guide");
	element.innerHTML = "　 でるかな";
	element.style.width = "80px";
	element.style.height = "15px";
	element.style.border = "1px solid #0000FF";
	element.style.background = '#F0F8FF';
	element.style.color = '#0000FF';


	var add_top_offset = (Mouse_Top < 40 )? 40 : - 40;
	element.style.top = Mouse_Top + window.pageYOffset + add_top_offset + "px";
	element.style.left = Mouse_Left + window.pageXOffset - 40 + "px";
	element.style.display = 'inline';
}


// 1-b ポップアップGuideOff
function PUGuideOff(){
	bActivePUGuideShow = false;
	var element = document.getElementById("popup_guide");
	element.style.display = 'none';
	DeleteTag("popup_guide");
}


// 2-a コンテンツポップアップ表示
function PUContentsShow(){
	bActivePUContentsShow = true;

	var element = document.getElementById("contents_popup");
	if( link_http_kind == const_not_error ){
		// 通常ポップアプ表示位置 設定
		SetPUContentsShowPos();
	}else{

		// エラー用ポップアップ
		var add_top_offset = (Mouse_Top < 50 )? 50 : - 50;
		element.style.top = Mouse_Top + window.pageYOffset + add_top_offset + "px";
		element.style.left = Mouse_Left + window.pageXOffset - 50 + "px";
		element.style.border = "0px";
		if( link_http_kind == const_accses_error ){
			// アクセスエラー
			element.style.width = "122px";
			element.style.height = "24px";
			document.getElementById("contents_popup").innerHTML = '<div class="accses_error"><h3>アクセスエラー</h3></div>';
		}
	}

	// ポップアップ表示
	element.style.display = 'block';
}

// 2-b コンテンツポップアップOff
function PUContentsOff(){
	bActivePUContentsShow = false;
	var contents_element = document.getElementById("contents_popup");
	contents_element.style.display = 'none';
	contents_element.style.width = "0px";
	contents_element.style.height = "0px";
	// タグ削除
	DeleteTag("contents_popup");
}


// 位置設定
function SetPUContentsShowPos(){
	var element = document.getElementById("contents_popup");

	//現在開いてるページ クライアントサイズ取得
	var client_height = document.documentElement.clientHeight;
	var client_width = document.documentElement.clientWidth;
	
	// 幅設定
	element.style.width = client_width - 4 + "px";
	element.style.height= ((client_height/10)*6) - 4 +"px";
	element.style.left = 1 + "px";

	if( (client_height/2) > Mouse_Top ){
		// マウスがクライアント領域上側にいる
		element.style.top = ((client_height/10)*4) - 1 + "px";
	}else{
		// マウスがクライアント領域下側にいる
		element.style.top = 0 + "px";
	}
}

/*

/////////////////////////////////////////////////////////////////
// debug_code
function debug_txt_Out(str_debug){
	var src_doc = document.body.innerHTML;
	document.body.innerHTML = '<TEXTAREA id="debug_txt_out" class="tb" ROWS=3 COLS=70 readonly onmouseover="this.focus()" onfocus="this.select()"></TEXTAREA>' + src_doc;

	var debug_element = document.getElementById("debug_txt_out");
	debug_element.style.padding = 'absolute';
	debug_element.style.margin = '0px';
	debug_element.style.height = "500px";
	debug_element.style.width = "700px";
	debug_element.innerHTML = str_debug;
	debug_element.style.display = 'block';
}
/////////////////////////////////////////////////////////////////
*/

function SetPUStyle(){


GM_addStyle(<><![CDATA[

/* ------------------------------
案内ポップアップウィンドウ
------------------------------ */

div#popup_guide{
display:none;
padding:4px 0px;
margin:0px;
position:absolute;
border:1px solid #0000FF;
width:0px;
height:0px;
background:#F0F8FF;
color:#4169E1;
font-size:140%;
font-weight:normal;
font-style:normal;
z-index:15;
}


/* ------------------------------
ポップアップウィンドウ
------------------------------ */

div#contents_popup{
position:fixed;
background:#ffffff;
border:2px solid #0000FF;
color:#6c6c6c;
padding:absolute;
margin:0px;
width:0px;
z-index:15;
overflow:auto;
z-index:15;
}


/* アクセスエラー */
div#contents_popup div.accses_error h3{
width:120px;
height:24px;
padding:0 5px 0 21px;
border:2px solid #1E90FF;
background:#E0FFFF;
color:#1E90FF;
line-height:24px;
clear:both;
display:inline-block;
font-weight:bold;
z-index:15;
}


]]></>); 

}

// 修正
// 09/01/13 ポップアップ表示領域拡大済み

