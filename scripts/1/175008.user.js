// ==UserScript==
// @name           bro3_npc_castle_info2
// @namespace      http://homepage3.nifty.com/Craford
// @include        http://*.3gokushi.jp/map.php*
// @include        http://*.3gokushi.jp/big_map.php*
// @include        http://*.1kibaku.jp/map.php*
// @include        http://*.landsandlegends.com/map.php*
// @description    ブラウザ三国志NPC砦情報取得_2nd
// @version        2.49
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
// ver2.40 2011.03.30 ドワクエ Craford 51x51モードに自動ルート構築実装
// ver2.41 2011.03.31 ドワクエ Craford mixi鯖でsmallmap表示をするとマップが一部クリックできなくなる問題に対処
// ver2.42 2011.03.31 ドワクエ Craford Chromeで51x51モードの処理が正しく動くように修正
// ver2.43 2011.03.31 ドワクエ Craford 51x51のルート表示だけでない問題に対処？
// ver2.44 2011.04.01 ドワクエ Craford 51x51のルート構築で、資源判別がオフのときにルートが描画されない問題に対応
// ver2.45 2011.04.01 ドワクエ Craford 51x51のルート構築で、Chromeのときに出力結果がおかしくなる問題に対応
// ver2.46 2011.04.10 ドワクエ Craford 同盟着色モードで、自同盟配下を着色対象外とする機能を追加
// ver2.47 2011.04.14 ドワクエ Craford マップパーツ変更にともなう着色ずれを修正
// ver2.48 2011.04.16 ドワクエ Craford マップパーツを以前のバージョンにもどせるようにした
// ver2.49 2011.04.24 ドワクエ Craford 左上から左方向9マス目が旧マップにならない問題、および領地着色枠がずれてしまう問題に対応

var DELIMIT1 = "#$%";
var DELIMIT2 = "&?@";
var OWNER_SPLITKEY = " ";
var VERSION_KEY = "vtX200";
var VERSION = "2.49";

// データフラグ（初期値）
var FLAG1 = "1000000000";
var FLAG2 = "0000000  0  0  000000000000";
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
var FLAG2_OLDDESIGN = 25;       // 旧式マップ
var FLAG2_NOEXEC51 = 26;        // 51x51モードでツールを動かさない

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
var autoroute_f2 = [0,0];

var autoroute_path = new Array();
var autoroute_maxpaths = 0;

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

//----------------------//
// レーダー描画アイコン //
//----------------------//
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

//----------------------------//
// マップチップ回復用アイコン //
//----------------------------//
var icon_map = new Array();
icon_map['territory_b_s.png'] = 'data:image/png;base64,'+
		'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'+
		'LMiz5m1Pu0wAAAAASUVORK5CYII=';
icon_map['territory_r_s.png'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAA'+
		'DQlJREFUeNrsW2tsFNcVPvOe3dmnvX5hg9f4ASYPnPCIKeAHISlKaEMUklbpj1hqS1QlUp0oUpOqP4zUH0nVFKQqqtRWrfOn'+
		'SqsoCjSE0DTBhDQVBcLD2PiB8Qvj9Qvvep8zs7Pbc+/sro3B1BCCkmavdLWPuTNzv/ud853vzmqZZDIJ36TGwjesZQFnAWcB'+
		'ZwFnAWcBZwFnAWcBZwFnAWcBZwFnAWcBZwFnAWcBZwEvoj25Yclq7I99kxjesTUebP5GAP7LCw+VlhfmNm2NhxrO11r2/N8D'+
		'vtB/wavGwl7yXlRjzX33MYex19+p+/N3gNGf4ksD9tan93y4LxwOgT9izB1CjrW1b3ZAwG5vKxq93FJ+KnnkawvYN+7ba7FY'+
		'IBaLuvDjvoXGWUNB0il4ZBx+7/Ewc4+/9uHEVw8wsunElybsfmTzTfJdb39P5viuB/hnrBbrq4u57eq7aw6T62BvPnPu9OBX'+
		'MocnpiaI8u7VNK31Nz+4h+Yl+bGOdIZhap12Z6skSL5FRkbDyOjIjr6BviVfmZAmiosvRIBOI6OBC/290N3XRcCBzWKjjLKs'+
		'uaYsw8awbyurKt82frqn5reiG3ZBeEzStILrXbuj5xyIgggOxRFK3YvU7RpyL2R8362G+BcN6YHUawv23eRNIpGgX6i6+hYy'+
		'WhgMB+lnQRJ9dd9ubA34g1ShxxgWTm+pLyidujLJnzzl9hgJbv7F5/6U6w/4X2Q59n5VVc/fSAu+VMAnTh8HURQhGovC0/jZ'+
		'SBg16WOp0P0+ESHyWbEpKzlRhrwlTli2fBLGJ/3gzHGBP8fl+bivD7hQCFZwwsTdmn5giucfgXgsn5wXjobXKhalvaP7nFvg'+
		'BRveQ7HK1nSEpcsZYT2wGNYXncOtz9fvwRsksU+nv9PjOvhn/BCPx73PbbT0I8gd6WMYuh8QRim7vAAsywHHS5BMGCBJAvCC'+
		'AAzL0y6JEkRwzOXiwrzJ7z3eMLym5o/p61gky58isQgRMAXBQiKZoCT9YdeGutRitoUj4edvO8MdXR01gkCGM675xzDXmrC3'+
		'xbRYW0qlweF0vIzJDBsbGiASjoLb48EQTdDOcuYCCLJCz2/c/p3ZME4YXpfH8/MMIyz7C2T0Rwjaaw4Aa8rADPiDfuA5smhM'+
		'XEldCwlZTVJtIcb5G4hRa+rjXmIYdF3D8ArRHP3hOqYeJ9GSHo+r3opstvV0du3tPt9Fv2NwIoIigbssDIW+VZlrMxwGFcMs'+
		'uLAMLgQvSFT4SFu76YHnrIr1lYPvvvdL/K4EF6CEMI5s/y5uxOk4njVhvPl8w98FQdiOuR8hEbFohon943m+gWUZ0DS9LS0S'+
		'HE6GAHY73G34fgBvTMd7y8tIKDcVlRRDaCYEFkUBlycf9JxB0PJ6IW4fBWnsLuBnChcVTQ63Gx55fCdhFxBska6GW1EDtEg4'+
		'QoTMhzntxTT6q6qpV513rqvdT87RdF0XMUWuC/hnD+WRIp8uL34MhTPkQCAUoDnqcXkoozarLSNICLYJGYUP9h2gUYCrTMPc'+
		'7rDDus0bgRNkOi7i8EGSVSGOlYUPFi0aML2W05l5L0gKMs+KNKetlty6hxt//Mmhw7n48XUzDZK7Jv2Tb+Ec2dQiSKLNCSls'+
		'zlQ5o9gow5qmvi2K0lrDMIizcc+9saZrTU6bswVzJ5YAs+QgWBLOXk9+PkQjEbA5nAhSAt09DEzSCly4OHN+Qg6bixTJueVq'+
		'QISuZs39MDU5CTa7nVDXur6u9tL7+98zK4IoubEPYIhfnH9uMBR8zW6zP4vaESPrRQGfOHNCTdXQpF2xE2YLiBhwHEcEibDX'+
		'hMLwsh7RV9LJC5KX5UX41oNbr7p4xNsJRtgNhjYBEuat9eImSKoM6CWmvYwVnwZhetlNok2CEdeQcTvtmVzHfE6/d+W6/xkO'+
		'hA7g2zdIymE6Csh4KUbnYGd3B0PyPJ6Iq0TY+JToiGQgmkApFAn92WF3NK2tWWcW/Bn/WGl1WUvH6GGv+jkHVpuSCdn5zVCu'+
		'QJJXwYAxkEfMDBDUfEiEJkFXhkEtOYdjpjCnMTp9woIAE8hoMhHHThSdpyE9X+g40Qpe73IkhYHK6pVPYq6vO/nZf3orSivJ'+
		'jbnhkeGBoZHBViSNYsOcl64RLQYYKwrCDiNuvHGq/fPniADgqq5Yas+FssZpqNxeCKyKq3xxYUISUviqXNVzhmi114p6gdFJ'+
		'2A9BkilFXBxGQoyCSyGloZspR1i6eNGyoKJzKEq1jVvoOShqZKG86Obg5NkTBByxsu+iM9tB9GWuY5tvPIzUgJ8QSxgIBoAM'+
		'ZZFQvbMIovurIdy2sPBYzmwBNuSkLGUI4zQwrMi8gFnDGum70HpsxNUUk/FZsKTMIFBesi4IllwzVH0Qpn1DMNk3DMGxgBna'+
		'OW5AEwIYpag2icdkUXahwPoWdFq4Isz6ug1QUGnLfK9rOOGgBcZ7ojAwPAA93X2gFnZedyJSdBnIHZuBG1oOcS0KCUMHqX8t'+
		'RoXNPH52EzAxK7hwzQrznPMKMEOFT5TtQPThRo1GCa9B98BpOqehocG0S5ndXzt5Zt1OLxQsKbyqHvOouM8c/fjIvf7paRLS'+
		'rGyRofS7Glw4Yw4gdfXou5+A6GJgamQQJFnAFTY3OMGxSTD0OMgOG+1k0iLkQTKUAwlGhwSWNfBbQf7sYVDvOwoQ50A+VQdl'+
		'xFauEnE4Rx0Xg+JIQvhGzcAwDU9cMSedG6FRE4zyMDMyDeQBw9RHVyCBc0m33LVRkNFzs1zUbhoaViJYSQ57S8u8Bm7MQVYs'+
		'19xoyfICjEQJhgcGUyUCV1g1gMhWX08XiOiPOVmEFfetvsotEZNylf3s3j4bU+LNl6ZIMASDF03xKEGbypYJEI+YqRNHoAUF'+
		'OVBaWQFHPjw0O4+4AHn5eaDFNBK9OsHKlSTHj9y7tuaNJUuLY/kF+UTh5OSMHfraTYB5hQWworqa+mESBSyycumMHwTc+XSf'+
		'78BdzxjY0CQUlZRQFmL+GdCjMcxBMWMPb6Wp6Kq0UJg6O14UgFjbUyeOwej4ZbB6OOh6JwZqwNyOWpCsum3bSDmCns4O+l3e'+
		'Ch489qVg4/P9hcVFr2JoP4Fm5RCfMtgk63cf+PVTe8kjFSHqas7JyXWpRhgtopLKbyad5xgSldBz5ixVw7ktMDEFM+MTEDcM'+
		'KKmqANmm3DLgy339aGKSuHASlKysvGqPfOnkNLjKRBSmKOgTZE6cKZSGCi6XCxcnDrmxqgjr9/yK7AUefelvVNUefWleWSIH'+
		'0I7txljfu7FxM3lcQ/q83REDq9D1LK9eCe+/8zbdrfhGLsFA3wWwKTY4duoY3Q6WrKwyw03VzHqKOy2O5xdwUgk6jtZti1nj'+
		'+wb7UD9m0FcjADyt91xHZnz5Ezrkro/A8Vf5TO3WYkEyNdj8YANxi4S4vcjoNTuma2ZwPcZJl2WLi4CTMFTJDWSrlWzL0ttD'+
		'yjjHc5lnWOk2OXQJUJIggblbUO69LmA/iYpglJ7nWloEIoImYUn2vxEMa3Jtd04u+KLmZkUp0VHtFZBdGkRGeRQnicwpA3Qu'+
		'oze1H06dSIEvrypvJp0wTlaTup9Uy0FP7a2ogG6c2MSUuaLDg/3ogFbB+Z5OCCJTTtwBLQR4bHwMutrP0px/tOwpGPeNghqL'+
		'0c+kr6+vx/zkwHfwsnkCljb5eB3U7DwJ4vk1ARSnPXOBfuEHACQ0CHAS6pTxZLIZ3Y2LlBTiTMg2kmzwK+5aBQNDppJe7DwP'+
		'/d09mM863XUZKWMRV1UIjJqL4ijMA0GWzLKTOn7syBEIBQLmPhcjyqJYcbGcEPRfmXVZjEAU2C+112ZCdyFGbwnwnDyYDXUE'+
		'veXhrS/quuFw5nquOaemthYuXeyHkUtDmdJBWhSZ6+7uBAHToNImgwsBR8KhWfMiSrAKGT3+r08hhjsxNPq4SBFUYhnqHmwg'+
		'6xtUBpTX/1fo3tbn0uRGuKq7JVlaZrNbWwwt4ifOitjFdHO6c2DN5k0gSiaDZPKfHt0Pk2onDF0egtGxyzCRaIdPPjoIo8PD'+
		'swu1oRbcubkZe5qEjB74cePSotiUpeTeaVZvtjG3418tyDjxic2ots293Rdcis0GpRWV1EX9Y/8+zOEAOJwucCyLQ6CPgSsz'+
		'V4A8eSRip+SIVACHekfotbbvfALFNgETvjEIo2C5c3OCTpfz9cXm6B355SHNONo3b1V1VUvx0iX+OO5gtOiMac1I3mH9XvHs'+
		'DCx/Kpo5b1kjC/e8MgWKbXafa+gqZTevIN/vLS9rQbCU0dsB9rb+trRQOauoqnRNjk+ikqMdDOlYUmbz1bHKfBpSlFcCM8VB'+
		'sCDTuH9dVHm51cZ8mX/USod62sAkeR1mrF3w0R+6aEivfxzdWH0HWP69jeyibmgYvhaArwc8Fo25Dr33PsiSDJsa60GxK9cw'+
		'+mU25k7+FS8N3IgbLxD1RbO/504BTbf/CjAADQTHuhvNaxIAAAAASUVORK5CYII=';
icon_map['territory_bk_s.png'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3Ag'+
		'SUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKg'+
		'KLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADw'+
		'A3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4F'+
		'ANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMe'+
		'E80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q'+
		'5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQ'+
		'yDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK'+
		'8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mP'+
		'QCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqg'+
		'EZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPy'+
		'LXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlh'+
		'XIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6'+
		'EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BP'+
		'kvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3'+
		'aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKV'+
		'OpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3'+
		'xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqt'+
		'Zq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83'+
		'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2U'+
		'a5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1lds'+
		'UBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTD'+
		'qcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY'+
		'4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7'+
		'+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6'+
		'MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xq'+
		'bFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WD'+
		'IEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSc'+
		'lJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuC'+
		'Fny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRa'+
		'uWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19t'+
		'St50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLd'+
		'jxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPc'+
		'w83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8'+
		'mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f4'+
		'1y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJH'+
		'zEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O'+
		'233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAA'+
		'ADqYAAAXb5JfxUYAAA1JSURBVHja7JtrbFRXfsB/577n3hnPjB/YEAePATtAsoUkQMgGbCZZQrShDdGSdJV+CNJ2s6oSqWYb'+
		'aXerfgApUnerZLEqrSp1pdb7BW3TVRXSPJalqQlsN83b5hVsMH5BsLGBGc977qsf5sHTKWGTKLvx+eLrOf9zzv2d//Pcqyt8'+
		'3+er1CS+Ym0OeA54DngOeA54DngOeA54DngOeA54DngOeA54DngOeA54DngO+AbaY/cuWPHYvQse+SppeEub1/hcPB7/+h89'+
		'8O7tG1sWN9Vte8uM3CF88dM/euCTwydjhXwmBuAL/554PP6/8Xi884taX/kCNPrXwAag54ld+/ZkMmkSWRe0lorIPcD+b3ds'+
		'xRSFd4al9PO9vb3//gcLPHFuojsQCJDP5yLAntnkJuXzAGuAF+PxOGuUI+Ly/p/sm/ryAe/evjEMbAMST+za9wuAE8OD1f6n'+
		'7lGeNAPmj29k2RV3rOwFEkBX/5G+0S+lD0+dn+oCuovFYs9P/+JrnQC+7+P7PkKIteFQuEdX9YkbtIwNZ86e2TI0MrTgS2PS'+
		'u7dvbAFiQN8Tu/YlTw6fYGDoOEIIgoEgT92jPClJpT2VhJSXhPRQa/vih871Da5cnO1n2Ljzgid5tdeb++jgETRVo8aqSZfX'+
		'egRYCfT1H+nbc7Mm/vua9Ej57w5gJ4DneQAU7MIvw6FwUyqTAkDVtYmOTfGeZCIVA8gIie+uV2sNVyv841tpzRe+uHryy1/l'+
		'JpKJ70uydFehUPjok2LB5wr8Xt+7aJpGLp/jCcD13JWVvrLpfhvYD2AFraWyZtCwIMzCRdOcm04QioQRkqzfqRxETqfp3Poo'+
		'L7wynUP4BiAAMrnMKitgHT46cCSqKmrQ9VzLNMyKhVXSWV//kb7kjWj9hn2455nOXbu3b/R3b994sfKb7dgkZhI4jhN7+r7A'+
		'sK7qWyp9re2Lf92xKd4DoCoqkiQjKzq+56LrKoqqIiS5tDmaTlZR+eCd9/ibzfWTf357/u8r8wT0wL9k89lewHI9F8/3FICf'+
		'P3VvR3kz92eymWc+cw0fPX50paoqgIhc3aep2jZN1fbni/n95ShNTbjmhwjBfRs2kM3kiNbX4/sevu8hyaUNUA0LgPjmP71k'+
		'xp4bi9TX/21VI5L0d6Zh/mU2n42VBDDLBcxIIpVAkRWEJByrPNfu7RtXACOzaVz5hGDUU/63+4ld+/bYdpFMLo3neXxnteg0'+
		'DXNHRd7zvZ6OTfH9g8eOdw98dBwAISuolk60NUPTxPLq3EKWQIhZN1ZIMoqqI8oyq9bd87RpmT96/aVXnhNCNEuS1JzNZ3td'+
		'z/0nx3UQQqBIJYxfPLPhP1VV3ez7fhawbljDJ4dPxhRF2SBJgmLR3l8JErIk43ke0ZroflmSR7L5LACxxa1bgG3zm28hPZMm'+
		'YFlE6udh145SbDiBEzqLPnk7ykzTDVlTTTTKNx/diiRJmJY53y5keqygVcxmsvi+P2EFrJjjOP9WKBauGHfk+OGEJEkUbdvW'+
		'FPX6Jv2DjQ2suGNlJb0k+o/09QMk00lsx6Y+Us93VovOoBmsBiRZkrd1bIrz6z2v9gAIUTLzUE2I1evvQ1YNALI1E/hSAacm'+
		'jZKaf8PAAKFwuHqt6hZCkjSAgBmo63gw/t0De3vrgBdKbuA/NZ2Y/mXQDErlTdC1YJgyW7iczhL9R/r6FYBisfArTdNXua6b'+
		'AKKXL1y0i9vCwfAOfPIepZTTsSm+A4jVz5tHLpslWBNGVnXs6DjCN5Ezt1THe0amtEnZ2pvOBr7nsvLuuzg/PU0wFFKBnjUd'+
		'a0+/9vIrlaAX1TV9xHGdU1ePTaVTPwkFQ9/zfS8PBBSA9/rfK5RzqB+yQtiO3ajICrIso6laBNgmJPFDO2svBZBVPSYpGl9/'+
		'4BtXTJ6NHcPNRHGLU+gTyzFPrcMvCOzmUnmZv6UP9eLCT0nr4zpFQuEQoXDokq8L0Vy5jtRF/yuTTL8K/MzzPBRFUacT0y31'+
		'kfrRYwNHhRACx3MKlmGVfNjzPc3zPHx8PZ1N/2tNqGbbqpWrSwl/JjHZsqx1x9GzvbHCBzJm0Kqa7NXNtS7gKwVcJjHOlDxA'+
		'LczDS09jW+MUmo/gWudxQhpMqLMCep6L7zn4nockK6i6dU2gkzWTWGwRsixoW7b0MdMyV7//u3dOLGlpWwnI42fGR8bOjPbI'+
		'sqx5nofjOPo1QUsgTCtgbXEd92cfHv7gaUmSCIVDt90aqqM1fpG2zU1IhRCcml0hnp65wlft2jGQoDj/BMLWsaNj+KIF35dx'+
		'i3k8z62Q4levQZJVFC0wa0SXFZW18fvxPRe7kAHfj6m6xvuH3sNxHCQhvSTJ0hYhROTyiu3qwsMtC/xVKpMimUriA5IB9rH5'+
		'5F5eRmb/7IEn0H8/UjoMly3gy0Vc8wK+WgDJrayC73u4TqGsSecSrBAoWgBFN2eF9eUi6WWvc3FijOmhcVKTyZJp10bJZDOk'+
		's2k8vEcMzYjIkjwxa6UlyZJY03EvjW3B6u92sYibCnBuMMfI+AiDA0MUmo5d90b03EKMo+uRxxbhFHN4ro0+vAqpECz1H1qH'+
		'yJtEmqCpIXxVAhbIqo5mhJAU7RPd2o6O4StFBkb6GBkfYWxstFKlVGXMsCJWb43RuKDpinysdGyKP3nwv9/8k8TFiwiEZAQM'+
		'Wv6syMn+kkB6Js3Blw6gRQTnz4yiGyq+3FiKgJPTuLaDURPEqAmCEGg04Kdr8YSN59iQMDF+9yCFOw+CI2N82EGrqiKWawgh'+
		'I0kyQpaRZPUTIV3HITN1oXTTdVlc8wKpnMLMmYsEAgHOv3EBz3aq8nWrchiGiSTnQqWCRtI7NsWfVIBYS2vMNQMmhhW4ZqEF'+
		'ixqRXJ3xkdFyigC74GIAQ4PH0RQd2dC47c4VV1RLcrlOrpafA5sv2ZT26VNTNpVm9FQpeDTX1yO1qjjZkus4tkNjYy0tbUt4'+
		'c9/eS/fhqDTMa6CYLyLJkg3ElAN7e3d2bIp3L2xt6QK6gIgydDtwoBQcZI32ZUuxbZvhU0P4Hhz855MsXxFm9PQojuOwqO22'+
		'qhYKM+mSP0dqENLNP18oZLK4hSKyrqFbJkKWGB47Ra6QQ25exJnnVOwZF/DQdJ2716+jmM9fM09DU2OioamxG+g+sLc3qZQL'+
		'7CSw89XnH+8GutRcpKu2ti5ScDNE6q2yf4uKnxNraWOw/xCO41wxeXLqPDPnpnBcl+b2JRhB66aBPx4aRvg+iq7TvLTtijPy'+
		'6fcvEmnV8MhhT4Eky6VA6RaIRCLYtkNdvj0rJer/Aeh++NkXkwAPP3tVWnr42ReTP9jYsLNjU7z7vvj6qsavii4sv/suFi1b'+
		'ymv/8SsUWWHizGlGhk4StIK8/eHbqIpK89L2krkViqV8qirIijJLJeXhFIqlvB0o5fih0SHSMzPURCPYCpw4crQqv/hbNnVr'+
		'srz7Y6Wau4v5FAhY/8CGBFDV6NUnpmvu4HoaB7oMIxBRZAVd18D3MUwTIYnK8ZDB/kPIilx9hlVp02OnkZHwJGhcHLsucOLc'+
		'FE4qh+/7RG6djxYw8DwP13PJpjMM9h8iWlvHRK50WLGabUTewogUyZ5VMAwdfL8KerlGP9V5uDxw56vPP969qH1x16L2xV1A'+
		'pJhPlaqfcqudN4/YkiUM9B9i6nxpR8dHh2lbtpyPBo+RmpkhHI3OCjx5bpLjhw8hhODh1sc5N3GWQj6PEAIhBGs6O1EUmYnX'+
		'Py4NyJsY73awcuv7aB/dnRSOuuty0N/7AcCBvb1JYGfHpnhJ477fZRcyEUmSwQdJEkTr61ly+3JGxkqR9NSxjxgeGMRxbWzH'+
		'xi0XFk6hQPJsaVNqmhpQDb0U8Mr9b7/5JulksnTOlRUClkk4GiaVuHCpyhIqwlET+uG1VdOdTaM3BXyZH1wydd/vuv/Bb3zf'+
		'tt2acF39NWNWrl3L6VPDnDk9Vk0dALl8noGBY6iqRlvQIGLoZDPpS8WLprO8s5N3/+e35LNZ8HycQpZAwKDjgQ34kLJGrBf+'+
		'P9P9TJ9LP/zsi8kDe3t36oa+MBgyd7jFbMIp5vB9ryoTjtZy9/p1aHpJg/lslt8efJnpwjHGPh7j7OTHTHmHOfDG65wdH7+0'+
		'UfeuJVpXVy1PfarxIGEGrR1W0Lr1wN7enRWtftomPouvWl59/vEw0OV7XteJgZMRKxikZUkbkiTzm5f3kJpJUhOOULPQITkk'+
		'uDBzAdMw0VQNq1bDME3GTpwBYPPWbyHwmJqYJJPOEK2rTYUj4Rdu1Ee/kDcPFY0LSYq1L2vfccutCxJOIUMxN1MqzQBZlrjt'+
		'ezMsejxXHbcwLvG1H53HCl4657p2AXyfhsZ5idji1h3hSPjWA3t7d34WsJ/pu6XZ0tmS9rbI9LlpaufVI6VtrOZL/lqzvPQ0'+
		'ZH5DMzO3pAiYJrIs31B6udkmPs8PtSqmXilgfMVmxjzOGz8/jmmYrHl0CUbnUQJvPYTIm59YMPxBAF8PPJ/LR/a+8hqGbrAu'+
		'3okVsq7R6OfZxBf5KV4F3HXc7T4+iqLs+qJAK+3/BgDqPrGwzlG2AAAAAABJRU5ErkJggg==';
icon_map['territory_bg_s.png'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3Ag'+
		'SUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKg'+
		'KLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADw'+
		'A3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4F'+
		'ANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMe'+
		'E80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q'+
		'5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQ'+
		'yDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK'+
		'8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mP'+
		'QCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqg'+
		'EZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPy'+
		'LXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlh'+
		'XIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6'+
		'EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BP'+
		'kvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3'+
		'aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKV'+
		'OpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3'+
		'xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqt'+
		'Zq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83'+
		'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2U'+
		'a5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1lds'+
		'UBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTD'+
		'qcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY'+
		'4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7'+
		'+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6'+
		'MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xq'+
		'bFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WD'+
		'IEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSc'+
		'lJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuC'+
		'Fny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRa'+
		'uWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19t'+
		'St50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLd'+
		'jxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPc'+
		'w83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8'+
		'mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f4'+
		'1y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJH'+
		'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'+
		'2WubZ18kUIt4nMMcKUeAVpyBnxnHsU9TbDqEZ1/Ajegwqk0J6Psege8S+D5SUdEM+7pEp+gWiUQriiJoW7jgGcu2lr3/m/89'+
		'Ma+5bQmgnB45PTg8MtSlKIru+z6u6xrXJS2BsOyQvc5zvR9+cPC3z0spiUQjd90ZqaOl4xJtTzQiixE4NbVBfCN7Vaw6tcMg'+
		'oTTrBMIxcOLDBKKZIFDwSgV835skJageg1Q0VD00ZUZXVI3lHY8Q+B5OMQtBkNAMnfcPvIfrukghX5WKXCeEiF1ZsV1beHiV'+
		'Ad9IZ9Ok0ikCQJrgHJlF/rWFZPdOnXhCvY8gM1G44gKBUsKzLhJoRZDe5FUIAh/PLVYs6V6GFQJVD6Ea1pSwgVIis/BNLo0O'+
		'M95/mvS5VNm1a+Nkc1kyuQw+/pOmbsYUqYxOWWlJRYr72x9kZlu4+rtTKuGlQ5w/nmfw9CDH+/opNh654Y0Y+TmYhx9GGW7F'+
		'LeXxPQdjYCmyGC73H1iBKFjEGqGxIXqNAAsUzUA3I0hV/8iwduLDBGqJvsEeBk8PMjw8NFmlVMdYUVUsezrBzNmNV+mx2r6m'+
		'49m3/2vfHyUvXUIgpBkyaf5yiZO95QGZiQxvv7ofPSa4MDKEYWoEysxyBjw3jue4mDVhzJowCIFOA0GmFl84+K4DSQvzN49R'+
		'/OLb4CqYH7TTommIRTpCKEipIBQFqWgfCem5Ltmxi+WbrsvhWRdJ51UmRi4RCoW48NZFfMetjq9bmsc0LaSSj5QLGmm0r+l4'+
		'VgUSzS0JzwpZmHbougvNbp2J9AxODw5VJAKcoocJ9B8/hq4aKKbOXV9cfFW1pEjl6vKz74nLPqV/cmnKpTMMnSonj6b6emSL'+
		'hpsrh47ruMycWUtz2zz27dl9+T5cjYYZDZQKJaQiHSCh7t/dvaV9Tce2OS3NnUAnEFP77wb2l5ODojN/4QIcx2HgVD+BD2//'+
		'6CSLFkcZOjOE67q0tt1VtUJxIlOO51gNQt76/kIxm8MrllAMHcO2EIpkYPgU+WIepamVke9pOBMe4KMbBvc9vIJSoXDdPA2N'+
		'M5MNjTO3Adv27+5OqZUCOwVs2fXS+m1Ap5aPddbW1sWKXpZYvV2JbzEZ5ySa2zjeewDXda/elxq7wMT5MVzPo2n+PMywfcvA'+
		'H/YPIIIA1TBoWtB2hWoFnHn/ErEWHZ88zhhIRSknSq9ILBbDcVzqCvNzMln/98C2tS/uSAGsffEaWVr74o7Ut1Y3bGlf07Ht'+
		'oY6Hqxa/Jruw6L57aV24gDf+7ZeoisroyBkG+08StsO888E7aKpG04L5ZXcrlsp6qqkoqjpFJeXjFktl3Q6VNb5/qJ/MxAQ1'+
		'8RiOCicOHa6On/uUQ939Od79vlrV7lIhDQIefnRVEqha9Nonpuvu4EYWBzpNMxRTFRXD0CEIMC0LUdmk0DWd470HUFSluoc1'+
		'2caHz6Ag8SXMnJu4IXDy/BhuOk8QBMTunIUeMvF9H8/3yGWyHO89QLy2jtF8+WHFbnIQBRszViJ3VsU0DQiCKuiVFv1Ez8OV'+
		'E7fsemn9ttb5cztb58/tBGKlQrpc/VRa7YwZJObNo6/3AGMXyit6emiAtoWLOHr8COmJCaLx+JTA586f49jBAwghWNuynvOj'+
		'ZykWCgghEEJw/8qVqKrC6Jsflk8oWJjvtrPk6ffRj96XEq629UrQ33kDYP/u7hSwpX1NR9niQdDpFLMxKRUIQEpBvL6eeXcv'+
		'YnC4nElPHTnKQN9xXM/BcR28SmHhFoukzpYXpaaxAc00ygmv0v/Ovn1kUqnyc66iErItovEo6eTFy1WW0BCuljQOLq+67lQW'+
		'vSXgK+LgsqsHQecjj33pm47j1UTrrt94XLJ8OWdODTByZrgqHQD5QoG+viNomk5b2CRmGuSymcvFi26waOVK3v3vX1PI5cAP'+
		'cIs5QiGT9kdXEUDaHrRf/jjX/VT3pde+uCO1f3f3FsM05oQj1mavlEu6pTzBFfvN0Xgt9z28At0oW7CQy/Hrt19jvHiE4Q+H'+
		'OXvuQ8b8g+x/603Onj59eaEeXE68rq5angZU80HSCtub7bB95/7d3VsmrfpJm/g0vmrZ9dL6KNAZ+H7nib6TMTscpnleG1Iq'+
		'/MdrO0lPpKiJxqiZ45LqF1ycuIhlWuiajl2rY1oWwydGAHji6acQ+IyNniObyRKvq01HY9GXbzZGb8ubh0mLCykT8xfO33zH'+
		'nbOTbjFLKT/B5FsGRZHc9fUJWtfnq+fN6ZB84TsXsMOXn3M9pwhBQMPMGcnE3JbN0Vj0zv27u7d8GrCf6rulqeRs3vy22Pj5'+
		'cWpn1CMzDnbT5XitWVTeDZnV0MTEHWlCloWiKDclL7faxO/zQ61JV58sYALVYcI6xls/PoZlWtz/lXmYKw8T+p/HEQXrIwuG'+
		'PwjgG4EX8oXY7tffwDRMVnSsxI7Y11n099nE7fwUbxLcc71NAQGqqm69XaCT7f8GAOektk0dB9KiAAAAAElFTkSuQmCC';
icon_map['territory_g_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['territory_o_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['territory_y_s.png'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3Ag'+
		'SUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKg'+
		'KLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADw'+
		'A3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4F'+
		'ANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMe'+
		'E80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q'+
		'5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQ'+
		'yDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK'+
		'8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mP'+
		'QCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqg'+
		'EZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPy'+
		'LXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlh'+
		'XIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6'+
		'EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BP'+
		'kvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3'+
		'aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKV'+
		'OpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3'+
		'xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqt'+
		'Zq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83'+
		'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2U'+
		'a5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1lds'+
		'UBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTD'+
		'qcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY'+
		'4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7'+
		'+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6'+
		'MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xq'+
		'bFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WD'+
		'IEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSc'+
		'lJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuC'+
		'Fny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRa'+
		'uWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19t'+
		'St50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLd'+
		'jxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPc'+
		'w83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8'+
		'mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f4'+
		'1y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJH'+
		'zEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O'+
		'233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAA'+
		'ADqYAAAXb5JfxUYAAA11SURBVHja7JtrbFxVfsB/577n3hnPjD1+JHGScV4kWZZ4IQmhgB0DJnRJSxAPVfQDUXcBtSDVWSGx'+
		'W1VqUrUSW0HjL6jSbtUGVY22dLsllMCmFBzC7lYUWOwkdmInjh3nYcd2khnPe+6rH8YzeZqGLKS0+C9Znplzzj33d/7vOxrh'+
		'+z5fJ5H4msks8CzwLPAs8CzwLPAs8CzwLPAs8CzwLPAs8CzwLPAs8CzwLPAs8DXIY3fMXfXYHXMf+jppeFNf48Md/ys7+75/'+
		'Q//+seO+hS9sunno9DH8f/jne7bf6P1vuIaPDh2NF/KZOMC9t73XMTokukaHROv/G5PeuaX9j3duaf/XnVvaHwLIZNIkphIX'+
		'T1kP7P3zH2327+948UuHV75s4LHxsc5AIEA+n4sAu2aa91T7qzzVXoIfHRJ0Ph0TF4//8J2Jrx7wzi3tYWAzkHhi+zuvAhwZ'+
		'GqiMP3278qQZMF+8lm1X3dzcBSSAjp6D3ce/kiY9cXaiA+gsFos7/vr3v9l6cVAUQqwLh8I7dFUfu0bLWH9q9NSmweHBuV8Z'+
		'k965pX0hEAe6n9j+TvLo0BH6Bw8jhCAYCPL07cqTklQ6U0lIeUlIDzQtW/zAePdA8+bvruYP/kg/03LrL+uvdu3egYNoqkaV'+
		'VZWe3ushoBno7jnYvet6Tfw3Nenh6f9bgW0AnucBULALPwmHwg2pTAoAVdfGWja07UgmUnGA6swQ7ie31v/lwT+bjFX3RJ/Z'+
		'+Lp8tZRZlkQy8T1Jlm4tFAqHPisWfKnAH3d/hKZp5PI5ngBcz20uj02b7u8BewGsoLVc1gxq54ZZsGiS8ckE4eoIv01f7L1d'+
		'e3n+X+YxVnfnxC1rtd0fHGr89iperAPI5DKrrYB1oLf/YFRV1KDruZZpmGULK0f07p6D3clr0fo1+/CO51q379zS7u/c0n6+'+
		'/Jnt2CSmEjiOE3/2zsCQruqbymNNyxb/vGVD2w4AVVGRJBlZ0fE9F11XUVQVISkISUHXdKLOOdbzUe19FNY/Fdj7t+XrBPTA'+
		'32Xz2S7Acj0Xz/cUgB8/fUfL9GHuzWQzz33hGu493NusqgogIpePaaq2WVO1vflifu90lKYqXPV9hODO9evJZnJEYzF838P3'+
		'PSS5dACqYQHQtvF3Lpix58YjsdifVDQiSX9qGuZ3s/lsvDQBc7qAGU6kEiiygpCEY01fa+eW9lXA8EwaVz4jGO2Yftv5xPZ3'+
		'dtl2kUwujed5fGeNaDUNc2t5vud7O1o2tO0d6Dvc2X/oMABCVlAtnWhThoaxlZVrC1kCIWY8WCHJKKqOmJ6z+q7bnzUt8wdv'+
		'v/7mXwghGiVJaszms12u5/6N4zoIIVCkEsarz63/N1VVN/q+nwWsa9bw0aGjcUVR1kuSoFi095aDhCzJeJ5HtCq6V5bk4Ww+'+
		'C0B8cdMmYPOcxnmkp9IELItIrA67+jjF2iM4oVH0M99AmWq4Jmuqikb59sOPIkkSpmXOsQuZHVbQKmYzWXzfH7MCVtxxnH8q'+
		'FAuXrDt4+EBCkiSKtm1rinp1k36hvZZVNzeX00ui52B3D0AyncR2bGKRGN9ZI1qDZrASkGRJ3tyyoY2f79q9A0CIkpmHqkKs'+
		'uftOZNUAIFs1hi8VcKrSKKk51wwMEAqHK69V3UJIkgYQMAM1Lfe3PbVvT1cN8HLJDfynJxOTPwmaQWn6EHQtGGaaLTydzhI9'+
		'B7t7FIBisfBTTdNXu66bAKIXb1y0i5vDwfBWfPIepZTTsqFtKxCP1dWRy2YJVoWRVR07egLhm8iZeZX1npEpHVK2+vo7Os+l'+
		'+bZbOTs5STAUUoEda1vWnXzrjTdLGUHTo7qmDzuuc+zytal06oehYOgZ3/fyQEAB+Ljn48J0DvVDVgjbsesVWUGWZTRViwCb'+
		'hSS+b2ft5QCyqsclReO37r3vkotn4324mShucQJ9bCXmsbvwCwK7sVRe5ud1o55f8Hn7V1ynSCgcIhQOXfB1IRrLryM10f/I'+
		'JNO7gVc8z0NRFHUyMbkwFokd7+vvFUIIHM8pWIZV8mHP9zTP8/Dx9XQ2/fdVoarNq5vXlBL+VOLMwhVNW3tHu+KFX8uYQati'+
		'speLa53DVwq4nME4VfIAtVCHl57Etk5QaDyIa53FCWkwps4I6Hkuvufgex6SrKDq1hWBTtZM4vFFyLJg6Yrlj5mWueaTX/3X'+
		'kSULlzYD8olTJ4ZHTh3fIcuy5nkejuPoVwQtgTCtgLXJddxXPj3w62clSSIUDt00P1RDU9t5lm5sQCqE4NjMCvH0zCW+aleP'+
		'gATFOUcQto4dHcEXC/F9GbeYx/PcMil+5TVIsoqiBWaM6LKisq7tHnzPxS5kwPfjqq7xyf6PcRwHSUivS7K0SQgRubhiu7zw'+
		'cKcn/GEqkyKZSuIDkgF23xxyb6wgs3fmwBPouQcpHYaLNvDlIq55Dl8tgOSWd8H3PVynMK1J5wKsEChaAEU3Z4T15SLpFW9z'+
		'fmyEycETpM4kS6ZdHSWTzZDOpvHwHjI0IyJL8tiMlZYkS2Jtyx3ULw1WPreLRdxUgPGBHMMnhhnoH6TQ0HfVG9FzCzB670Ye'+
		'WYRTzOG5NvrQaqRCsDS+/y5E3iTSAA214csSsEBWdTQjhKRon+nWdnQEXynSP9zN8IlhRkaOl6uUyhwzrIg1j8apn9twST5W'+
		'Wja0PfnBe+/fkjh/HoGQjIDBwt8tcrSnNCE9leaD1/ehRQRnTx1HN1R8udTgpM5M4toORlUQoyoIQqBRi5+uxhM2nmNDwsT4'+
		'1f0UvvUBODLGpy00qSpipYYQMpIkI2QZSVY/E9J1HDIT50o3XZPFNc+RyilMnTpPIBDg7Lvn8GynMr9mdQ7DMJHkXKhU0Eh6'+
		'y4a2JxUgvrAp7poBE8MKXLHR3EX1SK7OieHj0ykC7IKLAQwOHEZTdGRD46ZvrbqkWpKlS5sfrX/jBZvSPn9qyqbSHD9WCh6N'+
		'sRhSk4qTLbmOYzvU11ezcOkS3n9nz4X7cFRq62op5otIsmQDcbnRH3//ltXNr8ydPy9fV1/XDBj+VIjBAyXA2oZ6blqxgmwm'+
		'R+L8eSQhc7IngaoZ9B/qZXzyDMFwmDmNjbiOQz4xhZ3Lo+hapTy8HilkshTTGTzPQ9FUbLvIpx9/yOj4acyYzOGf5SkkS+1o'+
		'IGDS8sADKIrCQF8vnudRe5NCLDSfoFKXaJg358X6uQ2P7NvTtUeZLrCTwLbdLz3eCXSouUhHdXVNpOBmiMSsaf8WZT8nvnAp'+
		'Az37cRznkptMTpxlanwCx3VpXLYEI2hdN/DpwSGE76PoOo3Ll17SI5/85DyRJg2PHPYESLJcCpRugUgkgm071OSXZaVE7K+A'+
		'zgeffy0J8ODzl6WlB59/LflCe+22lg1tnXe23d0BdACXdUeClbfdyqIVy3nrZz9FkRXGTp1kePAoQSvIh59+iKqoNC5fVjK3'+
		'QrGUT1UFWVFmqKQ8nEKxlLcDpRw/eHyQ9NQUVdEItgJHDvZW5i9+xKZmbZaPXlQqubuYT4GAu+9dnwA6gc59e7qu6JiuuIOr'+
		'aRzoMIxARJEVdF0D38cwTYQkyu0hAz37kRW58gyrLJMjJ5GR8CSoXxy/KnBifAInlcP3fSLz56AFDDzPw/VcsukMAz37iVbX'+
		'MJYrNStWo43IWxiRItlRBcPQwfcroBdr9HP1w9MLt+1+6fHORcsWdyxatrgDiBTzqVL1My3VdXXElyyhv2c/E2dLJ3ri+BBL'+
		'V6zk0EAfqakpwtHojMBnxs9w+MB+hBA82PQ442OjFPJ5hBAIIVjb2oqiyIy9fbq0IG9ifNRC86OfoB26LSkcdfvFoL/xA4B9'+
		'e7qSwLaWDW0ljft+h13IRCRJBh8kSRCNxVjyjZUMj5Qi6bG+Qwz1D+C4NrZj404XFk6hQHK0dChVDbWohl5KO9PjH77/Pulk'+
		'stTnygoByyQcDZNKnLtQZQkV4agJ/cC6iunOpNHrAr7IDy6Yuu933HP/fd+zbbcqXBO7Yk3zunWcPDbEqZMjldQBkMvn6e/v'+
		'Q1U1lgYNIoZONpO+ULxoOitbW/nol78gn82C5+MUsgQCBi33rseHlDVsvfw/me4X+lz6wedfS+7b07VNN/QFwZC51S1mE04x'+
		'h+97lTnhaDW33X0Xml7SYD6b5RcfvMFkoY+R0yOMnjnNhHeAfe++zeiJExcO6o51RGtqKuWpTyUeJMygtdUKWvP37enaVtbq'+
		'5xXxRfyqZfdLj4eBDt/zOo70H41YwSALlyxFkmT+/Y1dpKaSVIUjVC1wSA4Kzk2dwzRMNFXDqtYwTJORI6cA2PjoIwg8JsbO'+
		'kElniNZUp8KR8MvX6qM35JuHssaFJMWXrVi2dd78uQmnkKGYmyqVZoAsS9z0zBSLHs9V1i1ok/jmD85iBS/0ua5dAN+ntr4u'+
		'EV/ctDUcCc/ft6dr2xcB+4V+tzRTOluybGlkcnyS6roYUtrGarzgr1UrS09D5tQ2MjUvRcA0kWX5mtLL9Yr4Mn+oVTb1cgHj'+
		'KzZT5mHe/fFhTMNk7cNLMFp7CfznA4i8+ZkFw/8J4KuB53P5yJ4338LQDe5qa8UKWVdo9MsUcSN/ilcGdx13i4+PoijbbxRo'+
		'Wf57AD3ibFvd2a7UAAAAAElFTkSuQmCC';
icon_map['field'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAACx0lEQVR42u2Zv0ssMRDH9xAO'+
		'FOFAK7HwCdrYiYUgCK+xUZsHTxtrG2v/C61trG1sbNTGRhBeJ3Y2CtqI1XuPAznhQM6bcBPG2WR/ZJO7Y8y32cslu5tPZjKT'+
		'ZGudTif5TqpFYOGKwNIVgaUrAktXBJauCCxdEVi6IrB0RWDpisDSFYGlKwJLVwSWrggsXRE4tK6OdtUL262mKm/sn9ZEAl8c'+
		'bnfqYw1dRmBUv8CDA3NQhOX/odb2joOCBwMGULjawPIUCtw7MAd9+3GtruPPP4cC3BswglJYUHPpRP9u3O44P98XeGVgChoS'+
		'2FdUdwY2BSMEHH1cSerNWVUGl/6YfElG/k4rt243nnSdCzDKFbw0sA2UwoEQkEOD6v9nCkNnRXSoKwteGPjscl41hI5TC9qA'+
		'aRuwOsBiHa+nAFxFonwZ8FxgnKPthTsjDBfOWWwDLvw+9yfVbvRmM/O9eaDwXNWu14+ic9wKDBYF10teJxIOTN3VNNrQlrot'+
		'DVxFgItYFdMdSMUG4h3vq+fJ7+WWETwFjBaFm/Scu19UnaAdz7IyHXFd7g4CPksNSPfqAori0Z/OdTqFOLgG/pJepv5pN4Qb'+
		'TcAuKQY7lRWIXIDBW0ypEPsOQlevnR9sGX0aLMxvotBVcqoP0QBJ+6I8q2cw2neU2cJ4M3FDBMaXuS4VfYBCfEAggE4Bk/6n'+
		'LGybwzZVdcUqMkV8GkBNaY1HbWuUho266QGDhKZuTIFNAdCWnnLzMD+hGCQ0tTBmENUXAuych03gg4bOCkjeVlpcebujYKAW'+
		'BVtL+wKnuyW+PCwD27fdUhVwnIOwSgNp1zTsnnyDegPOAucDYIqyIL1XtkBCPv21/jAcJx5lwPmSlW5GTKkF5Pv4NuypZRcQ'+
		'd1so3HWl3JoBhzqnDn4uzbeZSnQg4DeoVw59IN/XLw9Z9WK+POSBi/22NCz6BKBnXj3PpyekAAAAAElFTkSuQmCC';
icon_map['capital_b_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_b_s.png'] = 'data:image/png;base64,'+
		'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'+
		'SUVORK5CYII=';
icon_map['capital_bg_m.png'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3Ag'+
		'SUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKg'+
		'KLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADw'+
		'A3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4F'+
		'ANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMe'+
		'E80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q'+
		'5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQ'+
		'yDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK'+
		'8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mP'+
		'QCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqg'+
		'EZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPy'+
		'LXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlh'+
		'XIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6'+
		'EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BP'+
		'kvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3'+
		'aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKV'+
		'OpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3'+
		'xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqt'+
		'Zq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83'+
		'MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2U'+
		'a5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1lds'+
		'UBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTD'+
		'qcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY'+
		'4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7'+
		'+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6'+
		'MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xq'+
		'bFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WD'+
		'IEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSc'+
		'lJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuC'+
		'Fny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRa'+
		'uWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19t'+
		'St50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLd'+
		'jxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPc'+
		'w83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8'+
		'mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f4'+
		'1y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJH'+
		'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'+
		'NZtlAAAAAElFTkSuQmCC';
icon_map['capital_bg_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_bk_m.png'] = 'data:image/png;base64,'+
		'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'+
		'mcjFAAAAAElFTkSuQmCC';
icon_map['capital_bk_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_g_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_g_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_o_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_o_s.png'] = 'data:image/png;base64,'+
		'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'+
		'GvBk2/8BxbUfeVQGXUwAAAAASUVORK5CYII=';
icon_map['capital_p_m.png'] = 'data:image/png;base64,'+
		'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'+
		'SUVORK5CYII=';
icon_map['capital_p_s.png'] = 'data:image/png;base64,'+
		'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'+
		'rkJggg==';
icon_map['capital_r_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_r_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['capital_y_m.png'] = 'data:image/png;base64,'+
		'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'+
		'TkSuQmCC';
icon_map['capital_y_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_b_m.png'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAALxUlEQVR42u2ZWWxU5xXHzyye'+
		'fbyM94wxNmAHG3CAVAFkHFKSBwS0VcqS9oFUFEqXh75AEKAKXFRUiS6RWlURkEqVKtGyiNJCiwtUoLBTg8GpjY1tvG/jdWZs'+
		'z+aZ2+9/nG80Xhow2E5xfKTRnbnr+Z39u6NSFIW+TKKaAZ7mMgM83WUGeLrLDPB0lxng6S4zwNNdvhDgwt3blMLDv1d9aYDT'+
		'f/CR0mjK5u/Kr9+eUvAvHDhSpgL+/wp4KuBngGeAJ0GydvxKqbYsnv7AOTk5ikajobWZPvpDcA11z8qnoDlx+gEDNBgMUmxs'+
		'LHV0dNCmhVr6R62eXC4X+TJXkuP1bdMLePXq1YrD4SC1Wk09PT307cUGOletJZ1OR319fVRTUzNlvXhKgPPy8pRAIEDR0dHU'+
		'2dlJUVFRpNVqqbe3l483NTVNL+CCggIG9vl8NDg4SH6/n9xud/h4S0vL9AJet26dAlCv18vQbW1tDD0tgR3fsin/HoynI/4c'+
		'wrMAKnKWBgYGwuc8eNPL26Q/d7/8o2X77tlKgLroRxWrCZUabamysnJYSD9c009qyyDF/6b/5QY+cuSYkq/cJKuvnnbfTOSC'+
		'hWKV4aqmq00D5A6qKC0tjc5u1pJ+4DFdyT1CGzdumFToSQH+3vYfKk5XN7ehOXMyyWKx0NmzZxkWn+8nVVFHr58Ol+v5/MOH'+
		'D3OoFxX9k8zmaNJqtHTs449ejj783a07FL/fS4GAjxITEyknN4fBjx07xjn81ltv0QHb76hV+zq9/dt67sV79uwhk8lEt27d'+
		'osFAkHuzTmcQH/2Eg08I8Jp3LykW7SXS61oZSiVUNBlN1OvspeTkFLJazZy/KFatra20f/9+unPnDt29e5dyc3M5AgYHg1T7'+
		'pJaCoeCQYuImep1RbNXU0vkGFZ3bPiHgLwy89jt7leVZWeQdaBDtpU60HrSbEIcuClQwGBL7PJSUlEwxMdEMnoXzRYtqb28n'+
		'j8fL46ZOF8VTWGJiMkcEhhLkd0OLg2xxKykhroEOHix8YejnAkaOQvEBTx/51DFEwQBl2S3U5XRTKBRiGAjujbD0+byEx4SE'+
		'9wBut9sZrsPRST4R/mrhRbVGLSaxGL4OBpLXNbii6LUEH+lNMVTT3EZmk1UYM+q5Q33cwIBFjvb1uxhodnomzXnFSvVdAaqu'+
		'riJDlJqnqbi4OKqrqxdjYyN/z87OJkxbCF3xWLENiFCPhlkYFJDwttFoYCAcHzIa0apli+hWaT11ORr53hZzDBv75MkT44Z+'+
		'LmA8zOPpFzOxXlThDA5dXyBEIXGvLkdr2Mt1dXXhfrtgwQIOc4QrwAGL3xAA+v0+vs5isTIUvJuUlCTureYhxasYaMDtooDH'+
		'yc+GnDlzZvKBN27cpEBpeCDaGkeDQR8FB0Nks8VTdIyF4QHZ1dVF9+7d+wxIS4sXDy34ccxkiiWDKGqk+ERex/A+g8HI0FFR'+
		'OgFtFtshY/j9AXL2usRS0knJKSmiTjSzMbC0vHLlyuQDb926VcHDUFnVao3wlj88JqanZ1BI5LbBaOAihGJUW1vHxrHZbAyO'+
		'NbGrP5vMRgcZDUO5PuRFjzgWMwwUdaK93SGO9fE+uz2NmhobOZJgqAcPSqi0tHRc0OMC3rx5s2IwGNi66JvwNDyK8EWYArih'+
		'oU60E4NQKJbibDFhj2Ow4LVvr47ey59NDucAtbZ3sOHMZjNDQ1Dlu7q6qb/fzfsB7nL1sqH6+vopNfUVKi8vo4yMDM75Eyf+'+
		'NDnAW7Zs4RMBm5yczGva5uZmBscH+Yd98CrEaDSLPLVyYUM7gscBDmhDTCrZo1Xk9gXDoFAexzSaKLGaauZ9GEri4mzCy22U'+
		'kJBIFRUV3LchaGnYn539Km1a2E/rdp18JvBRwI73YxW1MUgJR9x8g7//crNyuszMyzp4a6jgWAlvMACOAuPxeFg5AOM4fptN'+
		'Ip+1auru7uailCT6a2xc9FAIU5Aq2oM0K8FAmpCf2ts6RNV3stHs9nRR7Ss5QpDTqOAwYlC1mjzuv4aNm5X1Klf0a9c+oby8'+
		'1+gb2T1876eBDwO+fv26svCTr5Lb8gYVz3NQnOkYXbp0ia0JEBm+8pqEhAQRwg1cTfv7PZzPVquFQx3ehGEADElJsYvFg0Mo'+
		'bKZUUXyQs5jE4H2sj5HnMFSKOOZ0OrlfY79abyGVKZ5W5tip9FE5PXnyhA3Y09MtCuES4Qh/OO83bPgmqSv/SJ6C87Rx2YDq'+
		'qcCXL19WlIabokuKljFnMV28eFHkSzl7DkUCwwK2Q7k2lLd4beNwdHAPhqDazps3jz0OD+AaeAVVvLGxgc9BdXf39bLhMHoi'+
		'NOE1TGW4PyoyIgr7IHGJqbQ8N4NulJSxMfBMGDI+PoFrA1pZTU2VaH0Laf36daSkbaE3PzTwtSPX2GFghC62Mct/zJ6EJQGK'+
		'tWtJSQkPD/AAlMfYh6qLa7GvsbFJQLcPs2RGRqYoMCmcl7gPAOBxVHSjwUIudw9f39PTy8UpMTFJfO8SkdLP1+A50AOSnmIj'+
		'lTmJHjWJQuZvIb1ez+fMmpX+WWR4ae7cuXh3xpU+reM/lFn3U/HMdLqXtGRYqKvO/2LTsCTO+vrPqOpvP6Hm6Hf4d2ZmJitW'+
		'XFxMDx8+5KqKwgVPwNpQFHmEXI4UGARKwEtQEB4BBKLC5XRxOKPSYoTEfngf3oJR0I6wdsa1spXBKOjt2Aej4YOUWrJkKfd4'+
		'pAbujXsgxSz3xOosIYs6uyrocz0sBcC4EKEJBeLj4zkv79+/L/rfA7Y+lPF6ffTpp6WjcmX+/PnhqIAxAI0PQtxoNBKiFUoC'+
		'FGmACNBqNZz/EAADCAULrRACrwJU6rxr1wfiGbFsBFwPPTllmv9CUXnbeR9yepiHR1ZpCa5dtI2tJW8iBdBQGC0CHu/u7uHp'+
		'Z6SsWrUKL+fYO4BGZEilUAS5TwuDACg1NVWcM8DnSYGRYFQYCN8BK3NayqFDh1jHyBeCgIXY39nHkSNm+LFzOFJQraEUwKAE'+
		'trgpqiYUgLfT09M5N0+fPk1Xr14ddj3gcnJyGA4hijUwvIX8hBK4p0ajFSHaGS5aEDxnpOBaXDeW7Nu3L+xtCSrlf7WnUcBF'+
		'RUW8Q1oToFAE3pT9FutUhDt+Y4siJgZ5unHjBl+zaNEizjkoKis5BOchrBG2aE+trS1sEAwbqOgwqMGgH6YPhptIz0fK3r17'+
		'xRCzn3TlS54KOiawGPYVPBQtR+auVLS+vp6/o4ghFEeGOgwDI4nWxqC4BzyNKJDvo2EEiFMULYQx2g8qbH19HeXnr+RQl8vC'+
		'ZwH++fvznxl0FDBgm5qaWEEZxthCUcACaMWKFfxb/icEIJyDqo2lIIYGGANeg7eRw6jOOA/QOIZKi2KHwQNVHj0bRau4+C4f'+
		'l0b5PODnAR0FfOrUKUU+THoPIJikALt06VLOP7kywjkwCnIa76pQWOA1hLis6gjn27dvixVTLZ8HQTuDYY1ieQjAiopH3E8x'+
		'I+PVDyo1er98WT8SWMKOF3TMkD569CivhqAIPFJVVcVKFxYW0vnz50eFOio2BhQpyF1ECAQVForiXoAtKyvj+w1NaINc2Zct'+
		'W845jYEBIymMFtnPcQ1SBOAvCjomcCQ4YHbu3KlCqENheFm2l6FVjYYeP34ctn5BQQEbB8fgeRhFvqmEYKEBY2JUvX+/hGvB'+
		'0oxkMiekkE+tG6VDZNX155bQu2urpuat5fHjxxX0UulVuQUI4CDr168XA0QjGwGGQRRgi3xFW4GRkNcQpA1eweIzq/5fZAp1'+
		'UmXme2OCToRHxw0sPS5DHcDIK0xCBw4cUIkerKAqyzYm518sH2VlR1uKLEaIABglv+FDGhTfb8XvmHTQcQFHgstFPGCxT6yo'+
		'FDl9yeoOg6BCS/nKvGtigrCF53Ocg0qNfEfOWoMf8/HJBH0u4JFy4cIFBW0KIsMZeVxdXc2RII0CiZzVu5O/Rrb2c5S06gOG'+
		'ry86OOmgEwIMj8NLKEiySMlCFgkbKSMXKVMFOiHAkeDIcYS2zO2phBiP/BdlwNeIKA9AzQAAAABJRU5ErkJggg==';
icon_map['fort_b_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_bg_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_bg_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_bk_m.png'] = 'data:image/png;base64,'+
		'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'+
		'rkJggg==';
icon_map['fort_bk_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_g_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_g_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_o_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_o_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_p_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_p_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_r_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_r_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_y_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['fort_y_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['village_b_m.png'] = 'data:image/png;base64,'+
		'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'+
		'AAAASUVORK5CYII=';
icon_map['village_b_s.png'] = 'data:image/png;base64,'+
		'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'+
		'484AAAAASUVORK5CYII=';
icon_map['village_bg_m.png'] = 'data:image/png;base64,'+
		'iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAABnRSTlMA/wD/AP83WBt9AAAIjklEQVR42u3Za2xT5xkH8P85'+
		'to+viR0ncSDBTQhJyMat3Nak0IsEHW2otCIWtFVI3aq1Y5X2Ze2krdKmVkLaBwbV1LWVYExqS1XG1hVKKKjQC4xxKTBgNKEJ'+
		'uTmxE9txEt+PfXwue88xNna4hyQw40eK4tu5/M7zvM/7HpuSJAn3U1B5cI5HHpzrkQfneuTBuR55cK5HHpzrkQfneuTBuR55'+
		'cK5HHpzrkQdPVTQ3lkt/Pz5A3RdgGStufBMfrVh7/4CpLVvTz3c1Pj1l8HsCnBmTjb/nwJONzoOnCsy//AdoKorvH7By8Lsw'+
		'jqccfPDtF6St7+9THv9k7XKsfmWXglt3vCV9IjkB3vfHddIHC15UHqt2HEWsY6sCTkUKPtkx6eBMqMDzCPv9iI0EMP3AZjD9'+
		'Cfz4xZVZn3/ipW3/n9NSJlQkxwiP+hH0+SCJEiidFtMTf4bhlBoRVQSm0+yUwSccnAnlSUb9Hg9isThEjksekKIhSSL0ARV0'+
		'D2wHS1OoOkDeuOQnn+EnHT5h4GcPHkrvKMHGEAwGERkZuf4GggDDoAj1nPchnTwHU7gc1hErBC87qfA7BssZlf9v7quFdkkd'+
		'BIlGNBC4cgCSUTnkrCrZ5RPK88bWCLqW/A3hYTeK2FEyviVEgoICN/vNgJvLgnPR5D7vtLmNGyxDGYM5/XzHu2F0NM2Bqshy'+
		'7QMRrBBjUSroYN32Dh7fsALbpx2F1O5DPW/BYPQb6E3kgoiAs51CnWo+1AEKdCBZ6mvXL83a33jhtw0eC5Xjnd00tI2HUftV'+
		'Al+tfxUiy6bHqly6UKlQwmtg9Gvg4RJQ7fo1XnnmB7ioO4xdMQ22NL+BOfMewbYdL+OTk+/C6xRh42dBgh0akUOJioMhfPUY'+
		'l7N+u/BbBn/8aa3yQaHYBX3nw2ACM/Hh1kMw6syIPaRD96MiaFKSD3/iweFVr4ELBUBrtRAdXpKtcjjpK+clg//6XBMElscb'+
		'kQtYtnQdVj39C/R3tuGtLb+DWWvEvzpCKCgqBk3TpOnFkIhFUM7wMN4h/Kbg1BjlvntWwcrx6c/LoCsxw1hig4ph0LrUh8g0'+
		'AYkojyKTEQV9AbCjG7A2dBTv7dkHYd0mZbvqII9nKk7gT9v34LnXN0KgonBSLdCwJtRqGxALcGg791+wYggDARceW/ESWvZ/'+
		'gYQgKnCP2436MiMsYhTssH9cY/y6YDmjzGglMGhFCrz3VT4LykXCGOa96G3WK/Or/MeY1AQuYJZYjseHZqHl4CXo563Bj6xH'+
		'IFTWIwIf/nP+JBqaVkNjohAUHIhzYcQOB+EXOHhcPkxbycBx2ItNG4/ixM7fozVgw87dn4EfdaO2ogyV9mkQyVBhR3xpeOYY'+
		'Zx9pwQ8filK3BE5lVN5INVyhvMa0LcSx44OIJCToLBYFGvF4ISYSEBda0bUoAZY81po0oDU0uHCyEzdHGuHuM+LZmT5cVBcj'+
		'4O6BKApQFzPQPWgBrVclL2ZPRPnTLDcgGHEjnoig58AQ1jf9BvUPPooLJ79EX/e3+Gz3XgRDojKv26vssE0rRTwUhNWkRc+F'+
		'znS2A4s/UM5drsix8DQ4BVVi+gjYmmPJ8UY2lMFDgULEoiz6unrgHfDCWGaDscICvTSAYBkDj4pFZzmZgiS5vHgwghqLVdX4'+
		'qbYcw+R1Z+lZ8N+WgO8Wr1lRugVmMHaD8ljOuKfLgUJ/Edl/EaR4IXktgZOnDqHm+3YMnRDgbO1H5QwbZtfXQmfQ48jez7PA'+
		'meeeWepUy6bma9a0nOHMjQ4d6EBlXTUsxVYF7gm64Le70Of3oFxrw4wFVvjUZEpxxcCzEmarDKDPx7D8+d/CU/AX8NQlcGSu'+
		'ZdzzETudnJsTYgId4R65ieM7hbOhsmiU10VWgESqCSUU6Q0jiA7yZLzz0NspRHvjUHUWwKaxK1D/8AgcHd0I+AIKWBnLlxOW'+
		'Cb5xhi+HPG5TJX36lBeubheMZmMWvHe0HR1iKxKFEmbWzkBFZQmRkLVzBwfTHG3yopELUVgUIskPQDNsR/iYRYH2cD1gCgQU'+
		'kq68WLcMloVlyQNrKKgKNenzCJ3rxL8//x6CNTY8xZ3OgkYCEVRUV8DR7rgCzjj/qzJ8vTE8NuSSltfGru7ea8Id/na0xVsR'+
		'VNNYsXoeNNqr90EaLeJnNPiy6xQKy0jZa2nEWRGsT8IyWwPKimzQ1hVAM0OfzLSPrMbe1uLQqrnkAhjJNGdAbScL45G30tCK'+
		'6iqo1WqlpMcuTjKh121aqZBv1DOvlgxOxY3g7QPtGNLw6HcaULWQR20DnYX/x/ZzEMChvIrGouqnsKF5E/Z/vAXSzDZwXxeA'+
		'IgsUipR65KwGH614BGpLAWidHhStghiNkDusfjT4j6ahqSg1B28IvSk4E66Ux2X8rcJ7vYNodXEIQlTgVQtpGMimcvdVCXIJ'+
		'tuPDf56DVm/Cm5vWw9rUhnggjtBmK/Y8+TxoA6NAlcog83Dp+RGYTmxD42MNWVAzWeFljtNxz8MTlXEHgZ/viyCm57DyBS2o'+
		'qBOlQ0/g6/1nsOb1JUgMlOH4mS8wfVkYrtcYmEu0aFv7Szj1vAKtao9j/sh7iJNl6qUuDssbF40LetvgVIwd47cK7x7ohXYp'+
		'WR4uHQVGq/DNTgcW/4qBr4NB7LgVNuZK1/VcdODCkz/D6uG9pGMmsxkLhcHFacytsWadz6StpScK7o04Ic0NIuyJo1RvRuFw'+
		'9TW7bkEpDVHiwBiMZAFPGrch2QgesOjGBb1j8J3C3f0uVM2uuQqaakah0CABC2TaYiYEOmHg8cI9zgECj10FTUVm15Xn0zVN'+
		'l+6NbzzGCxdFEfYa+7inl3sGnAUnS7zU3dZYeH9nN2bW100ZdNLBqRh7m5m6CXE7yRiuq0FpfW/yg5ffn+wv5Kf0l4cbvZ8z'+
		'vzzcDD5V0LsGvtvxP2CYdGqEETUZAAAAAElFTkSuQmCC';
icon_map['village_bg_s.png'] = 'data:image/png;base64,'+
		'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'+
		'/3b+BO7DXFsWRKoHAAAAAElFTkSuQmCC';
icon_map['village_bk_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['village_bk_s.png'] = 'data:image/png;base64,'+
		'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';
icon_map['village_g_m.png'] = 'data:image/png;base64,'+
		'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'+
		'ge93/A/JKHRqKQ9W3AAAAABJRU5ErkJggg==';
icon_map['village_g_s.png'] = 'data:image/png;base64,'+
		'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'+
		'AAAASUVORK5CYII=';
icon_map['village_o_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['village_o_s.png'] = 'data:image/png;base64,'+
		'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'+
		'AAAASUVORK5CYII=';
icon_map['village_p_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['village_p_s.png'] = 'data:image/png;base64,'+
		'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'+
		'Dfxv50+QI2JbIHQCpgAAAABJRU5ErkJggg==';
icon_map['village_r_m.png'] = 'data:image/png;base64,'+
		'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'+
		'8xpvamkX6KsAAAAASUVORK5CYII=';
icon_map['village_r_s.png'] = 'data:image/png;base64,'+
		'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'+
		'VlsH5sNBAAAAAElFTkSuQmCC';
icon_map['village_y_m.png'] = 'data:image/png;base64,'+
		'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';
icon_map['village_y_s.png'] = 'data:image/png;base64,'+
		'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'+
		'9R9zx0dbJIhfkwAAAABJRU5ErkJggg==';


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

	//--------------------------------------------//
	// 全体表示画面から、画面中央座標を手に入れる //
	//--------------------------------------------//
	var codx = $e('//div[@id="datas"]/input[@id=\"x\"]');
	var cody = $e('//div[@id="datas"]/input[@id=\"y\"]');
	var bx = codx.snapshotItem(0).value;
	var by = cody.snapshotItem(0).value;
	var sx;
	var sy;
	var ex;
	var ey;

	//--------------//
	// ホスト名判別 //
	//--------------//
	var hosttype = "";
	if(    (location.hostname.indexOf("1kibaku") == -1)
	    && (location.hostname.indexOf("legend") == -1) ){
		hosttype = "0";
	}

	//------------------//
	// 左上座標を求める //
	//------------------//
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

	//----------------------//
	// レーダーマップの描画 //
	//----------------------//
	var mapdata = new Array();
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

	// マップの作成
	for(var i = 0; i < 20; i++ ){
		mapdata[i] = new Array();
	}
	for(var i = 0; i < 20; i++ ){
		for(var j = 0; j < 20; j++ ){
			mapdata[j][i] = 'blank';
		}
	}

	var ck = $e('//*[@id="OldDesign"]');
	for (var i=0; i < areacls.snapshotLength-1; i++) {
		// 施設情報を全てリスト
		var rowTextA = areasrc.snapshotItem(i).textContent
		rowTextA = rowTextA.replace(/^.*\//,'');
		var clsText = areacls.snapshotItem(i).textContent;
		clsText = clsText.replace(/^mapAll0*/,'');
		var clsNo = parseInt(clsText) - 1;

		var areaimg;
		if( clsNo < 9 ){
			areaimg = $x('//div[@id="mapsAll"]//img[@class="mapAll0' + clsText + '"]');
		}
		else{
			areaimg = $x('//div[@id="mapsAll"]//img[@class="mapAll' + clsText + '"]');
		}

		var oldName = "";
		if( (areaimg != undefined) && (areaimg != null) ){
			oldName = areaimg.getAttribute("old");
			if( (oldName != undefined) && (oldName != null) ){
				rowTextA = oldName;
			}
		}

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

		// 51x51モードが実装されており、かつ旧マップ使用が有効
		if( hosttype == "0" ){
			if( chkflg2.charAt(FLAG2_OLDDESIGN) == '1' ){
				if( icon_map[rowTextA] != undefined ){
					areasrc.snapshotItem(i).textContent = icon_map[rowTextA];
				}
				else if( rowTextA.indexOf("resource") >= 0 ){
					areasrc.snapshotItem(i).textContent = icon_map['field'];
				}
				areaimg.setAttribute("old",rowTextA);
			}
			else{
				if( (oldName != null) && (oldName != undefined) && (oldName != "")){
					areasrc.snapshotItem(i).textContent = "/20110414-01/extend_project/w760/img/panel/" + oldName;
				}
			}
		}
	}

	// 51x51モードが実装されており、かつ旧マップ使用が有効
	if( hosttype == "0" ){
		if( chkflg2.charAt(FLAG2_OLDDESIGN) == '1' ){
			var mapsAll = $e('//div[@id="mapsAll"]');
			for( y = 0; y < viewSize; y++ ){
				for( x = 0; x < viewSize; x++ ){
					if( mapdata[y][x] == 'blank' ){
						var img = document.createElement("img");
						img.src = icon_map['field'];
						if( y*viewSize + x + 1 <= 9 ){
							img.className = "mapAll0" + parseInt(x + 1);
						}
						else{
							img.className = "mapAll" + parseInt(y*viewSize + x + 1);
						}
						img.setAttribute("add","1");
						img.alt = "";
						mapsAll.snapshotItem(0).appendChild(img);
					}
				}
			}
		}
		else{
			for( y = 0; y < viewSize; y++ ){
				for( x = 0; x < viewSize; x++ ){
					if( mapdata[y][x] == 'blank' ){
						var classNo;
						if( y*viewSize + x + 1 <= 9 ){
							classNo = "0" + parseInt(x + 1);
						}
						else{
							classNo = parseInt(y*viewSize + x + 1);
						}

						var ex = $x('//div[@id="mapsAll"]//img[@add="1"]');
						if( (ex != undefined) && (ex != null) ){
							var ex2_p = ex.parentNode;
							ex2_p.removeChild(ex);
						}
					}
				}
			}
		}
	}

	// オプションオンのときだけレーダー描画
	if( chkflg2.charAt(FLAG2_RADER) == '1' ){
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

		if( mapdata[Math.abs(cx-sx)][Math.abs(cy-sy)] == 'black' ){
			matchcase = -1;
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

	//-------------------------------------------------//
	// 51x51モード未使用設定の場合、なにもしないで戻る //
	//-------------------------------------------------//
	if( chkflg2.charAt(FLAG2_NOEXEC51) == '1' ){
		return;
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
//	for( var i = 0; i < 10; i++ ){
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
		else{
			p = dt.parentNode.innerHTML.match(/君主名&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt&gt;座標/);
			if( p != undefined ){
				user = p[1];
			}
		}
		p = dt.parentNode.innerHTML.match(/君主名<\/dt><dd>(.*)<\/dd><dt>人口/);
		if( p != undefined ){
			user = p[1];
		}
		else{
			p = dt.parentNode.innerHTML.match(/君主名&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt&gt;人口/);
			if( p != undefined ){
				user = p[1];
			}
		}
		p = dt.parentNode.innerHTML.match(/同盟名<\/dt><dd>(.*)<\/dd><dt>戦力/);
		if( p != undefined ){
			group = p[1];
		}
		else{
			p = dt.parentNode.innerHTML.match(/同盟名&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt&gt;戦力/);
			if( p != undefined ){
				group = p[1];
			}
		}
		p = dt.parentNode.innerHTML.match(/同盟名<\/dt><dd class=&quot;bottom-popup-r&quot;>(.*)<\/dd><\/dl>/);
		if( p != undefined ){
			group = p[1];
		}
		else{
			p = dt.parentNode.innerHTML.match(/同盟名&lt;\/dt&gt;&lt;dd class=&quot;bottom-popup-r&quot;&gt;(.*)&lt;\/dd&gt;&lt;\/dl&gt;/);
			if( p != undefined ){
				group = p[1];
			}
		}
		p = dt.parentNode.innerHTML.match(/戦力<\/dt><dd>(.*)<\/dd><dt class=/);
		if( p != undefined ){
			land = p[1];
			landLevel = land.length;
			if(text == "　"){
				text = landLevel;
			}
		}
		else{
			p = dt.parentNode.innerHTML.match(/戦力&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt class=/);
			if( p != undefined ){
				land = p[1];
				landLevel = land.length;
				if(text == "　"){
					text = landLevel;
				}
			}
		}
		if( dt.parentNode.innerHTML.indexOf(">空き地<") >= 0 ){
			space = 1;
		}
		else if( dt.parentNode.innerHTML.indexOf("&gt;空き地&lt;") >= 0 ){
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
				css = css + 'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;';
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
				else if( maxres < 6 ){
					col = "white";
					if( maxres == 2 ){
						col = "lightgray";
					}
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
				newText = '<b><font style="' + css + '">' + text + '</font></b>';
			}
			else{
				newText = '<font style="' + css + '">' + text + '</font>';
			}
			dt.innerHTML = newText;
		}
		else{
			newText = '<font>' + text + '</font>';
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

		//--------------//
		// ホスト名判別 //
		//--------------//
		var hosttype = "";
		if(    (location.hostname.indexOf("1kibaku") == -1)
		    && (location.hostname.indexOf("legend") == -1) ){
			hosttype = "0";
		}

		//------------------//
		// 旧マップ使用判定 //
		//------------------//
		var old = false;
		var ck = $e('//*[@id="ckOldDesign"]');
		if( (check51_51mode() == 1) && (ck.snapshotItem(0).checked == true) ){
			old = true;
		}

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

			img2.name = "viewIcon";

			var iconNo = group_flg % 100;
			if( viewSize == 15 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "44px";
				img2.style.height = "44px";
				img2.style.zIndex = 226;

				if( (hosttype == "0") && (old != true) ){
					img2.style.left = x;
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 2 + "px";
				}
				else{
					img2.style.left = x;
					img2.style.top = y;
				}
			} else if( viewSize == 20 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "33px";
				img2.style.height = "33px";
				img2.style.zIndex = 401;

				if( (hosttype == "0") && (old != true) ){
					img2.style.left = parseInt(x.substr(0,x.length-2)) + 1 + "px";
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 4 + "px";
				}
				else{
					img2.style.left = x;
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 1 + "px";
				}
			} else {
				img2.src = icon_2[iconNo];
				img2.style.width = "60px";
				img2.style.height = "60px";
				img2.style.zIndex = 122;

				if( (hosttype == "0") && (old != true) ){
					img2.style.left = parseInt(x.substr(0,x.length-2)) + 1 + "px";
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 2 + "px";
				}
				else{
					img2.style.left = x;
					img2.style.top = y;
				}
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

		//--------------//
		// ホスト名判別 //
		//--------------//
		var hosttype = "";
		if(    (location.hostname.indexOf("1kibaku") == -1)
		    && (location.hostname.indexOf("legend") == -1) ){
			hosttype = "0";
		}

		var old = false;
		var ck = $e('//*[@id="ckOldDesign"]');
		if( (check51_51mode() == 1) && (ck.snapshotItem(0).checked == true) ){
			old = true;
		}

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

			img2.name = "viewIcon";

			var iconNo = group_flg % 100;
			if( viewSize == 15 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "44px";
				img2.style.height = "44px";
				img2.style.zIndex = 226;

				if( (hosttype == "0") && (old != true) ){
					img2.style.left = x;
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 2 + "px";
				}
				else{
					img2.style.left = x;
					img2.style.top = y;
				}
			} else if( viewSize == 20 ){
				img2.src = icon_2[iconNo];
				img2.style.width = "33px";
				img2.style.height = "33px";
				img2.style.zIndex = 401;

				if( (hosttype == "0") && (old != true) ){
					img2.style.left = parseInt(x.substr(0,x.length-2)) + 1 + "px";
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 4 + "px";
				}
				else{
					img2.style.left = x;
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 1 + "px";
				}
			} else {
				img2.src = icon_2[iconNo];
				img2.style.width = "60px";
				img2.style.height = "60px";
				img2.style.zIndex = 122;

				if( (hosttype == "0") && (old != true) ){
					img2.style.left = parseInt(x.substr(0,x.length-2)) + 1 + "px";
					img2.style.top = parseInt(y.substr(0,y.length-2)) + 2 + "px";
				}
				else{
					img2.style.left = x;
					img2.style.top = y;
				}
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

	// 旧マップパーツを使用
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckOldDesign";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_OLDDESIGN) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "旧マップを使用";
	ckLabel.id = "Label2-9";
	optionPre.appendChild(ckLabel);

	// 51x51画面で本ツールを使わない
	chkbox = document.createElement("input");
	chkbox.style.marginTop = "1px";
	chkbox.type = "checkbox";
	chkbox.id = "ckNoExec51";
	chkbox.style.marginLeft = "15px";
	if( chkflg2.charAt(FLAG2_NOEXEC51) == '1' ){
		chkbox.checked = true;
	}
	optionPre.appendChild(chkbox);

	ckLabel = document.createElement("span");
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "51x51で使用しない";
	ckLabel.id = "Label2-10";
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
	dv2.style.zIndex = 0;
	dv2.id = "smallmap_dv";
	dv2.style.fontSize= "10px";

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
	// 51x51モードがある鯖
	if( hosttype == "m" ){
		textArea.style.position = "absolute";
		textArea.style.top = '40px';
		textArea.style.left = '5px';
	}
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
							newhtml = elemhtml.replace(/<font.*>.*<\/font>/,"<font style=\"text-shadow: -1px -1px 0 #FFF, 1px -1px 0 #FFF, -1px 1px 0 #FFF, 1px 1px 0 #FFF; border-style: solid; border-color: cyan; color:red; background-color:cyan;\">" + vtext + "</font>");
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

			//---------------------------------//
			// 51x51モードでないルート構築処理 //
			//---------------------------------//
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

	//-- 旧マップモード --//
	checkBox = $e('//*[@id="ckOldDesign"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,25) + '0' + chkflg2.substr(26);
	}
	else{
		chkflg2 = chkflg2.substr(0,25) + '1' + chkflg2.substr(26);
	}

	//-- 51x51で使わない --//
	checkBox = $e('//*[@id="ckNoExec51"]');
	if( checkBox.snapshotItem(0).checked == false ){
		chkflg2 = chkflg2.substr(0,26) + '0' + chkflg2.substr(27);
	}
	else{
		chkflg2 = chkflg2.substr(0,26) + '1' + chkflg2.substr(27);
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
		for( var i = 1; i <= 10; i++ ){
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
		checkbox = $e('//*[@id="ckOldDesign"]');
		checkbox.snapshotItem(0).style.display = "none";
		checkbox = $e('//*[@id="ckNoExec51"]');
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
		for( var i = 1; i <= 10; i++ ){
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
		checkbox = $e('//*[@id="ckOldDesign"]');
		checkbox.snapshotItem(0).style.display = "inline";
		checkbox = $e('//*[@id="ckNoExec51"]');
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

	// ルートを記憶
	autoroute_path[autoroute_maxpaths] = text;
	autoroute_maxpaths = autoroute_maxpaths + 1;

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
			p = elem.innerHTML.match(/戦力&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt class=/);
			if( p != undefined ){
				land = p[1];
				landLevel = land.length;
			}
			else{
				landLevel = 0;
			}
		}

		// 空き地状態の取得
		var space = 0;
		if( elem.innerHTML.indexOf(">空き地<") >= 0 ){
			space = 1;
		}
		else if( elem.innerHTML.indexOf("&gt;空き地&lt;") >= 0 ){
			space = 1;
		}

		// 同盟名、個人名の取得
		var user;
		var group;
		p = elem.innerHTML.match(/君主名<\/dt><dd>(.*)<\/dd><dt>座標/);
		if( p != undefined ){
			user = p[1];
		}
		else{
			p = elem.innerHTML.match(/君主名&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt&gt;座標/);
			if( p != undefined ){
				user = p[1];
			}
		}
		p = elem.innerHTML.match(/君主名<\/dt><dd>(.*)<\/dd><dt>人口/);
		if( p != undefined ){
			user = p[1];
		}
		else{
			p = elem.innerHTML.match(/君主名&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt&gt;人口/);
			if( p != undefined ){
				user = p[1];
			}
		}
		p = elem.innerHTML.match(/同盟名<\/dt><dd>(.*)<\/dd><dt>戦力/);
		if( p != undefined ){
			group = p[1];
		}
		else{
			p = elem.innerHTML.match(/同盟名&lt;\/dt&gt;&lt;dd&gt;(.*)&lt;\/dd&gt;&lt;dt&gt;戦力/);
			if( p != undefined ){
				group = p[1];
			}
		}
		p = elem.innerHTML.match(/同盟名<\/dt><dd class=&quot;bottom-popup-r&quot;>(.*)<\/dd><\/dl>/);
		if( p != undefined ){
			group = p[1];
		}
		else{
			p = elem.innerHTML.match(/同盟名&lt;\/dt&gt;&lt;dd class=&quot;bottom-popup-r&quot;&gt;(.*)&lt;\/dd&gt;&lt;\/dl&gt;/);
			if( p != undefined ){
				group = p[1];
			}
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
			if( (casname == null) || (casname == undefined) ){
				casname = elem.innerHTML.match(/bigmap-caption&quot;&gt;(.*)&lt;\/dt&gt;&lt;dd class=/);
			}

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
		if( elem.innerHTML.indexOf("<b>") >= 0 ){
			newhtml = elem.innerHTML.replace(/<b>.*<\/b>/,"<font style=\"border-style: solid; border-color: cyan; background-color:cyan;\">　</font>");
		}
		else{
			if( (elem.innerHTML.indexOf(">S</font>") >= 0) || (elem.innerHTML.indexOf(">E</font>") >= 0) ){
				newhtml = elem.innerHTML;
			}
			else{
				newhtml = elem.innerHTML.replace(/<font.*>.*<\/font>/,"<font style=\"border-style: solid; border-color: cyan; background-color:cyan;\">　</font>");
			}
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
