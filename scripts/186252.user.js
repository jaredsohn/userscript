// ==UserScript==
// @name           bro3_favoritetrade
// @namespace      http://chaki.s27.xrea.com/br3/
// @include        http://*.3gokushi.jp/*
// @exclude        http://*.3gokushi.jp/false/login_sessionout.php*
// @exclude        http://*.3gokushi.jp/maintenance/*
// @description    ブラウザ三国志 トレード関連ツール詰め合わせ by きの。
// @author         kino.
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        2.49
// @icon	   http://chaki.s27.xrea.com/br3/icon.png
// ==/UserScript==

( function(){

var version = "2.49";

var AH_list = ["仁君","弓腰姫の愛","神医の術式","神医の施術","桃色吐息","勇姫督励","熊猫の麺匠","皇后の慈愛","傾国","才女の瞳","優雅な調べ","城壁補強"];

///////////////////////////////////////////////
//Chrome用GM_関数
// @copyright 2009, James Campos
// @license cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
		return defaultValue;
		var type = value[0];
		value = value.substring(1);
			switch (type) {
				case 'b':
				return value == 'true';
				case 'n':
				return Number(value);
				default:
				return value;
			}
	};

	GM_log = function(message) {
		if (window.opera) {
			opera.postError(message);
		return;
		}
		console.log(message);
	};

	GM_registerMenuCommand = function(name, funk) {
	//todo
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};
}
///////////////////////////////////////////////
var himitsu_flg = 0;	//秘密のフラグ

var host = location.hostname;
var path = location.pathname;

var d = document;
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };


var BRO3_FAVORITE_TRADE_FLG	= 'bro3_favavorite_trade_flg' + host;
var BRO3_SHOW_CARD_ID_FLG	= 'bro3_show_card_id_flg' + host;
var BRO3_APPEND_LINK_FLG	= 'bro3_append_link_flg' + host;
var BRO3_SCORE_VIEW_FLG		= 'bro3_score_view_flg' + host;
var BRO3_IMMEDIATE_BID_FLG	= 'bro3_immediate_bid_flg' + host;
var BRO3_TRADING_SUPPORT_FLG	= 'bro3_trading_support_flg' + host;
var BRO3_ADD_DEL_COMMAND_FLG	= 'bro3_add_del_command_flg' + host;
var BRO3_OVER_MOUSE_FLG		= 'bro3_over_mouse_flg' + host;
var BRO3_AUTO_DELETE_FLG	= 'bro3_auto_delete_flg' + host;
var BRO3_AUTO_DELETE_CNO	= 'bro3_auto_delete_cno' + host;
var BRO3_AUTO_BUSHODASU_MODE	= 'bro3_auto_bushodasu_mode' + host;
var BRO3_DEL_TRADE_REPORT_FLG	= 'bro3_del_trade_report_flg' + host;
var BRO3_AUTO_HEAL_FLG		= 'bro3_auto_heal_flg' + host;
var BRO3_AUTO_HEAL_B_ID		= 'bro3_auto_heal_b_id' + host;
var BRO3_AUTO_HEAL_S_NO		= 'bro3_auto_heal_s_no' + host;
var BRO3_AUTO_HEAL_V_ID		= 'bro3_auto_heal_v_id' + host;
var BRO3_CARD_COLLECT_FLG	= 'bro3_card_collect_flg' + host;
var BRO3_CARD_COLLECT2_FLG	= 'bro3_card_collect2_flg' + host;
var BRO3_10TP_COLLECT_FLG	= 'bro3_10tp_collect_flg' + host;
var BRO3_MISC_FLG		= 'bro3_misc_flg' + host;
var BRO3_BULK_SET_FLG		= 'bro3_bulk_set_flg' + host;

var favorite_trade_flg	= 1;
var show_card_id_flg	= 1;
var append_link_flg	= 1;
var score_view_flg	= 1;
var immediate_bid_flg	= 1;
var trading_support_flg	= 1;
var add_del_command_flg	= 1;
var over_mouse_flg	= 1;
var auto_delete_flg	= 0;
var auto_delete_cno	= "";
var auto_bushodasu_mode	= 0;
var del_trade_report_flg= 1;
var auto_heal_flg	= 1;
var card_collect_flg	= 1;
var card_collect2_flg	= 1;
var tp10_collect_flg	= 1;
var bro3_misc_flg	= 0;
var bulk_set_flg	= 1;

if(GM_getValue(BRO3_FAVORITE_TRADE_FLG))	favorite_trade_flg	= GM_getValue(BRO3_FAVORITE_TRADE_FLG);
if(GM_getValue(BRO3_SHOW_CARD_ID_FLG))		show_card_id_flg	= GM_getValue(BRO3_SHOW_CARD_ID_FLG);
if(GM_getValue(BRO3_APPEND_LINK_FLG))		append_link_flg		= GM_getValue(BRO3_APPEND_LINK_FLG);
if(GM_getValue(BRO3_SCORE_VIEW_FLG))		score_view_flg		= GM_getValue(BRO3_SCORE_VIEW_FLG);
if(GM_getValue(BRO3_IMMEDIATE_BID_FLG))		immediate_bid_flg	= GM_getValue(BRO3_IMMEDIATE_BID_FLG);
if(GM_getValue(BRO3_TRADING_SUPPORT_FLG))	trading_support_flg	= GM_getValue(BRO3_TRADING_SUPPORT_FLG);
if(GM_getValue(BRO3_ADD_DEL_COMMAND_FLG))	add_del_command_flg	= GM_getValue(BRO3_ADD_DEL_COMMAND_FLG);
if(GM_getValue(BRO3_OVER_MOUSE_FLG))		over_mouse_flg		= GM_getValue(BRO3_OVER_MOUSE_FLG);
if(GM_getValue(BRO3_AUTO_DELETE_FLG))		auto_delete_flg		= GM_getValue(BRO3_AUTO_DELETE_FLG);
if(GM_getValue(BRO3_AUTO_DELETE_CNO))		auto_delete_cno		= GM_getValue(BRO3_AUTO_DELETE_CNO);
if(GM_getValue(BRO3_AUTO_BUSHODASU_MODE))	auto_bushodasu_mode	= GM_getValue(BRO3_AUTO_BUSHODASU_MODE);
if(GM_getValue(BRO3_DEL_TRADE_REPORT_FLG))	del_trade_report_flg	= GM_getValue(BRO3_DEL_TRADE_REPORT_FLG);
if(GM_getValue(BRO3_AUTO_HEAL_FLG))		auto_heal_flg		= GM_getValue(BRO3_AUTO_HEAL_FLG);
if(GM_getValue(BRO3_CARD_COLLECT_FLG))		card_collect_flg	= GM_getValue(BRO3_CARD_COLLECT_FLG);
if(GM_getValue(BRO3_CARD_COLLECT2_FLG))		card_collect2_flg	= GM_getValue(BRO3_CARD_COLLECT2_FLG);
if(GM_getValue(BRO3_10TP_COLLECT_FLG))		tp10_collect_flg	= GM_getValue(BRO3_10TP_COLLECT_FLG);
if(GM_getValue(BRO3_MISC_FLG))			bro3_misc_flg		= GM_getValue(BRO3_MISC_FLG);
if(GM_getValue(BRO3_BULK_SET_FLG))		bulk_set_flg		= GM_getValue(BRO3_BULK_SET_FLG);


//「トレード」で実行
if(path.indexOf("/card/trade.php") != -1){
	favorite_trade();
	if(show_card_id_flg == 1)	showCardIdMain();
	if(append_link_flg == 1)	append_hyperlink_to_card_number_trade();
	if(score_view_flg == 1)		BRO3_SCORE_view();
	if(immediate_bid_flg == 1)	ImmBid();
	if(over_mouse_flg == 1)		OverMouse();
	if(tp10_collect_flg == 1)	TP10Collect();
}
//「一覧」で実行
if(path.indexOf("card/trade_card_list.php") != -1){
	favorite_trade();
}
//「出品中」「入札中」で実行
if(path.indexOf("/card/exhibit_list.php") != -1 || path.indexOf("/card/bid_list.php") != -1){
	favorite_trade();
	if(show_card_id_flg == 1)	showCardIdMain();
	if(append_link_flg == 1)	append_hyperlink_to_card_number_trade();
	if(over_mouse_flg == 1)		OverMouse();
	if(bro3_misc_flg == 1)		bro3_misc();
}
//デッキで実行
if(path.indexOf("/card/deck.php") != -1){
	if(auto_heal_flg > 0)		AH_STEP1();
	if(append_link_flg == 1)	append_hyperlink_to_card_number_deck();
	if(bulk_set_flg == 1)		bulk_set();
}
//カード出品画面で実行
if(path.indexOf("/card/trade_card.php") != -1){
	favorite_trade();
	if(trading_support_flg == 1)	{ TradingSupport();ExhibitSupport(); }
}
//ブショーダス結果画面で表示
if(path.indexOf("/busyodas/busyodas_result.php") != -1){
	if(add_del_command_flg == 1)	AddDelCommand();
	if(trading_support_flg == 1)	{ TradingSupport();ExhibitSupport(); }
	if(auto_delete_flg == 1)	AutoDelete();
}
//武将図鑑で表示
if(path.indexOf("/card/busyobook_picture.php") != -1){
	if(trading_support_flg == 1)	TradingSupport();
}
if(path.indexOf("/card/busyobook_card.php") != -1){
	if(trading_support_flg == 1)	TradingSupport();
}
if(path.indexOf("/card/busyobook.php") != -1){
	if(card_collect_flg == 1)	CardCollect();
}
if(path.indexOf("/card/collection_list.php") != -1){
	if(card_collect2_flg == 1)	CardCollect2();
}
//書簡で表示
if(path.indexOf("/message/inbox.php") != -1){
	if(del_trade_report_flg == 1)	DeleteTradeReport();
}


// @name           bro3_favoritetrade
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    ブラウザ三国志 お気に入りトレード一覧表示 by きの。

function favorite_trade(){
	var l_length = 5;
	var l_length2 = 30;
	var l_length2 = 100;

	var BRO3_FAV_TRADE_LENGTH	= 'bro3_fav_trade_length' + host;
	var BRO3_AUTO_DELETE_LENGTH	= 'bro3_auto_delete_length' + host;
	if(GM_getValue(BRO3_FAV_TRADE_LENGTH)) l_length = GM_getValue(BRO3_FAV_TRADE_LENGTH);
	if(GM_getValue(BRO3_AUTO_DELETE_LENGTH)) l_length2 = GM_getValue(BRO3_AUTO_DELETE_LENGTH);
	var ul = document.getElementsByClassName("ui-tabs-nav").item(0);

	if(favorite_trade_flg == 1){
		var li = document.createElement("li");
		var fav = document.createElement("a");
		fav.href = "javascript:void(0)";
		fav.id = "favorite";
		fav.innerHTML = "<span>お気に入り</span>"
		fav.addEventListener("click",function(){seach_trade();},false)
		ul.appendChild(li);
		li.appendChild(fav);
	}

	var li2 = document.createElement("li");
	var set = document.createElement("a");
	set.href = "javascript:void(0)";
	set.id = "setting";
	set.innerHTML = "<span>設定</span>"
	set.addEventListener("click",function(){set_favorite();},false)
	ul.appendChild(li2);
	li2.appendChild(set);

	function set_favorite(){
		if(GM_getValue(BRO3_FAV_TRADE_LENGTH)) l_length = GM_getValue(BRO3_FAV_TRADE_LENGTH);
		if(GM_getValue(BRO3_AUTO_DELETE_LENGTH)) l_length2 = GM_getValue(BRO3_AUTO_DELETE_LENGTH);

		var link = document.evaluate('//li[@class=\"ui-tabs-selected\"]/a',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		link.addEventListener("click",function(){location.reload();},false);

		//document.getElementsByClassName("trade-list-head clearfix").item(0).style.display = "none";
		//var pager = document.evaluate('//*[@class=\"pager\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		//if(pager.snapshotLength > 0) pager.snapshotItem(0).style.display = "none";

		//var table = document.getElementsByClassName("tradeTables").item(0);
		var table = document.getElementsByClassName("ui-tabs-panel").item(0);
		var html = "";

		html += "<table class='tradeTables'><tr><td>"
		html += "<b>Bro3　FavoriteTrade　ver." + version + "</b><br>"
		html += "<b>～使い方～</b><br>"
		html += "<br>"
		html += "　このツールは以下のツールの機能を統合しています。<br>"
		html += "　下記のツールとは競合する可能性がありますので、利用の際にはGreasemonkeyの設定で無効にしてください。<br>"
		html += "　　・bro3_tradecardidview<br>"
		html += "　　・3gokushijpzourijp_cardnolink<br>"
		html += "　　・bro3_score_price<br>"
		html += "　　・bro3_bushodasu_AddDelCommand<br>"
		html += "　　・bro3_Trading_support<br>"
		html += "<br>"
		html += "　このツールを使って意図しない動作をしたとしても、作者は一切責任を負いません。<br>"
		html += "　ご利用は自己責任で♪<br>"
		html += "　<br>"
		html += "　要望・質問などは　17鯖 きの。　まで<br>"
		html += "<br></td></tr></table>"


		html += "<table class='tradeTables'><tr><td>"
		html += "<b>利用機能設定</b><br>"
		html += "<br>"
		html += "　<input type=checkbox id=cb_flg1>【トレード】お気に入りトレード一覧表示<br>"
		html += "　<input type=checkbox id=cb_flg2>【トレード】カードID表示<br>"
		html += "　<input type=checkbox id=cb_flg4>【トレード】単位スコア/修行合成獲得経験値表示<br>"
		html += "　<input type=checkbox id=cb_flg8>【トレード】カード画像をマウスオーバー表示<br>"
		html += "　<input type=checkbox id=cb_flg5>【トレード】即落札ボタン追加<br>"
		html += "　<input type=checkbox id=cb_flg14>【トレード】即落札トレード検索<br>"
		html += "　<input type=checkbox id=cb_flg15>【トレード】トレード入札カードリスト<br>　　　※bro3_misc（byいかりや長介さん）に含まれている機能です。<br>　　　　bro3_miscをインストールしている場合はOFFにしてください<br>"
		html += "　<input type=checkbox id=cb_flg3>【トレード/デッキ】トレードリンク追加<br>"
		html += "　<input type=checkbox id=cb_flg6>【トレード/ブショーダス/武将図鑑】トレード価格調査・出品補助<br>"
		html += "　<input type=checkbox id=cb_flg7>【ブショーダス】ブショーダス結果画面に「このカードを破棄」ボタン追加<br>"
		html += "　<input type=checkbox id=cb_flg9>【ブショーダス】ブショーダスライトで特定のカードを自動破棄<br>"
		html += "　　　┃<input type=radio name=bushodasu value=0>破棄リストにないカードを取得したら止める（半自動ブショーダス）<br>"
		html += "　　　┃<input type=radio name=bushodasu value=1>破棄リストにないカードを取得しても引くのを止めない（全自動ブショーダス）<br>"
		html += "　　　┗<input type=radio name=bushodasu value=2>R以上のカードが出たら止める<br>"
		html += "　<input type=checkbox id=cb_flg10>【書簡】未読トレード報告書簡の削除ボタン表示<br>"
		html += "　<input type=checkbox id=cb_flg11>【デッキ】回復スキル自動化ボタン<br>　　　　使用対象：　"
		for (var i=0; i<AH_list.length;i++){
			html += AH_list[i] + ",";
		}
		html += "<br>"
		html += "　<input type=checkbox id=cb_flg16>【デッキ】軍極一括デッキセットボタン<br>"
		html += "　<input type=checkbox id=cb_flg12>【武将図鑑】未取得カード収集ボタン<br>"
		html += "　<input type=checkbox id=cb_flg13>【武将図鑑】カードコレクション補助<br>"
		html += "<br>　　　<input type=button id=save_set value=設定を保存 /><br>\n"
		html += "<br></td></tr></table>"


		html += "<table class='tradeTables'><tr><td>"
		html += "<b>自動破棄カードリスト設定</b><br>"
		html += "<br>"
		html += "リスト個数　<input type=text id=num2 size=2 value="+l_length2+" maxlength=3 />個"
		html += "<input type=button id=save_num2 value=変更 />&nbsp;&nbsp;"
		html += "<input type=button id=ad_C value='C全部' />"
		html += "<input type=button id=ad_2 value='2コス以下全部' />"
		html += "<input type=button id=ad_2C value='2コス以下&C全部' />"
		html += "<input type=button id=clear value='入力全消去' /><br>"

		var a_cnt = 0;
		var cno = auto_delete_cno.split(",");
		for(var i=0;i<l_length2;i++){

			html += "<input type='text' name='a"+i+"' id='a"+i+"' class='text' value='";
			if( i < cno.length )	html += cno[i];
			html += "' size=4 maxlength=4 />";
			a_cnt += 1;
			if( a_cnt == 10 ){
				html += "<br />\n";
				a_cnt = 0;
			}

		}

		html += "<br>※ここにカードNoを入力したカードをブショーダスライトで引くと自動的に破棄してもう一枚引きます。<br />\n"
		html += "<center><input type=button id=save_list2 value=リストを保存 /></center>\n"
		html += "</td></tr></table>\n"


		html += "<table class='tradeTables'><tr><td>"
		html += "<b>お気に入りトレード検索条件設定</b><br>"
		html += "<br>"
		html += "リスト個数　<input type=text id=num size=2 value="+l_length+" maxlength=2 />個"
		html += "<input type=button id=save_num value=変更 /><br>\n"

		for(var i=0;i<l_length;i++){

			html += "No."+Math.floor(i+1)+"&nbsp;:&nbsp;";
			html += "<img src='/20111003-04/extend_project/w760/img/trade/hd_search.gif' alt='フリーワード検索' title='フリーワード検索' />"
			html += "<select name='t"+i+"' id='t"+i+"' class='combo'><option value='name'>武将名</option><option value='lv'>レベル</option><option value='no'>カードNo</option><option value='skill'>所持スキル</option></select>&nbsp;";
			html += "<input type='text' name='k"+i+"' id='k"+i+"' class='text' value='' size=15 />&nbsp;"
			html += "<input type=checkbox id='c"+i+"1'>TP不足表示&nbsp;"
			html += "<input type=checkbox id='c"+i+"2'>UR表示&nbsp;"
			html += "<input type=checkbox id='c"+i+"3'>SR表示&nbsp;"
			html += "<input type=checkbox id='c"+i+"4'>R表示&nbsp;"
			html += "<input type=checkbox id='c"+i+"5'>UC表示&nbsp;"
			html += "<input type=checkbox id='c"+i+"6'>C表示&nbsp;<br>\n"

		}

		html += "<center><input type=button id=save_list value=リストを保存 /></center>\n"
		html += "</td></tr></table>\n"

		table.innerHTML = html;

		var a_mode = document.getElementsByName("bushodasu");
		for ( var i = 0; i < a_mode.length; i++ ){
			if(a_mode[i].value == auto_bushodasu_mode){
				a_mode[i].checked = "checked";
			} 
		}

		document.getElementById("ad_C").addEventListener("click",function(){chg_select("C");},false)
		document.getElementById("ad_2").addEventListener("click",function(){chg_select("2");},false)
		document.getElementById("ad_2C").addEventListener("click",function(){chg_select("2C");},false)
		document.getElementById("clear").addEventListener("click",function(){all_clear();},false)

		function chg_select(a){
			if( a == "C"){
				auto_delete_cno = "1013,1018,1020,1024,1026,1028,1030,1032,1034,1040,1058,1059,,,,,,,,,2011,2015,2018,2021,2023,2025,2028,2030,2032,2034,2036,2038,2046,2056,,,,,,,,,,,,,,,,,3012,3016,3018,3020,3022,3024,3026,3028,3030,3039,,,,,,,,,,,4007,4009,4011,4013,4015,4017,4019,4021,4023,,,,,,,,,,,";
			}
			if( a == "2"){
				auto_delete_cno = "1017,1018,1021,1022,1023,1024,1025,1026,1028,1029,1030,1033,1034,1039,1040,1058,1059,,,,2017,2018,2020,2021,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2037,2038,2046,2056,2070,2076,,,,,,,,,,3015,3016,3017,3018,3019,3020,3022,3023,3024,3025,3026,3027,3028,3029,3030,3035,,,,,4008,4009,4010,4011,4012,4013,4014,4015,4016,4017,4018,4019,4022,4023,4038,,";
			}
			if( a == "2C"){
				auto_delete_cno = "1013,1017,1018,1020,1021,1022,1023,1024,1025,1026,1028,1029,1030,1032,1033,1034,1039,1040,1058,1059,2011,2015,2017,2018,2020,2021,2023,2024,2025,2026,2027,2028,2029,2030,2031,2032,2033,2034,2036,2037,2038,2046,2056,2070,2076,,,,,,3012,3015,3016,3017,3018,3019,3020,3022,3023,3024,3025,3026,3027,3028,3029,3030,3035,3039,,,4007,4008,4009,4010,4011,4012,4013,4014,4015,4016,4017,4018,4019,4021,4022,4023,4038";
			}
			var cno = auto_delete_cno.split(",");
			var k = l_length2;
			if( k > 100 ) k = 100
			for(var i=0;i<k;i++){
				if( i < cno.length ){
					document.getElementById("a"+i).value = cno[i] ;
				}
			}
		}
		function all_clear(){
			for(var i=0;i<l_length2;i++){
				document.getElementById("a"+i).value = "" ;
			}
		}

		if( favorite_trade_flg	== 1 ) document.getElementById('cb_flg1').checked = true ;
		if( show_card_id_flg	== 1 ) document.getElementById('cb_flg2').checked = true ;
		if( append_link_flg	== 1 ) document.getElementById('cb_flg3').checked = true ;
		if( score_view_flg	== 1 ) document.getElementById('cb_flg4').checked = true ;
		if( immediate_bid_flg	== 1 ) document.getElementById('cb_flg5').checked = true ;
		if( trading_support_flg	== 1 ) document.getElementById('cb_flg6').checked = true ;
		if( add_del_command_flg	== 1 ) document.getElementById('cb_flg7').checked = true ;
		if( over_mouse_flg	== 1 ) document.getElementById('cb_flg8').checked = true ;
		if( auto_delete_flg	== 1 ) document.getElementById('cb_flg9').checked = true ;
		if( del_trade_report_flg== 1 ) document.getElementById('cb_flg10').checked = true ;
		if( auto_heal_flg	>= 1 ) document.getElementById('cb_flg11').checked = true ;
		if( card_collect_flg	== 1 ) document.getElementById('cb_flg12').checked = true ;
		if( card_collect2_flg	== 1 ) document.getElementById('cb_flg13').checked = true ;
		if( tp10_collect_flg	== 1 ) document.getElementById('cb_flg14').checked = true ;
		if( bro3_misc_flg	== 1 ) document.getElementById('cb_flg15').checked = true ;
		if( bulk_set_flg	== 1 ) document.getElementById('cb_flg16').checked = true ;
		document.getElementById("save_set").addEventListener("click",function(){save_setting();},false)

		function save_setting(){
			var t = 1;
			var f = 0;
			if( document.getElementById('cb_flg1').checked == true ){ GM_setValue(BRO3_FAVORITE_TRADE_FLG, "1") }	 else { GM_setValue(BRO3_FAVORITE_TRADE_FLG, "0") };
			if( document.getElementById('cb_flg2').checked == true ){ GM_setValue(BRO3_SHOW_CARD_ID_FLG, "1") }	 else { GM_setValue(BRO3_SHOW_CARD_ID_FLG, "0") };
			if( document.getElementById('cb_flg3').checked == true ){ GM_setValue(BRO3_APPEND_LINK_FLG, "1") }	 else { GM_setValue(BRO3_APPEND_LINK_FLG, "0") };
			if( document.getElementById('cb_flg4').checked == true ){ GM_setValue(BRO3_SCORE_VIEW_FLG, "1") }	 	 else { GM_setValue(BRO3_SCORE_VIEW_FLG, "0") };
			if( document.getElementById('cb_flg5').checked == true ){ GM_setValue(BRO3_IMMEDIATE_BID_FLG, "1") }	 else { GM_setValue(BRO3_IMMEDIATE_BID_FLG, "0") };
			if( document.getElementById('cb_flg6').checked == true ){ GM_setValue(BRO3_TRADING_SUPPORT_FLG, "1") }	 else { GM_setValue(BRO3_TRADING_SUPPORT_FLG, "0") };
			if( document.getElementById('cb_flg7').checked == true ){ GM_setValue(BRO3_ADD_DEL_COMMAND_FLG, "1") }	 else { GM_setValue(BRO3_ADD_DEL_COMMAND_FLG, "0") };
			if( document.getElementById('cb_flg8').checked == true ){ GM_setValue(BRO3_OVER_MOUSE_FLG, "1") }	 else { GM_setValue(BRO3_OVER_MOUSE_FLG, "0") };
			if( document.getElementById('cb_flg9').checked == true ){ GM_setValue(BRO3_AUTO_DELETE_FLG, "1") }	 else { GM_setValue(BRO3_AUTO_DELETE_FLG, "0") };
			if( document.getElementById('cb_flg10').checked == true ){ GM_setValue(BRO3_DEL_TRADE_REPORT_FLG, "1") } else { GM_setValue(BRO3_DEL_TRADE_REPORT_FLG, "0") };
			if( document.getElementById('cb_flg11').checked == true ){ GM_setValue(BRO3_AUTO_HEAL_FLG, "1") } 	 else { GM_setValue(BRO3_AUTO_HEAL_FLG, "0") };
			if( document.getElementById('cb_flg12').checked == true ){ GM_setValue(BRO3_CARD_COLLECT_FLG, "1") } 	 else { GM_setValue(BRO3_CARD_COLLECT_FLG, "0") };
			if( document.getElementById('cb_flg13').checked == true ){ GM_setValue(BRO3_CARD_COLLECT2_FLG, "1") } 	 else { GM_setValue(BRO3_CARD_COLLECT2_FLG, "0") };
			if( document.getElementById('cb_flg14').checked == true ){ GM_setValue(BRO3_10TP_COLLECT_FLG, "1") } 	 else { GM_setValue(BRO3_10TP_COLLECT_FLG, "0") };
			if( document.getElementById('cb_flg15').checked == true ){ GM_setValue(BRO3_MISC_FLG, "1") }	 	 else { GM_setValue(BRO3_MISC_FLG, "0") };
			if( document.getElementById('cb_flg16').checked == true ){ GM_setValue(BRO3_BULK_SET_FLG, "1") } 	 else { GM_setValue(BRO3_BULK_SET_FLG, "0") };
			var a_mode = document.getElementsByName("bushodasu");
			for ( var i = 0; i < a_mode.length ; i++ ){
				if(a_mode[i].checked){
					auto_bushodasu_mode = a_mode[i].value;
					GM_setValue(BRO3_AUTO_BUSHODASU_MODE, auto_bushodasu_mode)
					break;
				} 
			}
			alert("保存しました");
		}

		for(var i=0;i<l_length;i++){

			var BRO3_FAV_TRADE_T	=  'bro3_fav_trade_t' + i + host;
			var BRO3_FAV_TRADE_K	=  'bro3_fav_trade_k' + i + host;
			var BRO3_FAV_TRADE_TL	=  'bro3_fav_trade_tl' + i + host;
			var BRO3_FAV_TRADE_UR	=  'bro3_fav_trade_ur' + i + host;
			var BRO3_FAV_TRADE_SR	=  'bro3_fav_trade_sr' + i + host;
			var BRO3_FAV_TRADE_R	=  'bro3_fav_trade_r' + i + host;
			var BRO3_FAV_TRADE_UC	=  'bro3_fav_trade_uc' + i + host;
			var BRO3_FAV_TRADE_C	=  'bro3_fav_trade_c' + i + host;
	
			var list_t 	= "";
			var list_k 	= "";
			var list_tl 	= 0;
			var list_ur 	= 0;
			var list_sr 	= 0;
			var list_r 	= 0;
			var list_uc 	= 0;
			var list_c 	= 0;
	
			if(GM_getValue(BRO3_FAV_TRADE_T)) 	list_t 	= GM_getValue(BRO3_FAV_TRADE_T);
			if(GM_getValue(BRO3_FAV_TRADE_K)) 	list_k 	= GM_getValue(BRO3_FAV_TRADE_K);
			if(GM_getValue(BRO3_FAV_TRADE_TL)) 	list_tl = GM_getValue(BRO3_FAV_TRADE_TL);
			if(GM_getValue(BRO3_FAV_TRADE_UR)) 	list_ur = GM_getValue(BRO3_FAV_TRADE_UR);
			if(GM_getValue(BRO3_FAV_TRADE_SR)) 	list_sr = GM_getValue(BRO3_FAV_TRADE_SR);
			if(GM_getValue(BRO3_FAV_TRADE_R)) 	list_r 	= GM_getValue(BRO3_FAV_TRADE_R);
			if(GM_getValue(BRO3_FAV_TRADE_UC)) 	list_uc = GM_getValue(BRO3_FAV_TRADE_UC);
			if(GM_getValue(BRO3_FAV_TRADE_C)) 	list_c 	= GM_getValue(BRO3_FAV_TRADE_C);

			if(list_t != ""){
				var sel = document.getElementById("t"+i);
				for(var j=0; j<4; j++){
					if( sel.options[j].value == list_t ) sel.options[j].selected = 1 ;
				}
			}
			document.getElementById("k"+i).value= list_k;
			if(list_tl == 0) document.getElementById("c"+i+"1").checked = true;
			if(list_ur == 0) document.getElementById("c"+i+"2").checked = true;
			if(list_sr == 0) document.getElementById("c"+i+"3").checked = true;
			if(list_r == 0)  document.getElementById("c"+i+"4").checked = true;
			if(list_uc == 0) document.getElementById("c"+i+"5").checked = true;
			if(list_c == 0)  document.getElementById("c"+i+"6").checked = true;

		}

		document.getElementById("save_num").addEventListener("click",function(){save_num();set_favorite();},false)
		document.getElementById("save_list").addEventListener("click",function(){save_list();set_favorite();},false)
		document.getElementById("save_num2").addEventListener("click",function(){save_num();set_favorite();},false)
		document.getElementById("save_list2").addEventListener("click",function(){save_list();set_favorite();},false)

		function save_num(){
			var num = document.getElementById("num").value
			var num2 = document.getElementById("num2").value
			GM_setValue(BRO3_FAV_TRADE_LENGTH, num)
			GM_setValue(BRO3_AUTO_DELETE_LENGTH, num2)
		}

		function save_list(){
			for(var i=0;i<l_length;i++){
				var sel 	= document.getElementById("t"+i);
				var list_t 	= sel.options[sel.selectedIndex].value ;
				var list_k 	= document.getElementById("k"+i).value;
				if(document.getElementById("c"+i+"1").checked == true) { var list_tl = 0 } else { var list_tl = 1 };
				if(document.getElementById("c"+i+"2").checked == true) { var list_ur = 0 } else { var list_ur = 1 };
				if(document.getElementById("c"+i+"3").checked == true) { var list_sr = 0 } else { var list_sr = 1 };
				if(document.getElementById("c"+i+"4").checked == true) { var list_r = 0 } else { var list_r = 1 };
				if(document.getElementById("c"+i+"5").checked == true) { var list_uc = 0 } else { var list_uc = 1 };
				if(document.getElementById("c"+i+"6").checked == true) { var list_c = 0 } else { var list_c = 1 };

				//alert("T="+list_t+",K="+list_k+",TL="+list_tl+",UR="+list_ur+",SR="+list_sr+",R="+list_r+",UC="+list_uc+",C="+list_c)

				var BRO3_FAV_TRADE_T	=  'bro3_fav_trade_t' + i + host;
				var BRO3_FAV_TRADE_K	=  'bro3_fav_trade_k' + i + host;
				var BRO3_FAV_TRADE_TL	=  'bro3_fav_trade_tl' + i + host;
				var BRO3_FAV_TRADE_UR	=  'bro3_fav_trade_ur' + i + host;
				var BRO3_FAV_TRADE_SR	=  'bro3_fav_trade_sr' + i + host;
				var BRO3_FAV_TRADE_R	=  'bro3_fav_trade_r' + i + host;
				var BRO3_FAV_TRADE_UC	=  'bro3_fav_trade_uc' + i + host;
				var BRO3_FAV_TRADE_C	=  'bro3_fav_trade_c' + i + host;

				GM_setValue(BRO3_FAV_TRADE_T, list_t);
				GM_setValue(BRO3_FAV_TRADE_K, list_k);
				GM_setValue(BRO3_FAV_TRADE_TL, list_tl);
				GM_setValue(BRO3_FAV_TRADE_UR, list_ur);
				GM_setValue(BRO3_FAV_TRADE_SR, list_sr);
				GM_setValue(BRO3_FAV_TRADE_R, list_r);
				GM_setValue(BRO3_FAV_TRADE_UC, list_uc);
				GM_setValue(BRO3_FAV_TRADE_C, list_c);
			}

			auto_delete_cno = "";

			for ( var i = 0; i < l_length2; i++ ){
				auto_delete_cno += document.getElementById("a"+i).value + ",";
			}
			GM_setValue(BRO3_AUTO_DELETE_CNO, auto_delete_cno);
			//alert(auto_delete_cno)
			alert("保存しました");
		}

	}

	function seach_trade(){
		if(GM_getValue(BRO3_FAV_TRADE_LENGTH)) l_length = GM_getValue(BRO3_FAV_TRADE_LENGTH);

		var link = document.evaluate('//li[@class=\"ui-tabs-selected\"]/a',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		link.addEventListener("click",function(){location.reload();},false);

		//document.getElementsByClassName("trade-list-head clearfix").item(0).style.display = "none";
		//var pager = document.evaluate('//*[@class=\"pager\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		//if(pager.snapshotLength > 0) pager.snapshotItem(0).style.display = "none";
	
		var table = document.getElementsByClassName("ui-tabs-panel").item(0);
		table.innerHTML = "<table class='tradeTables' id='ftrade'></table>"
		var trade = document.getElementById("ftrade");
		
		trade.innerHTML = "<span id=read>読み込み中...<span id=count>0</span>/"+l_length+"</span>";

		var cnt = 0;

		for(var i=0; i <= l_length; i++){
			var BRO3_FAV_TRADE_T	=  'bro3_fav_trade_t' + i + host;
			var BRO3_FAV_TRADE_K	=  'bro3_fav_trade_k' + i + host;
			var BRO3_FAV_TRADE_TL	=  'bro3_fav_trade_tl' + i + host;
			var BRO3_FAV_TRADE_UR	=  'bro3_fav_trade_ur' + i + host;
			var BRO3_FAV_TRADE_SR	=  'bro3_fav_trade_sr' + i + host;
			var BRO3_FAV_TRADE_R	=  'bro3_fav_trade_r' + i + host;
			var BRO3_FAV_TRADE_UC	=  'bro3_fav_trade_uc' + i + host;
			var BRO3_FAV_TRADE_C	=  'bro3_fav_trade_c' + i + host;

			var list_t 	= "";
			var list_k 	= "";
			var list_tl 	= 0;
			var list_ur 	= 0;
			var list_sr 	= 0;
			var list_r 	= 0;
			var list_uc 	= 0;
			var list_c 	= 0;
	
			if(GM_getValue(BRO3_FAV_TRADE_T)) 	list_t 	= GM_getValue(BRO3_FAV_TRADE_T);
			if(GM_getValue(BRO3_FAV_TRADE_K)) 	list_k 	= GM_getValue(BRO3_FAV_TRADE_K);
			if(GM_getValue(BRO3_FAV_TRADE_TL)) 	list_tl = GM_getValue(BRO3_FAV_TRADE_TL);
			if(GM_getValue(BRO3_FAV_TRADE_UR)) 	list_ur = GM_getValue(BRO3_FAV_TRADE_UR);
			if(GM_getValue(BRO3_FAV_TRADE_SR)) 	list_sr = GM_getValue(BRO3_FAV_TRADE_SR);
			if(GM_getValue(BRO3_FAV_TRADE_R)) 	list_r 	= GM_getValue(BRO3_FAV_TRADE_R);
			if(GM_getValue(BRO3_FAV_TRADE_UC)) 	list_uc = GM_getValue(BRO3_FAV_TRADE_UC);
			if(GM_getValue(BRO3_FAV_TRADE_C)) 	list_c 	= GM_getValue(BRO3_FAV_TRADE_C);
	
			if(list_k != ""){
				var dom = document.createElement("div");
				var t_url = "http://"+location.host+"/card/trade.php?s=price&o=a&t="+list_t+"&k="+list_k+"&tl="+list_tl+"&r_ur="+list_ur+"&r_sr="+list_sr+"&r_r="+list_r+"&r_uc="+list_uc+"&r_c="+list_c;
				dom.innerHTML = getContentFromURL(t_url);
				dom.id = 'TempDOM' + i;
				dom.style.display = "none";
				document.body.appendChild(dom);

				var area = "//div[@id=\"TempDOM"+i+"\"]//*[@id='gray02Wrapper']//*[@class=\"ui-tabs-panel\"]";
				comment = document.evaluate(area, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
				if(comment.indexOf("現在入札可能な出品はありません") == -1 ){
					var profile = "//div[@id=\"TempDOM"+i+"\"]//*[@id='gray02Wrapper']//*[@class=\"tradeTables\"]";
					trade.innerHTML += document.evaluate(profile, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
				}
			}
			cnt += 1;
			document.getElementById("count").innerHTML = cnt;
		}

		var busho_no_es=$a('//table[@class="tradeTables"]/tbody/tr[position()>1]/td[ position() = 1]');
		for (var i = 0;i < busho_no_es.length;i++) {
		    busho_no_es[i].innerHTML=addtradelink4cardnotext(busho_no_es[i].innerHTML);
		}
		var skill_es=$a('//table[@class="tradeTables"]//td[@class="skill"]/div');
		for (var i = 0;i < skill_es.length;i++) {
		    skill_es[i].innerHTML=addtradelink4skilltext(skill_es[i].innerHTML);
		}
		document.getElementById("read").innerHTML = "完了";

		if(over_mouse_flg == 1)		OverMouse();
		if(immediate_bid_flg == 1)	ImmBid();
	}

}

// @name           bro3_tradecardidview
// @version        1.00
// @namespace      http://twitter.com/utoutouuto
// @description    ブラウザ三国志：トレード画面でカードＩＤを表示させる

function showCardIdMain() {
	var $xp = function (xp, dc) { return d.evaluate(xp, dc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); };

	var IdNodes = $xp('//div[starts-with(@id, "cardWindow_")]', d);
	
	for (var i = 0, len = IdNodes.snapshotLength; i < len; i++ ) {
		var targetNode = IdNodes.snapshotItem(i);
		var cardId = targetNode.id.match(/[0-9]+/);
		var cardIdEL = d.createElement("div");
			cardIdEL.style.paddingTop = "5px";
			cardIdEL.style.fontSize = "12px";
			cardIdEL.innerHTML = "ID:" + cardId;
		targetNode.parentNode.appendChild(cardIdEL);
	}
}

// @name           3gokushijpzourijp_cardnolink
// @namespace      http://3gokushijp.zouri.jp/cardnolink
// @description    カードNo欄,スキル欄にトレードへのリンクを追加します。Ver0.0.2

function append_hyperlink_to_card_number_trade(){
	var busho_no_es=$a('//table[@class="tradeTables"]/tbody/tr[position()>1]/td[ position() = 1]');
	for (var i = 0;i < busho_no_es.length;i++) {
	    busho_no_es[i].innerHTML=addtradelink4cardnotext(busho_no_es[i].innerHTML);
	}
	var skill_es=$a('//table[@class="tradeTables"]//td[@class="skill"]/div');
	for (var i = 0;i < skill_es.length;i++) {
	    skill_es[i].innerHTML=addtradelink4skilltext(skill_es[i].innerHTML);
	}
}

function append_hyperlink_to_card_number_deck(){
       	var busho_no_es=$a('//table[@class="statusParameter1"]//th[text() = "ID"]/following-sibling::*[1]');
	for (var i = 0;i < busho_no_es.length;i++) {
	    busho_no_es[i].innerHTML=addtradelink4cardnotext(busho_no_es[i].innerHTML);
	}
	var skilltext_es=$a('//table[@class="statusParameter2"]//th[contains(text(),"スキル")]/following-sibling::*[1][contains(text(),"LV")]');
	for (var i = 0;i < skilltext_es.length;i++) {
	    skilltext_es[i].innerHTML=addtradelink4skilltext(skilltext_es[i].innerHTML);
	}
	//よくわからない空白gifファイルが邪魔なので、その対応
	var spimg_es=$a('//img[@title = "ファイル"]/following::img[@class="aboutdeck" and contains(@src,"img/card/sp.gif")]');
	//alert(spimg_es.length);
	for (var i = 0;i < spimg_es.length;i++) {
	    spimg_es[i].width="85";
	}
}

function addtradelink4cardnotext(cardnotext){
    if(cardnotext.search('(T)')>=0){
	return cardnotext;
    }
    var t=cardnotext.match(/(\d{4})/);
    if(t==null || t.length<2){
	return cardnotext;
    }
    return cardnotext+'<a href="/card/trade.php?s=price&o=a&t=no&k='+t[1]+'">(T)</a>';
}
//リンク無し {スキル名}{LV} テキストを リンク付きにする
function addtradelink4skilltext(skilltext){
    if(skilltext.search('(T)')>=0){
	return skilltext;
    }
    var t;
    if(skilltext.match(/:/)){
	t=skilltext.match(/(.*:)(.*)(LV.*)/);
    }else{
	t=skilltext.match(/()(.*)(LV.*)/);
    }
    if(t==null || t.length<4){
	return skilltext;
    }
    return t[1]+'<a href="/card/trade.php?s=price&o=a&t=skill&k='+t[2]+'">'+t[2]+'</a>'+t[3]+'<a href="/card/trade.php?s=price&o=a&t=skill&k='+t[2]+t[3]+'">(T)</a>';
}


// @name           bro3_score_price
// @namespace      http://359.blog-sim.com/
// @description    ブラウザ三国志　スコア単価計算　（修行合成対応改造）

function BRO3_SCORE_view() {
	var area = document.getElementsByClassName("left-box").item(0);
	var dom1 = document.createElement("div")
	dom1.innerHTML = "<table><tr>"
	dom1.innerHTML += "<td><input type=checkbox id=chk1>修行合成表示</td>"
	dom1.innerHTML += "<td>｜<input type=radio name=nation value=魏 checked>魏 <input type=radio name=nation value=呉>呉 <input type=radio name=nation value=蜀>蜀 <input type=radio name=nation value=他>他</td>"
	dom1.innerHTML += "<td>｜<input type=radio name=rarity value=UR checked>UR <input type=radio name=rarity value=SR>SR <input type=radio name=rarity value=R>R <input type=radio name=rarity value=UC>UC <input type=radio name=rarity value=C>C｜</td>"
	dom1.innerHTML += "</tr></table>";
	area.appendChild(dom1)

	var txt = document.getElementsByClassName("tradeTables").item(0).innerHTML;
	var regexp = /経験値\:([0-9]*)[\s\S]*?<td class=\"right\">([0-9]*)<\/td>\r?\n?[\t\s]*?<td class=\"right\"><strong>([0-9,]*?)<\/strong><\/td>/gm;
	var matched = txt.match(regexp);

	if (!matched) {
		var len2 = 0;
	}else{
		var len2 = matched.length;
	}

	var exp = [];
	var score = [];
	var price = [];

	for (var i = 0; i < len2; i++) {
		matched[i].match(regexp);
		exp[i] = parseInt(RegExp.$1);
		score[i] = parseInt(RegExp.$2);
		price[i] = parseInt(RegExp.$3.replace(",", ""));

		document.getElementsByTagName("strong").item(i+1).innerHTML += "<br><small>score</small>\n";
	}

	document.getElementById("chk1").addEventListener("change",function(){SelectView();},false);
	for(var i=0;i<4;i++){
		document.getElementsByName("nation").item(i).addEventListener("change",function(){SelectView();},false);
	}
	for(var i=0;i<5;i++){
		document.getElementsByName("rarity").item(i).addEventListener("change",function(){SelectView();},false);
	}

	function SelectView(){
		if( document.getElementById("chk1").checked == true ) { ViewExp(); }
		else { ViewScore(); }
	}

	function ViewScore(){
		for (var i = 0; i < len2; i++) {
			document.getElementsByTagName("small").item(i).innerHTML = "sc: " + parseInt(score[i] / price[i]) + " /TP";
		}
	}

	function ViewExp(){
		var b_nation = "";
		var nation = document.getElementsByName("nation");
		for(var i=0;i<4;i++){
			if(nation[i].checked) b_nation = nation[i].value;
		}

		var b_rarity = "";
		var rarity = document.getElementsByName("rarity");
		for(var i=0;i<5;i++){
			if(rarity[i].checked) b_rarity = rarity[i].value;
		}

		var point = [];
		var bonus = [];
		var getexp = [];

		for (var i = 0; i < len2; i++) {
			point[i] = 40;
			var k = i*2+1;
			var t_rarity = document.getElementsByClassName("center").item(k).childNodes[0].innerHTML;
			var t_nation = document.evaluate('//*[@class=\"country\"]/img/@title',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).textContent;
			var t_skill3 = document.evaluate('//td[@class=\"skill\"]/div[3]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).innerHTML;
			var t_skill2 = document.evaluate('//td[@class=\"skill\"]/div[2]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).innerHTML;

			if(t_rarity == "UR")		{ point[i] += 40;	bonus[i] = 15000; }
			else if(t_rarity == "SR")	{ point[i] += 30;	bonus[i] = 6000; }
			else if(t_rarity == "R")	{ point[i] += 20;	bonus[i] = 1000; }
			else if(t_rarity == "UC")	{ point[i] += 10;	bonus[i] = 25; }
			else if(t_rarity == "C")	{ point[i] += 5;	bonus[i] = 10; }
			
			if(b_rarity == t_rarity) { point[i] += 4;}
			if(b_nation == t_nation) { point[i] += 4;}

			if(t_skill2.indexOf("--") == -1){ point[i] += 4;}
			if(t_skill3.indexOf("--") == -1){ point[i] += 6;}

			getexp[i] = parseInt( exp[i] * point[i] / 100 ) + bonus[i];

			document.getElementsByTagName("small").item(i).innerHTML = "+" + getexp[i] + "<br>exp: " + parseInt(getexp[i]/price[i]) + " /TP";
			//document.getElementsByTagName("small").item(i).innerHTML += "<br>(" + point[i] + "%)";
		}
	}

	SelectView();
}

// @name           bro3_bushodasu_AddDelCommand
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    mixi版ブラウザ三国志　ブショーダスに「破棄」メニュー追加

function AddDelCommand(){

	var hrf = location.href;
	var cord = hrf.replace(/^.*card=(-?[0-9]+)/, "$1");
	var card = RegExp.$1;
	//alert(card);

	var id = document.evaluate("//*[@id='gray02Wrapper']//*[@name='ssid']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;

	var footBtn = document.getElementsByClassName('center').item(1);
	var nakami = "　<a href=javascript:void(0) id='haki'><img id='image' alt='このカードを破棄' width=184 height=52 class='fade' /></a>";
	var t = document.createElement("span");
	t.innerHTML = nakami;
	footBtn.appendChild(t);
	var link = document.getElementById("haki");
	link.addEventListener("click",function(){if(confirm('このカードを破棄してよろしいですか？\n※破棄すると、BP30を獲得します。')){Del_Card(card,id)};},false)

	var image = document.getElementById("image");
image.src = "data:image/pjpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%E1%00ZExif%00%00MM%00*%00%00%00%08%00%05%03%01%00%05%00%00%00%01%00%00%00J%03%03%00%01%00%00%00%01%00%00%00%00Q%10%00%01%00%00%00%01%01%00%00%00Q%11%00%04%00%00%00%01%00%00%0B%13Q%12%00%04%00%00%00%01%00%00%0B%13%00%00%00%00%00%01%86%A0%00%00%B1%8F%FF%DB%00C%00%02%01%01%02%01%01%02%02%02%02%02%02%02%02%03%05%03%03%03%03%03%06%04%04%03%05%07%06%07%07%07%06%07%07%08%09%0B%09%08%08%0A%08%07%07%0A%0D%0A%0A%0B%0C%0C%0C%0C%07%09%0E%0F%0D%0C%0E%0B%0C%0C%0C%FF%DB%00C%01%02%02%02%03%03%03%06%03%03%06%0C%08%07%08%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%0C%FF%C0%00%11%08%007%00%B9%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%FD%EA%D4%F55%B5V%CB%60%2FR%2B%E5%0F%DA%FB%FE%0A%81%E1%7F%D9%A7_o%0Di%D6%F7%9E1%F1%DC%B1%89%13B%D3%A4U%FB%1A%91%95%92%EEf%F9-%A2%20%82%0Be%DB%23j05%C3%FF%00%C1f%FF%00%E0%A3%AD%FB%10%FC0%8BL%D0o-b%F1%FF%00%8D%E7%93O%D0%C4%E5Z%3B%15A%FB%FB%D7V%E1%84JW%0Ar%19%D9%06%0F%CC%2B%F0%F3P%FD%B3%ED%BE%1Ex%AE%3B%1F%F8H%26M__%BBi%EF%F5%1DH5%C0%BA%9D%DB%F7%97%17%0F%92%CEK%12s%9C%F2q%81_%1F%9Ef%F5%A0%FE%AF%84W%9E%FE%87%EC%1C%0D%C0%B41t%16e%9A%3BRn%D1W%B73%F3%7D%15%F4%D3V%FA%ABk%FA%E1%A7~%DB%3F%1C%FE0%A4%177%9E%3E%D1%3C%03g%E7L%82%C7%C2%FA%247r%600*%AFs~%B3%09%1C)%03)%0Cc%3C%E0t%AC%DF%1C%FE%D0%DF%14%BC%2B~!%B0%F8%D7%F1%1A%5B%EBC%E6%5D%99t%ED%12%EE(I%FB%A9%24md%A0%1E%9F*%ED%23%D8%F0%3E%18%F0G%C6%0B%9B%AF%05%EB%D7z%FF%00%C5%CDZ%D6%C2%C5dX%22%D1%26%8E%C2%D2%F0%86%18%20D%BEi%8C%A6I%20%EE%E3%15%F3%E7%C6%AF%DB%D6%3F%1Fx%FE_%07x%0B_%3E%0C%F8q%60b%8E%EF_q2%1DN%60%7F%7B3I%CB%B9w%60%A39%E1%07%AE%0F%C1%E1e%9Abk%C9%CE%A3%B2%D7F%F4%FC%B5%EC%91%FA%8E%23%872%DC%24%A2%A7N%9CS%D1.H%BB%F5%D5%B5%AA%5D%DD%FC%D9%FB%25%E0%3F%F8%2B%A7%C4%1F%85W%F0%C1%E3%DD%23L%F1%A6%85%18D%9BS%D0%AD%1FM%D5%A1Q%D5%E4%B3vx%A6%E7%A9%85%D0%F5%DB%1Bt%1Ft%FC%17%FD%A3%FC%2F%FBBx%22%CF%C4%DE%0F%D5%ED%B5%8D%0E%F57Gu%13%15%C1%18%DC%8C%84n%8EE%CF%CC%8E%03%03%C1%00%8A%FE~%FF%00gO%8Av%DA%8D%DE%9B%A1%5B%DFj%1E*%BD%91%18K%A9%B5%C1o1%1B%3C%BAm%1BW%A62%03q%92Mo%DBx%D7%C4%3E%0B%F1%87%88-t%7F%15%F8%C7%C1%FA%A0h%DE%ED%7C%3D%E2%0B%BD%25uE%04%ACr%C8%B0%3A%2B%BA%83%B7q%04%E3%15%EAa8%9A%AE%0A~%CE%B3r%8F%9E%EB%FE%07%AE%A7%91%9Bx%5D%85%CC%23%CF%86Q%A5%3E%EB%E1k%CE%3D%1Fn%5B%2F.%AB%FA)%B3%9B%CE%81N%08%E0u95%23%0C%F4%AF%E7%5D%3Fh%FF%00%1D%2B%7C%BF%1A~9%AA%82G%CB%F1%13WQ%F9y%F5%A9%A1%FCe%F8%8D%AF%A4%AF%17%C6%CF%8EQ%C7%18%C0i~%24j%E8%B27%F7%14%F9%FF%00x%FE%9D%2B%DD%FF%00%5E%F0%91%8F%C1%2F%C3%FC%CF%9B%97%81x%F5%EF%7Df%1F%F8%0C%8F%E8Tt%A2%BF%9D%B9%FF%00h%8F%1F%DANc%97%E3_%C7%84%962C%23%7CD%D5%C1%1F%F9%1E%ADh_%1C%BE%22k%B7%AB%0C%3F%1A%BE%3Ad%02Y%9F%E2%3E%AE%11%07l%9F%3E%87%C7x%3B%5D%D3%97%E1%FEa%FF%00%10%2F0J%FF%00Y%87%FE%03%23%FA%1A%A2%BF%9D%EDS%E3%FF%00%C4-%22%F1%A0%9F%E3W%C7uu8%DD%FF%00%0B%17W*%DE%E0%F9%FD(%D3%BE%3F%FCB%D5.R%0B%7F%8D%3F%1D%E4%95%CF%03%FE%166%AE%06%3B%92%7C%FE1B%E3%BC%25%AF%C9%2B%7C%BF%CC%7F%F1%02%B1%F6%BF%D6a%FF%00%80%C8%FE%88h%AF%E7%9F_%F8%DD%F1%13%C3%D7%1Bd%F8%DB%F1%CEDp%0AJ%9F%11%B5vF%F6%FF%00_%D6%A9C%FBF%F8%FAy%02%A7%C6%BF%8E%ECI%DA%02%FCD%D5%C9c%E9%FE%BE%85%C7xK%5E0%95%BE_%E6%0B%C0%AC%7BW%FA%CC%3F%F0%19%1F%D1-%15%FC%F6k%1F%18%FE%23%E8v%D0%CB%3F%C6%AF%8EL%8F%F7%DE%3F%88%FA%BB%08%8F%A3%0F%3F%83Yg%F6%92%F1%DA%E0%9F%8D%9F%1D%D7%DB%FE%16.%AEs%FF%00%91%E9G%8E%F0RWT%E5%F8%7F%991%F0%2F0z%ACL%3F%F0%19%1F%D1)L%9E%ADN%03%03%B9%AF%E7%B2_%8B%FF%00%12%93F%5B%C1%F1%A7%E3%A3%827%18%97%E26%B1%E6%AA%FF%00x%AF%DA%3E%EDe%8F%DAG%C7G%A7%C6%EF%8E%C4z%8F%88%9A%BE%0F%FEG%AA%5Cy%84kHK%F0%FF%001%AF%02%F3%07%FF%0010%FF%00%C0d%7FD%DB%7D%CD(%18%AF%E7%AFM%F8%C3%F1%2BU%D3%9A%EA%2F%8D%3F%1D6%0C%F9h%DF%125%60%F3%E3%AE%D1%E7%F3%8A%CC%FF%00%86%8E%F1%E0%EB%F1%B3%E3%B8%FA%FCE%D5%F3%FF%00%A3%E9%7F%AF%987%A2%84%BF%0F%F3%12%F0%2B%1F%7B%7Df%1F%F8%0C%8F%E8%9Bf%0Er%7F%3A%5E%B5%FC%F4%E8%3F%1A%BE!%EB%EC%FEW%C6%DF%8EQ%C7%18%24%C9'%C4%7D%5DU%8F%F7G%EF%FA%D1%A2~%D7%3F%16%BE%1Ak%CB%7B%A3%FCp%F8%C1g%ABY%12%17%FBS%C4%F3%EBv%DB%BB%06%B7%BDi%60q%D4a%90%9FB%0DTx%F3%06%E5%CB%C9%2F%C3%FC%C4%FC%0B%CC%5D%D4q0%BF%A4%8F%E8Z%8A%FC%F7%FF%00%82%5B%7F%C1a%EE%BFi%CF%19%C7%F0%C7%E2%8F%F6V%97%F1%01%E02h%DA%9E%9E%AD%15%8F%89%91T%97%026-%E4%5C%A8%1B%8C%7B%CA%B8%0EW%EE%E0~%80%E2%7Fo%FB%EC%7F%F15%F58%2C%C2%86.%9F%B5%A2%EE%8F%CAs%FE%1C%C7d%D8%B7%82%C7G%96K_%26%BA4%FA%AF%F8gf%7F1_%F0%5E%AF%8Aw%3F%B5%97%FC%15%83%C5ZLWbM%3F%C1%B7k%E1-8m8%89%A1%2C%D3%82%A3%A9%FBKJ7u%DB%C7N%2B%C9%FC9%FB%24k%DF%1C%B4%5D%5B%C3%96Kaeyd%F1%24%0B%3E%9D%1C%C9r%B9%05%CB%CB%86x%86%CE%01%00rrkG%F6%F3%9E%F7%C2%DF%F0U%1F%8Dmt%869%A2%F8%9F%AC%CF%1E%F1%C8%8E%5B%D9J%1E%7Bmd%20%F7%CDz%9F%87%3Fm%0DK%C3%7F%0C%BF%B1t%3B%1BK%7D%5Ex%1A%19.%8C%01%A6%3E%8C%1B%D7%1C%0A%FC%EF3%C5b!Z%F4%F5w%DF%CF%B9%FDg%90%E5te%94%C2%8C%15%97*O%5B%5DZ%DA%DB%CB%E6%CC%DF%D9o%F6%40%D2%FE%14%7CS%9F%C2%9A%EE%B1k%AB%E9%9A%7D%8B%DC%88-%1D%99!%94%AB%E22q%CE%0A%82Tq%D2%BE%91%FD%9F~%12%7C(%D6%BC5%A8h%1A%D2%DA%E8%AF%A9%22Aqg%A8%5B%C3%25%8D%F2%872%20Et%C2%80%FD%BB%15S_%14%7C%25%FD%AA%BCg%F0%DF%E2%86%AF6%89q%FD%97%A9%DDB%D1%FD%B2%EA%0F8%DC%0D%8C%18)%3Fu%B6%92%3D%3F%1A%ED%FE%1D%FCw%F1'%8C.u%3D%2B%E2O%8A%B4%9B%7F%0Ca%04%3AT%C1%FE%D7%1B%2B%0C0%00%02%AD%DF%E5%3D%0F%E3%5EN%22%96%25%CD%D5%94%B5%B2%DBw%7FC%D6%A9%87%A5*K%0FOHh%97%95%AF%7D%1A%B5%B6%B7%7F%2B%1Fn%F8%E7%C3%9E%11%F8K%A6%5E%DCi%B7vW%B7%D70G%09%7Bo*%2F%B0%A2%E0%00%15%14%02F%00%C9%C9%DA00%2B%E2%BF%8E%9F%10%DFO%F1%16%97%AB%DB%19%DC%19%DFO%95%D8%E0%9D%D8h%C9%FA8%FD%2B%8B%F1o%ED%09%E0%AF%86%5E%24%BC%84x%AEMJ%CA%DEW6%D1a%9E%E9%D3%1C%02%07%00%E4%E3%24%8C%E2%B9%8F%1A%FClO%1F%FC%13%D5%2F%925%89d%BD%85%EC%AD%D5A%956n%3Ed%8D%D0%13%C6%10s%8EOj%E7%A7%96%D5sR%A8%9BOK%BF%3D%0E%9C-L%3D%18%3At%EAs%CE%DF%97%92%D8%EB%AC%BE.h~'%D7%23%97S%96%E7E%8Ay%7F%D3%9E8L%F2%5B%C2%1B%E6%9E8%D5%86%E3%9C%82%A6%BDc%C1%D1%FC%1B%F8%9Fi%A8O%17%C6%7DJ%CBC%F0%E5%B8%9Ey.%B4e%B3%8E%02~%E2%A8%92%5D%F2%BB%11%FC*O%3F%40%DE%05%F0%03%C1%DE%11%F8%CF%FBB%E9%D6%3E%22%D4N%83gu%1E%E0%D0%DD-%AA%DC7%95%BA%20%25%7C%AA%12%C4%03%91%C9%26%AEj%DF%F0O%2F%8D%9E%2C%D5%A1%B2%7F%05A%0D%9Cg%CCi%AD%EF%ED%16%0B%83%C9%F3w%99%009%C9%23%D3%3D%05q%E2%B0%D8U%3Fe%3A%CE%93I%3D%5CR%B3%ED%CC%B5%DB%A3%D3C%D4%96*n%0B%F7%9C%AE%DAm%D7%AD%E4%9D%AD%D7%FE%09%DF%FC'%D7m%3Fh%AB%FDv%E2%0DZ%C3O%F0%F7%84%8E%2F%BCK%A9%B3%C1jaf%D9%19u%1F1%99%88%CA%A0%24%92px%15%E9~(%F8%07%A6%DD%8Bo%0A%F8%2F%E2%86%9B%AA%F8%96%F7I%8B%5E%83G%BE%B0%7D%3D%B5kwB%EA%EB%2B9%1B%8A%8C%88%8E%1B%9Cq%F7%8F%8B%FC%3B%F8w%A6%F8%B7%E0%7F%8A~%0B%EA%9A%FF%00%86%BE%1Ex%9FD%F1%8C%1A%95%EB%EAz%82%247%B6b%01%0B%20%91IY%1E7%25%F6%82O%3Cr%2B%D1%AE%3C)y%F1%03%F6%B1%D2%FE%2F%3C%D6%FE%12%F8%3B%E0%E9!%8FN%D6onV7%D4%A0%B2B%82(cf%F3%18I*%90%06%DECr%09%F9O%9B%8B%5C%B5d%E9%CF%95E6%93I%A7%A2%E5%E9%EF9%B6%EC%A3%D1y%15%3CUd%EF%CDkvJ%CD%FC%D3%7D%EDf%B4VZ%98%7F%0A%F4o%10~%D0%3A%3BZ%E8%F0%D9%CFo%A1%5E%25%95%D5%E5%EE%AB%05%A5%C4r%F0Y%3C%B9%189%402%07%07%18%C5z%2F%C6%0F%D9%3F%C7%1E%13%F8%85%AEh%FF%00%0Fl%A1%D5t%87%F2%E4%B7%92%7Db%D8j3%A7%92%1D%E3T%DC%AF%C3%17%E83%B5A%AF%9E%BE%0E%FC.%B6%FD%A2%BFh%1F%13x%BE%FBN%B6%F0%F7%814mrm%7F%5D%D5%EE%DCD-%91%E6y%96%D9W'%3B%D7%0A%14g%1Cu%3F%7B%D4%3Ffc%E2%DF%8A_%B6%E5%FF%00%C6%FDSC%9A%CB%C0%02mOP%83W%BA%C6%D8%AD%23%B7%96%DA8%C9%CEK%00P%7F%BD%D2%9E6%15)Ns%84%E2%A3%18%5D%C5%AF%B4%EC%D4o%CC%AE%DD%9E%DB.%9A%97_%19Z2r%8D%B4MZ%CD%AB%E8%D2n%EB%5D%1D%AD%DF%AD%D1%E6p%7C%7D%D3%7C9%A7.%8D%A8%CEo%84%CD%9B%92%AD%81b%FE%89%FE%D0%3C7%D2%A7%D6%BE4%D9x%12%CE%2B%8B9%22%BA%BD%BC%8C-%BD%C4d%BC1%260Xg%AC%AD%D4%8F%E1%CF%15%C2%7C9%FD%A0%E3%F8%01%A6%FD%82%F7%E1%EF%C3%9F%15%9DZ%E5%B5%09%2Fu%FD%04_M%10a%B7%CB%8EB%C3(%0A%E7%03%BB%1FZ%EA%7CM%FBl%5DhI%1A'%C1%EF%80%B7%167%00%BD%A4%F0%F8L%85%24%F1%B8fC%B5%C7%A1%19%CD%7B%13%C0%CF%DA%25%0AwO%FB%C9'%F2%E9%E9%D8%E8%A9%8C%9C%5C%97%25%ED%E7%F9%AB%7FOC%D0%FC%24%B2%A7%EC%B9%E2o%1F%5CK%A9_%EA6%9A%C4%3A%7B%D8%A3%07%81%E1%920%EF%23%80%0B%07%1B%81%04%9A%E6uO%8B~%09%D0%BE%19%E9%FA%C6%9D%AA_%EA%5E%25y%11%9E%CEX%80%B5%84%EF%942H%7D%40%10%B8%20%F2%09%18%AB%BF%00%BE-%F8%AF%F6l%FD%83%7Cg%E2m%1A%EDlu%D6%F1%9D%B0m%D1%24%B8W%80e%19_%23%04.1%D6%BC%8B%E3%97%C7%7B%AF%8B%D1i%DE%22_%0Dx%5BN%DB%03%C1%A9%CF%A5Z%1BQ%A81%20%83r%83*%24%5C%1C%3A%A8%CEk%9B%09%83%A9W%11R2W%82%9BI%A7m%92%7C%AD%5Bmti%DC%98bd%E5%255k%3B%F9%A5e%BA%B6%DE%8E%E7%D6%FF%00%00%BE%09%D9x%DF%C2%F7~9%D7%BE%26%F8li%87O%1B~%C7z%D1%BD%B5%E4%A8%A6(.7%C6T*n%C3%A2%8E0k%C8%3E%26%F8%93A%F0V%BB46%9E%25%D1%7CIo%02Gqqq%A34%CF%1A9b%AD%02%97%0A%0F%F7%B3%806%E3%06%BD%5B%F6U%F8%E9%AB%F8%8B%E1.%A1%ABx%5B%C3%1A%CE%93%E1o%04%CFl%20%F0g%87dV%D55%A9%DC%02%F7ws%B2%F9%86%1E%0E%161%F3%60%83%80%A2%BC%B3%F6%EA%F8%A3%E3%BB%1F%11%DE%B5%B7%82%C7%85%FE%1C%EA%3A%AA%5C-%94%FE%1F%8FM%9BWx%CA%BC%8F%3B%01%E6%B6%F6%DCO%23%20%E4%80I%AF%2B%03%1CD%F3%19%D0%ABktW%8A%B6%DAh%B5%95%9D%F4v%F3%D1%91G%15R5e)6%E3%DBM%16%9D-%7B%D9%DFGku%D0%F5o%17%FC3%F0%F6%A3%F1'F%D1%F4%BF%1C%EB%96w%DF%D8%AB%E2%1B%C9%2F%F4%C5H4%DB%0F%B2%99%F6%81%13%163*%85%060%A7%BF'%ADG%FBD%7C.%F0%AF%83%FE%1F%DCx%AF%40%F1%9CZ%A8%87F%D2%F5%0B%ABY%AD%26%8EI%FE%DB%92%B3%C4%CC%15F%F0%B28%88%E5%95P%EE%20%D7%B5%F8%B6%F3%5Cd%D5%7Cf%DAm%AD%DF%F6D7W%BA%0CPZ%2B%BD%DD%B4%9A-%AA%24%11%84%05%E4%0Dy%2C%88%03%12r%07%25q%5E%2B%FF%00%05%1E%9B%C4%83%F6t%BD%BB%B8y%F5H%FCE%ACX%CF%A7%AB%E9Q%C4%DE%0D%B3HD%DFg%99%E2%8Fz%CD%E6L%AB%B5%89%F9W%D4%D7%93%97c*%D7%C5Q%A3%CDet%9E%AB%7B%A6%D7%C3%D1y%ABt%BB%DF%96%962%ABt%E4%A4%DD%96%ABMZz%AF%87%B7%9A%B7%E7%DAx3%F6s%F0_%8B%3C3%A3%DF%C9%E2_%12Ocz%19%EC%F4%98%AF%B4%88%A6%BD%01%19%9A%E1%1B%EDEH%8C%8F%9Fq%DC%08%23%02%B8%EF%DA7%E1%FF%00%84%BE%1E%7C%1A%B1%F1f%9F%E2%FB%CF%12O%3C%A2%CA%12%B3%D9M%12%C8%1B%05ghg'%A6%E2%0An%FE%10q%5E%E5%FB9k%9E(%8F%C1%3E%18%FF%00%84%A7%C5%91%EA%12B.%D2%3B%E6k%8D-%F5%60c%96A%FE%8D%3D%A2%B4%86%25%07%E6F%DB%85%04%83%8A%F0%AF%F8(%F6%A1%E2%8DW%F6l%B66%5E%2C%86_%0C%3A%06%93%EC%F2O%A9%A6%BB%E6%CE%85%3C%CB%B4%B6Hb%08W%20nRFyn%2B%9F.%C5bj%E6%91%C3N~%EF5%AF%D1%AB%BF%2B%EBo%2F%3B-%A6%9E'%10%AB%FB%CE%E9%3D%B4%DB%5D6%F2%5E%7D%DD%B6%F9%1A%1F%DA%CF%C6%5E%0E%F8%9B%E1%7F%12%F8zf%B4o%01%EB%16%FA%AD%9E%20P%EB2L%9F%3B%9E%1B%E78%1Bs%F7I%07%AD%7F%60~%5B%FA%A7%E4%7F%C6%BF%8B%EF%19x%B3U%F1%0E%8B%F6Y-V%11%0C%A8%D7%868%82%19%E4%DE%06_%DF%1D%BB%90M%7Fh%3EY%F5O%CA%BF%A18j%92%84%26%A3%14%B6%EB%EA%7F%3F%F8%E9g%88%C2Mku%3D%D5%BA%C7E%E9%F9%DF%B9%FC%E1%7F%C1%CC%FF%00%B3%25%F7%C1o%DB%EA%E3%E2%24%10%CB%FD%85%F1J%DDX%DC%05%C2%5B%EA%16%AA%B1%3C%7Cp3%1A%C2%E0%F7%2C%DE%86%BE%03%D7%FF%00i%8Dk%C3%D76%A9ega%2C%7Bs%F6%88bfx%8E%3E%60I%18%1E%DE%D5%FDN%7F%C1J%BFa%9F%0D~%DE%1F%B3%FE%BB%E0%AF%10A%10%92%E3u%CE%99%7B%B3t%BAm%EA%AB%F9S%A7%B8%25%81%1D%D4%B2%F7%AF%E6%13%E3%CF%EC%C1%F1%07%F6%18%F8%B5y%E1O%88%1AL%BA%7D%FD%84%8C-.%D1%0BXkP%82v%CD%13t*%40%CE%09%CA%E7%AEA%15%96a%81P%AA%EAIs'v%BE%7F%E5%F9%7C%CFG%82%B8%96X%EC%BA%9E%02%9DOgV%09'%A7%D9VK%EF%5D%7B%AF5w~%CD%D6%9A%B7%C6%3D~f%8F%C4z7%87%EC%25%2C.%AF%EF%99%D9%A3%5Cg%00%20.%06F%3Bd%9A%F6%CF%89%FF%00%B3%0F%85t%8F%0B%CCt%CF%19x%A7%C5%FA%8BD%85%5E%1D6%05%B3%90%90%84%FC%E6Y%5C%8F%99%B2%5Bo*8%19%E3%CA%7C1%17%87%26%8E%1DoIkM%3E%FA%40d%90%CA%01%8E7%1C%93%F2%8C%F5%FF%00g%9A%F5%DF%D9%D7%F6%8B%BC%F1%EE%B5w%17%8E%BE!Z%7D%8E%DA%5D%B1%99m%E5%98L%8B%D0m%3BW%23%03%19%FE%95%F3%D8%9CKW%9D8m%BD%EF%7F%C1j~%97%87%C3T%8F-%3A%F5%1B%BD%F6Z%3F%CF%EE%3Eq%F8%8F%FB'%EA%1F%0D%7C7q%AEj%F6%B3%AC%97%93%ED%D3%ED%C2%22%B8%88%B6%03%C8%00%F9K%1C%E0zv%AD%8F%14%F8%A7I%B2%F0%25%B6%85c%0Cv%F2%C7%0A%861%9C%FE%F0cvO%7C%F1%CDw_%B7W%EDQc%F1SQ%8E%C3D%0E%9At%5B%227%1F%F2%D6%E7o%DD%3BG%DD8%EC2z%D7%B1%7F%C17%7F%E0%81%DF%10%BFo%3F%06%3F%8B%7CC%AE%5E%7C5%F0%CD%ECA%F4i.%B4%A6%B9%BE%D4%09%E4J%23%2F%1E%D8%8A%90C%9C%93%9E%01%CEGf%12%9D%7C%5C%23*%AA%CE%F7H%F2qx%FC%06K)T%9D%A3%16%95%DB%F9%DF%CD%B7%7B%24%AE%FC%AC%9D%BEU%B0%8A%C3%C6%3A%7CW%86%F6%1D%26k%1C%7D%B5%1B%81%B4r%1E0%3A%9C%F1%B7%A7J%CA%D7%BC%7D-%E5%F4%8Bh%D3Ac%86T%85%98%F3%9F%E3%23%A6%EC%F3_%B0%96%3F%F0g%5D%BC%F1)%FF%00%86%84%D4b!%40%23%FE%10%E0~%BF%F2%FDR%9F%F83j%CC%FF%00%CD%C5%EAc%B7%1E%0E%1F%FC%9D%5D%B1%C8%AB%DE%EE-%AE%9Bi%F8%9C%7F%F1%16%F2(AF%15%D2%7Dm%1A%9A%FF%00%E4%9F%F0%E7%E3%FD%95%8D%97%C4%3BT%8Bu%BD%96%B3%02%E1%99%B0%B1%5D%A0%00%12%7D%18%01%CF%AD%1E%26%F1%7C6%DFg%B2%B1%2Bu%0D%8A%AA%3C%F3%A0e%BA%23%FD%93%FC%1C%F4%EF%D4%D7%EC%0F%FCA%BBh%A3%03%F6%89%D4%88%F7%F0h%3F%FB%7DH%DF%F0g%05%A3%F2%DF%B4V%A3%9C%E7%FED%D1%D7%FF%00%03%A9%3C%8F%10%9D%E5%1D%3A%2B%AF%F3%2F%FE%22%E6B%A2%F9k%25'%BB%E5%A9%AF%FEI%FF%00%0E~%3Eh%3A%E4Z%F5%8C%9AM%FD%E4%F6~y_%22%60%C4G%95%CE%D8%E4Q%C1%5EN%18%F2%B9%C0%ABZ%EF%89f%F0%9F%87%7F%B0m5%09%EE%25g%CD%D6%C9O%90%87%FEy%A8%CE%0F%3C%93_%AFI%FF%00%06pZ%A2%E0~%D1Z%97%FE%11%A3%FF%00%93%A9%5B%FE%0C%E0%B5%DB%CF%ED%15%A8%E0%F5%FF%00%8A4%7F%F2u%0F%22%AE%E5%ACt%DE%DAo%F7%84%7C%5D%C8%94%2C%AB%FB%DB_%96%A6%DF%F8%07%E2~%3B%E9%BE4%87XY%2Cux%E2%1Au%C1%CCF(%C2%FD%85%CFFA%FD%D3%FCK%DF%ADj%FD%B9%3E%19i3%40.%AD%B5%2B%CB%96%0Fn%83%12Cl%3F%86c%9E%92%10x%03%D6%BF%5CO%FC%19%BFh%1B%3F%F0%D1Z%91'%9E%7C%1C%3F%F9%3A%9D%FF%00%10qZ%E7%8F%DA'Q%E9%8E%3C%1A%07%FE%DFT%CF%24%AC%DD%B9t%EA%B4%FF%00%3F%F8p%A7%E2%E6D%95%DDu%CD%D1%F2%D4%FF%00%E4%3E%EE%C7%E3%C6%9D%F1OP%8E%D6K%0B%AB%9B%8B%8D%16%EEa5%ED%80%99%96%0B%A9%008%99%D782%80N%1C%8C%F3%D6%B5%B4%B3%A7%F8%05f%D4%E0%BEMF%D2%F16%5BY%60%131%F4%98%1E%06%DF%D6%BF%5C%3F%E2%0D%FBF%CB%1F%DA%2FS%DD%9F%FA%13%87%FF%00'R%8F%F83z%D4%A8%FF%00%8C%8A%D4q%FF%00bh%FF%00%E4%EA%A9d5%DB%E5%8Cm%DDi%AF%E2M%3F%172%18%EB*%C9%BE%8F%96%A6%9F%F9!%F8%EB%A5%7CZ%D74Ms%FBF%C3Q%B8%B2%BC%25%B35%A4%86%DEGS%81%B3*A%D81%C0%ED%81%5D6%A9%E29%FCaqo%E2%0DC%C5%1A%AD%FD%8D%88%C7%91%7Dy%25%CD%C4%12%1E%B0%A6%F2~V%E7%07%D0%F3_%AC%3F%F1%06%E5%98'%FE2%2FR%CF%FD%89%C3%FF%00%93%A9%EB%FF%00%06n%DA%A1%E3%F6%8A%D4y%FF%00%A94%7F%F2uL%F8~%AB%7C%D1%85%9E%DFgn%DB%8E%9F%8B%99%1Aw%A9%5D%3F%FBv%A6%9F%F9!%F8%F7%07%C5%FDkA%D5%EE%AE4%3B%EB%BD%03%ED%0C%9B%05%85%C3%5B%98%D69%04%882%84tuV%1F%ED(%3DEl%D9x%9A%EF%C5%F6%17%F2%C5%E2%7DKH7%EE%B2%EB%B1%3D%EC%9E%5D%F6%D6%0E%B2%95%CF%EF%1C8%07%0D%9EFk%F5%9C%7F%C1%9BVa%8F%FCdV%A7%92%7F%E8N%1F%FC%9DO_%F83v%D06%7F%E1%A2%B5%2C%FF%00%D8%9A%0F%FE%DFUO%87%EA%EF%18Y%F7%F7%7F%CC%98x%B7%916%FD%ADt%D3%FE%EDO%97%D8%3F%23%BCO%FBA%F8%A3V%F1%C4z%D4~%23%D7%A4%D4%EC%E3x%60%BF%B9%BE%96K%B0%1D%0ClK%96%DC7%2B0%C0%3D%18%8E%95%1F%86%BCM%A8x%83%C1%3A%8E%81%0E%BD%A8ipK%1A%CBuh%2F%9E%2B%3DI%10%86%FD%ECa%82%B3%AE%01%1C%1F%BB%9E%B5%FA%E8%BF%F0f%DD%A2%F1%FF%00%0D%15%A9%F1%FF%00Rp%FF%00%E4%EA%E8%3E%1B%7F%C1%9E%DE%09%D2%3CI%1C%9E%2F%F8%D7%E2%CF%11i%09%91%25%9E%9B%A2%C5%A6K!%E3%FEZ%BC%D3%E0%10H%23g%7C%821%CC%BC%82%A4b%94!k%5B%F9z%7C%C5%FF%00%11k%22%D5%CA%B2k%B7-O%92%5E%E6%9EG%E7%0F%FC%13%BB%F6O%D6%BF%E0%A5%FF%00%B6W%85%7C%0D%A4%D8%5D%5Cx'F%BD%83Q%F1v%A8%B1%EC%02%CE%23%99%1AW%03%01%E5%03b%0EN%5B%9E%99%1F%D5~%0F%F7%A4%FC%87%F8W%93~%C8%7F%B1%8F%C3%1F%D8k%E1%BF%FC%22_%0C%BC%2Fa%E1%BD%2F%22%5B%99%23%0D%25%D6%A3%20%FF%00%96%D3%CC%FF%00%3C%AC2pI!w%1Cm%07%15%EB%99%3F%DDo%CCW%D2%E58%18%60%E9%F2%DA%ED%FF%00_%D7%DD%D0%FC%1F%8F%F8%CE%7CA%8D%8DT%AD%08_%96%FB%EBk%BE%B6%D9i~%97%DD%D8%AF%A8i%91%DD%82J)c%DF%1C%FF%00%9E%07%E5%5E%11%FBV~%C3%DE%01%FD%AC%7C%11q%A1x%EF%C3%3AO%88t%D9%5C%C9%1F%DA%A2%06%5Bw%23%1EdN%00h%DCp7)%07%D4%D1Ez%B5)BK%96J%E8%F8%9C.*%B5%09%AA%94d%E3%25%B3N%CC%FC%B8%F8%EF%FF%00%06%A7%E8%8F%A9%DC%DC%FC8%F8%9D%ADx%5E%CERY4%FDR%D1u%18%94%93%C2%2C%81%E3eA%D0e%5C%E0%0C%96%3C%D7%99x_%FE%0DJ%F8%81s~%23%D5%FE0%E8V%B6Hs%E6YiRO3%F6%CE%19%E3%03%3E%C6%8A%2B%CC%96WB%F7W%FE%BDO%B6%C3q%DEs%1A%7C%9E%D2%F6%DBE%A7%DDd%FEi%9Fg~%C4%DF%F0n%0F%C1%AF%D9%C3R%B4%D7u%C4%BC%F8%91%E2%5B%7D%AC%B3%EB%BB%0D%942%0EK%C7l%01Q%C9%24%072c%8Ex%CD~%91%F8%3F%C1%16%BE%1E%B4%8D%22%868%F6%00%00P%068%C7%F2%A2%8A%ED%A1%86%A5O%E0G%CDf%B9%C63%1D%25%2CT%DC%BF%04%BD%12%D1%7C%91%D1%C7%18%89%00%00%00%3D)%D8%1E%94Q%5Dg%86%14%9BG%A0%A2%8AV%40%2FJ%3A%D1E0%13h%3D%85(%18%14Q%40%06(%A2%8A%000%3D%05%18%A2%8AV%40%14QE0%0A0(%A2%8B%00%81%15I%20%00O%24%E3%AD.%07%A0%A2%8A%2C%07%FF%D9";

}

function Del_Card(card_id,id) {	
	var data = "deck_file=&target_card="+card_id+"&mode=del&p=1&ssid="+id;
	GM_xmlhttpRequest({
		method:"POST", 
		url:"http://" + host + "/card/deck.php",
		headers:{"Content-type":"application/x-www-form-urlencoded"},
		data: data,
		onload:function(x){console.log(x.responseText);location.href="http://" + host + "/busyodas/busyodas.php";}
	});
}

// @name           bro3_Trading_support
// @namespace      3gokushi-elmore
// @description    bro3_Trading_supportと同機能改造版

function TradingSupport(){

	var area = "";
	if(path.indexOf("/card/trade_card.php") != -1) area = "cardColmn"; 
	else if(path.indexOf("/card/busyobook_card.php") != -1) area = "busyo-card clearfix";	
	else if(path.indexOf("/card/busyobook_picture.php") != -1) area = "busyo-card";	
	else if(path.indexOf("/busyodas/busyodas_result.php") != -1) area = "back";
	var cards = document.evaluate('//*[@class=\"'+area+'\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < cards.snapshotLength; i++){
		var card = cards.snapshotItem(i);
		var cardno = document.evaluate('//*[@class=\"cardno\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).innerHTML;

		var link = "http://"+host+"/card/trade.php?s=price&o=a&t=no&k="+cardno;
		var html = document.createElement("div")
		html.align = "center";
		html.style.position = "relative";
		html.style.zIndex = "10";
		var child1 = document.createElement("a")
		child1.href = link ;
		child1.innerHTML = "<span style='background-color:white;'>　トレード画面を表示　</span>";
		html.appendChild(child1);
		var child2 = document.createElement("br")
		html.appendChild(child2);
		var child3 = document.createElement("span")
		child3.id = "BT"+i;
		var child31 = document.createElement("input")
		child31.type = "button";
		child31.value = "即落札価格を検索"
		child31.alt = cardno;
		child31.addEventListener("click",ReserchValue(cardno,i),false)
		child3.appendChild(child31);
		html.appendChild(child3);
		var child4 = document.createElement("br")
		html.appendChild(child4);

		card.appendChild(html);

	}
}

function ReserchValue(n,i) {
	return function() {
		var dom = document.createElement("div");
		var url = "http://"+host+"/card/trade.php?s=price&o=a&t=no&k="+ n;
		dom.innerHTML = getContentFromURL(url);
		dom.id = 'TempDOM1';
		dom.style.display = "none";
		document.body.appendChild(dom);

		document.getElementById("BT"+i).innerHTML += "<span id=textarea"+i+" style='background-color:white;'>取得中：<span id=nowpage"+i+">0</span> / <span id=lastpage"+i+">0</span> ページ</span>";

		var textarea = document.getElementById("textarea"+i);
		var now = document.getElementById("nowpage"+i);
		var last = document.getElementById("lastpage"+i);

		var lastpage = 0;
		if(dom.innerHTML.indexOf("pager") == -1){
			if(dom.innerHTML.indexOf("現在入札可能な出品はありません") != -1){
				lastpage = 0;
				textarea.innerHTML = "&nbsp;出品なし";
				textarea.style.color = "red";
			}else{
				lastpage = 1;
				last.innerHTML = lastpage ;

				var TP = SeachMinTP(1);

				if(TP == 999999){
					textarea.innerHTML = "&nbsp;即落札なし";
					textarea.style.color = "red";
				}else{
					textarea.innerHTML = "&nbsp;<b>"+TP+"TP</b>";
					textarea.style.color = "blue";
				}
			}
		}else{
			var address = document.evaluate('//div[@id=\"TempDOM1\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"pager\"]//*[@title=\"last page\"]/@href', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
			address.match(/trade.php\?p=([0-9]*)/);
			lastpage = parseInt(RegExp.$1);
			now.innerHTML = 1 ;
			last.innerHTML = lastpage ;

			var TP = SeachMinTP(1);
			if(TP == 999999){
				for(var p = 2; p <= lastpage; p++){
					var dom2 = document.createElement("div");
					var url2 = "http://"+host+"/card/trade.php?p="+p+"&s=price&o=a&t=no&k="+ n;
					dom2.innerHTML = getContentFromURL(url2);
					dom2.id = 'TempDOM'+p;
					dom2.style.display = "none";
					document.body.appendChild(dom2);

					TP = SeachMinTP(p);
					document.body.removeChild(dom2);
					if(TP != 999999) break;
					now.innerHTML = p ;
				}
			}

			if(TP == 999999){
				textarea.innerHTML = "即落札なし";
				textarea.style.color = "red";
			}else{
				textarea.innerHTML = "&nbsp;<b>"+TP+"TP</b>";
				textarea.style.color = "blue";
			}

		}			
			
		document.body.removeChild(dom);
	} 
}

function SeachMinTP(p){

	var TP = document.evaluate('//div[@id=\"TempDOM'+p+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"tradeTables\"]//strong',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var limit = document.evaluate('//div[@id=\"TempDOM'+p+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"tradeTables\"]//td[@class=\"limit\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var MinTP = 999999;
	for( var j = 0 ; j < TP.snapshotLength ; j++){
		if(limit.snapshotItem(j).innerHTML == "---"){
			MinTP = TP.snapshotItem(j).innerHTML;
			break;
		}
	}
	return MinTP;
}



function ExhibitSupport(){

	var area = "";
	if(path.indexOf("/card/trade_card.php") != -1) area = "cardColmn"; 
	else if(path.indexOf("/busyodas/busyodas_result.php") != -1) area = "back";
	var cards = document.evaluate('//*[@class=\"'+area+'\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < cards.snapshotLength; i++){
		var card = cards.snapshotItem(i);
		var target = "";

		if(path.indexOf("/card/trade_card.php") != -1){
			target = document.evaluate('//*[@class=\"control\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).innerHTML;
			target.match(/go_exhibit_confirm\(([0-9]*)\,0\)/);
			var cardid = parseInt(RegExp.$1);
		}
		else if(path.indexOf("/busyodas/busyodas_result.php") != -1){
			target = document.evaluate('//*[@class=\"center\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).innerHTML;
			target.match(/\'([0-9]*)\'\)/);
			var cardid = parseInt(RegExp.$1);
			var rarerity = document.evaluate('//*[@class=\"soltype\"]/img',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.src;
		}

		var html = document.createElement("div")
		html.align = "center";
		html.style.position = "relative";
		html.style.zIndex = "10";

		var div01 = document.createElement("div")
		div01.id = "DIV01"+i;
		var child5 = document.createElement("input")
		child5.type = "text";
		child5.size = "10";
		child5.value = "999";
		child5.id = "TXT"+i;
		child5.style.textAlign = "right";
		div01.appendChild(child5);
		var child6 = document.createElement("input")
		child6.type = "button";
		child6.value = "出品する"
		child6.id = "BT2"+i;
		child6.addEventListener("click",ExhibitCard(cardid,i),false)
		div01.appendChild(child6);
		var child7 = document.createElement("input")
		child7.type = "button";
		child7.value = "手数料"
		child7.id = "BT3"+i;
		child7.addEventListener("click",simu(i),false)
		div01.appendChild(child7);

		var div02 = document.createElement("div")
		div02.id = "DIV02"+i;
		var child8 = document.createElement("input")
		child8.type = "button";
		if(path.indexOf("/busyodas/busyodas_result.php") != -1){
			child8.value = "保護を解除"
			child8.addEventListener("click",Deprotect(cardid,i),false)
		}else{
			child8.value = "出品不可"
		}
		child8.id = "BT2b"+i;
		child8.style.color = "red"
		div02.appendChild(child8);
		html.appendChild(div01);
		html.appendChild(div02);
		card.appendChild(html);

		if(path.indexOf("/card/trade_card.php") != -1 ){
			if(target.indexOf("このカードを出品する") != -1){
				div01.style.display = "block";
				div02.style.display = "none";
			}else{
				div01.style.display = "none";
				div02.style.display = "block";
			}
		}
		else if(path.indexOf("/busyodas/busyodas_result.php") != -1){
			if(rarerity.indexOf("r.gif") != -1){
				div01.style.display = "none";
				div02.style.display = "block";
			}else{
				div01.style.display = "block";
				div02.style.display = "none";
			}
		}

	}

	function ExhibitCard(n,i) {
		return function() {
			var txt = document.getElementById("TXT"+i);
			var bt2 = document.getElementById("BT2"+i);
			var ssid = document.evaluate("//*[@id='gray02Wrapper']//*[@name='ssid']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if(ssid.snapshotLength == 0){
				var ex_dom = document.createElement("div");
				var url = "http://"+host+"/card/deck.php";
				ex_dom.innerHTML = getContentFromURL(url);
				ex_dom.id = "ex_dom";
				ex_dom.style.display = "none";
				document.body.appendChild(ex_dom)

				ssid = document.evaluate("//*[@id='ex_dom']//*[@id='gray02Wrapper']//*[@name='ssid']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			}
			var id = ssid.snapshotItem(0).value;

			var data = "exhibit_cid="+n+"&exhibit_price="+txt.value+"&ssid="+id+"&exhibit_btn=出品する";
			GM_xmlhttpRequest({
				method:"POST", 
				url:"http://" + host + "/card/exhibit_confirm.php",
				headers:{"Content-type":"application/x-www-form-urlencoded"},
				data: data,
				onload:function(x){console.log(x.responseText);change_mes();}
			});

			function change_mes(){
				var dom = document.createElement("div");
				var url = "http://"+host+"/card/exhibit_list.php";
				dom.innerHTML = getContentFromURL(url);
				if(dom.innerHTML.indexOf("cardWindow_"+n) != -1){
					bt2.value = "出品成功";
					bt2.style.color = "blue";
				}else{
					bt2.value = "出品失敗";
					bt2.style.color = "red";
				}
			}
		}
	}

	function Deprotect(n,i){
		return function() {
			var id = document.evaluate("//*[@id='gray02Wrapper']//*[@name='ssid']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;
			var data = "deck_file=&target_card="+n+"&mode=deprotect&p=1&btn_change_flg=&ssid="+id;
			GM_xmlhttpRequest({
				method:"POST", 
				url:"http://" + host + "/card/deck.php",
				headers:{"Content-type":"application/x-www-form-urlencoded"},
				data: data,
				onload:function(x){console.log(x.responseText);change_btn();}
			});

			function change_btn(){
				var div01 = document.getElementById("DIV01"+i);
				var div02 = document.getElementById("DIV02"+i);

				div01.style.display = "block";
				div02.style.display = "none";
			}
		}
	}

	function simu(i){
		return function() {
			var price = document.getElementById('TXT'+i).value;
			var commission = Math.floor(price * 0.1);
			if( price >= 500) commission += Math.floor((price-500) * 0.1);
			if( price >= 1000) commission += Math.floor((price-1000) * 0.1);
			var value = price - commission;
			alert("出品価格："+price+"\n手数料："+commission+"\n受取価格："+value);
		}
	}

}


// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    即落札補助　ｂｙきの。

function ImmBid(){
	var table = document.evaluate('//*[@class=\"tradeTables\"]//tr',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var exhibit_cid = [];
	var exhibit_id = [];
	var address = [];

	for(var i=0; i < table.snapshotLength; i++){
		var td = document.createElement("TD");
		td.innerHTML = "";
		if(table.snapshotItem(i).innerHTML.indexOf("---") != -1 && table.snapshotItem(i).innerHTML.indexOf("入札") != -1){
			var regexp = /inlineId=cardWindow_([0-9]*)[\s\S]*?trade_bid.php\?id=([0-9]*)(\S*)"\>/
			table.snapshotItem(i).innerHTML.match(regexp);
			exhibit_cid[i] = parseInt(RegExp.$1);
			exhibit_id[i] = parseInt(RegExp.$2);
			address[i] = RegExp.$3.replace(/\&amp;/g, "&");


			var btn = document.createElement("INPUT");
			btn.type = "button";
			btn.value = "落札";
			btn.id = "IB_BT"+i;
			btn.addEventListener("click",ImmBidSend(exhibit_cid[i],exhibit_id[i],address[i],i),false);
			td.appendChild(btn);
		}
		table.snapshotItem(i).appendChild(td);
	}

	function ImmBidSend(cid,id,add,i) {
		return function() {
			var data = "exhibit_cid="+cid+"&exhibit_id="+id+add+"&buy_btn=落札する";
			GM_xmlhttpRequest({
				method:"POST", 
				url:"http://" + host + "/card/trade_bid.php",
				headers:{"Content-type":"application/x-www-form-urlencoded"},
				data: data,
				onload:function(x){console.log(x.responseText);change_mes();}
			});

			function change_mes(){
				document.getElementById("IB_BT"+i).value = "完了";
				document.getElementById("IB_BT"+i).style.backgroundColor = "blue";
				document.getElementById("IB_BT"+i).style.color = "white";
			}
		}
	}
}

// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    カード画面マウスオーバー表示　ｂｙきの。

function OverMouse(){
		var dtt = document.getElementsByClassName("thickbox");
		var card_id = [];
		for (var i = 0; i < dtt.length ; i++ ){
			var regexp = /inlineId=cardWindow_([0-9]*)/
			dtt.item(i).href.match(regexp);
			card_id[i] = parseInt(RegExp.$1);

			dtt.item(i).addEventListener("mouseover",popup(card_id[i],i),false);
			dtt.item(i).addEventListener("mouseout",popdown(card_id[i],i),false);
		}
}

function popup(cid,i) {
	return function() {
		var box = document.getElementById("cardWindow_"+cid);
		box.style.display="block";
		box.style.position="fixed";
		box.style.top="100px";
		box.style.left="200px";
		box.style.zIndex="100";
	}
}
function popdown(cid,i) {
	return function() {
		var box = document.getElementById("cardWindow_"+cid);
		box.style.display="none";
	}
}


// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    ブショーダスライトで特定のカードを自動破棄　ｂｙきの。

function AutoDelete(){
	var type = document.evaluate('//*[@id=\"gray02Wrapper\"]//h3', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
	if( type.indexOf("ブショーダスライト") != -1 ){
		var cardno = document.getElementsByClassName("cardno").item(0).innerHTML;
		// alert(cardno);
		var bp_btn = document.evaluate('//*[@class=\"first_bpbtn\"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
		var regexp = /<span>([0-9]*)<\/span>/
		bp_btn.match(regexp);
		bp = parseInt(RegExp.$1);
		// alert(bp);

		if( auto_delete_cno.indexOf(cardno) != -1 ){
			var hrf = location.href;
			var cord = hrf.replace(/^.*card=(-?[0-9]+)/, "$1");
			var card = RegExp.$1;

			if( bp >= 70 ){
				//破棄してもう一枚
				document.getElementsByName("del_card_id").item(0).value = card ;
				document.getElementsByName("busyodas").item(0).submit();
			}else{
				//ただ破棄
				var id = document.evaluate("//*[@id='gray02Wrapper']//*[@name='ssid']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;
				Del_Card(card,id);

			}
		}else{
			if( auto_bushodasu_mode == "2"){
				var result = document.getElementsByClassName("result").item(0).innerHTML;
				if( result.indexOf("rarerity_uc")!=-1 || result.indexOf("rarerity_c")!=-1 ){
					//破棄せずブショーダス
					NewBushodasu(bp);
				}
			}else if( auto_bushodasu_mode == "1"){
				//破棄せずブショーダス
				NewBushodasu(bp);
			}else{
				var result = document.getElementsByClassName("result").item(0).innerHTML;
				if( result.indexOf("rarerity_uc")!=-1 || result.indexOf("rarerity_c")!=-1 ){
					var card2 = document.evaluate('//*[@class=\"center\"]',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
					var div = document.createElement("div")
					var child10 = document.createElement("input")
					child10.type = "button";
					child10.value = "このカードを自動破棄リストに追加";
					child10.style.color = "darkred";
					child10.addEventListener("click",function(){addDelList(cardno)},false)
					div.appendChild(child10);
					card2.appendChild(div);
				}
			}

		}

	}
}

function NewBushodasu(bp){
	if( bp >= 100 ){
		document.getElementsByName("del_card_id").item(0).value = 0 ;
		document.getElementsByName("busyodas").item(0).submit();
	}else{
		var tID_bd = setTimeout(function(){bd_jump()},1000);
	}
}
function bd_jump(){
		location.href = "http://" + host + "/busyodas/busyodas.php";
}
function addDelList(n){
	if(window.confirm("カードNo."+n+"を自動破棄リストに追加します")){
		var BRO3_AUTO_DELETE_LENGTH	= 'bro3_auto_delete_length' + host;
		var l_length2 = 100;
		if(GM_getValue(BRO3_AUTO_DELETE_LENGTH)) l_length2 = GM_getValue(BRO3_AUTO_DELETE_LENGTH);
		auto_delete_cno += n + ",";
		GM_setValue(BRO3_AUTO_DELETE_CNO, auto_delete_cno);
		GM_setValue(BRO3_AUTO_DELETE_LENGTH, Math.floor(l_length2) + 1 )
	}
}

// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    トレード報告書簡を削除　ｂｙきの。

function DeleteTradeReport(){
	var area = document.getElementsByName("message_form").item(0);
	var ul = document.createElement("ul");
	ul.innerHTML = "<a href='javascript:void(0)' id='btn1'>「落札しました」書簡を削除</a>｜"
	ul.innerHTML += "<a href='javascript:void(0)' id='btn2'>「落札されました」書簡を削除</a>　"
	ul.innerHTML += "<input type='checkbox' id='chkflg1'>既読書簡も削除<br>"
	ul.innerHTML += "<p id=a1 style='display:none'> 未読運営書簡を削除しています... <span id=a2>0</span> / <span id=a3>0</span> </p>";
	area.appendChild(ul);

	document.getElementById("btn1").addEventListener("click",function(){DelMessage("0");},false)
	document.getElementById("btn2").addEventListener("click",function(){DelMessage("1");},false)
}

function DelMessage(x){
	if(x == 0) var title="カードを落札しました";
	if(x == 1) var title="出品したカードが落札されました";
	var sender = '\n<span class="notice">ブラウザ三国志運営チーム</span>\n';

	var s = '//table[@class=\"commonTables\"]//tr[@class=\"unread\"]';
	var s2 = '//table[@class=\"commonTables\"]//tr';
	var t = "";
	var cnt = 0;
	var address = [];
	var id = [];
	var p = document.getElementsByName("p").item(0).value;

	document.getElementById("a1").style.display = "block";

	var table = document.evaluate(s, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for( var i = 1; i < table.snapshotLength + 1 ; i++){
		if( i > 1 ) t = "[" + i + "]";
		var title_r = document.evaluate( s + t + "/td[2]",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
		var sender_r = document.evaluate( s + t + "/td[3]",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;


		if( title_r.indexOf(title)!=-1 && sender_r == sender ){
			id[cnt] = document.evaluate( s + t + "/td/input",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;
			address[cnt] = document.evaluate( s + t + "/td[2]/a",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href;
			cnt += 1;
		}
	}

	document.getElementById("a3").innerHTML = id.length;

	for( var i = 0; i < id.length; i++){
		var dom = document.createElement("div");
		dom.innerHTML = getContentFromURL(address[i]);

		var data = "mode=inbox&p="+p+"&chk[]="+id[i];
		GM_xmlhttpRequest({
			method:"POST", 
			url:"http://" + host + "/message/delete.php",
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data: data,
			onload:function(x){console.log(x.responseText);}
		});

		document.getElementById("a2").innerHTML = i+1;
	}

	if( document.getElementById("chkflg1").checked == true ){
		var table2 = document.evaluate(s2, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for( var i = 3; i < table2.snapshotLength + 1 ; i++){
			if( i > 1 ) t = "[" + i + "]";
			var tr2 = document.evaluate( s2 + t ,document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var title_r2 = document.evaluate( s2 + t + "/td[2]",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var sender_r2 = document.evaluate( s2 + t + "/td[3]",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;

			if( tr2.className.indexOf("unread") == -1 && title_r2.indexOf(title)!=-1 && sender_r2 == sender ){
				document.evaluate( s2 + t + "/td/input",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.checked = true;
			}
		}
		document.getElementById("a1").style.display = "none";
		document.getElementsByName("message").item(0).submit();
	}else{
		document.getElementById("a1").style.display = "none";
		//alert("完了");
		location.reload();
	}
}



// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    自動治癒スキル発動　ｂｙきの。

function AH_STEP1(){
	var page_type = document.getElementsByName("show_deck_card_count").item(0);
	page_type = page_type.options[page_type.selectedIndex].value;

	if( page_type != 1 ){
		var s_list = document.evaluate('//*[@class=\"statusParameter2\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		var b_list = document.getElementsByClassName("setPlace")
		var b_id = [];

		for( var i = 0; i < s_list.snapshotLength; i++ ){
			if( b_list.item(i).innerHTML.indexOf("セット先") != -1 ){

				b_id[i] = b_list.item(i).childNodes.item(1).id;
				for( var j = 3; j < 6; j++ ){
					var sk_flg = document.evaluate('//*[@class="statusParameter2"]//tr['+j+']',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var sk_num = document.evaluate('//*[@class="statusParameter2"]//tr['+j+']/th',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var sk_name = document.evaluate('//*[@class="statusParameter2"]//tr['+j+']/td',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

					if(sk_name.snapshotItem(i).innerHTML.length != 0){
						var skill_list = document.evaluate('//*[@class="cardStatusDetail label-setting-mode"]//*[@class="cardWrapper2col"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(i).innerHTML;
						var regexp = "防:" + sk_name.snapshotItem(i).innerHTML;
						if(skill_list.match(regexp) && sk_flg.snapshotItem(i).className != "used"){
							var btn = document.createElement("a");
							btn.id = "AH_btn_" + i + "_" + "j";
							btn.innerHTML = "[使用]";
							for(var k = 0; k < AH_list.length; k++){
								if(sk_name.snapshotItem(i).innerHTML.indexOf( AH_list[k] ) != -1) btn.style.color = "red";
							}
							btn.href = "javascript:void(0)"
							btn.addEventListener("click",AH_setDeck(b_id[i],j-3,sk_name.snapshotItem(i).innerHTML),false)
							sk_num.snapshotItem(i).appendChild(btn);
						}
					}
				}
			}
		}
	}
}

function AH_setDeck(n,i,a){
	return function() {
		if(window.confirm("スキル："+a+"を使用します。よろしいですか？")){
			var v_id = document.getElementById(n).value;

			var regexp = /selected_village_([0-9]*)/;
			n.match(regexp);
			var b_id = parseInt(RegExp.$1);

			GM_setValue(BRO3_AUTO_HEAL_B_ID, b_id);
			GM_setValue(BRO3_AUTO_HEAL_S_NO, i);
			GM_setValue(BRO3_AUTO_HEAL_V_ID, v_id);

			//auto_heal_flg = 2;
			auto_heal_flg = 3;

			GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);

			//document.getElementById("target_card").value = b_id;
			//document.getElementById("mode").value='set';
			//document.getElementById("deck_file").submit();
			var deckset = AH_setDeck0(b_id,v_id);
			location.href = "http://"+host+"/village_change.php?village_id="+v_id+"&from=menu&page=/card/domestic_setting.php" ;
		}
	}
}
function AH_setDeck0(n,m){
		var ssid = document.getElementsByName("ssid").item(0).value;
		var data = "mode=set&target_card="+n+"&wild_card_flg=&inc_point=&btn_change_flg=&p=1&l=&ssid="+ssid+"&selected_village["+n+"]="+m;
		GM_xmlhttpRequest({
			method:"POST", 
			url:"http://" + host + "/card/deck.php",
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data: data,
			onload:function(x){console.log(x.responseText);}
		});
		return;
}

if(GM_getValue(BRO3_AUTO_HEAL_B_ID))	var b_id	= GM_getValue(BRO3_AUTO_HEAL_B_ID);
if(GM_getValue(BRO3_AUTO_HEAL_V_ID))	var v_id	= GM_getValue(BRO3_AUTO_HEAL_V_ID);
//alert("FLG:"+auto_heal_flg+",B_ID:"+b_id+",V_ID:"+v_id)

if(auto_heal_flg == 2){var tID = setTimeout(function(){AH_STEP2()},500);};
if(auto_heal_flg == 3){var tID = setTimeout(function(){AH_STEP3()},500);};
if(auto_heal_flg == 4){var tID = setTimeout(function(){AH_STEP4()},500);};
if(auto_heal_flg == 5){var tID = setTimeout(function(){AH_STEP5()},500);};
if(auto_heal_flg == 6){var tID = setTimeout(function(){AH_STEP6()},500);};
if(auto_heal_flg == 7){var tID = setTimeout(function(){AH_STEP7()},500);};
if(auto_heal_flg == 8){var tID = setTimeout(function(){AH_STEP8()},500);};
if(auto_heal_flg > 30){var tID = setTimeout(function(){AH_STEP31()},500);};

if(auto_heal_flg >= 2 && path.indexOf("/card/")!=-1){
	var prtElm = document.getElementById("gray02Wrapper");
	var chdElm = document.getElementsByTagName("h2").item(0);	
	var newElm = document.createElement("div");
	if( auto_heal_flg > 30){
		newElm.innerHTML = "　自動スキル動作中　　STEP " + (auto_heal_flg/10) + " / 8";
	}else{
		newElm.innerHTML = "　自動スキル動作中　　STEP " + auto_heal_flg + " / 8";
	}
	newElm.style.backgroundColor ="red";
	newElm.id = "ah_text";
	prtElm.insertBefore(newElm, chdElm);
}

if(path.indexOf("/card/domestic_setting.php")!=-1 && document.body.innerHTML.indexOf("設定されている武将を解除する")!=-1){
	var id = document.evaluate('//form[@method="get"]/input[@name="id"]/@value',document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
	var btn = document.createElement("input");
	btn.value = "設定されている武将をデッキから下ろす";
	btn.type = "button";
	btn.addEventListener("click",function(){AH_STEP9(id)},false);
	document.getElementsByTagName("form").item(2).appendChild(btn);
}
function AH_STEP9(b_id){
	if(window.confirm("内政武将をデッキから下ろします。よろしいですか？")){
		GM_setValue(BRO3_AUTO_HEAL_B_ID, b_id);
		AH_STEP5();
	}
}

function AH_STEP2(){
	auto_heal_flg = 3;
	GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
	location.href = "http://"+host+"/village_change.php?village_id="+v_id+"&from=menu&page=/card/domestic_setting.php" ;
}

function AH_STEP3(){
	if( path.indexOf("domestic_setting.php") != -1){
		if(document.body.innerHTML.indexOf("設定されている武将を解除する")!=-1){
			auto_heal_flg = 8;
			GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
			location.href = "http://"+host+"/card/deck.php";
		}else{
			var chkbox = document.evaluate('//*[@id="card_radio_'+b_id+'"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if( chkbox.snapshotLength > 0 ){
				chkbox.snapshotItem(0).checked = true;
				auto_heal_flg = 4;
				GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
				document.getElementsByName("input_domestic").item(0).submit();
			}else{
				auto_heal_flg = 31;
				GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
				var AH_st3t = setTimeout(function(){location.reload()},2000);
			}
		}
	}else{
		location.href = "http://"+host+"/village_change.php?village_id="+v_id+"&from=menu&page=/card/domestic_setting.php" ;
	}
}

function AH_STEP31(){
	if( path.indexOf("domestic_setting.php") != -1){
		var chkbox = document.evaluate('//*[@id="card_radio_'+b_id+'"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if( chkbox.snapshotLength > 0 ){
			chkbox.snapshotItem(0).checked = true;
			auto_heal_flg = 4;
			GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
			document.getElementsByName("input_domestic").item(0).submit();
		}else if( auto_heal_flg < 36 ){
			auto_heal_flg += 1;
			GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
			var AH_st3t = setTimeout(function(){location.reload()},2000);
		}else{
			auto_heal_flg = 1;
			document.getElementById("ah_text").innerHTML = "　自動スキル：　<b>武将がセットできなかったため動作を停止しました</b>"

			GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
			GM_setValue(BRO3_AUTO_HEAL_B_ID, 0);
			GM_setValue(BRO3_AUTO_HEAL_S_NO, 0);
			GM_setValue(BRO3_AUTO_HEAL_V_ID, 0);
		}
	}else{
		location.href = "http://"+host+"/village_change.php?village_id="+v_id+"&from=menu&page=/card/domestic_setting.php" ;
	}
}

function AH_STEP4(){
	//auto_heal_flg = 5;
	//GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
	var b_tbl = document.evaluate('//*[@class="general"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i < b_tbl.snapshotLength; i++){
		if( b_tbl.snapshotItem(i).innerHTML.indexOf("内政中") == -1 ){
			continue;
		}else{
			var s_no = GM_getValue(BRO3_AUTO_HEAL_S_NO) + 3;
			var target = '//*[@class="general"]['+(i+1)+']//tr[2]/td';
			var skl_num = document.evaluate(target,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var k = 0; k < AH_list.length; k++){
				if(skl_num.snapshotItem(s_no).innerHTML.indexOf( AH_list[k] ) != -1){
					auto_heal_flg = 5;
					GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
					break;
				}else{
					auto_heal_flg = 1;
				}
			}
			if(auto_heal_flg == 1){
				GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
				GM_setValue(BRO3_AUTO_HEAL_B_ID, 0);
				GM_setValue(BRO3_AUTO_HEAL_S_NO, 0);
				GM_setValue(BRO3_AUTO_HEAL_V_ID, 0);
			}
			location.href = skl_num.snapshotItem(s_no).childNodes.item(0).href;
		}
	}
}

function AH_STEP5(){
	auto_heal_flg = 6;
	GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
	document.getElementsByTagName("form").item(2).submit();
}

function AH_STEP6(){
	//auto_heal_flg = 7;
	//GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
	auto_heal_flg = 1;

	var ssid = getSSID();

	var data = "mode=unset&target_card="+b_id+"&wild_card_flg=&inc_point=&btn_change_flg=&l=&ssid="+ssid;
	GM_xmlhttpRequest({
		method:"POST", 
		url:"http://" + host + "/card/deck.php",
		headers:{"Content-type":"application/x-www-form-urlencoded"},
		data: data,
		onload:function(x){console.log(x.responseText);}
	});

	GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
	GM_setValue(BRO3_AUTO_HEAL_B_ID, 0);
	GM_setValue(BRO3_AUTO_HEAL_S_NO, 0);
	GM_setValue(BRO3_AUTO_HEAL_V_ID, 0);

	location.href = "http://"+host+"/card/deck.php";
}

function AH_STEP7(){
	auto_heal_flg = 1;

	GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
	GM_setValue(BRO3_AUTO_HEAL_B_ID, 0);
	GM_setValue(BRO3_AUTO_HEAL_S_NO, 0);
	GM_setValue(BRO3_AUTO_HEAL_V_ID, 0);

	document.getElementById("target_card").value = b_id;
	document.getElementById("mode").value='unset';
	document.getElementById("deck_file").submit();
}

function AH_STEP8(){
	auto_heal_flg = 1;
	document.getElementById("ah_text").innerHTML = "　自動スキル：　<b>内政武将がセットされていたため動作を停止しました</b>"

	GM_setValue(BRO3_AUTO_HEAL_FLG, auto_heal_flg);
	GM_setValue(BRO3_AUTO_HEAL_B_ID, 0);
	GM_setValue(BRO3_AUTO_HEAL_S_NO, 0);
	GM_setValue(BRO3_AUTO_HEAL_V_ID, 0);
}

function getSSID(){
	var TempDOM = document.createElement("div");
	var url = "http://"+host+"/card/deck.php";
	TempDOM.innerHTML = getContentFromURL(url);
	TempDOM.id = "TempDOM";
	TempDOM.style.display = "none";
	document.body.appendChild(TempDOM);

	var add = '//*[@id="TempDOM"]//*[@id="gray02Wrapper"]//*[@name="ssid"]';
	var ssid = document.evaluate(add, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.value;

	return ssid;
}

//AUTO_HEALここまで//


// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    未取得カード自動収集　ｂｙきの。

function CardCollect(){
	var area = document.getElementsByClassName("progress-bars").item(0);
	var btn = document.createElement("DIV");
	btn.innerHTML = "<input type='button' id=cc_btn value='未取得カード一覧を取得'>"
	btn.innerHTML += "<b valign='bottom'><input type='checkbox' id='flg_ur'>UR</b>";
	btn.innerHTML += "<b valign='bottom'><input type='checkbox' id='flg_sr'>SR</b>";
	btn.innerHTML += "<b valign='bottom'><input type='checkbox' id='flg_r'>R</b>";
	btn.innerHTML += "<b valign='bottom'><input type='checkbox' id='flg_uc'>UC</b>";
	btn.innerHTML += "<b valign='bottom'><input type='checkbox' id='flg_c'>C</b>";
	var txt = document.createElement("SPAN");
	txt.id = "cc_txt";
	txt.style.backgroundColor = "white";
	var btn2 = document.createElement("UL");
	btn2.id = "cc_tbl";
	area.parentNode.insertBefore(btn, area);
	area.parentNode.insertBefore(txt, area);
	area.parentNode.insertBefore(btn2, area);

	var cc_btn = document.getElementById("cc_btn");
	cc_btn.addEventListener("click",function(){CC_STEP1();},false);

}

function CC_STEP1(){
	var cc_tbl = document.getElementById("cc_tbl");
	cc_tbl.style.backgroundColor = "white";
	cc_tbl.innerHTML = "";
	//cc_tbl.innerHTML = "<TR><TD>カード No.</TD><TD>R</TD><TD>名前</TD><TD>TP</TD><TD>落札ボタン</TD></TR>";

	var flg_ur = document.getElementById("flg_ur").checked;
	var flg_sr = document.getElementById("flg_sr").checked;
	var flg_r = document.getElementById("flg_r").checked;
	var flg_uc = document.getElementById("flg_uc").checked;
	var flg_c = document.getElementById("flg_c").checked;

	if(flg_ur == true) {CC_STEP2(1)};
	if(flg_sr == true) {CC_STEP2(2)};
	if(flg_r == true) {CC_STEP2(3)};
	if(flg_uc == true) {CC_STEP2(4)};
	if(flg_c == true) {CC_STEP2(5)};

	var cc_txt = document.getElementById("cc_txt");
	cc_txt.innerHTML = "<input type=button value='再低落札価格取得' id=cc_btn2>"
	cc_txt.innerHTML += "　<input type=checkbox id=cc_union00 checked>蜀";
	cc_txt.innerHTML += "　<input type=checkbox id=cc_union01 checked>魏";
	cc_txt.innerHTML += "　<input type=checkbox id=cc_union02 checked>呉";
	cc_txt.innerHTML += "　<input type=checkbox id=cc_union03 checked>他";
	var cc_btn2 = document.getElementById("cc_btn2");
	cc_btn2.addEventListener("click",function(){CC_STEP3();},false);
}

function CC_STEP2(n){
	var url = "http://"+host+"/card/busyobook_picture.php?filter="+n+"&status=2"
	var cc_txt = document.getElementById("cc_txt");
	cc_txt.style.backgroundColor = "white";
	var cc_tbl = document.getElementById("cc_tbl");

	var rare;

	if(n == 1) rare = "UR"
	if(n == 2) rare = "SR"
	if(n == 3) rare = "R"
	if(n == 4) rare = "UC"
	if(n == 5) rare = "C"

	var dom = document.createElement("div");
	dom.innerHTML = getContentFromURL(url);
	dom.id = 'TempDOM'+n+'1';
	dom.style.display = "none";
	document.body.appendChild(dom);

	var p_max = 1;
	var pager = document.evaluate('//div[@id=\"TempDOM'+n+'1\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"pager\"]/*[@class=\"last\"]/a[2]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(pager.snapshotLength > 0){
		var lastpage = pager.snapshotItem(0).href;
		lastpage.match(/p=([0-9]*)/);
		var p_max = parseInt(RegExp.$1);
	}
	cc_txt.innerHTML = "<b> "+ rare + "</b> の情報を取得しています...　"+1+" / "+p_max+"<br>";

	var name = document.evaluate('//div[@id=\"TempDOM'+n+'1\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"name\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var cardno = document.evaluate('//div[@id=\"TempDOM'+n+'1\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"cardno\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 0; i < name.snapshotLength; i++){
		cc_tbl.innerHTML += "<li name='list'><a name='no' href='http://"+host+"/card/trade.php?s=price&o=a&t=no&k="+cardno.snapshotItem(i).innerHTML+"'>"+cardno.snapshotItem(i).innerHTML+"</a> <b>"+rare+"</b> "+name.snapshotItem(i).innerHTML+"</li>";;
	}
	dom.innerHTML = "";

	if( p_max > 1){
		for (var i=2; i<=p_max; i++){
			var url = "http://"+host+"/card/busyobook_picture.php?filter="+n+"&status=2&p="+i;
			var dom = document.createElement("div");
			dom.innerHTML = getContentFromURL(url);
			dom.id = 'TempDOM'+n+i;
			dom.style.display = "none";
			document.body.appendChild(dom);

			cc_txt.innerHTML = "<b> "+ rare + "</b> の情報を取得しています...　"+i+" / "+p_max+"<br>";

			var t_name = document.evaluate('//div[@id=\"TempDOM'+n+i+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"name\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var t_cardno = document.evaluate('//div[@id=\"TempDOM'+n+i+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"cardno\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for(var j = 0; j < t_name.snapshotLength; j++){
				//cc_tbl.innerHTML += "<li name='list'>";
				//cc_tbl.innerHTML += "<a name='no' href='http://"+host+"/card/trade.php?s=price&o=a&t=no&k="+t_cardno.snapshotItem(j).innerHTML+"' target='_blank'>"+t_cardno.snapshotItem(j).innerHTML+"</a>";
				//cc_tbl.innerHTML += " <b>"+rare+"</b> ";
				//cc_tbl.innerHTML += t_name.snapshotItem(j).innerHTML;
				//cc_tbl.innerHTML += "</li>";
				cc_tbl.innerHTML += "<li name='list'><a name='no' href='http://"+host+"/card/trade.php?s=price&o=a&t=no&k="+t_cardno.snapshotItem(j).innerHTML+"' target='_blank'>"+t_cardno.snapshotItem(j).innerHTML+"</a> <b>"+rare+"</b> "+ t_name.snapshotItem(j).innerHTML + "</li>";
			}
			dom.innerHTML = "";
		}
	}
}

function CC_STEP3(){
	var no = document.getElementsByName("no");
	var list = document.getElementsByName("list");
	var cc_txt = document.getElementById("cc_txt");
	var btn = [];
	var check = [];
	for(var j=0;j<4;j++){
		check[j] = document.getElementById("cc_union0"+j);
	}
	loop_cc3_i:for (var i=0;i<no.length;i++){
		for(var j=0;j<4;j++){
			if(check[j].checked == false){
				if(no.item(i).innerHTML > (j+1)*1000 && no.item(i).innerHTML < (j+2)*1000){
					list.item(i).innerHTML += "　<b style=color:red>‐‐‐</b>";
					cc_txt.innerHTML = "最低落札価格取得中...　" +i+ " / " +no.length;
					continue loop_cc3_i;
				}
			}
		};
		list.item(i).innerHTML += "　" + CC_STEP4(no.item(i).innerHTML,"no");
		no.item(i).addEventListener("mouseover",CC_MOV(no.item(i).innerHTML),false)
		no.item(i).addEventListener("mouseout",CC_MOT(no.item(i).innerHTML),false)
		cc_txt.innerHTML = "最低落札価格取得中...　" +i+ " / " +no.length;
	}

	var cc_bit_btn = document.getElementsByName("cc_bit_btn");
	for (var i=0; i< cc_bit_btn.length; i++){
		cc_bit_btn.item(i).addEventListener("click",CC_STEP6(cc_bit_btn.item(i).id),false);
	}
	cc_txt.innerHTML = "取得完了。"
}

function CC_STEP4(k,t) {
	var nTP = document.evaluate('//*[@id=\"bptpcp_area\"]//span',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(1).innerHTML;

	var dom = document.createElement("div");
	var url = "http://"+host+"/card/trade.php?s=price&o=a&t="+t+"&k="+ k;
	dom.innerHTML = getContentFromURL(url);
	dom.id = 'TempDOMcc1';
	dom.style.display = "none";
	document.body.appendChild(dom);

	var TP = 0;
	var ID = 0;
	var IMG = "";
	var key = 0;
	var text = new Array();
	text = CC_STEP5(1).split("|");
	TP = text[0];
	ID = text[1];
	key = text[2];
	IMG = text[3]+"|"+text[4];

	var text = new Array();
	if(dom.innerHTML.indexOf("pager") == -1){
		if(dom.innerHTML.indexOf("現在入札可能な出品はありません") != -1){
			TP = "出品なし";
			ID = "";
			IMG = "";
		}else{
			if(TP == 999999){
				TP = "即落札なし";
				ID = "";
				IMG = text[3]+"|"+text[4];
			}
		}
	}else{
		var address = document.evaluate('//div[@id=\"TempDOMcc1\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"pager\"]//*[@title=\"last page\"]/@href', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
		address.match(/trade.php\?p=([0-9]*)/);
		var lastpage = parseInt(RegExp.$1);

		for(var p = 2; p <= lastpage; p++){
			if(TP == 999999){
				var dom2 = document.createElement("div");
				var url2 = "http://"+host+"/card/trade.php?p="+p+"&s=price&o=a&t="+t+"&k="+ k;
				dom2.innerHTML = getContentFromURL(url2);
				dom2.id = 'TempDOMcc'+p;
				dom2.style.display = "none";
				document.body.appendChild(dom2);

				var text = new Array();
				text = CC_STEP5(p).split("|");
				TP = text[0];
				ID = text[1];
				key = text[2];
				IMG = text[3]+"|"+text[4];
				document.body.removeChild(dom2);
			}
			if(TP != 999999) break;
		}

		if(TP == 999999){
			TP = "即落札なし";
			ID = "";
			IMG = text[2]+"|"+text[3];
		}

	}			

	document.body.removeChild(dom);

	var comment = "<b style=color:red>"+ TP +"</b>";
	if(ID != ""){
		if( nTP >= Math.floor(TP.replace(",","")) ){
			comment = "<input type='button' value='落札' name='cc_bit_btn' id="+key+">";
			comment += "　<b style=color:red>"+ TP +"TP</b>";
			comment += "　ID:"+ID;
			comment += "<div class='cardWrapper2col' id=img"+k+" style='display:none'>" + IMG + "</div>";
		}else{
			comment = "<b style=color:red>"+ TP +"TP</b>";
			comment += "<div class='cardWrapper2col' id=img"+k+" style='display:none'>" + IMG + "</div>";
		}
	}
	return comment;
}

function CC_STEP5(p){

	var table = document.evaluate('//div[@id=\"TempDOMcc'+p+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"tradeTables\"]//tr',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var TP = document.evaluate('//div[@id=\"TempDOMcc'+p+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"tradeTables\"]//strong',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var limit = document.evaluate('//div[@id=\"TempDOMcc'+p+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"tradeTables\"]//td[@class=\"limit\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var ID = document.evaluate('//div[@id=\"TempDOMcc'+p+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"tradeTables\"]//td[@class=\"trade\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var IMG = document.evaluate('//div[@id=\"TempDOMcc'+p+'\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"tradeTables\"]//*[@class=\"cardWrapper2col\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var key = 0;
	var MinTP = 999999;
	for( var j = 0 ; j < TP.snapshotLength ; j++){
		if(limit.snapshotItem(j).innerHTML == "---"){
			MinTP = TP.snapshotItem(j).innerHTML;

			var tgt = ID.snapshotItem(j).innerHTML;
			tgt.match(/trade_bid.php\?id=([0-9]*)/);
			var t_id = parseInt(RegExp.$1);
			var c_img = IMG.snapshotItem(j).innerHTML;

			if(table.snapshotItem(j+1).innerHTML.indexOf("---") != -1 && table.snapshotItem(j+1).innerHTML.indexOf("入札") != -1){
				var regexp = /inlineId=cardWindow_([0-9]*)[\s\S]*?trade_bid.php\?id=([0-9]*)(\S*)"\>/
				table.snapshotItem(j+1).innerHTML.match(regexp);
				var exhibit_cid = parseInt(RegExp.$1);
				var exhibit_id = parseInt(RegExp.$2);
				var address = RegExp.$3.replace(/\&amp;/g, "&");
				key = "exhibit_cid="+exhibit_cid+"&exhibit_id="+exhibit_id+address+"&buy_btn=落札する";
			}

			break;
		}
	}
	return MinTP+"|"+t_id+"|"+key+"|"+c_img;
}

function CC_STEP6(n){
	return function(){
		var cc_bit_btn = document.getElementById(n);
		//alert(n);
		GM_xmlhttpRequest({
			method:"POST", 
			url:"http://" + host + "/card/trade_bid.php",
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data: n,
			onload:function(x){console.log(x.responseText);end();}
		});
		function end(){
			cc_bit_btn.value="完了"
			cc_bit_btn.style.backgroundColor="blue";
			cc_bit_btn.style.color="white";
		}
	}
}

function CC_MOV(n){
	return function(){
		var box = document.getElementById("img"+n);
		box.style.display="block";
		box.style.position="fixed";
		box.style.top="30px";
		box.style.left="100px";
		box.style.zIndex="100";
	}
}

function CC_MOT(n){
	return function(){
		var box = document.getElementById("img"+n);
		box.style.display="none";
	}
}

//CARD COLLECTここまで//


// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    カードコレクション補助　ｂｙきの。

function CardCollect2(){
	var cc_title = document.evaluate('//*[@id=\"gray02Wrapper\"]//li[@class=\"collection-list-item\"]/div[@class=\"heading\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; i<cc_title.snapshotLength; i++){
		if(cc_title.snapshotItem(i).innerHTML.indexOf("あと一枚")!=-1){
			var k = "";
			var t = "";
			var card = document.evaluate('//*[@id=\"gray02Wrapper\"]//li[@class=\"collection-list-item\"]//*[@class=\"thumnails\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			if(cc_title.snapshotItem(i).innerHTML.indexOf("カード限定")!=-1){
				t = "no";
				var regexp = /class="blank.*card_number=([0-9]*)/
				card.snapshotItem(i).innerHTML.match(regexp);
				k = parseInt(RegExp.$1);
			}else{
				t = "name";
				var regexp = /class="blank.*title="(\S*)"/
				card.snapshotItem(i).innerHTML.match(regexp);
				k = RegExp.$1;
			}
			if(k != ""){
				var ton = document.createElement("span");
				ton.innerHTML = k +" :取得中"
				cc_title.snapshotItem(i).appendChild(ton);
				ton.innerHTML = CC_STEP4(k,t);
			}
		}
	}
	var cc_bit_btn = document.getElementsByName("cc_bit_btn");
	for (var i=0; i< cc_bit_btn.length; i++){
		cc_bit_btn.item(i).addEventListener("click",CC_STEP6(cc_bit_btn.item(i).id),false);
	}
}

// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    即落札カードリスト　ｂｙきの。

function TP10Collect(){
	var area = document.getElementsByClassName("left-box").item(0);
	var b2 = document.createElement("b");
	b2.innerHTML = "即落札検索：";
	var btn1 = document.createElement("input");
	btn1.type = "button";
	btn1.value = "ＵＲ"
	btn1.style.fontSize = "11px"
	btn1.style.fontWeight = "bold"
	btn1.style.color = "violet"
	btn1.addEventListener("click",function(){search_trade2(0)},false)
	var btn2 = document.createElement("input");
	btn2.type = "button";
	btn2.value = "ＳＲ"
	btn2.style.fontSize = "11px"
	btn2.style.fontWeight = "bold"
	btn2.style.color = "red"
	btn2.addEventListener("click",function(){search_trade2(1)},false)
	var btn3 = document.createElement("input");
	btn3.type = "button";
	btn3.value = " Ｒ "
	btn3.style.fontSize = "11px"
	btn3.style.fontWeight = "bold"
	btn3.style.color = "blue"
	btn3.addEventListener("click",function(){search_trade2(2)},false)
	var btn4 = document.createElement("input");
	btn4.type = "button";
	btn4.value = "ＵＣ"
	btn4.style.fontSize = "11px"
	btn4.style.fontWeight = "bold"
	btn4.style.color = "orange"
	btn4.addEventListener("click",function(){search_trade2(3)},false)
	var btn5 = document.createElement("input");
	btn5.type = "button";
	btn5.value = " Ｃ "
	btn5.style.fontSize = "11px"
	btn5.style.fontWeight = "bold"
	btn5.style.color = "black"
	btn5.addEventListener("click",function(){search_trade2(4)},false)
	var btn6 = document.createElement("input");
	btn6.type = "button";
	btn6.value = "指定条件"
	btn6.style.fontSize = "11px"
	btn6.style.color = "black"
	btn6.addEventListener("click",function(){search_trade2(5)},false)
	var chk1 = document.createElement("input");
	chk1.type = "checkbox";
	chk1.id = "tp10collect"
	var b1 = document.createElement("span");
	b1.innerHTML = "10TP以外なら検索終了";
	area.appendChild(b2);
	area.appendChild(btn1);
	area.appendChild(btn2);
	area.appendChild(btn3);
	area.appendChild(btn4);
	area.appendChild(btn5);
	area.appendChild(btn6);
	area.appendChild(chk1);
	area.appendChild(b1);

}

function search_trade2(n){
	//検索する上限数
	var c_max = 20;

	if( n == 0){
		url = "http://"+host+"/card/trade.php?s=price&o=a&t=name&k=&tl=0&r_ur=0&r_sr=1&r_r=1&r_uc=1&r_c=1";
	}else if( n == 1){
		url = "http://"+host+"/card/trade.php?s=price&o=a&t=name&k=&tl=0&r_ur=1&r_sr=0&r_r=1&r_uc=1&r_c=1";
	}else if( n == 2){
		url = "http://"+host+"/card/trade.php?s=price&o=a&t=name&k=&tl=0&r_ur=1&r_sr=1&r_r=0&r_uc=1&r_c=1";
	}else if( n == 3){
		url = "http://"+host+"/card/trade.php?s=price&o=a&t=name&k=&tl=1&r_ur=1&r_sr=1&r_r=1&r_uc=0&r_c=1";
	}else if( n == 4){
		url = "http://"+host+"/card/trade.php?s=price&o=a&t=name&k=&tl=1&r_ur=1&r_sr=1&r_r=1&r_uc=1&r_c=0";
	}else if( n >= 5){
		var sel = document.getElementsByName("t").item(0);
		var t = sel.options[sel.selectedIndex].value;
		var k = document.getElementById("k").value;
		var r_ur = document.getElementById("r_ur").value;
		var r_sr = document.getElementById("r_sr").value;
		var r_r = document.getElementById("r_r").value;
		var r_uc = document.getElementById("r_uc").value;
		var r_c = document.getElementById("r_c").value;
		url = "http://"+host+"/card/trade.php?s=price&o=a&t="+t+"&k="+k+"&tl=1&r_ur="+r_ur+"&r_sr="+r_sr+"&r_r="+r_r+"&r_uc="+r_uc+"&r_c="+r_c;
	}

	var link = document.evaluate('//li[@class=\"ui-tabs-selected\"]/a',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	link.addEventListener("click",function(){location.reload();},false);

	//document.getElementsByClassName("trade-list-head clearfix").item(0).style.display = "none";
	var pager = document.evaluate('//*[@class=\"pager\"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(pager.snapshotLength > 0) pager.snapshotItem(0).style.display = "none";

	var trade = document.getElementsByClassName("tradeTables").item(0);

	//var table = document.getElementsByClassName("ui-tabs-panel").item(0);
	//table.innerHTML = "<table class='tradeTables' id='ftrade'></table>"
	//var trade = document.getElementById("ftrade");
		
	trade.innerHTML = "<span id=read>検索中...<span id=count>1</span>頁目:<span id=c_count>0</span>件hit [最大"+c_max+"件]</span>";

	var cnt = 0;
	var TP = 10;
	var t_id = [];
	var tp10_flg = document.getElementById("tp10collect");

	var dom = document.createElement("div");
	dom.innerHTML = getContentFromURL(url);
	dom.id = 'TempDOM';
	dom.style.display = "none";
	document.body.appendChild(dom);

	var target = "//div[@id=\"TempDOM\"]//*[@id='gray02Wrapper']//*[@class=\"tradeTables\"]//tr";
	var tr = document.evaluate(target, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	trade.innerHTML += "<tr class=tradeTop>" +tr.snapshotItem(0).innerHTML+ "</tr>";
	loop_j:for(var j=0;j<tr.snapshotLength;j++){
		if(tr.snapshotItem(j).innerHTML.indexOf("---") != -1){
			var regexp = tr.snapshotItem(j).innerHTML;
			regexp.match(/cardWindow_([0-9]*)[\s\S]*<strong>(\S*)<\/strong>/);
			TP = RegExp.$2;
			t_id[cnt+1] = RegExp.$1;
			TP = TP.replace(/,/,"");
			if(tp10_flg.checked == true && TP > 10) break;
			loop_k:for(var k=1;k<cnt+1;k++){
				if( t_id[cnt+1] == t_id[k] ) continue loop_j;
			}
			cnt += 1;
			trade.innerHTML += "<tr>" +tr.snapshotItem(j).innerHTML+ "</tr>"

			document.getElementById("c_count").innerHTML = cnt;
			if(cnt >= c_max) break;
		}
	}

	var address = document.evaluate('//div[@id=\"TempDOM\"]//*[@id=\"gray02Wrapper\"]//*[@class=\"pager\"]//*[@title=\"last page\"]/@href', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	document.body.removeChild(dom);

	if(address.snapshotLength>0){
		address.snapshotItem(0).textContent.match(/trade.php\?p=([0-9]*)/);
		var lastpage = parseInt(RegExp.$1);

		loop_i:for(var i=2; i<lastpage; i++){
			if(tp10_flg.checked == true && TP > 10) break;
			var url2 = url + "&p=" +i;

			var dom2 = document.createElement("div");
			dom2.innerHTML = getContentFromURL(url2);
			dom2.id = 'TempDOM'+i;
			dom2.style.display = "none";
			document.body.appendChild(dom2);

			var target = "//div[@id=\"TempDOM"+i+"\"]//*[@id='gray02Wrapper']//*[@class=\"tradeTables\"]//tr";
			var tr = document.evaluate(target, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			document.body.removeChild(dom2);
			loop_j:for(var j=0;j<tr.snapshotLength;j++){
				if(tr.snapshotItem(j).innerHTML.indexOf("---") != -1){
					var regexp = tr.snapshotItem(j).innerHTML;
					regexp.match(/cardWindow_([0-9]*)[\s\S]*<strong>(\S*)<\/strong>/);
					TP = RegExp.$2;
					t_id[cnt+1] = RegExp.$1;
					TP = TP.replace(/,/,"");
					if(tp10_flg.checked == true && TP > 10) break loop_i;
					loop_k:for(var k=0;k<cnt+1;k++){
						if( t_id[cnt+1] == t_id[k] ) continue loop_j;
					}
					cnt += 1;
					trade.innerHTML += "<tr>" +tr.snapshotItem(j).innerHTML+ "</tr>"

					document.getElementById("c_count").innerHTML = cnt;
					if(cnt >= c_max) break loop_i;
				}
			}

			document.getElementById("count").innerHTML = i;
		}

	}

	var busho_no_es=$a('//table[@class="tradeTables"]//tr[position()>1]/td[position()=1]');
	for (var i = 0;i < busho_no_es.length;i++) {
	    busho_no_es[i].innerHTML=addtradelink4cardnotext(busho_no_es[i].innerHTML);
	}
	var skill_es=$a('//table[@class="tradeTables"]//td[@class="skill"]/div');
	for (var i = 0;i < skill_es.length;i++) {
	    skill_es[i].innerHTML=addtradelink4skilltext(skill_es[i].innerHTML);
	}
	document.getElementById("read").innerHTML = "検索完了[上限"+c_max+"件]";

	if(over_mouse_flg == 1)		OverMouse();
	if(immediate_bid_flg == 1)	ImmBid();

	//document.getElementById("radio"+n).checked = true;
	//document.getElementById("newbtn").addEventListener("click",function(){search_trade2()},false)
}

// ==UserScript==
// @name           bro3_misc
// @namespace      Miscellaneous Tool
// @description    トレードカードリスト by いかりや長介@一決
function bro3_misc(){

	if(location.pathname=="/card/exhibit_list.php"){
		var m="";
		var s = document.getElementsByClassName("trade_commission_info").item(0);
		var t = document.createElement("div");
		t.id = "trade_direct_link";
		t.style.marginTop = "10px";
		t.style.marginBottom = "5px";
		t.style.fontSize = "12px";
		t.innerHTML = "出品中カードへのダイレクトリンク<br><textarea id=direct_link_lists rows=11 cols=93></textarea>";
		s.parentNode.insertBefore(t, s);

		var target = "//*[@id='gray02Wrapper']//*[@class='trade']/a/@href";
		var link = document.evaluate(target, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i< link.snapshotLength; i++){
			link.snapshotItem(i).textContent.match(/del_id=(\d+)/);
			m += "http://"+host+"/card/trade_bid.php?id=" + RegExp.$1 + "\n";
		}
		document.getElementById("direct_link_lists").value = m;
	}
	if(location.pathname=="/card/bid_list.php"){
	jQuery.noConflict();
	j$=jQuery;
		var m="";
		j$("div[class=ui-tabs-panel]").append("<div id=direct_trade>");
		j$("#direct_trade").css({"margin-top":"10px","margin-bottom":"5px","font-size":"12pt"});
		j$("#direct_trade").append("リスト一括入札 <span id=notice_msg></span>");
		j$("#direct_trade").append("<textarea id=direct_link_lists rows=11 cols=93>");
		j$("#direct_trade").append("<div id=control_area><input type=button id=auto_bid value=自動入札></div>");
		j$("#control_area").css({"text-align":"right"});
		j$("#auto_bid").bind('click',function(){
			var a=j$("#direct_link_lists").val().split("\n");
			j$("#auto_bid").attr("disabled","disabled");
			AutoBid(a)
		})
	}
}

function AutoBid(b){
	jQuery.noConflict();
	j$=jQuery;
	if(b.length==0){
		j$("#direct_link_lists").val("");
		j$("#auto_bid").removeAttr("disabled");
		return
	}
	var c=b[0].trim();
	var d=new RegExp("http:\\/\\/"+host+"\\/card\\/trade_bid.php\\?id=\\d+");
	b.shift();
	if(c.match(d)){
		j$(document.body).append("<div id=AjaxTempDOM>");
		j$("#AjaxTempDOM").hide();
		j$("#AjaxTempDOM").load(c+" #gray02Wrapper",function(){
			var a={};
			if(j$("input[name=exhibit_cid]").length!=0){
				a['t']=j$("input[name=t]").val();
				a['k']=j$("input[name=k]").val();
				a['p']=j$("input[name=p]").val();
				a['s']=j$("input[name=s]").val();
				a['o']=j$("input[name=o]").val();
				a['exhibit_cid']=j$("input[name=exhibit_cid]").val();
				a['exhibit_id']=j$("input[name=exhibit_id]").val();
				a['buy_btn']="落札する"
			}else{
				a['ssid']=j$("input[name=ssid]").val();
				a['t']=j$("input[name=t]").val();
				a['k']=j$("input[name=k]").val();
				a['p']=j$("input[name=p]").val();
				a['s']=j$("input[name=s]").val();
				a['o']=j$("input[name=o]").val();
				a['exhibit_price']=j$("input[name=exhibit_price]").val();
				a['exhibit_id']=j$("input[name=exhibit_id]").val();
				a['bid_btn']="入札する"
			}
			j$("#notice_msg").text("(トレードID "+j$("input[name=exhibit_id]").val()+" を入札中)");
			j$.post("http://"+host+"/card/trade_bid.php",a,function(){setTimeout(function(){AutoBid(b)},500)})
		})
	}else{
		j$("#notice_msg").text("(有効なトレードリンクではありませんでした)");
		setTimeout(function(){AutoBid(b)},500)
	}
}

// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    秘密のウラワザ　ｂｙきの。

if( himitsu_flg == 1){
	if(path.indexOf("/card/deck.php")!=-1 || path.indexOf("/card/duel_set.php")!=-1){
		var page_type = document.getElementsByName("show_deck_card_count").item(0);
		page_type = page_type.options[page_type.selectedIndex].value;

		if( page_type != 1 ){
			var s_list = document.evaluate('//*[@class="statusDetail"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var vil = document.getElementsByClassName("setPlace");
			var card = document.evaluate('//form[@id="deck_file"]//*[@class="cardWrapper2col"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var left = document.getElementsByClassName("left");
			var def_vil = "";
			var def_cid = "";
			for( var i = 0; i < s_list.snapshotLength; i++ ){
				if(vil.item(i).innerHTML.indexOf("セット先")!=-1){
					def_vil = vil.item(i).innerHTML;
					var regexp = s_list.snapshotItem(i).innerHTML;
					regexp.match(/cardWindow_([0-9]*)/);
					def_c_id = RegExp.$1;
					break;
				}
			}
			if(def_vil.length!=0){
				for( var i = 0; i < s_list.snapshotLength; i++ ){
					if(card.snapshotItem(i).innerHTML.indexOf("特:")!=-1){
						if(card.snapshotItem(i).innerHTML.indexOf('<span class="status_hp">100/100</span>')!=-1){
							vil.item(i).class = "setPlace";
							var regexp2 = s_list.snapshotItem(i).innerHTML;
							regexp2.match(/cardWindow_([0-9]*)/);
							var c_id = RegExp.$1;
							def_vil = def_vil.split(def_c_id).join(c_id)
							vil.item(i).innerHTML = def_vil;
							var btn = document.createElement("div")
							btn.class = "set";
							btn.innerHTML = '<a href="#"><img src="/20120720-01/extend_project/w760/img/card/common/btn_setdeck_mini.gif" alt="このカードをデッキにセットします" title="このカードをデッキにセットします" class="aboutdeck" /></a>';
							btn.addEventListener("click",setWildCard(c_id),false)
							if(path.indexOf("/card/deck.php")!=-1){
								left.item(i+1).removeChild(left.item(i+1).childNodes.item(2));
								left.item(i+1).appendChild(btn);
							}else if(path.indexOf("/card/duel_set.php")!=-1){
								left.item(i).removeChild(left.item(i).childNodes.item(2));
								left.item(i).appendChild(btn);
							}
						}
					}
				}
			}
		}

	}
}

function setWildCard(n){
	return function(){
		var v_id = document.getElementById("selected_village_"+n).value;

		document.getElementById("target_card").value = n;
		document.getElementById("mode").value='set';
		document.getElementById("deck_file").submit();
	}
}


// @name           ----
// @namespace      http://chaki.s27.xrea.com/br3/
// @description    軍極セット　ｂｙきの。

function bulk_set(){
	var page_type = document.getElementsByName("show_deck_card_count").item(0);
	page_type = page_type.options[page_type.selectedIndex].value;

	if( page_type != 1 ){
		var new_area = document.createElement("div");
		new_area.style.textAlign = "left";
		new_area.style.backgroundColor = "#C8C8FF";
		new_area.innerHTML = "<strong>一括デッキセット：　</strong>";

		var btn = document.createElement("input");
		btn.type = "button";
		btn.value = "セット";
		btn.addEventListener("click",function(){file_set()},false);

		var sel1 = document.createElement("select");
		sel1.name = "B_set_type";
		sel1.innerHTML = "<option value=1>連環セット<option value=2>蜀軍セット<option value=3>魏軍セット<option value=4>呉軍セット<option value=5>群雄セット<option value=6>リスト表示";

		var sel2 = document.createElement("select");
		sel2.name = "B_set_vil";
		var setPlace = document.evaluate('//*[@class="setPlace"]/select',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if(setPlace.snapshotLength > 0){
			sel2.innerHTML = setPlace.snapshotItem(0).innerHTML;
		}else{
			new_area.innerHTML += "デッキに上げられる武将がいません";
			sel1.style.display = "none";
			sel2.style.display = "none";
			btn.type = "hidden"
		}

		var new_area2 = document.createElement("div");
		new_area2.id = "B_set_textarea";

		var tbl = document.createElement("table");
		tbl.id = "B_set_tbl";
		tbl.style.align = "center";
		tbl.border = "1";
		tbl.style.borderColor = "#C8C8FF";
		tbl.style.backgroundColor = "#FFFFFF";

		new_area.appendChild(sel1);
		new_area.appendChild(sel2);
		new_area.appendChild(btn);
		new_area.appendChild(new_area2);
		new_area.appendChild(tbl);

		var sortTitle = document.getElementsByClassName("sortSystem").item(0);
		sortTitle.appendChild(new_area)
	}

	//一括ファイル戻し
	var unset_btn = document.createElement("input");
	unset_btn.type = "button";
	unset_btn.value = "デッキで待機中の武将をすべてファイルに戻す"
	unset_btn.id = "u_unset"
	unset_btn.addEventListener("click",function(){file_unset()},false);
	document.getElementsByClassName("tab").item(0).appendChild(unset_btn)

}

function file_unset(){
	var ssid = document.getElementsByName("ssid").item(0).value;
	var control= document.getElementsByClassName("control");
	document.getElementById("u_unset").value = "処理中です...";
	for ( var i=0; i < control.length; i++){
		var text = control.item(i).innerHTML;
		if ( text.indexOf("ファイルに戻します") != -1 ){
			text.match(/operationExecution[\D]*([0-9]*?)[\D]*unset/);
			var b_id = parseInt(RegExp.$1);

			var data = "mode=unset&target_card="+b_id+"&wild_card_flg=&inc_point=&btn_change_flg=&l=&ssid="+ssid;
			GM_xmlhttpRequest({
				method:"POST", 
				url:"http://" + host + "/card/deck.php",
				headers:{"Content-type":"application/x-www-form-urlencoded"},
				data: data,
				onload:function(x){console.log(x.responseText);}
			});

		}
	}
	document.getElementById("u_unset").value = "完了。";
	var us_tID = setTimeout(function(){us_jump()},3000);
}

function us_jump(){
	location.reload();
}

function file_set(){
	var deck = '//*[@id="cardListDeck"]//*[@class="cardWrapper"]';
	var d_card = document.evaluate(deck,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var sel1 = document.getElementsByName("B_set_type").item(0);
	var type = sel1.options[sel1.selectedIndex].value;
	var sel2 = document.getElementsByName("B_set_vil").item(0);
	var vil_id = sel2.options[sel2.selectedIndex].value;

	var dc = '//*[@class="deckcost"]';
	var d_cost = document.evaluate(dc, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
	d_cost.match(/([\S]*) \/ ([\S]*)/);
	var n_cost = RegExp.$1;
	var M_cost = RegExp.$2;
	var r_cost = M_cost - n_cost;

	var txtarea = document.getElementById("B_set_textarea");
	txtarea.innerHTML = "&nbsp;ファイルを取得中です...&nbsp;&nbsp;<span id=nowp>0</span>&nbsp;/&nbsp;<span id=lastp>0</span>";
	var nowp = document.getElementById("nowp");
	var lastp = document.getElementById("lastp");

	var tbl = document.getElementById("B_set_tbl");
	var tbl_col = "";
	tbl_col += "<tr align=center>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>カードNo.</storng></th>"
	//tbl_col += "<th style=border-color:#C8C8FF;><strong>レア</storng></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>武将名</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>Lv</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>勢力</storng></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>コスト</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>兵科</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>攻撃</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>知力</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>歩防</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>槍防</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>弓防</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>騎防</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>速度</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>知/コ</strong></th>"
	tbl_col += "<th style=border-color:#C8C8FF;><strong>カードID</strong></th>"
	if( type ==6 ) tbl_col += "<th style=border-color:#C8C8FF;><strong>デッキセット</strong></th>"
	tbl_col += "</tr>"
	tbl.innerHTML = tbl_col;

	var pager = document.evaluate('//*[@class=\"pager\"]/*[@class=\"last\"]/a[2]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if(pager.snapshotLength > 0){
		var lastpage = pager.snapshotItem(0).href;
		lastpage.match(/p=([0-9]*)/);
		var p_max = parseInt(RegExp.$1);
		lastp.innerHTML = p_max;
	}else{
		var lastpage = 1;
		var p_max = 1;
	}

	for(var i = 1; i <= p_max; i++){
		var url = "http://"+host+"/card/deck.php?p="+i+"&l=#ptop"
		var dom = document.createElement("div");
		dom.innerHTML = getContentFromURL(url);
		dom.id = 'TempDOM'+i;
		dom.style.display = "none";
		document.body.appendChild(dom);

		nowp.innerHTML = i;

		var f_card = document.evaluate('//*[@id="TempDOM'+i+'"]//*[@class="setPlace"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var j =0; j < f_card.snapshotLength; j++){
			var reg_exp = f_card.snapshotItem(j).innerHTML;
			reg_exp.match(/selected_village_([0-9]*)/);
			var b_id = parseInt(RegExp.$1);

			var card_no = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="cardno"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var rarerity = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//span[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var name = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="name"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var lv = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//span[4]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var cost = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="cost"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var soltype = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="soltype"]/img/@title', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
			var att = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="status_att"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var intl = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="status_int"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var wdef = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="status_wdef"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var sdef = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="status_sdef"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var bdef = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="status_bdef"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var rdef = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="status_rdef"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var speed = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="status_speed"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
			var cntry = document.evaluate('//*[@id="cardWindow_'+b_id+'"]//*[@class="country"]/img/@title', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
			var pict = document.evaluate('//*[@id="cardWindow_'+b_id+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;

			var tbl_col = "";
			tbl_col += "<tr align=center id='tr_"+b_id+"' name=tbl_tr><input type=hidden name=status id=status_"+b_id+" value=unset>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+card_no+"</td>"
			//tbl_col += "<td style=border-color:#C8C8FF;>"+rarerity+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;><a href='javascript:void(0);' id='link_"+b_id+"'><strong>"+rarerity+"</strong><span id=b_name_"+b_id+" name=b_name>"+name+"</span></a><div id='cardWindow_"+b_id+"' style='display:none;'>"+pict+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;> <strong>Lv.</strong>"+lv+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+cntry+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+cost+"<input type=hidden name=cost id=cost_"+b_id+" value="+cost+"></td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+soltype+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+att+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+intl+"<input type=hidden name=int id=int_"+intl+" value="+intl+"></td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+wdef+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+sdef+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+bdef+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+rdef+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+speed+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF;>"+Math.floor(intl/cost*10)/10+"</td>"
			tbl_col += "<td style=border-color:#C8C8FF; name=b_id>"+b_id+"</td>"
			if( type ==6 ) tbl_col += "<td id=set_"+b_id+" style=border-color:#C8C8FF;></td>";
			tbl_col += "</tr>"

			if( type == 2 ){
				if( cntry == "蜀" ) tbl.innerHTML += tbl_col;
			}else if( type == 3 ){
				if( cntry == "魏" ) tbl.innerHTML += tbl_col;
			}else if( type == 4 ){
				if( cntry == "呉" ) tbl.innerHTML += tbl_col;
			}else if( type == 5 ){
				if( cntry == "他" ) tbl.innerHTML += tbl_col;
			}else if( type == 6){
				tbl.innerHTML += tbl_col;

				var btn_area = document.getElementById("set_"+b_id);
				var setbtn = document.createElement("input");
				setbtn.type = "button";
				setbtn.id = "setbtn_"+b_id;
				setbtn.title = b_id;
				setbtn.name = "setbtn";
				setbtn.value = rarerity + name;
				//setbtn.addEventListener("click",deck_set(b_id),false);
				btn_area.appendChild(setbtn);

			}else{
				tbl.innerHTML += tbl_col;
			}
		}
		dom.innerHTML = "";
	}

	txtarea.innerHTML = "&nbsp;<span id=mes>デッキにセット中です...&nbsp;&nbsp;</span><strong>残りコスト：</strong>&nbsp;<span id=rc>"+r_cost+"</span>";

	if( type == 1 ){
		var tbl_tr = document.getElementsByName("tbl_tr");
		var rcost = document.getElementById("rc").innerHTML;

		//コストパフォーマンスが高い武将からセットする。
		//※この方式は必ずしも最高のコストパフォーマンスを発揮しない。
		//　（残りコストが2の時、1コス知力10が一人と2コス知力13が一人いた場合、
		//　　1コス知力10の方を選択してしまう）
		for( var i=0; i<tbl_tr.length; i++){
			var b_id;
			var b_cost_min = 5;
			var b_cpf_max = 0;
			var costbtn_i = document.getElementsByName("cost")
			var status_i = document.getElementsByName("status")
			var b_id_i = document.getElementsByName("b_id")
			var b_int_i = document.getElementsByName("int")
			for( j=0; j<tbl_tr.length; j++ ){
				if( status_i.item(j).value == "unset" ){
					var b_cpf = b_int_i.item(j).value / costbtn_i.item(j).value;
					if( b_cpf > b_cpf_max ){
						b_cpf_max = b_cpf;
						b_id = b_id_i.item(j).innerHTML;
					}
					if( costbtn_i.item(j).value < b_cost_min ){
						b_cost_min = costbtn_i.item(j).value;
					}
				}
			}
			if( b_cost_min > rcost ) break;
			deck_set(b_id);
		}
		document.getElementById("mes").innerHTML = ""
		location.href = "http://"+host+"/card/deck.php";

	} else if( type > 1 && type < 6){

		var tbl_tr = document.getElementsByName("tbl_tr");
		var rcost = document.getElementById("rc").innerHTML;

		for( var i=0; i<tbl_tr.length; i++){
			var b_id;
			var b_cost_min = 5;
			var costbtn_i = document.getElementsByName("cost")
			var status_i = document.getElementsByName("status")
			var b_id_i = document.getElementsByName("b_id")
			for( j=0; j<tbl_tr.length; j++ ){
				if( status_i.item(j).value == "unset" ){
					if( costbtn_i.item(j).value < b_cost_min ){
						b_cost_min = costbtn_i.item(j).value;
						b_id = b_id_i.item(j).innerHTML;
					}
				}
			}
			if( b_cost_min > rcost ) break;
			deck_set(b_id);
		}
		document.getElementById("mes").innerHTML = ""
		location.href = "http://"+host+"/card/deck.php";

	} else if( type == 6) {
		var setbtn = document.getElementsByName("setbtn")
		for(i=0;i<setbtn.length;i++){
			var b_id = setbtn.item(i).title;
			setbtn.item(i).addEventListener("click",deck_set_btn(b_id),false);
			document.getElementById("link_"+b_id).addEventListener("mouseover",popup(b_id,i),false);
			document.getElementById("link_"+b_id).addEventListener("mouseout",popdown(b_id,i),false);
		}
		document.getElementById("mes").innerHTML = ""


	}


}

function deck_set_btn(n){
	return function(){
		deck_set(n)
	}
}

function deck_set(n){
	var b_id = n;
	var cost = document.getElementById("cost_"+n).value;
	var status = document.getElementById("status_"+n).value;
	var b_name = document.getElementById("b_name_"+n).innerHTML;
	var rcost = document.getElementById("rc").innerHTML;
	var sel2 = document.getElementsByName("B_set_vil").item(0);
	var vil_id = sel2.options[sel2.selectedIndex].value;
	var p = 1;
	var ssid = document.getElementsByName("ssid").item(0).value;
	var tbl_tr = document.getElementById("tr_"+n)

	var data = "mode=set&target_card="+b_id+"&wild_card_flg=&inc_point=&btn_change_flg=&p="+p+"&l=&ssid="+ssid+"&selected_village["+b_id+"]="+vil_id;
	GM_xmlhttpRequest({
		method:"POST", 
		url:"http://" + host + "/card/deck.php",
		headers:{"Content-type":"application/x-www-form-urlencoded"},
		data: data,
		onload:function(x){console.log(x.responseText);}
	});

	document.getElementById("cost_"+b_id).value = 0;
	tbl_tr.style.backgroundColor="yellow";
	document.getElementById("status_"+n).value = "ondeck"

	rcost = rcost - cost;
	if(rcost < 0) rcost = 0;
	document.getElementById("rc").innerHTML = rcost;

	var tr_i = document.getElementsByName("tbl_tr")
	var status_i = document.getElementsByName("status")
	var b_name_i = document.getElementsByName("b_name")
	var costbtn_i = document.getElementsByName("cost")
	for(i=0;i<tr_i.length;i++){
		if( status_i.item(i).value == "unset"){
			if( costbtn_i.item(i).value > rcost ){
				//コスト不足NG
				tr_i.item(i).style.background = "gray";
				status_i.item(i).value = "overcost"
			}else if( b_name_i.item(i).innerHTML == b_name ){
				//名前かぶりNG
				tr_i.item(i).style.background = "gray";
				status_i.item(i).value = "overcost"
			}
		}
	}
}

//getContentFromURL関数
function getContentFromURL(url) {
 var xmlhttp = new XMLHttpRequest();
 xmlhttp.open('GET', url, false);
 xmlhttp.send();

 if (xmlhttp.status == 200){
  return xmlhttp.responseText;
 }
 else {
  return "";
 }
}


}) ();

