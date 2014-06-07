// ==UserScript==
// @name           bro3_dasu
// @namespace      ブラウザ三国志 カード表示拡張と自動ブショーダス
// @version        2012.10.10
// @include        http://*.3gokushi.jp/*
// @include        https://*.3gokushi.jp/*
// @include        http://*.nexon.com/*
// @include        http://*.3gokushi.jp/card/exhibit_list.php*
// @include        http://*.3gokushi.jp/card/bid_list.php*
// @include        http://*.3gokushi.jp/card/busyobook_picture.php*
// @include        http://*.3gokushi.jp/busyodas/busyodas.php*
// @include        http://*.3gokushi.jp/busyodas/b3kuji.php*
// @include        http://*.3gokushi.jp/alliance/alliance_log.php*
// @icon           http://5zen.info/mikanbox/icon.png
// @description    ブラウザ三国志 カード表示拡張と自動ブショーダス
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/132183.meta.js
// @require        http://sizzlemctwizzle.com/updater.php?id=132183
//
// @resource bg_status_trans1	 https://lh5.googleusercontent.com/-DZRzFshn-D4/T7mXnX2-W4I/AAAAAAAAAVs/5ZFPkKsy9HI/s315/bg_status_trans1.png
// @resource bg_status_trans2	https://lh5.googleusercontent.com/-_rLGEzz1M9M/T7mXnj1FcsI/AAAAAAAAAVw/FBmowx5Ea3g/s315/bg_status_trans2.png
// @resource bg_status_trans3	https://lh4.googleusercontent.com/-sA1SSmBLEIU/T7mXn-aPwZI/AAAAAAAAAWA/bWSdsFVKvrY/s315/bg_status_trans3.png
// @resource bg_status_trans4	https://lh3.googleusercontent.com/-6AHHx_xH0Vw/T7mX4yt2ekI/AAAAAAAAAYY/I7u9Tcai9Ac/s315/bg_status_trans4.png
// @resource bg_status_trans5	https://lh6.googleusercontent.com/-uizMHeODcgo/T7mXovRivII/AAAAAAAAAWM/UgwyNwfxYwc/s315/bg_status_trans_hpnone.png
//
// @resource bg_status_ur_trans1	https://lh4.googleusercontent.com/-zy--sb6UAek/T7mXsp30DSI/AAAAAAAAAXE/30XfuBAUWow/s315/bg_status_ur_trans1.png
// @resource bg_status_ur_trans2	https://lh4.googleusercontent.com/-YrfNgPU8btg/T7mXsw0znVI/AAAAAAAAAW8/WfkVni0ppXk/s315/bg_status_ur_trans2.png
// @resource bg_status_ur_trans3	https://lh6.googleusercontent.com/-YBSgWmnCNJs/T7mXvu1eQcI/AAAAAAAAAXg/5ns-Gqifzu0/s315/bg_status_ur_trans3.png
// @resource bg_status_ur_trans4	https://lh3.googleusercontent.com/-qyhIBZFUAoM/T7mXt-_6YaI/AAAAAAAAAXQ/EM9orpQkU_0/s315/bg_status_ur_trans4.png
// @resource bg_status_ur_trans5	https://lh6.googleusercontent.com/-HQmomOZKanA/T7mXu0QpLdI/AAAAAAAAAXY/QGFJiu_qdNk/s315/bg_status_ur_trans_hpnone.png
//
// @resource bg_status_1	https://lh3.googleusercontent.com/-2DXBSb8-ZK4/T7mXlyWCryI/AAAAAAAAAVg/FtvR9v82qVA/s315/bg_status_r_new.png
// @resource bg_status_2	https://lh5.googleusercontent.com/-NPvqDfStGR8/T7mXmKlzJcI/AAAAAAAAAVc/MWFBFpgUVSA/s315/bg_status_r_new2.png
// @resource bg_status_3	https://lh5.googleusercontent.com/-pY7caIuEJAk/T7mXpCjbxPI/AAAAAAAAAWc/yEpTlH48U2Q/s315/bg_status_r_new3.png
// @resource bg_status_4	https://lh6.googleusercontent.com/-KipIDilvq2U/T7mXml9CeII/AAAAAAAAAVk/30jYoxFwlrY/s315/bg_status_r_new4.png
// @resource bg_status_5	https://lh6.googleusercontent.com/-Psf8t1MRf40/T7mXm-VhT5I/AAAAAAAAAVo/C2airGKlb6k/s315/bg_status_r_new_hpnone.png
//
// @resource bg_status_ur_1	https://lh5.googleusercontent.com/-pu1kQMxR7sA/T7mXrv_pmLI/AAAAAAAAAWo/Jf3qGWPMh_g/s315/bg_status_ur_new.png
// @resource bg_status_ur_2	https://lh4.googleusercontent.com/-7R9zHRvFj-A/T7mXqpUsjtI/AAAAAAAAAWg/cGTlqO01AUE/s315/bg_status_ur_new2.png
// @resource bg_status_ur_3	https://lh6.googleusercontent.com/-vobPvxXX09k/T7mXrS-HuRI/AAAAAAAAAWk/sgM7YrS9PjI/s315/bg_status_ur_new3.png
// @resource bg_status_ur_4	https://lh3.googleusercontent.com/-HQFhMcVK36A/T7mXsA1B3YI/AAAAAAAAAWw/zItf07qMdQo/s315/bg_status_ur_new4.png
// @resource bg_status_ur_5	https://lh4.googleusercontent.com/-g-TYbcHcw-k/T7mXsBOagyI/AAAAAAAAAW0/6Dt9IYwWcto/s315/bg_status_ur_new_hpnone.png
//
// @resource hose		https://lh3.googleusercontent.com/-1z7uiUYD_Jo/T7mXvi3jACI/AAAAAAAAAXc/eu3O4RqBbe4/s21/hose.png
// @resource archery		https://lh3.googleusercontent.com/-C_Q3OMWAg50/T7mXl1YuGcI/AAAAAAAAAVY/oeGCkV_DQ4I/s21/archery.png
// @resource spear	 	https://lh3.googleusercontent.com/-bS0iFJs9wCo/T7mXwXFIjeI/AAAAAAAAAX8/wRlqkEklErU/s21/spear.png
// @resource soldier		https://lh4.googleusercontent.com/-ocWMCizHb54/T7mXwQDlM-I/AAAAAAAAAXs/Hnag5yJtqUw/s21/soldier.png
// @resource lv			https://lh6.googleusercontent.com/-5bkj2AIvppU/T7mXwCFUW5I/AAAAAAAAAXk/uSRFTtZVHC8/s12/lv.png

// @resource old_village	http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/village_bg.jpg
// @resource Spring_village	http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/village_bg_spring.jpg
// @resource Summer_village	http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/village_bg_summer.jpg
// @resource Autumn_village	http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/village_bg_autumn.jpg
// @resource Winter_village	http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/village_bg_winter.jpg

// @resource old_map		http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/map_bg.gif
// @resource Spring_map		http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/map_bg_spring.gif
// @resource Summer_map		http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/map_bg_summer.gif
// @resource Autumn_map		http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/map_bg_autumn.gif
// @resource Winter_map		http://m17.3gokushi.jp/20120525-01/extend_project/w760/img/common/map_bg_winter.gif


// ==/UserScript==

// 2012.05.14		適当にリリース
// 2012.05.15		兵舎修練が2個あったので1個を兵舎訓練に修正
//			合成レシピの表示時にポイントの振り分けを考慮（ただし隠しについては未対応）
//			トレードまわりでの表示を拡張
//			ブショーダスで引いたカードに合成レシピ重ねて表示するように修正
//			ブショーデュエル書簡で裏面スキル名のみ表面に表示
//			デッキ画面でカード表示以外の場合にカードをクリックした時の表示がおかしかったのを修正（LVUP表示だけ治んない(´；ω；｀)ｳｯ…
// 2012.05.16		張任の番号を修正
//			合成時に合成確率を表示。（取得済みスキルは表示しない）
//			不思議スキル「兵器の突撃」を「兵器の極撃」に修正
//			合成対象がR以外表示がおかしくなるのを修正
// 2012.05.17		自動カードダスの設定画面が治ってなかったのを修正
//			９・１２・１５枚表示時にカード詳細表示した際の表示を調教
//			トレード出品時に合成レシピの表示を追加
// 2012.05.18		スケスケモード実装
// 2012.05.21		カード画像置き場を Picasa に変更
//			スケスケ設定を自動ダス設定内に追加
//			自動ダスに「弓兵の進攻」を追加
//			自動ダス設定がちゃんと保存・読込されていなかったのを修正
// 2012.05.22		出兵画面・内政画面も透け透け対応
//			自動ダス設定に“趁火打劫”を追加
//			マウスオーバー時の枠のサイズを修正
// 2012.05.26		拠点表示を切り替える機能を追加（要ソース編集）
//			ラベル未設定の背景画像変更
// 2012.05.27		５月武将データ追加
//			拠点画像変更設定を設定に追加
//			破棄除外カード設定を３０枚まで拡張
//			拠点以外も変更するように修正
// 2012.07.03		№2112・2113・3100・3101・3102・4083・4084を追加
//			陳宮の合成レシピ修正
//			オートダス設定に「騎兵の進攻」「騎兵の聖域」を追加
// 2012.07.23		№1107・1108・2114・2115・3103・4085・4086を追加
// 2012.09.11		自動破棄対象外に水鏡(4079/4080/4081/4082)を追加
//			SP他追加武将 №4087・4088・4089・4090を追加 thx.hasekun
//			９月追加武将 №3104・4091・3105・2116・4092・1109・4093を追加 thx.hasekun
// 2012.10.10		10月追加武将 №1110・1111・1112・2117・2118・3107・3108を追加 thx.hasekun & LAST

jQuery.noConflict();
j$ = jQuery;

var PGNAME = "_Auto_Busho_Das_5zen_v2012.05.27";	//グリモン領域への保存時のPGの名前
var VERSION = "2012.09.11";				// バージョン情報
var HOST = location.hostname;				//アクセスURLホスト
var OPT_SEASON = "DF";					// 標準は変更しない

var SukesukeFlg;					//自動ダス設定画面での設定

// 画像リソース配列
var bg_status		= [];
var bg_status_ur	= [];

var d = document;
//                                1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4 4 4 4 4 4 4 4 4 4 5
//		1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0
var OPT_DOME = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//                                   1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3 3 3 3 3 3 3 3 4 4 4 4 4 4 4 4 4 4 5
//		 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0
var OPT_OTHER = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var DrawResult = ["","","","","","","","","",""];

var g_MD="";

// 保存データデリミタ
var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var DELIMIT3 = "{=]";
var DELIMIT4 = "|-/";

var Skill_List = [
				[ "剣兵の進撃",		 1 ],	[ "騎兵の進撃",		 2 ],	[ "槍兵の進撃",		 3 ],	[ "弓兵の進撃",		 4 ],	[ "兵器の進撃",		 5 ],
				[ "剣兵の強撃",		 6 ],	[ "騎兵の強撃",		 7 ],	[ "槍兵の強撃",		 8 ],	[ "弓兵の強撃",		 9 ],	[ "兵器の強撃",		10 ],
				[ "剣兵の猛撃",		11 ],	[ "騎兵の猛撃",		12 ],	[ "槍兵の猛撃",		13 ],	[ "弓兵の猛撃",		14 ],	[ "兵器の猛撃",		15 ],
				[ "剣兵の極撃",		16 ],	[ "騎兵の極撃",		17 ],	[ "槍兵の極撃",		18 ],	[ "弓兵の極撃",		19 ],	[ "兵器の極撃",		20 ],
				[ "剣兵突撃",		21 ],	[ "騎兵突撃",		22 ],	[ "槍兵突撃",		23 ],	[ "弓兵突撃",		24 ],	[ "兵器突撃",		25 ],
				[ "剣兵突覇",		26 ],	[ "騎兵突覇",		27 ],	[ "槍兵突覇",		28 ],	[ "弓兵突覇",		29 ],	[ "兵器突覇",		30 ],
								[ "騎兵の進攻",		32 ],	[ "槍兵の進攻",		33 ],	[ "弓兵の進攻",		34 ],
				[ "奇計百出",		36 ],	[ "英雄",		37 ],	[ "覇道",		38 ],	[ "豪傑",		39 ],	[ "一騎当千",		40 ],
				[ "蛮族の襲撃", 	41 ],	[ "蛮王の襲撃", 	42 ],	[ "趁火打劫",		43 ],

				[ "剣兵防御",		51 ],	[ "騎兵防御",		52 ],	[ "槍兵防御",		53 ],	[ "弓兵防御",		54 ],	[ "兵器防御",		55 ],
				[ "剣兵方陣",		56 ],	[ "騎兵方陣",		57 ],	[ "槍兵方陣",		58 ],	[ "弓兵方陣",		59 ],	[ "兵器方陣",		60 ],
								[ "騎兵の聖域",		62 ],	[ "槍兵の聖域",		63 ],	[ "弓兵の聖域",		64 ],
								[ "騎兵堅守",		67 ],	[ "槍兵堅守",		68 ],	[ "弓兵堅守",		69 ],
				[ "八卦の陣",		71 ],	[ "鉄壁",		72 ],	[ "守護神",		73 ],


				[ "剣兵行軍",		81 ],	[ "騎兵行軍",		82 ],	[ "槍兵行軍",		83 ],	[ "弓兵行軍",		84 ],	[ "兵器行軍",		85 ],
				[ "剣兵強行",		86 ],	[ "騎兵強行",		87 ],	[ "槍兵強行",		88 ],	[ "弓兵強行",		89 ],	[ "兵器強行",		90 ],
				[ "急速援護",		91 ],	[ "千里行",		92 ],	[ "神速",		93 ],

				[ "伐採知識",		101 ],	[ "石切知識",		102 ],	[ "製鉄知識",		103 ],	[ "食糧知識",		104 ],
				[ "伐採技術",		106 ],	[ "石切技術",		107 ],	[ "製鉄技術",		101 ],	[ "食糧技術",		109 ],

				[ "練兵訓練",		111 ],	[ "厩舎訓練",		112 ],	[ "兵舎訓練",		113 ],	[ "弓兵訓練",		114 ],	[ "兵器訓練",		115 ],
				[ "練兵修練",		116 ],	[ "厩舎修練",		117 ],	[ "兵舎修練",		118 ],	[ "弓兵修練",		119 ],	[ "兵器修練",		120 ],
				[ "呉の治世",		121 ],	[ "王佐の才",		122 ],	[ "仁君",		123 ],

				[ "加工知識",		126 ],	[ "加工技術",		127 ],					[ "農林技術",		129 ]
			];
var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };

// 色設定
var COLOR_FRAME	= "#333333";	// 枠背景色
var COLOR_BASE	= "#654634";	// 拠点リンク色
var COLOR_TITLE	= "#FFCC00";	// 各BOXタイトル背景色
var COLOR_BACK	= "#FFF2BB";	// 各BOX背景色

 var card_list = 	{
    "1001" : {	name : "劉備"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 260, Int : 10 ,	Def1 : 330,	Def2 : 265,	Def3 : 155,	Def4 : 420, Speed : 10,	Skill0 : "仁君"			, Skill1 : "槍兵の強撃"		, Skill2 : "兵舎修練"		, Skill3 : "覇道"			, Skill4 : "八卦の陣"		},
    "1002" : {	name : "諸葛亮"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 400, Int : 25 ,	Def1 : 495,	Def2 : 390,	Def3 : 270,	Def4 : 685, Speed : 10,	Skill0 : "神算鬼謀"		, Skill1 : "兵器の極撃"		, Skill2 : "八卦の陣"		, Skill3 : "覇道"			, Skill4 : "神医の術式"		},
    "1003" : {	name : "関羽"		, Rate : "SR",	Cost : 4.0	, Army : "槍",	Atk : 475, Int : 13 ,	Def1 : 625,	Def2 : 490,	Def3 : 290,	Def4 : 840, Speed : 15,	Skill0 : "軍神"			, Skill1 : "一騎当千"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "飛将"		},
    "1004" : {	name : "張飛"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 360, Int : 7  ,	Def1 : 295,	Def2 : 255,	Def3 : 90 ,	Def4 : 495, Speed : 10,	Skill0 : "槍兵の猛撃"		, Skill1 : "槍兵の強撃"		, Skill2 : "槍兵堅守"		, Skill3 : "石切技術"			, Skill4 : "槍兵の極撃"		},
    "1005" : {	name : "趙雲"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 335, Int : 10 ,	Def1 : 345,	Def2 : 155,	Def3 : 525,	Def4 : 300, Speed : 13,	Skill0 : "騎兵突撃"		, Skill1 : "騎兵強行"		, Skill2 : "騎兵堅守"		, Skill3 : "千里行"			, Skill4 : "騎兵の猛撃"		},
    "1006" : {	name : "馬超"		, Rate : "SR",	Cost : 3.0	, Army : "騎",	Atk : 350, Int : 5  ,	Def1 : 322,	Def2 : 145,	Def3 : 490,	Def4 : 280, Speed : 14,	Skill0 : "騎兵の猛撃"		, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵堅守"		, Skill3 : "製鉄技術"			, Skill4 : "騎兵の極撃"		},
    "1007" : {	name : "劉備"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 245, Int : 10 ,	Def1 : 325,	Def2 : 260,	Def3 : 150,	Def4 : 440, Speed : 10,	Skill0 : "仁君"			, Skill1 : "槍兵の強撃"		, Skill2 : "兵舎修練"		, Skill3 : "覇道"			, Skill4 : "八卦の陣"		},
    "1008" : {	name : "諸葛亮"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 190, Int : 17 ,	Def1 : 275,	Def2 : 370,	Def3 : 210,	Def4 : 150, Speed : 9 ,	Skill0 : "食糧知識"		, Skill1 : "食糧知識"		, Skill2 : "剣兵行軍"		, Skill3 : "厩舎訓練"			, Skill4 : "食糧技術"		},
    "1009" : {	name : "諸葛亮"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 190, Int : 16 ,	Def1 : 260,	Def2 : 360,	Def3 : 200,	Def4 : 140, Speed : 9 ,	Skill0 : "奇計百出"		, Skill1 : "伐採技術"		, Skill2 : "弓兵修練"		, Skill3 : "剣兵突覇"			, Skill4 : "守護神"		},
    "1010" : {	name : "関羽"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 270, Int : 7  ,	Def1 : 295,	Def2 : 265,	Def3 : 144,	Def4 : 445, Speed : 10,	Skill0 : "槍兵の進撃"		, Skill1 : "槍兵の進撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強撃"		},
    "1011" : {	name : "関羽"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 285, Int : 7  ,	Def1 : 300,	Def2 : 270,	Def3 : 135,	Def4 : 455, Speed : 10,	Skill0 : "槍兵の進撃"		, Skill1 : "槍兵の進撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強撃"		},
    "1012" : {	name : "張飛"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 290, Int : 4  ,	Def1 : 230,	Def2 : 210,	Def3 : 70 ,	Def4 : 390, Speed : 10,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "1013" : {	name : "張飛"		, Rate : "C",	Cost : 2.5	, Army : "槍",	Atk : 275, Int : 4  ,	Def1 : 230,	Def2 : 210,	Def3 : 70 ,	Def4 : 390, Speed : 10,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "1014" : {	name : "徐庶"		, Rate : "UC",	Cost : 2.0	, Army : "槍",	Atk : 220, Int : 15 ,	Def1 : 300,	Def2 : 240,	Def3 : 165,	Def4 : 415, Speed : 10,	Skill0 : "奇計百出"		, Skill1 : "伐採技術"		, Skill2 : "弓兵修練"		, Skill3 : "剣兵突覇"			, Skill4 : "守護神"		},
    "1015" : {	name : "黄忠"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 235, Int : 5  ,	Def1 : 255,	Def2 : 385,	Def3 : 220,	Def4 : 115, Speed : 9 ,	Skill0 : "弓兵突撃"		, Skill1 : "弓兵強行"		, Skill2 : "弓兵堅守"		, Skill3 : "千里行"			, Skill4 : "弓兵の猛撃"		},
    "1016" : {	name : "龐統"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 240, Int : 23 ,	Def1 : 260,	Def2 : 140,	Def3 : 360,	Def4 : 200, Speed : 13,	Skill0 : "兵器の進撃"		, Skill1 : "兵器訓練"		, Skill2 : "兵器防御"		, Skill3 : "兵器行軍"			, Skill4 : "兵器の強撃"		},
    "1017" : {	name : "廖化"		, Rate : "UC",	Cost : 2.0	, Army : "槍",	Atk : 205, Int : 5  ,	Def1 : 235,	Def2 : 215,	Def3 : 105,	Def4 : 360, Speed : 10,	Skill0 : "槍兵防御"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵堅守"		},
    "1018" : {	name : "廖化"		, Rate : "C",	Cost : 2.0	, Army : "槍",	Atk : 200, Int : 5  ,	Def1 : 225,	Def2 : 205,	Def3 : 100,	Def4 : 340, Speed : 10,	Skill0 : "槍兵防御"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵堅守"		},
    "1019" : {	name : "馬岱"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 245, Int : 6  ,	Def1 : 245,	Def2 : 110,	Def3 : 375,	Def4 : 215, Speed : 14,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "1020" : {	name : "馬岱"		, Rate : "C",	Cost : 2.5	, Army : "騎",	Atk : 235, Int : 6  ,	Def1 : 245,	Def2 : 110,	Def3 : 375,	Def4 : 215, Speed : 14,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "1021" : {	name : "周倉"		, Rate : "UC",	Cost : 2.0	, Army : "槍",	Atk : 220, Int : 4  ,	Def1 : 125,	Def2 : 130,	Def3 : 60 ,	Def4 : 235, Speed : 10,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "1022" : {	name : "関平"		, Rate : "UC",	Cost : 2.0	, Army : "槍",	Atk : 195, Int : 7  ,	Def1 : 205,	Def2 : 190,	Def3 : 95 ,	Def4 : 315, Speed : 10,	Skill0 : "槍兵の進撃"		, Skill1 : "槍兵の進撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強撃"		},
    "1023" : {	name : "伊籍"		, Rate : "UC",	Cost : 2.0	, Army : "歩",	Atk : 55 , Int : 12 ,	Def1 : 85 ,	Def2 : 40 ,	Def3 : 40 ,	Def4 : 40 , Speed : 8 ,	Skill0 : "伐採知識"		, Skill1 : "伐採知識"		, Skill2 : "槍兵行軍"		, Skill3 : "練兵訓練"			, Skill4 : "伐採技術"		},
    "1024" : {	name : "伊籍"		, Rate : "C",	Cost : 2.0	, Army : "歩",	Atk : 55 , Int : 12 ,	Def1 : 70 ,	Def2 : 35 ,	Def3 : 35 ,	Def4 : 35 , Speed : 8 ,	Skill0 : "伐採知識"		, Skill1 : "伐採知識"		, Skill2 : "槍兵行軍"		, Skill3 : "練兵訓練"			, Skill4 : "伐採技術"		},
    "1025" : {	name : "沙摩柯"		, Rate : "UC",	Cost : 1.5	, Army : "槍",	Atk : 155, Int : 1  ,	Def1 : 100,	Def2 : 95 ,	Def3 : 30 ,	Def4 : 165, Speed : 10,	Skill0 : "剣兵の進撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵行軍"			, Skill4 : "剣兵の強撃"		},
    "1026" : {	name : "沙摩柯"		, Rate : "C",	Cost : 1.5	, Army : "槍",	Atk : 145, Int : 1  ,	Def1 : 100,	Def2 : 95 ,	Def3 : 30 ,	Def4 : 165, Speed : 10,	Skill0 : "剣兵の進撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵行軍"			, Skill4 : "剣兵の強撃"		},
    "1027" : {	name : "簡雍"		, Rate : "UC",	Cost : 1.5	, Army : "歩",	Atk : 65 , Int : 9  ,	Def1 : 55 ,	Def2 : 25 ,	Def3 : 25 ,	Def4 : 25 , Speed : 8 ,	Skill0 : "食糧知識"		, Skill1 : "食糧知識"		, Skill2 : "剣兵行軍"		, Skill3 : "厩舎訓練"			, Skill4 : "食糧技術"		},
    "1028" : {	name : "簡雍"		, Rate : "C",	Cost : 1.5	, Army : "歩",	Atk : 65 , Int : 9  ,	Def1 : 45 ,	Def2 : 20 ,	Def3 : 20 ,	Def4 : 20 , Speed : 8 ,	Skill0 : "食糧知識"		, Skill1 : "食糧知識"		, Skill2 : "剣兵行軍"		, Skill3 : "厩舎訓練"			, Skill4 : "食糧技術"		},
    "1029" : {	name : "雷銅"		, Rate : "UC",	Cost : 2.0	, Army : "槍",	Atk : 195, Int : 5  ,	Def1 : 170,	Def2 : 155,	Def3 : 75 ,	Def4 : 255, Speed : 10,	Skill0 : "槍兵の進撃"		, Skill1 : "槍兵の進撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強撃"		},
    "1030" : {	name : "雷銅"		, Rate : "C",	Cost : 2.0	, Army : "槍",	Atk : 185, Int : 5  ,	Def1 : 170,	Def2 : 155,	Def3 : 75 ,	Def4 : 255, Speed : 10,	Skill0 : "槍兵の進撃"		, Skill1 : "槍兵の進撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強撃"		},
    "1031" : {	name : "魏延"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 265, Int : 7  ,	Def1 : 235,	Def2 : 215,	Def3 : 70 ,	Def4 : 400, Speed : 10,	Skill0 : "槍兵突撃"		, Skill1 : "槍兵強行"		, Skill2 : "槍兵堅守"		, Skill3 : "千里行"			, Skill4 : "槍兵の猛撃"		},
    "1032" : {	name : "魏延"		, Rate : "C",	Cost : 2.5	, Army : "槍",	Atk : 250, Int : 7  ,	Def1 : 235,	Def2 : 215,	Def3 : 70 ,	Def4 : 400, Speed : 10,	Skill0 : "槍兵の進撃"		, Skill1 : "槍兵の進撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強撃"		},
    "1033" : {	name : "馬謖"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 170, Int : 13 ,	Def1 : 200,	Def2 : 110,	Def3 : 280,	Def4 : 155, Speed : 13,	Skill0 : "製鉄知識"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵行軍"		, Skill3 : "弓兵訓練"			, Skill4 : "製鉄技術"		},
    "1034" : {	name : "馬謖"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 165, Int : 13 ,	Def1 : 190,	Def2 : 105,	Def3 : 260,	Def4 : 145, Speed : 13,	Skill0 : "剣兵の進撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵行軍"			, Skill4 : "剣兵の強撃"		},
    "1035" : {	name : "劉備"		, Rate : "SR",	Cost : 2.5	, Army : "槍",	Atk : 275, Int : 12 ,	Def1 : 355,	Def2 : 285,	Def3 : 165,	Def4 : 455, Speed : 10,	Skill0 : "昭烈帝"		, Skill1 : "槍兵突覇"		, Skill2 : "王者の護り"		, Skill3 : "軍神"			, Skill4 : "神算鬼謀"		},
    "1036" : {	name : "徐庶"		, Rate : "R",	Cost : 2.0	, Army : "槍",	Atk : 220, Int : 15 ,	Def1 : 320,	Def2 : 255,	Def3 : 175,	Def4 : 440, Speed : 10,	Skill0 : "八卦の陣"		, Skill1 : "兵器の猛撃"		, Skill2 : "剣兵の聖域"		, Skill3 : "槍兵方陣"			, Skill4 : "王者の護り"		},
    "1037" : {	name : "趙雲"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 425, Int : 17 ,	Def1 : 425,	Def2 : 380,	Def3 : 195,	Def4 : 650, Speed : 10,	Skill0 : "槍兵突覇"		, Skill1 : "槍兵突撃"		, Skill2 : "兵舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "1038" : {	name : "黄忠"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 265, Int : 11 ,	Def1 : 300,	Def2 : 455,	Def3 : 260,	Def4 : 135, Speed : 9 ,	Skill0 : "弓兵の猛撃"		, Skill1 : "弓兵の強撃"		, Skill2 : "弓兵堅守"		, Skill3 : "伐採技術"			, Skill4 : "弓兵の極撃"		},
    "1039" : {	name : "厳顔"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 225, Int : 4  ,	Def1 : 255,	Def2 : 385,	Def3 : 220,	Def4 : 115, Speed : 9 ,	Skill0 : "弓兵方陣"		, Skill1 : "弓兵堅守"		, Skill2 : "弓兵の強撃"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の聖域"		},
    "1040" : {	name : "厳顔"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 205, Int : 4  ,	Def1 : 255,	Def2 : 385,	Def3 : 220,	Def4 : 115, Speed : 9 ,	Skill0 : "弓兵堅守"		, Skill1 : "弓兵防御"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵方陣"		},
    "1041" : {	name : "姜維"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 400, Int : 22 ,	Def1 : 435,	Def2 : 390,	Def3 : 195,	Def4 : 665, Speed : 10,	Skill0 : "麒麟児"		, Skill1 : "槍兵の極撃"		, Skill2 : "一騎当千"		, Skill3 : "兵器の極撃"			, Skill4 : "神算鬼謀"		},
    "1042" : {	name : "魏延"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 280, Int : 8  ,	Def1 : 240,	Def2 : 220,	Def3 : 75 ,	Def4 : 410, Speed : 10,	Skill0 : "槍兵の猛撃"		, Skill1 : "槍兵の強撃"		, Skill2 : "槍兵堅守"		, Skill3 : "石切技術"			, Skill4 : "槍兵の極撃"		},
    "1043" : {	name : "馬超"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 290, Int : 3  ,	Def1 : 225,	Def2 : 95 ,	Def3 : 380,	Def4 : 195, Speed : 14,	Skill0 : "騎兵突覇"		, Skill1 : "騎兵突撃"		, Skill2 : "厩舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "1046" : {	name : "劉備"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 420, Int : 20 ,	Def1 : 520,	Def2 : 410,	Def3 : 240,	Def4 : 700, Speed : 11,	Skill0 : "昭烈帝"		, Skill1 : "槍兵突覇"		, Skill2 : "王者の護り"		, Skill3 : "軍神"			, Skill4 : "神算鬼謀"		},
    "1047" : {	name : "諸葛亮"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 400, Int : 26 ,	Def1 : 495,	Def2 : 390,	Def3 : 270,	Def4 : 685, Speed : 11,	Skill0 : "臥龍覚醒"		, Skill1 : "市場繁栄"		, Skill2 : "八卦の陣"		, Skill3 : "神算鬼謀"			, Skill4 : "神医の術式"		},
    "1048" : {	name : "関羽"		, Rate : "UR",	Cost : 4.0	, Army : "槍",	Atk : 485, Int : 14 ,	Def1 : 625,	Def2 : 490,	Def3 : 290,	Def4 : 840, Speed : 16,	Skill0 : "軍神"			, Skill1 : "一騎当千"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "飛将"		},
    "1049" : {	name : "趙雲"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 430, Int : 16 ,	Def1 : 530,	Def2 : 250,	Def3 : 710,	Def4 : 410, Speed : 14,	Skill0 : "強襲突覇"		, Skill1 : "神速"		, Skill2 : "鉄壁"		, Skill3 : "八卦の陣"			, Skill4 : "攻城の檄文"		},
    "1050" : {	name : "張飛"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 445, Int : 7  ,	Def1 : 500,	Def2 : 380,	Def3 : 220,	Def4 : 680, Speed : 11,	Skill0 : "槍兵の極撃"		, Skill1 : "槍兵突撃"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "槍兵突覇"		},
    "1051" : {	name : "馬超"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 435, Int : 7  ,	Def1 : 500,	Def2 : 220,	Def3 : 680,	Def4 : 380, Speed : 15,	Skill0 : "騎兵突覇"		, Skill1 : "騎兵突撃"		, Skill2 : "厩舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "1052" : {	name : "黄忠"		, Rate : "SR",	Cost : 3.0	, Army : "弓",	Atk : 310, Int : 13 ,	Def1 : 395,	Def2 : 495,	Def3 : 305,	Def4 : 185, Speed : 9 ,	Skill0 : "弓兵突覇"		, Skill1 : "弓兵突撃"		, Skill2 : "弓兵修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "1053" : {	name : "黄月英"		, Rate : "SR",	Cost : 1.0	, Army : "槍",	Atk : 10 , Int : 10 ,	Def1 : 90 ,	Def2 : 75 ,	Def3 : 75 ,	Def4 : 75 , Speed : 9 ,	Skill0 : "槍兵増強"		, Skill1 : "市場知識"		, Skill2 : "一騎当千"		, Skill3 : "槍兵増強"			, Skill4 : "強兵の檄文"		},
    "1054" : {	name : "甘夫人"		, Rate : "SR",	Cost : 1.0	, Army : "騎",	Atk : 10 , Int : 8  ,	Def1 : 70 ,	Def2 : 60 ,	Def3 : 60 ,	Def4 : 60 , Speed : 13,	Skill0 : "騎兵増強"		, Skill1 : "加工技術"		, Skill2 : "強襲突撃"		, Skill3 : "騎兵増強"			, Skill4 : "軍神"		},
    "1055" : {	name : "沙摩柯"		, Rate : "R",	Cost : 1.5	, Army : "槍",	Atk : 175, Int : 2  ,	Def1 : 110,	Def2 : 95 ,	Def3 : 35 ,	Def4 : 185, Speed : 10,	Skill0 : "強襲突撃"		, Skill1 : "伐採技術"		, Skill2 : "剣兵の聖域"		, Skill3 : "槍兵方陣"			, Skill4 : "強兵の檄文"		},
    "1056" : {	name : "張飛"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 335, Int : 5  ,	Def1 : 260,	Def2 : 235,	Def3 : 80 ,	Def4 : 440, Speed : 10,	Skill0 : "槍兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵の猛撃"		},
    "1057" : {	name : "龐統"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 220, Int : 17 ,	Def1 : 250,	Def2 : 140,	Def3 : 140,	Def4 : 140, Speed : 8 ,	Skill0 : "市場繁栄"		, Skill1 : "傾国"		, Skill2 : "富国"		, Skill3 : "豊穣"			, Skill4 : "弓将の采配"		},
    "1058" : {	name : "関平"		, Rate : "C",	Cost : 2.0	, Army : "槍",	Atk : 185, Int : 7  ,	Def1 : 205,	Def2 : 190,	Def3 : 95 ,	Def4 : 315, Speed : 10,	Skill0 : "急速援護"		, Skill1 : "千里行"		, Skill2 : "弓兵強行"		, Skill3 : "剣兵強行"			, Skill4 : "練兵修練"		},
    "1059" : {	name : "黄忠"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 230, Int : 5  ,	Def1 : 255,	Def2 : 385,	Def3 : 220,	Def4 : 115, Speed : 9 ,	Skill0 : "弓兵強行"		, Skill1 : "弓兵強行"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵の進撃"			, Skill4 : "八卦の陣"		},
    "1060" : {	name : "馬岱"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 260, Int : 7  ,	Def1 : 290,	Def2 : 155,	Def3 : 410,	Def4 : 260, Speed : 14,	Skill0 : "騎兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の猛撃"		},
    "1061" : {	name : "姜維"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 405, Int : 23 ,	Def1 : 440,	Def2 : 395,	Def3 : 200,	Def4 : 670, Speed : 11,	Skill0 : "槍将の采配"		, Skill1 : "槍兵突覇"		, Skill2 : "市場知識"		, Skill3 : "奇計百出"			, Skill4 : "麒麟児"		},
    "1062" : {	name : "劉備"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 420, Int : 20 ,	Def1 : 520,	Def2 : 410,	Def3 : 240,	Def4 : 700, Speed : 11,	Skill0 : "蜀軍の極撃"		, Skill1 : "槍兵の極撃"		, Skill2 : "富国"		, Skill3 : "王者の護り"			, Skill4 : "神算鬼謀"		},
    "1063" : {	name : "趙雲"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 280, Int : 8  ,	Def1 : 230,	Def2 : 70 ,	Def3 : 390,	Def4 : 210, Speed : 13,	Skill0 : "騎兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の猛撃"		},
    "1066" : {	name : "魏延"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 345, Int : 8  ,	Def1 : 310,	Def2 : 245,	Def3 : 130,	Def4 : 420, Speed : 10,	Skill0 : "槍兵の極撃"		, Skill1 : "槍兵突撃"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "槍兵突覇"		},
    "1067" : {	name : "糜夫人"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 9  ,	Def1 : 120,	Def2 : 90 ,	Def3 : 90 ,	Def4 : 90 , Speed : 8 ,	Skill0 : "豊穣"			, Skill1 : "弓兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "呉の治世"			, Skill4 : "富国"		},
    "1068" : {	name : "周倉"		, Rate : "R",	Cost : 2.0	, Army : "槍",	Atk : 260, Int : 4  ,	Def1 : 250,	Def2 : 230,	Def3 : 75 ,	Def4 : 395, Speed : 10,	Skill0 : "一騎当千"		, Skill1 : "槍兵突覇"		, Skill2 : "鉄壁"		, Skill3 : "加工知識"			, Skill4 : "魏王の号令"		},
    "1069" : {	name : "伊籍"		, Rate : "R",	Cost : 2.0	, Army : "歩",	Atk : 55 , Int : 16 ,	Def1 : 105,	Def2 : 50 ,	Def3 : 50 ,	Def4 : 50 , Speed : 8 ,	Skill0 : "伐採技術"		, Skill1 : "伐採知識"		, Skill2 : "槍兵強行"		, Skill3 : "練兵訓練"			, Skill4 : "農林知識"		},
    "1070" : {	name : "龐統"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 180, Int : 17 ,	Def1 : 240,	Def2 : 130,	Def3 : 330,	Def4 : 195, Speed : 13,	Skill0 : "兵器の強撃"		, Skill1 : "蛮族の襲撃"		, Skill2 : "兵器防御"		, Skill3 : "火神の攻勢"			, Skill4 : "兵器の猛撃"		},
    "1071" : {	name : "劉禅"		, Rate : "SR",	Cost : 1.0	, Army : "弓",	Atk : 20 , Int : 5  ,	Def1 : 195,	Def2 : 170,	Def3 : 90 ,	Def4 : 250, Speed : 10,	Skill0 : "蜀軍の防衛"		, Skill1 : "急速援護"		, Skill2 : "槍兵の聖域"		, Skill3 : "守護神"			, Skill4 : "迅速援護"		},
    "1072" : {	name : "厳顔"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 230, Int : 7  ,	Def1 : 265,	Def2 : 400,	Def3 : 260,	Def4 : 120, Speed : 9 ,	Skill0 : "弓兵修練"		, Skill1 : "豪傑"		, Skill2 : "弓兵方陣"		, Skill3 : "弓兵の強撃"			, Skill4 : "農林技術"		},
    "1073" : {	name : "黄忠"		, Rate : "R",	Cost : 3.0	, Army : "弓",	Atk : 350, Int : 12 ,	Def1 : 305,	Def2 : 420,	Def3 : 235,	Def4 : 125, Speed : 9 ,	Skill0 : "一騎当千"		, Skill1 : "槍兵突覇"		, Skill2 : "鉄壁"		, Skill3 : "加工知識"			, Skill4 : "魏王の号令"		},
    "1074" : {	name : "馬岱"		, Rate : "SR",	Cost : 3.0	, Army : "騎",	Atk : 340, Int : 8  ,	Def1 : 355,	Def2 : 160,	Def3 : 545,	Def4 : 345, Speed : 14,	Skill0 : "騎兵の極撃"		, Skill1 : "騎兵突撃"		, Skill2 : "騎兵方陣"		, Skill3 : "厩舎修練"			, Skill4 : "騎兵突覇"		},
    "1075" : {	name : "黄忠"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 440, Int : 13 ,	Def1 : 460,	Def2 : 700,	Def3 : 450,	Def4 : 210, Speed : 10,	Skill0 : "勇将飛矢"		, Skill1 : "弓兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "弓兵修練"			, Skill4 : "覇王の進撃"		},
    "1076" : {	name : "姜維"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 330, Int : 17 ,	Def1 : 330,	Def2 : 340,	Def3 : 150,	Def4 : 510, Speed : 10,	Skill0 : "奇計百出"		, Skill1 : "伐採技術"		, Skill2 : "弓兵修練"		, Skill3 : "剣兵突覇"			, Skill4 : "守護神"		},
    "1078" : {	name : "馬超"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 270, Int : 3  ,	Def1 : 225,	Def2 : 70 ,	Def3 : 380,	Def4 : 210, Speed : 14,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "1079" : {	name : "関羽"		, Rate : "UR",	Cost : 4.0	, Army : "槍",	Atk : 500, Int : 15 ,	Def1 : 625,	Def2 : 490,	Def3 : 290,	Def4 : 840, Speed : 16,	Skill0 : "武神"			, Skill1 : "一騎当千"		, Skill2 : "槍兵の聖域"		, Skill3 : "兵舎修練"			, Skill4 : "軍神"		},
    "1080" : {	name : "夏候覇"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 330, Int : 10 ,	Def1 : 450,	Def2 : 460,	Def3 : 160,	Def4 : 760, Speed : 10,	Skill0 : "槍兵突覇"		, Skill1 : "槍兵突撃"		, Skill2 : "兵舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "1081" : {	name : "法正"		, Rate : "SR",	Cost : 2.5	, Army : "槍",	Atk : 220, Int : 19 ,	Def1 : 260,	Def2 : 250,	Def3 : 140,	Def4 : 360, Speed : 10,	Skill0 : "槍兵の勝鬨"		, Skill1 : "槍兵の極撃"		, Skill2 : "槍兵の聖域"		, Skill3 : "槍兵突覇"			, Skill4 : "槍将の采配"		},
    "1082" : {	name : "馬謖"		, Rate : "R",	Cost : 2.0	, Army : "騎",	Atk : 200, Int : 15 ,	Def1 : 240,	Def2 : 135,	Def3 : 330,	Def4 : 220, Speed : 13,	Skill0 : "厩舎修練"		, Skill1 : "豪傑"		, Skill2 : "騎兵方陣"		, Skill3 : "騎兵の強撃"			, Skill4 : "加工技術"		},
    "1083" : {	name : "諸葛亮"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 400, Int : 27 ,	Def1 : 495,	Def2 : 685,	Def3 : 390,	Def4 : 270, Speed : 11,	Skill0 : "醒龍出師"		, Skill1 : "太平要術"		, Skill2 : "八卦の陣"		, Skill3 : "神算鬼謀"			, Skill4 : "弓兵の勝鬨"		},
    "1084" : {	name : "徐庶"		, Rate : "SR",	Cost : 3.0	, Army : "騎",	Atk : 310, Int : 21 ,	Def1 : 400,	Def2 : 220,	Def3 : 560,	Def4 : 390, Speed : 13,	Skill0 : "智将器撃"		, Skill1 : "兵器の極撃"		, Skill2 : "兵器強行"		, Skill3 : "製鉄技術"			, Skill4 : "神算鬼謀"		},
    "1085" : {	name : "王平"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 280, Int : 10 ,	Def1 : 355,	Def2 : 345,	Def3 : 195,	Def4 : 495, Speed : 10,	Skill0 : "守護神"		, Skill1 : "鉄壁"		, Skill2 : "槍兵方陣"		, Skill3 : "弓兵方陣"			, Skill4 : "王者の護り"		},
    "1086" : {	name : "張飛"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 470, Int : 8  ,	Def1 : 480,	Def2 : 365,	Def3 : 210,	Def4 : 660, Speed : 11,	Skill0 : "燕人武陣"		, Skill1 : "槍兵の極撃"		, Skill2 : "槍兵の聖域"		, Skill3 : "槍将の采配"			, Skill4 : "軍神"		},
    "1087" : {	name : "関興"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 430, Int : 10 ,	Def1 : 450,	Def2 : 420,	Def3 : 220,	Def4 : 680, Speed : 10,	Skill0 : "槍兵の猛撃"		, Skill1 : "槍兵の強撃"		, Skill2 : "槍兵堅守"		, Skill3 : "石切技術"			, Skill4 : "槍兵の極撃"		},
    "1088" : {	name : "関平"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 280, Int : 10 ,	Def1 : 300,	Def2 : 140,	Def3 : 460,	Def4 : 270, Speed : 13,	Skill0 : "千里行"		, Skill1 : "兵器強行"		, Skill2 : "騎兵方陣"		, Skill3 : "食糧技術"			, Skill4 : "神速"		},
    "1089" : {	name : "劉備"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 260, Int : 10 ,	Def1 : 330,	Def2 : 265,	Def3 : 155,	Def4 : 420, Speed : 10,	Skill0 : "八卦の陣"		, Skill1 : "兵器の猛撃"		, Skill2 : "剣兵の聖域"		, Skill3 : "槍兵方陣"			, Skill4 : "王者の護り"		},
    "1090" : {	name : "関羽"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 270, Int : 7  ,	Def1 : 295,	Def2 : 265,	Def3 : 144,	Def4 : 445, Speed : 10,	Skill0 : "槍兵突撃"		, Skill1 : "槍兵強行"		, Skill2 : "槍兵堅守"		, Skill3 : "千里行"			, Skill4 : "槍兵の猛撃"		},
    "1091" : {	name : "張飛"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 290, Int : 4  ,	Def1 : 230,	Def2 : 210,	Def3 : 70 ,	Def4 : 390, Speed : 10,	Skill0 : "槍兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵の猛撃"		},
    "1092" : {	name : "魏延"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 450, Int : 12 ,	Def1 : 410,	Def2 : 360,	Def3 : 130,	Def4 : 680, Speed : 11,	Skill0 : "拠点襲撃"		, Skill1 : "槍戟鬼神"		, Skill2 : "槍兵の聖域"		, Skill3 : "兵舎修練"			, Skill4 : "槍兵の大極撃"	},
    "1093" : {	name : "沙摩柯"		, Rate : "SR",	Cost : 2.0	, Army : "槍",	Atk : 280, Int : 2  ,	Def1 : 140,	Def2 : 120,	Def3 : 45 ,	Def4 : 235, Speed : 10,	Skill0 : "胡王の猛襲"		, Skill1 : "蛮王の襲撃"		, Skill2 : "兵器強行"		, Skill3 : "覇道"			, Skill4 : "強襲突覇"		},
    "1094" : {	name : "馬超"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 430, Int : 5  ,	Def1 : 420,	Def2 : 150,	Def3 : 820,	Def4 : 420, Speed : 14,	Skill0 : "軍神"			, Skill1 : "一騎当千"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "飛将"		},
    "1095" : {	name : "趙雲"		, Rate : "UR",	Cost : 4.0	, Army : "騎",	Atk : 500, Int : 20 ,	Def1 : 520,	Def2 : 235,	Def3 : 785,	Def4 : 450, Speed : 14,	Skill0 : "蜀将の督戦"		, Skill1 : "槍兵の極撃"		, Skill2 : "槍兵の聖域"		, Skill3 : "石切技術"			, Skill4 : "神算鬼謀"		},
    "1096" : {	name : "関索"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 400, Int : 10 ,	Def1 : 470,	Def2 : 420,	Def3 : 145,	Def4 : 800, Speed : 10,	Skill0 : "勇美鼓舞"		, Skill1 : "一騎当千"		, Skill2 : "富国"		, Skill3 : "守護神"			, Skill4 : "傾国"		},
    "1097" : {	name : "劉封"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 250, Int : 8  ,	Def1 : 345,	Def2 : 525,	Def3 : 300,	Def4 : 155, Speed : 9 ,	Skill0 : "守護堅陣"		, Skill1 : "槍兵方陣"		, Skill2 : "弓兵方陣"		, Skill3 : "騎兵方陣"			, Skill4 : "覇道"		},
    "1098" : {	name : "劉備"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 460, Int : 21 ,	Def1 : 535,	Def2 : 420,	Def3 : 245,	Def4 : 675, Speed : 11,	Skill0 : "皇叔の号令"		, Skill1 : "昭烈帝"		, Skill2 : "王者の護り"		, Skill3 : "豊穣"			, Skill4 : "神医の術式"		},
    "1099" : {	name : "黄忠"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 430, Int : 13 ,	Def1 : 430,	Def2 : 655,	Def3 : 375,	Def4 : 195, Speed : 9 ,	Skill0 : "老将統帥"		, Skill1 : "隣地猛攻"		, Skill2 : "守護神"		, Skill3 : "弓兵増強"			, Skill4 : "勇将飛矢"		},
    "1100" : {	name : "糜夫人"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10 ,	Def1 : 120,	Def2 : 90 ,	Def3 : 90 ,	Def4 : 90 , Speed : 8 ,	Skill0 : "憂姫護国"		, Skill1 : "覇道"		, Skill2 : "兵器強行"		, Skill3 : "農林知識"			, Skill4 : "飛将"		},
    "1101" : {	name : "関羽"		, Rate : "UC",	Cost : 3.0	, Army : "槍",	Atk : 350, Int : 9  ,	Def1 : 345,	Def2 : 310,	Def3 : 155,	Def4 : 525, Speed : 10,	Skill0 : "槍兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵の猛撃"		},
    "1102" : {	name : "姜維"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 430, Int : 23 ,	Def1 : 440,	Def2 : 395,	Def3 : 200,	Def4 : 670, Speed : 11,	Skill0 : "麒麟慈心"		, Skill1 : "万夫不当"		, Skill2 : "槍兵の聖域"		, Skill3 : "富国"			, Skill4 : "槍兵の大極撃"	},
    "1103" : {	name : "関銀屏"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 320, Int : 12 ,	Def1 : 320,	Def2 : 290,	Def3 : 100,	Def4 : 545, Speed : 10,	Skill0 : "槍兵の猛攻"		, Skill1 : "槍兵の強攻"		, Skill2 : "槍兵堅守"		, Skill3 : "石切技術"			, Skill4 : "槍兵の猛撃"		},
    "1104" : {	name : "夏候氏"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 8  ,	Def1 : 80 ,	Def2 : 65 ,	Def3 : 65 ,	Def4 : 65 , Speed : 8 ,	Skill0 : "恵風"			, Skill1 : "騎兵の極撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "英雄"			, Skill4 : "市場知識"		},
    "1105" : {	name : "馬謖"		, Rate : "SR",	Cost : 2.5	, Army : "歩",	Atk : 230, Int : 18 ,	Def1 : 300,	Def2 : 160,	Def3 : 160,	Def4 : 160, Speed : 8 ,	Skill0 : "矛槍兵移送"		, Skill1 : "強襲突覇"		, Skill2 : "槍兵の聖域"		, Skill3 : "兵舎修練"			, Skill4 : "槍兵の極撃"		},
    "1106" : {	name : "龐統"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 360, Int : 27 ,	Def1 : 480,	Def2 : 380,	Def3 : 260,	Def4 : 665, Speed : 11,	Skill0 : "連環の計"		, Skill1 : "深慮遠謀"		, Skill2 : "城壁補強"		, Skill3 : "槍兵増強"			, Skill4 : "兵器の極撃"		},
    "1107" : {	name : "張飛"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 400, Int : 5  ,	Def1 : 430,	Def2 : 395,	Def3 : 130,	Def4 : 730, Speed : 10,	Skill0 : "猛虎進撃"		, Skill1 : "槍兵突覇"		, Skill2 : "八卦の陣"		, Skill3 : "急速擁護"			, Skill4 : "槍兵の極撃"		},
    "1108" : {	name : "王平"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 260, Int : 9  ,	Def1 : 340,	Def2 : 295,	Def3 : 155,	Def4 : 515, Speed : 10,	Skill0 : "槍兵方陣"		, Skill1 : "槍兵堅守"		, Skill2 : "槍兵の強撃"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵の聖域"		},
    "1109" : {	name : "夏侯覇"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 280, Int : 9  ,	Def1 : 380,	Def2 : 330,	Def3 : 170,	Def4 : 580, Speed : 10,	Skill0 : "趁火打劫"		, Skill1 : "豪傑"		, Skill2 : "厩舎訓練"		, Skill3 : "鉄壁"			, Skill4 : "奇計百出"		},
    "1110" : {	name : "劉備"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 435, Int : 20 ,	Def1 : 505,	Def2 : 400,	Def3 : 235,	Def4 : 645, Speed : 13, Skill0 : "槍兵の極攻"		, Skill1 : "槍兵の猛撃"		, Skill2 : "兵舎修練"		, Skill3 : "槍兵の聖域"			, Skill4 : "槍兵の猛攻"		},
    "1111" : {	name : "周倉"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 345, Int : 4  ,	Def1 : 335,	Def2 : 300,	Def3 : 100,	Def4 : 565, Speed : 13, Skill0 : "迅速劫略"		, Skill1 : "槍兵突覇"		, Skill2 : "神速援護"		, Skill3 : "千里行"			, Skill4 : "猛将の鹵獲"		},
    "1112" : {	name : "関興"		, Rate : "R" ,	Cost : 3.0	, Army : "槍",	Atk : 330, Int : 8  ,	Def1 : 355,	Def2 : 320,	Def3 : 110,	Def4 : 605, Speed : 10, Skill0 : "発憤興起"		, Skill1 : "強襲速撃"		, Skill2 : "槍兵方陣"		, Skill3 : "鉄壁"			, Skill4 : "槍兵増強"		},

    "2001" : {	name : "曹操"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 415, Int : 22 ,	Def1 : 520,	Def2 : 240,	Def3 : 700,	Def4 : 410, Speed : 13,	Skill0 : "魏王の号令"		, Skill1 : "騎兵突覇"		, Skill2 : "騎兵の聖域"		, Skill3 : "厩舎修練"			, Skill4 : "富国"		},
    "2002" : {	name : "司馬懿"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 385, Int : 24 ,	Def1 : 535,	Def2 : 290,	Def3 : 740,	Def4 : 420, Speed : 13,	Skill0 : "深慮遠謀"		, Skill1 : "兵舎修練"		, Skill2 : "王佐の才"		, Skill3 : "農林知識"			, Skill4 : "攻城の檄文"		},
    "2003" : {	name : "荀彧"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 25 , Int : 15 ,	Def1 : 135,	Def2 : 190,	Def3 : 105,	Def4 : 55 , Speed : 9 ,	Skill0 : "王佐の才"		, Skill1 : "兵器修練"		, Skill2 : "兵器の猛撃"		, Skill3 : "呉の治世"			, Skill4 : "傾国"		},
    "2004" : {	name : "夏侯惇"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 275, Int : 6  ,	Def1 : 310,	Def2 : 140,	Def3 : 475,	Def4 : 280, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "2005" : {	name : "張遼"		, Rate : "SR",	Cost : 3.0	, Army : "騎",	Atk : 320, Int : 11 ,	Def1 : 390,	Def2 : 170,	Def3 : 595,	Def4 : 330, Speed : 13,	Skill0 : "覇王の進撃"		, Skill1 : "騎兵の猛撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "覇道"			, Skill4 : "飛将"		},
    "2006" : {	name : "張郃"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 270, Int : 8  ,	Def1 : 315,	Def2 : 145,	Def3 : 480,	Def4 : 285, Speed : 13,	Skill0 : "騎兵突撃"		, Skill1 : "騎兵強行"		, Skill2 : "騎兵堅守"		, Skill3 : "千里行"			, Skill4 : "騎兵の猛撃"		},
    "2007" : {	name : "曹操"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 310, Int : 16 ,	Def1 : 370,	Def2 : 170,	Def3 : 500,	Def4 : 295, Speed : 13,	Skill0 : "英雄"			, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵堅守"		, Skill3 : "奇計百出"			, Skill4 : "覇道"		},
    "2008" : {	name : "曹操"		, Rate : "UC",	Cost : 3.0	, Army : "騎",	Atk : 300, Int : 15 ,	Def1 : 370,	Def2 : 170,	Def3 : 500,	Def4 : 295, Speed : 13,	Skill0 : "英雄"			, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵堅守"		, Skill3 : "奇計百出"			, Skill4 : "覇道"		},
    "2009" : {	name : "夏侯惇"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 260, Int : 6  ,	Def1 : 305,	Def2 : 140,	Def3 : 465,	Def4 : 275, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "2010" : {	name : "夏侯淵"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 275, Int : 5  ,	Def1 : 270,	Def2 : 410,	Def3 : 235,	Def4 : 120, Speed : 9 ,	Skill0 : "弓兵の進撃"		, Skill1 : "弓兵の進撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強撃"		},
    "2011" : {	name : "夏侯淵"		, Rate : "C",	Cost : 2.5	, Army : "弓",	Atk : 265, Int : 5  ,	Def1 : 270,	Def2 : 410,	Def3 : 235,	Def4 : 120, Speed : 9 ,	Skill0 : "弓兵の進撃"		, Skill1 : "弓兵の進撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強撃"		},
    "2012" : {	name : "許褚"		, Rate : "UC",	Cost : 3.0	, Army : "槍",	Atk : 230, Int : 3  ,	Def1 : 390,	Def2 : 340,	Def3 : 120,	Def4 : 665, Speed : 10,	Skill0 : "槍兵防御"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵堅守"		},
    "2013" : {	name : "典韋"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 225, Int : 4  ,	Def1 : 395,	Def2 : 345,	Def3 : 120,	Def4 : 675, Speed : 10,	Skill0 : "鉄壁"			, Skill1 : "槍兵堅守"		, Skill2 : "豪傑"		, Skill3 : "騎兵堅守"			, Skill4 : "守護神"		},
    "2014" : {	name : "曹仁"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 245, Int : 6  ,	Def1 : 320,	Def2 : 145,	Def3 : 490,	Def4 : 290, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "2015" : {	name : "曹仁"		, Rate : "C",	Cost : 2.5	, Army : "騎",	Atk : 245, Int : 6  ,	Def1 : 305,	Def2 : 140,	Def3 : 465,	Def4 : 275, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "2016" : {	name : "徐晃"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 275, Int : 9  ,	Def1 : 320,	Def2 : 245,	Def3 : 175,	Def4 : 440, Speed : 10,	Skill0 : "槍兵突撃"		, Skill1 : "槍兵強行"		, Skill2 : "槍兵堅守"		, Skill3 : "千里行"			, Skill4 : "槍兵の猛撃"		},
    "2017" : {	name : "于禁"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 185, Int : 9  ,	Def1 : 245,	Def2 : 110,	Def3 : 375,	Def4 : 225, Speed : 13,	Skill0 : "騎兵防御"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵の進撃"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵堅守"		},
    "2018" : {	name : "于禁"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 185, Int : 8  ,	Def1 : 245,	Def2 : 110,	Def3 : 375,	Def4 : 225, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "2019" : {	name : "張郃"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 255, Int : 8  ,	Def1 : 310,	Def2 : 140,	Def3 : 475,	Def4 : 280, Speed : 13,	Skill0 : "騎兵突撃"		, Skill1 : "騎兵強行"		, Skill2 : "騎兵堅守"		, Skill3 : "千里行"			, Skill4 : "騎兵の猛撃"		},
    "2020" : {	name : "蔡瑁"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 180, Int : 9  ,	Def1 : 235,	Def2 : 360,	Def3 : 205,	Def4 : 105, Speed : 9 ,	Skill0 : "弓兵の進撃"		, Skill1 : "弓兵の進撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強撃"		},
    "2021" : {	name : "蔡瑁"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 175, Int : 9  ,	Def1 : 225,	Def2 : 340,	Def3 : 195,	Def4 : 100, Speed : 9 ,	Skill0 : "弓兵防御"		, Skill1 : "伐採知識"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵堅守"		},
    "2022" : {	name : "文聘"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 225, Int : 8  ,	Def1 : 305,	Def2 : 265,	Def3 : 140,	Def4 : 465, Speed : 10,	Skill0 : "槍兵防御"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵堅守"		},
    "2023" : {	name : "文聘"		, Rate : "C",	Cost : 2.5	, Army : "槍",	Atk : 225, Int : 7  ,	Def1 : 305,	Def2 : 265,	Def3 : 140,	Def4 : 465, Speed : 10,	Skill0 : "槍兵防御"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵堅守"		},
    "2024" : {	name : "張魯"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 70 , Int : 11 ,	Def1 : 170,	Def2 : 240,	Def3 : 160,	Def4 : 80 , Speed : 9 ,	Skill0 : "食糧知識"		, Skill1 : "食糧知識"		, Skill2 : "剣兵行軍"		, Skill3 : "厩舎訓練"			, Skill4 : "食糧技術"		},
    "2025" : {	name : "張魯"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 70 , Int : 11 ,	Def1 : 150,	Def2 : 220,	Def3 : 145,	Def4 : 70 , Speed : 9 ,	Skill0 : "食糧知識"		, Skill1 : "食糧知識"		, Skill2 : "剣兵行軍"		, Skill3 : "厩舎訓練"			, Skill4 : "食糧技術"		},
    "2026" : {	name : "曹真"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 225, Int : 9  ,	Def1 : 240,	Def2 : 110,	Def3 : 365,	Def4 : 210, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "2027" : {	name : "張允"		, Rate : "UC",	Cost : 1.5	, Army : "弓",	Atk : 130, Int : 4  ,	Def1 : 165,	Def2 : 240,	Def3 : 145,	Def4 : 85 , Speed : 9 ,	Skill0 : "弓兵行軍"		, Skill1 : "弓兵行軍"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵の進撃"			, Skill4 : "神速"		},
    "2028" : {	name : "張允"		, Rate : "C",	Cost : 1.5	, Army : "弓",	Atk : 135, Int : 4  ,	Def1 : 130,	Def2 : 200,	Def3 : 115,	Def4 : 60 , Speed : 9 ,	Skill0 : "弓兵行軍"		, Skill1 : "弓兵行軍"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵の進撃"			, Skill4 : "神速"		},
    "2029" : {	name : "華歆"		, Rate : "UC",	Cost : 2.0	, Army : "歩",	Atk : 85 , Int : 13 ,	Def1 : 35 ,	Def2 : 15 ,	Def3 : 15 ,	Def4 : 15 , Speed : 8 ,	Skill0 : "製鉄知識"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵行軍"		, Skill3 : "弓兵訓練"			, Skill4 : "製鉄技術"		},
    "2030" : {	name : "華歆"		, Rate : "C",	Cost : 2.0	, Army : "歩",	Atk : 85 , Int : 12 ,	Def1 : 35 ,	Def2 : 15 ,	Def3 : 15 ,	Def4 : 15 , Speed : 8 ,	Skill0 : "練兵訓練"		, Skill1 : "練兵訓練"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵の進撃"			, Skill4 : "練兵修練"		},
    "2031" : {	name : "朱霊"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 205, Int : 7  ,	Def1 : 200,	Def2 : 90 ,	Def3 : 305,	Def4 : 185, Speed : 13,	Skill0 : "厩舎訓練"		, Skill1 : "厩舎訓練"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵の進撃"			, Skill4 : "厩舎修練"		},
    "2032" : {	name : "朱霊"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 190, Int : 7  ,	Def1 : 200,	Def2 : 90 ,	Def3 : 305,	Def4 : 185, Speed : 13,	Skill0 : "厩舎訓練"		, Skill1 : "厩舎訓練"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵の進撃"			, Skill4 : "厩舎修練"		},
    "2033" : {	name : "曹昂"		, Rate : "UC",	Cost : 1.5	, Army : "騎",	Atk : 125, Int : 6  ,	Def1 : 180,	Def2 : 80 ,	Def3 : 270,	Def4 : 165, Speed : 13,	Skill0 : "騎兵防御"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵の進撃"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵堅守"		},
    "2034" : {	name : "曹昂"		, Rate : "C",	Cost : 1.5	, Army : "騎",	Atk : 125, Int : 6  ,	Def1 : 165,	Def2 : 75 ,	Def3 : 255,	Def4 : 155, Speed : 13,	Skill0 : "騎兵防御"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵の進撃"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵堅守"		},
    "2035" : {	name : "楽進"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 280, Int : 4  ,	Def1 : 265,	Def2 : 80 ,	Def3 : 450,	Def4 : 240, Speed : 13,	Skill0 : "騎兵突撃"		, Skill1 : "騎兵強行"		, Skill2 : "騎兵堅守"		, Skill3 : "千里行"			, Skill4 : "騎兵の猛撃"		},
    "2036" : {	name : "楽進"		, Rate : "C",	Cost : 2.5	, Army : "騎",	Atk : 265, Int : 4  ,	Def1 : 265,	Def2 : 80 ,	Def3 : 450,	Def4 : 240, Speed : 13,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "2037" : {	name : "曹休"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 215, Int : 7  ,	Def1 : 225,	Def2 : 100,	Def3 : 340,	Def4 : 205, Speed : 13,	Skill0 : "騎兵防御"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵の進撃"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵堅守"		},
    "2038" : {	name : "曹休"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 200, Int : 7  ,	Def1 : 225,	Def2 : 100,	Def3 : 340,	Def4 : 205, Speed : 13,	Skill0 : "騎兵防御"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵の進撃"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵堅守"		},
    "2039" : {	name : "曹操"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 270, Int : 15 ,	Def1 : 300,	Def2 : 140,	Def3 : 380,	Def4 : 240, Speed : 13,	Skill0 : "覇道"			, Skill1 : "豪傑"		, Skill2 : "鉄壁"		, Skill3 : "千里行"			, Skill4 : "兵器の極撃"		},
    "2040" : {	name : "賈詡"		, Rate : "R",	Cost : 2.0	, Army : "歩",	Atk : 235, Int : 15 ,	Def1 : 200,	Def2 : 145,	Def3 : 145,	Def4 : 145, Speed : 8 ,	Skill0 : "兵器の強撃"		, Skill1 : "蛮族の襲撃"		, Skill2 : "兵器防御"		, Skill3 : "火神の攻勢"			, Skill4 : "兵器の猛撃"		},
    "2041" : {	name : "賈詡"		, Rate : "UC",	Cost : 2.0	, Army : "歩",	Atk : 215, Int : 15 ,	Def1 : 200,	Def2 : 145,	Def3 : 145,	Def4 : 145, Speed : 8 ,	Skill0 : "兵器強行"		, Skill1 : "兵器強行"		, Skill2 : "食糧技術"		, Skill3 : "兵器修練"			, Skill4 : "蛮王の襲撃"		},
    "2042" : {	name : "郭嘉"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 250, Int : 17 ,	Def1 : 260,	Def2 : 145,	Def3 : 145,	Def4 : 145, Speed : 8 ,	Skill0 : "神算鬼謀"		, Skill1 : "兵器の極撃"		, Skill2 : "八卦の陣"		, Skill3 : "覇道"			, Skill4 : "神医の術式"		},
    "2043" : {	name : "夏侯惇"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 330, Int : 9  ,	Def1 : 345,	Def2 : 155,	Def3 : 525,	Def4 : 310, Speed : 13,	Skill0 : "騎兵の猛撃"		, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵堅守"		, Skill3 : "製鉄技術"			, Skill4 : "騎兵の極撃"		},
    "2044" : {	name : "夏侯淵"		, Rate : "R",	Cost : 3.0	, Army : "弓",	Atk : 315, Int : 11 ,	Def1 : 370,	Def2 : 560,	Def3 : 320,	Def4 : 165, Speed : 9 ,	Skill0 : "弓兵突撃"		, Skill1 : "弓兵強行"		, Skill2 : "弓兵堅守"		, Skill3 : "千里行"			, Skill4 : "弓兵の猛撃"		},
    "2045" : {	name : "曹洪"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 215, Int : 5  ,	Def1 : 240,	Def2 : 110,	Def3 : 365,	Def4 : 220, Speed : 13,	Skill0 : "騎兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の猛撃"		},
    "2046" : {	name : "曹洪"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 210, Int : 5  ,	Def1 : 235,	Def2 : 105,	Def3 : 360,	Def4 : 215, Speed : 13,	Skill0 : "剣兵の強撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵強行"			, Skill4 : "剣兵の猛撃"		},
    "2047" : {	name : "司馬懿"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 275, Int : 18 ,	Def1 : 345,	Def2 : 190,	Def3 : 475,	Def4 : 275, Speed : 13,	Skill0 : "神速"			, Skill1 : "一騎当千"		, Skill2 : "英雄"		, Skill3 : "農林知識"			, Skill4 : "仁君"		},
    "2048" : {	name : "甄姫"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 35 , Int : 8  ,	Def1 : 155,	Def2 : 130,	Def3 : 130,	Def4 : 130, Speed : 8 ,	Skill0 : "強兵の檄文"		, Skill1 : "兵舎修練"		, Skill2 : "守護神"		, Skill3 : "攻城の檄文"			, Skill4 : "神医の術式"		},
    "2049" : {	name : "典韋"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 355, Int : 4  ,	Def1 : 275,	Def2 : 240,	Def3 : 85 ,	Def4 : 470, Speed : 10,	Skill0 : "一騎当千"		, Skill1 : "槍兵突覇"		, Skill2 : "鉄壁"		, Skill3 : "加工知識"			, Skill4 : "魏王の号令"		},
    "2050" : {	name : "典韋"		, Rate : "UC",	Cost : 3.0	, Army : "槍",	Atk : 325, Int : 4  ,	Def1 : 275,	Def2 : 240,	Def3 : 85 ,	Def4 : 470, Speed : 10,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "2051" : {	name : "曹操"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 420, Int : 22 ,	Def1 : 520,	Def2 : 240,	Def3 : 700,	Def4 : 410, Speed : 14,	Skill0 : "魏武王"		, Skill1 : "騎兵突覇"		, Skill2 : "城壁補強"		, Skill3 : "豊穣"			, Skill4 : "飛将"		},
    "2052" : {	name : "張遼"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 490, Int : 13 ,	Def1 : 625,	Def2 : 290,	Def3 : 840,	Def4 : 490, Speed : 14,	Skill0 : "覇王の進撃"		, Skill1 : "騎兵の猛撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "覇道"			, Skill4 : "飛将"		},
    "2056" : {	name : "曹真"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 220, Int : 9  ,	Def1 : 240,	Def2 : 110,	Def3 : 365,	Def4 : 210, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "2057" : {	name : "曹仁"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 260, Int : 6  ,	Def1 : 385,	Def2 : 210,	Def3 : 530,	Def4 : 295, Speed : 13,	Skill0 : "騎兵堅守"		, Skill1 : "騎兵防御"		, Skill2 : "騎兵の進撃"		, Skill3 : "騎兵強行"			, Skill4 : "騎兵方陣"		},
    "2058" : {	name : "夏侯惇"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 430, Int : 13 ,	Def1 : 490,	Def2 : 330,	Def3 : 695,	Def4 : 480, Speed : 14,	Skill0 : "騎兵の極撃"		, Skill1 : "騎兵突撃"		, Skill2 : "騎兵方陣"		, Skill3 : "厩舎修練"			, Skill4 : "騎兵突覇"		},
    "2059" : {	name : "張郃"		, Rate : "SR",	Cost : 2.5	, Army : "騎",	Atk : 285, Int : 8  ,	Def1 : 330,	Def2 : 160,	Def3 : 495,	Def4 : 300, Speed : 13,	Skill0 : "騎兵の猛撃"		, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵堅守"		, Skill3 : "製鉄技術"			, Skill4 : "騎兵の極撃"		},
    "2060" : {	name : "許褚"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 370, Int : 8  ,	Def1 : 590,	Def2 : 535,	Def3 : 285,	Def4 : 840, Speed : 11,	Skill0 : "王者の護り"		, Skill1 : "槍兵方陣"		, Skill2 : "弓兵方陣"		, Skill3 : "騎兵方陣"			, Skill4 : "王佐の才"		},
    "2061" : {	name : "徐晃"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 315, Int : 10 ,	Def1 : 345,	Def2 : 270,	Def3 : 200,	Def4 : 465, Speed : 10,	Skill0 : "槍兵突覇"		, Skill1 : "槍兵突撃"		, Skill2 : "兵舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "2062" : {	name : "賈詡"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 235, Int : 17 ,	Def1 : 270,	Def2 : 150,	Def3 : 150,	Def4 : 150, Speed : 8 ,	Skill0 : "市場知識"		, Skill1 : "農林知識"		, Skill2 : "千里行"		, Skill3 : "豪傑"			, Skill4 : "八卦の陣"		},
    "2063" : {	name : "夏侯淵"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 430, Int : 11 ,	Def1 : 510,	Def2 : 715,	Def3 : 500,	Def4 : 300, Speed : 10,	Skill0 : "軍神"			, Skill1 : "一騎当千"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "飛将"		},
    "2064" : {	name : "典韋"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 305, Int : 7  ,	Def1 : 455,	Def2 : 355,	Def3 : 260,	Def4 : 625, Speed : 10,	Skill0 : "迅速援護"		, Skill1 : "強襲速撃"		, Skill2 : "兵器強行"		, Skill3 : "英雄"			, Skill4 : "加工技術"		},
    "2065" : {	name : "司馬懿"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 385, Int : 25 ,	Def1 : 535,	Def2 : 290,	Def3 : 740,	Def4 : 420, Speed : 14,	Skill0 : "騎将の采配"		, Skill1 : "騎兵突覇"		, Skill2 : "城壁補強"		, Skill3 : "奇計百出"			, Skill4 : "市場繁栄"		},
    "2066" : {	name : "曹操"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 420, Int : 22 ,	Def1 : 520,	Def2 : 240,	Def3 : 700,	Def4 : 410, Speed : 14,	Skill0 : "魏軍の極撃"		, Skill1 : "騎兵の極撃"		, Skill2 : "豊穣"		, Skill3 : "騎兵の聖域"			, Skill4 : "軍神"		},
    "2067" : {	name : "張遼"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 320, Int : 8  ,	Def1 : 385,	Def2 : 165,	Def3 : 590,	Def4 : 325, Speed : 13,	Skill0 : "強襲突撃"		, Skill1 : "伐採技術"		, Skill2 : "剣兵の聖域"		, Skill3 : "槍兵方陣"			, Skill4 : "強兵の檄文"		},
    "2068" : {	name : "郭嘉"		, Rate : "R",	Cost : 2.0	, Army : "歩",	Atk : 230, Int : 15 ,	Def1 : 210,	Def2 : 150,	Def3 : 150,	Def4 : 150, Speed : 8 ,	Skill0 : "剣兵突覇"		, Skill1 : "剣兵突撃"		, Skill2 : "練兵修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "2069" : {	name : "程昱"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 240, Int : 17 ,	Def1 : 260,	Def2 : 140,	Def3 : 140,	Def4 : 140, Speed : 8 ,	Skill0 : "兵器の極撃"		, Skill1 : "兵器の猛撃"		, Skill2 : "覇道"		, Skill3 : "加工技術"			, Skill4 : "深慮遠謀"		},
    "2070" : {	name : "荀彧"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 25 , Int : 15 ,	Def1 : 130,	Def2 : 180,	Def3 : 95 ,	Def4 : 50 , Speed : 9 ,	Skill0 : "石切知識"		, Skill1 : "石切知識"		, Skill2 : "弓兵行軍"		, Skill3 : "兵舎訓練"			, Skill4 : "石切技術"		},
    "2071" : {	name : "許褚"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 340, Int : 5  ,	Def1 : 640,	Def2 : 500,	Def3 : 295,	Def4 : 865, Speed : 11,	Skill0 : "守将の進軍"		, Skill1 : "兵舎訓練"		, Skill2 : "加工知識"		, Skill3 : "騎兵の聖域"			, Skill4 : "槍兵の極撃"		},
    "2072" : {	name : "甄姫"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 35 , Int : 9  ,	Def1 : 155,	Def2 : 130,	Def3 : 130,	Def4 : 130, Speed : 8 ,	Skill0 : "農林技術"		, Skill1 : "農林知識"		, Skill2 : "英雄"		, Skill3 : "槍兵突覇"			, Skill4 : "富国"		},
    "2073" : {	name : "曹丕"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 420, Int : 22 ,	Def1 : 540,	Def2 : 250,	Def3 : 730,	Def4 : 440, Speed : 14,	Skill0 : "魏軍の防衛"		, Skill1 : "迅速援護"		, Skill2 : "城壁補強"		, Skill3 : "王者の護り"			, Skill4 : "守将の進軍"		},
    "2074" : {	name : "于禁"		, Rate : "R",	Cost : 2.0	, Army : "騎",	Atk : 200, Int : 9  ,	Def1 : 265,	Def2 : 120,	Def3 : 400,	Def4 : 260, Speed : 13,	Skill0 : "騎兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の猛撃"		},
    "2076" : {	name : "郭嘉"		, Rate : "UC",	Cost : 2.0	, Army : "歩",	Atk : 225, Int : 15 ,	Def1 : 180,	Def2 : 130,	Def3 : 130,	Def4 : 130, Speed : 8 ,	Skill0 : "加工知識"		, Skill1 : "石切技術"		, Skill2 : "製鉄技術"		, Skill3 : "騎兵強行"			, Skill4 : "加工技術"		},
    "2077" : {	name : "張遼"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 280, Int : 6  ,	Def1 : 265,	Def2 : 120,	Def3 : 405,	Def4 : 260, Speed : 13,	Skill0 : "騎兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の猛撃"		},
    "2078" : {	name : "李典"		, Rate : "R",	Cost : 2.0	, Army : "槍",	Atk : 230, Int : 12 ,	Def1 : 295,	Def2 : 255,	Def3 : 135,	Def4 : 445, Speed : 10,	Skill0 : "槍兵の聖域"		, Skill1 : "槍兵方陣"		, Skill2 : "兵舎修練"		, Skill3 : "槍兵強行"			, Skill4 : "八卦の陣"		},
    "2079" : {	name : "鐘会"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 320, Int : 15 ,	Def1 : 380,	Def2 : 360,	Def3 : 170,	Def4 : 580, Speed : 10,	Skill0 : "槍兵の極撃"		, Skill1 : "槍兵突撃"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "槍兵突覇"		},
    "2080" : {	name : "曹洪"		, Rate : "R",	Cost : 2.0	, Army : "騎",	Atk : 245, Int : 5  ,	Def1 : 260,	Def2 : 115,	Def3 : 395,	Def4 : 255, Speed : 13,	Skill0 : "騎兵突覇"		, Skill1 : "騎兵突撃"		, Skill2 : "厩舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "2081" : {	name : "曹休"		, Rate : "R",	Cost : 2.0	, Army : "騎",	Atk : 240, Int : 10 ,	Def1 : 320,	Def2 : 180,	Def3 : 440,	Def4 : 260, Speed : 13,	Skill0 : "騎兵の聖域"		, Skill1 : "騎兵方陣"		, Skill2 : "厩舎修練"		, Skill3 : "騎兵強行"			, Skill4 : "八卦の陣"		},
    "2082" : {	name : "卞夫人"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 9  ,	Def1 : 95 ,	Def2 : 80 ,	Def3 : 80 ,	Def4 : 80 , Speed : 8 ,	Skill0 : "美玉歌舞"		, Skill1 : "奇計百出"		, Skill2 : "仁君"		, Skill3 : "厩舎修練"			, Skill4 : "王佐の才"		},
    "2083" : {	name : "甄姫"		, Rate : "UR",	Cost : 1.0	, Army : "歩",	Atk : 35 , Int : 10 ,	Def1 : 155,	Def2 : 130,	Def3 : 130,	Def4 : 130, Speed : 9 ,	Skill0 : "皇后の慈愛"		, Skill1 : "覇王の進撃"		, Skill2 : "傾国"		, Skill3 : "富国"			, Skill4 : "神医の術式"		},
    "2084" : {	name : "荀彧"		, Rate : "SR",	Cost : 2.5	, Army : "弓",	Atk : 220, Int : 18 ,	Def1 : 200,	Def2 : 300,	Def3 : 165,	Def4 : 75 , Speed : 9 ,	Skill0 : "神算鬼謀"		, Skill1 : "兵器の極撃"		, Skill2 : "八卦の陣"		, Skill3 : "覇道"			, Skill4 : "神医の術式"		},
    "2085" : {	name : "鄧艾"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 390, Int : 22 ,	Def1 : 520,	Def2 : 420,	Def3 : 240,	Def4 : 700, Speed : 10,	Skill0 : "地の利堅壁"		, Skill1 : "兵器の猛撃"		, Skill2 : "槍兵方陣"		, Skill3 : "剣兵の聖域"			, Skill4 : "王者の護り"		},
    "2086" : {	name : "楽進"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 430, Int : 10 ,	Def1 : 435,	Def2 : 390,	Def3 : 195,	Def4 : 665, Speed : 10,	Skill0 : "猛将の鹵獲"		, Skill1 : "一騎当千"		, Skill2 : "守護神"		, Skill3 : "厩舎修練"			, Skill4 : "深慮遠謀"		},
    "2087" : {	name : "張春華"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 20 , Int : 9  ,	Def1 : 155,	Def2 : 120,	Def3 : 120,	Def4 : 120, Speed : 8 ,	Skill0 : "出撃見舞"		, Skill1 : "覇王の進撃"		, Skill2 : "守護神"		, Skill3 : "千里行"			, Skill4 : "神速"		},
    "2088" : {	name : "曹操"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 480, Int : 23 ,	Def1 : 520,	Def2 : 240,	Def3 : 700,	Def4 : 410, Speed : 14,	Skill0 : "魏王の覇軍"		, Skill1 : "騎兵突覇"		, Skill2 : "王者の護り"		, Skill3 : "覇王の進撃"			, Skill4 : "魏武王"		},
    "2089" : {	name : "許褚"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 360, Int : 5  ,	Def1 : 600,	Def2 : 500,	Def3 : 295,	Def4 : 865, Speed : 10,	Skill0 : "忠節不落"		, Skill1 : "覇道"		, Skill2 : "鉄壁"		, Skill3 : "千里行"			, Skill4 : "八卦の陣"		},
    "2090" : {	name : "卞夫人"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 9  ,	Def1 : 85 ,	Def2 : 70 ,	Def3 : 70 ,	Def4 : 70 , Speed : 8 ,	Skill0 : "豊穣"			, Skill1 : "弓兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "呉の治世"			, Skill4 : "富国"		},
    "2091" : {	name : "夏侯惇"		, Rate : "UC",	Cost : 3.0	, Army : "騎",	Atk : 330, Int : 8  ,	Def1 : 345,	Def2 : 155,	Def3 : 525,	Def4 : 310, Speed : 13,	Skill0 : "騎兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の猛撃"		},
    "2092" : {	name : "典韋"		, Rate : "UR",	Cost : 4.0	, Army : "槍",	Atk : 500, Int : 8  ,	Def1 : 470,	Def2 : 460,	Def3 : 145,	Def4 : 800, Speed : 11,	Skill0 : "槍兵の大極撃"		, Skill1 : "槍兵の極撃"		, Skill2 : "守護神"		, Skill3 : "槍将の采配"			, Skill4 : "槍戟鬼神"		},
    "2093" : {	name : "夏侯淵"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 410, Int : 11 ,	Def1 : 440,	Def2 : 665,	Def3 : 430,	Def4 : 200, Speed : 9 ,	Skill0 : "弓兵の極撃"		, Skill1 : "弓兵突撃"		, Skill2 : "弓兵方陣"		, Skill3 : "弓兵修練"			, Skill4 : "弓兵突覇"		},
    "2094" : {	name : "賈詡"		, Rate : "UR",	Cost : 3.0	, Army : "歩",	Atk : 310, Int : 22 ,	Def1 : 220,	Def2 : 240,	Def3 : 240,	Def4 : 240, Speed : 9 ,	Skill0 : "奇略布陣"		, Skill1 : "強襲突覇"		, Skill2 : "加工技術"		, Skill3 : "兵器の極撃"			, Skill4 : "市場繁栄"		},
    "2095" : {	name : "曹彰"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 430, Int : 9  ,	Def1 : 420,	Def2 : 650,	Def3 : 380,	Def4 : 190, Speed : 9 ,	Skill0 : "天弓雨撃"		, Skill1 : "弓兵の極撃"		, Skill2 : "覇道"		, Skill3 : "千里行"			, Skill4 : "弓将の采配"		},
    "2096" : {	name : "曹操"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 310, Int : 16 ,	Def1 : 370,	Def2 : 170,	Def3 : 500,	Def4 : 295, Speed : 13,	Skill0 : "奇計百出"		, Skill1 : "伐採技術"		, Skill2 : "弓兵修練"		, Skill3 : "剣兵突覇"			, Skill4 : "守護神"		},
    "2097" : {	name : "夏侯惇"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 260, Int : 6  ,	Def1 : 305,	Def2 : 140,	Def3 : 465,	Def4 : 275, Speed : 13,	Skill0 : "騎兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の猛撃"		},
    "2098" : {	name : "許楮"		, Rate : "UC",	Cost : 3.0	, Army : "槍",	Atk : 230, Int : 3  ,	Def1 : 390,	Def2 : 340,	Def3 : 120,	Def4 : 665, Speed : 10,	Skill0 : "槍兵方陣"		, Skill1 : "槍兵堅守"		, Skill2 : "槍兵の強撃"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵の聖域"		},
    "2099" : {	name : "華佗"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 90 , Int : 18 ,	Def1 : 190,	Def2 : 90 ,	Def3 : 90 ,	Def4 : 90 , Speed : 8 ,	Skill0 : "神医の施術"		, Skill1 : "仁君"		, Skill2 : "騎兵の聖域"		, Skill3 : "加工技術"			, Skill4 : "神医の術式"		},
    "2100" : {	name : "司馬懿"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 320, Int : 27 ,	Def1 : 540,	Def2 : 300,	Def3 : 755,	Def4 : 430, Speed : 14,	Skill0 : "混元一気"		, Skill1 : "騎兵の極撃"		, Skill2 : "王者の護り"		, Skill3 : "騎将の采配"			, Skill4 : "臥龍覚醒"		},
    "2101" : {	name : "荀攸"		, Rate : "SR",	Cost : 2.5	, Army : "歩",	Atk : 210, Int : 18 ,	Def1 : 200,	Def2 : 100,	Def3 : 100,	Def4 : 100, Speed : 8 ,	Skill0 : "騎兵の勝鬨"		, Skill1 : "騎兵の極撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "騎兵突覇"			, Skill4 : "騎将の采配"		},
    "2102" : {	name : "夏侯惇"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 435, Int : 14 ,	Def1 : 480,	Def2 : 220,	Def3 : 735,	Def4 : 430, Speed : 14,	Skill0 : "魏将の督戦"		, Skill1 : "騎兵の極撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "製鉄技術"			, Skill4 : "軍神"		},
    "2103" : {	name : "曹植"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 25 , Int : 17 ,	Def1 : 80 ,	Def2 : 50 ,	Def3 : 50 ,	Def4 : 50 , Speed : 8 ,	Skill0 : "強兵の檄文"		, Skill1 : "兵舎修練"		, Skill2 : "守護神"		, Skill3 : "攻城の檄文"			, Skill4 : "神医の術式"		},
    "2104" : {	name : "張遼"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 495, Int : 13 ,	Def1 : 625,	Def2 : 290,	Def3 : 840,	Def4 : 490, Speed : 14,	Skill0 : "戦蹄轟撃"		, Skill1 : "騎兵の極撃"		, Skill2 : "覇道"		, Skill3 : "千里行"			, Skill4 : "騎将の采配"		},
    "2106" : {	name : "曹仁"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 400, Int : 8  ,	Def1 : 360,	Def2 : 125,	Def3 : 700,	Def4 : 370, Speed : 13,	Skill0 : "隣地猛攻"		, Skill1 : "一騎当千"		, Skill2 : "覇道"		, Skill3 : "強兵の檄文"			, Skill4 : "強襲突覇"		},
    "2107" : {	name : "司馬昭"		, Rate : "SR",	Cost : 2.5	, Army : "歩",	Atk : 280, Int : 18 ,	Def1 : 260,	Def2 : 130,	Def3 : 130,	Def4 : 130, Speed : 8 ,	Skill0 : "近衛騎兵移送"		, Skill1 : "迅速援護"		, Skill2 : "騎兵の聖域"		, Skill3 : "厩舎修練"			, Skill4 : "騎兵の極撃"		},
    "2108" : {	name : "張郃"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 440, Int : 16 ,	Def1 : 430,	Def2 : 195,	Def3 : 655,	Def4 : 385, Speed : 14,	Skill0 : "騎兵の大極撃"		, Skill1 : "騎兵の極撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "騎将の采配"			, Skill4 : "戦蹄轟撃"		},
    "2109" : {	name : "徐晃"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 420, Int : 15 ,	Def1 : 440,	Def2 : 200,	Def3 : 665,	Def4 : 390, Speed : 13,	Skill0 : "騎兵の猛攻"		, Skill1 : "騎兵の強攻"		, Skill2 : "騎兵堅守"		, Skill3 : "製鉄技術"			, Skill4 : "騎兵の猛撃"		},
    "2110" : {	name : "龐徳"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 435, Int : 13 ,	Def1 : 450,	Def2 : 200,	Def3 : 680,	Def4 : 400, Speed : 14,	Skill0 : "猛将突貫"		, Skill1 : "万夫不当"		, Skill2 : "守護神"		, Skill3 : "騎兵突覇"			, Skill4 : "軍神"		},
    "2111" : {	name : "楽進"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 325, Int : 9  ,	Def1 : 370,	Def2 : 320,	Def3 : 165,	Def4 : 560, Speed : 10,	Skill0 : "槍兵の猛撃"		, Skill1 : "槍兵の強撃"		, Skill2 : "槍兵堅守"		, Skill3 : "石切技術"			, Skill4 : "槍兵の極撃"		},
    "2112" : {	name : "辛憲英"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10  ,	Def1 : 110,	Def2 : 90,	Def3 : 90,	Def4 :  90, Speed :  8,	Skill0 : "才媛献策"		, Skill1 : "深慮遠謀"		, Skill2 : "神速援護"		, Skill3 : "富国"			, Skill4 : "傾国"		},
    "2113" : {	name : "夏侯淵"		, Rate : "R",	Cost : 3.0	, Army : "弓",	Atk : 295, Int : 9  ,	Def1 : 330,	Def2 : 500,	Def3 : 285,	Def4 : 150, Speed : 12,	Skill0 : "急襲"			, Skill1 : "一騎当千"		, Skill2 : "守護神"		, Skill3 : "千里行"			, Skill4 : "強襲突撃"		},
    "2114" : {	name : "曹操"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 430, Int : 22 ,	Def1 : 515,	Def2 : 235,	Def3 : 690,	Def4 : 405, Speed : 15,	Skill0 : "騎兵の極攻"		, Skill1 : "騎兵の猛撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "厩舎修練"			, Skill4 : "騎兵の猛攻"		},
    "2115" : {	name : "夏侯惇"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 425, Int : 11 ,	Def1 : 430,	Def2 : 195,	Def3 : 655,	Def4 : 400, Speed : 13,	Skill0 : "隻眼将の軍略"		, Skill1 : "騎兵の猛撃"		, Skill2 : "神速"		, Skill3 : "加工技術"			, Skill4 : "飛将"		},
    "2116" : {	name : "許褚"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 250, Int : 10 ,	Def1 : 435,	Def2 : 380,	Def3 : 135,	Def4 : 740, Speed : 10,	Skill0 : "守将の出陣"		, Skill1 : "槍兵方陣"		, Skill2 : "守護神"		, Skill3 : "八卦の陣"			, Skill4 : "槍兵の聖域"		},
    "2117" : {	name : "曹彰"		, Rate : "R" ,	Cost : 3.0	, Army : "弓",	Atk : 340, Int : 7  ,	Def1 : 345,	Def2 : 585,	Def3 : 300,	Def4 : 105, Speed : 9 ,	Skill0 : "弓兵の強攻"		, Skill1 : "弓兵の強撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強攻"		},
    "2118" : {	name : "司馬懿"		, Rate : "UC",	Cost : 2.5	, Army : "馬",	Atk : 200, Int : 16 ,	Def1 : 240,	Def2 : 130,	Def3 : 335,	Def4 : 183, Speed : 13,	Skill0 : "覇道"			, Skill1 : "豪傑"		, Skill2 : "鉄壁"		, Skill3 : "千里行"			, Skill4 : "兵器の極撃"		},

    "3001" : {	name : "孫権"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 180, Int : 14 ,	Def1 : 295,	Def2 : 370,	Def3 : 225,	Def4 : 135, Speed : 10,	Skill0 : "呉の治世"		, Skill1 : "奇計百出"		, Skill2 : "厩舎修練"		, Skill3 : "製鉄技術"			, Skill4 : "王佐の才"		},
    "3002" : {	name : "周瑜"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 340, Int : 23 ,	Def1 : 570,	Def2 : 790,	Def3 : 440,	Def4 : 310, Speed : 10,	Skill0 : "弓将の采配"		, Skill1 : "弓兵突覇"		, Skill2 : "王佐の才"		, Skill3 : "奇計百出"			, Skill4 : "飛将"		},
    "3003" : {	name : "陸遜"		, Rate : "SR",	Cost : 3.0	, Army : "弓",	Atk : 305, Int : 19 ,	Def1 : 450,	Def2 : 620,	Def3 : 350,	Def4 : 255, Speed : 10,	Skill0 : "王者の護り"		, Skill1 : "槍兵方陣"		, Skill2 : "弓兵方陣"		, Skill3 : "騎兵方陣"			, Skill4 : "王佐の才"		},
    "3004" : {	name : "孫策"		, Rate : "SR",	Cost : 3.0	, Army : "騎",	Atk : 350, Int : 9  ,	Def1 : 385,	Def2 : 175,	Def3 : 485,	Def4 : 295, Speed : 13,	Skill0 : "覇王の進撃"		, Skill1 : "騎兵の猛撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "覇道"			, Skill4 : "飛将"		},
    "3005" : {	name : "甘寧"		, Rate : "R",	Cost : 3.0	, Army : "弓",	Atk : 345, Int : 6  ,	Def1 : 275,	Def2 : 470,	Def3 : 240,	Def4 : 85 , Speed : 10,	Skill0 : "弓兵の猛撃"		, Skill1 : "弓兵の強撃"		, Skill2 : "弓兵堅守"		, Skill3 : "伐採技術"			, Skill4 : "弓兵の極撃"		},
    "3006" : {	name : "孫尚香"		, Rate : "SR",	Cost : 2.0	, Army : "弓",	Atk : 210, Int : 8  ,	Def1 : 255,	Def2 : 430,	Def3 : 220,	Def4 : 75 , Speed : 10,	Skill0 : "弓腰姫の愛"		, Skill1 : "弓兵の猛撃"		, Skill2 : "剣兵の極撃"		, Skill3 : "弓兵修練"			, Skill4 : "弓将の采配"		},
    "3007" : {	name : "呂蒙"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 320, Int : 15 ,	Def1 : 370,	Def2 : 320,	Def3 : 165,	Def4 : 560, Speed : 10,	Skill0 : "深慮遠謀"		, Skill1 : "兵舎修練"		, Skill2 : "王佐の才"		, Skill3 : "農林知識"			, Skill4 : "攻城の檄文"		},
    "3008" : {	name : "孫権"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 180, Int : 12 ,	Def1 : 295,	Def2 : 370,	Def3 : 225,	Def4 : 135, Speed : 10,	Skill0 : "呉の治世"		, Skill1 : "奇計百出"		, Skill2 : "厩舎修練"		, Skill3 : "製鉄技術"			, Skill4 : "王佐の才"		},
    "3009" : {	name : "周瑜"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 200, Int : 14 ,	Def1 : 365,	Def2 : 505,	Def3 : 280,	Def4 : 200, Speed : 10,	Skill0 : "弓兵の進撃"		, Skill1 : "弓兵の進撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強撃"		},
    "3010" : {	name : "周瑜"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 200, Int : 15 ,	Def1 : 385,	Def2 : 530,	Def3 : 295,	Def4 : 210, Speed : 10,	Skill0 : "弓兵防御"		, Skill1 : "伐採知識"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵堅守"		},
    "3011" : {	name : "程普"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 220, Int : 10 ,	Def1 : 295,	Def2 : 255,	Def3 : 135,	Def4 : 445, Speed : 10,	Skill0 : "兵舎訓練"		, Skill1 : "兵舎訓練"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵の進撃"			, Skill4 : "兵舎修練"		},
    "3012" : {	name : "程普"		, Rate : "C",	Cost : 2.5	, Army : "槍",	Atk : 220, Int : 10 ,	Def1 : 280,	Def2 : 245,	Def3 : 125,	Def4 : 430, Speed : 10,	Skill0 : "槍兵防御"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵堅守"		},
    "3013" : {	name : "黄蓋"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 250, Int : 7  ,	Def1 : 230,	Def2 : 350,	Def3 : 200,	Def4 : 105, Speed : 10,	Skill0 : "兵器行軍"		, Skill1 : "兵器行軍"		, Skill2 : "食糧知識"		, Skill3 : "兵器訓練"			, Skill4 : "兵器強行"		},
    "3014" : {	name : "諸葛瑾"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 135, Int : 11 ,	Def1 : 220,	Def2 : 315,	Def3 : 210,	Def4 : 105, Speed : 10,	Skill0 : "伐採知識"		, Skill1 : "伐採知識"		, Skill2 : "槍兵行軍"		, Skill3 : "練兵訓練"			, Skill4 : "伐採技術"		},
    "3015" : {	name : "朱治"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 135, Int : 9  ,	Def1 : 230,	Def2 : 350,	Def3 : 200,	Def4 : 105, Speed : 10,	Skill0 : "弓兵防御"		, Skill1 : "伐採知識"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵堅守"		},
    "3016" : {	name : "朱治"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 135, Int : 9  ,	Def1 : 220,	Def2 : 335,	Def3 : 190,	Def4 : 100, Speed : 10,	Skill0 : "弓兵防御"		, Skill1 : "伐採知識"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵堅守"		},
    "3017" : {	name : "韓当"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 220, Int : 5  ,	Def1 : 190,	Def2 : 85 ,	Def3 : 290,	Def4 : 165, Speed : 13,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "3018" : {	name : "韓当"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 210, Int : 5  ,	Def1 : 185,	Def2 : 85 ,	Def3 : 265,	Def4 : 160, Speed : 13,	Skill0 : "騎兵行軍"		, Skill1 : "騎兵行軍"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵の進撃"			, Skill4 : "神速"		},
    "3019" : {	name : "蘇飛"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 160, Int : 8  ,	Def1 : 235,	Def2 : 400,	Def3 : 205,	Def4 : 70 , Speed : 10,	Skill0 : "弓兵の進撃"		, Skill1 : "弓兵の進撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強撃"		},
    "3020" : {	name : "蘇飛"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 170, Int : 8  ,	Def1 : 225,	Def2 : 380,	Def3 : 195,	Def4 : 70 , Speed : 10,	Skill0 : "剣兵の進撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵行軍"			, Skill4 : "剣兵の強撃"		},
    "3021" : {	name : "闞沢"		, Rate : "UC",	Cost : 2.0	, Army : "歩",	Atk : 125, Int : 12 ,	Def1 : 105,	Def2 : 50 ,	Def3 : 50 ,	Def4 : 50 , Speed : 8 ,	Skill0 : "石切知識"		, Skill1 : "石切知識"		, Skill2 : "弓兵行軍"		, Skill3 : "兵舎訓練"			, Skill4 : "石切技術"		},
    "3022" : {	name : "闞沢"		, Rate : "C",	Cost : 2.0	, Army : "歩",	Atk : 115, Int : 12 ,	Def1 : 100,	Def2 : 50 ,	Def3 : 50 ,	Def4 : 50 , Speed : 8 ,	Skill0 : "石切知識"		, Skill1 : "石切知識"		, Skill2 : "弓兵行軍"		, Skill3 : "兵舎訓練"			, Skill4 : "石切技術"		},
    "3023" : {	name : "蒋欽"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 195, Int : 6  ,	Def1 : 195,	Def2 : 300,	Def3 : 170,	Def4 : 90 , Speed : 10,	Skill0 : "弓兵の進撃"		, Skill1 : "弓兵の進撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強撃"		},
    "3024" : {	name : "蒋欽"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 185, Int : 6  ,	Def1 : 190,	Def2 : 290,	Def3 : 165,	Def4 : 85 , Speed : 10,	Skill0 : "弓兵の進撃"		, Skill1 : "弓兵の進撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強撃"		},
    "3025" : {	name : "孫翊"		, Rate : "UC",	Cost : 1.5	, Army : "騎",	Atk : 150, Int : 2  ,	Def1 : 100,	Def2 : 45 ,	Def3 : 150,	Def4 : 85 , Speed : 13,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "3026" : {	name : "孫翊"		, Rate : "C",	Cost : 1.5	, Army : "騎",	Atk : 140, Int : 2  ,	Def1 : 100,	Def2 : 45 ,	Def3 : 150,	Def4 : 85 , Speed : 13,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "3027" : {	name : "孫匡"		, Rate : "UC",	Cost : 1.5	, Army : "弓",	Atk : 110, Int : 5  ,	Def1 : 160,	Def2 : 245,	Def3 : 140,	Def4 : 70 , Speed : 10,	Skill0 : "弓兵訓練"		, Skill1 : "弓兵訓練"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵の進撃"			, Skill4 : "弓兵修練"		},
    "3028" : {	name : "孫匡"		, Rate : "C",	Cost : 1.5	, Army : "弓",	Atk : 110, Int : 5  ,	Def1 : 150,	Def2 : 230,	Def3 : 130,	Def4 : 65 , Speed : 10,	Skill0 : "弓兵防御"		, Skill1 : "伐採知識"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵堅守"		},
    "3029" : {	name : "祖茂"		, Rate : "UC",	Cost : 1.5	, Army : "槍",	Atk : 160, Int : 4  ,	Def1 : 160,	Def2 : 140,	Def3 : 70 ,	Def4 : 245, Speed : 10,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "3030" : {	name : "祖茂"		, Rate : "C",	Cost : 1.5	, Army : "槍",	Atk : 150, Int : 4  ,	Def1 : 160,	Def2 : 140,	Def3 : 70 ,	Def4 : 245, Speed : 10,	Skill0 : "槍兵の進撃"		, Skill1 : "槍兵の進撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強撃"		},
    "3031" : {	name : "大喬"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 20 , Int : 8  ,	Def1 : 140,	Def2 : 120,	Def3 : 120,	Def4 : 120, Speed : 8 ,	Skill0 : "富国"			, Skill1 : "槍兵の極撃"		, Skill2 : "槍兵の聖域"		, Skill3 : "仁君"			, Skill4 : "豊穣"		},
    "3032" : {	name : "小喬"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 25 , Int : 7  ,	Def1 : 170,	Def2 : 145,	Def3 : 145,	Def4 : 145, Speed : 8 ,	Skill0 : "強兵の檄文"		, Skill1 : "兵舎修練"		, Skill2 : "守護神"		, Skill3 : "攻城の檄文"			, Skill4 : "神医の術式"		},
    "3033" : {	name : "孫堅"		, Rate : "R",	Cost : 3.0	, Army : "弓",	Atk : 320, Int : 11 ,	Def1 : 395,	Def2 : 505,	Def3 : 305,	Def4 : 185, Speed : 10,	Skill0 : "剣兵の極撃"		, Skill1 : "剣兵突撃"		, Skill2 : "剣兵方陣"		, Skill3 : "練兵修練"			, Skill4 : "剣兵突覇"		},
    "3034" : {	name : "魯粛"		, Rate : "R",	Cost : 2.0	, Army : "槍",	Atk : 230, Int : 14 ,	Def1 : 300,	Def2 : 230,	Def3 : 165,	Def4 : 415, Speed : 10,	Skill0 : "兵器修練"		, Skill1 : "兵器修練"		, Skill2 : "豪傑"		, Skill3 : "兵器の強撃"			, Skill4 : "加工技術"		},
    "3035" : {	name : "魯粛"		, Rate : "UC",	Cost : 2.0	, Army : "槍",	Atk : 230, Int : 13 ,	Def1 : 280,	Def2 : 215,	Def3 : 150,	Def4 : 385, Speed : 10,	Skill0 : "槍兵堅守"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵方陣"		},
    "3036" : {	name : "太史慈"		, Rate : "R",	Cost : 3.5	, Army : "弓",	Atk : 390, Int : 8  ,	Def1 : 480,	Def2 : 810,	Def3 : 415,	Def4 : 145, Speed : 10,	Skill0 : "守護神"		, Skill1 : "鉄壁"		, Skill2 : "槍兵方陣"		, Skill3 : "弓兵方陣"			, Skill4 : "王者の護り"		},
    "3037" : {	name : "陸遜"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 260, Int : 18 ,	Def1 : 355,	Def2 : 495,	Def3 : 275,	Def4 : 195, Speed : 10,	Skill0 : "八卦の陣"		, Skill1 : "兵器の猛撃"		, Skill2 : "剣兵の聖域"		, Skill3 : "槍兵方陣"			, Skill4 : "王者の護り"		},
    "3038" : {	name : "周泰"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 210, Int : 5  ,	Def1 : 310,	Def2 : 270,	Def3 : 95 ,	Def4 : 525, Speed : 10,	Skill0 : "鉄壁"			, Skill1 : "槍兵堅守"		, Skill2 : "豪傑"		, Skill3 : "騎兵堅守"			, Skill4 : "守護神"		},
    "3039" : {	name : "周泰"		, Rate : "C",	Cost : 2.5	, Army : "槍",	Atk : 210, Int : 5  ,	Def1 : 300,	Def2 : 260,	Def3 : 90 ,	Def4 : 505, Speed : 10,	Skill0 : "槍兵堅守"		, Skill1 : "石切知識"		, Skill2 : "槍兵の進撃"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵方陣"		},
    "3040" : {	name : "孫権"		, Rate : "SR",	Cost : 2.5	, Army : "弓",	Atk : 250, Int : 13 ,	Def1 : 365,	Def2 : 460,	Def3 : 280,	Def4 : 170, Speed : 10,	Skill0 : "大皇帝"		, Skill1 : "弓兵突覇"		, Skill2 : "覇王の進撃"		, Skill3 : "富国"			, Skill4 : "神医の術式"		},
    "3041" : {	name : "孫策"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 280, Int : 8  ,	Def1 : 330,	Def2 : 155,	Def3 : 420,	Def4 : 255, Speed : 13,	Skill0 : "騎兵突撃"		, Skill1 : "騎兵強行"		, Skill2 : "騎兵堅守"		, Skill3 : "千里行"			, Skill4 : "騎兵の猛撃"		},
    "3042" : {	name : "甘寧"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 290, Int : 3  ,	Def1 : 225,	Def2 : 190,	Def3 : 70 ,	Def4 : 380, Speed : 10,	Skill0 : "一騎当千"		, Skill1 : "槍兵突覇"		, Skill2 : "鉄壁"		, Skill3 : "加工知識"			, Skill4 : "魏王の号令"		},
    "3043" : {	name : "甘寧"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 280, Int : 3  ,	Def1 : 205,	Def2 : 180,	Def3 : 65 ,	Def4 : 350, Speed : 10,	Skill0 : "槍兵強行"		, Skill1 : "槍兵強行"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵の進撃"			, Skill4 : "槍兵の猛撃"		},
    "3044" : {	name : "孫堅"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 420, Int : 18 ,	Def1 : 520,	Def2 : 700,	Def3 : 410,	Def4 : 240, Speed : 11,	Skill0 : "大皇帝"		, Skill1 : "弓兵突覇"		, Skill2 : "覇王の進撃"		, Skill3 : "富国"			, Skill4 : "神医の術式"		},
    "3045" : {	name : "周瑜"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 395, Int : 24 ,	Def1 : 510,	Def2 : 690,	Def3 : 375,	Def4 : 260, Speed : 11,	Skill0 : "弓兵の極撃"		, Skill1 : "弓兵突撃"		, Skill2 : "弓兵方陣"		, Skill3 : "弓兵修練"			, Skill4 : "弓兵突覇"		},
    "3046" : {	name : "孫尚香"		, Rate : "UR",	Cost : 2.5	, Army : "弓",	Atk : 240, Int : 16 ,	Def1 : 320,	Def2 : 400,	Def3 : 200,	Def4 : 160, Speed : 11,	Skill0 : "市場繁栄"		, Skill1 : "傾国"		, Skill2 : "富国"		, Skill3 : "豊穣"			, Skill4 : "弓将の采配"		},
    "3047" : {	name : "孫策"		, Rate : "UR",	Cost : 4.0	, Army : "騎",	Atk : 505, Int : 10 ,	Def1 : 600,	Def2 : 260,	Def3 : 805,	Def4 : 475, Speed : 14,	Skill0 : "飛将"			, Skill1 : "一騎当千"		, Skill2 : "鉄壁"		, Skill3 : "厩舎修練"			, Skill4 : "覇王の進撃"		},
    "3048" : {	name : "太史慈"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 420, Int : 6  ,	Def1 : 445,	Def2 : 680,	Def3 : 400,	Def4 : 215, Speed : 9 ,	Skill0 : "弓兵の猛撃"		, Skill1 : "弓兵の強撃"		, Skill2 : "弓兵堅守"		, Skill3 : "伐採技術"			, Skill4 : "弓兵の極撃"		},
    "3049" : {	name : "孫策"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 290, Int : 6  ,	Def1 : 230,	Def2 : 390,	Def3 : 210,	Def4 : 70 , Speed : 10,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "3050" : {	name : "孫翊"		, Rate : "R",	Cost : 1.5	, Army : "騎",	Atk : 170, Int : 4  ,	Def1 : 110,	Def2 : 50 ,	Def3 : 175,	Def4 : 95 , Speed : 13,	Skill0 : "一騎当千"		, Skill1 : "槍兵突覇"		, Skill2 : "鉄壁"		, Skill3 : "加工知識"			, Skill4 : "魏王の号令"		},
    "3051" : {	name : "黄蓋"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 275, Int : 9  ,	Def1 : 245,	Def2 : 370,	Def3 : 210,	Def4 : 115, Speed : 10,	Skill0 : "兵器強行"		, Skill1 : "兵器強行"		, Skill2 : "食糧技術"		, Skill3 : "兵器修練"			, Skill4 : "蛮王の襲撃"		},
    "3052" : {	name : "陸遜"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 210, Int : 13 ,	Def1 : 340,	Def2 : 480,	Def3 : 260,	Def4 : 180, Speed : 10,	Skill0 : "弓兵方陣"		, Skill1 : "弓兵堅守"		, Skill2 : "弓兵の強撃"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の聖域"		},
    "3053" : {	name : "呂蒙"		, Rate : "UR",	Cost : 3.0	, Army : "槍",	Atk : 330, Int : 4  ,	Def1 : 380,	Def2 : 300,	Def3 : 160,	Def4 : 490, Speed : 11,	Skill0 : "覇王の進撃"		, Skill1 : "騎兵の猛撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "覇道"			, Skill4 : "飛将"		},
    "3054" : {	name : "甘寧"		, Rate : "SR",	Cost : 3.0	, Army : "騎",	Atk : 340, Int : 5  ,	Def1 : 310,	Def2 : 135,	Def3 : 480,	Def4 : 270, Speed : 13,	Skill0 : "強襲突覇"		, Skill1 : "神速"		, Skill2 : "鉄壁"		, Skill3 : "八卦の陣"			, Skill4 : "攻城の檄文"		},
    "3056" : {	name : "大喬"		, Rate : "UR",	Cost : 1.0	, Army : "歩",	Atk : 30 , Int : 9  ,	Def1 : 150,	Def2 : 130,	Def3 : 130,	Def4 : 130, Speed : 9 ,	Skill0 : "喬姫の祈り"		, Skill1 : "覇王の進撃"		, Skill2 : "強襲突撃"		, Skill3 : "傾国"			, Skill4 : "軍神"		},
    "3057" : {	name : "小喬"		, Rate : "UR",	Cost : 1.0	, Army : "歩",	Atk : 35 , Int : 8  ,	Def1 : 180,	Def2 : 155,	Def3 : 155,	Def4 : 155, Speed : 9 ,	Skill0 : "喬姫の激励"		, Skill1 : "弓兵の極撃"		, Skill2 : "弓兵突覇"		, Skill3 : "弓兵の聖域"			, Skill4 : "弓将の采配"		},
    "3058" : {	name : "陸遜"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 395, Int : 24 ,	Def1 : 540,	Def2 : 730,	Def3 : 435,	Def4 : 250, Speed : 11,	Skill0 : "王者の護り"		, Skill1 : "槍兵方陣"		, Skill2 : "弓兵方陣"		, Skill3 : "騎兵方陣"			, Skill4 : "王佐の才"		},
    "3059" : {	name : "太史慈"		, Rate : "UC",	Cost : 3.0	, Army : "弓",	Atk : 310, Int : 8  ,	Def1 : 300,	Def2 : 405,	Def3 : 230,	Def4 : 120, Speed : 10,	Skill0 : "豪傑"			, Skill1 : "剣兵の強撃"		, Skill2 : "蛮族の襲撃"		, Skill3 : "槍兵強行"			, Skill4 : "英雄"		},
    "3060" : {	name : "孫堅"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 420, Int : 20 ,	Def1 : 520,	Def2 : 700,	Def3 : 410,	Def4 : 240, Speed : 11,	Skill0 : "呉軍の極撃"		, Skill1 : "弓兵の極撃"		, Skill2 : "加工技術"		, Skill3 : "守護神"			, Skill4 : "強兵の檄文"		},
    "3061" : {	name : "諸葛瑾"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 180, Int : 15 ,	Def1 : 260,	Def2 : 335,	Def3 : 225,	Def4 : 160, Speed : 10,	Skill0 : "伐採技術"		, Skill1 : "伐採知識"		, Skill2 : "槍兵強行"		, Skill3 : "練兵訓練"			, Skill4 : "農林知識"		},
    "3062" : {	name : "呂蒙"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 280, Int : 11 ,	Def1 : 260,	Def2 : 225,	Def3 : 140,	Def4 : 415, Speed : 10,	Skill0 : "槍兵突撃"		, Skill1 : "槍兵強行"		, Skill2 : "槍兵堅守"		, Skill3 : "千里行"			, Skill4 : "槍兵の猛撃"		},
    "3063" : {	name : "程普"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 235, Int : 11 ,	Def1 : 310,	Def2 : 305,	Def3 : 140,	Def4 : 470, Speed : 10,	Skill0 : "兵舎修練"		, Skill1 : "豪傑"		, Skill2 : "槍兵方陣"		, Skill3 : "槍兵の強撃"			, Skill4 : "加工技術"		},
    "3064" : {	name : "周泰"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 265, Int : 5  ,	Def1 : 385,	Def2 : 295,	Def3 : 210,	Def4 : 530, Speed : 10,	Skill0 : "槍兵の聖域"		, Skill1 : "槍兵方陣"		, Skill2 : "兵舎修練"		, Skill3 : "槍兵強行"			, Skill4 : "八卦の陣"		},
    "3065" : {	name : "甘寧"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 440, Int : 7  ,	Def1 : 505,	Def2 : 155,	Def3 : 855,	Def4 : 505, Speed : 14,	Skill0 : "隣地猛攻"		, Skill1 : "一騎当千"		, Skill2 : "覇道"		, Skill3 : "強兵の檄文"			, Skill4 : "強襲突覇"		},
    "3066" : {	name : "孫権"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 440, Int : 20 ,	Def1 : 505,	Def2 : 645,	Def3 : 440,	Def4 : 235, Speed : 11,	Skill0 : "皇帝の勅令"		, Skill1 : "弓兵の強撃"		, Skill2 : "兵器の極撃"		, Skill3 : "神速"			, Skill4 : "強襲突覇"		},
    "3067" : {	name : "黄蓋"		, Rate : "UR",	Cost : 3.0	, Army : "槍",	Atk : 350, Int : 11 ,	Def1 : 345,	Def2 : 340,	Def3 : 155,	Def4 : 525, Speed : 11,	Skill0 : "苦肉の計"		, Skill1 : "兵器の極撃"		, Skill2 : "兵器強行"		, Skill3 : "兵器修練"			, Skill4 : "飛将"		},
    "3068" : {	name : "太史慈"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 450, Int : 7  ,	Def1 : 430,	Def2 : 395,	Def3 : 195,	Def4 : 655, Speed : 11,	Skill0 : "槍戟鬼神"		, Skill1 : "槍兵の極撃"		, Skill2 : "覇道"		, Skill3 : "千里行"			, Skill4 : "槍将の采配"		},
    "3069" : {	name : "魯粛"		, Rate : "SR",	Cost : 2.5	, Army : "弓",	Atk : 265, Int : 18 ,	Def1 : 285,	Def2 : 370,	Def3 : 210,	Def4 : 155, Speed : 10,	Skill0 : "弓兵の勝鬨"		, Skill1 : "弓兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "弓兵突覇"			, Skill4 : "弓将の采配"		},
    "3070" : {	name : "孫堅"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 250, Int : 13 ,	Def1 : 375,	Def2 : 480,	Def3 : 320,	Def4 : 175, Speed : 10,	Skill0 : "弓兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の猛撃"		},
    "3071" : {	name : "凌統"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 280, Int : 9  ,	Def1 : 270,	Def2 : 270,	Def3 : 130,	Def4 : 410, Speed : 10,	Skill0 : "槍兵突覇"		, Skill1 : "槍兵突撃"		, Skill2 : "兵舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "3072" : {	name : "祖茂"		, Rate : "R",	Cost : 1.5	, Army : "槍",	Atk : 180, Int : 4  ,	Def1 : 175,	Def2 : 180,	Def3 : 60 ,	Def4 : 300, Speed : 10,	Skill0 : "覇道"			, Skill1 : "豪傑"		, Skill2 : "鉄壁"		, Skill3 : "千里行"			, Skill4 : "兵器の極撃"		},
    "3073" : {	name : "徐盛"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 270, Int : 14 ,	Def1 : 310,	Def2 : 470,	Def3 : 300,	Def4 : 140, Speed : 10,	Skill0 : "弓兵突覇"		, Skill1 : "弓兵突撃"		, Skill2 : "弓兵修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "3074" : {	name : "張昭"		, Rate : "SR",	Cost : 2.5	, Army : "歩",	Atk : 170, Int : 19 ,	Def1 : 280,	Def2 : 240,	Def3 : 240,	Def4 : 240, Speed : 8 ,	Skill0 : "富国論"		, Skill1 : "兵器修練"		, Skill2 : "攻城の檄文"		, Skill3 : "豊穣"			, Skill4 : "富国"		},
    "3075" : {	name : "丁奉"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 275, Int : 12 ,	Def1 : 310,	Def2 : 475,	Def3 : 280,	Def4 : 140, Speed : 10,	Skill0 : "弓兵の聖域"		, Skill1 : "弓兵方陣"		, Skill2 : "弓兵修練"		, Skill3 : "弓兵強行"			, Skill4 : "八卦の陣"		},
    "3076" : {	name : "張紘"		, Rate : "SR",	Cost : 2.5	, Army : "歩",	Atk : 180, Int : 19 ,	Def1 : 210,	Def2 : 160,	Def3 : 160,	Def4 : 160, Speed : 8 ,	Skill0 : "迅速斥候"		, Skill1 : "兵器修練"		, Skill2 : "八卦の陣"		, Skill3 : "加工技術"			, Skill4 : "豊穣"		},
    "3077" : {	name : "呉夫人"		, Rate : "SR",	Cost : 1.0	, Army : "弓",	Atk : 20 , Int : 9  ,	Def1 : 85 ,	Def2 : 70 ,	Def3 : 70 ,	Def4 : 70 , Speed : 8 ,	Skill0 : "弓兵増強"		, Skill1 : "城壁補強"		, Skill2 : "神速援護"		, Skill3 : "弓兵増強"			, Skill4 : "攻城の檄文"		},
    "3078" : {	name : "孫策"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 280, Int : 8  ,	Def1 : 330,	Def2 : 155,	Def3 : 420,	Def4 : 255, Speed : 13,	Skill0 : "騎兵突覇"		, Skill1 : "騎兵突撃"		, Skill2 : "厩舎修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "3079" : {	name : "周瑜"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 200, Int : 14 ,	Def1 : 365,	Def2 : 505,	Def3 : 280,	Def4 : 200, Speed : 10,	Skill0 : "弓兵修練"		, Skill1 : "豪傑"		, Skill2 : "弓兵方陣"		, Skill3 : "弓兵の強撃"			, Skill4 : "農林技術"		},
    "3080" : {	name : "甘寧"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 280, Int : 3  ,	Def1 : 205,	Def2 : 350,	Def3 : 180,	Def4 : 65 , Speed : 10,	Skill0 : "弓兵突撃"		, Skill1 : "弓兵強行"		, Skill2 : "弓兵堅守"		, Skill3 : "千里行"			, Skill4 : "弓兵の猛撃"		},
    "3081" : {	name : "周瑜"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 460, Int : 26 ,	Def1 : 510,	Def2 : 690,	Def3 : 375,	Def4 : 260, Speed : 11,	Skill0 : "神謀風如"		, Skill1 : "弓兵の極撃"		, Skill2 : "王者の護り"		, Skill3 : "弓兵修練"			, Skill4 : "勇将飛矢"		},
    "3082" : {	name : "甘寧"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 430, Int : 12 ,	Def1 : 505,	Def2 : 155,	Def3 : 855,	Def4 : 505, Speed : 14,	Skill0 : "奇襲"			, Skill1 : "猛将の鹵獲"		, Skill2 : "強襲突覇"		, Skill3 : "騎将の采配"			, Skill4 : "飛蹄進軍"		},
    "3083" : {	name : "孫尚香"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 240, Int : 10 ,	Def1 : 255,	Def2 : 430,	Def3 : 220,	Def4 : 75 , Speed : 10,	Skill0 : "弓将の采配"		, Skill1 : "弓兵突覇"		, Skill2 : "王佐の才"		, Skill3 : "奇計百出"			, Skill4 : "飛将"		},
    "3084" : {	name : "太史慈"		, Rate : "UC",	Cost : 3.0	, Army : "弓",	Atk : 340, Int : 9  ,	Def1 : 300,	Def2 : 455,	Def3 : 290,	Def4 : 135, Speed : 10,	Skill0 : "弓兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の猛撃"		},
    "3085" : {	name : "程普"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 330, Int : 16 ,	Def1 : 380,	Def2 : 330,	Def3 : 170,	Def4 : 580, Speed : 10,	Skill0 : "槍兵の猛撃"		, Skill1 : "槍兵の強撃"		, Skill2 : "槍兵堅守"		, Skill3 : "石切技術"			, Skill4 : "槍兵の極撃"		},
    "3086" : {	name : "諸葛格"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 180, Int : 17 ,	Def1 : 265,	Def2 : 375,	Def3 : 250,	Def4 : 130, Speed : 9 ,	Skill0 : "弓兵の聖域"		, Skill1 : "弓兵方陣"		, Skill2 : "弓兵修練"		, Skill3 : "弓兵強行"			, Skill4 : "八卦の陣"		},
    "3087" : {	name : "孫策"		, Rate : "UR",	Cost : 4.0	, Army : "騎",	Atk : 510, Int : 13 ,	Def1 : 600,	Def2 : 330,	Def3 : 830,	Def4 : 475, Speed : 14,	Skill0 : "国士無双"		, Skill1 : "軍神"		, Skill2 : "城壁補強"		, Skill3 : "騎兵の勝鬨"			, Skill4 : "武神"		},
    "3088" : {	name : "呉国太"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 10 , Int : 9  ,	Def1 : 110,	Def2 : 80 ,	Def3 : 80 ,	Def4 : 80 , Speed : 8 ,	Skill0 : "市場繁栄"		, Skill1 : "傾国"		, Skill2 : "富国"		, Skill3 : "豊穣"			, Skill4 : "弓将の采配"		},
    "3089" : {	name : "呂蒙"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 420, Int : 23 ,	Def1 : 505,	Def2 : 430,	Def3 : 230,	Def4 : 770, Speed : 11,	Skill0 : "呉将の督戦"		, Skill1 : "弓兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "伐採技術"			, Skill4 : "覇王の進撃"		},
    "3090" : {	name : "孫尚香"		, Rate : "SR",	Cost : 2.0	, Army : "弓",	Atk : 215, Int : 9  ,	Def1 : 265,	Def2 : 450,	Def3 : 230,	Def4 : 80 , Speed : 10,	Skill0 : "弓兵の勝鬨"		, Skill1 : "弓兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "弓兵突覇"			, Skill4 : "弓将の采配"		},
    "3091" : {	name : "陸遜"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 390, Int : 24 ,	Def1 : 585,	Def2 : 810,	Def3 : 450,	Def4 : 320, Speed : 11,	Skill0 : "呉軍の防衛"		, Skill1 : "迅速援護"		, Skill2 : "呉の治世"		, Skill3 : "八卦の陣"			, Skill4 : "地の利堅壁"		},
    "3092" : {	name : "朱桓"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 275, Int : 9  ,	Def1 : 265,	Def2 : 230,	Def3 : 120,	Def4 : 405, Speed : 10,	Skill0 : "槍兵の進攻"		, Skill1 : "槍兵の進攻"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵の強撃"		},
    "3093" : {	name : "張鉱"		, Rate : "R",	Cost : 2.5	, Army : "歩",	Atk : 160, Int : 18 ,	Def1 : 190,	Def2 : 95 ,	Def3 : 95 ,	Def4 : 95 , Speed :  8,	Skill0 : "密偵精鋭"		, Skill1 : "兵器の猛撃"		, Skill2 : "急速援護"		, Skill3 : "食糧技術"			, Skill4 : "万夫不当"		},
    "3094" : {	name : "蒋欽"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 270, Int : 7  ,	Def1 : 235,	Def2 : 360,	Def3 : 205,	Def4 : 105, Speed :  9,	Skill0 : "弓兵の強攻"		, Skill1 : "弓兵の強撃"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵の強攻"		},
    "3095" : {	name : "孫堅"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 410, Int : 17 ,	Def1 : 505,	Def2 : 390,	Def3 : 235,	Def4 : 645, Speed : 10,	Skill0 : "拠点襲撃"		, Skill1 : "槍戟鬼神"		, Skill2 : "槍兵の聖域"		, Skill3 : "兵舎修練"			, Skill4 : "槍兵の大極撃"	},
    "3096" : {	name : "徐盛"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 280, Int : 9  ,	Def1 : 275,	Def2 : 420,	Def3 : 240,	Def4 : 125, Speed : 10,	Skill0 : "弓兵の進攻"		, Skill1 : "弓兵の進攻"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の強撃"		},
    "3097" : {	name : "黄蓋"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 330, Int : 15 ,	Def1 : 460,	Def2 : 700,	Def3 : 400,	Def4 : 210, Speed : 10,	Skill0 : "防将戦略"		, Skill1 : "槍兵の聖域 "	, Skill2 : "弓兵の聖域 "	, Skill3 : "騎兵の聖域 "		, Skill4 : "守護堅陣"		},
    "3098" : {	name : "呉国太"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 7  ,	Def1 : 80 ,	Def2 : 50 ,	Def3 : 50 ,	Def4 : 50 , Speed :  8,	Skill0 : "市場知識"		, Skill1 : "農林知識"		, Skill2 : "千里行"		, Skill3 : "豪傑"			, Skill4 : "八卦の陣"		},
    "3099" : {	name : "丁奉"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 270, Int : 11 ,	Def1 : 345,	Def2 : 525,	Def3 : 300,	Def4 : 155, Speed : 10,	Skill0 : "弓兵方陣"		, Skill1 : "弓兵堅守"		, Skill2 : "弓兵の強撃"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の聖域"		},
    "3100" : {	name : "張昭"		, Rate : "UR",	Cost : 3.0	, Army : "歩",	Atk : 230, Int : 21 ,	Def1 : 230,	Def2 : 250,	Def3 : 250,	Def4 : 250, Speed :  8,	Skill0 : "老巧の政令"		, Skill1 : "麒麟児"		, Skill2 : "地の利堅壁"		, Skill3 : "富国論"			, Skill4 : "市場繁栄"		},
    "3101" : {	name : "凌統"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 400, Int : 11 ,	Def1 : 435,	Def2 : 380,	Def3 : 200,	Def4 : 665, Speed : 10,	Skill0 : "槍戟鬼神"		, Skill1 : "槍兵の極撃"		, Skill2 : "覇道"		, Skill3 : "千里行"			, Skill4 : "槍将の采配"		},
    "3102" : {	name : "陸抗"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 145, Int : 17 ,	Def1 : 325,	Def2 : 450,	Def3 : 250,	Def4 : 175, Speed : 10,	Skill0 : "堅牢知略"		, Skill1 : "弓兵突撃"		, Skill2 : "八卦の陣"		, Skill3 : "兵器強行"			, Skill4 : "攻城の檄文"		},
    "3103" : {	name : "呉夫人"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 15 , Int : 8  ,	Def1 : 75 ,	Def2 : 45 ,	Def3 : 45 ,	Def4 : 45 , Speed :  8,	Skill0 : "弓兵増強"		, Skill1 : "城壁補強"		, Skill2 : "神速援護"		, Skill3 : "弓兵増強"			, Skill4 : "攻城の檄文"		},
    "3104" : {	name : "孫権"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 440, Int : 18  ,	Def1 : 460,	Def2 : 700,	Def3 : 400,	Def4 : 210, Speed : 13,	Skill0 : "弓兵の極攻"		, Skill1 : "弓兵の猛撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "弓兵修練"			, Skill4 : "弓兵の猛攻"		},
    "3105" : {	name : "小喬"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 30 , Int : 7  ,	Def1 : 175,	Def2 : 150,	Def3 : 150,	Def4 : 150, Speed :  8,	Skill0 : "小華の舞"		, Skill1 : "弓兵の強撃"		, Skill2 : "強兵の檄文"		, Skill3 : "恵風"			, Skill4 : "豊穣"		},
    "3106" : {	name : "虎姉妹"		, Rate : "UR",	Cost : 2.5	, Army : "弓",	Atk : 280, Int : 6  ,	Def1 : 230,	Def2 : 350,	Def3 : 200,	Def4 : 105, Speed : 11,	Skill0 : "弓兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の猛撃"		},
    "3107" : {	name : "大喬"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 25 , Int : 8  ,	Def1 : 145,	Def2 : 125,	Def3 : 125,	Def4 : 125, Speed : 8 ,	Skill0 : "大華の舞"		, Skill1 : "覇王の進撃"		, Skill2 : "攻城の檄文"		, Skill3 : "豊穣"			, Skill4 : "弓将の采配"		},
    "3108" : {	name : "闞沢"		, Rate : "R" ,	Cost : 1.5	, Army : "歩",	Atk : 115, Int : 13 ,	Def1 : 95 ,	Def2 : 40 ,	Def3 : 40 ,	Def4 : 40 , Speed : 8 ,	Skill0 : "石切技術"		, Skill1 : "石切知識"		, Skill2 : "弓兵強行"		, Skill3 : "兵舎訓練"			, Skill4 : "加工知識"		},

    "4001" : {	name : "呂布"		, Rate : "SR",	Cost : 4.0	, Army : "騎",	Atk : 500, Int : 3  ,	Def1 : 545,	Def2 : 250,	Def3 : 865,	Def4 : 455, Speed : 15,	Skill0 : "飛将"			, Skill1 : "一騎当千"		, Skill2 : "鉄壁"		, Skill3 : "厩舎修練"			, Skill4 : "覇王の進撃"		},
    "4002" : {	name : "董卓"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 325, Int : 6  ,	Def1 : 300,	Def2 : 120,	Def3 : 405,	Def4 : 230, Speed : 14,	Skill0 : "剣兵の進撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵行軍"			, Skill4 : "剣兵の強撃"		},
    "4003" : {	name : "袁紹"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 220, Int : 10 ,	Def1 : 350,	Def2 : 445,	Def3 : 270,	Def4 : 160, Speed : 9 ,	Skill0 : "弓兵突撃"		, Skill1 : "弓兵強行"		, Skill2 : "弓兵堅守"		, Skill3 : "千里行"			, Skill4 : "弓兵の猛撃"		},
    "4004" : {	name : "公孫瓚"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 315, Int : 8  ,	Def1 : 345,	Def2 : 160,	Def3 : 435,	Def4 : 265, Speed : 13,	Skill0 : "騎兵突撃"		, Skill1 : "騎兵強行"		, Skill2 : "騎兵堅守"		, Skill3 : "千里行"			, Skill4 : "騎兵の猛撃"		},
    "4005" : {	name : "袁術"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 235, Int : 8  ,	Def1 : 210,	Def2 : 160,	Def3 : 95 ,	Def4 : 265, Speed : 10,	Skill0 : "練兵訓練"		, Skill1 : "練兵訓練"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵の進撃"			, Skill4 : "練兵修練"		},
    "4006" : {	name : "孟獲"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 270, Int : 4  ,	Def1 : 240,	Def2 : 210,	Def3 : 75 ,	Def4 : 410, Speed : 10,	Skill0 : "蛮族の襲撃"		, Skill1 : "蛮族の襲撃"		, Skill2 : "兵器訓練"		, Skill3 : "製鉄知識"			, Skill4 : "蛮王の襲撃"		},
    "4007" : {	name : "孟獲"		, Rate : "C",	Cost : 2.5	, Army : "槍",	Atk : 255, Int : 4  ,	Def1 : 240,	Def2 : 210,	Def3 : 75 ,	Def4 : 410, Speed : 10,	Skill0 : "蛮族の襲撃"		, Skill1 : "蛮族の襲撃"		, Skill2 : "兵器訓練"		, Skill3 : "製鉄知識"			, Skill4 : "蛮王の襲撃"		},
    "4008" : {	name : "劉焉"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 110, Int : 13 ,	Def1 : 215,	Def2 : 270,	Def3 : 165,	Def4 : 100, Speed : 9 ,	Skill0 : "兵器訓練"		, Skill1 : "兵器訓練"		, Skill2 : "兵器防御"		, Skill3 : "兵器の進撃"			, Skill4 : "兵器修練"		},
    "4009" : {	name : "劉焉"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 110, Int : 13 ,	Def1 : 195,	Def2 : 250,	Def3 : 150,	Def4 : 90 , Speed : 9 ,	Skill0 : "弓兵防御"		, Skill1 : "伐採知識"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵堅守"		},
    "4010" : {	name : "劉表"		, Rate : "UC",	Cost : 2.0	, Army : "弓",	Atk : 95 , Int : 14 ,	Def1 : 175,	Def2 : 225,	Def3 : 135,	Def4 : 80 , Speed : 9 ,	Skill0 : "石切知識"		, Skill1 : "石切知識"		, Skill2 : "弓兵行軍"		, Skill3 : "兵舎訓練"			, Skill4 : "石切技術"		},
    "4011" : {	name : "劉表"		, Rate : "C",	Cost : 2.0	, Army : "弓",	Atk : 95 , Int : 13 ,	Def1 : 175,	Def2 : 225,	Def3 : 135,	Def4 : 80 , Speed : 9 ,	Skill0 : "石切知識"		, Skill1 : "石切知識"		, Skill2 : "弓兵行軍"		, Skill3 : "兵舎訓練"			, Skill4 : "石切技術"		},
    "4012" : {	name : "孔融"		, Rate : "UC",	Cost : 2.0	, Army : "歩",	Atk : 35 , Int : 14 ,	Def1 : 95 ,	Def2 : 45 ,	Def3 : 45 ,	Def4 : 45 , Speed : 8 ,	Skill0 : "製鉄知識"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵行軍"		, Skill3 : "弓兵訓練"			, Skill4 : "製鉄技術"		},
    "4013" : {	name : "孔融"		, Rate : "C",	Cost : 2.0	, Army : "歩",	Atk : 35 , Int : 13 ,	Def1 : 95 ,	Def2 : 45 ,	Def3 : 45 ,	Def4 : 45 , Speed : 8 ,	Skill0 : "製鉄知識"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵行軍"		, Skill3 : "弓兵訓練"			, Skill4 : "製鉄技術"		},
    "4014" : {	name : "黄祖"		, Rate : "UC",	Cost : 1.5	, Army : "弓",	Atk : 105, Int : 3  ,	Def1 : 155,	Def2 : 235,	Def3 : 135,	Def4 : 70 , Speed : 9 ,	Skill0 : "弓兵行軍"		, Skill1 : "弓兵行軍"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵の進撃"			, Skill4 : "神速"		},
    "4015" : {	name : "黄祖"		, Rate : "C",	Cost : 1.5	, Army : "弓",	Atk : 105, Int : 3  ,	Def1 : 145,	Def2 : 245,	Def3 : 125,	Def4 : 45 , Speed : 9 ,	Skill0 : "弓兵防御"		, Skill1 : "伐採知識"		, Skill2 : "弓兵の進撃"		, Skill3 : "弓兵行軍"			, Skill4 : "弓兵堅守"		},
    "4016" : {	name : "牛輔"		, Rate : "UC",	Cost : 1.5	, Army : "槍",	Atk : 120, Int : 2  ,	Def1 : 80 ,	Def2 : 70 ,	Def3 : 35 ,	Def4 : 125, Speed : 10,	Skill0 : "槍兵行軍"		, Skill1 : "槍兵行軍"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵の進撃"			, Skill4 : "神速"		},
    "4017" : {	name : "牛輔"		, Rate : "C",	Cost : 1.5	, Army : "槍",	Atk : 110, Int : 2  ,	Def1 : 80 ,	Def2 : 70 ,	Def3 : 35 ,	Def4 : 125, Speed : 10,	Skill0 : "槍兵行軍"		, Skill1 : "槍兵行軍"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵の進撃"			, Skill4 : "神速"		},
    "4018" : {	name : "郭汜"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 215, Int : 1  ,	Def1 : 185,	Def2 : 85 ,	Def3 : 265,	Def4 : 160, Speed : 14,	Skill0 : "騎兵行軍"		, Skill1 : "騎兵行軍"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵の進撃"			, Skill4 : "神速"		},
    "4019" : {	name : "郭汜"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 205, Int : 1  ,	Def1 : 180,	Def2 : 80 ,	Def3 : 270,	Def4 : 155, Speed : 14,	Skill0 : "剣兵の進撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵行軍"			, Skill4 : "剣兵の強撃"		},
    "4020" : {	name : "祝融"		, Rate : "UC",	Cost : 2.5	, Army : "弓",	Atk : 275, Int : 3  ,	Def1 : 155,	Def2 : 265,	Def3 : 135,	Def4 : 45 , Speed : 9 ,	Skill0 : "火神の攻勢"		, Skill1 : "石切知識"		, Skill2 : "蛮族の襲撃"		, Skill3 : "練兵訓練"			, Skill4 : "兵器の強撃"		},
    "4021" : {	name : "祝融"		, Rate : "C",	Cost : 2.5	, Army : "弓",	Atk : 260, Int : 3  ,	Def1 : 155,	Def2 : 265,	Def3 : 135,	Def4 : 45 , Speed : 9 ,	Skill0 : "火神の攻勢"		, Skill1 : "石切知識"		, Skill2 : "蛮族の襲撃"		, Skill3 : "練兵訓練"			, Skill4 : "兵器の強撃"		},
    "4022" : {	name : "李傕"		, Rate : "UC",	Cost : 2.0	, Army : "騎",	Atk : 200, Int : 2  ,	Def1 : 205,	Def2 : 95 ,	Def3 : 315,	Def4 : 180, Speed : 14,	Skill0 : "騎兵の進撃"		, Skill1 : "騎兵の進撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強撃"		},
    "4023" : {	name : "李傕"		, Rate : "C",	Cost : 2.0	, Army : "騎",	Atk : 195, Int : 2  ,	Def1 : 195,	Def2 : 90 ,	Def3 : 300,	Def4 : 170, Speed : 14,	Skill0 : "騎兵防御"		, Skill1 : "製鉄知識"		, Skill2 : "騎兵の進撃"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵堅守"		},
    "4024" : {	name : "貂蝉"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10 ,	Def1 : 100,	Def2 : 85 ,	Def3 : 85 ,	Def4 : 85 , Speed : 8 ,	Skill0 : "傾国"			, Skill1 : "騎兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "神医の術式"			, Skill4 : "強兵の檄文"		},
    "4025" : {	name : "張角"		, Rate : "SR",	Cost : 3.5	, Army : "歩",	Atk : 380, Int : 19 ,	Def1 : 135,	Def2 : 740,	Def3 : 740,	Def4 : 740, Speed : 8 ,	Skill0 : "太平要術"		, Skill1 : "兵器の極撃"		, Skill2 : "槍兵の聖域"		, Skill3 : "農林技術"			, Skill4 : "深慮遠謀"		},
    "4026" : {	name : "袁紹"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 220, Int : 10 ,	Def1 : 350,	Def2 : 160,	Def3 : 445,	Def4 : 270, Speed : 13,	Skill0 : "騎兵の聖域"		, Skill1 : "騎兵方陣"		, Skill2 : "厩舎修練"		, Skill3 : "騎兵強行"			, Skill4 : "八卦の陣"		},
    "4027" : {	name : "袁紹"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 205, Int : 9  ,	Def1 : 350,	Def2 : 160,	Def3 : 445,	Def4 : 270, Speed : 13,	Skill0 : "剣兵の強撃"		, Skill1 : "剣兵の進撃"		, Skill2 : "剣兵防御"		, Skill3 : "剣兵強行"			, Skill4 : "剣兵の猛撃"		},
    "4028" : {	name : "祝融"		, Rate : "R",	Cost : 1.5	, Army : "弓",	Atk : 175, Int : 3  ,	Def1 : 110,	Def2 : 185,	Def3 : 95 ,	Def4 : 35 , Speed : 9 ,	Skill0 : "弓兵突覇"		, Skill1 : "弓兵突撃"		, Skill2 : "弓兵修練"		, Skill3 : "神速"			, Skill4 : "一騎当千"		},
    "4029" : {	name : "孟獲"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 335, Int : 5  ,	Def1 : 310,	Def2 : 270,	Def3 : 95 ,	Def4 : 525, Speed : 10,	Skill0 : "蛮王の襲撃"		, Skill1 : "一騎当千"		, Skill2 : "兵舎修練"		, Skill3 : "兵器の猛撃"			, Skill4 : "太平要術"		},
    "4030" : {	name : "蔡琰"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10 ,	Def1 : 125,	Def2 : 105,	Def3 : 105,	Def4 : 105, Speed : 8 ,	Skill0 : "攻城の檄文"		, Skill1 : "兵器修練"		, Skill2 : "英雄"		, Skill3 : "強兵の檄文"			, Skill4 : "神医の術式"		},
    "4031" : {	name : "呂布"		, Rate : "UR",	Cost : 4.0	, Army : "弓",	Atk : 510, Int : 5  ,	Def1 : 545,	Def2 : 865,	Def3 : 455,	Def4 : 250, Speed : 16,	Skill0 : "飛将"			, Skill1 : "一騎当千"		, Skill2 : "鉄壁"		, Skill3 : "厩舎修練"			, Skill4 : "覇王の進撃"		},
    "4032" : {	name : "公孫瓚"		, Rate : "SR",	Cost : 3.0	, Army : "騎",	Atk : 340, Int : 10 ,	Def1 : 350,	Def2 : 165,	Def3 : 440,	Def4 : 270, Speed : 13,	Skill0 : "騎兵の猛撃"		, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵堅守"		, Skill3 : "製鉄技術"			, Skill4 : "騎兵の極撃"		},
    "4033" : {	name : "孟獲"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 365, Int : 2  ,	Def1 : 290,	Def2 : 220,	Def3 : 110,	Def4 : 395, Speed : 10,	Skill0 : "蛮王の襲撃"		, Skill1 : "一騎当千"		, Skill2 : "兵舎修練"		, Skill3 : "兵器の猛撃"			, Skill4 : "太平要術"		},
    "4034" : {	name : "董卓"		, Rate : "SR",	Cost : 3.0	, Army : "槍",	Atk : 350, Int : 8  ,	Def1 : 305,	Def2 : 235,	Def3 : 125,	Def4 : 410, Speed : 10,	Skill0 : "強襲突覇"		, Skill1 : "神速"		, Skill2 : "鉄壁"		, Skill3 : "八卦の陣"			, Skill4 : "攻城の檄文"		},
    "4035" : {	name : "祝融"		, Rate : "SR",	Cost : 2.5	, Army : "弓",	Atk : 280, Int : 3  ,	Def1 : 190,	Def2 : 300,	Def3 : 160,	Def4 : 70 , Speed : 9 ,	Skill0 : "弓兵の極撃"		, Skill1 : "弓兵突撃"		, Skill2 : "弓兵方陣"		, Skill3 : "弓兵修練"			, Skill4 : "弓兵突覇"		},
    "4036" : {	name : "劉焉"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 125, Int : 14 ,	Def1 : 230,	Def2 : 290,	Def3 : 185,	Def4 : 120, Speed : 9 ,	Skill0 : "農林知識"		, Skill1 : "伐採技術"		, Skill2 : "食糧技術"		, Skill3 : "槍兵強行"			, Skill4 : "農林技術"		},
    "4037" : {	name : "劉表"		, Rate : "R",	Cost : 2.0	, Army : "弓",	Atk : 110, Int : 14 ,	Def1 : 195,	Def2 : 245,	Def3 : 155,	Def4 : 100, Speed : 9 ,	Skill0 : "加工知識"		, Skill1 : "石切技術"		, Skill2 : "製鉄技術"		, Skill3 : "騎兵強行"			, Skill4 : "加工技術"		},
    "4038" : {	name : "袁術"		, Rate : "UC",	Cost : 2.0	, Army : "槍",	Atk : 185, Int : 6  ,	Def1 : 190,	Def2 : 155,	Def3 : 90 ,	Def4 : 245, Speed : 10,	Skill0 : "練兵修練"		, Skill1 : "練兵修練"		, Skill2 : "剣兵方陣"		, Skill3 : "剣兵の強撃"			, Skill4 : "農林技術"		},
    "4039" : {	name : "張角"		, Rate : "UR",	Cost : 3.5	, Army : "歩",	Atk : 380, Int : 22 ,	Def1 : 120,	Def2 : 750,	Def3 : 750,	Def4 : 750, Speed : 9 ,	Skill0 : "群雄の極撃"		, Skill1 : "太平要術"		, Skill2 : "農林技術"		, Skill3 : "八卦の陣"			, Skill4 : "神医の術式"		},
    "4040" : {	name : "貂蝉"		, Rate : "UR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10 ,	Def1 : 110,	Def2 : 90 ,	Def3 : 90 ,	Def4 : 90 , Speed : 9 ,	Skill0 : "速撃の舞"		, Skill1 : "精鋭の進撃"		, Skill2 : "加工技術"		, Skill3 : "守護神"			, Skill4 : "市場繁栄"		},
    "4042" : {	name : "于吉"		, Rate : "SR",	Cost : 2.0	, Army : "歩",	Atk : 200, Int : 17 ,	Def1 : 270,	Def2 : 150,	Def3 : 150,	Def4 : 150, Speed : 8 ,	Skill0 : "農林技術"		, Skill1 : "農林知識"		, Skill2 : "英雄"		, Skill3 : "槍兵突覇"			, Skill4 : "富国"		},
    "4043" : {	name : "王異"		, Rate : "SR",	Cost : 2.5	, Army : "歩",	Atk : 290, Int : 9  ,	Def1 : 240,	Def2 : 200,	Def3 : 200,	Def4 : 200, Speed : 8 ,	Skill0 : "剣兵の極撃"		, Skill1 : "剣兵突撃"		, Skill2 : "剣兵方陣"		, Skill3 : "練兵修練"			, Skill4 : "剣兵突覇"		},
    "4044" : {	name : "馬騰"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 410, Int : 10 ,	Def1 : 425,	Def2 : 195,	Def3 : 650,	Def4 : 380, Speed : 14,	Skill0 : "騎兵の極撃"		, Skill1 : "騎兵突撃"		, Skill2 : "騎兵方陣"		, Skill3 : "厩舎修練"			, Skill4 : "騎兵突覇"		},
    "4045" : {	name : "献帝"		, Rate : "UR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10 ,	Def1 : 130,	Def2 : 100,	Def3 : 100,	Def4 : 100, Speed : 9 ,	Skill0 : "富国強兵"		, Skill1 : "攻城の檄文"		, Skill2 : "軍神"		, Skill3 : "豊穣"			, Skill4 : "市場繁栄"		},
    "4046" : {	name : "公孫瓚"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 275, Int : 8  ,	Def1 : 265,	Def2 : 110,	Def3 : 420,	Def4 : 250, Speed : 13,	Skill0 : "騎兵強行"		, Skill1 : "騎兵強行"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵の進撃"			, Skill4 : "一騎当千"		},
    "4047" : {	name : "顔良"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 435, Int : 5  ,	Def1 : 350,	Def2 : 110,	Def3 : 625,	Def4 : 370, Speed : 13,	Skill0 : "飛将"			, Skill1 : "一騎当千"		, Skill2 : "鉄壁"		, Skill3 : "厩舎修練"			, Skill4 : "覇王の進撃"		},
    "4048" : {	name : "文醜"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 425, Int : 5  ,	Def1 : 350,	Def2 : 110,	Def3 : 625,	Def4 : 370, Speed : 13,	Skill0 : "猛将の鹵獲"		, Skill1 : "一騎当千"		, Skill2 : "守護神"		, Skill3 : "厩舎修練"			, Skill4 : "深慮遠謀"		},
    "4049" : {	name : "蔡琰"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10 ,	Def1 : 130,	Def2 : 110,	Def3 : 110,	Def4 : 110, Speed : 8 ,	Skill0 : "優雅な調べ"		, Skill1 : "攻城の檄文"		, Skill2 : "八卦の陣"		, Skill3 : "豊穣"			, Skill4 : "強兵の檄文"		},
    "4050" : {	name : "袁紹"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 410, Int : 18 ,	Def1 : 520,	Def2 : 450,	Def3 : 240,	Def4 : 660, Speed : 10,	Skill0 : "軍神"			, Skill1 : "一騎当千"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "飛将"		},
    "4051" : {	name : "董卓"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 425, Int : 18 ,	Def1 : 520,	Def2 : 410,	Def3 : 240,	Def4 : 700, Speed : 11,	Skill0 : "暴虐外道"		, Skill1 : "覇王の進撃"		, Skill2 : "守護神"		, Skill3 : "攻城の檄文"			, Skill4 : "猛将の鹵獲"		},
    "4052" : {	name : "張角"		, Rate : "R",	Cost : 2.5	, Army : "歩",	Atk : 180, Int : 17 ,	Def1 : 310,	Def2 : 500,	Def3 : 500,	Def4 : 500, Speed : 8 ,	Skill0 : "八卦の陣"		, Skill1 : "兵器の猛撃"		, Skill2 : "剣兵の聖域"		, Skill3 : "槍兵方陣"			, Skill4 : "王者の護り"		},
    "4053" : {	name : "呂布"		, Rate : "UR",	Cost : 4.0	, Army : "騎",	Atk : 520, Int : 5  ,	Def1 : 545,	Def2 : 250,	Def3 : 865,	Def4 : 455, Speed : 16,	Skill0 : "神飛将"		, Skill1 : "騎兵の極撃"		, Skill2 : "騎兵の聖域"		, Skill3 : "神速"			, Skill4 : "飛将"		},
    "4054" : {	name : "劉表"		, Rate : "SR",	Cost : 2.5	, Army : "弓",	Atk : 180, Int : 18 ,	Def1 : 325,	Def2 : 415,	Def3 : 280,	Def4 : 150, Speed : 9 ,	Skill0 : "強兵の檄文"		, Skill1 : "兵舎修練"		, Skill2 : "守護神"		, Skill3 : "攻城の檄文"			, Skill4 : "神医の術式"		},
    "4055" : {	name : "公孫瓚"		, Rate : "UR",	Cost : 3.5	, Army : "騎",	Atk : 420, Int : 11 ,	Def1 : 460,	Def2 : 170,	Def3 : 780,	Def4 : 450, Speed : 14,	Skill0 : "飛蹄進軍"		, Skill1 : "騎兵突覇"		, Skill2 : "騎兵の聖域"		, Skill3 : "神速"			, Skill4 : "騎将の采配"		},
    "4056" : {	name : "華雄"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 420, Int : 8  ,	Def1 : 390,	Def2 : 380,	Def3 : 120,	Def4 : 660, Speed : 10,	Skill0 : "槍兵の極撃"		, Skill1 : "槍兵突撃"		, Skill2 : "槍兵方陣"		, Skill3 : "兵舎修練"			, Skill4 : "槍兵突覇"		},
    "4057" : {	name : "紀霊"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 270, Int : 6  ,	Def1 : 300,	Def2 : 90 ,	Def3 : 505,	Def4 : 295, Speed : 13,	Skill0 : "騎兵の猛撃"		, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵堅守"		, Skill3 : "製鉄技術"			, Skill4 : "騎兵の極撃"		},
    "4058" : {	name : "祝融"		, Rate : "UR",	Cost : 3.0	, Army : "弓",	Atk : 360, Int : 4  ,	Def1 : 320,	Def2 : 545,	Def3 : 320,	Def4 : 100, Speed : 10,	Skill0 : "隣地猛攻"		, Skill1 : "一騎当千"		, Skill2 : "覇道"		, Skill3 : "強兵の檄文"			, Skill4 : "強襲突覇"		},
    "4059" : {	name : "陣宮"		, Rate : "R",	Cost : 2.0	, Army : "歩",	Atk : 240, Int : 14 ,	Def1 : 230,	Def2 : 170,	Def3 : 170,	Def4 : 170, Speed : 8 ,	Skill0 : "密偵招集"		, Skill1 : "一騎当千"		, Skill2 : "鉄壁"		, Skill3 : "呉の治世"			, Skill4 : "王佐の才"		},
    "4060" : {	name : "袁紹"		, Rate : "UR",	Cost : 3.5	, Army : "弓",	Atk : 410, Int : 20 ,	Def1 : 630,	Def2 : 800,	Def3 : 485,	Def4 : 300, Speed : 10,	Skill0 : "群雄の防衛"		, Skill1 : "迅速援護"		, Skill2 : "王者の護り"		, Skill3 : "城壁補強"			, Skill4 : "守将の進軍"		},
    "4061" : {	name : "厳氏"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 20 , Int : 8  ,	Def1 : 120,	Def2 : 50 ,	Def3 : 50 ,	Def4 : 50 , Speed : 8 ,	Skill0 : "憂姫護国"		, Skill1 : "覇道"		, Skill2 : "兵器強行"		, Skill3 : "農林知識"			, Skill4 : "飛将"		},
    "4062" : {	name : "郭汜"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 280, Int : 2  ,	Def1 : 270,	Def2 : 120,	Def3 : 410,	Def4 : 235, Speed : 14,	Skill0 : "強襲突撃"		, Skill1 : "伐採技術"		, Skill2 : "剣兵の聖域"		, Skill3 : "槍兵方陣"			, Skill4 : "強兵の檄文"		},
    "4063" : {	name : "張梁"		, Rate : "R",	Cost : 2.5	, Army : "弓",	Atk : 270, Int : 12 ,	Def1 : 310,	Def2 : 475,	Def3 : 270,	Def4 : 140, Speed : 9 ,	Skill0 : "弓兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "弓兵防御"		, Skill3 : "弓兵強行"			, Skill4 : "弓兵の猛撃"		},
    "4064" : {	name : "張宝"		, Rate : "R",	Cost : 2.5	, Army : "騎",	Atk : 200, Int : 16 ,	Def1 : 230,	Def2 : 105,	Def3 : 350,	Def4 : 200, Speed : 13,	Skill0 : "兵器強行"		, Skill1 : "兵器強行"		, Skill2 : "食糧技術"		, Skill3 : "兵器修練"			, Skill4 : "蛮王の襲撃"		},
    "4065" : {	name : "水鏡娘"		, Rate : "UR",	Cost : 1.0	, Army : "歩",	Atk : 20 , Int : 10 ,	Def1 : 150,	Def2 : 80 ,	Def3 : 80 ,	Def4 : 80 , Speed : 8 ,	Skill0 : "人選眼力"		, Skill1 : "伐採知識"		, Skill2 : "石切知識"		, Skill3 : "製鉄知識"			, Skill4 : "食糧知識"		},
    "4066" : {	name : "貂蝉"		, Rate : "UR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 10 ,	Def1 : 110,	Def2 : 90 ,	Def3 : 90 ,	Def4 : 90 , Speed : 9 ,	Skill0 : "月下羽衣"		, Skill1 : "傾国"		, Skill2 : "富国"		, Skill3 : "市場知識"			, Skill4 : "覇王の進撃"		},
    "4067" : {	name : "何皇后"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 15 , Int : 8  ,	Def1 : 90 ,	Def2 : 70 ,	Def3 : 70 ,	Def4 : 70 , Speed : 8 ,	Skill0 : "傾国"			, Skill1 : "騎兵の極撃"		, Skill2 : "弓兵の聖域"		, Skill3 : "神医の術式"			, Skill4 : "強兵の檄文"		},
    "4068" : {	name : "呂布"		, Rate : "R",	Cost : 3.5	, Army : "騎",	Atk : 410, Int : 3  ,	Def1 : 445,	Def2 : 205,	Def3 : 705,	Def4 : 370, Speed : 14,	Skill0 : "万夫不当"		, Skill1 : "騎兵突覇"		, Skill2 : "神速"		, Skill3 : "製鉄技術"			, Skill4 : "騎兵の極撃"		},
    "4069" : {	name : "張任"		, Rate : "UC",	Cost : 2.5	, Army : "槍",	Atk : 280, Int : 10 ,	Def1 : 300,	Def2 : 260,	Def3 : 135,	Def4 : 455, Speed : 10,	Skill0 : "槍兵の強撃"		, Skill1 : "火神の攻勢"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵強行"			, Skill4 : "槍兵の猛撃"		},
    "4070" : {	name : "袁術"		, Rate : "SR",	Cost : 3.0	, Army : "歩",	Atk : 330, Int : 13 ,	Def1 : 350,	Def2 : 175,	Def3 : 175,	Def4 : 175, Speed : 8 ,	Skill0 : "虐帝の号令"		, Skill1 : "兵器の猛撃"		, Skill2 : "守護神"		, Skill3 : "覇道"			, Skill4 : "蛮王の襲撃"		},
    "4071" : {	name : "兀突骨"		, Rate : "UC",	Cost : 3.0	, Army : "槍",	Atk : 300, Int : 1  ,	Def1 : 355,	Def2 : 310,	Def3 : 160,	Def4 : 545, Speed : 10,	Skill0 : "守護防陣"		, Skill1 : "槍兵防御"		, Skill2 : "弓兵防御"		, Skill3 : "騎兵防御"			, Skill4 : "火神の攻勢"		},
    "4072" : {	name : "孟獲"		, Rate : "UR",	Cost : 3.5	, Army : "槍",	Atk : 450, Int : 5  ,	Def1 : 470,	Def2 : 410,	Def3 : 145,	Def4 : 800, Speed : 11,	Skill0 : "蛮勇の一撃"		, Skill1 : "拠点襲撃"		, Skill2 : "地の利堅壁"		, Skill3 : "農林技術"			, Skill4 : "槍兵の極撃"		},
    "4073" : {	name : "何進"		, Rate : "R",	Cost : 2.5	, Army : "槍",	Atk : 255, Int : 2  ,	Def1 : 265,	Def2 : 230,	Def3 : 120,	Def4 : 400, Speed : 10,	Skill0 : "槍兵の強攻"		, Skill1 : "槍兵の強撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強攻 "	},
    "4074" : {	name : "張宝"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 190, Int : 15 ,	Def1 : 220,	Def2 : 100,	Def3 : 335,	Def4 : 190, Speed : 13,	Skill0 : "趁火打劫"		, Skill1 : "豪傑"		, Skill2 : "厩舎訓練"		, Skill3 : "鉄壁"			, Skill4 : "奇計百出"		},
    "4075" : {	name : "高順"		, Rate : "SR",	Cost : 3.5	, Army : "騎",	Atk : 410, Int : 10 ,	Def1 : 450,	Def2 : 200,	Def3 : 680,	Def4 : 390, Speed : 13,	Skill0 : "陥陣営の侵攻"		, Skill1 : "兵器の猛撃"		, Skill2 : "兵器強行"		, Skill3 : "恵風"			, Skill4 : "攻城の檄文"		},
    "4076" : {	name : "董白"		, Rate : "SR",	Cost : 1.5	, Army : "歩",	Atk : 60 , Int : 9  ,	Def1 : 60 ,	Def2 : 30 ,	Def3 : 30 ,	Def4 : 30 , Speed : 8 ,	Skill0 : "暴姫の命"		, Skill1 : "強襲突撃"		, Skill2 : "強兵の檄文"		, Skill3 : "神速"			, Skill4 : "猛将の鹵獲"		},
    "4077" : {	name : "顔良"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 350, Int : 5  ,	Def1 : 280,	Def2 : 100,	Def3 : 545,	Def4 : 280, Speed : 13,	Skill0 : "剛将の畏怖"		, Skill1 : "一騎当千"		, Skill2 : "鉄壁"		, Skill3 : "騎兵強行"			, Skill4 : "覇道"		},
    "4078" : {	name : "王異"		, Rate : "R",	Cost : 2.0	, Army : "歩",	Atk : 150, Int : 7  ,	Def1 : 320,	Def2 : 300,	Def3 : 300,	Def4 : 300, Speed : 8 ,	Skill0 : "守護堅陣"		, Skill1 : "槍兵方陣"		, Skill2 : "弓兵方陣"		, Skill3 : "騎兵方陣"			, Skill4 : "覇道"		},
    "4083" : {	name : "文醜"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 340, Int : 5 ,	Def1 : 290,	Def2 : 100,	Def3 : 565,	Def4 : 290, Speed : 13,	Skill0 : "趁火打劫"		, Skill1 : "豪傑"		, Skill2 : "厩舎訓練"		, Skill3 : "鉄壁"			, Skill4 : "奇計百出"		},
    "4084" : {	name : "紀霊"		, Rate : "UC",	Cost : 2.5	, Army : "騎",	Atk : 270, Int : 5  ,	Def1 : 245,	Def2 : 85,	Def3 : 480,	Def4 : 245, Speed : 13,	Skill0 : "騎兵の進攻"		, Skill1 : "騎兵の進攻"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵強行"			, Skill4 : "騎兵の強撃"		},
    "4085" : {	name : "霊帝"		, Rate : "SR",	Cost : 1.0	, Army : "歩",	Atk : 10 , Int : 5  ,	Def1 : 110,	Def2 : 80,	Def3 : 80 ,	Def4 : 80 , Speed : 8 ,	Skill0 : "天子勅令"		, Skill1 : "趁火打劫"		, Skill2 : "槍兵の勝鬨"		, Skill3 : "王佐の才"			, Skill4 : "富国論"		},
    "4086" : {	name : "華雄"		, Rate : "R",	Cost : 3.0	, Army : "槍",	Atk : 345, Int : 4  ,	Def1 : 330,	Def2 : 285,	Def3 : 100,	Def4 : 555, Speed : 10,	Skill0 : "槍兵の強攻"		, Skill1 : "槍兵の強撃"		, Skill2 : "槍兵防御"		, Skill3 : "槍兵行軍"			, Skill4 : "槍兵の強攻"		},
    "4087" : {	name : "呂布･貂蝉"	, Rate : "UR",	Cost : 4.0	, Army : "騎",	Atk : 540, Int : 18  ,	Def1 : 490,	Def2 : 170,	Def3 : 955,	Def4 : 490, Speed : 16,	Skill0 : "鬼神の極意"		, Skill1 : "隣地猛攻"		, Skill2 : "王者の護り"		, Skill3 : "迅速援護"			, Skill4 : "猛将の極意"		},
    "4088" : {	name : "董卓"		, Rate : "SR",	Cost : 3.5	, Army : "槍",	Atk : 380, Int : 21  ,	Def1 : 450,	Def2 : 390,	Def3 : 205,	Def4 : 680, Speed : 10,	Skill0 : "暴君の覇道"		, Skill1 : "猛将の鹵獲"		, Skill2 : "八卦の陣"		, Skill3 : "覇道"			, Skill4 : "暴虐外道"		},
    "4089" : {	name : "蔡琰"		, Rate : "R",	Cost : 1.0	, Army : "歩",	Atk : 10, Int : 10  ,	Def1 : 110,	Def2 : 80,	Def3 : 80,	Def4 : 80, Speed : 8,	Skill0 : "才女の音律"		, Skill1 : "一騎当千"		, Skill2 : "農林知識"		, Skill3 : "神速"			, Skill4 : "闘将の極意"		},
    "4090" : {	name : "張角"		, Rate : "UC",	Cost : 3.0	, Army : "歩",	Atk : 150, Int : 16  ,	Def1 : 250,	Def2 : 400,	Def3 : 400,	Def4 : 400, Speed : 8,	Skill0 : "守護防陣"		, Skill1 : "槍兵防御"		, Skill2 : "弓兵防御"		, Skill3 : "騎兵防御"			, Skill4 : "火神の攻勢"		},
    "4091" : {	name : "呂氏"		, Rate : "SR",	Cost : 3.5	, Army : "弓",	Atk : 410, Int : 4  ,	Def1 : 345,	Def2 : 585,	Def3 : 300,	Def4 : 105, Speed : 12,	Skill0 : "弓神降臨"		, Skill1 : "万夫不当"		, Skill2 : "弓兵方陣"		, Skill3 : "弓兵突覇"			, Skill4 : "弓兵の強攻"		},
    "4092" : {	name : "馬騰"		, Rate : "R",	Cost : 3.0	, Army : "騎",	Atk : 320, Int : 9  ,	Def1 : 295,	Def2 : 100,	Def3 : 575,	Def4 : 295, Speed : 14,	Skill0 : "騎兵の強攻"		, Skill1 : "騎兵の強撃"		, Skill2 : "騎兵防御"		, Skill3 : "騎兵行軍"			, Skill4 : "騎兵の強攻"		},
    "4093" : {	name : "陳宮"		, Rate : "UC",	Cost : 2.0	, Army : "歩",	Atk : 230, Int : 13  ,	Def1 : 190,	Def2 : 95,	Def3 : 95,	Def4 : 95, Speed : 8,	Skill0 : "兵器突撃"		, Skill1 : "兵器強行"		, Skill2 : "剣兵堅守"		, Skill3 : "千里行"			, Skill4 : "剣兵の猛撃"		}

};

var lv_list = [
	[	 14 	,	80	,	16	,	03	,	 1 ] ,
	[	 40 	,	71	,	21	,	06	,	 2 ] ,
	[	 66 	,	62	,	25	,	10	,	 3 ] ,
	[	 92 	,	53	,	27	,	13	,	 7 ] ,
	[	118 	,	46	,	28	,	17	,	 9 ] ,
	[	144 	,	39	,	28	,	19	,	14 ] ,
	[	170 	,	34	,	27	,	22	,	17 ] ,
	[	196 	,	29	,	26	,	24	,	21 ] ,
	[	224 	,	26	,	24	,	21	,	29 ] ,
	[	250 	,	24	,	22	,	20	,	34 ] ,
	[	276 	,	23	,	20	,	18	,	39 ] ,
	[	302 	,	20	,	18	,	16	,	46 ] ,
	[	328 	,	17	,	16	,	14	,	53 ] ,
	[	999 	,	 0	,	 0	,	 0	,	 0 ] 
];

var scr_list = [
	[	     25 , 66.67		],	[	    225 , 66.56		],	[	    625 , 66.44		],	[	   1225 , 66.33		],	[	   2025 , 66.22		],	[	   3025 , 66.10		],	[	   4225 , 65.99		],	[	   5625 , 65.87		],
	[	   7225 , 65.75		],	[	   9025 , 65.64		],	[	  11025 , 65.52		],	[	  13225 , 65.40		],	[	  15625 , 65.28		],	[	  18225 , 65.16		],	[	  21025 , 65.03		],	[	  24025 , 64.91		],
	[	  27225 , 64.79		],	[	  30625 , 64.66		],	[	  34225 , 64.54		],	[	  38025 , 64.41		],	[	  42025 , 64.29		],	[	  46225 , 64.16		],	[	  50625 , 64.03		],	[	  55225 , 63.90		],
	[	  60025 , 63.77		],	[	  65025 , 63.64		],	[	  70225 , 63.50		],	[	  75625 , 63.37		],	[	  81225 , 63.24		],	[	  87025 , 63.10		],	[	  93025 , 62.96		],	[	  99225 , 62.83		],
	[	 105625 , 62.69		],	[	 112225 , 62.55		],	[	 119025 , 62.41		],	[	 126025 , 62.26		],	[	 133225 , 62.12		],	[	 140625 , 61.98		],	[	 148225 , 61.83		],	[	 156025 , 61.69		],
	[	 164025 , 61.54		],	[	 172225 , 61.39		],	[	 180625 , 61.24		],	[	 189225 , 61.09		],	[	 198025 , 60.94		],	[	 207025 , 60.78		],	[	 216225 , 60.63		],	[	 225625 , 60.48		],
	[	 235225 , 60.32		],	[	 245025 , 60.16		],	[	 255025 , 60.00		],	[	 265225 , 59.84		],	[	 275625 , 59.68		],	[	 286225 , 59.51		],	[	 297025 , 59.35		],	[	 308025 , 59.19		],
	[	 319225 , 59.02		],	[	 330625 , 58.85		],	[	 342225 , 58.68		],	[	 354025 , 58.51		],	[	 366025 , 58.33		],	[	 378225 , 58.16		],	[	 390625 , 57.98		],	[	 403225 , 57.81		],
	[	 416025 , 57.63		],	[	 429025 , 57.45		],	[	 442225 , 57.26		],	[	 455625 , 57.08		],	[	 469225 , 56.90		],	[	 483025 , 56.71		],	[	 497025 , 56.52		],	[	 511225 , 56.33		],
	[	 525625 , 56.14		],	[	 540225 , 55.95		],	[	 555025 , 55.76		],	[	 570025 , 55.56		],	[	 585225 , 55.36		],	[	 600625 , 55.16		],	[	 616225 , 54.95		],	[	 632025 , 54.75		],
	[	 648025 , 54.55		],	[	 664225 , 54.34		],	[	 680625 , 54.13		],	[	 697225 , 53.92		],	[	 714025 , 53.71		],	[	 731025 , 53.49		],	[	 748225 , 53.27		],	[	 765625 , 53.05		],
	[	 783225 , 52.83		],	[	 801025 , 52.61		],	[	 819025 , 52.38		],	[	 837225 , 52.15		],	[	 855625 , 51.92		],	[	 874225 , 51.69		],	[	 893025 , 51.46		],	[	 912025 , 51.22		],
	[	 931225 , 50.98		],	[	 950625 , 50.74		],	[	 970225 , 50.50		],	[	 990025 , 50.25		],	[	1010025 , 50.00		],	[	1030225 , 49.75		],	[	1050625 , 49.49		],	[	1071225 , 49.23		],
	[	1092025 , 48.97		],	[	1113025 , 48.71		],	[	1134225 , 48.45		],	[	1155625 , 48.18		],	[	1177225 , 47.91		],	[	1199025 , 47.64		],	[	1221025 , 47.36		],	[	1243225 , 47.08		],
	[	1265625 , 46.80		],	[	1288225 , 46.52		],	[	1311025 , 46.23		],	[	1334025 , 45.93		],	[	1357225 , 45.62		],	[	1380625 , 45.31		],	[	1404225 , 45.00		],	[	1428025 , 44.68		],
	[	1452025 , 44.36		],	[	1476225 , 44.03		],	[	1500625 , 43.70		],	[	1525225 , 43.36		],	[	1550025 , 43.02		],	[	1575025 , 42.68		],	[	1600225 , 42.33		],	[	1625625 , 41.98		],
	[	1651225 , 41.62		],	[	1677025 , 41.26		],	[	1703025 , 40.89		],	[	1729225 , 40.52		],	[	1755625 , 40.14		],	[	1782225 , 39.76		],	[	1809025 , 39.37		],	[	1836025 , 38.98		],
	[	1863225 , 38.58		],	[	1890625 , 38.18		],	[	1918225 , 37.77		],	[	1946025 , 37.36		],	[	1974025 , 36.94		],	[	2002225 , 36.51		],	[	2030625 , 36.09		],	[	2059225 , 35.65		],
	[	2088025 , 35.21		],	[	2117025 , 34.77		],	[	2146225 , 34.32		],	[	2175625 , 33.86		],	[	2205225 , 33.40		],	[	2235025 , 32.93		],	[	2265025 , 32.46		],	[	2295225 , 31.98		],
	[	2325625 , 31.50		],	[	2356225 , 31.01		],	[	2387025 , 30.52		],	[	2418025 , 30.02		],	[	2449225 , 29.52		],	[	2480625 , 29.01		],	[	2512225 , 28.49		],	[	2544025 , 27.97		],
	[	2576025 , 27.45		],	[	2608225 , 26.92		],	[	2640625 , 26.38		],	[	2673225 , 25.84		],	[	2706025 , 25.30		],	[	2739025 , 24.74		],	[	2772225 , 24.19		],	[	2805625 , 23.63		],
	[	2839225 , 23.07		],	[	2873025 , 22.50		],	[	2907025 , 21.92		],	[	2941225 , 21.35		],	[	2975625 , 20.77		],	[	3010225 , 20.18		],	[	3045025 , 19.59		],	[	3080025 , 19.00		],
	[	3115225 , 18.40		],	[	3150625 , 17.80		],	[	3186225 , 17.20		],	[	3222025 , 16.60		],	[	3258025 , 15.99		],	[	3294225 , 15.38		],	[	3330625 , 14.76		],	[	3367225 , 14.15		],
	[	3404025 , 13.53		],	[	3441025 , 12.91		],	[	3478225 , 12.28		],	[	3515625 , 11.65		],	[	3553225 , 11.01		],	[	3591025 , 10.37		],	[	3629025 ,  9.73		],	[	3667225 ,  9.09		],
	[	3705625 ,  9.09		],	[	3744225 ,  9.09		],	[	3783025 ,  9.09		],	[	3822025 ,  9.09		],	[	3861225 ,  9.09		],	[	3900625 ,  9.09		],	[	3940225 ,  9.09		],	[	3980025 ,  9.09		],
	[	4020025 ,  9.09		],	[	4060225 ,  9.09		],	[	4100625 ,  9.09		],	[	4141225 ,  9.09		],	[	4182025 ,  9.09		],	[	4223025 ,  9.09		],	[	4264225 ,  9.09		],	[	4305625 ,  9.09		],
	[	4347225 ,  9.09		],	[	4389025 ,  9.09		],	[	4431025 ,  9.09		],	[	4473225 ,  9.09		],	[	4515625 ,  9.09		],	[	4558225 ,  9.09		],	[	4601025 ,  9.09		],	[	4644025 ,  9.09		],
	[	4687225 ,  9.09		],	[	4730625 ,  9.09		],	[	4774225 ,  9.09		],	[	4818025 ,  9.09		],	[	4862025 ,  9.09		],	[	4906225 ,  9.09		],	[	4950625 ,  9.09		],	[	4995225 ,  9.09		],
	[	5040025 ,  9.09		],	[	9999999 ,  0.00		]
];

( function() {

	GM_addStyle('.status_hp:hover,.status_att:hover,.status_int:hover,.status_wdef:hover,.status_sdef:hover,.status_sdef:hover,.status_bdef:hover,.status_rdef:hover,.status_speed:hover{background-color: rgba(250,250,250,0.8);}.ex:hover,.cardno:hover{background-color: rgba(0,0,0,0.8);}.union_sentence:hover{width:108px; height:70px; !important;background-color: rgba(0,0,0,0.8);}');

	LoadSettingBox();

	// すけすけフラグ
	SukesukeFlg = OPT_OTHER[41];

	if (SukesukeFlg == 0) {
		// 透けてない枠
		bg_status[1]	=  GM_getResourceURL("bg_status_1");
		bg_status[2]	=  GM_getResourceURL("bg_status_2");
		bg_status[3]	=  GM_getResourceURL("bg_status_3");
		bg_status[4]	=  GM_getResourceURL("bg_status_4");
		bg_status[5]	=  GM_getResourceURL("bg_status_5");
		bg_status_ur[1]	=  GM_getResourceURL("bg_status_ur_1");
		bg_status_ur[2]	=  GM_getResourceURL("bg_status_ur_2");
		bg_status_ur[3]	=  GM_getResourceURL("bg_status_ur_3");
		bg_status_ur[4]	=  GM_getResourceURL("bg_status_ur_4");
		bg_status_ur[5]	=  GM_getResourceURL("bg_status_ur_5");
	} else {
		// 透けてる枠
		bg_status[1]	=  GM_getResourceURL("bg_status_trans1");
		bg_status[2]	=  GM_getResourceURL("bg_status_trans2");
		bg_status[3]	=  GM_getResourceURL("bg_status_trans3");
		bg_status[4]	=  GM_getResourceURL("bg_status_trans4");
		bg_status[5]	=  GM_getResourceURL("bg_status_trans5");
		bg_status_ur[1]	=  GM_getResourceURL("bg_status_ur_trans1");
		bg_status_ur[2]	=  GM_getResourceURL("bg_status_ur_trans2");
		bg_status_ur[3] =  GM_getResourceURL("bg_status_ur_trans3");
		bg_status_ur[4] =  GM_getResourceURL("bg_status_ur_trans4");
		bg_status_ur[5] =  GM_getResourceURL("bg_status_ur_trans5");

		// いろんなところをスケスケに
		GM_addStyle(" span.soltype { overflow: hidden; width: 21px; } ");
		GM_addStyle(" span.soltype img[title=\"歩兵\"] { padding-left: 21px !important; background-image: url('" + GM_getResourceURL("soldier") + "') }");
		GM_addStyle(" span.soltype img[title=\"弓兵\"] { padding-left: 21px !important; background-image: url('" + GM_getResourceURL("archery") + "') }");
		GM_addStyle(" span.soltype img[title=\"槍兵\"] { padding-left: 21px !important; background-image: url('" + GM_getResourceURL("spear") + "') }");
		GM_addStyle(" span.soltype img[title=\"騎兵\"] { padding-left: 21px !important; background-image: url('" + GM_getResourceURL("hose") + "') }");

		GM_addStyle(" span.level_sr { background: url('" + GM_getResourceURL("lv") + "') no-repeat scroll left 8px transparent; }");
		GM_addStyle(" span.level_r  { background: url('" + GM_getResourceURL("lv") + "') no-repeat scroll left 8px transparent; }");
		GM_addStyle(" span.level_uc { background: url('" + GM_getResourceURL("lv") + "') no-repeat scroll left 8px transparent; }");
		GM_addStyle(" span.level_c  { background: url('" + GM_getResourceURL("lv") + "') no-repeat scroll left 8px transparent; }");

		GM_addStyle(" img.levelup  { opacity : 0.4; }");	// ステータスアップ
		GM_addStyle(" div.levelup  { opacity : 0.4; }");	// ステータスアップ
	}

	// Lvup処理のためのCardIDとCardNoを呼び出し
	var LvupCardList = cloadData("LvupCardidList", "[]", true, true);
//	console.log(LvupCardList);
	// Lvup時のポイント振り分け画面
	if (location.pathname == "/card/status_info.php") {
		// CardID の抽出
		var CardID = location.search.match(/\d+/)[0];
		for (var i=0;i<LvupCardList.length;i++){
			if (LvupCardList[i].cardid == CardID) {
				var CardNo = LvupCardList[i].cardno;
				break;
			}
		}
		var addTablePoint = document.evaluate('//div[@id="levelupWindow"]',document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		var msg = "<br><center><table border=1><tr bgcolor=#FFCC00><td width=100 align=center>攻撃</td><td width=100 align=center>防御</td><td width=100 align=center>知力</td><td width=100 align=center>隠し</td></tr><tr><td width=100 align=center>" + card_list[CardNo].Skill1 + "</td><td width=100 align=center>" + card_list[CardNo].Skill2 + "</td><td width=100 align=center>" + card_list[CardNo].Skill3 + "</td><td width=100 align=center>" + card_list[CardNo].Skill4 + "</td></tr></table></center>";

		addTablePoint.snapshotItem(0).innerHTML += msg;
	}
	if (((location.pathname == "/village.php") || (location.pathname == "/land.php")) && (OPT_SEASON != "DF")) {

		// 背景画像の差替
		switch (OPT_SEASON) {
			case "OL":
				GM_addStyle("div#villageSpring  { background:url('" + GM_getResourceURL("old_village") + "') no-repeat scroll left top transparent}");	// 本拠地
				GM_addStyle("div#villageSummer  { background:url('" + GM_getResourceURL("old_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#villageAutumn  { background:url('" + GM_getResourceURL("old_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#villageWinter  { background:url('" + GM_getResourceURL("old_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#mapSpring      { background:url('" + GM_getResourceURL("old_map") + "')     no-repeat scroll left top transparent}");	// 拠点
				GM_addStyle("div#mapSummer      { background:url('" + GM_getResourceURL("old_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapAutumn      { background:url('" + GM_getResourceURL("old_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapWinter      { background:url('" + GM_getResourceURL("old_map") + "')     no-repeat scroll left top transparent}");
				break;
			case "SP":
//				GM_addStyle("div#villageSpring  { background:url('" + GM_getResourceURL("Spring_village") + "') no-repeat scroll left top transparent}");	// 本拠地
				GM_addStyle("div#villageSummer  { background:url('" + GM_getResourceURL("Spring_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#villageAutumn  { background:url('" + GM_getResourceURL("Spring_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#villageWinter  { background:url('" + GM_getResourceURL("Spring_village") + "') no-repeat scroll left top transparent}");	
//				GM_addStyle("div#mapSpring      { background:url('" + GM_getResourceURL("Spring_map") + "')     no-repeat scroll left top transparent}");	// 拠点
				GM_addStyle("div#mapSummer      { background:url('" + GM_getResourceURL("Spring_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapAutumn      { background:url('" + GM_getResourceURL("Spring_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapWinter      { background:url('" + GM_getResourceURL("Spring_map") + "')     no-repeat scroll left top transparent}");
				break;
			case "SU":
				GM_addStyle("div#villageSpring  { background:url('" + GM_getResourceURL("Summer_village") + "') no-repeat scroll left top transparent}");	// 本拠地
//				GM_addStyle("div#villageSummer  { background:url('" + GM_getResourceURL("Summer_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#villageAutumn  { background:url('" + GM_getResourceURL("Summer_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#villageWinter  { background:url('" + GM_getResourceURL("Summer_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#mapSpring      { background:url('" + GM_getResourceURL("Summer_map") + "')     no-repeat scroll left top transparent}");	// 拠点
//				GM_addStyle("div#mapSummer      { background:url('" + GM_getResourceURL("Summer_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapAutumn      { background:url('" + GM_getResourceURL("Summer_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapWinter      { background:url('" + GM_getResourceURL("Summer_map") + "')     no-repeat scroll left top transparent}");
				break;
			case "AU":
				GM_addStyle("div#villageSpring  { background:url('" + GM_getResourceURL("Autumn_village") + "') no-repeat scroll left top transparent}");	// 本拠地
				GM_addStyle("div#villageSummer  { background:url('" + GM_getResourceURL("Autumn_village") + "') no-repeat scroll left top transparent}");	
//				GM_addStyle("div#villageAutumn  { background:url('" + GM_getResourceURL("Autumn_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#villageWinter  { background:url('" + GM_getResourceURL("Autumn_village") + "') no-repeat scroll left top transparent}");	
				GM_addStyle("div#mapSpring      { background:url('" + GM_getResourceURL("Autumn_map") + "')     no-repeat scroll left top transparent}");	// 拠点
				GM_addStyle("div#mapSummer      { background:url('" + GM_getResourceURL("Autumn_map") + "')     no-repeat scroll left top transparent}");
//				GM_addStyle("div#mapAutumn      { background:url('" + GM_getResourceURL("Autumn_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapWinter      { background:url('" + GM_getResourceURL("Autumn_map") + "')     no-repeat scroll left top transparent}");
				break;
			case "WI":
				GM_addStyle("div#villageSpring  { background:url('" + GM_getResourceURL("Winter_village") + "') no-repeat scroll left top transparent}");	// 本拠地
				GM_addStyle("div#villageSummer  { background:url('" + GM_getResourceURL("Winter_village") + "') no-repeat scroll left top transparent}");
				GM_addStyle("div#villageAutumn  { background:url('" + GM_getResourceURL("Winter_village") + "') no-repeat scroll left top transparent}");
//				GM_addStyle("div#villageWinter  { background:url('" + GM_getResourceURL("Winter_village") + "') no-repeat scroll left top transparent}");
				GM_addStyle("div#mapSpring      { background:url('" + GM_getResourceURL("Winter_map") + "')     no-repeat scroll left top transparent}");	// 拠点
				GM_addStyle("div#mapSummer      { background:url('" + GM_getResourceURL("Winter_map") + "')     no-repeat scroll left top transparent}");
				GM_addStyle("div#mapAutumn      { background:url('" + GM_getResourceURL("Winter_map") + "')     no-repeat scroll left top transparent}");
//				GM_addStyle("div#mapWinter      { background:url('" + GM_getResourceURL("Winter_map") + "')     no-repeat scroll left top transparent}");
				break;
			default:
				break;
        	}

		var elements = document.getElementsByTagName('img');
		var season_tag = "";
		var change_flg = false;
		for (i = 0; i < elements.length; i++) {
			change_flg = false;
			if (elements[i].nodeName == 'IMG') {
				switch (OPT_SEASON) {
					case "OL" :	season_tag = "";		break;
					case "SP" :	season_tag = "_spring";		break;
					case "SU" :	season_tag = "_summer";		break;
					case "AU" :	season_tag = "_autumn";		break;
					case "WI" :	season_tag = "_winter";		break;
					default:	season_tag = "err";		break;
				}
				if (season_tag == "err") { break; }

				if (elements[i].src.match("facility/facility_")){
					switch (elements[i].src.substring(elements[i].src.lastIndexOf("_") - 3).substring(0, 3)) {
						case "216"	: 	change_flg = true;		break;		// 雀
						case "205"	: 	change_flg = true;		break;		// 城
						case "220"	:	change_flg = true;		break;		// 村
						case "222"	:	change_flg = true;		break;		// 砦
						case "101"	: 	change_flg = true;		break;		// 森
						default		:	change_flg = false;		break;
					}
				}
				// チップ画像の差替
				if (change_flg) {
					if (OPT_SEASON == "OL") {
						elements[i].src = elements[i].src.replace("_spring",season_tag);
						elements[i].src = elements[i].src.replace("_summer",season_tag);
						elements[i].src = elements[i].src.replace("_autumn",season_tag);
						elements[i].src = elements[i].src.replace("_winter",season_tag);
					} else {
						if (season_tag != "_spring")	{	elements[i].src = elements[i].src.replace("_spring",season_tag);	}
						if (season_tag != "_summer")	{	elements[i].src = elements[i].src.replace("_summer",season_tag);	}
						if (season_tag != "_autumn")	{	elements[i].src = elements[i].src.replace("_autumn",season_tag);	}
						if (season_tag != "_winter")	{	elements[i].src = elements[i].src.replace("_winter",season_tag);	}
					}
				}
			}
		}
	}
	// 合成画面（ベースカード選択）=================================================================================================================================================
	// プロフィール画面 ============================================================================================================================================================
	if ( (location.pathname == "/union/index.php")  || (location.pathname == "/user/") || (location.pathname == "/facility/castle_send_troop.php") || (location.pathname == "/card/domestic_setting.php") ){
		GM_addStyle("div.cardStatus_rarerity_ur  { background:url('" + bg_status_ur[4] + "') !important}");	// UR
		GM_addStyle("div.cardStatus_rarerity_sr  { background:url('" + bg_status[4]    + "') !important}");	// SR
		GM_addStyle("div.cardStatus_rarerity_r   { background:url('" + bg_status[4]    + "') !important}");	// R
		GM_addStyle("div.cardStatus_rarerity_uc  { background:url('" + bg_status[4]    + "') !important}");	// UC
		GM_addStyle("div.cardStatus_rarerity_c   { background:url('" + bg_status[4]    + "') !important}");	// C

		if (SukesukeFlg == 1) {	GM_addStyle('span.union_bg   { opacity : 0.3 }'); }
	}

	if (location.pathname == "/report/detail.php") {
		// 変数定義 ================================================================================================================================================================
		var LvupCardList = [];
		var htmldoc2	= document.createElement("html");
		var card_lvup	= "";
		var CardID		= "";

		// カードの枠の変更 ========================================================================================================================================================
		GM_addStyle("div.cardStatus_rarerity_ur  { background:url('" + bg_status_ur[5] + "') !important}");	// UR
		GM_addStyle("div.cardStatus_rarerity_sr  { background:url('" + bg_status[5]    + "') !important}");	// SR
		GM_addStyle("div.cardStatus_rarerity_r   { background:url('" + bg_status[5]    + "') !important}");	// R
		GM_addStyle("div.cardStatus_rarerity_uc  { background:url('" + bg_status[5]    + "') !important}");	// UC
		GM_addStyle("div.cardStatus_rarerity_c   { background:url('" + bg_status[5]    + "') !important}");	// C

		GM_addStyle('span.union_sentence   { top:210px }');

		// 裏面スキル名を表面に表示 ================================================================================================================================================
		var card_r        = document.evaluate('//div[@class="duel_cardinfo"]/div[1]/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var card_skill    = document.evaluate('//div[@class="duel_cardinfo"]/div[1]/div[2]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (card_r.snapshotLength > 0){
			for (var i=0;i<card_r.snapshotLength;i++){
				htmldoc2.innerHTML = card_skill.snapshotItem(i).innerHTML;

				// 裏面スキル名の取得
				var skill1 = document.evaluate('//span[6]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var skill2 = document.evaluate('//span[7]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var skill3 = document.evaluate('//span[8]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var score  = document.evaluate('//span[4]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var cname  = document.evaluate('//span[1]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;

				// スキル名表示
				var skillstr = '<span class="union_sentence">';
				if (score.snapshotLength  > 0){ skillstr += "スコア:" + addFigure(score.snapshotItem(0).innerHTML) + '<br />'; }
				if (skill1.snapshotLength > 0){ skillstr += skill1.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
				if (skill2.snapshotLength > 0){ skillstr += skill2.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
				if (skill3.snapshotLength > 0){ skillstr += skill3.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
				skillstr += '<span />';
				card_r.snapshotItem(i).innerHTML += skillstr;
			}
		}
		// ステータス強化画像の位置変更
		GM_addStyle('span.status_levelup	{ top:130px }');
	}

	// =============================================================================================================================================================================
	// デッキ画面で 裏面スキル名＋スコアを表面に表示
	// =============================================================================================================================================================================
	if ( (location.pathname == "/card/deck.php") ){
		// 変数定義 ================================================================================================================================================================
		var LvupCardList = [];
		var htmldoc2	= document.createElement("html");
		var card_lvup	= "";
		var CardID		= "";

		var ViewMode = document.evaluate('//select[@class="sortTotal"]/option[@selected="selected"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		// LVUP処理が存在する場合カードIDとカード№を保存する（デッキ画面のみ） =====================================================================================================
		if (location.pathname == "/card/deck.php") {

			// カード表示部分（デッキ含む）
			var card_info = document.evaluate('//div[@class="cardColmn"]/div/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var card_no   = document.evaluate('//div[@class="cardColmn"]/div[1]/div[1]/div[1]/div[1]/span[6]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i=0;i<card_info.snapshotLength;i++){
				htmldoc2.innerHTML = card_info.snapshotItem(i).innerHTML;
				card_lvup        = document.evaluate('//span[@class="status_levelup"]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

				if (card_lvup.snapshotLength != 0) {
					CardID = parseInt(card_lvup.snapshotItem(0).innerHTML.match(/\d+/));
					LvupCardList.push( {"cardno":card_no.snapshotItem(i).innerHTML, "cardid":CardID });
				}
			}

			// デッキ部分（カード表示以外）
			var card_info = document.evaluate('//div[@class="cardStatusDetail label-setting-mode"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var card_no   = document.evaluate('//div[@class="cardStatusDetail label-setting-mode"]/div/div[2]/table[1]/tbody[1]/tr[1]/td[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i=0;i<card_info.snapshotLength;i++){
				htmldoc2.innerHTML = card_info.snapshotItem(i).innerHTML;
				card_lvup        = document.evaluate('//div[@class="levelup"]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (card_lvup.snapshotLength != 0) {
					CardID = parseInt(card_lvup.snapshotItem(0).innerHTML.match(/\d+/));
					LvupCardList.push( {"cardno":card_no.snapshotItem(i).innerHTML, "cardid":CardID });
				}
			}

			csaveData( "LvupCardidList", LvupCardList, true, true );
		}

		// デッキ部分のカードの枠の変更 ============================================================================================================================================
		if (location.pathname == "/card/deck.php") {

			var card_background  = document.evaluate('//div[@id="cardListDeck"]/form/div/div[1]/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var card_Rate        = document.evaluate('//div[@id="cardListDeck"]/form/div/div/div/div/div/span[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i=0;i<card_background.snapshotLength;i++) {
				if (card_Rate.snapshotItem(i).innerHTML == "UR") {
					card_background.snapshotItem(i).style.background = "url('" +  bg_status_ur[1] + "')";
				} else {
					card_background.snapshotItem(i).style.background = "url('" +  bg_status[1] + "')";
				}
			}
			var card_background  = document.evaluate('//div[@id="cardListDeck"]/form/div/div[1]/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			// ファイル部分のカード枠の変更 ============================================================================================================================================
			if (ViewMode.snapshotItem(0).value == 1) {
				// カード表示
				var card_background  = document.evaluate('//div[@class="cardColmn"]/div/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var card_Rate        = document.evaluate('//div[@class="cardColmn"]/div/div/div/div/span[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i=0;i<card_background.snapshotLength;i++) {
					if (card_Rate.snapshotItem(i).innerHTML == "UR") {
						card_background.snapshotItem(i).style.background = "url('" +  bg_status_ur[1] + "')";
					} else {
						card_background.snapshotItem(i).style.background = "url('" +  bg_status[1] + "')";
					}
				}
			}
		}

		//
		var card_r        = document.evaluate('//div[@class="cardColmn"]/div/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var card_skill    = document.evaluate('//div[@class="cardColmn"]/div/div[2]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


		if (card_r.snapshotLength > 0){
			for (var i=0;i<card_r.snapshotLength;i++){
				htmldoc2.innerHTML = card_skill.snapshotItem(i).innerHTML;

				// 裏面スキル名の取得
				if (location.pathname == "/card/deck.php") {
					var skill1 = document.evaluate('//span[6]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var skill2 = document.evaluate('//span[7]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var skill3 = document.evaluate('//span[8]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var score  = document.evaluate('//span[4]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var cname  = document.evaluate('//span[1]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
				}

				// スキル名表示
				var skillstr = '<span class="union_sentence">';
				if (score.snapshotLength  > 0){ skillstr += "スコア:" + addFigure(score.snapshotItem(0).innerHTML) + '<br />'; }
				if (skill1.snapshotLength > 0){ skillstr += skill1.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
				if (skill2.snapshotLength > 0){ skillstr += skill2.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
				if (skill3.snapshotLength > 0){ skillstr += skill3.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
				skillstr += '<span />';
				card_r.snapshotItem(i).innerHTML += skillstr;

			}
		}
		GM_addStyle('span.union_sentence   { top:210px; }');

		// ステータス強化画像の位置変更
		GM_addStyle('span.status_levelup	{ top:130px }');
		j$("div.cardWrapper2col span.status_levelup").css({"top":"195px"});
		j$("dd:contains('未設定')").css({"background-color":"#eeccff"});			// ラベル未設定の背景画像変更

		return;
	}

	// =============================================================================================================================================================================
	// ブショーダス画面・トレード画面での合成時のレシピ表示
	// =============================================================================================================================================================================
	if ( ( (location.pathname == "/union/learn.php") && (location.search.match("cid=") != null) ) ||
           (location.pathname == "/card/trade.php")        || (location.pathname == "/card/trade_bid.php") ||
		   (location.pathname == "/card/bid_list.php")     || (location.pathname == "/busyodas/busyodas_result.php") ||
		   (location.pathname == "/card/exhibit_list.php") || (location.pathname == "/card/trade_card.php") ) {

		// 変数定義 ================================================================================================================================================================
		var htmldoc1		= document.createElement("html");
		var htmldoc2		= document.createElement("html");

		// 現在の能力値
		var attack		= 0;		//	攻撃
		var defense		= 0;		//	防御
		var intelligence	= 0;		//	知力

		// １ポイントあたりのステータス増分
		var pointAtk		= 0;		//	攻撃
		var pointDef		= 0;		//	防御
		var pointInt		= 0;		//	知力

		// 実際に割り振ったポイント数
		var AlloPointAtk	= 0;		//	攻撃
		var AlloPointDef	= 0;		//	防御
		var AlloPointInt	= 0;		//	知力

		// 合成レシピ並び替え用配列
		var SkillArray		= [];

		// 合成レシピ表示用
		var	status = "";


		var card_background  = document.evaluate('//div[@class="cardWrapper"]/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var card_Rate        = document.evaluate('//div[@class="cardWrapper"]/div[1]/div[1]/div[1]/span[1]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		if ( (location.pathname == "/union/learn.php") && (location.search.match("cid=") != null) ) {
			// ベースカード情報の取得 ==================================================================================================================================================
			var base_background = document.evaluate('//div[@class="cardWrapper"]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var base_lv		= parseFloat( document.evaluate('//div[@class="right"]//span[4]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML );
			var base_score		= parseFloat( document.evaluate('//span[@class="score"]',   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML );
			var base_rate		= document.evaluate('//div[@class="cardWrapper"]//span[1]',   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;
			// 背景画像の変更
			if (base_rate == "UR") {
						base_background.snapshotItem(0).style.background = "url('" +  bg_status_ur[4] + "')";
			} else {
						base_background.snapshotItem(0).style.background = "url('" +  bg_status[4] + "')";
			}

			var base_skill1s	= document.evaluate('//div[@class="right"]//span[@class="skillName1 "]',   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var base_skill2s	= document.evaluate('//div[@class="right"]//span[@class="skillName2 "]',   document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			var base_skill_1 = "@@";
			var base_skill_2 = "@@";

			if (base_skill1s.snapshotLength) {
				base_skill_1 = base_skill1s.snapshotItem(0).innerHTML.substring(2).split("LV")[0];
			}
			if (base_skill2s.snapshotLength) {
				base_skill_2 = base_skill2s.snapshotItem(0).innerHTML.substring(2).split("LV")[0];
			}
			console.log(base_skill_1 + " : " + base_skill_2);
		}

		// カードの枠の変更 ========================================================================================================================================================

		// トレード画面 or ブショーダス
		if ((location.pathname == "/card/trade.php") || (location.pathname == "/busyodas/busyodas_result.php") ||  (location.pathname == "/card/trade_bid.php") ||  (location.pathname == "/card/bid_list.php") || (location.pathname == "/card/exhibit_list.php")) {

			// トレード画面
			if ( (location.pathname == "/card/trade.php") ||  (location.pathname == "/card/bid_list.php") || (location.pathname == "/card/exhibit_list.php") || (location.pathname == "/card/exhibit_list.php")) {
				var card_r        = document.evaluate('//div[@class="cardWrapper2col"]/div[1]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var card_No       = document.evaluate('//div[@class="cardWrapper2col"]/div[1]/div[1]/span[@class="cardno"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			}

			// トレード画面（入札）
			if ( location.pathname == "/card/trade_bid.php" ) {
				var card_r        = document.evaluate('//div[@class="cardInfo clearfix"]/div[1]/div/div/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var card_No       = document.evaluate('//span[@class="cardno"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			}
			// ブショーダス画面
			if (location.pathname == "/busyodas/busyodas_result.php") {
				var card_r        = document.evaluate('//div[@class="result"]/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var card_No       = document.evaluate('//div[@class="result"]/div[1]/div[1]/div[1]/span[@class="cardno"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			}

			// カードの枠の変更 ====================================================================================================================================================
			GM_addStyle("div.cardStatus_rarerity_ur  { background:url('" + bg_status_ur[1] + "') !important}");	// UR
			GM_addStyle("div.cardStatus_rarerity_sr  { background:url('" + bg_status[1]    + "') !important}");	// SR
			GM_addStyle("div.cardStatus_rarerity_r   { background:url('" + bg_status[1]    + "') !important}");	// R
			GM_addStyle("div.cardStatus_rarerity_uc  { background:url('" + bg_status[1]    + "') !important}");	// UC
			GM_addStyle("div.cardStatus_rarerity_c   { background:url('" + bg_status[1]    + "') !important}");	// C

		}
		// トレード出品画面のカード枠の変更 ========================================================================================================================================
		if (location.pathname == "/card/trade_card.php") {
			GM_addStyle("div.cardStatus_rarerity_ur  { background:url('" + bg_status_ur[3] + "') !important}");	// UR
			GM_addStyle("div.cardStatus_rarerity_sr  { background:url('" + bg_status[3]    + "') !important}");	// SR
			GM_addStyle("div.cardStatus_rarerity_r   { background:url('" + bg_status[3]    + "') !important}");	// R
			GM_addStyle("div.cardStatus_rarerity_uc  { background:url('" + bg_status[3]    + "') !important}");	// UC
			GM_addStyle("div.cardStatus_rarerity_c   { background:url('" + bg_status[3]    + "') !important}");	// C
			var card_No       = document.evaluate('//span[@class="cardno"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var card_r        = document.evaluate('//div[@class="cardColmn"]/div/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var card_skill    = document.evaluate('//div[@class="cardColmn"]/div/div[2]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		}

		// 合成時のカード枠の変更 ==================================================================================================================================================
		if ( (location.pathname == "/union/learn.php") && (location.search.match("cid=") != null) ) {
			var card_r        = document.evaluate('//div[@class="cardColmn"]/div/div[1]/div/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var card_r2       = document.evaluate('//div[@class="cardColmn"]/div/div[2]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var card_No       = document.evaluate('//div[@class="cardColmn"]/div/div[1]/div/div/span[@class="cardno"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			// カードの枠の変更 ====================================================================================================================================================
			for (var i=0;i<card_background.snapshotLength;i++) {
				if (card_Rate.snapshotItem(i).innerHTML == "UR") {
					card_background.snapshotItem(i).style.background = "url('" +  bg_status_ur[2] + "')";
				} else {
					card_background.snapshotItem(i).style.background = "url('" +  bg_status[2] + "')";
				}
			}
			if (SukesukeFlg == 1) {	GM_addStyle('span.union_bg   { opacity : 0.3 }'); }
		}

		// 合成レシピの表示 ========================================================================================================================================================
		for (var i=0;i<card_No.snapshotLength;i++){
			try {
				htmldoc2.innerHTML = card_r.snapshotItem(i).innerHTML;		// 裏面

				if ( (location.pathname == "/union/learn.php") && (location.search.match("cid=") != null) ) {
					htmldoc1.innerHTML = card_r2.snapshotItem(i).innerHTML;		// 表面
					// LV・スコアの取得
					lv				= parseFloat( document.evaluate('//span[4]',   htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML );
					score			= parseFloat( document.evaluate('//span[@class="score"]',     htmldoc1, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML );
					// 合計LV・スコアの計算
					var total_lv	= base_lv + lv;
					var total_score	= base_score + score;

					var score_table	= 0;
					var lv_table	= 0;

					for (var x=0;x<scr_list.length;x++) {
						if (scr_list[x][0] > total_score) {
							break;
						}
					}
					score_table = x;


					for (var x=0;x<lv_list.length;x++) {
						if (lv_list[x][0] > total_lv) {
							break;
						}
					}
					lv_table = x;

					var probability = [ 0.00, 0.00, 0.00 ,0.00 ];
					probability[0] = (parseFloat( (1 - parseFloat(scr_list[score_table][1] / 100)) * parseFloat( lv_list[lv_table][1] / 100)) * 100).toFixed(2);	// 大
					probability[1] = (parseFloat( (1 - parseFloat(scr_list[score_table][1] / 100)) * parseFloat( lv_list[lv_table][2] / 100)) * 100).toFixed(2);	// 大
					probability[2] = (parseFloat( (1 - parseFloat(scr_list[score_table][1] / 100)) * parseFloat( lv_list[lv_table][3] / 100)) * 100).toFixed(2);	// 大
					probability[3] = (parseFloat( (1 - parseFloat(scr_list[score_table][1] / 100)) * parseFloat( lv_list[lv_table][4] / 100)) * 100).toFixed(2);	// 大
				}
				// 現在の能力値
				attack			= parseFloat( document.evaluate('//span[@class="status_att"]',   htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML );
				defense			= parseFloat( document.evaluate('//span[@class="status_wdef"]',  htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML );
				intelligence	= parseFloat( document.evaluate('//span[@class="status_int"]',   htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML );

				// 1ポイントあたりのステータス増分計算
				pointAtk = parseFloat(card_list[card_No.snapshotItem(i).innerHTML].Atk)  * 0.094;		// 攻撃
				pointDef = parseFloat(card_list[card_No.snapshotItem(i).innerHTML].Def1) * 0.094;		// 防御
				pointInt = parseFloat(card_list[card_No.snapshotItem(i).innerHTML].Int)  * 0.0016;		// 知力

				// 実際に割り振ったポイント数の計算
				AlloPointAtk = parseInt((attack       - parseFloat(card_list[card_No.snapshotItem(i).innerHTML].Atk))  / pointAtk + 0.5);		// 攻撃
				AlloPointDef = parseInt((defense      - parseFloat(card_list[card_No.snapshotItem(i).innerHTML].Def1)) / pointDef + 0.5);		// 防御
				AlloPointInt = parseInt((intelligence - parseFloat(card_list[card_No.snapshotItem(i).innerHTML].Int))  / pointInt + 0.5);		// 知力

				// 合成レシピ並び替え用配列
				SkillArray = [];

				// 合成レシピと割り当てポイント数を配列に入れる
				SkillArray.push( {"point":AlloPointAtk, "n":"攻", "skill": card_list[card_No.snapshotItem(i).innerHTML].Skill1, "probability":0.00, "flg":3 });		// 攻撃
				SkillArray.push( {"point":AlloPointDef, "n":"防", "skill": card_list[card_No.snapshotItem(i).innerHTML].Skill2, "probability":0.00, "flg":2 });		// 防御
				SkillArray.push( {"point":AlloPointInt, "n":"知", "skill": card_list[card_No.snapshotItem(i).innerHTML].Skill3, "probability":0.00, "flg":1 });		// 知力
				SkillArray.push( {"point":0,            "n":"隠", "skill": card_list[card_No.snapshotItem(i).innerHTML].Skill4, "probability":0.00, "flg":0 });		// 知力

				SkillArray.sort(
					function(a,b){
						if(a.point < b.point) return 1;
						if(a.point > b.point) return -1;
						if(a.flg   < b.flg  ) return 1;
						if(a.flg   > b.flg  ) return -1;
						return 0;
					}
				);

				// 合成時の表示
				if ( (location.pathname == "/union/learn.php") && (location.search.match("cid=") != null) ) {
					status  = '<span class="union_sentence" style="color:#FFFFFF; display:block; font-size:10.5px; left:13px; line-height:1.6; position:absolute; text-align:left; top:154px; white-space:nowrap; width:110px; ">';
					status += '<table>';
					// 合成確率を代入
					for (var x=0;x<4;x++) {
						SkillArray[x].probability = parseFloat(probability[x]);
					}
					// 合成確率でソート
					SkillArray.sort(
						function(a,b){
							if(a.probability < b.probability) return 1;
							if(a.probability > b.probability) return -1;
							return 0;
						}
					);

					for (var x=0;x<4;x++) {
						// 合成元カードに存在するスキルは表示しない
						if ( (SkillArray[x].skill != base_skill_1) && (SkillArray[x].skill != base_skill_2)) {
								status += '<tr><td width="74px">' + SkillArray[x].n + ":" + SkillArray[x].skill + '</td><td align="right"  width="34px">' + SkillArray[x].probability + '%</td></tr>';
//								status += SkillArray[x].n + "：" + SkillArray[x].skill + '<br />';
						}
					}
					status += '</table>';
				}

				// トレード時の表示
				if ((location.pathname == "/card/trade.php") || (location.pathname == "/busyodas/busyodas_result.php") ||  (location.pathname == "/card/trade_bid.php") ||  (location.pathname == "/card/bid_list.php") || (location.pathname == "/card/exhibit_list.php")) {
					status  = '<span  class="union_sentence" style="color:#FFFFFF; display:block; font-size:12px; left:13px; line-height:1.4; position:absolute; text-align:left; top:210px; white-space:nowrap; width:108px; ">';
					for (var x=0;x<4;x++) {
								status += SkillArray[x].n + "：" + SkillArray[x].skill + '<br />';
					}
				}

				// トレード出品時の表示
				if (location.pathname == "/card/trade_card.php") {
					status  = '<span  class="union_sentence" style="color:#FFFFFF; display:block; font-size:12px; left:13px; line-height:1.4; position:absolute; text-align:left; top:124px; white-space:nowrap; width:108px; ">';
					for (var x=0;x<4;x++) {
								status += SkillArray[x].n + "：" + SkillArray[x].skill + '<br />';
					}
					// 表面スキル情報の表示
					htmldoc2.innerHTML = card_skill.snapshotItem(i).innerHTML;

					// 裏面スキル名の取得
					var skill1 = document.evaluate('//span[6]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var skill2 = document.evaluate('//span[7]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var skill3 = document.evaluate('//span[8]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					var score  = document.evaluate('//span[4]', htmldoc2, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

					// スキル名表示
					var skillstr = '<span  class="union_sentence" style="color:#FFFFFF; display:block; font-size:12px; left:13px; line-height:1.4; position:absolute; text-align:left; top:210px; white-space:nowrap; width:108px; ">';
					if (score.snapshotLength  > 0){ skillstr += "スコア:" + addFigure(score.snapshotItem(0).innerHTML) + '<br />'; }
					if (skill1.snapshotLength > 0){ skillstr += skill1.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
					if (skill2.snapshotLength > 0){ skillstr += skill2.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
					if (skill3.snapshotLength > 0){ skillstr += skill3.snapshotItem(0).innerHTML.split("<")[0] + '<br />'; }
					skillstr += '<br /><br /><br /><span />';
					card_r.snapshotItem(i).innerHTML += skillstr;
				}

				card_r.snapshotItem(i).innerHTML += status + '</span />';;
			} catch(e) {

				// 合成・出品時の表示
				if ( (location.pathname == "/union/learn.php") && (location.search.match("cid=") != null) || (location.pathname == "/card/trade_card.php")) {
					status  = '<span  class="union_sentence" style="color:#FFFFFF; display:block; font-size:12px; left:13px; line-height:1.4; position:absolute; text-align:left; top:154px; white-space:nowrap; width:108px; ">';
				}
				// トレード時の表示
				if ((location.pathname == "/card/trade.php") || (location.pathname == "/busyodas/busyodas_result.php") ||  (location.pathname == "/card/trade_bid.php") ||  (location.pathname == "/card/bid_list.php") || (location.pathname == "/card/exhibit_list.php")) {
					status  = '<span  class="union_sentence" style="color:#FFFFFF; display:block; font-size:12px; left:13px; line-height:1.4; position:absolute; text-align:left; top:210px; white-space:nowrap; width:108px; ">';
				}
				// トレード出品時の表示
				if (location.pathname == "/card/trade_card.php") {
					status  = '<span  class="union_sentence" style="color:#FFFFFF; display:block; font-size:12px; left:13px; line-height:1.4; position:absolute; text-align:left; top:124px; white-space:nowrap; width:108px; ">';
				}


				status += '<br />';
				status += '<center />合成情報が<br />';
				status += 'ありません</center /><br /></span />';
				card_r.snapshotItem(i).innerHTML += status;
			}
		}
	}


	// =============================================================================================================================================================================
	// ブショーダス引いた時の合成レシピ表示
	// =============================================================================================================================================================================
	if (location.pathname == "/busyodas/busyodas.php") {
		addOpenSettingHtml()

        j$("#busyodasTabContent:has(img[src*=hd_lite.jpg]) table").before("<div id=AutoBushodasLite>");
        j$("#AutoBushodasLite").append("<div id=AutoBushodasControls>");
        j$("#AutoBushodasLite").append("<div id=CardInfo>");
        j$("#CardInfo").css({
            "width": "680px",
            "font-size": "14px",
            "text-align": "center",
            "margin-top": "10px",
            "margin-bottom": "5px"
        });
	}

})();

// =================================================================================================================================================================================
// サブルーチン
// =================================================================================================================================================================================

function addOpenSettingHtml() {


	var sidebar = d.evaluate('//*[@id="busyodasTab"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	
	//自動ダス設定リンク
	var addOpenSetting = d.createElement("input");
	addOpenSetting.id = "OpenSetting";
	addOpenSetting.type = "button";
	addOpenSetting.value = "自動ダス設定";
	addOpenSetting.href = "javascript:void(0);";
	addOpenSetting.style.marginTop = "0px";
	addOpenSetting.style.marginLeft = "100px";
	addOpenSetting.style.color = "#000000";
	addOpenSetting.style.cursor = "pointer";

	addOpenSetting.addEventListener("click", function() {

		LoadSettingBox();		// 設定をロード

		closeSettingBox();
		openSettingBilderBox();
	}, true);

	//自動ダス設定リンク
	var addStart = d.createElement("input");
	addStart.id = "OpenSetting";
	addStart.type = "button";
	addStart.value = "自動ダス実行";
	addStart.href = "javascript:void(0);";
	addStart.style.marginTop = "0px";
	addStart.style.marginLeft = "10px";
	addStart.style.color = "#000000";
	addStart.style.cursor = "pointer";

	addStart.addEventListener("click", function() {

		LoadSettingBox();		// 設定をロード

        var p = parseInt(j$("li[class=first_bpbtn] span").text());
        j$("div[class=sysMes]").text().match(/残り(\d+)枚/);
        var q = parseInt(RegExp.$1);
		DrawResult = ["","","","","","","","","",""];
		autoDasu(p, q, "0", "0");
	}, true);
	sidebar.snapshotItem(0).appendChild(addOpenSetting);
	sidebar.snapshotItem(0).appendChild(addStart);

	var sidebar2 = d.evaluate('//*[@id="busyodasTab"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

}

function autoDasu(total_bp, zan_maisu, hakiid, oldcardno){

//	alert("start autoDasu 保持BP:" + total_bp + " 残" + zan_maisu + "枚 破棄ID:" + hakiid);
	var maisu;
	if (total_bp / 100 >= zan_maisu) {
		maisu = zan_maisu;
	} else {
        maisu = parseInt(total_bp / 100)
	}

    j$("input[name=送信]").attr("onClick").split(",")[2].match(/\'([a-z0-9]+)\'/);
    var ssid = RegExp.$1;

	// 引ける枚数が０枚で破棄カードがある場合
	if (maisu == 0) {
		// 履歴をインクリメント
		for (i=9;i>0;i--){	DrawResult[i] = DrawResult[i-1];	}
		DrawResult[0] = "自動ブショーダスを終了しました。<br>";
		var ViewDrawResult = "";
		// 表示データを作成
		for (i=0;i<10;i++){	ViewDrawResult += DrawResult[i];	}
        j$("#CardInfo").html(ViewDrawResult);

		if (hakiid != 0) {
            var c = {};
            c['card_id[' + haki + ']'] = "1";
            c['p'] = "1";
            c['s'] = "";
            c['o'] = "";
            c['sz'] = "";
            c['ssid'] = r;
            c['btn_send'] = "破棄";
            j$.post("http://" + HOST + "/card/allcard_delete.php", c, function () {
                location.href = "http://" + HOST + "/busyodas/busyodas.php";
                return;
            })
        } else {
            location.href = "http://" + HOST + "/busyodas/busyodas.php";
            return;
        }
    }

	// カードを１枚引く
	var c={};
	c['ssid'] = ssid;
	c['send'] = 'send';
	c['got_type'] = 0;
    c['del_card_id'] = hakiid;

    j$(document.body).append("<div id=AjaxTempDOM>");
//  j$("#AjaxTempDOM").hide();
    j$("#AjaxTempDOM").load("http://" + HOST + "/busyodas/busyodas.php #gray02Wrapper", c, function () {

        j$("a[href*=BusyodasRetry]").attr("href").match(/\'(\d+)\'/);
        var a = RegExp.$1;
        var cardno			= j$("span[class=cardno]").text();
        var rate			= j$("span[class*=rarerity]").text();
        var name			= j$("span[class=name]").text();
        var cost			= parseFloat(j$("span[class=cost]").text());
        var intelligence	= parseFloat(j$("span[class=status_int]").text());
        var h = " が当たりました!";

        var j = 0;				// 破棄カード
        var l = 0;				// 減少BP
        var m = 0;				// カード増加枚数

		if (checkDestruction(cardno) == 0) {
			l = 100;		// 減少BP
			m = 1;			// カード増加枚数
			h = " が当たりました!";
		} else {
//			alert("a:" + a);
			j = a;
			l = 70;			// 減少BP（破棄するために30BPは増える)
			m = 0;			// カード増加枚数（破棄するから0枚増加)
			h = " を自動削除しました!";

		}

		h += "  保持BP:" + total_bp + " 残" + zan_maisu + "枚 破棄ID:" + hakiid;
		for (i=9;i>0;i--){
			DrawResult[i] = DrawResult[i-1];
		}

        if (rate == "C") {			DrawResult[0] = "<span id=card_rarityC>"  + '<font style="color:#000000; font-weight: bold;">' + rate + "</font></span>  " + name + " (No." + cardno + ")<span id=result_msg>" + h + "</span><br>";
        } else if (rate == "UC") {	DrawResult[0] = "<span id=card_rarityUC>" + '<font style="color:#ffa200; font-weight: bold;">' + rate + "</font></span>  " + name + " (No." + cardno + ")<span id=result_msg>" + h + "</span><br>";
        } else if (rate == "R")  {	DrawResult[0] = "<span id=card_rarityR>"  + '<font style="color:#00c5ff; font-weight: bold;">' + rate + "</font></span>  " + name + " (No." + cardno + ")<span id=result_msg>" + h + "</span><br>";
        } else if (rate == "SR") {	DrawResult[0] = "<span id=card_raritySR>" + '<font style="color:#ff4242; font-weight: bold;">' + rate + "</font></span>  " + name + " (No." + cardno + ")<span id=result_msg>" + h + "</span><br>";
        } else {					DrawResult[0] = "<span id=card_rarity>"   + '<font style="color:#f236fe; font-weight: bold;">' + rate + "</font></span>  " + name + " (No." + cardno + ")<span id=result_msg>" + h + "</span><br>";
        }

		

		var ViewDrawResult = "";
		for (i=0;i<10;i++){
			ViewDrawResult += DrawResult[i];
		}

        j$("#CardInfo").html(ViewDrawResult);

        setTimeout(function () {
            autoDasu(total_bp - l, zan_maisu - m, j, cardno)
        }, 1500)

	});
}

function addSettingHtml(vId) {

	var popupLeft = GM_getValue(location.hostname + PGNAME + "_popup_left", 10);
	var popupTop  = GM_getValue(location.hostname + PGNAME + "_popup_top", 10);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;

	
	//表示コンテナ作成
	var SettingContainer = d.createElement("div");
	SettingContainer.id = "SettingContainer";
	SettingContainer.style.position = "absolute";
	SettingContainer.style.color = COLOR_BASE;
	SettingContainer.style.backgroundColor = COLOR_FRAME;
	SettingContainer.style.opacity= 1.0;
	SettingContainer.style.border = "solid 2px black";
	SettingContainer.style.left = popupLeft + "px";
	SettingContainer.style.top = popupTop + "px";
	SettingContainer.style.fontSize = "10px";
	SettingContainer.style.fontFamily = "ＭＳ ゴシック";
	SettingContainer.style.padding = "2px";
	SettingContainer.style.MozBorderRadius = "4px";
	SettingContainer.style.zIndex = 999;


	SettingContainer.setAttribute('vId', vId);
	d.body.appendChild(SettingContainer);

	$e(SettingContainer, "mousedown", function(event){
		if( event.target != $("SettingContainer")) {return false;}
		g_MD="SettingContainer";
		g_MX=event.pageX-parseInt(this.style.left,10);
		g_MY=event.pageY-parseInt(this.style.top,10);
		event.preventDefault();
	});

	$e(d, "mousemove", function(event){
		if(g_MD != "SettingContainer") return true;
		var SettingContainer = $("SettingContainer");
		if( !SettingContainer ) return true;
		var popupLeft = event.pageX - g_MX;
		var popupTop = event.pageY - g_MY;
		SettingContainer.style.left = popupLeft + "px";
		SettingContainer.style.top = popupTop + "px";
		//ポップアップ位置を永続保存
		GM_setValue(location.hostname + PGNAME + "_popup_left", popupLeft);
		GM_setValue(location.hostname + PGNAME + "_popup_top", popupTop);
	});

	$e(d, "mouseup", function(event){ g_MD=""; });

	var title = d.createElement("span");
	title.style.color = "#FFFFFF";
	title.style.font = 'bold 120% "ＭＳ ゴシック"';
	title.style.margin = "2px";
	title.innerHTML = "Auto Bushou Das ";

	var version = d.createElement("span");
	version.style.color = COLOR_TITLE;
	version.style.font = '96% "ＭＳ ゴシック"';
	version.style.margin = "2px";
	version.innerHTML = " Ver." + VERSION;

	var storageLimit = d.createElement("span");
	storageLimit.style.color = "#FFFFFF";
	storageLimit.style.font = '110% "ＭＳ Ｐゴシック"';
	storageLimit.style.margin = "2px";

	SettingContainer.appendChild(title);
	SettingContainer.appendChild(version);

	// ===== 攻撃系 =====
	var Attack_Box = d.createElement("table");
		Attack_Box.style.border = "solid 2px black";
		Attack_Box.style.margin = "0px 4px 4px 0px";
		Attack_Box.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 5;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ 攻撃系 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var td21 = d.createElement("td");	td21.style.padding = "3px";			td21.style.verticalAlign = "top";	td21.style.width = "120px";
	var td22 = d.createElement("td");	td22.style.padding = "3px";			td22.style.verticalAlign = "top";	td22.style.width = "120px";
	var td23 = d.createElement("td");	td23.style.padding = "3px";			td23.style.verticalAlign = "top";	td23.style.width = "120px";
	var td24 = d.createElement("td");	td24.style.padding = "3px";			td24.style.verticalAlign = "top";	td24.style.width = "120px";
	var td25 = d.createElement("td");	td25.style.padding = "3px";			td25.style.verticalAlign = "top";	td25.style.width = "120px";

	Attack_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Attack_Box.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);

	ccreateCheckBox(td21, "OPT_DOME1" , OPT_DOME[1] , " 剣兵の進撃 ", "剣兵の進撃を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME2" , OPT_DOME[2] , " 騎兵の進撃 ", "騎兵の進撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME3" , OPT_DOME[3] , " 槍兵の進撃 ", "槍兵の進撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME4" , OPT_DOME[4] , " 弓兵の進撃 ", "弓兵の進撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME5" , OPT_DOME[5] , " 兵器の進撃 ", "兵器の進撃を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME6"  , OPT_DOME[6]  , " 剣兵の強撃 ", "剣兵の強撃を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME7"  , OPT_DOME[7]  , " 騎兵の強撃 ", "騎兵の強撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME8"  , OPT_DOME[8]  , " 槍兵の強撃 ", "槍兵の強撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME9"  , OPT_DOME[9]  , " 弓兵の強撃 ", "弓兵の強撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME10" , OPT_DOME[10] , " 兵器の強撃 ", "兵器の強撃を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME11" , OPT_DOME[11] , " 剣兵の猛撃 ", "剣兵の猛撃を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME12" , OPT_DOME[12] , " 騎兵の猛撃 ", "騎兵の猛撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME13" , OPT_DOME[13] , " 槍兵の猛撃 ", "槍兵の猛撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME14" , OPT_DOME[14] , " 弓兵の猛撃 ", "弓兵の猛撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME15" , OPT_DOME[15] , " 兵器の猛撃 ", "兵器の猛撃を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME16" , OPT_DOME[16] , " 剣兵の極撃 ", "剣兵の極撃を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME17" , OPT_DOME[17] , " 騎兵の極撃 ", "騎兵の極撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME18" , OPT_DOME[18] , " 槍兵の極撃 ", "槍兵の極撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME19" , OPT_DOME[19] , " 弓兵の極撃 ", "弓兵の極撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME20" , OPT_DOME[20] , " 兵器の極撃 ", "兵器の極撃を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME21" , OPT_DOME[21] , " 剣兵突撃 ", "剣兵突撃を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME22" , OPT_DOME[22] , " 騎兵突撃 ", "騎兵突撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME23" , OPT_DOME[23] , " 槍兵突撃 ", "槍兵突撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME24" , OPT_DOME[24] , " 弓兵突撃 ", "弓兵突撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME25" , OPT_DOME[25] , " 兵器突撃 ", "兵器突撃を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME26" , OPT_DOME[26] , " 剣兵突覇 ", "剣兵突覇を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME27" , OPT_DOME[27] , " 騎兵突覇 ", "騎兵突覇を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME28" , OPT_DOME[28] , " 槍兵突覇 ", "槍兵突覇を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME29" , OPT_DOME[29] , " 弓兵突覇 ", "弓兵突覇を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME30" , OPT_DOME[30] , " 兵器突覇 ", "兵器突覇を付与・LVUPできる武将を残します。", 0);

	    ccreateText(td21, "OPT_DOME31" , " 　 "			, "", 5);
	ccreateCheckBox(td22, "OPT_DOME32" , OPT_DOME[32] , " 騎兵の進攻 "	, "騎兵の進攻を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME33" , OPT_DOME[33] , " 槍兵の進攻 "	, "槍兵の進攻を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME34" , OPT_DOME[34] , " 弓兵の進攻 "	, "弓兵の進攻を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td25, "OPT_DOME35" , " 　 "			, "", 0);

	ccreateCheckBox(td21, "OPT_DOME36" , OPT_DOME[36] , " 奇計百出 "	, "奇計百出を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME37" , OPT_DOME[37] , " 英雄 "		, "英雄を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME38" , OPT_DOME[38] , " 覇道 "		, "覇道を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME39" , OPT_DOME[39] , " 豪傑 "		, "豪傑を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME40" , OPT_DOME[40] , " 一騎当千 "	, "一騎当千を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME41" , OPT_DOME[41] , " 蛮族の襲撃 "	, "蛮族の襲撃を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME42" , OPT_DOME[42] , " 蛮王の襲撃 "	, "蛮王の襲撃を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME43" , OPT_DOME[43] , " 趁火打劫 "	, "趁火打劫を付与・LVUPできる武将を残します。", 0);

//	SettingContainer.appendChild(Attack_Box);


	// ===== 防御系 =====
	var Defense_Box = d.createElement("table");
		Defense_Box.style.border = "solid 2px black";
		Defense_Box.style.margin = "0px 4px 4px 0px";
		Defense_Box.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 5;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ 防御系 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var td21 = d.createElement("td");	td21.style.padding = "3px";		td21.style.verticalAlign = "top";	td21.style.width = "120px";
	var td22 = d.createElement("td");	td22.style.padding = "3px";		td22.style.verticalAlign = "top";	td22.style.width = "120px";
	var td23 = d.createElement("td");	td23.style.padding = "3px";		td23.style.verticalAlign = "top";	td23.style.width = "120px";
	var td24 = d.createElement("td");	td24.style.padding = "3px";		td24.style.verticalAlign = "top";	td24.style.width = "120px";
	var td25 = d.createElement("td");	td25.style.padding = "3px";		td25.style.verticalAlign = "top";	td25.style.width = "120px";

	Defense_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Defense_Box.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);

	ccreateCheckBox(td21, "OPT_DOME51" , OPT_DOME[51] , " 剣兵防御 ", "剣兵防御を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME52" , OPT_DOME[52] , " 騎兵防御 ", "騎兵防御を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME53" , OPT_DOME[53] , " 槍兵防御 ", "槍兵防御を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME54" , OPT_DOME[54] , " 弓兵防御 ", "弓兵防御を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME55" , OPT_DOME[55] , " 兵器防御 ", "兵器防御を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME56" , OPT_DOME[56] , " 剣兵方陣 ", "剣兵方陣を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME57" , OPT_DOME[57] , " 騎兵方陣 ", "騎兵方陣を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME58" , OPT_DOME[58] , " 槍兵方陣 ", "槍兵方陣を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME59" , OPT_DOME[59] , " 弓兵方陣 ", "弓兵方陣を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME60" , OPT_DOME[60] , " 兵器方陣 ", "兵器方陣を付与・LVUPできる武将を残します。", 0);

	    ccreateText(td21, "OPT_DOME61" , " 　 "			, "", 5);
	ccreateCheckBox(td22, "OPT_DOME62" , OPT_DOME[62] , " 騎兵の聖域 ", "騎兵の聖域を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME63" , OPT_DOME[63] , " 槍兵の聖域 ", "槍兵の聖域を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME64" , OPT_DOME[64] , " 弓兵の聖域 ", "弓兵の聖域を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td25, "OPT_DOME65" , " 　 "			, "", 0);

	    ccreateText(td21, "OPT_DOME66" , " 　 "			, "", 5);
	ccreateCheckBox(td22, "OPT_DOME67" , OPT_DOME[67] , " 騎兵堅守 ", "騎兵堅守を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME68" , OPT_DOME[68] , " 槍兵堅守 ", "槍兵堅守を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME69" , OPT_DOME[69] , " 弓兵堅守 ", "弓兵堅守を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td25, "OPT_DOME70" , " 　 "			, "", 0);

	ccreateCheckBox(td21, "OPT_DOME71" , OPT_DOME[71] , " 八卦の陣 ", "八卦の陣を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME72" , OPT_DOME[72] , " 鉄壁 "	, "鉄壁を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME73" , OPT_DOME[73] , " 守護神 "	, "守護神を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td24, "OPT_DOME74" , " 　 "			, "", 0);
	    ccreateText(td25, "OPT_DOME75" , " 　 "			, "", 0);

//	SettingContainer.appendChild(Defense_Box);

	// ===== 進軍系 =====
	var Anabasis_Box = d.createElement("table");
		Anabasis_Box.style.border = "solid 2px black";
		Anabasis_Box.style.margin = "0px 4px 4px 0px";
		Anabasis_Box.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 5;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ 進軍系 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var td21 = d.createElement("td");	td21.style.padding = "3px";		td21.style.verticalAlign = "top";	td21.style.width = "120px";
	var td22 = d.createElement("td");	td22.style.padding = "3px";		td22.style.verticalAlign = "top";	td22.style.width = "120px";
	var td23 = d.createElement("td");	td23.style.padding = "3px";		td23.style.verticalAlign = "top";	td23.style.width = "120px";
	var td24 = d.createElement("td");	td24.style.padding = "3px";		td24.style.verticalAlign = "top";	td24.style.width = "120px";
	var td25 = d.createElement("td");	td25.style.padding = "3px";		td25.style.verticalAlign = "top";	td25.style.width = "120px";

	Anabasis_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Anabasis_Box.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);

	ccreateCheckBox(td21, "OPT_DOME81" , OPT_DOME[81] , " 剣兵行軍 ", "剣兵行軍を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME82" , OPT_DOME[82] , " 騎兵行軍 ", "騎兵行軍を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME83" , OPT_DOME[83] , " 槍兵行軍 ", "槍兵行軍を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME84" , OPT_DOME[84] , " 弓兵行軍 ", "弓兵行軍を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME85" , OPT_DOME[85] , " 兵器行軍 ", "兵器行軍を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME86" , OPT_DOME[86] , " 剣兵強行 ", "剣兵強行を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME87" , OPT_DOME[87] , " 騎兵強行 ", "騎兵強行を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME88" , OPT_DOME[88] , " 槍兵強行 ", "槍兵強行を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME89" , OPT_DOME[89] , " 弓兵強行 ", "弓兵強行を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME90" , OPT_DOME[90] , " 兵器強行 ", "兵器強行を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME91" , OPT_DOME[91] , " 急速援護 ", "急速援護を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME92" , OPT_DOME[92] , " 千里行 "	, "千里行を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME93" , OPT_DOME[93] , " 神速 "	, "神速を付与・LVUPできる武将を残します。", 0);

//	SettingContainer.appendChild(Anabasis_Box);

	// ===== 内政系 =====
	var Politics_Box = d.createElement("table");
		Politics_Box.style.border = "solid 2px black";
		Politics_Box.style.margin = "0px 4px 4px 0px";
		Politics_Box.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 5;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ 内政系 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var td21 = d.createElement("td");	td21.style.padding = "3px";		td21.style.verticalAlign = "top";	td21.style.width = "120px";
	var td22 = d.createElement("td");	td22.style.padding = "3px";		td22.style.verticalAlign = "top";	td22.style.width = "120px";
	var td23 = d.createElement("td");	td23.style.padding = "3px";		td23.style.verticalAlign = "top";	td23.style.width = "120px";
	var td24 = d.createElement("td");	td24.style.padding = "3px";		td24.style.verticalAlign = "top";	td24.style.width = "120px";
	var td25 = d.createElement("td");	td25.style.padding = "3px";		td25.style.verticalAlign = "top";	td25.style.width = "120px";

	Politics_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Politics_Box.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);

	ccreateCheckBox(td21, "OPT_DOME101" , OPT_DOME[101] , " 伐採知識 "	, "伐採知識を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME102" , OPT_DOME[102] , " 石切知識 "	, "石切知識を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME103" , OPT_DOME[103] , " 製鉄知識 "	, "製鉄知識を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME104" , OPT_DOME[104] , " 食糧知識 "	, "食糧知識を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td25, "OPT_DOME105" , " 　 "			, "", 0);

	ccreateCheckBox(td21, "OPT_DOME106" , OPT_DOME[106] , " 伐採技術 "	, "伐採知識を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME107" , OPT_DOME[107] , " 石切技術 "	, "石切知識を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME108" , OPT_DOME[108] , " 製鉄技術 "	, "製鉄知識を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME109" , OPT_DOME[109] , " 食糧技術 "	, "食糧知識を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td25, "OPT_DOME110" , " 　 "			, "", 0);

	ccreateCheckBox(td21, "OPT_DOME111" , OPT_DOME[111] , " 練兵訓練 "	, "練兵訓練を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME112" , OPT_DOME[112] , " 厩舎訓練 "	, "厩舎訓練を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME113" , OPT_DOME[113] , " 兵舎訓練 "	, "兵舎修練を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME114" , OPT_DOME[114] , " 弓兵訓練 "	, "弓兵訓練を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME115" , OPT_DOME[115] , " 兵器訓練 "	, "兵器訓練を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME116" , OPT_DOME[116] , " 練兵修練 "	, "練兵修練を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME117" , OPT_DOME[117] , " 厩舎修練 "	, "厩舎修練を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME118" , OPT_DOME[118] , " 兵舎修練 "	, "兵舎修練を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td24, "OPT_DOME119" , OPT_DOME[119] , " 弓兵修練 "	, "弓兵修練を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td25, "OPT_DOME120" , OPT_DOME[120] , " 兵器修練 "	, "兵器修練を付与・LVUPできる武将を残します。", 0);

	ccreateCheckBox(td21, "OPT_DOME121" , OPT_DOME[121] , " 呉の治世 "	, "呉の治世を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME122" , OPT_DOME[122] , " 王佐の才 "	, "王佐の才を付与・LVUPできる武将を残します。", 0);
	ccreateCheckBox(td23, "OPT_DOME123" , OPT_DOME[123] , " 仁君 "		, "仁君を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td24, "OPT_DOME124" , " 　 "			, "", 0);
	    ccreateText(td25, "OPT_DOME125" , " 　 "			, "", 0);

	ccreateCheckBox(td21, "OPT_DOME126" , OPT_DOME[126] , " 加工知識 "	, "加工知識を付与・LVUPできる武将を残します。", 5);
	ccreateCheckBox(td22, "OPT_DOME127" , OPT_DOME[127] , " 加工技術 "	, "加工技術を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td23, "OPT_DOME128" , " 　 "			, "", 0);
	ccreateCheckBox(td24, "OPT_DOME129" , OPT_DOME[129] , " 農林技術 "	, "農林技術を付与・LVUPできる武将を残します。", 0);
	    ccreateText(td25, "OPT_DOME130" , " 　 "			, "", 0);

//	SettingContainer.appendChild(Politics_Box);

	// ===== チェック範囲 ====
	var Other_Box2 = d.createElement("table");
		Other_Box2.style.border = "solid 2px black";
		Other_Box2.style.margin = "0px 4px 4px 0px";
		Other_Box2.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 11;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ チェック範囲 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var td21 = d.createElement("td");	td21.style.padding = "3px";		td21.style.verticalAlign = "top";	td21.style.width = "120px";
	var td22 = d.createElement("td");	td22.style.padding = "3px";		td22.style.verticalAlign = "top";	td22.style.width = "120px";
	var td23 = d.createElement("td");	td23.style.padding = "3px";		td23.style.verticalAlign = "top";	td23.style.width = "120px";
	var td24 = d.createElement("td");	td24.style.padding = "3px";		td24.style.verticalAlign = "top";	td24.style.width = "120px";
	var td25 = d.createElement("td");	td25.style.padding = "3px";		td25.style.verticalAlign = "top";	td25.style.width = "120px";

	Other_Box2.appendChild(tr1);
	tr1.appendChild(td1);
	Other_Box2.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);

	ccreateCheckBox(td21, "OPT_OTHER36" , OPT_OTHER[36] , " 初期スキル "		, "初期スキルのチェックを行います。"		, 5);
	ccreateCheckBox(td22, "OPT_OTHER37" , OPT_OTHER[37] , " 攻撃振り "		, "攻撃振りレシピのチェックを行います。"	, 1);
	ccreateCheckBox(td23, "OPT_OTHER38" , OPT_OTHER[38] , " 防御振り "		, "防御合成レシピのチェックを行います。"	, 1);
	ccreateCheckBox(td24, "OPT_OTHER39" , OPT_OTHER[39] , " 知力振り "		, "知力合成レシピのチェックを行います。"	, 1);
	ccreateCheckBox(td25, "OPT_OTHER40" , OPT_OTHER[40] , " 隠し "			, "隠し合成レシピのチェックを行います。"	, 1);
	ccreateCheckBox(td21, "OPT_OTHER42" , OPT_OTHER[42] , " コモン強制破棄 "	, "レアリティが「Ｃ」のカードは破棄します。"	, 5);

	// ===== 画面表示系 ====
	var Other_Box3 = d.createElement("table");
	    Other_Box3.style.border = "solid 2px black";
	    Other_Box3.style.margin = "0px 4px 4px 0px";
	    Other_Box3.style.width = "100%";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 11;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ 画面表示系 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var td21 = d.createElement("td");	td21.style.padding = "3px";			td21.style.verticalAlign = "top";
	var td22 = d.createElement("td");	td22.style.padding = "3px";			td22.style.verticalAlign = "top";
	var td23 = d.createElement("td");	td23.style.padding = "3px";			td23.style.verticalAlign = "top";
	var td24 = d.createElement("td");	td24.style.padding = "3px";			td24.style.verticalAlign = "top";
	var td25 = d.createElement("td");	td25.style.padding = "3px";			td25.style.verticalAlign = "top";
	var td26 = d.createElement("td");	td26.style.padding = "3px";			td26.style.verticalAlign = "top";

	Other_Box3.appendChild(tr1);
	tr1.appendChild(td1);
	Other_Box3.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);
	tr2.appendChild(td26);

	td21.appendChild( createRadioBtn ( 'DF', '変更しない' ) );
	td22.appendChild( createRadioBtn ( 'OL', '旧モード' ) );
	td23.appendChild( createRadioBtn ( 'SP', '春に変更' ) );
	td24.appendChild( createRadioBtn ( 'SU', '夏に変更' ) );
	td25.appendChild( createRadioBtn ( 'AU', '秋に変更' ) );
	td26.appendChild( createRadioBtn ( 'WI', '冬に変更' ) );

	ccreateCheckBox(td21, "OPT_OTHER41" , OPT_OTHER[41] , " すけすけモード "	, "カード枠を半透明にします。"				, 5);

	// ===== その他 =====
	var Other_Box = d.createElement("table");
		Other_Box.style.border = "solid 2px black";
		Other_Box.style.margin = "0px 4px 4px 0px";
		Other_Box.style.width = "100%";
//		Other_Box.style.width = "420px";

	var tr1 = d.createElement("tr");
	var td1 = d.createElement("td");	td1.colSpan = 11;	td1.style.backgroundColor = COLOR_TITLE;	ccreateText(td1, "dummy", "■ その他の設定 ■", 0 );
	var tr2 = d.createElement("tr");	tr2.style.backgroundColor = COLOR_BACK;		tr2.style.border = "solid 1px black";
	var td21 = d.createElement("td");	td21.style.padding = "3px";		td21.style.verticalAlign = "top";
	var td22 = d.createElement("td");	td22.style.padding = "3px";		td22.style.verticalAlign = "top";
	var td23 = d.createElement("td");	td23.style.padding = "3px";		td23.style.verticalAlign = "top";
	var td24 = d.createElement("td");	td24.style.padding = "3px";		td24.style.verticalAlign = "top";
	var td25 = d.createElement("td");	td25.style.padding = "3px";		td25.style.verticalAlign = "top";
	var td26 = d.createElement("td");	td26.style.padding = "3px";		td26.style.verticalAlign = "top";
	var td27 = d.createElement("td");	td27.style.padding = "3px";		td27.style.verticalAlign = "top";
	var td28 = d.createElement("td");	td28.style.padding = "3px";		td28.style.verticalAlign = "top";
	var td29 = d.createElement("td");	td29.style.padding = "3px";		td29.style.verticalAlign = "top";
	var td30 = d.createElement("td");	td30.style.padding = "3px";		td30.style.verticalAlign = "top";
	var td31 = d.createElement("td");	td31.style.padding = "3px";		td31.style.verticalAlign = "top";

	Other_Box.appendChild(tr1);
	tr1.appendChild(td1);
	Other_Box.appendChild(tr2);
	tr2.appendChild(td21);
	tr2.appendChild(td22);
	tr2.appendChild(td23);
	tr2.appendChild(td24);
	tr2.appendChild(td25);
	tr2.appendChild(td26);
	tr2.appendChild(td27);
	tr2.appendChild(td28);
	tr2.appendChild(td29);
	tr2.appendChild(td30);
	tr2.appendChild(td31);

	ccreateText(td21, "dummy", "破棄除外カード№", 0 );
	ccreateTextBox(td22,"OPT_OTHER0", OPT_OTHER[0],"","",6,0);
	ccreateTextBox(td23,"OPT_OTHER1", OPT_OTHER[1],"","",6,0);
	ccreateTextBox(td24,"OPT_OTHER2", OPT_OTHER[2],"","",6,0);
	ccreateTextBox(td25,"OPT_OTHER3", OPT_OTHER[3],"","",6,0);
	ccreateTextBox(td26,"OPT_OTHER4", OPT_OTHER[4],"","",6,0);
	ccreateTextBox(td27,"OPT_OTHER5", OPT_OTHER[5],"","",6,0);
	ccreateTextBox(td28,"OPT_OTHER6", OPT_OTHER[6],"","",6,0);
	ccreateTextBox(td29,"OPT_OTHER7", OPT_OTHER[7],"","",6,0);
	ccreateTextBox(td30,"OPT_OTHER8", OPT_OTHER[8],"","",6,0);
	ccreateTextBox(td31,"OPT_OTHER9", OPT_OTHER[9],"","",6,0);
	ccreateText(td21, "dummy", "　", 0 );
	ccreateTextBox(td22,"OPT_OTHER10", OPT_OTHER[10],"","",6,0);
	ccreateTextBox(td23,"OPT_OTHER11", OPT_OTHER[11],"","",6,0);
	ccreateTextBox(td24,"OPT_OTHER12", OPT_OTHER[12],"","",6,0);
	ccreateTextBox(td25,"OPT_OTHER13", OPT_OTHER[13],"","",6,0);
	ccreateTextBox(td26,"OPT_OTHER14", OPT_OTHER[14],"","",6,0);
	ccreateTextBox(td27,"OPT_OTHER15", OPT_OTHER[15],"","",6,0);
	ccreateTextBox(td28,"OPT_OTHER16", OPT_OTHER[16],"","",6,0);
	ccreateTextBox(td29,"OPT_OTHER17", OPT_OTHER[17],"","",6,0);
	ccreateTextBox(td30,"OPT_OTHER18", OPT_OTHER[18],"","",6,0);
	ccreateTextBox(td31,"OPT_OTHER19", OPT_OTHER[19],"","",6,0);
	ccreateText(td21, "dummy", "　", 0 );
	ccreateTextBox(td22,"OPT_OTHER20", OPT_OTHER[20],"","",6,0);
	ccreateTextBox(td23,"OPT_OTHER21", OPT_OTHER[21],"","",6,0);
	ccreateTextBox(td24,"OPT_OTHER22", OPT_OTHER[22],"","",6,0);
	ccreateTextBox(td25,"OPT_OTHER23", OPT_OTHER[23],"","",6,0);
	ccreateTextBox(td26,"OPT_OTHER24", OPT_OTHER[24],"","",6,0);
	ccreateTextBox(td27,"OPT_OTHER25", OPT_OTHER[25],"","",6,0);
	ccreateTextBox(td28,"OPT_OTHER26", OPT_OTHER[26],"","",6,0);
	ccreateTextBox(td29,"OPT_OTHER27", OPT_OTHER[27],"","",6,0);
	ccreateTextBox(td30,"OPT_OTHER28", OPT_OTHER[28],"","",6,0);
	ccreateTextBox(td31,"OPT_OTHER29", OPT_OTHER[29],"","",6,0);

	var Operation_Box = d.createElement("table");
		Operation_Box.style.border ="solid 0px gray";
		Operation_Box.style.fontFamily = "ＭＳ ゴシック";

	var tr711 = d.createElement("tr");
	var td711 = d.createElement("td");
		td711.style.padding = "3px";
		td711.style.verticalAlign = "top";

	Operation_Box.appendChild(tr711);
		tr711.appendChild(td711);

	ccreateButton(td711, "保存", "設定内容を保存します", function() {
		SaveSettingBox()
		alert("保存しました");
	});
	ccreateButton(td711, "閉じる", "設定内容を保存せず閉じます", function() {
		closeSettingBox();
	});

	// == コンテナ設定 ==
	// 上段
	var tbl000 = d.createElement("table");	// 全体
		tbl000.style.border = "solid 0px lime";

	var tr000 = d.createElement("tr");
	var td001 = d.createElement("td");	// 左枠
		td001.style.verticalAlign = "top";
//		td001.style.width = "720px";
		td001.appendChild(Attack_Box);
		td001.appendChild(Defense_Box);

		td001.appendChild(Politics_Box);
		td001.appendChild(Anabasis_Box);
		td001.appendChild(Other_Box2);
		td001.appendChild(Other_Box3);
		td001.appendChild(Other_Box);

//	var td002 = d.createElement("td");	// 右枠
//		td002.style.verticalAlign = "top";
//		td002.style.paddingLeft = "4px";
//		td002.style.width = "420px";
//		td002.appendChild(Politics_Box);
//		td002.appendChild(Anabasis_Box);
//		td002.appendChild(Other_Box);

	// 	レイアウト

	SettingContainer.appendChild(tbl000);
		tbl000.appendChild(tr000);
		tr000.appendChild(td001);
//		tr000.appendChild(td002);


	SettingContainer.appendChild(Operation_Box);

}

// セーブ ==========================================================================================================================================================================
function SaveSettingBox(){

	strSave = "";
	for (i = 0; i < 201; i++){
		try {
			strSave += cgetCheckBoxValue($("OPT_DOME" + i))   + DELIMIT2;
		} catch(e) {
			strSave += "0" + DELIMIT2;
		}
	}

	for (i = 0; i < 43; i++){
		try {
			if (i < 30) {
				strSave += cgetTextBoxValue($("OPT_OTHER" + i)) + DELIMIT2;
			} else {
				strSave += cgetCheckBoxValue($("OPT_OTHER" + i)) + DELIMIT2;
			}
	    } catch(e) {
			strSave += "0" + DELIMIT2;
		}
	}
	strSave += OPT_SEASON;

	GM_setValue(HOST+PGNAME, strSave);
}

// ロード ==========================================================================================================================================================================
function LoadSettingBox(){
	var src = GM_getValue(HOST+PGNAME, "");
	if (src == "") {
		OPT_OTHER[36] = 1;	// 通常
		OPT_OTHER[37] = 1;	// 攻撃
		OPT_OTHER[38] = 1;	// 防御
		OPT_OTHER[39] = 1;	// 知力
		OPT_OTHER[40] = 1;	// 隠し
		OPT_OTHER[41] = 1;	// スケスケ
		OPT_OTHER[42] = 0;	// コモン強制破棄

		return;
	}
	var Temp = src.split(DELIMIT2);
	for (i = 0; i < 201; i++){
		OPT_DOME[i]  = parseInt(Temp[i]);
	}
	for (i = 0; i < 43; i++){
		OPT_OTHER[i] = parseInt(Temp[201 + i]);
	}
	if ((Temp[243] == undefined) || (Temp[243] == "")) {
		OPT_SEASON = "DF";
	} else {
		OPT_SEASON = Temp[243];
	}
}

// 破棄チェック ====================================================================================================================================================================
function checkDestruction(cardno) {

	// メモ
	// シルバー以上：UC簡雍(1027) UC曹洪(2045) UC伊籍(1023) UC?沢(3021) UC諸葛瑾(3014)

    try {
		// 特定番号の除外
		for (i=0;i<30;i++) {
			if (cardno == OPT_OTHER[i]) {
				return 0;
			}
		}
		// レアリティが R・SR・UR の場合は破棄しない
		if (card_list[cardno].Rate == "R" || card_list[cardno].Rate == "SR" || card_list[cardno].Rate == "UR") {
			return 0;
		}


		// UC劉備(1007) UC諸葛亮(1009) UC徐庶(1014) UC孫権(3008) UC朱桓(3092) 水鏡(4079/4080/4081/4082) は破棄しない
		if (cardno == 1007 || cardno == 1009 || cardno == 1014 || cardno == 3008 || cardno == 3092 || cardno == 4079 || cardno == 4080 || cardno == 4081 || cardno == 4082) {
			return 0;
		}

//		//　hasekunオーダー武将　ac.1
//		if (cardno == 2026 || cardno == 3017 || cardno == 2056 || cardno == 2037 || cardno == 4018 || cardno == 2045 || cardno == 3018 || cardno == 2046 || cardno == 2031 || cardno == 4019 || cardno == 2038 || cardno == 4022 || cardno == 4023 || cardno == 2032 || cardno == 2017 || cardno == 2018 || cardno == 1033 || cardno == 1034) {//ac/1
//			return 0;
//		}

		// コスト３以上
		if (card_list[cardno].Cost >= 3.0) {
			return 0;
		}

		// 上記条件以外のコモンカードの強制破棄処理
		if (card_list[cardno].Rate == "C" && OPT_OTHER[42] == 1) {
			return 1;
		}

		// 保持スキルのチェック
		if (OPT_OTHER[36] == 1) {	for (i=0;i<Skill_List.length;i++){	if (card_list[cardno].Skill0 == Skill_List[i][0]) {		if (OPT_DOME[Skill_List[i][1]] == 1) {	return 0;	}	}	}	}	// LVUP 可能
		if (OPT_OTHER[37] == 1) {	for (i=0;i<Skill_List.length;i++){	if (card_list[cardno].Skill1 == Skill_List[i][0]) {		if (OPT_DOME[Skill_List[i][1]] == 1) {	return 0;	}	}	}	}	// 合成：攻撃
		if (OPT_OTHER[38] == 1) {	for (i=0;i<Skill_List.length;i++){	if (card_list[cardno].Skill2 == Skill_List[i][0]) {		if (OPT_DOME[Skill_List[i][1]] == 1) {	return 0;	}	}	}	}	// 合成：防御
		if (OPT_OTHER[39] == 1) {	for (i=0;i<Skill_List.length;i++){	if (card_list[cardno].Skill3 == Skill_List[i][0]) {		if (OPT_DOME[Skill_List[i][1]] == 1) {	return 0;	}	}	}	}	// 合成：知力
		if (OPT_OTHER[40] == 1) {	for (i=0;i<Skill_List.length;i++){	if (card_list[cardno].Skill4 == Skill_List[i][0]) {		if (OPT_DOME[Skill_List[i][1]] == 1) {	return 0;	}	}	}	}	// 合成：隠し

		// 全部のチェック抜けたら破棄する
		return 1;

    } catch(e) {
		// 未知のカード番号だった
		return 0;
    }
}

// チェックボックスの状態取得
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

// 設定画面表示
function openSettingBilderBox() {
	addSettingHtml();
}

// 設定画面クローズ
function closeSettingBox() {
	deleteSettingHtml();
	deleteSettingFrameHtml();
}

// 設定画面削除
function deleteSettingHtml() {
	var elem = d.getElementById("SettingContainer");
	if (elem == undefined) return;
	d.body.removeChild(d.getElementById("SettingContainer"));
}

function deleteSettingFrameHtml() {
	var elem = d.getElementById("SettingContainer");
	if (elem == undefined) return;
	d.body.removeChild(document.getElementById("SettingContainer"));
}

function ccreateText(container, id, text, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "1px";
	dv.style.paddingLeft= left + "px";
	dv.style.paddingBottom = "3px";

	var lb = d.createElement("label");
	lb.htmlFor = id;
	lb.style.verticalAlign = "middle";
	var tx = d.createTextNode(text);
	tx.fontsize = "10px";
	lb.appendChild( tx );

	dv.appendChild(lb);
	container.appendChild(dv);
}

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

function ccreateButton(container, text, title, func, width)
{
	var btn = d.createElement("input");
	btn.style.padding = "0px";
	btn.type = "button";
	btn.value = text;
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

function ccreateTextBox(container, id, def, text, title, size, left )
{
	left += 2;
	var dv = d.createElement("div");
	dv.style.padding = "1px";
	dv.style.paddingLeft= left + "px";
	dv.title = title;
	var tb = d.createElement("input");
	tb.type = "text";
	tb.id = id;
	tb.value = def;
	tb.size = size;
	tb.style.verticalAlign = "middle";
	tb.style.textAlign = "right";
	tb.style.paddingRight = "3px";

	var tx = d.createTextNode(text);
	tx.title = title;
	
	dv.appendChild(tx);
	dv.appendChild(tb);
	container.appendChild(dv);
	return tb;
}

//3桁カンマ区切り
function addFigure(str) {
　var num = new String(str).replace(/,/g, "");
　while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
　return num;
}

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function cloadData(key, value, local, ev)
{
    if( local ) key = location.hostname + key  + PGNAME;
    var ret = GM_getValue(key, value);
    return ev ? eval('ret='+ret) : ret;
}

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

// ラジオボタン生成 @@@@ add 2011.09.06
function createRadioBtn ( value, txt ) {
    var radioLabel = document.createElement('label');
    radioLabel.style.display = 'inline-block';
    radioLabel.style.margin = '2px 0px 2px 2px';
    radioLabel.style.padding = '5px';
    radioLabel.addEventListener ( 'click', function(){ OPT_SEASON = value;}, true );
    var radioLabelText = document.createTextNode(" " + txt);
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'tweetOpt';
    radioButton.value = value;
	radioButton.style.verticalAlign = "top";
    if ( OPT_SEASON == value ) radioButton.checked = true;
    radioLabel.appendChild( radioButton );
    radioLabel.appendChild( radioLabelText );
    return radioLabel;
}
