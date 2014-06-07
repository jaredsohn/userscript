// ==UserScript==
// @name           1kibaku-etcs
// @namespace      1kibaku-etcs
// @version        0.28.1
// @author         P.kzn
// @description    ブラウザ一騎当千で色々するスクリプト
// @include        http://*.1kibaku.jp/*
// @run-at         document-end
// ==/UserScript==
//
(function(){
/*---------------------------------------------
【履歴】
0.0.1   2011/08/11 広告自動クローズ(8/11版)・袁術先生の口調簡易直し
0.0.2              袁術先生の口調直し追加・フリーマーケット取引状態仮算出追加・設定画面追加・文字数表示
0.0.3              袁術先生の口調直し追加・ポップアップクローズ・設定保存方法変更・施設リンク仮作成・マップドラッグ移動仮作成・サイドバー調整
0.0.4              プロフィールでの情報取得方法の変更・ChromeでERROR:22が出るときの対策
0.0.5   2011/10/06 一般公開版 カードNo.クリック機能
0.0.6   2011/10/12 ドラッグのイベント方法修正　ウインドウ周り修正
0.0.7   2011/10/13 サイドバータブ
0.0.8   2011/10/15 本鯖以外にも仮対応。但しサイドバー関係の機能は非対応にする
0.0.9   2011/10/18 サイドバータブを本鯖以外にも仮対応
0.0.10  2011/10/18 Firefox3.6で設定が保存されなかったのを修正
0.0.11  2011/10/20 サイドバータブのバグ修正・サイドバーの幅関係修正・デッキで15枚表示の時にもカードNoクリックを有効にした
0.0.12  2011/11/02 BP/TP/CP画像をクリック時ブショーダス/トレード/便利機能へ飛ぶを追加・袁術先生台詞修正/フリーマーケット取引状態仮算出の手直し・カード右クリックでメニュー表示追加・その他微調整
0.0.13  2011/11/03 文字数表示の対象を個人掲示板まで広げた・フリーマーケット取引状態仮算出の修正・右クリックのバグ修正
0.0.14  2011/11/04 設定の入り口を整理(hasekun様からご助言を参考にしました)・フリーマーケット取引状態仮算出でスキルに対応と重くなるバグ修正
0.0.15  2011/11/07 施設リンクのエラー対応/Loading表記/学園分校会場に対応・カード出品時/出品中のカードで手数料表示を追加
0.0.16  2011/11/08 カード出品時/出品中のカードで手数料表示でカンマが入っている時の不具合修正(thx! hasekun様)/カンマをつけた
0.0.16a 2011/11/09 右クリックでメニューで、スキルが他ツールがあった場合に取得できないテストバージョン
0.0.17  2011/11/15 右クリックメニューの15枚表示が、ラベル機能実装により動かなくなっていたのを修正・出陣時帰還日時表示・ブショーダスライト誤破棄防止機能(未確認)
0.0.18  2011/11/23 カードNo.クリックと右クリックの機能を分けた・トレードで24時間以上の物は警告するを追加・スキルタイムメモの仮作成・mixiで施設リンクがboxからはみ出ていたのを修正
0.0.19  2011/11/25 サイドバー幅調整時に拠点も広げる設定追加・トレードリストでソートのリンクに表示Rフラグを追加・デッキのファイルでラベルタブのリンクにアンカーを挿入してジャンプする機能
                   xx枚表示で、スキルの所に透明画像が表示されているバグ対策
0.0.20  2011/11/27 施設リンク微修正・サイドバー座標入力追加・施設リンクでx=0ory=0の座標の時に登録に失敗するのを修正
0.0.21  2011/12/02 xx枚表示で、スキルの所に透明画像が表示されているバグ対策が直ってなかったのを再修正・トレードソートでURのフラグが反映されていないのを修正・スキルタイマーでエラー時の処理追加・ツールチップを自前の物にした
0.0.22  2011/12/05 ポップアップ表示方法変更に伴う修正
0.0.23  2011/12/17 セーブデータ削除追加・フリーマーケットで資源量表示追加
0.0.24  2011/12/26 拠点ダメージ予測表示追加・class costに資源量ツールチップ表示・兵作成時に作成できる最大数リンク
0.0.24b 2011/12/27 beyondのスタイル変更を使用時に、サイドバーに追加した物が崩れる対策
0.0.24c 2011/12/27 兵作成時に作成できる最大数リンクで、剣兵が抜けていた・地図座標がずれるのを修正
0.0.25  2011/12/30 施設リンクで任意の名前を付けられるようにした・class costに資源量ツールチップ表示の判定ミスを修正・ツールチップのイベント設定ミス修正・コストビュー簡易登録機能追加
0.26.0  2012/01/21 防具情報追加(thx.wikiの有志の皆さん)・デッキでカードの所属拠点の内政に飛べるリンク追加・コストビュー簡易登録機能の修正・右クリックが動かなくなっていたのを修正・バージョン表記の変更
0.27.0  2012/02/20 騎兵防具名称追加・他鯖の設定を読み込むを追加
0.27.1  2012/03/03 鍛冶場・武具でレベルを取得するとき、投石機でのエラー修正
0.27.2  2012/03/05 車ダメージ表示で、皇叔の号令に対応
0.28.0  2012/03/22 フリーマーケットプリセット追加・サイドバー座標入力で全角数字に対応・出陣種類デフォルト選択を追加・拠点画面の空き一般学生寮数をツールチップで表示を追加
0.28.1  2012/04/22 ツールチップで追加を変更・出陣種類デフォルトを直に登録できるように・出陣情報出力を追加・本鯖ナビバー修正対応

【備考】
※このスクリプトを使用して動作がおかしくなったら、直ぐに使用を中止してください。
※Web       ：http://pkzn.blog.fc2.com/
※簡易説明書：http://pkzn.blog.fc2.com/blog-entry-4.html
------------------------------------------------*/
/*
	グローバル
*/

var SCRIPT_VERSION = '0.28.1';
var SERVER_NAME = location.hostname.split('.')[0];
var SERVICE_TYPE = '[s/y]';									// サービスの種類(s:本鯖 h:ハンゲー m:mixi y:ヤフー f:facebook)
var SERVER_TYPE = 0;									// サーバーのタイプ 0:[s/y] 1:[m/h/f]
var SAVE_NAME_HEAD = "1KKIBAKU_ETCS_";
var SAVE_NAME   = SAVE_NAME_HEAD+SERVER_NAME+"_";
var SERVER_URI  = 'http://'+location.host;
var PROFILE_URI = SERVER_URI+'/user/';
var MAPMOVE_URL = SERVER_URI+'/map.php?';
var BSYODAS_URI = SERVER_URI+'/busyodas/busyodas.php';
var TRADE_URI   = SERVER_URI+'/card/trade.php';
var CPITEM_URI  = SERVER_URI+'/cp/item_list.php';
var SKILLTIMER_SAVE_VER = 1;
var NAVI_ID     = 'gnavi';			// P・本鯖UI変更対応(2012/04/23変更)


// マップドラッグ関係座標
var dragStartPosX;
var dragStartPosY;
var mapsall_initX;
var mapsall_initY;
// リンクリストフラグ
var FacilityLink_loadFlag = false;

// ウインドウ関係
var baseWinList = [];
var baseWinListCnt = 0;
var myToolTipList = [];
var myToolTipListCnt = 0;

// サーバー時間
var serverTime = new Date();

// 保存データのデフォルト設定・使用コントロール
var saveDefaultData = [
	["AllDelayTime","value",300],
	["ADSTime","value",10000],
	["FixMiuTolk","checked",false],
	["MarketStockCalc","checked",false],
	["MarketStockCalcTimer","checked",false],
	["MarketCostView","checked",false],
	["MarketCostViewCalcFullTime","checked",false],
	["MarketCostViewDblClick","checked",false],
	["MarketStockPreset","checked",false],
	["checkClassCost","checked",false],
	["checkClassCostPer","value",40],
	["MapDragPosMove","checked",false],
	["SidebarTab","checked",false],
	["clickBPTPCPArea","checked",false],
	["SidebarWidth","checked",false],
	["SidebarWidth_AddSize","value",5],
	["SidebarWidth_AdjustStatusR","checked",false],
	["SidebarFacilityLink","checked",false],
	["facilityLinkMoveType","radio","ajax"],
	["SidebarWidth_VillageBlock","checked",false],
	["InputStrLen_Chat","checked",false],
	["InputStrLen_BBS","checked",false],
	["InputStrLen_PersonBBS","checked",false],
	["InputStrLen_Mail","checked",false],
	["JumpURIFromClickCard","checked",false],
	["JumpURIFromClickCardNoURI","value",""],
	["cardRightClickSkill","checked",false],
	["cardRightClickSkillURL","value",""],
	["cardRightClickSkillCSV","value",""],
	["cardRightClickSkillNewTab","checked",false],
	["alterTableCardStatusUp","checked",false],
	["viewSellCardFees","checked",false],
	["listViewSellCardFees","checked",false],
	["carDmgCalc","checked",false],
	["retDateOnSendTroop","checked",false],
	["busyodasNonDelR","checked",false],
	["SendTroopAtackDefault","checked",false],
	["SendTroopAtackDefaultType","radio","302"],
	["getUnitStatusTime","checked",false],
	["AlertOfBuyTradeTime_Bid","checked",false],
	["AlertOfBuyTradeTime_List","checked",false],
	["skillTimer_List","checked",false],
	["skillTimer_Card","checked",false],
	["addRTradeSortLink","checked",false],
	["revLabelTabLink","checked",false],
	["deckToDomestic","checked",false],
	["deckPagerUpperClone","checked",false],
	["sidebarInputPos","checked",false],
	["makeDisSolMax","checked",false],
	["AccommodationFree","checked",false],
	["AccommodationFreeType","radio","0"],
];


//var viewCardSkillTimer_ToolTipID = null;

// ========================
//       メイン関数
// ========================

	var ETCS_OPTION = [];

	// mixiチェック？
	if(SERVER_NAME.match(/(.)\d+/)) {
		var kindData = {'s':0, 'm':1, 'y':1, 'h':0 ,'f':0, 'p':0};
		SERVICE_TYPE = RegExp.$1;
		SERVER_TYPE  = kindData[SERVICE_TYPE];
		if(typeof SERVER_TYPE == 'undefined') SERVER_TYPE = 0;
		// console.log(SERVICE_TYPE + "/" + SERVER_TYPE);
	}

	// 旧タイプチェック
	if(document.getElementById('gNav') != null) {
		NAVI_ID = 'gNav';
	}


	GM_init();				// Chrome対策

	EtcsSetting_Load();	// 設定ロード
	EtcsSetting_Insert();		// 設定画面(タイマーで呼ばない。タイマーの値が大きくなると再設定が難しくなる)

	setTimeout(function() {
//console.time("all");
		serverTime = getNowTime();		// 時間取得
		getCommonProfile();			// プロフィール読み込み
		if(ETCS_OPTION['SidebarWidth']) 			changeSidebarWidth();		// サイドバーサイズ変更
		setEvent_chkInputStrLen();												// 文字数表示(ON/OFFは中で)
		if(ETCS_OPTION['ADSTime'] > 0) 				autoCloseADS();
		if(ETCS_OPTION['SidebarFacilityLink'])		SidebarFacilityLink();

		if(ETCS_OPTION['FixMiuTolk'])				fix_mius_tolk();

		if(ETCS_OPTION['MarketStockPreset'])		MarketStockPreset();
		if(ETCS_OPTION['MarketStockCalc'])			initMarketStockCalc();
		if(ETCS_OPTION['MapDragPosMove'])			MapDrag_Init();
		if(ETCS_OPTION['JumpURIFromClickCard'] || ETCS_OPTION['cardRightClickSkill'])	jumpURIFromClickCardNo();

		if(ETCS_OPTION['viewSellCardFees'])			initViewSellCardFees();		// カード手数料
		if(ETCS_OPTION['listViewSellCardFees'])		listViewSellCardFees();
		if(ETCS_OPTION['alterTableCardStatusUp'])	alterTableCardStatusUp();
		if(ETCS_OPTION['clickIPTPCPArea'])			clickIPTPCP();
		if(ETCS_OPTION['retDateOnSendTroop'])		returnDateOnCastleSendTroop();
		if(ETCS_OPTION['revLabelTabLink'])			revLabelTabLink();
		if(ETCS_OPTION['addRTradeSortLink'])		addRTradeSortLink();
		if(ETCS_OPTION['sidebarInputPos'])			sidebarInputPos();

		initSkillTimer();														// ON/OFFは中で
		AlertOfBuyTradeTime();													// ON/OFFは中で
		if(ETCS_OPTION['carDmgCalc'])				carDmgCalc();
		if(ETCS_OPTION['SidebarTab'])				initSidebarTab();			// サイドバータブは最後に描画

		if(ETCS_OPTION['deckToDomestic'])			deckToDomestic();
		if(ETCS_OPTION['MarketCostView'])			initMarketCostView();
		if(ETCS_OPTION['checkClassCost'])			checkClassCost();
//Sidebar_MarketCostView();
		if(ETCS_OPTION['makeDisSolMax'])			makeDisSolMax();
		if(ETCS_OPTION['deckPagerUpperClone'])		deckPagerUpperClone();
		if(ETCS_OPTION['getUnitStatusTime'])		getUnitStatusTime();
		if(ETCS_OPTION['SendTroopAtackDefault'])	SendTroopAtackDefault();
//addToHelpButton();
	},ETCS_OPTION['AllDelayTime']);

	// CSS
	(function() {
		var cssstr =
// BaseWindow
		'div.etcsBaseWindow { position:absolute; top:3px; left:0px; border:1px solid #000000; color:#000000; background : none repeat scroll 0 0 #ffffff; z-index : 10010; box-shadow : 3px 3px rgba(0,0,0,0.4); border-radius : 9px 9px 9px 9px / 9px 9px 9px 9px; overflow : auto;}'+
		'div.etcsBaseWindow > div:nth-child(1) { position:relative; top:0px; left:0px; width:100%; height:1.4em; margin:0; padding:0; color:#ffffff; background : none repeat scroll 0 0 #0000d6; z-index : 10011; box-shadow : 0px 2px rgba(0,0,0,0.4);text-shadow : 1px 1px rgba(0,0,0,0.4); overflow : hidden; cursor:default; text-align:center; font:bold 1em;  border-radius : 9px 9px 0px 0px / 9px 9px 0px 0px;}'+
		'div.etcsBaseWindow > div:nth-child(2) { margin:0; padding:14px; color:#000000; background : none repeat scroll 0 0 transpaint; z-index : 10011;  overflow : auto; border-radius : 0px 0px 9px 9px / 0px 0px 9px 9px; resize:both; }'+
		'div.etcsBaseWindow a { color:#000000; }'+
		'div.etcsBaseWindow a:hover{ color:#ffffff; background-color:#000000; text-decoration:underline; }'+
		'div.etcsBaseWindow dt { margin-top:0.5em; margin-bottom:0.3em;}'+
		'div.etcsBaseWindow dd { margin-top:0.2em; margin-bottom:0.2em;}'+
		'div.etcsBaseWindow ii { margin-top:0.2em; margin-bottom:0.2em;}'+
		'div.etcsBaseWindow table { border:1px solid #000000;}'+
		'div.etcsBaseWindow table th,div.etcsBaseWindow table td { padding:2px; text-align:center; border:1px solid #000000;}'+
		'div.etcsBaseWindow table th { background:none #fff2bb;}'+
		'div.etcsBaseWindow table td { background:none #ffffff;}'+
// ToolTip
		'div.etcs_mytooltip {'+
			'position: absolute; background:none repeat scroll #ffffcc; border:1px solid #000000; '+
			'padding: 3px;border-radius:3px; box-shadow:2px 4px rgba(0,0,0,0.4); z-index : 10010;'+
		'}'+

// フリーマーケットで取引状態を仮算出
		'table.etcs_market_table { border:1px solid #000000;min-width:280px; margin:0.5em auto;}'+
		'table.etcs_market_table thead th { border : 1px solid #000000; text-align:center; min-width:50px;}'+
		'table.etcs_market_table tbody th { border : 1px solid #000000; text-align:center; background-color:#000000; color:#ffffff; padding:0.3em;}'+
		'table.etcs_market_table thead th:nth-child(2) {background-color:#ffe683; color:#000000;}'+
		'table.etcs_market_table thead th:nth-child(3) {background-color:#e9e9e9; color:#000000;}'+
		'table.etcs_market_table thead th:nth-child(4) {background-color:#f4c6ff; color:#000000;}'+
		'table.etcs_market_table thead th:nth-child(5) {background-color:#ffffc2; color:#000000;}'+
		'table.etcs_market_table tbody td { border : 1px solid #000000; text-align:center; padding:5px;}'+

// コストビュー
		'div#etcs_costview  { border:1px solid #000000; padding:1em;}'+
		'div#etcs_costview > div { margin:0 auto;}'+
		'div#etcs_costview table.etcs_market_table tbody th { min-width:120px; }'+
		'div#etcs_costview table.etcs_market_table tbody th { min-width:120px; }'+
		'div#etcs_sidebar_costview table.etcs_market_table { background-color:#ffffff;}'+
		'div#etcs_sidebar_costview table.etcs_market_table thead th:nth-child(1) { display:none; padding:0;}'+
		'div#etcs_sidebar_costview table.etcs_market_table tbody th { display:none; padding:0;}'+
		'div#etcs_sidebar_costview table.etcs_market_table td { padding:0;}'+

// 資源プリセット
		'div#etcs_stockPreset {position:absolute; border:1px solid #000000; padding:4px; box-shadow : 3px 3px rgba(0,0,0,0.4); border-radius : 3px;}'+
		'div#etcs_stockPreset h3 { border:1px solid #000000; background:#cccccc; margin:1px; text-align:center;}'+


// 手数料表示
		'span.etcs_sellcardlistfees { font-size:80%; font-weight:normal; color:#ff6666; display:block;}'+
// 文字数表示
		'div#comment_str_etcsChkLen { position:absolute; top:4px; left:458px; color:#ffffff; font-size:80%;}'+
		'span.bbsres_view_etcsChkLenCss { font-size:80%; }'+
// サイドバータブ
		'div#sidebarTab { height:18px; clear:both; margin:0px 0px 2px; padding:0; position:relative;}'+
		'div#sidebarTab > span { float:left; color:#ffffff; position: absolute; top:-3px; left:-16px; z-index:10;}'+
		'div#sidebarTab > span:hover { cursor:pointer;}'+
		'div#sidebarTab > span > input { margin:1px; padding:0; color:#ffffff;  background:#000000; border:1px #888888 solid;}'+
		'div#sidebarTab > span > input:hover { cursor:pointer; color:#ffff88; background:#888888;}'+
		'div#sidebarTab > div { position:relative; border:none; height:20px; overflow:hidden; width:135px;}'+
		'div#sidebarTab > div ul { position:relative; width:2000px;}'+
		'div#sidebarTab > div li { float:left; color:#aaaaaa; background:#000000 none; margin:0px 0px 0px 1px; padding:1px; min-width:30px; text-align:center;}'+
		'div#sidebarTab > div li:hover { cursor:pointer; color:#ffffff; background:rgba(255,255,255,0.5);}'+

// 施設リンク
		'ul#SidebarFacilityLink_List li { word-wrap: break-word; padding:1px 0px;} '+


// 出陣情報出力
		'div#getUnitStatusTime { width:710px; margin:5px 0; padding:8px; border:2px solid #000000; background:none #fdf0c0;}'+
		'div#getUnitStatusTime > div {width:710px; }'+
		'div#getUnitStatusTime > h3 {width:700px; border:1px solid #000000; background:none #ffcc00; margin:0; padding:5px; text-align:center; font-weight:bold;}'+
		'div#getUnitStatusTime > div > textarea {width:100%; height:8em; border:1px solid #000000; }'+


// 設定ウインドウ
		'div#etcs-setting { padding:1em; background:transparent;}'+
		'div#etcs-setting dl dt { padding:0.1em 0.1em 0.1em 0.5em; font-size:1.1em;font-weight:bold; color:#000000; background-color:#eeeeff;}'+
		'div#etcs-setting dl dd { margin:0.3em 1em; }'+
		'div#etcs-setting dl .etcs-setting_sub { margin:0.3em 2em 1em; } ';


		if((SERVER_TYPE == 0) && (ETCS_OPTION['SidebarWidth_VillageBlock'])) {
			cssstr += 'div#sidebar div.sideBoxInner.basename ul li { width:auto; } ';
		}
		GM_addStyle(cssstr);


	})();


// =============================
//       プロフィール共通
// =============================
function getCommonProfile() {

	var population,vpos;
	var cnt;
	var saveString;
	if(location.pathname != '/user/') return;


	/*
		プロフィール画面
	*/
	if(location.pathname == '/user/') {


	// 他君主との区分け
	var node = document.querySelector('#gray02Wrapper h2');
	if(node == null || node.textContent != "プロフィール") return;


		// 自分の情報取得
		saveData = [];
		tdnode = getNodeXPath('id("gray02Wrapper")/table[@class="commonTables"]//tr/td[preceding-sibling::td[contains(text(),"君主")]]');
		saveData['name'] = tdnode[0].textContent.trim();
		tdnode = getNodeXPath('id("gray02Wrapper")/table[@class="commonTables"]//tr//a[contains(text(),"個人掲示板")]');
		saveData['id']   = tdnode[0].getAttribute('href').replace(/.+user_id=(\d+).*/,"$1");



	// 会場リスト取得
	var trnode = getNodeXPath('id("gray02Wrapper")/table[@class="commonTables"]//tr[preceding-sibling::tr[th[1]/text() = "名前"] and preceding-sibling::tr[th[1]/text() = "国情報"]]');

	if(trnode.length == 0) { return; }	// 念のため

	cnt    = 0;
	for(var i = 0;i < trnode.length;i++) {
		var tdnode = trnode[i].getElementsByTagName('td');
		if(tdnode.length == 0) continue;

		var saveData = [];

			// 人口を取得し拠点と領地の判別をする
			if(tdnode[2].textContent.match(/(\d+)/)) {
				population = parseInt(RegExp.$1);
			} else {
				break;
			}
			if(isNaN(population)) break;		// 領地

			// 拠点名・拠点ID取得
			node = tdnode[0].getElementsByTagName('a');
			if(!node[0].getAttribute('href').match(/village_id=(\d+)/)) continue;
			saveData[0] = RegExp.$1;
			saveData[3] = node[0].textContent.trim();

			// 座標取得
			vpos = tdnode[1].textContent;
			if(vpos.match(/(\-?\d+)\,(\-?\d+)/)) {
				saveData[1] = RegExp.$1;
				saveData[2] = RegExp.$2;
			} else {
				trnode = trnode.nextSibling;
				continue;	// 取得失敗は保存しない
			}

			GM_setValue(SAVE_NAME+"COMMON_VILLAGEID_"+cnt,saveData.join("\t"));
			cnt++;
		}
		GM_setValue(SAVE_NAME+"COMMON_VILLAGEID_NUM",cnt);
	}
	/*
		拠点画面
	*/

	else if(location.pathname == '/village.php') {
		AccommodationFree();
	}

}
/*
	保存していた拠点リストからIDを指定して、対象の拠点情報を取得
	(ID未指定時、現在の拠点)

	0:ID 1:X 2:Y 3:拠点名
*/
function getVillageDataFromID( vID ) {
	var vIDNum,vIDstr,vID,fx,fy;
	var vxy = [];

	if(typeof vID == 'undefined') {
		vID = getVillageID();
		if(vID == -1) return null;
	}

	vIDNum = GM_getValue(SAVE_NAME+"COMMON_VILLAGEID_NUM");
	for(i = 0; i < vIDNum; i++) {
		vIDstr = GM_getValue(SAVE_NAME+"COMMON_VILLAGEID_"+i).split('\t');
		fvID   = parseInt(vIDstr[0]);
		if(fvID == vID) {
			vxy[0] = fvID;
			vxy[1] = parseInt(vIDstr[1]);
			vxy[2] = parseInt(vIDstr[2]);
			vxy[3] = vIDstr[3];
			return(vxy);
		}
	}

	return(null);
}


/*
	拠点の座標から、対象の拠点IDを取得
	(ID未指定時、現在の拠点)
*/
function getVillageID( vx, vy ) {

	var vIDNum,base_node,vIDstr,vID,fx,fy,vxy;
	var i,j;

	// 座標が指定されていない時は、現在の拠点を対象に
	if((typeof vx == 'undefined') || (typeof vy == 'undefined')) {
		vxy  = getNowVillagePos();
		if(vxy == null) return -1;
	} else {
		vxy = [ vx, vy ];
	}

	vID    = -1;
	vIDNum = GM_getValue(SAVE_NAME+"COMMON_VILLAGEID_NUM");
	for(i = 0; i < vIDNum; i++) {
		vIDstr = GM_getValue(SAVE_NAME+"COMMON_VILLAGEID_"+i).split('\t');
		fx     = parseInt(vIDstr[1]);
		fy     = parseInt(vIDstr[2]);
		if(vxy[0] == fx && vxy[1] == fy) {
			vID = vIDstr[0];
			break;
		}
	}
	return vID;
}
/*
	『サイドバーの拠点』から対象の拠点のIDを取得
*/
function getVIDFromSidebar( posx, posy ) {

	var base_node,node;
	var i;
	var href,title,vx,vy;

	// 現在の会場チェック
	if(SERVER_TYPE == 1) {
		base_node = getNodeXPath('//div[@id="lodgment"]/div[@class="floatInner"]')[0].parentNode;
	} else {
		base_node = getNodeXPath('//div[@class="sideBox"]/div[@class="sideBoxHead"][h3/strong/text()="拠点"]')[0].parentNode;
	}
	node      = getNodeXPath('*/ul/li/*[1]',base_node);

	for(i = 0;i < node.length;i++) {
		// 拠点座標取得
		title = node[i].getAttribute('title');
		if(title.match(/(.+)\s+\((\-?\d+)\,(\-?\d+)\)/)) {
			vx = parseInt(RegExp.$2);
			vy = parseInt(RegExp.$3);
			if((vx == posx) && (vy == posy)) {
				// ID取得
				href  = node[i].getAttribute('href');
				if(href == null) {
					return -1;
				}
				if(href.match(/village_id=(\d+)/)) {
					return(parseInt(RegExp.$1));
				}
			}
		}
	}
	return(-1);
}
/*
	現在の拠点の座標を取得
*/
function getNowVillagePos() {

	var base_node,node;
	var i;
	var title,vp = [];

	// mixi
	if(SERVER_TYPE == 1) {
		node = getNodeXPath('//div[@id="lodgment"]/div[@class="floatInner"]');
		if(node.length == 0) {
			// 拠点リストがない(施設画面など)時は、全体地図タブから座標を取得
			base_node = getNodeXPath('//div[@id="gnavi"]//li[@class="gnavi02"]/a');
			vp        = getPosFromURI(base_node[0].getAttribute('href'));
			return(vp);

		} else {
			base_node = node[0].parentNode;
			node      = getNodeXPath('*/ul/li[@class="on"]/*[1]',base_node)[0];
		}
	} else {
		// 本鯖
		base_node = getNodeXPath('//div[@class="sideBox"]/div[@class="sideBoxHead"][h3/strong/text()="拠点"]')[0].parentNode;
		node      = getNodeXPath('*/ul/li[@class="on"]/*[1]',base_node)[0];
	}

	// 拠点座標取得
	title = node.getAttribute('title');
	if(title.match(/(.+)\s+\((\-?\d+)\,(\-?\d+)\)/)) {
		vp[0] = parseInt(RegExp.$2);
		vp[1] = parseInt(RegExp.$3);
		return(vp);
	}
	return(null);


}
/*
	URLから座標を取得 x=??&y=??形式

	uri:URI
	返値: 座標(x,y)の配列 [0]=x [1]=y
*/
function getPosFromURI( uri ) {

	var xy = [-1,-1];

	if(uri.match(/x=(\-?\d+)/)) {
		xy[0] = parseInt(RegExp.$1);
	}
	if(uri.match(/y=(\-?\d+)/)) {
		xy[1] = parseInt(RegExp.$1);
	}

	return xy;
}
// ========================
//     施設リンク
// ========================
/*
	表示関係
*/
function SidebarFacilityLink() {

	var node,btndel_node;

	// 施設画面の時、設定保存ボタンを表示
	if(location.pathname == '/facility/facility.php') {

		// 削除・キャンセルボタンに対する処理
		try {
			btndel_node = getNodeXPath('//div[@class="btn_del"]/input[@name="remove" or "remove_cancel"]')[0];
		} catch(e) {
			return;
		}
		btndel_node.parentNode.style.position = "relative";

		// まだレイアウトがすんでいない？ので、もう少し待つ
		if(btndel_node.offsetLeft > btndel_node.offsetWidth) {
			setTimeout(SidebarFacilityLink,100);
			return;
		}

		// リンク登録ボタン
		node = document.createElement('input');
		node.setAttribute('type','button');
		node.setAttribute('value','リンク登録');
		btndel_node.parentNode.appendChild(node);
		node.addEventListener('click',function() { registSidebarFacilityLink('facility.php'); },false);
		node.style.position = 'absolute';
		node.style.left     = (btndel_node.offsetLeft - node.offsetWidth) + 'px';

	}

	// 学園・会場・分校画面
	if(location.pathname == '/facility/castle.php') {
		try {
			btndel_node = getNodeXPath('//table//th[@class="mainTtl" and (contains(text(),"学園") or contains(text(),"分校") or contains(text(),"会場"))]')[0];
		} catch(e) {
			return;
		}
		var rect = btndel_node.getBoundingClientRect();

		// リンク登録ボタン
		node = document.createElement('input');
		node.setAttribute('type','button');
		node.setAttribute('value','リンク登録');
		btndel_node.appendChild(node);
		node.addEventListener('click',function() { registSidebarFacilityLink('castle.php'); },false);
		node.style.position = 'absolute';
		node.style.fontWeight='normal';
		node.style.left     = ((rect.left + rect.width) - node.offsetWidth - 16)  + 'px';
		node.style.top      = (rect.top + (rect.height - node.offsetHeight)/2 - 1) + 'px';

	}

	dispBaseSidebarFacilityLink();
}
/*
	施設リンクに登録
*/
function registSidebarFacilityLink( php ) {

	var facNum;
	var xy,vID;
	var facname;
	var result;
	var vdata;

	xy    = getPosFromURI(location.search);
	vdata = getVillageDataFromID();

	if(xy[0] == -1 || xy[1] == -1) {
		alert("施設の位置が取得できないので、登録できません(ErrData:"+vdata[0]+"/"+xy[0]+"/"+xy[1]+")");
		return;
	}

	// 拠点数取得
	result = getNodeXPath('//div[@id="gray02Wrapper"]/h2/text()')[0].textContent;

	facname = vdata[3]+"の"+result+"("+xy[0]+","+xy[1]+")";

	registSidebarFacilityLinkCore(-1, vdata[1], vdata[2], xy[0], xy[1], facname, php);
	displayListSidebarFacilityLink();
	alert(facname + "を登録しました");
}
/*
	登録
*/
function registSidebarFacilityLinkCore( number, vx, vy, px, py, name, php) {

	// 登録数
	var num;
	if(number < 0) {
		num = parseInt(GM_getValue(SAVE_NAME+"FACILITY_LINK_NUM"));
		if(isNaN(num) || num < 0) {
			num = 0;
		}
	} else {
		num = parseInt(number,10);
		if(isNaN(num)) number = -1;
	}

	// 拠点x,y,施設x,y
	GM_setValue(SAVE_NAME+"FACILITY_LINK_" + num, vx +"\t"+ vy +"\t"+ px +"\t"+ py +"\t"+ name +"\t"+ php);

	if(number < 0) {
		num++;
		GM_setValue(SAVE_NAME+"FACILITY_LINK_NUM", num);
	}
}
/*
	施設リンクを表示
*/
function dispBaseSidebarFacilityLink() {

	var bodyNod,imgData;

	var imgData = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAAZiS0dE'+
			'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDDgoWODda84gAAAAZ'+
			'dEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABu0lEQVQoz8XSO0jWcRTG8c/7'+
			'alpCXjHLLkSGGZXRkIbdhhAMCqKpoKElEGu3RIhaEosohIakwITAwKIGJSjIlMCwxAuoQ0Vh'+
			'ikZIdvGC+Gv4FxnY3LOc4TzfA+c5h/+ijHRysonFQCoeYhIXkfxPMHclSUuIxxVjIC2/IJRd'+
			'vxASM1dM4BYKFwXXryU5SRYG9u8SDt2uC+l1g6GiqTIkJAgIuIz4toIFYFaGguxMbVfPC92P'+
			'hfEeobShITxp3xrGe4Tmm0JmuoDO/A3yIIbduNfaKPd5J3uK2Lk9Gjg3R98gbz+wcT1VNQyP'+
			'MjquJJa63Mcr1XKPlDH0htf9pCzlwF76B/kySdEOMtJ4P8yrPsrPEutqEdatZn6eeJyZWWZm'+
			'uNPM8Ag1VX/nEQK9A8Q/fWbyawRBYgL1dyk/weFSXnRFZr8SetpB6fFox3C/nsLNTM9Se4Nz'+
			'Z8jK4Nt32l/yY4p9xXR2U13LyJhTMZRlpms9epCpaU6fjIJYqPbOKKCmR3T1qsKl370cvNuS'+
			'Lww8i84x1hPV8R6hpVHYlCekLFOy2B8k4tqaVULHgwgYahMqK4TsLBM4lpP9x/wTro+lU2K+'+
			'0wkAAAAASUVORK5CYII=';
	bodyNode = document.createElement('ul');
	bodyNode.setAttribute('id','SidebarFacilityLink_List');

	BaseSidebarBlock('施設リンク', bodyNode, imgData);

	displayListSidebarFacilityLink();

}
/*
	リンクリストを表示
*/
function displayListSidebarFacilityLink() {

	var facNum;
	var fac;
	var parent_node, base_node, a_node, li_node, node;
	var baseWin;

	base_node   = document.getElementById('SidebarFacilityLink_List');
	parent_node = base_node.parentNode;
	parent_node .removeChild(base_node);	// 一度削除
	base_node   = document.createElement('ul');
	base_node   .setAttribute('id','SidebarFacilityLink_List');


	// リンクリストの数取得
	facNum = GM_getValue(SAVE_NAME+"FACILITY_LINK_NUM");
	if(facNum == null) {
		facNum = 0;
	}

	for(i = 0;i < facNum;i++) {
		fac = GM_getValue(SAVE_NAME+"FACILITY_LINK_"+i);
		if(fac == null) continue;

		fac = fac.split('\t');

		li_node = document.createElement('li');

		// リンク
		a_node = document.createElement('a');
		if(ETCS_OPTION['facilityLinkMoveType'] == 'redirect') {
			var tID = getVillageID( fac[0], fac[1] );	// 現在の拠点IDを取得
			var php = ((fac[5] == 'castle.php') ? '%2ffacility%2fcastle.php' : ((fac[5] == 'facility.php') ? '%2ffacility%2ffacility.php%3Fx%3D'+fac[2]+'%26y%3D'+fac[3] : '')) + (SERVER_TYPE == 1 ? '#ptop' : '');
			a_node.setAttribute('href',SERVER_URI+'/village_change.php?village_id='+tID+'&from=menu&page='+php);
		} else {
			a_node.setAttribute('href','javascript:void(0);');

			(function( lfac ) {
				a_node.addEventListener('click',function() {
					if(FacilityLink_loadFlag) {
						// 既に読み込み中
						alert("別のリンクを読み込み中です");
					}
					else {
						clickSidebarFacilityLink(lfac[0],lfac[1],lfac[2],lfac[3],lfac[5]);
					}
				},false);
			})(fac);
		}

		a_node.textContent = fac[4];
		li_node.appendChild(a_node);

		// 設定
		node = document.createElement('img');
		node.setAttribute('src','data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAAEhcmxxAAAAAXNSR0IArs4c6QAAAAZiS0dE'+
				'AAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sJGQIML5DMmhMAAAAZ'+
				'dEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAwklEQVQoz3WQPw5BQRjEZ3nx'+
				'LyglEg3OoNGJK7xGo3EBidoxdJzABRxBq3MA4hWSl1ep5Kewm3w23lSzM7PzfbuSBcCXFUXR'+
				'iqQo+ApOIqmQtLPuHLjyRTeIewy85pwnPUlV59wDWEu627rGvw1GvmlpxQ7w9sbx52EGM6AS'+
				'jD7wNKFVPGdQ/g9+dSADUpUBmFCORRxuA6c/wXNZ+xC4meAFOJhzKkl5nrtwoZZlWQJM/Wp1'+
				'U7Y1FzfxpI7hzcgbB/4Bm14P/XmYtY8AAAAASUVORK5CYII=');

		(function(lbase_node, lnode, l_i, lfac) {
			node.addEventListener('mouseover',function(){ lnode.style.cursor = 'pointer';},false);
			node.addEventListener('mouseout', function(){ lnode.style.cursor = '';},       false);
			node.addEventListener('click',function(){optionSidebarFacilityLink(lbase_node, lnode, l_i, lfac);},true);
		})(base_node,node,i,fac);


		li_node.appendChild(node);

		base_node.appendChild(li_node);
	}

	parent_node.appendChild(base_node);
}
/*
	設定画面
*/
function optionSidebarFacilityLink( insert_node , this_node,  number, facility ) {

	if(searchBaseWindow('facilitylink') != null) return;	// 既に開いていたら表示しない
	var basewin   = document.createElement('div');
	var node,body ="";
	var tID       =  getVillageID( facility[0], facility[1] );	// 現在の拠点IDを取得
	var base_node = new baseWindow('設定','facilitylink');

	if(tID == -1) {
		body += '<div style="margin:1em"><a href="'+PROFILE_URI+'"><strong style="color:#ff0000;font-weight:bold;">※対象施設の拠点IDが見つかりませんでした。<br>削除された拠点の施設であるか、IDリストが壊れている可能性があります。<br>念のため、プロフィール画面を開いて拠点情報を取得してください</strong></a></div>';
	} else {
		var vData = getVillageDataFromID(tID);
		body     += '<div>'+vData[3]+'(ID:'+tID+')の X:'+facility[2]+'Y:'+facility[3]+'</div>';
	}
	basewin.innerHTML = body;

	// 名前入力欄
	node         = basewin.appendChild(document.createElement('label'));
	node.appendChild(document.createTextNode('表示名：'));
	var nameNode = node.appendChild(document.createElement('input'));
	nameNode.setAttribute('type','text');
	nameNode.setAttribute('value',facility[4]);
	nameNode.setAttribute('title','表示する名前を入力します');

	// 登録ボタン
	node = basewin.appendChild(document.createElement('input'));
	node.setAttribute('type','button');
	node.setAttribute('value','保存');
	node.setAttribute('title','名前を保存する');
	(function(lnameNode) {
		node.addEventListener('click',function(){

			var name = lnameNode.value.replace(/\t|\r|\n/,'');

			registSidebarFacilityLinkCore(number, facility[0], facility[1], facility[2], facility[3], name, facility[5]);
			displayListSidebarFacilityLink();
			base_node.close();
		},false);
	})(nameNode);

	// 削除ボタン
	node = document.createElement('input');
	node.setAttribute('type','button');
	node.setAttribute('value','削除');
	node.setAttribute('title','このリンクを削除する');
	(function(lbasewin) {
		node.addEventListener('click',function(){
			delSidebarFacilityLink( number );
			displayListSidebarFacilityLink();
			base_node.close();
		},false);
	})(basewin);
	basewin.appendChild(node);

	// 上に移動ボタン
	node = document.createElement('input');
	node.setAttribute('type','button');
	node.setAttribute('value','▲');
	node.setAttribute('title','上へ移動');
	(function( lbasewin, lnumber) {
		node.addEventListener('click',function(){
			var move_num = lnumber > 0 ? lnumber - 1 : 0;
			var buf      = delSidebarFacilityLink(lnumber);
			insertSidebarFacilityLink(move_num,buf);
			displayListSidebarFacilityLink();
			base_node.close();
		}, false);
	})(basewin,number);
	basewin.appendChild(node);

	// 下に移動ボタン
	node = document.createElement('input');
	node.setAttribute('type','button');
	node.setAttribute('value','▼');
	node.setAttribute('title','下に移動');
	(function(lbasewin,lnumber) {
		node.addEventListener('click',function(){
			var facMax = GM_getValue(SAVE_NAME+"FACILITY_LINK_NUM");
			if(facMax == null) return;

			var move_num = lnumber < facMax - 1  ? lnumber + 1 : facMax - 1;
			var buf      = delSidebarFacilityLink(lnumber);
			insertSidebarFacilityLink(move_num,buf);
			displayListSidebarFacilityLink();
			base_node.close();
		}, false);
	})(basewin, number);
	basewin.appendChild(node);


	base_node.addContent(basewin);
	base_node.disp(true);
	base_node.nearPosNode(this_node);
}
/*
	リンクリストから削除する
*/
function delSidebarFacilityLink( no ){

	var buf,buf2;
	var delbuf;

	// データ取得
	facNum = GM_getValue(SAVE_NAME+"FACILITY_LINK_NUM");
	if(facNum == null) {
		return null;
	}

	delbuf = GM_getValue(SAVE_NAME+"FACILITY_LINK_"+no);
	buf    = buf2 = '';
	for(i = facNum - 1;i >= 0;i--) {
		if(i < no) break;
		buf = GM_getValue(SAVE_NAME+"FACILITY_LINK_"+i);
		GM_setValue(SAVE_NAME+"FACILITY_LINK_"+i, buf2);
		buf2 = buf;
	}
	facNum--;
	if(facNum < 0) facNum = 0;
	GM_deleteValue(SAVE_NAME+"FACILITY_LINK_" + facNum);
	GM_setValue(SAVE_NAME+"FACILITY_LINK_NUM", facNum);

	return delbuf;
}
/*
	リンクリストに挿入
*/
function insertSidebarFacilityLink( no, facStr ) {

	// データ取得
	facNum = GM_getValue(SAVE_NAME+"FACILITY_LINK_NUM");
	if(facNum == null) {
		return;
	}

	buf  = '';
	buf2 = GM_getValue(SAVE_NAME+"FACILITY_LINK_"+no);
	GM_setValue(SAVE_NAME+"FACILITY_LINK_"+no, facStr);

	for(i = no+1;i <= facNum;i++) {
		buf = GM_getValue(SAVE_NAME+"FACILITY_LINK_"+i);
		GM_setValue(SAVE_NAME+"FACILITY_LINK_"+i, buf2);
		buf2 = buf;
	}
	GM_setValue(SAVE_NAME+"FACILITY_LINK_NUM", facNum + 1);
}

/*
	リンククリック時、拠点を裏で移動する(Ajax)
*/
function clickSidebarFacilityLink( vx, vy, fx, fy , php ) {

	var tID = getVillageID(vx,vy);	// ターゲット拠点のID
	var base_node,load_node,cover_node;

	if(tID == -1) {
		alert("対象の拠点のIDが見つかりませんでした。すでに無い拠点か、拠点リストが壊れています。");
		return false;
	}

	// 読み込み中表示
	base_node = document.getElementById("SidebarFacilityLink_List");
	load_node = document.createElement('span');
	load_node.appendChild(document.createTextNode('読み込み中…'));
	base_node.parentNode.appendChild(load_node);
	base_node.parentNode.style.position = 'relative';

	// リンクを押せないように、画像で覆う(イベント外すのめんどくさい…)
	cover_node = document.createElement('img');
	cover_node.setAttribute('src','data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFU'+
		'CNdjYGBgYAAAAAUAAV7zKjoAAAAASUVORK5CYII='
	);
	base_node.parentNode.appendChild(cover_node);
	with(cover_node.style) {
		position = 'absolute';
		top     = '0px';
		left    = '0px';
	}
	cover_node.style.top    = base_node.offsetTop + "px";
	cover_node.style.left   = base_node.offsetLeft + "px";
	cover_node.style.width  = base_node.offsetWidth + "px";
	cover_node.style.height = base_node.offsetHeight + "px";

	base_node.style.opacity = '0.5';	// 暗くする
	FacilityLink_loadFlag   = true;		// ロード中

	// 拠点を裏で移動
	var httpReq = new XMLHttpRequest();
	if(!('open' in httpReq)) {
		throw alert("移動できませんでした(XMLHttpRequestエラー)");
		return;
	}

	httpReq.onreadystatechange = function() {
		if(httpReq.readyState != 4) {
			return;
		}
		FacilityLink_loadFlag   = false;
		if(httpReq.status == 200) {
			var href;
			if(php == 'castle.php') {
				href = 'http://'+SERVER_NAME+'.1kibaku.jp/facility/castle.php' + (SERVER_TYPE == 1 ? '#ptop' : '');
			} else {
				href = 'http://'+SERVER_NAME+'.1kibaku.jp/facility/facility.php?x='+fx+'&y='+fy+(SERVER_TYPE == 1 ? '#ptop' : '');
			}
			if(href == location.href) {
				location.reload();		// 念のためリロード
			} else  {
				location.href = href;
			}
		} else {
			alert("移動できませんでした(エラー"+httpReq.status+")");
			base_node.style.opacity = '1.0';
			base_node.parentNode.removeChild(load_node);
			base_node.parentNode.removeChild(cover_node);
		}
	};

	httpReq.open('GET','http://'+SERVER_NAME+'.1kibaku.jp/village_change.php?village_id='+tID);
	httpReq.send(null);

	return true;
}
//=================================================
//  兵数の空き計算表示・取得
//=================================================
function AccommodationFree() {

	var solNow  = 0;
	var solMax  = 0;
	var txtNode = getNodeXPath('id("basepoint")//div[contains(@class,"status")]/text()[preceding-sibling::img]');
	for(var i = 0;i < txtNode.length;i++) {
		if(txtNode[i].textContent.match(/(\d+)\/(\d+)/)) {
			solNow = RegExp.$1;
			solMax = RegExp.$2;
			if((ETCS_OPTION['AccommodationFree']) && (ETCS_OPTION['AccommodationFreeType'] == "1")) {
				txtNode[i].textContent += "("+(solMax-solNow)+")";
			}
			break;
		}
	}

		if((ETCS_OPTION['AccommodationFree']) && (ETCS_OPTION['AccommodationFreeType'] == "0")) {
		txtNode[0].parentNode.setAttribute('title','一般学生寮空き：'+(solMax-solNow));
	}

}
//=================================================
//  サイドバーのボタン領域に助力するボタンを追加
//=================================================
/*
	初期化とか
*/
function addToHelpButton() {

	var liNode = document.querySelector('#sidebar ul');

	var imgData = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAS5JREFU'+
		'KM/d0L9L1HEAxvHX53vC2X0vt4YaGqLFLkuQHHK6xb7S1BBOQoLQH+Bif4LRkiAuDtF/4KB3'+
		'6CAERUhhP7BTENTpEBeR+2oH+v06HQQO4eDiMz/v5+F5uP4KlyZWRIiuoHFVt9gtqQNVf/8P'+
		'riqLPVLwXGRQZs2ZRalfqloXwR9iZwbkhgWJ9aVeWbFEOFYZazi9WVfarGn5qaoVfHFDUb/g'+
		'pSCx9fae5qsi6Nqn3ODkPndnjt3+0JCry9WCrwYUvFYwKujxaYfCIXmR7qZy+8jTvc+eNd+Z'+
		'nAQHMgvBNyW5xyIJEjtvKu58jO1OmVib9X5uU6kN0vDdBp3Gfzee6hOMIBFU2k/E0+PSh9s2'+
		'5l+oLw2p6fJbv/Tiq52AyLDMA5E/MssdoGM7BzjCXjturiMhAAAAAElFTkSuQmCC';

	var nextHelpTime = new Date('2012/03/09 17:00:00');
	var nowTime      = getNowTime();
return;
	if(nowTime >= nextHelpTime) {
		httpRequest('GET',SERVER_URI+'/alliance/village.php', function( httpstr ) {
			var doc = parseHTML(httpstr);

			var node = doc.querySelectorAll('div.support-info-top div.support-info p');
			var getNextTime = new Date(node[1].textContent);

			console.log(getNextTime);



		}, function( status ){
			console.log("ERROR:"+status);
		});
	} else {console.log("**mada**"); }



}


/*
	xmlhttpリクエストラッパ
*/
function httpRequest( method , url, okFunc, errFunc ) {

	method = typeof method == 'undefined' ? 'GET' : method;

	this.httpReq = new XMLHttpRequest();
	if(!('open' in this.httpReq)) {
		(errorFunc)(-1);
		return null;
	}
	httpReq.onreadystatechange = function() {
		if(httpReq.readyState != 4) {
			return;
		}
		if(httpReq.status != 200) {
			(errFunc)(httpReq.status);
		}

		(okFunc)( httpReq.responseText );
	}

	this.httpReq.open('GET', url);
	this.httpReq.send(null);

	return httpReq;
}
httpRequest.prototype = {
	httpReq : null,
};





//=================================================
//  カードNo.をクリックしたら、指定URLに飛ぶ
//=================================================
/*
	初期化とか
*/
function jumpURIFromClickCardNo() {

	var i,j;

	var xPathData = [
		[	// 闘士図鑑(リスト)
			1,
			'//div[@id="busyobook-scroll"]//li[@class="busyo-list-item" or @class="busyo-list-item even-number"] ',
			'.',
			'.//span[@class="cardno"]',
			'.//span[@class="name"]',
			null,
		],
		[	// 闘士図鑑(単体)
			1,
			'//div[@id="busyobook-scroll"]//div[contains(@class,"busyo-card")]',
			'.',
			'.//span[@class="cardno"]',
			'.//span[@class="name"]/text()',
			'.//span[contains(@class,"skillName")]',	// スキル名
		],
		[	// カード取得
			1,
			'//div[@class="result" and preceding-sibling::h2/text() = "取得したカード"]',
			'.',
			'.//span[@class="cardno"]',
			'.//span[@class="name"]/text()',
			'.//span[contains(@class,"skillName")]',	// スキル名
		],
		[	// トレード
			1,
			'//div[@class="cardWrapper2col" and preceding::h2/text() = "トレード"]',
			'.',
			'.//span[@class="cardno"]',
			'.//span[@class="name"]/text()',
			'.//span[contains(@class,"skillName")]',	// スキル名
		],
		[	// x枚表示
			0,
			'//div[@id="file-1"]//div[contains(@class,"statusDetail")]',
			'.//div[@class="illustMini"]//img | .//tbody/tr/td[preceding-sibling::th[text() = "ID"]][1]',
			'.//tbody/tr/td[preceding-sibling::th[text() = "ID"]][1]',
			'.//tbody/tr/td[preceding-sibling::th[text() = "名前"]][1]/text()',
			'.//tbody/tr/td[preceding-sibling::th[contains(text(),"スキル")]][1]',
		],
		[	// デッキ
			0,
			'//div[@class="cardColmn"]',	// ベースになるノード
			'.',							// 右クリックできるノード
			'.//span[@class="cardno"]',		// カードID番号のノード
			'.//span[@class="name"]/text()',	// 名前のノード
			'.//span[contains(@class,"skillName")]',	// スキル名
		],
		[	// ウインドウ
			0,
			'//div[@class="cardWrapper2col"]',
			'.',
			'.//span[@class="cardno"]',
			'.//span[@class="name"]/text()',
			'.//span[contains(@class,"skillName")]',	// スキル名
		],
	];
	var clickNode = [];
	var card;

	// クリックするノード設定
	for(i in xPathData) {
		card = getNodeXPath(xPathData[i][1]);
		for(j in card) {
			clickNode.push([ card[j], xPathData[i][2] , xPathData[i][3],xPathData[i][4],xPathData[i][5] ]);
		}
		//console.log("XPATH["+i+"]:"+card.length);
		if(card.length > 0 && xPathData[i][0] > 0) {	// 重複してイベントを付加しないとき
			break;
		}
	}

	// イベント付加
	for(i in clickNode) {
		(function( data ) {
			var rClickNode = getNodeXPath(data[1],data[0]);
			var cardNoNode = getNodeXPath(data[2],data[0])[0];
			if(typeof cardNoNode == 'undefined') return;
			var cardno = cardNoNode.textContent.match(/\d+/);
			var url    = ETCS_OPTION['JumpURIFromClickCardNoURI'].replace(/%%NO%%/,cardno);
			var name   = getNodeXPath(data[3],data[0])[0].textContent;
//			console.log("CARD["+i+"]:"+cardno+"/"+url+"/"+name);
			var skill  = null;
			var tmp;
			if(data[4] != null){
				tmp  = getNodeXPath(data[4],data[0]);
				if(tmp.length != 0) {
					skill = [];
					for(j in tmp) {
						if(tmp[j].textContent.match(/^(.+\:)?(.+)LV/))
							skill.push(RegExp.$2);
					}
				}
			}

			// カーソル(in)
			cardNoNode.addEventListener('mouseover', function() {
				cardNoNode.style.cursor = 'help';
			},false);
			// カーソル(out)
			cardNoNode.addEventListener('mouseout', function() {
				cardNoNode.style.cursor = '';
			},false);

			// カードNo.左クリック
			if(ETCS_OPTION['JumpURIFromClickCard']) {
				cardNoNode.addEventListener('click', function() {
						window.open(url);
					}, false);
			}

			// 右クリック
			if(ETCS_OPTION['cardRightClickSkill']) {
				for(j in rClickNode) {
					rClickNode[j].addEventListener('contextmenu',function( event ) {
						RightClickCardNo( event , cardno , name , skill);
						event.preventDefault();
					},false);
				}
			}

			cardNoNode.style.zIndex = "20";		// 合成でクリックできない対策
		})( clickNode[i] );
	}
}
/*
	右クリックメニュー
*/
function RightClickCardNo( event , cardno , name , skill ) {


	var menuName = [
		['カードNo.でURLを開く',ETCS_OPTION['JumpURIFromClickCardNoURI'].replace(/%%NO%%/,cardno)],
		['カードNo.でトレードを開く',TRADE_URI+'?t=no&k='+cardno],
		['闘士名でトレードを開く',TRADE_URI+'?t=name&k='+name],
	];

	// CSV分解
	var list = ETCS_OPTION['cardRightClickSkillCSV'].split(/\r\n|\r|\n/);

	// IDリストにあればメニューに追加する
	var skillList = [];
	for(i in list) {
		var tmp = list[i].split(/\t|,/);
		if(tmp.length != 2) continue;
		skillList.push([tmp[0] , tmp[1]]);
	}

	for(i in skill) {
		tmp = null;
		for(j in skillList) {
			if(skillList[j][1] == skill[i]) {
				tmp = skillList[j][0];
				break;
			}
		}
		if(tmp != null) {
			if(ETCS_OPTION['cardRightClickSkillURL'] != '') {
				menuName.push( [
					'スキル『 '+skill[i]+' 』をURLで開く',
					ETCS_OPTION['cardRightClickSkillURL'].replace(/%%ID%%/,tmp),
				]);
			}
		}
		menuName.push( [
			'スキル『 '+skill[i]+' 』でトレードを開く',
			TRADE_URI+'?t=skill&k='+skill[i],
		]);
	}

	var baseWin  =  new baseWindow('','cardrightclick');
/*
	node = document.createElement('p');
	node.textContent = 'TEST1';
	baseWin.addContent(node);
	node.addEventListener('click',function() { alert("**"); } ,false);
*/

	var listNode = document.createElement('ul');
	baseWin.addContent(listNode);


	for(i = 0;i < menuName.length;i++) {
		node = document.createElement('li');

		if(menuName[i][1] == '') continue;
		node.innerHTML = '<a href="'+menuName[i][1]+'"'+(ETCS_OPTION['cardRightClickSkillNewTab'] ? ' target="_blank"' : '')+ '>'+menuName[i][0]+'</a>';
		listNode.appendChild(node);
	}

	baseWin.titleBar.style.display = 'none';
	baseWin.contentNode.style.resize = 'none';
	baseWin.disp(true);
	baseWin.nearPosMouse( event );

	// ウインドウ外をクリックor移動したら閉じる
	var outclick = function ( event ) {
		if(event.type == 'mouseout') {
			var node = event.relatedTarget;
			while(node != null) {
				if(node == event.currentTarget) return;
				node = node.parentNode;
			}
			event.stopPropagation();
		}
		baseWin.close();
	};
	document.addEventListener('click', outclick, false);
	baseWin.winNode.addEventListener('mouseout', outclick,false);

	baseWin.closeProc = function() {
		document.removeEventListener('click', outclick, false);
		baseWin.winNode.addEventListener('mouseout', outclick,false);
		return true;
	}
}
// ==============================
//     カード出品手数料表示
// ==============================
/*
	手数料の計算
*/
function calcSellCardFees( price ) {

	var fees = 0;

	price = isNaN(price) ? 0 : parseInt(price,10);	// 数値に変換できないとき対策

	fees += price > 1000 ? (price - 1000) : 0;		// 第二段階
	fees += price >  500 ? (price -  500) : 0;		// 第一段階
	fees += price;									// 基本
	fees  = parseInt(fees / 10,10);

	return fees;
}
/*
	出品画面で手数料を表示(初期化)
*/
function initViewSellCardFees() {


	/* 出品表示画面 */
	if(location.pathname != '/card/exhibit_confirm.php') return;

	// ノード作成
	var inputnode = getNodeXPath('//form[@name="exec_exhibit_form"]//input[@name="exhibit_price"]')[0];
	var basenode  = getNodeXPath('//form[@name="exec_exhibit_form"]/./following-sibling::*[position()=1]')[0];
	var divnode   = document.createElement('div');
	basenode.parentNode.insertBefore(divnode,basenode);
	with(divnode.style) {
		background = 'none #ffffff';
		textAlign  = 'center';
		color      = '#666666';
		padding    = '4px';
	}

	// イベント
	inputnode.addEventListener('keyup', function() {
		viewSellCardFees( divnode, inputnode );
	}, false);
	inputnode.addEventListener('change', function() {
		viewSellCardFees( divnode, inputnode );
	}, false);
	viewSellCardFees( divnode, inputnode );
}
/*
	出品画面で手数料を表示
*/
function viewSellCardFees( node , inputnode ) {

	var price = inputnode.value;
	var fees , result;

	fees    = isNaN(price) || price == '' ? '---' : calcSellCardFees( price );
	result  = isNaN(price - fees)         ? '---' : price - fees;

	node.innerHTML = '[落札時] 手数料 : <span style="font-weight:bold;">'+(fees+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,')+'</span> TP / 受取額 : <span style="font-weight:bold;">'+(result+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,')+'</span> TP';
}
/*
	出品中のカードで手数料表示
*/
function listViewSellCardFees() {

	if(location.pathname != '/card/exhibit_list.php') return;

	var price,fees,node;
	var i;
	var askPriceRow,maxPriceRow;

	// 列探索
	var tnode =getNodeXPath('//table[@class="tradeTables"]//tr[contains(@class,"tradeSell")]/th');
	for(i = 0;i < tnode.length;i++) {
		if(tnode[i].textContent.match(/落札希望価格/)) {
			askPriceRow = i;
			continue;
		}
		if(tnode[i].textContent.match(/最大入札TP/)) {
			maxPriceRow = i;
			continue;
		}
	}

	// 列：出品中のカード
	tnode = getNodeXPath('//table[@class="tradeTables"]//td[@class="tp" or @class="trade"]');
	tnode.forEach(function( nodeptr ) {

		if((nodeptr.getAttribute('class') == 'tp') && (nodeptr.cellIndex == askPriceRow)){

			price = nodeptr.textContent.replace(/^\s+|\s+$/g,'');
			price = price.toString().replace(/,/,'');
			fees  = calcSellCardFees(price);

			nodeptr.setAttribute('title','手数料: '+(fees+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,')+
								' TP 受取額: '+((price - fees)+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,')+' TP');
			node   = document.createElement('span');
			node   .setAttribute('class','etcs_sellcardlistfees');
			node   .appendChild(document.createTextNode('('+(fees+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,')+')'));
			nodeptr.appendChild(node);
			return;
		}
		// 列：最大入札TP
		if((nodeptr.getAttribute('class') == 'trade') && (nodeptr.cellIndex == maxPriceRow)) {

			if(nodeptr.textContent.match(/取消/)) return;		// 未入札
			node   = getNodeXPath('span[contains(@class,"notice")]',nodeptr);	//より厳密にチェック
			if(node.length == 0) return;
			price  = node[0].textContent.replace(/^\s+|\s+$/g,'');
			price  = price.toString().replace(/,/,'');
			if(isNaN(price)) return;
			price  = parseInt(price,10);
			fees   = calcSellCardFees(price);
			nodeptr.setAttribute('title','手数料: '+(fees+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,')+
							' TP 受取額: '+((price - fees)+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,')+' TP');
			node   = document.createElement('span');
			nodeptr.appendChild(node);

			node.setAttribute('class','etcs_sellcardlistfees');
			node.appendChild(document.createTextNode('('+fees+')'));
		}
	});

}
// ==============================
//        トレード日時警告
// ==============================
/*
	初期化
*/
function AlertOfBuyTradeTime() {

	var node,tradeDate,diffTime,newNode;

	if((location.pathname == '/card/trade_bid.php') && ETCS_OPTION['AlertOfBuyTradeTime_Bid']) {

		// 日時分解
		node = getNodeXPath('//div[@class="tradeInfo"]/div[2]/span[@class="notice"]');
		if(node.length == 0) return;		// 即札可

		tradeDate = cnvMDateStrToDate(node[0].textContent);
		diffTime  = tradeDate.getTime() - serverTime.getTime();

		// 24時間以上経過の場合注意喚起
		if(diffTime >= (24*60*60*1000)) {
			node = getNodeXPath('//form[@name="exec_bid_form"]')[0];
			node.style.backgroundColor = '#ffaaaa';

			newNode = document.createElement('div');
			newNode.textContent = '※落札まで、24時間以上かかります！';
			newNode.style.cssText = 'color:#ff0000; background-color:#ffffff';
			node.appendChild(newNode);
		}
	}

	// トレード一覧
	if((location.pathname == '/card/trade.php') && ETCS_OPTION['AlertOfBuyTradeTime_List']) {
		node = getNodeXPath('//table[@class="tradeTables"]//td[@class="limit"]');
		for(var i in node) {
			tradeDate = cnvMDateStrToDate(node[i].textContent.replace(/10\:00/,' 10:00'));
			if(tradeDate == "Invalid Date") continue;
			diffTime  = tradeDate.getTime() - serverTime.getTime();
			// 24時間以上経過の場合注意喚起
			if(diffTime >= (24*60*60*1000)) {
				newNode = getNodeXPath('.//td[@class="trade"]//img',node[i].parentNode);
//				console.log(newNode.length);
				if(newNode.length) {
					newNode[0].setAttribute('src','data:image/png;base64,'+
						'iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAVVJREFU'+
						'KM9tkj3PAVEQhc9979potiE0JApboSAKodhOoeAHKSUqhUblv+gkolLpiEYkPloF2TvnLTZ7'+
						'7YqTTDLFee7HmVGIRCTkOA4cxwFJvF4vfKmtkoDrugiCAN1uF2EYolKpYLfbYbVa4XA4pEgC'+
						'oOd5XC6XfL/fJMlarcZY+/2ew+GQsddC8/mcImKNhUKBSZ1OJzYajQ/UbDZ5Pp9TpmKxaPv4'+
						'sOl0Sq01/wCgWq2iVCrhl0ja6vf7yGazcAAgl8uBjPJQSgEAbrcbRqMR8vk8RAStVguDwQBa'+
						'6wi63+8pAAAWiwU8z7PRl8tlXK9XGGOiF9TrdR6Px9QfjDEUkVQ/Ho+ptf6kN5lMaIyxUFzJ'+
						'2H3fT0fuui5nsxkfj0fqRhHher1mEAR2Tup7hTqdDnq9Hnzfx/P5xHa7xWazweVysR71a/eU'+
						'UshkMhARhGH4PQX1D731JaF5xmPZAAAAAElFTkSuQmCC');
					newNode[0].parentNode.setAttribute('title','落札まで、24時間以上かかります!');
				}
			}
		}
	}
}
//==============================================
// トレードのソートにレアリティ表示状態を加える
//===============================================
function addRTradeSortLink() {

	if(location.pathname != '/card/trade.php')  return;

	var rswitch = ['r_ur','r_sr','r_r','r_uc','r_c'];	// 付け足す引数
	var labelNode = getNodeXPath('//table[@class="tradeTables"]/tbody/tr[1]//a');
	var i,addstr;
	var rnow_switch = [];

	// 現在の状態を取得
	for(i = 0;i < rswitch.length;i++) {
		reg = new RegExp(rswitch[i]+'=(\\d)?');
		if(location.search.match(reg)) {
			rnow_switch[i] = RegExp.$1;
			continue;
		}
		rnow_switch[i] = 0;	// 表示無し
	}

	labelNode.forEach( function( node ) {
		addstr = [];
		for(i = 0;i < rswitch.length;i++) {
			reg  = new RegExp(rswitch[i]+'=(\d)');
			if(node.getAttribute('href').match(reg)) {
				continue;
			}
			addstr[addstr.length] = rswitch[i] + '=' + rnow_switch[i];
		}
		node.setAttribute('href', node.getAttribute('href') + '&' + addstr.join('&'));
	});



}
// ==============================================
//   トレードなどでページ切り替えを上部にも表示
// ===============================================
function deckPagerUpperClone() {

	if(!((location.pathname == '/card/trade_card.php')
		|| (location.pathname.match(/\/union\/.*/))
		)) return

	var baseNode = document.getElementById('card_uraomote-omote');
	if(baseNode == null) return;

	var orgNode  = baseNode.querySelector('.pager');
	if(orgNode == null) return;
	baseNode.insertBefore(orgNode.cloneNode(true), document.getElementById('cardFileList'));

}
// ==============================
//        スキルタイマー
// ==============================
/*
	初期化/情報取得
*/
function initSkillTimer() {
	if(!(ETCS_OPTION['skillTimer_List'] || ETCS_OPTION['skillTimer_Card'])) return;


	// 内政設定画面
	if(location.pathname == '/card/domestic_setting.php') {

		if(serverTime == 'Invalid Date') return;		// エラーなので安全のため未チェック

		var cardData = [];
		var node,card;
		var id,name,time,usetime,winid,busyo_r,busyo,busyolv,cardno;
		var nowVillage = getVillageID();

		// 内政設定で無ければ処理しない
		node = getNodeXPath('id("gray02Wrapper")/h2[contains(text(),"内政設定")]');
		if(node.length == 0) return;

		checkSkillTimer();	// いらないの削除

		var mainTtl = getNodeXPath('//table[@class="commonTables"]//th[@class="mainTtl"]')[0];

		// 内政設定無し：IDとスキル使用状況取得
		if(mainTtl.textContent.match(/.+所属している闘士カード/)) {
			var cardListNode = getNodeXPath('//table[@class="general" and @summary="闘士"]');
			cardListNode.forEach(function(card) {
				node    = getNodeXPath('.//a[@class="thickbox"]',card)[0];
				id      = node.getAttribute('href').replace(/.+inlineId=(cardWindow_(\d+)).*/,'$2');
				winid   = RegExp.$1;
				busyo   = getNodeXPath('id("'+winid+'")//span[@class="name"]')[0].textContent;
				busyolv = getNodeXPath('id("'+winid+'")//span[contains(@class,"level")]')[0].textContent;
				busyo_r = getNodeXPath('id("'+winid+'")//span[contains(@class,"rarerity")]')[0].textContent;
				cardno  = getNodeXPath('id("'+winid+'")//span[contains(@class,"cardno")]')[0].textContent;
				// 回復中スキル
				var skill = [];
				node = getNodeXPath('.//tr[2]/td[span[contains(@id,"area_timer")]]',card);
				for(var i = 0;i < node.length;i++) {
					if(node[i].innerHTML.match(/(.+LV\d).+?(\d{1,2}\:\d{1,2}\:\d{1,2}).+/)) {
						// スキル名と終了時間(予測)を生成
						name = RegExp.$1;
						time = new Date(cnvMTimeStrToTime(RegExp.$2) + serverTime.getTime());
						skill.push(name+'\t\t'+time);
					}
				}
				if(skill.length > 0) {
				// スキル情報保存(ver.,取得した会場ID,内政中?,スキルの数,スキル残り時間[スキル名,使用中時間,終了時間]...)
					save = 'V'+SKILLTIMER_SAVE_VER+'\t'+nowVillage + '\t0\t'
							+ busyo_r+busyo+"\t"+busyolv+"\t"+cardno+"\t"+ skill.length + '\t' + skill.join('\t');

					GM_setValue(SAVE_NAME+'SkillTimer_CARDID_'+id,save);
				}
			});
		}
		// 内政設定あり：IDとスキル使用状況取得
		if(mainTtl.textContent.match(/内政/)) {
			var cardListNode = getNodeXPath('//table[@class="general" and @summary="闘士"]');

			var card = cardListNode[0];
			node     = getNodeXPath('.//a[@class="thickbox"]',card)[0];
			id       = node.getAttribute('href').replace(/.+inlineId=(cardWindow_(\d+)).*/,'$2');
			winid    = RegExp.$1;
			busyo    = getNodeXPath('id("'+winid+'")//span[@class="name"]')[0].textContent;
			busyolv  = getNodeXPath('id("'+winid+'")//span[contains(@class,"level")]')[0].textContent;
			busyo_r  = getNodeXPath('id("'+winid+'")//span[contains(@class,"rarerity")]')[0].textContent;
			cardno   = getNodeXPath('id("'+winid+'")//span[contains(@class,"cardno")]')[0].textContent;

			// 回復中スキル
			var skill = [];
			node = getNodeXPath('.//td[@class="recovery"]',card);
			for(var i = 0;i < node.length;i++) {
				if(node[i].innerHTML.match(/(.+LV\d).+?(\d{1,2}\:\d{1,2}\:\d{1,2}).+/)) {

					// スキル終了時間(予測)を生成
					name = RegExp.$1;
					time = new Date(cnvMTimeStrToTime(RegExp.$2) + serverTime.getTime());
					skill.push(name+'\t0\t'+time);
				}
			}
			// 実行中スキル
			if(cardListNode.length > 1) {
				card = cardListNode[1].getElementsByTagName('td');
				//名前
				name = card[1].textContent;
				//時間
				usetime = new Date(cnvMTimeStrToTime(card[2].textContent) + serverTime.getTime());
				time    = new Date(cnvMTimeStrToTime(card[3].textContent) + usetime.getTime());
				skill.push(name+"\t"+usetime+"\t"+time);
			}
			if(skill.length > 0) {
				// スキル情報保存(ver.,取得した会場ID,内政中?,スキルの数,スキル残り時間[スキル名,使用中時間,終了時間]...)
				save = 'V'+SKILLTIMER_SAVE_VER+'\t'+nowVillage + '\t1\t'
					+ busyo_r+busyo+"\t"+busyolv+"\t"+cardno+"\t"+ skill.length + '\t' + skill.join('\t');

				GM_setValue(SAVE_NAME+'SkillTimer_CARDID_'+id,save);
//		console.log(id+":"+save);
			}
		}
	}

	// 出陣画面
	if(location.pathname == '/facility/castle_send_troop.php') {

		if(serverTime == 'Invalid Date') return;		// エラーなので安全のため未チェック

		var cardData = [];
		var node,card,domestic,cardno;
		var id,name,time,usetime,winid,busyo_r,busyo,busyolv;
		var nowVillage = getVillageID();

		// 出陣で無ければ処理しない
		node = getNodeXPath('id("gray02Wrapper")/h2[contains(text(),"出陣")]');
		if(node.length == 0) return;

		// 出陣確認画面なら処理しない
		var mainTtl = getNodeXPath('//table[@class="commonTables"]//th[@class="mainTtl" and contains(text(),"出陣する闘士カード")]');
		if(mainTtl.length == 0) return;

		cardData = checkSkillTimer();	// いらないの削除

		var cardListNode = getNodeXPath('//table[@class="general" and @summary="闘士"]');
		cardListNode.forEach(function(card) {
			node    = getNodeXPath('.//a[@class="thickbox"]',card)[0];
			id      = node.getAttribute('href').replace(/.+inlineId=(cardWindow_(\d+)).*/,'$2');
			winid   = RegExp.$1;
			busyo   = getNodeXPath('id("'+winid+'")//span[@class="name"]')[0].textContent;
			busyolv = getNodeXPath('id("'+winid+'")//span[contains(@class,"level")]')[0].textContent;
			busyo_r = getNodeXPath('id("'+winid+'")//span[contains(@class,"rarerity")]')[0].textContent;
			domestic= getNodeXPath('.//tr[1]/td[1]',card)[0].textContent.match(/内政中/) ? 1 : 0;
			cardno  = getNodeXPath('id("'+winid+'")//span[contains(@class,"cardno")]')[0].textContent;

			// 実行中スキル/回復中スキル時間取得
			var skill = [];
			node = getNodeXPath('.//tr[position() >= 2]/td[last() and span[contains(@id,"area_timer")]]',card);
			for(var i = 0;i < node.length;i++) {
				if(node[i].innerHTML.match(/(.+LV\d).+?(\d{1,2}\:\d{1,2}\:\d{1,2}).+?\[(.+)\].*/)) {
					// スキル名と終了時間(予測)を生成
					name = RegExp.$1;
					if(RegExp.$3 == '回復中') {
						time = new Date(cnvMTimeStrToTime(RegExp.$2) + serverTime.getTime());
						skill.push(name+'\t0\t'+time);
					}
				}
			}
			if(skill.length > 0) {
			// スキル情報保存(ver.,取得した会場ID,内政中?,スキルの数,スキル残り時間[スキル名,使用中時間,終了時間]...)
				save = 'V'+SKILLTIMER_SAVE_VER+'\t'+nowVillage + '\t0\t'
					+ busyo_r+busyo+"\t"+busyolv+"\t"+cardno+"\t"+ skill.length + '\t' + skill.join('\t');
				GM_setValue(SAVE_NAME+'SkillTimer_CARDID_'+id,save);
			}
		});


//		console.log(id+":"+save);
	}

	// デッキ画面
	if(location.pathname == '/card/deck.php') {

		// デッキで無ければ処理しない
		node = getNodeXPath('id("gray02Wrapper")/h2[contains(text(),"デッキ")]');
		if(node.length == 0) return;


		if(ETCS_OPTION['skillTimer_List']) {
			var baseNode = getNodeXPath('id("card_uraomote")//ul[@class="navi"]');
			for(i in baseNode) {
				var aNode    = document.createElement('a');
				var img      = document.createElement('img');

				aNode.setAttribute('title','スキルタイムメモの表示');
				aNode.setAttribute('href','javascript:void(0);');
				img  .setAttribute('src','data:image/png;base64,'+
					'iVBORw0KGgoAAAANSUhEUgAAAEYAAAAVCAYAAAD7NJjdAAAAAXNSR0IArs4c6QAABOBJREFU'+
					'WMPtmHtMFGcQwH8Ld+chV+AUqpyKoaKkUZsaTSq+EkoMImBjQMHGFB+1gq9YHy0UDUHFmhYt'+
					'BmwNSnloLLSCoIdaH8UWJWBIqPZSQIU7FVEEPawnHOrd9p+yep5QS02a1Jtkk935Zr5v9rfz'+
					'ze6OAHDXWCUajY9xCKjVMgao3xGEu8Yq0WSyMGyo4pWHYjZbaW17jErljJPR+BgvT5kjVQCl'+
					'0gkvTxkmkwWnboVDnsB59EjEQaQHcYD5J2CMxj8IDFyKIExAECYwadJCamv1/2ohk6mjz76d'+
					'nWZEUfxvwVRX/87SpVspK6tGFEVEUaSi4iLLlm0jL0/b40SiKNLRYeb27bvo9TfsxqdNW4LF'+
					'Yuk1mPp6A3futNvpt2/fT3p6Qa++Z8/+SmLiLun6/HkdKSlZfQZj8zqqqtIxceIC6ekIgoBW'+
					'qyU0NJSysmo0Gi8UCjnR0cE2k8TEJFFTU4+7uwoPDxUnT1ah032Pn98wDIZmrl27hYtLP9as'+
					'+Yp790woFDIyMzdI/sHBK8jMTGTt2jRWrJjLjBmTpLGODjO7dv2Ar6+Gw4d/prOzi9zcZPz8'+
					'hkk2tbV6YmO3cuhQqqQ7dqyCkSN9Xg6YLVv29pqyzc2tqNWv2YHJzU2WzgsLT6PReEmB5+Zq'+
					'EQSBceP8sVgsbN4cy5Ahr9v4NzQ0IQjCc9eMj08nMjKIiIh3AVi58kt8fAZL42Vl1SxZsoXi'+
					'4lQbEEePnuPEifdfDhit9uxzjUpLSwEIDQ2lvd3U42SXL19j48ZvqKrKlXRJSR9JN79uXRpG'+
					'430uXLjM1as3WbAgHFdXF9rb7+PhobKZ6+HDR2RllXDp0lUWLXqPnBwt8+YF4+8/HIVCTmur'+
					'keTkTHS6BlQqF8aM8bPJIG9vT9zdVdTVGXBzc0Wj8ep7jXF1VdoZhIWFSUdPNt31ISoqAS8v'+
					'NcnJe7BarRQV/URIyEqCgmKJjd3KmTPV5OWVcuXKdQYNGoAgCDQ1taBUKnBzewLGarWyePEm'+
					'+vdXUly8nblzpzNr1jTCwz9m8OCB1NTUMXXqh0yZ8jYZGZ/YxZKVVUJcXCQAev0NIiLWYzZ3'+
					'9T1j5HKZXUF9Vp61AThy5BcSEjIoKPgcf//hxMVtIzr6M3bvTmDmzMkolf0AmDPnU5Yvn4Ov'+
					'7xDJd8eO/URGBtlsq7Cw1QQGTiAmJkzS19TUExU1HXd3FWPH+nHxYj4KhRyd7opk09jYRF2d'+
					'gfz8HxkxYiipqfswmTpobW0nPj6dtLR1fcuYgwe/6HGvdxfj48czbHSFhafZufM7Tp36mtGj'+
					'RyCTydizZwPe3p4cOHBcggIQEDCW8vIamyzLydGSkLAQgFGjfMjPP0Fi4iLWr/8AgLo6A+Hh'+
					'q2lqaiE7O4mUlOXIZDIUCrldfI2NNygqKmP+/Jk8eNDJwIHujB//Jvv2baKyUsetW20vDEZo'+
					'aDwnvuH7JPibN9vQaGbYZYsgCFRUfEtAwFt2WSWKIk5Of/+tWFurx2BoJiRk8l8/bV1cv97S'+
					'69ujpOQMVqvI7NmBzx1vablDQcFJVq2K7nVti8WCs7PzC0Fp1HfZgwGorPyNzMwisrOPAODh'+
					'oaK8fK9Ngfs/S49gXnVp1Hc5/pV6Lb5ms9VB4qlmlVwu4KRWy2htc7Q1n+3gCeDo+T4t3T3f'+
					'PwHRa/RJ6KKhjwAAAABJRU5ErkJggg==');
				baseNode[i].appendChild(aNode);
				aNode   .appendChild(img);
				aNode.addEventListener('click', listViewSkillTimer, false);
			}
		}

		if(ETCS_OPTION['skillTimer_Card'])		viewCardSkillTimer();
	}
}
/*
	スキル状況表示(リスト)
*/
function listViewSkillTimer( event ) {

	if(searchBaseWindow('skilltimerlist') != null) return;	// 既に開いていたら表示しない


	var thText = [
		'カードID','闘士名','LV','スキル1','スキル2','スキル3',
	];
	var data,node;
	var i,j;

	var baseWin = new baseWindow('スキルタイム一覧','skilltimerlist');

	var baseNode  = document.createElement('div');
	var tblNode   = document.createElement('table');
	var theadNode = document.createElement('thead');
	var tbodyNode = document.createElement('tbody');
	var trNode    = document.createElement('tr');
	var tdNode;
	tblNode  .appendChild(theadNode);
	theadNode.appendChild(trNode);

	// ヘッダ
	for(i = 0;i < thText.length;i++) {
		tdNode = document.createElement('th');
		trNode.appendChild(tdNode);
		tdNode.textContent = thText[i];
	}



	var cardData = checkSkillTimer();

	if(cardData != null) {

		// データ表示
		for(i = 0;i < cardData.length;i++) {
			data   = cardData[i];
			trNode = document.createElement('tr');
			tbodyNode.appendChild(trNode);
			// カードID
			tdNode = document.createElement('th');
			tdNode.appendChild(document.createTextNode(data['id']));
			trNode.appendChild(tdNode);
			// 闘士名
			tdNode = document.createElement('td');
			tdNode.appendChild(document.createTextNode(data['busyo']));
			trNode.appendChild(tdNode);
			// 闘士LV
			tdNode = document.createElement('td');
			tdNode.appendChild(document.createTextNode(data['busyolv']));
			trNode.appendChild(tdNode);

			// スキル名,回復予定時間
			for(j = 0;j < 3;j++) {

				if(j < parseInt(data['skillNum'])) {
					// スキル
					tdNode = document.createElement('td');
					trNode.appendChild(tdNode);
					tdNode.innerHTML = '<strong>'+data['skill'+j]['name'] + '</strong>'+
						'<br />'+
						(data['skill'+j]['use'] != 'Invalid Date' ?
													'使用:'+ makeDateString(data['skill'+j]['use'])+'<br />' :'' )+
						'回復:'+makeDateString(data['skill'+j]['time']) ;
				} else {
					// スキル名
					tdNode = document.createElement('td');
					trNode.appendChild(tdNode);
				}
			}
		}
		tblNode .appendChild(tbodyNode);
		baseNode.appendChild(tblNode);
	} else {
		node = document.createElement('p');
		node.textContent = 'サーバー時間が取得できないか、エラーが発生しました。';
		node.style.color = 'red';
		node.style.margin = '1em';
		baseNode.appendChild(node);
	}

	baseWin .addContent(baseNode);

	baseWin.disp(true);

	if(SERVER_TYPE == 1) baseWin.center(undefined,event.layerY);	//mixi
	else baseWin.center();
}
/*
	カードに表示(ノード挿入)
*/
function viewCardSkillTimer() {

	var cardList = [];
	var cardNode = [];
	var card,node;
	var i,j,k;
	var guess = false;
	var timerData = checkSkillTimer();

//	if(timerData == null) return;		// エラーでデータが帰ってこない


	/* 表示中のカードをすべて列挙 */

	// xx枚表示を列挙
	cardNode = getNodeXPath('//div[@id="file-1"]//div[contains(@class,"statusDetail")]');
	for(j in cardNode) {
		// IDを取得
		id   = -1;
		node = getNodeXPath('.//a[@class="thickbox"]', cardNode[j]);
		if(!((node.length > 0) && (node[0].getAttribute('href').match(/inlineId=(cardWindow_(\d+))/)))) {
			continue;		// IDが見つからない(あり得ないはず)
		}
		id = parseInt( RegExp.$2, 10);
		// リストに追加
		cardList.push( {'kind' : 0, 'node' : cardNode[j], 'id' : id });
	}

	// デッキセット中/ファイル:カード表示を列挙
	cardNode = getNodeXPath('//div[@class="cardColmn"]');
	for(j in cardNode) {
		id   = -1;
		// IDを取得(ファイルに戻す・カードを保護する・保護を解除から調べる)
		node = getNodeXPath('.//div[@class="control"]/a/img | .//div[@class="sub-control-buttons-wrapper"]/a', cardNode[j]);
		if((node.length > 0) && (node[0].getAttribute('onclick').match(/operationExecution.+?\,\s*(\d+)\s*\,/))) {
			id = parseInt( RegExp.$1, 10);
		} else {
			// IDを取得(ステータスアップがあればそこを調べる)
			node = getNodeXPath('.//span[@class="status_levelup"]/a', cardNode[j]);
			if((node.length > 0) && (node[0].getAttribute('href').match(/cid=(\d+)/))) {
				id = parseInt( RegExp.$1, 10);
			} else {
				// IDが無い…(拠点などで推測)
			}
		}
		// リストに追加
		cardList.push( {'kind' : 1, 'node' : cardNode[j], 'id' : id });
	}

	/* 表示部分を追加 */
	timerData.forEach( function( data ) {

		for(j in cardList) {
			guess = false;
			if(cardList[j]['id'] != data['id']) {
				guess = true;
				node  = getNodeXPath('.//div[@class="control"]//dd[preceding-sibling::dt[contains(text(),"所属拠点")]]',cardList[j]['node']);
				if((cardList[j]['kind'] == 1) && (node.length > 0)) {	// カード表示で内政中チェック
					k = node[0].getElementsByTagName('a')[0].getAttribute('href').replace(/.*village_id=(\d+).*/,'$1');
					if((data['domestic'] != 1) || !(node[1].textContent.match(/内政セット済/))
																		 || (data['villageId'] != k)) {
						// 内政でも無いとき(出陣中？)
						node = getNodeXPath('.//span[@class="cardno"]',cardList[j]['node']);	// cardno
						if((node.length == 0) || (parseInt(node[0].textContent) != data['cardno']) ){
							continue;
						}
					}
				} else {
					//カードで無い
/*					node = getNodeXPath('.//span[contains(@class,"skillName")]',cardList[j]['node']);
					var cnt = 0;
					for(k in node) {
						for(l = 0; l <  data['skillNum'];l++) {
//console.log(node[k].textContent + "/"+ data['skill'+l]['name']);
							if(node[k].textContent == data['skill'+l]['name']) {
								cnt++;
							}
						}
					}
					if(cnt == data['skillNum']) {
						// スキル構成が同じ
					} else {

						continue;
					}
*/
					continue;
				}
			}

			if(cardList[j]['kind'] == 0) {
				// xx枚表示
				node = getNodeXPath('.//tbody/tr/td[preceding-sibling::th[contains(text(),"スキル")]][1]',cardList[j]['node']);
				for(i = 0;i < data['skillNum'];i++) {
					for(k = 0;k < node.length;k++) {
						if(data['skill'+i]['name'].replace(/(.+)LV\d/,'$1')
											== node[k].textContent.replace(/(.+)LV\d/,'$1')) {
							str = guess ? '?':'' + "【" + data['skill'+i]['name'] + "】" +
								(data['skill'+i]['use'] != 'Invalid Date' ?
								'<br />[使用]'+ makeDateString(data['skill'+i]['use']) :'' )+
								'<br />[回復]'+ makeDateString(data['skill'+i]['time']) + ' <br />';
							setToolTip(node[k],str);
							break;
						}
					}
				}
				// xx枚表示で、スキルの所に透明画像が表示されているバグ対策
				node = getNodeXPath('.//img[preceding-sibling::div[@class="illustMini"]]',cardList[j]['node']);
				if(node.length > 0) {
					node[0].style.display = 'none';
				}

			} else {
				// デッキ・ファイル(カード表示)
				node = getNodeXPath('.//div[contains(@id,"card_frontback")]',cardList[j]['node']);
				str = guess ? '?':'';
				for(i = 0;i < data['skillNum'];i++) {
					str +=  "【" + data['skill'+i]['name'] + "】" +
					(data['skill'+i]['use'] != 'Invalid Date' ?
												'<br />[使用]'+ makeDateString(data['skill'+i]['use']) :'' )+
					'<br />[回復]'+makeDateString(data['skill'+i]['time']) + '<br />';
				}
//				node[0].setAttribute('title',str);
				setToolTip(node[0],str);
			}
			break;
		}
	});

}

/*
	データのチェック
*/
function checkSkillTimer() {

	var name,reg, save, load, data, id, time;
	var cardData = [];
	var h;
	var listValue = GM_listValues();

	for(h in listValue) {
		name = listValue[h];

		reg = new RegExp(SAVE_NAME+"SkillTimer\_CARDID\_(.+)");
		if(name.match(reg)) {
			id   = parseInt(RegExp.$1);
			load = GM_getValue(name,'').split('\t');
			if(load.length < 9) {	// 不正は削除
				GM_deleteValue(name);
				continue;
			}
			if(parseInt(load[5]) == 0) {	// スキル回復待ち無しは削除
				GM_deleteValue(name);
				continue;
			}
			ver = parseInt(load[0].replace(/V(\d+)/,'$1'));
			if(isNaN(ver) || ver < SKILLTIMER_SAVE_VER) {	// 古いバージョンのデータは削除
				GM_deleteValue(name);
				continue;
			}

			// ヘッダ
			save    = [];
			save[0] = load[0];	// Version
			save[1] = load[1];	// 取得拠点ID
			save[2] = load[2];	// 内政状態
			save[3] = load[3];	// 闘士名
			save[4] = load[4];	// 闘士LV
			data    = {
				'id'        : id ,
				'villageId' : parseInt(load[1],10),
				'domestic'  : parseInt(load[2],10),
				'busyo'     : load[3],
				'busyolv'   : load[4],
				'cardno'    : load[5],
			};

			// エラー時、全てのデータを格納
			if(serverTime == 'Invalid Date'){
				for(i = 0,cnt = 0;i < 3;i++) {
					if(9+i*3 < load.length) {
						data['skill'+i] = {				// データ形式
							'name' : load[7+i*3],
							'use'  : new Date(load[8+i*3]),
							'time' : new Date(load[9+i*3]),
						};
						cnt++;
					}
				}
				data['skillNum'] = cnt;
				cardData.push(data);
				continue;
			}

			// エラー無しの時、終了時間を過ぎている物を排除＆整理して配列に格納
			for(i = 0,cnt = 0;i < 3;i++) {

				if((9+i*3 < load.length) &&
						((new Date(load[9+i*3])).getTime() > serverTime.getTime())) {

					time = new Date(load[8+i*3]).getTime() > serverTime.getTime() ? new Date(load[8+i*3]) : 'Invalid Date';
					data['skill'+i] = {				// データ形式
						'name' : load[7+i*3],
						'use'  : time,
						'time' : new Date(load[9+i*3]),
					};
					save[7+cnt*3]   = load[7+i*3];	// 新セーブデータ
					save[8+cnt*3]   = time;
					save[9+cnt*3]   = load[9+i*3];
					cnt++;
				}
			}
			if(cnt == 0) {	// 回復中スキル無し
				GM_deleteValue(name);
				continue;
			}
			save[5]          = cnt;	// 回復中スキル数
			data['skillNum'] = cnt;
//			console.log("DATA:"+data['villageId'] + "/" + save[1] + "/" + load[1]);
			cardData.push(data);
			GM_setValue(SAVE_NAME+'SkillTimer_CARDID_'+id,save.join('\t'));
		}
	}
	return cardData;
}


// ==============================
//   フリーマーケットで取引状態を仮算出
// ==============================
/*
	初期化
*/
function initMarketStockCalc() {

	var node;

	// 処理する場所かチェック
	if(location.pathname != "/facility/facility.php") return;	// 施設?
	var result = getNodeXPath('//div[@id="gray02Wrapper"]/h2/text()')[0];
	if(result.nodeValue != "フリーマーケット") return;


	// 表示物作成
	node      = document.createElement('div');
	node.setAttribute('id','etcs_market_calc');
	node.innerHTML = '<table class="etcs_market_table"><thead><tr><th></th><th>学力</th><th>体力</th><th>武力</th><th>糧</th></thead><tbody>'+
			'<tr><th title="現在の資源の量">現在</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
			'<tr><th title="取引する内容(左：売る量 右：買う量)">取引内容</th><td colspan="4">&nbsp;</td></tr>'+
			'<tr><th title="取引後の結果">取引後</th><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>'+
			'</tr></tbody></table>';

	getNodeXPath('//form[@name="form2"]/table//td[table]')[0].appendChild(node);

	// イベントの設定
	addEventByXPath('//input[@id="tc"]', 'keyup', viewMarketStockCalc,false);
	addEventByXPath('//input[@id="tc"] | //select[@id="select" or @id="select2"] | //span[@id="resorce_num"]', 'change',viewMarketStockCalc,false);


	viewMarketStockCalc_timer();
}
/*
	タイマー呼び出し
*/
function viewMarketStockCalc_timer() {
	viewMarketStockCalc();
	if(ETCS_OPTION['MarketStockCalcTimer']) setTimeout(viewMarketStockCalc_timer,1000);
}
/*
	表示更新
*/
function viewMarketStockCalc() {
	var trNode,tdNode,node;
	var i,j;
	var cnt;
	var stock     = {'wood':0, 'stone':0, 'iron':0, 'rice':0 };
	var stockName = {"-1":-1,  "101":0,   "102":1,  "103":2,   "104":3};

	trNode = document.getElementById('etcs_market_calc').getElementsByTagName('tr');

	// 現在の資源の値
	tdNode = trNode[1].getElementsByTagName('td');
	cnt    = 0;
	for(i in stock) {
		stock[i]                         = parseInt(document.getElementById(i).firstChild.nodeValue);
		tdNode[cnt].firstChild.nodeValue = stock[i];
		cnt++;
	}

	// 取引相場の取得
	convPer = getMarketConvPer();

	// Inputボックスに入力された値を取得し、取引を表示
	var sellQty,buyQty;
	var selAct = [0,0];
	node = document.getElementById("select");
	if(node != null) {
		// 現在の売買物選択状況を取得
		selAct[0] = parseInt(stockName[document.getElementById("select") .value]);
		selAct[1] = parseInt(stockName[document.getElementById("select2").value]);
		node = document.getElementById("tc");
		sellQty   = parseInt(node.value,10);	//8進数と誤解しないように
	} else {
		// inputボックスなし(確認画面？)
		node = getNodeXPath('//form[@name="form2"]//input[@name="tf_id"]');
		if(node.length == 0) return;		// 表示なし
		selAct[0] = parseInt(stockName[node[0].getAttribute('value')]);
		node = getNodeXPath('//form[@name="form2"]//input[@name="tt_id"]');
		if(node.length == 0) return;		// 表示なし
		selAct[1] = parseInt(stockName[node[0].getAttribute('value')]);
		node = getNodeXPath('//form[@name="form2"]//input[@name="tc"]');
		if(node.length == 0) return;		// 表示なし
		sellQty   = parseInt(node[0].getAttribute('value'),10);	//8進数と誤解しないように
	}

	if(isNaN(sellQty)) {
		sellQty = 0;
	}

	buyQty = parseInt((sellQty * convPer)/100);		// sellqty *(convper/100)だと誤差が出る
	trNode[2].getElementsByTagName('td')[0].firstChild.nodeValue = (sellQty+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,') + ' → ' + (buyQty+'').replace(/(\d)(?=(\d\d\d)+$)/g,'$1,');

	// 取引後の資源量を表示
	tdNode = getNodeXPath('td/text()',trNode[3]);
	cnt    = 0;
	for(i in stock) {
		var chgStock     = stock[i];
		node             = tdNode[cnt].parentNode.style;
		node.color       = "#000000";
		if(selAct[0] == cnt) {
			chgStock  -= sellQty;
			node.color = "#ff0000";
		}
		if(selAct[1] == cnt) {
			chgStock  += buyQty;
			node.color = "#0000ff";
		}
		tdNode[cnt].nodeValue = chgStock;
		cnt++;
	}
}
/*
	相場の取得(%を返す)
*/
function getMarketConvPer() {

	var node;

	// 取引相場の取得
	node = getNodeXPath('//form[@name="form1"]//td[preceding-sibling::th[normalize-space(text()) = "フリーマーケットの取引相場"]]')[0];
	if(typeof node == 'undefined') return null;
	var percent = node.innerHTML.match(/\d{1,2}%/g);	// 数値取得
	for(i in percent) { percent[i] = percent[i].replace('%',''); }		// %をカット
	var convPer = parseInt(percent[0],10);	// 通常

	if(node.innerHTML.match(/スキル効果/)){
		convPer += parseInt(percent[1],10);	// スキル効果あり(仮)
	}


	return convPer;
}
/*
	コストの表示
*/
	var marketCostView_CostData = {
		0 : 'select',
		"--- 種類 ---" : {0:'hr'},

		/*
			施設
		*/
		"施設建設" : {
			0 : 'select',

			"--- 資源施設 ---" : {0:'hr'},

			"教室" : {0:'select',
				"LV1":	[10,35,40,15],
				"LV2":	[25,88,100,38],
				"LV3":	[58,202,230,86],
				"LV4":	[173,604,690,259],
				"LV5":	[431,1510,1725,647],
				"LV6":	[1466,2847,3019,1294],
				"LV7":	[2493,4839,5132,2200],
				"LV8":	[3490,6775,7186,3080],
				"LV9":	[4537,8807,9341,4003],
				"LV10":	[5898,11450,12144,5204],
				"LV11":	[8119,14434,15787,6766],
				"LV12":	[11366,20207,22101,9472],
				"LV13":	[17050,30311,33152,14208],
				"LV14":	[25575,45467,49729,21312],
				"LV15":	[38362,68199,74593,31968],
			},
			"体育設備" : {0:'select',
				"LV1":	[40,10,35,15],
				"LV2":	[100,25,88,38],
				"LV3":	[230,58,202,86],
				"LV4":	[690,173,604,259],
				"LV5":	[1725,431,1510,647],
				"LV6":	[3019,1466,2847,1294],
				"LV7":	[5132,2493,4839,2200],
				"LV8":	[7186,3490,6775,3080],
				"LV9":	[9341,4537,8807,4003],
				"LV10":	[12144,5898,11450,5204],
				"LV11":	[15787,8119,14434,6766],
				"LV12":	[22101,11366,20207,9472],
				"LV13":	[33152,17050,30311,14208],
				"LV14":	[49729,25575,45467,21312],
				"LV15":	[74593,38362,68199,31968],
			},
			"武道設備" : {0:'select',
				"LV1":	[35,40,10,15],
				"LV2":	[88,100,25,38],
				"LV3":	[202,230,58,86],
				"LV4":	[604,690,173,259],
				"LV5":	[1510,1725,431,647],
				"LV6":	[2847,3019,1466,1294],
				"LV7":	[4839,5132,2493,2200],
				"LV8":	[6775,7186,3490,3080],
				"LV9":	[8807,9341,4537,4003],
				"LV10":	[11450,12144,5898,5204],
				"LV11":	[14434,15787,8119,6766],
				"LV12":	[20207,22101,11366,9472],
				"LV13":	[30311,33152,17050,14208],
				"LV14":	[45467,49729,25575,21312],
				"LV15":	[68199,74593,38362,31968],
			},
			"食堂" : {0:'select',
				"LV1":	[35,35,30,0],
				"LV2":	[88,88,75,0],
				"LV3":	[202,202,173,0],
				"LV4":	[604,604,518,0],
				"LV5":	[1510,1510,1294,0],
				"LV6":	[3019,3019,2588,0],
				"LV7":	[5132,5132,4399,0],
				"LV8":	[7186,7186,6159,0],
				"LV9":	[9341,9341,8007,0],
				"LV10":	[12144,12144,10409,0],
				"LV11":	[15787,15787,13532,0],
				"LV12":	[22101,22101,18944,0],
				"LV13":	[33152,33152,28416,0],
				"LV14":	[49729,49729,42625,0],
				"LV15":	[74593,74593,63937,0],
			},
			"神棚" : {0:'select',
				"LV1":	[780,1560,1560,3900],
				"LV2":	[1248,2496,2496,6240],
				"LV3":	[1997,3994,3994,9984],
				"LV4":	[4193,6290,6290,11182],
				"LV5":	[5871,8806,8806,15655],
				"LV6":	[10958,13698,13698,16437],
				"LV7":	[15342,19177,19177,23013],
				"LV8":	[19944,24930,24930,29916],
				"LV9":	[25928,32410,32410,38891],
				"LV10":	[33706,42132,42132,50559],
			},
			"料理教室" : {0:'select',
				"LV1":	[2940,980,980,4900],
				"LV2":	[4704,1568,1568,7840],
				"LV3":	[7526,2509,2509,12544],
				"LV4":	[10537,5268,5268,14049],
				"LV5":	[14751,7376,7376,19668],
				"LV6":	[20652,13768,13768,20652],
				"LV7":	[28913,19275,19275,28913],
				"LV8":	[37587,25058,25058,37587],
				"LV9":	[48863,32576,32576,48863],
				"LV10":	[63523,42348,42348,63523],
			},

			"--- 軍事施設 ---" : {0:'hr'},

			"格闘道場" : {0:'select',
				"LV1":	[112,107,107,122],
				"LV2":	[224,214,214,244],
				"LV3":	[448,428,428,488],
				"LV4":	[759,725,725,826],
				"LV5":	[1214,1160,1160,1322],
				"LV6":	[2209,2110,2110,2406],
				"LV7":	[3331,3182,3182,3627],
				"LV8":	[4958,4736,4736,5400],
				"LV9":	[8091,7729,7729,8813],
				"LV10":	[11130,10632,10632,12122],
			},
			"槍術道場" : {0:'select',
				"LV1":	[72,360,72,216],
				"LV2":	[144,720,144,432],
				"LV3":	[228,1440,228,864],
				"LV4":	[648,1728,648,1296],
				"LV5":	[972,2592,972,1944],
				"LV6":	[1409,3758,1409,2819],
				"LV7":	[2725,4088,2725,4088],
				"LV8":	[6744,9810,5518,2453],
				"LV9":	[12140,17658,9933,4415],
				"LV10":	[21852,31784,17879,7946],
				"LV11":	[39333,57212,32182,14303],
				"LV12":	[70800,96545,64364,25745],
				"LV13":	[127440,173781,115854,46342],
				"LV14":	[254879,324392,254879,92683],
				"LV15":	[509759,648784,509759,185367],
			},
			"弓術道場" : {0:'select',
				"LV1":	[360,72,72,216],
				"LV2":	[720,144,144,432],
				"LV3":	[1440,288,288,864],
				"LV4":	[1728,648,648,1296],
				"LV5":	[2592,972,972,1944],
				"LV6":	[3758,1409,1409,2819],
				"LV7":	[5450,2044,2044,4087],
				"LV8":	[9810,6131,6131,2453],
				"LV9":	[17658,12140,9933,4415],
				"LV10":	[31784,21852,17879,7946],
				"LV11":	[57212,39333,32182,14303],
				"LV12":	[96545,70800,64364,25745],
				"LV13":	[173781,127440,115854,46342],
				"LV14":	[324392,254879,254879,92683],
				"LV15":	[648784,509759,509759,185367],
			},
			"駐車場" : {0:'select',
				"LV1":	[72,72,360,216],
				"LV2":	[144,144,720,432],
				"LV3":	[288,288,1440,864],
				"LV4":	[648,648,1728,1296],
				"LV5":	[972,972,2592,1944],
				"LV6":	[1409,1409,3758,2891],
				"LV7":	[2044,2044,5450,4087],
				"LV8":	[5518,6744,9810,2453],
				"LV9":	[9933,12140,17658,4415],
				"LV10":	[17879,21852,31784,7946],
				"LV11":	[32182,39333,57212,14303],
				"LV12":	[64364,70800,96545,25745],
				"LV13":	[115854,127440,173781,46342],
				"LV14":	[254879,254879,324392,92683],
				"LV15":	[509759,509759,648784,185367],
			},
			"攻城道場" : {0:'select',
				"LV1":	[216,216,216,72],
				"LV2":	[432,432,432,144],
				"LV3":	[864,864,864,288],
				"LV4":	[1224,1224,1224,648],
				"LV5":	[1836,1836,1836,972],
				"LV6":	[2662,2662,2662,1409],
				"LV7":	[3860,3860,3860,2044],
				"LV8":	[7457,7457,7357,2452],
				"LV9":	[13242,13242,13242,4414],
				"LV10":	[23836,23836,23836,7945],
				"LV11":	[42905,42905,42905,14302],
				"LV12":	[77229,77229,77229,25743],
				"LV13":	[139013,139013,139013,46338],
				"LV14":	[278026,278026,278026,92675],
				"LV15":	[556051,556051,556051,185350],
			},
			"一般学生寮" : {0:'select',
				"LV1":	[35,20,35,80],
				"LV2":	[53,30,53,120],
				"LV3":	[89,51,89,204],
				"LV4":	[147,84,147,337],
				"LV5":	[228,130,228,522],
				"LV6":	[336,192,336,767],
				"LV7":	[476,272,476,1089],
				"LV8":	[653,373,653,1492],
				"LV9":	[868,496,868,1984],
				"LV10":	[1129,645,1129,2580],
				"LV11":	[2032,1161,2032,4644],
				"LV12":	[3658,2090,3658,4644],
				"LV13":	[6951,3971,6950,15882],
				"LV14":	[13205,7544,13205,30177],
				"LV15":	[25090,14334,25090,57336],
			},
			"上級学生寮" : {0:'select',
				"LV1":	[200,114,200,438],
				"LV2":	[320,183,320,701],
				"LV3":	[512,293,512,1121],
				"LV4":	[768,439,768,1682],
				"LV5":	[1152,658,1152,2523],
				"LV6":	[1728,987,1728,3784],
				"LV7":	[2419,1382,2419,5298],
				"LV8":	[3387,1935,3387,7418],
				"LV9":	[4741,2709,4741,10385],
				"LV10":	[6637,3793,6637,14538],
				"LV11":	[8628,4930,8628,18900],
				"LV12":	[11217,6409,11217,24570],
				"LV13":	[14582,8332,14582,31941],
				"LV14":	[18956,11735,18956,40620],
				"LV15":	[25817,16429,25817,49286],
				"LV16":	[32271,22003,32271,60141],
				"LV17":	[42172,29337,42172,69675],
				"LV18":	[52715,38963,52715,84803],
				"LV19":	[66009,49506,66009,93512],
				"LV20":	[79211,62708,79211,108914],
			},
			"運動場" : {0:'select',
				"LV1":	[1500,1600,2500,3300],
				"LV2":	[2100,2240,3500,3300],
				"LV3":	[2940,3136,4900,6468],
				"LV4":	[6629,7326,13955,6978],
				"LV5":	[13257,14653,27910,13955],
				"LV6":	[32097,37679,55821,13955],
				"LV7":	[64194,75358,111642,27910],
				"LV8":	[128388,150716,223283,55821],
				"LV9":	[256776,301432,446566,111642],
				"LV10":	[513551,602865,893133,223283],
			},
			"陸上トラック" : {0:'select',
				"LV1":	[2884,4486,5977,2723],
				"LV2":	[4614,7177,9484,4357],
				"LV3":	[7382,11483,15174,6972],
				"LV4":	[11811,18373,24279,11155],
				"LV5":	[18898,29397,38846,17848],
				"LV6":	[28347,44096,58269,26772],
				"LV7":	[42521,66143,87404,40158],
				"LV8":	[63781,99215,131105,60238],
				"LV9":	[89294,138901,183548,84333],
				"LV10":	[125011,194461,256967,118066],
				"LV11":	[175015,272246,359754,165292],
				"LV12":	[227520,353920,467680,214880],
				"LV13":	[295776,460096,607984,279344],
				"LV14":	[384509,598125,790379,363147],
				"LV15":	[512678,692116,897187,461410],
				"LV16":	[645974,830539,1045863,553692],
				"LV17":	[812082,959734,1218123,701344],
				"LV18":	[1018794,1151680,1417453,841613],
				"LV19":	[1275708,1382016,1647789,1009935],
				"LV20":	[1594635,1658420,1913561,1211922],
			},
			"鍛冶場・武具" : {0:'select',
				"LV1":	[200,150,340,170],
				"LV2":	[400,300,680,340],
				"LV3":	[780,585,1326,663],
				"LV4":	[1482,1112,2519,1290],
				"LV5":	[2742,2056,4661,2330],
				"LV6":	[4935,3701,8390,4195],
				"LV7":	[8636,6477,14682,7341],
				"LV8":	[17640,14112,28223,10584],
				"LV9":	[31566,25253,50506,18940],
				"LV10":	[50506,40404,80809,30303],
			},
			"鍛冶場・防具" : {0:'select',
				"LV1":	[150,200,340,170],
				"LV2":	[300,400,680,340],
				"LV3":	[585,780,1326,663],
				"LV4":	[1112,1482,2519,1260],
				"LV5":	[2056,2742,4661,2330],
				"LV6":	[3701,4935,8390,4195],
				"LV7":	[6477,8636,14682,7341],
				"LV8":	[14112,17640,28223,10584],
				"LV9":	[25253,31566,50506,18940],
				"LV10":	[40404,50506,80809,30303],
			},
			"見張り台" : {0:'select',
				"LV1":	[600,840,600,360],
				"LV2":	[960,1344,960,576],
				"LV3":	[1536,2150,1536,922],
				"LV4":	[2458,3441,2458,1475],
				"LV5":	[3932,5505,3932,2359],
				"LV6":	[6291,8808,6291,3775],
				"LV7":	[9437,13212,9437,5662],
				"LV8":	[14156,19818,14156,8493],
				"LV9":	[21233,29727,21233,12740],
				"LV10":	[31850,44590,31850,19110],
				"LV11":	[44590,62426,44590,26754],
				"LV12":	[62426,87396,62426,37456],
				"LV13":	[87397,122355,87397,52438],
				"LV14":	[122355,171297,122355,73413],
				"LV15":	[159062,222686,159062,95437],
				"LV16":	[206780,289492,206780,124068],
				"LV17":	[268814,376340,268814,161288],
				"LV18":	[349458,489242,349458,209675],
				"LV19":	[419350,587090,419350,251610],
				"LV20":	[503220,704508,503220,301932],
			},

			"--- 一般施設 ---" : {0:'hr'},

			"倉庫" : {0:'select',
				"LV1":	[83,141,83,63],
				"LV2":	[167,281,167,126],
				"LV3":	[300,506,300,226],
				"LV4":	[479,810,479,362],
				"LV5":	[671,1134,671,507],
				"LV6":	[1044,1253,1044,835],
				"LV7":	[1462,1754,1462,1169],
				"LV8":	[1973,2368,1973,1578],
				"LV9":	[2664,3196,2664,2131],
				"LV10":	[3596,4315,3596,2877],
				"LV11":	[4854,5825,4854,3883],
				"LV12":	[6311,7573,6311,5048],
				"LV13":	[8204,9845,8204,6563],
				"LV14":	[10255,12306,10255,8204],
				"LV15":	[12819,15382,12816,10255],
				"LV16":	[15382,18459,15382,12306],
				"LV17":	[18459,22151,18459,14767],
				"LV18":	[21228,21228,25473,16982],
				"LV19":	[24412,29294,24412,19529],
				"LV20":	[28074,33688,28074,22459],
			},
			"闘術研究所" : {0:'select',
				"LV1":	[275,110,110,55],
				"LV2":	[413,165,165,83],
				"LV3":	[619,248,248,124],
				"LV4":	[1486,836,836,557],
				"LV5":	[2228,1253,1253,836],
				"LV6":	[7521,6267,6267,5015],
				"LV7":	[13538,11282,11282,9025],
				"LV8":	[21436,17862,17862,14290],
				"LV9":	[44675,37228,37228,29784],
				"LV10":	[87725,73104,73104,58483],
			},
			"フリーマーケット" : {0:'select',
				"LV1":	[100,100,50,50],
				"LV2":	[334,334,191,191],
				"LV3":	[1035,1035,592,592],
				"LV4":	[2795,2795,1600,1600],
				"LV5":	[6328,6328,4218,4218],
				"LV6":	[13288,13288,8859,8859],
				"LV7":	[25248,25248,16832,16832],
				"LV8":	[42921,42921,28614,28614],
				"LV9":	[64381,64381,42921,42921],
				"LV10":	[90134,90134,60089,60089],
			},
			"記念碑" : {0:'select',
				"LV1":	[700,3500,2100,700],
				"LV2":	[1120,5600,3360,1120],
				"LV3":	[1792,8960,5376,1792],
				"LV4":	[3763,10035,7526,3763],
				"LV5":	[5263,14049,10537,5268],
				"LV6":	[9834,14752,14752,9834],
				"LV7":	[13768,20652,20652,13768],
				"LV8":	[17899,26848,26848,17899],
				"LV9":	[23268,34902,34902,23268],
				"LV10":	[30249,45373,45373,30249],
			},

			"--- 拠点 ---" : {0:'hr'},

			"学園" : {0:'select',
				"LV1(初期建設済)":	[0,0,0,0],
				"LV2":	[1404,546,390,780],
				"LV3":	[2570,1000,714,1428],
				"LV4":	[4161,2081,2081,2081],
				"LV5":	[7102,3552,3552,3552],
				"LV6":	[9056,9056,6037,6037],
				"LV7":	[14384,14384,9589,9589],
				"LV8":	[22773,22773,15183,15183],
				"LV9":	[33562,33562,22374,22374],
				"LV10":	[44402,57559,32890,29602],
				"LV11":	[65122,84418,48239,43415],
				"LV12":	[95317,123558,70605,63544],
				"LV13":	[113458,154716,154716,92830],
				"LV14":	[150418,150418,315878,135375],
				"LV15":	[219008,219008,492770,164258],
				"LV16":	[294820,294820,663345,221115],
				"LV17":	[488220,488220,827854,318406],
				"LV18":	[839130,839130,915414,457707],
				"LV19":	[1307581,1307581,1354280,700491],
				"LV20":	[1901938,1901938,1969864,1018896],
			},
			"分校" : {0:'select',
				"LV1":	[104,400,136,160],
				"LV2":	[243,936,319,374],
				"LV3":	[438,1685,573,673],
				"LV4":	[1110,2467,1357,1233],
				"LV5":	[1887,4194,2307,2097],
				"LV6":	[3236,7191,3954,3596],
				"LV7":	[5177,11505,6327,5753],
				"LV8":	[10430,18776,13560,9387],
				"LV9":	[18839,33912,24492,16956],
				"LV10":	[33914,61043,44087,30523],
				"LV11":	[66939,106495,85196,45640],
				"LV12":	[119786,190570,152456,81672],
				"LV13":	[213820,340166,272133,145786],
				"LV14":	[423566,505021,456148,244365],
				"LV15":	[708513,844765,763014,408756],
			},
			"会場" : {0:'select',
				"LV1":	[400,136,104,160],
				"LV2":	[936,319,243,374],
				"LV3":	[1685,573,438,673],
				"LV4":	[2467,1357,1110,1233],
				"LV5":	[4194,2307,1887,2097],
				"LV6":	[7191,3954,3236,3596],
				"LV7":	[11505,6327,5177,5753],
				"LV8":	[18776,13560,10430,9387],
				"LV9":	[33912,24492,18839,16956],
				"LV10":	[61043,44087,33914,30523],
				"LV11":	[106495,85196,66939,45640],
				"LV12":	[190570,152456,119786,81672],
				"LV13":	[340166,272133,213820,145786],
				"LV14":	[505021,456148,423566,244365],
				"LV15":	[844765,763014,708513,408756],
			},

			"--- 廃止 ---" : {0:'hr'},

			"修行場" : {0:'select',
				"LV1":	[1600,1200,600,600],
				"LV2":	[2240,1680,840,840],
				"LV3":	[3136,2352,1176,1176],
				"LV4":	[4390,3293,1646,1646],
				"LV5":	[6146,4610,2305,2305],
				"LV6":	[8605,6454,3227,3227],
				"LV7":	[11186,8390,4195,4195],
				"LV8":	[14542,10907,5453,5453],
				"LV9":	[18905,14179,7089,7089],
				"LV10":	[24577,18433,9216,9216],
				"LV11":	[31950,23963,11981,11981],
				"LV12":	[38340,28755,14378,14378],
				"LV13":	[46008,34506,17253,17253],
				"LV14":	[55210,41407,20704,20704],
				"LV15":	[66252,49689,24844,24844],
				"LV16":	[72877,54658,27329,27329],
				"LV17":	[80164,60123,30062,30062],
				"LV18":	[88181,66136,33068,33068],
				"LV19":	[96999,72749,36375,36375],
				"LV20":	[106699,80024,40012,40012],
			},
		},
		/*
			兵士作成
		*/
		"兵士作成" : {
			0 : 'select',
			'見習い闘士'    :['num',[ 10,  0, 10, 60]],
			'諜報闘士'    :['num',[150,150,150, 10]],
			'槍闘士'    :['num',[ 88,132,  0, 20]],
			'弓闘士'    :['num',[144,  0, 96, 35]],
			'強襲闘士'    :['num',[  0,128,192, 40]],
			'攻城闘士・突'    :['num',[500,  0,500,  0]],
			'矛槍闘士'  :['num',[264,396,  0, 60]],
			'弩闘士'    :['num',[432,  0,288,105]],
			'猛襲闘士':['num',[  0,384,576,120]],
			'隠密闘士':['num',[450,450,450, 30]],
			'攻城闘士・砲'  :['num',[  0,1500,1500, 0]],
		},
		/*
			研究
		*/
		"研究" : {
			0 : 'select',

			"--- 研究 ---" : {0:'hr'},

			"[研究] 槍闘士" :	[ 500,2500,1000, 350],
			"[研究] 弓闘士" :	[2500, 500,1000, 350],
			"[研究] 強襲闘士" :	[ 500, 350,2500,2500],
			"[研究] 諜報闘士" :	[3000,3000,3000, 500],
			"[研究] 攻城闘士・突" :	[28000,12000,28000,4000],
			"[研究] 隠密闘士":	[12000,12000,12000,2000],
			"[研究] 矛槍闘士" :	[205200,456000,319200,296400],
			"[研究] 弩闘士" :	[456000,205200,319200,296400],
			"[研究] 猛襲闘士":	[205200,319200,456000,296400],
			"[研究] 攻城闘士・砲" :	[414960,592800,414960,385320],

			"--- 武器研究 ---" : {0:'hr'},

			"[武器] 見習い闘士" : {0:'select',
				"LV1 竹刀":	[165,135,0,0],
				"LV2 バット":	[251,319,0,0],
				"LV3 双節棍":	[184,596,0,303],
				"LV4 木刀":	[351,994,0,604],
				"LV5 模造刀":	[431,828,2054,0],
				"LV6 トンファー":	[159,848,4294,0],
				"LV7 錆びた刀":	[1397,2301,4519,0],
				"LV8 日本刀":	[1019,4458,7260,0],
				"LV9 虎鉄「青紅」":	[0,11558,3572,5884],
				"LV10 妖刀村正「斬龍」":	[0,19648,6073,10003],
			},
			"[武器] 槍闘士" : {0:'select',
				"LV1 物干し竿":[1820,3575,0,1105],
				"LV2 薙刀":[3640,7150,0,2210],
				"LV3 鉄槍":[0,12870,6552,3978],
				"LV4 鉄槍・逸品":[0,21879,11138,6763],
				"LV5 双槍":[10820,35006,17821,0],
				"LV6 黒鉄槍":[16230,52510,26732,0],
				"LV7 鉄槍「開門」":[22722,73514,37425,0],
				"LV8 鋼槍「岩薙」":[30675,99243,50524,0],
				"LV9 鋼槍「星渦」":[39878,129016,65681,0],
				"LV10遊槍「夢紡」":[51841,167721,85385,0],
			},
			"[武器] 弓闘士" : {0:'select',
				"LV1 和弓":	[3795,0,1173,1932],
				"LV2 矢筒":	[7590,0,2346,3864],
				"LV3 本重籐":	[13662,0,6995,4223],
				"LV4 裏重籐":	[23225,0,11824,7179],
				"LV5 ハンティングボウ":	[37161,11486,18918,0],
				"LV6 巨弓「筒返し」":	[55741,17229,28377,0],
				"LV7 弓「雷砲」":	[78038,39728,24121,0],
				"LV8 弓「草隠」":	[105351,53633,32563,0],
				"LV9 大弓「雷電砲」":	[122015,49802,77193,0],
				"LV10 幻弓「烏号」":	[178043,55031,90640,0],
			},
			"[武器] 強襲闘士" : {0:'select',
				"LV1 模造刀":	[1241,2044,4015,0],
				"LV2 錆びた日本刀":	[2482,4088,8030,0],
				"LV3 青龍刀":	[4468,0,14454,7358],
				"LV4 カットラス":	[7595,0,24572,12509],
				"LV5 無銘二尺三寸":	[12152,0,39315,20015],
				"LV6 湘南ブレード":	[0,18228,58973,30022],
				"LV7 利刀「白樺」":	[0,42031,82562,25519],
				"LV8 宝刀「断蒙刀」":	[0,56742,111458,34451],
				"LV9 名刀「干将」":	[0,73765,144895,44786],
				"LV10 名刀「莫耶」":	[0,95894,188364,58222],
			},
			"[武器] 攻城闘士・突" : {0:'select',
				"LV1 棍":	[6600,2040,3360,0],
				"LV2 ハンマー":	[13200,4080,6720,0],
				"LV3 鎖分銅":	[23760,7344,12096,0],
				"LV4 モーニングスター":	[40392,12485,20536,0],
				"LV5 鉄鎚「古」":	[64627,19976,32901,0],
				"LV6 モーニングスター・改 	":	[96941,29964,49352,0],
				"LV7 鉄疾黎骨朶":	[135717,41949,69092,0],
				"LV8 鉄鎚アンビシャス":	[183218,56631,93274,0],
				"LV9 開山斧":	[238183,73620,121257,0],
				"LV10 如意金箍棒":	[359657,111167,183098,0],
			},
			"[武器] 矛槍闘士" : {0:'select',
				"LV1 鉄矛・乙 	":	[14000,27500,0,8500],
				"LV2 鉄矛・甲":	[28000,55000,0,17000],
				"LV3 双鉄矛":	[0,104500,53200,32300],
				"LV4 三日月戟":	[0,188100,95760,58140],
				"LV5 マイクロスライサー":	[98838,319770,162792,0],
				"LV6 方天戟":	[158141,511632,260467,0],
				"LV7 屈盧之矛":	[237211,767448,390701,0],
				"LV8 丈八蛇矛":	[332096,1074427,546981,0],
				"LV9 方天画戟":	[431724,1396755,711075,0],
				"LV10 青龍偃月刀「冷艶鋸」":	[647587,2095133,1066613,0],
			},
			"[武器] 弩闘士" : {0:'select',
				"LV1 和弓":	[30250,0,9350,15400],
				"LV2 矢筒":	[60500,0,18700,30800],
				"LV3 本重籐":	[114950,0,58520,35530],
				"LV4 裏重籐":	[206910,0,105336,63954],
				"LV5 ハンティングボウ 	":	[351747,108722,179071,0],
				"LV6 巨弓「筒返し」":	[562795,173955,286514,0],
				"LV7 弓「雷砲」":	[844193,429771,260932,0],
				"LV8 弓「草隠」":	[1181870,601679,365305,0],
				"LV9 大弓「雷電砲」":	[1368820,558702,865988,0],
				"LV10 幻弓「烏号」":	[2320010,717094,1181096,0],
			},
			"[武器] 猛襲闘士" : {0:'select',
				"LV1 鉄戟":	[10200,16800,33000,0],
				"LV2 黒鉄戟":	[20400,33600,66000,0],
				"LV3 ブレイヴアパッチ":	[38760,0,125400,63840],
				"LV4 鋼鉄槍":	[69768,0,225720,114912],
				"LV5 斬車槍":	[76745,0,488376,132559],
				"LV6 明鏡止水":	[0,189769,613958,312561],
				"LV7 夢槍":	[0,468841,920938,284653],
				"LV8 千鳥十文字":	[0,656377,1289313,398515],
				"LV9 涯角槍":	[0,853291,1676107,518069],
				"LV10 宝刀「百辟刀」":	[0,1279936,2514161,777104],
			},
			"[武器] 攻城闘士・砲" : {0:'select',
				"LV1 巨大岩":	[11050,35750,18200,0],
				"LV2 カタパルト・試作":	[22100,71500,36400,0],
				"LV3 The連弾":	[41990,135850,69160,0],
				"LV4 霹靂弾":	[75582,244530,124488,0],
				"LV5 カタパルト・虎式":	[128489,415701,211630,0],
				"LV6 3連グレネード":	[205583,665122,338607,0],
				"LV7 火炎連弾":	[308375,997682,507911,0],
				"LV8 呂尚式・火炎弾":	[431724,1396755,711075,0],
				"LV9 呂尚式・二連炎弾":	[561242,1815782,924398,0],
				"LV10 呂尚式・多段炎弾":	[729614,2360517,1201718,0],
			},

			"--- 防具研究 ---" : {0:'hr'},

			"[防具] 見習い闘士" : {0:'select',
				"LV1 体育館シューズ" : [149,122,0,0],
				"LV2 ジップ付きパーカー" : [228,285,0,0],
				"LV3 オープンフィンガーグローブ" : [168,534,0,273],
				"LV4 ローファー" : [310,900,0,544],
				"LV5 ショルダーガード" : [373,745,1864,0],
				"LV6 エルボーパッド" : [539,1431,2801,0],
				"LV7 ニーパッド" : [1265,2063,4067,0],
				"LV8 ヘッドギア" : [1949,6304,3209,0],
				"LV9 激レアスニーカー 	" : [0,10288,3253,5371],
				"LV10 ヘルメット 	" : [0,17683,5466,9002],
			},
			"[防具] 槍闘士" : {0:'select',
				"LV1 バンテージ" : [1638,3218,0,995],
				"LV2 鳥の籠手" : [3276,6435,0,1989],
				"LV3 防刃服" : [0,11583,5897,3580],
				"LV4 鉄のすね当て" : [0,19691,10025,6086],
				"LV5 鉢金" : [9738,31506,16039,0],
				"LV6 豪傑の胴当て" : [14607,47259,24059,0],
				"LV7 白虎の籠手" : [20450,66162,33683,0],
				"LV8 汎用小盾" : [27608,89319,45471,0],
				"LV9 サバイブ闘衣" : [35890,116115,59113,0],
				"LV10 鉢金・エリート" : [46657,150949,76847,0],
			},
			"[防具] 矛槍闘士" : {0:'select',
				"LV1 ジャージ・紫" : [12600,24750,0,7650],
				"LV2 携帯用小盾" : [25200,49500,0,15300],
				"LV3 白塗りの武力鎧" : [0,94050,47880,29070],
				"LV4 鎖帷子" : [0,169290,86184,52326],
				"LV5 漢軍の白鎧" : [88954,287793,146513,0],
				"LV6 軍神の重鎧" : [142327,460469,234420,0],
				"LV7 英布の重鎧" : [213490,690703,351631,0],
				"LV8 堯王の重鎧" : [298886,966984,492283,0],
				"LV9 堯王の白鎧" : [388552,1257080,639968,0],
				"LV10 伏羲の白銀鎧" : [545116,1762197,1121087,0],
			},
			"[防具] 弓闘士" : {0:'select',
				"LV1 ストーブの蓋" : [3416,0,1056,1739],
				"LV2 ビギナー用弓道袴" : [6831,0,2111,3478],
				"LV3 ビギナー用弓道衣" : [12296,0,6260,3801],
				"LV4 額当て" : [20903,0,10641,6461],
				"LV5 プロ用弓道袴" : [33445,10337,17026,0],
				"LV6 プロ用弓道衣" : [50167,15506,25540,0],
				"LV7 雄飛の帯" : [70234,35756,21709,0],
				"LV8 歩天歌の鏡" : [94816,48270,29307,0],
				"LV9 蜻蛉の指輪" : [108917,44822,70371,0],
				"LV10 飛将軍の兜" : [160238,49528,81576,0],
			},
			"[防具] 弩闘士" : {0:'select',
				"LV1 弓道袴・花紅" : [27225,0,8415,13860],
				"LV2 弓道衣・柳緑" : [54450,0,16830,27720],
				"LV3 射手のベルト" : [103455,0,52668,31977],
				"LV4 鳶目の籠手" : [186219,0,94802,57559],
				"LV5 紅赤マフラー" : [316572,97850,161164,0],
				"LV6 上等の弓道衣" : [506516,156559,257863,0],
				"LV7 心眼の首飾り" : [759774,386794,234839,0],
				"LV8 エイシアの胸当て" : [1063683,541511,328775,0],
				"LV9 舜王の青鎧" : [1221881,502832,789446,0],
				"LV10 女?の紺青鎧" : [2088009,645385,1062986,0],
			},
			"[防具] 強襲闘士" : {0:'select',
				"LV1 ウインドブレーカー" : [1117,1840,3614,0],
				"LV2 カジュアルジャケット" : [2234,3679,7227,0],
				"LV3 デニムパンツ" : [4021,0,13009,6623],
				"LV4 特攻服" : [6835,0,22115,11258],
				"LV5 スカジャン「虎」" : [10937,0,35384,18013],
				"LV6 レザーシューズ" : [0,16405,53075,27020],
				"LV7 スカジャン「龍」" : [0,37828,74305,22967],
				"LV8 ライダースジャケット" : [0,51068,100312,31006],
				"LV9 ビンテージパンツ" : [0,66388,130406,40307],
				"LV10 ビンテージジャケット 	" : [0,86305,169528,52399],
			},
			"[防具] 猛襲闘士" : {0:'select',
				"LV1 マウスピース" : [9180,15120,29700,0],
				"LV2 拳法着" : [18360,30240,59400,0],
				"LV3 バンテージ" : [34884,0,112860,57456],
				"LV4 カンフーシューズ" : [62791,0,203148,103421],
				"LV5 ヘッドギア" : [106745,0,345352,175815],
				"LV6 レガース" : [0,170792,552563,281305],
				"LV7 烏獲の籠手" : [0,421957,828844,256188],
				"LV8 武王の靴" : [0,590740,1160381,358663],
				"LV9 達人の帯" : [0,767962,1508496,466262],
				"LV10 剛闘気衣" : [0,1151943,2262744,699394],
			},
			"[防具] 諜報闘士" : {0:'select',
				"LV1 バックパック" : [1638,995,0,3218],
				"LV2 皮のグローブ" : [3276,1989,0,6435],
				"LV3 高級シャツ" : [6224,3779,0,12227],
				"LV4 伊達メガネ" : [0,6802,11204,22008],
				"LV5 ダークスーツ" : [0,11564,19047,37413],
				"LV6 レザーシューズ" : [0,18502,30475,59861],
				"LV7 モッズスーツ" : [27754,0,45712,89791],
				"LV8 サングラス" : [38855,0,63997,125708],
				"LV9 ミリタリーブーツ" : [50512,0,83916,163420],
				"LV10 ミリタリージャケット" : [65665,0,108154,212446],
			},
			"[防具] 隠密闘士" : {0:'select',
				"LV1 隠密制服" : [2240,1360,0,4400],
				"LV2 面頬" : [4480,2720,0,8800],
				"LV3 隠密シューズ" : [8512,5168,0,16720],
				"LV4 忍手甲" : [0,9302,15322,30096],
				"LV5 隠密服・翡翠" : [0,15814,26047,51163],
				"LV6 隠密服・那智黒石" : [0,25302,41675,81861],
				"LV7 上忍の面頬" : [37954,0,62512,122791],
				"LV8 隠密服・特上" : [53135,0,87517,171908],
				"LV9 隠密服・柘榴石" : [69076,0,113772,223480],
				"LV10 隠密服・光学迷彩" : [104304,0,171795,337455],
			},
			"[防具] 攻城闘士・突" : {0:'select',
				"LV1 合皮の手袋" : [5940,1836,3024,0],
				"LV2 ハイテクスニーカー" : [11880,3672,6048,0],
				"LV3 竹の壁" : [21384,6610,10886,0],
				"LV4 木の城壁" : [36353,11236,18507,0],
				"LV5 石の城壁" : [58164,17978,29611,0],
				"LV6 鉄格子" : [87247,26967,44417,0],
				"LV7 バリケード一層" : [122145,37754,62183,0],
				"LV8 武力盾" : [164896,50968,83947,0],
				"LV9 暁の小盾" : [214365,66258,109131,0],
				"LV10 バリケード二層" : [63561,198334,326634,0],
			},
			"[防具] 攻城闘士・砲" : {0:'select',
				"LV1 ボロの砲台" : [9945,32175,16380,0],
				"LV2 木砲台" : [19890,64350,32760,0],
				"LV3 石砲台" : [37791,122265,62244,0],
				"LV4 耐熱バリケード" : [68024,220077,112039,0],
				"LV5 虎砲台" : [115640,374131,190467,0],
				"LV6 鋼鉄虎砲台" : [185025,598609,304747,0],
				"LV7 気功砲台" : [277537,897914,457120,0],
				"LV8 闘気砲台" : [388552,1257080,639968,0],
				"LV9 超闘気砲台" : [505118,1634204,831958,0],
				"LV10 真闘気砲台" : [656653,2124465,1081546,0],
			},
		}
	};
/*
	初期化
*/
function initMarketCostView() {

	/*
		施設名とレベルの一部から正式名を探し、データ作成
	*/
	var func = function( kind1, kind2, lv ) {
		for(var i in marketCostView_CostData[kind1]) {
			var reg = new RegExp(kind2,'');
			if(i.match(reg)) {
				if(typeof lv == 'undefined') 	return [kind1,i]
				var lastlv = 0;
				for(var j in marketCostView_CostData[kind1][i]) {
					if(j.match(/LV(\d+)/)) {
						if(parseInt(RegExp.$1,10) == lv) {
							return [kind1,i,j];
						}
						lastlv = [kind1,i,j];
					}
				}
				return lastlv;
			}
		}
		return null;
	};

	// コストをダブルクリックすると、登録
	if(ETCS_OPTION['MarketCostViewDblClick']) {
	var costnode = getNodeXPath('//*[contains(@class,"cost")]');
	if(costnode.length > 0) {
		costnode.forEach( function( node ) {
			(function( lnode ) {
				lnode.addEventListener('dblclick',function( event ) {
					var tnode = getNodeXPath('preceding::th[contains(@class,"mainTtl")]',lnode);	//自分より前のタイトル検索
					if(tnode.length > 0) {
						var save = [];
						if(tnode[tnode.length-1].textContent.match(/^\s*(.+?)\s+レベル(\d+)(\s|$)/m)) {
							// 施設の時
							var node = getNodeXPath('preceding-sibling::th[contains(text(),"建設にかかるコスト")]',lnode);
							var name = RegExp.$1;
							if(node[0].textContent.match(/レベル.+?(\d+)/)) {
								save = func('施設建設',name,parseInt(RegExp.$1,10));
							}
						} else if(tnode[tnode.length-1].textContent.match(/^\s*(.+?)(\s|$)/m)) {
							var sol    = RegExp.$1;
							var h2node = document.getElementsByTagName('h2');
							if(typeof h2node != 'undefined') {
								if(h2node[0].textContent.match(/鍛冶場・武具/)) {
									//武器研究
									var node = getNodeXPath('preceding::td[preceding-sibling::th[contains(text(),"現在の武器")]]',lnode);
									if(node[node.length-1].textContent.match(/.*?レベル\s*(\d+)\s*(.+?)(\s|$)/)) {

										save = func('研究','武器.+'+sol,(parseInt(RegExp.$1,10)+1));
									}
								} else if(h2node[0].textContent.match(/鍛冶場・防具/)) {
									//防具研究
									var node = getNodeXPath('preceding::td[preceding-sibling::th[contains(text(),"現在の防具")]]',lnode);
									if(node[node.length-1].textContent.match(/.*?レベル\s*(\d+)\s*(.+?)(\s|$)/)) {
										save = func('研究','防具.+'+sol,(parseInt(RegExp.$1,10)+1));
									}
								} else if(h2node[0].textContent.match(/闘術研究所/)) {
									// 兵種研究
									save = func('研究','研究.+'+sol);
								} else if(h2node[0].textContent.match(/施設を選ぶ/)) {
									// 施設の新規建設
									save = func('施設建設',sol,1);
								} else {
									// 兵士作成
									save = func('兵士作成',sol);
									var node = getNodeXPath('following::td[preceding-sibling::th[contains(text(),"作成する")]]/form/input[contains(@id,"unit_value")]',lnode);
									var num = parseInt(node[0].value,10);
									if(isNaN(num)) num = 1;
									save[save.length] = num;

								}
							}
						}
						if(save.length > 0) {
							var text = save[0] + "『"+save[1] + (typeof save[2] != 'undefined' ? save[2] : '')+"』";
							if(confirm(text+'をコストビューに設定しますがよろしいですか？')) {
								GM_setValue(SAVE_NAME+'MarketCostViewSelect',save.join('\t'));
							}
						}
					} else if(location.pathname == '/facility/unit_confirm.php') {
						// 兵士作成確認画面
						var num = 0,name = '';
						var node = getNodeXPath('preceding-sibling::th',lnode);
						if(node.length > 0) {
							if(node[0].textContent.match(/(\d+)((体当たりの)|(体作成に))/)) {
								num = parseInt(RegExp.$1,10)
							}
						}
						node = getNodeXPath('//form[@name="dataForm"]/div',lnode);
						if(node.length > 0) {
							if(node[0].textContent.match(/^\s*(.+)を\d+体作成/)) {
								name = RegExp.$1;
							}
						}
						var save = func('兵士作成',name);
						save[save.length] = num;
						if(save.length > 0) {
							var text = save[0] + "『"+save[1] + (typeof save[2] != 'undefined' ? save[2] : '')+"』";
							if(confirm(text+'をコストビューに設定しますがよろしいですか？')) {
								GM_setValue(SAVE_NAME+'MarketCostViewSelect',save.join('\t'));
							}
						}

					}
				},false);
			})(node)
		});
	}
	}
	if(location.pathname != "/facility/facility.php") return;	// 施設でない

	// 制御用変数
	var procArg = {
		'event'   : [],		// イベントリスナ等を格納
		'timerID' : -1,		// 更新タイマー
		'need'    : null,	// 必要な資源量の基本ノード
		'excess'  : null,	// 過不足の基本ノード
		'excessall':null,	// 過不足の合計
		'buy'     : null,	// 不足量を購入するための必要な他資源の量
		'buyall'  : null,   // 必要な他資源の合計
	};
	var baseID = 'etcs_costview';

	var node = document.querySelector('#gray02Wrapper h2');
	if(node == null) return;		// h2が無い
	if(!node.textContent.match(/フリーマーケット/)) return;	// フリーマーケットで無い

	var baseNode  = document.createElement('div');	// base
	baseNode.setAttribute('id',baseID);
	baseNode.style.cssText = 'padding:0;';

	node = baseNode.appendChild(document.createElement('div'));
	node.style.cssText = 'background: none repeat scroll 0 0 #cccccc;'+
		'border-bottom:1px solid #000000; color:#000000; padding:5px; word-wrap:break-word; text-align:center; margin-bottom:1em;';
	node.appendChild(document.createTextNode('コストビュー'));


	var deep = 0;	// 階層
	procArg['event'][procArg['event'].length] = null;	// イベントリスナリスト初期化

	// カテゴリの中身を表示部分
	var costViewNode = document.createElement('div');
	costViewNode.setAttribute('id',baseID+'_cate');
	costViewNode.style.width  = '100%';
	costViewNode.style.margin = '0 150px';
	costViewNode.textContent = '種類を選択　';
	baseNode.appendChild(costViewNode);


	// 表の作成
		var textNode = baseNode.appendChild(document.createElement('div'));
		textNode.setAttribute('id',baseID+'_table');
		textNode.innerHTML =
			'<table class="etcs_market_table"><thead>'+
			'<tr><th></th><th>学力</th><th>体力</th><th>武力</th><th>糧</th></tr>'+
			'</thead><tbody>'+
			'<tr><th>必要な資源の量</th><td>---</td><td>---</td><td>---</td><td>---</td></tr>'+
			'<tr><th>過不足<br/><span style="font-size:80%">(現在量－必要量)</span></th><td>---</td><td>---</td><td>---</td><td>---</td></tr>'+
			'<tr><th>過分・不足合計</th><td colspan="4">---</td></tr>'+
			'<tr><th>不足量を購入するための<br/>必要な他資源の量</th><td>---</td><td>---</td><td>---</td><td>---</td></tr>'+
			'<tr><th>必要な他資源の合計<br/><span style="font-size:80%;">(購入に必要な資源量)</span></th><td colspan="4">---</td></tr>'+
			(ETCS_OPTION['MarketCostViewCalcFullTime'] ? '<tr><th>貯蓄完了予想時間</th><td colspan="4">--</td></tr>' : '') +
			'</tbody></table>';

	// 作成した物をHTMLに追加
	node = document.querySelector('#gray02Wrapper');
	node.appendChild(baseNode);

	var trNode = document.getElementById(baseID+'_table').getElementsByTagName('tr');
	procArg['need']      = trNode[1];
	procArg['excess']    = trNode[2];
	procArg['excessall'] = trNode[3];
	procArg['buy']       = trNode[4];
	procArg['buyall']    = trNode[5];



	makeMarketCostView(baseID, marketCostView_CostData, deep, procArg);

}
/*
	選択肢を作成し表示
*/
function makeMarketCostView( baseID, data , deep , procArg) {

	var i;
	var insposNode = document.getElementById(baseID+'_cate');
	var node       = document.getElementById(baseID+'_select'+deep);

	// 自分より階層の深いノードとイベントリスナを削除
	if(node != null) {

		// 更新タイマーを停止(念のため)
		if(procArg['timerID'] != -1) {
			clearTimeout( procArg['timerID'] );
			procArg['timerID'] = -1;
		}

		// イベントリスナを削除
		for(i = procArg['event'].length - 1;i >= deep ; i--) {
			if(typeof procArg['event'][i] != 'undefined') {
				for(j = 0;j < procArg['event'][i].length; j++) {
					procArg['event'][i][j][1].removeEventListener(
								procArg['event'][i][j][0],procArg['event'][i][j][2],false);
					delete(procArg['event'][i][j]);
				}
			}
			delete(procArg['event'][i]);
		}
		// ノードを削除
		var range = document.createRange();
		range.selectNodeContents(insposNode);
		range.setStartBefore(node);
		range.deleteContents();
		range.detach();
	}


	// 内容物を指示に従って生成
	procArg['event'][deep] = [];	// 現在の階層のイベントリスと初期化
	var nowSelect = retSaveMarketCostView(deep);
	// ドロップダウンで選択する
	if(data[0] == 'select') {

		// select/option要素作成
		var selectNode = insposNode.appendChild(document.createElement('select'));
		selectNode.setAttribute('id',baseID+'_select' + deep);
		for(j in data) {
			if(j == 0) continue;	// 識別は無視

			node = document.createElement('option');
			node.appendChild(document.createTextNode(j));
			selectNode.appendChild(node);
			if(j == nowSelect) {
				selectNode.selectedIndex = selectNode.length - 1;
			}
		}
		selSaveMarketCostView(deep,selectNode.options[selectNode.options.selectedIndex].text);

		// イベント発生時
		(function( lselectNode, ldeep ){
			var func = function() {
				var select = lselectNode.options[lselectNode.options.selectedIndex].text;

				selSaveMarketCostView(ldeep, select);			// 現在の階層を保存
				delSaveMarketCostView(baseID, deep + 1);				// 次の階層以下の未使用を削除

				// 更新タイマーを停止
				if(procArg['timerID'] != -1) {
					clearTimeout( procArg['timerID'] );
					procArg['timerID'] = -1;
				}
				node = document.querySelectorAll('#'+baseID+'_table table tbody td');
				for(i = 0;i < node.length;i++) {
					node[i].textContent = '---';
					node[i].style.color = '#000000';
				}
				makeMarketCostView(baseID, data[select] , (ldeep + 1), procArg);
			}
			procArg['event'][deep][procArg['event'][ldeep].length] = ['change',selectNode,func];	// 保存
			selectNode.addEventListener('change',func,false);	// 選択されたとき
			func();					// 作成されたとき(load)

		})(selectNode,deep);

	}
	// 区切り線
	else if(data[0] == 'hr') {
	}
	// 人数入力
	else if(data[0] == 'num') {

		// 人数入力欄作成
		var inputNode = insposNode.appendChild(document.createElement('input'));
		inputNode.setAttribute('id',baseID+'_select'+deep);
		inputNode.setAttribute('type','text');
		inputNode.setAttribute('size','5');
		inputNode.setAttribute('maxlength','5');
		if(typeof nowSelect != 'undefined' && !isNaN(nowSelect)) {
			inputNode.value = nowSelect;
		} else {
			inputNode.value = 1;
		}
		insposNode.appendChild(document.createTextNode('人'));

		viewSolderMarketCostView( baseID+'_table', data[1], parseInt(inputNode.value,10), procArg);

		// イベント発生時
		(function( lNode ){

			var func = function() {
				// タイマー止める
				if(procArg['timerID'] != -1) {
					clearTimeout(procArg['timerID']);
					procArg['timerID'] = -1;
				}
				// 数値を保存
				selSaveMarketCostView(deep,parseInt(lNode.value,10));
				// 数値から計算結果を表示
				viewSolderMarketCostView( baseID+'_table', data[1], parseInt(lNode.value,10) , procArg);
			}
			// イベントを付加・保存
			procArg['event'][deep][procArg['event'][deep].length] = ['keyup',lNode,func];	// 保存
			inputNode.addEventListener('keyup',func,false);
			if(typeof nowSelect != 'undefined')  func();		// 作成されたとき(load)
		})(inputNode);

	// 数値を表示
	} else if(typeof data[0] == 'number') {
		viewMarketCostView( baseID+'_table', data, procArg);
	}
}
/*
	必要資源量などの数値の表示
*/
function viewMarketCostView( id, data ,procArg) {

	var trNode = document.getElementById(id).getElementsByTagName('tr');
	if(trNode.length == 0) return;

	var stockName = ['wood', 'stone', 'iron', 'rice' ];
	var stock     = [];
	// 現在の資源の値
	for(i =0;i < stockName.length;i++) {
		stock[i] = parseInt(document.getElementById(stockName[i]).firstChild.nodeValue);
	}
	var convPer = getMarketConvPer();

	var shortage = 0;	// 不足
	var generous = 0;	// 過分
	var short_cv = 0;	// 不足変換後
	// 必要量
	var tdNode = trNode[1].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		tdNode[i].textContent = parseInt(data[i],10);
	}
	// 過不足
	tdNode = trNode[2].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		tdNode[i].textContent = stock[i] - parseInt(data[i],10);
		tdNode[i].style.color = stock[i] >= parseInt(data[i],10) ? "#000000" : "#ff0000";
	}
	// 不足の合計
	tdNode = trNode[3].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		if(stock[i] < parseInt(data[i],10)) {
			shortage += stock[i] - parseInt(data[i],10);
		} else {
			generous += stock[i] - parseInt(data[i],10);
		}
	}
	tdNode[0].textContent = '過分:'+ generous +'　不足:'+ shortage;

	// 不足分を売り出す量
	tdNode = trNode[4].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		tdNode[i].textContent = stock[i] >= parseInt(data[i],10) ? "---"
									: Math.ceil(((parseInt(data[i],10) - stock[i]) * 100 )/ convPer);
	}

	// 不足分を売り出す量の合計
	tdNode = trNode[5].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		if(stock[i] < parseInt(data[i],10)) {
			short_cv += Math.ceil(((parseInt(data[i],10) - stock[i]) * 100 )/ convPer);
		}
	}
	if(short_cv > generous) {
		tdNode[0].textContent = short_cv +' (あと'+ (short_cv - generous) + '必要)';
	} else {
		if(short_cv == 0) {
			tdNode[0].textContent = short_cv +' (そのままで研究・作成できます)';
		} else {
			tdNode[0].textContent = short_cv +' (売買で研究・作成できます)';
		}
	}

	if(ETCS_OPTION['MarketCostViewCalcFullTime']) {
		tdNode = trNode[6].getElementsByTagName('td');
		var endTime = calcFullTime(
			stock, [
				parseInt(document.getElementById('output_wood') .textContent,10),
				parseInt(document.getElementById('output_stone').textContent,10),
				parseInt(document.getElementById('output_iron') .textContent,10),
				parseInt(document.getElementById('output_rice') .textContent,10)
			], data
		);
		tdNode[0].textContent = makeDateString(new Date(getNowTime().getTime() + endTime))+ "頃";
	}

	if(procArg['timerID'] != -1) {
		clearTimeout(procArg['timerID']);
		procArg['timerID'] = -1;
	}

	procArg['timerID'] = setTimeout(function() {
		viewMarketCostView( id, data, procArg );
	},500);
}
/*
	兵士の必要資源量の表示
*/
function viewSolderMarketCostView( id, data, solNum, procArg) {
	var trNode = document.getElementById(id).getElementsByTagName('tr');
	if(trNode.length == 0) return;

	var stockName = ['wood', 'stone', 'iron', 'rice' ];
	var stock     = [];
	var price     = [];
	var discount  = solNum < 5 ? 100 :
					solNum < 10 ? 98 :
					solNum < 20 ? 96 :
					solNum < 50 ? 94 :
					solNum < 100 ? 92 : 90;		// 割引後率
	var shortage = 0;	// 不足
	var generous = 0;	// 過分
	var short_cv = 0;	// 不足変換後

	// 現在の資源の値
	for(i =0;i < 4;i++) {
		stock[i] = parseInt(document.getElementById(stockName[i]).firstChild.nodeValue);
		price[i] = Math.round((parseInt(data[i],10) * discount) / 100) * solNum;
	}
	// 必要量
	var tdNode = trNode[1].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		tdNode[i].textContent = price[i];
	}
	// 過不足
	tdNode = trNode[2].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		tdNode[i].textContent = stock[i] - price[i];
		tdNode[i].style.color = stock[i] >= price[i] ? "#000000" : "#ff0000";
	}
	// 不足合計
	tdNode = trNode[3].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		if(stock[i] < price[i]) {
			shortage += stock[i] - price[i];
		} else {
			generous += stock[i] - price[i];
		}
	}
	tdNode[0].textContent = '過分:'+ generous +'　不足:'+ shortage;


	// 売り出す量
	tdNode = trNode[4].getElementsByTagName('td');
	for(i = 0;i < 4;i++) {
		tdNode[i].textContent = stock[i] >= price[i] ? "---" : Math.ceil(((price[i] - stock[i]) * 100)/convPer);
	}
	// 不足分を売り出す量の合計
	tdNode = trNode[5].getElementsByTagName('td');
	for(i = 0,sum=0;i < 4;i++) {
		if(stock[i] < price[i]) {
			short_cv += Math.ceil(((price[i] - stock[i]) * 100 )/ convPer);
		}
	}
	tdNode[0].textContent = sum;
	if(short_cv > generous) {
		tdNode[0].textContent = short_cv +' (あと'+ (short_cv - generous) + '必要)';
	} else {
		if(short_cv == 0) {
			tdNode[0].textContent = short_cv +' (そのままで研究・作成できます)';
		} else {
			tdNode[0].textContent = short_cv +' (売買で研究・作成できます)';
		}
	}

	if(ETCS_OPTION['MarketCostViewCalcFullTime']) {
		tdNode = trNode[6].getElementsByTagName('td');
		var endTime = calcFullTime(
			stock, [
				parseInt(document.getElementById('output_wood') .textContent,10),
				parseInt(document.getElementById('output_stone').textContent,10),
				parseInt(document.getElementById('output_iron') .textContent,10),
				parseInt(document.getElementById('output_rice') .textContent,10)
			], price
		);
		tdNode[0].textContent = makeDateString(new Date(getNowTime().getTime() + endTime))+ "頃";
	}


	if(procArg['timerID'] != -1) {
		clearTimeout(procArg['timerID']);
		procArg['timerID'] = -1;
	}

	procArg['timerID'] = setTimeout(function() {
		viewSolderMarketCostView( id, data, solNum, procArg);
	},500);
}
/*
	現在選択中を保存
*/
function selSaveMarketCostView( deep , selectText ) {

	var selSave = GM_getValue(SAVE_NAME+'MarketCostViewSelect','').split(/\t/);

	if(selSave.length == 1 && selSave[0] == '') selSave = [];		// 空の時は初期化

	selSave[deep] = selectText;

	GM_setValue(SAVE_NAME+'MarketCostViewSelect',selSave.join('\t'));

	//console.log("SAVE:"+selSave.join('/')+" [add]"+selectText + "[deep]"+deep);
}
/*
	現在より深い階層を削除
*/
function delSaveMarketCostView(baseID, deep) {

	// 現在より深い階層のIDが無ければ削除しない(LOAD)
	var node = document.getElementById(baseID+'_select' + deep);
	if(node == null) return;

	var selSave = GM_getValue(SAVE_NAME+'MarketCostViewSelect','').split(/\t/);
	var selNew  = [];
	// 現在以下の階層は削除
	for(i = 0;i < deep;i++) {
		selNew[selNew.length] = selSave[i];
	}
	GM_setValue(SAVE_NAME+'MarketCostViewSelect',selNew.join('\t'));
	//console.log("load:"+selNew.join('/')+ "[deep]"+deep);

}


/*
	保存した選択中を返す
*/
function retSaveMarketCostView( deep ) {
	var selSave = GM_getValue(SAVE_NAME+'MarketCostViewSelect','').split(/\t/);
	if(selSave.length == 1 && selSave[0] == '') selSave = [];		// 空の時は初期化

	return(selSave[deep]);
}
/*
	サイドバーに追加
*/
function Sidebar_MarketCostView() {

	var imgData = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAS5JREFU'+
		'KM/d0L9L1HEAxvHX53vC2X0vt4YaGqLFLkuQHHK6xb7S1BBOQoLQH+Bif4LRkiAuDtF/4KB3'+
		'6CAERUhhP7BTENTpEBeR+2oH+v06HQQO4eDiMz/v5+F5uP4KlyZWRIiuoHFVt9gtqQNVf/8P'+
		'riqLPVLwXGRQZs2ZRalfqloXwR9iZwbkhgWJ9aVeWbFEOFYZazi9WVfarGn5qaoVfHFDUb/g'+
		'pSCx9fae5qsi6Nqn3ODkPndnjt3+0JCry9WCrwYUvFYwKujxaYfCIXmR7qZy+8jTvc+eNd+Z'+
		'nAQHMgvBNyW5xyIJEjtvKu58jO1OmVib9X5uU6kN0vDdBp3Gfzee6hOMIBFU2k/E0+PSh9s2'+
		'5l+oLw2p6fJbv/Tiq52AyLDMA5E/MssdoGM7BzjCXjturiMhAAAAAElFTkSuQmCC';

	var bodyNode,inputNode;
	var stockData = ['学力','体力','武力','糧'];

	bodyNode = document.createElement('div');

	// 制御用変数
	var procArg = {
		'event'   : [],		// イベントリスナ等を格納
		'timerID' : -1,		// 更新タイマー
	};
	var baseID = 'etcs_sidebar_costview';

	var bodyNode  = document.createElement('div');	// base
	bodyNode.setAttribute('id',baseID);


	var deep = 0;	// 階層
	procArg['event'][procArg['event'].length] = null;	// イベントリスナリスト初期化

	// カテゴリの中身を表示部分
	var costViewNode = document.createElement('div');
	costViewNode.setAttribute('id',baseID+'_cate');
	costViewNode.textContent = '種類を選択';
	bodyNode.appendChild(costViewNode);


	// 表の作成
	var textNode = bodyNode.appendChild(document.createElement('div'));
	textNode.setAttribute('id',baseID+'_table');
	var Ulnode = textNode.appendChild(document.createElement('ul'));
	for(i in stockData) {
		var liNode = Ulnode.appendChild(document.createElement('li'));
		liNode.innerHTML = stockData[i];
	}
	BaseSidebarBlock('コスト表示',bodyNode,imgData);

//	makeMarketCostView(baseID, marketCostView_CostData, deep, procArg);

}
/*
	現在資源量・増加量・目標値から、時間を計算
*/
function calcFullTime( now, inc, target ) {

	var i,j,k;
	var order  = [0,1,2,3];
	var order2 = [];
	var data   = [{},{},{},{}];
	var time   = 0;
	var convPer = getMarketConvPer();

var str = "";

	var yojou = 0;
	var fusoku= 0;
	for(i = 0;i < 4;i++) {
		data[i]['no']     = i;
		data[i]['now']    = now[i];
		data[i]['inc']    = inc[i];
		data[i]['incOrg'] = inc[i];
		data[i]['target'] = target[i];
		data[i]['time']   = ((target[i] - now[i])) / inc[i];
	}

	for(i = 0;i < 4;i++) {
		// 貯まる順番に並び替え
		data = data.sort(function( a, b ) {
			return(a['time'] - b['time']);
		});

		// 貯まったら余剰を算出
		var yojou     = 0;
		var yojou_inc = 0;
		for(j = 0;j < 4;j++) {
			if((data[j]['now'] - data[j]['target']) >= 0) {
				yojou     += data[j]['now'] - data[j]['target'];
				yojou_inc += data[j]['incOrg'];
				data[j]['now'] = data[j]['target'];
				data[j]['inc'] = 0;
			}
		}

		// 足りないところに振り分け
		yojou     = (yojou     * convPer)/100;
		yojou_inc = (yojou_inc * convPer)/100;
//str += "I:"+i+" NO:"+data[i]['no']+" 余剰:"+yojou+" 余剰INC:"+yojou_inc+"<br/>";
		for(j = 0;j < 4;j++){
			if(data[j]['now'] - data[j]['target'] < 0) {
				data[j]['now'] += yojou;
				yojou = 0;
				// 穴埋めしても余ったら次へ
				if(data[j]['now'] >= data[j]['target']) {
					yojou          = data[j]['now'] - data[j]['target'];
					data[j]['now'] = data[j]['target'];
					yojou_inc     += data[j]['incOrg'];
					data[j]['inc'] = 0;
				} else {
					data[j]['inc'] += yojou_inc;
str += "I:"+i+" NO:"+data[i]['no']+" INC:"+data[j]['inc']+"<br>";
					break;	// 余らなかったら終わり
				}
			}
		}

		// 貯まった時間まで移動
		for(j = 0;j < 4;j++) {
			if(data[j]['inc'] != 0) {
				data[j]['time'] = ((data[j]['target'] - data[j]['now'])) / data[j]['inc'];
				if(data[j]['time'] > 0) {
					data[j]['now'] += (data[j]['inc'] * data[i]['time']);
				}
			} else {
				data[j]['time'] = 0;
			}
		}
		time += data[i]['time'];

		str += "i:"+i+" NO:"+data[i]['no']+" time:"+parseInt(data[i]['time']*3600000) +"/"+parseInt(time*3600000)+" DATE:"+ makeDateString(new Date(getNowTime().getTime() + time*3600000))+"<br/>";
	}
/*
	var node = document.getElementById("debug");
	if(node == undefined) {
		node = document.createElement('div');
		document.querySelector('#gray02Wrapper').appendChild(node);
	}
	node.setAttribute("id","debug");
	node.innerHTML = str;
*/
	return time*60*60*1000;

}
//======================================
//  class=costにtooltipで足りるか表示
//======================================
function checkClassCost() {

	// ツールチップ表示部分
	var costnode = getNodeXPath('//*[contains(@class,"cost")]');
	if(costnode.length > 0) {
		costnode.forEach( function( lnode ) {
			// 表示
			lnode.addEventListener('mouseover',function( event ) {
				var text = lnode.textContent.replace(/\r|\n/gm,'');
				if(text.match(/学力\s+(\d+).+?体力\s+(\d+).+?武力\s+(\d+).+?糧\s+(\d+)/)) {

					var idlist   = ['wood','stone','iron','rice'];
					var namelist = ['学力','体力','武力','糧'];

					// 必要
					var need  = [RegExp.$1,RegExp.$2,RegExp.$3,RegExp.$4];
					var stock = [];
					var stockAll = 0;
					for(var i = 0;i < 4;i++) {
						stock[i] = parseInt(document.getElementById(idlist[i]) .textContent,10);
					}

					var convPer = ETCS_OPTION['checkClassCostPer'];
					var chk     = [];
					var nStock  = 0;
					for(var i = 0;i < 4;i++) {
						chk[i]  = Math.ceil(((need[i] - stock[i]) * 100 )/ convPer);
					}
					var str = '';
					var cnt = 0;
					for(var i = 0;i < 4;i++) {
						if(need[i] > stock[i]) {
							str    += namelist[i] + ':<span style="color:#ff0000;">不足' +(need[i]-stock[i])+'('+chk[i]+')</span><br/>';
							nStock += chk[i];
						} else {
							str      += namelist[i] + ':余り'+(stock[i]-need[i])+'<br/>';
							stockAll += stock[i] - need[i];
							cnt++;
						}
					}
					str = (cnt == 4 ? '【実行可能】': (stockAll >= nStock ? "【売買必要】" : '【不足】')+ '(相場 '+convPer+'%)') +'<br/>'+str;
					setToolTipCore(event, lnode,str);
				}
			},false);
		});
	}

	// フリーマーケット簡易登録部分
	if(location.pathname == '/facility/facility.php') {

			var node = document.querySelector('#gray02Wrapper h2');
			if((node == null) || !node.textContent.match(/フリーマーケット/)) return;	// フリーマーケットで無い
			var tdnode = getNodeXPath('//form[@name="form1"]//td[preceding-sibling::th[normalize-space(text()) = "フリーマーケットの取引相場"]]')[0];
			if(typeof tdnode == 'undefined') return;

			node = tdnode.appendChild(document.createElement('input'));
			node.setAttribute('value','登録');
			node.setAttribute('type', 'button');
			node.setAttribute('title','コスト欄のツールチップで使用する相場を登録します');
			node.style.cssText = 'float:right; margin:0;padding:0; border:none;'+
								' background:none; cursor:pointer;text-decoration:underline; color:blue;';
			node.addEventListener('click', function() {

				var percent = getMarketConvPer();
				if(percent == null) return;

				GM_setValue(SAVE_NAME+"SETTING_checkClassCostPer",percent);
				ETCS_OPTION['checkClassCostPer'] = percent;
				alert('コスト欄のツールチップで使用する相場を'+percent+'%で登録しました');
			},false);
	}
}
//================================
//   販売ボタン表示
//================================
function MarketStockPreset() {

	// 処理する場所かチェック
	if(location.pathname != "/facility/facility.php") return;	// 施設?
	var result = getNodeXPath('//div[@id="gray02Wrapper"]/h2/text()')[0];
	if(result.nodeValue != "フリーマーケット") return;

	// 資源の名前変換表
	var StockName = {101:"学",102:"体",103:"武",104:"糧"};
	var StockId   = {101:"wood",102:"stone",103:"iron",104:"rice"};
	var StockNo   = {101:0,102:1,103:2,104:3};

	// デフォルト定義
	// 種類(0:通常 1:拡張),0プリセット/1ユーザー定義,売り資源, 買い資源,量
	var defaultData = [
		[0,1,104,101,50000],	// 糧　学 50,000
		[0,1,104,102,50000],	// 糧　体 50,000
		[0,1,104,103,50000],	// 糧　武 50,000
		[0,1,104,101,100000],	// 糧　学 100,000
		[0,1,104,102,100000],	// 糧　体 100,000
		[0,1,104,103,100000],	// 糧　武 100,000
		[0,1,104,101,-50000],	// 糧　学
		[0,1,104,102,-50000],	// 糧　体
		[0,1,104,103,-50000],	// 糧　武
		[0,1,104,101,"ALL"],	// 糧　学 MAX
		[0,1,104,102,"ALL"],	// 糧　体 MAX
		[0,1,104,103,"ALL"],	// 糧　武 MAX
	];

	// データ格納先
	var defData = [
		[ 0, 0, -1, -1,"---未選択---"],
	];

	// OPTIONの登録関数
	var makeOptFunc = function( node, data ) {

		if(data[2] == -1 && data[3] == -1 && data[1] == 0) {
			node.appendChild(document.createTextNode((data[4]).toString()));
		} else {
			var num = data[4];
			if(num < 0) num = Math.abs(num)+"を残す";
			else if(num == 'ALL') num = "全て";

			node.appendChild(document.createTextNode(
				(data[2] == -1 ? '未設定' : StockName[data[2]])
				+"→"+
				(data[3] == -1 ? '未設定' : StockName[data[3]])
				+"("+ num +")"));
		}
	}

	// 配列に挿入
	var saveBuf = loadArray('defSellButton');
	if(saveBuf != null) {
		var tmp = defData.concat();	// コピー
		defData = tmp.slice(0,1);
		defData = defData.concat(saveBuf);
		defData = defData.concat(tmp.slice(1));
	} else {
		// ユーザー定義が保存されていなかったら、デフォルト
		defData = defData.concat(defaultData);
	}

	// 基本作成
	var baseNode = document.getElementById('gray02Wrapper').appendChild(document.createElement('div'));
	baseNode.setAttribute('id',"etcs_stockPreset");
	var node     = baseNode.appendChild(document.createElement('h3'));
	node.textContent = '資源プリセット';

	// セレクト作成
	var selectNode = baseNode.appendChild(document.createElement('select'));
	// 登録
	for(var i = 0;i < defData.length; i++) {
		var optionNode = document.createElement('option');
		makeOptFunc( optionNode, defData[i] );
		optionNode.value = i;
		selectNode.add(optionNode);
	}
	// セレクト選択時動作
	selectNode.addEventListener('change',function() {

		var selIdx      = selectNode.selectedIndex;
		var formSelNode = getNodeXPath('//form[@name="form2"]/table//td[table]//select');
		var formInpNode = getNodeXPath('//form[@name="form2"]/table//td[table]//input')[0];

		for(var j = 0;j < 2; j++) {
			for(var k = 0;k < formSelNode[j].options.length; k++) {
				if(formSelNode[j].options[k].value == defData[selIdx][j+2]) {
					formSelNode[j].selectedIndex = k;

					// 最大値を表示させるために、イベントを送出
					if(j == 2) {
						var event = document.createEvent("MouseEvents");
						event.initEvent("change",false,true);
						formSelNode[j].dispatchEvent(event);
					}
				}
			}
		}

		//数値入力
		if(defData[selIdx][4] == 'ALL' && defData[selIdx][2] != -1) {	// 全て
			formInpNode.value = document.getElementById(StockId[defData[selIdx][2]]).textContent;

		} else	if(defData[selIdx][4] < 0 && defData[selIdx][2] != -1) {	// 残す
			var num = parseInt(document.getElementById(StockId[defData[selIdx][2]]).textContent,10) + parseInt(defData[selIdx][4],10);
			num = num < 0 ? 0 : num;
			formInpNode.value = num;

		} else	if(!isNaN(defData[selIdx][4])) {
			formInpNode.value = defData[selIdx][4];	// 通常
		} else {
			formInpNode.value = '';	// 無効
		}
	},false);

	// ユーザー定義登録
	node = baseNode.appendChild(document.createElement('br'));
	node = baseNode.appendChild(document.createElement('input'));
	node.setAttribute('type','button');
	node.setAttribute('value','登録');
	node.setAttribute('title','現在の内容を登録します');

	node.addEventListener('click', function() {
		var formSelNode = getNodeXPath('//form[@name="form2"]/table//td[table]//select');
		var formInpNode = getNodeXPath('//form[@name="form2"]/table//td[table]//input')[0];

		var selId  = formSelNode[0].options[formSelNode[0].selectedIndex].value;
		var buyId  = formSelNode[1].options[formSelNode[1].selectedIndex].value;
		var selNum = formInpNode.value;

		// 数値で無いので空白で登録
		if(selNum.match(/all/i)) {	// 全て
			selNum = 'ALL';
		} else if(selNum != '' && isNaN(selNum)) {	// 不正
			selNum = '';
		} else if(selNum == '') {
			selNum = '';
		} else if(selNum > 10000000 || selNum < -10000000) {// 多すぎる値なので空白(1000万)
			selNum = '';
		} else {
			selNum = parseInt(selNum,10);
		}

		// 配列に挿入
		var tmp = defData.concat();	// コピー
		defData = tmp.slice(0,1);
		defData[defData.length] = [0, 1, selId, buyId, selNum];
		defData = defData.concat(tmp.slice(1));

		// ノードに挿入
		var optionNode = document.createElement('option');
		makeOptFunc( optionNode, defData[1] );
		selectNode.add(optionNode,1);

		// 保存
		var saveBuf = [];
		for(var i = 0;i < defData.length; i++) {
			if(defData[i][1] == 1) saveBuf[saveBuf.length] = defData[i];
		}
		saveArray('defSellButton', saveBuf)

	},false);


	// ユーザー定義削除
	node = baseNode.appendChild(document.createElement('input'));
	node.setAttribute('type','button');
	node.setAttribute('value','削除');
	node.setAttribute('title','現在選択されている物を削除します');
	node.addEventListener('click', function() {
		var num = selectNode.selectedIndex;
		if(defData[num][1] == 1) {
			defData.splice(num,1);
			selectNode.remove(selectNode.selectedIndex);
		} else {
			alert("これは削除できません");
		}

		// 保存
		var saveBuf = [];
		for(var i = 0;i < defData.length; i++) {
			if(defData[i][1] == 1) saveBuf[saveBuf.length] = defData[i];
		}
		saveArray('defSellButton', saveBuf)

	},false);

	// 表示位置の変更
	var tblNode = getNodeXPath('//form[@name="form2"]/table')[0];
	baseNode.style.cssText = 'z-index:100; background:#ffffff;';
	baseNode.style.left = tblNode.offsetLeft+ 515 + 'px';
	baseNode.style.top  = tblNode.offsetTop +  50 + 'px';

}

//================================
//   兵士数割引後の最大値表示
//================================
function makeDisSolMax() {

	if(location.pathname != '/facility/facility.php') return;
	var disData = [[1,100],[5,98],[10,96],[20,94],[50,92],[100,90]];
	var i,j,k;

	var node = document.querySelector('#gray02Wrapper h2');
	if((node == null) || !node.textContent.match(/(格闘道場)|(槍術道場)|(弓術道場)|(駐車場)|(攻城道場)/)) return;	// 対象の施設で無い

	var idlist   = ['wood','stone','iron','rice'];
	var stock = [];
	for(i = 0;i < 4;i++) {
		stock[i] = parseInt(document.getElementById(idlist[i]).textContent,10);
	}

	var formNode = getNodeXPath('//form[@name="createUnitForm"]/input[contains(@id,"unit_value")]');
	if(formNode.length == 0) return;

	for(i in formNode) {
		var id = parseInt(formNode[i].getAttribute('id').replace(/.*unit_value\[(\d+)\].*/,'$1'),10);

		// 単体コスト
		var cnvData = {301:'見習い闘士', 303:'槍闘士',304:'矛槍闘士',305:'強襲闘士',307:'猛襲闘士',308:'弓闘士',
								309:'弩闘士',310:'諜報闘士',311:'隠密闘士',312:'攻城闘士・突',313:'攻城闘士・砲'};
		var cost,allcost,discost;
		var min = 9999999;
		for(j = 0;j < 4;j++) {
			cost = marketCostView_CostData['兵士作成'][cnvData[id]][1][j];
			if(cost == 0) continue;		// コスト0はスキップ
			for(k = disData.length - 1; k >= 0;k--) {
				discost = Math.round((cost * disData[k][1]) / 100);
				if(stock[j] >= discost * disData[k][0]) {
					var sol = parseInt(stock[j] / discost,10);
					if(min > sol) min = sol;
					break;
				}
			}
		}


		// 表示
		var overfunc = function(event) { event.target.style.color = '#ffffff'; event.target.style.backgroundColor='#0000ff'; }
		var outfunc  = function(event) { event.target.style.color = '#0000ff'; event.target.style.backgroundColor=''; }
		var orgnode = formNode[i].parentNode.getElementsByTagName('span')[0];
		orgnode.setAttribute('title','割引なしのコストで作成できる兵の最大数');
		orgnode.addEventListener('mouseover',overfunc,false);
		orgnode.addEventListener('mouseout' ,outfunc ,false);
		node = formNode[i].parentNode.insertBefore( orgnode.cloneNode(true), orgnode.nextSibling);


		node.textContent = '[割:'+min+']';
		node.setAttribute('onclick',node.getAttribute('onclick').replace(/(\,\s+\')(\d+)(\'\))/,'$1'+min+'$3'));
		node.setAttribute('title','割引後のコストで作成できる兵の最大数');
		node.addEventListener('mouseover',overfunc,false);
		node.addEventListener('mouseout' ,outfunc ,false);

	}
}
//================================
//        入力文字数表示
//================================
/*
	イベントセット
*/
function setEvent_chkInputStrLen() {

	var node,baseNode;

	// ひとこと
	if(ETCS_OPTION['InputStrLen_Chat']) {
		addEventByXPath('//input[@id="comment_str"]','keyup',  chkInputStrLen_hitokoto,true);
		addEventByXPath('//input[@id="comment_str"]','change', chkInputStrLen_hitokoto,true);
		node = document.createElement('div');
		node.setAttribute('id','comment_str_etcsChkLen');
		getNodeXPath('//input[@id="comment_str"]')[0].parentNode.appendChild(node);

		chkInputStrLen_hitokoto();
	}


	var pathdata = [
	// 書簡
	['InputStrLen_Mail','/message/new.php','//form[@name="message"]//textarea[@name="body"]','th','bbsres_view_etcsChkLen'],
	// 同盟掲示板レス
	['InputStrLen_BBS','/bbs/res_view.php','//form[@name="input_form"]//textarea[@name="comment"]','td','bbsres_view_etcsChkLen'],
	// 同盟掲示板レス(新規スレッド)
	['InputStrLen_BBS','/bbs/topic_add.php','//form[@name="input_form"]//textarea[@name="comment"]','td','bbsres_view_etcsChkLen'],
	['InputStrLen_BBS','/bbs/topic_add.php','//form[@name="input_form"]//input[@name="title"]','td','bbsres_view_etcsChkLenTitle'],
	// 個人掲示板新規(本文)
	['InputStrLen_PersonBBS','/bbs/personal_topic_add.php','//form[@name="input_form"]//textarea[@name="comment"]','td','bbsres_view_etcsChkLen'],
	// 個人掲示板新規(タイトル)
	['InputStrLen_PersonBBS','/bbs/personal_topic_add.php','//form[@name="input_form"]//input[@name="title"]','td','bbsres_view_etcsChkLenTitle'],
	// 個人掲示板レス(本文)
	['InputStrLen_PersonBBS','/bbs/personal_res_view.php','//form[@name="input_form"]//textarea[@name="comment"]','td','bbsres_view_etcsChkLen'],
	];

	for(i in pathdata) {
		if(!(ETCS_OPTION[pathdata[i][0]] && (location.pathname == pathdata[i][1]))) continue;

		baseNode = getNodeXPath(pathdata[i][2]);
		if(baseNode.length == 0) continue;

		(function( lbaseNode , idstr ) {
			lbaseNode.addEventListener('keyup',  function(){
						chkInputStrLen_res_view(idstr,lbaseNode);},true);
			lbaseNode.addEventListener('change', function(){
						chkInputStrLen_res_view(idstr,lbaseNode);},true);
		})(baseNode[0],pathdata[i][4]);

		node = baseNode[0].parentNode.parentNode.getElementsByTagName(pathdata[i][3])[0];
		node.innerHTML += '<br><span class="bbsres_view_etcsChkLenCss" id="'+pathdata[i][4]+'"></span>';

		chkInputStrLen_res_view(pathdata[i][4],baseNode[0]);

	}
}
/*
	ひとことの文字数表示(改行なし)
*/
function chkInputStrLen_hitokoto() {
	document.getElementById('comment_str_etcsChkLen').innerHTML =
					 '入力文字数:'+document.getElementById('comment_str').value.length+'/25';
}
/*
	掲示板スレッド・書簡の文字数表示
*/
function chkInputStrLen_res_view( id, node ) {

	var encstr = node.value;
	encstr     = encstr.replace(/\r\n|\r|\n/g,'\r\n');	// 改行は2バイト(OS依存？)

	document.getElementById(id).innerHTML = '入力文字数:'+encstr.length;
}



// ========================
//    マップドラッグ
// ========================
/*
	マップドラッグ初期化(イベント設定)
*/
function MapDrag_Init() {
	var mapNode = document.getElementById("mapsAll");

	if(mapNode == null) return;

	mapNode.addEventListener( "mousedown", StartMapDrag, false);
	mapNode.addEventListener( "click", MapDrag_LinkCancel, false);

}
/*
	マウスドラッグ開始
*/
function StartMapDrag(event) {

	var mapNode = document.getElementById("mapsAll");

	if(mapNode == null) return;
	if(event.button != 0) return;


	mapsall_initX = mapNode.offsetLeft;
	mapsall_initY = mapNode.offsetTop;

	dragStartPosX = event.clientX + window.pageXOffset;
	dragStartPosY = event.clientY + window.pageYOffset;

	document.addEventListener( "mousemove", MapDrag,      false);
	document.addEventListener( "mouseup",   EndMapDrag,   false);

	event.preventDefault();
}
/*
	マウスドラッグ終了
*/
function EndMapDrag(event) {
	var pos;
	var mapNode = document.getElementById("mapsAll");

	document.removeEventListener( "mousemove", MapDrag,    false);
	document.removeEventListener( "mouseup",   EndMapDrag, false);


	// 移動量によって決める
	if(MapDragCalcRange((event.clientX + window.pageXOffset),(event.clientY + window.pageYOffset),
																		dragStartPosX,dragStartPosY) >= 5) {
		pos = MapDragPosConv( event );
		if(pos[0] != pos[2] || pos[1] != pos[3]) {
			location.href = MAPMOVE_URL+'x='+ pos[0] + '&y=' + pos[1];
		} else {
			mapNode.style.left = mapsall_initX+"px";
			mapNode.style.top  = mapsall_initY+"px";
		}
	} else {
		mapNode.style.left = mapsall_initX+"px";
		mapNode.style.top  = mapsall_initY+"px";
	}
	event.preventDefault();
}
/*
	マウスドラッグ中(移動中)
*/
function MapDrag(event) {

	var elx,ely;
	var mapNode = document.getElementById("mapsAll");
	var scaleNode = getNodeXPath('//div[@id="change-map-scale"]/ul/li');

	// マウス移動量
	elx = (event.clientX + window.pageXOffset) - dragStartPosX + mapsall_initX;
	ely = (event.clientY + window.pageYOffset) - dragStartPosY + mapsall_initY;

	mapNode.style.position = "absolute";
	mapNode.style.left = elx+"px";
	mapNode.style.top  = ely+"px";

	event.preventDefault();
}
/*
	マップドラッグ　リンクキャンセル
*/
function MapDrag_LinkCancel( event ) {

	// 移動量によって決める
	if(MapDragCalcRange((event.clientX + window.pageXOffset),(event.clientY + window.pageYOffset),
																		dragStartPosX,dragStartPosY) >= 5) {
		event.preventDefault();
	}

}
/*
	移動量計算
*/
function MapDragCalcRange( x1, y1, x2, y2 ) {
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
/*
	座標変換
*/
function MapDragPosConv( event ) {

	var ret = [];
	var mx,my;
	var px,py,nx,ny;
	var psin,pcos;
	var nowX,nowY,scale;
				//  W,H,遊びW,遊びH
	var scaleSize = [[42.9,42.7,0.4,0.4],[31.3,31.3,0.5,0.5],[22.7,22.7,0.3,0.3],[12,12,0.3,0.3]];
	var scaleNode = getNodeXPath('//div[@id="change-map-scale"]/ul/li');
	for(scale = 0;scale < scaleNode.length; scale++) {
		if(scaleNode[scale].getAttribute('class').match(/now/)) {
			break;
		}
	}

	mx = (event.clientX + window.pageXOffset) - dragStartPosX;
	my = (event.clientY + window.pageYOffset) - dragStartPosY;
	px = (mx * -1);
	py = (my * -2);

	// 回転 mx = x * sin(rad)
	psin = Math.sin(Math.PI*(45/180));
	pcos = Math.cos(Math.PI*(45/180));

	nx = (Math.floor(px * psin + py * pcos)) / scaleSize[scale][0];
	ny = (Math.floor(px * pcos - py * psin)) / scaleSize[scale][1];

	nx = nx + (nx == 0 ? 0 : (nx > 0 ? 1 : -1) * scaleSize[scale][2]);
	ny = ny + (ny == 0 ? 0 : (ny > 0 ? 1 : -1) * scaleSize[scale][3]);

	nowX = parseInt(getNodeXPath('//div[@id="datas"]/input[@id="x"]')[0].value);
	nowY = parseInt(getNodeXPath('//div[@id="datas"]/input[@id="y"]')[0].value);

	ret[0] = nowX + parseInt(nx);
	ret[1] = nowY + parseInt(ny);
	ret[2] = nowX;
	ret[3] = nowY;

	return ret;
}
// ========================
//      サイドバータブ
// ========================
function initSidebarTab() {
	var tabName = ['ALL','1','2','3'];
	var i,selectNo;
	var tabNode,frameNode,leftNode,rightNode,node;
	var sidebarNode,insBaseNode;
	var width = 135;
	var tabMax = parseInt(ETCS_OPTION['SidebarTabNum'],10);
	var tabNameList = GM_getValue(SAVE_NAME+"SidebarTAB_TabName","").split('\t');

	for(i = 0;i < tabMax;i++) {
		if(typeof tabNameList[i] == 'undefined' || tabNameList[i] == "") {
			tabName[i+1] = i+1;
		} else {
			tabName[i+1] = tabNameList[i];
		}
	}

	tabNode  = document.createElement('div');
	tabNode  .setAttribute('id','sidebarTab');

	width       = 135;
	// タブの追加位置決定
	switch(SERVER_TYPE) {
		case 0:
			sidebarNode = document.getElementById('sidebar');
			insBaseNode = sidebarNode.firstChild;
		break;
		case 1:
			sidebarNode = document.getElementById('wrapper');
			insBaseNode = document.getElementById('whiteWrapper').nextSibling;
			tabNode.style.margin = '0px auto 6px';
		break;
		default:
			return;			// 未対応
		break;
	}

	selectNo = GM_getValue(SAVE_NAME+"SidebarTAB_NowTab",0);

	// 数字表示部分
	frameNode = document.createElement('div');
	tabNode.appendChild(frameNode);
	frameNode.style.width   = width + 'px';

	if(SERVER_TYPE == 1) {	//mixi
		frameNode.style.margin          = '0 auto';
	}

	var ulNode = document.createElement('ul');
	frameNode.appendChild(ulNode);

	// documentノードに追加
	sidebarNode.insertBefore(tabNode,insBaseNode);


	for(i = 0;i < tabName.length;i++) {
		node = document.createElement('li');
		node.appendChild(document.createTextNode(tabName[i]));
		ulNode.appendChild(node);
		(function(lnode,li) {
			lnode.addEventListener('click', function(){
				GM_setValue(SAVE_NAME+"SidebarTAB_NowTab",li);
				viewTabSidebarTab(li);
				viewContentSidebarTab(li);
			},false);
			if(li > 0) {
				lnode.addEventListener('contextmenu', function( event ){
					optionSidebarTab(li,lnode)
					event.preventDefault();
				},false);
			}
		})(node,i);
	}



	viewTabSidebarTab( selectNo );
	viewContentSidebarTab(selectNo);
}
/*
	タブ
*/
function viewTabSidebarTab( selectNo ) {
	var tab,node,btn;
	var contentWidth,nowLeft,dispwidth;
	var x;
	if(typeof selectNo == 'undefined') {
		selectNo = GM_getValue(SAVE_NAME+"SidebarTAB_NowTab",0);
	}

	// 現在選択
	tab = getNodeXPath('id("sidebarTab")//ul/li');
	for(i = 0,contentWidth = 0;i < tab.length;i++) {
		if(i == selectNo) {
			tab[i].style.borderBottom = '2px solid #ff0000';
		} else {
			tab[i].style.borderBottom = '';
		}
	}
}
/*
	選択されたタブによって、コンテンツの表示非表示
*/
function viewContentSidebarTab( selectNo ) {

	var i,j;
	var useFlag;
	var nameList = getBlockSidebarTab();


	// ブロックの表示制御
	for(i = 0;i < nameList.length;i++) {
		if(selectNo == 0) {
			useFlag = null;
		} else {
			useFlag = GM_getValue(SAVE_NAME+"SidebarTAB_DATA_"+encodeURI(selectNo+"_"+nameList[i]['name']+nameList[i]['id']));
		}

		if(useFlag == true) {
			// 表示
			nameList[i]['node'].style.display = 'block';
		} else if(useFlag == false) {
			// 非表示
			nameList[i]['node'].style.display = 'none';
		} else {
			// 非制御(or all)
			if(selectNo == 0) {
				nameList[i]['node'].style.display = '';
			} else {
				nameList[i]['node'].style.display = 'none';
			}
		}
	}


}
/*
	設定ウインドウ
*/
function optionSidebarTab( no , thisnode) {

	var i,j;
	var baseWin;
	var node;
	var blockNode = [];
	var nameList  = getBlockSidebarTab();
	var content   = document.createElement('ul');
	var nameinput, tabname,tabnameList,tabmax;

	if(searchBaseWindow('sidebarTab'+no) != null) return;	// 既に開いていたら表示しない

	// 表示物作成
	baseWin = new baseWindow('タブ'+no+"の設定","sidebarTab"+tabname);

	// 現在設定できるブロックを羅列
	for(i = 0;i < nameList.length;i++) {
		if(nameList[i]['view'] == '') continue;	// 非制御物は非表示
		useFlag = GM_getValue(SAVE_NAME+"SidebarTAB_DATA_"+encodeURI(no+"_"+nameList[i]['name']+nameList[i]['id']),false);
		content.innerHTML += '<li>'+
			CreateInputCheckBox(useFlag, nameList[i]['view'],  nameList[i]['view']) +
			'</li>';
	}
	baseWin.addContent(content);

	// 保存ボタン作成
	node = document.createElement('input');
	node.setAttribute('value','保存');
	node.setAttribute('type','button');
	node.style.margin = 'auto';
	node.style.display= 'block';
	node.style.width  = '3em';
	baseWin.addContent(node);
	// 保存ボタンを押した時
	(function(lnode,lcontent,lnameList,lbaseWin,lno,lnameinput,ltabnameList,lthisnode){
		node.addEventListener('click',function() {

			lnode.disabled = true;

			setTimeout(function() {

				// 不要なのは削除
				var tabDataList = GM_listValues();
				console.log(tabDataList.length);
				for(var i in tabDataList) {
					var reg = new RegExp(SAVE_NAME+"SidebarTAB_DATA_"+encodeURI(lno+"_"));
					if(tabDataList[i].match(reg)) {
						GM_deleteValue(tabDataList[i]);
					}
				}

				// 各種チェックボックス
				var input_node = lcontent.getElementsByTagName('input');
				for(var i = 0,cnt = 0;i < lnameList.length;i++) {
					if(lnameList[i]['view'] == '') continue;	//非制御は保存しない
					GM_setValue(SAVE_NAME+"SidebarTAB_DATA_"+encodeURI(lno+"_"+lnameList[i]['name']+lnameList[i]['id']),input_node[cnt].checked);
					cnt++;
				}
				lbaseWin.close();
				viewTabSidebarTab(lno);
				viewContentSidebarTab(lno);
			},10);
		},false);
	})(node,content,nameList,baseWin,no,nameinput,tabnameList,thisnode);

	baseWin.disp(true);
	baseWin.nearPosNode(thisnode);
}
/*
	サイドバーの各ブロック(ノード)を取得
*/
function getBlockSidebarTab() {

	var name,id,view;
	var textNode;
	var node,fnode;
	var nameList  = [{'view':'ボタン類','name':'ボタン類', 'id':'' , 'node':null}];
	var btnNode   = null;
	var blockNode = [];
	var sidebar   = getNodeXPath('//div[@id="sidebar"]/ul[1]');

	// ボタンのデータセット
	if(sidebar.length > 0)	btnNode = nameList[0]['node'] = sidebar[0];

	// ボタン以降のブロック取得
	switch(SERVER_TYPE) {
		case 0:	// 本鯖,ハンゲ
			sidebar = getNodeXPath('//div[@id="sidebarTab"]/./following-sibling::*');
		break;
		case 1:	// mixi,yahoo
			nameList = [];		// ボタンがない
			sidebar = getNodeXPath('//div[@id="sidebarTab"]/./following-sibling::*');
		break;
		default:
		break;
	}

	// ブロックを探索
	for(i = 0;i < sidebar.length;i++) {
		if(sidebar[i] == btnNode) continue;	// bottun
		var h3Node = sidebar[i].getElementsByTagName('h3');
		if(h3Node.length > 1) {
			for(j = 0;j < h3Node.length;j++) {	// beyondなど
				node = h3Node[j];
				do {	// ブロックの天井探索
					fnode = node;
					node  = node.parentNode;
				} while((node.getElementsByTagName('h3').length == 1) && (node != sidebar[i]));	// 複数のh3が見つかるまで
				blockNode.push(fnode);
			}
		} else {
			blockNode.push(sidebar[i]);
		}
	}
	for(i = 0;i < blockNode.length;i++) {
		// 名前探索
		name  = '';
		id    = '';
		view  = '';
		// IDを取得
		if(blockNode[i].getAttribute('id') != null) {
			view = id = blockNode[i].getAttribute('id');
		}
		// h3があれば取得
		textNode = getNodeXPath('descendant::h3//text()',blockNode[i]);
		if(textNode.length > 0) {
			for(j = 0;j < textNode.length;j++) {
				if(textNode[j].nodeValue.replace(/^\s+|\s+$/g,'') != '') {
					view = name = textNode[j].nodeValue;
					break;
				}
			}
		}
		nameList.push({"view":view, "name":name, "id":id, 'node':blockNode[i]});
	}


	return nameList;
}

// ========================
//    サイドバー幅調整
// ========================
function changeSidebarWidth() {

	var addWidth = parseInt(ETCS_OPTION['SidebarWidth_AddSize'],10);

	var container   = document.getElementById('container');
	var container_w = document.defaultView.getComputedStyle(container,'').width;
	var sidebar     = document.getElementById('sidebar');
	var sidebar_w   = document.defaultView.getComputedStyle(sidebar,'').width;

	// サイドバーの方がサイズが大きいとき(読み込み完了していないとき？)は、100ms後もう一度
	if(container_w <= sidebar_w) {
		setTimeout(changeSidebarWidth,100);
		return;
	}

	// コンテナ自体を広げる
	container.style.width = (parseInt(container_w) + addWidth) +'px';
	// サイドバーのサイズ
	sidebar.style.width   = (parseInt(sidebar_w) + addWidth) +'px'

	if(addWidth < 0) return;


	// IP/TP/CPの表示位置調整
	if(ETCS_OPTION['SidebarWidth_AdjustStatusR']) {
		var status_right            = document.getElementById('status_right');
		if(status_right != null) {
			status_right.style.position = 'relative';
			status_right.style.right    = addWidth+'px';
		}
	}
/*
	// 拠点リストの幅調整
	if((SERVER_TYPE == 0) && (ETCS_OPTION['SidebarWidth_VillageBlock'])) {
		var node = getNodeXPath('//div[@class="sideBox" and div[contains(@class,"sideBoxHead")'+
											' and h3/strong//text()="拠点"]]/div[contains(@class,"sideBoxInner")]//li');

		for(var i in node) {
			node[i].style.width = 'auto';
		}
	}
*/
}
// ========================
//    IP/TP/CPクリック
// ========================
function clickIPTPCP() {

	var serverXPath = {
		's':'//div[@id="status_right"]//img',
		'p':'//div[@id="status_right"]//img',
		'h':'//div[@id="status_right"]//img',
		'y':'//div[@id="BPTPCP_area"]//img',
		'm':'//div[@id="BPTPCP_area"]//img',
		'f':'//div[@id="status_right"]//img',
	};

	var action = {'ブショーダスポイント':BSYODAS_URI,
		'トレードポイント':TRADE_URI,
		'チャージポイント':CPITEM_URI,
		'Hero Lottery Points':BSYODAS_URI,
		'Trade Points':TRADE_URI,
		'Charge Points':CPITEM_URI,
	};

	var BTCBtn = getNodeXPath(serverXPath[SERVICE_TYPE]);
	var i,j;

	for(i = 0;i < BTCBtn.length;i++) {
		try {
			var uri = action[BTCBtn[i].getAttribute('title')];
			if(typeof uri != 'undefined') {
				(function(luri,lnode) {
					lnode.addEventListener('click', function() {
						location.href = luri;
					},false);
					lnode.addEventListener('mouseover', function() {
						lnode.style.cursor = 'pointer';
					},false);
					lnode.addEventListener('mouseout', function() {
						lnode.style.cursor = '';
					},false);
				})(uri,BTCBtn[i]);
			}
		} catch(e) {
			// エラーの時は何もしない
			console.log("clickBPTPCP ERROR:"+i);
		}
	}
}
// ========================
//      車ダメージ計算
// ========================
function carDmgCalc() {

	// 鍛冶場・武具を開いたときに自動保存
	if(location.pathname == '/facility/facility.php') {

		var result = getNodeXPath('//div[@id="gray02Wrapper"]/h2/text()')[0].textContent;
		if(!result.match(/鍛冶場・武具/)) return;	// 鍛冶場・武具で無ければ終了

		var vData = getVillageDataFromID();
		if(vData == null) {
			node.textContent = '拠点情報が取得できませんでした';
			return;
		}

		var smithyLv = 0;
		var ramLv    = 0;
		var catLv    = 0;

		result = getNodeXPath('id("gray02Wrapper")//table[contains(@class,"commonTables")]//th[contains(@class,"mainTtl")]/div[contains(@class,"th_ttl")]');
		if(result.length > 0) {
			smithyLv = parseInt(result[0].textContent.replace(/^.+レベル\s*(\d+).*$/,"$1"),10);	// 鍛冶場・武具レベル
		}

		result = getNodeXPath('id("gray02Wrapper")//table[contains(@class,"commonTables")]//tr[preceding-sibling::tr/th[contains(@class,"mainTtl6") and (text() = "攻城闘士・突")]]/td[contains(@class,"contents")]');
		if(result.length > 0) {
			ramLv = result[0].textContent.replace(/\r|\n/gm,"")
			ramLv = parseInt(ramLv.replace(/^.*?レベル\s*(\d+).+$/m,"$1"));
		}

		result = getNodeXPath('id("gray02Wrapper")//table[contains(@class,"commonTables")]//tr[preceding-sibling::tr/th[contains(@class,"mainTtl6") and (text() = "攻城闘士・砲")]]/td[contains(@class,"contents")]');
		if(result.length > 0) {
			catLv = result[0].textContent.replace(/\r|\n/gm,"")
			catLv = parseInt(ramLv.replace(/^.*?レベル\s*(\d+).+$/m,"$1"));
		}
		var savestr = new Date() + '\t' + smithyLv + '\t' + ramLv + '\t' + catLv;

		GM_setValue(SAVE_NAME+'carDmgCalc_Setting_'+vData[0], savestr);

		return;
	}

	if(location.pathname != '/facility/castle_send_troop.php') return;

	var skillData = {
		"攻城戦陣":{reg : /.*本拠地・拠点への攻撃力が(\d+(\.\d+)?)%上昇する.*/,base:'$1',add:'' },
		"攻城奮陣":{reg : /.*本拠地・拠点への攻撃力が(\d+(\.\d+)?)%上昇する.*/,base:'$1',add:'' },
		"攻城烈陣":{reg : /.*本拠地・拠点への攻撃力が(\d+(\.\d+)?)%上昇する.*/,base:'$1',add:'' },
		"攻城閃陣":{reg : /.*本拠地・拠点への攻撃力が(\d+(\.\d+)?)%上昇する.*/,base:'$1',add:'' },
		"苦肉計":  {reg : /.*攻城闘士の攻撃力が(\d+(\.\d+)?)%.*ダメージを(\d+(\.\d+)?)追加.*/,base:'$1',add:'$3' },
		"智将器撃":  {reg : /.*本拠地・拠点への攻撃力が(\d+(\.\d+)?)%.*/,base:'$1',add:'' },
		"皇叔の号令":  {reg : /.*兵器の攻撃力が(\d+(\.\d+)?)%.*ダメージを(\d+(\.\d+)?)追加.*/,base:'$1',add:'$3' },
	};


	var baseNode = document.getElementById('gray02Wrapper');	// 追加先

	// 出陣画面で拠点ごとの設定
	var carDmgNode = document.createElement('div');
	carDmgNode.setAttribute('id','etcs_cardmg');

	var vData = getVillageDataFromID();
	if(vData == null) {
		return;
	}

	var node,selNode,cntNode,smithNode,ramNode,catNode;
	var savedata;

	// 自動保存
	var savefunc = function() {

		var smithLv = parseInt(smithNode.value,10);
		var ramLv   = parseInt(  ramNode.value,10);
		var catLv   = parseInt(  catNode.value,10);
		var savestr = new Date() + '\t' + smithLv + '\t' + ramLv + '\t' + catLv;

		GM_setValue(SAVE_NAME+'carDmgCalc_Setting_'+vData[0], savestr);
	}

	savedata = GM_getValue(SAVE_NAME+'carDmgCalc_Setting_'+vData[0],'未保存\t0\t0\t0').split(/\t/);


	// タイトル
	node = document.createElement('div');
	node.textContent = vData[3] + ' の鍛冶場・武具設定';
	node.style.cssText = 'padding:4px 1em; color:#ffffff; background-color:#000000; font-weight:bold;';
	carDmgNode.appendChild(node);
	// 選択
	cntNode   = document.createElement('div');
	cntNode    .appendChild(document.createTextNode('鍛冶場・武具レベル'));
	smithNode = cntNode.appendChild(document.createElement('select'));
	for(i = 0;i < 11;i++) {
		node    = smithNode.appendChild(document.createElement('option'));
		node.textContent = 'LV'+i;
		node.setAttribute('value',i);
	}
	smithNode.selectedIndex = savedata[1];
	smithNode.addEventListener('change', savefunc, false);

	cntNode.appendChild(document.createTextNode(' 攻城闘士・突武器レベル'));
	ramNode = cntNode.appendChild(document.createElement('select'));
	for(i = 0;i < 11;i++) {
		node    = ramNode.appendChild(document.createElement('option'));
		node.textContent = 'LV'+i;
		node.setAttribute('value',i);
	}
	ramNode.selectedIndex = savedata[2];
	ramNode.addEventListener('change', savefunc, false);

	cntNode.appendChild(document.createTextNode(' 攻城闘士・砲武器レベル'));
	catNode = cntNode.appendChild(document.createElement('select'));
	for(i = 0;i < 11;i++) {
		node    = catNode.appendChild(document.createElement('option'));
		node.textContent = 'LV'+i;
		node.setAttribute('value',i);
	}
	catNode.selectedIndex = savedata[3];
	catNode.addEventListener('change', savefunc, false);

	carDmgNode.appendChild(cntNode);
	baseNode.appendChild(carDmgNode);

	// ここから先は出陣確認画面のみ

	var basenode = getNodeXPath('//table[@class="fighting_about"]/tbody/tr/th')[0];
	if(typeof basenode == 'undefined') return;
	if(basenode.getAttribute('class') == 'suport') return;	// 援軍は表示しない


	//
	// 算出
	//

	// 台数取得
	var ram_cnt = parseInt(getNodeXPath('//input[@name = "ram_count"]'     )[0].value,10);	// 攻城闘士・突
	var cat_cnt = parseInt(getNodeXPath('//input[@name = "catapult_count"]')[0].value,10);	// 攻城闘士・砲
	ram_cnt     = isNaN(ram_cnt) ? 0 : ram_cnt;
	cat_cnt     = isNaN(cat_cnt) ? 0 : cat_cnt;

	if(ram_cnt == 0 && cat_cnt == 0) return;		// 車が無しの時表示しない

	// スキル取得
	var skillper = 0;	// スキルでの増加[率]
	var skilladd = 0;	// スキルでの加算数(苦肉用)

	node = getNodeXPath('//div[@class = "useSkill"]/p[@class="skillTitle"]');
	if(node.length > 0) {
		var name = node[0].textContent.replace(/\s|\r|\n/gm,'');
		name     = name.replace(/(.+?)LV.+/,'$1');
		if(typeof skillData[name] != 'undefined') {
			node = getNodeXPath('//div[@class = "useSkill"]/p[@class="skillInfo"]');
			skillper = parseFloat(node[0].textContent.replace(skillData[name]['reg'],skillData[name]['base']));
			skilladd = parseFloat(node[0].textContent.replace(skillData[name]['reg'],skillData[name]['add']));

			skilladd = isNaN(skilladd) ? 0 : skilladd;	// 無いときは0
		}
	}


	// 計算して表示
	var func = function() {
		var smithyData = [0,0,1.5,3,4.5,6,7.5,9,10.5,12,15];	//鍛冶場・武具+ATK%
		var ramData    = [0,3, 6, 9,12,15,18,21,25,29,35];	//攻城闘士・突+ATK%
		var catData    = [0,5,10,15,21,28,36,45,56,69,85];	//攻城闘士・砲+ATK%

		var smithLv = parseInt(smithNode.value,10);
		var ramLv   = parseInt(  ramNode.value,10);
		var catLv   = parseInt(  catNode.value,10);
		var addper  = skillper + smithyData[smithLv];

		var dmg = parseInt((ram_cnt * (100 + skillper + smithyData[smithLv] + ramData[ramLv])
				+ cat_cnt * (100 + skillper + smithyData[smithLv] + catData[catLv]))/100,10)
				+ skilladd;

		// ダメージ追加
		var node = getNodeXPath('//form[@name="input_troop"]//div[contains(@class,"fightingpower")]/dl/dd[preceding-sibling::dt[contains(text(),"拠点ダメージ")]]/*');
		if(node.length > 0) {
			node[0].textContent = dmg;
			node[1].textContent = '技:'+skillper+'%';
			node[2].textContent = ' 鍛:'+smithyData[smithLv]+'%';
			node[3].textContent = ' 突:'+ramData[ramLv]     +'%';
			node[4].textContent = ' 砲:'+catData[catLv]     +'%';

		}
	}

	// ダメージの項目追加
	var dlnode = getNodeXPath('//form[@name="input_troop"]//div[contains(@class,"fightingpower")]/dl');
	if(dlnode.length > 0) {
		node = dlnode[0].appendChild(document.createElement('dt'));
		node.textContent = '拠点ダメージ';
		node.setAttribute('class','type2');
		node.style.background ='url("data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAG0AAAAoCAYAAAD0bXSJAAAAAXNSR0IArs4c6QAABUJJREFU'+
				'eNrtmt9LFF0Yx79nZnZWN3Vi1bFy88KISJIFBYPACoLwQkiN6CIiSCgQvOkigjTf7voXuqmb'+
				'uukqWSKCSgghsBIvggqjlCz8tem67ujsnpnvexHOq69v9Sa4q3C+8CzDOTtz8f3wPOc5Z0bg'+
				'HxFKW10i+NkIsNLSUoTDYZSUlGBsbEzZmUdwxkYzbNeuXdB1He/fv1c25lcUG4VmGAZM0wQA'+
				'OI6jrMxzjfwjaJqmwfd9CCEghICmaZBSKicLBU2tU9tDxp+uU42NjaisrMTExATevn2rHCw0'+
				'tM+fP8M0TUQikTXrlBAC5I+E3LdvHxzHga7ryr0CSQfwl6ZpIAmSkFLC932QRFNTE75//45c'+
				'LhfcUFVVheXlZQgh0NnZCSGEKqWFaCF/FkVFRT+de/bsGUlyYGBgzXgoFGJRURENw+Cvnq1i'+
				'46HZto379+9jaGgI7e3ta2guLy//sov8L+VyOYRCIViWpdJhsxSPxzk3N0cpJR8/fryGqGEY'+
				'jEQiPHr06DraTU1NvH79Oo8fPx6MDQwM8MWLF0HGqazYpIjFYkwkEpyammJvb++aSV3XqWka'+
				'Dxw48NsH3bhxgyT55csXHjt2TBm7maHrOmOxGOPxOG3bXpdpQgiWl5evu1EIEVzH43Gu6PLl'+
				'y9y9e7cydnPj55MHDx5cN7a6BK7E69evSZKfPn1ShhYa2q9KoGVZBMC+vr4gy27duhVkqDJ2'+
				'C0BraGgI4HR0dATjo6Oj9DyPd+7cUWZuNWhv3rxZVwJHRkbo+z7T6TSbm5uVmVsJ2uoS2N3d'+
				'zdOnT7O3tzcYu3jxojIyj/G/Xs1MTU3Btm3cvXsXpmmira0NkUgEQggkk0lUVFSoDW8epf3u'+
				'D+Pj47BtG4uLi7h37x4aGhqQSqUgxI8vFW7fvq1cLOQp/4p27tyJEydO4NChQ6ipqQEAnDt3'+
				'Ds3NzcGh8YquXr2KbDaLmzdvKjcLeWA8ODjIxcVF+r5PkpydneWZM2f46tUrjo+PkyRzuRzn'+
				'5+dJktPT0+zr61PrTb4OjP9NsLq6GrZtI5PJBCXw/PnzKC4uRlVVFaLRKCYnJyGlRDKZBABU'+
				'Vlbi2rVruHTpkkqBfL1PWz1w5coV1NXVYe/evcFJ/tmzZ7GwsID9+/djbGwMuq6jtLQUmqbh'+
				'6dOniEajsCwLJ0+eRG1tLXRdx7t375S7+WhEbNtGa2srqquroes6pJRIpVIwDAOtra1IJBKQ'+
				'UuLJkyeYnZ2F4ziQUuLhw4cYHh5GOBxGR0cH6uvrlbP5gFZcXIyWlhbEYjGUlJQgk8msK4EX'+
				'LlzAhw8fsLS0BN/3kc1m4Xkeampq8PLlS0xMTMCyLPT09KCnp0e5u9mNSDgc5vPnz5lKpTg3'+
				'N8d0Ok3HcTgzM8P+/n5OT0+TJF3Xped5TKfTdF2XrusGDYvruiTJTCZD/vioRMUmRNDyR6NR'+
				'RKNRlJWVYWZmBg8ePEB7ezuWlpaCEtjY2Bjs07q7uzE5OYny8nLs2LEDIyMj+Pr1K/bs2QMA'+
				'GB4eVumwSRIVFRVMJpMYGhpCXV0dTNPEo0ePQBJHjhyB53kYHBxEWVkZPn78iFOnTiEWi0FK'+
				'ia6uLiQSCZimiYWFBczPzytH8wGtvr6ebW1t6Orqwrdv34KJ/v5+tLS0BB3k4cOHAQDZbBam'+
				'acJxnOAoSynP0ACwtrYWlmVhdHQUnudBSgnDMCClhKZpMAwDmUwGpmnC8zx4nqecKzS0UCgE'+
				'TdMghIDrusGHqUpbGJqyYRtvrpUUNCUFTUlB2+aNCFQzsr2Yrd4ZK3DbJMn+Bur9z6UTRXFv'+
				'AAAAAElFTkSuQmCC")';

		var ddnode = dlnode[0].appendChild(document.createElement('dd'));
		ddnode.setAttribute('title','この部隊が拠点に与える予想ダメージです');

		node  = ddnode.appendChild(document.createElement('strong'));
		node.textContent = "計算中...";
		node.setAttribute('class','size1');

		node  = ddnode.appendChild(document.createElement('span'));
		node.setAttribute('title','スキルによるダメージアップ率');
		node.textContent = "--";
		node  = ddnode.appendChild(document.createElement('span'));
		node.setAttribute('title','鍛冶場・武具によるダメージアップ率');
		node.textContent = "--";
		node  = ddnode.appendChild(document.createElement('span'));
		node.setAttribute('title','攻城闘士・突のダメージアップ率');
		node.textContent = "--";
		node  = ddnode.appendChild(document.createElement('span'));
		node.setAttribute('title','攻城闘士・砲のダメージアップ率');
		node.textContent = "--";
	}


	func();

	// 再計算用イベント
	smithNode.addEventListener('change', func, false);
	ramNode  .addEventListener('change', func, false);
	catNode  .addEventListener('change', func, false);
}
// ==============================
//    出陣種類デフォルト選択
// ==============================
/*
	初期化
*/
function SendTroopAtackDefault() {

	if(location.pathname != '/facility/castle_send_troop.php') return;

	var node = getNodeXPath('//table[@class="fighting_about"]/tbody/tr/th')[0];
	if(typeof node != 'undefined') return;


	node = document.querySelector('#gray02Wrapper h2');
	if((node == null) || !node.textContent.match(/出陣/)) return;	// 出陣で無い

	var inputNode = getNodeXPath('//input[contains(@name,"radio_move_type")]');

	var defSelect = ETCS_OPTION['SendTroopAtackDefaultType'];

	for(var i = 0;i < inputNode.length;i++) {
		if(inputNode[i].disabled == true) continue;			// 無効時スキップ
		inputNode[i].checked = false;
		if(inputNode[i].getAttribute('value') == defSelect) {
			inputNode[i].checked = true;
		}
	}


	// 保存ボタン(LINK)
	var baseNode = inputNode[0].parentNode;
	var saveNode = baseNode.appendChild(document.createElement('div'));
	var aNode    = saveNode.appendChild(document.createElement('a'));
	aNode.setAttribute('href','javascript:void(0);');
	aNode.setAttribute('title','現在選択されている出撃方法を、デフォルトとして登録します');
	aNode.textContent = '登録';
//	saveNode.style.cssText = 'position:absolute; left:290px; top:470px;';
	saveNode.style.position = 'absolute';
	saveNode.style.top  = (baseNode.offsetParent.offsetTop + 220) + 'px';
	saveNode.style.left = (baseNode.offsetParent.offsetLeft + 220) + 'px';

	aNode.addEventListener('click',function() {
		var labelData = {301:'援軍', 302:'殲滅戦/賊討伐', 303:'強襲', 304:'偵察'};

		for(var i = 0;i < inputNode.length;i++ ){
			if(inputNode[i].disabled == true) continue;			// 無効時スキップ
			if(inputNode[i].checked) {
				GM_setValue(SAVE_NAME+"SETTING_SendTroopAtackDefaultType",inputNode[i].value);
				alert(labelData[parseInt(inputNode[i].value,10)]+"をデフォルトとして登録しました");
				break;
			}
		}
	},false);



}
// ==============================
//       下級闘士管理 出力
// ==============================
/*
	初期化
*/
function getUnitStatusTime() {

	if(location.pathname != '/facility/unit_status.php') return;

//	var baseFormat = '@date\t@pos\t@type';
	var baseFormat = '';

	var node = document.querySelector('#gray02Wrapper h2');
	if((node == null) || !node.textContent.match(/下級闘士管理/)) return;	// 下級闘士管理で無い

	var baseDataNode = getNodeXPath('id("all")//tr[th[contains(text(),"出陣先") or contains(text(),"出陣元")]]');


	var makeNode = document.getElementById('gray02Wrapper');
	var outside  = makeNode.appendChild(document.createElement('div'));
	outside.setAttribute('id','getUnitStatusTime');

	var outputTitle = outside.appendChild(document.createElement('h3'));
	outputTitle.textContent = '出力';

	var outNode  = outside.appendChild(document.createElement('div'));

	var textBox   = outNode.appendChild(document.createElement('textarea'));
	var formatBox = outNode.appendChild(document.createElement('input'));
	var loadButton = [];
	var saveButton = [];
	for(var i = 0;i < 3;i++) {
		node = loadButton[loadButton.length] = outNode.appendChild(document.createElement('input'));
		node.setAttribute('type','button');
		node.setAttribute('value','呼出'+(i+1));
		node.style.cssText = 'color:#0000ff;';
		node = saveButton[saveButton.length] = outNode.appendChild(document.createElement('input'));
		node.setAttribute('type','button');
		node.setAttribute('value','登録'+(i+1));
		node.style.cssText = 'color:#ff0000;';
	}
//	textBox  .style.cssText = 'width:726px; height:6em;';
	formatBox.style.cssText = 'width:708px;';
	formatBox.setAttribute('type','text');
//	formatBox.value = baseFormat;


	// 出力
	var outputFunc = function() {
		baseFormat = formatBox.value;
		var output = '';
		var type   = '';
		for(var i = 0;i < baseDataNode.length;i++) {
			var format = baseFormat;
			var str;
			node = getNodeXPath('../tr[1]/th',baseDataNode[i]);
			if(node.length > 0) {
				str = node[0].textContent.replace(/\s|\t|\r|\n/)
			}
			if(str != type) {
				type = str;
				output += '### '+type+' ###\r\n';
			}
			console.log(baseDataNode[i]);
			// 到着時間
			if(format.match(/[^@]?@date/)) {
				str = '';
				node = getNodeXPath('following-sibling::tr[1]//td[preceding-sibling::th[contains(text(),"到着時刻") or contains(text(),"出陣条件")]]',baseDataNode[i]);
				if(node.length > 0 && node[0].textContent.match(/.*(\d{4}\-\d{2}\-\d{2}\s+\d{2}\:\d{2}\:\d{2}).*/)) {
					str = RegExp.$1;
				}
				format = format.replace(/@date/g,str);
			}
			// 出陣先座標
			if(format.match(/[^@]?@pos/)) {
				str = '';
				node = getNodeXPath('td[preceding-sibling::th[contains(text(),"出陣先") or contains(text(),"出陣元")]]',baseDataNode[i]);
				if(node.length > 0 && node[0].textContent.match(/.*\((\-?\d+\,\-?\d+)\).*/)) {
					str = RegExp.$1;
				}
				format = format.replace(/@pos/g,str);
			}
			// 出陣先フル
			if(format.match(/[^@]?@fullpos/)) {
				str = '';
				node = getNodeXPath('td[preceding-sibling::th[contains(text(),"出陣先") or contains(text(),"出陣元")]]',baseDataNode[i]);
				if(node.length > 0 && node[0].textContent.match(/.*\((\-?\d+\,\-?\d+)\).*/)) {
					str = node[0].textContent.replace(/\s|\t|\r|\n/);
				}
				format = format.replace(/@fullpos/g,str);
			}
			// 種類
			if(format.match(/[^@]?@type/)) {
				str = '';
				node = getNodeXPath('../tr[1]/th',baseDataNode[i]);
				if(node.length > 0) {
					if(node[0].textContent.match(/\s*(.*?)の兵士/)) {
						str = RegExp.$1;
					} else {
						str = node[0].textContent.replace(/\s|\t|\r|\n/);
					}
				}
				format = format.replace(/@type/g,str);
			}
			// 攻撃種類
			if(format.match(/[^@]?@attack/)) {
				str = '';
				node = getNodeXPath('th[following-sibling::th[contains(text(),"出陣先") or contains(text(),"出陣元")]][1]',baseDataNode[i]);
				console.log(node.length);
				if(node.length > 0) {
					str = node[0].textContent.replace(/\s|\t|\r|\n/);
				}
				format = format.replace(/@attack/g,str);
			}
			format = format.replace(/@@/g,"@");
			format = format.replace(/\\t/g,"\t");
			format = format.replace(/\\r\\n/g,"\r\n");
			format = format.replace(/\\r/g,"\r\n");
			format = format.replace(/\\n/g,"\r\n");

			output += format + '\r\n';
		}
		textBox.value = output;
		GM_setValue(SAVE_NAME+'getUnitStatusTime_SetData_def',formatBox.value);
	};
	// 呼び出し
	var loadFunc = function( no ) {
		var str = GM_getValue(SAVE_NAME+'getUnitStatusTime_SetData'+no,'');
		formatBox.value = str;
		(outputFunc)();
	};
	// 登録
	var saveFunc = function( no ) {
		var str = formatBox.value;
		if(confirm("『"+str+"』\nをNo."+(no+1)+"に登録しますがよろしいですか？")) {
			GM_setValue(SAVE_NAME+'getUnitStatusTime_SetData'+no,str);
			alert("登録しました");
		}
	};



	outputTitle.addEventListener('click', function() {
		if(outNode.style.display == 'none' ) {
			outNode.style.display = 'block';
			GM_setValue(SAVE_NAME+'getUnitStatusTime_ViewOnOff','on');
		} else {
			outNode.style.display = 'none';
			GM_setValue(SAVE_NAME+'getUnitStatusTime_ViewOnOff','off');
		}
	}, false);
	var tmp = GM_getValue(SAVE_NAME+'getUnitStatusTime_ViewOnOff','off');
	outNode.style.display = (tmp == 'off' ? 'none' : 'block');


	formatBox.addEventListener('change',outputFunc,false);
	formatBox.addEventListener('keyup',outputFunc,false);
	(loadFunc)('_def');
	(outputFunc)();

	for(var i = 0;i < 3;i++) {
		(function(li) {
			loadButton[li].addEventListener('click',function() {
				(loadFunc)(li);
			},false);
			saveButton[li].addEventListener('click',function() {
				(saveFunc)(li);
			},false);
		})(i);
	}





}
//================================
//      ラベルタブリンク補正
// (#file-1へ飛ぶように付加する)
//================================
function revLabelTabLink() {

	if(location.pathname != '/card/deck.php')  return;

	var labelNode = getNodeXPath('id("tab-labels")//a');

	labelNode.forEach( function( node ) {

		if(!node.getAttribute('href').match(/.*#.+/)) {		// #がない
			node.setAttribute('href', node.getAttribute('href') + '#file-1');
		}

	});
}
//================================
//    デッキで内政へ飛ぶ
//================================
function deckToDomestic() {

	if(location.pathname != '/card/deck.php')  return;

	var phpData = [
		[/内政セット済/ ,"%2Fcard%2Fdomestic_setting.php"],
		[/待機中/ ,"%2Fcard%2Fdomestic_setting.php"],
	];


	var setinfo = getNodeXPath('id("cardListDeck")//*[contains(@class,"cardColmn")]//dd[preceding-sibling::dt[contains(text(),"セット状態") and position()=1]]');

	for(var i = 0;i < setinfo.length; i++) {


		// カードの所属拠点から拠点ID取得
		var node = getNodeXPath('../dd[preceding-sibling::dt[contains(text(),"所属拠点") and position()=1]]//a',setinfo[i]);
		if(node.length == 0) continue;
		var villageID = node[0].getAttribute('href').replace(/^.+village_id=(\d+).*?$/,"$1");


		var range     = document.createRange();
		range.selectNodeContents(setinfo[i]);

		// 追加/置き換え
		if(setinfo[i].textContent.match(/出陣中/)) {
			setinfo[i].innerHTML = setinfo[i].innerHTML.replace(/出陣中/,'<a href="/village_change.php?village_id='+villageID+'&from=menu&page=%2Ffacility%2Funit_status.php">出陣中</a>');
		} else {
			var oldNode   = range.extractContents();
			node = setinfo[i].appendChild(document.createElement('a'));
			node.appendChild(oldNode);
			node.setAttribute('href','/village_change.php?village_id='+villageID+'&from=menu&page=%2Fcard%2Fdomestic_setting.php');
		}
			range.detach();
	}
}
//================================
//      サイドバーで座標入力
//================================
function sidebarInputPos() {

	var imgData = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAS5JREFU'+
		'KM/d0L9L1HEAxvHX53vC2X0vt4YaGqLFLkuQHHK6xb7S1BBOQoLQH+Bif4LRkiAuDtF/4KB3'+
		'6CAERUhhP7BTENTpEBeR+2oH+v06HQQO4eDiMz/v5+F5uP4KlyZWRIiuoHFVt9gtqQNVf/8P'+
		'riqLPVLwXGRQZs2ZRalfqloXwR9iZwbkhgWJ9aVeWbFEOFYZazi9WVfarGn5qaoVfHFDUb/g'+
		'pSCx9fae5qsi6Nqn3ODkPndnjt3+0JCry9WCrwYUvFYwKujxaYfCIXmR7qZy+8jTvc+eNd+Z'+
		'nAQHMgvBNyW5xyIJEjtvKu58jO1OmVib9X5uU6kN0vDdBp3Gfzee6hOMIBFU2k/E0+PSh9s2'+
		'5l+oLw2p6fJbv/Tiq52AyLDMA5E/MssdoGM7BzjCXjturiMhAAAAAElFTkSuQmCC';
	var bodyNode,inputNode;

	bodyNode = document.createElement('div');

	bodyNode.innerHTML = '<form action="/map.php" method="get"><label><span style="color:#ffffff;">X</span><input type="text" name="x" size="5"></label><label><span style="color:#ffffff;">Y</span><input type="text" name="y" size="5"></label><input type="submit" value="検索"></form>';
	inputNode = bodyNode.getElementsByTagName('input');
	inputNode[2].addEventListener('click', function() {
		var pos = inputNode[0].value;

		// 全角数値変換
		pos = pos.replace(/[０-９|ー|－]/g,function(s) {
			var cv = {'ー':'-','－':'-','、':',',};
			return typeof cv[s] == 'undefined' ? String.fromCharCode(s.charCodeAt(0) - 0xFEE0) : cv[s];
		});

		if(pos.match(/(\(|（|(x|X)=)?(\-?\d+)(\,|\&|\.|，|、|。|．|\s+|　+)((y|Y)=)?(\-?\d+)(）|\))?/)) {
			inputNode[0].value = RegExp.$3;
			inputNode[1].value = RegExp.$7;
		}
		return false;
	},false);

	BaseSidebarBlock('地図座標', bodyNode, imgData);

	// ずれるの対処
	bodyNode.parentNode.style.padding  = '5px 0px 5px 0px';
	bodyNode.parentNode.style.position = 'relative';
	bodyNode.parentNode.style.left     = '0px';
	bodyNode.parentNode.style.width    = '130px';
}



//================================
//    サイドバーの基本テンプレ
//================================
function BaseSidebarBlock( headName, bodyNode, iconImage) {

	var baseNode, hNode,bNode, sidebar,node;

	// サイドバー基本
	baseNode = document.createElement('div');
	baseNode.setAttribute('class','sideBox');

	// mixi系
	if(SERVER_TYPE == 1) {
		baseNode.setAttribute('class','footer_box');
		baseNode.style.color      = '#ffffff';
		baseNode.style.height     = 'auto';
		// mixiは追加位置を変更
		sidebar = document.getElementById('wrapper');
	} else {
		// 通常
		sidebar = document.getElementById('sidebar');
	}


	// Hedder
	hNode    = document.createElement('div');
	hNode.setAttribute('class','sideBoxHead');
	node     = hNode.appendChild(document.createElement('h3'));
	node     = node .appendChild(document.createElement('strong'));
	iconNode = node.appendChild(document.createElement('img'));
	iconNode.style.opacity = '1.00';
	iconNode.setAttribute('src',iconImage);
	node    .appendChild(document.createTextNode(headName));

	// body
	bNode = document.createElement('div');
	bNode   .setAttribute('class','sideBoxInner');
	if(SERVER_TYPE == 1) {
		bNode   .style.colof    = '#ffffff';
		bNode   .style.fontSize = '77%';
		bNode   .style.padding  = '5px';
	}
	bNode   .appendChild(bodyNode);

	baseNode.appendChild(hNode);
	baseNode.appendChild(bNode);
	sidebar .appendChild(baseNode);

	// beyond対策(スタイル変更されていた時の対策)
	if(SERVER_TYPE == 1) {
		var beyondCss = document.defaultView.getComputedStyle(baseNode,'');
		if(beyondCss.position == 'absolute') {
			baseNode.style.cssText = 'position:static; float:left !important;';
		}
	}


	// event
	(function(lhNode,liconNode,lbNode) {
		lhNode.addEventListener('click',function() {
			if(lbNode.style.display == 'none') {
				lbNode   .style.display = 'block';
				liconNode.style.opacity = '1.00';
			} else {
				lbNode   .style.display = 'none';
				liconNode.style.opacity = '0.3';
			}
		}, false);
	})(hNode,iconNode,bNode);
}
// ==============================
//        帰還予定日時表示
// ==============================
function returnDateOnCastleSendTroop() {

	if(location.pathname != '/facility/castle_send_troop.php') return;

	var basenode = getNodeXPath('//table[@class="fighting_about"]/tbody/tr/th')[0];
	if(typeof basenode == 'undefined') return;
	if(basenode.getAttribute('class') == 'suport') return;	// 援軍は表示しない

	basenode = getNodeXPath('//table[@class="fighting_about"]/tbody/tr/td')[0];
	var returnNode = document.createElement('div');
	returnNode.setAttribute('id','etcs_returnDate');
	basenode.appendChild(returnNode);

	viewReturnDateOnCastleSendTroop();
}
function viewReturnDateOnCastleSendTroop() {

	var retnode  = document.getElementById('etcs_returnDate');

	retnode.parentNode.textContent.match(/到着まで:\s*(\d{1,2})\:(\d{1,2})\:(\d{1,2})\s*到達時間:\s*(\d{1,4}\-\d{1,2}\-\d{1,2}\s+\d{1,2}\:\d{1,2}\:\d{1,2})/);
	var movetime    = (parseInt(RegExp.$1,10) * 3600 + parseInt(RegExp.$2,10) * 60 + parseInt(RegExp.$3,10))*1000;		// 移動時間
	var arrivaltime = new Date((RegExp.$4).replace(/-/g,'/'));
	var returntime  = new Date(arrivaltime.getTime() + movetime);
	retnode.textContent = '帰還日時: '+ makeDateString(returntime);
	setTimeout(viewReturnDateOnCastleSendTroop,500);
}
// ========================
//    広告自動クローズ
// ========================
function autoCloseADS() {

	setTimeout(function() {
		clickADS('//*[@id="adsClose_s"]/a');		// ひとことに被さる広告
		clickADS('id("campaign-close-bottom-center")/descendant-or-self::*');	// キャンペーン ポップアップ(自身+子孫)
	},ETCS_OPTION['ADSTime']);

}
/*
	クリックイベントを送出して広告を閉じる
*/
function clickADS( xPathString , flag) {

	var adsResult;
	var i;
	var node;
	var event;


	adsResult = document.evaluate( xPathString,
							document, null, XPathResult. ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(i = 0;i < adsResult.snapshotLength;i++) {
		node = adsResult.snapshotItem(i);
		event = document.createEvent("MouseEvents");
		event.initEvent("click",false,true);
		node.dispatchEvent(event);
	}

}
// ==================================
//   カードステータスアップずれ直し
// ==================================
function alterTableCardStatusUp() {

	if(location.pathname != '/card/status_info.php') return;

	var h2Node = getNodeXPath('//h2/text()');
	if(h2Node.length == 0) return;
	if(!h2Node[0].textContent.match(/ステータス強化/)) return;

	var tableNode = document.getElementById('status_table');
	if(tableNode == null) return;		// テーブルのIDが変わった？

	// サイズを調整
	tableNode.style.minWidth = '400px';
	tableNode.style.width = 'auto';
}

// ==============================
//      袁術先生の台詞直し
// ==============================
function fix_mius_tolk() {

	var convWord = [
		[/確認できるぞい。/g,"確認できるのじゃ。"],	// select
		[/語るぞぃ。/g,"語るのじゃ。"],
		[/わかるぞぃ。/g,"わかるのじゃ。"],
		[/わし/g,"妾"],
		[/妾妾/g,"わらわ、わらわ"],
		[/か妾て/g,"かわして"],	//上のわしでかわしてが変換されるのを修正する
		[/水鏡先生/g,"袁術先生"],	//tuto
		[/水鏡/g,"袁術"],		// tuto
		[/司馬\s*徽\s*徳操/g,"袁 術　公路"],//tuto
		[/しば\s*き\s*とくそう/g,"えん じゅつ　こうろ"],	//tuto
		[/じゃぞ[い|ぃ]/g,"じゃぞ"],
		[/ぞ[い|ぃ]。/g,"のじゃ。"],
		[/の[ぅ]。/g,"の。"],
		[/ぞ[い|ぃ]！/g,"のじゃぞ！"],
		[/ぞ[お|ぉ|ぅ|う]。/g,"ぞ。"],
		[/お[う|ぅ][、|！]/g,"ふむ"],
		[/か？/g,"かの？"],
		[/んじゃ。/g,"のじゃ。"],
		[/教えてくれぃ。/g,"教えるのじゃ。"],
		[/んじゃ、/g,"それでは、"],
		[/じゃろぃ。/g,"じゃろ。"],
		[/ぞ～い。/g,"からの～。"],
		[/るぞ[～|ー]。/g,"るからの～。"],
		[/からな。/g,"からの。"],
		[/おるぞぅ。/g,"おるからの～。"],
		[/ぞぉ～。/g,"からの～。"],
		[/老い先短い老人/g,"可愛い女の子"],
		[/年寄り/g,"女の子"],
		[/わ[い|ぃ]！/g,"のじゃ！"],
		[/わ[い|ぃ]。/g,"のじゃ。"],
		[/わ[い|ぃ]、/g,"のじゃ、"],
		[/ふがふが。/g,"。"],
		[/っちゅー/g,"という"],
		[/凄まじいもん/g,"凄まじい"],
		[/お～～う/g,"お～～い"],
		[/おじいちゃん全部/g,"わらわは全部"],
		[/ほーれ/g,"ほれ"],
		[/くれぇい/g,"くれるかの"],
		[/じゃしな。/g,"だからの。"],
		[/ええんじゃ。/g,"よいのじゃ。"],
		[/来んかい！/g,"来るのじゃ！"],
		[/じゃい！/g,"なのじゃ！"],
		[/よっしゃぃ！/g,"やったのじゃ！"],
		[/またのぅん/g,"またなのじゃ"],
		[/戻ってきなされ。/g,"戻ってくるのじゃぞ。"],	//tuto
		[/戻ってくるんじゃぞ～。/g,"戻ってくるのじゃぞ。"],	//tuto
		[/門下にも/g,"知り合いに"],	//tuto
		[/もういいわい/g,"もういいのじゃ"],	//tuto
		[/妾、言わない/g,"妾、言わないのじゃ"],	//tuto
		[/ぞーぅ。/g,"ぞ。"],	//tuto
		[/こぉぉい。/g,"くるのじゃー！"],
		[/頑張れぇぇい。/g,"頑張るのじゃー！"],
		[/ずごごご…/g,"くぅー……"],
		[/しっかりやれよぉい/g,"しっかりやるんじゃぞ"],
		[/じゃい。/g,"なのじゃ。"],
	];
	var result;
	var src;
	var i,j;

	if(!location.pathname.match(/.*\/quest\/.*/) && !(location.pathname.match(/.*\/tutorial\/.*/))) {
		return;
	}
	result = getNodeXPath('//*[@id="teacher"]');
	if(result.length == 0) return;		// 袁術先生いない
	src = result[0].getAttribute('src');
	if(!src.match(/http\:\/\/.+/)) return;

	// 水鏡先生がリストラの時
	result = getNodeXPath('//div[@id="tutorialDetails"]//text()');

	for(i = 0;i < result.length;i++) {
		for(j = 0;j < convWord.length;j++) {
			result[i].nodeValue = result[i].nodeValue.replace(convWord[j][0],convWord[j][1]);
		}
	}

}
//================================
//          設定画面
//================================
/*
	入り口挿入
*/
function EtcsSetting_Insert() {

	var linode,anode;

	// プロフィールのみ
	if(location.pathname != "/user/") {
		return;
	}
	try {
		if(getNodeXPath('//div[@id="gray02Wrapper"]/h2/text()')[0].nodeValue != "プロフィール")	return;
	}catch(e) {
		return;
	}

	// メニューの最後に追加
	getNodeXPath('//ul[@id="statMenu"]/li[contains(@class,"last") or normalize-space(@class)=""]').forEach(function( hasNode ) {
		hasNode.removeAttribute('class');
	});

	linode = document.createElement('li');
	linode.setAttribute('class','last');
	document.getElementById('statMenu').appendChild(linode);

	anode  = document.createElement('a');
	anode.setAttribute('href','javascript:void(0);');
	anode.appendChild(document.createTextNode('1kibaku-etcsの設定'));
	linode.appendChild(anode);
	anode.addEventListener('click',EtcsSettingWindow,false);



}
/*
	設定画面表示
*/
function EtcsSettingWindow() {
	var insHtml = "";

	if(searchBaseWindow('etcssetting') != null) return;	// 既に開いていたら表示しない
	EtcsSetting_Load();	// もう一度設定を読み直し

	var optWin = new baseWindow('1kibaku-etcs ver.'+SCRIPT_VERSION+'の設定','etcssetting');

	insHtml +=


	'<dl>'+
	'<dt>全体設定</dt>'+
	'<dd><label title="このスクリプトを遅延して実行する時間をミリ秒(1秒は1000ミリ秒)で指定します。">遅延実行時間<input type="text" name="AllDelayTime" size="6" />ミリ秒</label>'+makeDisServiceStr()+'</dd>'+
//	'<dd>'+CreateInputCheckBoxOption('getNowTime',"現在時間の処理に、サーバー時間を使用する","現在の時間を処理するときにサーバー時間を使用します。強制的にPCの時間を使用します。なおチェックに関係なく、サーバー使用時でもエラーの時はPCの時間を使用します")+makeDisServiceStr()+'</dd>'+

	'<dt>広告自動クローズ</dt>'+
	'<dd><label title="広告を自動的に閉じる時間をミリ秒(1秒は1000ミリ秒)で指定します。0でこの機能無効">閉じる時間(0でこの機能無効)<input type="text" name="ADSTime" size="6" />ミリ秒</label>'+makeDisServiceStr()+'</dd>'+
	'<dt>袁術先生</dt>'+
	'<dd>'+CreateInputCheckBoxOption('FixMiuTolk',"袁術先生の台詞修正","fake3gokushi使用時、水鏡先生が袁術先生へと変わりますが、その時の台詞を修正します。")+makeDisServiceStr()+'</dd>'+
	'<dt>フリーマーケット取引</dt>'+
	'<dd>'+CreateInputCheckBoxOption('MarketStockCalc',"フリーマーケットで取引状態を仮算出","フリーマーケット画面で売る資源量を入れると、取引ボタンを押なくても取引後の資源量を表示してくれます。")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('MarketStockCalcTimer',"タイマーで自動更新","資源量の表示をタイマーで自動的に更新します")+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('MarketCostView',"フリーマーケットでコストビュー(各必要資源量)を表示","フリーマーケット画面で、研究や作成に必要な資源量を表示します")+makeDisServiceStr()+'</dd>'+
//	'<dd>'+CreateInputCheckBoxOption('MarketCostViewCalcFullTime',"コストビューに貯蓄完了の予想時間を表示(未完成)","コストビューにその資源が貯まると思われる予想時間を表示します。現在未完成。")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('MarketCostViewDblClick',"コスト欄をダブルクリックで、コストビューの設定をする","コスト欄をダブルクリックすると、コストビューにそのコストを設定します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('checkClassCost',"コスト欄にツールチップで資源が足りているか表示","コストが表示されている欄のツールチップで、現在の資源量で建設できるか表示します")+makeDisServiceStr()+'</dd>'+
	'<dd class="etcs-setting_sub"><label title="不足分を他の資源で埋めるときに必要な量を計算するときの、フリーマーケットの取引相場を入力します">他資源の量の計算に使う取引相場<input type="text" size="7" name="checkClassCostPer" />%</label>'+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('MarketStockPreset',"資源売買のプリセットリストを表示","資源売買のプリセットを表示します")+'</dd>'+


	'<dt>全体地図ドラッグ移動</dt>'+
	'<dd>'+CreateInputCheckBoxOption('MapDragPosMove',"全体地図をドラッグで移動出来るようにする","全体地図をドラッグして移動できるようになります。ニコ鯖であった機能の真似です")+makeDisServiceStr()+'</dd>'+
	'<dt>サイドバー</dt>'+
	'<dd>'+CreateInputCheckBoxOption('SidebarTab',"サイドバーにタブを付ける","サイドバーの表示項目を制御するタブを付加します")+makeDisServiceStr('')+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('clickBPTPCPArea',"IPTPCP表示欄画像クリック時開く","IPTPCP表示欄の画像をクリックすると、ブショーダス・トレード・便利機能を開きます")+makeDisServiceStr('')+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('SidebarWidth',"サイドバーの幅を大きくする","サイドバーの幅を大きくします")+makeDisServiceStr('myf')+'</dd>'+
	'<dd class="etcs-setting_sub"><label title="サイドバーを増やすサイズをピクセル単位で指定します">サイドバーの幅を増やすサイズ<input type="text" size="6" name="SidebarWidth_AddSize" />ピクセル</label>'+makeDisServiceStr('myf')+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('SidebarWidth_AdjustStatusR',"サイドバー幅変更時、IP/TP/CP位置調整","サイドバーの幅を変更したとき、IP/TP/CPの表示欄の位置を調整します")+makeDisServiceStr('myf')+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('SidebarWidth_VillageBlock',"サイドバー幅変更時、拠点の幅も変更","サイドバーの幅を変更したとき、拠点の名前の部分も幅を広げます")+makeDisServiceStr('myf')+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('sidebarInputPos',"サイドバーに地図座標入力欄を付ける","サイドバーに地図を座標移動するための入力欄を付けます")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('SidebarFacilityLink',"施設リンクを使用する","サイドバーに施設へ直接飛べるリンクを設置します")+makeDisServiceStr()+'</dd>'+
	'<dd class="etcs-setting_sub">'+'拠点の変更動作方法<ul class="etcs-setting_sub"><li><label><input type="radio" name="facilityLinkMoveType" value="ajax" title="Ajaxを使用した今までの方法で変更します">Ajaxで移動(旧タイプ)</label></li><li><label><input type="radio" name="facilityLinkMoveType" value="redirect" title="メニューの拠点にあるリダイレクトを使用した方法で変更します">villageChange.phpで移動(メニューのタイプ)</label></li></ul>'+makeDisServiceStr()+'</dd>'+

	'<dt>入力文字数の表示</dt>'+
	'<dd>'+CreateInputCheckBoxOption('InputStrLen_Chat',"ひとことの入力文字数表示","ひとことの文字入力欄の文字数を表示します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('InputStrLen_BBS',"同盟掲示板の入力文字数表示","同盟掲示板の本文入力欄の文字数を表示します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('InputStrLen_PersonBBS',"個人掲示板の入力文字数表示","個人掲示板の本文入力欄の文字数を表示します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('InputStrLen_Mail',"書簡の入力文字数表示","書簡の本文入力欄の文字数を表示します")+makeDisServiceStr()+'</dd>'+

	'<dt>カードクリックで開く</dt>'+
	'<dd>'+CreateInputCheckBoxOption('JumpURIFromClickCard',"カードNo.をクリックすると、指定のURLを開く","カードNo.をクリックすると、指定のURLを開きます。合成表が記載されているページを指定すると良いでしょう")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('cardRightClickSkill',"カード右クリックを使用する","カードを右クリックすると指定のURLを開いたり、トレードを開けるメニューを出します")+makeDisServiceStr()+'</dd>'+
	'<dd class="etcs-setting_sub"><label title="カードNo.をクリック/右クリックのカードNo.でURLを開くを使用したとき、ここで指定のURLを開きます">カードNo.で開くURL <span style="font-size:80%;">(半角で%%NO%%の文字列は、カードNo.に置き換わります)</span><br /><input type="text" size="50" name="JumpURIFromClickCardNoURI" /></label><span style="font-size:80%;"></span>'+makeDisServiceStr()+'</dd>'+
	'<dd class="etcs-setting_sub"><label title="カードを右クリックしてスキル名で開く時、ここで指定のURLを開きます">カード右クリックの時、スキルで開くURL <span style="font-size:80%;">(半角で%%ID%%の文字列は、CSV指定のIDに置き換わります)</span><br /><input type="text" size="50" name="cardRightClickSkillURL" /></label>'+makeDisServiceStr()+'</dd>'+
	'<dd class="etcs-setting_sub"><label title="URLを開く時に使用するIDなどをスキル名から検索するためのデータをCSVで入力します。詳しくは説明書をご覧ください">スキルCSV入力欄 <span style="font-size:80%;">(書式：No[TAB]スキル名)</span><br /><textarea style="width:80%;" rows="6" name="cardRightClickSkillCSV"></textarea></label>'+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('cardRightClickSkillNewTab',"常に新しいウインドウ(タブ)で開く","URLやトレード画面などを開くときに、常に新しいウインドウやタブで開くようにします")+makeDisServiceStr()+'</dd>'+


	'<dt>ステータスアップのボタンずれ修正</dt>'+
	'<dd>'+CreateInputCheckBoxOption('alterTableCardStatusUp',"カードステータスアップのボタンずれ調整","カードのステータスアップ画面で、経験値が大量にあって尚且つ一気に+10以上増やすとき、+5ボタンが改行される問題を修正します")+makeDisServiceStr()+'</dd>'+

	'<dt>トレード関係</dt>'+
	'<dd>'+CreateInputCheckBoxOption('viewSellCardFees',"カード出品時に手数料を表示する","カードを出品するときに、希望落札価格に対する手数料を表示します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('listViewSellCardFees',"出品中のカードで手数料を表示する","トレードの出品中のカードで、希望落札価格と最大入札TPに手数料を表示します")+makeDisServiceStr()+'</dd>'+

	'<dd>'+CreateInputCheckBoxOption('AlertOfBuyTradeTime_Bid',"入札時に落札まで24時間以上かかるなら警告する","落札処理が次の10時ではない(落札まで24時間以上)の場合、警告します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('AlertOfBuyTradeTime_List',"トレードのリストで、落札まで24時間以上かかるの物はアイコンを変える","トレードのリストで、落札が次の10時で無い(落札まで24時間以上)物のアイコンを変更します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('addRTradeSortLink',"トレードリストのソート機能で、レアリティの表示非表示を維持する","トレードのリスト表示の時に、ソートするとレアリティの表示・非表示が解除されるのを防ぐよう修正します")+makeDisServiceStr()+'</dd>'+

	'<dt>スキルタイム</dt>'+
	'<dd>'+CreateInputCheckBoxOption('skillTimer_List',"取得した全てのスキル回復完了時刻をリスト表示する","取得した全てのスキル回復完了時刻・使用終了時刻をリスト表示します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('skillTimer_Card',"そのカードのスキル回復完了時刻を取得できているとき、ツールチップで表示する","取得できたスキルの回復完了時刻・使用終了時刻を、ツールチップで表示します")+makeDisServiceStr()+'</dd>'+

	'<dt>出陣時関連</dt>'+
	'<dd>'+CreateInputCheckBoxOption('retDateOnSendTroop',"出陣時に帰還日時表示","出陣時に帰還する日時を計算して表示します(援軍除く)")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('carDmgCalc',"出陣時に予測の拠点ダメージを表示","出陣時に、拠点に与えるダメージを予測して表示します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('SendTroopAtackDefault',"出陣時に、出陣種類の欄のデフォルトを変更","出陣時に選択する、出陣の種類のデフォルトを変更します")+makeDisServiceStr()+'</dd>'+
	'<dd class="etcs-setting_sub">'+'出陣種類の欄で、デフォルトで選択する種類<ul class="etcs-setting_sub"><li><label><input type="radio" name="SendTroopAtackDefaultType" value="-1" title="デフォルトを未選択にします">未選択</label></li><li><label><li><label><input type="radio" name="SendTroopAtackDefaultType" value="301" title="デフォルトを援軍にします">援軍</label></li><li><label><input type="radio" name="SendTroopAtackDefaultType" value="302" title="デフォルトを殲滅戦/賊討伐にします(標準の動作)">殲滅戦/賊討伐</label></li><li><label><input type="radio" name="SendTroopAtackDefaultType" value="303" title="デフォルトを強襲にします">強襲</label></li><li><label><input type="radio" name="SendTroopAtackDefaultType" value="306" title="デフォルトを偵察にします">偵察</label></li></ul>'+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('getUnitStatusTime',"下級闘士管理で情報を出力する欄を表示","下級闘士管理の画面に、情報を出力する欄を表示します")+makeDisServiceStr()+'</dd>'+


	'<dt>ラベルタブ修正</dt>'+
	'<dd>'+CreateInputCheckBoxOption('revLabelTabLink',"ラベルタブのリンクを修正","ラベルタブのリンクをクリックしたときに、ファイルにスクロールするようにリンクを修正します")+makeDisServiceStr()+'</dd>'+

	'<dt>デッキ関係</dt>'+
	'<dd>'+CreateInputCheckBoxOption('deckToDomestic',"デッキにセットされているカードのセット状態にリンクを付ける","デッキにセットされているカードのセット状態に、リンクを付けます")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('deckPagerUpperClone',"カード合成やカード出品で、ページ切り替えを上部にも付ける","カードの各種合成の画面やカードの出品の画面で、ページ切り替えのリンクをカード上部にも表示するようにします")+makeDisServiceStr()+'</dd>'+

	'<dt>兵作成</dt>'+
	'<dd>'+CreateInputCheckBoxOption('makeDisSolMax',"兵の最大作成数リンク表示","兵を作るときに、割引後の価格で作成できる最大数を入力するリンクを表示します")+makeDisServiceStr()+'</dd>'+
	'<dd>'+CreateInputCheckBoxOption('AccommodationFree',"拠点画面の空き一般学生寮数を表示","拠点画面で、一般学生寮の空き数を表示します")+makeDisServiceStr()+'</dd>'+
	'<dd class="etcs-setting_sub">空き一般学生寮数の表示の仕方<ul class="etcs-setting_sub"><li><label><input type="radio" name="AccommodationFreeType" value="0" title="ツールチップで表示します">ツールチップで表示</label></li><li><label><input type="radio" name="AccommodationFreeType" value="1" title="兵数の欄に表示します">兵数の欄に表示</label></li></ul></dd>'+

	'</dl><input type="button" value="設定を保存" title="3gokushi-etcsの設定を保存します"/>'+
	'<hr style="display:block; border:none; border-top:1px dashed #000000; margin:1em 0em;"/><input type="button" value="他のサーバーの設定を読み込み" title="他のサーバーの3gokushi-etcsの設定を読み込みます" />'+
	'<hr style="display:block; border:none; border-top:1px dashed #000000; margin:1em 0em;"/><input type="button" value="指定サーバーの設定を全て削除" title="3gokushi-etcsのデータを削除します" />';


//
	node = document.createElement('div');
	node.innerHTML = insHtml;
	node.setAttribute('id','etcs-setting');
	node.style.width   = '100%';
	node.style.margin  = '0px';
	node.style.padding = '0px';

	optWin.addContent(node);
	optWin.disp(true);

	if(SERVER_TYPE == 1) optWin.center(undefined,30);	//mixi
	else	optWin.center();

	// 保存ボタンへのイベント
	node = getNodeXPath('//div[@id="etcs-setting"]//input[@type="button"]')[0];
	node.addEventListener('click',EtcsSetting_Save,false);
	node.style.textAlign = 'center';

	// 削除ボタンへのイベント
	node = getNodeXPath('//div[@id="etcs-setting"]//input[@type="button"]')[1];
	node.addEventListener('click',getServerSaveData,false);
	node.style.textAlign = 'center';

	// 削除ボタンへのイベント
	node = getNodeXPath('//div[@id="etcs-setting"]//input[@type="button"]')[2];
	node.addEventListener('click',allClearServerSaveData,false);
	node.style.textAlign = 'center';



	// 各種設定にチェックを付ける
	ETCSSetting_CheckFunc(function(list,node) {
		switch(list[1]) {
			case 'radio' :
				if(node.value == ETCS_OPTION[list[0]]) {
					node.checked = true;
				}
			break;
			case 'value' :
				node.value   = ETCS_OPTION[list[0]];
			break;
			case "checked" :
				node.checked = ETCS_OPTION[list[0]];
			break;
		}

	});
}

/*
	チェックボックス生成(設定用)
*/
function CreateInputCheckBoxOption( name, title, description ) {
	return('<label title="'+description+'"><input type="checkbox" name="'+name+'" />'+title+'</label>');
}
/*
	チェックボックス生成
*/
function CreateInputCheckBox( state, title, description ) {
	return('<label title="'+description+'"><input type="checkbox"'+(state ? ' checked="checked"' : '') + ' />'+title+'</label>');
}
/*
	無効鯖文字列生成
	(無効にする鯖を文字列で列挙： 'ymh'= yahoo/mixi/hangeを無効
*/
function makeDisServiceStr( flag ) {

	flag = typeof flag == 'undefined' ?  '' : flag;

	for(i = 0;i < flag.length;i++) {
		if(flag.charAt(i) == SERVICE_TYPE) {
			return('(<strong style="color:red;">※このサーバーでは使えません</strong>)');
		}
	}
	return '';
}



/*
	設定(呼び出される)
*/
function ETCSSetting_CheckFunc( func ) {

	var inputNode = getNodeXPath('id("etcs-setting") //input | //textarea | //select');
	for(i in inputNode) {
		var name = inputNode[i].getAttribute('name');

		for(j in saveDefaultData) {
			if(saveDefaultData[j][0] == name) {
				func(saveDefaultData[j],inputNode[i]);
			}
		}
	}
}
/*
	設定保存(ボタンクリックで呼ばれる)
*/
function EtcsSetting_Save( event ) {

	ETCSSetting_CheckFunc(function(list,node) {
		var saveData = null;

		switch(list[1]) {
			case "radio" :
				if(node.checked) {
					saveData = node.value;
				}
			break;
			case 'value' :
				saveData = node.value;
			break;
			case "checked" :
				saveData = node.checked;
			break;
		}
		if(saveData != null)	GM_setValue(SAVE_NAME+"SETTING_"+list[0],saveData);
	});


	alert("設定を保存しました。リロードするかページを移動すると有効になります。");
}
/*
	設定読み込み
*/
function EtcsSetting_Load( savename ) {

	savename = typeof savename == 'undefined' ? SAVE_NAME : SAVE_NAME_HEAD+savename+"_";

	var i,j;
	var data;

	ETCS_OPTION = [];
	// default設定
	for(i = 0;i < saveDefaultData.length;i++) {
		ETCS_OPTION[saveDefaultData[i][0]] = saveDefaultData[i][2];
	}

	// 設定読み込み
	for(i = 0;i < saveDefaultData.length;i++) {
		data = GM_getValue(savename+"SETTING_"+saveDefaultData[i][0]);
		if(data != null) {
			ETCS_OPTION[saveDefaultData[i][0]] = data;
		}
	}


}

/*
	指定サーバーのデータを読み込み
*/
function getServerSaveData() {
	var server = prompt("設定を読み込むサーバーの接頭語(s**やm**など)を入力してください。",SERVER_NAME);
	if(server == null) return;

	var opt = [];

	// backup
	for(var i in ETCS_OPTION) {
		opt[i] = ETCS_OPTION[i];
	}

	EtcsSetting_Load(server);

	// 各種設定にチェックを付ける
	ETCSSetting_CheckFunc(function(list,node) {
		switch(list[1]) {
			case 'radio' :
				if(node.value == ETCS_OPTION[list[0]]) {
					node.checked = true;
				}
			break;
			case 'value' :
				node.value   = ETCS_OPTION[list[0]];
			break;
			case "checked" :
				node.checked = ETCS_OPTION[list[0]];
			break;
		}

	});

	// restore
	for(var i in ETCS_OPTION) {
		ETCS_OPTION[i] = opt[i];
	}

}
/*
	指定サーバーの記録を全て削除
*/
function allClearServerSaveData() {

	var server = prompt("削除するサーバーの接頭語(s**やm**など)を入力してください。\n\n【！！警告！！】\nOKを押すと、指定サーバーの3gokushi-etcsの設定が 『全て』 削除されます。\n取り扱いには十分注意してください！",SERVER_NAME);
	if(server == null) return;

	var name = "1KKIBAKU_ETCS_"+server+"_";
	var keys     = GM_listValues();
	for (var i in keys) {
		if (keys[i].indexOf(name, 0) == 0) {
			GM_deleteValue(keys[i]);
		}
	}

	alert("指定サーバー("+server+")のデータを全て削除しました");
}

// ========================
//      基本ウインドウ
// ========================
function baseWindow( title , winid, minBtn, maxBtn ){

	minBtn = typeof minBtn == 'undefined' ? false : minBtn;
	maxBtn = typeof maxBtn == 'undefined' ? false : maxBtn;


	// 基本ウインドウ
	this.winNode  = document.createElement('div');
	this.winNode.setAttribute('class','etcsBaseWindow');

	this.hStart = eventBridgeFunc(this,'dragStart');
	this.hNow   = eventBridgeFunc(this,'dragNow');
	this.hEnd   = eventBridgeFunc(this,'dragEnd');


	// タイトルバー
	this.titleBar = document.createElement('div');

	node = document.createElement('span');
	node.textContent = title;
	this.titleBar.appendChild(node);
	this.titleBar.addEventListener('mousedown', this.hStart, false);

	// ボタン領域
	this.btnArea = document.createElement('div');
	with(this.btnArea.style) {
		position = 'absolute';
		top      = '0.2em';
		right    = '4px';
		height   = '1em';
		margin   = '0';
		padding  = '0';
		boxShadow= '1px 1px rgba(0,0,0,0.4)';
		zIndex   = '10012';
	}

	// 閉じるボタン
	this.closeBtnNode = document.createElement('img');
	this.closeBtnNode.setAttribute('src','data:image/png;base64,'+		// ×ボタン画像
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAAGuEPsmAAAAAXNSR0IArs4c6QAAAThJREFU'+
		'GNNNkD2uwjAQhGcNFhBxAQo4ACVCQiEnCLWRaOBoFKR0WpQLhNBAS2cXRIgThBQrsa8wDzHl'+
		'7N83S8xc1zW8903TwHvfmc1m5L0XkbIsyXsPQES6p9NJRPb7vWqa5v1+AyDv/Wg0yvNcRF6v'+
		'V5ZlCoC1VkTSNO33+1prcs7tdjutNQAA5/OZnHNEhH+Nx+PO9XodDofP57Ou68Vi8Xg8lNZ6'+
		'MBgAWC6XeZ4DUAEmTdOA87HW6/XxeAwQAKjX68VxHHYz8+FwIOfcdDqdz+dfjq+Y+XK53G63'+
		'LhHFcbzZbLbbbUgFgIiMMVmWaa2JqBuGoiiy1iqlVqsVgKIorLVRFIXqp4mIiChJkqIoACRJ'+
		'UpblN7gKt40xbdtWVRXcqqratjXGMDMAYub7/f77rV+JyGQy+QMV16krWAPknAAAAABJRU5E'+
		'rkJggg==');
	this.closeBtnNode.setAttribute('title','閉じる');
	with(this.closeBtnNode.style) {
		float    = 'right';
		width    = '1em';
		height   = '1em';
		margin   = '0';
		padding  = '0';
		boxShadow= '1px 1px rgba(0,0,0,0.4)';
		zIndex   = '10012';
	}

	(function(lthis) {
		lthis.closeBtnNode.addEventListener('mouseover',function(){lthis.closeBtnNode.style.cursor = 'pointer';},false);
		lthis.closeBtnNode.addEventListener('mouseout', function(){lthis.closeBtnNode.style.cursor = '';}       ,false);
	})(this);
	this.closeBtnHdl = eventBridgeFunc(this,'closeBtn');
	this.closeBtnNode.addEventListener('click', this.closeBtnHdl, false);	// 動作

	// 最小化ボタン
	this.minBtnNode = document.createElement('img');
	this.minBtnNode.setAttribute('src','data:image/png;base64,'+		// ボタン画像
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAEBJREFU'+
		'GNNj/P//PwNBQFDR////WSCshQsXYlURHx/PwMDAxEAEGIyKoL6Li4tDFl20aBG5JjEyMuJR'+
		'xEhMtAAAZ+cSEp980xYAAAAASUVORK5CYII=');
	this.minBtnNode.setAttribute('title','最小化');
	with(this.minBtnNode.style) {
		float    = 'right';
		width    = '1em';
		height   = '1em';
		margin   = '0';
		padding  = '0';
		boxShadow= '1px 1px rgba(0,0,0,0.4)';
		zIndex   = '10012';
	}
	if(!minBtn) this.minBtnNode.style.display = 'none';
	(function(lthis) {
		lthis.minBtnNode.addEventListener('mouseover',function(){lthis.minBtnNode.style.cursor = 'pointer';},false);
		lthis.minBtnNode.addEventListener('mouseout', function(){lthis.minBtnNode.style.cursor = '';}       ,false);
	})(this);
	this.minBtnHdl = eventBridgeFunc(this,'minBtn');
	this.minBtnNode.addEventListener('click', this.minBtnHdl, false);	// 動作

	// 最大化ボタン
	this.maxBtnNode = document.createElement('img');
	this.maxBtnNode.setAttribute('src','data:image/png;base64,'+		// ボタン画像
		'iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAEVJREFU'+
		'GNOtkMEJwDAMA6WQOT2cF708Ai30YacQvQQ+ZDgDatNCwKxR25KGDnIEzadl5ucWET+W7kEG'+
		'bBcKXk/bR7XUvlsughsOe4iR0AAAAABJRU5ErkJggg==');
	this.maxBtnNode.setAttribute('title','最大化');
	with(this.maxBtnNode.style) {
		float    = 'right';
		width    = '1em';
		height   = '1em';
		margin   = '0';
		padding  = '0';
		boxShadow= '1px 1px rgba(0,0,0,0.4)';
		zIndex   = '10012';
	}
	if(!maxBtn) this.maxBtnNode.style.display = 'none';
	(function(lthis) {
		lthis.maxBtnNode.addEventListener('mouseover',function(){lthis.maxBtnNode.style.cursor = 'pointer';},false);
		lthis.maxBtnNode.addEventListener('mouseout', function(){lthis.maxBtnNode.style.cursor = '';}       ,false);
	})(this);
	this.maxBtnHdl = eventBridgeFunc(this,'maxBtn');
	this.maxBtnNode.addEventListener('click', this.maxBtnHdl, false);	// 動作


	// 内容部分
	this.contentNode = document.createElement('div');
/*
	with(this.contentNode.style) {
		background  = '#ffffff';
		margin       = '0';
		padding      = '14px';
		overflow     = 'auto';
		resize       = 'both';
		borderRadius = '0px 0px 9px 9px / 0px 0px 9px 9px';
	}
*/
	// 追加
	this.pareNode = document.getElementsByTagName('body')[0];
	this.pareNode.appendChild(this.winNode);
	this.winNode .appendChild(this.titleBar);
	this.titleBar.appendChild(this.btnArea);
	this.btnArea .appendChild(this.minBtnNode);
	this.btnArea .appendChild(this.maxBtnNode);
	this.btnArea .appendChild(this.closeBtnNode);
	this.winNode .appendChild(this.contentNode);


	this.winID = winid;
	baseWinList.push(this);

	this.listNo = baseWinList.length - 1;



	this.disp(false);	//off
}
baseWindow.prototype = {

	common   : [],			// 汎用
	listNo   : 0,
	winID    : null,		// ウインドウのID
	pareNode : null,		// ウインドウの親ノード
	winNode  : null,		// ウインドウ自体のノード
	titleBar : null,		// タイトルバー
	btnArea  : null,		// ボタン系エリア(追加分)
	iconArea : null,		// アイコンエリア(追加分)
	closeBtnNode : null,		// 閉じるボタン
	minBtnNode   : null,		// 最小化　〃
	MaxBtnNode   : null,		// 最大化　〃
	closeProc: null,		// 閉じる時呼び出される関数
	minProc  : null,		// 最小化時      〃
	MaxProc  : null,		// 最大化時      〃
	closeBtnHdl : null,		// 閉じるボタン、イベントハンドラ
	minBtnHdl   : null,		// 最小化ボタン        〃
	maxBtnHdl   : null,		// 最大化ボタン        〃
	contentArea : null,		// 内容部分
	contentNode  : null,	// 内容のノード
	dragFlag : false,		// ドラッグ中
	win_x    : 0,			// ウインドウ座標X
	win_y    : 0,			//               Y
	hStart   : null,		// ドラッグ用 mousedownハンドラ
	hNow     : null,		// ドラッグ用 mousemoveハンドラ
	hEnd     : null,		// ドラッグ用 mouseup  ハンドラ
	drag_x   : 0,
	drag_y   : 0,

	// クローズ(終了処理)
	close : function() {
		 if(!((this.closeProc != null) ? this.closeProc() : true)) return;	// falseでキャンセル

		this.closeBtnNode.removeEventListener('click', this.closeBtnHdl, false);	// 閉じる
		this.minBtnNode  .removeEventListener('click', this.minBtnHdl  , false);	// 最小
		this.maxBtnNode  .removeEventListener('click', this.maxBtnHdl  , false);	// 最大

		this.pareNode.removeChild(this.winNode);
		delete baseWinList[this.listNo];

	},
	// 最小化
	min : function() {
		if(this.minProc != null) this.minProc();
	},
	// 最大化
	max : function() {
		if(this.maxProc != null) this.maxProc();
	},

	// 閉じるボタン
	closeBtn : function( event ) {
		this.close();
		event.preventDefault();
	},
	// 最小化ボタン
	minBtn : function( event ) {
		this.min();
		event.preventDefault();
	},
	// 最大化ボタン
	maxBtn : function( event ) {
		this.max();
		event.preventDefault();
	},

	// ドラッグ開始
	dragStart: function( event ) {
		if((event.currentTarget != this.titleBar) || (event.target == this.closeBtnNode)
				 || (event.target == this.maxBtnNode)  || (event.target == this.minBtnNode)){
			 return true;	// タイトルバーじゃない
		}
		this.drag_x = event.layerX;
		this.drag_y = event.layerY;

		document.addEventListener('mousemove', this.hNow, false);
		document.addEventListener('mouseup',   this.hEnd, false);
		this.winNode.style.opacity = '0.8';
		event.preventDefault();
		return false;
	},
	// ドラッグ中
	dragNow : function( event ) {

		this.winNode.style.left = (event.pageX-this.drag_x)+'px';
		this.winNode.style.top  = (event.pageY-this.drag_y)+'px';

	},
	// ドラッグ終了
	dragEnd : function( ) {
		document.removeEventListener('mousemove', this.hNow, false);
		document.removeEventListener('mouseup',   this.hEnd, false);
		this.winNode.style.opacity = '1.0';
	},

	// ウインドウサイズの調整
	fixSize : function () {
		var containerNode = document.getElementById('container');
		var rect = this.winNode.getBoundingClientRect();

		// window全体
		var winw = rect.width;
		var winh = rect.height;

		try {
			winw = (winw > window.top.innerWidth  - 48) ? window.top.innerWidth  - 48 : winw;
			winh = (winh > window.top.innerHeight - 48) ? window.top.innerHeight - 48 : winh;
		} catch(e) {
			// mixi(frame)
			winw = (winw > containerNode.offsetWidth  - 48) ? containerNode.offsetWidth  - 48 : winw;
			winh = (winh > containerNode.offsetHeight - 48) ? containerNode.offsetHeight - 48 : winh;
		}
		var w   = parseInt(document.defaultView.getComputedStyle(this.contentNode,'').width);
		var h   = parseInt(document.defaultView.getComputedStyle(this.contentNode,'').height);

		this.contentNode.style.width  = winw - (rect.width  - w)  + 'px'
		this.contentNode.style.height = winh - (rect.height - h)  + 'px'
	},

	// ON/OFF
	disp : function( flag ) {
		if(flag == true) {
			this.winNode.style.display = 'block';
			this.fixSize();
			this.contentNode.style.minWidth = (this.titleBar.getElementsByTagName('span')[0].offsetWidth + 12) + 'px';
			this.winNode.style.opacity = '1.0';


		} else if(flag == false){
			this.winNode.style.opacity = '0.0';
			this.winNode.style.display = 'none';
		}
	},

	// 指定位置に表示
	pos : function( x, y ) {
		this.winNode.style.left = x + 'px';
		this.winNode.style.top  = y + 'px';
	},
	// ブラウザ真ん中に表示
	// 引数指定時、センタリングしない
	center : function( posx, posy ) {

		var x;
		var y;

		try {
			// 本鯖
			x = ((window.top.innerWidth  - this.winNode.offsetWidth)  / 2 + window.scrollX);
			y = ((window.top.innerHeight - this.winNode.offsetHeight) / 2 + window.scrollY);
		} catch(e) {
			// mixi(frame)
			// 子frameから親のwindowはpermissionエラーなので、containerを使う(仮)
			var containerNode = document.getElementById('container');
			x = (containerNode.offsetWidth  -  this.winNode.offsetWidth) / 2;
			y = (containerNode.offsetHeight -  this.winNode.offsetWidth) / 2;
		}

		// 引数指定時はそれを使う
		x = typeof posy != 'undefined' ? posx : x;
		y = typeof posy != 'undefined' ? posy : y;

		this.winNode.style.left = (x < 0 ? 0 : x) + 'px';
		this.winNode.style.top  = (y < 0 ? 0 : y) + 'px';

	},

	// 座標近くに表示
	nearPos : function( x, y ) {

		var rect        = this.winNode.getBoundingClientRect();

		x = x - 12;
		y = y - 12;
		if(x < 0) x = 0;
		if(y < 0) y = 0;
		try {
			// 本鯖
			if((x + rect.width) > window.top.innerWidth - 16) {
				x = window.top.innerWidth  - rect.width;
			}
			if((y + rect.height) > window.top.innerHeight - 16) {
				y = window.top.innerHeight - rect.height;
			}
		} catch(e) {
			// mixi(frame)
			var containerNode = document.getElementById('container');
			if((x + rect.width) > containerNode.offsetWidth - 16) {
				x = containerNode.offsetWidth - rect.width;
			}
			if((y + rect.height) > containerNode.offsetHeight - 16) {
				y = containerNode.offsetHeight - rect.height;
			}
		}

		this.winNode.style.left = x + window.scrollX + "px";
		this.winNode.style.top  = y + window.scrollY + "px";

	},
	// ノード近くに表示
	nearPosNode : function( node ) {
		var x;
		var y;

		var rect = node.getBoundingClientRect();
		x = rect.left;
		y = rect.top;

		this.nearPos(x,y);

	},

	// マウス近くに表示
	nearPosMouse : function ( event ) {
		this.nearPos(event.clientX,event.clientY);

	},

	// 内容を追加
	addContent : function( addNode ) {
		this.contentNode.appendChild( addNode );
	},

};
// ========================
//      自前ツールチップ
// ========================
/*
	ノードにツールチップをセットする
*/
function setToolTip( targetNode , str ) {

	targetNode.addEventListener('mouseover',function( event ) {
		setToolTipCore(event, targetNode,str);
	},false);

};
/*
	既にそのノードでセットされているツールチップを返す
*/
function getToolTip( targetNode ) {
	for(var i = 0;i < myToolTipList.length; i++) {
		if(typeof myToolTipList[i] == 'undefined') continue;
		if(myToolTipList[i].targetNode == targetNode) return myToolTipList[i];
	}

	return null;
}
/*
	自前のツールチップを呼ぶ
*/
function setToolTipCore( event, targetNode , str ) {

	var strnode;

	switch(typeof str) {
		case 'string':				// 文字列
			strnode = document.createElement('p');
			strnode.innerHTML = str;
		break;
		case 'object':				// オブジェクト
			try {
				str.nodeType == str.nodeType;
				strnode = str;
			} catch(e) {
				console.log("ERROR:setToolTip > not node or string");
				return;
			}
		break;
	}

	// 既にそのノードにチップがあったら追加
//	var tips = getToolTip(targetNode);
//	if(tips != null) {
//		this.addContent(strnode);
//		return;
//	}

	var tooltip = new MyToolTip(event, targetNode,strnode);
	targetNode.addEventListener('mouseout', tooltip.closeHdl, false);

}
/*
	自前のツールチップ
*/
function MyToolTip( event, targetNode , contentNode ) {

	this.pareNode = document.getElementsByTagName('body')[0];

	if(typeof targetNode  == 'undefined') {console.log("MyToolTip:none TargetNode");  return; }
	if(typeof contentNode == 'undefined') {console.log("MyToolTip:none contentNode"); return; }

	this.addContent(contentNode);
	this.targetNode  = targetNode;
	this.closeHdl    = eventBridgeFunc(this,'close');
	this.waitHdl     = eventBridgeFunc(this,'wait');
	this.mouseChkHdl = eventBridgeFunc(this,'mousecheck');


	this.wait(event);
	myToolTipList[myToolTipList.length] = this;
//	console.log(this);
//	console.log(myToolTipList);
	this.listNo = myToolTipList.length - 1;

}
MyToolTip.prototype = {

	listNo      : 0,
	targetNode  : null,		// ターゲット
	frameNode   : null,		// 吹き出しベース
	contentNode : null,
	pareNode    : null,		// 追加元
	closeHdl    : null,		// 閉じる時の関数
	waitHdl     : null,		// ウエイト開始の関数
	mouseChkHdl : null,		//
	timerID     : -1,
	mouseX      : -1,
	mouseY      : -1,
	dispInfo    : false,
	nodeList    : null,

	// コンテンツ追加
	addContent : function( contentNode ) {
		this.contentNode = contentNode;
//		this.contentNode[this.contentNode.length] = contentNode;
//console.log(this.contentNode.length);
	},

	// 吹き出し表示まち開始
	wait : function( event ) {

		this.mouseX = event.clientX;
		this.mouseY = event.clientY;

		this.targetNode.addEventListener('mousemove',this.mouseChkHdl, false);	// 動いたら消す
		this.disp_off();
		if(this.timerID != -1) { clearTimeout(this.timerID); this.timerID = -1; }
		this.timerID = setTimeout(eventBridgeFunc(this,'disp'), 1000);

	},
	// マウスチェック
	mousecheck : function( event ) {
		this.mouseX = event.clientX;
		this.mouseY = event.clientY;

		this.disp_off();
		if(this.timerID != -1) { clearTimeout(this.timerID); this.timerID = -1; }
		this.timerID = setTimeout(eventBridgeFunc(this,'disp'), 1000);
	},


	// 終了時
	close : function() {
		if(this.timerID != -1) { clearTimeout(this.timerID); this.timerID = -1; }
		this.targetNode.removeEventListener('mousemove', this.mouseChkHdl ,    false);
		this.disp_off();

		delete myToolTipList[this.listNo];

	},

	// 吹き出しの表示
	disp : function() {

		this.timerID = -1;
		this.dispInfo = true;
		this.frameNode = document.createElement('div');
		this.frameNode.setAttribute('class','etcs_mytooltip');
//		for(var i = 0;i < this.contentNode.length;i++) {
//			this.frameNode.appendChild(this.contentNode[i]);
//		}
		this.frameNode.appendChild(this.contentNode);
		this.pareNode.appendChild(this.frameNode);


		this.nearPos(this.mouseX,this.mouseY);

	},
	disp_off : function() {
		if(this.dispInfo) {
			this.dispInfo = false;
			this.pareNode.removeChild(this.frameNode);
		}
	},

	// 座標近くに表示
	nearPos : function( x, y ) {

		var rect        = this.frameNode.getBoundingClientRect();

		try {
			// 本鯖
			if((x + rect.width) > window.top.innerWidth - 36) {
				x = x - rect.width + window.scrollX;
			} else {
				x = x + 12 + window.scrollX;
			}
			if((y + rect.height) > window.top.innerHeight - 36) {
				y = y - rect.height + window.scrollY;
			} else {
				y = y + 12 + window.scrollY;
			}
		} catch(e) {
			// mixi(frame)
			var containerNode = document.getElementById('container');
			if((x + rect.width) > containerNode.offsetWidth - 36) {
				x = x - rect.width + window.scrollX;
			} else {
				x = x + 12 + window.scrollX;
			}
			if((y + rect.height) > containerNode.offsetHeight - 36) {
				y = y - rect.height + window.scrollY;
			} else {
				y = y + 12 + window.scrollY;
			}
		}

		this.frameNode.style.left = x + "px";
		this.frameNode.style.top  = y + "px";

	},
};

/*
	既にウインドウが登録されていたら返す
*/
function searchBaseWindow( winid ) {

	for(i in baseWinList) {
		if(baseWinList[i].winID == winid) return baseWinList[i];
	}
	return null;
}
// ========================
//        ツール類
// ========================
/*
   クラスのメンバにイベントで飛ぶときに、thisがクラスを指すようにするブリッジ
   inst :
   func : 関数名(文字列)
*/
function eventBridgeFunc( inst, func ) {
	return function( event ) {
		eval("inst."+func+'( event )');
	}
}

/*
	XPATHでノードを取得(返値：取得したノードの配列)
*/
function getNodeXPath( xpath , base , doc ) {
	base = (typeof base == "undefined" ? document : base);
	doc  = (typeof doc  == "undefined" ? document : doc);

	var result = doc.evaluate(xpath,base,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var ret    = [];


	for(var i = 0;i < result.snapshotLength;i++) {
		ret.push(result.snapshotItem(i));
	}
	return(ret);
}
/*
	XPATHでノードを選択し、イベントを付加
*/
function addEventByXPath( xpath, event, func ,flag) {
	flag = typeof flag == 'undefined' ? true : flag;
	var result = document.evaluate(xpath,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var ret;

	for(var i = 0;i < result.snapshotLength;i++) {
		ret = result.snapshotItem(i);
		ret.addEventListener(event,func,flag)
	}
}
/*
	DateObjから文字列(yyyy-mm-dd hh:mm:ss)生成
*/
function makeDateString( date ) {

	return(date.getFullYear() + '-' +
			 ('00'+(date.getMonth()+1)).substr(-2) + '-' +
			 ('00'+date.getDate())   .substr(-2) + ' '+
			 ('00'+date.getHours())  .substr(-2) + ':' +
			 ('00'+date.getMinutes()).substr(-2) + ':' +
			 ('00'+date.getSeconds()).substr(-2)
	);
}
/*
	文字列(yyyy-mm-dd hh:mm:ss)から時間Objに変換
*/
function cnvMDateStrToDate( dateString ) {

	return (new Date(dateString.replace(/.*(\d{4}-\d{1,2}-\d{1,2}\s+\d{1,2}\:\d{1,2}(\:\d{1,2})?).*/,'$1').replace(/-/g,'/')));

}
/*
	時間文字列(hh:mm:ss)から時間msに変換
*/
function cnvMTimeStrToTime( dateString ) {

	var time = -1;
	if(dateString.match(/.*?((\d{1,2})\:(\d{1,2})\:(\d{1,2})).*/)) {
		time = parseInt(RegExp.$2,10)*3600 + parseInt(RegExp.$3,10)*60 + parseInt(RegExp.$4,10);
		return time * 1000;
	}
	return -1;
}
/*
	現在の時間を取得
*/
function getNowTime() {


	// サーバー時間を取得
	var timedate = cnvMDateStrToDate(document.getElementById('server_time').textContent);

	if(timedate == 'Invalid Date') {
		console.log("ERROR:サーバー時間取得失敗");
		return new Date();
	}
	return timedate;

}
/*
	Ajaxで読み込んだHTMLをノードとして使えるようにする
*/
function parseHTML( htmlText ) {

	// パース
	var htmldoc;
	if(document.implementation.createHTMLDocument) {
		htmldoc = document.implementation.createHTMLDocument('');
	} else {
		var docType = document.implementation.createDocumentType('html',
//							'-//W3C//DTD XHTML 1.0 Transitional//EN',
//							'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'
				'-//W3C//DTD HTML 4.01 Transitional//EN',
				'http://www.w3.org/TR/html4/loose.dtd'
		);
		htmldoc = document.implementation.createDocument(null,'html',docType);
	}

	var htmlData = htmlText;

	var range = htmldoc.createRange();
	range.selectNodeContents( document.documentElement );
	range.createContextualFragment( htmlData );
	node  = htmldoc.adoptNode(range.createContextualFragment( htmlData ));
	htmldoc.documentElement.appendChild( node );

	return htmldoc;
}
/*
	配列をセーブ
*/
function saveArray( saveID , saveArray , separator ) {

	separator = typeof separator == 'undefined' ? ['\t','##','**','!!'] : separator;	//区切り指定無しはタブ

	//配列,セパレータ...
	var joinarray = function(array,separator) {
		var arrybuf = [];
		var sepa    = typeof separator == 'object' ? separator[0] : separator;
		for(var i = 0;i < array.length;i++) {
			arrybuf[arrybuf.length] = typeof array[i] == "object" ? joinarray(array[i],separator.slice(1)) : array[i];
		}
		return arrybuf.join(sepa);
	}
	var saveStr = joinarray(saveArray , separator);
	GM_setValue( SAVE_NAME+saveID, saveStr);
}
/*
	ロードして配列へ
*/
function loadArray( saveID, separator ) {

	separator = typeof separator == 'undefined' ? ['\t','##','**','!!'] : separator;	//区切り指定無しはタブ

	var splitarray = function( str , separator ) {

		var sepa    = typeof separator == 'object' ? separator[0] : separator;
		var ret = [];

		ret = str.split(sepa);
		for(var i = 0;i < ret.length;i++) {
			for(var j = separator.length - 1; j >= 0; j--) {
				if(ret[i].indexOf(separator[j]) != -1) {
					ret[i] = splitarray(ret[i],separator.slice(1));
					break;
				}
			}
		}
		return ret;
	}

	var ret =  GM_getValue( SAVE_NAME+saveID );
	if(ret == null) return null;
	if(ret == '')	return null;

	return splitarray(ret,separator);
}

/*
	GM系対策
*/
function GM_init() {
///////////////////////////////////////////////
//Chrome用GM_関数
// @copyright 2009, James Campos
// @license cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
	if ((typeof GM_getValue != 'undefined') && (GM_getValue('a', 'b') != undefined)) {
		return;
	}
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
		localStorage.removeItem(name);	// pkzn追加 ChromeのERROR:22対策
		localStorage.setItem(name, value);
	};

	if(typeof GM_listValues == 'undefined')	{
		GM_listValues = function() {
			list = [];
			for(i = 0;i < localStorage.length;i++) {
				list.push(localStorage.key(i));
			}
			return list;
		};
	}
}


})();

