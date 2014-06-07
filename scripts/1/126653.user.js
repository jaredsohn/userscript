// ==UserScript==
// @name           bro3_map_tool
// @namespace      http://blog.livedoor.jp/froo/
// @include        http://*.3gokushi.jp/map.php*
// @include        http://*.3gokushi.jp/alliance/info.php*
// @include        http://*.3gokushi.jp/user/*
// @include        http://*.3gokushi.jp/facility/castle_send_troop.php*
// @include        http://*.3gokushi.jp/facility/unit_status.php*
// @include        http://*.1kibaku.jp/map.php*
// @include        http://*.1kibaku.jp/alliance/info.php*
// @include        http://*.1kibaku.jp/user/*
// @description    ブラウザ三国志 地図ツール by 浮浪プログラマ(3.00.d4ex.ゆき.鮪20120224)
// ==/UserScript==

// 公開ページ: http://blog.livedoor.jp/froo/archives/51365945.html
// 使い方: 全体地図ページ左下「地図ツール」の各リンクをクリック
//
// どらごらバージョン：http://doragora.blog86.fc2.com/blog-entry-3.html

//**************
// 改造履歴 by どらごら
// Ver 2.33.d1 2010/06/14
//		・中域画面で59x59の一括取得
// Ver 2.36.d2 2010/08/31
//		・ベースを2.36に変更
//		・遠征支援機能を追加
//		・jQuery対応コード追加
//		・出兵画面に簡易出兵先情報を表示
//		・君主数10→20拡張、同盟数10→20拡張
//		・その他色々
// Ver 2.36.d3 2010/09/21
//		・１画面内に自同盟のマスが無い場合、配下同盟の処理が正しく行われないのを修正
//			※オリジナルの潜在バグだと思われるので暫定対応
// Ver 2.37.d4 2010/10/03
//　　・ベースを2.37に変更
//　　・中画面でかならず白で枠を表示するように変更
//　　・初起動時に遠征機能にチェックが入っているのに、画面が表示されないのを修正
//			※そもそも初期値は遠征機能無効
//　　・オリジナルから増えたメモリ消費をなるべく抑える。(１学期中間テスト)
//		・画面遷移する時、昔のゴミコードがあったのを削除
//**************
// <><><><><><><><><><><> attention(注意) <><><><><><><><><><><>
// ・どらごら改造バージョンは、Google Chrome未テストです。
// ・変更箇所は「どらごら」で検索した前後をオリジナルバージョンと
// 　比較する事により、区別出来るようにしてあります。
// <><><><><><><><><><><> attention(注意) <><><><><><><><><><><>
//**************
//
//　Ver 2.37.d4ex 2010/12/27 拡張 by mmc
//　・君主、同盟登録拡張（20→30まで）
//　・君主、同盟のカンマ区切り登録対応
//　・99×99データ取得（59×59のさらに一回り分を取得）
//
//　Ver 2.37.d4ex1	2011/01/08 拡張 by mmc
//　・中域マップでの出兵先戦力（防御力）参照機能追加。
//
//　Ver 2.37.d4ex2	2011/01/20 拡張 by mmc
//　・期数の選択をチェックボックスからラジオボタンへ変更。
//　・２期、３期の★４戦力について平地23および20の両方を表示するように対応。
//
//　Ver 2.37.d4ex3	2011/02/17 拡張 by mmc
//　・３期森10の★ランク誤りの修正。
//　・中域マップのプチワイド対応。（半径25→34への切り替え。99×99取得の機能を吸収）
//　・中域マップでのポップウインドウに賊討伐時の入手資源を表示するように対応。
//
//　Ver 2.37.d4ex4	2011/03/24 拡張 by mmc
//　・１期★６(森10)のデータ記載ミスの修正。
//　・中域マップでのプチワイド時の全範囲取得の範囲を調整（5×5＝25画面分を4×4=16画面分に変更）
//　・広域マップでの前半に取得に対応。（13×13＝169画面取得します時間がかかるので注意）
//　・全範囲取得時の進捗を表示するように対応。
//　・全範囲取得によるデータ取得にて中域画面での本拠地の目印（四角の点線で囲まれる）の設定がおかしくなる不具合を修正。
//　　　→データ取得した座標が変数に反映されていないので、別のエリアの拠点をセットしている。
//　　　→またマップデータ取得の際、拠点フラグを毎回クリアしていたので「人数なし（≒拠点ではない）」という条件を追加。
//　・中域画面での本拠地表示の文字を「P」→「C」（Castle）に変更。
//
//　Ver 2.39.d4ex1	2011/04/13 拡張 by mmc
//　・本家「浮浪プログラマ」氏のバージョンアップ反映。2.37→2.39
//　　　ブラウザ一騎当千の対応 from 2.38
//　　　51×51マップ対応 from 2.39	※既に対応済みの為バージョンのみ移行
//　・峡域マップが20×20以外のときに全範囲取得すると本拠地情報が正しくセットされない不具合の修正。
//　・不正にセットされた本拠地情報の補正。
//　・同盟画面での同盟情報詳細csv取得の機能の追加。
//
//　Ver 3.00.d4ex　20011/04/18 拡張 By ゆきすけ
//　中域・広域表示でマップスターを非表示に
//**************
//20120130 遠征支援:★→☆, ☆1の場合に☆1を出力しないモード追加 by鮪
//20120130 遠征支援:マップに反映効かなかったの修正 by鮪
//20120201 遠征支援:資源情報追加モード追加 by鮪
//20120202 遠征支援:出兵中の座標&到着時間まとめ by鮪
//20120217 中域:君主/同盟入力欄にclass付けた - 一括してスタイル指定できる by鮪
//20120224 遠征支援:出力形式指定可能に by鮪

document.title = location.hostname.split('.')[0] + document.title;
var VERSION = "3.00.d4ex.ゆき.鮪20120224";
var LOCAL_STORAGE = "bro3_map_tool";

var RADIUS = 25; //半径（中域）
var RADIUS_L = 125; //半径（広域）
var CELL_SIZE_M = 14; //中域地図の1マスサイズ(px)
var CELL_SIZE_L = 3; //広域地図の1マスサイズ(px)
var FONT_SIZE = "10px"; //中域地図のマス内文字サイズ
var HI_POWER = 4; //高☆領地基準
var HI_POPUL = 600; //高人口拠点基準
var MAX_XY = 700; //座標絶対値最大
var DELIMIT = "#$%";
var DELIMIT2 = "&?@";
var NPC_ALLY = "-";

//保存データインデックス（マス）
var IDX_VILLAGE_NAME = 0; //地名
var IDX_USER_NAME = 1; //君主名
var IDX_POPULATION = 2; //人口
var IDX_ALLIANCER = 3; //同盟名
var IDX_POWER = 4; //戦力
var IDX_WOOD = 5; //森
var IDX_STONE = 6; //岩
var IDX_IRON = 7; //鉄
var IDX_RICE = 8; //穀
var IDX_NPC_FLG = 9; //NPCフラグ
var IDX_TIME_BEFORE = 10;
var IDX_USER_BEFORE = 11;
var IDX_ALLY_BEFORE = 12;
var IDX_LAST_UPDATE = 13;
var IDX_CAPITAL_FLG = 14; //本拠地フラグ

//保存データインデックス（同盟）
var IDX_ALLY_PARENT = 0; //親同盟
var IDX_ALLY_CHILDREN = 1; //子同盟リスト
var IDX_ALLY_MEMBERS = 2; //同盟員リスト

//保存データインデックス（君主）
var IDX_USER_VILLAGES = 0; //拠点リスト
var IDX_USER_ALLY = 1; //所属同盟

//地図モード
var MAP_MODE_S = ""; //狭域地図
var MAP_MODE_M = "1"; //中域地図
var MAP_MODE_L = "2"; //広域地図

//入力モード
var INPUT_MODE_NAME = "1"; //名称
var INPUT_MODE_COLOR = "2"; //色

//デフォルト色定義
//var USER_COLORS_DEF = new Array("#0000a0", "#a00000", "#00a000", "#808000", 
//	"#008080", "#505050", "#505050", "#505050", "#505050", "#505050");
//var ALLY_COLORS_DEF = new Array("#a0a0ff", "#ffa0a0", "#a0ffa0", "#ffff80", 
//	"#80ffff", "#ff80ff", "#40c0ff", "#ffc040", "#c0ff40", "#b0b0b0");
var USER_COLORS_DEF = new Array(
	"#0000a0", "#a00000", "#00a000", "#808000", "#008080",
	"#505050", "#505050", "#505050", "#505050", "#505050",
	"#0000a0", "#a00000", "#00a000", "#808000", "#008080",
	"#505050", "#505050", "#505050", "#505050", "#505050",
	"#0000a0", "#a00000", "#00a000", "#808000", "#008080",
	"#505050", "#505050", "#505050", "#505050", "#505050"
	);
var ALLY_COLORS_DEF = new Array(
	"#a0a0ff", "#ffa0a0", "#a0ffa0", "#ffff80", "#80ffff", 
	"#ff80ff", "#40c0ff", "#ffc040", "#c0ff40", "#b0b0b0",
	"#a0a0ff", "#ffa0a0", "#a0ffa0", "#ffff80", "#80ffff", 
	"#ff80ff", "#40c0ff", "#ffc040", "#c0ff40", "#b0b0b0",
	"#a0a0ff", "#ffa0a0", "#a0ffa0", "#ffff80", "#80ffff", 
	"#ff80ff", "#40c0ff", "#ffc040", "#c0ff40", "#b0b0b0"
	);
var NPC_COLOR = "purple";
var ETC_COLOR = "lightgrey";

var MINPEI = [
	[1,"★"                ,"森1 岩0 鉄0 穀0" , 5 ,  0   ,  0   ,  0   ,   0 ,  0  ,   0 ],
	[1,"★"                ,"森0 岩1 鉄0 穀0" , 5 ,  0   ,  0   ,  0   ,   0 ,  0  ,   0 ],
	[1,"★"                ,"森0 岩0 鉄1 穀0" , 5 ,  0   ,  0   ,  0   ,   0 ,  0  ,   0 ],
	[1,"★"                ,"森0 岩0 鉄0 穀1" , 5 ,  0   ,  0   ,  0   ,   0 ,  0  ,   0 ],
	[1,"★★"              ,"森3 岩0 鉄0 穀0" , 0 ,  0.5 ,  4   ,  0.5 ,   0 ,  0  ,   0 ],
	[1,"★★"              ,"森0 岩3 鉄0 穀0" , 0 ,  4   ,  0.5 ,  0.5 ,   0 ,  0  ,   0 ],
	[1,"★★"              ,"森0 岩0 鉄3 穀0" , 0 ,  0.5 ,  0.5 ,  4   ,   0 ,  0  ,   0 ],
	[1,"★★★"            ,"森1 岩1 鉄1 穀0" , 0 ,  6   ,  6   ,  6   ,   0 ,  0  ,   0 ],
 	[1,"★★★"            ,"森0 岩0 鉄0 穀4" , 0 ,  7.5 ,  7.5 ,  7.5 ,   0 ,  0  ,   0 ],
 	[1,"★★★★"          ,"森2 岩2 鉄2 穀0" , 0 , 12.5 , 12.5 , 12.5 ,   0 ,  0  ,   0 ],
	[1,"★★★★"          ,"森0 岩0 鉄0 穀8" , 0 , 12.5 , 12.5 , 12.5 ,   0 ,  0  ,   0 ],
	[1,"★★★★"          ,"森2 岩2 鉄2 穀2" , 0 , 11   , 11   , 11   ,   0 ,  0  ,   0 ],
	[1,"★★★★★"        ,"森6 岩0 鉄0 穀0" , 0 , 10   , 40   , 10   ,   0 ,  0  ,   0 ],
	[1,"★★★★★"        ,"森0 岩6 鉄0 穀0" , 0 , 40   , 10   , 10   ,   0 ,  0  ,   0 ],
	[1,"★★★★★"        ,"森0 岩0 鉄6 穀0" , 0 , 10   , 10   , 40   ,   0 ,  0  ,   0 ],
	[1,"★★★★★★"      ,"森10 岩0 鉄0 穀0", 0 , 75   , 15   , 15   ,   0 ,  0  ,   0 ],
	[1,"★★★★★★"      ,"森0 岩10 鉄0 穀0", 0 , 15   , 75   , 15   ,   0 ,  0  ,   0 ],
	[1,"★★★★★★"      ,"森0 岩0 鉄10 穀0", 0 , 15   , 15   , 75   ,   0 ,  0  ,   0 ],
	[1,"★★★★★★★"    ,"森3 岩3 鉄3 穀0" , 0 ,  0   ,  0   ,  0   ,  50 ,  50 ,  50 ],
	[1,"★★★★★★★★"  ,"森4 岩4 鉄4 穀4" , 0 ,  0   ,  0   ,  0   , 100 , 100 , 100 ],
	[1,"★★★★★★★★★","森0 岩0 鉄0 穀18", 0 ,  0   ,  0   ,  0   , 150 , 150 , 150 ]
	,
	[2,"★"                ,"森1 岩0 鉄0 穀0",  5 ,  0   ,  0   , 0    ,  0    ,   0   ,   0   ],
	[2,"★"                ,"森0 岩1 鉄0 穀0",  5 ,  0   ,  0   , 0    ,  0    ,   0   ,   0   ],
	[2,"★"                ,"森0 岩0 鉄1 穀0",  5 ,  0   ,  0   , 0    ,  0    ,   0   ,   0   ],
	[2,"★"                ,"森0 岩0 鉄0 穀1",  5 ,  0   ,  0   , 0    ,  0    ,   0   ,   0   ],
	[2,"★★"              ,"森3 岩0 鉄0 穀0",  0 ,  0.5 ,  6   , 0.5  ,  0    ,   0   ,   0   ],
	[2,"★★"              ,"森0 岩3 鉄0 穀0",  0 ,  6   ,  0.5 , 0.5  ,  0    ,   0   ,   0   ],
	[2,"★★"              ,"森0 岩0 鉄3 穀0",  0 ,  0.5 ,  0.5 , 6    ,  0    ,   0   ,   0   ],
	[2,"★★★"            ,"森1 岩1 鉄1 穀0",  0 ,  7.5 ,  7.5 , 7.5  ,  0    ,   0   ,   0   ],
	[2,"★★★"            ,"森0 岩0 鉄0 穀4",  0 , 17   ,  3   , 3    ,  0    ,   0   ,   0   ],
	[2,"★★★"            ,"森0 岩0 鉄0 穀1",  0 ,  3   , 17   , 3    ,  0    ,   0   ,   0   ],
	[2,"★★★★"          ,"森2 岩2 鉄2 穀0",  0 , 14   , 14   , 14   ,  0    ,   0   ,   0   ],
	[2,"★★★★"          ,"森2 岩2 鉄2 穀0",  0 ,  5   ,  5   , 35   ,  0    ,   0   ,   0   ],
	[2,"★★★★"          ,"森0 岩0 鉄0 穀8",  0 , 15   , 15   , 15   ,  0    ,   0   ,   0   ],
	[2,"★★★★★"        ,"森6 岩0 鉄0 穀0",  0 , 12.5 , 65   , 12.5 ,  0    ,   0   ,   0   ],
	[2,"★★★★★"        ,"森0 岩6 鉄0 穀0",  0 , 65   , 12.5 , 12.5 ,  0    ,   0   ,   0   ],
	[2,"★★★★★"        ,"森0 岩0 鉄6 穀0",  0 , 12.5 , 12.5 , 65   ,  0    ,   0   ,   0   ],
	[2,"★★★★★"        ,"森0 岩0 鉄0 穀1",  0 , 30   , 30   , 30   ,  0    ,   0   ,   0   ],
	[2,"★★★★★★"      ,"森2 岩2 鉄2 穀0",  0 ,  0   ,  0   , 0    ,  27.5 ,  27.5 ,  27.5 ],
	[2,"★★★★★★"      ,"森10 岩0 鉄0 穀0", 0 ,  0   ,  0   , 0    ,  12.5 ,  60   ,  12.5 ],
	[2,"★★★★★★"      ,"森0 岩10 鉄0 穀0", 0 ,  0   ,  0   , 0    ,  60   ,  12.5 ,  12.5 ],
	[2,"★★★★★★"      ,"森0 岩0 鉄10 穀0", 0 ,  0   ,  0   , 0    ,  12.5 ,  12.5 ,  60   ],
	[2,"★★★★★★★"    ,"森2 岩4 鉄4 穀0",  0 ,  0   ,  0   , 0    ,  65   ,  22.5 ,  65   ],
	[2,"★★★★★★★"    ,"森0 岩0 鉄0 穀1",  0 ,  0   ,  0   , 0    ,  65   ,  65   ,  22.5 ],
	[2,"★★★★★★★"    ,"森0 岩0 鉄0 穀12", 0 ,  0   ,  0   , 0    ,  22.5 ,  65   ,  65   ],
	[2,"★★★★★★★★"  ,"森4 岩1 鉄2 穀0",  0 ,  0   ,  0   , 0    ,  50   , 250   ,  25   ],
	[2,"★★★★★★★★"  ,"森2 岩4 鉄1 穀0",  0 ,  0   ,  0   , 0    , 250   ,  50   ,  25   ],
	[2,"★★★★★★★★"  ,"森1 岩2 鉄4 穀0",  0 ,  0   ,  0   , 0    ,  25   ,  50   , 250   ],
	[2,"★★★★★★★★★","森4 岩4 鉄4 穀4",  0 ,  0   ,  0   , 0    , 200   , 200   , 200   ],
	[2,"★★★★★★★★★","森1 岩1 鉄1 穀2",  0 ,  0   ,  0   , 0    , 190   , 190   , 190   ],
	[2,"★★★★★★★★★","森0 岩0 鉄0 穀18", 0 ,  0   ,  0   , 0    , 175   , 175   , 175   ]
	,
	[3,"★",                "森1 岩0 鉄0 穀0",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[3,"★",                "森0 岩1 鉄0 穀0",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[3,"★",                "森0 岩0 鉄1 穀0",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[3,"★",                "森0 岩0 鉄0 穀1",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[3,"★★",              "森3 岩0 鉄0 穀0",  0 ,  0.5 , 10   , 0.5  ,   0 ,   0 ,   0 ],
	[3,"★★",              "森0 岩3 鉄0 穀0",  0 ,  10  ,  0.5 , 0.5  ,   0 ,   0 ,   0 ],
	[3,"★★",              "森0 岩0 鉄3 穀0",  0 ,  0.5 ,  0.5 , 10   ,   0 ,   0 ,   0 ],
	[3,"★★★",            "森1 岩1 鉄1 穀0",  0 ,  9   ,  9   , 9    ,   0 ,   0 ,   0 ],
	[3,"★★★",            "森0 岩0 鉄0 穀4",  0 , 20   ,  6   , 6    ,   0 ,   0 ,   0 ],
	[3,"★★★",            "森0 岩0 鉄0 穀1",  0 ,  7   , 22   , 7    ,   0 ,   0 ,   0 ],
	[3,"★★★★",          "森2 岩2 鉄2 穀0",  0 , 16   , 16   , 16   ,   0 ,   0 ,   0 ],
	[3,"★★★★",          "森2 岩2 鉄2 穀0",  0 ,  7.5 ,  7.5 , 35   ,   0 ,   0 ,   0 ],
	[3,"★★★★",          "森0 岩0 鉄0 穀8",  0 , 19   , 19   , 19   ,   0 ,   0 ,   0 ],
	[3,"★★★★★",        "森6 岩0 鉄0 穀0",  0 , 12.5 , 75   , 12.5 ,   0 ,   0 ,   0 ],
	[3,"★★★★★",        "森0 岩6 鉄0 穀0",  0 , 75   , 12.5 , 12.5 ,   0 ,   0 ,   0 ],
	[3,"★★★★★",        "森0 岩0 鉄6 穀0",  0 , 12.5 , 12.5 , 75   ,   0 ,   0 ,   0 ],
	[3,"★★★★★",        "森0 岩0 鉄0 穀1",  0 , 32.5 , 32.5 , 32.5 ,   0 ,   0 ,   0 ],
	[3,"★★★★★",        "森2 岩2 鉄1 穀0",  0 , 35   , 35   , 35   ,   0 ,   0 ,   0 ],
	[3,"★★★★★",        "森1 岩1 鉄2 穀0",  0 , 37.5 , 37.5 , 37.5 ,   0 ,   0 ,   0 ],
	[3,"★★★★★★",      "森10 岩0 鉄0 穀0", 0 ,  0   ,  0   , 0    ,  20 ,  90 ,  20 ],
	[3,"★★★★★★",      "森0 岩10 鉄0 穀0", 0 ,  0   ,  0   , 0    ,  90 ,  20 ,  20 ],
	[3,"★★★★★★",      "森0 岩0 鉄10 穀0", 0 ,  0   ,  0   , 0    ,  20 ,  20 ,  90 ],
	[3,"★★★★★★",      "森2 岩2 鉄2 穀0",  0 ,  0   ,  0   , 0    ,  40 ,  40 ,  40 ],
	[3,"★★★★★★★",    "森2 岩4 鉄4 穀0",  0 ,  0   ,  0   , 0    , 110 ,  30 ,  30 ],
	[3,"★★★★★★★",    "森0 岩0 鉄0 穀1",  0 ,  0   ,  0   , 0    , 110 , 110 ,  30 ],
	[3,"★★★★★★★",    "森0 岩0 鉄0 穀12", 0 ,  0   ,  0   , 0    ,  30 , 110 ,  30 ],
	[3,"★★★★★★★★",  "森14 岩0 鉄0 穀0", 0 ,  0   ,  0   , 0    , 250 ,  75 ,  75 ],
	[3,"★★★★★★★★",  "森0 岩14 鉄0 穀0", 0 ,  0   ,  0   , 0    ,  75 , 250 ,  75 ], 
	[3,"★★★★★★★★",  "森0 岩0 鉄14 穀0", 0 ,  0   ,  0   , 0    ,  75 ,  75 , 250 ],
	[3,"★★★★★★★★",  "森4 岩1 鉄2 穀0",  0 ,  0   ,  0   , 0    ,  50 , 250 ,  25 ],
	[3,"★★★★★★★★",  "森2 岩4 鉄1 穀0",  0 ,  0   ,  0   , 0    , 250 ,  50 ,  25 ],
	[3,"★★★★★★★★",  "森1 岩2 鉄4 穀0",  0 ,  0   ,  0   , 0    ,  25 ,  50 , 250 ],
	[3,"★★★★★★★★★","森1 岩0 鉄0 穀0",  0 ,  0   ,  0   , 0    , 150 , 300 , 150 ],
	[3,"★★★★★★★★★","森0 岩1 鉄0 穀0",  0 ,  0   ,  0   , 0    , 300 , 150 , 150 ],
	[3,"★★★★★★★★★","森0 岩0 鉄1 穀0",  0 ,  0   ,  0   , 0    , 150 , 150 , 300 ],
	[3,"★★★★★★★★★","森4 岩4 鉄4 穀4",  0 ,  0   ,  0   , 0    , 300 , 300 , 300 ], 
	[3,"★★★★★★★★★","森1 岩1 鉄1 穀2",  0 ,  0   ,  0   , 0    , 250 , 250 , 250 ],
	[3,"★★★★★★★★★","森0 岩0 鉄0 穀18", 0 ,  0   ,  0   , 0    , 200 , 200 , 200 ]
	,
	[4,"★",                "森1 岩0 鉄0 穀0",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[4,"★",                "森0 岩1 鉄0 穀0",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[4,"★",                "森0 岩0 鉄1 穀0",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[4,"★",                "森0 岩0 鉄0 穀1",  5 ,  0   ,  0   , 0    ,   0 ,   0 ,   0 ],
	[4,"★★",              "森3 岩0 鉄0 穀0",  0 ,  1   , 12.5 , 1    ,   0 ,   0 ,   0 ],
	[4,"★★",              "森0 岩3 鉄0 穀0",  0 , 12.5 ,  1   , 1    ,   0 ,   0 ,   0 ],
	[4,"★★",              "森0 岩0 鉄3 穀0",  0 ,  1   ,  1   , 12.5 ,   0 ,   0 ,   0 ],
	[4,"★★★",            "森1 岩1 鉄1 穀0",  0 , 15   , 15   , 15   ,   0 ,   0 ,   0 ],
	[4,"★★★",            "森0 岩0 鉄0 穀4",  0 , 25   , 12   , 12   ,   0 ,   0 ,   0 ],
	[4,"★★★",            "森0 岩0 鉄0 穀1",  0 , 13   , 25   , 13   ,   0 ,   0 ,   0 ],
	[4,"★★★★",          "森2 岩2 鉄2 穀0",  0 , 33   , 33   , 33   ,   0 ,   0 ,   0 ],
	[4,"★★★★",          "森2 岩2 鉄2 穀0",  0 , 30   , 30   , 45   ,   0 ,   0 ,   0 ],
	[4,"★★★★",          "森0 岩0 鉄0 穀8",  0 , 36   , 36   , 36   ,   0 ,   0 ,   0 ],
	[4,"★★★★★",        "森6 岩0 鉄0 穀0",  0 , 33   , 111  , 33   ,   0 ,   0 ,   0 ],
	[4,"★★★★★",        "森0 岩6 鉄0 穀0",  0 , 111  , 33   , 33   ,   0 ,   0 ,   0 ],
	[4,"★★★★★",        "森0 岩0 鉄6 穀0",  0 , 33   , 33   , 111  ,   0 ,   0 ,   0 ],
	[4,"★★★★★",        "森0 岩0 鉄0 穀1",  0 , 55   , 55   , 55   ,   0 ,   0 ,   0 ],
	[4,"★★★★★",        "森2 岩2 鉄1 穀0",  0 , 60   , 60   , 60   ,   0 ,   0 ,   0 ],
	[4,"★★★★★",        "森1 岩1 鉄2 穀0",  0 , 70   , 70   , 70   ,   0 ,   0 ,   0 ],
	[4,"★★★★★★",      "森10 岩0 鉄0 穀0", 0 ,  0   ,  0   , 0    ,  50 , 180 ,  50 ],
	[4,"★★★★★★",      "森0 岩10 鉄0 穀0", 0 ,  0   ,  0   , 0    , 180 ,  50 ,  50 ],
	[4,"★★★★★★",      "森0 岩0 鉄10 穀0", 0 ,  0   ,  0   , 0    ,  50 ,  50 , 180 ],
	[4,"★★★★★★",      "森2 岩2 鉄2 穀0",  0 ,  0   ,  0   , 0    ,  85 ,  85 ,  85 ],
	[4,"★★★★★★★",    "森2 岩4 鉄4 穀0",  0 ,  0   ,  0   , 0    , 220 , 110 , 110 ],
	[4,"★★★★★★★",    "森0 岩0 鉄0 穀1",  0 ,  0   ,  0   , 0    , 110 , 110 , 220 ],
	[4,"★★★★★★★",    "森0 岩0 鉄0 穀12", 0 ,  0   ,  0   , 0    , 110 , 220 , 110 ],
	[4,"★★★★★★★★",  "森14 岩0 鉄0 穀0", 0 ,  0   ,  0   , 0    , 400 , 175 , 175 ],
	[4,"★★★★★★★★",  "森0 岩14 鉄0 穀0", 0 ,  0   ,  0   , 0    , 175 , 400 , 175 ], 
	[4,"★★★★★★★★",  "森0 岩0 鉄14 穀0", 0 ,  0   ,  0   , 0    , 175 , 175 , 400 ],
	[4,"★★★★★★★★",  "森4 岩1 鉄2 穀0",  0 ,  0   ,  0   , 0    , 200 , 350 , 100 ],
	[4,"★★★★★★★★",  "森2 岩4 鉄1 穀0",  0 ,  0   ,  0   , 0    , 350 , 200 , 100 ],
	[4,"★★★★★★★★",  "森1 岩2 鉄4 穀0",  0 ,  0   ,  0   , 0    , 100 , 200 , 350 ],
	[4,"★★★★★★★★★","森1 岩0 鉄0 穀0",  0 ,  0   ,  0   , 0    , 400 , 600 , 400 ],
	[4,"★★★★★★★★★","森0 岩1 鉄0 穀0",  0 ,  0   ,  0   , 0    , 600 , 400 , 400 ],
	[4,"★★★★★★★★★","森0 岩0 鉄1 穀0",  0 ,  0   ,  0   , 0    , 400 , 400 , 600 ],
	[4,"★★★★★★★★★","森4 岩4 鉄4 穀4",  0 ,  0   ,  0   , 0    , 450 , 450 , 450 ], 
	[4,"★★★★★★★★★","森1 岩1 鉄1 穀2",  0 ,  0   ,  0   , 0    , 400 , 400 , 400 ],
	[4,"★★★★★★★★★","森0 岩0 鉄0 穀18", 0 ,  0   ,  0   , 0    , 350 , 350 , 350 ]
];

var SPEC = [
	[ 15, 10, 10, 10, 15],	//剣兵
	[ 50, 40, 25, 55, 40],	//槍兵
	[ 52, 58, 42, 26, 42],	//弓兵
	[ 54, 28, 60, 44, 44],	//騎兵
	[200,100, 63,137,100],	//矛槍兵
	[208,145,105, 65,105],	//弩兵
	[216, 70,150,110,110]	//近衛騎兵
];


//CSV出力
var CSV_RADIUS_S = 25; //半径S
var CSV_RADIUS_L = 100; //半径L

//グローバル変数
var USERS; //君主名
var ALLYS; //同盟名
var USER_COLORS; //君主色
var ALLY_COLORS; //同盟色
var CENTER_X; //中心X座標
var CENTER_Y; //中心Y座標
var MY_X = 0; //自拠点X座標
var MY_Y = 0; //自拠点Y座標
var BASE_TIME = ""; //基準時刻
var MAP_MODE = MAP_MODE_S; //地図モード（狭域/中域/広域）
var INPUT_MODE = INPUT_MODE_NAME; //入力モード（名称/色）
var DISP_NPC_YET = false; //未攻略NPC表示フラグ
var DISP_NPC_FALLEN = false; //攻略済NPC表示フラグ
var DISP_PERIOD0 = false;  //期数
var DISP_PERIOD1 = true;  //期数
var DISP_PERIOD2 = false; //期数
var DISP_PERIOD3 = false; //期数
var DISP_PERIOD4 = false; //期数
var DISP_COMPROMISE = 70; //妥協点

var MAP_WIDE = false; //プチワイド

var MATCH_FULL = false; //完全一致フラグ
var MAP_SCALE; //地図幅
var LOADED_MAPS = new Array();
var CELLS_CACHE = new Array();
var ALLYS_CACHE = new Array();
var USERS_CACHE = new Array();
var ALLYS_INDEX = new Array();
var USERS_INDEX = new Array();
var GET_MAP_LIST = new Array();		// by どらごら
var GET_MAP_LIST_COUNTER;					// by どらごら
var MAX_MAP_LIST;									// by どらごら
var GET_MAP_SLEEP_TID;						// 条件監視sleep by どらごら
var j$;														// jQuery by どらごら
var ROUTE_ENABLE = false;					// 遠征支援を有効にする by どらごら
var CURSOR_ENABLE = false;				// カーソル位置 by どらごら
var route_star1c = false;	//by鮪
var route_form = false;	//by鮪
var MEMBER_ID_LIST = new Array();
var MEMBER_ID_LIST_COUNTER;
var MEMBER_ID_MAX_COUNTER;
var MEMBER_INFO_TEXT;
var MEMBER_SLEEP_TID;

//マウスドラッグ用
var MOUSE_DRAGGING = false;
var MOUSE_DRAG_START_X;
var MOUSE_DRAG_START_Y;

//main
(function(){
	
	//mixi鯖障害回避用: 広告iframe内で呼び出されたら無視
	var container = document.evaluate('//*[@id="container"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (container.snapshotLength == 0) return;
	
	initGMWrapper();
	BASE_TIME = getBaseTime();
	ALLYS_INDEX = GM_getValue(location.hostname + "ALLYS_INDEX", "").split(DELIMIT);
	USERS_INDEX = GM_getValue(location.hostname + "USERS_INDEX", "").split(DELIMIT);
	
	// jQuery append by どらごら
	jQueryAppend();
	
	// オプション読み出し by どらごら
	ROUTE_ENABLE = GM_getValue(location.hostname + "route_enable", false);
	CURSOR_ENABLE = GM_getValue(location.hostname + "cursor_flg", false);
	route_star1c = GM_getValue(location.hostname + "route_star1c", false);//by鮪
	route_form = GM_getValue(location.hostname + "route_form", "");//by鮪

	// 競合回避 by どらごら
	if( document.getElementById('route_output') != null) {
		ROUTE_ENABLE = false;
	}
	
	//地図ページ
	if (location.pathname == "/map.php") {
		
		//地図サイズ
		MAP_SCALE = getMapScale();
		
		//中心座標取得
		CENTER_X = parseInt(getParameter("x"));
		if (isNaN(CENTER_X)) CENTER_X = 0;
		CENTER_Y = parseInt(getParameter("y"));
		if (isNaN(CENTER_Y)) CENTER_Y = 0;
		
		//マップモード取得
		MAP_MODE = GM_getValue(location.hostname + "MAP_MODE", "");
		//GM_setValue(location.hostname + "MAP_MODE", "");
		if((ROUTE_ENABLE) && (GM_getValue(location.hostname + "default_mapM", "false") == true)) {
			// 中域画面が標準 by どらごら
			if(MAP_MODE == "") MAP_MODE = MAP_MODE_M;
		} else {
			GM_setValue(location.hostname + "MAP_MODE", "");
		}
		
		//自拠点座標取得
		var xy = getMyXY();
		if (xy == "") {
			MY_X = 0;
			MY_Y = 0;
		} else {
			MY_X = parseInt(xy.split(",")[0]);
			MY_Y = parseInt(xy.split(",")[1]);
		}
		
		//名称取得
		USERS = loadNames("USERS");
		ALLYS = loadNames("ALLYS");
		
		//色取得
		USER_COLORS = loadColors("USER_COLORS", USER_COLORS_DEF);
		ALLY_COLORS = loadColors("ALLY_COLORS", ALLY_COLORS_DEF);
		
		//NPC表示フラグ
		DISP_NPC_YET = GM_getValue(location.hostname + "DISP_NPC_YET", true);
		DISP_NPC_FALLEN = GM_getValue(location.hostname + "DISP_NPC_FALLEN", false);
		
		//期数
		DISP_PERIOD0 = GM_getValue(location.hostname + "DISP_PERIOD0", false);
		DISP_PERIOD1 = GM_getValue(location.hostname + "DISP_PERIOD1", true);
		DISP_PERIOD2 = GM_getValue(location.hostname + "DISP_PERIOD2", false);
		DISP_PERIOD3 = GM_getValue(location.hostname + "DISP_PERIOD3", false);
		DISP_PERIOD4 = GM_getValue(location.hostname + "DISP_PERIOD4", false);
		DISP_COMPROMISE = GM_getValue(location.hostname + "DISP_COMPROMISE", 70);

		//プチワイド
		MAP_WIDE = GM_getValue(location.hostname + "MAP_WIDE", false);
		if (MAP_WIDE){
			RADIUS = 38; 		//半径（中域）
			CELL_SIZE_M = 9;	//中域地図の1マスサイズ(px)
			FONT_SIZE = "7px";	//中域地図のマス内文字サイズ
		} else {
			RADIUS = 25;		//半径（中域）
			CELL_SIZE_M = 14;	//中域地図の1マスサイズ(px)
			FONT_SIZE = "10px";	//中域地図のマス内文字サイズ
		}

		//完全一致フラグ
		MATCH_FULL = GM_getValue(location.hostname + "MATCH_FULL", false);
		
		saveMapData();
		window.setTimeout(saveCapital, 0);
		window.setTimeout(saveAllyForMap, 0);
		window.setTimeout(markChangeArea, 0);
		window.setTimeout(defaultTargets, 0);
		window.setTimeout(addMapHtml, 0);
		window.setTimeout(changeMap, 0);
		
	//同盟トップページ
	} else if (location.pathname == "/alliance/info.php") {
		saveAllyForAllyInfo();
		allianceCSV();

	//君主プロフィールページ
	} else if (location.pathname == "/user/" || location.pathname == "/user/index.php") {
		saveUserForProf();
	// 出兵画面 by どらごら
	} else if (location.pathname == "/facility/castle_send_troop.php") {
		sendTroop();
	// 兵士管理画面 by 鮪
	} else if (location.pathname == "/facility/unit_status.php") {
		unit_status_matome();
	}
	
	window.setTimeout(saveAllysIndex, 0);
	window.setTimeout(saveUsersIndex, 0);
})();

//地図データ保存
function saveMapData() {
	saveMapData2(document);
}
function saveMapData2(dom) {
	var areas = dom.evaluate('//*[@id="mapOverlayMap"]//area/@onmouseover', 
		dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < areas.snapshotLength; i++) {
		rowText = areas.snapshotItem(i).textContent;
		rowText = rowText.replace(/^.*mapInfoView/, "mapInfoViewCustom");
		rowText = rowText.replace(/^.*rewrite/, "mapInfoViewCustom");
		rowText = rowText.replace(/\); .*$/, ");");
		eval(rowText);
	}
}
function mapInfoViewCustom(h,k,g,l,e,c,b,f,j,d,i,a) {
	window.setTimeout(function() {
		var key = location.hostname + l;
		var xy = l.replace(/^\((-?[0-9]+\,-?[0-9]+)\)$/, "$1");
		
		//前セルデータ取得
		var data = loadCellData(key);
		
		//保存データ作成
		data = updateMapCellBefore(data);
		data[IDX_VILLAGE_NAME] = h; //地名
		data[IDX_USER_NAME] = k; //君主名
		data[IDX_POPULATION] = (g=="-") ? "" : g; //人口
		data[IDX_ALLIANCER] = e; //同盟名
		data[IDX_POWER] = c; //戦力
		data[IDX_WOOD] = f; //森
		data[IDX_STONE] = j; //岩
		data[IDX_IRON] = d; //鉄
		data[IDX_RICE] = i; //穀
		data[IDX_NPC_FLG] = a; //NPC拠点
		if (data[IDX_CAPITAL_FLG] != "C" || data[IDX_POPULATION] == ""){
			data[IDX_CAPITAL_FLG] = "";	//人口なしまたは最新のフラグ以外はクリア
		}
		
		//Greasemonkey領域に永続保存
		saveCellData(key, data);
		
		//同盟⇔君主→拠点関係性情報更新
		if (data[IDX_USER_NAME] != "") {
			//君主所属同盟情報更新
			updateAllyMember(data[IDX_USER_NAME], data[IDX_ALLIANCER]);
			
			//拠点情報更新
			if (data[IDX_POPULATION] != "" || data[IDX_NPC_FLG] == "1") {
				var userData = getUserDataCache(data[IDX_USER_NAME]);
				if (searchArrayItem(userData[IDX_USER_VILLAGES], xy) < 0) {
					userData[IDX_USER_VILLAGES].push(xy);
					saveUserData(data[IDX_USER_NAME], userData);
				}
			}
		}
		
		//NPC砦を登録
		if (data[IDX_NPC_FLG] == "1") {
			saveNpcsIndex(xy);
		}
	}, 0);
}

//前所有者情報が基準時刻より古かったら更新
function updateMapCellBefore(data) {
	if (data[IDX_TIME_BEFORE] == undefined || 
		data[IDX_TIME_BEFORE] < BASE_TIME) {
		
		data[IDX_TIME_BEFORE] = getCurrentTime2(); //前所有者更新時刻
		data[IDX_USER_BEFORE] = data[IDX_USER_NAME]; //前君主
		data[IDX_ALLY_BEFORE] = data[IDX_ALLIANCER]; //前同盟
	}
	return data;
}

//地図のマスデータを保存
function saveCellData(key, data) {
	
	//初回表示時の変更チェックを回避
	if (data[IDX_USER_BEFORE] == undefined) {
		data[IDX_USER_BEFORE] = data[IDX_USER_NAME];
	}
	if (data[IDX_ALLY_BEFORE] == undefined) {
		data[IDX_ALLY_BEFORE] = data[IDX_ALLIANCER];
	}
	
	//最終更新日時
	data[IDX_LAST_UPDATE] = getCurrentTime();
	
	//Greasemonkey領域に永続保存
	GM_setValue(key, genDelimitString(data, DELIMIT));
//console.log(key + ": " + data);
	CELLS_CACHE[key] = data;
}

//地図のマスデータを読み込み
function loadCellData(key) {
	var data = new Array();
	
	//Greasemonkey領域から取得
	var dataStr = GM_getValue(key);
	if (dataStr != undefined) {
		data = dataStr.split(DELIMIT);
	}
	
	return data;
}

//地図のマスデータのキャッシュを取得
function getCellDataCache(key) {
	if (CELLS_CACHE[key] == undefined) {
		CELLS_CACHE[key] = loadCellData(key);
	}
	return CELLS_CACHE[key];
}

//本拠地フラグ保存
function saveCapital() {
	// by どらごら
	saveCapital2(document);
}
function saveCapital2(dom) {
	var myAlly;
	var imgs = dom.evaluate('//*[@id="mapsAll"]//img', 
		dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < imgs.snapshotLength; i++) {
		var className = imgs.snapshotItem(i).className;
		var src = imgs.snapshotItem(i).src;
		
		if (!className.match(/mapAll[0-9]+/)) {
			continue;
		}
		
		if (src.match(/capital_[a-z]+_[a-z]+\.png$/)) {
			var xy = getXyFromMapClass(className);
			var key = generateCellKey(xy[0], xy[1]);
			var data = getCellDataCache(key);
			data[IDX_CAPITAL_FLG] = "C";
			saveCellData(key, data);
		}
	}
}

//配下同盟データ保存（全体地図ページ）
function saveAllyForMap() {
	// by どらごら
	saveAllyForMap2(document);
}
function saveAllyForMap2(dom) {
	var myAlly;
	var depAllys = new Array(); //自同盟の配下である同盟
	var aloneAllys = new Array(); //自同盟の配下でない同盟
	var imgs = dom.evaluate('//*[@id="mapsAll"]//img', 
		dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < imgs.snapshotLength; i++) {
		var className = imgs.snapshotItem(i).className;
		var src = imgs.snapshotItem(i).src;
		
		if (!className.match(/mapAll[0-9]+/)) {
			continue;
		}
		
		if (src.match(/_b_.\.png$/) || src.match(/_g_.\.png$/)) {
			if (myAlly == undefined) {
				myAlly = getAllyFromMapClass(className);
			}
		} else if (src.match(/_bk_.\.png$/)) {
			var allyName = getAllyFromMapClass(className);
			depAllys[allyName] = allyName;
		} else {
			var allyName = getAllyFromMapClass(className);
			aloneAllys[allyName] = allyName;
		}
	}
	
	// 自同盟名を取得する事で、下記直後の条件文が真になるようにする by どらごら
	myAlly = getAllyFromXy(MY_X, MY_Y);
	
	//Greasemonkey領域に永続保存
	if (myAlly != undefined && myAlly != "") {
		
		//自同盟の配下である同盟
		for (var i in depAllys) {
			updateParentAlly(i, myAlly);
		}
		
		//自同盟の配下でない同盟
		for (var i in aloneAllys) {
			var before = getParentAlly(i);
			
			//かつては自同盟配下だった同盟
			if (before == myAlly) {
				updateParentAlly(i, "");
			}
		}
	}
}

//配下同盟データ保存（同盟情報ページ）
function saveAllyForAllyInfo() {
	
	//「略称」欄取得
	var myAlly = "";
	var myAllyElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[3]/td',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (myAllyElem.snapshotLength == 0) return;
	myAlly = myAllyElem.snapshotItem(0).innerHTML;
	
	//「状態」欄取得
	var parentAlly = "";
	var statElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[6]/td',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	if (statElem.snapshotItem(0).innerHTML.match(/親同盟/)) {
		var parentAllyElem = document.evaluate(
			'//*[@id="gray02Wrapper"]//table/tbody/tr[6]/td/a',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (parentAllyElem.snapshotLength >= 1) {
			parentAlly = parentAllyElem.snapshotItem(0).innerHTML;
		}
	}
	
	//Greasemonkey領域に永続保存
	updateParentAlly(myAlly, parentAlly);
}

//君主領地データ保存（プロフィールページ）
function saveUserForProf() {
	
	//「君主」欄取得
	var user = "";
	var userElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[2]/td[2]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	user = userElem.snapshotItem(0).innerHTML;
	
	//「同盟」欄取得
	var ally = "";
	var allyElem = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr[3]/td[4]/a',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	ally = allyElem.snapshotItem(0).innerHTML;
	
	//「国情報」欄取得
	var landElems = document.evaluate(
		'//*[@id="gray02Wrapper"]//table/tbody/tr',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var isLandList =false;
	var villages = new Array();
	for (var i=0; i<landElems.snapshotLength; i++) {
		var item = landElems.snapshotItem(i);
		
		if (!isLandList) {
			if (trim(getChildElement(item, 0).innerHTML) == "名前") {
				isLandList = true;
			}
			continue;
		}
		
		//地名を取得
		var landall = getChildElement(item, 0).innerHTML;
		var land = trim(getChildElement(getChildElement(item, 0), 0).innerHTML);

		//座標を取得
		var xySrc = getChildElement(item, 1).innerHTML;
		xySrc = "" + xySrc.match(/-?[0-9]+\,-?[0-9]+/i);
		var xy = xySrc.split(",");
		var x = xy[0];
		var y = xy[1];
		if (!isNumeric(x) || !isNumeric(y)) continue;
		
		//人口を取得
		var popul = getChildElement(item, 2).innerHTML;
		if (!isNumeric(popul)) popul = "";
		
		//マスデータを更新
		var key = generateCellKey(x, y);
		var data = loadCellData(key);
		data = updateMapCellBefore(data);
		data[IDX_VILLAGE_NAME] = land;
		data[IDX_USER_NAME] = user;
		data[IDX_POPULATION] = popul;
		data[IDX_ALLIANCER] = ally;
		data[IDX_CAPITAL_FLG] = (landall.match(/本拠地/) ? "C" : "");
		saveCellData(key, data);
		
		//拠点の場合、座標を別領域に保存
		if (popul != "") {
			villages.push(xy);
		}
	}
	
	//同盟所属情報を更新
	updateAllyMember(user, ally);
	
	//君主の拠点データを更新
	var userData = getUserDataCache(user);
	userData[IDX_USER_VILLAGES] = villages;
	saveUserData(user, userData);
}

//MapタグのClass属性から同盟名を取得
function getAllyFromMapClass(className) {
	var xy = getXyFromMapClass(className);
	var data = getCellDataCache(generateCellKey(xy[0], xy[1]));
	var ally = data[IDX_ALLIANCER];
	if (ally == undefined) ally = "";
	
	return ally;
}

//MapタグのClass属性から座標を取得
function getXyFromMapClass(className) {
	var mapNo = parseInt(trimZero(className.replace(/mapAll/, "")));
    var x = CENTER_X - Math.floor((MAP_SCALE-1)/2) + Math.floor((mapNo-1) / MAP_SCALE);
    var y = CENTER_Y + Math.floor((MAP_SCALE-1)/2) - ((mapNo-1) % MAP_SCALE);
	return new Array(x, y);
}

//HTML要素追加
function addMapHtml() {
	var rootElem = document.createElement("div");
	rootElem.id = "maptool";
	
	var mapElem = document.evaluate('//*[@id="mapboxInner"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	mapElem.snapshotItem(0).insertBefore(
		rootElem, document.getElementById("mapAll").nextSibling);
	
	addLinkHtml(rootElem);
	addBodyHtml(rootElem);
	addHeadHtml(rootElem);
	if (navigator.userAgent.toLowerCase().indexOf('chrome') < 0) {
		initPopup();
	}
}

//地図ツールOpenリンク追加
function addLinkHtml(parentElem) {
	var addElem = document.createElement("div");
	parentElem.appendChild(addElem);
	addElem.id = "maptoolLink";
	addElem.style.margin = "4px 2px";
	
	//タイトル
	var titleElem =  document.createElement("span");
	titleElem.innerHTML = "地図ツール";
	titleElem.style.margin = "2px 2px";
	addElem.appendChild(titleElem);
	
	//aタグ（中域地図）
	var linkElem =  document.createElement("a");
	linkElem.id = "maptoolOpen";
	linkElem.href = "javascript:void(0);";
	linkElem.innerHTML = "中域";
	linkElem.style.backgroundColor = "black";
	linkElem.style.padding = "2px 4px";
	linkElem.style.margin = "2px 2px";
	addElem.appendChild(linkElem);
	
	//aタグ（広域地図）
	var linkElem2 =  document.createElement("a");
	linkElem2.id = "maptoolOpenL";
	linkElem2.href = "javascript:void(0);";
	linkElem2.innerHTML = "広域";
	linkElem2.style.backgroundColor = "black";
	linkElem2.style.padding = "2px 4px";
	linkElem2.style.margin = "2px 2px";
	addElem.appendChild(linkElem2);
	
	//aタグ（CSV出力S）
	var csvSizeS = CSV_RADIUS_S * 2 + 1;
	var linkElemCsvS =  document.createElement("a");
	linkElemCsvS.id = "maptoolCsvS";
	linkElemCsvS.href = "javascript:void(0);";
	linkElemCsvS.innerHTML = "CSV" + 
		"<span style='font-size:9px'>" + csvSizeS + "x" + csvSizeS + "</span>";
	linkElemCsvS.style.backgroundColor = "black";
	linkElemCsvS.style.padding = "2px 4px";
	linkElemCsvS.style.margin = "2px 2px";
	addElem.appendChild(linkElemCsvS);
	
	//aタグ（CSV出力L）
	var csvSizeL = CSV_RADIUS_L * 2 + 1;
	var linkElemCsvL =  document.createElement("a");
	linkElemCsvL.id = "maptoolCsvL";
	linkElemCsvL.href = "javascript:void(0);";
	linkElemCsvL.innerHTML = "CSV" + 
		"<span style='font-size:9px'>" + csvSizeL + "x" + csvSizeL + "</span>";
	linkElemCsvL.style.backgroundColor = "black";
	linkElemCsvL.style.padding = "2px 4px";
	linkElemCsvL.style.margin = "2px 2px";
	addElem.appendChild(linkElemCsvL);
	
	//イベントリスナー（中域地図）
	linkElem.addEventListener("click",
		function() {
			MAP_MODE = MAP_MODE_M;
			changeMap();
		},
		true);
	
	//イベントリスナー（広域地図）
	linkElem2.addEventListener("click",
		function() {
			MAP_MODE = MAP_MODE_L;
			changeMap();
		},
		true);
	
	//イベントリスナー（CSV出力S）
	linkElemCsvS.addEventListener("click",
		function() {
			outputMapCsvS();
		},
		true);
	
	//イベントリスナー（CSV出力L）
	linkElemCsvL.addEventListener("click",
		function() {
			outputMapCsvL();
		},
		true);
	
	//初期化機能
//	if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
	
		//aタグ
		var linkElemClr =  document.createElement("a");
		linkElemClr.id = "maptoolClr";
		linkElemClr.href = "javascript:void(0);";
		linkElemClr.innerHTML = "初期化";
		linkElemClr.style.backgroundColor = "black";
		linkElemClr.style.padding = "2px 4px";
		linkElemClr.style.margin = "2px 2px";
		addElem.appendChild(linkElemClr);
		
		//イベントリスナー
		linkElemClr.addEventListener("click",
			function() {
				if (confirm("地図ツールデータを初期化します: " + location.hostname)) {
					clearAllData();
					location.reload();
				}
			},
			true);
//	}
}

//ヘッダ部HTML追加
function addHeadHtml(parentElem) {
	var addElem = document.createElement("div");
	parentElem.appendChild(addElem);
	
	// 遠征支援機能 by どらごら
	var routeHTML = "";
	/* orig無効化by鮪
	if(ROUTE_ENABLE) {
		routeHTML = 
			"<table style='font-size:11px; margin:1px;'>"+
			"<tr>"+
				"<td id='fld_route_output' style='background-color:black; padding:3px 4px;'>"+
					"<textarea cols='100' rows='10' id='route_output'></textarea>"+
				"</td>"+
				"<td id='fld_route_botton' style='background-color:black; padding:3px 4px; color:white; '>"+
					"<input id='route_cursor_enable' type='checkbox' style='vertical-align:bottom' " + 
							(CURSOR_ENABLE ? "checked" : "") + "/>カーソル位置<br />"+
					"<input id='route_default_mapM' type='checkbox' style='vertical-align:bottom' " + 
							(GM_getValue(location.hostname + "default_mapM", "true") == true ? "checked" : "") + "/>中域画面が標準<br />"+
					"<input id='route_chk_enable' type='checkbox' style='vertical-align:bottom' " + 
							(GM_getValue(location.hostname + "chk_flg", "false") == true ? "checked" : "") + " />直接クリック<br />"+
					"<input id='route_rewrite' type='button' value='マップに反映'></input><br />"+
					"<input id='route_validate' type='button' value='ルート検証'></input><br />"+
				"</td>"+
			"</tr>"+
			"</table>";
	}

	addElem.id = "maptoolHead";
	addElem.style.margin = "2px 2px";
/* orig
	addElem.innerHTML = 
		"<table style='font-size:11px; margin:1px;'>"+
		"<tr>"+
			"<td style='background-color:black; padding:3px 4px; text-align:center;'>"+
				"<a id='maptoolClose' href='javascript:void(0);'>狭域</a> "+
				"<a id='maptoolSwitch' href='javascript:void(0);'></a>"+
			"</td>"+
			"<td style='background-color:black; padding:3px 4px; "+
				"font-size:10px; font-family:monospace;'>"+
				"<a id='maptoolMoveLeft' href='javascript:void(0);'>←</a> "+
				"<a id='maptoolMoveUp' href='javascript:void(0);'>↑</a> "+
				"<a id='maptoolMoveDown' href='javascript:void(0);'>↓</a> "+
				"<a id='maptoolMoveRight' href='javascript:void(0);'>→</a>"+
			"</td>"+
			"<td style='width:4px'></td>"+
			"<td style='color:white; background-color:black; padding:0px 4px; "+
				"text-align:center;'>"+
				"<input id='maptoolTime' type='button' value='基準時更新' /> "+
				"<span id='base_time'></span>"+
			"</td>"+
			"<td style='width:4px'></td>"+
			"<td style='color:white; background-color:black; padding:3px 4px; "+
				"text-align:center;'>"+
				"入力モード "+
				"<a id='maptoolModeName' href='javascript:void(0);'>名称</a> "+
				"<a id='maptoolModeColor' href='javascript:void(0);'>色</a>"+
			"</td>"+
			"<td style='width:4px'></td>"+
			"<td style='color:white; background-color:black; padding:3px 4px; "+
				"text-align:center;'>"+
				"<input id='maptoolMatchFull' type='checkbox' "+
					"style='vertical-align:bottom' />完全一致"+
			"</td>"+
			//----- by どらごら
			"<td style='width:4px'></td>"+
			"<td style='color:white; background-color:black; padding:3px 4px; "+
				"text-align:center;'>"+
				"<a id='maptoolExGetMap5959' href='javascript:void(0);'>全範囲取得</a>"+
			"</td>"+
			"<td style='color:white; background-color:black; padding:3px 4px; "+
				"text-align:center;'>"+
				"<input id='mapwide' type='checkbox'/>プチワイド "+
			"</td>"+
			"<td style='color:white; background-color:black; padding:3px 4px; "+
				"text-align:center;'>"+
				"<input id='maptoolExRouteEnable' type='checkbox' style='vertical-align:bottom' " +
						(ROUTE_ENABLE ? "checked" : "") + " />遠征支援"+
			"</td>"+
			//-----
			"<td id='version' style='font-size:9px; padding:0px 4px;'></td>"+
		"</tr>"+
		"</table>"+
		"<table style='font-size:11px; margin:1px;'>"+
		"<tr>"+
		//----- by どらごら
		//	"<td style='color:white; background-color:black; padding:3px 4px'>君主</td>"+
		//	"<td style='color:white; background-color:black; padding:3px 4px' rowspan='2'>君主</td>"+
			"<td style='color:white; background-color:black; padding:3px 4px' rowspan='3'>君主</td>"+
		//-----
			"<td id='fld_user1' style='padding:3px 4px;'>"+
				"<input id='user1' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user2' style='padding:3px 4px;'>"+
				"<input id='user2' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user3' style='padding:3px 4px;'>"+
				"<input id='user3' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user4' style='padding:3px 4px;'>"+
				"<input id='user4' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user5' style='padding:3px 4px;'>"+
				"<input id='user5' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user6' style='padding:3px 4px;'>"+
				"<input id='user6' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user7' style='padding:3px 4px;'>"+
				"<input id='user7' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user8' style='padding:3px 4px;'>"+
				"<input id='user8' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user9' style='padding:3px 4px;'>"+
				"<input id='user9' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user10' style='padding:3px 4px;'>"+
				"<input id='user10' type='text' style='width:50px' />"+
			"</td>"+
		//----- by どらごら
		//	"<td style='background-color:purple; color:white; padding:3px 4px;'>"+
			"<td style='background-color:purple; color:white; padding:3px 4px;' rowspan='2'>"+
				"NPC "+
				"<input id='fld_npc_yet' type='checkbox' style='vertical-align:bottom' />未 "+
				"<input id='fld_npc_fallen' type='checkbox' style='vertical-align:bottom' />済"+
			"</td>"+
		"</tr>"+
		"<tr>"+
			"<td id='fld_user11' style='padding:3px 4px;'>"+
				"<input id='user11' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user12' style='padding:3px 4px;'>"+
				"<input id='user12' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user13' style='padding:3px 4px;'>"+
				"<input id='user13' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user14' style='padding:3px 4px;'>"+
				"<input id='user14' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user15' style='padding:3px 4px;'>"+
				"<input id='user15' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user16' style='padding:3px 4px;'>"+
				"<input id='user16' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user17' style='padding:3px 4px;'>"+
				"<input id='user17' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user18' style='padding:3px 4px;'>"+
				"<input id='user18' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user19' style='padding:3px 4px;'>"+
				"<input id='user19' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user20' style='padding:3px 4px;'>"+
				"<input id='user20' type='text' style='width:50px' />"+
			"</td>"+
		"</tr>"+
		"<tr>"+
			"<td id='fld_user21' style='padding:3px 4px;'>"+
				"<input id='user21' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user22' style='padding:3px 4px;'>"+
				"<input id='user22' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user23' style='padding:3px 4px;'>"+
				"<input id='user23' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user24' style='padding:3px 4px;'>"+
				"<input id='user24' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user25' style='padding:3px 4px;'>"+
				"<input id='user25' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user26' style='padding:3px 4px;'>"+
				"<input id='user26' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user27' style='padding:3px 4px;'>"+
				"<input id='user27' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user28' style='padding:3px 4px;'>"+
				"<input id='user28' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user29' style='padding:3px 4px;'>"+
				"<input id='user29' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_user30' style='padding:3px 4px;'>"+
				"<input id='user30' type='text' style='width:50px' />"+
			"</td>"+
			"<td style='background-color:darkgreen; color:white; padding:3px 4px;'>"+
				"期数　　"+
				"<input id='fld_compromise' type='text' style='width:30px' />% "+
			"</td>"+
		"</tr>"+
		"<tr>"+
		//	"<td style='color:white; background-color:black; padding:3px 4px'>同盟</td>"+
		//	"<td style='color:white; background-color:black; padding:3px 4px' rowspan='2'>同盟</td>"+
			"<td style='color:white; background-color:black; padding:3px 4px' rowspan='3'>同盟</td>"+
			
		//-----
			"<td id='fld_ally1' style='padding:3px 4px;'>"+
				"<input id='ally1' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally2' style='padding:3px 4px;'>"+
				"<input id='ally2' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally3' style='padding:3px 4px;'>"+
				"<input id='ally3' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally4' style='padding:3px 4px;'>"+
				"<input id='ally4' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally5' style='padding:3px 4px;'>"+
				"<input id='ally5' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally6' style='padding:3px 4px;'>"+
				"<input id='ally6' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally7' style='padding:3px 4px;'>"+
				"<input id='ally7' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally8' style='padding:3px 4px;'>"+
				"<input id='ally8' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally9' style='padding:3px 4px;'>"+
				"<input id='ally9' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally10' style='padding:3px 4px;'>"+
				"<input id='ally10' type='text' style='width:50px' />"+
			"</td>"+
			"<td style='background-color:darkgreen; color:white; padding:3px 4px;'>"+
				"<input id='fld_period1' type='radio' name='fld_period' value ='1' style='vertical-align:bottom' />1 "+
				"<input id='fld_period2' type='radio' name='fld_period' value ='2' style='vertical-align:bottom' />2 "+
				"<input id='fld_period3' type='radio' name='fld_period' value ='3' style='vertical-align:bottom' />3 "+
				"<input id='fld_period4' type='radio' name='fld_period' value ='4' style='vertical-align:bottom' />5<br />"+
				"<input id='fld_period0' type='radio' name='fld_period' value ='0' style='vertical-align:bottom' />防御力表示なし "+
			"</td>"+
		//----- by どらごら
		//	"<td style='background-color:black; padding:0px 2px; text-align:center;'>"+
		"</tr>"+
		"<tr>"+
			"<td id='fld_ally11' style='padding:3px 4px;'>"+
				"<input id='ally11' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally12' style='padding:3px 4px;'>"+
				"<input id='ally12' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally13' style='padding:3px 4px;'>"+
				"<input id='ally13' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally14' style='padding:3px 4px;'>"+
				"<input id='ally14' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally15' style='padding:3px 4px;'>"+
				"<input id='ally15' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally16' style='padding:3px 4px;'>"+
				"<input id='ally16' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally17' style='padding:3px 4px;'>"+
				"<input id='ally17' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally18' style='padding:3px 4px;'>"+
				"<input id='ally18' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally19' style='padding:3px 4px;'>"+
				"<input id='ally19' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally20' style='padding:3px 4px;'>"+
				"<input id='ally20' type='text' style='width:50px' />"+
			"</td>"+
			"<td style='background-color:black; padding:0px 2px; text-align:center;' rowspan='2'>"+
				"<input id='maptoolSave' type='button' value='保存' />"+
			"</td>"+
		"</tr>"+
		"<tr>"+
			"<td id='fld_ally21' style='padding:3px 4px;'>"+
				"<input id='ally21' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally22' style='padding:3px 4px;'>"+
				"<input id='ally22' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally23' style='padding:3px 4px;'>"+
				"<input id='ally23' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally24' style='padding:3px 4px;'>"+
				"<input id='ally24' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally25' style='padding:3px 4px;'>"+
				"<input id='ally25' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally26' style='padding:3px 4px;'>"+
				"<input id='ally26' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally27' style='padding:3px 4px;'>"+
				"<input id='ally27' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally28' style='padding:3px 4px;'>"+
				"<input id='ally28' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally29' style='padding:3px 4px;'>"+
				"<input id='ally29' type='text' style='width:50px' />"+
			"</td>"+
			"<td id='fld_ally30' style='padding:3px 4px;'>"+
				"<input id='ally30' type='text' style='width:50px' />"+
			"</td>"+
		"</tr>"+
		"</table>" + routeHTML;
		//-----
*/		//by鮪ここから
	var td = '</td>';  var tr = '</tr>';  var m1 = ' margin:1px;';  var mr = m1 + '"><tr>';
	
	var br = '<br />';  var ip = '<input ';  var ti = '" title="';  var tt = ' type="text"';
	
	var jv = '" href="javascript:void(0);"';  var pd = 'padding:';  var cw = '; color:white; ';
	var bc = 'background-color:';  var tc = 'text-align:center;"';  var bcb = bc + 'black' + cw;
	var save = ti + '「保存」しないと反映されません">';  var tb = '" type="button" value="';
	var vb_ = '" style="vertical-align:bottom" ';  var iir = 'route_';  var va = '" value="';
	var vb = vb_ + '/>';  var ts = '<td style="';  var lf = '<label for="' + iir;
	var ii = ip + 'id="';  var bdg = bc + 'darkgreen' + cw;  var lfr = ' />' + lf;
	var im = ii + 'map';  var fs = 'font-size:';  var ce = 'chk_enable" ';  var md = 'form';
	var p04 = pd + '0px 4px; ';  var im2 = '>' + im;  var ifl = ii + 'fld_';
	var drt = td + tr + '</table>';  var cc = ' checked="checked"';  var se = 'cursor_enable" ';
	var ts11 = '<table style="' + fs + '11px;' + mr;  var bpp = bc + 'purple' + cw;
	var cb = ' type="checkbox';  var p34 = pd + '3px 4px; ';  var drr = td + tr + '<tr>';
	var mt = '<a id="maptool';  var lb = '</label>' + br;  var bir = br + ii + iir;
	var mt2 = '>' + mt;  var tts = td + ts;  var itt = ip + tt + vb_ + 'id="' + iir;
	var s1 = 'star1c';  var icb = ip + cb + vb_ + 'id="' + iir;
	var desc_f = '出力形式:(<STAR>:戦力,<TYPE>:土地種,<SLTC>:戦力土地種コンビ(例:244☆7,☆7米12),<ZAHYO>:座標,タブ:\t,改行\n)'
	

	//by鮪 */
	var roh = "";
	if(ROUTE_ENABLE) {
		roh = '<table style="' + fs + '11px;' + mr + ts + bcb + p34;
		roh += '" id="fld_route_output"><textarea cols="70" rows="10" id="' + iir;
		roh += 'output"></textarea>' + td + ts + bcb + p34 + '" id="fld_route_botton">';
		roh += icb + se + (CURSOR_ENABLE ? cc : "") + lfr + se;
		roh += 'title="地図のカーソル位置のマス下側に色を付ける">カーソル位置' + lb + icb;
		roh += 'default_mapM" ';
		roh += (GM_getValue(location.hostname + "default_mapM", "true") == true ? cc : "");
		roh += lfr + 'default_mapM' + ti + '全体地図のデフォをこの画面にする">中域画面が標準';
		roh += lb + icb + ce;
		roh += (GM_getValue(location.hostname + "chk_flg", "false") == true ? cc : "");
		roh += lfr + ce + '>直接クリック' + lb + icb + s1 + '" ';
		roh += (GM_getValue(location.hostname + iir + s1, "false") == true ? cc : "");
		roh += lfr + s1 + ti + '☆1は座標だけにする">☆1非表示' + lb;
		roh += lf + md + ti + desc_f + '">出力形式' + lb;
		roh += itt + md + '" size="13" style="width:50px;' + ti + desc_f + va;
		roh += (GM_getValue(location.hostname + iir + md) ? GM_getValue(location.hostname + iir + md) : '');
		roh += '" />' + ii + iir + 'rewrite' + tb;
		roh += 'マップに反映' + ti + '意志を示した座標の色を変える" />' + br + ii + iir + 'validate' + tb;
		roh += 'ルート検証' + ti + '作成したルートを順に辿り全てつながっているか確認する" />' + br + td;
		roh += drt;
	}

	addElem.id = "maptoolHead";
	addElem.style.margin = "2px 2px";

	var cp= ts11 + ts + bcb + p34 + tc + mt2 + 'Close' + jv + '>狭域</a>　';
	cp +=	mt + 'Switch' + jv + '></a>' + tts + bcb + p34 + fs;
	cp +=	'10px; font-family:monospace;">' + mt + 'MoveLeft' + jv + '>←</a> ';
	cp +=	mt + 'MoveUp' + jv + '>↑</a> ' + mt + 'MoveDown' + jv + '>↓</a> ' + mt;
	cp +=	'MoveRight' + jv + '>→</a>' + tts + 'width:4px">' + tts + bcb;
	cp +=	p04 + tc + im2 + 'toolTime' + tb + '基準時更新" /> ';
	cp +=	'<span id="base_time"></span>' + tts + bcb + p34 + tc;
	cp +=	im2 + 'toolMatchFull" ' + cb + vb + ' 完全一致' + tts;
	cp +=	'width:4px">' + tts + bcb + p34 + tc + mt2 + 'ExGetMap5959';
	cp +=	jv + '>全範囲取得</a>' + tts + bcb + p34 + tc + im2 + 'wide" ';
	cp +=	cb + '"/> プチワイド ' + tts + fs + '9px;' + p04 + '" id="version">';
	cp +=	drt + ts11 + ts + bcb + p34 + '" rowspan="3">君' + br + br + '主' + td;
	make_td("fld_user","user",1,10);
	cp +=	ts + bcb + p34 + tc + ' title="色分け設定">';
	cp +=	'入力モード ' + mt + 'ModeName' + jv + '>名称</a> ';
	cp +=	mt + 'ModeColor' + jv + '>色</a>' + drr;
	make_td("fld_user","user",11,20);
	cp +=	ts + bpp + p34 + '"> NPC ' + ifl + 'npc_yet" ' + cb + vb;
	cp +=	' 未　' + ifl + 'npc_fallen"' + cb + vb + ' 済' + drr;
	make_td("fld_user","user",21,30);
	cp +=	ts + bdg + p34 + save + ' 期　';
	make_ssel("0","防御力表示なし");
	cp +=	drr + ts + bcb;
	cp +=	p34 + '" rowspan="3">同' + br + br + '盟' + td;
	make_td("fld_ally","ally",1,10);
	cp +=	ts + bdg + p34 + save;
	make_ssel(1,1);
	make_ssel(2,2);
	make_ssel(3,3,"3-4期");
	make_ssel(4,5,"5-7期");
	make_ssel(5,8);
	cp +=	drr;
	make_td("fld_ally","ally",11,20);
	cp +=	tts + bdg + p34 + '" colspan="2' + save + '　民兵出現　';
	cp +=	ifl + 'compromise"' + tt + ' style="width:30px" />% ' + drr;
	make_td("fld_ally","ally",21,30);
	cp +=	ts + bcb + ' padding:0px 2px; ' + tc + im2;
	cp +=	'toolExRouteEnable"' + (ROUTE_ENABLE ? cc : "");
	cp +=	cb + vb + ' 遠征支援　' + im;
	cp +=	'toolSave' +  tb + '保存" />' + drt + roh;
	addElem.innerHTML = cp;
	function make_td(tid,iid,st,ed){  for(var i=st; i<ed+1; i++){
		cp += ts + p34 + '" class="' + tid + '" id="' + tid + i + '">';
		cp += ii + iid + i + '"' + tt + ' style="width:50px;"></td>';
	}}
	function make_ssel(peri,txt,title){
		var t="";  var fl="fld_period";  if(title){t= ti + title;}
		cp += ii + fl + peri + '" type="radio" name="' + fl + " value=";
		cp += peri + vb + '<label for="' + fl + peri;
		cp += t + '">' + txt + "</label> ";
	}//by鮪ここまで
	
	//バージョン
	document.getElementById("version").innerHTML = "Ver." + VERSION;
	
	//基準時刻
	var baseTime = BASE_TIME;
	if (baseTime.length == 8) baseTime += "000000";
	document.getElementById("base_time").innerHTML = 
		baseTime.substr(4, 2) + "/" + baseTime.substr(6, 2) +
		" " + baseTime.substr(8, 2) + ":" + baseTime.substr(10, 2);
	
	//完全一致
	document.getElementById("maptoolMatchFull").checked = MATCH_FULL;
	
	//項目背景着色
	setFieldColors();
	
	//君主、同盟を表示
	setInputNames();
	
	//NPCを表示
	document.getElementById("fld_npc_yet").checked = DISP_NPC_YET;
	document.getElementById("fld_npc_fallen").checked = DISP_NPC_FALLEN;

	//期数
	document.getElementById("fld_period0").checked = DISP_PERIOD0;
	document.getElementById("fld_period1").checked = DISP_PERIOD1;
	document.getElementById("fld_period2").checked = DISP_PERIOD2;
	document.getElementById("fld_period3").checked = DISP_PERIOD3;
	document.getElementById("fld_period4").checked = DISP_PERIOD4;
	document.getElementById("fld_compromise").value= DISP_COMPROMISE;

	if(document.getElementById("route_star1c")){//by鮪
		document.getElementById("route_star1c").checked = route_star1c;}//by鮪
	if(document.getElementById("route_form")){//by鮪
		document.getElementById("route_form").value = route_form;}//by鮪

	//プチワイド
	document.getElementById("mapwide").checked = MAP_WIDE;
	
	// ルート用スクリプトを追加 by どらごら
	addRouteScriptHtml();
	
	//イベントリスナー登録（保存ボタン）
	document.getElementById('maptoolSave').addEventListener("click",
		function() {
			
			//入力値をGreasemonkey領域に保存
			if (INPUT_MODE == INPUT_MODE_NAME) {
				saveInputUsers("USERS");
				saveInputAllys("ALLYS");
				USERS = loadNames("USERS");
				ALLYS = loadNames("ALLYS");
				defaultTargets();
				setInputNames();
				
			} else if (INPUT_MODE == INPUT_MODE_COLOR) {
				saveInputUsers("USER_COLORS");
				saveInputAllys("ALLY_COLORS");
				USER_COLORS = loadColors("USER_COLORS", USER_COLORS_DEF);
				ALLY_COLORS = loadColors("ALLY_COLORS", ALLY_COLORS_DEF);
				setInputColors();
				setFieldColors();
			}
			
			//NPC表示フラグ
			DISP_NPC_YET = document.getElementById("fld_npc_yet").checked;
			DISP_NPC_FALLEN = document.getElementById("fld_npc_fallen").checked;
			GM_setValue(location.hostname + "DISP_NPC_YET", DISP_NPC_YET);
			GM_setValue(location.hostname + "DISP_NPC_FALLEN", DISP_NPC_FALLEN);
//console.log(location.hostname + "DISP_NPC_YET: " + GM_getValue(location.hostname + "DISP_NPC_YET"));
//console.log(location.hostname + "DISP_NPC_FALLEN: " + GM_getValue(location.hostname + "DISP_NPC_FALLEN"));

			//期数
			DISP_PERIOD0 = document.getElementById("fld_period0").checked;
			DISP_PERIOD1 = document.getElementById("fld_period1").checked;
			DISP_PERIOD2 = document.getElementById("fld_period2").checked;
			DISP_PERIOD3 = document.getElementById("fld_period3").checked;
			DISP_PERIOD4 = document.getElementById("fld_period4").checked;
			DISP_COMPROMISE = document.getElementById("fld_compromise").value;
			if(document.getElementById("route_star1c")){//by鮪
			route_star1c = document.getElementById("route_star1c").value;}//by鮪
			if(document.getElementById("route_form")){//by鮪
			route_form = document.getElementById("route_form").value;}//by鮪
			GM_setValue(location.hostname + "DISP_PERIOD0", DISP_PERIOD1);
			GM_setValue(location.hostname + "DISP_PERIOD1", DISP_PERIOD1);
			GM_setValue(location.hostname + "DISP_PERIOD2", DISP_PERIOD2);
			GM_setValue(location.hostname + "DISP_PERIOD3", DISP_PERIOD3);
			GM_setValue(location.hostname + "DISP_PERIOD4", DISP_PERIOD4);
			GM_setValue(location.hostname + "DISP_COMPROMISE", DISP_COMPROMISE);
			GM_setValue(location.hostname + "route_star1c", route_star1c);//by鮪
			GM_setValue(location.hostname + "route_form", route_form);//by鮪

			//プチワイド
			MAP_WIDE = document.getElementById("mapwide").checked;
			GM_setValue(location.hostname + "MAP_WIDE", MAP_WIDE);
			if (MAP_WIDE){
				RADIUS = 38; 		//半径（中域）
				CELL_SIZE_M = 9;	//中域地図の1マスサイズ(px)
				FONT_SIZE = "7px";	//中域地図のマス内文字サイズ
			} else {
				RADIUS = 25;		//半径（中域）
				CELL_SIZE_M = 14;	//中域地図の1マスサイズ(px)
				FONT_SIZE = "10px";	//中域地図のマス内文字サイズ
			}


			//地図変更
			LOADED_MAPS = new Array();
			changeMap();
		},
		true);
	
	//イベントリスナー登録（基準時更新ボタン）
	document.getElementById('maptoolTime').addEventListener("click",
		function() {
			
			//基準時間として現在時刻をGreasemonkey領域に保存
			GM_setValue(location.hostname + "BASE_TIME", getCurrentTime2());
			
			//ページリロード
			GM_setValue(location.hostname + "MAP_MODE", MAP_MODE);
			location.reload();
		},
		true);
	
	//イベントリスナー登録（狭域地図リンク）
	document.getElementById('maptoolClose').addEventListener("click",
		function() {
			MAP_MODE = MAP_MODE_S;
			changeMap();
		},
		true);
	
	//イベントリスナー登録（中域/広域地図リンク）
	document.getElementById('maptoolSwitch').addEventListener("click",
		function() {
			MAP_MODE = (MAP_MODE == MAP_MODE_L ? MAP_MODE_M : MAP_MODE_L);
			changeMap();
		}, true);
	
	//イベントリスナー登録（←↑↓→リンク）
	document.getElementById('maptoolMoveLeft').addEventListener("click",
		function() { shiftMap(-1, 0); }, true);
	document.getElementById('maptoolMoveUp').addEventListener("click",
		function() { shiftMap(0, 1); }, true);
	document.getElementById('maptoolMoveDown').addEventListener("click",
		function() { shiftMap(0, -1); }, true);
	document.getElementById('maptoolMoveRight').addEventListener("click",
		function() { shiftMap(1, 0); }, true);
	
	//イベントリスナー登録（名称設定・色設定）
	document.getElementById('maptoolModeName').addEventListener("click",
		function() { setInputNames(); }, true);
	document.getElementById('maptoolModeColor').addEventListener("click",
		function() { setInputColors(); }, true);
	
	//イベントリスナー登録（完全一致チェックボックス）
	document.getElementById('maptoolMatchFull').addEventListener("click",
		function() { changeMatchMode(this.checked); }, true);
	
	//イベントリスナー登録（59x59範囲取得 by どらごら）
	document.getElementById('maptoolExGetMap5959').addEventListener("click",
		function() { getMap5959(); }, true);
	
	//イベントリスナー登録（遠征支援 by どらごら）
	document.getElementById('maptoolExRouteEnable').addEventListener("click",
		function() { 
			GM_setValue(location.hostname + "route_enable", j$("#maptoolExRouteEnable").attr('checked'));
			//ページリロード
			location.reload();
		}, true);
	
	if(ROUTE_ENABLE) {
		//イベントリスナー登録（カーソル位置 by どらごら）
		document.getElementById('route_cursor_enable').addEventListener("click",
			function() { 
				CURSOR_ENABLE = j$("#route_cursor_enable").attr('checked');
				GM_setValue(location.hostname + "cursor_flg", CURSOR_ENABLE);
				//ページリロード
				location.reload();
			}, true);
		
		//イベントリスナー登録（中域画面が標準 by どらごら）
		document.getElementById('route_default_mapM').addEventListener("click",
			function() { 
				GM_setValue(location.hostname + "default_mapM", j$("#route_default_mapM").attr('checked'));
			}, true);
		
		
		//イベントリスナー登録（直接クリック有効 by どらごら）
		document.getElementById('route_chk_enable').addEventListener("click",
			function() { 
				GM_setValue(location.hostname + "chk_flg", j$("#route_chk_enable").attr('checked'));
			}, true);
		
		//イベントリスナー登録（マップに反映 by どらごら）
		document.getElementById('route_rewrite').addEventListener("click",
			function() { onReWrite(); }, true);
		
		//イベントリスナー登録（ルート検証 by どらごら）
		document.getElementById('route_validate').addEventListener("click",
			function() { onValidation(); }, true);
		
	}
	
}

//本体部HTML追加
function addBodyHtml(parentElem) {
	
	//中域地図div



	var addElem = document.createElement("div");
	parentElem.appendChild(addElem);
	addElem.id = "maptoolBody";
	addElem.style.display = "none";
	
	//広域地図div
	var addElem2 = document.createElement("div");
	parentElem.appendChild(addElem2);
	addElem2.id = "maptoolBodyL";
	addElem2.style.display = "none";
	
	//中域/広域地図ドラッグ＆ドロップイベントリスナー
	var elems = new Array();
	elems.push(addElem);
	elems.push(addElem2);
	for (var i=0; i<elems.length; i++) {
		elems[i].addEventListener("mousedown",
			function(event) {
				MOUSE_DRAGGING = true;
				MOUSE_DRAG_START_X = event.pageX;
				MOUSE_DRAG_START_Y = event.pageY;
				this.style.cursor = "move";
				event.preventDefault();
			},
			false);
		elems[i].addEventListener("mouseup",
			function(event) {
				if (!MOUSE_DRAGGING) {
					return true;
				}
				MOUSE_DRAGGING = false;
				this.style.cursor = "default";
				
				var offsetX = event.pageX - MOUSE_DRAG_START_X;
				var offsetY = event.pageY - MOUSE_DRAG_START_Y;
				if (Math.sqrt(offsetX*offsetX+offsetY*offsetY) > 5) {
					var cellSize;
					if (MAP_MODE == MAP_MODE_M) cellSize = CELL_SIZE_M;
					else if (MAP_MODE == MAP_MODE_L) cellSize = CELL_SIZE_L;
					
					if (cellSize != undefined) {
						moveMap(CENTER_X - Math.round(offsetX / cellSize), 
							CENTER_Y + Math.round(offsetY / cellSize));
					}
				}
				event.preventDefault();
			},
			false);
	}
}

//地図（中域）本体部HTML生成
function genBodyHtml() {
	var bodyHtml = "";
	
	bodyHtml += "<table style='border:1px solid gray; font-size:" + FONT_SIZE + "'>\n";


	
	//各マス作成
	for (var y=CENTER_Y+RADIUS; y>=CENTER_Y-RADIUS; y--) {
		bodyHtml += "<tr style='height:" + CELL_SIZE_M + "px'>\n";
		
		for (var x=CENTER_X-RADIUS; x<=CENTER_X+RADIUS; x++) {
			bodyHtml += generateMapCellHtml(x, y);
		}
		bodyHtml += "</tr>\n";
	}
	
	bodyHtml += "</table>\n";
	
	return bodyHtml;
}

//地図（広域）本体部HTML生成
function genBodyHtmlL() {
	var bodyHtml = "";
	
	var width = (RADIUS_L * 2 + 1) * CELL_SIZE_L;
	bodyHtml +=
		"<div id='mapBodyL' style='background-color:lightgray; color:white; " + 
		"position:relative; overflow:hidden; " + 
		"width:" + width + "px; height:" + width + "px;'>\r\n";
	
	//中心線
	bodyHtml += 
		"<div style='background-color:darkgray; position:absolute; " +
		"width:" + width + "px; height:1px; " +
		"left:0px; top:" + (Math.floor(width/2) + 1) + "px;'></div>";
	bodyHtml += 
		"<div style='background-color:darkgray; position:absolute; " +
		"width:1px; height:" + width + "px; " +
		"left:" + (Math.floor(width/2) + 1) + "px; top:0px;'></div>";
	
	//同盟単位
	for (var i = ALLYS.length - 1; i >= 0; i--) {
		var allySub = ALLYS[i];
		if (allySub == "") {
			continue;
		}
		
		//名称が部分一致する同盟が対象
		var matchAllys = searchArrayString(ALLYS_INDEX, allySub);
		for (var j=0; j<matchAllys.length; j++) {
			var allyData = getAllyDataCache(matchAllys[j]);
			var members = allyData[IDX_ALLY_MEMBERS];
			for (var k=0; k<members.length; k++) {
				bodyHtml += genUserVillageHtml(members[k], ALLY_COLORS[i], matchAllys[j], 1);
			}
		}
	}
	
	//NPC拠点
	if (DISP_NPC_YET || DISP_NPC_FALLEN) {
		var npcs = splitDelimited(
			GM_getValue(location.hostname + "NPCS_INDEX", ""), DELIMIT);
		bodyHtml += genVillagesHtml(npcs, "", NPC_COLOR, 3);
	}
	
	//君主単位
	for (var i = USERS.length - 1; i >= 0; i--) {
		var userSub = USERS[i];
		if (userSub == "") {
			continue;
		}
		
		//名称が部分一致する君主が対象
		var matchUsers = searchArrayString(USERS_INDEX, userSub);
		for (var j=0; j<matchUsers.length; j++) {
			bodyHtml += genUserVillageHtml(matchUsers[j], USER_COLORS[i], "", 2);
		}
	}
	
	bodyHtml += "</div>";
	
	return bodyHtml;
}

//君主下各拠点のHTML生成（広域地図）
function genUserVillageHtml(user, color, ally, priority) {
	var ret = "";
	var userData = getUserDataCache(user);
	
	//既に同盟から抜けている場合はスキップ
	if (ally != "" && ally != userData[IDX_USER_ALLY]) {
		return "";
	}
	
	//各拠点HTML生成
	var villages = userData[IDX_USER_VILLAGES];
	ret = genVillagesHtml(villages, user, color, priority);
	
	return ret;
}

//拠点表示（複数分）HTML生成（広域地図）
function genVillagesHtml(villages, user, color, priority) {
	var ret = "";
	
	for (var j = 0; j < villages.length; j++) {
		var x = parseInt(villages[j].split(",")[0]);
		var y = parseInt(villages[j].split(",")[1]);
		if (isNaN(x) || isNaN(y)) {
			continue;
		}
		ret += genVillageHtml(user, color, x, y, priority) + "\r\n";
	}
	
	return ret;
}

//拠点表示HTML生成（広域地図）
function genVillageHtml(user, color, x, y, priority) {
	
	//画面範囲外ならスキップ
	if (x < CENTER_X-RADIUS_L-5 || x > CENTER_X+RADIUS_L+5) return "";
	if (y < CENTER_Y-RADIUS_L-5 || y > CENTER_Y+RADIUS_L+5) return "";
	
	//マスデータ取得
	var data = loadCellData(generateCellKey(x, y));
	
	//表示対象外はスキップ
	if (data[IDX_NPC_FLG] == "1") {
		//NPCの表示指定がない場合はスキップ
		var disp = false;
		if (data[IDX_ALLIANCER] == NPC_ALLY) {
			if (DISP_NPC_YET) {
				disp = true;
			}
		} else {
			if (DISP_NPC_FALLEN) {
				if (user == "") disp = true;
			} else {
				if (user != "") disp = true;
			}
		}
		if (!disp) return "";
		
	} else {
		//既に拠点がない場合はスキップ
		if ((data[IDX_POPULATION] == undefined || data[IDX_POPULATION] == "" ||
			data[IDX_USER_NAME] != user)) {
			return "";
		}
	}
	
	//四角形のサイズを決定
	var size;
	if (data[IDX_NPC_FLG] == "1") {
		if (data[IDX_POWER].length <= 3) size = 2;
		else if (data[IDX_POWER].length <= 6) size = 3;
		else size = 4;
	} else {
		var population = parseInt(data[IDX_POPULATION]);
		if (population < 100) size = 1;
		else if (population < 250) size = 2;
		else if (population < 600) size = 3;
		else if (population < 1000) size = 4;
		else size = 5;
	}
	
	var borderWidth = 1;
	var width = (size + 1) * 2 + 1 - borderWidth * 2;
	var left = (x - (CENTER_X - RADIUS_L)) * CELL_SIZE_L - (width-CELL_SIZE_L)/2;
	var top = ((CENTER_Y + RADIUS_L) - y) * CELL_SIZE_L - (width-CELL_SIZE_L)/2;
	var zIndex = priority * 10 + (9 - size);
	//var popupText = genPopupText(data, x, y);
	var clsData = new genPopupText(data, x, y);	// by どらごら
	var popupText = clsData.popupText;
	
	var ret = 
		"<a href='" + getMapUrl(x, y) + "'>" +
		"<div style='background-color:" + color + "; z-index:" + zIndex + "; " +
		"width:" + width + "px; height:" + width + "px; " +
		"left:" + left + "px; top:" + top + "px; " +
		"position:absolute; border:outset " + borderWidth + "px " + color + "' ";
	if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
		ret += "title='" + popupText.replace(/<br\/>/g, "\n") + "'>";
	} else {
		ret += "onMouseOver='onPopup(\"" + popupText + "\", event.pageX, event.pageY)' " +
			"onMouseOut='offPopup()'>";
	}
	ret += "</div></a>";
	
	return ret;
}


//説明ポップアップ初期化
function initPopup() {

	//CSS
	addGlobalStyle(
		".popup{"+
//			"position:absolute; left:0px; top:0px; visibility:hidden; "+
//			"font-size:9pt; color:#0099FF; "+
//			"background-color:#FFFFFF; layer-background-color:#FFFFFF; "+
//			"border:1px solid #0099FF; padding:5; z-index:255;"+
			"position:absolute; left:0px; top:0px; visibility:hidden;opacity:1; "+
			"font-size:9pt; color:#ffffff; -moz-border-radius: 8px;"+
			"background-color:#000000; layer-background-color:#FFFFFF; "+
			"border:1px solid #ffffFF; padding:10px;z-index:999;"+
		"}"
	);
	
	//表示関数
	var funcHTML = 
		'function onPopup(text, nX, nY) {\n'+
		//orig	'var sX = -10, sY = -24;\n'+
			'var sX = 10, sY = -50;\n'+ //by鮪
			'var msgElem = document.getElementById("popup");\n'+
			'msgElem.innerHTML = text;\n'+
			'msgElem.style.visibility = "visible";\n'+
			'msgElem.style.left = (nX + sX) + "px";\n'+
			'msgElem.style.top = (nY + sY) + "px";\n'+
		'}\n'+
		'function offPopup() {\n'+
			'document.getElementById("popup").style.visibility = "hidden";\n'+
		'}\n';
	var scriptElem = document.createElement("script");
	scriptElem.type = "text/javascript";
	scriptElem.innerHTML = funcHTML;
	document.getElementsByTagName("head")[0].appendChild(scriptElem);
	
	//HTMLタグ追加
	var popupElem = document.createElement('span');
	popupElem.id = "popup";
	popupElem.className = "popup";
//orig	var mapElem = document.evaluate('//*[@id="maptool"]',
	var mapElem = document.evaluate('//*[@id="gnavi"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	mapElem.snapshotItem(0).appendChild(popupElem);
	
	//イベントリスナー登録
	popupElem.addEventListener("mouseover",
		function() { this.style.visibility = "hidden" }, true);
}

//所有者が変わった領地に印
function markChangeArea() {
	// by どらごら
	markChangeArea2(document);
}
function markChangeArea2(dom) {
	var markHtml = "";
	
	var mapElem = dom.evaluate('//*[@id="mapsAll"]', dom, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	
	var baseX = CENTER_X - Math.floor((MAP_SCALE-1)/2);
	var baseY = CENTER_Y + Math.floor((MAP_SCALE-1)/2);
	for (var x = baseX; x <= baseX + MAP_SCALE - 1; x++) {
		for (var y = baseY; y >= baseY - MAP_SCALE + 1; y--) {
			
			//保存データ取得
			var data = getCellDataCache(generateCellKey(x, y));
			var userBefore = data[IDX_USER_BEFORE];
			var userAfter = data[IDX_USER_NAME];
			
			if (userBefore == userAfter) {
				continue;
			}
			
			//チェック画像
			var areaNo = (x - baseX) * MAP_SCALE + (baseY - y) + 1;
			var addElem = document.createElement("img");
			addElem.className = "mapAll" + padZero(areaNo);
			addElem.alt = "change";
			addElem.src = "data:image/gif;base64,"+
				"R0lGODlhPAA8AHcAMSH+GlNvZnR3YXJlOiBNaWNyb3NvZnQgT2ZmaWNlACH5BAEAAAAALBMAHgAZ"+
				"ABQAgAAAAP4AAAIyhI+ZwayPmoRUOvpswFDzbH2KJy5TGZ2oQa5AyF0HjKltddK1pn58s/q5eC5W"+
				"byhDFQAAOw==";
			
			mapElem.appendChild(addElem);
		}
	}
}

//地図幅の取得
function getMapScale() {
	var sort15 = document.evaluate('//*[@id="change-map-scale"]/ul/li[@class="sort15 now"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (sort15.snapshotLength != 0) {
		return 15;
	}
	
	var sort20 = document.evaluate('//*[@id="change-map-scale"]/ul/li[@class="sort20 now"]',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (sort20.snapshotLength != 0) {
		return 20;
	}
	
	return 11;
}

//君主、同盟の指定がない場合は中心座標の君主をデフォルト
function defaultTargets() {
	if (USERS[0] != "" || ALLYS[0] != "") {
		return;
	}
	
	var data = getCellDataCache(generateCellKey(CENTER_X, CENTER_Y));
	if (data.length > 0) {
		USERS[0] = data[IDX_USER_NAME];
		ALLYS[0] = data[IDX_ALLIANCER];
	}
}

//名称入力欄設定
function setInputNames() {
	INPUT_MODE = INPUT_MODE_NAME;
	setInputLink("maptoolModeName");
	setInputs(USERS, ALLYS, "");
}
//色入力欄設定
function setInputColors() {
	INPUT_MODE = INPUT_MODE_COLOR;
	setInputLink("maptoolModeColor");
	setInputs(USER_COLORS, ALLY_COLORS, "monospace");
}
//リンク背景色設定
function setInputLink(id) {
	var linkIds = new Array("maptoolModeName", "maptoolModeColor");
	for (var i = 0; i < linkIds.length; i++) {
		var elem = document.getElementById(linkIds[i]);
		if (linkIds[i] == id) {
			elem.style.backgroundColor = "dimgray";
		} else {
			elem.style.backgroundColor = "";
		}
	}
}

//入力欄設定
function setInputs(users, allys, fontFamily) {
	
	//各テキストボックスを初期化
	for (var i = 0; i < USER_COLORS.length; i++) {
		var field = document.getElementById("user" + (i+1));
		field.value = "";
		field.style.fontFamily = fontFamily;
	}
	for (var i = 0; i < ALLY_COLORS.length; i++) {
		var field = document.getElementById("ally" + (i+1));
		field.value = "";
		field.style.fontFamily = fontFamily;
	}
	
	//各テキストボックスに設定
	for (var i = 0; i < users.length; i++) {
		document.getElementById("user" + (i+1)).value = users[i];
	}
	for (var i = 0; i < allys.length; i++) {
		document.getElementById("ally" + (i+1)).value = allys[i];
	}
}

//入力欄背景色設定
function setFieldColors() {
	for (var i = 0; i < USER_COLORS.length; i++) {
		document.getElementById("fld_user" + (i+1)).style.backgroundColor = USER_COLORS[i];
	}
	for (var i = 0; i < ALLY_COLORS.length; i++) {
		document.getElementById("fld_ally" + (i+1)).style.backgroundColor = ALLY_COLORS[i];
	}
}

//地図1マス生成
function generateMapCellHtml(x, y) {
	var cellHtml = "";
	
	//保存データ取得
	var data = loadCellData(generateCellKey(x, y));
	var user = data[IDX_USER_NAME];
	var population = data[IDX_POPULATION];
	var ally = data[IDX_ALLIANCER];
	var power = data[IDX_POWER];
	var npcFlg = data[IDX_NPC_FLG];
	var capitalFlg = data[IDX_CAPITAL_FLG];
	var timeBefore = data[IDX_TIME_BEFORE];
	var userBefore = data[IDX_USER_BEFORE];
	var parentAlly = getParentAlly(ally);
	var mat = "_"+data[IDX_WOOD]+"_"+data[IDX_STONE]+"_"+data[IDX_IRON]+"_"+data[IDX_RICE];//by鮪
	//背景色
	var bgColor;
	var reverse = false;
	if (user == undefined) {
		bgColor = "gray";
	} else if (user == "") {
		bgColor = "white";
 	} else if (npcFlg == "1" && 
 		((DISP_NPC_YET && ally == NPC_ALLY) || (DISP_NPC_FALLEN && ally != NPC_ALLY))) {
		bgColor = NPC_COLOR;
		reverse = true;
	}
	if (bgColor == undefined) {
		for (var i=0; i<USERS.length; i++) {
			if (matchString(user, USERS[i])) {
				bgColor = USER_COLORS[i];
				reverse = true;
				break;
			}
		}
	}
	if (bgColor == undefined) {
		for (var i=0; i<ALLYS.length; i++) {
			if (matchString(ally, ALLYS[i]) || matchString(parentAlly, ALLYS[i])) {
				bgColor = ALLY_COLORS[i];
				break;
			}
		}
	}
	if (bgColor == undefined) {
		bgColor = ETC_COLOR;
	}
	
	//マス情報は新しい？
	var isNewData = (timeBefore >= BASE_TIME);
	
	//所有者変更有無チェック
	var isDiff = (userBefore != user && isNewData);
	
	//ポップアップ内容
	//var popupText = genPopupText(data, x, y);
	var clsData = new genPopupText(data, x, y);	// by どらごら
	var popupText = clsData.popupText;
	
	//データが古いマスに目印
	var borderStyle = "border: solid white 1px;";
	if (!isNewData) {
		if (reverse) {
			borderStyle = "border: solid lightgrey 1px;";
		} else {
			borderStyle = "border: solid gray 1px;"
		}
	}
	
	//中心マスに目印
	if (x==CENTER_X && y==CENTER_Y) {
		var borderColor;
		if (reverse) borderColor = "black";
		else borderColor = "black";
		borderStyle = "border: solid "+borderColor+" 2px;";
	}
	
	//☆多領地、人口多拠点を強調
	var hiPowerStyle, textColor;
	if ((power != undefined && power.length >= HI_POWER) || 
		(population != undefined && parseInt(population) > HI_POPUL)) {
		hiPowerStyle = "font-weight:bold;";
		if (reverse) textColor = "white";
		else textColor = "black";
	} else {
		hiPowerStyle = "";
		if (reverse) textColor = "lightgray";
		else textColor = "dimgray";
	}
	
	//配下同盟表示
	var anchorStyle = "";
	if (ally != "" && parentAlly != "" && !reverse) {
		anchorStyle += "background-color:whitesmoke;";
	}
	
	//攻略済みNPC表示
//	if (DISP_NPC_FALLEN && npcFlg == "1" && ally != NPC_ALLY) {
//		anchorStyle += "background-color:" + NPC_COLOR + ";";
//		textColor = "lightgray";
//	}
	
	//本拠地表示
	if (capitalFlg == "C") {
		anchorStyle += "border:dotted 1px " + textColor + ";";

	}
	
	//所有者変更表示
	if (isDiff) {
		if (reverse) textColor = "pink";
		else textColor = "red";
	}
	
	//tdタグ by どらごら
	if(ROUTE_ENABLE == false) {
		cellHtml += "<td style='width:" + CELL_SIZE_M + "px; text-align:center; " +
			"background-color:" + bgColor + ";" + borderStyle + hiPowerStyle + "'>";
	} else {/* 無効化by鮪
		// x,y,p,c,b
		var argv = "event, " + 
										clsData.x + "," + clsData.y + 
										"," + "\"" + clsData.power + "\"" +
										"," + ((clsData.x==CENTER_X && clsData.y==CENTER_Y) ? "true" : "false") + 
										"," + "\"" + bgColor + "\"" +
								"";// 無効化by鮪  */
		// x,y,p,c,b,m ここからby鮪
		var argv = "event, " + clsData.x + "," + clsData.y + ",\"" + clsData.power;
		argv += "\"," + ((clsData.x==CENTER_X && clsData.y==CENTER_Y) ? "true" : "false");
		argv += ",\"" + bgColor + "\",\"" + mat + "\"";// ここまでby鮪

		var mouse_over = "";
		if(CURSOR_ENABLE) {
			mouse_over = " onMouseOver='onMapMouseOver("+ argv + ");' onMouseOut='onMapMouseOut("+ argv + ");' ";
		}
		cellHtml += "<td style='width:" + CELL_SIZE_M + "px; text-align:center; "+
			"background-color:" + bgColor + ";" + borderStyle + hiPowerStyle + "' " +
			"id='route_td_" + clsData.x + "_" + clsData.y + "' onClick='onMapClick("+ argv + ");' " +
			mouse_over + " onContextMenu='onMapContextMenu("+ argv +");'>";
	}
	
	//座標リンク by どらごら
	if(ROUTE_ENABLE == false) {
		cellHtml += "<a href='" + getMapUrl(x, y) + "' " +
			"style='color:" + textColor + "; text-decoration:none; " + anchorStyle + "' ";
		if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
			cellHtml += "title='" + popupText.replace(/<br\/>/g, "\n") + "'>";
		} else {
			cellHtml += "onMouseOver='onPopup(\"" + popupText + "\", event.pageX, event.pageY)' " +
				"onMouseOut='offPopup()'>";
		}
	} else {
		cellHtml += "<a href='javascript:void(0);' id='route_a_" + clsData.x + "_" + clsData.y + "' " +
			"style='color:" + textColor + "; text-decoration:none; " + anchorStyle + "' ";
		if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
			cellHtml += "title='" + popupText.replace(/<br\/>/g, "\n") + "'>";
		} else {
			cellHtml += "onMouseOver='onPopup(\"" + popupText + "\", event.pageX, event.pageY)' " +
				"onMouseOut='offPopup()'>";
		}
	}
	
	//☆数(領地) 、「C」(Castle/PC)、「P」(PC)、「N」(NPC)
	if (data.length == 0) cellHtml += "　";
	else if (npcFlg == "1") cellHtml += "N";
	else if (population != "" & capitalFlg == "C") cellHtml += capitalFlg;
	else if (population != "") cellHtml += "P";
	else if (power == "") cellHtml += "?";
	else cellHtml += power.length;
	
	cellHtml += "</a>";
	cellHtml += "</td>\n";
	
	return cellHtml;
}

//ポップアップテキスト生成
//	クラス化 by どらごら
function genPopupText(data, x, y) {
	this.x = x;
	this.y = y;
	this.data = data;
	
	this.village = data[IDX_VILLAGE_NAME];
	this.user = data[IDX_USER_NAME];
	this.population = data[IDX_POPULATION];
	this.ally = data[IDX_ALLIANCER];
	this.power = data[IDX_POWER];
	this.material = 
		"森"+data[IDX_WOOD] +
		" 岩"+data[IDX_STONE] +
		" 鉄"+data[IDX_IRON] +
		" 穀"+data[IDX_RICE];
	this.npcFlg = data[IDX_NPC_FLG];
	this.userBefore = data[IDX_USER_BEFORE];
	this.allyBefore = data[IDX_ALLY_BEFORE];
	this.lastUpdate = data[IDX_LAST_UPDATE];
	this.parentAlly = getParentAlly(this.ally);
	
	//自拠点からの距離
	this.distance = -1;
	if (MY_X != 0 || MY_Y != 0) {
		this.distance = Math.sqrt((MY_X-x)*(MY_X-x)+(MY_Y-y)*(MY_Y-y));
		this.distance = Math.round(this.distance * 100) / 100;
	}

	//兵数計算
	var ki = 0;
	if (DISP_PERIOD1){ki=1}
	if (DISP_PERIOD2){ki=2}
	if (DISP_PERIOD3){ki=3}
	if (DISP_PERIOD4){ki=4}//m5期/6期用 by鮪

	var heika = [0,0,0,0,0,0,0];
	var defTxt = ""; 
	if(ki>0){//非表示用 by鮪
	for (i=0; i<126; i++){
		if (MINPEI[i][0] == ki && MINPEI[i][1] == this.power && MINPEI[i][2] == this.material){
			heika[0] = MINPEI[i][3] * (1+(this.distance * 0.1));
			heika[1] = MINPEI[i][4] * (1+(this.distance * 0.1));
			heika[2] = MINPEI[i][5] * (1+(this.distance * 0.1));
			heika[3] = MINPEI[i][6] * (1+(this.distance * 0.1));
			heika[4] = MINPEI[i][7] * (1+(this.distance * 0.1));
			heika[5] = MINPEI[i][8] * (1+(this.distance * 0.1));
			heika[6] = MINPEI[i][9] * (1+(this.distance * 0.1));

			var sum = [[0,0],[0,0],[0,0],[0,0]];
			for (j=0; j<4; j++){
				for (k=0; k<7; k++){
					sum[j][0] = sum[j][0] + (SPEC[k][j] * Math.floor(heika[k]*3));
					if (DISP_COMPROMISE != undefined && DISP_COMPROMISE >= 0 && DISP_COMPROMISE <= 100){
						sum[j][1] = sum[j][1] + (SPEC[k][j] * Math.floor(heika[k]*3*DISP_COMPROMISE/100));
					}
				}
			}
			if (sum[0][0] != 0 || sum[0][1] != 0 || sum[1][0] != 0 || sum[1][1] != 0 || sum[2][0] != 0 || sum[2][1] != 0 || sum[3][0] != 0 || sum[3][1] != 0) {
				var nin = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
				for (k=0; k<7; k++){
					j=k;
					if (k>3){j=k-3}
					nin[k][0] = Math.ceil(sum[j][0] / SPEC[k][4]);
					nin[k][1] = Math.ceil(sum[j][1] / SPEC[k][4]);
				}

				if (defTxt != ""){defTxt += "または、（↑平地23、平地20↓）<br/>"}
				defTxt += "vs歩：" + sum[0][0] + "("+ nin[0][0] +")　" + sum[0][1] + "("+ nin[0][1] +")<br/>";
				defTxt += "vs槍：" + sum[1][0] + "("+ nin[1][0] +"/" + nin[4][0] + ")　" + sum[1][1] + "("+ nin[1][1] + "/" + nin[4][1] +")<br/>";
				defTxt += "vs弓：" + sum[2][0] + "("+ nin[2][0] +"/" + nin[5][0] + ")　" + sum[2][1] + "("+ nin[2][1] + "/" + nin[5][1] +")<br/>";
				defTxt += "vs騎：" + sum[3][0] + "("+ nin[3][0] +"/" + nin[6][0] + ")　" + sum[3][1] + "("+ nin[3][1] + "/" + nin[6][1] +")<br/>";
			}
		}
	}
	}//非表示用 by鮪

	//入手資源計算
	var getTxt = "";
	if (data[IDX_WOOD]!=0)  {
		getTxt += " 木" + Math.floor(data[IDX_WOOD]  * this.distance * 10);
	}
	if (data[IDX_STONE]!=0) { 
		getTxt += " 石" + Math.floor(data[IDX_STONE] * this.distance * 10);
	}
	if (data[IDX_IRON]!=0)  {
		getTxt += " 鉄" + Math.floor(data[IDX_IRON]  * this.distance * 10);
	}
	if (data[IDX_RICE]!=0)  {
		getTxt += " 糧" + Math.floor(data[IDX_RICE]  * this.distance * 10);
	}

	//[地名]([座標])/[[距離]]
	if (this.village == undefined) this.village = "不明";
	this.popupText = "";
	this.popupText += this.village;
	this.popupText += "(" + x + "," + y + " )"
	if (this.distance >= 0) {
		this.popupText += " / "
		this.popupText += "[" + this.distance + "]"
	}
	this.popupText += "<br/>";
	
	//[君主名]@[同盟名]@[親同盟]([前君主名]@[同盟名])
	this.exists = false;
	if (this.user != undefined && this.user != "") {
		this.popupText += this.user + "@" + this.ally;
		if (this.parentAlly != "") this.popupText += "@" + this.parentAlly;
		this.exists = true;
	}
	if (this.userBefore != this.user && this.userBefore != undefined && this.userBefore != "") {
		this.popupText += "(" + this.userBefore + "@" + this.allyBefore + ")";
		this.exists = true;
	}
	if (this.exists) {
		this.popupText += "<br/>";
	}
	//NPC戦力
	//if (this.npcFlg == "1") {
	if (this.power != undefined && this.power != "") {
		this.popupText += this.power + "<br/>";
	}
	//資源
	if (this.power != undefined && this.power != "" && this.npcFlg != "1") {
		this.popupText += this.material + "<br/>";
		if (getTxt != "") {
			this.popupText += "　賊討伐入手（" + getTxt + "）<br/>";
		}
	}
	//人口
	if (this.population != undefined && this.population != "") {
		this.popupText += "人" +this. population + "<br/>";
	}
	//防御力
	if (defTxt != "") {
		this.popupText += defTxt;
	}
	//最終更新日時
	if (this.lastUpdate != undefined) {
		var dateText = this.lastUpdate;
		dateText = dateText.replace(/^[0-9]{4}\//, "");
		dateText = dateText.replace(/:[0-9]{2}$/, "");
		this.popupText += dateText;
	}
	
	//return popupText;
}

//地図切り替え
function changeMap() {
	//現在の表示を消去
	if (MAP_MODE != MAP_MODE_S) {
		document.getElementById("mapAll").style.display = "none";
		document.getElementById("maptoolLink").style.display = "none";
///マップスター表示消去
		document.getElementById("mapStarItemWrapper").style.display = "none";
///

	} else {
		document.getElementById("maptoolHead").style.display = "none";
	}
	if (MAP_MODE != MAP_MODE_M) {
		document.getElementById("maptoolBody").style.display = "none";
	}
	if (MAP_MODE != MAP_MODE_L) {
		document.getElementById("maptoolBodyL").style.display = "none";
	}
	
	//地図ツール共通部表示
	if (MAP_MODE != MAP_MODE_S) {
		document.getElementById("maptoolHead").style.display = "block";
		
		var switchName;
		if (MAP_MODE == MAP_MODE_M) switchName = "広域";
		if (MAP_MODE == MAP_MODE_L) switchName = "中域";
		document.getElementById("maptoolSwitch").innerHTML = switchName;
		
		if (MAP_MODE == MAP_MODE_L) {
			document.getElementById("maptoolTime").disabled = true;
		} else {
			document.getElementById("maptoolTime").disabled = false;
		}
	}
	
	//時間がかかるので別スレッド化（一旦描画して砂時計を表示させる）
	setWaitCursor();
	window.setTimeout(function() {
		//地図ツール個別部表示
		if (MAP_MODE == MAP_MODE_M) {
			//中域地図
			document.getElementById("maptoolBody").style.display = "block";
		} else if (MAP_MODE == MAP_MODE_L) {
			//広域地図
			document.getElementById("maptoolBodyL").style.display = "block";
		} else {
			//狭域地図
			var x = parseInt(getParameter("x"));
			if (isNaN(x)) x = 0;
			var y = parseInt(getParameter("y"));
			if (isNaN(y)) y = 0;
			if (x == CENTER_X && y == CENTER_Y) {
				document.getElementById("mapAll").style.display = "block";
				document.getElementById("maptoolLink").style.display = "block";
///マップスター再表示
		document.getElementById("mapStarItemWrapper").style.display = "block";
///

				window.scroll(0,0);
			} else {
				//ページリロード
				GM_setValue(location.hostname + "MAP_MODE", MAP_MODE);
				location.href = getMapUrl(CENTER_X, CENTER_Y);
			}
		}
		
		//未表示の場合はHTML生成
		if (LOADED_MAPS[MAP_MODE] != "1") {
//console.log((new Date()).getTime());
			if (MAP_MODE == MAP_MODE_M) {
				document.getElementById("maptoolBody").innerHTML = genBodyHtml();
//				// 右クリックメニューテスト用 by どらごら
//				if(ROUTE_ENABLE) {
//					for (var y=CENTER_Y+RADIUS; y>=CENTER_Y-RADIUS; y--) {
//						for (var x=CENTER_X-RADIUS; x<=CENTER_X+RADIUS; x++) {
//							
//							// 右クリック
//							var clsData = new genPopupText(loadCellData(generateCellKey(x, y)), x, y);
//							var routeLink = document.getElementById("route_a_" + x + "_" + y);
//	            function onMapContextMenu_env(b){return function(e) {onMapContextMenu(e, b);}}
//							routeLink.addEventListener("contextmenu", onMapContextMenu_env(clsData), false);
//							
//						}
//					}
//				}
			} else if (MAP_MODE == MAP_MODE_L) {
				document.getElementById("maptoolBodyL").innerHTML = genBodyHtmlL();
			}
//console.log((new Date()).getTime());
			
			LOADED_MAPS[MAP_MODE] = "1";
		}
		
		// by どらごら
		if(ROUTE_ENABLE) {
			onReWrite();
		}
		
		resetCursor();
	}, 0);
}

//同盟データ読み込み
function loadAllyData(ally) {
	var ret = new Array();
	var src = GM_getValue(generateAllyKey(ally), "");
	
	var array1 = src.split(DELIMIT);
	ret[IDX_ALLY_PARENT] = array1[IDX_ALLY_PARENT];
	if (ret[IDX_ALLY_PARENT] == undefined) ret[IDX_ALLY_PARENT] = "";
	
	var chiliren = new Array();
	if (array1[IDX_ALLY_CHILDREN] != undefined && array1[IDX_ALLY_CHILDREN] != "") {
		chiliren = array1[IDX_ALLY_CHILDREN].split(DELIMIT2);
	}
	ret[IDX_ALLY_CHILDREN] = chiliren;
	
	var members = new Array();
	if (array1[IDX_ALLY_MEMBERS] != undefined && array1[IDX_ALLY_MEMBERS] != "") {
		members = array1[IDX_ALLY_MEMBERS].split(DELIMIT2);
	}
	ret[IDX_ALLY_MEMBERS] = members;
	
	return ret;
}

//同盟データ保存
function saveAllyData(ally, data) {
	var dataArray = new Array();
	dataArray[IDX_ALLY_PARENT] = data[IDX_ALLY_PARENT];
	dataArray[IDX_ALLY_CHILDREN] = genDelimitString(data[IDX_ALLY_CHILDREN], DELIMIT2);
	dataArray[IDX_ALLY_MEMBERS] = genDelimitString(data[IDX_ALLY_MEMBERS], DELIMIT2);
	GM_setValue(generateAllyKey(ally), genDelimitString(dataArray, DELIMIT));
//console.log(generateAllyKey(ally) +":"+ genDelimitString(dataArray, DELIMIT));
	
	ALLYS_CACHE[ally] = data;
	if (searchArrayItem(ALLYS_INDEX, ally) < 0) {
		ALLYS_INDEX.push(ally);
	}
}

//同盟データキャッシュ取得
function getAllyDataCache(ally) {
	if (ALLYS_CACHE[ally] == undefined) {
		ALLYS_CACHE[ally] = loadAllyData(ally);
	}
	return ALLYS_CACHE[ally];
}

//親同盟取得
function getParentAlly(ally) {
	parentAlly = getAllyDataCache(ally)[IDX_ALLY_PARENT];
	if (parentAlly == undefined) {
		parentAlly = "";
	}
	
	return parentAlly;
}

//親同盟更新
function updateParentAlly(child, parent) {
	var childData = getAllyDataCache(child);
	var beforeParent = childData[IDX_ALLY_PARENT];
	
	//子同盟のデータを更新
	childData[IDX_ALLY_PARENT] = parent;
	saveAllyData(child, childData);
	
	//親同盟の子同盟リストに追加
	if (parent != "") {
		//TODO
	}
	
	//親同盟が変わった場合、元親の子同盟リストから削除
	if (beforeParent != "" && beforeParent != parent) {
		//TODO
	}
}

//同盟所属君主のデータを更新
function updateAllyMember(user, ally) {
	
	//所属同盟のデータを更新
	{
		var afterAllyData = getAllyDataCache(ally);
		var members = afterAllyData[IDX_ALLY_MEMBERS];
		if (searchArrayItem(members, user) < 0) {
			members.push(user);
			afterAllyData[IDX_ALLY_MEMBERS] = members;
			saveAllyData(ally, afterAllyData);
		}
	}
	
	//君主データの同盟情報を取得
	var userData = getUserDataCache(user);
	var beforeAlly = userData[IDX_USER_ALLY];
	
	//君主データがなかったら作成
	if (beforeAlly == "") {
		userData[IDX_USER_ALLY] = ally;
		saveUserData(user, userData);
	
	//君主の所属同盟が変化した場合
	} else if (beforeAlly != ally) {
		
		//同盟データの所属君主情報を更新
		var beforeAllyData = getAllyDataCache(beforeAlly);
		var members = beforeAllyData[IDX_ALLY_MEMBERS];
		var itemIdx = searchArrayItem(members, user);
		if (itemIdx >= 0) {
			members.splice(itemIdx, 1);
			beforeAllyData[IDX_ALLY_MEMBERS] = members;
			saveAllyData(beforeAlly, beforeAllyData);
		}
		
		//君主データの同盟情報を更新
		userData[IDX_USER_ALLY] = ally;
		saveUserData(user, userData);
	}
}

//君主データ読み込み
function loadUserData(user) {
	var ret = new Array();
	var src = GM_getValue(generateUserKey(user), "");
	var array1 = src.split(DELIMIT);
	
	var villages = new Array();
	if (array1[IDX_USER_VILLAGES] != undefined && array1[IDX_USER_VILLAGES] != "") {
		villages = array1[IDX_USER_VILLAGES].split("|");
	}
	ret[IDX_USER_VILLAGES] = villages;
	
	ret[IDX_USER_ALLY] = array1[IDX_USER_ALLY];
	if (ret[IDX_USER_ALLY] == undefined) ret[IDX_USER_ALLY] = "";
	
	return ret;
}

//君主データ保存
function saveUserData(user, data) {
	var dataArray = new Array();
	dataArray[IDX_USER_VILLAGES] = genDelimitString(data[IDX_USER_VILLAGES], "|");
	dataArray[IDX_USER_ALLY] = data[IDX_USER_ALLY];
	GM_setValue(generateUserKey(user), genDelimitString(dataArray, DELIMIT));
//console.log(generateUserKey(user) + ": " + genDelimitString(dataArray, DELIMIT));
	
	USERS_CACHE[user] = data;
	if (searchArrayItem(USERS_INDEX, user) < 0) {
		USERS_INDEX.push(user);
	}
}

//君主データキャッシュ取得
function getUserDataCache(user) {
	if (USERS_CACHE[user] == undefined) {
		USERS_CACHE[user] = loadUserData(user);
	}
	return USERS_CACHE[user];
}

//検索用索引保存
function saveAllysIndex() {
	GM_setValue(location.hostname + "ALLYS_INDEX", 
		genDelimitString(ALLYS_INDEX, DELIMIT));
}
function saveUsersIndex() {
	GM_setValue(location.hostname + "USERS_INDEX", 
		genDelimitString(USERS_INDEX, DELIMIT));
}

//NPC砦リストに追加
function saveNpcsIndex(value) {
	var key = location.hostname + "NPCS_INDEX";
	var delimiter = DELIMIT;
	
	var items = splitDelimited(GM_getValue(key, ""), delimiter);
	
	if (items.indexOf(value) == -1) {
		items.push(value);
		
		//Greasemonkey領域へ永続保存
		GM_setValue(key, genDelimitString(items, delimiter));
//console.log(key+": " + genDelimitString(items, delimiter));
	}
}

//完全一致/部分一致変更
function changeMatchMode(checked) {
	GM_setValue(location.hostname + "MATCH_FULL", checked);
//console.log(location.hostname + "MATCH_FULL: " + checked);
	MATCH_FULL = checked;
	
	//地図変更
	LOADED_MAPS = new Array();
	changeMap();
}


//名称定義読み込み
function loadNames(key) {
	var result = GM_getValue(location.hostname + key, "").split(DELIMIT);
	return result;
}

//色定義読み込み
function loadColors(key, defaults) {
	var result = new Array();
	var inputs = GM_getValue(location.hostname + key, "").split(DELIMIT)
	for (var i = 0; i < defaults.length; i++) {
		if (inputs[i] == undefined || inputs[i] == "") {
			result[i] = defaults[i];
		} else {
			result[i] = inputs[i];
		}
	}
	return result;
}

//入力値を保存
function saveInputAllys(key) {
	saveInputValues(key, ALLY_COLORS.length, "ally");
}
function saveInputUsers(key) {
	saveInputValues(key, USER_COLORS.length, "user");
}
function saveInputValues(key, length, id) {
	var newAllys = new Array();
	
	//テキストボックスから入力値を取得
	for (var i = 0; i < length; i++) {
		newAllys[i] = trim(document.getElementById(id + (i+1)).value);
	}
	
	//Greasemonkey領域に永続保存
	trimArray(newAllys);
	GM_setValue(location.hostname + key, genDelimitString(newAllys, DELIMIT));
//console.log(location.hostname + key + ":" + genDelimitString(newAllys, DELIMIT));
}

//配列空項目削除
function trimArray(ary) {
	for (var i = ary.length - 1; i >= 0; i--) {
		if (ary[i] != undefined && ary[i] != "") break;
		ary.splice(i, 1);
	}
}

//地図データCSV出力
function outputMapCsvS() {
	outputMapCsv(CSV_RADIUS_S);
}
function outputMapCsvL() {
	outputMapCsv(CSV_RADIUS_L);
}
function outputMapCsv(radius) {
	document.getElementById("mapAll").style.display = "none";
	document.getElementById("maptoolLink").style.display = "none";
	
	var frameElem = document.createElement("iframe");
	frameElem.id = "maptoolCsvFrame";
	frameElem.style.width = "100%";
	frameElem.style.height = "540px";
	
	var mapElem = document.evaluate('//*[@id="mapboxInner"]',
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	mapElem.snapshotItem(0).insertBefore(
		frameElem, document.getElementById("mapAll").nextSibling);
	
	//時間がかかるので別スレッド化（一旦描画して砂時計を表示させる）
	setWaitCursor();
	window.setTimeout(function() {
		var frameDoc = document.getElementById("maptoolCsvFrame").contentDocument;
		var addElem = frameDoc.createElement("pre");
		addElem.id = "maptoolCsv";
		addElem.style.fontSize = "12px";
		frameDoc.body.appendChild(addElem);
		
		//タイトル行
		var csvText = "";
		csvText += "X,Y,VILLAGE_NAME,USER_NAME,POPULATION,X_Y,ALLIANCER,POWER,";
		csvText += "WOOD,STONE,IRON,RICE,NPC_FLAG,LAST_UPDATE,CAPITAL_FLAG,PARENT_ALLY\n";
		
		//各マス行
		for (var y=CENTER_Y+radius; y>=CENTER_Y-radius; y--) {
			for (var x=CENTER_X-radius; x<=CENTER_X+radius; x++) {
				
				//保存データ取得
				var data = loadCellData(generateCellKey(x, y));
				if (data.length == 0) {
					continue;
				}
				
				csvText += x;
				csvText += ",";
				csvText += y;
				csvText += ",";
				csvText += convCsvString(data[IDX_VILLAGE_NAME]);
				csvText += ",";
				csvText += convCsvString(data[IDX_USER_NAME]);
				csvText += ",";
				csvText += data[IDX_POPULATION];
				csvText += ",";
				csvText += convCsvString("(" + x + "," + y + ")");
				csvText += ",";
				csvText += convCsvString(data[IDX_ALLIANCER]);
				csvText += ",";
				csvText += data[IDX_POWER];
				csvText += ",";
				csvText += data[IDX_WOOD];
				csvText += ",";
				csvText += data[IDX_STONE];
				csvText += ",";
				csvText += data[IDX_IRON];
				csvText += ",";
				csvText += data[IDX_RICE];
				csvText += ",";
				csvText += data[IDX_NPC_FLG];
				csvText += ",";
				csvText += data[IDX_LAST_UPDATE];
				csvText += ",";
				csvText += data[IDX_CAPITAL_FLG];
				csvText += ",";
				csvText += convCsvString(getParentAlly(data[IDX_ALLIANCER]));
				csvText += "\n";
			}
		}
		
		addElem.innerHTML = csvText;
		resetCursor();
	}, 100);
}

//マスデータキー生成
function generateCellKey(x, y) {
	return location.hostname + "(" + x + "," + y + ")";
}
//同盟データキー生成
function generateAllyKey(allyName) {
	return location.hostname + "_ally_" + escape(allyName);
}
//君主データキー生成
function generateUserKey(userName) {
	return location.hostname + "_user_" + escape(userName);
}

//基準時刻取得
function getBaseTime() {
	var res = GM_getValue(location.hostname + "BASE_TIME", "");
	if (res == "") {
		var date = new Date();
		res = "" + date.getFullYear() + padZero(date.getMonth() + 1) + 
			padZero(date.getDate());
	}
	return res;
}

//自拠点座標取得
//RE土＠mixi鯖さん(http://3gokushijp.zouri.jp/)提供
function getMyXY() {
	var d = document;
	var $x = function(xp,dc) {
		return document.evaluate(xp, dc||d, null, 
			XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	var nowLoc = $x('id("gnavi")//a[contains(@href,"map.php")]');
	if (!nowLoc) return "";

	var xy = nowLoc.href.match(/x=([\-0-9]+)&y=([\-0-9]+)/i);
	if( xy ) {
		return xy[1]+","+xy[2];
	}
}

//地図シフト
function shiftMap(shiftX, shiftY) {
	var r; //半径
	if (MAP_MODE == MAP_MODE_M) r = RADIUS;
	else if (MAP_MODE == MAP_MODE_L) r = RADIUS_L;
	
	//移動先座標算出
	var x = CENTER_X + ((r*2 + 1) * shiftX);
	var y = CENTER_Y + ((r*2 + 1) * shiftY);
	
	//地図移動
	moveMap(x, y);
}

//地図移動
function moveMap(x, y) {
	if (isNaN(x) || isNaN(y)) return;
	CENTER_X = x;
	CENTER_Y = y;
	
	//範囲外に出ないように
	CENTER_X = (CENTER_X > MAX_XY ? MAX_XY: CENTER_X);
	CENTER_X = (CENTER_X < -MAX_XY ? -MAX_XY: CENTER_X);
	CENTER_Y = (CENTER_Y > MAX_XY ? MAX_XY: CENTER_Y);
	CENTER_Y = (CENTER_Y < -MAX_XY ? -MAX_XY: CENTER_Y);
	
	//地図表示
	LOADED_MAPS = new Array();
	changeMap();
}

//地図画面URL取得
function getMapUrl(x, y) {
	return "/map.php?x=" + x + "&y=" + y;
}

//全データ初期化
function clearAllData() {
	var keys = GM_listValues();
	var hostname = location.hostname;
	for (var i = 0; i < keys.length; i++) {
		if (keys[i].indexOf(hostname, 0) == 0) {
			GM_deleteValue(keys[i]);
		}
	}
}

//カーソル変更
function setWaitCursor() {
	document.getElementsByTagName("body")[0].style.cursor = "wait";
}
function resetCursor() {
	document.getElementsByTagName("body")[0].style.cursor = "auto";
}

//CSS追加
function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName("head")[0];
	if (!head) { return; } style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = css;
	head.appendChild(style);
}

//URLパラメータ取得
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

//現在時刻取得（yyyy/mm/dd hh:mm:ss）
function getCurrentTime() {
	var date = new Date();
	var res = "" + date.getFullYear() + "/" + padZero(date.getMonth() + 1) + 
		"/" + padZero(date.getDate()) + " " + padZero(date.getHours()) + ":" + 
		padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());
	return res;
}
//現在時刻取得2（yyyymmddhhmmss）
function getCurrentTime2() {
	var date = new Date();
	var res = "" + date.getFullYear() + padZero(date.getMonth() + 1) + 
		padZero(date.getDate()) + padZero(date.getHours()) + 
		padZero(date.getMinutes()) + padZero(date.getSeconds());
	return res;
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
	return str.replace(/^[ 　\t\r\n]+|[ 　\t\r\n]+$/g, "");
}

//CSV用文字列変換
function convCsvString(str) {
	var result;
	
	//「"」を「""」に変換
	result = str.replace(/\"/g, "\"\"");
	
	//「,」を含む場合は全体を「"」で囲む
	if (result.indexOf(",") >= 0) {
		result = "\"" + result + "\""
	}
	
	return result;
}

//デリミタ区切り文字列生成
function genDelimitString(dataArray, delimiter) {
	var ret = "";
	for (var i=0; i < dataArray.length; i++) {
		if (dataArray[i] != undefined) ret += dataArray[i];
		if (i < dataArray.length-1) ret += delimiter;
	}
	return ret;
}


//完全一致/部分一致チェック
function matchString(target, sub) {
	if (target == undefined || sub == undefined || sub == "") {
		return false;
	}
	
	var tbl = sub.split(",")
	target = target.toLowerCase();

	for (var i=0; i<tbl.length; i++) {
		var tmp = tbl[i].toLowerCase();
		if (tmp != undefined && tmp != "") {
			if (MATCH_FULL) {
				if (target == tmp) return true;
			} else {
				if (target.indexOf(tmp) >= 0) return true;
			}
		}
	}

	return false;
}

function searchArrayString(targets, sub) {
	var ret = new Array();
	for (var i=0; i<targets.length; i++) {
		if (matchString(targets[i], sub)) ret.push(targets[i]);
	}
	return ret;
}

//数値チェック
function isNumeric(num) {
	if (num.match(/^-?[0-9]+$/)) {
		return true;
	}
	return false;
}

//配列検索
function searchArrayItem(array, key) {
	for (var i=0; i<array.length; i++) {
		if (array[i] == key) {
			return i;
		}
	}
	return -1;
}

//デリミタ区切り文字列を配列に変換
function splitDelimited(str, delimiter) {
	if (str == undefined || str == "") {
		return new Array();
	} else {
		return str.split(delimiter);
	}
}

//Google Chrome用GM_*系ラッパー関数
function initGMWrapper() {
	
	// @copyright      2009, James Campos
	// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
	if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
		GM_addStyle = function(css) {
			var style = document.createElement('style');
			style.textContent = css;
			document.getElementsByTagName('head')[0].appendChild(style);
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(LOCAL_STORAGE + "." + name);
		}

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(LOCAL_STORAGE + "." + name);
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
		}

		GM_log = function(message) {
			console.log(message);
		}

		GM_registerMenuCommand = function(name, funk) {
		//todo
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			try {
				localStorage.setItem(LOCAL_STORAGE + "." + name, value);
			} catch (e) {
				alert("localStorageへの保存に失敗 (" + e + ")");
				throw e;
			}
		}
		
		//by froo
		GM_listValues = function() {
			var res = new Array();
			for (var i = 0; i < localStorage.length; i++) {
				var key = localStorage.key(i);
				if (key.indexOf(LOCAL_STORAGE + ".", 0) == 0) {
					res.push(key.replace(/^.*?\./, ""));
				}
			}
			return res;
		}
	}
}

//------------------------------------------------------------------------------

//座標から同盟名を取得 by どらごら
// getAllyFromMapClassからコピペ
function getAllyFromXy(x, y) {
	var data = getCellDataCache(generateCellKey(x, y));
	var ally = data[IDX_ALLIANCER];
	if (ally == undefined) ally = "";
	
	return ally;
}

//59x59範囲取得 by どらごら
function getMap5959() {
	
	var max;	//取得画面数
	var pos;	//取得位置補正

	if (MAP_MODE == MAP_MODE_L){
		max = 13;	//13×13＝169画面分取得
		pos = 120;
	} else {
		if (MAP_WIDE){
			max = 4;	//4×4＝16画面分取得
			pos = 30;
		} else {
			max = 3;	//3×3＝9画面分取得
			pos = 20;
		}
	}

	if( confirm("表示範囲を一気に取得するためサーバに負荷がかかります。\n" +
							"何度も実行するとDOS攻撃と同じなので、実行には注意して下さい\n" +
							"※取得中はあまり他の動作を行わないようにしてください。") == false ) return;

	for (var i = 0; i < max; i++) {
		for (var j = 0; j < max; j++) {
			GET_MAP_LIST.push(new Array(CENTER_X - pos + (j*20), CENTER_Y - pos + (i*20)));
		}
	}
	setWaitCursor();
	GET_MAP_LIST_COUNTER = GET_MAP_LIST.length;
	MAX_MAP_LIST = GET_MAP_LIST_COUNTER;
	window.setTimeout(getMaps, 0);
	GET_MAP_SLEEP_TID = setInterval( GetMapSleep , 1000);
}

// 条件監視sleep by どらごら
function GetMapSleep(){
	j$("#maptoolExGetMap5959").text((MAX_MAP_LIST - GET_MAP_LIST_COUNTER) + "/" + MAX_MAP_LIST);

	clearInterval(GET_MAP_SLEEP_TID);
	if(GET_MAP_LIST_COUNTER <= 0){
		LOADED_MAPS = new Array();
		changeMap();
		resetCursor();
		j$("#maptoolExGetMap5959").text("全範囲取得");
		alert("地図情報　取得完了!");
	} else {
		GET_MAP_SLEEP_TID = setInterval( GetMapSleep , 1000);
	}
	
}

// マップページをajaxを使用して取得 by どらごら
function getMaps() {
	
	j$("#maptoolExGetMap5959").text((MAX_MAP_LIST - GET_MAP_LIST_COUNTER) + "/" + MAX_MAP_LIST);
	if(GET_MAP_LIST.length == 0) {
		return;
	}
	
	var mapPosi = GET_MAP_LIST.pop();
	
	cajaxRequest(getMapUrl(mapPosi[0], mapPosi[1]) + "&type=3", "GET", "", function(req) {
		var cx = parseInt(CENTER_X);
		var cy = parseInt(CENTER_Y);
		var map= parseInt(MAP_SCALE);
		CENTER_X = parseInt(mapPosi[0]);
		CENTER_Y = parseInt(mapPosi[1]);
		MAP_SCALE = 20;	//↑の引数「type=3」は１画面20×20マスのモード
		var reqXML = createNewDocument(req.responseText);

		saveMapData2(reqXML);
		saveCapital2(reqXML);
		saveAllyForMap2(reqXML);
		CENTER_X = parseInt(cx);
		CENTER_Y = parseInt(cy);
		MAP_SCALE = map;

		GET_MAP_LIST_COUNTER = GET_MAP_LIST_COUNTER - 1;
	});
	
	window.setTimeout(getMaps, 0);
}

// html to new document
// Autopagerize(http://userscripts.org/scripts/review/8551)
// by どらごら
function createNewDocument(req) {
	
	return createHTMLDocumentByString(req);
	
	function createHTMLDocumentByString(str) {
    if (document.documentElement.nodeName != 'HTML') {
        return new DOMParser().parseFromString(str, 'application/xhtml+xml')
    }
    var html = strip_html_tag(str)
    var htmlDoc
    try {
        // We have to handle exceptions since Opera 9.6 throws
        // a NOT_SUPPORTED_ERR exception for |document.cloneNode(false)|
        // against the DOM 3 Core spec.
        htmlDoc = document.cloneNode(false)
        htmlDoc.appendChild(htmlDoc.importNode(document.documentElement, false))
    }
    catch(e) {
        htmlDoc = document.implementation.createDocument(null, 'html', null)
    }
    var fragment = createDocumentFragmentByString(html)
    try {
        fragment = htmlDoc.adoptNode(fragment)
    }
    catch(e) {
        fragment = htmlDoc.importNode(fragment, true)
    }
    htmlDoc.documentElement.appendChild(fragment)
    return htmlDoc
	}
	function strip_html_tag(str) {
    var chunks = str.split(/(<html(?:[ \t\r\n][^>]*)?>)/)
    if (chunks.length >= 3) {
        chunks.splice(0, 2)
    }
    str = chunks.join('')
    chunks = str.split(/(<\/html[ \t\r\n]*>)/)
    if (chunks.length >= 3) {
        chunks.splice(chunks.length - 2)
    }
    return chunks.join('')
	}
	function createDocumentFragmentByString(str) {
    var range = document.createRange()
    range.setStartAfter(document.body)
    return range.createContextualFragment(str)
	}
}

// ajaxラッパー by どらごら
function cajaxRequest(url, method, param, func_success, func_fail){
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200){
			func_success(req);
		}
		else if (req.readyState == 4 && req.status != 200){
			func_fail(req);
		}
	}
	
	req.open(method, url, true);
	if (method == 'POST'){
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}
	req.send(param);
}

// jQuery append by どらごら
// 
function jQueryAppend() {
	
	j$ = unsafeWindow.jQuery;
	
  j$(document.body).append(
		"<div id='route_contextmenu'>" +
			"<ul id='route_command' style='text-align:left'></ul>" +
		"</div>");
	j$("#route_contextmenu")
		.hide()
		.css({ 
			position: "absolute", 
			backgroundColor: "white", 
			border: "outset 2px gray", 
			color: "black", 
			padding: "3px", 
			zIndex: 999
		});
	
	
}

// スクリプトタグを追加 by どらごら
function addRouteScriptHtml() {
	
	if(ROUTE_ENABLE == false) return;
	
	var funcHTML = onMapMouseOver+onMapMouseOut+onMapClick+menuMapChk+createArgClass+
									onMapContextMenu+menuMapChk+menuChkDel;
	var scriptElem = document.createElement("script");
	scriptElem.type = "text/javascript";
	scriptElem.innerHTML = funcHTML;
	document.getElementsByTagName("head")[0].appendChild(scriptElem);
}

function createArgClass(x, y, pw, center_flg, bg_color) {
	this.x = x;
	this.y = y;
	this.pw = pw;
	this.center_flg = center_flg;
	this.bg_color = bg_color;
}

// マウス移動 by どらごら
function onMapMouseOver(e, x,y,p,c,b) {
	j$("#route_td_" + x + "_" + y).css("border", "solid 2px lime");
}

// マウス外れ by どらごら
function onMapMouseOut(e, x,y,p,c,b) {
	//中心マスに目印
	var borderColor = "white";
	var borderPic = "0px";
	var bold = "solid";
	if (c) {
		borderColor = "black";
		borderPic = "2px";
	}
	j$("#route_td_" + x + "_" + y).css("border", bold+" "+borderPic+" "+borderColor);
	
}

/* 無効化by鮪 // マップ左クリック by どらごら
function onMapClick(e, x,y,p,c,b) {
	if(document.getElementById("route_chk_enable").checked == true) {
		menuMapChk(e, x,y,p,c,b);
	} else {
		location.href = "/map.php?x=" + x + "&y=" + y;
	}
}
無効化by鮪 */
// マップ左クリック by どらごら 改変by鮪
function onMapClick(e, x,y,p,c,b,m) {
	if(document.getElementById("route_chk_enable").checked == true) {
		menuMapChk(e, x,y,p,c,b,m);
	} else {
		location.href = "/map.php?x=" + x + "&y=" + y;
	}
}

// マップ右クリック by どらごら
//orig function onMapContextMenu(e, x,y,p,c,b) {
function onMapContextMenu(e, x,y,p,c,b,m) {//by鮪
	
	// メニュー追加
	j$("#route_command")
		.text("")
		.append("<li id='chkLink' class='route_item' style='padding:0px 10px'>チェック</li>")
		.append("<li id='delLink' class='route_item' style='padding:0px 10px'>取り消し</li>")
		.append("<li id='moveLink' class='route_item' style='padding:0px 10px'>画面遷移</li>")
		.append("<li id='detailLink' class='route_item' style='padding:0px 10px'>詳細</li>")
		.append("<li id='sortieLink' class='route_item' style='padding:0px 10px'>出撃</li>");
	
	j$(".route_item")
		.mouseover(function() {
			j$(this).css("backgroundColor", "grey")
		})
		.mouseout(function() {
			j$(this).css("backgroundColor", "white")
		});
	
	j$("#chkLink")
		.addClass("subMenuItem")
		.unbind("click")
		.one("click", 
/* 無効化by鮪			function (x,y,p,c,b) {
				return function () {
					menuMapChk(e, x,y,p,c,b);
				};
			}(x,y,p,c,b)); */
			function (x,y,p,c,b,m) {//ここからby鮪
				return function () {
					menuMapChk(e, x,y,p,c,b,m);
				};
			}(x,y,p,c,b,m));//ここまでby鮪
	
	j$("#delLink")
		.addClass("subMenuItem")
		.unbind("click")
		.one("click", 
			function (x,y,p,c,b) {
				return function () {
					menuChkDel(e, x,y,p,c,b);
				};
			}(x,y,p,c,b));
	
	j$("#moveLink")
		.addClass("subMenuItem")
		.unbind("click")
		.one("click", 
			function (x,y,p,c,b) {
				return function () {
					location.href = "map.php?x=" + x + "&y=" + y;
				};
			}(x,y,p,c,b));
	
	j$("#detailLink")
		.addClass("subMenuItem")
		.unbind("click")
		.one("click", 
			function (x,y,p,c,b) {
				return function () {
					location.href = "land.php?x=" + x + "&y=" + y;
				};
			}(x,y,p,c,b));
	
	
	j$("#sortieLink")
		.addClass("subMenuItem")
		.unbind("click")
		.one("click", 
			function (x,y,p,c,b) {
				return function () {
					location.href = "facility/castle_send_troop.php?x=" + x + "&y=" + y + "#ptop";
				};
			}(x,y,p,c,b));
	
	
	
	// メニュー表示
	j$("#route_contextmenu")
		.css({ 
			left: e.pageX + "px", 
			top: e.pageY + "px"
		})
		.show();
	
	j$(document)
		.unbind("click")
		.one("click", 
			function () {
				j$("#route_contextmenu").hide();
			});
	
	// デフォルトのメニューは非表示
	e.preventDefault();
}

// ルートの検証 by どらごら
function onValidation() {
	
	var txtbox = document.getElementById("route_output");
	var line = txtbox.value.split("\n");
	var x = null;
	var y = null;
	var lineNum;
	var count = 0;//by鮪
	for(var i=0;i<line.length;i++) {
		
		regObj = new RegExp(/[^-^\d]*([^,]*),([^\)]*)\)[\s\u3000\u2605\u2606\d]*(.*)/);
		if (line[i].match(regObj)) {
			
			var tdElem = document.getElementById("route_td_" + RegExp.$1 + "_" + RegExp.$2);
			if (tdElem == null) {
				continue;
			}
			
			if ((x == null) && (y == null)) {
				x = RegExp.$1;
				y = RegExp.$2;
				lineNum = i;
				continue;
			}
			
			if ((Math.abs(x - RegExp.$1) > 1 ) || (Math.abs(y - RegExp.$2) > 1 )) {
				// not chain
				var msg = (lineNum + 1) + "行目の(" + x + "," + y + ")と\n" +
				          (i + 1) + "行目の(" + RegExp.$1 + "," + RegExp.$2 + ")が離れています";
				alert(msg);
				count++;//by鮪
			}
			x = RegExp.$1;
			y = RegExp.$2;
			lineNum = i;
		}
		
	}
	var alt = "チェック終了!";  if(count ==0){alt += " 全てOK!";}//by鮪
	alert(alt);//by鮪
//orig	alert("チェック終了！");
}


// マップをチェック by どらごら 改変by鮪//\u68EE\u5CA9\u9244\u7CE7
function menuMapChk(e, x,y,p,c,b,m) {
	var convi = "☆" + p.length;	var power = "☆" + p.length;
	var zahyo = "(" + x + "," + y + ")";	var type = "";	var CUR ="<ZAHYO> <SLTC> ";
	if(m == "_1_0_0_0"){type = "木";	convi = power + type;};
	if(m == "_0_1_0_0"){type = "石";	convi = power + type;};
	if(m == "_0_0_1_0"){type = "鉄";	convi = power + type;};
	if(m == "_0_0_0_1"){type = "米1";
		if(p.length==1){type = "米";}	convi = power + type;};
	if(m == "_3_0_0_0"){type = "木";	convi = power + type;};
	if(m == "_0_3_0_0"){type = "石";	convi = power + type;};
	if(m == "_0_0_3_0"){type = "鉄";	convi = power + type;};
	if(m == "_1_1_1_0"){type = "111";	convi = type + power;};
	if(m == "_0_0_0_4"){type = "米4";	convi = power + type;};
	if(m == "_1_1_2_0"){type = "112";	convi = type + power;};
	if(m == "_2_2_1_0"){type = "221";	convi = type + power;};
	if(m == "_1_1_1_2"){type = "1112";	convi = type + power;};
	if(m == "_2_2_2_0"){type = "222";	convi = type + power;};
	if(m == "_6_0_0_0"){type = "木";	convi = power + type;};
	if(m == "_0_6_0_0"){type = "石";	convi = power + type;};
	if(m == "_0_0_6_0"){type = "鉄";	convi = power + type;};
	if(m == "_4_1_2_0"){type = "412";	convi = type + power;};
	if(m == "_2_4_1_0"){type = "241";	convi = type + power;};
	if(m == "_1_2_4_0"){type = "124";	convi = type + power;};
	if(m == "_2_2_2_2"){type = "2222";	convi = type + power;};
	if(m == "_0_0_0_8"){type = "米8";	convi = power + type;};
	if(m == "_3_3_3_0"){type = "333";	convi = type + power;};
	if(m == "_10_0_0_0"){type = "木";	convi = power + type;};
	if(m == "_0_10_0_0"){type = "石";	convi = power + type;};
	if(m == "_0_0_10_0"){type = "鉄";	convi = power + type;};
	if(m == "_2_4_4_0"){type = "244";	convi = type + power;};
	if(m == "_0_0_0_12"){type = "米12";	convi = power + type;};
	if(m == "_14_0_0_0"){type = "木14";	convi = power + type;};
	if(m == "_0_14_0_0"){type = "石14";	convi = power + type;};
	if(m == "_0_0_14_0"){type = "鉄14";	convi = power + type;};
	if(m == "_4_4_4_4"){type = "4444";	convi = type + power;};
	if(m == "_0_0_0_18"){type = "米18";	convi = power + type;};
	convi = convi.replace("1米1","1米");
	var rf = "";
	if(document.getElementById("route_form")
	  && document.getElementById("route_form").value){rf = document.getElementById("route_form").value;}
	if(rf && rf.length && rf.length>5){ CUR = rf;}
	//<STAR>:戦力,<TYPE>:土地種,<SLTC>:戦力土地種コンビ(例:244☆7,☆7米12),<ZAHYO>:座標
	CUR = CUR.replace(/<STAR>/g,power).replace(/<TYPE>/g,type).replace(/<SLTC>/g,convi).replace(/<ZAHYO>/g,zahyo).replace(/\\t/g,"\t").replace(/\\n/g,"\n");
	if(document.getElementById("route_star1c")){
		if((document.getElementById("route_star1c").checked == true)&&(p.length<2)){CUR = zahyo;}
	}
	CUR += "\n";
	j$("#route_output").val(j$("#route_output").val() + CUR);
	j$("#route_td_" + x + "_" + y).css("backgroundColor", "#FF00FF");
}

/* orig
// マップをチェック by どらごら
function menuMapChk(e, x,y,p,c,b) {
	j$("#route_output").val(j$("#route_output").val() + "(" + x + "," + y + ") ★" + p.length + " \n");
	j$("#route_td_" + x + "_" + y).css("backgroundColor", "#FF00FF");
}
*/

// チェックを削除 by どらごら
function menuChkDel(e, x,y,p,c,b) {
	
	var txtbox = document.getElementById("route_output");
	var line = txtbox.value.split("\n");
	var newText = "";
	
	for(var i=0;i<line.length;i++) {
		
		regObj = new RegExp(/[^-^\d]*([^,]*),([^\)]*)\)[\s\u3000\u2605\u2606\d]*(.*)/);
		if (line[i].match(regObj)) {
			
			if((x == RegExp.$1) && (y == RegExp.$2)) {
				
				var tdElem = document.getElementById("route_td_" + RegExp.$1 + "_" + RegExp.$2);
				if(tdElem != null) {
					tdElem.style.backgroundColor = b;
				}
				
			} else {
				newText += line[i] + "\n";
			}
			
		} else {
			// 一致しなくても、行は有効
			newText += line[i] + "\n";
		}
		
	}
	txtbox.value = newText;
	
}
// マップに反映 by どらごら
function onReWrite() {
	var txtbox = document.getElementById("route_output");
	var line = txtbox.value.split("\n");
	
	for(var i=0;i<line.length;i++) {
		
		regObj = new RegExp(/[^-^\d]*([^,]*),([^\)]*)\)[\s\u3000\u2605\u2606\d]*(.*)/);
		if (line[i].match(regObj)) {
			
			var tdElem = document.getElementById("route_td_" + RegExp.$1 + "_" + RegExp.$2);
			if(tdElem == null) {
				continue;
			}
			
//orig			if(RegExp.$3.trim() == "") {
			if(trim(RegExp.$3) == "") {//by鮪}
				tdElem.style.backgroundColor = "#FF00FF";
			} else {
				tdElem.style.backgroundColor = "#00FF00";
			}
		}
		
	}
}

// 出兵画面に簡易出兵先情報表示準備 by どらごら
function sendTroop() {
	
	//自拠点座標取得
	var xy = getMyXY();
	if (xy == "") {
		MY_X = 0;
		MY_Y = 0;
	} else {
		MY_X = parseInt(xy.split(",")[0]);
		MY_Y = parseInt(xy.split(",")[1]);
	}
	
	j$("input[name=village_x_value]").attr("id", "village_x_value");
	j$("input[name=village_y_value]").attr("id", "village_y_value");
	document.getElementById("village_x_value").addEventListener("change",
		function() {
			sendTroopInfo();
		},
		true);
	document.getElementById("village_y_value").addEventListener("change",
		function() {
			sendTroopInfo();
		},
		true);
	
	j$(".notice:eq(3)").append(
		"<div id='sendTroopInfo'>" +
			"<table id='sendTroopInfoTable' class='commonTables'>" +
			"<tr>" +
				"<th class='mainTtl'>森</th>" +
				"<th class='mainTtl'>岩</th>" +
				"<th class='mainTtl'>鉄</th>" +
				"<th class='mainTtl'>糧</th>" +
				"<th class='mainTtl'>強さ</th>" +
				"<th class='mainTtl'>距離</th>" +
			"</tr>" +
			"<tr>" +
				"<td id='sendTroop_wood'></th>" +
				"<td id='sendTroop_stone'></th>" +
				"<td id='sendTroop_iron'></th>" +
				"<td id='sendTroop_rice'></th>" +
				"<td id='sendTroop_power'></th>" +
				"<td id='sendTroop_distance'></th>" +
			"</tr>" +
			"</table>" +
			"<div id='locationErrMsg' style='display:none'>"+
				"<font color='red'>未取得の座標です</font>"+
			"</div>"+
		"</div>"
	);
	
	// 情報表示
	sendTroopInfo();
}

// 出兵画面に簡易出兵先情報表示 by どらごら
function sendTroopInfo() {
	
	//保存データ取得
	var x = parseInt(j$("input[name=village_x_value]").val());
	var y = parseInt(j$("input[name=village_y_value]").val());
	var data = loadCellData(generateCellKey(x, y));
	if (data.length == 0) {
		j$("#sendTroopInfoTable td:first")
			.text("")
			.next().text("")
			.next().text("")
			.next().text("")
			.next().text("")
			.next().text("")
			;
		j$("#locationErrMsg").show();
		
	} else {
		var clsData = new genPopupText(data, x, y);	// by どらごら
		
		j$("#sendTroopInfoTable td:first")
			.text(clsData.data[IDX_WOOD])
			.next().text(clsData.data[IDX_STONE])
			.next().text(clsData.data[IDX_IRON])
			.next().text(clsData.data[IDX_RICE])
			.next().text("☆" + (clsData.power).length)
			.next().text(clsData.distance)
			;
		j$("#locationErrMsg").hide();
	}
}

function allianceCSV(){
	//CSV出力用
	if (j$("#csvMake").size() == 0){
		j$("table.tables")
			.after("<iframe style=\"width: 100%; height: 0px; visibility:hidden\" id=\"memberCsvFrame\"></iframe>")
			.after("<p id=\"csvMake\">同盟員全領地情報取得</p>");

		j$("#csvMake").css("background","black").css("width", "180px").css("color", "white").css("text-align", "center");
	}
	j$("#csvMake").click(function() {
		if (j$("#csvMake").text() != "同盟員全領地情報取得"){return;}
		if( confirm("同盟員の情報を一気に取得するためサーバに負荷がかかります。\n何度も実行するとDOS攻撃と同じなので、実行には注意して下さい") == false ) return;

		MEMBER_ID_LIST = new Array();
		j$("table.tables td a").each(function(){
			var url = j$(this).attr("href");
			var uid = url.match(/user_id=[0-9]+/);
			if (uid != null){
				MEMBER_ID_LIST.push({"URL":"/user/?" + uid});
			}
		});

		MEMBER_INFO_TEXT = "Ｘ座標,Ｙ座標,君主,領地,人口,本拠地,戦力,森,岩,鉄,糧,備考\n";
		setWaitCursor();
		MEMBER_ID_LIST_COUNTER = MEMBER_ID_LIST.length;
		MEMBER_ID_MAX_COUNTER = MEMBER_ID_LIST_COUNTER;
		window.setTimeout(GetMember, 0);
	});
}

function GetMember() {

	j$("#csvMake").text("情報取得中" +  (MEMBER_ID_MAX_COUNTER - MEMBER_ID_LIST_COUNTER) + "/" + MEMBER_ID_MAX_COUNTER);
	if(MEMBER_ID_LIST.length == 0) {
		if (MEMBER_ID_LIST_COUNTER > 0){
			window.setTimeout(GetMember, 1000);
		} else {
			var frameDoc = document.getElementById("memberCsvFrame").contentDocument;
			var addElem = frameDoc.createElement("pre");
			addElem.id = "memberCsv";
			addElem.style.fontSize = "12px";
			frameDoc.body.appendChild(addElem);

			addElem.innerHTML = MEMBER_INFO_TEXT;
			j$("#memberCsvFrame").css("height", "300px").css("visibility","visible");
			j$("#csvMake").text("同盟員全領地情報取得(済)");
			resetCursor();
			alert("同盟情報　取得完了!");
			return;
		}
	}

	var member = MEMBER_ID_LIST.pop();
	cajaxRequest(member.URL, "GET", "", function(req) {
		var dt = getXYListfromUserHTML(req.responseText);
		if( dt ) {
			for(var i=0 ; i<dt.length ; i++) {
				MEMBER_INFO_TEXT += dt[i].x + ",";
				MEMBER_INFO_TEXT += dt[i].y + ",";
				MEMBER_INFO_TEXT += convCsvString(dt[i].user_name) + ",";
				MEMBER_INFO_TEXT += convCsvString(dt[i].area_name) + ",";
				MEMBER_INFO_TEXT += dt[i].jinko + ",";
				MEMBER_INFO_TEXT += dt[i].honkyo + ",";
				var data = getCellDataCache(generateCellKey(dt[i].x, dt[i].y));
				if (data.length == 0) {
					MEMBER_INFO_TEXT += ",,,,,情報未取得\n";
				} else {
					if (dt[i].jinko != ""){
						MEMBER_INFO_TEXT += ",,,,,\n";	//拠点の場合、資源情報は無しとする。
					} else {
						MEMBER_INFO_TEXT += data[IDX_POWER] + ",";
						MEMBER_INFO_TEXT += data[IDX_WOOD] + ",";
						MEMBER_INFO_TEXT += data[IDX_STONE] + ",";
						MEMBER_INFO_TEXT += data[IDX_IRON] + ",";
						MEMBER_INFO_TEXT += data[IDX_RICE] + ",\n";
					}
				}
			}
		}

		MEMBER_ID_LIST_COUNTER = MEMBER_ID_LIST_COUNTER - 1;
	});
	window.setTimeout(GetMember, 0);

	function getXYListfromUserHTML(html){
		var ret = new Array();
		var tmp = html.match(/<td[^>]*>君主<\/td>[^<]*<td[^>]*>([^<\s]+)/);
		if( !tmp ) return null;
		var user_name = tmp[1];

		var pos;
		var reg = /<a href="\.\.\/(?:land|village_change)\.php[^"]*">\s*([^<\s]+)\s*<\/a>[^<]*<\/td>[^<]*<td[^>]*>([\-0-9]+),([\-0-9]+)<\/td>[^<]*<td[^>]*>([0-9]+|&nbsp;)<\/td>/;
		var honkyo = 1;
		while((pos = html.search(reg) ) != -1 ) {

			html = html.substr(pos);

			var dat = html.match(reg);
			if( !dat ) break;

			if( dat[4] == "&nbsp;" ) dat[4] = "";

			ret.push({"user_name":user_name, "area_name":dat[1].replace(/(^\s+|\s+$)/g, ""), "x":dat[2], "y":dat[3], "jinko":dat[4], "honkyo":honkyo});
			honkyo="";
			html = html.substr(dat[0].length);
		}

		return ret;
	}
}

//出兵まとめ by 鮪
function unit_status_matome(){
    var $x = function(xp, dc) {function c(f) {var g = ''; if (typeof f === 'string') {g = f;} var h = function(a) {var b = document.implementation.createHTMLDocument(''); var c = b.createRange(); c.selectNodeContents(b.documentElement); c.deleteContents(); b.documentElement.appendChild(c.createContextualFragment(a)); return b;}; if (0 <= navigator.userAgent.toLowerCase().indexOf('firefox')) {h = function(a) {var b = document.implementation.createDocumentType('html', '-//W3C//DTD HTML 4.01//EN', 'http://www.w3.org/TR/html4/strict.dtd'); var c = document.implementation.createDocument(null, 'html', b); var d = document.createRange(); d.selectNodeContents(document.documentElement); var e = c.adoptNode(d.createContextualFragment(a)); c.documentElement.appendChild(e); return c;};} return h(g);} var m = [], r = null, n = null; var o = dc || document.documentElement; var p = o.ownerDocument; if (typeof dc === 'object' && typeof dc.nodeType === 'number') {if (dc.nodeType === 1 && dc.nodeName.toUpperCase() === 'HTML') {o = c(dc.innerHTML); p = o;} else if (dc.nodeType === 9) {o = dc.documentElement; p = dc;}} else if (typeof dc === 'string') {o = c(dc); p = o;} try {r = p.evaluate(xp, o, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); for (var i = 0, l = r.snapshotLength; i < l; i++) m.push(r.snapshotItem(i));} catch (e) {try {var q = p.evaluate(xp, o, null, XPathResult.ANY_TYPE, null); while (n = q.iterateNext()) m.push(n);} catch (e) {throw new Error(e.message);}} return m;};
	var units = $x('//div[@id="all"]/table[@summary="出撃中の兵士"]//td');
	var matome = "\n";
	for(var i=0;i<units.length;i++) {
	    if(units[i].innerHTML.match(/<span id="area_timer/)){
		var at = "";	var zh = units[i-1].innerHTML;
		if(zh){var z = zh.match(/land.php\?x=(-?\d+)&amp;y=(-?\d+)"/i);}
		if(z){if(z[1] && z[2]){zh = "("+z[1]+","+z[2]+")"; }}
		var ti = units[i].innerHTML.match(/\d\d\d\d[-\/]\d\d[-\/]\d\d(\s|&nbsp;)+(\d\d\:\d\d\:\d\d)/);
		if(ti && ti[2]){at = ti[2];}	if(zh && at){matome += zh + at + "\n";}
	    }
	}
	if(matome.length>3){
		var mtm = document.getElementById("rotate");
		var addElem = document.createElement("h3");
		addElem.style.fontSize = "9px";
		addElem.innerHTML = "出撃中まとめ";
		mtm.appendChild(addElem);

		addElem = document.createElement("textarea");
		addElem.id = "gomatome";
		addElem.style.fontSize = "8px";
		addElem.innerHTML = matome;
		mtm.appendChild(addElem);
	}
	var units = $x('//div[@id="all"]/table[@summary="帰還中の兵士"]//td');
	matome = "\n";
	for(var i=0;i<units.length;i++) {
	    if(units[i].innerHTML.match(/<span id="area_timer/)){
		var at = "";	var zh = units[i-1].innerHTML;
		if(zh){var z = zh.match(/land.php\?x=(-?\d+)&amp;y=(-?\d+)"/i);}
		if(z){if(z[1] && z[2]){zh = "("+z[1]+","+z[2]+")"; }}
		var ti = units[i].innerHTML.match(/\d\d\d\d[-\/]\d\d[-\/]\d\d(\s|&nbsp;)+(\d\d\:\d\d\:\d\d)/);
		if(ti && ti[2]){at = ti[2];}	if(zh && at){matome += zh + at + "\n";}
	    }
	}
	if(matome.length>3){
		var mtm = document.getElementById("rotate");
		var addElem = document.createElement("h3");
		addElem.style.fontSize = "9px";
		addElem.innerHTML = "帰還中まとめ";
		mtm.appendChild(addElem);

		addElem = document.createElement("textarea");
		addElem.id = "bkmatome";
		addElem.style.fontSize = "8px";
		addElem.innerHTML = matome;
		mtm.appendChild(addElem);
	}
}

