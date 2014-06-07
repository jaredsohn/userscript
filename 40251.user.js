// ==UserScript==
// @name mixi_popup_ver_02
// @namespace akage_no_fan
// @description http://mixi.jp/*
// @include http://mixi.jp/*
// ==/UserScript==


// メイン関数
(function(){
	// ログインページなら抜ける - クッキー対策
	if( document.title == "ソーシャル・ネットワーキング サービス [mixi(ミクシィ)]" ) return ;

	// データ初期化
	InitFunc();

	// ドメイン取得
	var str_url = location.href;

	// 現在の表示ページチェック
	if( str_url == "http://mixi.jp/" ){
		// ホーム
		now_url_kind = 'home';
	}else if( str_url.indexOf( "http://mixi.jp/home.pl", 0 ) == 0 ){
		// ホーム
		now_url_kind = 'home';
	}else if( str_url.indexOf( "http://mixi.jp/new_bbs.pl", 0 ) == 0 ){
		// ホーム
		now_url_kind = 'home';
	}else if( str_url.indexOf( "http://mixi.jp/new_bbs_comment.pl", 0 ) == 0 ){
		// ホーム
		now_url_kind = 'home';
	}else if( str_url.indexOf( "http://mixi.jp/show_log.pl", 0 ) == 0 ){
		// 足跡ページ
		now_url_kind = "log";
		now_http_req_kind = "log_self";
		SetTimer_LogCallBack();
	}else if( str_url.indexOf( "http://mixi.jp/show_self_log.pl", 0 ) == 0 ){
		// 自分の足跡ページ
		now_url_kind = "log_self";
		now_http_req_kind = "log";
		SetTimer_LogCallBack();
	}else if( str_url.indexOf( "http://mixi.jp/view_community.pl", 0 ) == 0 ){
		// コミュニティページトップ
		now_url_kind = "commu";
	}else if( str_url.indexOf( "http://mixi.jp/view_bbs.pl", 0 ) == 0 ){
		// コミュニティ トピックBBS ページ
		now_url_kind = "bbs";
	}else if( str_url.indexOf( "http://mixi.jp/list_bbs.pl", 0 ) == 0 ){
		// コミュニティ BBSリスト ページ
		now_url_kind = "topic";
	}else if( str_url.indexOf( "http://mixi.jp/view_event.pl", 0 ) == 0 ){
		// コミュニティ イベントBBS ページ
		now_url_kind = "event";
	}else if( str_url.indexOf( "http://mixi.jp/view_enquete.pl", 0 ) == 0 ){
		// コミュニティ イベントBBS ページ
		now_url_kind = "enquete";
	}else if( str_url.indexOf( "http://mixi.jp/show_friend.pl", 0 ) == 0 ){
		// ユーザー ページ
		now_url_kind = "friend";
	}

	// 対応ページ種別チェック
	if( now_url_kind != "" ){
		// スタイルを設定
		SetPUStyle();
		// マウスイベント設定
		window.addEventListener("mousemove",On_MouseMove,false);
		// 現在時刻記録
		TimeLogPut();
		// リンクにマウス属性追加
		LinkAddMouseElmts();
	}
})();



// グローバルデータ初期化
function InitFunc(){
	bLinkMouseover = false; // マウスオーバー(リンク上にマウス)状態
	bActiveGuidShowTimer = false; // PUGuideタイマー起動状態
	bActivePUGuideShow = false; // ポップアップGuide表示状態
	bActiveGuideOffTimer = false; // PUGuide表示消去タイマー起動状態
	bGuideMouseover = false; // ポップアップマウスオーバー
	bActiveHttpRequest = false; // HTTPリクエスト状態
	bActivePUContentsShow = false; // ポップアプContents表示状態
	bActiveContentsOffTimer = false;// PUContents表示消去タイマー起動状態
	bContentsMouseover = false; // コンテンツマウスオーバー

	now_url_kind = ""; // 現在表示ページ - "bbs" もしくはr "log" (コミュ or 足跡) の種別
	link_url = ""; // マウス位置のリンク(プロフorBBS ページURL)
	last_link_url = ""; // 前回表示したプロフページURL
	last_link_data = ""; // 前回表示したプロフページデータ
	httpObj = ""; // httpデータ取得用 オブジェクト

	const_m_to_p_interval_x = 70; // マウスとポップアップ表示位置の間隔
	const_wait_time_total = 3000; // 表示待機時間　書き換え無し
	const_wait_time_base = 500;
	const_popupoff_wait_time = 300; // PUGuide消去待機時間　書き換え無し
	timer_id = 0;
	guideoff_timer_id = 0; // PUGタイマーID
	contentsoff_timer_id = 0; // PUCタイマーID
	const_friend_url = "show_friend.pl"; // ユーザーページ
	const_z_index = 15; // z座標 重なり防止 10以上ならOK

	const_scrollbar_w = 17; // スクロールバーの幅
	const_prof_width = 435; // プロフの横サイズ
	const_bbs_width = 716; // bbsの横サイズ

	// 取得http種別
	const_accses_error = "ac_error";
	const_comment_error = "come_error";
	const_not_error = "not_error";
	link_http_kind = const_not_error;

	// 足跡コールバックマーク用
	now_http_req_kind = "";
}


/////////////////////////////////////////////////////////////////
// 足跡コールバックマーク

// PUGuide表示タイマーを起動
function SetTimer_LogCallBack(){
	var const_log_call_wait_time = 3000;	//表示遅延用
	setTimeout( LogCallBackMark, const_log_call_wait_time );
}


// 足跡戻りマーク取得用 httpリクエスト呼び出し
function LogCallBackMark(){
	var accses_url = "http://mixi.jp/show_log.pl";
	if(	now_http_req_kind == "log_self" ) accses_url = "http://mixi.jp/show_self_log.pl";
	HttpRequest(accses_url);
}




// 足跡の戻りをマークする
function HttpRecvLogCallbackMark(str_http_recv){
	// 抽出
	var str_extra = "\0";
	if( now_http_req_kind == "log_self"){
		str_extra = TagExtraction( str_http_recv, '<ul class="logList02">', '/ul>', '<ul');
	}else if( now_http_req_kind == "log"){
		str_extra = TagExtraction( str_http_recv, '<ul class="logList01">', '/ul>', '<ul');
	}
	if( str_extra == "\0" ) return ;

	var add_img_tag = '<img src="http://img.mixi.jp/img/emoji/217.gif" alt="リサイクル" width="16" height="16">';

	var elements = document.getElementsByTagName("span");
	for( var num= 0; num < elements.length ; num++ ){
		// クラス名が"name"出ない場合は再ループ
		if( elements[num].className != "name" ) continue;
		var link_elements = elements[num].getElementsByTagName("a");
		if( link_elements.length <= 0 ) continue;
		// 属性からリンクを取得
		var link_str = link_elements[0].getAttribute('href');

		// 抽出文字列から 同名リンクを探す
		if( str_extra.indexOf( link_str, 0 ) == -1 ) continue;
		elements[num].innerHTML += add_img_tag;
		// マウスイベント再設置
		link_elements[0].addEventListener( 'mouseover', function(){ On_LinkMouseover(this) }, true);
		link_elements[0].addEventListener( 'mouseout', function(){ On_LinkMouseout() }, true);
	}
	now_http_req_kind = "";
}


// 足跡コールバックマーク
/////////////////////////////////////////////////////////////////





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
	element.innerHTML= '<div id="popup_title"></div><div id="prof_popup"></div><div id="bbs_popup"></div>';
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
	// プロフページのリンク
	var elements = document.getElementsByTagName("a");
	for( var num= 0; num < elements.length ; num++ ){
		// 属性からリンクを取得
		var link_str = elements[num].getAttribute('href');

		if( -1 != link_str.indexOf( const_friend_url, 0 ) ){
			// 個人ページURL	// マウスイベント設定
			elements[num].addEventListener( 'mouseover', function(){ On_LinkMouseover(this) }, true);
			elements[num].addEventListener( 'mouseout', function(){ On_LinkMouseout() }, true);

		}else if( -1 != link_str.indexOf( "view_bbs.pl?", 0 ) ){
			// BBSページURLチェック
			// マウスイベントを設定しないURL("全てを表示"はヤバイと思うのよ）
			if( -1 != link_str.indexOf( "&page=all", 0 ) ) continue ;
			// マウスイベント設定
			elements[num].addEventListener( 'mouseover', function(){ On_LinkMouseover(this) }, true);
			elements[num].addEventListener( 'mouseout', function(){ On_LinkMouseout() }, true);

		}else if( -1 != link_str.indexOf( "view_event.pl?", 0 ) ){
			// マウスイベントを設定しないURL("全てを表示"はヤバイと思うのよ）
			if( -1 != link_str.indexOf( "&page=all", 0 ) ) continue ;
			// マウスイベント設定
			elements[num].addEventListener( 'mouseover', function(){ On_LinkMouseover(this) }, true);
			elements[num].addEventListener( 'mouseout', function(){ On_LinkMouseout() }, true);
		}
/*		}else if( 0 == link_str.indexOf( "view_enquete.pl?", 0 ) ){
			// マウスイベントを設定しないURL("全てを表示"はヤバイと思うのよ）
			if( -1 != link_str.indexOf( "&page=all", 0 ) ) continue ;
			// マウスイベント設定
			elements[num].addEventListener( 'mouseover', function(){ On_LinkMouseover(this) }, true);
			elements[num].addEventListener( 'mouseout', function(){ On_LinkMouseout() }, true);
		}
*/
	}
}


// ポップアプガイドに属性追加 v2
function PUGuideAddElmts(){
	var element = document.getElementById("popup_guide");
	element.style.display = 'none';

	element.style.width = "0px";
	element.style.zIndex = const_z_index;

	// マウスイベント設定
	element.addEventListener( 'mouseover', function(){ On_PUGuideMouseover() }, true);
	element.addEventListener( 'mouseout', function(){ On_PUGuideMouseout() }, true);
}

// ポップアプコンテンツに属性追加
function PUContentsAddElmts(){
	var element = document.getElementById("contents_popup");
	element.style.display = 'none';
	element.style.width = "0px";
	element.style.zIndex = const_z_index;

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

	// プロフィールURL取得
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
	element.style.background = '#F5DEB3';
	element.style.color = '#8B4513';

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
	if( httpObj ) httpObj.abort();
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
	timer_id = setTimeout( CallBack_TimerPUGuide, GetWaitTime() );
}

// PUGuide消去待機タイマー
function SetTimer_PUGuideOff(){
	guideoff_timer_id = setTimeout( CallBack_TimerPUGuideOff, const_popupoff_wait_time );
	bActiveGuideOffTimer = true;
}

// PUContents消去待機タイマー
function SetTimer_PUContentsOff(){
	contentsoff_timer_id = setTimeout( CallBack_TimerPUContentsOff, const_popupoff_wait_time );
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
	if(!httpObj) httpObj = new XMLHttpRequest();
	httpObj.open("GET", access_url, true);
	httpObj.onreadystatechange = CallBack_HttpReqRyStChange;
	httpObj.send(null);
}

// Http取得時 コールバックメソッド
function CallBack_HttpReqRyStChange(){
	// memo == 0 を == 200に変える事
	if( httpObj ){
		if ( (httpObj.readyState == 4) && (httpObj.status == 200)) {
			bActiveHttpRequest = false;
			// 読み込み完了
			HttpRecvComplete();
		}
	}
}


/////////////////////////////////////////////////////////////////


// Http読み込み完了
function HttpRecvComplete(){
	if(!httpObj) return ;

	// 足跡コールバックマーク
	if( ( now_http_req_kind == "log")||( now_http_req_kind == "log_self" ) ){
		HttpRecvLogCallbackMark(httpObj.responseText);
		return ;
	}

	// コンテンツタグ作成
	CreatePUContentsTag();
	// データ成型
	CastingLinkData(httpObj.responseText);
	// 読み込みデータチェック
	if( link_http_kind != const_accses_error ){
		// 読み込みOK バックアップ
		last_link_data = document.getElementById("contents_popup").innerHTML;
		last_link_url = link_url;
	}
	// ポップアップ
	PUContentsShow();
	// 現在時刻 記録
	TimeLogPut();
}


// データ成型
function CastingLinkData(str_casting){
	link_http_kind = const_not_error;
	var str_contents = "\0";
	// 抽出タグ設定 Prof or bbs
	if( -1 != link_url.indexOf( const_friend_url, 0 ) ){
		// ユーザーページ
		var str_link_contents = TagExtraction( str_casting, '<div id="profile">', '/div>', '<div');
		// 読み込みデータチェック
		if( str_link_contents == "\0" ){
			// アクセスエラー
			link_http_kind = const_accses_error;
			document.getElementById("prof_popup").innerHTML = "\0";
			document.getElementById("popup_title").innerHTML = "\0";
			return ;
		}
		// タイトル追加
		var str_title = TagExtraction( str_link_contents, '<div class="heading01">', '/div>', '<div');
		document.getElementById("popup_title").innerHTML = str_title;
		str_contents = TagDelete( str_link_contents, '<div class="heading01">', '/div>', '<div');
		document.getElementById("prof_popup").innerHTML = str_contents;
		return ;
	}

	if( -1 !== link_url.indexOf( "view_bbs.pl?", 0 ) ){
		// コミュニティページ
		var str_link_contents = TagExtraction( str_casting, '<div id="bbsComment">', '/div>', '<div');
		// 読み込みデータチェック
		if( str_link_contents == "\0" ){
			// アクセスエラー
			link_http_kind = const_accses_error;
			document.getElementById("prof_popup").innerHTML = "\0";
			document.getElementById("popup_title").innerHTML = "\0";
			return ;
		}
		// タイトル追加
		var str_title = TagExtraction( str_link_contents, '<div class="heading02">', '/div>', '<div');
		if( str_title == "\0" ){
			// コメント0件
			link_http_kind = const_comment_error;
			return ;
		}
		document.getElementById("popup_title").innerHTML = str_title;
		str_contents = TagDelete( str_link_contents, '<div class="heading02">', '/div>', '<div');
		document.getElementById("bbs_popup").innerHTML = str_contents;
		return ;
	}

	if( -1 !== link_url.indexOf( "view_event.pl?", 0 ) ){
		// イベントページ
		var str_link_contents = TagExtraction( str_casting, '<div id="eventComment">', '/div>', '<div');
		if( str_link_contents == "\0" ){
			// アクセスエラー
			link_http_kind = const_accses_error;
			document.getElementById("bbs_popup").innerHTML = "\0";
			document.getElementById("popup_title").innerHTML = "\0";
			return ;
		}
		// タイトル追加
		var str_title = TagExtraction( str_link_contents, '<div class="heading02">', '/div>', '<div');
		if( str_title == "\0" ){
			// コメント0件
			link_http_kind = const_comment_error;
			return ;
		}
		document.getElementById("popup_title").innerHTML = str_title;
		str_contents = TagDelete( str_link_contents, '<div class="heading02">', '/div>', '<div');
		document.getElementById("bbs_popup").innerHTML = str_contents;
		return ;
	}
/*
	if( 0 == link_url.indexOf( "view_enquete.pl?", 0 ) ){
		// アンケートページ
		var str_link_contents = TagExtraction( str_casting, '<div id="enqueteComment">', '/div>', '<div');
		if( str_link_contents == "\0" ){
			// アクセスエラー
			link_http_kind = const_accses_error;
			document.getElementById("bbs_popup").innerHTML = "\0";
			document.getElementById("popup_title").innerHTML = "\0";
			return ;
		}
		// タイトル追加
		var str_title = TagExtraction( str_link_contents, '<div class="heading02">', '/div>', '<div');
		if( str_title == "\0" ){
			// コメント0件
			link_http_kind = const_comment_error;
			return ;
		}
		document.getElementById("popup_title").innerHTML = str_title;
		str_contents = TagDelete( str_link_contents, '<div class="heading02">', '/div>', '<div');
		document.getElementById("bbs_popup").innerHTML = str_contents;
		return ;
	}
*/
	return ;
}


// プロフィールデータ抽出
//function TagExtraction( SrcStr ){
// 引数指定 例<div id="profile"> ～ </div>を取得
// 第1引数 htmlデータ 引数指定 - 例 str_data
// 第2引数 抽出タグ先頭全体文字列 引数指定 - 例 '<div id="profile">'
// 第3引数 タグ終了文字列 引数指定 - 例 "/div>"
// 第4引数 同名入れ子タグ対策 引数指定 - 例 "<div"
function TagExtraction( SrcStr, tag_top_all_str, tag_end, tag_top_part ){
	var startPos = SrcStr.indexOf( tag_top_all_str ,0);
	if(startPos == -1) return "\0";

	var checkStartPos = SrcStr.indexOf( ">" , startPos);
	if(checkStartPos == -1) return "\0";

	var endPos = checkStartPos;

	// カウントを加算
	var cnt = 1;

	// カウントが０になるまでループ
	while( cnt != 0 ){
		// 終了タグ探す
		endPos = SrcStr.indexOf( tag_end , endPos);
		if(endPos == -1) return "\0";
		// 終了タグの終わりまで移動
		endPos = SrcStr.indexOf( ">" , endPos);
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
	return SrcStr.slice(startPos, endPos+1);
}


// プロフィールデータ一部消去
//function TagDelete( SrcStr ){
// 引数指定 例<div id="profile"> ～ </div>を削除
// 第1引数 htmlデータ 引数指定 - 例 str_data
// 第2引数 抽出タグ先頭全体文字列 引数指定 - 例 '<div id="profile">'
// 第3引数 タグ終了文字列 引数指定 - 例 "/div>"
// 第4引数 同名入れ子タグ対策 引数指定 - 例 "<div"
function TagDelete( SrcStr, tag_top_del_str, tag_end, tag_top_part ){
	var startPos = SrcStr.indexOf( tag_top_del_str ,0);
	if(startPos == -1) return SrcStr;

	var checkStartPos = SrcStr.indexOf( ">" , startPos);
	if(checkStartPos == -1) return SrcStr;

	var endPos = checkStartPos;

	// カウントを加算
	var cnt = 1;

	// カウントが０になるまでループ
	while( cnt != 0 ){
		// 終了タグ探す
		endPos = SrcStr.indexOf( tag_end , endPos);
		if(endPos == -1) return SrcStr;
		// 終了タグの終わりまで移動
		endPos = SrcStr.indexOf( ">" , endPos);
		if(endPos == -1) return SrcStr;

		// カウントを減らす
		cnt -=1;

		while(1){
			// 終了タグの前に開始タグが無いかをチェック
			var checkPos = SrcStr.indexOf( tag_top_part , checkStartPos);
			if(checkPos == -1) break;

			if( endPos > checkPos ){
				// 開始タグが終了タグの前にあったのでカウント加算
				checkStartPos = SrcStr.indexOf( ">" , checkPos);
				if( checkStartPos == -1 ) return SrcStr
				cnt +=1;
			}else{
				// チェックOK
				break;
			}
		}
	}
	return SrcStr.slice(0,startPos) + SrcStr.slice(endPos+1);
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
	element.style.height = "20px";
	element.style.border = "1px solid #FF8C00";
	element.style.background = '#FFEFD5';
	element.style.color = '#1E90FF';

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
	var deta_element;
	if( 0 == last_link_url.indexOf( const_friend_url, 0 ) ){
		// ユーザーページ
		deta_element = document.getElementById("prof_popup");
	}else{
		// bbsページ
		deta_element = document.getElementById("bbs_popup");
	}

	if( link_http_kind == const_not_error ){
		// 通常ポップアプ表示位置 設定
		SetPUContentsShowPos(element);
	}else{
		// エラー用ポップアップ
		var add_top_offset = (Mouse_Top < 50 )? 50 : - 50;
		element.style.top = Mouse_Top + window.pageYOffset + add_top_offset + "px";
		element.style.left = Mouse_Left + window.pageXOffset - 50 + "px";
		element.style.border = "0px";
		if( link_http_kind == const_comment_error ){
				// コメント0件
			element.style.width = "102px";
			element.style.height = "24px";
			document.getElementById("popup_title").innerHTML = '<div class="comment_zero"><h3>コメント（0件）</h3></div>';
		}else if( link_http_kind == const_accses_error ){
			// アクセスエラー
			element.style.width = "122px";
			element.style.height = "24px";
			document.getElementById("popup_title").innerHTML = '<div class="accses_error"><h3>連続アクセスエラー</h3></div>';
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
	if( 0 == last_link_url.indexOf( const_friend_url, 0 ) ){
		// ユーザーページ
		document.getElementById("prof_popup").innerHTML = "";
		document.getElementById("prof_popup").style.height = "0px";

	}else{
		// bbsページ
		document.getElementById("bbs_popup").innerHTML = "";
		document.getElementById("bbs_popup").style.height = "0px";
	}
	// タグ削除
	DeleteTag("contents_popup");
}


// 位置設定
function SetPUContentsShowPos(pu_head){
	var pos_top=0;
	var pos_left=0;
	// クライアントサイズ取得
	var client_height;
	var client_width;
	var title_height;
	var data_element;
	var add_w_siz = 0;
	// 横サイズ設定
	if( 0 == last_link_url.indexOf( const_friend_url, 0 ) ){
		//プロフページ
		pu_head.style.width = const_prof_width + "px";
		data_element = document.getElementById("prof_popup");
	}else{
		// bbsページ
		pu_head.style.width = const_bbs_width + "px";
		data_element = document.getElementById("bbs_popup");
	}

	pu_head.style.height = "auto";
	data_element.style.height = "auto";
	// 一度スクロールを消す -ズレ防止
	data_element.style.overflow = "visible";

	// オブジェクトの高さの取得 - 一端表示させて取得後消す(チラツキは出ないようです)
	pu_head.style.display = 'inline';

	var popup_height = pu_head.clientHeight;
	var popup_width = pu_head.clientWidth;
	title_height = document.getElementById("popup_title").clientHeight;
	pu_head.style.display = 'none';

	//現在開いてるページ クライアントサイズ取得
	client_height = document.documentElement.clientHeight;
	client_width = document.documentElement.clientWidth;

	// pos.top設定
	// リンク先縦サイズがクライアント領域より小さい場合
	if( popup_height < client_height -2 ){
		var pupup_h_half = popup_height/2;
		// マウス座標からポップアップの半分のサイズ上
		pos_top = Mouse_Top - pupup_h_half;
		if( pos_top < 0 ){
			// 上がはみ出た場合
			pos_top = 0;
		}else if(client_height < pos_top + popup_height + 2 ){
			// 下がはみ出た場合
			pos_top = client_height - popup_height - 2;
		}
	}else{
		// リンク先縦サイズがクライアント領域より大きい
		// スクロール設定
		data_element.style.overflow = "auto";

		pu_head.style.height = client_height - 2 + "px";
		data_element.style.height = client_height - 2 - title_height +"px";
		// スクロールサイズ加算
		add_w_siz = const_scrollbar_w;
	}

	// pos.left設定
	// ポップアップウィンドウがクライアント領域からはみ出る場合
	pos_left = Mouse_Left+ const_m_to_p_interval_x;
	if( (pos_left + popup_width + add_w_siz) > client_width -2 ){
		pos_left = client_width - popup_width - add_w_siz -2;
	}

	// スクロールサイズ加算
	pu_head.style.width = popup_width + add_w_siz + "px";

	pu_head.style.top = pos_top + window.pageYOffset + "px";
	pu_head.style.left = pos_left + window.pageXOffset + "px";
}


/////////////////////////////////////////////////////////////////


// タイマーで呼び出すまでの時間取得
function GetWaitTime(){
	var now_time = GetTime();
	var ret_df = const_wait_time_total - (now_time - log_time);
	return (ret_df < const_wait_time_base) ? const_wait_time_base : ret_df;
}

// 時間記録
function TimeLogPut(){
	log_time = GetTime();
}

// 現時刻取得
function GetTime(){
	var now = new Date();
	return now.getTime()
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
padding:absolute;
margin:0px;
position:absolute;
border:1px solid #FF8C00;
width:0px;
height:0px;
background:#FFEFD5;
color:#1E90FF;
}


/* ------------------------------
ポップアップウィンドウ
------------------------------ */

div#contents_popup{
position:absolute;
background:#ffffff;
border:1px solid #FF8C00;
color:#6c6c6c;
padding:absolute;
margin:0px;
width:0px;
z-index:15;
}



/* ------------------------------
タイトル
------------------------------ */

/*プロフタイトル*/
div#popup_title div.heading01 h2{
height:30px;
background:url(http://img.mixi.jp/img/basic/heading/body_contents001.gif) repeat-x 0% 0%;
line-height:26px;
padding:0px 0px 0px 21px;
margin:0px 0px 0px 0px;
font-size:100%;
font-weight:bold;
font-style:normal;
z-index:15;
}

/*bbsタイトル*/
div#popup_title div.heading02 h3{
width:690px;
height:24px;
padding:0 5px 0 21px;
background:url(http://img.mixi.jp/img/basic/heading/body_main_area001.gif) repeat-x 0% 0%;
line-height:24px;
clear:both;
display:inline-block;
font-weight:bold;
z-index:15;
}

/* コメント 0件*/
div#popup_title div.comment_zero h3{
width:100px;
height:24px;
padding:0 5px 0 21px;
border:2px solid #FF8C00;
background:#FFEFD5;
color:#000000;
line-height:24px;
clear:both;
display:inline-block;
font-weight:bold;
z-index:15;
}

/* アクセスエラー */
div#popup_title div.accses_error h3{
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


/* ------------------------------
プロフィール
------------------------------ */

div#prof_popup{
font-size:100%;
font-weight:normal;
font-style:normal;
padding:0px 0px 0px 0px;
margin:0px 0px 0px 0px;
overflow:auto;
}

div#prof_popup div h2{
font-size:100%;
font-weight:normal;
font-style:normal;
padding:0px 0px 0px 0px;
margin:0px 0px 0px 0px;
}


div#prof_popup ul{
padding:0px 0px 4px 4px;
margin:0px 0px 0px 0px;
border:1px solid #E0E0E0;
background:#F2F2F2;
}

div#prof_popup ul li{
padding:5px 0px 0px 0px;
margin:2px 0px 0px 0px;
list-style:none;
background:url(http://img.mixi.jp/img/basic/common/bg_profile_top002.gif) no-repeat 0% 0%;
}

div#prof_popup ul li dl{
padding:0px 5px 0px 0px;
background:#fff url(http://img.mixi.jp/img/basic/common/bg_profile_bottom001.gif) no-repeat 0% 100%;
zoom:1;
}

div#prof_popup ul li dl:after{
content:".";
display:block;
height:0;
clear:both;
visibility:hidden;
}

div#prof_popup ul li dl dt{
float:left;
width:73px;
padding:0px 0px 0px 5px;
color: #3F3F3F;
letter-spacing:0.05em;
}


div#prof_popup ul li dl dd{
float:right;
width:340px;
word-break:break-all;
overflow:hidden;
margin:0px 3px 0px 0px;
vertical-align:top;
color: #3F3F3F;
letter-spacing:0.05em;
}

div#prof_popup ul li dl dd.userInput{
height:70px;
width:10x;
border: 1px solid #696969;
overflow:auto;
}

div#prof_popup ul li dl dd img{
_margin-top:3px;
margin-left:10px;
vertical-align:middle;
*vertical-align:-1%;
}

div#prof_popup ul li dl dd img.emoji{
vertical-align:bottom;
*vertical-align:-1%;
_margin-top:0;
margin-left:0;
}




/* ------------------------------
BBS
------------------------------ */
div#bbs_popup{
overflow:auto;
color:#333333;
}


div#bbs_popup dl.commentList01 dt.commentDate{
height:22px;
}

div#bbs_popup dl.commentList01 dt.commentDate span{
position:relative;
right:auto;
bottom:auto;
}

div#bbs_popup dl.commentList01 dt.commentDate span.senderId{
float:left;
text-align:left;
padding-left:9px;
width:20em;
font-weight:bold;
font-family:Verdana;
}

div#bbs_popup dl.commentList01 dt.commentDate span.senderId input{
margin-right:5px;
}

div#bbs_popup dl.commentList01 dt.commentDate span.date{
float:right;
left:0;
top:0;
display:block;
width:40%;
text-align:right;
padding-right:10px;
}

div#bbs_popup dl.commentList01{
border-bottom:1px solid #DDC49C;
}

div#bbs_popup dl.commentList01 dt.commentDate{
width:714px;
*height:20px;
border:1px solid #DDC49C;
border-bottom:none;
background:#F5E9D4;
color:#B5966B;
font-weight:bold;
line-height:1.8;
}

div#bbs_popup dl.commentList01 dt.commentDate input{
border:1px solid #F2DDB7;
background:#FDF9F2;
vertical-align:middle;
}

div#bbs_popup dl.commentList01 dt.commentDate p{
padding-left:5px;
}

div#bbs_popup div#bbsComment{
margin-top:0px;
clear:both;
}

]]></>); 

}

// 修正01 コミュ- トピック&イベント スタイルシート適用バグ修正
// 修正02 ドロップダウンメニューバグ ＋ PU消去改善
// 修正03 コメント0件トピ表示改善
// 修正04 足跡コールバックマーク内包
