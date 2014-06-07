// ==UserScript==
// @name           bro3_npc_castle_info2
// @namespace      http://homepage3.nifty.com/Craford
// @include        http://*.17pk.com.tw/*
// @description    ブラウザ三国志NPC砦情報取得_2nd
// @version        2.40
// ==/UserScript==
// version date       author
// ver2.00 2010.12.20 ドワクエ Craford 初版の設計を見直し、再構築
// ver2.01 2010.12.21 ドワクエ Craford ☆レベル数字表示補正
// ver2.02 2010.12.22 ドワクエ Craford 領土枠色に「灰」「白」「橙」を追加。空き地着色機能追加。
// ver2.03 2010.12.25 ドワクエ Craford 縮小マップにグリッドラインを追加。一騎当千対応
// ver2.04 2011.01.01 ドワクエ Craford 検索レイアウト変更。特定資源強調表示モードを追加
// ver2.05 2011.01.01 ドワクエ Craford 特定資源強調表示を３枠に拡大。
// ver2.06 2011.01.02 ドワクエ Craford 特定資源強調表示に１期★４(2-2-2-2)が抜けていたため追加。メニュー隠蔽機能追加
// ver2.07 2011.01.13 ドワクエ Craford css修正等の微調整。
// ver2.08 2011.01.15 ドワクエ Craford 各種調整等。
// ver2.09 2011.01.16 ドワクエ Craford 一部ロジック修正。
// ver2.10 2011.01.17 ドワクエ Craford 処理テストのための改版
// ver2.11 2011.01.17 ドワクエ Craford 処理テストのための改版その２
// ver2.12 2011.01.17 ドワクエ Craford 処理テストのための改版その３
// ver2.13 2011.01.17 ドワクエ Craford 使用するクッキーのキー数を、５→３に削減。コメント化ロジックの削除
// ver2.14 2011.01.20 ドワクエ Craford facebookのlands & legendsに対応
// ver2.15 2011.01.21 ドワクエ Craford 20x20モードの不備に対応
// ver2.16 2011.01.22 ドワクエ Craford 使用するクッキーのキー数を、３→２に削減。
// ver2.17 2011.01.23 ドワクエ Craford 更新ボタン押下時に、画面リロードをかけずに画面更新するように修正
// ver2.18 2011.01.23 ドワクエ Craford ルート構築モードを正式リリース。ツール初回使用時の表示不具合を修正。
// ver2.19 2011.02.01 ドワクエ Craford 更新時、本拠地一覧、縮小マップが動的に再描画されない問題に対応。
// ver2.20 2011.02.03 ドワクエ Craford 画像リソース定義をロジック外に移動。ルート構築モードでのルート検証を自動で行うように修正。
// ver2.21 2011.02.05 ドワクエ Craford ルート自動構築モードの実装。一部バグ修正。
// ver2.22 2011.02.06 ドワクエ Craford ルート自動構築モードのバグ修正。同盟検索連携の実装。強調表示のバグ修正。
// ver2.23 2011.02.08 ドワクエ Craford ルート自動構築モードで終点解除を可能とする仕様の実装。自動構築オプションを保持するように修正。
// ver2.24 2011.02.08 ドワクエ Craford ルート自動構築モードの構築ルートについて可変モードを実装。
// ver2.25 2011.02.09 ドワクエ Craford ルート自動構築モードで終了クリック時、メッセージ表示前にルートチェックするようにしてみる。
// ver2.26 2011.03.01 ドワクエ Craford スプレッドシートとの出兵情報共有の実装。
// ver2.27 2011.03.01 ドワクエ Craford 出兵共有機能のアイコン表示を、有効/無効切り替え時に動的更新。
// ver2.28 2011.03.01 ドワクエ Craford 動的更新時にポップヒントの表示が追加されてしまう不具合を修正。
// ver2.29 2011.03.01 ドワクエ Craford 出兵データがない行が含まれるとその先が表示されない問題に対応。
// ver2.30 2011.03.02 ドワクエ Craford mixi版のマップデータ出力htmlの仕様変更に対応。
// ver2.31 2011.03.08 ドワクエ Craford ユーザー名に処理不能な文字があるとき、半角空白に変える処理を追加
// ver2.32 2011.03.09 ドワクエ Craford 自動ルート構築モードの仕様変更。終点の連続定義（中間指定）で、連続したルート構築ができるようにする（プラン段階）
// ver2.33 2011.03.11 ドワクエ Craford 方位表示機能をこちらに移動。
// ver2.34 2011.03.23 ドワクエ Craford 本鯖仕様変更対応。
// ver2.35 2011.03.24 ドワクエ Craford mixi版スタイルシート変更対応。本鯖51x51モードに資源判別モード対応。
// ver2.36 2011.03.24 ドワクエ Craford includeつけわすれｗ
// ver2.37 2011.03.26 ドワクエ Craford 51x51モードに領土検索ツールのオプション設定内容が反映されるようにした。
// ver2.38 2011.03.26 ドワクエ Craford 資源判別オフなのに太字になる不具合を修正。
// ver2.39 2011.03.26 ドワクエ Craford 51x51の英字表示を変更
// ver2.40 2011.03.26 ドワクエ Craford 51x51モードに自動ルート構築実装

var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var OWNER_SPLITKEY = " ";
var VERSION_KEY = "vtX200";
var VERSION = "2.40";

// データフラグ（初期値）
var FLAG1 = "1000000000";
var FLAG2 = "0000000  0  0  0000000000";
var FLAG3_1 = "010000情報を表示する１";
var FLAG3_2 = "010000情報を表示する２";
var FLAG3_3 = "010000情報を表示する３";
var FLAG4   = "";

// ブラウザ判別用
var browserType;

// 新鯖判定用
var add51_51mode = 0;

// スプレッドシート名
var spreadsheet = '';

// 共通関数
var d = document;
var $d = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $e = function(key) { return d.evaluate(key, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); };

// 検索オプション(種別)
var FLAG1_NPC = 0; // NPC砦
var FLAG1_LV1 = 1; // ☆1
var FLAG1_LV2 = 2; // ☆2
var FLAG1_LV3 = 3; // ☆3
var FLAG1_LV4 = 4; // ☆4
var FLAG1_LV5 = 5; // ☆5
var FLAG1_LV6 = 6; // ☆6
var FLAG1_LV7 = 7; // ☆7
var FLAG1_LV8 = 8; // ☆8
var FLAG1_LV9 = 9; // ☆9

// 検索オプション(特殊1)
var FLAG2_EMPTY = 0;            // 空き地検索
var FLAG2_LAND = 1;             // 領土検索
var FLAG2_ANALYZE = 2;          // 資源判別検索
var FLAG2_RADER = 3;            // レーダーの表示
var FLAG2_OWNER = 4;            // 本拠地一覧の表示
var FLAG2_EMPTY_DRAW = 5;       // 空き地を着色
var FLAG2_EMPTY_DRAW_COLOR = 6; // 空き地の枠色
var FLAG2_STRONG_AREANO = 7;    // 強調表示領地リスト番号(3桁)
var FLAG2_STRONG_AREANO2 = 10;  // 強調表示領地リスト番号(3桁)
var FLAG2_STRONG_AREANO3 = 13;  // 強調表示領地リスト番号(3桁)
var FLAG2_MENU2 = 16;           // メニュークローズドスイッチ2
var FLAG2_MENU4 = 17;           // メニュークローズドスイッチ4
var FLAG2_HFUNC = 18;           // 
var FLAG2_SEARCH_LEVEL = 19;    // ルート探索：探索レベル
var FLAG2_SKIP_RES = 20;        // ルート探索：回避資源タイプ
var FLAG2_SKIP_USER = 21;       // 個人領地を通過
var FLAG2_SKIP_GROUP = 22;      // グループ領地を通過
var FLAG2_RANDOM_ROUTE = 23;    // 可変ルート
var FLAG2_DIRECTION = 24;       // 方位表示

// 検索オプション(個人/同盟検索)
var FLAG3_ENABLE = 0;  // 有効/無効
var FLAG3_USER = 1;    // ユーザー検索
var FLAG3_GROUP = 2;   // 同盟検索
var FLAG3_MATCH = 3;   // 完全一致
var FLAG3_FILL = 4;    // 領土着色のみ
var FLAG3_COLOR = 5;   // カラー番号
var FLAG3_NAME = 6;    // 個人、同盟名称

// 検索オプション(個人/同盟検索)
//var FLAG5_ROUTE_MODE = 0;    // ルート構築モード
//var FLAG5_PUT_RESOURCE = 1;  // 資源情報出力
//var FLAG5_AUTO_MODE = 2;     // 自動ルート構築モード
//var FLAG5_ROUTE = 3;         // ルートデータ

// ルート自動構築用変数
var AUTO_ROUTE_NONE = 0;
var AUTO_ROUTE_EDIT_FIRST = 1;
var AUTO_ROUTE_EDIT_LAST = 2;
var AUTO_ROUTE_EDIT_END = 3;

var autoroute = AUTO_ROUTE_NONE;
var autoroute_f = [0,0,""];
var autoroute_l = [0,0,""];

// 個人/同盟検索結果表示色
var cname = ["赤","紫","桃","橙","黄","緑","水","青","灰","白"];
var cname_en = ["red","purple","pink","orange","yellow","green","cyan","blue","gray","white"];

var season1 = [
		["なし",                   0, 0, 0, 0, 0, " "],		// 0
		["☆1( 1- 0- 0- 0) 1期～", 1, 0, 0, 0, 1, "A"],		// 1
		["☆1( 0- 1- 0- 0) 1期～", 0, 1, 0, 0, 1, "B"],		// 2
		["☆1( 0- 0- 1- 0) 1期～", 0, 0, 1, 0, 1, "C"],		// 3
		["☆1( 0- 0- 0- 1) 1期～", 0, 0, 0, 1, 1, "D"],		// 4
		["☆2( 3- 0- 0- 0) 1期～", 3, 0, 0, 0, 2, "E"],		// 5
		["☆2( 0- 3- 0- 0) 1期～", 0, 3, 0, 0, 2, "F"],		// 6
		["☆2( 0- 0- 3- 0) 1期～", 0, 0, 3, 0, 2, "G"],		// 7
		["☆3( 1- 1- 1- 0) 1期～", 1, 1, 1, 0, 3, "H"],		// 8
		["☆3( 0- 0- 0- 4) 1期～", 0, 0, 0, 4, 3, "I"],		// 9
		["☆3( 0- 0- 0- 1) 2期～", 0, 0, 0, 1, 3, "J"],		// 10
		["☆4( 2- 2- 2- 0) 1期～", 2, 2, 2, 0, 4, "K"],		// 11
		["☆4( 2- 2- 2- 2) 1期  ", 2, 2, 2, 2, 4, "L"],		// 12
		["☆4( 0- 0- 0- 8) 1期～", 0, 0, 0, 8, 4, "M"],		// 13
		["☆5( 6- 0- 0- 0) 1期～", 6, 0, 0, 0, 5, "N"],		// 14
		["☆5( 0- 6- 0- 0) 1期～", 0, 6, 0, 0, 5, "O"],		// 15
		["☆5( 0- 0- 6- 0) 1期～", 0, 0, 6, 0, 5, "P"],		// 16
		["☆5( 0- 0- 0- 1) 2期～", 0, 0, 0, 1, 5, "Q"],		// 17
		["☆5( 2- 2- 1- 0) 3期～", 2, 2, 1, 0, 5, "R"],		// 18
		["☆5( 1- 1- 2- 0) 3期～", 1, 1, 2, 0, 5, "S"],		// 19
		["☆6(10- 0- 0- 0) 1期～",10, 0, 0, 0, 6, "T"],		// 20
		["☆6( 0-10- 0- 0) 1期～", 0,10, 0, 0, 6, "U"],		// 21
		["☆6( 0- 0-10- 0) 1期～", 0, 0,10, 0, 6, "V"],		// 22
		["☆6( 2- 2- 2- 0) 2期～", 2, 2, 2, 0, 6, "W"],		// 23
		["☆7( 3- 3- 3- 0) 1期  ", 3, 3, 3, 0, 7, "X"],		// 24
		["☆7( 2- 4- 4- 0) 2期～", 2, 4, 4, 0, 7, "Y"],		// 25
		["☆7( 0- 0- 0- 1) 2期～", 0, 0, 0, 1, 7, "Z"],		// 26
		["☆7( 0- 0- 0-12) 2期～", 0, 0, 0,12, 7, "a"],		// 27
		["☆8( 4- 4- 4- 4) 1期  ", 4, 4, 4, 4, 8, "b"],		// 28
		["☆8( 4- 1- 2- 0) 2期～", 4, 1, 2, 0, 8, "c"],		// 29
		["☆8( 2- 4- 1- 0) 2期～", 2, 4, 1, 0, 8, "d"],		// 30
		["☆8( 1- 2- 4- 0) 2期～", 1, 2, 4, 0, 8, "e"],		// 31
		["☆8(14- 0- 0- 0) 3期～",14, 0, 0, 0, 8, "f"],		// 32
		["☆8( 0-14- 0- 0) 3期～", 0,14, 0, 0, 8, "g"],		// 33
		["☆8( 0- 0-14- 0) 3期～", 0, 0,14, 0, 8, "h"],		// 34
		["☆9( 0- 0- 0-18) 1期～", 0, 0, 0,18, 9, "i"],		// 35
		["☆9( 1- 1- 1- 2) 2期～", 1, 1, 1, 2, 9, "j"],		// 36
		["☆9( 4- 4- 4- 4) 2期～", 4, 4, 4, 4, 9, "k"],		// 37
		["☆9( 1- 0- 0- 0) 3期～", 1, 0, 0, 0, 9, "l"],		// 38
		["☆9( 0- 1- 0- 0) 3期～", 0, 1, 0, 0, 9, "m"],		// 39
		["☆9( 0- 0- 1- 0) 3期～", 0, 0, 1, 0, 9, "n"]		// 40
];

// ルート探索条件
var croutename = ["☆1のみ","☆2以下","☆3以下","☆4以下","☆5以下","☆6以下","☆7以下","☆8以下","☆回避なし"];
var croutelim = ["なし","★2森","★2岩","★2鉄"];
var groupname = ["指定なし","No.1","No.2","No.3"];

// 探索パターン（距離１）
var chkptn = [ [1,0], [0,1], [-1,0], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1] ];
var chkptn_r  = [
		[ 1, 0], [ 0, 1], [-1, 0], [ 0,-1],	// 01
		[ 1, 0], [ 0, 1], [ 0,-1], [-1, 0],	// 02
		[ 1, 0], [-1, 0], [ 0, 1], [ 0,-1],	// 03
		[ 1, 0], [-1, 0], [ 0,-1], [ 0, 1],	// 04
		[ 1, 0], [ 0,-1], [-1, 0], [ 0, 1],	// 05
		[ 1, 0], [ 0,-1], [ 0, 1], [-1, 0],	// 06
		[ 0, 1], [ 1, 0], [-1, 0], [ 0,-1],	// 07
		[ 0, 1], [ 1, 0], [ 0,-1], [-1, 0],	// 08
		[ 0, 1], [-1, 0], [ 1, 0], [ 0,-1],	// 09
		[ 0, 1], [-1, 0], [ 0,-1], [ 1, 0],	// 10
		[ 0, 1], [ 0,-1], [-1, 0], [ 1, 0],	// 11
		[ 0, 1], [ 0,-1], [ 1, 0], [-1, 0],	// 12
		[-1, 0], [ 1, 0], [ 0, 1], [ 0,-1],	// 13
		[-1, 0], [ 1, 0], [ 0,-1], [ 0, 1],	// 14
		[-1, 0], [ 0, 1], [ 1, 0], [ 0,-1],	// 15
		[-1, 0], [ 0, 1], [ 0,-1], [ 1, 0],	// 16
		[-1, 0], [ 0,-1], [ 0, 1], [ 1, 0],	// 17
		[-1, 0], [ 0,-1], [ 1, 0], [ 0, 1],	// 18
		[ 0,-1], [ 1, 0], [ 0, 1], [-1, 0],	// 19
		[ 0,-1], [ 1, 0], [-1, 0], [ 0, 1],	// 20
		[ 0,-1], [ 0, 1], [ 1, 0], [-1, 0],	// 21
		[ 0,-1], [ 0, 1], [-1, 0], [ 1, 0],	// 22
		[ 0,-1], [-1, 0], [ 0, 1], [ 1, 0],	// 23
		[ 0,-1], [-1, 0], [ 1, 0], [ 0, 1],	// 24
		[ 1, 1], [ 1,-1], [-1, 1], [-1,-1],	// 25
		[ 1, 1], [ 1,-1], [-1,-1], [-1, 1],	// 26
		[ 1, 1], [-1, 1], [ 1,-1], [-1,-1],	// 27
		[ 1, 1], [-1, 1], [-1,-1], [ 1,-1],	// 28
		[ 1, 1], [-1,-1], [-1, 1], [ 1,-1],	// 29
		[ 1, 1], [-1,-1], [ 1,-1], [-1, 1],	// 30
		[ 1,-1], [ 1, 1], [-1, 1], [-1,-1],	// 31
		[ 1,-1], [ 1, 1], [-1,-1], [-1, 1],	// 32
		[ 1,-1], [-1, 1], [ 1, 1], [-1,-1],	// 33
		[ 1,-1], [-1, 1], [-1,-1], [ 1, 1],	// 34
		[ 1,-1], [-1,-1], [-1, 1], [ 1, 1],	// 35
		[ 1,-1], [-1,-1], [ 1, 1], [-1, 1],	// 36
		[-1, 1], [ 1, 1], [ 1,-1], [-1,-1],	// 37
		[-1, 1], [ 1, 1], [-1,-1], [ 1,-1],	// 38
		[-1, 1], [ 1,-1], [ 1, 1], [-1,-1],	// 39
		[-1, 1], [ 1,-1], [-1,-1], [ 1, 1],	// 40
		[-1, 1], [-1,-1], [ 1,-1], [ 1, 1],	// 41
		[-1, 1], [-1,-1], [ 1, 1], [ 1,-1],	// 42
		[-1,-1], [ 1, 1], [ 1,-1], [-1, 1],	// 43
		[-1,-1], [ 1, 1], [-1, 1], [ 1,-1],	// 44
		[-1,-1], [ 1,-1], [ 1, 1], [-1, 1],	// 45
		[-1,-1], [ 1,-1], [-1, 1], [ 1, 1],	// 46
		[-1,-1], [-1, 1], [ 1,-1], [ 1, 1],	// 47
		[-1,-1], [-1, 1], [ 1, 1], [ 1,-1]	// 48
];

// ルート探索条件（資源回避）
var cchkres = [ 0, 5, 6, 7 ];

// ルート指定文字列
// （案）
// 1. 起点にはマークSをつけ、XY座標を記録
// 2. 中間点にはPマークをつける
// 3. 起点、あるいは中間点からの方位
//    左上A、上B、右上C、右D、右下E、下F、左下G、左H
// 4. リピート数(a=1)
//    abcdefghijklmnopqrst 最大20
// 5. 資源情報(1-40)、zの場合、次のzまでが砦名。yは個人拠点
//    ABCDEFGHIJLKMNOPQRSTUVWZYZabcdefghijklmn
//
// 例.起点(100,-100)、右下☆1木1、右下☆2木3、右下☆1木1、右下☆1木1、右下☆1木1、右下☆1木1、右上NPC砦南東砦238
//    S 100-100EfAEAAAACz南東砦238z

//--------------------------------//
// アイコン定義（パステルカラー） //
//--------------------------------//
var icon_c = new Array();

// 通常モード（１１ｘ１１用）
icon_c[0] = new Array();
icon_c[0][0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAk0lEQVR42u3VwQmAMAxA0WY'+
		'EwV0cwnkdwl0ER6heRKhnS/n5/5hLeIe0UWstmQrB8ATTE0xPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9LqCI+Kz7N4faPC2v/vWJXK'+
		'Aj7OUeRIsWLBgwYIFC+4AfkoBbmdo8AgJpucN/w1O90r7D9PB7QwNHiHB9ATTE0xPMD3B9NKBL9LFOZj2H7EeAAAAAElFTkSuQmCC';
icon_c[0][1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAtElEQVR42u3XOxKCMBgAYX6'+
		'OYMF4J8/AMb2UBUcwSkOR4CjMxOiyW+YB8yVVIqXUHakQDE8wPcH0BNMTTE8wPcH0BNMTTE8wPcH0BNMTTK8qOCLefvz5/0CB0+3'+
		'6en64QMH3qZzsT2Bw3nwAVHA+ttw4Ebx2AIIFCxYsWLBgwYIF7wTmYzm4mK98AE1fS8X6L9x4u/fw2vrzCAF/up5ww1v3/DX4FxN'+
		'MTzA9wfQE0xNM73DgBw8JYpiEhB6BAAAAAElFTkSuQmCC';
icon_c[0][2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAr0lEQVR42u3VsRKDIBAAUa5'+
		'KnfxWvje/ZWorEgvrw4IZ2dut0fGBQPTeW6VCMDzB9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0xPML2p4Ii4/PL/98TS4G//DI9/xps'+
		'B3tuWjn20FwecdUwIBpyNOf8ABHhkQgQLXghcbg+XPKVL3sPnCmbhwAcoCweeDRIs2D08D5yFOqWzUPfwaAjw1WeWBt8xwfQE0xN'+
		'MTzA9wfTKgX8OKmKYVBXGEwAAAABJRU5ErkJggg==';
icon_c[0][3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAsElEQVR42u3VwQ2DMBAAQV8'+
		'HiGJoIvXSRIqJ0oEJD34ImwdSvLf7PhBjsIlaa8lUCIYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpCab3KDgibt/89zwxNPhd1+7'+
		'5JV4M8Ld8mrNTmTngVvuCYMCtmeMLQIB7FkSw4IHA6fZwylPa//BJqDfcmkHt4Z4FESx4IHC6PZzylPY/fBECfPeaocH/mGB6guk'+
		'JpieYnmB66cAbnXhimOdx8jMAAAAASUVORK5CYII=';
icon_c[0][4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAqElEQVR42u3TMRKDIBQAUX5'+
		't53VyBM/rEbxOOmu0SQocgk0SXXY7+A7O0yFyzqmnQjA8wfQE0xNMTzA9wfQE0xNMTzA9wfQE0xNMTzC9r4Ij4nD4/r44O78leM7'+
		'Lez3F4wD+NL8t+JnWNKahCq7NBQsWLFjwr8FlaHAtJLgVCtwK9Ydbz6Du8JkPIliwYMGCrw5+1QW43EOD/5FgeoLpCaYnmJ5get2'+
		'BN8++qph3fIzUAAAAAElFTkSuQmCC';
icon_c[0][5] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAsElEQVR42u3XMRKDIBBA0Wy'+
		'V2lzL8+ZasbYieoGsTAbRz/81Mr6CRaOU8hipEAxPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0yvKTgiqjff3iduDX4vx/efp2C'+
		'AP2u+9vWEgXdQFg68g7Jw4NYgwYI9w+3AWagpnYW6h7POPOPdv6XPHmpd/5Z6THHBgv8EZWtw4OGmtPfwjxDg2mduDb5igukJpie'+
		'YnmB6gukNB/4CHypimDIwJQkAAAAASUVORK5CYII=';
icon_c[0][6] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAsklEQVR42u3VsQ2DMBBA0Vy'+
		'djnUYIfNmhKyTjtqENhI6kDCG7/9r2+IVd0Qp5dFTIRieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmJ5heVXBE7H789z1xa/Dnvf3'+
		'98RUM8PTNzz4HGHgBZeHACygLB64NEizYGa4HzkJt6ayu/sNnznjzGT57qTXd0i22uGDBB4P/Q4PXQoKzUOCtIcB779wafMUE0xN'+
		'MTzA9wfQE0+sOPAO9jouYRH9pQgAAAABJRU5ErkJggg==';
icon_c[0][7] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAo0lEQVR42u3QQQ5AMBQAUX9'+
		'lzbWc17VYWxUJiTQRLERMZ3btb5q+RkqpKqkQDE8wPcH0BNMTTE8wPcH0BNMTTE8wPcH0BNMTTO9VcEQ8vnx5T/wanPrx/vmugYC'+
		'H6fpwW8PAC+i0bY4Dr6C8fI4DH0FXc8G/Ae/rEsD5Hhp850MECxYsWLBgwYIFvwre1yWA8z00+IsE0xNMTzA9wfQE0ysOPAMbFYa'+
		'YImwD1wAAAABJRU5ErkJggg==';
icon_c[0][8] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAAqklEQVR42u3UwQmAMBAAQa8'+
		'F27Je27KFqOBDAiH6EMze7vcu4iAmSilTpkIwPMH0BNMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wvU/BEfH64cf7xNDgsq7P95cFAt6'+
		'2/vI8w8AHqNk1x4FPUF09x4HvoN5csOABwHVocDMkuBcOnO4LZ/yHU97SgungOjS4GRLcCwV+uk8Avz0zNPiPCaYnmJ5geoLpCaa'+
		'XDrwDAUW0mKahbVUAAAAASUVORK5CYII=';
icon_c[0][9] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAArUlEQVR42u3VQQ5AMBBAUXM'+
		'Ft3Qit3SFIrGQJgwLif7+v+0Qr1KilDL0VAiGJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6Qmm9yk4Il7ffHueaBpcpun5/DxDwMu'+
		'SD48jDLyBLjvWceAdVFev48BnULYuWHAD4Do0+DIkOAsFziK94WwGdYafbIhgwQ2BuzvDXX6l/Q/fzRPAb69pGvzHBNMTTE8wPcH'+
		'0BNPrDrwCyACLmJpZR94AAAAASUVORK5CYII=';

// 通常モード（１５ｘ１５用）
icon_c[1] = new Array();
icon_c[1][0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAZklEQVR42u3TsQ2AMAxFQTw'+
		'VQzAvQzCVQaIJFVUUW7rXufm6IonM3DoVwMDAwMDAwJUCBgYGBv4ZjPgMPvtRHnxe7+axBzAwMDDwAvB4lwfPDrjdk2j56dqBx7s'+
		'8eHbAwMDAwGu7ARPd2ak7UfORAAAAAElFTkSuQmCC';
icon_c[1][1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAdUlEQVR42u3VywmAMBAFQLc'+
		'Jm7Jem7KJ6MWDXzwkMeK847I8hhDYSCl1X0oAAwMDAwMDtxRgYGBg4JOSiMuSpT+aBKdpPM77AbjIl1jxzYL3eGBgYGDguuC7w7G'+
		'ZZ8AXPc2bnUyv/V/wk71mwDUDDAwMDPxuZukM7anou6r5AAAAAElFTkSuQmCC';
icon_c[1][2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAfElEQVR42u3TsQ2AMAxEUW4'+
		'E5mJe5mIEAwUdjiIFwVn8a2M5z5KtiJgqRYABAwYMGDBgpwAGDBgw4JsmUleT4y/ZgLdYmzWzFsBD4OztGsQK3BoE8C9XouTRlQW'+
		'fsCy24CdggFvgLJYrkcX26MqAe+pswG8GMGDAgAF/mx0rnO2pIl/VqAAAAABJRU5ErkJggg==';
icon_c[1][3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAeElEQVR42u3TQQqAMAxEUed'+
		'SXqLn9RJeKrrpzoaCoBP6Z5uQvkCqiNgqRYABAwYMGDBgpwAGDBgw4Ich0tSQ+y3ZgM840p5dDfAr8KjWF7ECZ4sAXvIkSn66cuB'+
		'RzfIkskUAL3kSJT9dOfBMnw34ywAGDBgw4H9zASZ+7amio7DkAAAAAElFTkSuQmCC';
icon_c[1][4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAc0lEQVR42u3Syw2AIBAFQLc'+
		'uS7BeS7AuNJ4gQS/+1mTeCZbkZSBEKWX4UwIYGBgYGBg4U4CBgYGBOyURTcnWGWfzFOC5LPt6irEB9+bAwMA3g+ukBx8F+Cr46Cz'+
		'llzi7CDAw8Mvgep8e/MgjAAMDAwN/mhV9vBe4d0lEIAAAAABJRU5ErkJggg==';
icon_c[1][5] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAfklEQVR42u3VsRGAMAxDUTQ'+
		'CczEvczGCgR7nUiQgH19tcs4rrIsiYqkUAQYMGDBgwICdAhgwYMCAH4ZIXUOut2QD3o/2nG0V4CHgG5bFFjwCBrgFzmK5EllsS1c'+
		'GnJ2N3u2pX/OMMv4TXG4lSpauHLjnng34zQAGDBgw4G9zAiuc7ankdBvGAAAAAElFTkSuQmCC';
icon_c[1][6] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAfElEQVR42u3TwQ2AMAhGYf+'+
		'5HMF5HcG5UK9GmialCsl754Z+B5CZLZUSYMCAAQMGDDhTgAEDBgz4ZYjUNeT6S2nAx96es24CHAK+YV5pwREwwC2wV8qV8Ep7dOX'+
		'Az5WI3u2pRzfjGAGXWwkvwKPgnndpwF8GGDBgwID/7QRyWgG4ei4f7wAAAABJRU5ErkJggg==';
icon_c[1][7] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAcklEQVR42u3QwQmAMAwFUDO'+
		'CczmvczlC1YPQgxYRpRHevyWE5LVRShn+lAAGBgYGBgbOFGBgYGDgkyURt5ZstyINuMxLe2YagV8B77A6dT8t+IBd9YGfgOs6Pbj'+
		'1EGBgYGDgvuC6Tg/+5BOAgYGBgbtmBbpmAriV8cm1AAAAAElFTkSuQmCC';
icon_c[1][8] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAeUlEQVR42u3TQQrAIAxE0eZ'+
		'8ntfzpe2ikEVTBMVO4M8yDPEtjLn7USkGGDBgwIABA1YKYMCAAQN+WWI2tOR6y2TA3vt3pzXAS8A3LCbOZcEPLJsDngXHyIPTDuB'+
		'F4HJfouTRlQPHyIPTDuBJ8EhPBrwzgAEDBgz435zr1xW4O4eh7gAAAABJRU5ErkJggg==';
icon_c[1][9] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMA/wD/AP83WBt9AAAAeklEQVR42u3TQQqAMAxEUXP'+
		'cnqjHjboQsjClUNEJ/lmmIX2F1Nx9qxQDDBgwYMCAASsFMGDAgAHfDDGbGnLcZTJgb23c0zvgR8AnLCbWZcEXLKsDXgXHyIPTHsC'+
		'L4OxMciVGDwH8y5Uo+enKgWf6ZMBvBjBgwIABf5sd0goBuPzg7coAAAAASUVORK5CYII=';

// 通常モード（２０ｘ２０用）
icon_c[2] = new Array();
icon_c[2][0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAT0lEQVR42u3SsQkAIAxEUW8'+
		'qh3Beh3CqaKOdXeAU/q/SGB5BRURxJxAgQIAAAQKEAyHpPF57ZEP0EaVVgQDxFmLPNkRW/1+CP5EdCBAgbk0OjJy/yRhvJQAAAAB'+
		'JRU5ErkJggg==';
icon_c[2][1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAZklEQVR42u3UQQrAIAxE0c4'+
		'leqme10v1EqmrFKxuJCRd/NlFUB4DRmZ2VEcgQIAAAQIEiEyEpM+l/o7SEXa3dz6vGoQ30DEliLERECB+gZj9Dp83MCF7ws83Gwn'+
		'bmOlNRAcECBCrPPueqb9NtTxIAAAAAElFTkSuQmCC';
icon_c[2][2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAZklEQVR42u3TsQ2AMAxEUW4'+
		'E5mJe5mIEAwWNkRsUnRH8Ky0leTklioipOwIBAgQIECBAOBGSykXHfrIhtlhv81mLF5FnJ8qKqJr5XxOveRPXzXNaEE8O/V4TOe2'+
		'/w97E6IAAAaLKDpSiqb9xGAVvAAAAAElFTkSuQmCC';
icon_c[2][3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAYElEQVR42u3SsQnAMAxE0dx'+
		'SWSLzZoksJceFmxiRwiAZ9K8U2DyOk5kd2REIECBAgAABIhIhyX30/qcwxGP3dD91xSK+t44KRXjN1GuCTfw1U6+JbTcxkraJ1YA'+
		'AAcJLA7hvqb+ZTBceAAAAAElFTkSuQmCC';
icon_c[2][4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAX0lEQVR42u3QQQpAIQhF0d6'+
		'6WkLrbQl/XdakCKFRoH9w30gF4ajMrGRHIECAAAECBIhIhKS9NPfl+zBEt6801Y04exBpiJU0hE84ws/CP3H7DIjfIFadhng+AgQ'+
		'IEJcMJijFv15TAzAAAAAASUVORK5CYII=';
icon_c[2][5] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAaUlEQVR42mP8//8/w0ADxlF'+
		'HjDpi1BGjjhh1xKgjRh1BT0cwMjLi1AQ0j5Fujtj6HlOftyAj/R0BsnTAQ4Jcnw+/kEAHdE8T6GKURA9VyglK08jQDYlBmyZgYMD'+
		'SBKVg1BGjjhh1BC4AAJSiqb+NvhCCAAAAAElFTkSuQmCC';
icon_c[2][6] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAZUlEQVR42u3SwRGAIAxEUbc'+
		'uS6BeS7CuqFecXITZjMzfKxN4JFFEbNURCBAgQIAAAcKJkJQW3ffJhjiPd93e5Ec8j5Z34uvP1+tEn/KdGBnPlJ0Y3ZH/d6KPHZG'+
		'd2RCzAwIEiCwXx8e2v9yP3/EAAAAASUVORK5CYII=';
icon_c[2][7] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAZUlEQVR42u3QsQ3AIAxEUW4'+
		'E5sq8zJURHJAIRSIrBZKd4rvCSODnk5mV7BIIECBAgAABIhIhyX3U/1MYwtr5vj9qPGIMXQnMPgUxhj77MMRKIAvxlQwIEL9B3Oc'+
		'0xPYSIECAcOoCT+K3v5E4knUAAAAASUVORK5CYII=';
icon_c[2][8] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAbElEQVR42u3QsQ3AIAwEQH4'+
		'ECqZiXqZKwQgmkZIUsdxF74J3Z1vg08PMSnZBCCGEEEIIIYRgIgCEj87/QEPYGH7eOx9xHX0TuPsUxDFnabXmItKTcPNtk3iOfvv'+
		'9knBzNiLa0RB/lxBCCBHVArM9wr9FTulDAAAAAElFTkSuQmCC';
icon_c[2][9] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMA/wD/AP83WBt9AAAAb0lEQVR42u3SQQrAIBADQPM'+
		'ED32kL/KRPfiEbQvFQ2VPhaTQ5OaCOoRFRBR1YIQRRhhhhBFGMBEA0kvne6AhorV13jsfcX06G7jPEsQ+Rtlq1SLkTSxzNuI5oze'+
		'RNfO/Jj67E7MR1U68jRFGGJHlADoQtb8fdhutAAAAAElFTkSuQmCC';

//--------------------------//
// アイコン定義（資源表示） //
//--------------------------//
var icon_cs = new Array();

// 資源モード（１１ｘ１１用） 資源アイコン＝numx5+maxtype、0=平均,1=木,2=石,3=鉄,4=糧
icon_cs[0] = new Array();
icon_cs[0][1*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlUlEQVR42u3XwQ2AIBAAQa8'+
		'zSqcz5WlQY9Sgsuw+CQbmeBk552mkQjA8wfQE0xNMTzA9wfQE0xNMTzA9wfQE0xNMTzC9puCU0ny2p5wfKHDp+PAIwYJ7A9'+
		'dr6wHgwHsDECxYsGDBggULFiz4JrBeq8F1rQfw6d/S5jIvvLhgwQ/BV7/pGvzHBNMTTE8wPcH0BNMbDrwA2HoUTHu/QmkAA'+
		'AAASUVORK5CYII=';
icon_cs[0][1*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAjUlEQVR42u3XQQqAIBBA0eZ'+
		'mHt2bVcuYoiiQ9Pv/UoTxzc6otS4zFYLhCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpNQWXUtanO/v8YIHvyCFY8Hjg3P'+
		'GEBr5cgGDBggULFixYsGDBH4G5BM61XsC/v6XTawQL7h/8sqHBPSaYnmB6gukJpieY3nTgDQ4o7j0786IyAAAAAElFTkSuQ'+
		'mCC';
icon_cs[0][1*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAkUlEQVR42u3XQQ6AIAwAQfs'+
		'zns7P0KOpRqOGKOvumYROORG11ulPhWB4gukJpieYnmB6gukJpieYnmB6gukJpieYnmB6XcGllHZ2Zrk/WOB2YI4QLHg4cG'+
		'69ABp4dwGCBQsWLFiwYMGCBd8E5hI413sB7/6WNtP0f3HBgp+CLzY0+IsJpieYnmB6gukJpvc78AxgUQFM5g3eGQAAAABJR'+
		'U5ErkJggg==';
icon_cs[0][1*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAnUlEQVR42u3Xyw2AIBAAUem'+
		'MAizEkizEAugMPRrUGDX4GWeOBANvORlSSs2fCoLhCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpVQXHGPPenun8gALnod'+
		's+vO0FC/4auFybDwAHXhuAYMGCBQsWLFiwYMEngeVaCS6rPYBH/5YWl7nhxQULvgg++s2nwW9MMD3B9ATTE0xPML3fgUeQA'+
		'xRM1lP3xgAAAABJRU5ErkJggg==';
icon_cs[0][1*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAl0lEQVR42u3XwQ2AIBTAUNm'+
		'M0RiNzdCjQY1Rg0ppjwQD73My5JynkQqC4QmmJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6TUFxxjL2Z7l/IACl5KODw9JsO'+
		'DewPXaegA48N4ABAsWLFiwYMGCBQu+CazXanBd6wF8+re0ucwLLy5Y8EPw1W+6Bv8xwfQE0xNMTzA9wfSGA88f7hRMF9xrQ'+
		'AAAAABJRU5ErkJggg==';
icon_cs[0][2*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlUlEQVR42u3Uuw3AIAwA0Xg'+
		'zRmezfLp0QIGEz3c1SH5IOHrvV6VCMDzB9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0xPML2t4NbavXrnnSdSg9/mh4kQLPh08O'+
		'jM/0HSg2ceRLDgROByf7jklhZcCfyBRuHAu0GCBfuH94GHw9C2tGAiePVOavCJCaYnmJ5geoLpCaZXDvwAidoUTLsKuaAAA'+
		'AAASUVORK5CYII=';
icon_cs[0][2*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAjklEQVR42u3UsQ3AIAwAwXg'+
		'zRmezJCUdUCDh938Nkg/JRO/9qVQIhieYnmB6gukJpieYnmB6gukJpieYnmB6gukJpncU3Fp7d+/880Ru8A45BAu+HzxrPJ'+
		'EdvPQgggXnAZfb4Zq/tOBK4AUKDnwaJFiwO3wQPJ1GsOD7wZulBt+YYHqC6QmmJ5ieYHrlwB9gme49lH1iwQAAAABJRU5Er'+
		'kJggg==';
icon_cs[0][2*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlklEQVR42u3UsQ3AIAwAwXg'+
		'zRmM0NiNJlw4okML7v7fEWTLRWrsyFYLhCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpbQWXUvrqzPOeOBpc+7y5RggW/H'+
		'fwEPlZyPHgmYUIFnwQON0Np/ylBWcCv6BROPBukGDB3vA+8CjcLy2YCF6dORr8xwTTE0xPMD3B9ATTSwe+AYnPFExJ/c4ZA'+
		'AAAAElFTkSuQmCC';
icon_cs[0][2*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAnUlEQVR42u3UwQ2AIBAAQem'+
		'MAizEkizEAugM9ecPeZDA3u4bkhsSLpVStkglwfAE0xNMTzA9wfQE0xNMTzA9wfQE0xNMTzA9wfSGgnPOtffOM09aGlyv4/'+
		'8w+ylY8Ozg1pnvgywP/vMgggUvBA73h0NuacGRwC+oFQ48GiRYsH94HLg5DG1LCyaCe+8sDZ4xwfQE0xNMTzA9wfTCgW/CN'+
		'BRMgcyHLgAAAABJRU5ErkJggg==';
icon_cs[0][2*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmElEQVR42u3UsQ3AIAwAwXg'+
		'zRmM0NiNJlw4okML7vwbJh4SjtXZlKgTDE0xPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9ATT2woupfTVO888cTS49zo/TFTBgv'+
		'8OHp35Psjx4JkHESz4IHC6P5xySwvOBH5Bo3Dg3SDBgv3D+8DDYWhbWjARvHrnaPAfE0xPMD3B9ATTE0wvHfgGic8UTHYe2'+
		'DgAAAAASUVORK5CYII=';
icon_cs[0][3*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAk0lEQVR42u3UsQ3AIAwAwXg'+
		'zRmezhJIOKCLh938NEmfJRO/9qVQIhieYnmB6gukJpieYnmB6gukJpieYnmB6gukJpvcruLX2nt4Z74nU4NH+YyIEC74dvD'+
		'ozDyQ9eGcgggUnApfb4ZK/tGA6eHUGtcM7AxEsOBG43A6X/KUF08Gnd1KDb0wwPcH0BNMTTE8wvXLgDymtFEw2w8zzAAAAA'+
		'ElFTkSuQmCC';
icon_cs[0][3*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAj0lEQVR42u3UsQ3AIAwAwXg'+
		'zRvdmScp0QBEJv/9rkDgkOzLz6lQIhieYnmB6gukJpieYnmB6gukJpieYnmB6gukJpvcreIxx79553xO1wTvkECz4fPCs74'+
		'nq4KUPESy4DrjdDPfc0oLp4FmkGV76EMGC64DbzXDPLS2YDt6sNPjEBNMTTE8wPcH0BNNrB34AQHvuPb+XPdMAAAAASUVOR'+
		'K5CYII=';
icon_cs[0][3*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlUlEQVR42u3UsQ3AIAwAwXg'+
		'zRmM0NiMp0wFFpPj931viLJkYY1yVCsHwBNMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wPcH0PgW31ubpzPOeSA3uc9/cIwQL/j'+
		't4iXwtJD14ZyGCBScCl7vhkr+0YDp4iSTd8M5CBAtOBC53wyV/acF08OlMavAfE0xPMD3B9ATTE0yvHPgGKaIUTJnXjs4AA'+
		'AAASUVORK5CYII=';
icon_cs[0][3*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAnElEQVR42u3UwQ2AIBAAQem'+
		'MAizEkizEAugMffoDHybc3u4bEuaSo7TWtkwVwfAE0xNMTzA9wfQE0xNMTzA9wfQE0xNMTzA9wfR+Bdda+9c7z3tKaHC/jv'+
		'nH7KdgwauDR2feAwkPnhmIYMGBwOl2OOUvLZgOHp1B7fDMQAQLDgROt8Mpf2nBdPDXO6HBKyaYnmB6gukJpieYXjrwDWIHF'+
		'Ez77vfEAAAAAElFTkSuQmCC';
icon_cs[0][3*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlklEQVR42u3UsQ3AIAwAwXg'+
		'zRmM0NiMp0wFFpPj9X4PEWTIxxrgqFYLhCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpfQpurc3TO897IjV4zr7/mOiCBf'+
		'8dvDrzHkh68M5ABAtOBC63wyV/acF08OoMaod3BiJYcCJwuR0u+UsLpoNP76QG/zHB9ATTE0xPMD3B9MqBbymiFExqxYjtA'+
		'AAAAElFTkSuQmCC';
icon_cs[0][4*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAjUlEQVR42u3TQQqAIBBA0eZ'+
		'mHn1uVu4Cg3Qj2ff/5SjoE4zMPHYqBMMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wPcH0BNObCi6lnO2snhej678E1+7DIh7gt3'+
		'XBggULFix4MrgNDe5eRrDg9cG9Pag/PPIgggULFixY8ELgdoYGf5FgeoLpCaYnmJ5getuBL0erTEz9e/DyAAAAAElFTkSuQ'+
		'mCC';
icon_cs[0][4*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAiklEQVR42u3TQQ6AIAwAQfs'+
		'znt6fqUeDRrgQcdk90kMZEiIzt5UKwfAE0xNMTzA9wfQE0xNMTzA9wfQE0xNMTzA9wfSGgkspe3127ove+T/BV1I8gF/mgg'+
		'ULFixY8GDwLTS4eRvBgucHtyL94a4HESxYsGDBgicCV6HBXySYnmB6gukJpieY3nLgA5z/FkyE00qIAAAAAElFTkSuQmCC';
icon_cs[0][4*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAj0lEQVR42u3TsQ3AIAwAwXg'+
		'zRmM0NiPpIhEp0KCE57+0C+uQiFLKsVMhGJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpCaYnmN5UcEqptrPrXozulwTneptyxA'+
		'P8thcsWLBgwYIng9vQ4F6CBS8A7iJJf3jkQQQLFixYsOAfgdsZGvxFgukJpieYnmB6gultBz4Bd0BMTAjR+bMAAAAASUVOR'+
		'K5CYII=';
icon_cs[0][4*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlUlEQVR42u3T0QmAIBgA4dz'+
		'MARqkkRqkAdzMegsM0hfJzrvHX0E/wZBSWmYqCIYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpCabXFRxjzOXsOi+0rv8SnI'+
		'/tPmzdH+C3dcGCBQsWLLgzuAwNrl5GsODxwbU9qD/c8iCCBQsWLFjwQOByhgZ/kWB6gukJpieYnmB604FP1MVMTN7QRIwAA'+
		'AAASUVORK5CYII=';
icon_cs[0][4*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAkElEQVR42u3TQQqAIBQA0f7'+
		'NPJpH82bWLjBIN5KNM8uvoE8wSinHToVgeILpCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5gelPBKaXazq7zYnT9l+Ba831Y5A'+
		'f4bV2wYMGCBQueDG5Dg7uXESx4fXBvD+oPjzyIYMGCBQsWvBC4naHBXySYnmB6gukJpieY3nbgE3dATEzrDQwkAAAAAElFT'+
		'kSuQmCC';
icon_cs[0][5*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAl0lEQVR42u3X0Q2AIAwAUbs'+
		'Zo7OZ4gSVGESOu29I+j5oQtRaj50KwfAE0xNMTzA9wfQE0xNMTzA9wfQE0xNMTzA9wfSGgkspZ++dNk8sDW49HyZCsOCVwD'+
		'coCwceDRIs2Dc8DpwOQ9vSgong7MzXS23qb2nGFhcs+CUoO4MDb7elBdPBvXeWBv8xwfQE0xNMTzA9wfS2A1+J2hRM1ehdo'+
		'wAAAABJRU5ErkJggg==';
icon_cs[0][5*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAkUlEQVR42u3XwQ3AIAzAwGY'+
		'zRmezthsEVFHA2H+k3CORiFrrdVIhGJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpCaYnmN5QcCnl7n3zzhN7g3vIIVjwXuAGCg'+
		'48GiRYsDs8EJxOI1jw+uCsn4/a1N/SjCsuWPBXUBYOfNyVFkwHd7Y1eMUE0xNMTzA9wfQE0zsO/ABgme49CLjCJwAAAABJR'+
		'U5ErkJggg==';
icon_cs[0][5*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmUlEQVR42u3XwQ2AIBAAQa8'+
		'zSqM0OkOtAIlBZNl9cwnz4BKilHLsVAiGJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmNxScUqq9M9d9Ymlwrs/NOUKw4J'+
		'XAN6gVDjwaJFiwb3gcuBVuSwsmgpvIj5fa1N/SjC0uWPBLUOsMDrzdlhZMB/fOLA3+Y4LpCaYnmJ5geoLpbQc+AYnPFEzE1'+
		'4m/AAAAAElFTkSuQmCC';
icon_cs[0][5*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAoElEQVR42u3XwQ2AIBAAQem'+
		'MAizEkizEAugMtQIkBpFl9w3JzYNLCCmlZaaCYHiC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHpNwTHGXHvnmicMDc7H9n'+
		'yYdRcseCTwDSqFA7cGCRbsG24HLg5D29KCieDSma+XWtffUo8tLljwS1DpDA483ZYWTAfX3hka/McE0xNMTzA9wfQE05sOf'+
		'ALCNBRMX0ydFAAAAABJRU5ErkJggg==';
icon_cs[0][5*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmklEQVR42u3XwQ2AIBAAQa8'+
		'zSqM0OkOtAIlBZNl9Q3Lz4BKilHLsVAiGJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmNxScUqq9d655Ymlwrfn5MJEFC1'+
		'4JfINa4cCjQYIF+4bHgZvD0La0YCK4debrpTb1tzRjiwsW/BLUOoMDb7elBdPBvXeWBv8xwfQE0xNMTzA9wfS2A5+JzxRME'+
		'AzzLgAAAABJRU5ErkJggg==';
icon_cs[0][6*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmElEQVR42u3USwrAIAwA0eZ'+
		'mHt2b9bMtBSvUquPMPpC3SCLnvK1UCIYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpCabXFJxS2mtnzn1iavDZ+2UiBAueCX'+
		'yBSuHArUGCBXvD7cDFZWhfWjAd/HTDfz+1rl+6xxcXLPhj8D00uLiMYMHjg2tnpgaPmGB6gukJpieYnmB6y4EP4pIvTGm1u'+
		'xgAAAAASUVORK5CYII=';
icon_cs[0][6*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAkklEQVR42u3UwQ2AIBAFUbc'+
		'zSqcz9a4Jkoiw48ydZN+BH7XW7U+FYHiC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHpDwaWUvffNeU/kBveQQ7DgXOAHFB'+
		'x4NEiwYP/wQHDzGsGCc4HvKB+P2tSVnrHiggW/DL6EBjevESx4fXBnqcErJpieYHqC6QmmJ5je78AHpYj/Pb/nAgQAAAAAS'+
		'UVORK5CYII=';
icon_cs[0][6*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmElEQVR42u3UwQ2AIBAFUbc'+
		'zSrM0OkO9GhMkEZFx5k7CO+yPnPPyp0IwPMH0BNMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wva7glFJpfbP/J6YGr+W+eY0QLH'+
		'gm8AGqhQP3BgkW7A33A9fCrbRgOvjqht8etaErPWLFBQt+GHwODa4lWPAE4NY3U4O/mGB6gukJpieYnmB6vwNvxMMvTPaPW'+
		'gkAAAAASUVORK5CYII=';
icon_cs[0][6*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAoUlEQVR42u3UwQ2AIBAAQem'+
		'MAizEkizEAugM9WtMkERU1t3/JTePu5BSGv5UEAxPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0yvKTjGmGtntn1C1+C8TN'+
		'eXGWfBgnsC76BSOHBrkGDB3nA7cHEZ2pcWTAef3fDTT+3VL/3GFxcs+GbwMTS4uIxgwd8H1850Df5igukJpieYnmB6gun9D'+
		'rwC5fQvTLXT0wUAAAAASUVORK5CYII=';
icon_cs[0][6*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAm0lEQVR42u3UwQ2AIBAAQem'+
		'M0iiNzlC/xgRNRGDZ/V9y87gLOedtpYJgeILpCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5gek3BMcbydubYJ0wNLiU9XyYkwY'+
		'JnAp+gWjhwa5Bgwd5wO3B1GdqXFkwH393w30+t65fu8cUFC/4YfA0Nri4jWPD44LczU4NHTDA9wfQE0xNMTzC95cA7xMMvT'+
		'AZFCVEAAAAASUVORK5CYII=';
icon_cs[0][7*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAi0lEQVR42u3QQQ6AIAwAQfs'+
		'zns7PFG+mFzHRIMvusQ1Jh6i1bisVguEJpieYnmB6gukJpieYnmB6gukJpieYnmB6gul9Ci6l7E/ftHtianCr/5gIwYJnAp'+
		'+gXN7jwFfQ3V6w4B+C8wwN7vkQwYIFCxYsWLBgwYJfAucZGjwiwfQE0xNMTzA9wfSWAx+C9zBMSwINdQAAAABJRU5ErkJgg'+
		'g==';
icon_cs[0][7*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAiElEQVR42u3QQQoCQQwAQed'+
		'n+/T5mXqUQdAFRbe3+hoCqYw55+VMDeB4wPWA6wHXA64HXA+4HnA94HrA9YDrAdcDrvdV8LZt170793vGscF7yAMY+FjgZ5'+
		'RlngM/gl7NgYH/EbyUBr/1EGBgYGBgYGBgYOAPgZfS4F8EXA+4HnA94HrA9U4HvgEAzwJMTQ8xdQAAAABJRU5ErkJggg==';
icon_cs[0][7*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAj0lEQVR42u3QwQ2AIBAAQa8'+
		'zSqM0OkP9GXyIiUZZdp93uYQhSinLTIVgeILpCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geq+CU0r17s32nhganGu/OUcIFj'+
		'wSeAedkM0eBz6CrvaCBf8Q3M7Q4J4PESxYsGDBggULFiz4IXA7Q4O/SDA9wfQE0xNMTzC96cArylwwTDdvw7kAAAAASUVOR'+
		'K5CYII=';
icon_cs[0][7*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlElEQVR42u3QwQ2AIBAAQem'+
		'MAizEkizEAugM9WfuIyYaZd193oXkhlRKGf5UEgxPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0zvUXDOuV59s92TugbXZW'+
		'o/ZpwFC+4JvINicY8DH0Fne8GCPwiOMzS45UMECxYsWLBgwYIFC74JHGdo8BsJpieYnmB6gukJpvc78Ao6gDBMdmmtLQAAA'+
		'ABJRU5ErkJggg==';
icon_cs[0][7*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAj0lEQVR42u3QQQ6AIAwAQfs'+
		'znsbT+BnqzfSiJhpl2T22IekQrbVlpkIwPMH0BNMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wvVfBpZR+9812TwwN7r1ePyaqYM'+
		'EjgXdQLu9x4CPobC9Y8A/BeYYGX/kQwYIFCxYsWLBgwYIfAucZGvxFgukJpieYnmB6gulNB14BylwwTGWlvYsAAAAASUVOR'+
		'K5CYII=';
icon_cs[0][8*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlElEQVR42u3UMQ6AIAxAUXs'+
		'zjs7NFDfTBRlM7Of/tWnSN0D03o+dCsHwBNMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wPcH0PgW31s7VnXFPlAaP3h8TIVhwJf'+
		'ANyuU5DvwEzeaCBRcA59Dg6TGCBdcCb/eGt/ylBdPBOTR4eoxgwf8Hr+6UBv8xwfQE0xNMTzA9wfS2A18/EUpM+T3ECwAAA'+
		'ABJRU5ErkJggg==';
icon_cs[0][8*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAkUlEQVR42u3UQQrAIAwAweZ'+
		'nPt2ftT2WWhAPBbPZvQYhc4jRez8qFYLhCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLp/QpurZ2rb+59Ijd4hRyCBecCf1'+
		'Fecxz4CZrNBQtOAB5Cg6fbCBacC1zuhiv+0oLp4CE0eLqNYMH7gxdLDd4xwfQE0xNMTzA9wfTKgS/Z2RBMhMulowAAAABJR'+
		'U5ErkJggg==';
icon_cs[0][8*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAlklEQVR42u3UMQ6AIAxAUXs'+
		'zjsbRuBnqZnBABxP7+X9tmvQNEK21baVCMDzB9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0xPML1PwaWU/nbnuCdSg2t/bq4Rgg'+
		'VnAp+gG3KY48BX0GwuWHAC8BgaPEuw4GTg5d7wkr+0YDp4DA2eJVhwAvDbndTgPyaYnmB6gukJpieY3nLgHQN+Skx8H7aUA'+
		'AAAAElFTkSuQmCC';
icon_cs[0][8*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAnUlEQVR42u3UsQ2AIBBAUdm'+
		'MARzEkRzEAdgMtTM0SGHiff5vL5fcKyCVUpaZSoLhCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpfQrOOdfRneueFBpcj+'+
		'39MesuWHAk8A1qa+c48BPUmwsWHADchgZ3jxEsOBZ4ujc85S8tmA5uQ4O7xwgW/H/w6E5o8B8TTE8wPcH0BNMTTG868AkNe'+
		'0pMh0pxewAAAABJRU5ErkJggg==';
icon_cs[0][8*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmElEQVR42u3UsQ3AIAwAwXg'+
		'zRmM0NiNJF9GQFJHw899alnwFRGvt2KkQDE8wPcH0BNMTTE8wPcH0BNMTTE8wPcH0BNMTTO9XcCmlf9257onU4N7r+2OiCh'+
		'acCXyDxsY5DvwEzeaCBScAj6HB02MEC84F3u4Nb/lLC6aDx9Dg6TGCBa8P/rqTGrxigukJpieYnmB6gultBz4BA35KTLWU9'+
		'PYAAAAASUVORK5CYII=';
icon_cs[0][9*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAl0lEQVR42u3UMQrAIBAAwdz'+
		'PfLo/S0wXbNQi4K27rQo3gkat9TqpEAxPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0zvV3Ap5V490+aJ1ODW/DARggVnAr'+
		'+gvn4dB/6CRuuCBScA96HBw2EEC94fPNqDesMzFyJYcCLwcW/4yF9aMB28eiY1eMcE0xNMTzA9wfQE0zsO/ADmSi9MIHSI4'+
		'QAAAABJRU5ErkJggg==';
icon_cs[0][9*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAk0lEQVR42u3UQQqAMAwAQfO'+
		'zPr0/U4+iQu1BaDa711DIFNrovW+VCsHwBNMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wPcH0fgW31vbZM+c+kRs8Qw7BgnOB3y'+
		'i3OQ58BY3mggUnAD9Cg4fbCBa8PngU6Q1/uhDBgvOAy73hmr+0YDp4stTgFRNMTzA9wfQE0xNMrxz4AJTq/z0yW/JGAAAAA'+
		'ElFTkSuQmCC';
icon_cs[0][9*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmUlEQVR42u3UwQ2AIBAAQa8'+
		'zSqM0OkP9GXygDxNv2f1eLmFIIFpr20qFYHiC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqfgksp/e3OcZ5IDa79ublGCB'+
		'acCXyCbshhjgNfQbO5YMEJwGNo8CzBghOAp0jSG35yIYIFJwIv94aX/KUF08Fvd1KD/5hgeoLpCaYnmJ5gesuBd8h7L0wW+'+
		'lIAAAAAAElFTkSuQmCC';
icon_cs[0][9*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAn0lEQVR42u3UsQ2AIBQAUdm'+
		'MARzEkRzEAdgMtTM0aGHCP+5aIPmPBFIpZZmpJBieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmJ5jer+Ccc/165ponhQbXY3'+
		's/zLoLFhwJfIPa2nUc+AnqrQsWHADchgZ3hxEseHxwbw/qDb+5EMGCA4Gne8NT/tKC6eCvZ0KDR0wwPcH0BNMTTE8wvenAJ'+
		'+msL0y6tO6WAAAAAElFTkSuQmCC';
icon_cs[0][9*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAAAmUlEQVR42u3UQQ7AEBQA0bq'+
		'Zozmam2m7a2ywaOKPmS2S/ySkWut1UkkwPMH0BNMTTE8wPcH0BNMTTE8wPcH0BNMTTE8wvV/BOee2euaZJ4UGt1bmh0lFsO'+
		'BI4BfU16/jwF/QaF2w4ADgPjR4OIxgwfuDR3tQb3jmQgQLDgQ+7g0f+UsLpoNXz4QG75hgeoLpCaYnmJ5geseBb8h7L0w+v'+
		'THoAAAAAElFTkSuQmCC';

// 資源モード（１５ｘ１５用） 資源アイコン＝numx5+maxtype、0=平均,1=木,2=石,3=鉄,4=糧
icon_cs[1] = new Array();
icon_cs[1][1*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAcElEQVR42u3VQQqAIBBA0eZ'+
		'mHt2bVZugkqKFmtH7W2V8iGDknKcvFcDAwMDAwMAjBQwMDAxcllKar9bW+TEkeK0cHgHc5Els+GHBZzwwMDAwcF/w3cexrwa+6dd'+
		'8OKjSbf8X/GTfMOCeAQMDAwO/2wIfHc0tF6Ao+gAAAABJRU5ErkJggg==';
icon_cs[1][1*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAbUlEQVR42u3VSwqAMAxAQXO'+
		'zHr03UzeC4gdBWyPM25VCOotCotY6/KkABgYGBgYGzhQwMDAw8L5Synh2N8+PnOAjcgA3+hLLKSt4hwcGBgYG7gq+Whzr3sC3Xc2'+
		'bl4Afgm+UBtwzYGBgYOBvmwBLN7EtlGYAfwAAAABJRU5ErkJggg==';
icon_cs[1][1*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdElEQVR42u3VWwqAIBBG4f6'+
		'dzdJc2uzMegksKXzwMtE5r4p8ijBy9+1LCTBgwIABAwYcKcCAAQMGXGdm+WntOF8hwSnX5iQBHvIlTnxY8B0PGDBgwIDngt8GR1k'+
		'P/NDRfLlEp9f+L7hlXxjwzAADBgwY8Np2w8bNLSTtNCoAAAAASUVORK5CYII=';
icon_cs[1][1*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeUlEQVR42u3VwQ2AIAxAUbt'+
		'ZB3AQRnIQB+hm6IVEJRAOgDX+f4WUF0KCmNnypQQwYMCAAQMG7CnAgAEDBpynqrG0ds4Xl+C4h3z4ugEe8iQS3i34iQcMGDBgwHP'+
		'BtY/jWg/80K/5dlCn2/4vuGWfG/DMAAMGDBjwux18ns0tIgW66QAAAABJRU5ErkJggg==';
icon_cs[1][1*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdElEQVR42u3VwQnAIAxA0Wa'+
		'zjOZo2SztpdBWFA9qI/5/VeJDBMXMjpUSwIABAwYMGHCkAAMGDBhwnqp6ae2aLyHB7ikfLgnwkCdx48OCv3jAgAEDBjwXXPs4nvX'+
		'AD/2aXwd1uu19wS37woBnBhgwYMCA/+0Ew8bNLZ5CNl8AAAAASUVORK5CYII=';
icon_cs[1][2*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeElEQVR42u3TQQqAMAwFUXO'+
		'zHD0307pwJQkFpf7gzLaFvEJjEbF1ygADBgwYMGDASgEGDBgw4Hvuvs/cG7NMBjyqB5kBfgTOzq6HSIGrhwD+5ZdouXRtwScsSxb'+
		'8BgxwBc6S/BLpINWlawOeuScDXhlgwIABA/62A+GmzS3ethXLAAAAAElFTkSuQmCC';
icon_cs[1][2*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAcklEQVR42u3TQQqAMAwFUXO'+
		'zHD03UzeuJLFQqT84s20hr5BaRGydMsCAAQMGDBiwUoABAwYM+J677yP3zlmmA34iG+BJcNZ1ogQuHwL4jyvR89O1BRckWfAbMMA'+
		'VOEtzJdJJgCfBA8mAVwYYMGDAgL/tAN5QsS3Hn0obAAAAAElFTkSuQmCC';
icon_cs[1][2*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeUlEQVR42u3TQQqAMAwFUXO'+
		'zHq1Hy82qgjtJKFj0B2fWgb5Aau6+VcoAAwYMGDBgwEoBBgwYMOB7rbUxM3e8ZTLgPnJzNwP8CBxCr0WkwNkigH95EiU/XVnwCYu'+
		'SBa+AAc7AUZInESX76cqAZ+ZkwG8GGDBgwIC/bQdips0tH26T/AAAAABJRU5ErkJggg==';
icon_cs[1][2*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAgUlEQVR42u3TwQmAMAyFYbN'+
		'ZB3AQR3IQB8hmVQ+eJKVQ0Rf83zWBfIHE3H3KFAMMGDBgwIABKwUwYMCAAd9TSqk9fccskwHXbWkPmlfAQ+Codi0iBW4tAviXJ5H'+
		'y6dKCT1gUWfATMMAtcBTJkwgHqT5dGnBPnwz4zQAGDBgw4G+zA/+XzS0d0zlPAAAAAElFTkSuQmCC';
icon_cs[1][2*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAe0lEQVR42u3TQQqAQAiF4by'+
		'ZR5ujzc2sFq3CYaChnvS/rYKfoNZ73yrFAAMGDBgwYMBKAQwYMGDA97h7zPQds0wGHNHGg6wBfgTOatciUuDRIoB/eRIln64s+IR'+
		'lkQWvgAEegbNInkQ6SPXpyoBn+mTAbwYwYMCAAX+bHWKmzS1nKtu5AAAAAElFTkSuQmCC';
icon_cs[1][3*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAc0lEQVR42u3TQQrAMAhE0c7'+
		'NPLo3a7PpqkQChdYhf7YKPkGVmYdTBBgwYMCAAQPuFMCAAQMG/ExEnCt9Y5bagEfqQRLgV+BZ7V6kFbhaBPCWJ2H5dHbgWa3lSVS'+
		'LAN7yJCyfzg680tcG/GUAAwYMGPC/uQABl80tBU2T5gAAAABJRU5ErkJggg==';
icon_cs[1][3*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAb0lEQVR42u3TSwqAMAxFUbO'+
		'zLD07s04cST8g6Hv03mkLPYUkqupwKgADBgwYMGDASgEGDBgw4GeZea7cu94KHfCMHIBfgnvdJ0rg4UcA7zgSnktnB+6lOBLDjwD'+
		'ecSQ8l84OvJAM+MsAAwYMGPC/Nb5BsS3x8PePAAAAAElFTkSuQmCC';
icon_cs[1][3*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdUlEQVR42u3TQQrAMAhE0c7'+
		'NPFqO5s3SLrorkUAgVfJnLfgGVO5+VYoAAwYMGDBgwJkCGDBgwIC/MbM+M/fsUhpw67G5SYCXwEPoWyQVOCoC+MiTKPl05cBDaMa'+
		'TiIoAPvIkSj5dOfDMXBrwzgAGDBgw4H9zA4KIzS3tcmqGAAAAAElFTkSuQmCC';
icon_cs[1][3*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAe0lEQVR42u3TwQ2AQAhEUem'+
		'MAizEkizEAuhs9eLJLNnERJnsnyskPBKwiFiUYoABAwYMGDDgSgEMGDBgwM+4exvpu2ZZGXA7tnzQugN+Be7V7kVKgbNFAE95EpJ'+
		'PJwfu1UqeRLYI4ClPQvLp5MAjfWXAXwYwYMCAAf+bEx+IzS1VU+imAAAAAElFTkSuQmCC';
icon_cs[1][3*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdUlEQVR42u3TwQnAQAhE0di'+
		'ZpW1pdmZyySmsLAQSh/1zVfAJahFxKMUAAwYMGDBgwJ0CGDBgwICfcfdc6btmWRtw5qgH2QD8Cjyr3Yu0AleLAN7yJCSfTg48q7U'+
		'8iWoRwFuehOTTyYFX+tqAvwxgwIABA/43J4KIzS0CSt/VAAAAAElFTkSuQmCC';
icon_cs[1][4*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAbklEQVR42u3STQqAIBCA0eZ'+
		'mHt2bVdDGKN30N8H7dqOgTzBqrdOfCmBgYGBgYOBMAQMDAwMfK6XM7byeGaP1FOC17cCIHfhsHRgY+GZwW3pw9yLgi+DeXsovMXo'+
		'IMDDwy+B2Tg9+ImBgYGDgb1sA/ib3LQPIUJEAAAAASUVORK5CYII=';
icon_cs[1][4*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAa0lEQVR42u3SOw6AIBBAQfd'+
		'mHJ2bqY0JfrDxtybzOrZYhoSotQ5/KoCBgYGBgYEzBQwMDAy8r5Qytud5Z5zNc4AXWmzAB3NgYOCbwavSg7s3AV8E98r4JU4fAgw'+
		'M/DK4KT34iYCBgYGBv20Chk3PLe+CwM4AAAAASUVORK5CYII=';
icon_cs[1][4*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAb0lEQVR42u3Suw2AMAxAQbx'+
		'ZRsto2QyQaIL4NPyMdK+zC+siJVprw58KYGBgYGBg4EwBAwMDA28rpYz9PN+Ms30KcB0XW41Ygff2wMDAN4P70oOPAr4KPoRm/BJ'+
		'nDwEGBn4Z3M/pwU8EDAwMDPxtE5b29y0Pk3TFAAAAAElFTkSuQmCC';
icon_cs[1][4*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeElEQVR42u3S2w2AMAiFYdm'+
		'MARzEkRzEAdismviCse2Lt2Pynzcgga9JLSKGP8UAAwYMGDBgwEoBDBgwYMDnuHvJ9bbTen0JcFmmfeE4H8C1PmDAgG8G58iDm4c'+
		'AXwS3ZpJfovcQwIABvwzOtTz4iQAGDBgw4G+zAkaG9y0dD7avAAAAAElFTkSuQmCC';
icon_cs[1][4*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAcklEQVR42u3SSw6AMAhFUdk'+
		'ZS+vS2BmaOMFoO6mfZ3LfDEjgNKlFxPKnGGDAgAEDBgxYKYABAwYM+Bx3z1pvO23UlwBntn2htQP4qg8YMOCbwTXy4O4hwJPg3kz'+
		'yS4weAhgw4JfBtZYHPxHAgAEDBvxtVpb29y2C4cBQAAAAAElFTkSuQmCC';
icon_cs[1][5*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeklEQVR42u3VQQ6AMAgFUbk'+
		'ZR+dmWteGpguqnziztQlvAdEi4uiUAQYMGDBgwICVAgwYMGDAz9z9XHk3ZpkMeDQfZAa4BHzDsmTBFTDAM3CW5Eqkg1SPrg04+1a'+
		'921t/zTuO8Z/gdivR8ujagVfeyYDfDDBgwIABf9sF4abNLSYGVjoAAAAASUVORK5CYII=';
icon_cs[1][5*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdElEQVR42u3VQQ6AMAgFUbk'+
		'ZR+dm6t5Qm0j1E2fWTXgLSC0itk4ZYMCAAQMGDFgpwIABAwZ8zd33mXfnLNMB35ENcBF4QJIFV8AAj8BZmiuRTgL8EJxVvNtLv+Y'+
		'Vx/hPcLuV6Hl07cATyYDfDDBgwIABf9sB3lCxLVLpt90AAAAASUVORK5CYII=';
icon_cs[1][5*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAe0lEQVR42u3VsQ2AMAwFUbx'+
		'ZRsto3ixAjRylcOBb3NWW8gpbMXc/KmWAAQMGDBgwYKUAAwYMGPCz1tpYmbveMhlwH3NzNwOcAr5hUbLgDBjgGThKciWiZI+uDDi'+
		'EJu/21q95xzH+E1xuJUoeXTnwypwM+M0AAwYMGPC3nWKmzS0E9l6yAAAAAElFTkSuQmCC';
icon_cs[1][5*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAg0lEQVR42u3VwQ2AMAiFYdm'+
		'MARzEkRzEAdis6tnQ9EAV4v+uJXnfAVIxs6VSBDBgwIABAwacKYABAwYM+BlVbSNzV5ekAbdj6xetO+AQ8A3zkhYcAQPcA3tJuRJ'+
		'uUdajKwP23qJ3e+rXPOMY/wkutxIlj64ceGQuDfjNAAYMGDDgb3MC/5fNLb8y6t8AAAAASUVORK5CYII=';
icon_cs[1][5*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAfUlEQVR42u3VsQ3AMAhE0bA'+
		'Zo3k0NiNJHWG5wAko/1oj3StAFjM7OkUAAwYMGDBgwJUCGDBgwICfUVVfmbu6pAzYfcyLZABOAd+wKGXBGTDAM3CUkisRFlU9ujb'+
		'g6C17t7d+zTuO8Z/gdivR8ujagVfmyoDfDGDAgAED/jYnYqbNLYkZqNwAAAAASUVORK5CYII=';
icon_cs[1][6*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeUlEQVR42u3TQQqAMAxEUXO'+
		'zHD0307pVUgq2dQJ/1oF5i4lFxFEpBhgwYMCAAQNWCmDAgAEDfsfdz5G71mUy4JZ+kRngKeAblkUWPAMGuAfOIjmJtEj16cqBn5O'+
		'Yve2lT7fiGQGXm0RaBPgjeOROBrwzgAEDBgz431x6k+EtfzKUgQAAAABJRU5ErkJggg==';
icon_cs[1][6*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAc0lEQVR42u3TQQ6AMAgFUbk'+
		'ZR+dm6tqG2kRqf5OZNQlvARYRx04ZYMCAAQMGDFgpwIABAwbc5u7nyNy9y3TAb2QDXATukGTBFTDAPXCW5kmkmwAXgZ+k4tue+nQ'+
		'znhHwfieRbgL8ETyQDPjPAAMGDBjw2i6O670tWxpfNAAAAABJRU5ErkJggg==';
icon_cs[1][6*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeklEQVR42u3TQQrAMAgF0Xo'+
		'zj5ajebM03bYYAjWtwsw6kLf4ipkdlRLAgAEDBgwYcKYAAwYMGPAzVe0r78Zfkgbc+tzcRACHgC+YV1pwBAzwDOyVchJeaY+uHPg'+
		'+iehtbz26HccIuNwkvAC/Ba+8SwP+MsCAAQMG/G8n66ThLbHfc4gAAAAASUVORK5CYII=';
icon_cs[1][6*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAgklEQVR42u3TsQ2AMAxEUbx'+
		'ZBmAQRmIQBvBmAVqQo0hxwJb+1ZbuFWdR1SVTBDBgwIABAwYcKYABAwYM+J1SSu25u7okDLgeW7to3QG7gG+YlbBgDxjgFthKyEm'+
		'YRVGfLh34OQnvbU99uhnPCDjdJMwiwIPgnrsw4C8DGDBgwID/zQl8ROEtn9QurAAAAABJRU5ErkJggg==';
icon_cs[1][6*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAfElEQVR42u3TQQ6AMAhEUbk'+
		'ZR+vRuBnWrYamia1C8mdNMm8xiJkdlSKAAQMGDBgw4EwBDBgwYMDPqKrP3PUuSQN2b+MiaYCXgC9YlLTgFTDAI3CUlJMIi7I+XTn'+
		'wfRKrt7316XY8I+BykwiLAL8Ez9ylAX8ZwIABAwb8b07rpOEtyB1X7gAAAABJRU5ErkJggg==';
icon_cs[1][7*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAbElEQVR42u3PQQqAMAwAQfO'+
		'zPr0/03oQCmIRURph9pZQyDRqrcufCmBgYGBgYOBMAQMDAwOfK6Wsd961W5EG3BofigB+BbzD+vp9WvABu9oDPwH3c3rw6CPAwMD'+
		'AwHPB/Zwe/EXAwMDAwHPbAOzQ4i1TWPn9AAAAAElFTkSuQmCC';
icon_cs[1][7*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAaElEQVR42u3PSwqAMAxAQXO'+
		'zHr03UzdCUfxQlEaYtwyBTKLWOv2pAAYGBgYGBs4UMDAwMPCxUsr8ZG+9FXnAd+QAfgm8JzXztOANdjYH7gI3pQdfPgIMDAwMPBb'+
		'clB78RcDAwMDAY1sAAg3ALcjMbwcAAAAASUVORK5CYII=';
icon_cs[1][7*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAb0lEQVR42u3PSwqAMAxAQXO'+
		'zHq1H6838LISKKCKKEebtEgKdRmtt+FMBDAwMDAwMnClgYGBg4H2llPHK3fxWpAHX8dxcI4AfAS+wDbTbpwWvsKM98B1wP6cHn30'+
		'EGBgYGPhbcD+nB78RMDAwMPC3TZGI4i3pDQcRAAAAAElFTkSuQmCC';
icon_cs[1][7*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdUlEQVR42u3P0QmAMAxFUbN'+
		'ZBnAQR3IQB8hmVT+EgLQUUfqEe/8SCjm1iJj+lAEGDBgwYMCAlQIMGDBgwPfcvfS8O26ZDLhsS/vQvAJ+BXzCcnkvC75gtT3gJ+A'+
		'8y4NbHwEMGDBgwGPBeZYHfxFgwIABAx7bDkpg4i0pOh40AAAAAElFTkSuQmCC';
icon_cs[1][7*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAcElEQVR42u3PQQqAMAwFUXO'+
		'zHK1Hy82iLgqBYhFR+oWZXUIhrxYR258ywIABAwYMGLBSgAEDBgx4zN3zzrvjlsmAM9v8kDXAr4BPWK3uZcEddrUH/ARcZ3nw7CO'+
		'AAQMGDHgtuM7y4C8CDBgwYMBr2wGRiOItrdAIwQAAAABJRU5ErkJggg==';
icon_cs[1][8*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeElEQVR42u3TQQrAIAwF0eZ'+
		'mObo3a+2iECgpgmJ/YGYZAnkLtdbaUSkDDBgwYMCAASsFGDBgwIDfufs5stdvmQy4933IDPAS8A2Lxbks+IFlc8Cz4Jg8OD0EeBG'+
		'43JMo+enKgWPy4PQQ4EnwyJ4MeGeAAQMGDPjfLjA/9S1MyTcCAAAAAElFTkSuQmCC';
icon_cs[1][8*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdUlEQVR42u3TQQqAMAwFUXO'+
		'zHD03UzcFqwQLLfoDM8tQyFukFhFbpQwwYMCAAQMGrBRgwIABA37m7vvIu3OX6YDfyAZ4EfhOusxlwQ2WzQHPgrvkwekmwIvA5U6'+
		'i4qcrB+6SB6ebAE+CB5IBfxlgwIABA/63A+pWyS14ueRCAAAAAElFTkSuQmCC';
icon_cs[1][8*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeklEQVR42u3TwQnAMAhA0bq'+
		'Zo2U0N0vbQ8FSLIGEVuH/owi+QyJmtlVKAAMGDBgwYMCZAgwYMGDAz1S1j+wdtyQNuPV3cxMBvAR8wm5QN08LvmDRHPAs2JceHAV'+
		'4Fbjckyj56cqBfenBUYBnwSN7acBfBhgwYMCA/20HkXD1LRQVSWwAAAAASUVORK5CYII=';
icon_cs[1][8*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAgElEQVR42u3TwQmAMAxAUbN'+
		'ZB3AQR3IQB8hmVQ9CQFIKLZrA/8cQyDu0oqpLpgQwYMCAAQMGHCnAgAEDBvyulFJ79q5bEgZcj619aN0BTwHfMJudhwU/MG8OeBR'+
		'sCw92DwGeBE73JFJ+unRgW3iwewjwILhnLwz4ywADBgwY8L+dFbD1LRqhjQUAAAAASUVORK5CYII=';
icon_cs[1][8*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAe0lEQVR42u3TwQnAMAhA0bp'+
		'ZRstobmbTQ0EolkBCq/D/UQTfIRFVPSolgAEDBgwYMOBMAQYMGDDgZ601m9kbtyQN2Ky/H5IOeAv4gvn8PC34hkVzwKtgX3pweAj'+
		'wJnC5J1Hy05UD+9KDw0OAF8Eze2nAXwYYMGDAgP/tBJFw9S1tw2xPAAAAAElFTkSuQmCC';
icon_cs[1][9*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAeUlEQVR42u3T0QqAIAxG4fZ'+
		'me/S9WdlFMIiJYNQvnXOpwj5BLSK2lTLAgAEDBgwYsFKAAQMGDPieu+8j59oskwG3+oPMAD8CPmG5vC4LvmDVOuBZcE4eXA4CPAm'+
		'u9iSfRO8igH/5JJb8dMuBR87JgN8MMGDAgAF/2wGXUuEtUV5r+QAAAABJRU5ErkJggg==';
icon_cs[1][9*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAdUlEQVR42u3TSwqAMAxFUbO'+
		'zLD07UycFP0QLFX3Be4ehkFNoLSKmShlgwIABAwYMWCnAgAEDBnzO3eeec+su0wHfkQ3wQ+AjaTOXBTdYNgc8Ct4lD043AR4EZyk'+
		'+icuLAP7jk6j56cqBO5IBvxlgwIABA/62BTnKvS2FydqPAAAAAElFTkSuQmCC';
icon_cs[1][9*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAe0lEQVR42u3TUQqAIAyA4Xa'+
		'zHc2j7WZmD4ERE8Gojf7/cQz8BBUz2zIlgAEDBgwYMOBIAQYMGDDge6paZ/baWRIGXOrYXEQAPwI+YBdoNw8LPmHeHPAquC882Av'+
		'wKtiFRnwSo4sA/uWTSPnp0oFn9sKA3wwwYMCAAX/bDghy4S0NHYLTAAAAAElFTkSuQmCC';
icon_cs[1][9*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAgklEQVR42u3T0QmAMAxFUbN'+
		'ZB3AQR3IQB8hmVT+EgKQUKprgfZ9pIKeQiKpOmSKAAQMGDBgw4EgBDBgwYMD3lFJqT98xS8KA67a0B80r4EfAJ8zG1sOCL5hXBzw'+
		'KtgkPdgcBHgR7byFXovURwL9ciZRHlw7c0xcG/GYAAwYMGPC32QGZA+EtmbdcHQAAAABJRU5ErkJggg==';
icon_cs[1][9*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAwADAAMCNeLu6AAAAfElEQVR42u3TYQqAMAiG4bz'+
		'ZjrajeTOrH4EQjsGilN7vpxN8BiqqulWKAAYMGDBgwIAzBTBgwIAB39Nas5m+Y5akAZv18SDpgB8BnzAfX08LvmBRHfAq2Cc9OBw'+
		'EeBEcvaVcidFHAP9yJUoeXTnwTF8a8JsBDBgwYMDfZgcIcuEtoElkPAAAAABJRU5ErkJggg==';

// 資源モード（２０ｘ２０用） 資源アイコン＝numx5+maxtype、0=平均,1=木,2=石,3=鉄,4=糧
icon_cs[2] = new Array();
icon_cs[2][1*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAY0lEQVR42u3UQQrAIAxE0c7'+
		'NcvTczOrCCtJuJCRd/FkFF8MjYOTuV3UEAgQIECBAgMhEmFnb33qP0hE9q0SqQcx5YEoQ+0ZAgPgF4u13zJxgQu7EU3a4kbCLmb6'+
		'J6IAAAeIrN59NkWIunq91AAAAAElFTkSuQmCC';
icon_cs[2][1*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAW0lEQVR42u3UPQoAIAhA4by'+
		'ZR/dm1VJEP0uENrw3NshHoGJmKToBAQIECBAgQHgiVDXPb3WO+CNGhkQhWjkIsfwICBA/IHbb0brBvLkTfZo34pAb4nUgQIA4VQC'+
		'K6n9iLPGhRQAAAABJRU5ErkJggg==';
icon_cs[2][1*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZElEQVR42u3UsQnAMAxE0dx'+
		'mGs2jaTPHTRwwSWOE5OJfqUI8DiS5+1UdgQABAgQIECAyEWbW19nYo3RE66+jSTWICRiYEsTaCAgQRyC+ruPJDibkT0zQZiNhHzO'+
		'9ieiAAAHiLzeBiZFig1ditAAAAABJRU5ErkJggg==';
icon_cs[2][1*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAa0lEQVR42mM8cOAAw0ADxlF'+
		'HjDpi1BGjjhh1xKgjRh1BT0c4ODj8RxcDmsNId0f835KBMMRnxsA4AsYGOWZAHIEeIqOOGHXEoHAEttwBA+Q4hirlBNwwMkOEaiU'+
		'm3UOC2mDUEaOOGHUELgAAalWRYnBbnpoAAAAASUVORK5CYII=';
icon_cs[2][1*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZklEQVR42u3UMQrAMAiF4Xo'+
		'zj5ajeTObDkkgtEsQ7fC/STI8PoQoZnZVR0CAAAECBAgQmQhV9f2t90g6wr2tEmk1iDE/mBLEvhEQIH6BePsdIyeYkDsxyw43EnY'+
		'x0zcRHRAgQHzlBoGJkWLJBgLoAAAAAElFTkSuQmCC';
icon_cs[2][2*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAY0lEQVR42u3TQQ6AIAxEUed'+
		'mPXpvprhwA+nGmKnRP0tIymMCysytOwIBAgQIECBAOBERsVd7Y55siJF1mORFzGsnyoqomvlfE695E9fN57Qg7hz6vSaWYd2/w97'+
		'E0wEBAkSVA3S9kWKCsbfvAAAAAElFTkSuQmCC';
icon_cs[2][2*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAX0lEQVR42u3TMQ7AIAxDUXK'+
		'zHD03owxMtFmqyqnge0UKDytYRLTqGAgQIECAAAFCiXD3np2NeaZDPDFMjVjTxYi0meOa+M9OzJevKUG8uXTDJm7Tqn+HuomvAwI'+
		'EiCwXUIp/Ymb+9bEAAAAASUVORK5CYII=';
icon_cs[2][2*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZElEQVR42u3TsQ3AIAxE0Xg'+
		'zj8Zo3ozQ0IDcRNE5Cv9aJHg+GYuIqzoGAgQIECBAgFAi3L1nZ+M+kyFa3x3NTIvYAAMlRWTNnNfEZ3ZiTr6mBPHk0f81sab8d8i'+
		'beDsgQIDIcgNLEZFiCgyLIAAAAABJRU5ErkJggg==';
icon_cs[2][2*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAaklEQVR42mM8cOAAw0ADxlF'+
		'HjDpi1BGjjhh1xKgjRh1BT0c4ODj8xyUHNI+Rbo74vyUD0zCfGfR1BLoYyFF0dQSukBl5ITFo0gTM5+hgQBxBjqXDLyQwDBvo3EH'+
		'3kKA2GHXEqCNGHYELAAAqlZFi3saeqgAAAABJRU5ErkJggg==';
icon_cs[2][2*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZklEQVR42u3TQQ6AIAxEUXu'+
		'zHo2j9WZVF24g3RgzNfpnCUl5TMAiYuuOgQABAgQIECCUCHfPau+YZzJE5liH2dAi5rUTJUVUzfyvide8ievmc1oQdw79XhPLsO7'+
		'fIW/i6YAAAaLKDksRkWKG9Ya5AAAAAElFTkSuQmCC';
icon_cs[2][3*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXElEQVR42u3SMQrAMAxD0ep'+
		'mPrpv1jpDlhbToWAX/DUmYB5CcvejOwIBAgQIECBAVCLM7Mz+4p7KEJHnMakWcX9bqFJE1sy8JtjEWzPzmvjtJnbaNvE1IECAyHI'+
		'BpK6RYl9LCAMAAAAASUVORK5CYII=';
icon_cs[2][3*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAVklEQVR42u3SQQoAIAhE0by'+
		'ZR/dm1qJVJC0CC/yzFeQxjJhZex0BAQIECBAgQGQiVNWj2/gneYgdQ7IRazwZETZTrgk2cWymXBP/bmLm2SZuAwIEiCgd4Ht/Yrv'+
		'KAqcAAAAASUVORK5CYII=';
icon_cs[2][3*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAW0lEQVR42u3SwQkAIAxDUbN'+
		'ZR3O0bqZePEnxIFTBn2uhPELk7uV2BAIECBAgQIDIRJhZi27jn9IQta2OKuUiFsBApSKiZv5rgk3smvmviWc3MXNtE6cBAQJElA5'+
		'7ApFiRFWLtwAAAABJRU5ErkJggg==';
icon_cs[2][3*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAYklEQVR42mM8cOAAw0ADxlF'+
		'HjDpi1BGjjhh1xKgjRh1BT0c4ODj8xyUHNI+Rbo74vyUD0zCfGfR1BLoYyFF0dQSukBl5ITGaJgiFzMgLiUGbJmBgwNIEpWDUEaO'+
		'OGHUELgAAWoaRYiCZ5rMAAAAASUVORK5CYII=';
icon_cs[2][3*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXklEQVR42u3SwQkAIQxEUdN'+
		'ZSrO0dBbXgxcleBDign+OCuExjJhZuR0BAQIECBAgQGQiVNWjv++epCHc63pMai5ifuuoVETUzHtNsIldM+818dtNjFzbxGlAgAA'+
		'RpQF7ApFiMvaBuAAAAABJRU5ErkJggg==';
icon_cs[2][4*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXElEQVR42u3QMQoAMQhE0cz'+
		'NPLo326RxWVxSBTTFn0oF5aHcfXRHIECAAAECBIhKhJk9Ua995b4MsTIkvYhvD6INEWlD/I5VI/Ks/BO7z4C4BhF1G+I0IECA2GU'+
		'C6EytYrGFo7AAAAAASUVORK5CYII=';
icon_cs[2][4*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAWUlEQVR42u3QuwkAIAwAUbN'+
		'ZRs9mfkBFFCshsbirTKE+ImaWohMQIECAAAEChCdCVfM41/uyz36I9q0siGUGEYaYhSGO17wRe96buG4GxDeIXhjiNRAgQNwqxFe'+
		'TYj3sYrkAAAAASUVORK5CYII=';
icon_cs[2][4*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXUlEQVR42u3QsQ3AMAgFUf/'+
		'NGM2jsRlxQxQ5chUJUtxVUCA9IXcf3QkECBAgQIAAUYkws8h53WvfyxAzYkzpRjx3EG2IrA2xV454Aao/cfoMiN8gcm5DfA0ECBC'+
		'nLsaQrWJ9VW51AAAAAElFTkSuQmCC';
icon_cs[2][4*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZElEQVR42u3QwQnAMAiF4bi'+
		'ZA3SQjpRBMoCbpb1YQkJOBc3hfycVlA/FzEp2BAQIECBAgAARiVDV7vW7L3MfhujtLnLVDzH2INIQnjTEciwaMc/CP7H7DIhjEF6'+
		'nIf4GBAgQuzysRK1i9wi3TwAAAABJRU5ErkJggg==';
icon_cs[2][4*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAX0lEQVR42u3QQQrAMAhE0cz'+
		'NPFqO5s1sNpaSklVBu/izUkF5KHcf3REIECBAgAABohJhZpH12tfelyEi5pDmjXj2INoQmTbE61g1Yp+Vf+L0GRC/QWTdhvgaECB'+
		'AnHIBxpCtYuyMGqIAAAAASUVORK5CYII=';
icon_cs[2][5*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZklEQVR42u3UQQ6AIAxEUed'+
		'mPXpvprBgI2FjTavkzxKS8igNcvejOgIBAgQIECBAZCLM7FzttXpKQ7TMxaR8RD+0vBNPb75fJ6Zi2TNxX4s8zyv/RHRG/tuJz87'+
		'ESNlMRAMCBIhVLnS9kWLX0mNCAAAAAElFTkSuQmCC';
icon_cs[2][5*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAYklEQVR42u3UMQ6AMAiFYbk'+
		'ZR+dm1qGTwiINWPO/tQl8oQQxs6M7AgIECBAgQICoRKjqGb1d9aQO4TGkA+G0a0G8afrDSTyqVSPuSXzPkjuR3ZF9J/HdnZhp24l'+
		'sQIAAEWUAUIp/YqQ2dZgAAAAASUVORK5CYII=';
icon_cs[2][5*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZ0lEQVR42u3UQQ6AIAxEUed'+
		'mPRpH681QF24kbCxp1fzZksCjTJC7b9URCBAgQIAAASITYWZ9tnbspzRE66OjSfmI89DySTy9+f8mcU96JwZA4HmW/BPRjnx3Eq/'+
		'txJWyTkQDAgSIWXZLEZFijFARfgAAAABJRU5ErkJggg==';
icon_cs[2][5*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAa0lEQVR42mM8cOAAw0ADxlF'+
		'HjDpi1BGjjhh1xKgjRh1BT0c4ODj8xyUHNI+Rbo74vyUD0zCfGfR3BMjSAQ8Jcn0+/EICwzB6pwl0MUqihyrlBKVpZOiGxKBNEzA'+
		'wYGmCUjDqiFFHjDoCFwAAKpWRYmXSg6cAAAAASUVORK5CYII=';
icon_cs[2][5*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAaUlEQVR42u3UwQ3AIAiF4bI'+
		'Zozkam9F66KXGSzFQm5+jJviJL4qZHdUlIECAAAECBIhMhKr6bO/qJ2kI9zY2k5aP6IeWT+Ltzf83iaFZdiaea5HnWfJPRDOy7yQ'+
		'+m4m7yjIRLRAgQMzqBEsRkWIkLNQMAAAAAElFTkSuQmCC';
icon_cs[2][6*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAYklEQVR42u3SQQ7AIAhE0c7'+
		'NODo3s3ZN2KiB2PzZmoxPRO7+dEcgQIAAAQIEiEqEmY3sbPapDDETy6R6xHdp+yRWX/6/SYSy7p3Y+Z4jO7G7I/dPIpRVI7KzMsT'+
		'pgAABIssLxLaeYonH1EMAAAAASUVORK5CYII=';
icon_cs[2][6*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXUlEQVR42u3SQQoAIAhE0by'+
		'ZR/dm1b7cZCjIn22gDxsxs1EdAQECBAgQIEBkIlR1em97nuQhbgypQFzWlSBelja8xDGtuhOB7/nSiWhHGlzimJaNcJKG+B0QIEB'+
		'4WbCshmKHCHCHAAAAAElFTkSuQmCC';
icon_cs[2][6*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZElEQVR42u3SsQ3AIAxE0dx'+
		'mHo3RvBlJWpAbQLYS/WstweOw3P2qjkCAAAECBAgQmQgz69HsOU9piNZnR5PyEe+l5U2svvx/TYwp34md7zmyE7s78v0mxqQjolk'+
		'a4nRAgAAR5QaVFp5ijCfncwAAAABJRU5ErkJggg==';
icon_cs[2][6*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAaklEQVR42u3SwQ2AMAiFYdm'+
		'MATqIIzmIA7BZW8+Ei20gmp8ryetXQMzsqC4BAQIECBAgQGQiVLVHvZknaYh+nz6sXfmI59HySbz9+f8m4cKqb2JlPVtuYvVGvj8'+
		'JF5aNiHppiN0FAgSIqAZv9p5ioP+/PgAAAABJRU5ErkJggg==';
icon_cs[2][6*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZElEQVR42u3SwQ3AIAiF4bI'+
		'Zozkam9F6JlzUQGx+riTPT0DM7OkuAQECBAgQIEBUIlTVs96XJ2UI9xHDZNQj5qPtk1j9+f8mEcK6b2JnPUduYvdG7p9ECKtGZL0'+
		'yxOkCAQJEVi+VFp5iLKeXWwAAAABJRU5ErkJggg==';
icon_cs[2][7*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXUlEQVR42u3QOwpAMQhE0cz'+
		'OXLo7y6eweSGkCOgr7lSKoAfl7q06AgECBAgQIEBkIsysn2Zzn9IQM/syKR+xjkaiL0Gso98+DRF1GeL2GRAgfoOIugzxGhAgQJw'+
		'yAPJWn2IjBc54AAAAAElFTkSuQmCC';
icon_cs[2][7*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAWUlEQVR42u3QQQrAMAgF0Xo'+
		'zj+7NTAtZhBDpouDvYmYXhPjQIuJSZyBAgAABAgSIToS7ZzW7/7M+xIlhCsS6LoWIZ+n+7kPMZIi3y4AA8R/ETIb4GggQIKoGHjG'+
		'JYo5H38oAAAAASUVORK5CYII=';
icon_cs[2][7*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAYUlEQVR42u3QQQrAMAhE0c7'+
		'NPJpH82ZpA0kWLaGLgnbxZ6UI+lARcVRHIECAAAECBIhMhJm13ezapzSEt6fDpXxEP7oAoy9B9KP3Pg0x6zLE22dAgPgNYtZliK8'+
		'BAQLELifUkp9ig73MeAAAAABJRU5ErkJggg==';
icon_cs[2][7*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZUlEQVR42u3QwQ3AIAiFYdm'+
		'MATqII3UQB2AzqwcuNaaHJuDhfycICXxBzKxkR0CAAAECBAgQkQhV7bvZ2CdhiN7quuy64xHzqMf7FMQ8+u7DEF6nIb4+AwLEMQi'+
		'v0xB/AwIEiF0evV6fYsSFq0UAAAAASUVORK5CYII=';
icon_cs[2][7*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAX0lEQVR42u3QsQ1AIQhF0c9'+
		'mjOZobMbXgkZjLEzA4r4KQgIniJl91REQIECAAAECRCZCVX036/skDeHe1mXS8hHjaCT6EsQ4OvdpiKjLEKfPgADxDCLqMsRtQIA'+
		'AscsP1JKfYis6xqsAAAAASUVORK5CYII=';
icon_cs[2][8*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXElEQVR42u3SSwoAIAhF0d7'+
		'OXLo76zNoUjgLC7pvJoIeRLl7uR2BAAECBAgQIDIRZlajXp+nNETPPkzKR4ylM7O+ghhL1/q/S2zDvr0EP/HMT0S9NMTpgAABIko'+
		'DSkSrYnFTAAcAAAAASUVORK5CYII=';
icon_cs[2][8*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAV0lEQVR42u3SSwoAIAhF0dy'+
		'ZS3dnfWZROQsNum8mgh5EMbOSHQEBAgQIECBARCJUtXq9Pk/iECeGZCDmdTURMZau9YeX2KZ9ewl+4pmfcBKGuB0QIEB4aS2vjWJ'+
		'vZJCyAAAAAElFTkSuQmCC';
icon_cs[2][8*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAYElEQVR42u3SywkAMQhF0bz'+
		'OLC2l2Vk+MMwig7vBBHLfTgQ9iHL3sjsCAQIECBAgQGQizKxFvTFPaYjavo4q5SPm0hfw1FsQc+la33eJNfdegp845ieiXhri74A'+
		'AASJKBxSwq2IYDnFEAAAAAElFTkSuQmCC';
icon_cs[2][8*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZElEQVR42mM8cOAAw0ADxlF'+
		'HjDpi1BGjjhh1xKgjRh1BT0c4ODj8xyUHNI+Rbo74vyUD0zCfGfR3BMhSGIDxB8QRIEvR+SMvJDAMG7EhMZomBk2awCVHN0dQG4w'+
		'6YtQRo47ABQDq3atiDvm6UQAAAABJRU5ErkJggg==';
icon_cs[2][8*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAXklEQVR42u3SwQkAIAiF4dz'+
		'M0RrNzawOXQpvYUH/u4mgH6KYWbkdAQECBAgQIEBkIlTVo16fJ2kI97oPk5qPGEtnZn0FMZau9X+X2IZ9ewl+4pmfiHppiNMBAQJ'+
		'ElAYUsKtiWowuVgAAAABJRU5ErkJggg==';
icon_cs[2][9*5+0] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAY0lEQVR42u3SMQoAMQhE0Z2'+
		'beXRvtpsUNglWCxrIn84E9CHK3Z/uCAQIECBAgABRiTCzN/sb/VSGGNmbSfWIOTQSdQtiDl3r+zaxNatGrG/lm8g2c98mjr2JSNt'+
		'N/A0IECCyfPo8nmL6cykyAAAAAElFTkSuQmCC';
icon_cs[2][9*5+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAYElEQVR42u3SQQpAIQhF0dy'+
		'ZS3dn1YcGUTkK9EP3zSLQw0Mxs5IdAQECBAgQIEBEIlS1en99nsQhTgzJQMzraiLiW7q+H2ximxaNWBPdhNvMc0389yZG0m7iNiB'+
		'AgPDSAM1+hmI8ahF6AAAAAElFTkSuQmCC';
icon_cs[2][9*5+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZ0lEQVR42u3SQQrAIAxE0c7'+
		'NcjSPlpvZCm0XSlaFpOCfXRDMY4jc/aiOQIAAAQIECBCZCDPr0dv1n9IQra+OJuUjxtIXcM8liLF0nvdrYk46YgFkNxE1s18Tv72'+
		'JJ2U38TUgQICIcgLKnJ5is58jWwAAAABJRU5ErkJggg==';
icon_cs[2][9*5+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAbElEQVR42mM8cOAAw0ADxlF'+
		'HjDpi1BGjjhh1xKgjRh1BT0c4ODj8xyUHNI+Rbo74vyUD0zCfGfR3BMhSGIDxB8QRIEvR+SMvJDAMo7cj0MXoHhK4QmbkhcSgTRM'+
		'wMGBpglIw6ohRR4w6AhcAAKV8nmLgq80LAAAAAElFTkSuQmCC';
icon_cs[2][9*5+4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAwADAAMCNeLu6AAAAZklEQVR42u3SsQkAMQiF4XM'+
		'zR8tobuZdCpsEqwMN5H+dCeiHKGb2dEdAgAABAgQIEJUIVfXs7+snZQj3sTeTUY+YQyNRtyDm0LW+bxNbs2rE+la+iWwz923i2Ju'+
		'ItN3E34AAASLLC8qcnmLjUKubAAAAAElFTkSuQmCC';

//------------------------//
// アイコン定義（領土枠） //
//------------------------//
var icon_2 = new Array();

// 赤
icon_2[1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADHElEQVR42u3Yy0sqURwH8J8LmUF'+
		'62M1eZlEUlQUS9C+0CSJoJ0URtGwXtQgqWkRFi3YtWgQ9KGpTBEGb9sGFGz2wh1EQiDY42ROxbtdzzwxMjGUzjo6mp/MFQRd65jP'+
		'n55zzOwaEEPykGCiY8FAw6aFg0kPBpIeCSQ8Fkx4KJj0UTHoomPRQMOmhYNJDwaSHgklPysAupxMxOTnAZmWJn0PPzxB8eADH+rq'+
		'BKLBvYAAx2dkQNhiAu7qChoUFEeju7UW/KivByLIQur8Hz/ExNG1tJR2fNDA/MoKY4mJ4ub2NgH6MBGfy8uDl5gauj46SCtcdzI+'+
		'NIaagQBWqCPf74frwEJo2N3WH6wbmBgeRqaJCM1QRfncHnv19aNzY0A2eMJgfGkKMzZYw9Cu4CVdLkOPA63Lp8oCLG8yPjyNxFnS'+
		'GfgWXZpw7OYGG1dW4x9IMThVUDe4/Pwf78rLmsWMGByYmkDE3N+VQJfjfpyfgcKlrgauCA1NTyIjX0e+GqsH5iwuomZ9XvbYvwek'+
		'KVYWfnUGNwrV+Anv6+1FuVVXaQ5XgD5eXYJuZiXrdEeCDlhZU1doqvs/u68sI6Mc8zc6KoMvtbWjc2flkiAD/aW9HNc3NGQ0Ozs2'+
		'hf29v4N7djbpTi17Swo4Jb+j9uDTsi4sZAXf19KCi0lIwlZdDAC9ZMZW0PIHhYcSWlYm7nHSGy6GevT3FB5YiWIgw2ya89rK460k'+
		'3uARl8vPBhzssNWhMYClu/OOWujqQlqnvhL9DzWZ4CQTAMjmp6To0bS1Pu7pQkd0OLL6rqZ5x+YwKfbNlejquceNqHlwdHajE4QA'+
		'Wr3nJhsv/o8JYltHRhMZJqD10dXejkvr6pMDl0BBuFnxCl7S09H3toTxHnZ3Iiktd6l0TgUfMqN8P3tNTcKyspM8BwCd4bS2YLBY'+
		'I8rwm+DsUv4TvevFaqic0KWApB04nsuFSjwX+/jCyWsUVwINLt3FtLXMO8eT53daGrNXVYCoshPDrawRcgkI4DCF8U7jHR2hKwRl'+
		'1yg/izTabCDcyDJkH8ekWCiY9FEx6KJj0/AeTN4OnIxo69wAAAABJRU5ErkJggg==';
// 紫
icon_2[2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAC9klEQVR42u3YwWvTUBwH8F8PkS61'+
		'7dZ1ltKOrTKKMkTF/QHC8CAexIOCpY7pUHcWb6IH0YMePMpkoGPWCRMPHmSniSKCh4llo9uoY7WYWSOx2nVmSh3PJOONtmuTpk1r'+
		'+nzfU3p4ffnwey95+VkQQvA/xULBhIeCSQ8Fkx4KJj0UTHoomPRQMOmhYNJDwaSHgkkPBZMeCiY9FEx6GgYeD8VQi5MBtoVVfovr'+
		'ImQzIpybOGAhCjx1OYVaHIxyzS3zEB7rVYCTF+PI0+mCHVYG1iR4Yv4zXHh6qO74uoFfXBWQwydhvuYKoMXBcJubgdWVHCzNJ+sK'+
		'Nxz88rqAdu7ShqrB5bEf5pJw/onxcMPA8tLt6GF1Q9XgPwWp4rMcDE0at89rBk9fEZCzU39FK4U7PSz8SImwvMgZ8oCrGvzqhoDw'+
		'8jMSWg6OK56c52Fgovq5dIMbBdWEL0rwiP65Kwa/viUo79FGQ9Xg65kcJOb0wTXBZoFqwVPLaTh1L6h5b2XBZoVqwbmFNJweKw/f'+
		'Bn5+iUOeoN30UDU4H8/CsTv+kvddAB45GkV9xwPKdd+wsymgxZkZySigmWcJGJ7a/horAI+efIcO9vc0NTg6KqI/Gzl4P71U8qRW'+
		'ckm7u+zKfvi0xMOZ8eZY0pHBGPL6PNDezcKKtI8rWtL5kU9Q8mD5lGNmeD504Q2n+sBSBcuRq21rtUKr13xwDLW1M5CY5TWhFYFx'+
		'Hg/GkX+vC/Br6l/CMZRtY0D8noP+m25d96HraDkejqHAPg/YXY2veH5Fs19ycOS2PmhV4C14SILvbww8f4/Kcx2+Vh20JjDOw4EY'+
		'6u6tDzwfmk2L8DFmzH8b0gB4EI6i3Xv8W9+utcDzoRl+8zv4bMREDYBieCDoB4ebhVVBHxxD23ybYxNxY6F1AePcD21WvBI4huKu'+
		'iVGdjYaCce6eeIu6AhLcY4WN31AAx1A5WeEXfFvjYehRE7dpi4Mb8R1elwK32hgyG/FmCwWTHgomPRRMev4CvwB/p45NdckAAAAA'+
		'SUVORK5CYII=';
// 桃
icon_2[3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAC0ElEQVR42u3Yv4vTYBgH8KfDCzFS'+
		'q7FSjgbO01KVIhT6Jzg5iINbOeQWF0dxEx1EERwcXW455DgdFAcHJ0fhloMql7uzlDsK4WogVOphOMjw+iS9hKY/kqZNavr6fqcU'+
		'mjzvh+fNm+RNUUrhf0qKgxkPB7MeDmY9HMx6OJj1cDDr4WDWw8Gsh4NZDwezHg5mPRzMejiY9cwMrFQVStIExNOi/dv4Y4DRMaD8'+
		'rpxiCtx62KLkDLGPtX0NSmslG1i/V6fSogREIDb8cPsQKh8rseNjA+uPdUoWCJi66YH2x4VL+N+WCc3tZqzwyMH6U4Rmg6G+cDy3'+
		'+Q3hH6KHRwa2pq54SQwN9YW3TVBrKpTfR3efTw3WH2FH8+E7Oi5czIlgtAxQd9RIFriJwfozhErRQ0fBnY5rO1hrY/JaocGzggbC'+
		'97D2evjaY4P1FwjNzB7qC+/gWJRw8EBwUqBB8PZ+G4qrxcCxjQQnFRoI/4HwtdHwAbD6QKXpQjrxUD/4UeMI5Ffy0HF7wLWbNbp0'+
		'a8k+ztzPzAW0P53XHRt08OkAyp8HH2Me8NadLVq4UZhrsLFqUNM0ofGlMfRNbfiUXkx3V8AGTuk38zGllRWF5vI5EC+K0N5tjzel'+
		'e2O9QVknW285SYb3QtWvqu+C5Qu2YnVbOCuAuJA8uAMl5wlo37VA6FhgJ/UVXAGv4AroPKb+IdyFnsOx/DIh+zwbahyhXi2VZSxW'+
		'wumTnX3Heztq/kToy3DQicBu8SoWvz4beO89atXKPpkMOhXYHcxdHMy1eOAeqI7X3o3m2pFsANSWa1S+KrvfrtPAPVANv4P38Dt4'+
		'PUEbAAPwotztuB4O7kLz3XPVerTQWMAuvHrS8THg7mJ0smtid3Qjvq3bWLdpN29vUvmyDMIFAcAED9yBWjnWj0H7rUHl7Rxv0/bH'+
		'2YiX8pINJ6cImxvxSQsHsx4OZj0czHr+AkmHfqeuNr+eAAAAAElFTkSuQmCC';
// 橙
icon_2[4] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADCklEQVR42u3YS2gTQRgH8K+Hhbhp'+
		'mppEtyGptjSEShADBY9ePIgn8SBCCVq86E0UFTQ04KOKFRRvilBEasFHD55E0IsgiCCUhlSNaSVla41sHyHpqsQyzi5myaZJNpvs'+
		'xmSc/2lz2Mz8Mo/MfG0IIfif0kbBhIeCSQ8Fkx4KJj0UTHoomPRQMOmhYNJDwaSHgkkPBZMeCiY9FEx6GgaOXRtEjNUObPsm+bOY'+
		'/QHiWhqC5yfaiAIvjp3B0A75OTU/B4Gz92Vg/PZx5PB0A8NYQMyk4evnGRi4OGk63jSwMDGMGKcHcqvfVdDiKHCbC3JLC5D8ZC7c'+
		'cLDw6BJiOrdqQivC8bvJeBQGhp8YDjcMLE1d1uPTDa0IzwjAz0xDMPLYMHjdYGE8jJgt3XVDy8HZTg7EpUXg5z4assHVDBaeXkH5'+
		'6WcktBw8P+IpvLkF6oDrBjcKqgnHIx44N6677arBwuR1xLTbGw6tCM+mITUb1QXXBDcLVAu+zM+B/+Rdzb6VBTcrVBM+/wH8p8r3'+
		'dQOYHzuNbB5/00MrwTMLcfAeu1my3yrwVHg/6t1zQH627zvREtDipF/ckUFfXj+D4MjzDQYV+P3lQ8i3e29Lg8WX91BufR0S716V'+
		'PKmVntJd2/HWj3fAZALvgA9aAh67MYQ4twfYrh55HVc1pQsjnaCkl6VTTjPDC6F89E3FDasiWIo02hZrJ7BOd9PB81Cmw4n/i6c1'+
		'oVWB84nfGkKObTtA+Zv6h3AFatuMl90KuEIjuvqh62gZGw0hrm8nsHZHw0e8cERzK9/AdXS0pnZrujxI5RrOv6sh8MI1KrXlOhyp'+
		'q526roex0SN4xAOmwFXQ9DJepzFDvtuQAsDU1RDy+vuVu2s9cBV0NQV8HN+DL+i/FZkKVsH7/MA6XCAuC7rgCpTzyO/ys3FDoaaA'+
		'FfjIIPL6+quCK5vR36oJn8AjGjavdGtqmfZt5CDy9vSCxc4B/P6lguehUn6m8Y+ymoWB8MPWLdMWJ1+Id3BuGc5YrGQW4pstFEx6'+
		'KJj0UDDp+QNsoH+nzzrb+wAAAABJRU5ErkJggg==';
// 黄
icon_2[5] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAC0ElEQVR42u3Yv2sTYRgH8DfDwXkS'+
		'o+fJURKo1RCVIBT6Jzg5iINbKdLFxVHcRAdRBAdHly4iog6KQ4dOjkKXwileW4/QUjgaD14isRgKN7w+7zXn5dLeXe5Xenl9vxBI'+
		'IMn7fvK875v3fUuEEPQ/pcTBjIeDWQ8Hsx4OZj0czHo4mPVwMOvhYNbDwayHg1kPB7MeDmY9HMx6xgbW9XkiCGUkSSed173eH3h0'+
		'0ezs+xJT4Hb7PkBPOc8taws1m68coGHcIbI8jQRBdOC7u9/R3Nyn3PG5gTF+CNApZNvYBx2OB5fhvW20s5MvPHMwxo8BqkRCw+EY'+
		'4F8B/jFzeGZgOnQl6UJsaDi8g0xTg3n+ITN4ajDGD6Ci1dTQILgkqTDH2wBfz2SBSwzG+Alxh1+W0CC4W3HLWoe23iZuKzZ4XNBo'+
		'+Ca0/SZ22yODMX4G0MrYoeHwLvRFjwWPBBcFGgXvdLZQo7EU2bdAcFGh0fAfAA/u6yGwad4j5XK98NAw+N5eC9VqL47stw+sadfJ'+
		'zMwN53mlcncioMPpdl86oO3tZfgbWzlk8IHX1m6Rev3aRIN7vSVi2zZqtT4fuVMLGNLT/RWwBUP69UTAdX2RqGoVNirnYR5vjDak'+
		'B0N3UPTDdJdTZPgg1DS/hC5YoWAaWm1RPA1fNlU4uAsVhLPQr2+R0JHAbgxjEVbAS8j7mzo+uAc9A335hRTlaax+xNpa6voCNNaE'+
		'iitjr/hgRW37J0CfJ2o30eGBXteo6tWxwAfnKG1LUR6laifV8VDXb0NnruQC90PpNNrI5LszuQDQtAVSq13+d3ZNA/dDLVg4N2ED'+
		'Ef9UlCvYD2/0Kx5vcfOgVeezpmlkCs0F7MHn+xWPhnuL0cGtyUFFkx/wjwXsZnX1JsAvIlE8B69sH9yF0uzv0x/lN2wF303uNe1w'+
		'3It4Wa46cEE4weZFfNHCwayHg1kPB7Oev0iHfqc0GjUZAAAAAElFTkSuQmCC';
// 緑
icon_2[6] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADHUlEQVR42u3YzUsiYRzA8Z8HmUEy'+
		'c9UytTCKSgMJ+he6BBF0k6IIOnaLOgQVHaKWDt06dAh6oahLEQRdugcLG2WMZWEQSDU4mb0g2rY9mwMTY6Xjy4zps8/Xix70mQ/P'+
		'ODPPo0IIwf+UioAxj4Bxj4Bxj4Bxj4Bxj4Bxj4Bxj4Bxj4Bxj4Bxj4Bxj4Bxj4BxL29gN+NGpVQplNAl/Oen6BPcR+5hw7Whwgo8'+
		'dD2EtJQWVK8quGAvYLFpkQf2n/Wjmh81QKtpCEfDcBw4hu2WbcXxioHHuDFkpsxwG7tNgH5MgOspPdzEbsBz6VEULjt4gptAJsok'+
		'CU0FD8aCcHR5BFstW7LDZQMPs8PIrrFnDE0Fv4vdwUHgADabN2WD5wwe4UaQjbLlDE0GN2lMwEZYYK4YWS5wWYMnuUkUnwW5ocng'+
		'wox7WS+sNa1lPVbG4HxBpeC+oA9WHCsZj502eCo0hXRqXd6hqeCPfx6BYZmM4JLgn6GfSKvWfjtUCn7OncNC/YLksSUFFypUCn7K'+
		'ncJiffJj/QQeDAyiWl1twUNTwf33fpi1zX553AngtsM21F7bzr8f0A4UBfRjc49zPGjHvwO7zbufDAngzt+dqLW+tajB85F59PL3'+
		'BfbO9r58UvvylLbr7BCOhcEf9MOSY6ko4H1MH7JWWKFaUw2+kC+9U1rcaGgUVdFV/FNOIcPF0P3AfsoLVkpwvPhs6zQ6MNPmgoML'+
		'UANlAM+1RxKaFvj9x8/6UKOxEYTb1HfCBWgZVQahWAimjdMZHUdGj5Y9Jz3IUeEAA23I+4yLZzS+bp4xzmQ1blaLhy6mC7kqXaCn'+
		'9YrDxf/R+FjjxvGcxslpedjL9CJnpVMRuBh6F31bJV17Yblp+fuWh+K6Pd3IYXG8r11zgYuhwUgQTq5OYNW1WjgbAB/hDZYGMGqM'+
		'wEW4jOAC1Kqx8t/1XflkhSoCFnIfupHT5kwLLkAtlIW/A3gDXlhvXi+eTTxxHb86UJ2lDso15fD8+pwAF6Cvby8uysED+wAbLcrv'+
		'Ued9I95WZuPhlJrCcyO+0CJg3CNg3CNg3PsHkzeDpwDP1hMAAAAASUVORK5CYII=';
// 水
icon_2[7] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAACw0lEQVR42u3YvWuTQRwH8MtQiJU0'+
		'Gh8JJYG2GqIShEL/BCcH6dCtFHFxcRQ30UEUwcHRpUuQUh0Uhw6dHIUuhViatobQUgiNgYdILIZChvN74bnwJKbPW54nefLzvhBI'+
		'SHJ3n9xrLsI5Z/9TIgpMPApMPQpMPQpMPQpMPQpMPQpMPQpMPQpMPQpMPQpMPQpMPQpMPUMDLxeLPDYxwS5OTrZf/2k2WQOPj/Pz'+
		'EVLgJ9UqnwJU5LBWY/lcrg18WCrxmUSCRfGegO+enLAvCwuB4wMDP9N1Pg2M3mp1QXsj4Ql8torP7h4fBwr3HfwCUM0B1Aouvvsd'+
		'8M8BwH0Di6F7DfPTLdQKXkdZhUqFffJxng8MfooeTXnoUafwJH7EKub4HuB+LHCewS8BTQQAPQ8ue3wPda0PUJdr8LCgdvAD1L3m'+
		'oW7H4NeAxkcAtYI30JaiS7gtOCxQO/hhvc5Ws1nbtp0LDivUDv4D8LwF/B/w40qFZ2Kx0EOt4OXTU/Y2ne7b7i7w3UKB35ubaz9/'+
		'FI+PBbQ37xqNNmjj6Iht9tnGusBL29v8TiYz1uDVZpO3MDq/lst9T2p9h/QMhrSYD2UM6fdjMqQf4N9YKplkszio7GMeOxrS5ogT'+
		'1Kxxygkz3Az9htNY3malttyWRG9fikbZdAjhEnoFi9SOWFwdbEm24E7hWAFvYAWU29Qo4RJ6GW35hba80jRX7XB1tFxBZTlUpo2g'+
		'x809+hPQNy6hnsAy4rrm9pDg5jkq6nruEToQWOY+GnMrILgZqqPsfZ/K9uUCYAUHlpvpdOe/6yBwM7SGsg6w8q6F6QKgF54FXDN6'+
		'xQ1cQlPGd0s+QwMByywbPe4E3oEaO4Do0fUAr24DvaZd3Nri1wG/ir28hddmuISK6Gdn7Dfe+zDO17S9kRfxKeznAn7BuI8mdxEf'+
		'tigw9Sgw9Sgw9fwFSod+p8kgrB8AAAAASUVORK5CYII=';
// 青
icon_2[8] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADGElEQVR42u3YzUsiYRwH8J+HGJFM'+
		'27R11cIwKluIhf0XugQRdJOiCDp2izoEFR2iokO3Dh2CXijyUgRBl+7BwkYvaGkYBFINTloZom3rszPGs6tWjqPjS88+35Mexuf5'+
		'zPP4vPwUCCH4n6KgYMJDwaSHgkkPBZMeCiY9FEx6KJj0UDDpoWDSQ8Gkh4JJDwWTHgomPQUD2+1OVFHBQHm5Mv798TEC9/dhcDha'+
		'FESBh4aukVrNgEIRg4sLFpaWvsaB/f0eVFf3CZTKMri7i8DJiQ+2t7/nHZ838NgYhwwGBm5vo0nQ1GB4ZSUDNzdROD6+zCtcdvDE'+
		'BIf0enFoOrjfH4Wjo0vY2pIfLht4eJhFFotKMjQdPBiMwsGBDzY3v8kGzxk8MsIhs1n6iGYK1+tVwLJhcDqvZFngsgZPTnJIGAW5'+
		'oe/B8Yi7XCysr2fflmRwoaBicLfbD6urNsltZwyemgogjaas4NB08FDoFz/VWUlwUfDMTIDfR4sPFYOfn3OwuNgg2rd3waUKFYOf'+
		'nXF8X9+HvwIPDvqQ1aopeWg6uNd7D3Nz5jf7nQRuaztE7e3W+OeBAfWHgKZmfj4UB+3seGF39/X+nQTu7PyJWlsbPjR4YSGMnp9/'+
		'w96e582T2ptT2mLR8Af6KD81/LC8LH3pL0b6+pzIZPoMtbUqfssKZDalEzM6GkA1Ncr4KaeU4YnQ/X1f2gUrLViIMNoajQoMhtKD'+
		'Y2hVFcPfsK5FoRmB//24BzU16QBvU8WEY6hWy0AgEIXpaZ2kfkg6Wvb0nCKbTXirhR/xxBEV7s2zs9KgWYFxurqcqKXlC7/n5R+e'+
		'+B8V2hofzw6aExint9eJmpvzA0+EBoMR/pZ0DSsruR+CZCkAdHcf81Pd+Pfumgs8Eer3h+H09ArW1uQr9Mla4hHgjY1G0OlUwHHS'+
		'4BhqMr0863bLC80LGMduP+SnujkjOIYajS93bJfLBxsb8pV0CgLG6ej4gerrjVBdrYKnp1gSHENjMeBfSgQeHlhwOD5wmTY1uBBv'+
		'NmvjcIYpI7MQX2qhYNJDwaSHgknPH5M3g6dZBhoEAAAAAElFTkSuQmCC';
// 灰
icon_2[9] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMATgBOAE5iBS3kAAAC0UlEQVR42u3YzYtxURwH8GMzFsbL'+
		'mExmZDGG8j/YzF9gJWU1pjRS9jJNapDYK5mmhJpJ+SNsZm8hiWgaa3kpK+k8z+/Uma4ZXJd7PZznfDdYcM7H79zzpnK73eh/ioqD'+
		'GQ8Hsx4OZj0czHo4mPVwMOvhYNbDwayHg1kPB7MeDmY9HMx6OJj17A3s9/vx6ekp0mg05PN0OkWTyQSVSiUVU+BoNIop8uvrC728'+
		'vBBgKBTCVqsVqdVqAm+1WqhSqSiOVwz8/PyMz8/P0Wg0WoD+DIXrdDo0GAxQs9lUFC47OJFI4LOzM1HoOvhwOCTw9/d32eGygR8f'+
		'H/HV1ZVk6Do4DPVGo4He3t5kg+8MjsVi+OLiYmfoKjiMFhjq7XZblglua3AqlcJQBbmhq+C04p1OBxUKha3bkgzeF1QM3uv10Ovr'+
		'q+S2Nwan02myju4bug4OazlUXApcFJzJZMg6+q+hYvDPz0+Uy+VE+7YSfKhQMTgM9Xw+v7Kvv8CRSIT8wKFD18H7/T4UbGm/F8Ae'+
		'jwff3t6S9+Fw+CigP5PNZjG81mo1VK1WfxkWwD6fD7tcrqMG/32O8Xw+Rx8fH0t3akuHtMViIVP/MQ3ph4cHfHl5icxmM5nANhrS'+
		'wsDmH3ZQsMs5ZLgQWq/X105Ya8EQqLZWq0Vw6jk0OIUaDAZytBSDbgSmCQaD2GazoUNYpigUZuPxeIzi8bikfkjaWgYCAWy325Fe'+
		'r997xYUVhbaTyeRW7W51eLi/v8dOp/P70K4kXPiMQltPT087tbPT8RAq7nA4FIELofSUtM1hQVYwDVQc4PTsugtcCIWbj12Pg4qA'+
		'hfCbmxsCh85KgVMoLIXw3W63KytUETDN3d3dd8XF4BRqMpnICgAVLRaLx3OJJ4zX68XX19fIaDSi2Wy2AKdQjDGBwh9TLpeP95r2'+
		'Z+hFPDybAD85OWHzIv7QwsGsh4NZDweznj82FQczpHgBCQAAAABJRU5ErkJggg==';
// 白
icon_2[10] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAAAAAAP9DpOgcAAABjklEQVR42u3YwVKEMAwG4AQEWQ+i'+
		'XPD9n04OurIXkF2I68WxslAoLZSY/wbDTPsNkLZBAIL/FBQw8wiYewTMPQLmHgFzj4C5R8DcI2DuETD3CJh7BMw9AuYeAXPPamCq'+
		'aoIkUW9WFeDDAVmBidQBEAFv3YfjETB7do53Bh6C6p5zDbcOngrVwssS8Cm1DrcGNoVq4acTYPpoDb4YbAuqhVsqcMZgV1AtvGkA'+
		'72PjsWaD14Jq4W0LeBfOHnsyeCuobbgW7AtUC584t0Gwr9Cl8B54L1AdfGjeCpheC4I83xV0EF4UgC95z6CCP0qCNOUBHtipjX/S'+
		'1wsMcBdwo096j/C5NWd0WepVQI/gpsV10sbDJ/jSVWTW1pIuLUEYbgK3tVwaHR7osyGI41XgtvcFi46H1HYEQeAE3vuNug4wDLY7'+
		'HiqTa84EUWQF3oOez4Bx5E8DwBbcNdQJ+Gfyf1uyI/AetK4BD8l+mngK5u2dIMtuwl21cDYFK/jfb/2q/S63LBvxvkXA3CNg7hEw'+
		'93wB6xoXENO1jwwAAAAASUVORK5CYII=';

//--------------------------//
// アイコン定義（強調表示） //
//--------------------------//
var icon_3 = new Array();

// 強調１
// 20x20用
icon_3[0*3+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAAACAAACPkxwRAAAAdklEQVR42u3TSw6AMAgEUDhZuZl6'+
		'MzgZ/kLCwqiLisYMmyZddF4mlGmk14eBAAIIIIAAAgggvohQUW+tkZmRqHApIsK3h5do9/3+CtMV4YM7H0StGJ64BhFNRAtxljaR'+
		'28iIsxYeQeSlvLuc//2iQAABBBC9ZwYR9EOiDD/NxgAAAABJRU5ErkJggg==';
// 15x15用
icon_3[0*3+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAAACAAACPkxwRAAAAiklEQVR42u3SUQqAIBBF0ZmV6c6q'+
		'nenKpgwqiQqEkgnu/RL88PBQZZRfpYABAwYMGDBgTwEGDBgwYMCAXdUdnGKyEILknCWmqC7BG3J/dGGaHfct+C5gG8z0gVPwOqkf'+
		'8LbwFalg3S18h27FdgOfsesXqM6uFy4VYH12t/CbAQYMGDBgwIBdBfjrZqEuUy3an0BpAAAAAElFTkSuQmCC';
// 11x11用
icon_3[0*3+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAAACAAACPkxwRAAAAx0lEQVR42u3WQQ6CMBQAUXoyuJl6'+
		's3Kyqo0kDQlKoMafcWbFgkVf+ktJw3X4q5JgeILpCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ5geoLpCaYnmJ7gSOUpl3Ec6/M8z8OU'+
		'p4QGl0sp6UUs5bHYW+KCl91twT12ORS4HeG6uBXtiV46ig8Fbkf447sHRzwUeD3G77CIHd6DPnuWBf+6Pef4zBUVGtx+letiO9zJ'+
		'4cBbf1e9/rrCgb+dYHqC6QmmJ5ieYHqC6QmmdwcvYXo94A2nDgAAAABJRU5ErkJggg==';
// 強調２
// 20x20用
icon_3[1*3+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAAACAAACPkxwRAAAAd0lEQVR42u3TUQqAIAwG4O1k7mbW'+
		'zbaTrbAMI6gebEX8e1EU3MfPZBro9WIggAACCCCAAAKILyJU1FNKZGYkKhyKqM2Xl0ciz2V7hemK8Oxemh8v5mOOQWxJ1BTWNTSJ'+
		'XRoN4iyFRxDtUN4dzv9+USCAAAKI3jUBGfRDouKLt9UAAAAASUVORK5CYII=';
// 15x15用
icon_3[1*3+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAAACAAACPkxwRAAAAjElEQVR42u3TWwqAIBCF4XFlujNr'+
		'Z7qy6UYmlA9CyQT/eRpR8OOgTib5VRxgwIABAwYM2FIAAwYMGDBgwKYyHJxCUu+95JwlpOBMgk/kdessorEse/BDwBpVd2T7wLrt'+
		'7IBLw0/oFWuu4Sa6EzsMfMNu77eabTcsxyerZ3MNvxnAgAEDBgwYsKkA/joLvS5TLdt3R4cAAAAASUVORK5CYII=';
// 11x11用
icon_3[1*3+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAAACAAACPkxwRAAAAx0lEQVR42u3WQQ6CMBQA0fZkcDPl'+
		'ZvRklUgwEKMSivFnnFlB0gUv/QVyuqa/KguGJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmmJ5ieYHqC6QmO1NiPteu6+3UpJfVj'+
		'n9Hgeqk15WG5mS4zF/zY3RX4jF0OBV6P8Px0w3bBhF46ig8F3ozw58WHRjwU+GmM32ARO7wL3XiWBf+6Xee44RMVG7x6K89P2/5N'+
		'Dgd+9Xd11l9XOPC3E0xPMD3B9ATTE0xPMD3B9G5/YXo9rrEx/QAAAABJRU5ErkJggg==';
// 強調３
// 20x20用
icon_3[2*3+1] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABnRSTlMAAACAAACPkxwRAAAAZUlEQVR42u3T0QmAMAyE4ctkzWbq'+
		'Zulk9UkQodWHWov8t0A+jotp1ecxECBAgAABAgSIGRHhUVJy5RzycBuKOI5fc4fpiiiLSvXQpjGIKZqotdFq4RXEeZRPx/nfFwUB'+
		'AgSI3tkBiLM1ovVcm2YAAAAASUVORK5CYII=';
// 15x15用
icon_3[2*3+2] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABnRSTlMAAACAAACPkxwRAAAAh0lEQVR42u3TQQqAMAxE0eRk7c3U'+
		'm7UniwtRK+pC0DLCn1UChT4G4jbar+KAAQMGDBgwYKUABgwYMGDAgKXSHVxyiZSS1Votl+yS4BXZfmsW2/YE3wUcQ8SCvH1hPrkO'+
		'eG/4yhR6Dd+jn2G7gc/YOMziDS9H1s5yDb8ZwIABAwYMGLBUAH+dGT7ETS0BGxpnAAAAAElFTkSuQmCC';
// 11x11用
icon_3[2*3+3] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAAACAAACPkxwRAAAAw0lEQVR42u3W0Q6CIBhAYXgyebPq'+
		'zeTJaLXKrLkc2vp3OucKpxd+AwY5HdNflQXDE0xPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9ATTE0xPMD3B9ARHaixjG4bhOq61pjKW'+
		'jAa3Q2uXX7w9pXzKXPA0uxN4j1kOBX5ewvffm9ceo158KPB8CX/8umuJhwK/L+NlLGKG16G37WXBv27dPu4/ooKD28vb7WdyOPDS'+
		'7WqvW1c48LcTTE8wPcH0BNMTTE8wPcH0zgGkcD3U7OevAAAAAElFTkSuQmCC';

//--------------------------//
// ルート構築モードアイコン //
//--------------------------//
// 正常アイコン
var ricon = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADOElEQVR42u3Yy2sTQRwH8F+U1XZD'+
			'39EQE2krJbREsZCzB6mI9SIevJQi/g3iTfQgetCDd29Fag6KB73Ug8WDCF4KoZIHobSNpGlW10ht3baGMs4snbBNNtlHZiUd53va'+
			'3XYfn8zuPH4+hBD8T/EJMOcRYN4jwLxHgHmPAPMeAeY9Asx7BJj3CDDvEWDeI8C8R4B5jwDznn8Gnkq9Rz3SceiUZX1/W9NgQ9uG'+
			'xPhlH1fgO+tJ1C11VPdP7m9/q+zAEUDQIR3D8C1IF4vwOj7pOd4z8D01jcKSrMNolpU1GAme0reXlCKcCYb1bQIPSJ2wVtEgnc97'+
			'CmcOfqBmEWnFWuhMbMJ3KzWPjGB6rBZOzv2SX4FXHsCZgcmrOyL3mkLpvhnY+LdauFrZhsXCKrwcZwdvGXxXTaHTkr8p1A64ETwo'+
			'd8O6tgnZwlcmHZxr8EM1g+jrZwV1Am4Epy2exvdIxC65hjsGu4G6AVvBs0oJZmMXHcNtgx/jzqinQWdk92ZuwM3gG6RzU9YdwS3B'+
			'LKAswFbw5fJ3eBa9YHm9hmCWUJZgK3gGw2eawOvAtwsLKNo1UAdlFSOYVWrhuc0f8DQSN0UfAE8m59C14bED/0A6iMMQAjXmzUoG'+
			'5kzG7wPgGwtzaGJkrO5i7Y42Yo9KEuxVKjC/lDGdqZm+0oNdffh7+FM9dlhe6V3YgyE828uUS/ZeaWPIDIqcTGY5Rng7dloU+qmw'+
			'3LTDagomIa3d2+GHkNzFBM56WCLQATySLJJr2RiSLMHVm+Q+orH+E9AuEw8C7cPP8hM/y6NAzNGP5mhqOZ36gM4FQ9DvssVbnVrS'+
			'Fi3hTvRJ4Kyrz8HV4oGUa84HI47hbhcP9Bsl97ofGG1pxdTS8vAmfqgYfii7cKfLQwot42un8DWft9DJMQHTTCffodHIYHXt2ghu'+
			'twBAoYr2C6+D8zA7fqV9CgC18GhkCAKyH1Ttdx3cqsRDoGH8o5Fzc4VVplBPwDRTeoubw82KeARKqyZZDE14APUUTHP981s0HAlD'+
			'EI/lu/vHjGVaAiVRd3ZgS1HgRfzq4S3T1oYW4kN4PF/CLe3X69EcFuLbLQLMewSY9wgw7/kLaIwBtgdcB2UAAAAASUVORK5CYII=';
// エラーアイコン
var ricon_e = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADRUlEQVR42u3YT2jTUBwH8F+dgS12'+
			'znVlYa46N2pRq1jYXfAiePLgQRhDPHhRFGRuoIgiovhnOg8qOygiOobiyZPgRRAEDwpDF1drqXZUt4ysOqbVUcfzvbYpaZs2Tfo6'+
			'u+f7XrakS8pn7+Xl/X4OhBD8T3FwMOPhYNbDwayHg1kPB7MeDmY9HMx6OJj1cDDr4WDWw8Gsh4NZDwezniUDyz39SGhqBLFBTB0n'+
			'fiUgMfcdAqPXHUyBp/oHkbDamT0WWltSP5MzswArVoJQL2D4D/ganIDux7eqjq8aWD19AwntUhqWiRKZBMnblf49HAGpa336AwJ3'+
			'N0HyiwLRYLCqcOpg9dwwIqOYD/Xfu+iQD5xEenD2XD4cXxuVZeh+dJM6nBqYTF3R22EI1Y6NwDmf5cPVOYiNT0Dg4RA1eMVg9RSe'+
			'uuukktBywMXgouSCxNQMxIIhKgucbbB6/jbSpp8Z1Aq4GFwbceX9B/CPXrUNtwy2A7UDNoXjVd0/Yn2qlw1WL9/F71GnLWgl4JJw'+
			'/DpT3o1bgpuCaUBpgM3g8c+T4Bs+a3q/omCaUJpgU/jER/CVuG8BONY3iBp9ha8XWtGDqd0zDz4fioJnaMAQnQMe230Qde7ZlfMH'+
			'ZIFYDiFQfT49eQaBp3cK0DngN/uOIO/OHQU3q3W0HivU1UFycRHCz18Y7tSMp3RHG34e5rPnls2UXvgD4oa1+DmOlDel9SE7KHIx'+
			'2eXo4TW5aGWgsZevSy5YJcEkZLTr1zhBbGulAqf+WsJQoaUZlLeyKbQssJYQ/hLX5o1QMxsPAm1uhOS3eXBfOGrpn2Zpayn39iFp'+
			'21YQXU22RrzirWVmRJPTKrivHLP1ONgqHki7Rtq+xTLcdvGQeUbJd7nPHKqoYqqoPJT3n0CS31c23HJ5qEHjuFiQQ+C/f+nflYf6'+
			'jPUOIM8mX7Z2LQYvuwGgQZV4ug4eGaydBkAB3NcFohvD1XgB3LTFQ6DtralrY6EIVWhVwFl4z3E84l5DuGETjyxGma5JLBiGwOi1'+
			'5dPE0+fV3sPI09EJ9VILRi2kzuW0aTGU5Lc6C0riJ3Q/oD+iSwrWR2vEu/AmRglHQVjVwGYjvtbCwayHg1kPB7Oev9FP96eURC+L'+
			'AAAAAElFTkSuQmCC';
// 起点アイコン
var ricon_f = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADo0lEQVR42u3Yy08TQRwH8F/VVWjD'+
			'u9JgawBDCKQaSTiTYjBGvBgPXggx+i8YbwYPRg968O5JYpCDxoNe8CCRhph4ISGYPkIIUFMeiysGwQJWMs5smGa7O93ubrumjvO9'+
			'bFu62/3wm52XByEE/1M8Asx5BJj3CDDvEWDeI8C8R4B5jwDzHgHmPQLMewSY9wgw7xFg3iPAvOevgYdi71GddAKqvV71/W4mA1uZ'+
			'XRjvueThCnxnbRbVSlW5982Hrzeye3AEEFRJxzF8B+Krq/C6d9B1vGvgESWOgpJXhdEsyivQETilvl6QV+FMIKi+JnC/VA0r2QzE'+
			'UylX4WUH31eSiFRRDx0ND3huxiaRFkw/08PJuZ9TS/DKBXjZwKTpdnjrDdBbyjFL5z/z/zZUXMnuwlx6GV72lA9eMviuEkOnJR+z'+
			'otFoVL14pL/f9BrRqSn1GIlEDBUPeGthLbMNyfSXsnRwjsEPlASizU8PVREWsSw0ObKaOql4HP/GePiiY7htcDFoDoDBeixF0bD+'+
			'TsE0heBJeR3Gwhdswy2DH+HOqK5AZ8T6vh5MsdPhZvXYF9swoFlgM/gW6dzkNVvwomC7UDMw6Zi0vTSrQysELgZf3PwKTzv7isIL'+
			'gp1CzcAktMJ0WLJWF+vwBIaPmsAN4NvpGdRZ02SA2g2pXrFnWBtSfafRw+e3v8GTUC8TnQcenJ1AV9u7875AOggnYT2jhaKvvpMQ'+
			'qDZvlhIwwRi/88DXZybQQEe34WKVjtZij0oSHGSzMLmQYM7UmE26taYBPw+/cp85adI0ZjMtVpN30rRpk96HA2jDs73E5rq1Jq0N'+
			'mUGRk8ksRwsvtaOhvbTdYYl1LT30Y3rRtMMyBZOQatdX+aDFW2MbTmda2rCGJbtgPbQJjyRzpMe3MCQVBed+ZH4adTeehEqZeBBo'+
			'A76X7/heHvrDtlqcranlcOwDOhdogUYLFXdjakkruo470cf+s44eLUeLB7Jdcz4QMoWXc/FAn1HyW/f8XSWtmEpaHt7ANxXGN1UI'+
			'XurykEI38bVj+JrPS+gwywKmGZ59h7pCrbm1qxbuZAOAQuXMD7wOTsFYz+XK2QDQwztDbeD3+kDJ/MyDW9niIdAg/qeRc+fTy2WF'+
			'ugKmGVIrzoazNvEIlO6aJDF03AWoq2Caa5/eovZQEAJ4LN8//Ey7TUugJMreHuzIMrzovfLvbtPqQzfiW/B4voAr7VP3oznciK+0'+
			'CDDvEWDeI8C85w/zOie2NTYv+QAAAABJRU5ErkJggg==';
// 終点アイコン
var ricon_l = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAADeklEQVR42u3YzUsUYRwH8N9WU7qL'+
			'75uL7YYWIsoWCZ5lDSOyS3ToIhL1L0S3qEPUoQ7dOyVhHooOdbFDkiJBF0GMfUFE3VhfxibDtFXb5On5DT7D7uy4OzM7I+vT8z3N'+
			'Djszz2eeZ543DyEE/qd4BJjzCDDvEWDeI8C8R4B5jwDzHgHmPQLMewSY9wgw7xFg3iPAvEeAec+BgfujH0mNdAIqvV7191Y6Devp'+
			'LRjuvOzhCnx3eYpUSxXa78a949XMNhwBAhXScQrfhNjSErzt6nMd7xr4vhIjQcmrwljm5EVoDZxSj2flJTgbCKrHCPdLlbCYSUMs'+
			'mXQV7jj4oZIgWIt66GC413MrOkqyweycHo7Xfk3OwxsX4I6Bsem2ems1aCQq27rPeDigwZXMFkynFuB1p3PwksH3lCg5LfnyavS2'+
			'cgwiPT3WsGNj8ML/N6epB7zVsJzegETqmyMdnG3wIyVOWPPLhmIzVQs/Pk7sgCORiHq9UVPHGo/RZwyHL9mGWwYXg2qF14ERYyYM'+
			'zLIfPCGvwFD4omW4afAT2hnV7NMZGf3fCIzNVd9pmS2oEXwdOzd52RK8KNgq1C1wMfjc2nd43tZd9H77gu1C3QYXg8cpfLAAPA98'+
			'JzVJ2qoa8qBWo++lzXzD+ELsRA+f2fgBz0JdhugccN/UCLl2piPnD9hB2El3dNXSsIQvZCLcaOtZGIRm5918HEYMxu8c8I3JEdLb'+
			'2pF3MzvogwRnY49KEuxmMjA6GzecqRk26eaqOvo9/NHOHZYmvQO70EJne/G1FXNNOjs4g8KLcZaTDS/HTotBP6fmCnZYBcEYrO3a'+
			'Ch80eassww9iWEJoAx1JpvFeJoakomDtITMTpKP+JJTLxAOhdbQsP2lZHvvDll6apanlQPQTOR9ognoTNe7G1JLV6ArtRJ/6z9n6'+
			'HGwtHnC75kIgVBDu5OKBfaP4rAf+9pJWTCUtD2/SQoVpoYzgTiwPGXSN3jtK7/myhE7OETDLwNQH0h5q1taumFI2ABhUTv+i6+Ak'+
			'DHVeKZ8NAD28LdQCfq8PlPRv7bzZLR6EBulLw2tnUguOQl0Bs/SrNW4MN9rEQyjbNUlQ6LALUFfBLNe/vCdnQkEI0LF8Z+9c9jYt'+
			'QjHK9jZsyjK86rp6eLdp9WEb8U10PJ+lNe1T96M53Igvtwgw7xFg3iPAvOcfcDIRtt/m9fAAAAAASUVORK5CYII=';

var atk_icon = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMAwADAAMCNeLu6AAABIUlEQVR42u3Yaw6EIAwE4OVkXh1P'+
			'xsZNTBpSHiZthdmZn0giH2BFU875809JBIOHYPQQjB6C0UMweghGD8HoIRg9BKOHYPQQjB6C0UMwegj2zHEcRWs/zzPBgW9sqmil'+
			'xKJDwalButAEEwwM1oqb1YQsWbTk5BRBt0C7grWV0iDNwQme1bZ3A0tsMtiMW4C17dtb4XpF7zbLd3UIWOJ6bb2+yxetGXALeuHq'+
			'5395cI3WkBrUbTAR4Bv9u9HLUFdwq0JrRSsSaw7uQUftWx0tZ6D1NZlIuBm4B21NxBvPtfkKywFrBWs0GbKPB9r9aKlhW19GHmfn'+
			'EPAs9mnfpcGzgCd9twCPAK2PjG3BI0D0r1v3k5Y3YAnwyiEYPQSjh2D0fAED+WdMDlMwAwAAAABJRU5ErkJggg==';

// 兵士構成
var solname = ["剣","槍","弓","騎","矛","弩","近","斥","斥騎","衝","投","武"];

//----------------//
// メインルーチン //
//----------------//
(function(){

	// ブラウザ判定(Chromeかどうかを見極める)
	var ua = navigator.userAgent;
	if( ua.match(/Chrome\/([\.\d]+)/)) {
		browserType = "Chrome";
	}
	else{
		browserType = "";
	}

	if (location.pathname == "/map.php" || location.pathname == "/big_map.php") {
		// 全体マップ画面なら実行中作業を取得

		// 51x51モードの実装されているサーバーかを取得
		add51_51mode = check51_51mode();

		//HTML追加
		addHtml();

		// 51x51モードか？
		if( getViewSize() != 51 ){
			//結果取得
			getNPCCastleInfo();
		}
		else{
			//結果取得
			getNPCCastleInfo_51(0);		// 0: ルート構築再描画ではない
		}
	}
	else if(location.pathname == "/facility/unit_status.php" ){
		// 出兵情報画面なら実行中作業を取得＆スプレッドシートに出力（未実装）
//		putSoldierInfo();
	}
})();

//-----------------------//
// 51x51モードの実装判定 //
//-----------------------//
function check51_51mode(){
	var result;

	var el = $e('//*[@id="change-map-scale"]');
	if( el.snapshotLength > 0 ){
		result = 1;
//		gloss_original = unsafeWindow.gloss;
	}
	else{
		result = 0;
	}

	return result;
}

//----------------//
// 出兵情報の検索 //
//----------------//
function putSoldierInfo(){

	//----------------------------//
	// スプレッドシート情報の取得 //
	//----------------------------//
	var chkflg4;
	execFlag = loadExecFlag(location.hostname, "FLAG4");
	if( execFlag == "" ){
		chkflg4 = new String(FLAG4);  // 初期値
	}
	else{
		chkflg4 = execFlag;
	}

	// スプレッドシート名の加工
	if( chkflg4.charAt(0) == '1' ){
		var key = chkflg4.substr(1).replace(/.*[\?&]key=([^&]+).*/, '$1');

		// 出兵情報を取得
		var battleType = new Array();
		var target = new Array();
		var arriveDate = new Array();
		var fdata = new Array();
		var count = 0;
		var sortie = $e('//div[@id="sortie"]//th[@class="ttl3 w80"]');
		var flist = $e('//div[@id="sortie"]//table[@class="commonTablesNoMG"]//td[@class="digit"]');
		for( var i = 0; i < sortie.snapshotLength/3; i++ ){
			// 殲滅戦、援軍、強襲等
			battleType[count] = sortie.snapshotItem(i*3+0).textContent;
			// 出兵先
			var pos = sortie.snapshotItem(i*3+1).parentNode.innerHTML.match(/\([-]*\d+,[-]*\d+\)/);
			target[count] = pos[0];
			// 到着日時
			var dt = sortie.snapshotItem(i*3+2).parentNode.innerHTML.match(/\d+-\d+-\d+ \d+:\d+:\d+/);
			arriveDate[count] = dt[0];
			// 兵士構成
			var fd = "";
			var total = 0;
			for( var j = 0; j < 11; j++ ){
				var num = parseInt(flist.snapshotItem(i*12+j).textContent);
				if( fd != "" ){
					fd = fd + "/";
				}
				fd = fd + num;
				total = parseInt(total) + parseInt(num);
			}
			if( total != 0 ){
				fdata[count] = fd + "[" + flist.snapshotItem(i*12+11).textContent + "]";
			}
			else{
				fdata[count] = "SMK[" + flist.snapshotItem(i*12+11).textContent + "]";
			}
			count ++;
		}

		// 出兵データをPOSTする
	}
}

//----------------//
// 領土情報の検索 //
//----------------//
//拠点の作業中情報を取得
function getNPCCastleInfo() {
	//--------------//
	// ホスト名判別 //
	//--------------//
	var hostname;
	var ikibaku_flg;
	hostname = location.hostname;
	if( hostname.indexOf("1kibaku.jp") != -1 ){
		ikibaku_flg = 1;
	}
	else{
		ikibaku_flg = 0;
	}

	//--------------------------------------//
	// チェックボックスに関する情報をロード //
	//--------------------------------------//
	var chkflg1;
	var chkflg2;
	execFlag = loadExecFlag(location.hostname, "FLAG0");
	if( execFlag == "" ){
		// 表示フラグをロード
		var execFlag1 = loadExecFlag(location.hostname, "FLAG1");
		if( execFlag1 == "" ){
			chkflg1 = new String(FLAG1);  // 初期値
		}
		else{
			chkflg1 = execFlag1;
		}

		// オプションフラグをロード
		var execFlag2 = loadExecFlag(location.hostname, "FLAG2");
		if( execFlag2 == "" ){
			chkflg2 = new String(FLAG2);  // 初期値
		}
		else{
			chkflg2 = execFlag2;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg1 + DELIMIT1 + chkflg2;
		saveExecFlag(location.hostname, "FLAG0", execFlag);
	}
	else{
		var loadflg = new Array();
		loadflg = execFlag.split(DELIMIT1);
		chkflg1 = loadflg[0];
		chkflg2 = loadflg[1];
	}

	// 個人、同盟検索情報をロード
	var chkflg3 = new Array();
	execFlag = loadExecFlag(location.hostname, "FLAG3");
	if( execFlag == "" ){
		var execFlag3 = loadExecFlag(location.hostname, "FLAG3-1");
		if( execFlag3 == "" ){
			chkflg3[0] = new String(FLAG3_1);  // 初期値
		}
		else{
			chkflg3[0] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-2");
		if( execFlag3 == "" ){
			chkflg3[1] = new String(FLAG3_2);  // 初期値
		}
		else{
			chkflg3[1] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-3");
		if( execFlag3 == "" ){
			chkflg3[2] = new String(FLAG3_3);  // 初期値
		}
		else{
			chkflg3[2] = execFlag3;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg3[0] + DELIMIT1 + chkflg3[1] + DELIMIT1 + chkflg3[2];
		saveExecFlag(location.hostname, "FLAG3", execFlag);
	}
	else{
		chkflg3 = execFlag.split(DELIMIT1);
	}

	//----------------------//
	// 処理パラメータの抽出 //
	//----------------------//
	//-- データ絞り込み時のユーザー名情報の取得 --//
	var checkBox1;
	var checkBox2;
	var userBox;
	var listbox;
	var userName = new Array();
	var userText;
	var fullmatch = new Array();
	var nodisp = new Array();
	var target = new Array();
	var colorNo = new Array();
	for( var i = 0; i < 3; i++ ){
		fullmatch[i] = 0;
		nodisp[i] = 0;
		target[i] = 0;
		colorNo[i] = 0;
	}

	// 個人・同盟検索１
	checkBox1 = $e('//*[@id="ckEnable1"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[0] = 1;
		}
		else{
			target[0] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[0] = 1;
		}
		else{
			fullmatch[0] = 0;
		}
		// ☆表示
		checkBox2 = $e('//*[@id="ckLevelSearch1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			nodisp[0] = 1;
		}
		else{
			nodisp[0] = 0;
		}
		userBox = $e('//*[@id="userBox1"]');
		userText = userBox.snapshotItem(0).value;
		userName[0] = new Array();
		userName[0] = userText.split(OWNER_SPLITKEY);
		// 枠色
		listbox = $e('//*[@id="lsColor1"]');
		colorNo[0] = listbox.snapshotItem(0).selectedIndex + 1;
	}
	else{
		userName[0] = "";
	}

	// 個人・同盟検索２
	checkBox1 = $e('//*[@id="ckEnable2"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[1] = 1;
		}
		else{
			target[1] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[1] = 1;
		}
		else{
			fullmatch[1] = 0;
		}
		// ☆表示
		checkBox2 = $e('//*[@id="ckLevelSearch2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			nodisp[1] = 1;
		}
		else{
			nodisp[1] = 0;
		}
		userBox = $e('//*[@id="userBox2"]');
		userText = userBox.snapshotItem(0).value;
		userName[1] = new Array();
		userName[1] = userText.split(OWNER_SPLITKEY);
		// 枠色
		listbox = $e('//*[@id="lsColor2"]');
		colorNo[1] = listbox.snapshotItem(0).selectedIndex + 1;
	}
	else{
		userName[1] = "";
	}

	// 個人・同盟検索３
	checkBox1 = $e('//*[@id="ckEnable3"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[2] = 1;
		}
		else{
			target[2] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[2] = 1;
		}
		else{
			fullmatch[2] = 0;
		}
		// ☆表示
		checkBox2 = $e('//*[@id="ckLevelSearch3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			nodisp[2] = 1;
		}
		else{
			nodisp[2] = 0;
		}
		userBox = $e('//*[@id="userBox3"]');
		userText = userBox.snapshotItem(0).value;
		userName[2] = new Array();
		userName[2] = userText.split(OWNER_SPLITKEY);
		// 枠色
		listbox = $e('//*[@id="lsColor3"]');
		colorNo[2] = listbox.snapshotItem(0).selectedIndex + 1;
	}
	else{
		userName[2] = "";
	}

	//-- 資源判別ONのとき、資源表示 --//
	var res_mode;
	var areaNo;
	var areaNo2;
	var areaNo3;
	if( chkflg2.charAt(FLAG2_ANALYZE) == '1' ){
		res_mode = 1;
	}
	else{
		res_mode = 0;
	}

	// 強調表示選択値を取得
	areaNo = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO,3));
	areaNo2 = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO2,3));
	areaNo3 = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO3,3));

	//------------------//
	// 画面サイズの取得 //
	//------------------//
	var viewSize;
	viewSize = getViewSize();

	//----------------------------------------//
	// 全体表示画面から、領土情報を手に入れる //
	//----------------------------------------//
	// イベントデータ
	var areas = $e('//*[@id="mapOverlayMap"]//area/@onmouseover');
	var mouseout = $e('//*[@id="mapOverlayMap"]//area/@onmouseout');
	var href = $e('//*[@id="mapOverlayMap"]//area/@href');
	var textArea = $e('//*[@id="castleInfoText"]');

	var putText = "";

	//------------------//
	// 全領土を検索する //
	//------------------//
	for (var i=0; i<areas.snapshotLength; i++) {

		// 取得した領土の情報を抽出
		var rowText = areas.snapshotItem(i).textContent;
		var rowText2 = href.snapshotItem(i).textContent;
		rowText = rowText.replace(/^.*rewrite\(/, "");
		rowText = rowText.replace(/\); .*$/, "");
		var bkText = rowText;
		rowText = rowText.replace(/\//g,"==uZer==");
		rowText = rowText.replace(/', '/g,"'/'");
		rowText = rowText.replace(/'/g,"");
		var valueA = new Array();
		valueA = rowText.split('/');
		valueA[1] = valueA[1].replace(/==uZer==/,"/");
		var userTxt = '<b><font color="green">' + valueA[1] + '</font></b>';
		var groupTxt = '<b><font color="green">' + valueA[4] + '</font></b>';

		var pictImg = '<a href="' + rowText2 + '">'
			      + '<img src="http://img.3gokushi.jp/20100705-01/img/common/sidebar/icon_base.gif" onmouseover="'
			      + areas.snapshotItem(i).textContent + '" onmouseout="'
			      + mouseout.snapshotItem(i).textContent + '" ></a>';
		var linkText = '/' + pictImg + '<a href="' + rowText2 +  '" style="text-decoration: none"><font color="#00BFFF"><b>' + valueA[3] + '</b></font></a>' + '/距離' + valueA[6];

		// マップ座標の取得
		var rowText3 = valueA[3];
		rowText3 = rowText3.replace(/\(/,"");
		rowText3 = rowText3.replace(/\)/,"");
		var valueB = new Array();
		valueB = rowText3.split(',');
		var cx = parseInt(valueB[0]);
		var cy = parseInt(valueB[1]);

		// 資源数をカウント
		var max;
		var maxtype;
		var maxcount;
		max = 0;
		maxtype = 0;
		maxcount = 0;
		if( res_mode == 1 ){
			for(var j = 7; j <= 10; j++ ){
				if( valueA[j] > max ){
					max = valueA[j];
					maxtype = j - 6;
				}
			}
			for(var j = 7; j <= 10; j++ ){
				if( valueA[j] == max ){
					maxcount = maxcount + 1;
				}
			}
			if(maxcount > 1){
				maxtype = 0;
			}
		}

		//----------------------//
		// 個人・同盟検索の判定 //
		//----------------------//
		var matchcase = -1;    // マッチしたパターン

		// 個人・同盟マッチチェック
		for( var j = 0; j < 3; j++ ){
			for( var k = 0; k < userName[j].length; k++ ){
				// 検索有効時 username に値が入る
				if( userName[j][k] != "" ){
					// ターゲットが個人
					if( target[j] == 1 ){
						// 完全一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 1) && (valueA[1] == userName[j][k]) ){
							matchcase = j;
							break;
						}
						// 部分一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 0) && (valueA[1].indexOf(userName[j][k]) != -1) ){
							matchcase = j;
							break;
						}
					}
					// ターゲットが同盟
					else{
						// 完全一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 1) && (valueA[4] == userName[j][k]) ){
							matchcase = j;
							break;
						}
						// 部分一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 0) && (valueA[4].indexOf(userName[j][k]) != -1) ){
							matchcase = j;
							break;
						}
					}
				}
			}
			if( matchcase != -1 ){
				break;
			}
		}

		//--------------//
		// 資源強調判定 //
		//--------------//
		var landLevel = valueA[5].length;
		if( valueA[5].substr(0,4) == '<img' ){
			// FaceBook Lands of Legends! 対応
			var stars = valueA[5].match(/<img/g);
			landLevel = stars.length;
		}

		var strongflg = 0;
		if( res_mode == 1 ){
			// 資源一致判定
			if(    (season1[areaNo][1] == parseInt(valueA[7]))	// 木
			    && (season1[areaNo][2] == parseInt(valueA[8]))	// 石
			    && (season1[areaNo][3] == parseInt(valueA[9]))	// 鉄
			    && (season1[areaNo][4] == parseInt(valueA[10]))	// 糧
			    && (season1[areaNo][5] == landLevel) ){		// ★
				strongflg = 1;
			}
			else if(    (season1[areaNo2][1] == parseInt(valueA[7]))	// 木
			         && (season1[areaNo2][2] == parseInt(valueA[8]))	// 石
			         && (season1[areaNo2][3] == parseInt(valueA[9]))	// 鉄
			         && (season1[areaNo2][4] == parseInt(valueA[10]))	// 糧
			         && (season1[areaNo2][5] == landLevel) ){		// ★
				strongflg = 2;
			}
			else if(    (season1[areaNo3][1] == parseInt(valueA[7]))	// 木
			         && (season1[areaNo3][2] == parseInt(valueA[8]))	// 石
			         && (season1[areaNo3][3] == parseInt(valueA[9]))	// 鉄
			         && (season1[areaNo3][4] == parseInt(valueA[10]))	// 糧
			         && (season1[areaNo3][5] == landLevel) ){		// ★
				strongflg = 3;
			}
		}

		//-----------------//
		// NPC砦の検索判定 //
		//-----------------//
		if( (chkflg1.charAt(FLAG1_NPC) == '1') && (valueA[11] == '1') ){
			// NPC砦
			if( putText != "" ){
				putText = putText + "\n";
			}
			// 砦名[0], 君主名[1], 座標[3], 所有者[4], ★[5]
			if( valueA[4] == '-' ){
				putText = putText + '<b><font color="purple">ＮＰＣ</font></b>/' + valueA[0] + '/<b><font color="red">未攻略</font></b>/' + userTxt + linkText + '/' + valueA[5];
			}
			else{
				putText = putText + '<b><font color="purple">ＮＰＣ</font></b>/' + valueA[0] + '/' + groupTxt + '/' + userTxt + linkText + '/' + valueA[5];
			}

			if( res_mode == 0 ){
				disp_AreaIcon(cx,cy,valueA[5].length,viewSize,0);
			}
		}

		//------------------------------------------//
		// 領土検索、または個人・同盟領土の検索判定 //
		//------------------------------------------//
		if( valueA[1] != '' ){
			// 領地化されている土地

			if( (matchcase == -1) && (chkflg2.charAt(FLAG2_LAND) == '1') ){
				// 個人・同盟検索に該当せず、領土検索がオンの場合

				// ☆数による絞り込み
				if(    ((chkflg1.charAt(FLAG1_LV1) == '1') && (landLevel == 1))
				    || ((chkflg1.charAt(FLAG1_LV2) == '1') && (landLevel == 2))
				    || ((chkflg1.charAt(FLAG1_LV3) == '1') && (landLevel == 3))
				    || ((chkflg1.charAt(FLAG1_LV4) == '1') && (landLevel == 4))
				    || ((chkflg1.charAt(FLAG1_LV5) == '1') && (landLevel == 5))
				    || ((chkflg1.charAt(FLAG1_LV6) == '1') && (landLevel == 6))
				    || ((chkflg1.charAt(FLAG1_LV7) == '1') && (landLevel == 7))
				    || ((chkflg1.charAt(FLAG1_LV8) == '1') && (landLevel == 8))
				    || ((chkflg1.charAt(FLAG1_LV9) == '1') && (landLevel == 9)) ){

					// 領土情報は検索結果に反映
					if( putText != "" ){
						putText = putText + "\n";
					}
					// 砦名[0], 君主名[1], 座標[3], ★[5]
					if( valueA[5] != "" ){
						if( ikibaku_flg == 1 ){
							putText = putText + groupTxt + '領土/' + userTxt + '/' + valueA[0] + linkText + '/' + valueA[5] + '/学' + valueA[7] + '/体' + valueA[8] + '/武' + valueA[9] + '/糧' + valueA[10];
						}
						else{
							putText = putText + groupTxt + '領土/' + userTxt + '/' + valueA[0] + linkText + '/' + valueA[5] + '/木' + valueA[7] + '/石' + valueA[8] + '/鉄' + valueA[9] + '/糧' + valueA[10];
						}
					}
					else{
						putText = putText + groupTxt + '領土/' + userTxt + '<b><font color="#FF0000">拠点</font></b>/' + valueA[0] + '/人口' + valueA[2] + linkText;
					}

					// 資源表示の有無で関数が変わる
					if( res_mode == 0 ){
						// パステルカラー表示
						disp_AreaIcon(cx,cy,landLevel,viewSize,100);
					}
					else{
						// 資源別着色表示
						disp_AreaIcon2(cx,cy,landLevel,viewSize,100 + strongflg*1000,maxtype);
					}
				}
			}
			else if( matchcase != -1 ){
				// 個人・同盟検索結果がマッチ

				if( nodisp[matchcase] == 0 ){
					// 画面に☆数を出す場合

					// ☆数による絞り込み
					if(    ((chkflg1.charAt(FLAG1_LV1) == '1') && (landLevel == 1))
					    || ((chkflg1.charAt(FLAG1_LV2) == '1') && (landLevel == 2))
					    || ((chkflg1.charAt(FLAG1_LV3) == '1') && (landLevel == 3))
					    || ((chkflg1.charAt(FLAG1_LV4) == '1') && (landLevel == 4))
					    || ((chkflg1.charAt(FLAG1_LV5) == '1') && (landLevel == 5))
					    || ((chkflg1.charAt(FLAG1_LV6) == '1') && (landLevel == 6))
					    || ((chkflg1.charAt(FLAG1_LV7) == '1') && (landLevel == 7))
					    || ((chkflg1.charAt(FLAG1_LV8) == '1') && (landLevel == 8))
					    || ((chkflg1.charAt(FLAG1_LV9) == '1') && (landLevel == 9)) ){

						// 領土情報は検索結果に反映
						if( putText != "" ){
							putText = putText + "\n";
						}
						// 砦名[0], 君主名[1], 座標[3], ★[5]
						if( valueA[5] != "" ){
							if( ikibaku_flg == 1 ){
								putText = putText + groupTxt + '領土/' + userTxt + '/' + valueA[0] + linkText + '/' + valueA[5] + '/学' + valueA[7] + '/体' + valueA[8] + '/武' + valueA[9] + '/糧' + valueA[10];
							}
							else{
								putText = putText + groupTxt + '領土/' + userTxt + '/' + valueA[0] + linkText + '/' + valueA[5] + '/木' + valueA[7] + '/石' + valueA[8] + '/鉄' + valueA[9] + '/糧' + valueA[10];
							}
						}
						else{
							putText = putText + groupTxt + '領土/' + userTxt + '<b><font color="#FF0000">拠点</font></b>/' + valueA[0] + '/人口' + valueA[2] + linkText;
						}

						// 資源表示の有無で関数が変わる
						if( res_mode == 0 ){
							// パステルカラー表示
							disp_AreaIcon(cx,cy,landLevel,viewSize,100 + colorNo[matchcase]);
						}
						else{
							// 資源別着色表示
							disp_AreaIcon2(cx,cy,landLevel,viewSize,100 + colorNo[matchcase] + strongflg*1000,maxtype);
						}
					}
					else{
						// ☆数の絞り込み対象外となった土地は枠のみつける
						disp_AreaIcon(cx,cy,landLevel,viewSize,colorNo[matchcase]);
					}
				}
				else{
					// 画面に☆数を出さない（領土の着色のみ行う）

					// 枠のみつける
					disp_AreaIcon(cx,cy,landLevel,viewSize,colorNo[matchcase]);
				}
			}
		}

		// 空き地検索結果
		if( (chkflg2.charAt(FLAG2_EMPTY) == '1') && (valueA[1] == '') ){
			// 空き地(空き地同時検索を除き、個人/同盟領土検索時は出さない)
			if(    ((chkflg1.charAt(FLAG1_LV1) == '1') && (landLevel == 1))
			    || ((chkflg1.charAt(FLAG1_LV2) == '1') && (landLevel == 2))
			    || ((chkflg1.charAt(FLAG1_LV3) == '1') && (landLevel == 3))
			    || ((chkflg1.charAt(FLAG1_LV4) == '1') && (landLevel == 4))
			    || ((chkflg1.charAt(FLAG1_LV5) == '1') && (landLevel == 5))
			    || ((chkflg1.charAt(FLAG1_LV6) == '1') && (landLevel == 6))
			    || ((chkflg1.charAt(FLAG1_LV7) == '1') && (landLevel == 7))
			    || ((chkflg1.charAt(FLAG1_LV8) == '1') && (landLevel == 8))
			    || ((chkflg1.charAt(FLAG1_LV9) == '1') && (landLevel == 9)) ){
				if( putText != "" ){
					putText = putText + "\n";
				}
				// 座標[3], ★[5], 木[7], 石[8], 鉄[9], 糧[10]
				if( ikibaku_flg == 1 ){
					putText = putText + '空き地★' + landLevel + linkText + '/学' + valueA[7] + '/体' + valueA[8] + '/武' + valueA[9] + '/糧' + valueA[10];
				}
				else{
					putText = putText + '空き地★' + landLevel + linkText + '/木' + valueA[7] + '/石' + valueA[8] + '/鉄' + valueA[9] + '/糧' + valueA[10];
				}

				var drawColor;
				if( chkflg2.charAt(FLAG2_EMPTY_DRAW) == "1" ){
					// 空き地着色モード有効時
					drawColor = parseInt(chkflg2.charAt(FLAG2_EMPTY_DRAW_COLOR)) + 1;
				}
				else{
					drawColor = 0;
				}

				drawColor = drawColor + 100 + strongflg*1000;	// drawColor > 100で着色
				if( res_mode == 0 ){
					disp_AreaIcon(cx,cy,landLevel,viewSize,drawColor);
				}
				else{
					disp_AreaIcon2(cx,cy,landLevel,viewSize,drawColor,maxtype);
				}
			}
			else if( chkflg2.charAt(FLAG2_EMPTY_DRAW) == "1" ){
				// 空き地着色モード有効時
				drawColor = parseInt(chkflg2.charAt(FLAG2_EMPTY_DRAW_COLOR)) + 1;

				disp_AreaIcon(cx,cy,valueA[5].length,viewSize,drawColor);
			}
		}
		else if( (chkflg2.charAt(FLAG2_EMPTY_DRAW) == "1") && (valueA[1] == '') ){
			// 空き地着色モード有効時
			drawColor = parseInt(chkflg2.charAt(FLAG2_EMPTY_DRAW_COLOR)) + 1;

			disp_AreaIcon(cx,cy,valueA[5].length,viewSize,drawColor);
		}
	}

	// 結果をTextAreaに表示
	textArea.snapshotItem(0).innerHTML = putText;

	//------------------//
	// 本拠地一覧の描画 //
	//------------------//
	if( chkflg2.charAt(FLAG2_OWNER) == '1' ){
		var baseinfodv = $e('//*[@id="baseinfo_dv"]');
		baseinfodv.snapshotItem(0).style.display = "inline";

		//----------------------------------//
		// マップデータから本拠地一覧を作る //
		//----------------------------------//
		var areasrc = document.evaluate('//*[@id="mapsAll"]//img/@src',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var areacls = document.evaluate('//*[@id="mapsAll"]//img/@class',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var baseText = $e('//*[@id="baseInfoText"]');

		var blank = '                      ';
		var outTextLine = new Array();
		var outLineMax = 0;
		var outLine = 0;
		for (var i = 0; i < 9; i++ ){
			outTextLine[i] = '';
		}
		for (var i=0; i < areacls.snapshotLength-1; i++) {
			// 施設情報を全てリスト
			var rowTextA = areasrc.snapshotItem(i).textContent
			rowTextA = rowTextA.replace(/^.*\//,'');
			var clsText = areacls.snapshotItem(i).textContent;
			clsText = clsText.replace(/^mapAll0*/,'');
			var clsNo = parseInt(clsText) - 1;

			// 城の情報をチェック
			if( rowTextA.substr(0,7) == 'capital' ){
				// テキストデータ
				var text = areas.snapshotItem(clsNo).textContent;

				// 城の情報を抽出
				var rowText = areas.snapshotItem(clsNo).textContent;
				var rowText2 = href.snapshotItem(clsNo).textContent;
				rowText = rowText.replace(/^.*rewrite\(/, "");
				rowText = rowText.replace(/\); .*$/, "");
				var bkText = rowText;
				rowText = rowText.replace(/\//g,"==uZer==");
				rowText = rowText.replace(/', '/g,"'/'");
				rowText = rowText.replace(/'/g,"");
				var valueA = new Array();
				valueA = rowText.split('/');
				valueA[1] = valueA[1].replace(/==uZer==/,"/");

				if( valueA[11] != '1' ){
					// NPC砦ではない

					// マップ座標の取得
					var rowText3 = valueA[3];
					rowText3 = rowText3.replace(/\(/,"");
					rowText3 = rowText3.replace(/\)/,"");
					var valueB = new Array();
					valueB = rowText3.split(',');
					var cx = parseInt(valueB[0]);
					var cy = parseInt(valueB[1]);

					// テキストの生成
					var data2 = '(' + formatRightNumber(cx,4) + ',' +  formatRightNumber(cy,4) + ') ';
					if( rowTextA.substr(0,9) == 'capital_r' ){
						// 他同盟
						data2 = data2 + '<font color="red"   >'
					}else if( rowTextA.substr(0,9) == 'capital_g' ){
						// 自同盟
						data2 = data2 + '<font color="green" >'
					}else if( rowTextA.substr(0,10) == 'capital_bk' ){
						// 自配下
						data2 = data2 + '<font color="black" >'
					}else if( rowTextA.substr(0,10) == 'capital_bg' ){
						// 同盟が配下
						data2 = data2 + '<font color="cyan"  >'
					}else if( rowTextA.substr(0,9) == 'capital_b' ){
						// プレイヤー
						data2 = data2 + '<font color="blue"  >'
					}else if( rowTextA.substr(0,9) == 'capital_o' ){
						// 他配下
						data2 = data2 + '<font color="orange">'
					}else if( rowTextA.substr(0,9) == 'capital_y' ){
						// 不可侵
						data2 = data2 + '<font color="yellow">'
					}
					data2 = data2 + valueA[1] + blank.substr(jstrlen(valueA[1])) + '</font>';
					outTextLine[outLine] = outTextLine[outLine] + data2;
					if( outLine == 8 ){
						outLine = 0;
					}
					else{
						outLine = outLine + 1;
						if( outLine > outLineMax ){
							outLineMax = outLine;
						}
					}
				}
			}
		}
		var outText = '';
		for( var i = 0; i < outLineMax; i++ ){
			// テキストの生成
			if( outText != '' ){
				outText = outText + '<br>';
			}
			outText = outText + outTextLine[i];
		}

		if( outText != '' ){
			baseText.snapshotItem(0).innerHTML = '<font color="brown"><b>本拠地リスト</b></font><br>' + outText;
		}
	}
	else{
		var baseinfodv = $e('//*[@id="baseinfo_dv"]');
		baseinfodv.snapshotItem(0).style.display = "none";
	}

	//----------------------//
	// レーダーマップの描画 //
	//----------------------//
	if( chkflg2.charAt(FLAG2_RADER) == '1' ){
		var smallmapdv = $e('//*[@id="smallmap_dv"]');
		smallmapdv.snapshotItem(0).style.display = "inline";

		//--------------------------------------//
		// マップデータからレーダーマップを作る //
		//--------------------------------------//
		var areasrc = document.evaluate('//*[@id="mapsAll"]//img/@src',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var areacls = document.evaluate('//*[@id="mapsAll"]//img/@class',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var smallmap = $e('//*[@id="smallmap"]');

		var icon_m = new Array();
		// red
		icon_m[0] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAABhJREFUGFdj/M+ABP7/ZwDyEYgY'+
				'/n8UAAB2YibbE1hiFgAAAABJRU5ErkJggg==';
		// green
		icon_m[1] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAAB1JREFUGFdjZGhggIP/9f8ZQHwY'+
				'+v+fMB+oBhkAAG1dIOdybdeqAAAAAElFTkSuQmCC';
		// orange
		icon_m[2] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAABxJREFUGFdj/N/gwAAH9fsZgHwE'+
				'+v+fMP8/CgAA8fEv28S8Pq0AAAAASUVORK5CYII=';
		// yellow
		icon_m[3] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAABhJREFUGFdj/P+fAQn8ZwDykRAx'+
				'/P/IAABygjLPOSZPYAAAAABJRU5ErkJggg==';
		// black
		icon_m[4] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAABdJREFUGFdjYEAC////R+YyEMMH'+
				'qkEGAG3+GuaurV/rAAAAAElFTkSuQmCC';
		// blank
		icon_m[5] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAAB9JREFUGFdjPHDgAAMM2NvbMwD5'+
				'cPD//3+CfKAaZAAA6go158lfhdYAAAAASUVORK5CYII=';
		// purple
		icon_m[6] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAAB1JREFUGFdjbGD4zwAD9UAmkA9H'+
				'////J8gHqkEGAGOJLNsJpCpLAAAAAElFTkSuQmCC';
		// blue
		icon_m[7] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAAB1JREFUGFdjZGD4zwAD/8FMIAFF'+
				'/8EC+PlANcgAAF56JttM3K+FAAAAAElFTkSuQmCC';
		// aqua
		icon_m[8] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAABxJREFUGFdjZPj/nwEGwCwgH4b+'+
				'g+QI8IFqkAEAWpoyz55hZGAAAAAASUVORK5CYII=';
		// wall
		icon_m[9] = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAABGdBTUEAALGPC/xhBQAAAB5JREFUGFdjbGhoYICB+vp6BiAf'+
				'Dv7//0+QD1SDDABreyznkufwCAAAAABJRU5ErkJggg==';
		// マップの作成
		var mapdata = new Array();
		for(var i = 0; i < 20; i++ ){
			mapdata[i] = new Array();
		}
		for(var i = 0; i < 20; i++ ){
			for(var j = 0; j < 20; j++ ){
				mapdata[j][i] = 'blank';
			}
		}
		for (var i=0; i < areacls.snapshotLength-1; i++) {
			// 施設情報を全てリスト
			var rowTextA = areasrc.snapshotItem(i).textContent
			rowTextA = rowTextA.replace(/^.*\//,'');
			var clsText = areacls.snapshotItem(i).textContent;
			clsText = clsText.replace(/^mapAll0*/,'');
			var clsNo = parseInt(clsText) - 1;

			var x = clsNo % viewSize;
			var y = Math.floor(clsNo / viewSize);

			// 城の情報をチェック
			if( rowTextA.indexOf('_bk_') >= 0 ){
				mapdata[y][x] = 'black';
			}else if( rowTextA.indexOf('_bg_') >= 0 ){
				mapdata[y][x] = 'aqua';
			}else if( rowTextA.indexOf('_b_') >= 0 ){
				mapdata[y][x] = 'blue';
			}else if( rowTextA.indexOf('_p_') >= 0 ){
				mapdata[y][x] = 'purple';
			}else if( rowTextA.indexOf('_r_') >= 0 ){
				mapdata[y][x] = 'red';
			}else if( rowTextA.indexOf('_g_') >= 0 ){
				mapdata[y][x] = 'green';
			}else if( rowTextA.indexOf('_o_') >= 0 ){
				mapdata[y][x] = 'orange';
			}else if( rowTextA.indexOf('_y_') >= 0 ){
				mapdata[y][x] = 'yellow';
			}else if( rowTextA.indexOf('blanc') >= 0 ){
				mapdata[y][x] = 'wall';
			}
		}

		// テキストボックスサイズの修正
		if( viewSize == 11 ){
			smallmap.snapshotItem(0).style.width = "66px";
			smallmap.snapshotItem(0).style.height = "66px";
			smallmap.snapshotItem(0).style.marginLeft = '-10px';
			smallmap.snapshotItem(0).style.marginTop = '354px';
		}
		else if( viewSize == 15 ){
			smallmap.snapshotItem(0).style.width = "90px";
			smallmap.snapshotItem(0).style.height = "90px";
			smallmap.snapshotItem(0).style.marginLeft = '-10px';
			smallmap.snapshotItem(0).style.marginTop = '330px';
		}
		else{
			smallmap.snapshotItem(0).style.width = "120px";
			smallmap.snapshotItem(0).style.height = "120px";
			smallmap.snapshotItem(0).style.marginLeft = '-10px';
			smallmap.snapshotItem(0).style.marginTop = '300px';
		}

		// 画像の設置
		var areaText = '';
		for( i = 0; i < viewSize; i++ ){
			for( j = 0; j < viewSize; j++ ){
				if( mapdata[j][i] == 'red' ){
					areaText = areaText + '<img src="' + icon_m[0] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'green' ){
					areaText = areaText + '<img src="' + icon_m[1] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'orange' ){
					areaText = areaText + '<img src="' + icon_m[2] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'yellow' ){
					areaText = areaText + '<img src="' + icon_m[3] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'black' ){
					areaText = areaText + '<img src="' + icon_m[4] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'blank' ){
					areaText = areaText + '<img src="' + icon_m[5] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'purple' ){
					areaText = areaText + '<img src="' + icon_m[6] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'blue' ){
					areaText = areaText + '<img src="' + icon_m[7] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'aqua' ){
					areaText = areaText + '<img src="' + icon_m[8] + '" width="6px" height="6px"/>';
				}
				else if( mapdata[j][i] == 'wall' ){
					areaText = areaText + '<img src="' + icon_m[9] + '" width="6px" height="6px"/>';
				}
			}
			areaText = areaText + '<br>';
		}
		if( areaText != '' ){
			smallmap.snapshotItem(0).innerHTML = areaText;
		}
	}
	else{
		var smallmapdv = $e('//*[@id="smallmap_dv"]');
		smallmapdv.snapshotItem(0).style.display = "none";
	}

	//----------------//
	// 方位表示の描画 //
	//----------------//
	if( chkflg2.charAt(FLAG2_DIRECTION) == '1' ){
		var dv2;
		var img;

		// 方位アイコン（東）
		img = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACAAAAAiCAYAAAA+stv/AAAABnRSTlMAwADAAMCNeLu6AAABIUlEQVR42tWXaw6EIAyEtydbj86eTOMmNezY'+
				'aSsiZPuTDPbrA6hSSnnNNGkBWJb3aq2X8pFhACsgiEwEEJmcgSh6LFmtfRxAnateKtW+5wvAmsozqwQZLUIfAOtlhHt2AngyA8wOgNo0G1gr'+
				'S4PRoAadmZlgAFF0VzTeMQ0BehmDGJKBWtcE0NoDmdtyWAbYZTW0B5oApmegZw/8ZwZ6WdcMsNftkQzoRnzXWZS7qf42gPdBdGwNHGhpANwU'+
				'Ra9OW+bEcCSznNcRY9RsPf0cZ5xba16mPBAK4A2TDIBBWyAK4/YAGyiiDs+emBNANELXuuxI5jWuOZRmxqjsGfd66KcE1tlnzq8AWCVFrTmW'+
				'R2eXXVbRHuv7XX7PW35KbwH0tA1E3rSyVRg+QgAAAABJRU5ErkJggg==';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "390px";
		dv2.style.left = "500px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_east";
		dv2.innerHTML = '<img src="' + img + '">';
		$d("datas").parentNode.appendChild(dv2);

		// 方位アイコン（西）
		img = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAABnRSTlMAwADAAMCNeLu6AAAA9klEQVR42u2YYQ7DIAiF58nWo7uTubjMhlJA'+
				'EHRd0vevWvXzFdA05ZwfV1BaCbJtzwKfc36l5SANonxRUjrCfEAw6SwVtAqE2UHKEpSzKswBZGRXbUdUm0U7iFbYOQ4EBqHamRtEApHy3AvS'+
				'm/sEgvMcyxOsXA0RQWYLOyeCULsbdYQqZiYQ+PJojHDjLgGiDtYIEJgpYSDc6dkDqX21LRSE6tOM+RkIVCiIdKmhag8VO7jfDKKNA4uGQaQa'+
				'wGUGXtj9adoC0B3NoYblAuFcsCqkoEkuLAXxAExxxKuQGInW/zoyI0a4DBQvz9SAUZDenEv/Bkh6A3xNvDBXWpYCAAAAAElFTkSuQmCC';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "145px";
		dv2.style.left = "220px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_west";
		dv2.innerHTML = '<img src="' + img + '">';
		$d("datas").parentNode.appendChild(dv2);

		// 方位アイコン（南）
		img = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAABnRSTlMAwADAAMCNeLu6AAABAUlEQVR42u2XaxLCIAyE5WT26HiyOnUmHVzz'+
				'wJDQjnZ/0kC/hOVVaq23M6h4QZblvnLttT7KdJAVUEq5QN4hNp0CxILgfEV9poEQhFTFF4i0Aixxg/bGYwI7yOpCGdcHyIyKSNpBWiGUNO9e'+
				'j0hjsiD0AytLj0ekZa6CZImDMUHaTNuMrCphnLULd4FsHXAfwKykfYL6hoF4vhFoz3GQAsJNn7XCQkDaaSEIhAoBkbJDI1Mb54dhkAyFVQSr'+
				'YMVxsUMe6Y3jzq4Uj/RUBL+FgER75v884on9bZC0VeMB0Qx+SEW0m3s6SBuDQK6rovaM1F5tErQ2nvsW/42sGzwLcpSeYYfishi2CCMAAAAA'+
				'SUVORK5CYII=';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "390px";
		dv2.style.left = "220px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_south";
		dv2.innerHTML = '<img src="' + img + '">';
		$d("datas").parentNode.appendChild(dv2);

		// 方位アイコン（南）
		img = 'data:image/png;base64,'+
				'iVBORw0KGgoAAAANSUhEUgAAACIAAAAgCAYAAAB3j6rJAAAABnRSTlMAwADAAMCNeLu6AAABAElEQVR42u3WXQ7DIAgA4HGy9ejuZDZLZovI'+
				'n0aM2cZjNfoFLQIppccOAV7IcTwz9z2lF2hjIZBMtgO4IdLY70DgswUHwWNLIGUjbWw7CL7QHHIJpCDecwAR8JxlEO4yY0w4BGejOQ5gIFJR'+
				'wtELkRDc8VSQbFL8EAlPAddYVEbwfA3QQKzovSMUYdWVEIg3C0sy4gWEQ7Yt8X/I90JwoZsBkdoBFkKrrPVg9UJKO9BAuPLOFahZGVEh2oNH'+
				'345RCG2Q3BAgS81oFaU3qDoarUyPlHjPcZc9mjYA95Vau2c9et4o61R/jdZpj7aDFqLJiBXeTr03hppnaZEZ4YZExwnhd/gwvUipkQAAAABJ'+
				'RU5ErkJggg==';
		dv2 = d.createElement("div");
		dv2.style.position = "absolute";
		dv2.style.top = "145px";
		dv2.style.left = "500px";
		dv2.style.zIndex = 500;
		dv2.id = "icon_north";
		dv2.innerHTML = '<img src="' + img + '">';
		$d("datas").parentNode.appendChild(dv2);
	}

	//--------------//
	// 出兵情報共有 //
	//--------------//
	unionAttackInfo();
}

//----------------//
// 領土情報の検索 //
//----------------//
//拠点の作業中情報を取得
function getNPCCastleInfo_51(drawflag) {
	//--------------------------------------//
	// チェックボックスに関する情報をロード //
	//--------------------------------------//
	var chkflg1;
	var chkflg2;
	execFlag = loadExecFlag(location.hostname, "FLAG0");
	if( execFlag == "" ){
		// 表示フラグをロード
		var execFlag1 = loadExecFlag(location.hostname, "FLAG1");
		if( execFlag1 == "" ){
			chkflg1 = new String(FLAG1);  // 初期値
		}
		else{
			chkflg1 = execFlag1;
		}

		// オプションフラグをロード
		var execFlag2 = loadExecFlag(location.hostname, "FLAG2");
		if( execFlag2 == "" ){
			chkflg2 = new String(FLAG2);  // 初期値
		}
		else{
			chkflg2 = execFlag2;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg1 + DELIMIT1 + chkflg2;
		saveExecFlag(location.hostname, "FLAG0", execFlag);
	}
	else{
		var loadflg = new Array();
		loadflg = execFlag.split(DELIMIT1);
		chkflg1 = loadflg[0];
		chkflg2 = loadflg[1];
	}

	// 個人、同盟検索情報をロード
	var chkflg3 = new Array();
	execFlag = loadExecFlag(location.hostname, "FLAG3");
	if( execFlag == "" ){
		var execFlag3 = loadExecFlag(location.hostname, "FLAG3-1");
		if( execFlag3 == "" ){
			chkflg3[0] = new String(FLAG3_1);  // 初期値
		}
		else{
			chkflg3[0] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-2");
		if( execFlag3 == "" ){
			chkflg3[1] = new String(FLAG3_2);  // 初期値
		}
		else{
			chkflg3[1] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-3");
		if( execFlag3 == "" ){
			chkflg3[2] = new String(FLAG3_3);  // 初期値
		}
		else{
			chkflg3[2] = execFlag3;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg3[0] + DELIMIT1 + chkflg3[1] + DELIMIT1 + chkflg3[2];
		saveExecFlag(location.hostname, "FLAG3", execFlag);
	}
	else{
		chkflg3 = execFlag.split(DELIMIT1);
	}

	//----------------------//
	// 処理パラメータの抽出 //
	//----------------------//
	//-- データ絞り込み時のユーザー名情報の取得 --//
	var checkBox1;
	var checkBox2;
	var userBox;
	var listbox;
	var userName = new Array();
	var userText;
	var fullmatch = new Array();
	var nodisp = new Array();
	var target = new Array();
	var colorNo = new Array();
	for( var i = 0; i < 3; i++ ){
		fullmatch[i] = 0;
		nodisp[i] = 0;
		target[i] = 0;
		colorNo[i] = 0;
	}

	// 個人・同盟検索１
	checkBox1 = $e('//*[@id="ckEnable1"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[0] = 1;
		}
		else{
			target[0] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[0] = 1;
		}
		else{
			fullmatch[0] = 0;
		}
		// ☆表示
		checkBox2 = $e('//*[@id="ckLevelSearch1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			nodisp[0] = 1;
		}
		else{
			nodisp[0] = 0;
		}
		userBox = $e('//*[@id="userBox1"]');
		userText = userBox.snapshotItem(0).value;
		userName[0] = new Array();
		userName[0] = userText.split(OWNER_SPLITKEY);
		// 枠色
		listbox = $e('//*[@id="lsColor1"]');
		colorNo[0] = listbox.snapshotItem(0).selectedIndex + 1;
	}
	else{
		userName[0] = "";
	}

	// 個人・同盟検索２
	checkBox1 = $e('//*[@id="ckEnable2"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[1] = 1;
		}
		else{
			target[1] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[1] = 1;
		}
		else{
			fullmatch[1] = 0;
		}
		// ☆表示
		checkBox2 = $e('//*[@id="ckLevelSearch2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			nodisp[1] = 1;
		}
		else{
			nodisp[1] = 0;
		}
		userBox = $e('//*[@id="userBox2"]');
		userText = userBox.snapshotItem(0).value;
		userName[1] = new Array();
		userName[1] = userText.split(OWNER_SPLITKEY);
		// 枠色
		listbox = $e('//*[@id="lsColor2"]');
		colorNo[1] = listbox.snapshotItem(0).selectedIndex + 1;
	}
	else{
		userName[1] = "";
	}

	// 個人・同盟検索３
	checkBox1 = $e('//*[@id="ckEnable3"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[2] = 1;
		}
		else{
			target[2] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[2] = 1;
		}
		else{
			fullmatch[2] = 0;
		}
		// ☆表示
		checkBox2 = $e('//*[@id="ckLevelSearch3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			nodisp[2] = 1;
		}
		else{
			nodisp[2] = 0;
		}
		userBox = $e('//*[@id="userBox3"]');
		userText = userBox.snapshotItem(0).value;
		userName[2] = new Array();
		userName[2] = userText.split(OWNER_SPLITKEY);
		// 枠色
		listbox = $e('//*[@id="lsColor3"]');
		colorNo[2] = listbox.snapshotItem(0).selectedIndex + 1;
	}
	else{
		userName[2] = "";
	}

	//-- 資源判別ONのとき、資源表示 --//
	var res_mode;
	var areaNo;
	var areaNo2;
	var areaNo3;
	if( chkflg2.charAt(FLAG2_ANALYZE) == '1' ){
		res_mode = 1;
	}
	else{
		res_mode = 0;
	}

	// 強調表示選択値を取得
	areaNo = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO,3));
	areaNo2 = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO2,3));
	areaNo3 = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO3,3));

	//------------------//
	// 画面サイズの取得 //
	//------------------//
	var viewSize = 51;

	//-------------------------//
	// 51x51モードへの設定反映 //
	//-------------------------//
	// 処理データの取得
	var href = $e('//*[@id="map51-content"]//div/a');

	var redrawX = new Array();
	var redrawY = new Array();
	if( drawflag == 1 ){
		if( (autoroute == AUTO_ROUTE_EDIT_LAST) || (autoroute == AUTO_ROUTE_NONE) ){
			// 始点を配列に保存
			redrawX[0] = autoroute_f[0];
			redrawY[0] = autoroute_f[1];
		}

		// 終点を配列に保存
		redrawX[1] = autoroute_l[0];
		redrawY[1] = autoroute_l[1];

		// ルート構築ビューの中身を配列に保存
		var pos = 2;
		var baseText = $e('//*[@id="routeInfoText"]');
		var text = baseText.snapshotItem(0).innerHTML;
		if( text != "" ){
			var text2 = text.split("<br>");
			for( var i = 0; i < text2.length; i++ ){
				if( (i == 0) && (autoroute != AUTO_ROUTE_EDIT_FIRST) ){
					continue;
				}
				var list = text2[i].match(/(([-]*\d+),([-]*\d+))/);
				redrawX[pos] = list[2];
				redrawY[pos] = list[3];
				pos = pos + 1;
			}
		}
	}

	var maxcount;
	if( drawflag == 0 ){
		maxcount = href.snapshotLength;
	}
	else{
		maxcount = redrawX.length;
	}
	for( var i = 0; i < maxcount; i++ ){
//	for( var i = 0; i < 1; i++ ){
		var dt;
		if( drawflag == 0 ){
			dt = href.snapshotItem(i);
		}
		else{
			dt = $x("//div[@id=\"map51-content\"]//a[@href=\"/land.php?x=" + redrawX[i] + "&y=" + redrawY[i] + "#ptop\"]");
			if( (dt == null) || (dt == undefined) ){
				continue;
			}
		}
		var text = trim(dt.innerHTML);
		var p;
		var user = "";
		var group = "";
		var land = "";
		var landLevel = 0;
		var space = 0;

		// いま設定されている着色指定を解除
		if( text.indexOf("font") >= 0 ){
			text = text.substr(text.indexOf("</font>")-1,1);
			if( text == "S" ){
				text = autoroute_f[2];
			}
			else if( text == "E" ){
				text = autoroute_l[2];
			}
		}

		// 砦などの表示を英字に変更
		if( text == "村" ){
			text = "V";
		} else if( text == "砦" ){
			text = "F";
		} else if( text == "城" ){
			text = "C";
		}

		//----------------------//
		// 個人・同盟検索の判定 //
		//----------------------//
		var matchcase = -1;    // マッチしたパターン

		// 同盟名、個人名の取得
		p = dt.parentNode.innerHTML.match(/君主名<\/dt><dd>(.*)<\/dd><dt>座標/);
		if( p != undefined ){
			user = p[1];
		}
		p = dt.parentNode.innerHTML.match(/君主名<\/dt><dd>(.*)<\/dd><dt>人口/);
		if( p != undefined ){
			user = p[1];
		}
		p = dt.parentNode.innerHTML.match(/同盟名<\/dt><dd>(.*)<\/dd><dt>戦力/);
		if( p != undefined ){
			group = p[1];
		}
		p = dt.parentNode.innerHTML.match(/同盟名<\/dt><dd class=&quot;bottom-popup-r&quot;>(.*)<\/dd><\/dl>/);
		if( p != undefined ){
			group = p[1];
		}
		p = dt.parentNode.innerHTML.match(/戦力<\/dt><dd>(.*)<\/dd><dt class=/);
		if( p != undefined ){
			land = p[1];
			landLevel = land.length;
			if(text == "　"){
				text = landLevel;
			}
		}
		if( dt.parentNode.innerHTML.indexOf(">空き地<") >= 0 ){
			space = 1;
		}

		// 個人・同盟マッチチェック
		for( var j = 0; j < 3; j++ ){
			for( var k = 0; k < userName[j].length; k++ ){
				// 検索有効時 username に値が入る
				if( userName[j][k] != "" ){
					// ターゲットが個人
					if( target[j] == 1 ){
						// 完全一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 1) && (user == userName[j][k]) ){
							matchcase = j;
							break;
						}
						// 部分一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 0) && (user.indexOf(userName[j][k]) != -1) ){
							matchcase = j;
							break;
						}
					}
					// ターゲットが同盟
					else{
						// 完全一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 1) && (group == userName[j][k]) ){
							matchcase = j;
							break;
						}
						// 部分一致かつ、ユーザー名が一致
						if( (fullmatch[j] == 0) && (group.indexOf(userName[j][k]) != -1) ){
							matchcase = j;
							break;
						}
					}
				}
			}
			if( matchcase != -1 ){
				break;
			}
		}

		//-----------------//
		// cssデータの作成 //
		//-----------------//
		var css = "";
		var strong = 0;		// 太字にするか

		if( space == 0 ){
			// 領地化されている土地

			if( (matchcase == -1) && (chkflg2.charAt(FLAG2_LAND) == '1') ){
				// 個人・同盟検索に該当せず、領土検索がオンの場合

				// ☆数による絞り込み
				if(    ((chkflg1.charAt(FLAG1_LV1) == '1') && (landLevel == 1))
				    || ((chkflg1.charAt(FLAG1_LV2) == '1') && (landLevel == 2))
				    || ((chkflg1.charAt(FLAG1_LV3) == '1') && (landLevel == 3))
				    || ((chkflg1.charAt(FLAG1_LV4) == '1') && (landLevel == 4))
				    || ((chkflg1.charAt(FLAG1_LV5) == '1') && (landLevel == 5))
				    || ((chkflg1.charAt(FLAG1_LV6) == '1') && (landLevel == 6))
				    || ((chkflg1.charAt(FLAG1_LV7) == '1') && (landLevel == 7))
				    || ((chkflg1.charAt(FLAG1_LV8) == '1') && (landLevel == 8))
				    || ((chkflg1.charAt(FLAG1_LV9) == '1') && (landLevel == 9)) ){

					// レベル表示指定のとき、太字にする
					strong = 1;
				}
			}
		}
		if( (space == 1) && (chkflg2.charAt(FLAG2_EMPTY) == '1') ){
			// 空き地かつ、空き地検索が有効
			if(    ((chkflg1.charAt(FLAG1_LV1) == '1') && (landLevel == 1))
			    || ((chkflg1.charAt(FLAG1_LV2) == '1') && (landLevel == 2))
			    || ((chkflg1.charAt(FLAG1_LV3) == '1') && (landLevel == 3))
			    || ((chkflg1.charAt(FLAG1_LV4) == '1') && (landLevel == 4))
			    || ((chkflg1.charAt(FLAG1_LV5) == '1') && (landLevel == 5))
			    || ((chkflg1.charAt(FLAG1_LV6) == '1') && (landLevel == 6))
			    || ((chkflg1.charAt(FLAG1_LV7) == '1') && (landLevel == 7))
			    || ((chkflg1.charAt(FLAG1_LV8) == '1') && (landLevel == 8))
			    || ((chkflg1.charAt(FLAG1_LV9) == '1') && (landLevel == 9)) ){

				// レベル表示指定のとき、太字にする
				strong = 1;
			}
		}

		// 個人・同盟マッチ判定
		if( matchcase != -1 ){
			// 枠着色CSSの追加
			css = css + 'border-style: solid; border-color: ' + cname_en[colorNo[matchcase]-1] + '; background-color: white; ';

			if( nodisp[matchcase] == 0 ){
				if(    ((chkflg1.charAt(FLAG1_LV1) == '1') && (landLevel == 1))
				    || ((chkflg1.charAt(FLAG1_LV2) == '1') && (landLevel == 2))
				    || ((chkflg1.charAt(FLAG1_LV3) == '1') && (landLevel == 3))
				    || ((chkflg1.charAt(FLAG1_LV4) == '1') && (landLevel == 4))
				    || ((chkflg1.charAt(FLAG1_LV5) == '1') && (landLevel == 5))
				    || ((chkflg1.charAt(FLAG1_LV6) == '1') && (landLevel == 6))
				    || ((chkflg1.charAt(FLAG1_LV7) == '1') && (landLevel == 7))
				    || ((chkflg1.charAt(FLAG1_LV8) == '1') && (landLevel == 8))
				    || ((chkflg1.charAt(FLAG1_LV9) == '1') && (landLevel == 9)) ){
					// 枠表示のみでなく、指定領土レベル以上のばあい、太字にする
					strong = 1;
				}
			}
		}

		// 太字処理
		if( (strong == 1) && (landLevel > 0) ){
			// 太字化CSSの追加 資源判別オンのときのみ
			if( res_mode == 1 ){
				css = css + 'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; ';
			}
		}
		else if( landLevel != 0 ){
			// 拠点以外の場合、灰色化CSSの追加
			css = css + 'color: transparent; ';
		}

		// 資源判別(太字処理のときのみ)
		if( (strong == 1) && (res_mode == 1) ){
			p = dt.parentNode.innerHTML.match(/.*木(\d+)&amp;nbsp;岩(\d+)&amp;nbsp;鉄(\d+)&amp;nbsp;糧(\d+).*/);
			if( p != undefined ){
				// マッチ
				var maxres = -1;
				var maxpos = -1;
				var multi = 0;
				for( var j = 1; j < 5; j++ ){
					if(p[j] > maxres){
						maxres = p[j];
						maxpos = j;
						multi = 0;
					}
					else if( p[j] == maxres ){
						multi = 1;
					}
				}
	
				var col;
				if( multi == 1 ){
					col = "white";
				}
				else if( maxpos == 1 ){
					col = "springgreen";
				}
				else if( maxpos == 2 ){
					col = "aqua";
				}
				else if( maxpos == 3 ){
					col = "orange";
				}
				else if( maxpos == 4 ){
					col = "yellow";
				}

				// 資源判別CSSの追加
				css = css + 'color: ' + col + '; ';
			}
		}

		//---------------------------------//
		// 生成したCSSをマップデータに反映 //
		//---------------------------------//
		var newText;
		if( css != "" ){
			if( res_mode == 1 ){
				newText = '<B><FONT style="' + css + '">' + text + '</FONT></B>';
			}
			else{
				newText = '<FONT style="' + css + '">' + text + '</FONT>';
			}
			dt.innerHTML = newText;
		}
		else{
			newText = '<FONT>' + text + '</FONT>';
			dt.innerHTML = newText;
		}
	}

	return;
}


//--------------//
// 出兵情報共有 //
//--------------//
function unionAttackInfo()
{
	//--------------//
	// 出兵情報共有 //
	//--------------//
	// チェック情報
	var checkBox = $e('//*[@id="ckUnion"]');

	// 画面サイズの取得
	var viewSize;
	viewSize = getViewSize();
	if( viewSize == 51 ){
		// 51x51だといまのとこなにもできないので戻る

		return;
	}

	// 全体表示画面から、画面中央座標を手に入れる //
	var codx = $e('//div[@id="datas"]/input[@id=\"x\"]');
	var cody = $e('//div[@id="datas"]/input[@id=\"y\"]');
	var bx = codx.snapshotItem(0).value;
	var by = cody.snapshotItem(0).value;
	var sx;
	var sy;
	var ex;
	var ey;

	// 左上座標を求める
	if( viewSize == 11 ){
		sx = parseInt(bx) - 5;
		sy = parseInt(by) + 5;
	}
	else if( viewSize == 15 ){
		sx = parseInt(bx) - 7;
		sy = parseInt(by) + 7;
	}
	else{
		sx = parseInt(bx) - 9;
		sy = parseInt(by) + 9;
	}
	ex = parseInt(sx) + (parseInt(viewSize) - 1)
	ey = parseInt(sy) - (parseInt(viewSize) - 1)

	// chromeでクロスドメイン処理がうまくいかないので、とりあえずFireFox限定
	if( (browserType != "Chrome") && (checkBox.snapshotItem(0).checked == true) && (spreadsheet != "") ){
		GM_xmlhttpRequest({
			method:"GET",
			url:spreadsheet,
			onload:function(x){
				var rollover = $d("rollover");
	
				var textline = x.responseText.split('\n');
	
				var pos = -1;
				var user = -1;
				var pd = -1;
				var com = -1;
				var data = textline[0].split('\t');
				for( var j = 0; j < data.length; j++ ){
					if( data[j] == '座標' ){
						pos = j;
					}
					else if( data[j] == 'ユーザー' ){
						user = j;
					}
					else if( data[j] == '着弾時刻' ){
						pd = j;
					}
					else if( data[j] == '補足' ){
						com = j;
					}
				}

				// サーバー時間の取得
				var svdata = document.evaluate('//span[@id="server_time"]',
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var time_text = svdata.snapshotItem(0).textContent;
				var day = time_text.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
				var servertime = new Date(parseInt(day[1],10),parseInt(day[2],10)-1,parseInt(day[3],10),parseInt(day[4],10),parseInt(day[5],10),parseInt(day[6],10),0);

				if( (pos >= 0) && (user >=0) && (pd >= 0) ){
					var stack = new Array();
					for( var i = 1; i < textline.length; i++ ){
						var data = textline[i].split('\t');
						if( data.length < 3 ){
							continue;
						}
						var posv = data[pos].match(/([-]*\d+),([-]*\d+)/);
						if( (posv.length < 2) || (posv[1] < sx) || (posv[1] > ex) || (posv[2] < ey) || posv[2] > sy ){
							// 画面外
							continue;
						}
	
						stack[0] = posv[1];
						stack[1] = posv[2];
						stack[2] = data[user];
						stack[3] = data[pd];

						// 終了時間の取得
						day = stack[3].match(/(\d+)[\/-](\d+)[\/-](\d+) +(\d+):(\d+):(\d+)/);
						if( day.length < 7 ){
							continue;
						}
						var endtime = new Date(parseInt(day[1],10),parseInt(day[2],10)-1,parseInt(day[3],10),parseInt(day[4],10),parseInt(day[5],10),parseInt(day[6],10),0);

						var waittime = endtime.getTime() - servertime.getTime();
						if( waittime < 0 ){
							continue;
						}
	
						// areaデータを取ってみる
						var area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + posv[1] + "&y=" + posv[2] + "#ptop\"]");
						if( area_pos == null ){
							area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + posv[1] + "&y=" + posv[2] + "\"]");
						}
						var list3 = area_pos.getAttribute("onmouseover").match(/'(\d+)px', '(\d+)px/);
	
						var puttext = "　" + stack[2] + "　" + stack[3];
						if( com != -1 ){
							if( data[com] != undefined ){
								puttext += "　" + data[com];
							}
						}
						area_pos.title = area_pos.alt;
						area_pos.title += puttext;
	
						// クリックしたポイントに画像を埋め込む
						var img = d.createElement("img");
						img.style.position = "absolute";
	
						img.style.left = list3[1] + "px";
						img.style.top = list3[2] + "px";
	
						// アイコンの決定
						img.src = atk_icon;
						if( viewSize == 15 ){
							img.style.width = "44px";
							img.style.height = "44px";
							img.style.zIndex = 227;
						} else if( viewSize == 20 ){
							img.style.width = "33px";
							img.style.height = "33px";
							img.style.zIndex = 402;
						} else {
							img.style.width = "60px";
							img.style.height = "60px";
							img.style.zIndex = 123;
						}
						img.name = "atkIcon";
						rollover.parentNode.insertBefore(img, rollover.nextSibling);
					}
				}
			}
		});
	}
}

//------------------------//
// 文字列の長さをチェック //
//------------------------//
function jstrlen(str, i) {
   var len = 0;
   str = escape(str);
   for (i = 0; i < str.length; i++, len++) {
      if (str.charAt(i) == "%") {
         if (str.charAt(++i) == "u") {
            i += 3;
            len++;
         }
         i++;
      }
   }
   return len;
}

//----------//
// 桁数整形 //
//----------//
function formatRightNumber( num, length ){
	var fix = '      ';
	var str;
	var result = '';

	str = num.toString(10);
	if( str.length < length ){
		result = fix.substr(0,length - str.length) + str;
	}
	else{
		result = str;
	}

	return result;
}

//--------------------------------//
// アイコン表示（レベル表示のみ） //
//--------------------------------//
function disp_AreaIcon(cx,cy,num,viewSize,group_flg)
{
	var area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + cx + "&y=" + cy + "#ptop\"]");
	if( area_pos == null ){
		area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + cx + "&y=" + cy + "\"]");
	}

	var dat = area_pos.getAttribute("onmouseover");
	dat = dat.replace(/^.*overOperation/, "setArea");
	dat = dat.replace(/\);.*$/, '');
	dat = dat + ',' + num + ',' + viewSize + ',' + group_flg + ');';
	eval(dat);
	
	function setArea(act, x, y, num, viewSize, group_flg)
	{
		var rollover = $d("rollover");

		if( group_flg >= 100 ){
			// 100より大きい場合は☆数表示あり
			var img = d.createElement("img");
			img.style.position = "absolute";

			img.style.left = x;
			var t = (y.substr(0,y.length-2));

			img.name = "viewIcon";

			if( viewSize == 15 ){
				img.src = icon_c[1][num];
				img.style.zIndex = 226;
				img.style.top = (parseInt(t) + 3) + "px";
			} else if( viewSize == 20 ){
				img.src = icon_c[2][num];
				img.style.zIndex = 401;
				img.style.top = (parseInt(t) + 3) + "px";
			} else {
				img.src = icon_c[0][num];
				img.style.zIndex = 122;
				img.style.top = (parseInt(t) + 0) + "px";
			}
			rollover.parentNode.insertBefore(img, rollover.nextSibling);
		}

		if( (group_flg % 100) > 0 ){
			// カラー指定があるばあいは、枠を表示
			var img2 = d.createElement("img");
			img2.style.position = "absolute";

			img2.style.left = x;
			img2.style.top = y;

			img2.name = "viewIcon";

			var iconNo = group_flg % 100;
			if( viewSize == 15 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "44px";
				img2.style.height = "44px";
				img2.style.zIndex = 226;
			} else if( viewSize == 20 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "33px";
				img2.style.height = "33px";
				img2.style.zIndex = 401;
			} else {
				img2.src = icon_2[iconNo];
				img2.style.width = "60px";
				img2.style.height = "60px";
				img2.style.zIndex = 122;
			}
			rollover.parentNode.insertBefore(img2, rollover.nextSibling);
		}
	}
	
}

//----------------------------//
// アイコン表示（資源モード） //
//----------------------------//
function disp_AreaIcon2(cx,cy,num,viewSize,group_flg,maxtype)
{
	var area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + cx + "&y=" + cy + "#ptop\"]");
	if( area_pos == null ){
		area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + cx + "&y=" + cy + "\"]");
	}
	var dat = area_pos.getAttribute("onmouseover");
	dat = dat.replace(/^.*overOperation/, "setArea");
	dat = dat.replace(/\);.*$/, '');
	dat = dat + ',' + num + ',' + viewSize + ',' + group_flg + ',' + maxtype + ');';
	eval(dat);

	function setArea(act, x, y, num, viewSize, group_flg, maxtype)
	{
		var rollover = $d("rollover");

		if( group_flg % 1000 >= 100 ){
			// 100より大きい場合は☆数表示あり
			var img = d.createElement("img");
			img.style.position = "absolute";

			img.style.left = x;
			var t = (y.substr(0,y.length-2));

			img.name = "viewIcon";

			if( viewSize == 15 ){
				img.src = icon_cs[1][num*5+maxtype];
				img.style.zIndex = 226;
				img.style.top = (parseInt(t) + 3) + "px";
			} else if( viewSize == 20 ){
				img.src = icon_cs[2][num*5+maxtype];
				img.style.zIndex = 401;
				img.style.top = (parseInt(t) + 3) + "px";
			} else {
				img.src = icon_cs[0][num*5+maxtype];
				img.style.zIndex = 122;
				img.style.top = (parseInt(t) + 0) + "px";
			}
			rollover.parentNode.insertBefore(img, rollover.nextSibling);
		}

		if( (group_flg % 100) > 0 ){
			// カラー指定があるばあいは、枠を表示
			var img2 = d.createElement("img");
			img2.style.position = "absolute";

			img2.style.left = x;
			img2.style.top = y;

			img2.name = "viewIcon";

			var iconNo = group_flg % 100;
			if( viewSize == 15 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "44px";
				img2.style.height = "44px";
				img2.style.zIndex = 226;
			} else if( viewSize == 20 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "33px";
				img2.style.height = "33px";
				img2.style.zIndex = 401;
			} else {
				img2.src = icon_2[iconNo];
				img2.style.width = "60px";
				img2.style.height = "60px";
				img2.style.zIndex = 122;
			}
			rollover.parentNode.insertBefore(img2, rollover.nextSibling);
		}
		if( Math.floor(group_flg / 1000) > 0 ){
			// 強調指定があるばあいは、強調★を表示
			var img3 = d.createElement("img");
			img3.style.position = "absolute";

			img3.style.left = x;
			var t = (y.substr(0,y.length-2));

			img3.name = "viewIcon";

			var pow = Math.floor(group_flg / 1000) - 1;
			if( viewSize == 15 ){
				img3.src = icon_3[pow*3+2];
				img3.style.width = "44px";
				img3.style.height = "44px";
				img3.style.zIndex = 227;
				img3.style.top = (parseInt(t) + 3) + "px";
			} else if( viewSize == 20 ){
				img3.src = icon_3[pow*3+1];
				img3.style.width = "33px";
				img3.style.height = "33px";
				img3.style.zIndex = 402;
				img3.style.top = (parseInt(t) + 3) + "px";
			} else {
				img3.src = icon_3[pow*3+3];
				img3.style.width = "60px";
				img3.style.height = "60px";
				img3.style.zIndex = 123;
				img3.style.top = (parseInt(t) + 0) + "px";
			}
			rollover.parentNode.insertBefore(img3, rollover.nextSibling);
		}
	}
	
}

//--------------//
// データロード //
//--------------//
function loadExecFlag(hostname, key) {
	var datakey = new String();
	datakey = hostname + VERSION_KEY + key;

	var ret = new String();
	var src = CookieRead(datakey);
	if (src == "") return ret;

	return src;
}

//--------------//
// データセーブ //
//--------------//
function saveExecFlag(hostname, key, data) {

	var datakey = new String();
	datakey = hostname + VERSION_KEY + key;

	CookieWrite(datakey, data, 30);
}

//----------------------//
// クッキーへの書き込み //
//----------------------//
function CookieWrite(kword, kdata, kday)
{
	if(!navigator.cookieEnabled){    // クッキーが利用可能かどうか
		alert("クッキーへの書き込みができません");
		return;
	}

	sday = new Date();
	sday.setTime(sday.getTime() + (kday * 1000 * 60 * 60 * 24));
	s2day = sday.toGMTString();
	document.cookie = kword + "=" + escape(kdata) + ";expires=" + s2day;
}

//----------------------//
// クッキーから読み込み //
//----------------------//
function CookieRead(kword)
{
	if(typeof(kword) == "undefined"){	// キーワードなし
		return "";	// 何もしないで戻る
	}

	kword = kword + "=";
	kdata = "";
	scookie = document.cookie + ";";	// クッキー情報を読み込む
	start = scookie.indexOf(kword);		// キーワードを検索
	if (start != -1){
		// キーワードと一致するものあり
		end = scookie.indexOf(";", start);	// 情報の末尾位置を検索
		kdata = unescape(scookie.substring(start + kword.length, end));	// データ取り出し
	}

	return kdata;
}

//------------//
// HTMLの生成 //
//------------//
function addHtml() {
	var dv;
	var dv2;

	var body = $e('//body');
	if( body.snapshotLength > 0 ){
		body.snapshotItem(0).addEventListener("mousedown", function(e) {if(e.button == 2){checkData(e);}}, true);
		body.snapshotItem(0).innerHTML = body.snapshotItem(0).innerHTML.replace(/\u2028/g," ");
	}

	//----------------//
	// コンテナの取得 //
	//----------------//
	var container;
	var mapbox = $e('//*[@id="mapboxInner"]');
	if (mapbox.snapshotLength == 0) {
		container = document.body;
	} else {
		container = mapbox.snapshotItem(0);
	}
	
	//--------------------------------------//
	// チェックボックスに関する情報をロード //
	//--------------------------------------//
	var chkflg1;
	var chkflg2;
	execFlag = loadExecFlag(location.hostname, "FLAG0");
	if( execFlag == "" ){
		// 表示フラグをロード
		var execFlag1 = loadExecFlag(location.hostname, "FLAG1");
		if( execFlag1 == "" ){
			chkflg1 = new String(FLAG1);  // 初期値
		}
		else{
			chkflg1 = execFlag1;
		}

		// オプションフラグをロード
		var execFlag2 = loadExecFlag(location.hostname, "FLAG2");
		if( execFlag2 == "" ){
			chkflg2 = new String(FLAG2);  // 初期値
		}
		else{
			chkflg2 = execFlag2;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg1 + DELIMIT1 + chkflg2;
		saveExecFlag(location.hostname, "FLAG0", execFlag);
	}
	else{
		var loadflg = new Array();
		loadflg = execFlag.split(DELIMIT1);
		chkflg1 = loadflg[0];
		chkflg2 = loadflg[1];
	}

	// 個人、同盟検索情報をロード
	var chkflg3 = new Array();
	var execFlag = loadExecFlag(location.hostname, "FLAG3");
	if( execFlag == "" ){
		var execFlag3 = loadExecFlag(location.hostname, "FLAG3-1");
		if( execFlag3 == "" ){
			chkflg3[0] = new String(FLAG3_1);  // 初期値
		}
		else{
			chkflg3[0] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-2");
		if( execFlag3 == "" ){
			chkflg3[1] = new String(FLAG3_2);  // 初期値
		}
		else{
			chkflg3[1] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-3");
		if( execFlag3 == "" ){
			chkflg3[2] = new String(FLAG3_3);  // 初期値
		}
		else{
			chkflg3[2] = execFlag3;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg3[0] + DELIMIT1 + chkflg3[1] + DELIMIT1 + chkflg3[2];
		saveExecFlag(location.hostname, "FLAG3", execFlag);
	}
	else{
		chkflg3 = execFlag.split(DELIMIT1);
	}

	// 出兵情報共有設定
	var chkflg4;
	execFlag = loadExecFlag(location.hostname, "FLAG4");
	if( execFlag == "" ){
		chkflg4 = new String(FLAG4);  // 初期値

		// 初回のときは、フラグを保存
		execFlag = chkflg4;
		saveExecFlag(location.hostname, "FLAG4", execFlag);
	}
	else{
		chkflg4 = execFlag;
	}

	// ルート構築設定
//	var chkflg5;
//	execFlag = loadExecFlag(location.hostname, "FLAG5");
//	if( execFlag == "" ){
//		chkflg5 = new String(FLAG5);  // 初期値
//
//		// 初回のときは、フラグを保存
//		execFlag = chkflg5;
//		saveExecFlag(location.hostname, "FLAG5", execFlag);
//	}
//	else{
//		chkflg5 = execFlag;
//	}

	//--------------------------------------//
	// 画面生成                             //
	//--------------------------------------//
	var textLabel;
	var button1;
	var textArea;

	//----------------//
	//-- ヘッダー部 --//
	//----------------//
	//-- コントロール配置DIV --//
	var linksDiv = document.createElement("div");
	container.appendChild(linksDiv);

	//-- ツール名称ラベル --//
	textLabel = document.createElement("span");
	textLabel.id = "toolLabel";
	textLabel.style.fontSize = "16px";
	textLabel.innerHTML = "<br><b>NPC砦、領土情報検索ツール Ver." + VERSION + "</b>";
	textLabel.style.color = "black";
	linksDiv.appendChild(textLabel);

	//-- 更新ボタン --//
	button1 = document.createElement("input");
	button1.type = "button";
	button1.id = "ckButton1";
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "6px";
	button1.value = "選択した条件で表示を更新";
	button1.addEventListener("click", function() {updateButtonClicked()}, true);
	linksDiv.appendChild(button1);

	//-- ★セットボタン --//
	button1 = document.createElement("input");
	button1.type = "button";
	button1.id = "ckButton2a";
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "6px";
	button1.value = "★のチェックを付ける";
	button1.addEventListener("click", function() {checkButtonClicked()}, true);
	linksDiv.appendChild(button1);

	//-- ★解除ボタン --//
	button1 = document.createElement("input");
	button1.type = "button";
	button1.id = "ckButton2";
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "6px";
	button1.value = "★のチェックを外す";
	button1.addEventListener("click", function() {uncheckButtonClicked()}, true);
	linksDiv.appendChild(button1);

	//-- (改行) --//
	textLabel = document.createElement("span");
	textLabel.innerHTML = "<br>";
	linksDiv.appendChild(textLabel);

	//--------------------//
	//-- 検索オプション --//
	//--------------------//
	var checkbox;
	var ckLabel;
	var userBox;
	var listbox;
	var colorNo;
	var areaNo;
	var img;

	var optionPre = document.createElement("pre");
	optionPre.style.fontSize = "14px";
	optionPre.style.color = "black";
	optionPre.style.backgroundColor = "#ffffcc";
	optionPre.style.width = "750px";
	optionPre.style.height = "100%";
	optionPre.style.border = "solid 2px";
	optionPre.style.padding = "2px";
	optionPre.style.marginTop = "2px";
	linksDiv.appendChild(optionPre);

	//-- 検索・表示オプション見出し --//
	textLabel = document.createElement("span");
	textLabel.style.fontSize = "14px";
	textLabel.id = "test";
	textLabel.innerHTML = "<font color=\"red\"><b>検索対象</b></font>";
	optionPre.appendChild(textLabel);

	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckMenu2";
	chkbox.style.marginLeft = "400px";
	if( chkflg2.charAt(FLAG2_MENU2) == '1' ){
		chkbox.checked = true;
	}
	chkbox.addEventListener("click", function() {menu2Clicked()}, true);
	optionPre.appendChild(chkbox);

	// 補助オプション表示切り替え
	textLabel = document.createElement("span");
	textLabel.style.marginLeft = "4px";
	textLabel.style.fontSize = "14px";
	textLabel.innerHTML = "<font color=\"blue\"><b>補助OPTION表示</b></font>";
	optionPre.appendChild(textLabel);

	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckMenu4";
	chkbox.style.marginLeft = "14px";
	if( chkflg2.charAt(FLAG2_MENU4) == '1' ){
		chkbox.checked = true;
	}
	chkbox.addEventListener("click", function() {menu4Clicked()}, true);
	optionPre.appendChild(chkbox);

	// 同盟オプション表示切り替え
	textLabel = document.createElement("span");
	textLabel.style.marginLeft = "4px";
	textLabel.style.fontSize = "14px";
	textLabel.innerHTML = "<font color=\"blue\"><b>同盟OPTION表示</b></font><br>";
	optionPre.appendChild(textLabel);

	// 空き地検索
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckEmpty";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_EMPTY) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "空き地検索";
	optionPre.appendChild(ckLabel);

	// 領土検索
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckLand";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_LAND) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "領土検索";
	optionPre.appendChild(ckLabel);

	//-- ルート構築モード --//
	// ルート構築モードチェックボックス
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckRouteMode";
	chkbox.style.marginLeft = "15px";
	chkbox.addEventListener("click", function() {routeModeChecked()}, true);
//	if( chkflg5.charAt(FLAG5_ROUTE_MODE) == '1' ){
//		chkbox.checked = true;
//	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color=\"green\"><b>ルート構築モード（</b></font>";
	optionPre.appendChild(ckLabel);

	// 資源情報出力なしチェックボックス
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckRouteMode2";
//	if( chkflg5.charAt(FLAG5_PUT_RESOURCE) == '1' ){
//		chkbox.checked = true;
//	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color=\"green\"><b>資源情報なし</b></font>";
	optionPre.appendChild(ckLabel);

	// 自動ルート構築チェックボックス
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.style.marginLeft = "14px";
	chkbox.type = "checkbox";
	chkbox.id = "ckAutoRouteMode";
	chkbox.addEventListener("click", function() {autoRouteModeChecked()}, true);
//	if( chkflg5.charAt(FLAG5_AUTO_MODE) == '1' ){
//		chkbox.checked = true;
//	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color=\"green\"><b>ルート自動構築）</b></font>";
	optionPre.appendChild(ckLabel);

	// （ギャップ埋め）
	ckLabel = document.createElement("pre");
	ckLabel.style.height = "2px";
	optionPre.appendChild(ckLabel);

	//-- ルート自動構築オプション見出し --//
	textLabel = document.createElement("pre");
	textLabel.style.fontSize = "14px";
	textLabel.style.marginTop = "2px";
	textLabel.innerHTML = "<font color=\"green\"><b>ルート自動構築条件設定</b></font><br>";
	optionPre.appendChild(textLabel);

	// 探査レベル
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "15px";
	ckLabel.innerHTML = "探索レベル";
	optionPre.appendChild(ckLabel);

	areaNo = parseInt(chkflg2.charAt(FLAG2_SEARCH_LEVEL));
	listbox = document.createElement("select");
	listbox.id = "lsRouteLevel";
	for( var i = 0; i < croutename.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(croutename[i]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = areaNo;
	optionPre.appendChild(listbox);

	// 資源回避レベル
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "14px";
	ckLabel.innerHTML = "回避資源";
	optionPre.appendChild(ckLabel);

	areaNo = parseInt(chkflg2.charAt(FLAG2_SKIP_RES));
	listbox = document.createElement("select");
	listbox.id = "lsSkipRes";
	for( var i = 0; i < croutelim.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(croutelim[i]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = areaNo;
	optionPre.appendChild(listbox);

	// 個人領土回避
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckRouteUser";
	chkbox.style.marginLeft = "14px";
	if( chkflg2.charAt(FLAG2_SKIP_USER) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "個人領地を通過（";
	optionPre.appendChild(ckLabel);

	// 通過同盟指定
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "個人・同盟";
	optionPre.appendChild(ckLabel);

	areaNo = parseInt(chkflg2.charAt(FLAG2_SKIP_GROUP));
	listbox = document.createElement("select");
	listbox.id = "lsSkipGroup";
	for( var i = 0; i < groupname.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(groupname[i]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = areaNo;
	optionPre.appendChild(listbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "）";
	optionPre.appendChild(ckLabel);

	// 可変ルート
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckRouteRandom";
	chkbox.style.marginLeft = "10px";
	if( chkflg2.charAt(FLAG2_RANDOM_ROUTE) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "可変ルート";
	optionPre.appendChild(ckLabel);

	// （ギャップ埋め）
	ckLabel = document.createElement("pre");
	ckLabel.style.height = "2px";
	optionPre.appendChild(ckLabel);

	//-- 検索・表示オプション２見出し --//
	// 項目ラベル
	textLabel = document.createElement("pre");
	textLabel.id = "Label2-1";
	textLabel.style.fontSize = "14px";
	textLabel.innerHTML = "<font color=\"red\"><b>表示補助</b></font><br>";
	optionPre.appendChild(textLabel);

	// 資源判別
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckAnalyze";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_ANALYZE) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "資源別に着色";
	ckLabel.id = "Label2-2";
	optionPre.appendChild(ckLabel);

	// 資源判別（強調表示）
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "0px";
	ckLabel.innerHTML = "（強調表示";
	ckLabel.id = "Label2-3";
	optionPre.appendChild(ckLabel);

	// 強調種別選択１
	areaNo = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO,3));
	if( areaNo > season1.length ){
		areaNo = 0;
	}
	listbox = document.createElement("select");
	listbox.id = "lsArea";
	for( var i = 0; i < season1.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(season1[i][0]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = areaNo;
	optionPre.appendChild(listbox);

	// 強調種別選択２
	areaNo = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO2,3));
	if( areaNo > season1.length ){
		areaNo = 0;
	}
	listbox = document.createElement("select");
	listbox.id = "lsArea2";
	for( var i = 0; i < season1.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(season1[i][0]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = areaNo;
	optionPre.appendChild(listbox);

	// 強調種別選択３
	areaNo = parseInt(chkflg2.substr(FLAG2_STRONG_AREANO3,3));
	if( areaNo > season1.length ){
		areaNo = 0;
	}
	listbox = document.createElement("select");
	listbox.id = "lsArea3";
	for( var i = 0; i < season1.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(season1[i][0]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = areaNo;
	optionPre.appendChild(listbox);

	// 閉じかっこ
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "0px";
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "）<br>";
	ckLabel.id = "Label2-4";
	optionPre.appendChild(ckLabel);

	// 空き地を着色
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckEmptyDraw";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_EMPTY_DRAW) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "空き地を着色";
	ckLabel.id = "Label2-5";
	optionPre.appendChild(ckLabel);

	// カラー選択
	colorNo = chkflg2.charAt(FLAG2_EMPTY_DRAW_COLOR);

	listbox = document.createElement("select");
	listbox.id = "lsEmptyColor";
	for( var i = 0; i < cname.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(cname[i]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = colorNo;
	optionPre.appendChild(listbox);

	// レーダー
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckRader";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_RADER) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "縮小マップ";
	ckLabel.id = "Label2-6";
	optionPre.appendChild(ckLabel);

	// 本拠地一覧
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckOwnerList";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_OWNER) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "本拠地一覧";
	ckLabel.id = "Label2-7";
	optionPre.appendChild(ckLabel);

	// 方位表示
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckDirection";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_DIRECTION) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "方位表示";
	ckLabel.id = "Label2-8";
	optionPre.appendChild(ckLabel);

	//-- 表示対象オプション見出し --//
	textLabel = document.createElement("pre");
	textLabel.style.fontSize = "14px";
	textLabel.style.marginTop = "2px";
	textLabel.innerHTML = "<font color=\"red\"><b>表示する領土の種類</b></font><br>";
	optionPre.appendChild(textLabel);

	// NPC砦
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckNPC";
	chkbox.style.marginLeft = "15px";
	if( chkflg1.charAt(FLAG1_NPC) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "NPC砦";
	optionPre.appendChild(ckLabel);

	// ☆1
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel1";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV1) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆1";
	optionPre.appendChild(ckLabel);

	// ☆2
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel2";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV2) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆2";
	optionPre.appendChild(ckLabel);

	// ☆3
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel3";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV3) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆3";
	optionPre.appendChild(ckLabel);

	// ☆4
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel4";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV4) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆4";
	optionPre.appendChild(ckLabel);

	// ☆5
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel5";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV5) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆5";
	optionPre.appendChild(ckLabel);

	// ☆6
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel6";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV6) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆6";
	optionPre.appendChild(ckLabel);

	// ☆7
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel7";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV7) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆7";
	optionPre.appendChild(ckLabel);

	// ☆8
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel8";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV8) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆8";
	optionPre.appendChild(ckLabel);

	// ☆9
	chkbox = document.createElement("input");
	chkbox.type = "checkbox";
	chkbox.id = "ckLevel9";
	chkbox.style.marginLeft = "10px";
	if( chkflg1.charAt(FLAG1_LV9) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "☆9<br>";
	optionPre.appendChild(ckLabel);

	// （ギャップ埋め）
	ckLabel = document.createElement("pre");
	ckLabel.style.height = "2px";
	optionPre.appendChild(ckLabel);

	//-- 個人・同盟検索オプション見出し --//
	textLabel = document.createElement("pre");
	textLabel.style.fontSize = "14px";
	textLabel.innerHTML = "<font color=\"red\"><b>個人・同盟の検索</b></font><br>";
	textLabel.id = "Label4-1";
	optionPre.appendChild(textLabel);

	//-- 個人・同盟検索オプション１ --//
	// ナンバリング
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color='blue'><b>No.1</b></font>";
	ckLabel.style.marginLeft = "15px";
	ckLabel.id = "Label4-2-1";
	optionPre.appendChild(ckLabel);

	// 有効/無効
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckEnable1";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[0].charAt(FLAG3_ENABLE) == '1' ){
		chkbox.checked = true;
	}
	chkbox.addEventListener("click", function() {enable1Checked()}, true);
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "有効にする";
	ckLabel.id = "Label4-2";
	optionPre.appendChild(ckLabel);

	// 個人
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "radio";
	chkbox.id = "ckType1";
	chkbox.name = "ckType1";
	chkbox.value = "1";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[0].charAt(FLAG3_USER) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "個人";
	ckLabel.id = "Label4-3";
	optionPre.appendChild(ckLabel);

	// 同盟
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "radio";
	chkbox.id = "ckType1";
	chkbox.name = "ckType1";
	chkbox.value = "2";
	chkbox.style.marginLeft = "4px";
	if( chkflg3[0].charAt(FLAG3_GROUP) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "同盟";
	ckLabel.id = "Label4-4";
	optionPre.appendChild(ckLabel);

	// 完全一致
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckFullMatch1";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[0].charAt(FLAG3_MATCH) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "完全一致";
	ckLabel.id = "Label4-5";
	optionPre.appendChild(ckLabel);

	// 個人・同盟名
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "8px";
	ckLabel.innerHTML = "検索名称";
	ckLabel.id = "Label4-6";
	optionPre.appendChild(ckLabel);

	userBox = document.createElement("input");
	userBox.id = "userBox1";
	userBox.style.marginLeft = "4px";
	userBox.width = 240;
	if( chkflg3[0].charAt(FLAG3_ENABLE) == '1' ){
		userBox.disabled = false;
	}
	else{
		userBox.disabled = true;
	}
	userBox.value = chkflg3[0].substr(FLAG3_NAME);
	userBox.href = "javascript:void(0);";
	optionPre.appendChild(userBox);

	// 表示種別での絞り込み
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckLevelSearch1";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[0].charAt(FLAG3_FILL) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "領土着色のみ";
	ckLabel.id = "Label4-7";
	optionPre.appendChild(ckLabel);

	// カラー選択
	ckLabel = document.createElement("span");
	ckLabel.style.marginTop = "1px";
	ckLabel.style.marginLeft = "8px";
	ckLabel.innerHTML = "枠色";
	ckLabel.id = "Label4-8";
	optionPre.appendChild(ckLabel);

	colorNo = chkflg3[0].charAt(FLAG3_COLOR);

	listbox = document.createElement("select");
	listbox.id = "lsColor1";
	for( var i = 0; i < cname.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(cname[i]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = colorNo;
	optionPre.appendChild(listbox);

	// (改行)
	textLabel = document.createElement("span");
	textLabel.innerHTML = "<br>";
	textLabel.id = "Label4-9";
	optionPre.appendChild(textLabel);

	//-- 個人・同盟検索オプション２ --//
	// ナンバリング
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color='blue'><b>No.2</b></font>";
	ckLabel.style.marginLeft = "15px";
	ckLabel.id = "Label4-2-2";
	optionPre.appendChild(ckLabel);

	// 有効/無効
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckEnable2";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[1].charAt(FLAG3_ENABLE) == '1' ){
		chkbox.checked = true;
	}
	chkbox.addEventListener("click", function() {enable2Checked()}, true);
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "有効にする";
	ckLabel.id = "Label4-10";
	optionPre.appendChild(ckLabel);

	// 個人
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "radio";
	chkbox.id = "ckType2";
	chkbox.name = "ckType2";
	chkbox.value = "1";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[1].charAt(FLAG3_USER) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "個人";
	ckLabel.id = "Label4-11";
	optionPre.appendChild(ckLabel);

	// 同盟
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "radio";
	chkbox.id = "ckType2";
	chkbox.name = "ckType2";
	chkbox.value = "2";
	chkbox.style.marginLeft = "4px";
	if( chkflg3[1].charAt(FLAG3_GROUP) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "同盟";
	ckLabel.id = "Label4-12";
	optionPre.appendChild(ckLabel);

	// 完全一致
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckFullMatch2";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[1].charAt(FLAG3_MATCH) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "完全一致";
	ckLabel.id = "Label4-13";
	optionPre.appendChild(ckLabel);

	// 個人・同盟名
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "8px";
	ckLabel.innerHTML = "検索名称";
	ckLabel.id = "Label4-14";
	optionPre.appendChild(ckLabel);

	userBox = document.createElement("input");
	userBox.id = "userBox2";
	userBox.style.marginLeft = "4px";
	userBox.width = 240;
	if( chkflg3[1].charAt(FLAG3_ENABLE) == '1' ){
		userBox.disabled = false;
	}
	else{
		userBox.disabled = true;
	}
	userBox.value = chkflg3[1].substr(FLAG3_NAME);
	userBox.href = "javascript:void(0);";
	optionPre.appendChild(userBox);

	// 表示種別での絞り込み
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckLevelSearch2";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[1].charAt(FLAG3_FILL) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "領土着色のみ";
	ckLabel.id = "Label4-15";
	optionPre.appendChild(ckLabel);

	// カラー選択
	ckLabel = document.createElement("span");
	ckLabel.style.marginTop = "1px";
	ckLabel.style.marginLeft = "8px";
	ckLabel.innerHTML = "枠色";
	ckLabel.id = "Label4-16";
	optionPre.appendChild(ckLabel);

	colorNo = chkflg3[1].charAt(FLAG3_COLOR);

	listbox = document.createElement("select");
	listbox.id = "lsColor2";
	for( var i = 0; i < cname.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(cname[i]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = colorNo;
	optionPre.appendChild(listbox);

	// (改行)
	textLabel = document.createElement("span");
	textLabel.innerHTML = "<br>";
	textLabel.id = "Label4-17";
	optionPre.appendChild(textLabel);

	//-- 個人・同盟検索オプション３ --//
	// ナンバリング
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color='blue'><b>No.3</b></font>";
	ckLabel.style.marginLeft = "15px";
	ckLabel.id = "Label4-2-3";
	optionPre.appendChild(ckLabel);

	// 有効/無効
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckEnable3";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[2].charAt(FLAG3_ENABLE) == '1' ){
		chkbox.checked = true;
	}
	chkbox.addEventListener("click", function() {enable3Checked()}, true);
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "有効にする";
	ckLabel.id = "Label4-18";
	optionPre.appendChild(ckLabel);

	// 個人
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "radio";
	chkbox.id = "ckType3";
	chkbox.name = "ckType3";
	chkbox.value = "1";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[2].charAt(FLAG3_USER) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "個人";
	ckLabel.id = "Label4-19";
	optionPre.appendChild(ckLabel);

	// 同盟
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "radio";
	chkbox.id = "ckType3";
	chkbox.name = "ckType3";
	chkbox.value = "2";
	chkbox.style.marginLeft = "4px";
	if( chkflg3[2].charAt(FLAG3_GROUP) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "同盟";
	ckLabel.id = "Label4-20";
	optionPre.appendChild(ckLabel);

	// 完全一致
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckFullMatch3";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[2].charAt(FLAG3_MATCH) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "完全一致";
	ckLabel.id = "Label4-21";
	optionPre.appendChild(ckLabel);

	// 個人・同盟名
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "8px";
	ckLabel.innerHTML = "検索名称";
	ckLabel.id = "Label4-22";
	optionPre.appendChild(ckLabel);

	userBox = document.createElement("input");
	userBox.id = "userBox3";
	userBox.style.marginLeft = "4px";
	userBox.width = 240;
	if( chkflg3[2].charAt(FLAG3_ENABLE) == '1' ){
		userBox.disabled = false;
	}
	else{
		userBox.disabled = true;
	}
	userBox.value = chkflg3[2].substr(FLAG3_NAME);
	userBox.href = "javascript:void(0);";
	optionPre.appendChild(userBox);

	// 表示種別での絞り込み
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckLevelSearch3";
	chkbox.style.marginLeft = "8px";
	if( chkflg3[2].charAt(FLAG3_FILL) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "領土着色のみ";
	ckLabel.id = "Label4-23";
	optionPre.appendChild(ckLabel);

	// カラー選択
	ckLabel = document.createElement("span");
	ckLabel.style.marginTop = "1px";
	ckLabel.style.marginLeft = "8px";
	ckLabel.innerHTML = "枠色";
	ckLabel.id = "Label4-24";
	optionPre.appendChild(ckLabel);

	colorNo = chkflg3[2].charAt(FLAG3_COLOR);

	listbox = document.createElement("select");
	listbox.id = "lsColor3";
	for( var i = 0; i < cname.length; i++ ){
		var opt = document.createElement("option");
		opt.id = i;
		var str = document.createTextNode(cname[i]);
		opt.appendChild(str);
		listbox.appendChild(opt);
	}
	listbox.style.marginLeft = "4px";
	listbox.selectedIndex = colorNo;
	optionPre.appendChild(listbox);

	// （ギャップ埋め）
	ckLabel = document.createElement("pre");
	ckLabel.style.height = "2px";
	optionPre.appendChild(ckLabel);

	//-- 出兵情報共有見出し --//
	textLabel = document.createElement("pre");
	textLabel.style.fontSize = "14px";
	textLabel.style.marginTop = "2px";
	textLabel.innerHTML = "<font color=\"green\"><b>出兵情報共有設定</b></font><br>";
	if( browserType == "Chrome" ){
		textLabel.style.display = "none";
	}
	optionPre.appendChild(textLabel);

	// 共有フラグ
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckUnion";
	chkbox.style.marginLeft = "14px";
	if( chkflg4.charAt(0) == '1' ){
		chkbox.checked = true;
	}
	chkbox.addEventListener("click", function() {attackIconClear()}, true);
	if( browserType == "Chrome" ){
		chkbox.style.display = "none";
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "有効";
	if( browserType == "Chrome" ){
		ckLabel.style.display = "none";
	}
	optionPre.appendChild(ckLabel);

	// シート名
	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "8px";
	ckLabel.innerHTML = "スプレッドシートURL";
	ckLabel.id = "Label5-1";
	if( browserType == "Chrome" ){
		ckLabel.style.display = "none";
	}
	optionPre.appendChild(ckLabel);

	userBox = document.createElement("input");
	userBox.id = "userBox4";
	userBox.style.marginLeft = "4px";
	userBox.style.width = "500px";
	userBox.value = chkflg4.substr(1);
	userBox.href = "javascript:void(0);";
	if( browserType == "Chrome" ){
		userBox.style.display = "none";
	}
	optionPre.appendChild(userBox);

	// スプレッドシート名の加工
	if( chkflg4.charAt(0) == '1' ){
		spreadsheet = userBox.value.replace(/#gid/,"&gid") + "&output=txt";
	}

	// （ギャップ埋め）
	ckLabel = document.createElement("pre");
	ckLabel.style.height = "2px";
	optionPre.appendChild(ckLabel);

	//----------------------------//
	// 検索結果のテキスト表示領域 //
	//----------------------------//
	textArea = document.createElement("pre");
	textArea.id = "castleInfoText";
	textArea.innerHTML = "";
	textArea.style.fontSize = "14px";
	textArea.style.color = "black";
	textArea.style.backgroundColor = "#FFDEAD";
	textArea.style.width = "750px";
	textArea.style.height = "120px";
	textArea.style.overflow = "auto";
	textArea.style.border = "solid 2px";
	textArea.style.padding = "2px";
	textArea.style.marginTop = "-2px";
	linksDiv.appendChild(textArea);

	//------------------//
	// 部品描画先の設定 //
	//------------------//
	var target;
	if( $d("datas") == undefined ){
		target = "change-map-scale";
	}
	else{
		target = "datas";
	}

	//--------------//
	// ホスト名判別 //
	//--------------//
	var hosttype = location.hostname.substr(0,1);

	//----------------------------//
	// 縮小マップ描画エリアの定義 //
	//----------------------------//
	dv2 = d.createElement("div");
	dv2.style.display = "none";
	dv2.id = "smallmap_dv";
	dv2.style.fontSize= "10px";
	// 51x51モードがある鯖
	if( hosttype == "m" ){
		dv2.style.position = "absolute";
		dv2.style.top = '40px';
		dv2.style.left = '5px';
	}

	// データ描画用
	textArea = document.createElement("div");
	textArea.id = "smallmap";
	textArea.style.width = "66px";
	textArea.style.height = "66px";
	textArea.innerHTML = "";
	textArea.style.color = "black";
	textArea.innerHTML = "";
	textArea.style.borderTop = "solid white 2px";
	textArea.style.borderLeft = "solid white 2px";
	textArea.style.borderRight = "solid white 1px";
	textArea.style.borderBottom = "solid white 1px";
	textArea.style.marginLeft = '-10px';
	textArea.style.marginTop = '354px';
	dv2.appendChild(textArea);
	$d(target).appendChild(dv2);

	//----------------------------//
	// 本拠地情報描画エリアの定義 //
	//----------------------------//
	dv = d.createElement("div");
	dv.style.position = "absolute";
	if( add51_51mode == 0 ){
		// 51x51モードがない鯖
		dv.style.top = '16px';
		dv.style.left = '260px';
	}
	else{
		// mixi鯖とそれ以外
		if( hosttype == "m" ){
			dv.style.top = '380px';
			dv.style.left = '400px';
		}
		else{
			dv.style.top = '420px';
			dv.style.left = '400px';
		}
	}
	dv.style.fontSize= "10px";
	dv.style.display = "none";
	dv.id = "baseinfo_dv";
	dv.style.zIndex = 500;

	// レイアウト調整用
	textArea = document.createElement("pre");
	textArea.innerHTML = "";
	textArea.style.fontSize = "10px";
	textArea.innerHTML = "";
	dv.appendChild(textArea);

	dv2 = d.createElement("div");
	dv2.style.border = "solid 2px";
	dv2.style.borderColor = "transparent";
	dv.appendChild(dv2);

	// データ描画用
	textArea = document.createElement("pre");
	textArea.id = "baseInfoText";
	textArea.innerHTML = "";
	textArea.style.fontSize = "10px";
	textArea.style.color = "black";
	textArea.innerHTML = "";
	textArea.style.margin = "2px";
	dv2.appendChild(textArea);
	$d(target).appendChild(dv);

	//------------------//
	// ルート構築モード //
	//------------------//
	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	if( add51_51mode == 0 ){
		// 51x51モードがない鯖
		dv2.style.top = "24px";
		dv2.style.left = "420px";
	}
	else{
		// 51x51モードがある鯖

		if( location.pathname != "/big_map.php" ){
			if( location.hostname.substr(0,1) == "m" ){
				dv2.style.top = "54px";
				dv2.style.left = "430px";
			}
			else{
				dv2.style.top = "61px";
				dv2.style.left = "560px";
			}
		}
		else{
			if( location.hostname.substr(0,1) == "m" ){
				dv2.style.top = "0px";
				dv2.style.left = "430px";
			}
			else{
				dv2.style.top = "0px";
				dv2.style.left = "550px";
			}
		}
	}
	dv2.style.fontSize= "10px";
	dv2.style.width = "184px";
	dv2.style.zIndex = 500;
	dv2.style.display = "none";
	dv2.id = "routeField";
	$d(target).parentNode.appendChild(dv2);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "<font color=\"blue\"><b>ルート構築ビュー</b></font>";
	dv2.appendChild(ckLabel);

	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	dv2.style.paddingLeft = "4px";
	if( add51_51mode == 0 ){
		// 51x51モードがない鯖
		dv2.style.top = "36px";
		dv2.style.left = "420px";
	}
	else{
		// 51x51モードがある鯖
		if( location.pathname != "/big_map.php" ){
			if( location.hostname.substr(0,1) == "m" ){
				dv2.style.top = "66px";
				dv2.style.left = "420px";
			}
			else{
				dv2.style.top = "73px";
				dv2.style.left = "560px";
			}
		}
		else{
			if( location.hostname.substr(0,1) == "m" ){
				dv2.style.top = "12px";
				dv2.style.left = "430px";
			}
			else{
				dv2.style.top = "12px";
				dv2.style.left = "550px";
			}
		}
	}
	dv2.style.fontSize= "10px";
	dv2.style.color= "blue";
	dv2.style.width = "184px";
	if( location.hostname.substr(0,1) == "m" ){
		if( location.pathname != "/big_map.php" ){
			dv2.style.height = "70px";
		}
		else{
			dv2.style.height = "55px";
		}
	}
	else{
		if( location.pathname != "/big_map.php" ){
			dv2.style.height = "90px";
		}
		else{
			dv2.style.height = "55px";
		}
	}
	dv2.style.border = "1px black solid";
	dv2.style.backgroundColor = "#FFFFCC";
	dv2.style.zIndex = 500;
	dv2.style.overflowY = "scroll";
	dv2.style.display = "none";
	dv2.id = "routeField2";
	$d(target).parentNode.appendChild(dv2);

	ckLabel = document.createElement("text");
	ckLabel.id = "routeInfoText";
	ckLabel.innerHTML = "";
	dv2.appendChild(ckLabel);

	//-- 全選択ボタン --//
	var button1 = document.createElement("input");
	button1.style.position = "absolute";
	if( add51_51mode == 0 ){
		// 51x51モードがない鯖
		button1.style.top = "128px";
		button1.style.left = "525px";
	}
	else{
		// 51x51モードがある鯖
		if( location.pathname != "/big_map.php" ){
			if( location.hostname.substr(0,1) == "m" ){
				button1.style.top = "138px";
				button1.style.left = "525px";
			}
			else{
				button1.style.top = "165px";
				button1.style.left = "665px";
			}
		}
		else{
			if( location.hostname.substr(0,1) == "m" ){
				button1.style.top = "69px";
				button1.style.left = "535px";
			}
			else{
				button1.style.top = "69px";
				button1.style.left = "655px";
			}
		}
	}
	button1.style.zIndex = 500;
	button1.type = "button";
	button1.style.fontSize = "10px";
	button1.style.marginLeft = "6px";
	button1.value = "全選択";
	button1.style.display = "none";
	button1.id = "routeField5";
	button1.addEventListener("click", function() {routeSelectButtonClicked()}, true);
	$d(target).parentNode.appendChild(button1);

	//-- クリアボタン --//
	button1 = document.createElement("input");
	button1.style.position = "absolute";
	if( add51_51mode == 0 ){
		// 51x51モードがない鯖
		button1.style.top = "128px";
		button1.style.left = "570px";
	}
	else{
		// 51x51モードがある鯖
		if( location.pathname != "/big_map.php" ){
			if( location.hostname.substr(0,1) == "m" ){
				button1.style.top = "138px";
				button1.style.left = "570px";
			}
			else{
				button1.style.top = "165px";
				button1.style.left = "710px";
			}
		}
		else{
			if( location.hostname.substr(0,1) == "m" ){
				button1.style.top = "69px";
				button1.style.left = "580px";
			}
			else{
				button1.style.top = "69px";
				button1.style.left = "700px";
			}
		}
	}
	button1.style.zIndex = 500;
	button1.type = "button";
	button1.style.fontSize = "10px";
	button1.style.marginLeft = "6px";
	button1.value = "クリア";
	button1.style.display = "none";
	button1.id = "routeField3";
	button1.addEventListener("click", function() {routeClearButtonClicked()}, true);
	$d(target).parentNode.appendChild(button1);

	// インフォメーションエリア
	dv2 = d.createElement("div");
	dv2.style.position = "absolute";
	if( location.pathname != "/big_map.php" ){
		dv2.style.top = "450px";
		dv2.style.left = "145px";
	}
	else{
		if( location.hostname.substr(0,1) == "m" ){
			dv2.style.top = "90px";
			dv2.style.left = "430px";
		}
		else{
			dv2.style.top = "90px";
			dv2.style.left = "550px";
		}
	}
	dv2.style.width = "500px";
	dv2.style.zIndex = 500;
	dv2.id = "route_info";
	dv2.innerHTML = '';
	$d(target).parentNode.appendChild(dv2);

	//--------------//
	// メニュー制御 //
	//--------------//
	menu2Clicked();
	menu4Clicked();
}

//----------------//
// ルート構築処理 //
//----------------//
function checkData(e){
	var rollover = $d("rollover");
	var checkBox = $e('//*[@id="ckRouteMode"]');
	var checkBox2 = $e('//*[@id="ckRouteMode2"]');
	var checkBox3 = $e('//*[@id="ckAutoRouteMode"]');
	var baseText = $e('//*[@id="routeInfoText"]');

	//------------------//
	// 画面サイズの取得 //
	//------------------//
	var viewSize;
	viewSize = getViewSize();
	var enf = true;
	if( checkBox.snapshotLength > 0 ){
		// ルート構築モードがON
		if( checkBox.snapshotItem(0).checked == true ){
			// ルート構築モード
			enf = false;

			if( viewSize == 51 ){
				// 51x51モードの場合、他とは違う処理をする
				var elem;
				var elemhtml = "";

				// マウス直下の情報を取得
				var el = document.elementFromPoint(e.clientX, e.clientY);
				if( el != undefined ){
					if( el.tagName == "A" ){
						elem = el.parentNode;
					}
					else if( el.tagName == "FONT" ){
						elem = el.parentNode.parentNode.parentNode;
					}
					else{
						return;
					}
					elemhtml = elem.innerHTML;
				}

				// 自動構築モードがOFF
				if( checkBox3.snapshotItem(0).checked == false ){
					alert("51x51画面では、自動ルート構築のみ実施可能です。\n自動ルート構築をチェックしてください。");

					return;
				}

				var list2 = elemhtml.match(/x=([-]*\d+)&amp;y=([-]*\d+)#/);
				if( (list2 != null) && (list2 != undefined) ){
					// クリックタイミングにより取れない場合は飛ばすため

					if( (autoroute == AUTO_ROUTE_EDIT_LAST) && (autoroute_f[0] == list2[1]) && (autoroute_f[1] == list2[2]) ){
						// 終点＝始点の場合、経路情報を削除し、モードを戻す

						// 経路情報を消す
						getNPCCastleInfo_51(1);

						// モードを戻す
						autoroute = AUTO_ROUTE_EDIT_FIRST;

						// インフォメーションの更新
						autoRouteInfo();
					}
					else if( (autoroute == AUTO_ROUTE_EDIT_END) && (autoroute_l[0] == list2[1]) && (autoroute_l[1] == list2[2]) ){
						// 終了後に終点クリックの場合、始点以外を削除し、モードを戻す

						// 経路情報を消す
						getNPCCastleInfo_51(1);

						// ルートテキストをクリア
						baseText.snapshotItem(0).innerHTML = "";

						// モードを戻す
						autoroute = AUTO_ROUTE_EDIT_LAST;

						// インフォメーションの更新
						autoRouteInfo();
					}
					else{
						var newhtml;
						var vtext;

						var data = elemhtml.match(/<font.*>(.*)<\/font>/);

						// 座標の登録
						if( autoroute == AUTO_ROUTE_EDIT_FIRST ){
							autoroute_f[0] = list2[1];
							autoroute_f[1] = list2[2];
							autoroute_f[2] = data[1];

							// 表示テキスト
							vtext = "S";

							// モード変更
							autoroute = AUTO_ROUTE_EDIT_LAST;

							// インフォメーションの更新
							autoRouteInfo();
						}
						else if( autoroute == AUTO_ROUTE_EDIT_LAST ){
							autoroute_l[0] = list2[1];
							autoroute_l[1] = list2[2];
							autoroute_l[2] = data[1];

							// 表示テキスト
							vtext = "E";

							// モード変更
							autoroute = AUTO_ROUTE_EDIT_END;

							// インフォメーションの更新
							autoRouteInfo();
						}

						// テキスト設定
						if( elemhtml.indexOf("<b>") >= 0 ){
							newhtml = elemhtml.replace(/<b>.*<\/b>/,"<font style=\"text-shadow: -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF; color:red; border-style: solid; border-color: cyan; background-color:cyan;\">" + vtext + "</font>");
						}
						else{
							newhtml = elemhtml.replace(/<font>.*<\/font>/,"<font style=\"text-shadow: -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF; border-style: solid; border-color: cyan; color:red; background-color:cyan;\">" + vtext + "</font>");
						}

						// マークを画面上に表示
						elem.innerHTML = newhtml;

						if( autoroute == AUTO_ROUTE_EDIT_END ){
							// 始点、終点の設定がおわった

							// ルート構築チェック(引数"1"はルートチェック)
							if( makeAutoRoute_51("1") == false ){
								alert("目的地に到達するルートには到達できません。条件を見直してください。");

								// 経路情報を消す
								getNPCCastleInfo_51(1);

								// モードを戻す
								autoroute = AUTO_ROUTE_EDIT_LAST;

								// インフォメーションの更新
								autoRouteInfo();

								return;
							}


							// 確認
							if( window.confirm("この座標からルートを構築します") ){
								// ルート構築
								makeAutoRoute_51("0");
							}
							else{
								// 経路情報を消す
								getNPCCastleInfo_51(1);

								// モードを戻す
								autoroute = AUTO_ROUTE_EDIT_LAST;

								// インフォメーションの更新
								autoRouteInfo();
							}
						}
					}
				}

				// コンテキストメニュー制御
				var body = $e('//body');
				if( body.snapshotLength > 0 ){
					if( enf == false ){
						body.snapshotItem(0).setAttribute("onContextmenu","return false;");
					}
					else{
						body.snapshotItem(0).setAttribute("onContextmenu","return true;");
					}
				}

				return;
			}

			// 自動構築モードがOFF
			if( checkBox3.snapshotItem(0).checked == false ){
				//----------------//
				// 手動ルート構築 //
				//----------------//

				var obj = $e('//*[@id="x_y"]');
				var obj2 = $e('//*[@id="power"]');
				var obj3 = $e('//*[@id="material"]');
				var obj4 = $e('//*[@id="village_name"]');
				if( obj.snapshotLength > 0 ){
					var data = obj.snapshotItem(0).textContent;
					data = data.replace(/ \/.*$/,"");
					var data2 = obj2.snapshotItem(0).textContent;
					var data3 = obj3.snapshotItem(0).textContent;
					var list = data3.match(/^. *(\d+) . *(\d+) . *(\d+) . *(\d+)/);
					var list2 = data.match(/^.([-]*\d+),([-]*\d+)/);
					if( list2 != null ){
						// クリックタイミングにより取れない場合は飛ばすため

						//----------------------//
						// クリックデータの処理 //
						//----------------------//
						// ルート構築テキストの取得
						var text = baseText.snapshotItem(0).innerHTML;

						// areaデータを取ってみる
						var area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + list2[1] + "&y=" + list2[2] + "#ptop\"]");
						if( area_pos == null ){
							area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + list2[1] + "&y=" + list2[2] + "\"]");
						}
						var list3 = area_pos.getAttribute("onmouseover").match(/'(\d+)px', '(\d+)px/);

						// すでに画像が登録されてるか調べる
						var ex = $e('//*[@id="' + list2[1] + '_' + list2[2] + '"]');
						if( ex.snapshotLength > 0 ){
							// 画像がいたら消す
							var ex2 = $x('//*[@id="' + list2[1] + '_' + list2[2] + '"]');
							var ex2_p = ex2.parentNode;
							ex2_p.removeChild(ex2);

							var fp = text.indexOf(list2[0]);
							var ep = text.indexOf("<br>",fp);
							if( ep == -1 ){
								if( fp == 0 ){
									text = text.substr(0,fp);
								}
								else{
									text = text.substr(0,fp-4);
								}
							}
							else{
								text = text.substr(0,fp) + text.substr(ep+4);
							}
							baseText.snapshotItem(0).innerHTML = text;

							// ルートチェックの再実行
							routeCheckButtonClicked();
						}
						else{
							// 画像がいなければルート追加
							var landLevel = data2.length;
							var dt = obj2.snapshotItem(0).innerHTML.match(/star_warpower_b.gif/);
							if( dt != null && dt.length > 0){
								// FaceBook Lands of Legends! 対応
								var stars = obj2.snapshotItem(0).innerHTML.match(/<img/g);
								landLevel = stars.length;
								list = data3.match(/Forest (\d+) Clay (\d+) Iron (\d+) Crop (\d+)/);
							}

							// 直前のルートからの距離を求める
							var errf = false;
							if( text != "" ){
								var p1 = text.lastIndexOf("<br>");
								var p2 = text.indexOf("×");
								var pos = new Array();
								if( p1 != -1 ){
									pos = text.substr(p1+4).match(/^\(([-]*\d+),([-]*\d+)/);
								}
								else{
									pos = text.match(/^\(([-]*\d+),([-]*\d+)/);
								}

								var dx = Math.abs(parseInt(pos[1]) - parseInt(list2[1]));
								var dy = Math.abs(parseInt(pos[2]) - parseInt(list2[2]));
								if( (dx >= 2) || (dy >= 2) || (p2 != -1) ){
									// 距離2以上か、すでに×アイコンがあればエラーアイコン
									errf = true;
								}
							}

							// テキストの更新
							if( text != "" ){
								text = text + "<br>";
							}
							if( checkBox2.snapshotItem(0).checked == false ){
								if( list != null ){
									// 資源量出力があれば領地または空き地
									text = text + data + "&nbsp;★" + landLevel + "&nbsp;(" + list[1] + "-" + list[2] + "-" + list[3] + "-" + list[4] + ")";
								}
								else{
									// 資源量出力がなければ拠点か本拠地かNPC砦
									if( landLevel == 0 ){
										// ★0なら個人の本拠地または拠点
										text = text + data + "&nbsp;個人本拠地/拠点";
									}
									else{
										// ★0以外ならNPC砦または武将砦
										text = text + data + "&nbsp;★" + landLevel + "&nbsp;(" + obj4.snapshotItem(0).textContent + ")";
									}
								}
							}
							else{
								text = text + data + "&nbsp;★" + landLevel;
							}
							if( (errf == true) && (p2 == -1) ){
								// 初回ルートエラーの場合赤×を追加
								text = text + '<b><font color="red">×</font></b>';
							}
							baseText.snapshotItem(0).innerHTML = text;

							// クリックしたポイントに画像を埋め込む
							var img = d.createElement("img");
							img.style.position = "absolute";

							img.style.left = list3[1] + "px";
							img.style.top = list3[2] + "px";

							// アイコンの決定
							if( errf == false ){
								img.src = ricon;
							}
							else{
								img.src = ricon_e;
							}

							if( viewSize == 15 ){
								img.style.width = "44px";
								img.style.height = "44px";
								img.style.zIndex = 227;
							} else if( viewSize == 20 ){
								img.style.width = "33px";
								img.style.height = "33px";
								img.style.zIndex = 402;
							} else {
								img.style.width = "60px";
								img.style.height = "60px";
								img.style.zIndex = 123;
							}
							img.name = "routeIcon";
							img.id = list2[1] + "_" + list2[2];	// 座標をイメージのIDにする
							rollover.parentNode.insertBefore(img, rollover.nextSibling);

							// スクロールバーを最下段に移動する
							baseText.snapshotItem(0).parentNode.scrollTop = baseText.snapshotItem(0).parentNode.scrollHeight;
						}
					}
				}
			}
			else{
				//----------------//
				// 自動ルート構築 //
				//----------------//
				var obj = $e('//*[@id="x_y"]');
				if( obj.snapshotLength > 0 ){
					var data = obj.snapshotItem(0).textContent;
					data = data.replace(/ \/.*$/,"");
					var list2 = data.match(/^.([-]*\d+),([-]*\d+)/);
					if( (list2 != null) && (list2 != undefined) ){
						// クリックタイミングにより取れない場合は飛ばすため

						//----------------------//
						// クリックデータの処理 //
						//----------------------//
						// areaデータを取ってみる
						var area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + list2[1] + "&y=" + list2[2] + "#ptop\"]");
						if( area_pos == null ){
							area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + list2[1] + "&y=" + list2[2] + "\"]");
						}
						var list3 = area_pos.getAttribute("onmouseover").match(/'(\d+)px', '(\d+)px/);

						var ex = $e('//*[@id="' + list2[1] + '_' + list2[2] + '"]');
						if( (autoroute == AUTO_ROUTE_EDIT_LAST) && (ex.snapshotLength > 0)
							&& (autoroute_f[0] == list2[1]) && (autoroute_f[1] == list2[2]) ){
							// 終点＝始点の場合、登録済み画像を削除し、モードを戻す

							// 画像がいたら消す
							var ex2 = $x('//*[@id="' + list2[1] + '_' + list2[2] + '"]');
							var ex2_p = ex2.parentNode;
							ex2_p.removeChild(ex2);

							// モードを戻す
							autoroute = AUTO_ROUTE_EDIT_FIRST;

							// インフォメーションの更新
							autoRouteInfo();
						}
						else if( (autoroute == AUTO_ROUTE_EDIT_END) && (ex.snapshotLength > 0)
							&& (autoroute_l[0] == list2[1]) && (autoroute_l[1] == list2[2]) ){
							// 終了後に終点クリックの場合、始点以外を削除し、モードを戻す

							// 始点以外の画像を全部消す
							var en = $e('//*[@name="routeIcon"]');
							if( en.snapshotLength > 0 ){
								for( var i = 0; i < en.snapshotLength; i++ ){
									if( en.snapshotItem(i).id != autoroute_f[0] + "_" + autoroute_f[1] ){
										var ex = $x('//*[@id="' + en.snapshotItem(i).id + '"]');
										var ex_p = ex.parentNode;
										ex_p.removeChild(ex);
									}
								}
							}

							// ルートテキストをクリア
							baseText.snapshotItem(0).innerHTML = "";

							// モードを戻す
							autoroute = AUTO_ROUTE_EDIT_LAST;

							// インフォメーションの更新
							autoRouteInfo();
						}
						else{
							// クリックしたポイントに画像を埋め込む
							var img = d.createElement("img");
							img.style.position = "absolute";

							img.style.left = list3[1] + "px";
							img.style.top = list3[2] + "px";

							// アイコンの決定
							if( autoroute == AUTO_ROUTE_EDIT_FIRST ){
								img.src = ricon_f;
							}
							else if( autoroute == AUTO_ROUTE_EDIT_LAST ){
								img.src = ricon_l;
							}

							if( viewSize == 15 ){
								img.style.width = "44px";
								img.style.height = "44px";
								img.style.zIndex = 227;
							} else if( viewSize == 20 ){
								img.style.width = "33px";
								img.style.height = "33px";
								img.style.zIndex = 402;
							} else {
								img.style.width = "60px";
								img.style.height = "60px";
								img.style.zIndex = 123;
							}
							img.name = "routeIcon";
							img.id = list2[1] + "_" + list2[2];	// 座標をイメージのIDにする
							rollover.parentNode.insertBefore(img, rollover.nextSibling);

							// 座標の登録
							if( autoroute == AUTO_ROUTE_EDIT_FIRST ){
								autoroute_f[0] = list2[1];
								autoroute_f[1] = list2[2];

								// モード変更
								autoroute = AUTO_ROUTE_EDIT_LAST;

								// インフォメーションの更新
								autoRouteInfo();
							}
							else if( autoroute == AUTO_ROUTE_EDIT_LAST ){
								autoroute_l[0] = list2[1];
								autoroute_l[1] = list2[2];

								// モード変更
								autoroute = AUTO_ROUTE_EDIT_END;

								// インフォメーションの更新
								autoRouteInfo();

								// ルート構築チェック(引数"1"はルートチェック)
								if( makeAutoRoute("1") == false ){
									alert("目的地に到達するルートには到達できません。条件を見直してください。");

									// 画像の削除とモードの戻し
									var ex2 = $x('//*[@id="' + list2[1] + '_' + list2[2] + '"]');
									var ex2_p = ex2.parentNode;
									ex2_p.removeChild(ex2);

									// モードを戻す
									autoroute = AUTO_ROUTE_EDIT_LAST;

									// インフォメーションの更新
									autoRouteInfo();

									return;
								}


								// 確認
								if( window.confirm("この座標からルートを構築します") ){
									// ルート構築
									makeAutoRoute("0");
								}
								else{
									// 画像の削除とモードの戻し
									var ex2 = $x('//*[@id="' + list2[1] + '_' + list2[2] + '"]');
									var ex2_p = ex2.parentNode;
									ex2_p.removeChild(ex2);

									// モードを戻す
									autoroute = AUTO_ROUTE_EDIT_LAST;

									// インフォメーションの更新
									autoRouteInfo();
								}
							}
						}
					}
				}
			}
		}
	}

	// コンテキストメニュー制御
	var body = $e('//body');
	if( body.snapshotLength > 0 ){
		if( enf == false ){
			body.snapshotItem(0).setAttribute("onContextmenu","return false;");
		}
		else{
			body.snapshotItem(0).setAttribute("onContextmenu","return true;");
		}
	}
}

//--------------//
// リロード処理 //
//--------------//
function reloadNext(){

	// マップに埋め込んだマーク画像を全部消す
	var rollover = $d("rollover");

	// すでに画像が登録されてるか調べる
	var en = $e('//*[@name="viewIcon"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		for( var i = 0; i < en.snapshotLength; i++ ){
			var ex = $x('//*[@name="viewIcon"]');
			var ex_p = ex.parentNode;
			ex_p.removeChild(ex);
		}
	}

	en = $e('//*[@name="atkIcon"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		for( var i = 0; i < en.snapshotLength; i++ ){
			var ex = $x('//*[@name="atkIcon"]');
			var ex_p = ex.parentNode;
			ex_p.removeChild(ex);
		}
	}

	en = $e('//*[@id="icon_east"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		var ex = $x('//*[@id="icon_east"]');
		var ex_p = ex.parentNode;
		ex_p.removeChild(ex);
	}
	en = $e('//*[@id="icon_west"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		var ex = $x('//*[@id="icon_west"]');
		var ex_p = ex.parentNode;
		ex_p.removeChild(ex);
	}
	en = $e('//*[@id="icon_north"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		var ex = $x('//*[@id="icon_north"]');
		var ex_p = ex.parentNode;
		ex_p.removeChild(ex);
	}
	en = $e('//*[@id="icon_south"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		var ex = $x('//*[@id="icon_south"]');
		var ex_p = ex.parentNode;
		ex_p.removeChild(ex);
	}

	// 画面更新
	if( getViewSize() != 51 ){
		getNPCCastleInfo();
	}
	else{
		getNPCCastleInfo_51(0);		// 0:通常再描画
	}
}

//------------------------//
// 更新ボタン押下処理処理 //
//------------------------//
function updateButtonClicked() {
	var checkbox;
	var userbox;
	var listbox;
	var colorNo;

	//--------------------------------------//
	// チェックボックスに関する情報をロード //
	//--------------------------------------//
	var chkflg1;
	var chkflg2;
	execFlag = loadExecFlag(location.hostname, "FLAG0");
	if( execFlag == "" ){
		// 表示フラグをロード
		var execFlag1 = loadExecFlag(location.hostname, "FLAG1");
		if( execFlag1 == "" ){
			chkflg1 = new String(FLAG1);  // 初期値
		}
		else{
			chkflg1 = execFlag1;
		}

		// オプションフラグをロード
		var execFlag2 = loadExecFlag(location.hostname, "FLAG2");
		if( execFlag2 == "" ){
			chkflg2 = new String(FLAG2);  // 初期値
		}
		else{
			chkflg2 = execFlag2;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg1 + DELIMIT1 + chkflg2;
		saveExecFlag(location.hostname, "FLAG0", execFlag);
	}
	else{
		var loadflg = new Array();
		loadflg = execFlag.split(DELIMIT1);
		chkflg1 = loadflg[0];
		chkflg2 = loadflg[1];
	}

	// 個人、同盟検索情報をロード
	var chkflg3 = new Array();
	var execFlag = loadExecFlag(location.hostname, "FLAG3");
	if( execFlag == "" ){
		var execFlag3 = loadExecFlag(location.hostname, "FLAG3-1");
		if( execFlag3 == "" ){
			chkflg3[0] = new String(FLAG3_1);  // 初期値
		}
		else{
			chkflg3[0] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-2");
		if( execFlag3 == "" ){
			chkflg3[1] = new String(FLAG3_2);  // 初期値
		}
		else{
			chkflg3[1] = execFlag3;
		}
		execFlag3 = loadExecFlag(location.hostname, "FLAG3-3");
		if( execFlag3 == "" ){
			chkflg3[2] = new String(FLAG3_3);  // 初期値
		}
		else{
			chkflg3[2] = execFlag3;
		}

		// 初回のときは、フラグを保存
		execFlag = chkflg3[0] + DELIMIT1 + chkflg3[1] + DELIMIT1 + chkflg3[2];
		saveExecFlag(location.hostname, "FLAG3", execFlag);
	}
	else{
		chkflg3 = execFlag.split(DELIMIT1);
	}

	var chkflg4;
	execFlag = loadExecFlag(location.hostname, "FLAG4");
	if( execFlag == "" ){
		chkflg4 = new String(FLAG4);  // 初期値

		// 初回のときは、フラグを保存
		execFlag = chkflg4;
		saveExecFlag(location.hostname, "FLAG4", execFlag);
	}
	else{
		chkflg4 = execFlag;
	}

	//--------------------//
	// 空き地検索チェック //
	//--------------------//
	checkBox = $e('//*[@id="ckEmpty"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = '0' + chkflg2.substr(1);
	}
	else{
		chkflg2 = '1' + chkflg2.substr(1);
	}

	//------------------//
	// 領土検索チェック //
	//------------------//
	checkBox = $e('//*[@id="ckLand"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,1) + '0' + chkflg2.substr(2);
	}
	else{
		chkflg2 = chkflg2.substr(0,1) + '1' + chkflg2.substr(2);
	}

	//------------------//
	// 資源表示チェック //
	//------------------//
	checkBox = $e('//*[@id="ckAnalyze"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,2) + '0' + chkflg2.substr(3);
	}
	else{
		chkflg2 = chkflg2.substr(0,2) + '1' + chkflg2.substr(3);
	}

	//----------------------//
	// レーダー表示チェック //
	//----------------------//
	checkBox = $e('//*[@id="ckRader"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,3) + '0' + chkflg2.substr(4);
	}
	else{
		chkflg2 = chkflg2.substr(0,3) + '1' + chkflg2.substr(4);
	}

	//------------------------//
	// 本拠地一覧表示チェック //
	//------------------------//
	checkBox = $e('//*[@id="ckOwnerList"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,4) + '0' + chkflg2.substr(5);
	}
	else{
		chkflg2 = chkflg2.substr(0,4) + '1' + chkflg2.substr(5);
	}

	//--------------------//
	// 空き地着色チェック //
	//--------------------//
	checkBox = $e('//*[@id="ckEmptyDraw"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,5) + '0' + chkflg2.substr(6);
	}
	else{
		chkflg2 = chkflg2.substr(0,5) + '1' + chkflg2.substr(6);
	}

	// 枠色
	listBox = $e('//*[@id="lsEmptyColor"]');
	colorNo = listBox.snapshotItem(0).selectedIndex;
	chkflg2 = chkflg2.substr(0,6) + colorNo + chkflg2.substr(7);

	//--------------//
	// 強調表示指定 //
	//--------------//
	checkBox = $e('//*[@id="ckEmptyDraw"]');

	// 選択領土１
	listBox = $e('//*[@id="lsArea"]');
	areaNo = listBox.snapshotItem(0).selectedIndex;
	chkflg2 = chkflg2.substr(0,7) + formatRightNumber(areaNo,3) + chkflg2.substr(10);

	// 選択領土２
	listBox = $e('//*[@id="lsArea2"]');
	areaNo = listBox.snapshotItem(0).selectedIndex;
	chkflg2 = chkflg2.substr(0,10) + formatRightNumber(areaNo,3) + chkflg2.substr(13);

	// 選択領土３
	listBox = $e('//*[@id="lsArea3"]');
	areaNo = listBox.snapshotItem(0).selectedIndex;
	chkflg2 = chkflg2.substr(0,13) + formatRightNumber(areaNo,3) + chkflg2.substr(16);

	//----------------------//
	// メニュー表示チェック //
	//----------------------//
	checkBox = $e('//*[@id="ckMenu2"]');

	// メニュー２
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,16) + '0' + chkflg2.substr(17);
	}
	else{
		chkflg2 = chkflg2.substr(0,16) + '1' + chkflg2.substr(17);
	}

	// メニュー４
	checkBox = $e('//*[@id="ckMenu4"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,17) + '0' + chkflg2.substr(18);
	}
	else{
		chkflg2 = chkflg2.substr(0,17) + '1' + chkflg2.substr(18);
	}

	//--------------------------//
	// ルート自動構築オプション //
	//--------------------------//
	//-- ルート自動構築オプション見出し --//
	// 探査レベル
	listBox = $e('//*[@id="lsRouteLevel"]');
	var level = listBox.snapshotItem(0).selectedIndex;
	chkflg2 = chkflg2.substr(0,19) + level + chkflg2.substr(20);

	// 資源回避レベル
	listBox = $e('//*[@id="lsSkipRes"]');
	var level = listBox.snapshotItem(0).selectedIndex;
	chkflg2 = chkflg2.substr(0,20) + level + chkflg2.substr(21);

	// 個人領土回避
	checkBox = $e('//*[@id="ckRouteUser"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,21) + '0' + chkflg2.substr(22);
	}
	else{
		chkflg2 = chkflg2.substr(0,21) + '1' + chkflg2.substr(22);
	}

	// 通過同盟指定
	listBox = $e('//*[@id="lsSkipGroup"]');
	var level = listBox.snapshotItem(0).selectedIndex;
	chkflg2 = chkflg2.substr(0,22) + level + chkflg2.substr(23);

	// 可変ルート
	checkBox = $e('//*[@id="ckRouteRandom"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,23) + '0' + chkflg2.substr(24);
	}
	else{
		chkflg2 = chkflg2.substr(0,23) + '1' + chkflg2.substr(24);
	}

	//-- 表示オプション追加 --//
	// 方位表示
	checkBox = $e('//*[@id="ckDirection"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,24) + '0' + chkflg2.substr(25);
	}
	else{
		chkflg2 = chkflg2.substr(0,24) + '1' + chkflg2.substr(25);
	}

	//---------------//
	// NPC砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckNPC"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = '0' + chkflg1.substr(1);
	}
	else{
		chkflg1 = '1' + chkflg1.substr(1);
	}

	//---------------//
	// ☆1砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel1"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,1) + '0' + chkflg1.substr(2);
	}
	else{
		chkflg1 = chkflg1.substr(0,1) + '1' + chkflg1.substr(2);
	}

	//---------------//
	// ☆2砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel2"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,2) + '0' + chkflg1.substr(3);
	}
	else{
		chkflg1 = chkflg1.substr(0,2) + '1' + chkflg1.substr(3);
	}

	//---------------//
	// ☆3砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel3"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,3) + '0' + chkflg1.substr(4);
	}
	else{
		chkflg1 = chkflg1.substr(0,3) + '1' + chkflg1.substr(4);
	}

	//---------------//
	// ☆4砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel4"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,4) + '0' + chkflg1.substr(5);
	}
	else{
		chkflg1 = chkflg1.substr(0,4) + '1' + chkflg1.substr(5);
	}

	//---------------//
	// ☆5砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel5"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,5) + '0' + chkflg1.substr(6);
	}
	else{
		chkflg1 = chkflg1.substr(0,5) + '1' + chkflg1.substr(6);
	}

	//---------------//
	// ☆6砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel6"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,6) + '0' + chkflg1.substr(7);
	}
	else{
		chkflg1 = chkflg1.substr(0,6) + '1' + chkflg1.substr(7);
	}

	//---------------//
	// ☆7砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel7"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,7) + '0' + chkflg1.substr(8);
	}
	else{
		chkflg1 = chkflg1.substr(0,7) + '1' + chkflg1.substr(8);
	}

	//---------------//
	// ☆8砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel8"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,8) + '0' + chkflg1.substr(9);
	}
	else{
		chkflg1 = chkflg1.substr(0,8) + '1' + chkflg1.substr(9);
	}

	//---------------//
	// ☆9砦チェック //
	//---------------//
	checkBox = $e('//*[@id="ckLevel9"]');

	if( checkBox.snapshotItem(0).checked == false ){
		chkflg1 = chkflg1.substr(0,9) + '0';
	}
	else{
		chkflg1 = chkflg1.substr(0,9) + '1';
	}

	//--------------------//
	// 個人／同盟１の処理 //
	//--------------------//
	userBox = $e('//*[@id="userBox1"]');

	// 有効/無効
	checkBox = $e('//*[@id="ckEnable1"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[0] = '0' + chkflg3[0].substr(1);
		userBox.disabled = true;
	}
	else{
		chkflg3[0] = '1' + chkflg3[0].substr(1);
		userBox.disabled = false;
	}

	// 個人/同盟
	checkBox = $e('//*[@id="ckType1"]');
	if( checkBox.snapshotItem(0).checked == true ){
		// 個人
		chkflg3[0] = chkflg3[0].substr(0,1) + '10' + chkflg3[0].substr(3);
	}
	else{
		// 同盟
		chkflg3[0] = chkflg3[0].substr(0,1) + '01' + chkflg3[0].substr(3);
	}

	// 完全一致
	checkBox = $e('//*[@id="ckFullMatch1"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[0] = chkflg3[0].substr(0,3) + '0' + chkflg3[0].substr(4);
	}
	else{
		chkflg3[0] = chkflg3[0].substr(0,3) + '1' + chkflg3[0].substr(4);
	}

	// 絞り込み
	checkBox = $e('//*[@id="ckLevelSearch1"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[0] = chkflg3[0].substr(0,4) + '0' + chkflg3[0].substr(5);
	}
	else{
		chkflg3[0] = chkflg3[0].substr(0,4) + '1' + chkflg3[0].substr(5);
	}

	// ユーザー名を更新
	chkflg3[0] = chkflg3[0].substr(0,FLAG3_NAME) + userBox.snapshotItem(0).value;

	// 枠色
	listBox = $e('//*[@id="lsColor1"]');
	colorNo = listBox.snapshotItem(0).selectedIndex;
	chkflg3[0] = chkflg3[0].substr(0,5) + colorNo + chkflg3[0].substr(6);

	//--------------------//
	// 個人／同盟２の処理 //
	//--------------------//
	userBox = $e('//*[@id="userBox2"]');

	// 有効/無効
	checkBox = $e('//*[@id="ckEnable2"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[1] = '0' + chkflg3[1].substr(1);
		userBox.disabled = true;
	}
	else{
		chkflg3[1] = '1' + chkflg3[1].substr(1);
		userBox.disabled = false;
	}

	// 個人/同盟
	checkBox = $e('//*[@id="ckType2"]');
	if( checkBox.snapshotItem(0).checked == true ){
		// 個人
		chkflg3[1] = chkflg3[1].substr(0,1) + '10' + chkflg3[1].substr(3);
	}
	else{
		// 同盟
		chkflg3[1] = chkflg3[1].substr(0,1) + '01' + chkflg3[1].substr(3);
	}

	// 完全一致
	checkBox = $e('//*[@id="ckFullMatch2"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[1] = chkflg3[1].substr(0,3) + '0' + chkflg3[1].substr(4);
	}
	else{
		chkflg3[1] = chkflg3[1].substr(0,3) + '1' + chkflg3[1].substr(4);
	}

	// 絞り込み
	checkBox = $e('//*[@id="ckLevelSearch2"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[1] = chkflg3[1].substr(0,4) + '0' + chkflg3[1].substr(5);
	}
	else{
		chkflg3[1] = chkflg3[1].substr(0,4) + '1' + chkflg3[1].substr(5);
	}

	// ユーザー名を更新
	chkflg3[1] = chkflg3[1].substr(0,FLAG3_NAME) + userBox.snapshotItem(0).value;

	// 枠色
	listBox = $e('//*[@id="lsColor2"]');
	colorNo = listBox.snapshotItem(0).selectedIndex;
	chkflg3[1] = chkflg3[1].substr(0,5) + colorNo + chkflg3[1].substr(6);

	//--------------------//
	// 個人／同盟３の処理 //
	//--------------------//
	userBox = $e('//*[@id="userBox3"]');

	// 有効/無効
	checkBox = $e('//*[@id="ckEnable3"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[2] = '0' + chkflg3[2].substr(1);
		userBox.disabled = true;
	}
	else{
		chkflg3[2] = '1' + chkflg3[2].substr(1);
		userBox.disabled = false;
	}

	// 個人/同盟
	checkBox = $e('//*[@id="ckType3"]');
	if( checkBox.snapshotItem(0).checked == true ){
		// 個人
		chkflg3[2] = chkflg3[2].substr(0,1) + '10' + chkflg3[2].substr(3);
	}
	else{
		// 同盟
		chkflg3[2] = chkflg3[2].substr(0,1) + '01' + chkflg3[2].substr(3);
	}

	// 完全一致
	checkBox = $e('//*[@id="ckFullMatch3"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[2] = chkflg3[2].substr(0,3) + '0' + chkflg3[2].substr(4);
	}
	else{
		chkflg3[2] = chkflg3[2].substr(0,3) + '1' + chkflg3[2].substr(4);
	}

	// 絞り込み
	checkBox = $e('//*[@id="ckLevelSearch3"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg3[2] = chkflg3[2].substr(0,4) + '0' + chkflg3[2].substr(5);
	}
	else{
		chkflg3[2] = chkflg3[2].substr(0,4) + '1' + chkflg3[2].substr(5);
	}

	// ユーザー名を更新
	chkflg3[2] = chkflg3[2].substr(0,FLAG3_NAME) + userBox.snapshotItem(0).value;

	// 枠色
	listBox = $e('//*[@id="lsColor3"]');
	colorNo = listBox.snapshotItem(0).selectedIndex;
	chkflg3[2] = chkflg3[2].substr(0,5) + colorNo + chkflg3[2].substr(6);

	//----------------------//
	// スプレッド連携の処理 //
	//----------------------//
	userBox = $e('//*[@id="userBox4"]');

	// 有効/無効
	checkBox = $e('//*[@id="ckUnion"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg4 = '0' + chkflg4.substr(1);
		userBox.disabled = true;
	}
	else{
		chkflg4 = '1' + chkflg4.substr(1);
		userBox.disabled = false;
	}

	// ユーザー名を更新
	chkflg4 = chkflg4.substr(0,1) + userBox.snapshotItem(0).value;

	//----------------------//
	// 更新したフラグを保存 //
	//----------------------//
	execFlag = chkflg1 + DELIMIT1 + chkflg2;
	saveExecFlag(location.hostname, "FLAG0", execFlag);
	execFlag = chkflg3[0] + DELIMIT1 + chkflg3[1] + DELIMIT1 + chkflg3[2];
	saveExecFlag(location.hostname, "FLAG3", execFlag);
	saveExecFlag(location.hostname, "FLAG4", chkflg4);

	//----------//
	// リロード //
	//----------//
	reloadNext();
}

//------------------------------//
// ★のチェックを付ける押下処理 //
//------------------------------//
function checkButtonClicked() {

	// チェックボックスのチェックを外す //
	var checkBox1 = $e('//*[@id="ckLevel1"]');
	var checkBox2 = $e('//*[@id="ckLevel2"]');
	var checkBox3 = $e('//*[@id="ckLevel3"]');
	var checkBox4 = $e('//*[@id="ckLevel4"]');
	var checkBox5 = $e('//*[@id="ckLevel5"]');
	var checkBox6 = $e('//*[@id="ckLevel6"]');
	var checkBox7 = $e('//*[@id="ckLevel7"]');
	var checkBox8 = $e('//*[@id="ckLevel8"]');
	var checkBox9 = $e('//*[@id="ckLevel9"]');

	checkBox1.snapshotItem(0).checked = true;
	checkBox2.snapshotItem(0).checked = true;
	checkBox3.snapshotItem(0).checked = true;
	checkBox4.snapshotItem(0).checked = true;
	checkBox5.snapshotItem(0).checked = true;
	checkBox6.snapshotItem(0).checked = true;
	checkBox7.snapshotItem(0).checked = true;
	checkBox8.snapshotItem(0).checked = true;
	checkBox9.snapshotItem(0).checked = true;
}

//----------------------------//
// ★のチェックを外す押下処理 //
//----------------------------//
function uncheckButtonClicked() {

	// チェックボックスのチェックを外す //
	var checkBox1 = $e('//*[@id="ckLevel1"]');
	var checkBox2 = $e('//*[@id="ckLevel2"]');
	var checkBox3 = $e('//*[@id="ckLevel3"]');
	var checkBox4 = $e('//*[@id="ckLevel4"]');
	var checkBox5 = $e('//*[@id="ckLevel5"]');
	var checkBox6 = $e('//*[@id="ckLevel6"]');
	var checkBox7 = $e('//*[@id="ckLevel7"]');
	var checkBox8 = $e('//*[@id="ckLevel8"]');
	var checkBox9 = $e('//*[@id="ckLevel9"]');

	checkBox1.snapshotItem(0).checked = false;
	checkBox2.snapshotItem(0).checked = false;
	checkBox3.snapshotItem(0).checked = false;
	checkBox4.snapshotItem(0).checked = false;
	checkBox5.snapshotItem(0).checked = false;
	checkBox6.snapshotItem(0).checked = false;
	checkBox7.snapshotItem(0).checked = false;
	checkBox8.snapshotItem(0).checked = false;
	checkBox9.snapshotItem(0).checked = false;
}

//----------------------------------//
// 有効チェックボックスチェック処理 //
//----------------------------------//
function enable1Checked() {

	var userBox = $e('//*[@id="userBox1"]');
	var checkBox = $e('//*[@id="ckEnable1"]');

	// ユーザー指定のフラグを反転
	if( checkBox.snapshotItem(0).checked == false ){
		userBox.snapshotItem(0).disabled = true;
	}
	else{
		userBox.snapshotItem(0).disabled = false;
	}
}

function enable2Checked() {

	var userBox = $e('//*[@id="userBox2"]');
	var checkBox = $e('//*[@id="ckEnable2"]');

	// ユーザー指定のフラグを反転
	if( checkBox.snapshotItem(0).checked == false ){
		userBox.snapshotItem(0).disabled = true;
	}
	else{
		userBox.snapshotItem(0).disabled = false;
	}
}

function enable3Checked() {

	var userBox = $e('//*[@id="userBox3"]');
	var checkBox = $e('//*[@id="ckEnable3"]');

	// ユーザー指定のフラグを反転
	if( checkBox.snapshotItem(0).checked == false ){
		userBox.snapshotItem(0).disabled = true;
	}
	else{
		userBox.snapshotItem(0).disabled = false;
	}
}

//------------------//
// ルート構築モード //
//------------------//
function routeModeChecked() {
	var checkBox = $e('//*[@id="ckRouteMode"]');
	var checkBox2 = $e('//*[@id="ckAutoRouteMode"]');
	var routeField = $e('//*[@id="routeField"]');
	var routeField2 = $e('//*[@id="routeField2"]');
	var routeField3 = $e('//*[@id="routeField3"]');
	var routeField5 = $e('//*[@id="routeField5"]');
	var baseField = $e('//*[@id="baseField"]');

	// ユーザー指定のフラグを反転
	if( checkBox.snapshotItem(0).checked == false ){
		if( baseField.snapshotLength > 0 ){
			baseField.snapshotItem(0).style.display = "inline";
		}
		routeField.snapshotItem(0).style.display = "none";
		routeField2.snapshotItem(0).style.display = "none";
		routeField3.snapshotItem(0).style.display = "none";
		routeField5.snapshotItem(0).style.display = "none";

		// メニュー解除されたらクリアボタンクリックを実行
		routeClearButtonClicked()
	}
	else{
		if( baseField.snapshotLength > 0 ){
			baseField.snapshotItem(0).style.display = "none";
		}
		routeField.snapshotItem(0).style.display = "inline";
		routeField2.snapshotItem(0).style.display = "inline";
		routeField3.snapshotItem(0).style.display = "inline";
		routeField5.snapshotItem(0).style.display = "inline";

		if( checkBox2.snapshotItem(0).checked == true ){
			// 自動構築モードがすでにチェックされてたら警告処理
			autoRouteModeChecked();
		}
	}

	// インフォメーションの更新
	autoRouteInfo();
}

//----------------------//
// 自動ルート構築モード //
//----------------------//
function autoRouteModeChecked() {

	var checkBox = $e('//*[@id="ckRouteMode"]');
	var checkBox2 = $e('//*[@id="ckAutoRouteMode"]');

	// 自動構築のチェック
	if( (checkBox.snapshotItem(0).checked == true) && (checkBox2.snapshotItem(0).checked == true) ){
		if( window.confirm("作成中のルートが破棄されますがよろしいですか？") ){
			routeClearButtonClicked();
			autoroute = AUTO_ROUTE_EDIT_FIRST;
		}
		else{
			// 解除時はルートをクリアする
			checkBox2.snapshotItem(0).checked = false;
 			return;
		}
	}
	else{
		autoroute = AUTO_ROUTE_NONE;
		routeClearButtonClicked();
	}

	// インフォメーションの更新
	autoRouteInfo();
}

//------------------------------------------//
// 自動ルート構築モードの指示メッセージ表示 //
//------------------------------------------//
function autoRouteInfo(){
	var routeField = $e('//*[@id="route_info"]');
	var checkBox = $e('//*[@id="ckRouteMode"]');

	if( checkBox.snapshotItem(0).checked == false ){
		// ルート構築モードがオフのときはメッセージをださない
		routeField.snapshotItem(0).innerHTML = '';
		return;
	}

	if( location.pathname != "/big_map.php" ){
		if( autoroute == AUTO_ROUTE_EDIT_FIRST ){
			routeField.snapshotItem(0).innerHTML = '<font color="red"><b>ルート起点を<br>右クリックして下さい</b></font>';
		}
		else if( autoroute == AUTO_ROUTE_EDIT_LAST ){
			routeField.snapshotItem(0).innerHTML = '<font color="red"><b>ルート終点を<br>右クリックして下さい</b></font>';
		}
		else if( autoroute == AUTO_ROUTE_EDIT_END ){
			routeField.snapshotItem(0).innerHTML = '<font color="red"><b>ルート終点を<br>右クリックで再試行できます</b></font>';
		}
		else{
			routeField.snapshotItem(0).innerHTML = '';
		}
	}
	else{
		if( autoroute == AUTO_ROUTE_EDIT_FIRST ){
			routeField.snapshotItem(0).innerHTML = '<font color="red"><b>右クリックで起点設定</b></font>';
		}
		else if( autoroute == AUTO_ROUTE_EDIT_LAST ){
			routeField.snapshotItem(0).innerHTML = '<font color="red"><b>右クリックで終点設定</b></font>';
		}
		else if( autoroute == AUTO_ROUTE_EDIT_END ){
			routeField.snapshotItem(0).innerHTML = '<font color="red"><b>終点右クリックで終点解除</b></font>';
		}
		else{
			routeField.snapshotItem(0).innerHTML = '';
		}
	}
}

//--------------------//
// ルート全選択ボタン //
//--------------------//
function routeSelectButtonClicked() {
	// 構築ルート情報の選択
	var routeText = $x('//*[@id="routeInfoText"]');

	var objs = routeText.firstChild;
	var obje = routeText.lastChild;

	var range = document.createRange();
	range.setStart(objs,0);
	range.setEnd(obje,obje.textContent.length);
	var sel = getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

//--------------------//
// ルートクリアボタン //
//--------------------//
function routeClearButtonClicked() {
	var routeText = $e('//*[@id="routeInfoText"]');
	var checkBox = $e('//*[@id="ckAutoRouteMode"]');

	if( location.pathname == "/big_map.php" ){
		// 51x51画面では対象座標再描画で対応
		autoroute = AUTO_ROUTE_NONE;

		getNPCCastleInfo_51(1);

		routeText.snapshotItem(0).innerHTML = "";

		// ルート自動構築中ならフラグを初期化
		if( checkBox.snapshotItem(0).checked == true ){
			autoroute = AUTO_ROUTE_EDIT_FIRST;
		}

		return;
	}

	// 構築ルート情報のクリア
	routeText.snapshotItem(0).innerHTML = "";

	// マップに埋め込んだマーク画像を全部消す
	var rollover = $d("rollover");

	// すでに画像が登録されてるか調べる
	var en = $e('//*[@name="routeIcon"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		for( var i = 0; i < en.snapshotLength; i++ ){
			var ex = $x('//*[@id="' + en.snapshotItem(i).id + '"]');
			var ex_p = ex.parentNode;
			ex_p.removeChild(ex);
		}
	}

	// ルート自動構築中ならフラグを初期化
	if( checkBox.snapshotItem(0).checked == true ){
		autoroute = AUTO_ROUTE_EDIT_FIRST;
	}
}

//------------------//
// ルート検証ボタン //
//------------------//
function routeCheckButtonClicked(e){
	var rollover = $d("rollover");
	var checkBox = $e('//*[@id="ckRouteMode"]');
	var checkBox2 = $e('//*[@id="ckRouteMode2"]');

	// マップに埋め込んだマーク画像を拾う
	var rollover = $d("rollover");

	// すでに画像が登録されてるか調べる
	var cx = 0;
	var cy = 0;
	var errf = false;
	var errx;
	var erry;
	var en = $e('//*[@name="routeIcon"]');
	if( en.snapshotLength > 0 ){
		// 画像がいたら消す
		for( var i = en.snapshotLength -1; i >= 0; i-- ){
			var ex = $x('//*[@id="' + en.snapshotItem(i).id + '"]');
			var list = en.snapshotItem(i).id.match(/^([-]*\d+).([-]*\d+)/);
			if( i != en.snapshotLength -1 ){
				var dx = Math.abs(cx - parseInt(list[1]));
				var dy = Math.abs(cy - parseInt(list[2]));
				if( (dx >= 2) || (dy >= 2) || (errf == true) ){
					if( errf == false ){
						errx = parseInt(list[1]);
						erry = parseInt(list[2]);
					}
					ex.src = ricon_e;
					errf = true;
				}
				else{
					ex.src = ricon;
				}
			}

			cx = parseInt(list[1]);
			cy = parseInt(list[2]);
		}

		if( errf == true ){
			var baseText = $e('//*[@id="routeInfoText"]');
			var text = baseText.snapshotItem(0).innerHTML;
			var fp = text.indexOf('(' + errx + ',' + erry + ')');
			var xp = text.indexOf('×',fp);
			var ep = text.indexOf("<",fp);
			if( ep == -1 ){
				if( xp == -1 ){
					// マークがないばあいだけつける
					text = text + '<b><font color="red">×</font></b>';
				}
			}
			else{
				if( xp == -1 ){
					// マークがないばあいだけつける
					text = text.substr(0,ep) + '<b><font color="red">×</font></b>' + text.substr(ep);
				}
			}
			baseText.snapshotItem(0).innerHTML = text;
		}
	}

}

//----------------------//
// 表示補助メニュー制御 //
//----------------------//
function menu2Clicked() {

	var checkBox = $e('//*[@id="ckMenu2"]');
	var label;
	var chkbox;
	var listbox;

	// コントロールの表示切り替え
	if( checkBox.snapshotItem(0).checked == false ){
		for( var i = 1; i <= 8; i++ ){
			label = $e('//*[@id="Label2-' + i + '"]');
			label.snapshotItem(0).style.display = "none";
		}

		checkbox = $e('//*[@id="ckAnalyze"]');
		checkbox.snapshotItem(0).style.display = "none";
		checkbox = $e('//*[@id="ckEmptyDraw"]');
		checkbox.snapshotItem(0).style.display = "none";
		checkbox = $e('//*[@id="ckRader"]');
		checkbox.snapshotItem(0).style.display = "none";
		checkbox = $e('//*[@id="ckOwnerList"]');
		checkbox.snapshotItem(0).style.display = "none";
		checkbox = $e('//*[@id="ckDirection"]');
		checkbox.snapshotItem(0).style.display = "none";

		listbox = $e('//*[@id="lsArea"]');
		listbox.snapshotItem(0).style.display = "none";
		listbox = $e('//*[@id="lsArea2"]');
		listbox.snapshotItem(0).style.display = "none";
		listbox = $e('//*[@id="lsArea3"]');
		listbox.snapshotItem(0).style.display = "none";
		listbox = $e('//*[@id="lsEmptyColor"]');
		listbox.snapshotItem(0).style.display = "none";
	}
	else{
		for( var i = 1; i <= 8; i++ ){
			label = $e('//*[@id="Label2-' + i + '"]');
			label.snapshotItem(0).style.display = "inline";
		}

		checkbox = $e('//*[@id="ckAnalyze"]');
		checkbox.snapshotItem(0).style.display = "inline";
		checkbox = $e('//*[@id="ckEmptyDraw"]');
		checkbox.snapshotItem(0).style.display = "inline";
		checkbox = $e('//*[@id="ckRader"]');
		checkbox.snapshotItem(0).style.display = "inline";
		checkbox = $e('//*[@id="ckOwnerList"]');
		checkbox.snapshotItem(0).style.display = "inline";
		checkbox = $e('//*[@id="ckDirection"]');
		checkbox.snapshotItem(0).style.display = "inline";

		listbox = $e('//*[@id="lsArea"]');
		listbox.snapshotItem(0).style.display = "inline";
		listbox = $e('//*[@id="lsArea2"]');
		listbox.snapshotItem(0).style.display = "inline";
		listbox = $e('//*[@id="lsArea3"]');
		listbox.snapshotItem(0).style.display = "inline";
		listbox = $e('//*[@id="lsEmptyColor"]');
		listbox.snapshotItem(0).style.display = "inline";
	}
}

//----------------------//
// 同盟検索メニュー制御 //
//----------------------//
function menu4Clicked() {
	var checkBox = $e('//*[@id="ckMenu4"]');
	var label;
	var chkbox;
	var listbox;
	var userbox;

	// コントロールの表示切り替え
	if( checkBox.snapshotItem(0).checked == false ){
		for( var i = 1; i <= 24; i++ ){
			label = $e('//*[@id="Label4-' + i + '"]');
			label.snapshotItem(0).style.display = "none";
		}

		for( var i = 1; i <= 3; i++ ){
			label = $e('//*[@id="Label4-2-' + i + '"]');
			label.snapshotItem(0).style.display = "none";
		}

		for( var i = 1; i <=3; i++ ){
			checkbox = $e('//*[@id="ckEnable' + i + '"]');
			checkbox.snapshotItem(0).style.display = "none";
			checkbox = $e('//*[@id="ckType' + i + '"]');
			checkbox.snapshotItem(0).style.display = "none";
			checkbox.snapshotItem(1).style.display = "none";
			checkbox = $e('//*[@id="ckFullMatch' + i + '"]');
			checkbox.snapshotItem(0).style.display = "none";
			checkbox = $e('//*[@id="ckLevelSearch' + i + '"]');
			checkbox.snapshotItem(0).style.display = "none";

			userbox = $e('//*[@id="userBox' + i + '"]');
			userbox.snapshotItem(0).style.display = "none";

			listbox = $e('//*[@id="lsColor' + i + '"]');
			listbox.snapshotItem(0).style.display = "none";
		}
	}
	else{
		for( var i = 1; i <= 24; i++ ){
			label = $e('//*[@id="Label4-' + i + '"]');
			label.snapshotItem(0).style.display = "inline";
		}

		for( var i = 1; i <= 3; i++ ){
			label = $e('//*[@id="Label4-2-' + i + '"]');
			label.snapshotItem(0).style.display = "inline";
		}

		for( var i = 1; i <=3; i++ ){
			checkbox = $e('//*[@id="ckEnable' + i + '"]');
			checkbox.snapshotItem(0).style.display = "inline";
			checkbox = $e('//*[@id="ckType' + i + '"]');
			checkbox.snapshotItem(0).style.display = "inline";
			checkbox.snapshotItem(1).style.display = "inline";
			checkbox = $e('//*[@id="ckFullMatch' + i + '"]');
			checkbox.snapshotItem(0).style.display = "inline";
			checkbox = $e('//*[@id="ckLevelSearch' + i + '"]');
			checkbox.snapshotItem(0).style.display = "inline";

			userbox = $e('//*[@id="userBox' + i + '"]');
			userbox.snapshotItem(0).style.display = "inline";

			listbox = $e('//*[@id="lsColor' + i + '"]');
			listbox.snapshotItem(0).style.display = "inline";
		}
	}
}

//----------//
// 空白除去 //
//----------//
function trim(str)
{
	if (str == undefined) return "";
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}


//------------------//
// 画面サイズの取得 //
//------------------//
function getViewSize()
{
	var viewSize;

	if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort15 now\"]") ){
		viewSize = 15;	// 15x15
	}
	else if( $x("//div[@id=\"changemapscale\"]/ul/li[@class=\"sort20 now\"]") ){
		viewSize = 20;	// 20x20
	}
	else if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort15 now\"]") ){
		viewSize = 15;	// 15x15 本鯖の仕様変更対応
	}
	else if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort20 now\"]") ){
		viewSize = 20;	// 20x20 本鯖の仕様変更対応
	}
	else if( $x("//div[@id=\"change-map-scale\"]/ul/li[@class=\"sort51 now\"]") ){
		viewSize = 51;	// 51x51 本鯖の仕様変更対応
	}
	else{
		viewSize = 11;	// 11x11
	}

	return viewSize;
}

//----------------//
// 自動ルート構築 //
//----------------//
function makeAutoRoute(checkmode)
{
	//------//
	// 定数 //
	//------//
	var MAP_NONE  = -1;    // 未処理
	var MAP_NPC   = -2;    // NPC砦
	var MAP_WALL  = -3;    // 壁
	var MAP_START = 0;     // 起点
	var MAP_END   = -999;  // 目的地

	//------------------//
	// 画面サイズの取得 //
	//------------------//
	var viewSize;
	viewSize = getViewSize();

	//--------------------------//
	// 同盟検索オプションの取得 //
	//--------------------------//
	var checkBox1;
	var userName = new Array();
	var userText;
	var fullmatch = new Array();
	var target = new Array();
	for( var i = 0; i < 3; i++ ){
		fullmatch[i] = 0;
		target[i] = 0;
	}

	// 個人・同盟検索１
	checkBox1 = $e('//*[@id="ckEnable1"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[0] = 1;
		}
		else{
			target[0] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[0] = 1;
		}
		else{
			fullmatch[0] = 0;
		}
		userBox = $e('//*[@id="userBox1"]');
		userText = userBox.snapshotItem(0).value;
		userName[0] = new Array();
		userName[0] = userText.split(OWNER_SPLITKEY);
	}
	else{
		userName[0] = "";
	}

	// 個人・同盟検索２
	checkBox1 = $e('//*[@id="ckEnable2"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[1] = 1;
		}
		else{
			target[1] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[1] = 1;
		}
		else{
			fullmatch[1] = 0;
		}
		userBox = $e('//*[@id="userBox2"]');
		userText = userBox.snapshotItem(0).value;
		userName[1] = new Array();
		userName[1] = userText.split(OWNER_SPLITKEY);
	}
	else{
		userName[1] = "";
	}

	// 個人・同盟検索３
	checkBox1 = $e('//*[@id="ckEnable3"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[2] = 1;
		}
		else{
			target[2] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[2] = 1;
		}
		else{
			fullmatch[2] = 0;
		}
		userBox = $e('//*[@id="userBox3"]');
		userText = userBox.snapshotItem(0).value;
		userName[2] = new Array();
		userName[2] = userText.split(OWNER_SPLITKEY);
	}
	else{
		userName[2] = "";
	}

	//--------------------------------------------//
	// 全体表示画面から、画面中央座標を手に入れる //
	//--------------------------------------------//
	var codx = $e('//div[@id="datas"]/input[@id=\"x\"]');
	var cody = $e('//div[@id="datas"]/input[@id=\"y\"]');
	var bx = codx.snapshotItem(0).value;
	var by = cody.snapshotItem(0).value;

	// 左上座標を求める
	if( viewSize == 11 ){
		bx = parseInt(bx) - 5;
		by = parseInt(by) + 5;
	}
	else if( viewSize == 15 ){
		bx = parseInt(bx) - 7;
		by = parseInt(by) + 7;
	}
	else{
		bx = parseInt(bx) - 9;
		by = parseInt(by) + 9;
	}

	// 始点、終点座標を求める
	var sx = Math.abs(parseInt(autoroute_f[0]) - parseInt(bx));
	var sy = Math.abs(parseInt(autoroute_f[1]) - parseInt(by));
	var ex = Math.abs(parseInt(autoroute_l[0]) - parseInt(bx));
	var ey = Math.abs(parseInt(autoroute_l[1]) - parseInt(by));

	//------------------//
	// 探査レベルの取得 //
	//------------------//
	var listBox = $e('//*[@id="lsRouteLevel"]');
	var listBox2 = $e('//*[@id="lsSkipRes"]');
	var listBox3 = $e('//*[@id="lsSkipGroup"]');
	var limit = listBox.snapshotItem(0).selectedIndex + 1;
	var skipres = listBox2.snapshotItem(0).selectedIndex;
	var skipgrp = listBox3.snapshotItem(0).selectedIndex;

	//------------------------------//
	// マップデータをマトリックス化 //
	//------------------------------//
	// マップの作成
	var mapdata = new Array();
	var resdata = new Array();
	for(var i = 0; i < 20; i++ ){
		mapdata[i] = new Array();
		resdata[i] = new Array();
	}
	for(var i = 0; i < 20; i++ ){
		for(var j = 0; j < 20; j++ ){
			if( (i >= viewSize) || (j >= viewSize) ){
				mapdata[i][j] = MAP_WALL;	// 画面外は壁扱い
			}
			else{
				mapdata[i][j] = MAP_NONE;	// 未処理エリア
			}
		}
	}

	//----------------//
	// 領土情報の取得 //
	//----------------//
	var areas = $e('//*[@id="mapOverlayMap"]//area/@onmouseover');

	//--------------------------------//
	// 領土の情報をマトリックスに反映 //
	//--------------------------------//
	var ckUser = $e('//*[@id="ckRouteUser"]');
	for (var i = 0; i < areas.snapshotLength; i++) {
		var rowText = areas.snapshotItem(i).textContent;
		rowText = rowText.replace(/^.*rewrite\(/, "");
		rowText = rowText.replace(/\); .*$/, "");
		var bkText = rowText;
		rowText = rowText.replace(/\//g,"==uZer==");
		rowText = rowText.replace(/', '/g,"'/'");
		rowText = rowText.replace(/'/g,"");
		var valueA = new Array();
		valueA = rowText.split('/');
		valueA[1] = valueA[1].replace(/==uZer==/,"/");

		// マップ座標の取得
		var rowText3 = valueA[3];
		rowText3 = rowText3.replace(/\(/,"");
		rowText3 = rowText3.replace(/\)/,"");
		var valueB = new Array();
		valueB = rowText3.split(',');
		var x = parseInt(valueB[0]);
		var y = parseInt(valueB[1]);

		// 資源レベル
		var landLevel = valueA[5].length;
		if( valueA[5].substr(0,4) == '<img' ){
			// FaceBook Lands of Legends! 対応
			var stars = valueA[5].match(/<img/g);
			landLevel = stars.length;
		}

		//--------------------------------//
		// マトリックス上のオフセット計算 //
		//--------------------------------//
		var px = Math.abs(parseInt(x) - parseInt(bx));
		var py = Math.abs(parseInt(y) - parseInt(by));

		//--------------------//
		// 各種情報の埋め込み //
		//--------------------//
		if( valueA[11] == '1' ){
			// NPC砦
			mapdata[px][py] = MAP_NPC;

			// リソース情報
			resdata[px][py] = "★" + landLevel + "&nbsp;(" + valueA[0] + ")";
		}
		else if( valueA[1] != '' ){
			// 個人領土
			if( (ckUser.snapshotItem(0).checked == false) || ((ckUser.snapshotItem(0).checked == true) && (landLevel == 0)) ){
				mapdata[px][py] = MAP_WALL;   // 個人領土を対象外、あるいは対象かつ拠点の場合、壁とみなす
			}

			// 同盟指定
			if( (ckUser.snapshotItem(0).checked == true) && (skipgrp > 0) ){
				// 同盟指定ありの場合、指定条件にマッチしない領土は壁とみなす

				var matchcase = false;    // マッチしたパターン
				var groupNo = skipgrp - 1;
	
				// 個人・同盟マッチチェック
				for( var k = 0; k < userName[groupNo].length; k++ ){
					// 検索有効時 username に値が入る
					if( userName[groupNo][k] != "" ){
						// ターゲットが個人
						if( target[groupNo] == 1 ){
							// 完全一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 1) && (valueA[1] == userName[groupNo][k]) ){
								matchcase = true;
								break;
							}
							// 部分一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 0) && (valueA[1].indexOf(userName[groupNo][k]) != -1) ){
								matchcase = true;
								break;
							}
						}
						// ターゲットが同盟
						else{
							// 完全一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 1) && (valueA[4] == userName[groupNo][k]) ){
								matchcase = true;
								break;
							}
							// 部分一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 0) && (valueA[4].indexOf(userName[groupNo][k]) != -1) ){
								matchcase = true;
								break;
							}
						}
					}
				}
				if( matchcase == false ){
					// マッチしない場合は壁扱い
					mapdata[px][py] = MAP_WALL;
				}
			}

			// リソース情報
			if( landLevel != 0 ){
				resdata[px][py] = '★' + landLevel + '&nbsp;(' + valueA[7] + ',' + valueA[8] + ',' + valueA[9] + ',' + valueA[10] + ')';
			}
			else{
				resdata[px][py] = '個人本拠地/拠点';
			}
		}
		else{
			// リソース情報
			resdata[px][py] = '★' + landLevel + '&nbsp;(' + valueA[7] + ',' + valueA[8] + ',' + valueA[9] + ',' + valueA[10] + ')';
		}

		//----------------//
		// ルート特殊処理 //
		//----------------//
		// 土地レベルでの判定
		if( (landLevel > limit) || (mapdata[px][py] == MAP_NPC) ){
			// レベル超過の土地とNPC砦は壁扱いとする
			mapdata[px][py] = MAP_WALL;   // 壁扱い
		}
		
		// 資源回避での判定
		if(    (season1[cchkres[skipres]][1] == valueA[7])
		    && (season1[cchkres[skipres]][2] == valueA[8])
		    && (season1[cchkres[skipres]][3] == valueA[9])
		    && (season1[cchkres[skipres]][4] == valueA[10]) ){
			// 回避条件に一致する資源は壁扱いとする
			mapdata[px][py] = MAP_WALL;   // 壁扱い
		}

		// 始点、終点特例
		if( ((px == sx) && (py == sy)) || ((px == ex) && (py == ey)) ){
			mapdata[px][py] = MAP_NONE;   // 始点と目的地はルートに加える
		}
	}

	//--------------------//
	// 始点情報の埋め込み //
	//--------------------//
	mapdata[sx][sy] = MAP_START;

	// 探索情報設定
	var posdata = new Array();
	var maxpos = 0;
	posdata[0] = parseInt(sy) * 20 + parseInt(sx);

	for( var i = 0; i <= maxpos; i++ ){
		var cx = parseInt(posdata[i]) % 20;
		var cy = Math.floor(parseInt(posdata[i]) / 20);

		for( var j = 0; j < chkptn.length; j++ ){
			var lx = parseInt(cx) + parseInt(chkptn[j][0]);
			if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
				continue;
			}
			var ly = parseInt(cy) + parseInt(chkptn[j][1]);
			if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
				continue;
			}

			// 現座標からの移動距離＋１を求める
			var dist = parseInt(mapdata[cx][cy]) + 1;
			// 編集可能？
			if( (mapdata[lx][ly] == MAP_NONE) || (mapdata[lx][ly] == MAP_NPC) ){
				// 距離更新
				mapdata[lx][ly] = dist;

				// 座標登録
				maxpos = maxpos + 1;
				posdata[maxpos] = parseInt(ly) * 20 + parseInt(lx);
			}
			else if( (mapdata[lx][ly] > 0) && (parseInt(mapdata[lx][ly])) > dist ){
				// 距離更新
				mapdata[lx][ly] = dist;

				// 座標登録
				maxpos = maxpos + 1;
				posdata[maxpos] = parseInt(ly) * 20 + parseInt(lx);
			}
		}
	}

	// 事前チェックオンのとき、結果だけ返す
	if( checkmode == "1" ){
		if( mapdata[ex][ey] < 0 ){
			return false;
		}
		else{
			return true;
		}
	}

	// 終点にたどりつけたか？
	if( mapdata[ex][ey] < 0 ){
		alert("目的地に到達するルートを構築できませんでした。構築条件を見直してください。");
		return false;
	}

	//--------------------//
	// サーチルート逆探査 //
	//--------------------//
	posdata[0] = parseInt(ey) * 20 + parseInt(ex);
	maxpos = 0;

	for( var i = 0; i <= maxpos; i++ ){
		var cx = parseInt(posdata[i]) % 20;
		var cy = Math.floor(parseInt(posdata[i]) / 20);

		if( (cx == sx) && (cy == sy) ){
			break;
		}

		// コースとして通過可能な最小資源の土地を調べる
		var lowLevel = 9;
		for( var j = 0; j < chkptn.length; j++ ){
			var lx = parseInt(cx) + parseInt(chkptn[j][0]);
			if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
				continue;
			}
			var ly = parseInt(cy) + parseInt(chkptn[j][1]);
			if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
				continue;
			}

			// 現座標からの移動距離－１を求める
			var dist = parseInt(mapdata[cx][cy]) - 1;
			// 該当する座標？
			if( (mapdata[lx][ly] >= 0) && (parseInt(mapdata[lx][ly])) == dist ){
				var level = resdata[lx][ly].substr(resdata[lx][ly].indexOf("★")+1,1);
				if( resdata[lx][ly].indexOf("個人本拠地/拠点") >= 0 ){
					level = 0;
				}
				if( lowLevel > level ){
					lowLevel = level;
				}
			}
		}

		//--------------------------//
		// 固定・ランダム構築の分岐 //
		//--------------------------//
		checkBox1 = $e('//*[@id="ckRouteRandom"]');
		if( checkBox1.snapshotItem(0).checked == true ){
			//--------------------//
			// ランダムルート構築 //
			//--------------------//

			// パターン乱数の算出
			var pattern;
			var rptn = new Array(2);
			pattern = Math.floor(Math.random() * 30);
			if( pattern < 24 ){
				// 十字優先のパターン(80%の確率でこちら)
				rptn[0] = pattern;

				// 後半4パターンの決定
				pattern = Math.floor(Math.random() * 24);
				rptn[1] = pattern + 24;
			}
			else{
				// ×字優先のパターン(20%の確率でこちら)
				pattern = Math.floor(Math.random() * 24);
				rptn[1] = pattern;

				// 前半4パターンの決定
				pattern = Math.floor(Math.random() * 24);
				rptn[0] = pattern + 24;
			}

			// ルート探索
			for( var j = 0; j < 8; j++ ){
				var rno;
				var offset;
				if( j < 4 ){
					rno = rptn[0];
					offset = j;
				}
				else{
					rno = rptn[1];
					offset = j - 4;
				}

				var lx = parseInt(cx) + parseInt(chkptn_r[rno*4 + offset][0]);
				if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
					continue;
				}
				var ly = parseInt(cy) + parseInt(chkptn_r[rno*4 + offset][1]);
				if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
					continue;
				}

				// 現座標からの移動距離－１を求める
				var dist = parseInt(mapdata[cx][cy]) - 1;
				var level = resdata[lx][ly].substr(resdata[lx][ly].indexOf("★")+1,1);
				if( resdata[lx][ly].indexOf("個人本拠地/拠点") >= 0 ){
					level = 0;
				}

				// 該当する座標？
				if( (mapdata[lx][ly] >= 0) && (parseInt(mapdata[lx][ly]) == dist) && (level == lowLevel) ){
					// 座標登録
					maxpos = maxpos + 1;
					posdata[maxpos] = parseInt(ly) * 20 + parseInt(lx);
	
					break;
				}
			}
		}
		else{
			//----------------//
			// 固定ルート構築 //
			//----------------//
			// ルート探索
			for( var j = 0; j < chkptn.length; j++ ){
				var lx = parseInt(cx) + parseInt(chkptn[j][0]);
				if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
					continue;
				}
				var ly = parseInt(cy) + parseInt(chkptn[j][1]);
				if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
					continue;
				}

				// 現座標からの移動距離－１を求める
				var dist = parseInt(mapdata[cx][cy]) - 1;
				var level = resdata[lx][ly].substr(resdata[lx][ly].indexOf("★")+1,1);
				if( resdata[lx][ly].indexOf("個人本拠地/拠点") >= 0 ){
					level = 0;
				}

				// 該当する座標？
				if( (mapdata[lx][ly] >= 0) && (parseInt(mapdata[lx][ly]) == dist) && (level == lowLevel) ){
					// 座標登録
					maxpos = maxpos + 1;
					posdata[maxpos] = parseInt(ly) * 20 + parseInt(lx);

					break;
				}
			}
		}
	}

	//----------------//
	// ルート情報表示 //
	//----------------//
	var baseText = $e('//*[@id="routeInfoText"]');
	checkBox1 = $e('//*[@id="ckRouteMode2"]');
	var rollover = $d("rollover");
	var text = '';
	for( var i = maxpos; i >= 0; i-- ){
		var cx = parseInt(posdata[i]) % 20;
		var cy = Math.floor(parseInt(posdata[i]) / 20);

		// areaデータを取ってみる
		var area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + (parseInt(bx) + cx) + "&y=" + (parseInt(by) - cy) + "#ptop\"]");
		if( area_pos == null ){
			area_pos = $x("//map[@id=\"mapOverlayMap\"]//area[@href=\"land.php?x=" + (parseInt(bx) + cx) + "&y=" + (parseInt(by) - cy) + "\"]");
		}
		var list3 = area_pos.getAttribute("onmouseover").match(/'(\d+)px', '(\d+)px/);

		// クリックしたポイントに画像を埋め込む
		var img = d.createElement("img");
		img.style.position = "absolute";

		img.style.left = list3[1] + "px";
		img.style.top = list3[2] + "px";

		// アイコンの決定
		if( (i != 0) && (i != maxpos) ){
			img.src = ricon;

			if( viewSize == 15 ){
				img.style.width = "44px";
				img.style.height = "44px";
				img.style.zIndex = 227;
			} else if( viewSize == 20 ){
				img.style.width = "33px";
				img.style.height = "33px";
				img.style.zIndex = 402;
			} else {
				img.style.width = "60px";
				img.style.height = "60px";
				img.style.zIndex = 123;
			}
			img.name = "routeIcon";
			img.id = (parseInt(bx) + cx) + "_" + (parseInt(by) - cy);	// 座標をイメージのIDにする
			rollover.parentNode.insertBefore(img, rollover.nextSibling);
		}

		if( text != '' ){
			text = text + '<br>';
		}

		// 資源表示での出力切り替え
		if( checkBox1.snapshotItem(0).checked == false ){
			// 資源出力あり
			text = text + '(' + (parseInt(bx) + cx) + ',' + (parseInt(by) - cy) + ')&nbsp;&nbsp;' + resdata[cx][cy];
		}
		else{
			// 資源出力なし
			if( resdata[cx][cy].indexOf("★") >= 0 ){
				text = text + '(' + (parseInt(bx) + cx) + ',' + (parseInt(by) - cy) + ')&nbsp;&nbsp;'
					+ resdata[cx][cy].substr(0,2);
			}
			else{
				text = text + '(' + (parseInt(bx) + cx) + ',' + (parseInt(by) - cy) + ')&nbsp;&nbsp;' + resdata[cx][cy];
			}
		}
	}

	// ルート表の表示
	baseText.snapshotItem(0).innerHTML = text;

	return true;
}

//-----------------------//
// 自動ルート構築(51x51) //
//-----------------------//
function makeAutoRoute_51(checkmode)
{
	//------//
	// 定数 //
	//------//
	var MAP_NONE  = -1;    // 未処理
	var MAP_NPC   = -2;    // NPC砦
	var MAP_WALL  = -3;    // 壁
	var MAP_START = 0;     // 起点
	var MAP_END   = -999;  // 目的地

	//------------------//
	// 画面サイズの取得 //
	//------------------//
	var viewSize;
	viewSize = getViewSize();
	if( viewSize != 51 ){
		return false;
	}

	//--------------------------//
	// 同盟検索オプションの取得 //
	//--------------------------//
	var checkBox1;
	var userName = new Array();
	var userText;
	var fullmatch = new Array();
	var target = new Array();
	for( var i = 0; i < 3; i++ ){
		fullmatch[i] = 0;
		target[i] = 0;
	}

	// 個人・同盟検索１
	checkBox1 = $e('//*[@id="ckEnable1"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[0] = 1;
		}
		else{
			target[0] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch1"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[0] = 1;
		}
		else{
			fullmatch[0] = 0;
		}
		userBox = $e('//*[@id="userBox1"]');
		userText = userBox.snapshotItem(0).value;
		userName[0] = new Array();
		userName[0] = userText.split(OWNER_SPLITKEY);
	}
	else{
		userName[0] = "";
	}

	// 個人・同盟検索２
	checkBox1 = $e('//*[@id="ckEnable2"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[1] = 1;
		}
		else{
			target[1] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch2"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[1] = 1;
		}
		else{
			fullmatch[1] = 0;
		}
		userBox = $e('//*[@id="userBox2"]');
		userText = userBox.snapshotItem(0).value;
		userName[1] = new Array();
		userName[1] = userText.split(OWNER_SPLITKEY);
	}
	else{
		userName[1] = "";
	}

	// 個人・同盟検索３
	checkBox1 = $e('//*[@id="ckEnable3"]');
	if( checkBox1.snapshotItem(0).checked == true ){
		// 個人・同盟の別
		checkBox2 = $e('//*[@id="ckType3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			target[2] = 1;
		}
		else{
			target[2] = 2;
		}
		// 完全一致
		checkBox2 = $e('//*[@id="ckFullMatch3"]');
		if( checkBox2.snapshotItem(0).checked == true ){
			fullmatch[2] = 1;
		}
		else{
			fullmatch[2] = 0;
		}
		userBox = $e('//*[@id="userBox3"]');
		userText = userBox.snapshotItem(0).value;
		userName[2] = new Array();
		userName[2] = userText.split(OWNER_SPLITKEY);
	}
	else{
		userName[2] = "";
	}

	//--------------------------------------------//
	// 全体表示画面から、画面中央座標を手に入れる //
	//--------------------------------------------//
	var ckUser = $e('//*[@id="ckRouteUser"]');

	// 処理データの取得
	var href = $e('//*[@id="map51-content"]//li');
	var list2 = href.snapshotItem(1300).innerHTML.match(/x=([-]*\d+)&amp;y=([-]*\d+)#/);

	// 左上座標を求める
	var bx = parseInt(list2[1]) - 25;
	var by = parseInt(list2[2]) + 25;

	// 始点、終点座標を求める
	var sx = Math.abs(parseInt(autoroute_f[0]) - parseInt(bx));
	var sy = Math.abs(parseInt(autoroute_f[1]) - parseInt(by));
	var ex = Math.abs(parseInt(autoroute_l[0]) - parseInt(bx));
	var ey = Math.abs(parseInt(autoroute_l[1]) - parseInt(by));

	//------------------//
	// 探査レベルの取得 //
	//------------------//
	var listBox = $e('//*[@id="lsRouteLevel"]');
	var listBox2 = $e('//*[@id="lsSkipRes"]');
	var listBox3 = $e('//*[@id="lsSkipGroup"]');
	var limit = listBox.snapshotItem(0).selectedIndex + 1;
	var skipres = listBox2.snapshotItem(0).selectedIndex;
	var skipgrp = listBox3.snapshotItem(0).selectedIndex;

	//------------------------------//
	// マップデータをマトリックス化 //
	//------------------------------//
	// マップの作成
	var mapdata = new Array();
	var resdata = new Array();
	for(var i = 0; i < 51; i++ ){
		mapdata[i] = new Array();
		resdata[i] = new Array();
	}
	for(var i = 0; i < 51; i++ ){
		for(var j = 0; j < 51; j++ ){
			if( (i >= viewSize) || (j >= viewSize) ){
				mapdata[i][j] = MAP_WALL;	// 画面外は壁扱い
			}
			else{
				mapdata[i][j] = MAP_NONE;	// 未処理エリア
			}
		}
	}

	//--------------------------------//
	// 領土の情報をマトリックスに反映 //
	//--------------------------------//
	for (var i = 0; i < href.snapshotLength; i++) {
		var elem = href.snapshotItem(i);

		list2 = elem.innerHTML.match(/x=([-]*\d+)&amp;y=([-]*\d+)#/);
		if( (list2 == null) || (list2 == undefined) ){
			continue;
		}

		// マトリックス上のオフセット計算
		var px = Math.abs(parseInt(list2[1]) - parseInt(bx));
		var py = Math.abs(parseInt(list2[2]) - parseInt(by));

		// 座標の取得
		var list = elem.innerHTML.match(/x=([-]*\d+)&amp;y=([-]*\d+)#/);
		if( (list == null) || (list == undefined) ){
			continue;
		}

		// 土地レベルの取得
		var p = elem.innerHTML.match(/戦力<\/dt><dd>(.*)<\/dd><dt class=/);
		if( p != undefined ){
			land = p[1];
			landLevel = land.length;
		}
		else{
			landLevel = 0;
		}

		// 空き地状態の取得
		var space = 0;
		if( elem.innerHTML.indexOf(">空き地<") >= 0 ){
			space = 1;
		}

		// 同盟名、個人名の取得
		var user;
		var group;
		p = elem.innerHTML.match(/君主名<\/dt><dd>(.*)<\/dd><dt>座標/);
		if( p != undefined ){
			user = p[1];
		}
		p = elem.innerHTML.match(/君主名<\/dt><dd>(.*)<\/dd><dt>人口/);
		if( p != undefined ){
			user = p[1];
		}
		p = elem.innerHTML.match(/同盟名<\/dt><dd>(.*)<\/dd><dt>戦力/);
		if( p != undefined ){
			group = p[1];
		}
		p = elem.innerHTML.match(/同盟名<\/dt><dd class=&quot;bottom-popup-r&quot;>(.*)<\/dd><\/dl>/);
		if( p != undefined ){
			group = p[1];
		}

		// 資源の取得
		var res = elem.innerHTML.match(/.*木(\d+)&amp;nbsp;岩(\d+)&amp;nbsp;鉄(\d+)&amp;nbsp;糧(\d+).*/);
		if( res == undefined){
			res = new Array();
			res[1] = 0;
			res[2] = 0;
			res[3] = 0;
			res[4] = 0;
		}

		//----------------//
		// 領地のチェック //
		//----------------//
		// NPC砦判定
		if( elem.innerHTML.indexOf("npc-red-star") >= 0 ){
			// NPC砦名
			var casname = elem.innerHTML.match(/bigmap-caption&quot;>(.*)<\/dt><dd class=/);

			// NPC砦
			mapdata[px][py] = MAP_NPC;

			// リソース情報
			resdata[px][py] = "★" + landLevel + "&nbsp;(" + casname[1] + ")";
		}
		else if( space == 0 ){
			// 個人領土
			if( (ckUser.snapshotItem(0).checked == false) || ((ckUser.snapshotItem(0).checked == true) && (landLevel == 0)) ){
				mapdata[px][py] = MAP_WALL;   // 個人領土を対象外、あるいは対象かつ拠点の場合、壁とみなす
			}

			// 同盟指定
			if( (ckUser.snapshotItem(0).checked == true) && (skipgrp > 0) ){
				// 同盟指定ありの場合、指定条件にマッチしない領土は壁とみなす

				var matchcase = false;    // マッチしたパターン
				var groupNo = skipgrp - 1;
	
				// 個人・同盟マッチチェック
				for( var k = 0; k < userName[groupNo].length; k++ ){
					// 検索有効時 username に値が入る
					if( userName[groupNo][k] != "" ){
						// ターゲットが個人
						if( target[groupNo] == 1 ){
							// 完全一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 1) && (user == userName[groupNo][k]) ){
								matchcase = true;
								break;
							}
							// 部分一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 0) && (user.indexOf(userName[groupNo][k]) != -1) ){
								matchcase = true;
								break;
							}
						}
						// ターゲットが同盟
						else{
							// 完全一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 1) && (group == userName[groupNo][k]) ){
								matchcase = true;
								break;
							}
							// 部分一致かつ、ユーザー名が一致
							if( (fullmatch[groupNo] == 0) && (group.indexOf(userName[groupNo][k]) != -1) ){
								matchcase = true;
								break;
							}
						}
					}
				}
				if( matchcase == false ){
					// マッチしない場合は壁扱い
					mapdata[px][py] = MAP_WALL;
				}
			}

			// リソース情報
			if( landLevel != 0 ){
				resdata[px][py] = '★' + landLevel + '&nbsp;(' + res[1] + ',' + res[2] + ',' + res[3] + ',' + res[4] + ')';
			}
			else{
				resdata[px][py] = '個人本拠地/拠点';
			}
		}
		else{
			// リソース情報
			resdata[px][py] = '★' + landLevel + '&nbsp;(' + res[1] + ',' + res[2] + ',' + res[3] + ',' + res[4] + ')';
		}

		//----------------//
		// ルート特殊処理 //
		//----------------//
		// 土地レベルでの判定
		if( (landLevel > limit) || (mapdata[px][py] == MAP_NPC) ){
			// レベル超過の土地とNPC砦は壁扱いとする
			mapdata[px][py] = MAP_WALL;   // 壁扱い
		}
		
		// 資源回避での判定
		if(    (season1[cchkres[skipres]][1] == res[1])
		    && (season1[cchkres[skipres]][2] == res[2])
		    && (season1[cchkres[skipres]][3] == res[3])
		    && (season1[cchkres[skipres]][4] == res[4]) ){
			// 回避条件に一致する資源は壁扱いとする
			mapdata[px][py] = MAP_WALL;   // 壁扱い
		}

		// 始点、終点特例
		if( ((px == sx) && (py == sy)) || ((px == ex) && (py == ey)) ){
			mapdata[px][py] = MAP_NONE;   // 始点と目的地はルートに加える
		}
	}

	//--------------------//
	// 始点情報の埋め込み //
	//--------------------//
	mapdata[sx][sy] = MAP_START;

	// 探索情報設定
	var posdata = new Array();
	var maxpos = 0;
	posdata[0] = parseInt(sy) * 51 + parseInt(sx);

	for( var i = 0; i <= maxpos; i++ ){
		var cx = parseInt(posdata[i]) % 51;
		var cy = Math.floor(parseInt(posdata[i]) / 51);

		for( var j = 0; j < chkptn.length; j++ ){
			var lx = parseInt(cx) + parseInt(chkptn[j][0]);
			if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
				continue;
			}
			var ly = parseInt(cy) + parseInt(chkptn[j][1]);
			if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
				continue;
			}

			// 現座標からの移動距離＋１を求める
			var dist = parseInt(mapdata[cx][cy]) + 1;
			// 編集可能？
			if( (mapdata[lx][ly] == MAP_NONE) || (mapdata[lx][ly] == MAP_NPC) ){
				// 距離更新
				mapdata[lx][ly] = dist;

				// 座標登録
				maxpos = maxpos + 1;
				posdata[maxpos] = parseInt(ly) * 51 + parseInt(lx);
			}
			else if( (mapdata[lx][ly] > 0) && (parseInt(mapdata[lx][ly])) > dist ){
				// 距離更新
				mapdata[lx][ly] = dist;

				// 座標登録
				maxpos = maxpos + 1;
				posdata[maxpos] = parseInt(ly) * 51 + parseInt(lx);
			}
		}
	}

	// 事前チェックオンのとき、結果だけ返す
	if( checkmode == "1" ){
		if( mapdata[ex][ey] < 0 ){
			return false;
		}
		else{
			return true;
		}
	}

	// 終点にたどりつけたか？
	if( mapdata[ex][ey] < 0 ){
		alert("目的地に到達するルートを構築できませんでした。構築条件を見直してください。");
		return false;
	}

	//--------------------//
	// サーチルート逆探査 //
	//--------------------//
	posdata[0] = parseInt(ey) * 51 + parseInt(ex);
	maxpos = 0;

	for( var i = 0; i <= maxpos; i++ ){
		var cx = parseInt(posdata[i]) % 51;
		var cy = Math.floor(parseInt(posdata[i]) / 51);

		if( (cx == sx) && (cy == sy) ){
			break;
		}

		// コースとして通過可能な最小資源の土地を調べる
		var lowLevel = 9;
		for( var j = 0; j < chkptn.length; j++ ){
			var lx = parseInt(cx) + parseInt(chkptn[j][0]);
			if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
				continue;
			}
			var ly = parseInt(cy) + parseInt(chkptn[j][1]);
			if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
				continue;
			}

			// 現座標からの移動距離－１を求める
			var dist = parseInt(mapdata[cx][cy]) - 1;
			// 該当する座標？
			if( (mapdata[lx][ly] >= 0) && (parseInt(mapdata[lx][ly])) == dist ){
				var level = resdata[lx][ly].substr(resdata[lx][ly].indexOf("★")+1,1);
				if( resdata[lx][ly].indexOf("個人本拠地/拠点") >= 0 ){
					level = 0;
				}
				if( lowLevel > level ){
					lowLevel = level;
				}
			}
		}

		//--------------------------//
		// 固定・ランダム構築の分岐 //
		//--------------------------//
		checkBox1 = $e('//*[@id="ckRouteRandom"]');
		if( checkBox1.snapshotItem(0).checked == true ){
			//--------------------//
			// ランダムルート構築 //
			//--------------------//

			// パターン乱数の算出
			var pattern;
			var rptn = new Array(2);
			pattern = Math.floor(Math.random() * 30);
			if( pattern < 24 ){
				// 十字優先のパターン(80%の確率でこちら)
				rptn[0] = pattern;

				// 後半4パターンの決定
				pattern = Math.floor(Math.random() * 24);
				rptn[1] = pattern + 24;
			}
			else{
				// ×字優先のパターン(20%の確率でこちら)
				pattern = Math.floor(Math.random() * 24);
				rptn[1] = pattern;

				// 前半4パターンの決定
				pattern = Math.floor(Math.random() * 24);
				rptn[0] = pattern + 24;
			}

			// ルート探索
			for( var j = 0; j < 8; j++ ){
				var rno;
				var offset;
				if( j < 4 ){
					rno = rptn[0];
					offset = j;
				}
				else{
					rno = rptn[1];
					offset = j - 4;
				}

				var lx = parseInt(cx) + parseInt(chkptn_r[rno*4 + offset][0]);
				if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
					continue;
				}
				var ly = parseInt(cy) + parseInt(chkptn_r[rno*4 + offset][1]);
				if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
					continue;
				}

				// 現座標からの移動距離－１を求める
				var dist = parseInt(mapdata[cx][cy]) - 1;
				var level = resdata[lx][ly].substr(resdata[lx][ly].indexOf("★")+1,1);
				if( resdata[lx][ly].indexOf("個人本拠地/拠点") >= 0 ){
					level = 0;
				}

				// 該当する座標？
				if( (mapdata[lx][ly] >= 0) && (parseInt(mapdata[lx][ly]) == dist) && (level == lowLevel) ){
					// 座標登録
					maxpos = maxpos + 1;
					posdata[maxpos] = parseInt(ly) * 51 + parseInt(lx);
	
					break;
				}
			}
		}
		else{
			//----------------//
			// 固定ルート構築 //
			//----------------//
			// ルート探索
			for( var j = 0; j < chkptn.length; j++ ){
				var lx = parseInt(cx) + parseInt(chkptn[j][0]);
				if( (parseInt(lx) < 0) || (parseInt(lx) >= viewSize) ){
					continue;
				}
				var ly = parseInt(cy) + parseInt(chkptn[j][1]);
				if( (parseInt(ly) < 0) || (parseInt(ly) >= viewSize) ){
					continue;
				}

				// 現座標からの移動距離－１を求める
				var dist = parseInt(mapdata[cx][cy]) - 1;
				var level = resdata[lx][ly].substr(resdata[lx][ly].indexOf("★")+1,1);
				if( resdata[lx][ly].indexOf("個人本拠地/拠点") >= 0 ){
					level = 0;
				}

				// 該当する座標？
				if( (mapdata[lx][ly] >= 0) && (parseInt(mapdata[lx][ly]) == dist) && (level == lowLevel) ){
					// 座標登録
					maxpos = maxpos + 1;
					posdata[maxpos] = parseInt(ly) * 51 + parseInt(lx);

					break;
				}
			}
		}
	}

	//----------------//
	// ルート情報表示 //
	//----------------//
	var baseText = $e('//*[@id="routeInfoText"]');
	checkBox1 = $e('//*[@id="ckRouteMode2"]');
	var text = '';
	for( var i = maxpos; i >= 0; i-- ){
		var cx = parseInt(posdata[i]) % 51;
		var cy = Math.floor(parseInt(posdata[i]) / 51);

		// areaデータを取ってみる
		var elem = $x("//div[@id=\"map51-content\"]//a[@href=\"/land.php?x=" + (parseInt(bx) + cx) + "&y=" + (parseInt(by) - cy) + "#ptop\"]");

		// アイコン表示
		var newhtml;
		if( elem.innerHTML.indexOf("<B>") >= 0 ){
			newhtml = elem.innerHTML.replace(/<font>.*<\/font>/,"<font style=\"border-style: solid; border-color: cyan; background-color:cyan;\">　</font>");
		}
		else{
			newhtml = elem.innerHTML.replace(/<b>.*<\/b>/,"<font style=\"border-style: solid; border-color: cyan; background-color:cyan;\">　</font>");
		}
		elem.innerHTML = newhtml;

		if( text != '' ){
			text = text + '<br>';
		}

		// 資源表示での出力切り替え
		if( checkBox1.snapshotItem(0).checked == false ){
			// 資源出力あり
			text = text + '(' + (parseInt(bx) + cx) + ',' + (parseInt(by) - cy) + ')&nbsp;&nbsp;' + resdata[cx][cy];
		}
		else{
			// 資源出力なし
			if( resdata[cx][cy].indexOf("★") >= 0 ){
				text = text + '(' + (parseInt(bx) + cx) + ',' + (parseInt(by) - cy) + ')&nbsp;&nbsp;'
					+ resdata[cx][cy].substr(0,2);
			}
			else{
				text = text + '(' + (parseInt(bx) + cx) + ',' + (parseInt(by) - cy) + ')&nbsp;&nbsp;' + resdata[cx][cy];
			}
		}
	}

	// ルート表の表示
	baseText.snapshotItem(0).innerHTML = text;

	return true;
}

//--------------------//
// 出兵アイコンクリア //
//--------------------//
function attackIconClear() {
	// 出兵アイコンのクリア
	var checkBox = $e('//*[@id="ckUnion"]');

	// マップに埋め込んだマーク画像を全部消す
	var rollover = $d("rollover");

	// 無効なら画像を消す
	if( checkBox.snapshotItem(0).checked == false ){
		// すでに画像が登録されてるか調べる
		var en = $e('//*[@name="atkIcon"]');
		if( en.snapshotLength > 0 ){
			// 画像がいたら消す
			for( var i = 0; i < en.snapshotLength; i++ ){
				var ex = en.snapshotItem(i);
				var ex_p = ex.parentNode;
				ex_p.removeChild(ex);
			}
		}
	}
	else{
		// 出兵情報マッピング
		unionAttackInfo();
	}
}
