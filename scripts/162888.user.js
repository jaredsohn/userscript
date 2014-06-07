// ==UserScript==
// @name         lee1
// @namespace    http://at-n2.net/
// @description  ブラウザ三?志 자동건설スクリプト By nottisan + 5zen（자동내정改良）
// @icon         http://5zen.info/hokan/icon.png
// @include      http://*.nexon.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require      http://sizzlemctwizzle.com/updater.php?id=132191
// @homepage     http://5zen.info/
// @version      2012.06.18 (やっぱり人柱版）
// @icon         http://5zen.info/mikanbox/icon.png
// ==/UserScript==

// 2012.04.22 巡回部分の修正
// 2012.04.23 ビルスクの삭제部分の修正（?象施設の?象Lv以下の?＋평지?がビルスク?象施設?以下の場合、?象施設名で一番レベルの低いのを삭제に?更）
// 2012.04.24 2012.04.24のメンテに??
// 2012.04.25 id="lodgment" がない場合の??（本鯖）
// 2012.04.26 本鯖でのダイアログ表示링크の位置を?更
//            거점설정デ?タ呼び出しのバグ修正
//            糧?換처리がない場合でも시장情報を保存するように修正
//            糧?換거점情報をダイアログに表示追加
// 2012.05.01 よくわかんないけどＰ鯖??（動くらしい）
//            자동造兵時に숙사空きがない場合の처리を修正
//            userscript.org に公開
// 2012.05.02 시장情報更新時に?時情報表示に切り替え
//            거점巡回中に자동で내정武?のスキル?況の取得
//            スキル사용武?と사용/회복スキル名を表示するように修正
// 2012.05.03 삭제施設がレベルアップ?象になった場合처리が進まない不具合を修正
//            거점のレベルアップ時に、거점が삭제中の場合건설しない처리を追加
//            造兵?武器防具?化情報の자동取得처리を追加
// 2012.05.04 연구소の?究中取得がおかしかったのを修正
//            造兵時の체크が間違っていたのを修正
// 2012.05.05 造兵施設がLVMAXの場合の처리を追加
//            造兵施設での種類?によって取得처리を?更するように修正
//            ブラ三ニュ?スけしたった(?з?)
// 2012.05.07 兵種?究が?完された場合に表示が?る不具合の修正
//            巡回しなくなっていたバグを修正
// 2012.05.08 내정체크しなかったのを修正
// 2012.05.11 最新のGreasemonkeyで動作しないのを修正（setTimeout→unsafeWindow.setTimeout）
// 2012.05.23 本?地の설정ペ?ジに시장情報初期化ボタンを追加
//            巡回時間を修正(2225行あたり）
// 2012.05.24 Auto_Domestic のバグ修正（過去の巡回しない原因はこれかも）
//            자동내정のスキル追加（?風?人選眼力?훈련系?수련系）
//            시장情報をホスト名ごとに保存
//            건설完了時間＞설정巡回時間 の時の巡回時間설정が間違ってたのを修正
//            巡回時間にランダムで盛っていた秒を0秒～60秒から0秒～10秒に?更
//            本?地以外に시장があった場合に糧?換しなかったのを修正
//            시장のある거점が巡回?象以外でも糧?換するように修正
//            내정スキル?動後に各처리が多分動作するように修正
// 2012.05.25 거점건설설정のデ?タがない거점の初期デ?タが間違っていたのを修正
//            설정?面でNaN(Not a Number)が表示されていたのを修正
// 2012.05.27 ビルスクの설정が反映されないのを修正
// 2012.06.18 마을?요새삭제中の場合その거점のみビルダ?動作を停止

var VERSION = "2012.06.18 (やっぱり人柱版）";	// バ?ジョン情報

var DEBUG = false;

// 色설정

var COLOR_FRAME	= "#333333";	// ?背景色
var COLOR_BASE	= "#654634";	// 거점링크色
var COLOR_TITLE	= "#FFCC00";	// 各BOXタイトル背景色
var COLOR_BACK	= "#FFF2BB";	// 各BOX背景色

var DomesticFlg = false;

/*!
* jQuery Cookie Plugin
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2011, Klaus Hartl
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://www.opensource.org/licenses/mit-license.php
* http://www.opensource.org/licenses/GPL-2.0
*/
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path ? '; path=' + options.path : '',
                options.domain ? '; domain=' + options.domain : '',
                options.secure ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

jQuery.noConflict();
j$ = jQuery;

// 造兵用
var OPT_SOL_MAX = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var OPT_SOL_ADD = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var OPT_BLD_WOOD  = 0;
var OPT_BLD_STONE = 0;
var OPT_BLD_IRON  = 0;
var OPT_BLD_RICE  = 0;
var OPT_BLD_SOL = 0;
var sort_priority = [];
var OPT_BKBG_CHK = 0;
var make_no = [];
				   // 兵種,       No,?究?,작성可能兵?,現在の兵?,最大兵?,現兵?との差,x,y
make_no["검병"]     = ["검병"    ,301,     0,           0,         0,       0,          0,0,0];
make_no["창병"]     = ["창병"    ,303,     0,           0,         1,       0,          0,0,0];
make_no["궁병"]     = ["궁병"    ,308,     0,           0,         2,       0,          0,0,0];
make_no["기병"]     = ["기병"    ,305,     0,           0,         3,       0,          0,0,0];
make_no["모창병"]   = ["모창병"  ,304,     0,           0,         4,       0,          0,0,0];
make_no["노병"]     = ["노병"    ,309,     0,           0,         5,       0,          0,0,0];
make_no["근위기병"] = ["근위기병",307,     0,           0,         6,       0,          0,0,0];
make_no["척후"]     = ["척후"    ,310,     0,           0,         7,       0,          0,0,0];
make_no["척후기병"] = ["척후기병",311,     0,           0,         8,       0,          0,0,0];
make_no["충차"]     = ["충차"    ,312,     0,           0,         9,       0,          0,0,0];
make_no["투석기"]   = ["투석기"  ,313,     0,           0,        10,       0,          0,0,0];

OPT_BK_LV = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
OPT_BG_LV = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//巡回用
var tidMain2;
var tidMain3;
var nextURL;
var nextNAME;
//기부用
var OPT_RISE_KIFU_MAX = 10000; //기부を開始する糧の量
var OPT_RISE_KIFU = 1000; //기부をする糧の量

//
//시장用
var OPT_RISE_MAX = 30000; //시장?換開始する糧の量
var OPT_TO_WOOD = 10000; //木に?換する糧
var OPT_TO_STONE = 10000; //石に?換する糧
var OPT_TO_IRON = 10000; //?に?換する糧

// @@ ADD 2011.09.28 @@
var LOAD_ROUND_TIME_10 = 10;
var LOAD_ROUND_TIME_20 = 20;
var LOAD_ROUND_TIME_30 = 30;
var LOAD_ROUND_TIME_40 = 40;
var LOAD_ROUND_TIME_50 = 50;
var LOAD_ROUND_TIME_60 = 60;
var LOAD_ROUND_TIME_70 = 70;
var LOAD_ROUND_TIME_80 = 80;
var LOAD_ROUND_TIME_90 = 90;
var LOAD_ROUND_TIME_100 = 100;
var LOAD_ROUND_TIME_110 = 110;
var LOAD_ROUND_TIME_120 = 120;
var LOAD_ROUND_TIME_130 = 130;
var LOAD_ROUND_TIME_140 = 140;
var LOAD_ROUND_TIME_150 = 150;
var LOAD_ROUND_TIME_160 = 160;
var LOAD_ROUND_TIME_170 = 170;
var LOAD_ROUND_TIME_180 = 180;

//グロ?バル??
var MOUSE_DRAGGING = false;
var MOUSE_OFFSET_X;
var MOUSE_OFFSET_Y;
var MOUSE_DRAGGING_WINDOW = 0;
var ALERT_TIME;

// @@ ADD 2011.05.14 @@
var OPT_MAX_WOOD = 0;			// 木の最大保持量
var OPT_MAX_STONE = 0;		// 石の最大保持量
var OPT_MAX_IRON = 0;			// ?の最大保持量
var WOOD = 101; //木の?部コ?ド
var STONE = 102; //石の?部コ?ド
var IRON = 103; //?の?部コ?ド
var RICE = 104; //糧の?部コ?ド

//新規작성用
var OPT_KATEMURA = 0; //자동糧마을化オプション
var OPT_TORIDE = 0; //자동요새化オプション
var OPT_SOUKO_MAX = 1; //창고の最大?

//내정用 by nottisan
//                                1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4 
//              1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 
var OPT_DOME = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var OPT_BLD = "AC";
var OPT_SorH = "DD";
var OPT_MAX = 3;
var OPT_MAXLV = 6;
var OPT_ROUND_TIME1 = 30;	// 巡回時間(sec)
var OPT_ROUND_TIME2 = 10;	// 巡回時間(sec)
var Reload_Flg = 0;
var OPT_BUILD_VID;


//グロ?バル??
//var INTERVAL = 1000;			// 負荷?策 回線速度によっては正常動作しない時があります。その際は?値を?やしてください。1秒=1000
//var INTERVAL2 = 2000;			// 負荷?策 回線速度によっては正常動作しない時があります。その際は?値を?やしてください。1秒=1000

var INTERVAL  = 1000 + Math.floor( Math.random() * 5000 );			// 負荷?策 回線速度によっては正常動作しない時があります。その際は?値を?やしてください。1秒=1000
var INTERVAL2 = 2000 + Math.floor( Math.random() * 5000 );			// 負荷?策 回線速度によっては正常動作しない時があります。その際は?値を?やしてください。1秒=1000
var HOST = location.hostname; //アクセスURLホスト
var PGNAME = "SDSAM"; //グリモン領域への保存時のPGの이름
var TIMEOUT_URL ="/false/login_sessionout.php"; //タイムアウト時のURLの一部
var g_MD="";

var SENDTFLG_TIMEOUT = 0;	//タイムアウト?面
var SENDTFLG_LOGIN_MENU = 1;	//ログイン?面
var SENDTFLG_LOGIN = 2;	        //ログイン中
var d = document;

// 保存デ?タデリミタ
var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var DELIMIT3 = "{=]";
var DELIMIT4 = "|-/";

//保存デ?タインデックス（거점）
var IDX_XY = 0; //座標
var IDX_BASE_NAME = 1; //거점名
var IDX_URL = 2; //거점URL
var IDX_ACTIONS = 3; //?行中作業
var IDX_BASE_ID = 11; //거점ID

//保存デ?タインデックス（?行中作業）
var IDX2_STATUS = 0; //ステ?タス
var IDX2_TIME = 1; //完了時刻
var IDX2_TYPE = 2; //種別 C:都市?面、D:내정スキル、Fxy:施設座標
var IDX2_ALERTED = 3; //通知?フラグ
var IDX2_DELETE = 4; // 삭제フラグ
var IDX2_ROTATION = 5; // 巡回フラグ


//作業種別
var TYPE_CONSTRUCTION = "C"; //건설
var TYPE_MARCH = "M"; //行軍
var TYPE_DOMESTIC = "D"; //내정
var TYPE_FACILITY = "F"; //施設

var TYPE_DELETE = "B"; //건설

var OPT_CHKBOX_AVC = 0;
//                  ? 木 石 ? 밭 倉 雀 武 防 練 槍 弓 騎 宿 車 市 訓 水 工 ? 大 遠 見 平
//                  点             庫    器 具 兵 兵 兵 兵 ? 兵 場 練 車 場 究 宿 征 張 地
//					 1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
var OPT_CHKBOX   = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var OPT_CHKBOXLV = [ 8,15,15,15,15,20,10,10,10,10,15,15,15,15,15,10,10,10,10,10,20,20,20, 0];
var OPT_MAX_LV = "2";
var OPT_FUC_NAME = ["거점","벌채소","채석장","제철소","밭","창고",
                    "동작대","대장간","방어구공장","창병사","연병소","궁병사",
                    "기병사","숙사","무기공장","시장","훈련소","수차","공장",
                    "연구소","대숙사","원정훈련소","감시탑","평지"];

var OPT_FNID = new Array();
OPT_FNID["거점"] =       0	 ;
OPT_FNID["벌채소"] =     1	 ;
OPT_FNID["채석장"] =     2	 ;
OPT_FNID["제철소"] =     3	 ;
OPT_FNID["밭"] =         4	 ;
OPT_FNID["창고"] =       5	 ;
OPT_FNID["동작대"] =     6	 ;
OPT_FNID["대장간"] =     7	 ;
OPT_FNID["방어구공장"] = 8	 ;
OPT_FNID["창병사"] =     9	 ;
OPT_FNID["연병소"] =     10	 ;
OPT_FNID["궁병사"] =     11	 ;
OPT_FNID["기병사"] =     12	 ;
OPT_FNID["숙사"] =       13	 ;
OPT_FNID["무기공장"] =   14	 ;
OPT_FNID["시장"] =       15	 ;
OPT_FNID["훈련소"] =     16	 ;
OPT_FNID["수차"] =       17	 ;
OPT_FNID["공장"] =       18	 ;
OPT_FNID["연구소"] =     19	 ;
OPT_FNID["대숙사"] =     20	 ;
OPT_FNID["원정훈련소"] = 21	 ;
OPT_FNID["감시탑"] =     22	 ;
//OPT_FNID["수행소"] =   23	 ;

// 시장변환처리
var OPT_ICHIBA = 0;
var OPT_ICHIBA_PA = 0;
var OPT_ICHIBA_PATS = ["평균적으로 변환","일괄 변환"];
// 자동기부용
var OPT_KIFU = 0;

var d = document;
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };

//LvUP링크
var LVUPLINK = "http://SITE/facility/build.php?x=urlX&y=urlY&village_id=viID&ssid=ssid_val#ptop";
var URL_SITE = "SITE";
var URL_X = "urlX";
var URL_Y = "urlY";
var URL_viID = "viID";
var URL_viSSID = "ssid_val";

//新規작성링크
var CREATELINK = "http://SITE/facility/build.php?id=fID&x=urlX&y=urlY&village_id=viID&ssid=ssid_val";
var URL_fID = "fID"; //建物のID
var HATAKE = 215;
var SOUKO = 233;
var SUZUME = 216;

var FACLINK = "http://SITE/facility/facility.php?x=urlX&y=urlY";
var VILLAGELINK = "http://SITE/village.php#ptop";
// 2012.04.10
var LANDLINK = "http://SITE/land.php?x=urlX&y=urlY"
var SETTLELINK = "http://SITE/facility/select_type.php?x=urlX&y=urlY&mode=build&type=fID"

var VillageData = new Array();
var OPT_VILLAGE = new Array();

var isMixi = true;

// ＠＠　ここから　＠＠
var DASkill = [ "■■■■ ■■",
                "벌채지식","벌채기술","궁병강화",
                "채석지식","채석기술","창병강화",
                "제철지식","제철기술","기병강화",
                "식량지식","식량기술",
                "농림지식","농림기술",
                "가공지식","가공기술",
                "부국","부국론","부국강병",
		"풍요","미옥가무",
		"?風","人選眼力",
                "오나라의 치세","왕좌의 재능",
		"창병훈련","창병수련",
		"연병소훈련","연병소수련",
		"궁병훈련","궁병수련",
		"기병사훈련","기병사수련",
		"병기훈련","병기수련"
];
// ＠＠　ここまで　＠＠

// 屯田機能用
var URL_PARAM = {};

// 시장?換用
var ShopURL = "";
var ShopFlg = false;

var DBG_Flg = false;

//Main
(function(){
	initUrlParams();

	var mixi_ad_head = xpath('//div[@ID="mixi_ad_head"]', document);
	if (mixi_ad_head.snapshotLength) {
		mixi_ad_head.snapshotItem(0).style.display = "none";
	}

	var mixi_ad_groups = xpath('//div[@ID="mixi_ad_groups"]', document);
	if (mixi_ad_groups.snapshotLength) {
		mixi_ad_groups.snapshotItem(0).style.display = "none";
	}
	var mixi_ad_news = xpath('//div[@class="brNews"]', document);
	if (mixi_ad_news.snapshotLength) {
		mixi_ad_news.snapshotItem(0).style.display = "none";
	}

	addOpenLinkHtml()
	if ( getStayMode() ) {
		closeIniBilderBox()
		openIniBilderBox()
	}
	// =============================================================================================

	//영지 화면이라면 거점 건설 데이터 검색
	if( location.pathname == "/land.php" && URL_PARAM.x && URL_PARAM.y ) {
		getAddingVillage(document.body);
	}

	//거점 화면이라면 거점 삭제 데이터 검색
	if( location.pathname == "/facility/castle.php" ) {
		getDeletingVillage(document.body);
	}

	//バグ回避 600000=5*60*1000
	// 영지 화면과 건축 화면에서 정지했을 경우의 처리
	// 5 분간 멈추어있다면 거점 화면으로 이동
	if(location.pathname == "/land.php" || location.pathname == "/facility/facility.php") {
		unsafeWindow.setTimeout(function(){location.href = "http://"+HOST+"/village.php";},300000);
	}
	// =============================================================================================
	//군주 프로필 화면이라면 도시 화면 URL을 가져오기
	if ((location.pathname == "/user/" || location.pathname == "/user/index.php") &&
		getParameter("user_id") == "") {
		getUserProf(document);
		if ( getStayMode() ) {
			closeIniBilderBox()
			openIniBilderBox()
		}
	}
    OPT_BUILD_VID = GM_getValue(HOST+PGNAME+"OPT_BUILD_VID" , "" );

	if (location.pathname == "/village.php") {

		var vID = "";
		//座標を取得
		var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		vId = trim(xyElem.snapshotItem(0).innerHTML);
		Load_OPT(vId);
		if (OPT_BUILD_VID != getVillageID(vId)) {
	        GM_setValue(HOST+PGNAME+"OPT_BUILD_VID" , "" );
			OPT_BUILD_VID = "";
		}
		getVillageActions();			// 건축情報の取得
		checkVillageLength();			// 거점?체크 2012.04.09
		settleVillages(0);				// 자동거점작성 2012.04.09

		//거점화면이라면 대상 건축물의 건축 확인
		var villages = loadVillages(HOST+PGNAME);
		for(var i=0; i<villages.length;i++){
			var tChk1 = GM_getValue(HOST+PGNAME+"OPT_CHKBOX_AVC_"+i, true);
			if ( getVillageID(vId) == getParameter2(villages[i][IDX_URL], "village_id") ){
				break;
			}
		}

		// 거점に체크がある場合건설처리を行う
		if (tChk1){
			Auto_Domestic();		    // 자동내정처리 by nottisan
		} else {
			ichibaChange(vId);		    // 시장처리
			autoDonate();			    // 자동기부처리
		}
		// 연구소情報取得
		var area = new Array();
		area = get_area();

		var _x = -1;
		var _y = -1;
		var _lv = -1;
		for (var i=0;i<area.length;i++){
			if (area[i].name == "연구소") {
				var Temp = area[i].xy.split(",");
				_x = Temp[0];
				_y = Temp[1];
				_lv = area[i].lv;
			}
		}
		if ( _x < 0 ) {
			// 내정スキル체크
			var nText = document.evaluate('//*[@class="base-skill"]/span/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		    var nName = nText.snapshotItem(0).innerHTML.split(":");
			if (nName[0].length != 12) {
				// 내정武?がセットされている場合
				// alert("내정무장은 " + nName[0].trim() + " 입니다.");
				j$.get("http://"+HOST+"/card/domestic_setting.php#ptop",function(x){
					var htmldoc = document.createElement("html");
				        htmldoc.innerHTML = x;
					getDomesticSkill(htmldoc);		// 내정スキル사용체크
					forwardNextVillage();			// 次の거점へ移動
				});
			} else {
				// 내정武?がセットされていない場合
				var data = getMyVillage();
				data[IDX_ACTIONS] = new Array();
				saveVillage(data, TYPE_DOMESTIC);
			 	if ( getStayMode() ) {
					closeIniBilderBox()
					openIniBilderBox()
				}
				forwardNextVillage();						// 次の거점へ移動
			}
		} else {
			try {
				// 연구소체크
				j$.get("http://"+HOST+"/facility/facility.php?x=" + _x + "&y=" + _y ,function(x){
					var htmldoc = document.createElement("html");
				        htmldoc.innerHTML = x;
					getTrainingSoldier(htmldoc);

					// 내정スキル체크
					var nText = document.evaluate('//*[@class="base-skill"]/span/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				    var nName = nText.snapshotItem(0).innerHTML.split(":");
					if (nName[0].length != 12) {
						// 내정武?がセットされている場合
						// alert("내정武?は " + nName[0].trim() + " です");
						j$.get("http://"+HOST+"/card/domestic_setting.php#ptop",function(x){
							var htmldoc = document.createElement("html");
						        htmldoc.innerHTML = x;
							getDomesticSkill(htmldoc);		// 내정スキル사용체크
							forwardNextVillage();			// 次の거점へ移動
						});
					} else {
						// 내정武?がセットされていない場合
						var data = getMyVillage();
						data[IDX_ACTIONS] = new Array();
						saveVillage(data, TYPE_DOMESTIC);
					 	if ( getStayMode() ) {
							closeIniBilderBox()
							openIniBilderBox()
						}
						forwardNextVillage();						// 次の거점へ移動
					}
				});
			}catch(e) {
				// エラ?が?生した場合次の거점へ移動
				forwardNextVillage();						// 次の거점へ移動
			}
		}
	}

	//兵士작성?面なら작성中兵士を取得
	if (location.pathname == "/facility/facility.php") {

		//var actionType = TYPE_FACILITY + getParameter("x") + getParameter("y");

		j$.get("http://"+HOST+"/facility/facility.php?x=" + getParameter("x") + "&y=" + getParameter("y") + "#ptop",function(x){
			var htmldoc = document.createElement("html");
		        htmldoc.innerHTML = x;
			getTrainingSoldier(htmldoc);
			if ( getStayMode() ) {
				closeIniBilderBox()
				openIniBilderBox()
			}
		});

	}

})();

function log() { unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) };

function debugLog( mes ) {	if (DEBUG) { console.log(mes); }	};

// ===========================================================================================================

//URL?み?み
function initUrlParams() {
    var matches = location.search.match(/(?:\?|&)?([^=]+)(?:=([^&]+))?/g);
    if (matches) {
        var param;
        var key;
        var data;
        for(var i = 0 ; i < matches.length ; i++) {
            param = matches[i].match(/(?:\?|&)?([^=]+)(?:=([^&]+))?/);
            key = param[1];
            data = param[2];

            URL_PARAM[key] = '';
            if( param.length == 3 && typeof data == 'string') {
                URL_PARAM[key] = decodeURIComponent(data);

                // session id
                if (key.toLowerCase() == 'ssid') {
                    SID = key + '=' +data;
                }
            }
        }
    }
}

//거점만들기 시작
function settleVillages(z){
	//新規거점작성に必要な名?があれば거점작성
	if ( checkFame() ){
		//予約デ?タ取得
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);
		if( lists.length == 0 || z >= lists.length) {return;}
		if( lists[z].status != 1 && lists[z].status != 0) {settleVillages(z+1);return;}
		var mURL = LANDLINK;
		mURL = mURL.replace(URL_SITE,HOST);
		mURL = mURL.replace(URL_X,lists[z].x);
		mURL = mURL.replace(URL_Y,lists[z].y);
		var tid=unsafeWindow.setTimeout(function(){
			GM_xmlhttpRequest({
				method:"GET", 
				url:mURL,
				headers:{"Content-type":"text/html"},
				overrideMimeType:'text/html; charset=utf-8',
				onload:function(x){
					var htmldoc = document.createElement("html");
					htmldoc.innerHTML = x.responseText;
					//거점を작성できるか체크
					var rmtime = htmldoc.innerHTML.match(/この領地を거점にする/);
					if ( rmtime ) { //거점を작성できる場合작성開始
						var mURL = SETTLELINK;
						mURL = mURL.replace(URL_SITE,HOST);
						mURL = mURL.replace(URL_X,lists[z].x);
						mURL = mURL.replace(URL_Y,lists[z].y);
						mURL = mURL.replace(URL_fID,lists[z].kind);
						var tid=unsafeWindow.setTimeout(function(){
							GM_xmlhttpRequest({
								method:"GET", 
								url:mURL,
								headers:{"Content-type":"text/html"},
								overrideMimeType:'text/html; charset=utf-8',
								onload:function(x){
									var htmldoc = document.createElement("html");
									htmldoc.innerHTML = x.responseText;
									//거점が작성開始できているか確認
									if (!htmldoc.innerHTML.match(/명성이 부족합니다./)) {
										getAddingVillage(htmldoc);
										closeIniBilderBox()
										openIniBilderBox()
									}
								}
							});
						}, INTERVAL);
					} else {
						failSettleVillage(z);
						settleVillages(z+1);
					}
				}
			});
		}, INTERVAL);
	}

	//名?체크
	function checkFame() {

		//現在の名?MAX取得
		var fameMAX;
		var fameText = $x('id("status_left")/img[contains(@src,"ico_fame.gif")]').nextSibling;
		if( fameText ) {
			var tmp = fameText.nodeValue.match(/\s*(\d+)\s*\/\s*(\d+)/);
			fameMAX = parseInt(tmp[2],10);
		}

		//거점작성に必要な名?
		var bldtbl = [17, 35, 54, 80, 112, 150, 195, 248, 310, 999];
		//現在の거점の?
		//var villages = loadVillages(HOST);
		//var villageLength = document.evaluate('//div[@id="lodgment"]/div/ul/li/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); //거점?－１になる

		// 2012.04.25 本鯖??
		var villageLength = $a('//ul/li/a[contains(@href,"/village_change.php?village_id")]').length; //거점?－１になる

		//작성中の거점の?
        var lists = cloadData(HOST+"ReserveList", "[]", true, true);
		var x = 0;
		for (var i=0 ; i<lists.length ; i++) {
			if(lists[i].status == 2){x++;}
		}
//		return (fameMAX >= bldtbl[villageLength.snapshotLength + x]);
		return (fameMAX >= bldtbl[villageLength + x]);
	}

	function failSettleVillage(z) {
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);
		if (lists[z].status == 1) { lists[z].status = 0;}
		csaveData(HOST+"ReserveList", lists, true, true );
	}
}


// 거점?の保存情報と現?を比較＆修正 2012.04.09
function checkVillageLength() {
        //デ?タ整理
	var lists = cloadData(HOST+"ReserveList", "[]", true, true);
	lists = checkList(lists);       //時間の過ぎたものを삭제


	//予定時刻を過ぎていたら新規거점情報を取得
	function checkList(lists)
	{
		//時刻체크
		var dt = new Date();
		var ntime = dt.getFullYear() + "-" +
			(dt.getMonth()+101).toString().substr(-2) + "-" +
			(dt.getDate()+100).toString().substr(-2) + " " +
			(dt.getHours()+100).toString().substr(-2)  + ":" +
			(dt.getMinutes()+100).toString().substr(-2)  + ":" +
			(dt.getSeconds()+100).toString().substr(-2);
		//リストのデ?タを書き換え
		var flg = 0;
		for(var i=0 ; i<lists.length ; i++) {
			if( lists[i].time < ntime ) {
				if( lists[i].status == 4 ) { lists[i].status = 5; flg = 1;} //破棄 -> 破棄完了
				if( lists[i].status == 2 ) { lists[i].status = 3; flg = 1;} //작성 -> 작성完了
			}
		}
		csaveData(HOST+"ReserveList", lists, true, true );
		//거점情報を取得＆移動
		if (flg == 1){
			getUserProfJumpNewVillage();
		} else {
			checkVillageLengthDiff();
		}
		return lists;
	}

	function getUserProfJumpNewVillage(){
		var tid=unsafeWindow.setTimeout(function(){
			GM_xmlhttpRequest({
				method:"GET", 
				url:"http://"+HOST+"/user/",
				headers:{"Content-type":"text/html"},
				overrideMimeType:'text/html; charset=utf-8',
				onload:function(x){
					var htmldoc = document.createElement("html");
				 	htmldoc.innerHTML = x.responseText;
					//거점リストを更新
					getUserProf(htmldoc);
					if ( getStayMode() ) {
						closeIniBilderBox()
						openIniBilderBox()
					}
					//本?地に?制ジャンプ
					var villages = loadVillages(HOST+PGNAME);
					var tid=unsafeWindow.setTimeout(function(){
						location.href = villages[0][IDX_URL];},INTERVAL);
					//新規거점に移動
					//jumpNewVillage();
				}
			});
		}, INTERVAL);

		//新規거점?面へ移動
/*
		function jumpNewVillage(){
			var villages = loadVillages(HOST+PGNAME);
			for (var j = villages.length-1; j >= 0; j--) {
				//新規と名のつく거점へ移動
				if(villages[j][IDX_BASE_NAME].match(/新規/)){
					var tid=unsafeWindow.setTimeout(function(){
						location.href = villages[j][IDX_URL];},INTERVAL);
					return;
				}
			}
		}
*/
	}

	//거점?が?わっていたら情報取得 @@1@@
	function checkVillageLengthDiff() {

debugLog("=== Start checkVillageLengthDiff ===");

		var villages = loadVillages(HOST+PGNAME);
//		var villageLength = document.evaluate('//div[@id="lodgment"]/div/ul/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); //거점?

		// 2012.04.25 本鯖??
		var villageLength = $a('//ul/li/a[contains(@href,"/village_change.php?village_id")]').length + 1; //거점?

		//if (villages.length != villageLength.snapshotLength) {
		if (villages.length != villageLength) {
			unsafeWindow.setTimeout(function(){
				GM_xmlhttpRequest({
					method:"GET", 
					url:"http://"+HOST+"/user/",
					headers:{"Content-type":"text/html"},
					overrideMimeType:'text/html; charset=utf-8',
					onload:function(x){
						var htmldoc = document.createElement("html");
					        htmldoc.innerHTML = x.responseText;
						getUserProf(htmldoc);
						if ( getStayMode() ) {
							closeIniBilderBox()
							openIniBilderBox()
						}
						var tid=unsafeWindow.setTimeout(function(){location.reload();},INTERVAL);
					}
				});
			}, INTERVAL);
		}
	}
}

//Beyond系save, load??
function csaveData(key, value, local, ev)
{
    if( local ) key = location.hostname + key  + PGNAME;
    if( ev ) {
        if (window.opera || typeof JSON != 'object') {
            value = toJSON(value);
        }
        else {
            value = JSON.stringify( value );
        }
    }
    GM_setValue(key, value );
}

function cloadData(key, value, local, ev)
{
    if( local ) key = location.hostname + key  + PGNAME;
    var ret = GM_getValue(key, value);
    return ev ? eval('ret='+ret) : ret;
}

//-----------------------------------TonDen---------------------------------
//領地?面なら거점건설デ?タ取得
function getAddingVillage(htmldoc) {

	var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',
		htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var xy = xyElem.snapshotItem(0).innerHTML.match(/(-?\d+,-?\d+)/);
	var Temp = xy[0].split(",");
	var x = Temp[0];
	var y = Temp[1];

	var rmname = htmldoc.innerHTML.match(/(現在마을を건설中です|現在요새を건설中です)/ );
	if( rmname ) {
		var rmtime = htmldoc.innerHTML.match(/(\d+-\d+-\d+ \d+:\d+:\d+)*に完了します。/ );
		if( rmname[1] == "現在마을を건설中です" ) {
			addList(rmtime[1], 220, 2, x, y );
		}else if( rmname[1] == "現在요새を건설中です" ) {
			addList(rmtime[1], 222, 2, x, y );
		}
	}

	if(htmldoc == document.body) {
//		addLink();
		addLink2();
	}

	function addList(tim, kind, status, x, y) 
	{
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);

		var flg = 0;
		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y ) {
				lists[i].time = tim;
				lists[i].kind = kind;
				lists[i].status = status;
				flg = 1;
			}
		}
		if(flg == 0) {
			lists.push({"x":x, "y":y, "time":tim, "kind":kind, "status":status });
		}
		lists.sort( function(a,b){
			if(a.time > b.time) return 1;
			if(a.time < b.time) return -1;
			return 0;});

		csaveData(HOST+"ReserveList", lists, true, true );
	}

	function addLink() {

		//id="tMenu"にLinkを?入
		var tMenu = document.evaluate('//*[@id="tMenu"]',
			htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tMenu.snapshotLength == 0) return;

		//마을작성予約
		var villageLink = document.createElement("a");
		villageLink.id = "village";
		villageLink.href = "javascript:void(0);";
		villageLink.innerHTML = "마을건설予約";
		villageLink.addEventListener("click", function() {addReserveVillages(220)}, true);
		tMenu.snapshotItem(0).appendChild(villageLink);

		//요새작성予約
		var fortLink = document.createElement("a");
		fortLink.id = "fort";
		fortLink.href = "javascript:void(0);";
		fortLink.innerHTML = "요새건설予約";
		fortLink.addEventListener("click", function() {addReserveVillages(222)}, true);
		tMenu.snapshotItem(0).appendChild(fortLink);

	}

	function addLink2() {

		//id="tMenu"にLinkを?入
		var tMenu = document.evaluate('//div[@class="status"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tMenu.snapshotLength == 0) {
			var tMenu = document.evaluate('//div[@id="basepoint"]',
				document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (tMenu.snapshotLength == 0) return;
		}

		var villageLink = document.createElement("span");
		villageLink.style.color = "white";
		villageLink.style.fontSize = "10px";
		villageLink.style.textAlign = "center";
		villageLink.innerHTML = "건설予約  ";
		tMenu.snapshotItem(0).appendChild(villageLink);

		//마을작성予約
		var villageLink = document.createElement("a");
		villageLink.id = "village";
		villageLink.style.color = "white";
		villageLink.style.fontSize = "10px";
		villageLink.style.textAlign = "center";
		villageLink.href = "javascript:void(0);";
		villageLink.innerHTML = "마을";
		villageLink.addEventListener("click", function() {addReserveVillages(220)}, true);
		tMenu.snapshotItem(0).appendChild(villageLink);

		var villageLink = document.createElement("span");
		villageLink.style.color = "white";
		villageLink.style.fontSize = "10px";
		villageLink.style.textAlign = "center";
		villageLink.innerHTML = "  ";
		tMenu.snapshotItem(0).appendChild(villageLink);

		//요새작성予約
		var fortLink = document.createElement("a");
		fortLink.id = "fort";
		fortLink.style.color = "white";
		fortLink.style.fontSize = "10px";
		fortLink.style.textAlign = "center";
		fortLink.href = "javascript:void(0);";
		fortLink.innerHTML = "요새";
		fortLink.addEventListener("click", function() {addReserveVillages(222)}, true);
		tMenu.snapshotItem(0).appendChild(fortLink);

	}

	function addReserveVillages(kind) {
		url = location;
		var flgAdd = addList2(kind, 1, URL_PARAM.x, URL_PARAM.y);
		var msg = "";
		if (flgAdd == 0){
			msg += "(" + URL_PARAM.x + "," + URL_PARAM.y + ")への、";
			      if(kind == 220){msg += "마을건설予約";
			}else if(kind == 222){msg += "요새건설予約";
			}
			msg += "を受け付けました。"
		} else {
			msg += "(" + URL_PARAM.x + "," + URL_PARAM.y + ")には、すでに건설予約があります。";
		}
		alert(msg);
		closeIniBilderBox()
		openIniBilderBox()
	}

	function addList2(kind, status, x, y) //kind=220:마을予約 222:요새予約
	{
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);

		var dt = new Date();
		var ntime = dt.getFullYear() + "-" +
			(dt.getMonth()+101).toString().substr(-2) + "-" +
			(dt.getDate()+100).toString().substr(-2) + " " +
			(dt.getHours()+100).toString().substr(-2)  + ":" +
			(dt.getMinutes()+100).toString().substr(-2)  + ":" +
			(dt.getSeconds()+100).toString().substr(-2);

		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y ) {
				return;
			}
		}
		lists.push({"x":x, "y":y, "time":ntime, "kind":kind, "status":status });
		lists.sort( function(a,b){
			if(a.time > b.time) return 1;
			if(a.time < b.time) return -1;
			return 0;});

		csaveData(HOST+"ReserveList", lists, true, true );

		return 0;
	}

}

//거점?面で건설予約受付
function addLinkTondenVillage() {

	var xyElem = document.evaluate('//span[@class="xy"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var xy = xyElem.snapshotItem(0).innerHTML.match(/(-?\d+,-?\d+)/);
	var Temp = xy[0].split(",");
	var x = Temp[0];
	var y = Temp[1];

	addLink();

	function addLink() {

		//id="tMenu"にLinkを?入
		var tMenu = document.evaluate('//div[@class="status village-bottom"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tMenu.snapshotLength == 0) return;

		var villageLink = document.createElement("span");
		villageLink.innerHTML = " 건설予約  ";
		tMenu.snapshotItem(0).appendChild(villageLink);

		//마을작성予約
		var villageLink = document.createElement("a");
		villageLink.id = "village";
		villageLink.href = "javascript:void(0);";
		villageLink.innerHTML = "마을";
		villageLink.addEventListener("click", function() {addReserveVillages(220)}, true);
		tMenu.snapshotItem(0).appendChild(villageLink);

		var villageLink = document.createElement("span");
		villageLink.innerHTML = "  ";
		tMenu.snapshotItem(0).appendChild(villageLink);

		//요새작성予約
		var fortLink = document.createElement("a");
		fortLink.id = "fort";
		fortLink.href = "javascript:void(0);";
		fortLink.innerHTML = "요새";
		fortLink.addEventListener("click", function() {addReserveVillages(222)}, true);
		tMenu.snapshotItem(0).appendChild(fortLink);

	}

	function addReserveVillages(kind) {
		url = location;
		var flgAdd = addList2(kind, 1, x, y);
		var msg = "";
		if (flgAdd == 0){
			msg += "(" + x + "," + y + ")への、";
			      if(kind == 220){msg += "마을건설予約";
			}else if(kind == 222){msg += "요새건설予約";
			}
			msg += "を受け付けました。"
		} else {
			msg += "(" + x + "," + y + ")には、すでに건설予約があります。";
		}
		alert(msg);
		closeIniBilderBox()
		openIniBilderBox()
	}

	function addList2(kind, status, x, y) //kind=220:마을予約 222:요새予約
	{
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);

		var dt = new Date();
		var ntime = dt.getFullYear() + "-" +
			(dt.getMonth()+101).toString().substr(-2) + "-" +
			(dt.getDate()+100).toString().substr(-2) + " " +
			(dt.getHours()+100).toString().substr(-2)  + ":" +
			(dt.getMinutes()+100).toString().substr(-2)  + ":" +
			(dt.getSeconds()+100).toString().substr(-2);

		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y && (lists[i].status == 0 || lists[i].status == 1)) {
				return;
			}
		}
		lists.push({"x":x, "y":y, "time":ntime, "kind":kind, "status":status });
		lists.sort( function(a,b){
			if(a.time > b.time) return 1;
			if(a.time < b.time) return -1;
			return 0;});

		csaveData(HOST+"ReserveList", lists, true, true );

		return 0;
	}

}

//거점?面なら거점삭제デ?タ取得
function getDeletingVillage(htmldoc) {
	var xy = getMyXY();
	var Temp = xy.split(",");
	var x = Temp[0];
	var y = Temp[1];

	var rmtime = htmldoc.innerHTML.match(/(마을を삭제中です。|요새を삭제中です。)[^\d]*(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
	if( rmtime ) {
		if( rmtime[1] == "마을を삭제中です。" ) {
			addList(rmtime[2], 220, 4, x, y );
		}else if( rmtime[1] == "요새を삭제中です。" ) {
			addList(rmtime[2], 222, 4, x, y );
		}
	}else{
		delList(1, x, y);
	}
	closeIniBilderBox()
	openIniBilderBox()

	function addList(tim, kind, status, x, y) 
	{
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);

		var flg = 0;
		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y && (lists[i].status != 0 && lists[i].status != 1 && lists[i].status != 2)) {
				lists[i].time = tim;
				lists[i].kind = kind;
				lists[i].status = status;
				flg = 1;
			}
		}
		if(flg == 0) {
			lists.push({"x":x, "y":y, "time":tim, "kind":kind, "status":status });
		}
		lists.sort( function(a,b){
			if(a.time > b.time) return 1;
			if(a.time < b.time) return -1;
			return 0;});

		csaveData(HOST+"ReserveList", lists, true, true );
	}

	function delList(kind, x, y) //kind=0:land 1:castle
	{
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);

		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y ) {
				if( lists[i].status == 4 && kind == 1 ) {
					lists.splice(i,1);
					csaveData(HOST+"ReserveList", lists, true, true );
					break;
				}
			}
		}
	}

}

// =================================================================================================

function DeleteFacility(_x,_y){
	var tid=unsafeWindow.setTimeout(function(){
		var mURL = FACLINK;
		mURL = mURL.replace(URL_SITE,HOST);
		mURL = mURL.replace(URL_X,_x);
		mURL = mURL.replace(URL_Y,_y);
		GM_xmlhttpRequest({
			method:"GET", 
			url: mURL,
			headers:{"Content-type":"text/html"},
			overrideMimeType:'text/html; charset=utf-8',
			onload:function(x){
				var htmldoc = document.createElement("html");
			        htmldoc.innerHTML = x.responseText;
				var tables = document.evaluate('//*[@name="ssid"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var ssid=tables.snapshotItem(0).value;

				var c={};
				c['x'] = parseInt(_x);
				c['y'] = parseInt(_y);
				c['ssid']=tables.snapshotItem(0).value;
				c['remove']="%E5%BB%BA%E7%89%A9%E3%82%92%E5%A3%8A%E3%81%99";
				j$.post("http://"+HOST+"/facility/facility.php?x=" + _x + "&y=" + _y + "#ptop",c,function(){});
				var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);

			}
		});
	},0);

}

function autoLvup() {

debugLog("=== Start autoLvup ===");

	var cost_bk_ken=[
		[ 165,  135,   0,  0, 6600],
		[ 251,  319,   0,  0, 8910],
		[ 184,  596,   0,303,11220],
		[ 351,  994,   0,604,13200],
		[ 431,  828,2054,  0,15180],
		[ 159,  848,4294,  0,17820],
		[1397, 2301,4519,  0,19140],
		[1019, 4458,7260,  0,21120],
		[   0,11558,3572,  0,23100],
		[   0,19648,6073,  0,25080],
		[   0,    0,   0,  0,    0]
	];
	// 창병
	var cost_bk_yari=[
		[ 1820,  3575,    0,1105,13500],
		[ 3640,  7150,    0,2210,18225],
		[    0, 12870, 6552,3978,22950],
		[    0, 21879,11138,6763,27000],
		[10820, 35006,17821,   0,31050],
		[16230, 52510,26732,   0,36450],
		[22722, 73514,37425,   0,39150],
		[30675, 99243,50524,   0,43200],
		[39878,129016,65681,   0,47250],
		[51841,167721,85385,   0,51300],
		[    0,     0,    0,   0,    0]
	];
	// 모창병
	var cost_bk_hoko=[
		[ 14000,  27500,      0, 8500,18600],
		[ 28000,  55000,      0,17000,25380],
		[     0, 104500,  53200,32300,31620],
		[     0, 188100,  95760,58140,37200],
		[ 98838, 319770, 162792,    0,42700],
		[158141, 511632, 260467,    0,50220],
		[237211, 767448, 390701,    0,53940],
		[332096,1074427, 546981,    0,59520],
		[431724,1396755, 711075,    0,65100],
		[647587,2095133,1066613,    0,70680],
		[     0,      0,      0,    0,    0]
	];
	// 궁병
	var cost_bk_yumi=[
		[  3795,    0, 1173,1932,13500],
		[  7590,    0, 2346,3864,18225],
		[ 13662,    0, 6995,4223,22950],
		[ 23225,    0,11824,7179,27000],
		[ 37161,11486,18918,   0,31050],
		[ 55741,17229,28377,   0,36450],
		[ 78038,39728,24121,   0,39150],
		[105351,53633,32563,   0,43200],
		[122015,49802,77193,   0,47250],
		[178043,55031,90640,   0,51300],
		[     0,    0,    0,   0,    0]
	];
	// 노병
	var cost_bk_dokyu=[
		[  30250,     0,   9350,15400,18600],
		[  60500,     0,  18700,30800,25110],
		[ 114950,     0,  58520,35530,31620],
		[ 206910,     0, 105336,63954,37200],
		[ 351747,108722, 179071,    0,42780],
		[ 562795,173955, 286514,    0,50220],
		[ 844193,429771, 260932,    0,53940],
		[1181870,601679, 365305,    0,59520],
		[1368820,558720, 865988,    0,65100],
		[2320010,717094,1181096,    0,70680],
		[      0,     0,      0,    0,    0]
	];
	// 기병
	var cost_bk_uma=[
		[1241,2044,4015,0,13500],
		[2482,4088,8030,0,17313],
		[4468,0,14454,7358,22950],
		[7595,0,24572,12509,27000],
		[12152,0,39315,20015,31040],
		[0,18228,58973,30022,36450],
		[0,42031,82562,25519,39150],
		[0,56742,111458,34451,43200],
		[0,73765,144895,44786,47250],
		[0,95894,188364,58222,51300],
		[0,0,0,0,0]
	];
	// 근위기병
	var cost_bk_konoe=[
		[10200,16800,33000,0,18600],
		[20400,33600,66000,0,25110],
		[38760,0,125400,63840,31620],
		[69768,0,225720,114912,37200],
		[76745,0,488376,132559,14400],
		[0,189769,613958,312561,50220],
		[0,468841,920938,284653,53940],
		[0,656377,1289313,398515,59520],
		[0,853291,1676107,518069,65100],
		[0,1279936,2514161,777104,70680],
		[0,0,0,0,0]
	];
	// 충차
	var cost_bk_kuruma=[
		[6600,2040,3360,0,17000],
		[13200,4080,6720,0,22950],
		[23760,7344,12096,0,28900],
		[40392,12485,20536,0,34000],
		[64627,19976,32901,0,39100],
		[96941,29964,49352,0,45900],
		[135717,41949,69092,0,49300],
		[183218,56631,93274,0,54400],
		[238183,73620,121257,0,59500],
		[359657,111167,183098,0,64600],
		[0,0,0,0,0]
	];
	// 투석기
	var cost_bk_stone=[
		[11050,35750,18200,0,24000],
		[22100,71500,36400,0,32400],
		[41990,135850,69160,0,40800],
		[75582,244530,124488,0,48000],
		[128489,415701,211630,0,55200],
		[205583,665122,338607,0,64800],
		[308375,997682,507911,0,69600],
		[431724,1396755,711075,0,76800],
		[561242,1815782,924398,0,0],		// 時間のみ未確定
		[729614,2360517,1201718,0,91200],	// 25時間20分 대장간Lv10(55%)にて13時間56分
		[0,0,0,0,0]
	];
	// 방어구공장テ?ブル ========================================================
	// 검병
	var cost_bg_ken=[
		[149,122,0,0,6600],
		[228,285,0,0,8910],
		[168,534,0,273,11220],
		[310,900,0,544,13200],
		[373,745,1864,0,15180],
		[539,1431,2801,0,17820],
		[1265,2063,4067,0,19140],
		[1949,6304,3209,0,21120],
		[0,10288,3253,5371,23100],
		[0,17683,5466,9002,25080],
		[0,0,0,0,0]
	];
	// 창병
	var cost_bg_yari=[
		[1638,3218,0,995,13500],
		[3276,6435,0,1989,18225],
		[0,11583,5897,3580,22950],
		[0,19691,10025,6086,27000],
		[9738,31506,16039,0,31050],
		[14607,47259,24059,0,36450],
		[20450,66162,33683,0,39150],
		[27608,89319,45471,0,43200],
		[35890,116115,59113,0,0],
		[46657,150949,76847,0,51300],
		[0,0,0,0,0]
	];
	// 모창병
	var cost_bg_hoko=[
		[12600,24750,0,7650,18600],
		[25200,49500,0,15300,25110],
		[0,94050,47880,29070,31620],
		[0,169290,86184,52326,37200],
		[0,0,0,0,42780],				// デ?タなし
		[0,0,0,0,50220],				// デ?タなし
		[0,0,0,0,53940],				// デ?タなし
		[0,0,0,0,59520],				// デ?タなし
		[0,0,0,0,65100],				// デ?タなし
		[0,0,0,0,0],					// デ?タなし
		[0,0,0,0,0]
	];
	// 궁병
	var cost_bg_yumi=[
		[3416,0,1056,1739,13500],
		[6831,0,2111,3478,22950],
		[12296,0,6260,3801,27000],
		[20903,0,10641,6461,31050],
		[33445,10337,17026,0,36450],
		[0,0,0,0,39150],				// デ?タなし
		[0,0,0,0,43200],				// デ?タなし
		[0,0,0,0,47250],				// デ?タなし
		[0,0,0,0,51300],				// デ?タなし
		[0,0,0,0,55350],				// デ?タなし
		[0,0,0,0,0]
	];
	// 弩級
	var cost_bg_dokyu=[
		[27225,0,8415,13860,18600],
		[54450,0,16830,27720,25110],
		[103455,0,52668,31977,31620],
		[0,0,0,0,37200],				// デ?タなし
		[316572,97850,161164,0,42780],
		[506516,156559,257863,0,50220],
		[759774,386794,234839,0,53940],
		[0,0,0,0,59520],				// デ?タなし
		[0,0,0,0,65100],				// デ?タなし
		[0,0,0,0,70680],				// デ?タなし
		[0,0,0,0,0]
	];
	// 기병
	var cost_bg_uma=[
		[1117,1840,3614,0,13500],
		[2234,3679,7227,0,18225],
		[4021,0,13009,6623,22950],
		[6835,0,22115,11258,27000],
		[10937,0,35384,18013,31050],
		[0,16405,53075,27020,36450],
		[0,37828,74305,22967,43200],
		[0,0,0,0,47250],				// デ?タなし
		[0,0,0,0,51300],				// デ?タなし
		[0,0,0,0,0],					// デ?タなし
		[0,0,0,0,0]
	];
	// 근위기병
	var cost_bg_konoe=[
		[9180,15120,29700,0,18600],
		[6156,10134,19908,0,25110],
		[7830,0,25344,12900,31620],
		[8952,0,28962,14742,37200],
		[20979,0,67878,34560,42780],
		[0,27279,88245,44919,50220],
		[0,78324,153852,47556,53940],
		[0,590740,1160381,358663,59520],	// 16時間32分 방어구공장Lv3(90%)にて14時間52分48秒
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0]
	];
	// 척후
	var cost_bg_sek=[
		[1638,995,0,3218,6600],
		[3276,1989,0,6435,8910],
		[6224,3779,0,12227,11220],
		[0,6802,11204,22008,13200],
		[0,11564,19047,37413,15180],
		[0,18502,30475,59861,17820],
		[27754,0,45712,89791,19140],
		[38855,0,63997,125708,21120],
		[50512,0,83916,163420,23100],
		[65665,0,108154,212446,25080],
		[0,0,0,0,0]
	];
	// 척후기병
	var cost_bg_sekuma=[
		[9180,15120,29700,0,18600],
		[6156,10134,19908,0,25110],
		[7830,0,25344,12900,31620],
		[8952,0,28962,14742,37200],
		[20979,0,67878,34560,42780],
		[0,27279,88245,44919,50220],
		[0,78324,153852,47556,53940],
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0]
	];
	// 충차
	var cost_bg_kuruma=[
		[5940,1836,3024,0,17000],
		[11880,3672,6048,0,22950],
		[21384,6610,10886,0,0],		// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0],				// デ?タなし
		[0,0,0,0,0]
	];
	// 투석기
	var cost_bg_stone=[
		[9945,32175,16380,0,24000],
		[19890,64350,32760,0,32400],
		[37791,122265,62244,0,40800],
		[0,0,0,0,48000],				// デ?タなし
		[0,0,0,0,0],					// デ?タなし
		[205583,665122,338607,0,0],		// デ?タなし
		[0,0,0,0,0],					// デ?タなし
		[388552,1257080,639968,0,0],	// デ?タなし
		[505118,1634204,831958,0,0],	// デ?タなし
		[656653,2124465,1081546,0,0],	// デ?タなし
		[0,0,0,0,0]
	];

	var costs = [];
	costs["대장간검병"]		= cost_bk_ken;
	costs["대장간창병"]		= cost_bk_yari;
	costs["대장간모창병"]	= cost_bk_hoko;
	costs["대장간궁병"]		= cost_bk_yumi;
	costs["대장간노병"]		= cost_bk_dokyu;
	costs["대장간기병"]		= cost_bk_uma;
	costs["대장간근위기병"]	= cost_bk_konoe;
	costs["대장간충차"]		= cost_bk_kuruma;
	costs["대장간투석기"]	= cost_bk_stone;

	costs["방어구공장검병"]		= cost_bg_ken;
	costs["방어구공장창병"]		= cost_bg_yari;
	costs["방어구공장모창병"]		= cost_bg_hoko;
	costs["방어구공장궁병"]		= cost_bg_yumi;
	costs["방어구공장노병"]		= cost_bg_dokyu;
	costs["방어구공장기병"]		= cost_bg_uma;
	costs["방어구공장근위기병"]	= cost_bg_konoe;
	costs["방어구공장척후"]		= cost_bg_sek;
	costs["방어구공장척후기병"]	= cost_bg_sekuma;
	costs["방어구공장충차"]		= cost_bg_kuruma;
	costs["방어구공장투석기"]		= cost_bg_stone;

	var make_loop = function(loop) {

		if (loop == 2) { 

			return;

		} else {

			if (loop == 0) { var type = "대장간"; }
			if (loop == 1) { var type = "방어구공장"; }
			if (OPT_BKBG_CHK == 0) { return; }

			var UnitID = [];

			UnitID["검병"]		= [301];
			UnitID["창병"]		= [303];
			UnitID["모창병"]	= [304];
			UnitID["기병"]		= [305];
			UnitID["근위기병"]	= [307];
			UnitID["궁병"]		= [308];
			UnitID["노병"]		= [309];
			UnitID["척후"]		= [310];
			UnitID["척후기병"]	= [311];
			UnitID["충차"]		= [312];
			UnitID["투석기"]	= [313];

			var _x = -1;
			var _y = -1;
			var _lv = -1;

			var area = new Array();
			area = get_area();

			for (var i=0;i<area.length;i++){
				if (area[i].name == type) {
					var Temp = area[i].xy.split(",");
					_x = Temp[0];
					_y = Temp[1];
					_lv = area[i].lv;
				}
			}
			if ( _x < 0 ) {
				return;
			}
			var tid=unsafeWindow.setTimeout(function(){

				var mURL = FACLINK;
				mURL = mURL.replace(URL_SITE,HOST);
				mURL = mURL.replace(URL_X,_x);
				mURL = mURL.replace(URL_Y,_y);

				GM_xmlhttpRequest({
					method:"GET", 
					url: mURL,
					headers:{"Content-type":"text/html"},
					overrideMimeType:'text/html; charset=utf-8',
					onload:function(x){
						var htmldoc = document.createElement("html");
					        htmldoc.innerHTML = x.responseText;
						// 대장간?방어구공장情報の取得
						getTrainingSoldier(htmldoc);
						if ( getStayMode() ) {
							closeIniBilderBox()
							openIniBilderBox()
						}

						var actionsElem  = document.evaluate('//th[@class="mainTtl6"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//						var actionsElem2 = document.evaluate('//b[@class="f14"]',       htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						var actionsElem2 = document.evaluate('//b[contains(@class,"f14")]',       htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						var actionsElem3 = document.evaluate('//td[@class="center"]'   ,htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						var actionsElem4 = document.evaluate('//td[@class="cost"]'   ,htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

						var htmldoc2 = document.createElement("html");

						var actionsElem7  = document.evaluate('//*[@colspan="4"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

						var Buki = Array();
						var x = -1;

						if ( htmldoc.innerHTML.lastIndexOf("を?化する") != -1 ) {
							for (var i=0;i<actionsElem2.snapshotLength;i++){
//								htmldoc2.innerHTML = actionsElem4.snapshotItem(i).innerHTML;
//								var actionsElem5 = document.evaluate('//span[@class="normal"]'   ,htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//								var actionsElem6 = document.evaluate('//span[@class="max90"]'   ,htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
								var BG_Name = actionsElem.snapshotItem(i+1).innerHTML;
								var BG_LvNm = actionsElem2.snapshotItem(i).innerHTML.substring(actionsElem2.snapshotItem(i).innerHTML.lastIndexOf("&nbsp;&nbsp;")+12);
								var BG_UID  = UnitID[BG_Name];
								var BG_Lv   = actionsElem2.snapshotItem(i).innerHTML.substring(3,actionsElem2.snapshotItem(i).innerHTML.lastIndexOf("&nbsp;")-6);

								var BG_WOOD  = costs[type + BG_Name][BG_Lv][0];
								var BG_STONE = costs[type + BG_Name][BG_Lv][1];
								var BG_IRON  = costs[type + BG_Name][BG_Lv][2];
								var BG_RICE  = costs[type + BG_Name][BG_Lv][3];
								var BG_TIME  = costs[type + BG_Name][BG_Lv][4];
								var BG_Go    = (actionsElem3.snapshotItem(i+1).innerHTML.lastIndexOf("を?化する") != -1);
/*
								if (BG_Lv != 10) {
									var BG_WOOD  = actionsElem5.snapshotItem(0).innerHTML;
									var BG_STONE = actionsElem5.snapshotItem(1).innerHTML;
									var BG_IRON  = actionsElem6.snapshotItem(0).innerHTML;
									var BG_RICE  = actionsElem5.snapshotItem(2).innerHTML;
									var BG_TIME  = actionsElem7.snapshotItem(i).innerHTML;
									var BG_Go    = (actionsElem3.snapshotItem(i+1).innerHTML.lastIndexOf("を?化する") != -1);
								} else {
									var BG_WOOD  = 0;
									var BG_STONE = 0;
									var BG_IRON  = 0;
									var BG_RICE  = 0;
									var BG_TIME  = 0;
									var BG_Go    = false;
								}
*/
								if (type == "대장간") {
									var BG_GoLv  = OPT_BK_LV[ ( UnitID[actionsElem.snapshotItem(i+1).innerHTML][0] - 300 ) ];
								} else {
									var BG_GoLv  = OPT_BG_LV[ ( UnitID[actionsElem.snapshotItem(i+1).innerHTML][0] - 300 ) ];
								}
								if ( checkBKLvup(BG_WOOD,BG_STONE,BG_IRON,BG_RICE,BG_Go,BG_Lv,BG_GoLv) ){
									x++;
									Buki[x] = [BG_Name,BG_Lv,BG_LvNm,BG_UID,BG_TIME];
								}
							}
				            Buki.sort( function(a, b) { if (a[4] > b[4]) return 1; if (a[4] < b[4]) return -1; return 0;});

							if (x != -1) {
								// 武器?化처리
								var c={};
								c['x'] = parseInt(_x);
								c['y'] = parseInt(_y);
								c['unit_id'] = parseInt(Buki[0][3]);
								j$.post("http://"+HOST+"/facility/facility.php?x=" + parseInt(_x) + "&y=" + parseInt(_y) + "#ptop",c,function(){});
			//					var tid=unsafeWindow.setTimeout(function(){location.reload(false);},0);

							}
						}	
						make_loop(loop + 1);

						function checkBKLvup(hwood,hstone,hiron,hrice,hgo,hnlv,hslv) {

							var wood = parseInt( $("wood").innerHTML, 10 );
							var stone = parseInt( $("stone").innerHTML, 10 );
							var iron = parseInt( $("iron").innerHTML, 10 );
							var rice = parseInt( $("rice").innerHTML, 10 );

		//					var temp = (parseInt(hwood) + 99);

							if (parseInt(hnlv) >= parseInt(hslv)) { return false; }
							if ((parseInt(hwood)  + OPT_BLD_WOOD ) > wood ) { return false; }
							if ((parseInt(hstone) + OPT_BLD_STONE) > stone) { return false; }
							if ((parseInt(hiron)  + OPT_BLD_IRON ) > iron ) { return false; }
							if ((parseInt(hrice)  + OPT_BLD_RICE ) > rice ) { return false; }
							if (hgo == false) { return false; }

							return true;
						}

					}
				});
			},0);
		}
	}
	make_loop(0);
}

function setVillageFacility() {

debugLog("=== Start setVillageFacility ===");

	var cnt=0;
	var vID = "";

	var del=0;
	var delX = 0;
	var delY = 0;

	//座標を取得
	var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	vId = trim(xyElem.snapshotItem(0).innerHTML);
	
	//건설情報を取得
	var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	// 삭제施設情報の取得
	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		//ステ?タス
		var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a', paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (buildStatusElem.snapshotLength > 0) {
			//施設건설?
			cnt++;

			// 삭제?カウント
			if( buildStatusElem.snapshotItem(0).parentNode.parentNode.textContent.indexOf("삭제") >= 0 ){
				if(buildStatusElem.snapshotItem(0).href.match(/.*\/.*(\d+).*(\d+)/)){
					delX = parseInt(RegExp.$1);
					delY = parseInt(RegExp.$2);
				}
				del++;
			}
		}
	}


	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		//ステ?タス
		var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a', paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (buildStatusElem.snapshotLength > 0) {
			//建物삭제等に?? 2010.10.25 byおぜがづ
			for(var j=0; j<buildStatusElem.snapshotLength;j++){
				if(buildStatusElem.snapshotItem(j).parentNode.innerHTML.match(RegExp("(건설中|건설準備中)"))) {
					//施設건설?
					cnt++;
				}
			}
			//施設건설?
			//cnt++;
		}
	}

	Load_OPT(vId);	//LvUP?象の取得

	//건설予約ができるかどうか
	// ＠＠
	if((cnt - del) >= 1) return;
	if(OPT_KATEMURA == 1) {
		var area_all = new Array();
		area_all = get_area_all();
		var hatake = 0; //밭の??
		var souko = 0; //창고の??
		var suzume = 0; //雀の??
		var heichi = 0; //평지の??
		var suzume_Flag = 0;
		var n = -1;
		for(var i=0;i < area_all.length;i++){
			if(area_all[i].name == "평지"){heichi++;n=i;}
			else if(area_all[i].name.match(/밭\s.*?(\d+)/)){hatake++;if(parseInt(RegExp.$1)>=5){suzume_Flag=1;}}
			else if(area_all[i].name.match(/창고/)){souko++;}
			else if(area_all[i].name.match(/동작대/)){suzume++;}
		}
		

		if(heichi>0){ //평지が余っていたら
			var tmp = heichi;
			if(suzume != 1){ //雀がまだ建っていなければ
				tmp -= 1; //평지の?をマイナス1
			}
			if(souko < OPT_SOUKO_MAX){ //창고がまだ最大?建っていなければ
				tmp -= (OPT_SOUKO_MAX - souko); //평지の?をマイナス]
			}
			if(tmp > 0){ //それでも평지が余っていれば
				if(Chek_Sigen(new lv_sort("밭",0,"")) != 1){ //資源체크
					createFacility(HATAKE, area_all); //밭を建てる
					Reload_Flg = 0;
					return;
				};
			} else if(souko < OPT_SOUKO_MAX){ //창고が建てられる평지があれば
				if(Chek_Sigen(new lv_sort("창고",0,"")) != 1){ //資源체크
					createFacility(SOUKO, area_all); //창고を建てる
					Reload_Flg = 0;
					return;
				}
			} else if(suzume != 1 && suzume_Flag == 1){ //雀がまだ建っていなければ
				if(Chek_Sigen(new lv_sort("동작대",0,"")) != 1){ //資源체크
					createFacility(SUZUME, area_all); //雀を建てる
					Reload_Flg = 0;
					return;
				}
			}
		}
		//建てられるスペ?スがなければ通常の처리を?ける
	}


	var area = new Array();
	area = get_area();
	area.sort(cmp_areas);
	area.sort(cmp_lv);
	Reload_Flg = 0;

	// 거점の?況を調査（삭제中なら처리しない）
	j$.get("http://"+HOST+"/facility/facility.php?x=3&y=3#ptop",function(x){
		var htmldoc = document.createElement("html");
	        htmldoc.innerHTML = x;
		var rmtime = htmldoc.innerHTML.match(/(마을を삭제中です。|요새を삭제中です。)[^\d]*(\d+-\d+-\d+ \d+:\d+:\d+)に完了します。/);
		if (rmtime) {
			// 삭제中のため何もしない
			return;
		}

		for(i=0;i<area.length;i++){
			var tmpName1 = area[i].name;
			switch (tmpName1) { 
				case "마을":
				case "성":
				case "요새":
					tmpName1  = "거점";              //
					chkFlg = 1;
					break;
			}

			if(parseInt(area[i].lv) >= parseInt(OPT_CHKBOXLV[OPT_FNID[tmpName1]])){
				continue;
			} //指定Lv以上ならメインに?る
			//건축物名分回す
			OPT_FUC_NAME.push("마을","성","요새");
			if(OPT_CHKBOX[0] == 1) {
				OPT_CHKBOX.push(1,1,1);
				OPT_CHKBOXLV.push(OPT_CHKBOXLV[0],OPT_CHKBOXLV[0],OPT_CHKBOXLV[0]);
			} else {
				OPT_CHKBOX.push(0,0,0);
				OPT_CHKBOXLV.push(0,0,0);
			}
			OPT_CHKBOX.push
			for(var ii=0;ii<OPT_FUC_NAME.length;ii++){
				//ソ?トしたLvの低い順に比較する
				if(area[i].name == OPT_FUC_NAME[ii]){
					//건축指示が有るか確認する。
					if(parseInt(OPT_CHKBOX[ii]) == 1){
						if(parseInt(area[i].lv) >= parseInt(OPT_CHKBOXLV[ii])){
							break;
						}

						//건축に必要な資源が有るかどうか체크
						var ret = Chek_Sigen(area[i]);
						if(ret == 1){
							//30分後にリロ?ドするかどうか
							Reload_Flg = 1;
							break;
						}

						var Temp = area[i].xy.split(",");
						var c = {};
						if( (del != 0) && (parseInt(Temp[0]) == delX) && (parseInt(Temp[1]) == delY) ){
							// 삭제施設とレベルアップ施設が一致したらスキップ
							continue;
						}
						// 거점以外のレベルアップ처리
						c['x']=parseInt(Temp[0]);
						c['y']=parseInt(Temp[1]);
						c['village_id']=getVillageID(vId);
						c['ssid']=j$.cookie('SSID');						
						j$.post("http://"+HOST+"/facility/build.php",c,function(){});
						var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);

						GM_setValue(HOST+PGNAME+"OPT_BUILD_VID" , getVillageID(vId) );
						var nowTime = new Date();
						Reload_Flg = 0;
						return;
					}
				}
			}
		}
	});

	
	if(Reload_Flg == 1){
		//10分後にリロ?ドし、再度건축できるか체크する。
		var tid=unsafeWindow.setTimeout(function(){location.reload();},60000);
	}

}

// @@@@ add 2011.09.06 숙사(밭) 자동ビルド＆スクラッチ
function setVillageFacility2() {
	var cnt=0;
	var del=0;
	var delX = 0;
	var delY = 0;
	var vID = "";
	//座標を取得
	var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	vId = trim(xyElem.snapshotItem(0).innerHTML);
	
	//건설情報を取得
	var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		//ステ?タス
		var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (buildStatusElem.snapshotLength > 0) {
			//施設건설?
			cnt++;

			// 삭제?カウント
			if( buildStatusElem.snapshotItem(0).parentNode.parentNode.textContent.indexOf("삭제") >= 0 ){
				if(buildStatusElem.snapshotItem(0).href.match(/.*\/.*(\d+).*(\d+)/)){
					delX = parseInt(RegExp.$1);
					delY = parseInt(RegExp.$2);
				}
				del++;
			}
		}
	}

	var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var area = new Array();
	for(var i=0,n=0; i<results.snapshotLength; i++){
		if(results.snapshotItem(i).alt.match(/(.*?)\s.*?(\d+)/)){
			strURL = results.snapshotItem(i).href;
			area[n] = new lv_sort(RegExp.$1,RegExp.$2,getURLxy(strURL));
			n++;
		}
		else if(results.snapshotItem(i).alt == "평지"){
			// 평지の座標を拾う
			strURL = results.snapshotItem(i).href;
			area[n] = new lv_sort("평지",0,getURLxy(strURL));
			n++;
		}
	}

	if( OPT_SorH == "DD" ){
		//숙사が처리?象の場合、エリアリストに창병사(숙사건설?件)があるかを체크
		var cntv = 0;
		for(var i=0;i<area.length;i++){
			if(area[i].name == "창병사"){
				cntv++;
				break;
			}
		}
		if(cntv == 0) return;
	}


	// 施設情報のレベルソ?ト
	area.sort(cmp_lv2);
	Load_OPT(vId);	//LvUP?象の取得
	// 삭제中か체크
	if( (del == 0) ){
		// 삭제中でなければ、삭제できる施設があるか調べる ＠＠
		var TargetName = "";
		if (OPT_SorH == "DD") { TargetName = "숙사"; }
		if (OPT_SorH == "HH") { TargetName = "밭"; }
		var TargetCount = 0;
		var BlankCount = 0;
		// ?象レベル以下の숙사（밭）と평지の?をカウントする
		for (i=0;i<area.length;i++){
			if (area[i].name == TargetName && parseInt(area[i].lv) <= OPT_MAXLV) { TargetCount += 1; }
			if (area[i].name == "평지") { TargetCount += 1; }
		}
		if (TargetCount < OPT_MAX){
			// ?象となる숙사（밭）と평지の合計が指定?に?たない場合
			area.sort(cmp_lv);
			for (i=0;i<area.length;i++){
				if ((area[i].name == TargetName) && (parseInt(area[i].lv) >= OPT_MAXLV)) {
					// 삭제
					var Temp = area[i].xy.split(",");
					DeleteFacility(Temp[0],Temp[1]);
					JSSleep(2);
					Reload_Flg = 0;
					return;
				}
			}
		} else {
			// 普通に삭제처리を?行
			for (i=0;i<area.length;i++){
				if ((area[i].name == TargetName) && (parseInt(area[i].lv) == OPT_MAXLV)) {
					// 삭제
					var Temp = area[i].xy.split(",");
					DeleteFacility(Temp[0],Temp[1]);
					JSSleep(2);
					Reload_Flg = 0;
					return;
				}
			}
		}
	}

	area.sort(cmp_lv2);
	//건설予約ができるかどうか
	if((cnt - del) >= 1) return;
	//if(cnt == 2) return;

	// 평지건설?件がある場合、?象施設?がOPT_MAX以上か체크する
	var yct = 0;

	if( OPT_SorH == "DD" ){
		for(i=0;i<area.length;i++){
			if(area[i].name == "숙사"){
				// @@ Lv6以下の?だけを?える 2011.06.22 5zen
				if(area[i].lv < (OPT_MAXLV + 1)){
					yct++;
				}
			}
		}
	}
	if( OPT_SorH == "HH" ){
		for(i=0;i<area.length;i++){
			if(area[i].name == "밭"){
				// @@ Lv6以下の?だけを?える 2011.06.22 5zen
				if(area[i].lv < (OPT_MAXLV + 1)){
					yct++;
				}
			}
		}
	}

	Reload_Flg = 0;
	for(i=0;i<area.length;i++){

		if( OPT_SorH == "DD" ){
			if((area[i].name != "숙사") && (area[i].name != "평지")){
				// 평지と숙사以外スキップ
				 continue;
			}
		}
		else if( OPT_SorH == "HH" ){
			if((area[i].name != "밭") && (area[i].name != "평지")){
				// 평지と밭以外スキップ
				 continue;
			}
		}
		if( yct >= OPT_MAX ){
			if( OPT_SorH == "DD" ){
				if(area[i].name != "숙사"){
					// 宿?がすでにOPT_MAX以上なら、평지は無視
					continue;
				}
			}
			if( OPT_SorH == "HH" ){
				if(area[i].name != "밭"){
					// 밭?がすでにOPT_MAX以上なら、평지は無視
					continue;
				}
			}
		}
//		if(parseInt(area[i].lv) >= OPT_MAXLV){break;} //指定Lv以上ならメインに?る

		//건축物名分回す
		for(var ii=0;ii<OPT_FUC_NAME.length;ii++){
			//ソ?トしたLvの低い順に比較する
			if(area[i].name == OPT_FUC_NAME[ii]){
				//건축に必要な資源が有るかどうか체크
				var ret = Chek_Sigen(area[i]);
				if(ret == 1){
					//30分後にリロ?ドするかどうか
					Reload_Flg = 1;
					break;
				}

				var Temp = area[i].xy.split(",");
				var c={};

				if( (del != 0) && (parseInt(Temp[0]) == delX) && (parseInt(Temp[1]) == delY) ){
					// 삭제施設とレベルアップ施設が一致したらスキップ
					continue;
				}
				// add 2011.12.14
				if (area[i].lv > (OPT_MAXLV - 1)) {
					continue;
				}
				if( area[i].name != "평지"){
					c['x']=parseInt(Temp[0]);
					c['y']=parseInt(Temp[1]);
					c['village_id']=getVillageID(vId);
					c['ssid']=j$.cookie('SSID');
					j$.post("http://"+HOST+"/facility/build.php",c,function(){});
					var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
				} else {
					if( OPT_SorH == "DD" ){
						c['x']=parseInt(Temp[0]);
						c['y']=parseInt(Temp[1]);
						c['id']=242;
						c['village_id']=getVillageID(vId);
						c['ssid']=j$.cookie('SSID');
						j$.post("http://"+HOST+"/facility/build.php",c,function(){});
						var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
					} else {
						c['x']=parseInt(Temp[0]);
						c['y']=parseInt(Temp[1]);
						c['id']=215;
						c['village_id']=getVillageID(vId);
						c['ssid']=j$.cookie('SSID');						
						j$.post("http://"+HOST+"/facility/build.php",c,function(){});
						var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
					}
				}
		        GM_setValue(HOST+PGNAME+"OPT_BUILD_VID" , getVillageID(vId) );
				Reload_Flg = 0;
				return;
			}
		}
	}
	
	if(Reload_Flg == 1){
		//30分後にリロ?ドし、再度건축できるか체크する。
		var tid=unsafeWindow.setTimeout(function(){location.reload();},1800000);
	}

	return;
}

//////////////////////////////////////////////////////////////////////////////////////////

//施設一?取得
function get_area(){
	var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var area = new Array();
	for(var i=0,n=0; i<results.snapshotLength; i++){
		if(results.snapshotItem(i).alt.match(/(.*?)\s.*?(\d+)/)){
			var strURL = results.snapshotItem(i).href;
			area[n] = new lv_sort(RegExp.$1,RegExp.$2,getURLxy(strURL));
			n++;
		}
	}
	return area;
}

function get_area_all(){
	var results = document.evaluate('//area', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var area = new Array();
	for(var i=0,n=0; i<results.snapshotLength; i++){
		var strURL = results.snapshotItem(i).href;
		area[n] = new areas(results.snapshotItem(i).alt,getURLxy(strURL));
		n++;
	}
	return area;
}

//施設건설
function createFacility(f, area){
	area.sort(cmp_areas);
	for(var i=0;i<area.length;i++){
		if(area[i].name == "평지"){ //一番最初に見つかった평지に건설
			var Temp = area[i].xy.split(",");
/*
			var mURL = CREATELINK;
			mURL = mURL.replace(URL_SITE,HOST);
			mURL = mURL.replace(URL_X,Temp[0]);
			mURL = mURL.replace(URL_Y,Temp[1]);
			mURL = mURL.replace(URL_viID,getVillageID(vId));
			mURL = mURL.replace(URL_fID,f);
			mURL = mURL.replace(URL_viSSID,j$.cookie('SSID'));							// 2012.04.24 ssid 追加
			var tid=unsafeWindow.setTimeout(function(){location.href = mURL;},INTERVAL);
*/
			var c = {};
			c['x']=parseInt(Temp[0]);
			c['y']=parseInt(Temp[1]);
			c['village_id']=getVillageID(vId);
			c['id']=f;
			c['ssid']=j$.cookie('SSID');						
			j$.post("http://"+HOST+"/facility/build.php",c,function(){});
			var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
			return;
		}
	}
}

function areas(name,xy){
	this.name = name;
	this.xy = xy;
}

//比較する??
function cmp_areas(a,b){
	if(a.xy > b.xy){return 1;} else {return -1;}
}

// 다음 거점 이동
function forwardNextVillage(){
	// 순회 중지한다 건너뛰기 2012.01.24
	if (GM_getValue(HOST+PGNAME+"AutoFlg", true) == false) { return; }

	var nowTime = new Date();
	var nextTime = getNextTime(location.hostname, nowTime);
	var waitTime = nextTime - nowTime;
	var roundTime = 0;

// @@ add 2011.10.04 @@

	clearInterval(tidMain2);

	if ((ShopFlg == true) && (ShopURL != "")) {
		roundTime = 10 * 1000;
		tidMain2=unsafeWindow.setTimeout(function(){location.href = ShopURL;},roundTime);
	}

	// 건축되었으며 다음 건축이 설정되어 있지 않은 빈 순회 거점 이동 (2 거점 동시에 완료한 경우에 사용하는 처리)
	var villages = loadVillages(location.hostname + PGNAME);
	for (var i = 0; i < villages.length; i++) {
		var actions = sortAction(villages[i][IDX_ACTIONS]);
		var nowTime = new Date();
		for (var j = 0; j < actions.length; j++) {
			var actionDiv = createActionDiv(actions[j], nowTime, villages[i][IDX_XY], location.hostname);
			if (!actionDiv) continue;
			
			var actionTime = new Date(actions[j][IDX2_TIME]);
			var moveFlg = 0;
			if ( actionTime < nowTime && actions[j][IDX2_ROTATION] == 0 && actions[j][IDX2_TYPE] == TYPE_CONSTRUCTION){
				for (var x = j + 1; x < actions.length; x++){
					actionTime = new Date(actions[x][IDX2_TIME]);
					if ( actionTime > nowTime && actions[x][IDX2_ROTATION] == 0 && actions[x][IDX2_TYPE] == TYPE_CONSTRUCTION){
						moveFlg = 1;
						break;
					}
				}
				if ( !(x < actions.length) ) {
					actions[j][IDX2_ROTATION] = 1;
				}
				if (moveFlg == 0) {
					var data = new Array();
					data[IDX_BASE_NAME] = villages[i][IDX_BASE_NAME];
					data[IDX_XY] = villages[i][IDX_XY];
					data[IDX_ACTIONS] = actions;

					if (location.pathname == "/village.php") {
						var vcURL = villages[i][IDX_URL];
							if(vcURL!=undefined){
								saveVillages(HOST+PGNAME, villages);
								roundTime = 5 * 1000;
								tidMain2=unsafeWindow.setTimeout(function(){location.href = vcURL;},roundTime);
							}
					}
				}
			}
		}
	}
	if ( tidMain2 == undefined ) {
		//가장 빠른 작업 완료 시간을 가져
		var startTime = new Date("2099/12/31 23:59:59");
		var nextTime = startTime;
		var baseTime = new Date();

		nextURL = "";
		// 다음 건설 완료 예정인 검색
		for (var i = 0; i < villages.length; i++) {
			var actions = villages[i][IDX_ACTIONS];
			for (var j = 0; j < actions.length; j++) {
				var actionTime = new Date(actions[j][IDX2_TIME]);
				if (actionTime > baseTime && actionTime < nextTime && actions[j][IDX2_TYPE] == TYPE_CONSTRUCTION) {
					var type = actions[j][IDX2_TYPE].charAt(0);
					nextTime = actionTime;
					nextURL  = villages[i][IDX_URL];
					nextNAME = villages[i][IDX_BASE_NAME];
				}
			}
		}

		var nTime = (nextTime - nowTime);
		var vcURL = nextVillageURL(getVillageID(vId));

		if(vcURL!=undefined){
			if (nextURL == "") {
				// 다음 건축 완료 예정이없는 경우는 통상 순회 처리
				roundTime = parseInt(OPT_ROUND_TIME1) * 1000;
				tidMain2=unsafeWindow.setTimeout(function(){location.href = vcURL;},roundTime);
			} else {
				if (parseInt(OPT_ROUND_TIME1) * 1000 > nTime) {
					// 순회 시간 이전에 건축이 끝날 거점이있는 경우
					// 2011.12.06 즉시 변경을 중단하고 10 초 후에 수정
//					tidMain2=unsafeWindow.setTimeout(function(){location.href = nextURL;},(nextTime - nowTime));
//					tidMain2=unsafeWindow.setTimeout(function(){location.href = nextURL;},10 * 1000);
					roundTime = (nextTime - nowTime + 10000);
					tidMain2=unsafeWindow.setTimeout(function(){location.href = nextURL;},roundTime);
				} else {
					// 일반적 순회 처리
					roundTime = parseInt(OPT_ROUND_TIME1) * 1000;
					tidMain2=unsafeWindow.setTimeout(function(){location.href = vcURL;},roundTime);
				}
			}
		}
	}
debugLog("nTime:" + nTime / 1000 + "sec  RoundTime:" + (roundTime / 1000) + "sec  forwardNextVillage:" + vcURL + " " + roundTime);
}

//比較する??
function cmp_time(a,b){
	if(a.xy > b.xy){return 1;} else {return -1;}
}

// 次거점URL取得
function nextVillageURL(vId2){
	var villages = loadVillages(HOST+PGNAME);
	var nextIndex = 0;
	var chkNextVID = new Array();
	for(var i=0; i<villages.length;i++){
		var tChk1 = GM_getValue(HOST+PGNAME+"OPT_CHKBOX_AVC_"+i, true);
		if(tChk1==true){
			chkNextVID.push(villages[i][IDX_URL]);
	    }
	}

	// 現在の거점のインデックスを?索 2012.01.24 逆順처리追加
	for(var i=0; i<chkNextVID.length;i++){
		var url = chkNextVID[i];
	    if(vId2 == getParameter2(chkNextVID[i], "village_id")){
			if (getReverseMode() == false) {
				// 正巡回
		        if(i+1 < chkNextVID.length){
		            nextIndex = i+1;
		        }else{
		            nextIndex = 0;
		        }
			} else {
				// 逆巡回
				if(i-1 < 0){
					nextIndex = chkNextVID.length-1;
				} else {
					nextIndex = i-1;
				}
			}
	        break;
	    }
	}
	return chkNextVID[nextIndex];
}


// URLパラメタ取得
function getParameter2(url, key) {
	var str = url.split("?");
	if (str.length < 2) {
		return "";
	}

	var params = str[1].split("&");
	for (var i = 0; i < params.length; i++) {
		var keyVal = params[i].split("=");
		if (keyVal[0] == key && keyVal.length == 2) {
			return decodeURIComponent(keyVal[1]);
		}
	}
	return "";
}


//건축物の格納用
function lv_sort(name,lv,xy){
	this.name = name;
	this.lv = lv;
	this.xy = xy;
}
//比較する??
function cmp_lv(a,b){
	return a.lv - b.lv;
}

function cmp_lv2(a,b){
	return b.lv - a.lv;
}
//거점IDの取得
function getVillageID(vId){
	//villages
	var villages = loadVillages(HOST+PGNAME);
	for(var i=0; i<villages.length;i++){
		if(villages[i][IDX_XY] == vId){
			var vURL = villages[i][IDX_URL];
			var temp = vURL.split("?");
			var temp2 = temp[1].split("=");
			return temp2[1];
		}
	}
}
function getURLxy(strURL){
	if(strURL == ""){ return "";}
	var strTemp = "";
	strTemp = strURL;
	var Temp = strTemp.split("?");
	var Temp2 = Temp[1].split("&");
	var Temp3 = Temp2[0].split("=");
	var Temp4 = Temp2[1].split("=");
	return Temp3[1] + "," +Temp4[1];
}

//링크HTML追加
function addOpenLinkHtml() {
	if (location.hostname[0] == "s" || location.hostname[0] == "h" || location.hostname[0] == "p") {
//			var sidebar = d.evaluate('//*[@class="copyright"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var sidebar = d.evaluate('//*[@class="sideBoxHead"]/h3/strong',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	} else {
		var sidebar = d.evaluate('//a[@title="거점"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
 	if (sidebar.snapshotLength == 0){
	    sidebar = d.evaluate('//*[@class="xy"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	    if (sidebar.snapshotLength == 0) return;
	    isMixi = false;
	}
	
	//자동移動링크
	var openLink = d.createElement("a");
	openLink.id = "Auto_Bilder";
	openLink.href = "javascript:void(0);";
	openLink.style.marginTop = "0px";
	openLink.style.marginLeft = "0px";
	openLink.innerHTML = "[자동건설]";
/*
	if (location.hostname[0] == "s" || location.hostname[0] == "h") {
		openLink.style.color = "#000000";
	} else {
		openLink.style.color = "#FFFFFF";
	}
*/
	openLink.style.color = "#FFFFFF";
	openLink.style.cursor = "pointer";

	openLink.addEventListener("click", function() {
		closeIniBilderBox();
		openIniBilderBox();
	}, true);
	if (location.hostname[0] == "s" || location.hostname[0] == "h") {
		sidebar.snapshotItem(1).appendChild(openLink);
	} else {
		sidebar.snapshotItem(0).appendChild(openLink);
	}
}

//건축설정?面を開く
function openIniBilderBox() {
	addIniBilderHtml();
}

//건축설정?面を閉じる
function closeIniBilderBox() {
	deleteIniBilderHtml();
	deleteIniBilderFrameHtml();
}
//건축?象거점表示HTML삭제
function deleteIniBilderHtml() {
	var elem = d.getElementById("ABContainer");
	if (elem == undefined) return;
	d.body.removeChild(d.getElementById("ABContainer"));
}
//건축?象거점表示HTML삭제
function deleteIniBilderFrameHtml() {
	var elem = d.getElementById("ABContainer");
	if (elem == undefined) return;
	d.body.removeChild(document.getElementById("ABContainer"));
}

//LvUP?象施設설정?面を開く
function openInifacBox(vId) {
	clearInterval(tidMain2);
	clearInterval(tidMain3);
	closeInifacBox();
	addInifacHtml(vId);
}
///LvUP?象施設설정?面を閉じる
function closeInifacBox() {
	deleteInifacHtml();
	deleteInifacFrameHtml();
}

///LvUP?象施設設の체크ボックスをクリアする
function clearInifacBox() {

	var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX1"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX2"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX3"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX7"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX8"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX9"]');   checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX10"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX11"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX12"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX13"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX14"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX15"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX16"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX17"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX18"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX19"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX20"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX21"]');  checkbox[0].checked = false;
	var checkbox = $a('//input[@id="OPT_CHKBOX22"]');  checkbox[0].checked = false;

	var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV1"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV2"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV3"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV7"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV8"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV9"]');   textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV10"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV11"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV12"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV13"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV14"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV15"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV16"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV17"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV18"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV19"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV20"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV21"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_CHKBOXLV22"]');  textbox[0].value = 0;
	// 내정설정
	var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = false; // 벌채지식
	var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = false; // 벌채기술
	var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = false; // 채석지식
	var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = false; // 채석기술
	var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = false; // 제철지식
	var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = false; // 제철기술
	var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 기병강화
	var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = false; // 식량지식
	var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = false; // 식량기술
	var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 농림지식
	var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 농림기술
	var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 가공지식
	var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 가공기술
	var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 부국
	var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 부국론
	var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 부국강병
	var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 풍요
	var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 미옥가무
	var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false; // ?風
	var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false; // 人選眼力
	var checkbox = $a('//input[@id="OPT_DOME23"]'); checkbox[0].checked = false; // 오나라의 치세
	var checkbox = $a('//input[@id="OPT_DOME24"]'); checkbox[0].checked = false; // 왕좌의 재능
	var checkbox = $a('//input[@id="OPT_DOME25"]'); checkbox[0].checked = false; // 창병훈련
	var checkbox = $a('//input[@id="OPT_DOME26"]'); checkbox[0].checked = false; // 　　수련
	var checkbox = $a('//input[@id="OPT_DOME27"]'); checkbox[0].checked = false; // 기병사훈련
	var checkbox = $a('//input[@id="OPT_DOME28"]'); checkbox[0].checked = false; // 　　수련
	var checkbox = $a('//input[@id="OPT_DOME29"]'); checkbox[0].checked = false; // 궁병훈련
	var checkbox = $a('//input[@id="OPT_DOME30"]'); checkbox[0].checked = false; // 　　수련
	var checkbox = $a('//input[@id="OPT_DOME31"]'); checkbox[0].checked = false; // 연병소훈련
	var checkbox = $a('//input[@id="OPT_DOME32"]'); checkbox[0].checked = false; // 　　수련
	// 糧마을オプション
	var checkbox = $a('//input[@id="OPT_KATEMURA"]');  checkbox[0].checked = false; // 糧마을化
}

function InitMilitaryHome(){
	// 원정훈련소
	clearInifacBox();
	var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = false;	// 거점
	var checkbox = $a('//input[@id="OPT_CHKBOX1"]');   checkbox[0].checked = false;	// 벌채소
	var checkbox = $a('//input[@id="OPT_CHKBOX2"]');   checkbox[0].checked = false;	// 채석장
	var checkbox = $a('//input[@id="OPT_CHKBOX3"]');   checkbox[0].checked = false;	// 제철소
	var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = true;	// 밭
	var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = true;	// 창고
	var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = true;	// 동작대
	var checkbox = $a('//input[@id="OPT_CHKBOX7"]');   checkbox[0].checked = true;	// 대장간
	var checkbox = $a('//input[@id="OPT_CHKBOX8"]');   checkbox[0].checked = true;	// 방어구공장
	var checkbox = $a('//input[@id="OPT_CHKBOX9"]');   checkbox[0].checked = true;	// 창병사
	var checkbox = $a('//input[@id="OPT_CHKBOX10"]');  checkbox[0].checked = false;	// 연병소
	var checkbox = $a('//input[@id="OPT_CHKBOX11"]');  checkbox[0].checked = false;	// 궁병사
	var checkbox = $a('//input[@id="OPT_CHKBOX12"]');  checkbox[0].checked = false;	// 기병사
	var checkbox = $a('//input[@id="OPT_CHKBOX13"]');  checkbox[0].checked = true;	// 숙사
	var checkbox = $a('//input[@id="OPT_CHKBOX14"]');  checkbox[0].checked = false;	// 무기공장
	var checkbox = $a('//input[@id="OPT_CHKBOX15"]');  checkbox[0].checked = false;	// 시장
	var checkbox = $a('//input[@id="OPT_CHKBOX16"]');  checkbox[0].checked = true;	// 훈련소
	var checkbox = $a('//input[@id="OPT_CHKBOX17"]');  checkbox[0].checked = false;	// 수차
	var checkbox = $a('//input[@id="OPT_CHKBOX18"]');  checkbox[0].checked = false;	// 공장
	var checkbox = $a('//input[@id="OPT_CHKBOX19"]');  checkbox[0].checked = false;	// 연구소
	var checkbox = $a('//input[@id="OPT_CHKBOX20"]');  checkbox[0].checked = true;	// 대숙사
	var checkbox = $a('//input[@id="OPT_CHKBOX21"]');  checkbox[0].checked = true;	// 원정훈련소
	var checkbox = $a('//input[@id="OPT_CHKBOX22"]');  checkbox[0].checked = true;	// 감시탑

	var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 0;	// 거점
	var textbox = $a('//input[@id="OPT_CHKBOXLV1"]');   textbox[0].value = 0;	// 벌채소
	var textbox = $a('//input[@id="OPT_CHKBOXLV2"]');   textbox[0].value = 0;	// 채석장
	var textbox = $a('//input[@id="OPT_CHKBOXLV3"]');   textbox[0].value = 0;	// 제철소
	var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 5;	// 밭
	var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 1;	// 창고
	var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 7;	// 동작대
	var textbox = $a('//input[@id="OPT_CHKBOXLV7"]');   textbox[0].value = 5;	// 대장간
	var textbox = $a('//input[@id="OPT_CHKBOXLV8"]');   textbox[0].value = 7;	// 방어구공장
	var textbox = $a('//input[@id="OPT_CHKBOXLV9"]');   textbox[0].value = 3;	// 창병사
	var textbox = $a('//input[@id="OPT_CHKBOXLV10"]');  textbox[0].value = 0;	// 연병소
	var textbox = $a('//input[@id="OPT_CHKBOXLV11"]');  textbox[0].value = 0;	// 궁병사
	var textbox = $a('//input[@id="OPT_CHKBOXLV12"]');  textbox[0].value = 0;	// 기병사
	var textbox = $a('//input[@id="OPT_CHKBOXLV13"]');  textbox[0].value = 15;	// 숙사
	var textbox = $a('//input[@id="OPT_CHKBOXLV14"]');  textbox[0].value = 0;	// 무기공장
	var textbox = $a('//input[@id="OPT_CHKBOXLV15"]');  textbox[0].value = 0;	// 시장
	var textbox = $a('//input[@id="OPT_CHKBOXLV16"]');  textbox[0].value = 5;	// 훈련소
	var textbox = $a('//input[@id="OPT_CHKBOXLV17"]');  textbox[0].value = 0;	// 수차
	var textbox = $a('//input[@id="OPT_CHKBOXLV18"]');  textbox[0].value = 0;	// 공장
	var textbox = $a('//input[@id="OPT_CHKBOXLV19"]');  textbox[0].value = 0;	// 연구소
	var textbox = $a('//input[@id="OPT_CHKBOXLV20"]');  textbox[0].value = 8;	// 대숙사
	var textbox = $a('//input[@id="OPT_CHKBOXLV21"]');  textbox[0].value = 10;	// 원정훈련소
	var textbox = $a('//input[@id="OPT_CHKBOXLV22"]');  textbox[0].value = 8;	// 감시탑
	// 내정설정
	var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = false; // 벌채지식
	var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = false; // 벌채기술
	var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = false; // 채석지식
	var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = false; // 채석기술
	var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = false; // 제철지식
	var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = false; // 제철기술
	var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 기병강화
	var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = false; // 식량지식
	var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = false; // 식량기술
	var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 농림지식
	var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 농림기술
	var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 가공지식
	var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 가공기술
	var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 부국
	var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 부국론
	var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 부국강병
	var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 풍요
	var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 미옥가무
	var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false; // 오나라의 치세
	var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false; // 왕좌의 재능
}

function InitRiceParadise(){
	// 糧마을
	clearInifacBox();
	var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = true;	// 거점
	var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = true;  // 밭
	var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = true;  // 창고
	var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = true;  // 동작대

	var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 10;		// 거점
	var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 15;		// 밭
	var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 20;		// 창고
	var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 10;		// 동작대
	// 내정설정
	var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = false; // 벌채지식
	var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = false; // 벌채기술
	var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = false; // 채석지식
	var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = false; // 채석기술
	var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = false; // 제철지식
	var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = false; // 제철기술
	var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 기병강화
	var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = true; // 식량지식
	var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = true; // 식량기술
	var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 농림지식
	var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 농림기술
	var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 가공지식
	var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 가공기술
	var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 부국
	var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 부국론
	var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 부국강병
	var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 풍요
	var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 미옥가무
	var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false; // 오나라의 치세
	var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false; // 왕좌의 재능
	// 糧마을オプション
	var checkbox = $a('//input[@id="OPT_KATEMURA"]');  checkbox[0].checked = true; // 糧마을化
}

function InitResVillage(){
	// 資源마을
	clearInifacBox();
	var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = true;	// 거점
	var checkbox = $a('//input[@id="OPT_CHKBOX1"]');   checkbox[0].checked = true;	// 벌채소
	var checkbox = $a('//input[@id="OPT_CHKBOX2"]');   checkbox[0].checked = true;	// 채석장
	var checkbox = $a('//input[@id="OPT_CHKBOX3"]');   checkbox[0].checked = true;	// 제철소
	var checkbox = $a('//input[@id="OPT_CHKBOX4"]');   checkbox[0].checked = true;	// 밭
	var checkbox = $a('//input[@id="OPT_CHKBOX5"]');   checkbox[0].checked = true;	// 창고
	var checkbox = $a('//input[@id="OPT_CHKBOX6"]');   checkbox[0].checked = true;	// 동작대

	var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 10;
	var textbox = $a('//input[@id="OPT_CHKBOXLV1"]');   textbox[0].value = 13;
	var textbox = $a('//input[@id="OPT_CHKBOXLV2"]');   textbox[0].value = 13;
	var textbox = $a('//input[@id="OPT_CHKBOXLV3"]');   textbox[0].value = 13;
	var textbox = $a('//input[@id="OPT_CHKBOXLV4"]');   textbox[0].value = 15;
	var textbox = $a('//input[@id="OPT_CHKBOXLV5"]');   textbox[0].value = 20;
	var textbox = $a('//input[@id="OPT_CHKBOXLV6"]');   textbox[0].value = 10;
	// 내정설정
	var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = true; // 벌채지식
	var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = true; // 벌채기술
	var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = true; // 채석지식
	var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = true; // 채석기술
	var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = true; // 제철지식
	var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = true; // 제철기술
	var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 기병강화
	var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = true; // 식량지식
	var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = true; // 식량기술
	var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 농림지식
	var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 농림기술
	var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 가공지식
	var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 가공기술
	var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 부국
	var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 부국론
	var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 부국강병
	var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 풍요
	var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 미옥가무
	var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false; // 오나라의 치세
	var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false; // 왕좌의 재능
	// 糧마을オプション
	var checkbox = $a('//input[@id="OPT_KATEMURA"]');  checkbox[0].checked = false; // 糧마을化
}

function InitMilitarySite(){
	//軍事거점
	clearInifacBox();
	var checkbox = $a('//input[@id="OPT_CHKBOX0"]');   checkbox[0].checked = true;	// 거점
	var checkbox = $a('//input[@id="OPT_CHKBOX10"]');  checkbox[0].checked = true;	// 연병소
	var checkbox = $a('//input[@id="OPT_CHKBOX11"]');  checkbox[0].checked = true;	// 궁병사
	var checkbox = $a('//input[@id="OPT_CHKBOX12"]');  checkbox[0].checked = true;	// 기병사
	var checkbox = $a('//input[@id="OPT_CHKBOX13"]');  checkbox[0].checked = true;	// 무기공장
	var checkbox = $a('//input[@id="OPT_CHKBOX14"]');  checkbox[0].checked = true;	// 숙사
	var checkbox = $a('//input[@id="OPT_CHKBOX20"]');  checkbox[0].checked = true;	// 대숙사

	var textbox = $a('//input[@id="OPT_CHKBOXLV0"]');   textbox[0].value = 10;
	// 내정설정
	var checkbox = $a('//input[@id="OPT_DOME1"]'); checkbox[0].checked = false; // 벌채지식
	var checkbox = $a('//input[@id="OPT_DOME2"]'); checkbox[0].checked = false; // 벌채기술
	var checkbox = $a('//input[@id="OPT_DOME3"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME4"]'); checkbox[0].checked = false; // 채석지식
	var checkbox = $a('//input[@id="OPT_DOME5"]'); checkbox[0].checked = false; // 채석기술
	var checkbox = $a('//input[@id="OPT_DOME6"]'); checkbox[0].checked = false; // 궁병강화
	var checkbox = $a('//input[@id="OPT_DOME7"]'); checkbox[0].checked = false; // 제철지식
	var checkbox = $a('//input[@id="OPT_DOME8"]'); checkbox[0].checked = false; // 제철기술
	var checkbox = $a('//input[@id="OPT_DOME9"]'); checkbox[0].checked = false; // 기병강화
	var checkbox = $a('//input[@id="OPT_DOME10"]'); checkbox[0].checked = false; // 식량지식
	var checkbox = $a('//input[@id="OPT_DOME11"]'); checkbox[0].checked = false; // 식량기술
	var checkbox = $a('//input[@id="OPT_DOME12"]'); checkbox[0].checked = false; // 농림지식
	var checkbox = $a('//input[@id="OPT_DOME13"]'); checkbox[0].checked = false; // 농림기술
	var checkbox = $a('//input[@id="OPT_DOME14"]'); checkbox[0].checked = false; // 가공지식
	var checkbox = $a('//input[@id="OPT_DOME15"]'); checkbox[0].checked = false; // 가공기술
	var checkbox = $a('//input[@id="OPT_DOME16"]'); checkbox[0].checked = false; // 부국
	var checkbox = $a('//input[@id="OPT_DOME17"]'); checkbox[0].checked = false; // 부국론
	var checkbox = $a('//input[@id="OPT_DOME18"]'); checkbox[0].checked = false; // 부국강병
	var checkbox = $a('//input[@id="OPT_DOME19"]'); checkbox[0].checked = false; // 풍요
	var checkbox = $a('//input[@id="OPT_DOME20"]'); checkbox[0].checked = false; // 미옥가무
	var checkbox = $a('//input[@id="OPT_DOME21"]'); checkbox[0].checked = false; // 오나라의 치세
	var checkbox = $a('//input[@id="OPT_DOME22"]'); checkbox[0].checked = false; // 왕좌의 재능
}

// ?す資源量のクリア
function clearInitRemainingRes(){
	var textbox = $a('//input[@id="OPT_BLD_WOOD"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BLD_STONE"]'); textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BLD_IRON"]');  textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BLD_RICE"]');  textbox[0].value = 0;
}

// 武器?防具?化レベルのクリア
function clearInitArmsArmor(){

	var textbox = $a('//input[@id="OPT_BK_LV1"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV8"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV3"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV9"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV5"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV4"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV7"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV12"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BK_LV13"]');	textbox[0].value = 0;

	var textbox = $a('//input[@id="OPT_BG_LV1"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV8"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV3"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV9"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV5"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV4"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV7"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV10"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV11"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV12"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_BG_LV13"]');	textbox[0].value = 0;
}

// 造兵時작성?位初期化
function clearInitSoldier(){

	var textbox = $a('//input[@id="OPT_SOL_ADD1"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD8"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD3"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD5"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD9"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD4"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD7"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD10"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD11"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD12"]');	textbox[0].value = 0;
	var textbox = $a('//input[@id="OPT_SOL_ADD13"]');	textbox[0].value = 0;
}

//건축?象施設表示HTML삭제
function deleteInifacHtml() {
	var elem = d.getElementById("ABfacContainer");
	if (elem == undefined) return;
	d.body.removeChild(d.getElementById("ABfacContainer"));
}
//건축?象施設表示HTML삭제
function deleteInifacFrameHtml() {
	var elem = d.getElementById("ABfacContainer");
	if (elem == undefined) return;
	d.body.removeChild(document.getElementById("ABfacContainer"));
}

//ステイタス取得HTML追加
function addIniBilderHtml() {


//	var popupLeft = 500;
//	var popupTop = 250;

// add 2011.09.27 설정?面移動
	var popupLeft = GM_getValue(location.hostname + PGNAME + "_popup_left", 150);
	var popupTop = GM_getValue(location.hostname + PGNAME + "_popup_top", 150);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;
// end

	// 表示コンテナ작성
	var ABContainer = d.createElement("div");
	ABContainer.id = "ABContainer";
	ABContainer.style.position = "absolute";
	ABContainer.style.backgroundColor = COLOR_FRAME;
	ABContainer.style.opacity= 1.0;	// 透明度
	ABContainer.style.border = "solid 2px #000000";
	ABContainer.style.MozBorderRadius = "4px";	// 角丸
	ABContainer.style.top = popupTop + "px";
	ABContainer.style.left = popupLeft + "px";
	ABContainer.style.fontSize = "10px";
	ABContainer.style.padding = "4px";
	ABContainer.style.zIndex = 999;
	d.body.appendChild(ABContainer);

	$e(ABContainer, "mousedown", function(event){
		if( event.target != $("ABContainer")) {return false;}
		g_MD="ABContainer";
		g_MX=event.pageX-parseInt(this.style.left,10);
		g_MY=event.pageY-parseInt(this.style.top,10);
		event.preventDefault();
	});

	$e(d, "mousemove", function(event){
		if(g_MD != "ABContainer") return true;
		var ABContainer = $("ABContainer");
		if( !ABContainer ) return true;
		var popupLeft = event.pageX - g_MX;
		var popupTop = event.pageY - g_MY;
		ABContainer.style.left = popupLeft + "px";
		ABContainer.style.top = popupTop + "px";
		//ポップアップ位置を永?保存
		GM_setValue(location.hostname + PGNAME + "_popup_left", popupLeft);
		GM_setValue(location.hostname + PGNAME + "_popup_top", popupTop);
	});

	$e(d, "mouseup", function(event){ g_MD=""; });

	// タイトル＋バ?ジョン
	var title = d.createElement("span");
	title.style.color = "#FFFFFF";
	title.style.font = 'bold 120% "ＭＳ ゴシック"';
	title.style.margin = "2px";
	title.innerHTML = "Auto Bilder ";

	var version = d.createElement("span");
	version.style.color = COLOR_TITLE;
	version.style.font = '96% "ＭＳ ゴシック"';
	version.style.margin = "2px";
	version.innerHTML = " Ver." + VERSION;

	var storageLimit = d.createElement("span");
	storageLimit.style.color = "#FFFFFF";
	storageLimit.style.font = '110% "ＭＳ Ｐゴシック"';
	storageLimit.style.margin = "2px";

	storageLimit.innerHTML = "資源保持上限(?換量) ： " + SetPrice(Math.floor(parseInt( $("rice_max").innerHTML, 10 ) * 0.95)) + " ( " + SetPrice(Math.floor(parseInt( $("rice_max").innerHTML, 10 ) * 0.05)) +" )";

	ABContainer.appendChild(title);
//	ABContainer.appendChild(storageLimit);
	ABContainer.appendChild(version);

	// ボタンエリア
	var ButtonBox = d.createElement("div");
	ButtonBox.style.border ="solid 0px";	// 通常 0px 체크時 1px
	ButtonBox.style.margin = "2px";
	ButtonBox.style.padding = "0px";

	ABContainer.appendChild(ButtonBox);

	// ?行中/停止中ボタン
	var Button1 = d.createElement("span");
	if(GM_getValue(HOST+PGNAME+"AutoFlg", true)==true){
		ccreateButton(Button1, "순회중", "순회 중지를 원하실경우 클릭", 
			function() {
				GM_setValue(HOST+PGNAME+"AutoFlg", false);
				location.reload();
			});
	} else {
		ccreateButton(Button1, "정지중", "클릭하시면 순회시작합니다.", 
			function() {
				GM_setValue(HOST+PGNAME+"AutoFlg", true);
					location.reload();
			});
	}
	ButtonBox.appendChild(Button1);

	// 確認?みボタン
	var Button2 = d.createElement("span");
		ccreateButton(Button2, "로그삭제", "완료된 건설로그를 삭제합니다",
			function() { confirmTimer() });
	ButtonBox.appendChild(Button2);

	// 閉じるボタン
	var Button3 = d.createElement("span");
		ccreateButton(Button3, "닫기", "자동건설창을 닫습니다.",
			function() {closeIniBilderBox()});
	ButtonBox.appendChild(Button3);

	// 常駐체크ボックス
	var staySpan = d.createElement("span");
	staySpan.title = "작업 완료없이 항상 표시합니다";
	ButtonBox.appendChild(staySpan);

	var stayBox =  document.createElement("input");
	stayBox.type = "checkbox";
	stayBox.style.verticalAlign = "middle";
	stayBox.checked = getStayMode();
	stayBox.addEventListener("change", 
		function() {changeStayMode(this.checked)}, true);
	ButtonBox.appendChild(stayBox);

	var stayCap = document.createElement("span");
	stayCap.style.verticalAlign = "middle";
	stayCap.innerHTML = "　계속표시 ";
	stayCap.style.color = "#FFFFFF";
	staySpan.appendChild(stayCap);

	// 巡回順체크ボックス
	var reverseSpan = d.createElement("span");
	reverseSpan.title = "거점순회를 반대로합니다.";
	ButtonBox.appendChild(reverseSpan);

	var reverseBox =  document.createElement("input");
	reverseBox.type = "checkbox";
	reverseBox.style.verticalAlign = "middle";
	reverseBox.checked = getReverseMode();
	reverseBox.addEventListener("change", 
		function() {changeReverseMode(this.checked)}, true);
	ButtonBox.appendChild(reverseBox);

	var reverseCap = document.createElement("span");
	reverseCap.style.verticalAlign = "middle";
	reverseCap.innerHTML = "　　역순회 ";
	reverseCap.style.color = "#FFFFFF";
	reverseSpan.appendChild(reverseCap);

	// 巡回時間プルダウン
	var typeDiv = document.createElement("span");
	typeDiv.title = "ROUND_TIME";
	ButtonBox.appendChild(typeDiv);

	var caption = document.createElement("span");
	caption.style.verticalAlign = "middle";
	caption.innerHTML = "　　순회시간 ";
	caption.style.color = "#FFFFFF";
	typeDiv.appendChild(caption);

	var selectBox = document.createElement("select");
	selectBox.id = "dispMode";
	selectBox.addEventListener("change", 
		function() {
	        GM_setValue(HOST+PGNAME+"OPT_ROUND_TIME1" , document.getElementById("dispMode").value );
			OPT_ROUND_TIME1 = document.getElementById("dispMode").value
		}, true);
	typeDiv.appendChild(selectBox);

	var options = new Array(
		new Array("10sec" , LOAD_ROUND_TIME_10), 
		new Array("20sec" , LOAD_ROUND_TIME_20), 
		new Array("30sec" , LOAD_ROUND_TIME_30), 
		new Array("40sec" , LOAD_ROUND_TIME_40), 
		new Array("50sec" , LOAD_ROUND_TIME_50), 
		new Array("60sec" , LOAD_ROUND_TIME_60), 
		new Array("70sec" , LOAD_ROUND_TIME_70), 
		new Array("80sec" , LOAD_ROUND_TIME_80), 
		new Array("90sec" , LOAD_ROUND_TIME_90), 
		new Array("100sec", LOAD_ROUND_TIME_100),
		new Array("110sec", LOAD_ROUND_TIME_110),
		new Array("120sec", LOAD_ROUND_TIME_120),
		new Array("130sec", LOAD_ROUND_TIME_130),
		new Array("140sec", LOAD_ROUND_TIME_140),
		new Array("150sec", LOAD_ROUND_TIME_150),
		new Array("160sec", LOAD_ROUND_TIME_160),
		new Array("170sec", LOAD_ROUND_TIME_170),
		new Array("180sec", LOAD_ROUND_TIME_180)
	);
	for (var i = 0; i < options.length; i++) {
		var elem = document.createElement("option");
		elem.innerHTML = options[i][0];
		elem.value = options[i][1];
		selectBox.appendChild(elem);
	}
	selectBox.value = GM_getValue(HOST+PGNAME+"OPT_ROUND_TIME1", LOAD_ROUND_TIME_60);
	OPT_ROUND_TIME1 = GM_getValue(HOST+PGNAME+"OPT_ROUND_TIME1", LOAD_ROUND_TIME_60);

	// 2012.01.11 巡回時間に 1 ~ 10sec 追加
	OPT_ROUND_TIME1 = parseInt(OPT_ROUND_TIME1) + Math.floor( Math.random() * 10 );

	// 次回表示
	var nowTime = new Date();
	var nextTime = getNextTime(location.hostname, nowTime);
	if (nextTime != undefined) {
		var waitTimeStr = generateWaitTimeString(nextTime, nowTime);
		var nextTimeBox = document.createElement("div");
		nextTimeBox.style.color = "#90EE90";
		nextTimeBox.style.backgroundColor = "#000000";
		nextTimeBox.style.verticalAlign = "middle";
		nextTimeBox.innerHTML = "　빠른 거점 만료시간: " + generateDateString2(nextTime);
		nextTimeBox.innerHTML += " (남은시간 : " + waitTimeStr + ")";
		ABContainer.appendChild(nextTimeBox);
	}

	// ?換用시장表示
	var shoplist = cloadData(HOST+"ShopList","[]",true,true);
	if (shoplist.length != 0) {
		shoplist.sort( function(a,b) { if (a[1] < b[1]) return 1; if (a[1] > b[1]) return -1; return 0;});
		var villages = loadVillages(HOST+PGNAME);
		var nextIndex = -1;
		for(var i=0; i<villages.length;i++){
	    	if(shoplist[0].vId == villages[i][IDX_XY]){
	            nextIndex = i;
		        break;
		    }
		}
		if (nextIndex != -1) {
			var ShopBox = document.createElement("div");
			ShopBox.style.color = "#90EE90";
			ShopBox.style.backgroundColor = "#000000";
			ShopBox.style.verticalAlign = "middle";
			ShopBox.innerHTML = "　?換用시장 : " + villages[nextIndex][IDX_BASE_NAME] + "　" + villages[nextIndex][IDX_XY] + "　시장Lv : " + shoplist[0].lv;
			ABContainer.appendChild(ShopBox);
		}
	}
	//document.getElementById("dispMode" + types[i]).value;

	//거점설정링크の작성
	var tbl = d.createElement("table");
	tbl.style.border ="0px";
	//거점情報のロ?ド
	var villages = loadVillages(HOST+PGNAME);
	//거점情報が無い場合
	var firstboot = false;
	if (villages == "") { firstboot = true; }
	if (villages.length > 0) {
		if (villages[0][IDX_URL] == "") {
			firstboot = true;
		}
	}
	if(firstboot) {
		var tr = d.createElement("tr");
		var td = d.createElement("td");
		td.style.padding = "3px";
//		td.style.border = "solid 2px black";
		tr.style.fontFamily = "ＭＳ ゴシック";
		tr.appendChild(td);
		tbl.appendChild(tr);
		var msg = d.createElement("span");
		msg.style.fontSize = "15px";
		msg.style.margin = "3px";
		msg.style.color = "#FFFFFF";
		msg.style.font = 'bold 120% "ＭＳ ゴシック"';
		msg.innerHTML = "<br>" + 
                                "　　설치 감사합니다.<br>" + 
		                "　　먼저 프로필 화면을 열고<br>" +
		                "　　거점 정보를 얻으십시오.<br>　";
		td.appendChild(msg);
	} else {
	    var landElems = document.evaluate(
	    '//li[@class="on"]/span',
	    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < villages.length; i++) {
			var vname = villages[i][IDX_BASE_NAME];
		    var fColor = "#71C4F9";
			var tr = d.createElement("tr");
			var td = d.createElement("td");
			tr.style.fontFamily = "ＭＳ ゴシック";
			td.style.padding = "2px";
			td.style.border = "solid 1px black";
			td.style.backgroundColor = "#E6CF88";

			tr.appendChild(td);
			tbl.appendChild(tr);

			//各거점の설정?面링크
			var vname = villages[i][IDX_BASE_NAME];
			vId2 = villages[i][IDX_XY];

			var td00 = d.createElement("div");
			td00.style.width = "110px";

			var tdA = d.createElement("td");
			tdA.style.padding = "3px";
			ccreateCheckBox0(td00, "OPT_CHKBOX_AVC_"+i, loadAVCBox2(i), villages[i][IDX_BASE_NAME],"",0 ,villages);

			//거점一?項目
			var opfacLink = document.createElement("text");
			opfacLink.style.padding = "3px";
			td00.appendChild(opfacLink);

			var villageText = villages[i][IDX_BASE_NAME];
			if (villages[i][IDX_URL] != "") {
				villageText = "<a href=" + villages[i][IDX_URL] + 
				" style='color:#654634; text-decoration:none'>" + 
				villageText + "</a>";
			}
			opfacLink.innerHTML = villageText;
			opfacLink.style.textDecoration = "none";
			td.appendChild(td00);
			tr.appendChild(td);

			//?行中作業情報項目
			var actionsTd = document.createElement("td");
			actionsTd.style.backgroundColor = COLOR_BACK;
			actionsTd.style.border = "solid 1px black";
			actionsTd.style.padding = "3px";
			actionsTd.style.width = "330px";
			tr.appendChild(actionsTd);
			var actions = sortAction(villages[i][IDX_ACTIONS]);
			var nowTime = new Date();
			for (var j = 0; j < actions.length; j++) {
				var actionDiv = createActionDiv(actions[j], nowTime, villages[i][IDX_XY], location.hostname);
				if (!actionDiv) continue;
				// 完了?みフラグの체크
				actionDiv = createActionDiv(actions[j], nowTime, villages[i][IDX_XY], location.hostname);
				actionsTd.appendChild(actionDiv);
			}

			//설정ボタン
			var settingTd = document.createElement("td");
			settingTd.style.backgroundColor = "#E6CF88";
			settingTd.style.border = "solid 1px black";
			settingTd.style.padding = "3px";
			settingTd.style.width = "20px";
			tr.appendChild(settingTd);

			var btn = d.createElement("input");
			btn.style.padding = "1px";
			btn.type = "button";
			btn.value = "설정";
			btn.title = "설정?面を表示します";
			settingTd.appendChild(d.createTextNode(" "));
			settingTd.appendChild(btn);
			settingTd.appendChild(d.createTextNode(" "));
			settingTd.setAttribute('vId', villages[i][IDX_XY]);
			settingTd.addEventListener("click", function() {
				var vId = this.getAttribute('vId');
				openInifacBox(vId);
			}, true);
		}
		saveVillages(HOST+PGNAME, villages);
	}


	//거점작성?況の表示 2012.04.09
	var tbl2 = d.createElement("table");
	tbl2.style.border ="0px";
	var lists = cloadData(HOST+"ReserveList", "[]", true, true);
	for(var i=0 ; i<lists.length ; i++) {
		var vId = "(" + lists[i].x + "," + lists[i].y + ")";

		var tr = d.createElement("tr");
		var td = d.createElement("td");
		tr.style.fontFamily = "ＭＳ ゴシック";

		tbl2.appendChild(tr);

		var td00 = d.createElement("div");

		td.appendChild(td00);
		tr.appendChild(td);

		var actionsTd = document.createElement("td");
		actionsTd.style.backgroundColor = COLOR_BACK;
		actionsTd.style.border = "solid 1px black";
		actionsTd.style.padding = "3px";
		actionsTd.style.width = "445px";

		tr.appendChild(actionsTd);

		var actionDiv = document.createElement("text");
		actionDiv.style.padding = "3px";

		actionDiv.innerHTML = "座標" + vId + " に ";
			  if(lists[i].kind == 220){	actionDiv.innerHTML += "「마을」";
		}else if(lists[i].kind == 222){	actionDiv.innerHTML += "「요새」";
		}
		      if(lists[i].status == 0){actionDiv.innerHTML += "작성失敗";
		}else if(lists[i].status == 1){actionDiv.innerHTML += "작성予約";
		}else if(lists[i].status == 2){actionDiv.innerHTML += "작성中";
		}else if(lists[i].status == 3){actionDiv.innerHTML += "작성完了";
		}else if(lists[i].status == 4){actionDiv.innerHTML += "破棄中";  
		}else if(lists[i].status == 5){actionDiv.innerHTML += "破棄完了";
		}
		if(lists[i].status == 2 || lists[i].status == 4){
			actionDiv.innerHTML += " (" + lists[i].time + " 完了予定)";
		}

		var delTd = document.createElement("td");
		delTd.style.backgroundColor = "#E6CF88";
		delTd.style.border = "solid 1px black";
		delTd.style.padding = "3px";
		delTd.style.width = "34px";
		tr.appendChild(delTd);

		if(lists[i].status == 1 || lists[i].status == 0){
			var btn = d.createElement("input");
			btn.style.padding = "1px";
			btn.type = "button";
			btn.value = "取消";
			btn.title = "予約を取消します";
			delTd.appendChild(d.createTextNode(" "));
			delTd.appendChild(btn);
			delTd.appendChild(d.createTextNode(" "));
			delTd.setAttribute('x', lists[i].x);
			delTd.setAttribute('y', lists[i].y);
			delTd.addEventListener("click", function() {
				var x = this.getAttribute('x');
				var y = this.getAttribute('y');
				delList(x, y)
			}, true); //delListへ
		}
		else if(lists[i].status == 3 || lists[i].status == 5){
			var btn = d.createElement("input");
			btn.style.padding = "1px";
			btn.type = "button";
			btn.value = "確認";
			btn.title = "確認?にして삭제します";
			delTd.appendChild(d.createTextNode(" "));
			delTd.appendChild(btn);
			delTd.appendChild(d.createTextNode(" "));
			delTd.setAttribute('x', lists[i].x);
			delTd.setAttribute('y', lists[i].y);
			delTd.addEventListener("click", function() {
				var x = this.getAttribute('x');
				var y = this.getAttribute('y');
				delList(x, y)
			}, true); //delListへ

		}
		tr.appendChild(delTd);
		actionsTd.appendChild(actionDiv);
	}

	ABContainer.appendChild(tbl);
	ABContainer.appendChild(tbl2);

	function delList(x, y)
	{
		var lists = cloadData(HOST+"ReserveList", "[]", true, true);
		for(var i=0 ; i<lists.length ; i++) {
			if(lists[i].x == x && lists[i].y == y ) {
				lists.splice(i,1);
				csaveData(HOST+"ReserveList", lists, true, true );

				//更新後?容で表示
				closeIniBilderBox()
				openIniBilderBox()

				break;
			}
		}
	}
}

// 거점巡回??
function loadAVCBox(){
	OPT_CHKBOX_AVC = parseInt(GM_getValue(HOST+PGNAME+"AVC", ""));
}

function loadAVCBox2(tVID){
	//OPT_CHKBOX_AVC = parseInt(GM_getValue(HOST+PGNAME+"AVC"+"_"+tVID, ""));
	OPT_CHKBOX_AVC = GM_getValue(HOST+PGNAME+"OPT_CHKBOX_AVC_" + tVID, true);
	return OPT_CHKBOX_AVC;
}

// @@@@ add 2011.09.07 @@@@
function loadRoundTime() {
	OPT_ROUND_TIME1 = GM_getValue(HOST+PGNAME+"OPT_ROUND_TIME1", 60);
	return OPT_ROUND_TIME1;
}

//?値を3ケタ?切りにする??
function SetPrice(price){
　var num = new String(price).replace(/,/g, "");
　while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
　return num;
}

// 거점巡回保存
function saveAVCBox(){
	OPT_CHKBOX_AVC = cgetCheckBoxValue($("OPT_CHKBOX_AVC"));
	GM_setValue(HOST+PGNAME+"AVC", OPT_CHKBOX_AVC);
}
function saveAVCBox2(tVID,flg){
	//OPT_CHKBOX_AVC = cgetCheckBoxValue($("OPT_CHKBOX_AVC"));
	//GM_setValue(HOST+PGNAME+"AVC", OPT_CHKBOX_AVC);
	GM_setValue(HOST+PGNAME+"AVC"+"_"+tVID, flg);
	
	//var tid=unsafeWindow.setTimeout(function(){location.reload();},INTERVAL);
	tidMain=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
}

//施設건설必要資源??
function loadFacility(){
}

//施設건설必要資源保存
function saveFacility(f){
}

//ステイタス取得HTML追加
function addInifacHtml(vId) {

// add 2011.09.27 설정?面移動 @@@@
	var popupLeft = GM_getValue(location.hostname+PGNAME+"_popup_left2", 10);
	var popupTop = GM_getValue(location.hostname+PGNAME+"_popup_top2", 10);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;

// end

	
	//表示コンテナ작성
	var ABfacContainer = d.createElement("div");
	ABfacContainer.id = "ABfacContainer";
	ABfacContainer.style.position = "absolute";
	ABfacContainer.style.color = COLOR_BASE;
	ABfacContainer.style.backgroundColor = COLOR_FRAME;
	ABfacContainer.style.opacity= 1.0;
	ABfacContainer.style.border = "solid 2px black";
	ABfacContainer.style.left = popupLeft + "px";
	ABfacContainer.style.top = popupTop + "px";
	ABfacContainer.style.fontSize = "10px";
	ABfacContainer.style.fontFamily = "ＭＳ ゴシック";
	ABfacContainer.style.padding = "2px";
	ABfacContainer.style.MozBorderRadius = "4px";
	ABfacContainer.style.zIndex = 999;

	ABfacContainer.setAttribute('vId', vId);
	d.body.appendChild(ABfacContainer);

    $e(ABfacContainer, "mousedown", function(event){
                if( event.target != $("ABfacContainer")) {return false;}
                g_MD="ABfacContainer";
                g_MX=event.pageX-parseInt(this.style.left,10);
                g_MY=event.pageY-parseInt(this.style.top,10);
                event.preventDefault();});
    $e(d, "mousemove", function(event){
                if(g_MD != "ABfacContainer") return true;
                var ABfacContainer = $("ABfacContainer");
                if( !ABfacContainer ) return true;
                var popupLeft = event.pageX - g_MX;
                var popupTop  = event.pageY - g_MY;
                ABfacContainer.style.left = popupLeft + "px";
                ABfacContainer.style.top = popupTop + "px";
				//ポップアップ位置を永?保存
				GM_setValue(location.hostname+PGNAME+"_popup_left2", popupLeft);
				GM_setValue(location.hostname+PGNAME+"_popup_top2", popupTop);
                });
    $e(d, "mouseup", function(event){g_MD="";});

	// ===== 作業거점名 =====
	var BaseName  = d.createElement("span");
		BaseName.style.border ="solid 0px red";
		BaseName.style.padding = "3px";
		BaseName.style.font = "bold 120% 'ＭＳ ゴシック'";
		BaseName.style.color = "#71C4F9";

	var villages = loadVillages(HOST+PGNAME);
	for (var i = 0; i < villages.length; i++) {
		//表示中の설정?象거점名の表示
		if(vId == villages[i][IDX_XY]){
			BaseName.innerHTML = villages[i][IDX_BASE_NAME];
		}
	}
	Load_OPT(vId);
	ABfacContainer.appendChild(BaseName);

	// ===== 건설설정 =====
	var Build_Box = d.createElement("table");
		Build_Box.style.border ="solid 2px black";
		Build_Box.style.margin = "0px 4px 4px 0px";
		Build_Box.style.width = "100%";

	var tr11 = d.createElement("tr");
		tr11.style.backgroundColor = COLOR_TITLE;
		tr11.style.border ="solid 1px black";

	var td11 = d.createElement("td");
		td11.style.padding = "1px";
		td11.colSpan = "3";
		td11.appendChild( createRadioBtn ( 'AC', '자동건설' ) );

	var tr111 = d.createElement("tr");
		tr111.style.backgroundColor = COLOR_BACK;
		tr111.style.border ="solid 1px black";

	var td111 = d.createElement("td");
		td111.style.padding = "3px";
		td111.style.verticalAlign = "top";

	var td112 = d.createElement("td");
		td112.style.padding = "3px";
		td112.style.verticalAlign = "top";

	var td113 = d.createElement("td");
		td113.style.padding = "3px";
		td113.style.verticalAlign = "top";

	var tr30 = d.createElement("tr");
		tr30.style.backgroundColor = COLOR_BACK;

	var td31 = d.createElement("td");
		td31.colSpan = "3";
		td31.style.padding = "3px";

	Build_Box.appendChild(tr11);
	tr11.appendChild(td11);

	Build_Box.appendChild(tr111);
	tr111.appendChild(td111);
	tr111.appendChild(td112);
	tr111.appendChild(td113);

	Build_Box.appendChild(tr30);
	tr30.appendChild(td31);

//	ABfacContainer.appendChild(Build_Box);

	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  0, " 거점 　　　","자동으로 성, 마을, 요새 레벨업 하시려면 체크하십시오",0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  6, " 동작대 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
    ccreateText(td111, "Dummy" , "　", 0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  1, " 벌채소 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  2, " 채석장 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  3, " 제철소 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  4, " 밭 　　　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  5, " 창고 　　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
    ccreateText(td111, "Dummy" , "　", 0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  7, " 대장간 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td111, "OPT_CHKBOX",  8, " 방어구공장 ","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);

	ccreateCheckBoxKai2(td112, "OPT_CHKBOX",  9, " 창병사 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 10, " 연병소 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 11, " 궁병사 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 12, " 기병사 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 14, " 무기공장 　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
    ccreateText(td112, "Dummy" , "　", 0);
	ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 13, " 숙사 　　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 20, " 대숙사 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
    ccreateText(td112, "Dummy" , "　", 0);
	ccreateCheckBoxKai2(td112, "OPT_CHKBOX", 15, " 시장 　　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);

	ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 16, " 훈련소 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 21, " 원정훈련소 ","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
    ccreateText(td113, "Dummy" , "　", 0);
	ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 17, " 수차 　　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 18, " 공장 　　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
    ccreateText(td113, "Dummy" , "　", 0);
	ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 19, " 연구소 　　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);
	ccreateCheckBoxKai2(td113, "OPT_CHKBOX", 22, " 감시탑　 　","자동으로 Lv업을 할려는 건축물에 체크를하십시오.",0);

	ccreateButton(td31, "원정훈련소"  , "원정훈련소 짓기위한 거점개발 자동설정",       function() {InitMilitaryHome()},85);
	ccreateButton(td31, "식량거점화"  , "식량거점 개발을 위한 자동설정", 	 function() {InitRiceParadise()});
	ccreateButton(td31, "자원거점화"  , "자원거점 개발을 위한 자동설정", function() {InitResVillage()});
	ccreateButton(td31, "군사거점화"  , "군사거점 개발을 위한 자동설정", function() {InitMilitarySite()});
	ccreateButton(td31, "초기화", "최초상태로 돌려주는 자동설정", function() {clearInifacBox()});

	// ===== 내정설정 =====
	var Domestic_Box = d.createElement("table");
		Domestic_Box.style.border = "solid 2px black";
		Domestic_Box.style.margin = "0px 4px 4px 0px";
		Domestic_Box.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");
		td1.colSpan = 5;
//		td1.style.padding = "2px";
		td1.style.backgroundColor = COLOR_TITLE;
		ccreateText(td1, "dummy", "■ 자동내정설정", 0 );

	var tr2 = d.createElement("tr");
		tr2.style.backgroundColor = COLOR_BACK;
		tr2.style.border = "solid 1px black";

	var td21 = d.createElement("td");
		td21.style.padding = "3px";
		td21.style.verticalAlign = "top";

	var td22 = d.createElement("td");
		td22.style.padding = "3px";
		td22.style.verticalAlign = "top";

	var td23 = d.createElement("td");
		td23.style.padding = "3px";
		td23.style.verticalAlign = "top";

	var td24 = d.createElement("td");
		td24.style.padding = "3px";
		td24.style.verticalAlign = "top";

	var td25 = d.createElement("td");
		td25.style.padding = "3px";
		td25.style.verticalAlign = "top";

	Domestic_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Domestic_Box.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);

//	ABfacContainer.appendChild(Domestic_Box);

	ccreateCheckBox(td21, "OPT_DOME1" , OPT_DOME[1] , " " + DASkill[1]  + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[1]  + "）を?動します。", 0);
	ccreateCheckBox(td22, "OPT_DOME2" , OPT_DOME[2] , " " + DASkill[2]  + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[2]  + "）を?動します。", 0);
	ccreateCheckBox(td23, "OPT_DOME16", OPT_DOME[16], " " + DASkill[16] + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[16]  + "）を?動します。", 0);
	ccreateCheckBox(td24, "OPT_DOME12", OPT_DOME[12], " " + DASkill[12] + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[12] + "）を?動します。", 0);
	ccreateCheckBox(td25, "OPT_DOME13", OPT_DOME[13], " " + DASkill[13] + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[13] + "）を?動します。", 0);

	ccreateCheckBox(td21, "OPT_DOME4" , OPT_DOME[4] , " " + DASkill[4]  + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[4]  + "）を?動します。", 0);
	ccreateCheckBox(td22, "OPT_DOME5" , OPT_DOME[5] , " " + DASkill[5]  + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[5]  + "）を?動します。", 0);
	ccreateCheckBox(td23, "OPT_DOME17", OPT_DOME[17], " " + DASkill[17] + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[17]  + "）を?動します。", 0);
	ccreateCheckBox(td24, "OPT_DOME14", OPT_DOME[14], " " + DASkill[14] + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[14] + "）を?動します。", 0);
	ccreateCheckBox(td25, "OPT_DOME15", OPT_DOME[15], " " + DASkill[15] + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[15] + "）を?動します。", 0);

	ccreateCheckBox(td21, "OPT_DOME7" , OPT_DOME[7] , " " + DASkill[7]  + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[7]  + "）を?動します。", 0);
	ccreateCheckBox(td22, "OPT_DOME8" , OPT_DOME[8] , " " + DASkill[8]  + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[8]  + "）を?動します。", 0);
	ccreateCheckBox(td23, "OPT_DOME18", OPT_DOME[18], " " + DASkill[18] + "　", "この都市に?たら、자동的に내정スキル（" + DASkill[18]  + "）を?動します。", 0);
	ccreateCheckBox(td24, "OPT_DOME19", OPT_DOME[19], " " + DASkill[19], "この都市に?たら、자동的に내정スキル（" + DASkill[19] + "）を?動します。", 0);
	ccreateCheckBox(td25, "OPT_DOME20", OPT_DOME[20], " " + DASkill[20], "この都市に?たら、자동的に내정スキル（" + DASkill[20] + "）を?動します。", 0);

	ccreateCheckBox(td21, "OPT_DOME10", OPT_DOME[10], " " + DASkill[10], "この都市に?たら、자동的に내정スキル（" + DASkill[10]  + "）を?動します。", 0);
	ccreateCheckBox(td22, "OPT_DOME11", OPT_DOME[11], " " + DASkill[11], "この都市に?たら、자동的に내정スキル（" + DASkill[11] + "）を?動します。", 0);
		ccreateText(td23, "Dummy" , "　", 0);
		ccreateText(td24, "Dummy" , "　", 0);
		ccreateText(td25, "Dummy" , "　", 0);

	ccreateCheckBox(td21, "OPT_DOME25", OPT_DOME[25], " " + DASkill[25], "この都市に?たら、자동的に내정スキル（" + DASkill[25]  + "）を?動します。", 0);
	ccreateCheckBox(td22, "OPT_DOME27", OPT_DOME[27], " " + DASkill[27], "この都市に?たら、자동的に내정スキル（" + DASkill[27]  + "）を?動します。", 0);
	ccreateCheckBox(td23, "OPT_DOME29", OPT_DOME[29], " " + DASkill[29], "この都市に?たら、자동的に내정スキル（" + DASkill[29]  + "）を?動します。", 0);
	ccreateCheckBox(td24, "OPT_DOME31", OPT_DOME[31], " " + DASkill[31], "この都市に?たら、자동的に내정スキル（" + DASkill[31]  + "）を?動します。", 0);
	ccreateCheckBox(td25, "OPT_DOME33", OPT_DOME[33], " " + DASkill[33], "この都市に?たら、자동的に내정スキル（" + DASkill[33]  + "）を?動します。", 0);

	ccreateCheckBox(td21, "OPT_DOME26", OPT_DOME[26], " " + DASkill[26], "この都市に?たら、자동的に내정スキル（" + DASkill[26]  + "）を?動します。", 0);
	ccreateCheckBox(td22, "OPT_DOME28", OPT_DOME[28], " " + DASkill[28], "この都市に?たら、자동的に내정スキル（" + DASkill[28]  + "）を?動します。", 0);
	ccreateCheckBox(td23, "OPT_DOME30", OPT_DOME[30], " " + DASkill[30], "この都市に?たら、자동的に내정スキル（" + DASkill[30]  + "）を?動します。", 0);
	ccreateCheckBox(td24, "OPT_DOME32", OPT_DOME[32], " " + DASkill[32], "この都市に?たら、자동的に내정スキル（" + DASkill[32]  + "）を?動します。", 0);
	ccreateCheckBox(td25, "OPT_DOME34", OPT_DOME[34], " " + DASkill[34], "この都市に?たら、자동的に내정スキル（" + DASkill[34]  + "）を?動します。", 0);

		ccreateText(td21, "Dummy" , "　", 0);
	ccreateCheckBox(td22, "OPT_DOME3",  OPT_DOME[3],  " " + DASkill[3], "この都市に?たら、자동的に내정スキル（" + DASkill[3]  + "）を?動します。", 0);
	ccreateCheckBox(td23, "OPT_DOME6",  OPT_DOME[6],  " " + DASkill[6], "この都市に?たら、자동的に내정スキル（" + DASkill[6]  + "）を?動します。", 0);
	ccreateCheckBox(td24, "OPT_DOME9",  OPT_DOME[9],  " " + DASkill[9], "この都市に?たら、자동的に내정スキル（" + DASkill[9]  + "）を?動します。", 0);
		ccreateText(td25, "Dummy" , "　", 0);

	ccreateCheckBox(td21, "OPT_DOME21", OPT_DOME[21], " " + DASkill[21], "この都市に?たら、자동的に내정スキル（" + DASkill[21]  + "）を?動します。", 0);
	ccreateCheckBox(td22, "OPT_DOME22", OPT_DOME[22], " " + DASkill[22], "この都市に?たら、자동的に내정スキル（" + DASkill[22]  + "）を?動します。", 0);
	ccreateCheckBox(td23, "OPT_DOME23", OPT_DOME[23], " " + DASkill[23], "この都市に?たら、자동的に내정スキル（" + DASkill[23]  + "）を?動します。", 0);
	ccreateCheckBox(td24, "OPT_DOME24", OPT_DOME[24], " " + DASkill[24], "この都市に?たら、자동的に내정スキル（" + DASkill[24]  + "）を?動します。", 0);
		ccreateText(td25, "Dummy" , "　", 0);

	// ===== 糧?換설정 =====

	var Market_Box = d.createElement("table");
		Market_Box.style.border ="solid 2px black";
		Market_Box.style.fontFamily = "ＭＳ ゴシック";
		Market_Box.style.margin = "0px 4px 4px 0px";
		Market_Box.style.width = "100%";

	var tr30 = d.createElement("tr");
		tr30.style.backgroundColor = COLOR_TITLE;

	var td30 = d.createElement("td");
		td30.colSpan = 2;
		ccreateCheckBox(td30, "OPT_ICHIBA", OPT_ICHIBA, " 시장자동?換", "この都市で糧の시장자동?換をします。", 0);

	var tr311 = d.createElement("tr");
		tr311.style.border = "solid 1px black";
		tr311.style.backgroundColor = COLOR_BACK;

	var td311 = d.createElement("td");
		td311.style.padding = "3px";
		td311.style.verticalAlign = "top";

	var td312 = d.createElement("td");
		td312.style.padding = "3px";
		td312.style.verticalAlign = "top";

	Market_Box.appendChild(tr30);
	tr30.appendChild(td30);
	Market_Box.appendChild(tr311);
	tr311.appendChild(td311);
	tr311.appendChild(td312);

//	ABfacContainer.appendChild(Market_Box);

	ccreateTextBox(td311, "OPT_RISE_MAX",		OPT_RISE_MAX,										"糧の자동?換開始量　",	"자동で糧を他の資源に?換し始める量指定します。", 10, 5);
	ccreateTextBox(td311, "OPT_TO_WOOD",		OPT_TO_WOOD,										"木に?換する糧の量　",	"자동で木に?換する糧の量を指定します。", 10, 5);
	ccreateTextBox(td311, "OPT_TO_STONE",		OPT_TO_STONE,										"石に?換する糧の量　",	"자동で石に?換する糧の量を指定します。", 10, 5);
	ccreateTextBox(td311, "OPT_TO_IRON",		OPT_TO_IRON,										"?に?換する糧の量　",	"자동で?に?換する糧の量を指定します。", 10, 5);

	ccreateComboBox(td312, "OPT_ICHIBA_PA",	OPT_ICHIBA_PATS, OPT_ICHIBA_PA,	"?換パタ?ン　　",				"平均?換：糧が一定量になった際に?換指定している一番少ない資源を?換します。   一括?換：糧が一定量になった際に指定してある資源を指定値?換します。",5);
	ccreateTextBox(td312, "OPT_MAX_WOOD",	OPT_MAX_WOOD,											"木の最大保持量　",	"木の最大保持量を설정します（0で창고上限まで）", 10, 5);
	ccreateTextBox(td312, "OPT_MAX_STONE",	OPT_MAX_STONE,									"石の最大保持量　",	"石の最大保持量を설정します（0で창고上限まで）", 10, 5);
	ccreateTextBox(td312, "OPT_MAX_IRON",	OPT_MAX_IRON,											"?の最大保持量　",	"?の最大保持量を설정します（0で창고上限まで）", 10, 5);

	// ===== 기부설정 =====

	var Contribution_Box = d.createElement("table");
		Contribution_Box.style.margin = "0px 4px 4px 0px";
		Contribution_Box.style.border ="solid 2px black";
		Contribution_Box.style.fontFamily = "ＭＳ ゴシック";
		Contribution_Box.style.width = "100%";

	var tr400 = d.createElement("tr");
		tr400.style.border = "solid 1px black";
		tr400.style.backgroundColor =COLOR_TITLE;

	var td401 = d.createElement("td");
//		td401.style.padding = "2px";
		ccreateCheckBox(td401, "OPT_KIFU", OPT_KIFU, " 자동기부", "この都市に?たら、자동的に기부します。", 0);

	var tr411 = d.createElement("tr");
		tr411.style.border = "solid 1px black";
		tr411.style.backgroundColor =COLOR_BACK;

	var td411 = d.createElement("td");
		td411.style.padding = "3px";
		td411.style.verticalAlign = "top";
		ccreateTextBox(td411, "OPT_RISE_KIFU_MAX", OPT_RISE_KIFU_MAX, "糧が右の?量になったら기부する　","자동で糧を기부し始める量指定します。", 10, 5);
		ccreateTextBox(td411, "OPT_RISE_KIFU", OPT_RISE_KIFU,         "자동で糧を기부する量　　　　　　","자동で糧を기부する量指定します。", 10, 5);

	Contribution_Box.appendChild(tr400);
	tr400.appendChild(td401);
	Contribution_Box.appendChild(tr411);
	tr411.appendChild(td411);

	// ===== 숙사ビルド＆スクラップ설정 =====

	var Scrap_Box = d.createElement("table");
		Scrap_Box.style.margin = "0px 4px 4px 0px";
		Scrap_Box.style.border ="solid 2px black";
		Scrap_Box.style.fontFamily = "ＭＳ ゴシック";
		Scrap_Box.style.width = "100%";

	var tr510 = d.createElement("tr");
		tr510.style.border = "solid 1px black";
		tr510.style.backgroundColor =COLOR_TITLE;

	var td510 = d.createElement("td");
		td510.style.padding = "1px";
		td510.appendChild( createRadioBtn ( 'BS', '숙사ビルスク' ) );

	var tr511 = d.createElement("tr");
		tr511.style.border = "solid 1px black";
		tr511.style.backgroundColor =COLOR_BACK;

	var td511 = d.createElement("td");
		td511.style.padding = "3px";
		td511.style.verticalAlign = "top";

		td511.appendChild( createRadioBtn2 ( 'DD', ' 숙사?象　' ) );
		td511.appendChild( createRadioBtn2 ( 'HH', ' 밭?象　　' ) );
		ccreateTextBox(td511, "OPT_MAX", OPT_MAX,	  "?象施設?　",	"자동で건축/破棄する施設の?。", 5, 3);
		ccreateTextBox(td511, "OPT_MAXLV", OPT_MAXLV, "?象施設LV　",	"자동で건축/破棄する施設の最大LV。", 5, 3);

	Scrap_Box.appendChild(tr510);
	tr510.appendChild(td510);
	Scrap_Box.appendChild(tr511);
	tr511.appendChild(td511);

	// ===== 糧마을化 ===

	var Field_Box = d.createElement("table");
		Field_Box.style.margin = "0px 4px 4px 0px";
		Field_Box.style.border ="solid 2px black";
		Field_Box.style.fontFamily = "ＭＳ ゴシック";
		Field_Box.style.width = "100%";

	var tr600 = d.createElement("tr");
		tr600.style.border = "solid 1px black";
		tr600.style.backgroundColor =COLOR_TITLE;

	var td600 = d.createElement("td");
//		td600.style.padding = "2px";
		ccreateCheckBox(td600,"OPT_KATEMURA", OPT_KATEMURA, " 糧마을化", "この都市を糧마을にする。평지に밭?창고?동작대を建てる。",0);

	var tr611 = d.createElement("td");
		tr611.style.border = "solid 1px black";
		tr611.style.backgroundColor =COLOR_BACK;

	var td611 = d.createElement("td");
		td611.style.padding = "3px";
		td611.style.verticalAlign = "top";
		ccreateTextBox(td611,"OPT_SOUKO_MAX", OPT_SOUKO_MAX,"設置する창고の?　","設置する창고の?を指定してください。",4,0);

	Field_Box.appendChild(tr600);
	tr600.appendChild(td600);
	Field_Box.appendChild(tr611);
	tr611.appendChild(td611);

	// ==== 자동兵産설정 ====

	var Soldier_Box = d.createElement("table");
		Soldier_Box.style.border ="solid 2px black";
		Soldier_Box.style.marginBottom = "4px";
		Soldier_Box.style.width = "100%";

	var tr800 = d.createElement("tr");
		tr800.style.border = "solid 1px black";
		tr800.style.backgroundColor =COLOR_TITLE;

	var td800 = d.createElement("td");
		ccreateCheckBox(td800, "OPT_BLD_SOL", OPT_BLD_SOL, " 자동造兵", "この都市で자동的に造兵します。", 0);

	var tr81 = d.createElement("tr");
		tr81.style.fontFamily = "ＭＳ ゴシック";
		tr81.style.border = "solid 1px black";
		tr81.style.backgroundColor =COLOR_BACK;
	var td81 = d.createElement("td");
		td81.style.padding = "3px";//		td81.style.border = "solid 1px black";

	var tr811 = d.createElement("tr");
	var td811 = d.createElement("td");		td811.style.padding = "3px";	td811.style.verticalAlign = "bottom";
	var td812 = d.createElement("td");		td812.style.padding = "3px";	td812.style.verticalAlign = "top"; td812.style.textAlign = "center";
	var td813 = d.createElement("td");		td813.style.padding = "3px";	td813.style.verticalAlign = "top"; td813.style.textAlign = "center";
	var td814 = d.createElement("td");		td814.style.padding = "3px";	td814.style.verticalAlign = "top"; td814.style.textAlign = "center";
	var td815 = d.createElement("td");		td815.style.padding = "3px";	td815.style.verticalAlign = "top"; td815.style.textAlign = "center";
	var td816 = d.createElement("td");		td816.style.padding = "3px";	td816.style.verticalAlign = "top"; td816.style.textAlign = "center";
	var td817 = d.createElement("td");		td817.style.padding = "3px";	td817.style.verticalAlign = "top"; td817.style.textAlign = "center";
	var td818 = d.createElement("td");		td818.style.padding = "3px";	td818.style.verticalAlign = "top"; td818.style.textAlign = "center";
	var td819 = d.createElement("td");		td819.style.padding = "3px";	td819.style.verticalAlign = "top"; td819.style.textAlign = "center";
	var td820 = d.createElement("td");		td820.style.padding = "3px";	td820.style.verticalAlign = "top"; td820.style.textAlign = "center";
	var td821 = d.createElement("td");		td821.style.padding = "3px";	td821.style.verticalAlign = "top"; td821.style.textAlign = "center";
	var td822 = d.createElement("td");		td822.style.padding = "3px";	td822.style.verticalAlign = "top"; td822.style.textAlign = "center";

	var td823 = d.createElement("td");		td823.style.padding = "3px";	td823.style.verticalAlign = "bottom";

	Soldier_Box.appendChild(tr800);
		tr800.appendChild(td800);

	Soldier_Box.appendChild(tr81);
		tr81.appendChild(td81);
		td81.appendChild(tr811);

		tr811.appendChild(td811);
		tr811.appendChild(td812);
		tr811.appendChild(td813);
		tr811.appendChild(td814);
		tr811.appendChild(td815);
		tr811.appendChild(td816);
		tr811.appendChild(td817);
		tr811.appendChild(td818);
		tr811.appendChild(td819);
		tr811.appendChild(td820);
		tr811.appendChild(td821);
		tr811.appendChild(td822);
		tr811.appendChild(td823);

//	ABfacContainer.appendChild(Soldier_Box);

	ccreateText(td812, "dummy", "검병", 0 );
	ccreateText(td813, "dummy", "창병", 0 );
	ccreateText(td814, "dummy", "궁병", 0 );
	ccreateText(td815, "dummy", "기병", 0 );
	ccreateText(td816, "dummy", "모창병", 0 );
	ccreateText(td817, "dummy", "노병", 0 );
	ccreateText(td818, "dummy", "근위기병", 0 );
	ccreateText(td819, "dummy", "척후", 0 );
	ccreateText(td820, "dummy", "척후기병", 0 );
	ccreateText(td821, "dummy", "충차", 0 );
	ccreateText(td822, "dummy", "투석기", 0 );
	ccreateText(td823, "dummy", "　", 0 );

	ccreateText(td811, "dummy", "　", 0 );
	ccreateText(td811, "dummy", "　兵?上限", 0 );
	ccreateText(td811, "dummy", "　작성?位", 0 );

	ccreateTextBox(td812,"OPT_SOL_MAX1", OPT_SOL_MAX[1],"","검병の兵?上限",8,0);
	ccreateTextBox(td813,"OPT_SOL_MAX3", OPT_SOL_MAX[3],"","창병の兵?上限",8,0);
	ccreateTextBox(td814,"OPT_SOL_MAX8", OPT_SOL_MAX[8],"","궁병の兵?上限",8,0);
	ccreateTextBox(td815,"OPT_SOL_MAX5", OPT_SOL_MAX[5],"","기병の兵?上限",8,0);
	ccreateTextBox(td816,"OPT_SOL_MAX4", OPT_SOL_MAX[4],"","모창병の兵?上限",8,0);
	ccreateTextBox(td817,"OPT_SOL_MAX9", OPT_SOL_MAX[9],"","노병の兵?上限",8,0);
	ccreateTextBox(td818,"OPT_SOL_MAX7", OPT_SOL_MAX[7],"","근위기병の兵?上限",8,0);
	ccreateTextBox(td819,"OPT_SOL_MAX10", OPT_SOL_MAX[10],"","척후の兵?上限",8,0);
	ccreateTextBox(td820,"OPT_SOL_MAX11", OPT_SOL_MAX[11],"","척후기병の兵?上限",8,0);
	ccreateTextBox(td821,"OPT_SOL_MAX12", OPT_SOL_MAX[12],"","충차の兵?上限",8,0);
	ccreateTextBox(td822,"OPT_SOL_MAX13", OPT_SOL_MAX[13],"","투석기の兵?上限",8,0);

	ccreateTextBox(td812,"OPT_SOL_ADD1", OPT_SOL_ADD[1],"","검병の작성?位",8,0);
	ccreateTextBox(td813,"OPT_SOL_ADD3", OPT_SOL_ADD[3],"","창병の작성?位",8,0);
	ccreateTextBox(td814,"OPT_SOL_ADD8", OPT_SOL_ADD[8],"","궁병の작성?位",8,0);
	ccreateTextBox(td815,"OPT_SOL_ADD5", OPT_SOL_ADD[5],"","기병の작성?位",8,0);
	ccreateTextBox(td816,"OPT_SOL_ADD4", OPT_SOL_ADD[4],"","모창병の작성?位",8,0);
	ccreateTextBox(td817,"OPT_SOL_ADD9", OPT_SOL_ADD[9],"","노병の작성?位",8,0);
	ccreateTextBox(td818,"OPT_SOL_ADD7", OPT_SOL_ADD[7],"","근위기병の작성?位",8,0);
	ccreateTextBox(td819,"OPT_SOL_ADD10", OPT_SOL_ADD[10],"","척후の작성?位",8,0);
	ccreateTextBox(td820,"OPT_SOL_ADD11", OPT_SOL_ADD[11],"","척후기병の작성?位",8,0);
	ccreateTextBox(td821,"OPT_SOL_ADD12", OPT_SOL_ADD[12],"","충차の작성?位",8,0);
	ccreateTextBox(td822,"OPT_SOL_ADD13", OPT_SOL_ADD[13],"","투석기の작성?位",8,0);

	ccreateButton(td823, "작성中止", "兵士の작성?位を初期化します。", function() {clearInitSoldier()});


	// ===== 자동 武器?防具?化 ====

	var Blacksmith_Box = d.createElement("table");
		Blacksmith_Box.style.border ="solid 2px black";
		Blacksmith_Box.style.marginBottom = "4px";
		Blacksmith_Box.style.width = "100%";

	var tr900 = d.createElement("tr");
		tr900.style.border = "solid 1px black";
		tr900.style.backgroundColor =COLOR_TITLE;

	var td900 = d.createElement("td");
		ccreateCheckBox(td900, "OPT_BKBG_CHK", OPT_BKBG_CHK, " 자동武器?防具?化", "この都市で자동的に武器?防具の?化をします。", 0);

	var tr91 = d.createElement("tr");
		tr91.style.fontFamily = "ＭＳ ゴシック";
		tr91.style.border = "solid 1px black";
		tr91.style.backgroundColor =COLOR_BACK;
	var td91 = d.createElement("td");
		td91.style.padding = "3px";

	var tr911 = d.createElement("tr");
	var td911 = d.createElement("td");		td911.style.padding = "3px";		td911.style.verticalAlign = "bottom";
	var td912 = d.createElement("td");		td912.style.padding = "3px";		td912.style.verticalAlign = "top";	td912.style.textAlign = "center";
	var td913 = d.createElement("td");		td913.style.padding = "3px";		td913.style.verticalAlign = "top";	td913.style.textAlign = "center";
	var td914 = d.createElement("td");		td914.style.padding = "3px";		td914.style.verticalAlign = "top";	td914.style.textAlign = "center";
	var td915 = d.createElement("td");		td915.style.padding = "3px";		td915.style.verticalAlign = "top";	td915.style.textAlign = "center";
	var td916 = d.createElement("td");		td916.style.padding = "3px";		td916.style.verticalAlign = "top";	td916.style.textAlign = "center";
	var td917 = d.createElement("td");		td917.style.padding = "3px";		td917.style.verticalAlign = "top";	td917.style.textAlign = "center";
	var td918 = d.createElement("td");		td918.style.padding = "3px";		td918.style.verticalAlign = "top";	td918.style.textAlign = "center";
	var td919 = d.createElement("td");		td919.style.padding = "3px";		td919.style.verticalAlign = "top";	td919.style.textAlign = "center";
	var td920 = d.createElement("td");		td920.style.padding = "3px";		td920.style.verticalAlign = "top";	td920.style.textAlign = "center";
	var td921 = d.createElement("td");		td921.style.padding = "3px";		td921.style.verticalAlign = "top";	td921.style.textAlign = "center";
	var td922 = d.createElement("td");		td922.style.padding = "3px";		td922.style.verticalAlign = "top";	td922.style.textAlign = "center";
	var td923 = d.createElement("td");		td911.style.padding = "3px";		td911.style.verticalAlign = "bottom";
	var td924 = d.createElement("td");		td912.style.padding = "3px";		td912.style.verticalAlign = "top";	td912.style.textAlign = "center";
	var td925 = d.createElement("td");		td913.style.padding = "3px";		td913.style.verticalAlign = "top";	td913.style.textAlign = "center";

	Blacksmith_Box.appendChild(tr900);
		tr900.appendChild(td900);
	Blacksmith_Box.appendChild(tr91);
		tr91.appendChild(td91);
		td91.appendChild(tr911);

		tr911.appendChild(td911);
		tr911.appendChild(td912);
		tr911.appendChild(td913);
		tr911.appendChild(td914);
		tr911.appendChild(td915);
		tr911.appendChild(td916);
		tr911.appendChild(td917);
		tr911.appendChild(td918);
		tr911.appendChild(td919);
		tr911.appendChild(td920);
		tr911.appendChild(td921);
		tr911.appendChild(td922);
		tr911.appendChild(td923);
		tr911.appendChild(td924);
		tr911.appendChild(td925);

//	ABfacContainer.appendChild(Blacksmith_Box);

	ccreateText(td912, "dummy", "검병", 0 );
	ccreateText(td913, "dummy", "창병", 0 );
	ccreateText(td914, "dummy", "궁병", 0 );
	ccreateText(td915, "dummy", "기병", 0 );
	ccreateText(td916, "dummy", "모창병", 0 );
	ccreateText(td917, "dummy", "노병", 0 );
	ccreateText(td918, "dummy", "근위기병", 0 );
	ccreateText(td919, "dummy", "척후", 0 );
	ccreateText(td920, "dummy", "척후기병", 0 );
	ccreateText(td921, "dummy", "충차", 0 );
	ccreateText(td922, "dummy", "투석기", 0 );
	ccreateText(td923, "dummy", "　", 0 );
	ccreateText(td923, "dummy", "　", 0 );

	ccreateText(td911, "dummy", "　", 0 );
	ccreateText(td911, "dummy", "武器レベル", 0 );
	ccreateText(td911, "dummy", "防具レベル", 0 );

	ccreateTextBox(td912,"OPT_BK_LV1", OPT_BK_LV[1],"","검병の武器レベル",8,0);
	ccreateTextBox(td913,"OPT_BK_LV3", OPT_BK_LV[3],"","창병の武器レベル",8,0);
	ccreateTextBox(td914,"OPT_BK_LV8", OPT_BK_LV[8],"","궁병の武器レベル",8,0);
	ccreateTextBox(td916,"OPT_BK_LV4", OPT_BK_LV[4],"","모창병の武器レベル",8,0);
	ccreateTextBox(td915,"OPT_BK_LV5", OPT_BK_LV[5],"","기병の武器レベル",8,0);
	ccreateTextBox(td917,"OPT_BK_LV9", OPT_BK_LV[9],"","노병の武器レベル",8,0);
	ccreateTextBox(td918,"OPT_BK_LV7", OPT_BK_LV[7],"","근위기병の武器レベル",8,0);
	ccreateText(td919, "dummy", "　", 0 );
	ccreateText(td920, "dummy", "　", 0 );
	ccreateTextBox(td921,"OPT_BK_LV12", OPT_BK_LV[12],"","충차の武器レベル",8,0);
	ccreateTextBox(td922,"OPT_BK_LV13", OPT_BK_LV[13],"","투석기の武器レベル",8,0);

	ccreateTextBox(td912,"OPT_BG_LV1", OPT_BG_LV[1],"","검병の防具レベル",8,0);
	ccreateTextBox(td913,"OPT_BG_LV3", OPT_BG_LV[3],"","창병の防具レベル",8,0);
	ccreateTextBox(td914,"OPT_BG_LV8", OPT_BG_LV[8],"","궁병の防具レベル",8,0);
	ccreateTextBox(td916,"OPT_BG_LV4", OPT_BG_LV[4],"","모창병の防具レベル",8,0);
	ccreateTextBox(td915,"OPT_BG_LV5", OPT_BG_LV[5],"","기병の防具レベル",8,0);
	ccreateTextBox(td917,"OPT_BG_LV9", OPT_BG_LV[9],"","노병の防具レベル",8,0);
	ccreateTextBox(td918,"OPT_BG_LV7", OPT_BG_LV[7],"","근위기병の防具レベル",8,0);
	ccreateTextBox(td919,"OPT_BG_LV10", OPT_BG_LV[10],"","척후の防具レベル",8,0);
	ccreateTextBox(td920,"OPT_BG_LV11", OPT_BG_LV[11],"","척후기병の防具レベル",8,0);
	ccreateTextBox(td921,"OPT_BG_LV12", OPT_BG_LV[12],"","충차の防具レベル",8,0);
	ccreateTextBox(td922,"OPT_BG_LV13", OPT_BG_LV[13],"","투석기の防具レベル",8,0);

	ccreateButton(td923, "初期化", "武器?防具の설정レベルを消去します。", function() {clearInitArmsArmor()});


	// ===== ?す資源量 ====

	var Storage_Box = d.createElement("table");
		Storage_Box.style.border ="solid 2px black";
		Storage_Box.style.marginBottom = "4px";
		Storage_Box.style.width = "100%";

	var tra10 = d.createElement("tr");
		tra10.style.border = "solid 1px black";
		tra10.style.backgroundColor =COLOR_TITLE;

	var tda10 = d.createElement("td");
		ccreateText(tda10, "dummy", "■ 자동造兵?武器防具?化時に?す資源量 ■", 0 );

	var tra1 = d.createElement("tr");
		tra1.style.fontFamily = "ＭＳ ゴシック";
		tra1.style.border = "solid 1px black";
		tra1.style.backgroundColor =COLOR_BACK;
	var tda1 = d.createElement("td");
		tda1.style.padding = "3px";
	var tra11 = d.createElement("tr");
	var tra21 = d.createElement("tr");
	var tda11 = d.createElement("td");
		tda11.style.padding = "3px";
		tda11.style.verticalAlign = "bottom";
	var tda12 = d.createElement("td");
		tda12.style.padding = "3px";
	tda12.style.verticalAlign = "top";
		tda12.style.textAlign = "center";
	var tda13 = d.createElement("td");
		tda13.style.padding = "3px";
		tda13.style.verticalAlign = "top";
		tda13.style.textAlign = "center";
	var tda14 = d.createElement("td");
		tda14.style.padding = "3px";
		tda14.style.verticalAlign = "top";
		tda14.style.textAlign = "center";
	var tda15 = d.createElement("td");
		tda15.style.padding = "3px";
		tda15.style.verticalAlign = "top";
		tda15.style.textAlign = "center";
	var tda16 = d.createElement("td");
		tda16.style.padding = "3px";
		tda16.style.verticalAlign = "top";
		tda16.style.textAlign = "center";

	Storage_Box.appendChild(tra10);
		tra10.appendChild(tda10);
	Storage_Box.appendChild(tra1);
		tra1.appendChild(tda1);
		tda1.appendChild(tra11);

		tra11.appendChild(tda11);
		tra11.appendChild(tda12);
		tra11.appendChild(tda13);
		tra11.appendChild(tda14);
		tra11.appendChild(tda15);
		tra11.appendChild(tda16);


	ccreateText(tda11, "dummy", "　", 0 );
	ccreateText(tda11, "dummy", "?す資源量", 0 );

	ccreateText(tda12, "dummy", "木", 0 );
	ccreateTextBox(tda12,"OPT_BLD_WOOD", OPT_BLD_WOOD,"","木を?す量",8,0);
	ccreateText(tda13, "dummy", "石", 0 );
	ccreateTextBox(tda13,"OPT_BLD_STONE", OPT_BLD_STONE,"","石を?す量",8,0);
	ccreateText(tda14, "dummy", "?", 0 );
	ccreateTextBox(tda14,"OPT_BLD_IRON", OPT_BLD_IRON,"","?を?す量",8,0);
	ccreateText(tda15, "dummy", "糧", 0 );
	ccreateTextBox(tda15,"OPT_BLD_RICE", OPT_BLD_RICE,"","糧を?す量",8,0);
//	ccreateText(tda16, "dummy", "　", 0 );
	ccreateButton(tda16, "初期化", "?す資源量の설정?容を消去します。", function() {clearInitRemainingRes()},54,10);

	// ===== 確認 ====

	var Operation_Box = d.createElement("table");
		Operation_Box.style.border ="solid 0px gray";
		Operation_Box.style.fontFamily = "ＭＳ ゴシック";

	var tr711 = d.createElement("tr");
	var td711 = d.createElement("td");
		td711.style.padding = "3px";
		td711.style.verticalAlign = "top";

	Operation_Box.appendChild(tr711);
		tr711.appendChild(td711);

	ccreateButton(td711, "保存", "설정?容を保存します", function() {
		SaveInifacBox(ABfacContainer.getAttribute('vId'))
		alert("保存しました");
	});
	ccreateButton(td711, "閉じる", "설정?容を保存せず閉じます", function() {
		closeInifacBox();
		clearInterval(tidMain2);
	        tidMain2=unsafeWindow.setTimeout(function(){location.reload();},INTERVAL);
	});


	if (vId == villages[0][IDX_XY]) {
		ccreateButton(td711, "시장情報初期化", "시장情報を初期化します", function() {

			csaveData(HOST+"ShopList",[],true,true);
			closeIniBilderBox()
			openIniBilderBox()
			alert("시장情報を初期化しました");
		},85);
	}

	// == コンテナ설정 ==
	// 上段
	var tbl000 = d.createElement("table");	// 全?
		tbl000.style.border = "solid 0px lime";

	var tr000 = d.createElement("tr");											
	var td001 = d.createElement("td");	// 左?
		td001.style.verticalAlign = "top";
		td001.style.width = "Auto";
		td001.appendChild(Build_Box);
		td001.appendChild(Domestic_Box)


	var td002 = d.createElement("td");	// 右?
		td002.style.verticalAlign = "top";
		td002.style.paddingLeft = "4px";
		td002.style.width = "Auto";
		td002.appendChild(Scrap_Box);
		td002.appendChild(Field_Box);


		td002.appendChild(Contribution_Box);
		td002.appendChild(Storage_Box);
		td002.appendChild(Market_Box)

// 本?地かどうか
		if (vId != villages[0][IDX_XY]) {
			Market_Box.style.visibility = "hidden"
		}

	// 中段
	var tbl010 = d.createElement("table");
		tbl010.style.border = "solid 0px red";

	var tr010 = d.createElement("tr");
		tr010.style.verticalAlign = "top";

	var td011 = d.createElement("td");

	var td012 = d.createElement("td");

	var td013 = d.createElement("td");

	// 	レイアウト

	ABfacContainer.appendChild(tbl000);
		tbl000.appendChild(tr000);
		tr000.appendChild(td001);
		tr000.appendChild(td002);

	ABfacContainer.appendChild(tbl010);
		tbl010.appendChild(tr010);
		tr010.appendChild(td011);
		tr010.appendChild(td012);
		tr010.appendChild(td013);

	ABfacContainer.appendChild(Soldier_Box);
	ABfacContainer.appendChild(Blacksmith_Box);
	ABfacContainer.appendChild(Operation_Box);

}

// ラジオボタン生成 @@@@ add 2011.09.06
function createRadioBtn ( value, txt ) {
    var radioLabel = document.createElement('label');
    radioLabel.style.display = 'inline-block';
    radioLabel.style.margin = '0 5px 0 0';
    radioLabel.style.padding = '0px';
//	dv.style.padding = "2px";
//    radioLabel.addEventListener ( 'click', function(){GM_setValue( 'tweetOpt', value );}, true );
    radioLabel.addEventListener ( 'click', function(){ OPT_BLD = value;}, true );
    var radioLabelText = document.createTextNode(" " + txt);
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'tweetOpt';
    radioButton.value = value;
	radioButton.style.verticalAlign = "top";
//    radioButton.style.margin = '0 2px 0 0';
    if ( OPT_BLD == value ) radioButton.checked = true;
    radioLabel.appendChild( radioButton );
    radioLabel.appendChild( radioLabelText );
    return radioLabel;
}

function createRadioBtn2 ( value, txt ) {
    var radioLabel = document.createElement('label');
    radioLabel.style.display = 'inline-block';
    radioLabel.style.margin = '0 5px 0 0';
    radioLabel.style.padding = '0px';
    radioLabel.addEventListener ( 'click', function(){ OPT_SorH = value; }, true );
    var radioLabelText = document.createTextNode(txt);
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'SorH';
    radioButton.value = value;
//    radioButton.style.margin = '0 2px 0 0';
	radioButton.style.verticalAlign = "top";
    if ( OPT_SorH == value ) radioButton.checked = true;
    radioLabel.appendChild( radioButton );
    radioLabel.appendChild( radioLabelText );
    return radioLabel;
}

//거점?位の설정の保存（XY MAX_LV CheckData)
function SaveInifacBox(vId){

	// 本?地
	var i;
	var opt = $("OPT_MAX_LV");
	strSave = cgetTextBoxValue(opt) + DELIMIT1;
	for(i=0; i<=22;i++){
		var opt = $("OPT_CHKBOX"+i);
		strSave += cgetCheckBoxValue(opt) + DELIMIT2;
	}
	//시장?換처리用
	strSave += cgetCheckBoxValue($("OPT_ICHIBA")) + DELIMIT2; //시장で?換するかどうかのフラグ
	strSave += cgetTextBoxValue($("OPT_RISE_MAX")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_TO_WOOD")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_TO_STONE")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_TO_IRON")) + DELIMIT2;
	//糧마을化
	strSave += cgetCheckBoxValue($("OPT_KATEMURA")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_SOUKO_MAX")) + DELIMIT2;

	//자동기부用
	strSave += cgetCheckBoxValue($("OPT_KIFU")) + DELIMIT2; //기부するかどうかのフラグ
	strSave += cgetTextBoxValue($("OPT_RISE_KIFU_MAX")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_RISE_KIFU")) + DELIMIT2; //자동내정用に修正
	
	//자동내정用 by nottisan ここから追加
	// ＠＠　追加　＠＠
	strSave += cgetComboBoxValue($("OPT_ICHIBA_PA")) + DELIMIT2; //시장での?換パタ?ンフラグ
	try {
		strSave += cgetCheckBoxValue($("OPT_DOME1")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME2")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME3")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME4")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME5")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME6")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME7")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME8")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME9")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME10")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME11")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME12")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME13")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME14")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME15")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME16")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME17")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME18")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME19")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME20")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME21")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME22")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME23")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME24")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME25")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME26")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME27")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME28")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME29")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME30")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME31")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME32")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME33")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME34")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME35")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME36")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME37")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME38")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME39")) + DELIMIT2; //내정사용するかのフラグ
		strSave += cgetCheckBoxValue($("OPT_DOME40")) + DELIMIT2; //내정사용するかのフラグ
	} catch(e) {
		strSave += 0 + DELIMIT2; //내정사용するかのフラグ
	}
	// 施設ごとの건설レベル保存用
	for(i=0; i<=22;i++) {
		var opt = $("OPT_CHKBOXLV" + i);
		strSave += cgetTextBoxValue(opt) + DELIMIT2;
	}

	strSave += cgetTextBoxValue($("OPT_MAX_WOOD")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_MAX_STONE")) + DELIMIT2;
	strSave += cgetTextBoxValue($("OPT_MAX_IRON")) + DELIMIT2;

	strSave += OPT_BLD   + DELIMIT2;			// 건축 or ビルスク
	strSave += OPT_SorH  + DELIMIT2;			// 밭 or 숙사
	strSave += cgetTextBoxValue($("OPT_MAX")) + DELIMIT2;	// ?象上限?

	if (cgetTextBoxValue($("OPT_MAXLV")) < 16) {
		strSave += cgetTextBoxValue($("OPT_MAXLV")) + DELIMIT2;	// ?象上限LV
	} else {
		strSave += 15 + DELIMIT2;	// ?象上限LV
	}
	// 兵작성情報の保存
	for (i=0;i<14;i++){
		var opt = $("OPT_SOL_MAX" + i);
		strSave += cgetTextBoxValue(opt) + DELIMIT2;
	}
	for (i=0;i<14;i++){
		var opt = $("OPT_SOL_ADD" + i);
		strSave += cgetTextBoxValue(opt) + DELIMIT2;
	}
	strSave += cgetCheckBoxValue($("OPT_BLD_SOL")) + DELIMIT2;; //자동造兵するかのフラグ

	strSave += cgetTextBoxValue($("OPT_BLD_WOOD"))  + DELIMIT2; 
	strSave += cgetTextBoxValue($("OPT_BLD_STONE")) + DELIMIT2; 
	strSave += cgetTextBoxValue($("OPT_BLD_IRON"))  + DELIMIT2; 
	strSave += cgetTextBoxValue($("OPT_BLD_RICE"))  + DELIMIT2; 

	for (i=0;i<14;i++){
		if ((i == 10) || (i == 11)) {
			strSave += "0" + DELIMIT2;
		} else {
			var opt = $("OPT_BK_LV" + i);
			if (cgetTextBoxValue(opt) > 10) {
				strSave += "10" + DELIMIT2;
			} else {
				strSave += cgetTextBoxValue(opt) + DELIMIT2;
			}
		}
	}
	for (i=0;i<14;i++){
		var opt = $("OPT_BG_LV" + i);
		if (cgetTextBoxValue(opt) > 10) {
			strSave += "10" + DELIMIT2;
		} else {
			strSave += cgetTextBoxValue(opt) + DELIMIT2;
		}
	}
	strSave += cgetCheckBoxValue($("OPT_BKBG_CHK")) + DELIMIT2;; //자동武器?防具?化するかのフラグ

	GM_setValue(HOST+PGNAME+vId, strSave);
}
//거점?位の설정の?み?み
function Load_OPT(vId){

debugLog("=== Start Load_OPT ===");
	var src = GM_getValue(HOST+PGNAME+vId, "");
	if (src == "") {
		debugLog("거점デ?タなし");
		// 거점デ?タがない場合

		OPT_KATEMURA = 0;
		OPT_SOUKO_MAX = 0;
		OPT_KIFU = 0;
		OPT_RISE_KIFU_MAX = 0;
		OPT_RISE_KIFU = 0;
		for(i=1; i<=40; i++){ OPT_DOME[i]     = 0;}
		for(i=0; i<=22; i++){ OPT_CHKBOX[i]   = 0;}
		for(i=0; i<=22; i++){ OPT_CHKBOXLV[i] = "0";}

		//시장?換처리用 （本?地情報にデ?タがある）
		var villages = loadVillages(HOST+PGNAME);
		var src2 = GM_getValue(HOST+PGNAME+villages[0][IDX_XY], "");
		if (src2 == "") {
			OPT_ICHIBA    = 0;		// 시장자동?換の利用有無
			OPT_RISE_MAX  = 0;		// 糧の자동?換開始量
			OPT_TO_WOOD   = 0;		// 木に?換する糧の量
			OPT_TO_STONE  = 0;		// 石　　　 〃
			OPT_TO_IRON   = 0;		// ?       〃
			OPT_ICHIBA_PA = 0;		// ?換パタ?ン
			OPT_MAX_WOOD  = 0;		// 木の最大保持量（この量を超えたら?換しない）
			OPT_MAX_STONE = 0;		// 石    〃
			OPT_MAX_IRON  = 0;		// ?    〃
		} else {
			var shiroTemp  = src2.split(DELIMIT1);
			var shiroTemp2 = shiroTemp[1].split(DELIMIT2);

			OPT_ICHIBA = forInt(shiroTemp2[23]);			// 시장자동?換の利用有無
			OPT_RISE_MAX = forInt(shiroTemp2[24]);		// 糧の자동?換開始量
			OPT_TO_WOOD = forInt(shiroTemp2[25]);			// 木に?換する糧の量
			OPT_TO_STONE = forInt(shiroTemp2[26]);		// 石　　　 〃
			OPT_TO_IRON = forInt(shiroTemp2[27]);			// ?       〃
			OPT_ICHIBA_PA = shiroTemp2[33];				// ?換パタ?ン
			OPT_MAX_WOOD = forInt(shiroTemp2[97]);		// 木の最大保持量（この量を超えたら?換しない）
			OPT_MAX_STONE = forInt(shiroTemp2[98]);		// 石    〃
			OPT_MAX_IRON = forInt(shiroTemp2[99]);		// ?    〃
		}
		// ビルスク情報
		OPT_BLD = "AC";
		OPT_SorH = "DD";
		OPT_MAX   = 0;
		OPT_MAXLV = 0;
		OPT_MAX   = 6;
		OPT_MAXLV = 6;

		// 兵작성情報
		for (i=0;i<14;i++){	OPT_SOL_MAX[i] = 0;	OPT_SOL_MAX[i]  = 0; };
		for (i=0;i<14;i++){	OPT_SOL_ADD[i] = 0; 	OPT_SOL_ADD[i]  = 0; };
		OPT_BLD_SOL   = 0;
		OPT_BLD_WOOD  = 0;
		OPT_BLD_STONE = 0;
		OPT_BLD_IRON  = 0;
		OPT_BLD_RICE  = 0;

		OPT_BLD_WOOD  = 0;
		OPT_BLD_STONE = 0;
		OPT_BLD_IRON  = 0;
		OPT_BLD_RICE  = 0;

		for (i=0;i<14;i++){	OPT_BK_LV[i] = 0; OPT_BK_LV[i]  = 0; };
		for (i=0;i<14;i++){ OPT_BG_LV[i] = 0; OPT_BG_LV[i]  = 0; };
		OPT_BKBG_CHK  = 0;

//		SaveInifacBox(vId);	// 거점情報の保存

		return;
	} else {
		// 거점デ?タの??
		var Temp = src.split(DELIMIT1);
		OPT_MAX_LV = Temp[0];
		var Temp2 = Temp[1].split(DELIMIT2);
		var i;
		for(i=0; i<=22;i++){
			if(Temp2[i] == ""){return;}
			OPT_CHKBOX[i] = forInt(Temp2[i]);
		}

		//糧마을化
		if(Temp2[28] == ""){return;}
		OPT_KATEMURA = forInt(Temp2[28]);
		OPT_SOUKO_MAX = forInt(Temp2[29]);

		//자동기부
		if(Temp2[30] == ""){return;}
		OPT_KIFU = forInt(Temp2[30]);
		OPT_RISE_KIFU_MAX = forInt(Temp2[31]);
		OPT_RISE_KIFU = forInt(Temp2[32]);

		//자동내정 by nottisan ここから追加
		// ＠＠　追加　＠＠
		for (i=1;i<=40;i++){
			OPT_DOME[i]  = forInt(Temp2[33 + i]);
		}
	// @@ 2011.06.22
		for (i=0; i <= 22; i++){
			OPT_CHKBOXLV[i] = forInt(Temp2[74 + i]);
		}

		//시장?換처리用は本?地デ?タを取得
		var villages = loadVillages(HOST+PGNAME);
		var src2 = GM_getValue(HOST+PGNAME+villages[0][IDX_XY], "");
		if (src2 == "") {
			OPT_ICHIBA    = 0;		// 시장자동?換の利用有無
			OPT_RISE_MAX  = 0;		// 糧の자동?換開始量
			OPT_TO_WOOD   = 0;		// 木に?換する糧の量
			OPT_TO_STONE  = 0;		// 石　　　 〃
			OPT_TO_IRON   = 0;		// ?       〃
			OPT_ICHIBA_PA = 0;		// ?換パタ?ン
			OPT_MAX_WOOD  = 0;		// 木の最大保持量（この量を超えたら?換しない）
			OPT_MAX_STONE = 0;		// 石    〃
			OPT_MAX_IRON  = 0;		// ?    〃
		} else {

			var shiroTemp  = src2.split(DELIMIT1);
			var shiroTemp2 = shiroTemp[1].split(DELIMIT2);

			OPT_ICHIBA = forInt(shiroTemp2[23]);			// 시장자동?換の利用有無

			OPT_RISE_MAX = forInt(shiroTemp2[24]);		// 糧の자동?換開始量
			OPT_TO_WOOD = forInt(shiroTemp2[25]);			// 木に?換する糧の量
			OPT_TO_STONE = forInt(shiroTemp2[26]);		// 石　　　 〃
			OPT_TO_IRON = forInt(shiroTemp2[27]);			// ?       〃

			OPT_ICHIBA_PA = shiroTemp2[33];					// ?換パタ?ン

			OPT_MAX_WOOD = forInt(shiroTemp2[97]);		// 木の最大保持量（この量を超えたら?換しない）
			OPT_MAX_STONE = forInt(shiroTemp2[98]);		// 石    〃
			OPT_MAX_IRON = forInt(shiroTemp2[99]);		// ?    〃
		}

		// ビルスク情報
		OPT_BLD = Temp2[100];
		OPT_SorH = Temp2[101];
		OPT_MAX  = Temp2[102];
		OPT_MAXLV  = Temp2[103];
		if (OPT_MAX == undefined) { OPT_MAX = 6; }
		if (OPT_MAXLV == undefined || OPT_MAXLV > 15) { OPT_MAXLV = 6; }

		// 兵작성情報
		for (i=0;i<14;i++){	
			OPT_SOL_MAX[i] = forInt(Temp2[104 + i]);
			if (isNaN(OPT_SOL_MAX[i])) { OPT_SOL_MAX[i]  = 0; };
		}
		for (i=0;i<14;i++){
			OPT_SOL_ADD[i] = forInt(Temp2[118 + i]);
			if (isNaN(OPT_SOL_ADD[i])) { OPT_SOL_ADD[i]  = 0; };
		}
		OPT_BLD_SOL  = forInt(Temp2[132]);

		OPT_BLD_WOOD  = forInt(Temp2[133]);
		OPT_BLD_STONE = forInt(Temp2[134]);
		OPT_BLD_IRON  = forInt(Temp2[135]);
		OPT_BLD_RICE  = forInt(Temp2[136]);

		if (isNaN(OPT_BLD_WOOD))  { OPT_BLD_WOOD  = 0; };
		if (isNaN(OPT_BLD_STONE)) { OPT_BLD_STONE = 0; };
		if (isNaN(OPT_BLD_IRON))  { OPT_BLD_IRON  = 0; };
		if (isNaN(OPT_BLD_RICE))  { OPT_BLD_RICE  = 0; };

		for (i=0;i<14;i++){
			OPT_BK_LV[i] = forInt(Temp2[137 + i]);
			if (isNaN(OPT_BK_LV[i])) { OPT_BK_LV[i]  = 0; };
		}

		for (i=0;i<14;i++){
			OPT_BG_LV[i] = forInt(Temp2[151 + i]);
			if (isNaN(OPT_BG_LV[i])) { OPT_BG_LV[i]  = 0; };

		}

		OPT_BKBG_CHK  = forInt(Temp2[165]);
	}
}
//ユ?ザプロフィ?ル?面の거점情報を取得
function getUserProf(htmldoc) {
	var oldVillages = loadVillages(HOST+PGNAME);
	var newVillages = new Array();
	var landElems = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr',
		htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var isLandList = false;
	for (var i=0; i<landElems.snapshotLength; i++) {
		var item = landElems.snapshotItem(i);
		
		if (!isLandList) {
			// 2012.01.11 新プロフィ?ル?面??
			var childElement = getChildElement(item, 0);
			if (childElement && trim(childElement.innerHTML) === "이름") {
//			if (trim(getChildElement(item, 0).innerHTML) == "이름") {
				isLandList = true;
			}
			continue;
		}
		
		//이름項目を取得
		var nameElem = getChildElement(getChildElement(item, 0), 0);
		var name = trim(nameElem.innerHTML);
		var url = nameElem.href;
		
		//座標項目を取得
		//var xy = "(" + getChildElement(item, 1).innerHTML + ")";
		var xy = "(" + getChildElement(item, 1).innerHTML.match(/-?[0-9]+\,-?[0-9]+/i) + ")";
		

		//人口項目を取得
		var popul = getChildElement(item, 2).innerHTML;
		
		//거점じゃなければ終了
		if (!isNumeric(popul)) break;
		
		//デ?タマ?ジ
		var newVil = new Array();
		newVil[IDX_ACTIONS] = new Array();
		for (var j = 0; j < oldVillages.length; j++) {
			if (xy == oldVillages[j][IDX_XY]) {
				newVil = oldVillages[j];
			}
		}
		newVil[IDX_XY] = xy;
		newVil[IDX_BASE_NAME] = name;
		newVil[IDX_URL] = url;
		newVil[IDX_BASE_ID]=getParameter2(url, "village_id")
		newVillages.push(newVil);
	}
	
	//保存
	saveVillages(HOST+PGNAME, newVillages);
}

//거점情報を?み出し
function loadVillages(hostname) {
	var ret = new Array();
	
	var src = GM_getValue(hostname, "");
	if (src == "") return ret;
	
	var villages = src.split(DELIMIT1);
	for (var i = 0; i < villages.length; i++) {
		var fields = villages[i].split(DELIMIT2);
		
		ret[i] = new Array();
		ret[i][IDX_XY] = fields[IDX_XY];
		ret[i][IDX_BASE_NAME] = fields[IDX_BASE_NAME];
		ret[i][IDX_URL] = fields[IDX_URL];
		ret[i][IDX_BASE_ID] = fields[IDX_BASE_ID];
		
		ret[i][IDX_ACTIONS] = new Array();
		if (fields[IDX_ACTIONS] == "") continue;
		var actions = fields[IDX_ACTIONS].split(DELIMIT3);
		for (var j = 0; j < actions.length; j++) {
			ret[i][IDX_ACTIONS][j] = new Array();
			if (actions[j] == "") continue;
			
			var item = actions[j].split(DELIMIT4);
			if (item[IDX2_TYPE] == undefined) item[IDX2_TYPE] = "C";
			
			ret[i][IDX_ACTIONS][j][IDX2_STATUS] = item[IDX2_STATUS];
			ret[i][IDX_ACTIONS][j][IDX2_TIME] = item[IDX2_TIME];
			ret[i][IDX_ACTIONS][j][IDX2_TYPE] = item[IDX2_TYPE];
			ret[i][IDX_ACTIONS][j][IDX2_ALERTED] = item[IDX2_ALERTED];
			ret[i][IDX_ACTIONS][j][IDX2_DELETE] = item[IDX2_DELETE];
			ret[i][IDX_ACTIONS][j][IDX2_ROTATION] = item[IDX2_ROTATION];
		}
	}
	return ret;
}
//거점情報を保存
function saveVillages(hostname, newData) {
	
	//配列をデリミタ?切り文字列に?換
	var newDataStr = new Array();
	for (var i = 0; i < newData.length; i++) {
		var villageData = newData[i];
		var actions = villageData[IDX_ACTIONS];
		
		//配列をデリミタ?切り文字列に?換
		for (var j = 0; j < actions.length; j++) {
			actions[j] = genDelimitString(actions[j], DELIMIT4);
		}
		villageData[IDX_ACTIONS] = genDelimitString(actions, DELIMIT3);
		newDataStr[i] = genDelimitString(villageData, DELIMIT2);
	}
	if(newDataStr.length==0){
		return ;
	}
	//Greasemondey領域へ永?保存
	GM_setValue(hostname, genDelimitString(newDataStr, DELIMIT1));


}

//デリミタ?切り文字列生成
function genDelimitString(dataArray, delimiter) {
	var ret = "";
	for (var i=0; i < dataArray.length; i++) {
		if (dataArray[i] != undefined) ret += dataArray[i];
		if (i < dataArray.length-1) ret += delimiter;
	}
	return ret;
}

//URLパラメ?タ取得
function getParameter(key) {
	var str = location.search.split("?");
	if (str.length < 2) {
		return "";
	}
	
	var params = str[1].split("&");
	for (var i = 0; i < params.length; i++) {
		var keyVal = params[i].split("=");
		if (keyVal[0] == key && keyVal.length == 2) {
			return decodeURIComponent(keyVal[1]);
		}
	}
	return "";
}

//先頭ゼロ付加
function padZero(num) {
	var result;
	if (num < 10) {
		result = "0" + num;
	} else {
		result = "" + num;
	}
	return result;
}
//先頭ゼロ除去
function trimZero(str) {
	var res = str.replace(/^0*/, "");
	if (res == "") res = "0";
	return res;
}

//空白除去
function trim(str) {
	if (str == undefined) return "";
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}

//?値체크
function isNumeric(num) {
	if (num.match(/^-?[0-9]+$/)) {
		return true;
	}
	return false;
}

//子Element取得
function getChildElement(parentNode, position) {
	var current = 0;
	for (var i = 0; i < parentNode.childNodes.length; i++){
		var childNode = parentNode.childNodes[i];
		if (childNode.nodeType == 1) {
			if (current == position) {
				return childNode;
			}
			current++;
		}
	}
	
	return undefined;
}

//時刻計算（現在時刻に加算、引?hh:mm:ss）
function computeTime(clock) {
	var hour = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$1")));
	if (isNaN(hour)) hour = 0;
	var min = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$2")));
	if (isNaN(min)) min = 0;
	var sec = parseInt(trimZero(
		clock.replace(/^([0-9]{2}):([0-9]{2}):([0-9]{2})$/, "$3")));
	if (isNaN(sec)) sec = 0;
	
	var now = new Date();
	var resTime = new Date();
	resTime.setHours(now.getHours() + hour);
	resTime.setMinutes(now.getMinutes() + min);
	resTime.setSeconds(now.getSeconds() + sec);
	
	return resTime;
}

//日時文字列編集（yyyy/mm/dd hh:mm:ss）
function generateDateString(date) {
	var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) + 
		"/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" + 
		padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
	return res;
}

//日時文字列編集2（mm/dd hh:mm:ss）
function generateDateString2(date) {
	var res = "" + padZero(date.getMonth() + 1) + "/" + padZero(date.getDate()) + 
		" " + padZero(date.getHours()) + ":" + padZero(date.getMinutes()) + 
		":" + padZero(date.getSeconds());;
	return res;
}

//?時間文字列編集
function generateWaitTimeString(time1, time2) {
	var result = "";
	
	var waitTimeSec = Math.ceil((time1.getTime() - time2.getTime()) / 1000);
	if ( waitTimeSec < 0 ) { waitTimeSec = 0; }
	result += Math.floor(waitTimeSec / (60*60));
	result += ":";
	result += padZero(Math.floor((waitTimeSec % (60*60)) / 60));
	result += ":";
	result += padZero(waitTimeSec % 60);
	
	return result;
}

function ccreateTextBox(container, id, def, text, title, size, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "2px";
	dv.style.paddingLeft= left + "px";
//	dv.style.paddingTop    = "7px";
//	dv.style.paddingBottom = "2px";
	dv.title = title;
	var tb = d.createElement("input");
	tb.type = "text";
	tb.id = id;
	tb.value = def;
	tb.size = size;
//	tb.style.verticalAlign = "middle";
	tb.style.textAlign = "right";
	tb.style.paddingRight = "3px";

	var tx = d.createTextNode(text);
	tx.title = title;
	
	dv.appendChild(tx);
	dv.appendChild(tb);
	container.appendChild(dv);
	return tb;
}
// ＠＠　ここから　＠＠
function ccreateText(container, id, text, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "2px";
	dv.style.paddingLeft= left + "px";
	dv.style.paddingBottom = "2px";

	var lb = d.createElement("label");
	lb.htmlFor = id;
	lb.style.verticalAlign = "middle";
	var tx = d.createTextNode(text);
	tx.fontsize = "9px";
	lb.appendChild( tx );

	dv.appendChild(lb);
	container.appendChild(dv);
}
// ＠＠　ここまで　＠＠

function ccreateCheckBox(container, id, def, text, title, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "1px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	var cb = d.createElement("input");
	cb.type = "checkbox";
	cb.style.verticalAlign = "middle";
	cb.id = id;
	cb.value = 1;
	if( def ) cb.checked = true;
	
	var lb = d.createElement("label");
	lb.htmlFor = id;
	lb.style.verticalAlign = "middle";
	
	var tx = d.createTextNode(text);
	lb.appendChild( tx );
	
	dv.appendChild(cb);
	dv.appendChild(lb);
	container.appendChild(dv);
	return cb;
}


function ccreateButton(container, text, title, func, width, top)
{
	var btn = d.createElement("input");
	btn.style.padding = "0px";
	btn.type = "button";
	btn.value = text;
	if (top != undefined) {
		btn.style.marginTop = top + "px";
	}
	if (width == undefined) {
		btn.style.width = "54px";
	} else {
		btn.style.width = width + "px";
	}
	btn.style.height = "22px";
	btn.style.verticalAlign = "middle";
	btn.title = title;
	container.appendChild(d.createTextNode(" "));
	container.appendChild(btn);
	container.appendChild(d.createTextNode(" "));
	$e(btn, "click", func);
	return btn;
}

function cgetCheckBoxValue(id)
{
	var c = id;
	if( !c ) return 0;
	if( !c.checked ) return 0;
	return 1;
}

function cgetTextBoxValue(id)
{
	var c = id;
	if( !c ) return "";
	return c.value;
}
function ccreateComboBox(container, id, sels, def, text, title, left )
{
    left += 2;
    var dv = d.createElement("div");
    dv.style.padding = "1px";
    dv.style.paddingLeft= left + "px";
    dv.title = title;
    var sel = d.createElement("select");
    sel.id = id;
    for(var i=0; i<sels.length; i++){
        var opt = d.createElement("option");
        opt.value = sels[i];
        opt.appendChild(d.createTextNode(sels[i]));
        sel.appendChild(opt);
    }
    if( def ) sel.value = def;

    var tx = d.createTextNode(text);
    tx.title = title;

    dv.appendChild(tx);
    dv.appendChild(sel);
    container.appendChild(dv);
    return sel;
}
function cgetComboBoxValue(id){
	var c = id;
	if( !c ) return "";
	return c.value;
}
function Chek_Sigen(area){
	//costs
	var cost_wood = [
		[10,35,40,15],
		[25, 88, 100, 38],
		[58, 202, 230, 86],
		[173, 604, 690, 259],
		[431, 1510, 1725, 647],
		[1466, 2847, 3019, 1294],
		[2493, 4839, 5132, 2200],
		[3490, 6775, 7186, 3080],
		[4537, 8807, 9341, 4003],
		[5898, 11450, 12144, 5204],
		[8119, 14434, 15787, 6766],
		[11366, 20207, 22101, 9472],
		[17050, 30311, 33152, 14208],
		[25575, 45467, 49729, 21312],
		[38362, 68199, 74593, 31698]
	];
	var cost_stone= [
		[40, 10, 35, 15],
		[100, 25, 88, 38],
		[230, 58, 202, 86],
		[690, 173, 604, 259],
		[1725, 431, 1510, 647],
		[3019, 1466, 2847, 1294],
		[5132, 2493, 4839, 2200],
		[7186, 3490, 6775, 3080],
		[9341, 4537, 8807, 4003],
		[12144, 5898, 11450, 5204],
		[15787, 8119, 14434, 6766],
		[22101, 11366, 20207, 9472],
		[33152, 17050, 30311, 14208],
		[49729, 25575, 45467, 21312],
		[74593, 38362, 68199, 31968]
	];
	var cost_iron=[
		[35, 40, 10, 15],
		[88, 100, 25, 38],
		[202, 230, 58, 86],
		[604, 690, 173, 259],
		[1510, 1725, 431, 647],
		[2847, 3019, 1466, 1294],
		[4839, 5132, 2493, 2200],
		[6775, 7186, 3490, 3080],
		[8807, 9341, 4537, 4003],
		[11450, 12144, 5898, 5204],
		[14434, 15787, 8119, 6766],
		[20207, 22101, 11366, 9472],
		[30311, 33152, 17050, 14208],
		[45467, 49729, 25575, 21312],
		[68199, 74593, 38362, 31968]
	];
	var cost_rice=[
		[35, 35, 30, 0],
		[88, 88, 75, 0],
		[202, 202, 173, 0],
		[604, 604, 518, 0],
		[1510, 1510, 1294, 0],
		[3019, 3019, 2588, 0],
		[5132, 5132, 4399, 0],
		[7186, 7186, 6159, 0],
		[9341, 9341, 8007, 0],
		[12144, 12144, 10409, 0],
		[15787, 15787, 13532, 0],
		[22101, 22101, 18944, 0],
		[33152, 33152, 28416, 0],
		[49729, 49729, 42625, 0],
		[74593, 74593, 63937, 0]
	];
	var cost_souko=[
		[83, 141, 83, 63],
		[167, 281, 167, 126],
		[300, 506, 300, 226],
		[479, 810, 479, 362],
		[671, 1134, 671, 507],
		[1044, 1253, 1044, 835],
		[1462, 1754, 1462, 1169],
		[1973, 2368, 1973, 1578],
		[2664, 3196, 2664, 2131],
		[3596, 4315, 3596, 2877],
		[4854, 5825, 4854, 3883],
		[6311, 7573, 6311, 5048],
		[8204, 9845, 8204, 6563],
		[10255, 12306, 10255, 8204],
		[12819, 15382, 12819, 10255],
		[15382, 18459, 15382, 12306],
		[18459, 22151, 18459, 14767],
		[21228, 21228, 25473, 16982],
		[24412, 29294, 24412, 19529],
		[28074, 33688, 28074, 22459]
	];
	var cost_syukusya=[
		[35, 20, 35, 80],
		[53, 30, 53, 120],
		[89, 51, 89, 204],
		[147, 84, 147, 337],
		[228, 130, 228, 522],
		[336, 192, 336, 767],
		[476, 272, 476, 1089],
		[653, 373, 653, 1492],
		[868, 496, 868, 1984],
		[1129, 645, 1129, 2580],
		[2032, 1161, 2032, 4644],
		[3658, 2090, 3658, 4644],
		[6951, 3971, 6950, 15882],
		[13205, 7544, 13205, 30177],
		[25090, 14334, 25090, 57336]
	];
	var cost_kojo=[
		[780, 1560, 1560, 3900],
		[1248, 2496, 2496, 6240],
		[1997, 3994, 3994, 9984],
		[4193, 6290, 6290, 11182],
		[5871, 8806, 8806, 15655],
		[10958, 13698, 13698, 16437],
		[15342, 19177, 19177, 23013],
		[19944, 24930, 24930, 29916],
		[25928, 32410, 32410, 38891],
		[33706, 42132, 42132, 50559]
	];
	var cost_suisya=[
		[2940, 980, 980, 4900],
		[4704, 1568, 1568, 7840],
		[7526, 2509, 2509, 12544],
		[10537, 5268, 5268, 14049],
		[14751, 7376, 7376, 19668],
		[20652, 13768, 13768, 20652],
		[28913, 19275, 19275, 28913],
		[37587, 25058, 25058, 37587],
		[48863, 32576, 32576, 48863],
		[63523, 42348, 42348, 63523]
	];
	var cost_ichiba=[
		[100, 100, 50, 50],
		[334, 334, 191, 191],
		[1035, 1035, 592, 592],
		[2795, 2795, 1600, 1600],
		[6328, 6328, 4218, 4218],
		[13288, 13288, 8859, 8859],
		[25248, 25248, 16832, 16832],
		[42921, 42921, 28614, 28614],
		[64381, 64381, 42921, 42921],
		[90134, 90134, 60089, 60089]
	];
	var cost_kenkyu=[
		[275, 110, 110, 55],
		[413, 165, 165, 83],
		[619, 248, 248, 124],
		[1486, 836, 836, 557],
		[2228, 1253, 1253, 836],
		[7521, 6267, 6267, 5015],
		[13538, 11282, 11282, 9025],
		[21436, 17862, 17862, 14290],
		[44675, 37228, 37228, 29784],
		[87725, 73104, 73104, 58483]
	];
	var cost_kunren=[
		[1500, 1600, 2500, 3300],
		[2100, 2240, 3500, 3300],
		[2940, 3136, 4900, 6468],
		[6629, 7326, 13955, 6978],
		[13257, 14653, 27910, 13955],
		[32097, 37679, 55821, 13955],
		[64194, 75358, 111642, 27910],
		[128388, 150716, 223283, 55821],
		[256776, 301432, 446566, 111642],
		[513551, 602865, 893133, 223283]
	];
	var cost_kajiba=[
		[150, 200, 340, 170],
		[400, 300, 680, 340],
		[780, 585, 1326, 663],
		[1482, 1112, 2519, 1260],
		[2742, 2056, 4661, 2330],
		[4935, 3701, 8390, 4195],
		[8636, 6477, 14682, 7341],
		[17640, 14112, 28223, 10584],
		[31566, 25253, 50506, 18940],
		[50506, 40404, 80809, 30303]
	];
	var cost_bougu=[
		[150, 200, 340, 170],
		[300, 400, 680, 340],
		[585, 780, 1326, 663],
		[1112, 1482, 2519, 1260],
		[2056, 2742, 4661, 2330],
		[3701, 4935, 8390, 4195],
		[6477, 8636, 14682, 7341],
		[14112, 17640, 28223, 10584],
		[25253, 31566, 50506, 18940],
		[40404, 50506, 80809, 30303]
	];
	var cost_heiki=[
		[216, 216, 216, 72],
		[432, 432, 432, 144],
		[864, 864, 864, 288],
		[1224, 1224, 1224, 648],
		[1836, 1836, 1836, 972],
		[2662, 2662, 2662, 1409],
		[3860, 3860, 3860, 2044],
		[7357, 7357, 7357, 2452],
		[13242, 13242, 13242, 4414],
		[23836, 23836, 23836, 7945],
		[42905, 42905, 42905, 14302],
		[77229, 77229, 77229, 25743],
		[139013, 139013, 139013, 46338],
		[278026, 278026, 278026, 92675],
		[556051, 556051, 556051, 185350]
	];
	var cost_doujaku=[
		[700, 3500, 2100, 700],
		[1120, 5600, 3360, 1120],
		[1792, 8960, 5376, 1792],
		[3763, 10035, 7526, 3763],
		[5263, 14049, 10537, 5268],
		[9834, 14752, 14752, 9834],
		[13768, 20652, 20652, 13768],
		[17899, 26848, 26848, 17899],
		[23268, 34902, 34902, 23268],
		[30249, 45373, 45373, 30249]
	];
	var cost_renpei=[
		[112, 107, 107, 122],
		[224, 214, 214, 244],
		[448, 428, 428, 488],
		[759, 725, 725, 826],
		[1214, 1160, 1160, 1322],
		[2209, 2110, 2110, 2406],
		[3331, 3182, 3182, 3627],
		[4958, 4736, 4736, 5400],
		[8091, 7729, 7729, 8813],
		[11130, 10632, 10632, 12122]
	];
	var cost_heisya=[
		[72, 360, 72, 216],
		[144, 720, 144, 432],
		[288, 1440, 288, 864],
		[648, 1728, 648, 1296],
		[972, 2592, 972, 1944],
		[1409, 3758, 1409, 2819],
		[2725, 4088, 2725, 4088],
		[6744, 9810, 5518, 2453],
		[12140, 17658, 9933, 4415],
		[21852, 31784, 17879, 7946],
		[39333, 57212, 32182, 14303],
		[70800, 96545, 64364, 25745],
		[127440, 173781, 115854, 46342],
		[254879, 324392, 254879, 92683],
		[509759, 648784, 509759, 185367]
	];
	var cost_yumi=[
		[360, 72, 72, 216],
		[720, 144, 144, 432],
		[1440, 288, 288, 864],
		[1728, 648, 648, 1296],
		[2592, 972, 972, 1944],
		[3758, 1409, 1409, 2819],
		[5450, 2044, 2044, 4087],
		[9810, 6131, 6131, 2453],
		[17658, 12140, 9933, 4415],
		[31784, 21852, 17879, 7946],
		[57212, 39333, 32182, 14303],
		[96545, 70800, 64364, 25745],
		[173781, 127440, 115854, 46342],
		[324392, 254879, 254879, 92683],
		[648784, 509759, 509759, 185367]
	];
	var cost_uma=[
		[72, 72, 360, 216],
		[144, 144, 720, 432],
		[288, 288, 1440, 864],
		[648, 648, 1728, 1296],
		[972, 972, 2592, 1944],
		[1409, 1409, 3758, 2891],
		[2044, 2044, 5450, 4087],
		[5518, 6744, 9810, 2453],
		[9933, 12140, 17658, 4415],
		[17879, 21852, 31784, 7946],
		[32182, 39333, 57212, 14303],
		[64364, 70800, 96545, 25745],
		[115854, 127440, 173781, 46342],
		[254879, 254879, 324392, 92683],
		[509759, 509759, 648784, 185367]
	];

	var cost_shiro=[
		[0, 0, 0, 0],
		[1404, 546, 390, 780],
		[2570, 1000, 714, 1428],
		[4161, 2081, 2081, 2081],
		[7102, 3552, 3552, 3552],
		[9056, 9056, 6037, 6037],
		[14384, 14384, 9589, 9589],
		[22773, 22773, 15183, 15183],
		[33562, 33562, 22374, 22374],
		[44402, 57559, 32890, 29602],
		[65122, 84418, 48239, 43415],
		[95317, 123558, 70605, 63544],
		[113458, 154716, 154716, 92830],
		[150418, 150418, 315878, 135375],
		[219008, 219008, 492770, 164258],
		[294820, 294820, 663345, 221115],
		[488220, 488220, 827854, 318406],
		[839130, 839130, 915414, 457707],
		[1307581, 1307581, 1354280, 700491],
		[1901938, 1901938, 1969864, 1018896]
	];
	var cost_toride=[
		[104, 400, 136, 160],
		[243, 936, 319, 374],
		[438, 1685, 573, 673],
		[1110, 2467, 1357, 1233],
		[1887, 4194, 2307, 2097],
		[3236, 7191, 3954, 3596],
		[5177, 11505, 6327, 5753],
		[10430, 18776, 13560, 9387],
		[18839, 33912, 24492, 16956],
		[33914, 61043, 44087, 30523],
		[66939, 106495, 85196, 45640],
		[119786, 190570, 152456, 81672],
		[213820, 340166, 272133, 145786],
		[423566, 505021, 456148, 244365],
		[708513, 844765, 763014, 408756]
	];
	var cost_mura=[
		[400, 136, 104, 160],
		[936, 319, 243, 374],
		[1685, 573, 438, 673],
		[2467, 1357, 1110, 1233],
		[4194, 2307, 1887, 2097],
		[7191, 3954, 3236, 3596],
		[11505, 6327, 5177, 5753],
		[18776, 13560, 10430, 9387],
		[33912, 24492, 18839, 16956],
		[61043, 44087, 33914, 30523],
		[106495, 85196, 66939, 45640],
		[190570, 152456, 119786, 81672],
		[340166, 272133, 213820, 145786],
		[505021, 456148, 423566, 244365],
		[844765, 763014, 708513, 408756]
	];
	var cost_daisyukusya=[
		[200, 114, 200, 438],
		[320, 183, 320, 701],
		[512, 293, 512, 1121],
		[768, 439, 768, 1682],
		[1152, 658, 1152, 2523],
		[1728, 987, 1728, 3784],
		[2419, 1382, 2419, 5298],
		[3387, 1935, 3387, 7418],
		[4741, 2709, 4741, 10385],
		[6637, 3793, 6637, 14538],
		[8628, 4930, 8628, 18900],
		[11217, 6409, 11217, 24570],
		[14582, 8332, 14582, 31941],
		[18956, 11735, 18956, 40620],
		[25817, 16429, 25817, 49286],
		[32271, 22003, 32271, 60141],
		[42172, 29337, 42172, 69675],
		[52715, 38963, 52715, 84803],
		[66009, 49506, 66009, 93512],
		[79211, 62708, 79211, 108914]
	];
	var cost_ennseikunren=[
		[2884, 4486, 5977, 2723],
		[4614, 7177, 9484, 4357],
		[7382, 11483, 15174, 6972],
		[11811, 18373, 24279, 11155],
		[18898, 29397, 38846, 17848],
		[28347, 44096, 58269, 26772],
		[42521, 66143, 87404, 40158],
		[63781, 99215, 131105, 60238],
		[89294, 138901, 183548, 84333],
		[125011, 194461, 256967, 118066],
		[175015, 272246, 359754, 165292],
		[227520, 353920, 467680, 214880],
		[295776, 460096, 607984, 279344]
	];
	var cost_miharidai=[
		[600, 840, 600, 360 ],
		[960, 1344, 960, 576],
		[1536, 2150, 1536, 922],
		[2458, 3441, 2458, 1475],
		[3932, 5505, 3932, 2359],
		[6291, 8808, 6291, 3775],
		[9437, 13212, 9437, 5662],
		[14156, 19818, 14156, 8493],
		[21233, 29727, 21233, 12740],
		[31850, 44590, 31850, 19110],
		[44590, 62426, 44590, 26754],
		[62426, 87396, 62426, 37456],
		[87397, 122355, 87397, 52438],
		[122355, 171297, 122355, 73413],
		[159062, 222686, 159062, 95437],
		[206780, 289492, 206780, 124068]
	];
	var cost_syugyouzyo=[
		[1600, 1200, 600, 600],
		[2240, 1680, 840, 840],
		[3136, 2352, 1176, 1176],
		[4390, 3293, 1646, 1646],
		[6146, 4610, 2305, 2305],
		[8605, 6454, 3227, 3227],
		[11186, 8390, 4195, 4195],
		[14542, 10907, 5453, 5453],
		[18905, 14179, 7089, 7089],
		[24577, 18433, 9216, 9216],
		[31950, 23963, 11981, 11981],
		[38340, 28755, 14378, 14378],
		[46008, 34506, 17253, 17253],
		[55210, 41407, 20704, 20704],
		[66252, 49689, 24844, 24844],
		[72877, 54658, 27329, 27329],
		[80164, 60123, 30062, 30062],
		[88181, 66136, 33068, 33068],
		[96999, 72749, 36375, 36375],
		[106699, 80024, 40012, 40012]
	];
	var costs = [];

	costs["성"] = cost_shiro;
	costs["벌채소"] = cost_wood;
	costs["채석장"] = cost_stone;
	costs["제철소"] = cost_iron;
	costs["밭"] = cost_rice;
	costs["창고"] = cost_souko;
	costs["동작대"] = cost_doujaku;
	costs["대장간"] = cost_kajiba;
	costs["방어구공장"] = cost_bougu;
	costs["창병사"] = cost_renpei;
	costs["연병소"] = cost_heisya;
	costs["궁병사"] = cost_yumi;
	costs["기병사"] = cost_uma;
	costs["숙사"] = cost_syukusya;
	costs["무기공장"] = cost_heiki;
	costs["시장"] = cost_ichiba;
	costs["훈련소"] = cost_kunren;
	costs["수차"] = cost_suisya;
	costs["공장"] = cost_kojo;
	costs["연구소"] = cost_kenkyu;
	costs["대숙사"] = cost_daisyukusya;
	costs["원정훈련소"] = cost_ennseikunren;
	costs["감시탑"] = cost_miharidai;
//	costs["修行所"] = cost_syugyouzyo;
	costs["요새"] = cost_toride;
	costs["마을"] = cost_mura;

	var RES_NOW = [];
	RES_NOW["wood"] = parseInt( $("wood").innerHTML, 10 );
	RES_NOW["stone"] = parseInt( $("stone").innerHTML, 10 );
	RES_NOW["iron"] = parseInt( $("iron").innerHTML, 10 );
	RES_NOW["rice"] = parseInt( $("rice").innerHTML, 10 );
	RES_NOW["storagemax"] = parseInt( $("rice_max").innerHTML, 10 );

	try {
		if( costs[area.name].length <= parseInt(area.lv) || // maxinum level reached 
			RES_NOW.wood < costs[area.name][parseInt(area.lv)][0] ||
			RES_NOW.stone< costs[area.name][parseInt(area.lv)][1] ||
			RES_NOW.iron < costs[area.name][parseInt(area.lv)][2] ||
			RES_NOW.rice < costs[area.name][parseInt(area.lv)][3] ) {
				//건축不可 = 1
				return 1;
		}
	}catch(e) {
	}
	return 0;

}

function getSoldier() {

debugLog("=== Start getSoldier ===");

	var tables = document.evaluate('//*[@class="status village-bottom"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var Temp = tables.snapshotItem(0).innerHTML.substring(tables.snapshotItem(0).innerHTML.lastIndexOf(" ")+1);
	aa = Temp.split("/");
	var now_Soldier = aa[0];
	var max_Soldier = aa[1];

	// 造兵指示がない場合はスキップ
	if (OPT_BLD_SOL == 0) { return; }

	var result = new Array();
	var attackerData = new Array(0,0,0,0,0,0,0,0,0,0,0);
	var waitData	 = new Array(0,0,0,0,0,0,0,0,0,0,0);
	var helpData	 = new Array(0,0,0,0,0,0,0,0,0,0,0);
	var sortieData	 = new Array(0,0,0,0,0,0,0,0,0,0,0);
	var returnData	 = new Array(0,0,0,0,0,0,0,0,0,0,0);
	var moveData	 = new Array(0,0,0,0,0,0,0,0,0,0,0);


	var tid=unsafeWindow.setTimeout(function(){

		GM_xmlhttpRequest({
			method:"GET", 
			url:"http://"+HOST+"/facility/unit_status.php",
			headers:{"Content-type":"text/html"},
			overrideMimeType:'text/html; charset=utf-8',
			onload:function(x){
				var htmldoc = document.createElement("html");
			        htmldoc.innerHTML = x.responseText;

				// 待機中の兵士
				var tables = document.evaluate('//div[@id="wait"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var htmldoc2 = document.createElement("html");
					htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML
				var tables2 = document.evaluate('//td[@class="digit"]',htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				waitData	 = addSoldierCount(waitData, tables2);
				attackerData = addSoldierCount(attackerData, tables2);

				// 援軍中
				tables = document.evaluate('//div[@id="help"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
				tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < tables2.snapshotLength; i++ ){
					var htmldoc3 = document.createElement("html");
						htmldoc3 = tables2.snapshotItem(i);
					var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					helpData	 = addSoldierCount(helpData, tables3);
					attackerData = addSoldierCount(attackerData, tables3);
				}

				// 出?中
				tables = document.evaluate('//div[@id="sortie"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
				tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < tables2.snapshotLength; i++ ){
					var htmldoc3 = document.createElement("html");
						htmldoc3 = tables2.snapshotItem(i);
					var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					sortieData	 = addSoldierCount(sortieData, tables3);
					attackerData = addSoldierCount(attackerData, tables3);
				}

				// ?還中
				tables = document.evaluate('//div[@id="return"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
				tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < tables2.snapshotLength; i++ ){
					var htmldoc3 = document.createElement("html");
						htmldoc3 = tables2.snapshotItem(i);
					var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					returnData	 = addSoldierCount(returnData, tables3);
					attackerData = addSoldierCount(attackerData, tables3);
				}

				// 移動中
				tables = document.evaluate('//div[@id="move"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				htmldoc2.innerHTML = tables.snapshotItem(0).innerHTML;
				tables2 = document.evaluate('//table[@class="commonTablesNoMG"]',htmldoc2, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < tables2.snapshotLength; i++ ){
					var htmldoc3 = document.createElement("html");
						htmldoc3 = tables2.snapshotItem(i);
					var tables3 = document.evaluate('*/tr/td[@class="digit"]',htmldoc3, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					moveData	 = addSoldierCount(moveData, tables3);
					attackerData = addSoldierCount(attackerData, tables3);
				}
				// 작성처리
				make_soldier(attackerData);

			}
		});
	},0);
}

//兵士?加算
function addSoldierCount(total, add) {

	if (total == undefined) total = new Array();
	if (total == undefined) {
		total = new Array(0,0,0,0,0,0,0,0,0,0,0);
	}
	for (var j = 0; j < 11; j++) {
		total[j] += parseInt(add.snapshotItem(j).innerHTML);
	}
	
	return total;
}

function make_soldier(attackerData){
	var make_name = ["무기공장","기병사","연병소","궁병사","창병사"]

	var make_loop = function(loop) {
		if (loop == 5) {
			sort_priority[0]  = make_no["검병"];
			sort_priority[1]  = make_no["궁병"];
			sort_priority[2]  = make_no["노병"];
			sort_priority[3]  = make_no["기병"];
			sort_priority[4]  = make_no["근위기병"];
			sort_priority[5]  = make_no["창병"];
			sort_priority[6]  = make_no["모창병"];
			sort_priority[7]  = make_no["척후"];
			sort_priority[8]  = make_no["척후기병"];
			sort_priority[9]  = make_no["충차"];
			sort_priority[10] = make_no["투석기"];

            sort_priority.sort( function(a, b) { if (a[6] < b[6]) return 1; if (a[6] > b[6]) return -1; return 0;});

			for (var i=0;i<11;i++){ 
				if (sort_priority[i][2] == 1 && sort_priority[i][6] != 0){
					// 兵작성
					if ((OPT_SOL_ADD[sort_priority[i][1] - 300] != 0) && (OPT_SOL_ADD[sort_priority[i][1] - 300] < sort_priority[i][3])){
						var c={};
						c['x']=parseInt(sort_priority[i][7]);
						c['y']=parseInt(sort_priority[i][8]);
						c['unit_id']=sort_priority[i][1];
						c['count']=OPT_SOL_ADD[sort_priority[i][1] - 300];
						j$.post("http://"+HOST+"/facility/facility.php?x=" + sort_priority[i][7] + "&y=" + sort_priority[i][8] + "#ptop",c,function(){});
						var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);

						break;
					}
				}
			}
			return;
		}

		var _x = -1;
		var _y = -1;
		var _lv = -1;

		var area = new Array();
		area = get_area();

		for (i=0;i<area.length;i++){
			if (area[i].name == make_name[loop]) {
				var Temp = area[i].xy.split(",");
				_x = Temp[0];
				_y = Temp[1];
				_lv = area[i].lv;
			}
		}
		if ( _x < 0 ) {
			// 建物がない
			make_loop(loop + 1);
		} else {

			MakeSoldierFlg = false;	// 兵士작성フラグ

			var tables = document.evaluate('//*[@class="status village-bottom"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var Temp = tables.snapshotItem(0).innerHTML.substring(tables.snapshotItem(0).innerHTML.lastIndexOf(" ")+1);
			temp0 = Temp.split("/");
			var now_Soldier = temp0[0];
			var max_Soldier = temp0[1];
			var make_max = temp0[1] - temp0[0]; // 最大작성可能兵?
			// 숙사に空きがあるか？
		    switch (make_name[loop]) { 
        		case "무기공장":	if ((OPT_SOL_ADD[12] <= make_max) && (OPT_SOL_ADD[13] <= make_max)) 								{ MakeSoldierFlg = true; }		// 충차?투석기
        		case "기병사":		if ((OPT_SOL_ADD[5]  <= make_max) && (OPT_SOL_ADD[7]  <= make_max) && (OPT_SOL_MAX[11] <= make_max)){ MakeSoldierFlg = true; }		// 기병?근위기병?척후기병
        		case "연병소":		if ((OPT_SOL_ADD[3]  <= make_max) && (OPT_SOL_ADD[4]  <= make_max)) 								{ MakeSoldierFlg = true; }		// 창병?모창병
        		case "궁병사":		if ((OPT_SOL_ADD[8]  <= make_max) && (OPT_SOL_ADD[9]  <= make_max)) 								{ MakeSoldierFlg = true; }		// 궁병?노병
        		case "창병사":		if ((OPT_SOL_ADD[1]  <= make_max) && (OPT_SOL_ADD[10] <= make_max)) 								{ MakeSoldierFlg = true; }		// 검병?척후
			}
			if (MakeSoldierFlg) {
				var tid=unsafeWindow.setTimeout(function(){
					var mURL = FACLINK;
					mURL = mURL.replace(URL_SITE,HOST);
					mURL = mURL.replace(URL_X,_x);
					mURL = mURL.replace(URL_Y,_y);
					GM_xmlhttpRequest({
						method:"GET", 
						url: mURL,
						headers:{"Content-type":"text/html"},
						overrideMimeType:'text/html; charset=utf-8',
						onload:function(x){
							var htmldoc = document.createElement("html");
						        htmldoc.innerHTML = x.responseText;

							var makeElem = document.evaluate('//*[@id="area_timer0"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
							if (makeElem.snapshotLength > 0) {
								// 兵士は작성中
								getTrainingSoldier(htmldoc);
								if ( getStayMode() ) {
									closeIniBilderBox()
									openIniBilderBox()
								}
							} else {
								var makeElem  = document.evaluate('//th[@class="mainTtl"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

								for (var i = 1; i < makeElem.snapshotLength; i++ ){
									// 兵작성可能
									make_no[makeElem.snapshotItem(i).innerHTML][2] = 1;
									// 兵작성可能?
									make_no[makeElem.snapshotItem(i).innerHTML][3] = parseInt(sumMaxSoldier(make_no[makeElem.snapshotItem(i).innerHTML][1]));
									// 現存合計兵?
									make_no[makeElem.snapshotItem(i).innerHTML][5] = attackerData[make_no[makeElem.snapshotItem(i).innerHTML][4]];
									// ?必要兵?
									make_no[makeElem.snapshotItem(i).innerHTML][6] = OPT_SOL_MAX[make_no[makeElem.snapshotItem(i).innerHTML][1] - 300] - attackerData[make_no[makeElem.snapshotItem(i).innerHTML][4]];
									if (make_no[makeElem.snapshotItem(i).innerHTML][6] < 0) {
										make_no[makeElem.snapshotItem(i).innerHTML][6] = 0;
									}
									// 座標
									make_no[makeElem.snapshotItem(i).innerHTML][7] = _x;
									make_no[makeElem.snapshotItem(i).innerHTML][8] = _y;
								};
							}
							make_loop(loop + 1);
						}
					});
				},1000);
			} else {
				make_loop(loop + 1);
			}
		}
	}

	make_loop(0);

}

function sumMaxSoldier(type){
	var SoldierCost = [
		[   1,   1,   1,   1],
		[  11,   1,  11,  61],	// 301 검병
		[   1,   1,   1,   1],
		[  88, 132,   1,  21],	// 303 창병
		[ 264, 396,   1,  61],	// 304 모창병
		[   1, 128, 192,  41],	// 305 기병
		[   1,   1,   1,   1],
		[   1, 384, 576, 121],	// 307 근위기병
		[ 144,   1,  96,  35],	// 308 궁병
		[ 432,   1, 288, 105],	// 309 노병
		[ 151, 151, 151,   1],	// 310 척후
		[ 451, 451, 451,  31],	// 311 척후기병
		[ 501,   1, 501,   1],	// 312 충차
		[   1,1501,1501,   1]	// 313 투석기
	];

	var tables = document.evaluate('//*[@class="status village-bottom"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var Temp = tables.snapshotItem(0).innerHTML.substring(tables.snapshotItem(0).innerHTML.lastIndexOf(" ")+1);
	temp0 = Temp.split("/");
	var now_Soldier = temp0[0];
	var max_Soldier = temp0[1];
	var make_max = temp0[1] - temp0[0]; // 最大작성可能兵?

	type = type - 300;
	var wood = parseInt( $("wood").innerHTML, 10 );
	var stone = parseInt( $("stone").innerHTML, 10 );
	var iron = parseInt( $("iron").innerHTML, 10 );
	var rice = parseInt( $("rice").innerHTML, 10 );

	countWood  = parseInt((wood  - OPT_BLD_WOOD)  / SoldierCost[type][0]);
	countStone = parseInt((stone - OPT_BLD_STONE) / SoldierCost[type][1]);
	countIron  = parseInt((iron  - OPT_BLD_IRON)  / SoldierCost[type][2]);
	countRice  = parseInt((rice  - OPT_BLD_RICE)  / SoldierCost[type][3]);

	var MaxSoldir = countWood;
	if (MaxSoldir > countStone) { MaxSoldir = countStone; }
	if (MaxSoldir > countIron)  { MaxSoldir = countIron; }
	if (MaxSoldir > countRice)  { MaxSoldir = countRice; }

	if (make_max < MaxSoldir) { MaxSoldir = make_max; }		// ?在可能上限を超えないこと
	return MaxSoldir;
}

// 資源オ?バ?フロ?防止처리
function OverFlowPrevention() {

	var ichiba_x = -1; //시장のX座標
	var ichiba_y = -1; //시장のY座標
	var ichiba_lv = -1; //시장のレベル

	var area = new Array();
	area = get_area();

	for(i=0;i<area.length;i++){
		//시장の座標を取得
		if(area[i].name == "시장") {
			var Temp = area[i].xy.split(",");
			ichiba_x = Temp[0];
			ichiba_y = Temp[1];
			ichiba_lv = area[i].lv;
		}
	}

	if(ichiba_x < 0) { return; }

	// 現在の?態
	var RES_NOW = [];
	RES_NOW["wood"]		= parseInt( $("wood").innerHTML,     10 );	// 資源：木
	RES_NOW["stone"]	= parseInt( $("stone").innerHTML,    10 );	// 資源：石
	RES_NOW["iron"]		= parseInt( $("iron").innerHTML,     10 );	// 資源：?
	RES_NOW["rice"]		= parseInt( $("rice").innerHTML,     10 );	// 資源：糧
	RES_NOW["storagemax"]	= parseInt( $("rice_max").innerHTML, 10 );	// 창고容量

	var OverFlowLimit  = Math.floor(RES_NOW["storagemax"] * 0.95);		// 限界容量（창고の95%）
	var ChangeSigenNum = Math.floor(RES_NOW["storagemax"] * 0.05);		// ?換量（창고の5%）

	// 資源：木石?が限界を超えている場合
	if ( (RES_NOW["wood"] > OverFlowLimit) && (RES_NOW["stone"] > OverFlowLimit) && (RES_NOW["iron"] > OverFlowLimit) ) {
		var max_sigen = 0;
		if (RES_NOW["wood"]  > max_sigen) { max_sigen = RES_NOW["wood"];  ChangeSigenNum = Math.floor(RES_NOW["wood"]  * 0.01); }
		if (RES_NOW["stone"] > max_sigen) { max_sigen = RES_NOW["stone"]; ChangeSigenNum = Math.floor(RES_NOW["stone"] * 0.01); }
		if (RES_NOW["iron"]  > max_sigen) { max_sigen = RES_NOW["iron"];  ChangeSigenNum = Math.floor(RES_NOW["iron"]  * 0.01); }


		if(RES_NOW["wood"] == max_sigen) {
			changeResorceToResorce(WOOD,  ChangeSigenNum, RICE, ichiba_x, ichiba_y); 
		} else if(RES_NOW["stone"] == max_sigen) {
			changeResorceToResorce(STONE, ChangeSigenNum, RICE, ichiba_x, ichiba_y); 
		} else if(RES_NOW["iron"] == max_sigen) {
			changeResorceToResorce(IRON,  ChangeSigenNum, RICE, ichiba_x, ichiba_y);
		}

	}
	// 資源：木が限界を超えているか？
	if (RES_NOW["wood"] > OverFlowLimit) {
		// 一番少ない資源を探せ！
		var min_sigen = 9999999999;
		if (RES_NOW["stone"] < min_sigen) { min_sigen = RES_NOW["stone"]; }
		if (RES_NOW["iron"]  < min_sigen) { min_sigen = RES_NOW["iron"]; }

		if(RES_NOW["stone"] == min_sigen) {
			changeResorceToResorce(WOOD, ChangeSigenNum, STONE, ichiba_x, ichiba_y); 
		} else if(RES_NOW["iron"] == min_sigen) {
			changeResorceToResorce(WOOD, ChangeSigenNum, IRON, ichiba_x, ichiba_y); 
		}
	}

	// 資源：石が限界を超えているか？
	if (RES_NOW["stone"] > OverFlowLimit) {
		// 一番少ない資源を探せ！
		var min_sigen = 9999999999;
		if (RES_NOW["wood"]  < min_sigen) { min_sigen = RES_NOW["wood"]; }
		if (RES_NOW["iron"]  < min_sigen) { min_sigen = RES_NOW["iron"]; }

		if(RES_NOW["wood"] == min_sigen) {
			changeResorceToResorce(STONE, ChangeSigenNum, WOOD, ichiba_x, ichiba_y); 
		} else if(RES_NOW["iron"] == min_sigen) {
			changeResorceToResorce(STONE, ChangeSigenNum, IRON, ichiba_x, ichiba_y); 
		}
	}

	// 資源：?が限界を超えているか？
	if (RES_NOW["iron"] > OverFlowLimit) {
		// 一番少ない資源を探せ！
		var min_sigen = 9999999999;
		if (RES_NOW["wood"]  < min_sigen) { min_sigen = RES_NOW["wood"]; }
		if (RES_NOW["stone"] < min_sigen) { min_sigen = RES_NOW["stone"]; }

		if(RES_NOW["wood"] == min_sigen) {
			changeResorceToResorce(IRON, ChangeSigenNum, WOOD, ichiba_x, ichiba_y); 
		} else if(RES_NOW["stone"] == min_sigen) {
			changeResorceToResorce(IRON, ChangeSigenNum, STONE, ichiba_x, ichiba_y); 
		}
	}

	// 資源：糧が限界を超えているか？
	if (RES_NOW["rice"] > OverFlowLimit) {
		// 一番少ない資源を探せ！
		var min_sigen = 9999999999;
		if (RES_NOW["wood"]  < min_sigen) { min_sigen = RES_NOW["wood"]; }
		if (RES_NOW["stone"] < min_sigen) { min_sigen = RES_NOW["stone"]; }
		if (RES_NOW["iron"]  < min_sigen) { min_sigen = RES_NOW["iron"]; }

		if(RES_NOW["wood"] == min_sigen) {
			changeResorceToResorce(RICE, ChangeSigenNum, WOOD, ichiba_x, ichiba_y); 
		} else if(RES_NOW["stone"] == min_sigen) {
			changeResorceToResorce(RICE, ChangeSigenNum, STONE, ichiba_x, ichiba_y); 
		} else if(RES_NOW["iron"] == min_sigen) {
			changeResorceToResorce(RICE, ChangeSigenNum, IRON, ichiba_x, ichiba_y);
		}
	}
}


//시장?換처리
function ichibaChange(vId) {

debugLog("=== Start ichibaChange ===");

	var ichiba_x = -1; //시장のX座標
	var ichiba_y = -1; //시장のY座標
	var ichiba_lv = -1; //시장のレベル

	var area = new Array();
	area = get_area();
	for(i=0;i<area.length;i++){
		//시장の座標を取得
		if(area[i].name == "시장") {
			var Temp = area[i].xy.split(",");
			ichiba_x = Temp[0];
			ichiba_y = Temp[1];
			ichiba_lv = area[i].lv;
		}
	}

	if(ichiba_x < 0) {
		delShopList(vId);
	} else {
		// 시장がある마을ID?座標?レベルを保管
		addShopList(vId,ichiba_lv,ichiba_x,ichiba_y);
	}

	if(OPT_ICHIBA != 1) {
		//alert("시장자동?換未指定");
		return;
	}


	var RES_NOW = [];
	RES_NOW["wood"] = parseInt( $("wood").innerHTML, 10 );
	RES_NOW["stone"] = parseInt( $("stone").innerHTML, 10 );
	RES_NOW["iron"] = parseInt( $("iron").innerHTML, 10 );
	RES_NOW["rice"] = parseInt( $("rice").innerHTML, 10 );
	RES_NOW["storagemax"] = parseInt( $("rice_max").innerHTML, 10 );

	var CHG_NOW = [];
	CHG_NOW["wood"] = 1;
	CHG_NOW["stone"] = 1;
	CHG_NOW["iron"] = 1;
/*
	var OverFlowLimit  = RES_NOW["storagemax"];		// 限界容量（창고の100%）

	if ( (RES_NOW["wood"] = OverFlowLimit) && (RES_NOW["stone"] = OverFlowLimit) && (RES_NOW["iron"] = OverFlowLimit) ) {
		// 木石?が100%の場合
		if (RES_NOW["rice"] = OverFlowLimit) {
			// 糧も100%の場合各資源の1%を기부する
			var c={};
			c['contributionForm'] = "";
			c['wood']  = Math.floor(RES_NOW["wood"]  * 0.01);
			c['stone'] = Math.floor(RES_NOW["stone"] * 0.01);
			c['iron']  = Math.floor(RES_NOW["iron"]  * 0.01);
			c['rice']  = Math.floor(RES_NOW["rice"]  * 0.01);
			c['contribution'] = 1;
			j$.post("http://"+HOST+"/alliance/level.php",c,function(){});
			var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
		}
		return;
	}
*/

	// @@ 2011.06.22 설정上限が0以下の場合창고上限に?更
	if (OPT_MAX_WOOD  < 1) { OPT_MAX_WOOD  = RES_NOW["storagemax"]; }
	if (OPT_MAX_STONE < 1) { OPT_MAX_STONE = RES_NOW["storagemax"]; }
	if (OPT_MAX_IRON  < 1) { OPT_MAX_IRON  = RES_NOW["storagemax"]; }

	if (RES_NOW["wood"]  >= OPT_MAX_WOOD) {	CHG_NOW["wood"]  = 0; }
	if (RES_NOW["stone"] >= OPT_MAX_STONE){	CHG_NOW["stone"] = 0; }
	if (RES_NOW["iron"]  >= OPT_MAX_IRON) {	CHG_NOW["iron"]  = 0; }

	// 全部上限を超えていて
	if ( ( CHG_NOW["wood"] + CHG_NOW["stone"] + CHG_NOW["iron"] ) == 0 ) {
		// 자동기부も未설정の場合全部?換?象にする
		if ( OPT_KIFU == 0 ) {
			CHG_NOW["wood"] = 1;
			CHG_NOW["stone"] = 1;
			CHG_NOW["iron"] = 1;
		}
	}

	//糧が指定量より多いか체크
	if(RES_NOW["rice"] < OPT_RISE_MAX) {
		return;
	}
	if( OPT_RISE_MAX == 0) {
		return;
	}

// 一番시장レベルの高い거점へジャンプ 2012.04.13
	var shoplist = cloadData(HOST+"ShopList","[]",true,true);
	if (shoplist.length == 0) { return; }
	shoplist.sort( function(a,b) { if (a[1] < b[1]) return 1; if (a[1] > b[1]) return -1; return 0;});
	if (vId != shoplist[0].vId) {
		// 一番시장のレベルの高い거점へ移動
		var villages = loadVillages(HOST+PGNAME);
		var nextIndex = -1;
		for(var i=0; i<villages.length;i++){
	    	if(shoplist[0].vId == villages[i][IDX_XY]){
	            nextIndex = i;
		        break;
		    }
		}
		if (nextIndex != -1) {
			ShopFlg = true;
			ShopURL = villages[nextIndex][IDX_URL];
		}
		return;
	}

	if(OPT_ICHIBA_PATS[0] == OPT_ICHIBA_PA){

		if (OPT_TO_WOOD+OPT_TO_STONE+OPT_TO_IRON == 0) {
			return;
		}

		var min_sigen = 9999999999;


		if((OPT_TO_WOOD  > 0) && (RES_NOW["wood"]  < min_sigen && CHG_NOW["wood"] == 1)) { min_sigen = RES_NOW["wood"] };
		if((OPT_TO_STONE > 0) && (RES_NOW["stone"] < min_sigen && CHG_NOW["stone"] == 1)) { min_sigen = RES_NOW["stone"]; }
		if((OPT_TO_IRON  > 0) && (RES_NOW["iron"]  < min_sigen && CHG_NOW["iron"] == 1)) { min_sigen = RES_NOW["iron"]; }

		//糧から他の資源に返還開始
		if((OPT_TO_WOOD > 0) && ( RES_NOW["wood"] == min_sigen )) {
			changeResorceToResorce(RICE, OPT_TO_WOOD, WOOD, ichiba_x, ichiba_y);
		} else if((OPT_TO_STONE > 0) && ( RES_NOW["stone"] == min_sigen )) {
			changeResorceToResorce(RICE, OPT_TO_STONE, STONE, ichiba_x, ichiba_y);
		} else if((OPT_TO_IRON > 0) && ( RES_NOW["iron"] == min_sigen )) {
			changeResorceToResorce(RICE, OPT_TO_IRON, IRON, ichiba_x, ichiba_y);
		}
//		var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
		return;
	}else{

		if(OPT_RISE_MAX < OPT_TO_WOOD+OPT_TO_STONE+OPT_TO_IRON){
//			alert("?換する?合計より糧の値を大きくしてください。");
		}else{
			if(CHG_NOW["wood"]			== 1)	{
				changeResorceToResorce(RICE, OPT_TO_WOOD,		WOOD,		ichiba_x,	ichiba_y);
			}
			if(CHG_NOW["stone"] 		== 1)	{
				changeResorceToResorce(RICE, OPT_TO_STONE,	STONE,	ichiba_x,	ichiba_y);
			}
			if(CHG_NOW["iron"]	== 1)	{
				changeResorceToResorce(RICE, OPT_TO_IRON,		IRON,		ichiba_x,	ichiba_y);
			}

		}
//		var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
		return;
	}

	function addShopList(vId,lv,x,y) {
		var flg = 0;
		var shoplist = cloadData(HOST+"ShopList","[]",true,true);
		for (var i=0 ; i<shoplist.length ; i++) {
			if (shoplist[i].vId == vId) {
				shoplist[i].vId = vId;
				shoplist[i].lv = lv;
				shoplist[i].x = x;
				shoplist[i].y = y;
				flg = 1;
			}
		}
		if (flg == 0){
			shoplist.push({"vId":vId, "lv":lv, "x":x, "y":y });
		}
		csaveData(HOST+"ShopList",shoplist,true,true);
		// 시장情報が更新されたら表示しなおし
		if ( getStayMode() ) {
			closeIniBilderBox()
			openIniBilderBox()
		}
	}

	function delShopList(vId) {
		var shoplist = cloadData(HOST+"ShopList","[]",true,true);
		for (var i=0;i<shoplist.length;i++){
			if (shoplist[i].vId == vId) {
				shoplist.splice(i,1);
				csaveData(HOST+"ShopList",shoplist,true,true);
			}
		}
		// 시장情報が更新されたら表示しなおし
		if ( getStayMode() ) {
			closeIniBilderBox()
			openIniBilderBox()
		}
	}
}

//실제 변환 처리 통신부 @@
function changeResorceToResorce(from, tc, to, x, y) {

	var c={};
	c['x'] = parseInt(x);
	c['y'] = parseInt(y);
	c['change_btn'] = encodeURIComponent("はい");
	c['tc'] = parseInt(tc);
	c['st'] = 1;
	c['tf_id'] = parseInt(from);
	c['tt_id'] = parseInt(to);
	j$.post("http://"+HOST+"/facility/facility.php?x="+parseInt(x)+"&y="+parseInt(y)+"#ptop",c,function(){});
	var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);

}

//자동기부처리
function autoDonate() {

debugLog("=== Start autoDonate ===");

	if(OPT_KIFU != 1) {
		//alert("자동기부未指定");
		return;
	}

	//糧が指定量より多いか체크
	if($("rice").innerHTML < OPT_RISE_KIFU_MAX) {
		return;
	}


	sendDonate(OPT_RISE_KIFU);
//@@@
//	var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);

}

//기부처리通信部
function sendDonate(rice) {
/*
	var data = "contributionForm=&wood=0&stone=0&iron=0&rice="+rice+"&contribution=1";
	var tid=unsafeWindow.setTimeout(function(){
		GM_xmlhttpRequest({
			method:"POST", 
			url:"http://"+HOST+"/alliance/level.php",
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data: data,
//			onload:function(x){console.log(x.responseText);}
			onload:function(x){;}
		});
	},INTERVAL);
*/
	var c={};
	c['contributionForm'] = "";
	c['wood'] = 0;
	c['stone'] = 0;
	c['iron'] = 0;
	c['rice'] = parseInt(rice);
	c['contribution'] = 1;
	j$.post("http://"+HOST+"/alliance/level.php",c,function(){});
	var tid=unsafeWindow.setTimeout(function(){location.reload(false);},INTERVAL);
}

//내정スキルの사용
function Auto_Domestic() {

debugLog("=== Start Auto Domestic ===");

	DomesticFlg = false;

	var tid=unsafeWindow.setTimeout(function(){
		GM_xmlhttpRequest({
			method:"GET", 
			url:"http://"+HOST+"/card/domestic_setting.php",
			headers:{"Content-type":"text/html"},
			overrideMimeType:'text/html; charset=utf-8',
			onload:function(x){
				
				var htmldoc = document.createElement("html");
			        htmldoc.innerHTML = x.responseText;
			        
	 		       	var skillElem = document.evaluate('//td[@class="skill"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for(i=0;i<skillElem.snapshotLength;i++){
					var skillTag = trim(skillElem.snapshotItem(i).innerHTML);
					var AutoSkillFlg = 0;

					for(z=1;z<DASkill.length;z++){
						if( (OPT_DOME[z]==1) && ( (skillTag.indexOf(DASkill[z],0) > 1)) ){
							var link = skillTag.substring(skillTag.indexOf("href=",0)+6,skillTag.indexOf("\"",skillTag.indexOf("href=",0)+7));
							do {
								link = link.replace(/&amp;/,"&");
							}while(link.indexOf("&amp;",0) > 1)
							DomesticFlg    = true;

							GM_xmlhttpRequest({	method:"GET", url:"http://"+HOST+link, headers:{"Content-type":"text/html"}, overrideMimeType:'text/html; charset=utf-8',	onload:function(x){
								debugLog("내정スキル사용");
								if (OPT_BLD == "AC") { 	setVillageFacility();	}	// 거점건축체크
								if (OPT_BLD == "BS") { 	setVillageFacility2();	}	// 숙사ビルド＆スクラッチ

								getSoldier();			    // 자동造兵처리
								autoLvup();			    // 자동武器?防具?化
								ichibaChange(vId);		    // 시장처리
								autoDonate();			    // 자동기부처리

								DomesticFlg = false;
							} });
							while(1){
								if (DomesticFlg == false) {
									debugLog("== END Auto_Domestic==");
									break;
								}
								Thread.sleep(100);	// 100ms 停止
							}
							if (DomesticFlg == false) { break; }
						}
					}
				}
				debugLog("내정スキル未사용");
				if (OPT_BLD == "AC") { 	setVillageFacility();	}	// 거점건축체크
				if (OPT_BLD == "BS") { 	setVillageFacility2();	}	// 숙사ビルド＆スクラッチ

				getSoldier();			    // 자동造兵처리
				autoLvup();			    // 자동武器?防具?化
				ichibaChange(vId);		    // 시장처리
				autoDonate();			    // 자동기부처리

			}
		});
	},INTERVAL);
}

///////////////////////////////////////////////
//Chrome用GM_??
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
	};

	GM_registerMenuCommand = function(name, funk) {
	//todo
	};

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};
}

function ccreateCheckBox0(container, id, def, text, title, left, villages)
{
	left += 2;

	var cb = d.createElement("input");
	cb.type = "checkbox";
	cb.style.verticalAlign = "middle";
	cb.id = id;
	//cb.value = 1;
	//if( def ) cb.checked = true;
	cb.checked  = def;
	cb.addEventListener("change", 
// @@@
		function() {
		    for (var i = 0; i < villages.length; i++) {
	            GM_setValue(HOST+PGNAME+"OPT_CHKBOX_AVC_" + i, document.getElementById('OPT_CHKBOX_AVC_' + i).checked);
	        }
		}, true);

	container.appendChild(cb);
	return cb;
}

// 2011.06.22
function ccreateCheckBoxKai2(container, id, def, text, title, left )
{

	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "1px";
	dv.style.paddingLeft= left + "px";

	dv.title = title;
	var cb = d.createElement("input");
	cb.type = "checkbox";
	cb.style.verticalAlign = "middle";
	cb.id = id + def;
	cb.value = 1;

	var def2 = id  + ""  + "[" + def + "]";

	if( eval(def2) ) cb.checked = true;
	
	var lb = d.createElement("label");
	lb.htmlFor = id;
	lb.style.verticalAlign = "middle";
	
	var tx = d.createTextNode(text);
	tx.fontsize = "10px";
	lb.appendChild( tx );
	var tb = d.createElement("input");
	tb.type = "text";
	tb.id = id + "LV" + def;
	tb.value = eval(id  + "LV"  + "[" + def + "]");
	tb.style.verticalAlign = "middle";
	tb.style.textAlign = "right";
	tb.style.paddingRight = "3px";
	tb.size = 4;
	
	dv.appendChild(cb);
	dv.appendChild(lb);
	dv.appendChild(tb);
	container.appendChild(dv);
	return cb;
}

function JSSleep(sec) {
	var start = new Date;
	while (1) {
		var cur = new Date;
		if (sec * 1000 <= cur.getTime() - start.getTime()) {
			break;
		}
	}
}
///////////////////////////////////////////////
// Time 部分の追加
///////////////////////////////////////////////
function sortAction(actions) {
	actions.sort(function(val1, val2) {
		var diff = (new Date(val1[IDX2_TIME])).getTime() 
			- (new Date(val2[IDX2_TIME])).getTime();
		return diff;
	});
	return actions;
}

//거점작업하는 동안 정보를
function getVillageActions() {
	var data = new Array();
	//거점이름을 검색
	var baseNameElem = document.evaluate(
		'//*[@id="basepoint"]/span[@class="basename"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	data[IDX_BASE_NAME] = trim(baseNameElem.snapshotItem(0).innerHTML);
	
	//좌표를 가져
	var xyElem = document.evaluate('//*[@id="basepoint"]/span[@class="xy"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	data[IDX_XY] = trim(xyElem.snapshotItem(0).innerHTML);
	
	//건설정보를
	var actionsElem = document.evaluate('//*[@id="actionLog"]/ul/li',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var actions1 = new Array();
	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		var newAction = new Array();
		
		//ステ?タス
		var buildStatusElem = document.evaluate('./span[@class="buildStatus"]/a', paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var buildStatus;
		if (buildStatusElem.snapshotLength > 0) {
			//시설건설
			var buildstr = trim(document.evaluate('./span[@class="buildStatus"]', paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML).substr(0,2);
			if (buildstr == "건설") {
				newAction[IDX2_DELETE] = false;
				buildStatus = "건설:" + trim(buildStatusElem.snapshotItem(0).innerHTML);
			} else {
				newAction[IDX2_DELETE] = true;
				buildStatus = "삭제:" + trim(buildStatusElem.snapshotItem(0).innerHTML);
			}
		} else {
/*
			buildStatusElem = document.evaluate('./span[@class="buildStatus"]',	paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (buildStatusElem.snapshotItem(0).innerHTML.match(/?化/)) {
				continue;
			}
			var tempStr1 = buildStatusElem.snapshotItem(0).innerHTML.split("を");
			buildStatus = "연구소:" + tempStr1[0];
			newAction[IDX2_DELETE] = false;
*/
			continue;
		}
		newAction[IDX2_ROTATION] = 0;
		newAction[IDX2_TYPE] = TYPE_CONSTRUCTION;
		newAction[IDX2_STATUS] = buildStatus;
		
		//施設건설完了時刻
		var buildClockElem = document.evaluate('./span[@class="buildClock"]', paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var clock = buildClockElem.snapshotItem(0).innerHTML;
		newAction[IDX2_TIME] = generateDateString(computeTime(clock));

//		console.log(generateDateString(computeTime(clock)));

		actions1.push(newAction);
	}
	
	//건설情報を永?保存
	data[IDX_ACTIONS] = actions1;
	saveVillage(data, TYPE_CONSTRUCTION);
	
	//行軍情報を取得
	var actionsElem = document.evaluate(
		'//*[@id="action"]/div[@class="floatInner"]/ul/li',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var actions2 = new Array();
	for (var i = 0; i < actionsElem.snapshotLength; i++) {
		var paItem = actionsElem.snapshotItem(i);
		var newAction = new Array();
		newAction[IDX2_TYPE] = TYPE_MARCH;
		newAction[IDX2_DELETE] = false;
		newAction[IDX2_ROTATION] = 0;
		
		//ステ?タス
		var statusElem = document.evaluate('./a',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var status = trim(statusElem.snapshotItem(0).innerHTML);
		newAction[IDX2_STATUS] = "行軍:" + status;
		
		//完了時刻
		var buildClockElem = document.evaluate('./span',
			paItem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var clock = buildClockElem.snapshotItem(0).innerHTML;
		newAction[IDX2_TIME] = generateDateString(computeTime(clock));

		actions2.push(newAction);
	}
	
	//行軍情報を永?保存
	data[IDX_ACTIONS] = actions2;
	saveVillage(data, TYPE_MARCH);
	if ( getStayMode() ) {
		closeIniBilderBox()
		openIniBilderBox()
	}
}

//거점情報を保存
function saveVillage(newData, type) {
	var allData = loadVillages(location.hostname+PGNAME);
	
	//新?デ?タをマ?ジ
	var exists = false;
	for (var i = 0; i < allData.length; i++) {
		var villageData = allData[i];
		
		//作業リスト更新
		if (villageData[IDX_XY] == newData[IDX_XY]) {
			exists = true;
			villageData[IDX_BASE_NAME] = newData[IDX_BASE_NAME];
			
			var actions = villageData[IDX_ACTIONS];
			for (var j = actions.length - 1; j >= 0; j--) {
				if (actions[j][IDX2_TYPE] != type) continue;
				var endTime = new Date(actions[j][IDX2_TIME]);
				var nowTime = new Date();
				if (isNaN(endTime.valueOf()) || endTime > nowTime) actions.splice(j, 1);
			}
			villageData[IDX_ACTIONS] = actions.concat(newData[IDX_ACTIONS]);
		}
		
		allData[i] = villageData;
	}
	if (!exists) allData.push(newData);
	//Greasemonkey領域へ永?保存
	saveVillages(HOST+PGNAME, allData);
}

//各作業行生成
function createActionDiv(action, nowTime, baseXy, host) {
	var type = action[IDX2_TYPE].charAt(0);
//	if (getDispMode(type) == DISP_MODE_NONE) {
//		return undefined;
//	}

	var actionDiv = document.createElement("div");
	if ( action[IDX2_DELETE] == "true" ) {
		actionDiv.style.backgroundColor = "#BBDDDD";
	}
	//作業完了背景色
	var actionTime = new Date(action[IDX2_TIME]);
	if (actionTime < nowTime) {
		actionDiv.style.backgroundColor = COLOR_TITLE;
	}

	//作業完了時刻
	var textSpan = document.createElement("span");
	var text = "";
	text += action[IDX2_TIME].replace(/^[0-9]{4}\//, "");
//	if (getDispWaitTime()) {
		var finishTime = new Date(action[IDX2_TIME]);
		text += " (あと" + generateWaitTimeString(finishTime, nowTime) + ")";
//	}
	text += " ";
	text += action[IDX2_STATUS];
	textSpan.innerHTML = text;
	actionDiv.appendChild(textSpan);
	
	//作業完了行の個別삭제링크
	if (actionTime < nowTime) {
		var delLink = document.createElement("a");
		delLink.title = "確認?にして삭제します";
		delLink.href = "javascript:void(0);";
		delLink.style.color = "#E86D61";
		delLink.innerHTML = "?";
		
		var key = host + DELIMIT1 + baseXy + DELIMIT1 + action[IDX2_TIME];
		delLink.addEventListener("click", 
			(function(key_) {
				return function() { deleteAction(key_); }
			})(key), true);
		actionDiv.appendChild(delLink);
	}
	
	return actionDiv;
}

function confirmTimer() {
	//基準時刻より前の作業情報を삭제
	var hosts = getTargetHosts();
	for (var ii = 0; ii < hosts.length; ii++) {
		var baseTime = new Date();
//		var baseTime = new Date(document.getElementById("openTime").innerHTML);
		var villages = loadVillages(hosts[ii] + PGNAME);
		for (var i = 0; i < villages.length; i++) {
			var actions = villages[i][IDX_ACTIONS];
			for (var j = actions.length - 1; j >=0 ; j--) {
				var actionTime = new Date(actions[j][IDX2_TIME]);
				if (actionTime <= baseTime) {
					actions.splice(j, 1);
				}
			}
			villages[i][IDX_ACTIONS] = actions;
		}
		
		//保存
		saveVillages(hosts[ii] + PGNAME, villages);
	}
	
	//更新後?容で表示
/*
	if ( getStayMode() ) {
		closeIniBilderBox()
		openIniBilderBox()
	}
*/
	closeIniBilderBox()
	openIniBilderBox()

}

//通知?象ホスト
function getTargetHosts() {
	var hosts = new Array();
	var dispOtherHosts = GM_getValue(location.hostname + "_disp_other_hosts", false);
	if (dispOtherHosts) {
		hosts = loadHosts();
	} else {
		hosts[0] = location.hostname;
	}
	return hosts;
}

function deleteAction(key) {
	var hosts = getTargetHosts();
	for (var ii = 0; ii < hosts.length; ii++) {
		var villages = loadVillages(hosts[ii] + PGNAME);
		var exists = false;
		villageLoop:
		for (var i = 0; i < villages.length; i++) {
			for (var j = 0; j < villages[i][IDX_ACTIONS].length; j++) {
				var action = villages[i][IDX_ACTIONS][j];
				var curKey = hosts[ii] + DELIMIT1 + 
					villages[i][IDX_XY] + DELIMIT1 + action[IDX2_TIME];
				if (key == curKey) {
					exists = true;
					villages[i][IDX_ACTIONS].splice(j, 1);
					break villageLoop;
				}
			}
		}
		
		//見つかったら更新
		if (exists) {
			saveVillages(hosts[ii] + PGNAME, villages);
			closeIniBilderBox();
			openIniBilderBox();
			return;
		}
	}
}

//施設?作業中取得
function getTrainingSoldier(htmldoc) {
	var data = getMyVillage();
	data[IDX_ACTIONS] = new Array();
	var tt={};
	//施設名
	var facilityName = "";
	var h2Elem = document.evaluate('//*[@id="gray02Wrapper"]/h2', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (h2Elem.getSnapshotLength != 0) {
		facilityName = trim(h2Elem.snapshotItem(0).innerHTML);
	}
	// 작성?の兵?と兵種
	var mSolName = document.evaluate('//th[@class="mainTtl"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//	var mSolNum = document.evaluate('//td',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var mSolNum = document.evaluate('//*[@class="commonTables"]//td',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	// 작성できる兵種の種類?

	var mSolTypeT = document.evaluate('//table[@class="commonTables"]',htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (mSolTypeT.snapshotLength > 2) {
		var mSolType = document.evaluate('//*[@class="mainTtl"]',mSolTypeT.snapshotItem(1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for(var r=1;r < mSolType.snapshotLength;r++) {
			tt[r-1] = new Array()
			tt[r-1] = mSolType.snapshotItem(r).innerHTML
			var endflg = false;
			if (r > 1) {
				for (var q=0;q<r-1;q++) {
					if (tt[q] == mSolType.snapshotItem(r).innerHTML) {
						endflg = true;
						break;
					}
				}
			}
			if (endflg) {
				var mSolTypeNum = r - 1;
				break;
			}
		}
	}
	// 施設が最大レベルかの判?
	var commentNum = document.evaluate('//*[@class="lvupFacility"]/*[@class="main"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (commentNum.snapshotItem(0).innerHTML.match("最大レベル")) {
		maxLv = 3;
	} else {
		maxLv = 0;
	}

	//作業中情報取得
	var idx = 0; 
	while (1) {
		var actionType = TYPE_FACILITY + facilityName;

		var clockElem = document.evaluate('//*[@id=' + escapeXPathExpr("area_timer" + idx) + ']', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if (clockElem == undefined) {
			saveVillage(data, actionType);		// 연구소で未?究の場合過去の?究情報の삭제
			break;
		}
		
		var mainTtls = document.evaluate('../../../tr/th[@class="mainTtl"]', clockElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (mainTtls.snapshotLength == 0) break;
		var clock = trim(clockElem.innerHTML);
		if (clock == "") break;
		
		var mainTtlElem = mainTtls.snapshotItem(idx);
		if (mainTtlElem == undefined) break;
		var status = trim(mainTtlElem.innerHTML);
		if (status == "") break;

		var actionType = TYPE_FACILITY + facilityName;

		data[IDX_ACTIONS][idx] = new Array();

		if (facilityName == "대장간" || facilityName == "방어구공장" || facilityName == "연구소") { 
			data[IDX_ACTIONS][idx][IDX2_STATUS] = facilityName + ":" + status;
		} else {
			try {

				data[IDX_ACTIONS][idx][IDX2_STATUS] = facilityName + ":" + status + "(" + mSolNum.snapshotItem(8 + mSolTypeNum + (mSolTypeNum * 5) + (idx * 4) - (1 * maxLv)).innerHTML + ")";
			}catch(e) {
				data[IDX_ACTIONS][idx][IDX2_STATUS] = facilityName + ":" + status + " (error)";
			}

		}
		data[IDX_ACTIONS][idx][IDX2_TIME] = generateDateString(computeTime(clock));
		data[IDX_ACTIONS][idx][IDX2_TYPE] = actionType;
		data[IDX_ACTIONS][idx][IDX2_DELETE] = false;
		data[IDX_ACTIONS][idx][IDX2_ROTATION] = 0;
		
		idx++;
	}

	saveVillage(data, actionType);
}

function getMyVillage() {
	var ret = new Array();
	
	var xy=getMyXY();
	if(! xy){
		return ret;
	}
	var allData = loadVillages(location.hostname + PGNAME);
	for (var i = 0; i < allData.length; i++) {
		var villageData = allData[i];
		if (villageData[IDX_XY] == "("+xy+")") {
			ret[IDX_XY] = villageData[IDX_XY];
			ret[IDX_BASE_NAME] = villageData[IDX_BASE_NAME];
			return ret;
		}
	}
	
	return ret;
}

function getMyXY() {
	var d = document;
	var $x = function(xp,dc) {
		return document.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	var gnaviorgNav = d.getElementById("gnavi");
	if(gnaviorgNav) {
		var nowLoc = $x('id("gnavi")//a[contains(@href,"map.php")]');
	}else{
		var nowLoc = $x('id("gNav")//a[contains(@href,"map.php")]');
	}

	if (!nowLoc) return null;

	var xy = nowLoc.href.match(/x=([\-0-9]+)&y=([\-0-9]+)/i);
	if( xy ) {
		return xy[1]+","+xy[2];
	}
}
//내정スキル取得
function getDomesticSkill(htmldoc) {
	var data = getMyVillage();
	data[IDX_ACTIONS] = new Array();
	var i = -1;
	// 내정武?名
	var Name = document.evaluate('//td/a[@class="thickbox"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	// 사용中
	var useSkill = document.evaluate('//*[@class="use"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (useSkill.snapshotLength != 0) {
		i += 1;
		var clockElem = document.evaluate('//*[@id="area_timer0"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		if (clockElem != undefined) {
			var clock = trim(clockElem.innerHTML);
			data[IDX_ACTIONS][i] = new Array();
			var statusElem = document.evaluate('..', clockElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			var status = "사용";
			var nameLink = document.evaluate('../td/a',	statusElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			status = "내정:" + status + "(" + trim(Name.snapshotItem(1).innerHTML) + "：" + trim(nameLink.snapshotItem(0).innerHTML) + ")";
			data[IDX_ACTIONS][i][IDX2_STATUS] = status;
			data[IDX_ACTIONS][i][IDX2_TIME] = generateDateString(computeTime(clock));
			data[IDX_ACTIONS][i][IDX2_TYPE] = TYPE_DOMESTIC;
			data[IDX_ACTIONS][i][IDX2_DELETE] = false;
			data[IDX_ACTIONS][i][IDX2_ROTATION] = 0;
		}
	}
	// 회복中
	var RecoverySkill = document.evaluate('//*[@class="recovery"]', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (RecoverySkill.snapshotLength != 0) {
		if (useSkill.snapshotLength != 0) {
			// 사용中スキルがある

			for (var x = 0; x < useSkill.snapshotLength ; x++) {
				i += 1;
				data[IDX_ACTIONS][i] = new Array();

				var SkillName = RecoverySkill.snapshotItem(x).innerHTML.split("<");		// スキル名
				var t = RecoverySkill.snapshotItem(x).innerHTML.split("<span>"); 		// 회복時間
				var SkillRTime = t[1].substr(0,8);
				var status = "회복";
				status = "내정:" + status + "(" + trim(Name.snapshotItem(1).innerHTML) + "：" + SkillName[0] + ")";
				data[IDX_ACTIONS][i][IDX2_STATUS] = status;
				data[IDX_ACTIONS][i][IDX2_TIME] = generateDateString(computeTime(SkillRTime));
				data[IDX_ACTIONS][i][IDX2_TYPE] = TYPE_DOMESTIC;
				data[IDX_ACTIONS][i][IDX2_DELETE] = false;
				data[IDX_ACTIONS][i][IDX2_ROTATION] = 0;
			}
		} else {
			// 사용中スキルがない
			for (var x = 0; x < 3; x++) {
				var clockElem = document.evaluate('//*[@id=' + escapeXPathExpr("area_timer" + x) + ']', htmldoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
				if (clockElem != undefined) {
					var clock = trim(clockElem.innerHTML);
					i += 1;
					data[IDX_ACTIONS][i] = new Array();

					var SkillName = RecoverySkill.snapshotItem(x).innerHTML.split("<");		// スキル名
					var statusElem = document.evaluate('..', clockElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
					var status = "회복";
					var nameLink = document.evaluate('../td/a',	statusElem, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					status = "내정:" + status + "(" + trim(nameLink.snapshotItem(0).innerHTML) + "：" + SkillName[0] + ")";
					data[IDX_ACTIONS][i][IDX2_STATUS] = status;
					data[IDX_ACTIONS][i][IDX2_TIME] = generateDateString(computeTime(clock));
					data[IDX_ACTIONS][i][IDX2_TYPE] = TYPE_DOMESTIC;
					data[IDX_ACTIONS][i][IDX2_DELETE] = false;
					data[IDX_ACTIONS][i][IDX2_ROTATION] = 0;
				}
			}
		}
	}

	saveVillage(data, TYPE_DOMESTIC);
 	if ( getStayMode() ) {
		closeIniBilderBox()
		openIniBilderBox()
	}
}
//常駐モ?ド取得
function getStayMode() {
	var result = GM_getValue(location.hostname + "_stay_mode" + PGNAME, true);
	return result;
}

//상주모드 변경
function changeStayMode(value) {
	GM_setValue(location.hostname + "_stay_mode" + PGNAME, value);
}


//순회모드 검색
function getReverseMode() {
	var result = GM_getValue(location.hostname + "_reverse_mode" + PGNAME, false);
	return result;
}

//순회모드변경
function changeReverseMode(value) {
	GM_setValue(location.hostname + "_reverse_mode" + PGNAME, value);
}

//다음 완료시간 가져오기
function getNextTime(hostname, baseTime) {
	
	//一番早い作業完了時刻を取得
	var startTime = new Date("2099/12/31 23:59:59");
	var nextTime = startTime;
	var villages = loadVillages(location.hostname + PGNAME);
	nextURL = "";
	for (var i = 0; i < villages.length; i++) {
		var actions = villages[i][IDX_ACTIONS];
		for (var j = 0; j < actions.length; j++) {
			var actionTime = new Date(actions[j][IDX2_TIME]);
			if (actionTime > baseTime && actionTime < nextTime) {
				var type = actions[j][IDX2_TYPE].charAt(0);
				nextTime = actionTime;
				nextURL  = villages[i][IDX_URL];
				nextNAME = villages[i][IDX_BASE_NAME];
			}
		}
	}
	
	//作業中がなければ何もしない
	if (nextTime == startTime) nextTime = undefined;
	
	return nextTime;
}

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function escapeXPathExpr(text) {
    var matches = text.match(/[^"]+|"/g);

    function esc(t) {
        return t == '"' ? ('\'' + t + '\'') : ('"' + t + '"');
    }

    if (matches) {
        if (matches.length == 1) {
            return esc(matches[0]);
        }
        else {
            var results = [];
            for (var i = 0; i < matches.length; i ++) {
                results.push(esc(matches[i]));
            }
            return 'concat(' + results.join(', ') + ')';
        }
    }
    else {
        return '""';
    }
}

function forInt(num,def){
//	console.log(num + " : " + def);
	if (def == undefined) {		def = 0;	}
	if (isNaN(parseInt(num))) {
		return def;
	} else {
		return parseInt(num);
	}
}