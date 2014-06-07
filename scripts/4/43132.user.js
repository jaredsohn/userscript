// ==UserScript==
// @name mixi_skin_ver01
// @namespace akage_no_fan
// @description http://mixi.jp/*
// @include http://mixi.jp/*
// ==/UserScript==


// 名前空間
(function(){
//
// クラス定義
//


//--------------------------------------------------
// http class
var CHttpReq = function(){
	this.m_bActiveHttpReq = false;
	this.m_SkHttpObj = null;
	this.m_data = null;
	this.m_cbfunc_reqcomp = null;
}

// Http取得リクエストコールバックメソッド
// - privateメソッド
CHttpReq.prototype.SK_HttpReqCB = function(ThisObj){
	if( ThisObj.m_SkHttpObj == null ) return;
	if ( (ThisObj.m_SkHttpObj.readyState == 4) && (ThisObj.m_SkHttpObj.status == 200)) {
		ThisObj.m_bActiveHttpReq = false;
		ThisObj.m_data = ThisObj.m_SkHttpObj.responseText;
		// 読み込み完了
		ThisObj.m_cbfunc_reqcomp();
	}
}

// Http取得リクエスト
CHttpReq.prototype.SK_HttpReq = function( access_url, callbackfunc_reqcomp ){

	if( this.m_bActiveHttpReq == true ) return ;
	// リクエストON
	this.m_bActiveHttpReq = true;
	this.m_cbfunc_reqcomp = callbackfunc_reqcomp;

	if( this.m_SkHttpObj == null ) this.m_SkHttpObj = new XMLHttpRequest();
	this.m_SkHttpObj.open("GET", access_url, true);
	// Http取得時 コールバックメソッド設定
	var tmpFunc = this.SK_HttpReqCB;
	var tmpThis = this;
	this.m_SkHttpObj.onreadystatechange = function(){ tmpFunc(tmpThis) };
	this.m_SkHttpObj.send(null);
}
// http class
//--------------------------------------------------


//--------------------------------------------------
// picture class 画像URL取得用クラス

var CPicture =  function(){
	this.m_HttpReqObj = null;
	this.m_pictureURL = "\0";
	this.m_cbfunc_piccomp = null;
	this.m_id = null;
}

// コールバック受付
// - privateメソッド
CPicture.prototype.SK_CBPictureReq = function(ThisObj){
//	alert("cb id = "+ ThisObj.m_id);

	// 画像タグ 属性抽出
	ThisObj.m_pictureURL = SK_AttriExtr( ThisObj.m_HttpReqObj.m_data, "img", "SRC" );
	// 取得完了メソッド
	ThisObj.m_cbfunc_piccomp();
}

// HTTP画像URL取得
// - 外部公開
CPicture.prototype.SK_PictureReq = function( access_url, pic_id, callbackfunc_piccomp ){
	this.m_HttpReqObj = new CHttpReq();
	this.m_cbfunc_piccomp = callbackfunc_piccomp;
	this.m_id = pic_id;
	var tmpFunc = this.SK_CBPictureReq;
	var tmpThis = this;
	this.m_HttpReqObj.SK_HttpReq( access_url,  function(){ tmpFunc(tmpThis) } );
}
// picture class
//--------------------------------------------------



//--------------------------------------------------
// skin parts class スキンデータクラス

//
// コンストラクタ
//
var CSkinParts =  function(){
	this.m_tag_name = "\0";
	this.m_PicObjArray = null;
	this.m_fcArray = null;
	this.m_bdrArray = null;
	this.m_bgArray = null;
	this.m_rpt_data = "\0";
	this.m_bgCompFlgArray = null;
	this.m_bg_loopFlg = true;
	this.m_fc_loopFlg = true;
	this.m_bdr_loopFlg = true;
	this.m_bg_time = 0;
	this.m_fc_time = 0;
	this.m_bdr_time = 0;
	this.m_bg_show_cnt	= 0;
	this.m_fc_show_cnt	= 0;
	this.m_bdr_show_cnt	= 0;
	this.m_bg_show_call_flg = false;
}

//
// クラス変数
//

// URL種別
CSkinParts.sm_rul_kind = null;


// 現在のBGデータ取得
// - public
CSkinParts.prototype.SK_GetNowBg = function(){
//	if( this.m_bg_loopFlg == false ) return "\0";
	if( this.m_bgArray == null ) return "\0";
	if( this.m_bgArray.length == 0 ) return "\0";
	var now = (this.m_bg_show_cnt== 0)? 0 : this.m_bg_show_cnt % this.m_bgArray.length;
//	if( this.m_bgCompFlgArray[now] == false) return "\0"; 
	if( this.m_bgArray[now] == "#loop_stop" ){
		this.m_bg_loopFlg = false;
		return "\0";
	}
	if( this.m_bgArray.length == 1 ) this.m_bg_loopFlg = false;
	return this.m_bgArray[now];
}

// 現在のFCデータ取得
// - public
CSkinParts.prototype.SK_GetNowFc = function(){
//	if( this.m_fc_loopFlg == false ) return "\0";
	if( this.m_fcArray == null ) return "\0";
	if( this.m_fcArray.length == 0 ) return "\0";
	var now = (this.m_fc_show_cnt== 0)? 0 : this.m_fc_show_cnt % this.m_fcArray.length;
	if( this.m_fcArray[now] == "#loop_stop" ){
		this.m_fc_loopFlg = false;
		return "\0";
	}
	if( this.m_fcArray.length == 1 ) this.m_fc_loopFlg = false;
	return this.m_fcArray[now];
}

// 現在のBDRデータ取得
// - public
CSkinParts.prototype.SK_GetNowBdr = function(){
//	if( this.m_bdr_loopFlg == false ) return "\0";
	if( this.m_bdrArray == null ) return "\0";
	if( this.m_bdrArray.length == 0 ) return "\0";
	var now = (this.m_bdr_show_cnt== 0)? 0 : this.m_bdr_show_cnt % this.m_bdrArray.length;
	if( this.m_bdrArray[now] == "#loop_stop" ){
		this.m_bdr_loopFlg = false;
		return "\0";
	}
	if( this.m_bdrArray.length == 1 ) this.m_bdr_loopFlg = false;
	return this.m_bdrArray[now];
}

// 画像読み込み完了通知
// - privateメソッド
CSkinParts.prototype.SK_CBPictureComp = function( ThisObj ){
	var comp_id = null;
	for( var num =0 ; num < ThisObj.m_PicObjArray.length ; num++ ){
		var pic_m_id = ThisObj.m_PicObjArray[num].m_id;
		if( ThisObj.m_bgArray[pic_m_id] != ThisObj.m_PicObjArray[num].m_pictureURL ){
			ThisObj.m_bgArray[pic_m_id] = ThisObj.m_PicObjArray[num].m_pictureURL;
			ThisObj.m_bgCompFlgArray[pic_m_id] = true;
			comp_id = pic_m_id;
			break;
		}
	}

	if( comp_id != null ){
		if( ThisObj.m_bg_show_call_flg == false ){
			if( ThisObj.m_bg_show_cnt == comp_id ){
				ThisObj.SK_SetBGStyle(ThisObj);
			}	
		}
	}
}

// スキンパーツタイマー設定
// - public
CSkinParts.prototype.SK_SetTimer = function( bg_timer, fc_timer, bdr_timer){
	this.m_bg_time = bg_timer;
	this.m_fc_time = fc_timer;
	this.m_bdr_time = bdr_timer;
}


// スキンパーツデータ設定
// - public
CSkinParts.prototype.SK_SetData = function( tag_name, rptDt, bgArr, fcArr, bdrArr ){
	//画像設定
	this.m_rpt_data = rptDt;
	this.m_tag_name = tag_name;
	this.m_fcArray = fcArr;
	this.m_bdrArray = bdrArr;
	if(bgArr == null) return ;
	// バックグラウンド設定
	if( this.m_bgArray == null ){
		this.m_bgArray = new Array();
		this.m_bgCompFlgArray = new Array();
	}
	for(var num=0; num<bgArr.length; num++ ){
		if( bgArr[num].indexOf("#", 0) == 0){
			this.m_bgArray[num] = bgArr[num];
			this.m_bgCompFlgArray[num] = true;
			continue;
		}
		// 初期化しておく
		this.m_bgArray[num] = "\0";
		this.m_bgCompFlgArray[num] = false;
		// URL間違いを切る
		if( ( bgArr[num].indexOf("show_diary_picture.pl?", 0) != 0 )
		  &&(  bgArr[num].indexOf("show_bbs_picture.pl?", 0) != 0 )
		  &&(  bgArr[num].indexOf("show_bbs_comment_picture.pl?", 0) != 0 )){
			continue;
		}

		// 配列作成
		if( this.m_PicObjArray == null ){
			this.m_PicObjArray = new Array();
		}

		//画像読み込み
		var tmpThis = this;
		var tmpFunc = this.SK_CBPictureComp;
		var pic_num = this.m_PicObjArray.length;
		this.m_PicObjArray[pic_num] = new CPicture();
		this.m_PicObjArray[pic_num].SK_PictureReq( bgArr[num], num, function(){ tmpFunc( tmpThis ) });
	}
}


// スキン切り替え表示
// - public
CSkinParts.prototype.SK_ShowSkin = function(){
	// 各スタイル設定
	this.SK_SetBDRStyle(this);
	this.SK_SetFCStyle(this);
	this.SK_SetBGStyle(this);
}


// background スタイル設定
CSkinParts.prototype.SK_SetBGStyle = function( ThisObj ){
	// backgroundデータ取得
	var bg_dt = ThisObj.SK_GetNowBg();
	if( bg_dt == "\0"){
		ThisObj.m_bg_show_call_flg = false;
		return ;
	}	

//	if( bg_dt == "#loop_stop") alert(bg_dt);
	var bg_style;
	if( bg_dt.indexOf("#", 0) == 0){
		if( bg_dt.indexOf("#transparent",0) != -1 ) bg_dt = "transparent";
		bg_style = "background:" + bg_dt + ";";
	}else{
		bg_style = "background:url(" + bg_dt + ") "
		if( ThisObj.m_rpt_data != "\0" ){
			bg_style += ThisObj.m_rpt_data ;
		}
		bg_style += ";";
	}

	//セレクタ取得
	var set_style = ThisObj.SK_GetSylSlctr( ThisObj.m_tag_name, "bg" );
	if( set_style == "\0"){
		ThisObj.m_bg_show_call_flg = false;
		return ;
	}
	set_style += "{" + bg_style;
	set_style += "}";
	// スタイル
	SK_addStyle( set_style, ThisObj.m_tag_name + "bg" );

	// タイマーセット
	if( ThisObj.m_bg_time != 0 ){
		if(	ThisObj.m_bg_loopFlg == false ) return;
		// 表示カウントを移動
		ThisObj.m_bg_show_cnt++;
		var tmpFunc = ThisObj.SK_SetBGStyle;
		var wait_time = ThisObj.m_bg_time;
		ThisObj.m_bg_show_call_flg = true;
		setTimeout( function(){ tmpFunc(ThisObj) }, wait_time);
	}
}

// font color スタイル設定
CSkinParts.prototype.SK_SetFCStyle = function(ThisObj){
	// font color データ取得
	var fc_dt = ThisObj.SK_GetNowFc();
	if( fc_dt == "\0") return ;

	//セレクタ取得
	var set_style = ThisObj.SK_GetSylSlctr( ThisObj.m_tag_name, "fc" );
	if( set_style == "\0") return ;
	set_style += "{color:" + fc_dt + ";";
	set_style += "}";
	// スタイル
	SK_addStyle( set_style, ThisObj.m_tag_name + "fc" );

	// タイマーセット
	if( ThisObj.m_fc_time != 0 ){
		if(	ThisObj.m_fc_loopFlg == false ) return;
		// 表示カウントを移動
		ThisObj.m_fc_show_cnt++;
		var tmpFunc = ThisObj.SK_SetFCStyle;
		var wait_time = ThisObj.m_fc_time;
		setTimeout( function(){ tmpFunc(ThisObj) }, wait_time);
	}
}

// border color スタイル設定
CSkinParts.prototype.SK_SetBDRStyle = function(ThisObj){
	// border color データ取得
	var bdr_dt = ThisObj.SK_GetNowBdr();
	if( bdr_dt == "\0") return ;

	//セレクタ取得
	var set_style = ThisObj.SK_GetSylSlctr( ThisObj.m_tag_name, "bdr" );
	if( set_style == "\0") return ;
	set_style += "{border-color:" + bdr_dt + ";";
	set_style += "}";
	// スタイル
	SK_addStyle( set_style, ThisObj.m_tag_name + "bdr" );

	// タイマーセット
	if( ThisObj.m_bdr_time != 0 ){
		if(	ThisObj.m_bdr_loopFlg == false ) return;
		// 表示カウントを移動
		ThisObj.m_bdr_show_cnt++;
		var tmpFunc = ThisObj.SK_SetBDRStyle;
		var wait_time = ThisObj.m_bdr_time;
		setTimeout( function(){ tmpFunc(ThisObj) }, wait_time);
	}
}


// セレクタ取得
CSkinParts.prototype.SK_GetSylSlctr = function( tag_name, flg ){

	var serector = "\0";
	switch(tag_name){
	case "body_style":
		serector = "body";
		break;
	case "boxr_title": // 右の箱
		if( flg == "fc" ){
			serector =	"div.bodySubSection h2 a:link,";
			serector +=	"div.bodySubSection h2 a:visited,";
			serector +=	"div.bodySubSection h2 a:hover,";
			serector +=	"div.bodySubSection h2 a:active,";
			serector +=	"div.bodySubSection h2 a:focus";
		}else{
			serector = "div.bodySubSection h2";
		}
		break;
	case "boxr_data":
		if( flg == "bg" ){
			serector = "#help div.contents,";
			serector += "div.bodySubSection div.contents,";
//			serector += "div.bodySubSection div.contents h3,";
			serector += "#help h3,";
			serector += "div.bodySubSection div.contents ul,";
			serector +=	"div.prContents";
		}else if( flg == "bdr" ){
			serector = "div.bodySubSection div.contents,";
			serector +=	"div.prContents,";
			serector +=	"#help h3";
		}else if( flg =="fc" ){
			serector =	"div.radioButton01,";
			serector +=	"#help h3";
		}
		break;
	case "footer_area":
		serector =	"#footerArea ul.footerNavigation01,";
		serector +=	"#footerArea ul.footerNavigation02";
		break;
//	case "debug":
//		serector = "";
//		break;
	}

	if( serector != "\0" ) return serector;

	if( CSkinParts.sm_rul_kind == "user"){
	 	serector = this.SK_GetUserSylSlctr( tag_name, flg );
	}else if( CSkinParts.sm_rul_kind =="commu" ){
	 	serector = this.SK_GetCommuSylSlctr( tag_name, flg );
	}
	return serector;
}

// ユーザーセレクタ取得
CSkinParts.prototype.SK_GetUserSylSlctr = function( tag_name, flg ){
	var serector = "\0";
	switch(tag_name){
	case "page_title":
		// 未実装
		break;
	case "big_title":		
		serector = "#bodyContents div.heading01,";
		serector += "#bodyContents div.heading05";
		break;
	case "sub_title": // 中タイトル
		serector = "#bodyContents div.heading02";
		break;
	case "boxl_title": // 左の箱
		if( flg == "fc" ){
			serector =	"#bodySide div.listBox01 h2 a:link,";
			serector +=	"#bodySide div.listBox01 h2 a:visited,";
			serector +=	"#bodySide div.listBox01 h2 a:hover,";
			serector +=	"#bodySide div.listBox01 h2 a:active,";
			serector +=	"#bodySide div.listBox01 h2 a:focus";
		}else{
			serector = "#bodySide div.listBox01";
		}
		break;
	case "boxl_data":
		serector = "#bodySide div.listBox01 div.contents,#bodySide div.listBoxUtility01";
		break;
	case "photo_frame_in": // 写真
		serector = "#myProfile .contents01";
		break;
	case "photo_frame_out": // 写真
		serector = "#myProfile";
		break;
	case "prof_data":
		serector = "div#profile ul";
		break;
	case "prof_data_dd":
		serector = "div#profile ul dd";
		break;
	case "prof_data_dt":
		serector = "div#profile ul dt";
		break;
	case "renew":
		serector =	"div#newFriendDiary,";
		serector +=	"div#newAlbum,";
		serector +=	"div#newVideo,";
		serector +=	"div#newPlaylist,";
		serector +=	"div#newReview";
		break;
	case "renew_item":
		serector =	"table.iconList02 tr.itemList td";
		break;
	case "intro":
		serector =	"div#intro .contents dl dd";
		serector +=	",div#intro";
		break;
	case "intro_item":
		serector =	"div#intro .contents dl dd p";
		break;
	}
	return serector;
}

// コミュセレクタ取得
CSkinParts.prototype.SK_GetCommuSylSlctr = function( tag_name, flg ){
	var serector = "\0";
	switch(tag_name){
	case "search_area":
		serector =	"div.searchForm02";
		if(flg == "bdr"){
			serector +=	",div.searchForm02 li.input02 input";
		}
		break;
	case "page_title":
		serector = "div.communityTitle001,";
		serector += "div.communityTitle002,";
		serector += "div.communityTitle003";
		break;
	case "big_title":		
		serector = "div.titlebar01";
		break;
	case "sub_title": // 中タイトル
		serector = "div.titlebar02";
		break;
	case "boxl_title": // 左の箱
		if( flg == "fc" ){
			serector =	"div.listTitle a,";
			serector +=	"div.listTitle a:link,";
			serector +=	"div.listTitle a:visited,";
			serector +=	"div.listTitle a:hover";
		}else{
			serector = "#communityMemberList,#communityLinkList";
		}
		break;
	case "boxl_data": // 左の箱 データ部
		serector = "#communityMemberList .contents,";
		serector += "#communityLinkList .contents,";
		serector += ".list_bottom";
		break;
	case "commu_info": // コミュ情報部
		if( flg == "bg" ){
			serector = "#communityInfo";
			serector += ",#communityInfo .contents02";
		}else if(flg == "bdr"){
			serector = "#communityInfo";
		}
		break;
	case "commu_info_data": // コミュ情報 データ部
		if( flg == "fc" ){
			serector = "#communityInfo";
		}else{
			serector = "#communityInfo div.communityProfile";
			serector += ",#communityInfo .contents03";
			serector += ",#communityInfo .contents04";
			serector += ",#communityInfo .contents04 dl";
		}
		break;

	case "commu_intro": // コミュ紹介部
		serector = "#communityIntro";
		break;
	case "renew":
		serector = "#newCommunityTopic,";
		serector += "#newCommunityEvent,";
		serector += "#newCommunityEnquete,";
		serector += "#newCommunityReview";
		break;
	case "renew_item":
		serector =	"table.iconList02 tr.itemList td";
		break;
	}
	return serector;
}


// skin parts class スキンデータクラス
//--------------------------------------------------




//
//メイン関数呼び出し
//

skin_main_func();


//
// 関数定義
//

// メイン関数
function skin_main_func(){
	// ログインページなら抜ける - クッキー対策
	if( document.title == "ソーシャル・ネットワーキング サービス [mixi(ミクシィ)]" ) return ;
	// 初期化
	SK_Init();
	// ドメイン取得
	var str_url = location.href;
	if( ( str_url.indexOf( "show_friend.pl?", 0 ) != -1 )
	  ||( str_url.indexOf("show_profile.pl?", 0) != -1 ) ){
		// プロフからスキン取得
		g_url_kind = "user";
		g_skin_url = SK_GetUserSkinUrl();
	}else if( str_url.indexOf( "view_community.pl?", 0 ) != -1 ){
		g_url_kind = "commu";
		g_skin_url = SK_GetCommuSkinUrl();
	}else{
		// 無関係URL切り
		return ;
	}

	// スキン元判別
	if( g_skin_url.indexOf( "http://mixi.jp/view_bbs.pl?",0) == 0 ){
		// コミュ配布スキン
		g_skin_source = "bbs";
	}else if( g_skin_url.indexOf( "http://mixi.jp/view_diary.pl?i",0) == 0 ){
		// ユーザー配布スキン
		g_skin_source = "diary";
	}else{
		// 配布元異常
		return ;
	}

	// スキンページ取得
	g_SkHttpObj = new CHttpReq();
	g_SkHttpObj.SK_HttpReq(g_skin_url,SK_HttpRecvComp);
}

function SK_Init(){
	g_bActiveHttpReq = false;
	g_SkHttpObj = null;
	g_skin_source = "\0";
	g_url_kind = "\0";
	g_PartsArray = new Array();
	g_TimerObj = null;
	g_common_time = 0 ;
	g_const_start_wait_time = 0;
}

//////////////////////////////////////////////////
// スキンURL

// ホームスキン URL取得
function SK_GetUserSkinUrl(){
	var ret_url = "\0";
	var prof_elmt = document.getElementById("profile");
	var dt_elmts = prof_elmt.getElementsByTagName("dt");
	for( var num= 0; num < dt_elmts.length ; num++ ){
		if( dt_elmts[num].innerHTML != "自己紹介" ) continue;
		dd_elmts = dt_elmts[num].parentNode.getElementsByTagName("dd");
		ret_url = SK_AbstractSkinUrl(dd_elmts[0], "mixi_user_skin");
		if( ret_url == "\0" ) continue;
		break;
	}
	return ret_url;
}

// コミュスキン URL取得
function SK_GetCommuSkinUrl(){
	var comminfo_elmt = document.getElementById("communityIntro");
	return SK_AbstractSkinUrl(comminfo_elmt, "mixi_community_skin");
}

// スキンURL抽出
function SK_AbstractSkinUrl( dd_element, skin_url_tag){
	// スキン書き込み抽出
	var abst_str = SK_ChildTagExtr( dd_element.innerHTML, "&lt;" +skin_url_tag+ "&gt;", "&lt;/" +skin_url_tag+ "&gt;", "&lt;" +skin_url_tag+ "&gt;", "&gt;");
	if( abst_str == "\0" ) return "\0";
	// 属性抽出 - スキンURL
	return SK_AttriExtr(abst_str,"a","href");
}

// スキンURL
//////////////////////////////////////////////////



// Http読み込み完了
function SK_HttpRecvComp(){
	if( g_SkHttpObj == null ) return ;
	// スキンデータ読み込み
	var skin_data = "\0";
	if( g_url_kind == "user"){
		CSkinParts.sm_rul_kind = "user";
		skin_data = SK_ChildTagExtr( g_SkHttpObj.m_data, '&lt;mixi_skin_udt&gt;','&lt;/mixi_skin_udt&gt;','&lt;mixi_skin_udt',"&gt;");
		if( skin_data == "\0" ) return ;
		SK_CommonSettingRead(skin_data);
		SK_UserSkinRead(skin_data);
	}else if( g_url_kind = "commu" ){
		CSkinParts.sm_rul_kind = "commu";
		skin_data = SK_ChildTagExtr( g_SkHttpObj.m_data, '&lt;mixi_skin_cdt&gt;','&lt;/mixi_skin_cdt&gt;','&lt;mixi_skin_cdt',"&gt;");
		if( skin_data == "\0" ) return ;
		SK_CommonSettingRead(skin_data);
		SK_CommuSkinRead(skin_data);
	}

	// スタイルをセット
	SK_SetSkinStyle();
}

// 共通データ読み込み
function SK_CommonSettingRead(skin_dt){
	var change_dt = SK_SubstDtRead( skin_dt, "common_setting", "base_time");
	if( change_dt == "\0" ) return ;
	g_common_time = change_dt;
}

// ユーザースキンデータ読み込み
function SK_UserSkinRead(skin_dt){

	var sk_parts = SK_ChildTagExtr( skin_dt, '&lt;skin_parts&gt;','&lt;/skin_parts&gt;','&lt;skin_parts',"&gt;");
	if( sk_parts == "\0" ) return ;

	// パーツデータ取得
	SK_SkinPartsRead( sk_parts, "body_style" );
//	SK_SkinPartsRead( sk_parts, "page_title" );
	SK_SkinPartsRead( sk_parts, "big_title" );
	SK_SkinPartsRead( sk_parts, "sub_title" );
	SK_SkinPartsRead( sk_parts, "photo_frame_in" );
	SK_SkinPartsRead( sk_parts, "photo_frame_out" );
	SK_SkinPartsRead( sk_parts, "boxl_title" );
	SK_SkinPartsRead( sk_parts, "boxl_data" );
	SK_SkinPartsRead( sk_parts, "boxr_title" );
	SK_SkinPartsRead( sk_parts, "boxr_data" );
	SK_SkinPartsRead( sk_parts, "prof_data" );
	SK_SkinPartsRead( sk_parts, "prof_data_dt" );
	SK_SkinPartsRead( sk_parts, "prof_data_dd" );
	SK_SkinPartsRead( sk_parts, "renew" );
	SK_SkinPartsRead( sk_parts, "renew_item" );
	SK_SkinPartsRead( sk_parts, "intro" );
	SK_SkinPartsRead( sk_parts, "intro_item" );
	SK_SkinPartsRead( sk_parts, "footer_area" );
//	SK_SkinPartsRead( sk_parts, "debug" );

}


// コミュスキンデータセット
function SK_CommuSkinRead(skin_dt){
	var sk_parts = SK_ChildTagExtr( skin_dt, '&lt;skin_parts&gt;','&lt;/skin_parts&gt;','&lt;skin_parts',"&gt;");
	if( sk_parts == "\0" ) return ;

	// パーツデータ取得
	SK_SkinPartsRead( sk_parts, "body_style" );
	SK_SkinPartsRead( sk_parts, "search_area" );
	SK_SkinPartsRead( sk_parts, "page_title" );
	SK_SkinPartsRead( sk_parts, "big_title" );
	SK_SkinPartsRead( sk_parts, "sub_title" );
	SK_SkinPartsRead( sk_parts, "commu_info" );
	SK_SkinPartsRead( sk_parts, "commu_info_data" );
	SK_SkinPartsRead( sk_parts, "commu_intro" );
	SK_SkinPartsRead( sk_parts, "boxl_title" );
	SK_SkinPartsRead( sk_parts, "boxl_data" );
	SK_SkinPartsRead( sk_parts, "boxr_title" );
	SK_SkinPartsRead( sk_parts, "boxr_data" );
	SK_SkinPartsRead( sk_parts, "renew" );
	SK_SkinPartsRead( sk_parts, "renew_item" );
	SK_SkinPartsRead( sk_parts, "footer_area" );

//	SK_SkinPartsRead( sk_parts, "debug" );

}

// スキンパーツ読み取り
function SK_SkinPartsRead( skin_dt, tag_name ){
	var parts_dt = SK_ChildTagExtr( skin_dt, '&lt;'+tag_name+'&gt;','&lt;/'+tag_name+'&gt;','&lt;'+tag_name , "&gt;");
	if( parts_dt == "\0" ) return ;
	// データ取得
	var rpt_dt = SK_SubstDtRead(parts_dt,"background","rpt");
	// データ配列 取得
	var bg_array = SK_SubstArrayDtRead( parts_dt, "background","bg");
	var fc_array = SK_SubstArrayDtRead( parts_dt, "fcolor","clr");
	var bdr_array = SK_SubstArrayDtRead( parts_dt, "bdrcolor","clr");
	// パーツ設定
	var tmp_num = g_PartsArray.length;
	g_PartsArray[tmp_num] = new CSkinParts();

	// タイマー取得
	var parts_timer = SK_SubstDtRead(parts_dt, "parts_setting","base_time");
	if(parts_timer == "\0" ) parts_timer = g_common_time;
	
	var bg_timer = parts_timer;
	bg_timer = SK_SubstDtRead(parts_dt, "background","timer");
	if( bg_timer == "\0" ) bg_timer = parts_timer;

	var fc_timer = parts_timer;
	fc_timer = SK_SubstDtRead(parts_dt, "fcolor","timer");
	if( fc_timer == "\0" ) fc_timer = parts_timer;

	var bdr_timer = parts_timer;
	bdr_timer = SK_SubstDtRead(parts_dt, "bdrcolor","timer");
	if( bdr_timer == "\0" ) bdr_timer = parts_timer;

	// タイマー設定
	g_PartsArray[tmp_num].SK_SetTimer( bg_timer, fc_timer, bdr_timer);
	// データ設定
	g_PartsArray[tmp_num].SK_SetData( tag_name, rpt_dt, bg_array, fc_array, bdr_array);
}


// スキン細部データ 読み取り
function SK_SubstDtRead( skin_dt, tag_name, dt_name){
	var skex_dt = SK_ChildTagExtr( skin_dt, '&lt;' +tag_name+ '&gt;', '&lt;/' +tag_name+ '&gt;', '&lt;' +tag_name, "&gt;");
	if( skex_dt == "\0" ) return "\0";
	// データ取得
	return SK_SkinDataExtr( skex_dt, dt_name );
}

// スキン細部データ配列 読み取り
function SK_SubstArrayDtRead( skin_dt, tag_name, dt_name){
	var skex_dt = SK_ChildTagExtr( skin_dt, '&lt;' +tag_name+ '&gt;', '&lt;/' +tag_name+ '&gt;', '&lt;' +tag_name, "&gt;");
	if( skex_dt == "\0" ) return null;

	// データ取得
    var dt_array = new Array();
	var cnt = 0;
	while(true){
		var bgEx = SK_SkinDataExtr( skex_dt, dt_name + cnt );
		if( bgEx == "\0" ) break;
		dt_array[cnt] = bgEx;
		cnt++;
	}
	return dt_array;
}

//////////////////////////////////////////////////
// スタイル設定

function SK_SetSkinStyle(){
	for( var num=0 ; num < g_PartsArray.length ; num++ ){
		g_PartsArray[num].SK_ShowSkin();
	}
}


//////////////////////////////////////////////////
// 抽出系 汎用メソッド

// タグ子供データ抽出
//function ChildTagExtraction( SrcStr ){
// 引数指定 例<div id="profile"> ～ </div>を取得
// 第1引数 htmlデータ 引数指定 - 例 str_data
// 第2引数 抽出タグ先頭全体文字列 引数指定 - 例 '<div id="profile">'
// 第3引数 タグ終了文字列 引数指定 - 例 "/div>"
// 第4引数 同名入れ子タグ対策 引数指定 - 例 "<div"
// suffix ">" や "&gt"など
function SK_ChildTagExtr( SrcStr, tag_top_all_str, tag_end, tag_top_part, suffix ){
	var startPos = SrcStr.indexOf( tag_top_all_str ,0);
	if(startPos == -1) return "\0";

	var checkStartPos = SrcStr.indexOf( suffix , startPos);
	if(checkStartPos == -1) return "\0";
	var retStartPos = checkStartPos+suffix.length;
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
		endPos = SrcStr.indexOf( suffix , retEndPos);
		if(endPos == -1) return "\0";

		// カウントを減らす
		cnt -=1;

		while(1){
			// 終了タグの前に開始タグが無いかをチェック
			var checkPos = SrcStr.indexOf( tag_top_part , checkStartPos);
			if(checkPos == -1) break;
			if( endPos > checkPos ){
				// 開始タグが終了タグの前にあったのでカウント加算
				checkStartPos = SrcStr.indexOf( suffix , checkPos);
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

// 属性 抽出
function SK_AttriExtr( SrcStr, tag_name, tag_attri ){
	var re = new RegExp("<"+tag_name+" *"+tag_attri+" *= *"+'"([^"]*)'+"[^>]*>","m");
	var str_match = SrcStr.match(re);
	if(( str_match == null )||( str_match.length < 2 )) return "\0";
	return str_match[1];
}

// スキンデータ抽出
function SK_SkinDataExtr( SrcStr, data_name ){
	var re = new RegExp(data_name+' *= *'+'([^;]*);' );
	var str_match = SrcStr.match(re);
	if(( str_match == null )||( str_match.length < 2 )) return "\0";

	var top = str_match[1].indexOf( '"' , 0) ;
	if( top == -1 ) return "\0";
	var end = top;
	while(true){
		var temp = str_match[1].indexOf( '"' , end+1);
		if( temp == -1 ) break;
		end = temp;
	}
	return str_match[1].slice(top+1, end);
}

// スタイル追加
function SK_addStyle( css, style_id ){
	var style_elm = document.getElementById(style_id);
	if( style_elm != null ){
		if( style_elm.innerHTML != css ){
			style_elm.innerHTML = css;
		}
		return ;
	}
	var head, style;
	head = document.getElementsByTagName("head")[0];
	if (!head) return;
	style = document.createElement("style");
	style.type = "text/css";
	style.id = style_id;
	style.innerHTML = css;
	head.appendChild(style);
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

})();
