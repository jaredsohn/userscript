// ==UserScript==
// @name           bro3_calcn_all
// @namespace      http://chaki.s27.xrea.com/br3/
// @include        http://*.3gokushi.jp/facility/castle_send_troop.php*
// @include        https://*.3gokushi.jp/facility/castle_send_troop.php*
// @description    <内蔵版>ブラウザ三国志 領地敵兵算出機（全ワールド対応） by Craford, BSE（原版作者 きょう）（Cal1.3.7）＋賊討伐シミュレータ by きの。 (ver 1.05a)
// @author         Craford,kino.,BSE,base_Kyou
// @version        1.3.8 + 1.05a
// ==/UserScript==
//　2010/04/26　v1.0作成（by きょう）
//　2010/04/28　v1.1作成　剣兵での必要攻撃力数を追加。各兵科の攻撃力の兵士数換算を追加。（by きょう）
//　2010/04/28　v1.1.1作成　上級兵の出現パターン修正。（by きょう）
//　2010/05/02　v1.1.2作成　★2の例外処理を削除(例外無しで出現確認のため。（by きょう）
//　2010/05/21　v1.2作成　タイル数をカウントすることで、自領地の賊討伐にも対応（by きょう）
//　2010/05/22　v1.2.1作成　GoogleChromeで動作しない不具合を修正（by きょう）
//  2010/10/04  v1.3 Beta1 3期専用暫定版(BSE)
//  2010.10.04  v1.3 Beta2 少数点以下の処理修正(BSE)
//  2010.10.05  v1.3 Beta3 MINも付けてみた(BSE)
//  2010.10.05  ver1.3b4 基準数変更。兵数も出してみた（BSE）
// ベースのスクリプトの算出する物とBate4が算出する物が変わったりなんとかして、スクリプト名変更
//  2010.10.05  ver1.3b5 計算方法変更（BSE）
//　2010.10.06  ver1.3b6 Beyond連携中止。単独稼働用。距離。（BSE）
//  2010.10.07  ver1.3 マイナス座標の拠点のマイナスが反映されない不具合修正。3期専用配布版（BSE）
//  2010.10.07  ver1.31 兵数換算を再調整（BSE）
//  2010.10.13  ver1.32 苦情対策（BSE）
//　2010.10.25　ver1.33 苦情対策Ⅱ（BSE）
//　2010.11.15　ver1.3.4 17鯖をいじいじ　名称変更
//  2010.02.09  ver1.3.5 サーバーの判別処理を追加し、1期,2期,3期を自動判別するように修正（Craford）
//  2010.02.22  ver1.3.6 4期のサーバー判定方法に誤作動があったため判定方法を変更（きの。）
//  2011.03.24  ver1.3.7 サーバー自動判定が使えないので、パラメータテーブル化。NEDさんの5期テーブル(3/23版)を反映。
//  2011.03.24  ver1.3.8 本鯖7期に対応
//
//  2010.12.03  賊討伐シミュレータ ver1.03 追加　(きの。)
//  2010.01.16  ver1.04a 100万以上の攻撃力の時にエラーになっていたのを修正。(きの。)
//  2010.02.18  ver1.05a 鍛冶場・課金状況取得をボタンクリックに変更（負荷対策）(きの。)

( function(){
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

var serverTable = [ 
	// サーバー情報初期設定
	["m1",7],
	["m9",6],
	["m13",6],
	["m17",6],
	["m21",5],
	["m25",4],
	["m29",3],
	["m31",2],
	["m33",2],
	["m34",1],
	["m35",1],
	["m36",1],
	["m37",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1],
	["",1]
]

//　バージョン配置用
var ver_rack = "ver1.3.8 (Craford_custom)</b>";
var kino_ver = "1.05a";

//　配布URL
var se_rack = "<b><内蔵版>ブラウザ三国志 領地敵兵算出機 by Craford, BSE ";
var url_rack = "http://www.3g-ws.com/";
var com_rack = "出現目安です！ 初心者から変態まで御用達の通期版（とりあえず5期までは大丈夫！）"   // 2011/02/09 Craford修正
var url_rack2 = "http://chaki.s27.xrea.com/br3/";

//　ページタイトル
var title = document.title;

//　出兵距離格納変数
var length;

//　出兵先のタイル数格納変数（平地、木、岩、鉄、穀、荒地）の順。
var tile = new Array(0,0,0,0,0,0);

//　出兵先のパネル構成ごとの兵数計算パラメータ
//　[剣兵、弓、槍、騎、弩、矛、近衛]の順に格納。
//
// 鯖判定用（2011/02/09 Craford）
var sv_seazon = -1;

// 1期用、2期用、3期用テーブルとして作成（2011/02/09 Craford）
var point1ki = {

//1期木岩鉄糧空剣弓槍騎弩矛近
"000116":[5,0,0,0,0,0,0,"☆1※"],//☆1※
"100016":[5,0,0,0,0,0,0,"☆1木"],//☆1木
"010016":[5,0,0,0,0,0,0,"☆1岩"],//☆1岩
"001016":[5,0,0,0,0,0,0,"☆1鉄"],//☆1鉄
"300016":[0,4,0.5,0.5,0,0,0,"☆2(3-0-0-0)"],//☆2(3-0-0-0)
"030016":[0,0.5,4,0.5,0,0,0,"☆2(0-3-0-0)"],//☆2(0-3-0-0)
"003016":[0,0.5,0.5,4,0,0,0,"☆2(0-0-3-0)"],//☆2(0-0-3-0)
"111022":[0,6,6,6,0,0,0,"☆3(1-1-1-0)"],//☆3(1-1-1-0)
"000411":[0,7.5,7.5,7.5,0,0,0,"☆3(0-0-0-4)"],//☆3(0-0-0-4)
"222023":[0,12.5,12.5,12.5,0,0,0,"☆4(2-2-2-0)"],//☆4(2-2-2-0)
"000813":[0,12.5,12.5,12.5,0,0,0,"☆4(0-0-0-8)"],//☆4(0-0-0-8)
"222218":[0,11,11,11,0,0,0,"☆4(2-2-2-2)"],//☆4(2-2-2-2)
"600022":[0,40,10,10,0,0,0,"☆5(6-0-0-0)"],//☆5(6-0-0-0)
"060022":[0,10,40,10,0,0,0,"☆5(0-6-0-0)"],//☆5(0-6-0-0)
"006022":[0,10,10,40,0,0,0,"☆5(0-0-6-0)"],//☆5(0-0-6-0)
"1000014":[0,15,75,15,0,0,0,"☆6(10-0-0-0)"],//☆6(10-0-0-0)
"0100014":[0,75,15,15,0,0,0,"☆6(0-10-0-0)"],//☆6(0-10-0-0)
"0010014":[0,15,15,75,0,0,0,"☆6(0-0-10-0)"],//☆6(0-0-10-0)
"333025":[0,0,0,0,50,50,50,"☆7(3-3-3-0)"],//☆7(3-3-3-0)
"444433":[0,0,0,0,100,100,100,"☆8(4-4-4-4)"],//☆8(4-4-4-4)
"0001817":[0,0,0,0,150,150,150,"☆9(0-0-0-18)"]//☆9(0-0-0-18)
};

var point2ki = {

//2期木岩鉄糧空剣弓槍騎弩矛近
"000116":[5,0,0,0,0,0,0,"☆1※"],//☆1※
"100016":[5,0,0,0,0,0,0,"☆1木"],//☆1木
"010016":[5,0,0,0,0,0,0,"☆1岩"],//☆1岩
"001016":[5,0,0,0,0,0,0,"☆1鉄"],//☆1鉄
"300016":[0,6,0.5,0.5,0,0,0,"☆2(3-0-0-0)"],//☆2(3-0-0-0)
"030016":[0,0.5,6,0.5,0,0,0,"☆2(0-3-0-0)"],//☆2(0-3-0-0)
"003016":[0,0.5,0.5,6,0,0,0,"☆2(0-0-3-0)"],//☆2(0-0-3-0)
"111022":[0,7.5,7.5,7.5,0,0,0,"☆3(1-1-1-0)"],//☆3(1-1-1-0)
"000411":[0,3,17,3,0,0,0,"☆3(0-0-0-4)"],//☆3(0-0-0-4)
"000126":[0,17,3,3,0,0,0,"☆3(0-0-0-1)"],//☆3(0-0-0-1)
"222023":[0,14,14,14,0,0,0,"☆4(2-2-2-0)平地23"],//☆4(2-2-2-0)平地23
"222020":[0,5,5,35,0,0,0,"☆4(2-2-2-0)平地20"],//☆4(2-2-2-0)平地20
"000813":[0,15,15,15,0,0,0,"☆4(0-0-0-8)"],//☆4(0-0-0-8)
"600022":[0,65,12.5,12.5,0,0,0,"☆5(6-0-0-0)"],//☆5(6-0-0-0)
"060022":[0,12.5,65,12.5,0,0,0,"☆5(0-6-0-0)"],//☆5(0-6-0-0)
"006022":[0,12.5,12.5,65,0,0,0,"☆5(0-0-6-0)"],//☆5(0-0-6-0)
"000129":[0,30,30,30,0,0,0,"☆5(0-0-0-1)"],//☆5(0-0-0-1)
"222024":[0,0,0,0,27.5,27.5,27.5,"☆6(2-2-2-0)"],//☆6(2-2-2-0)
"1000020":[0,0,0,0,60,12.5,12.5,"☆6(10-0-0-0)"],//☆6(10-0-0-0)
"0100020":[0,0,0,0,12.5,60,12.5,"☆6(0-10-0-0)"],//☆6(0-10-0-0)
"0010020":[0,0,0,0,12.5,12.5,60,"☆6(0-0-10-0)"],//☆6(0-0-10-0)
"244025":[0,0,0,0,22.5,65,65,"☆7(2-4-4-0)"],//☆7(2-4-4-0)
"000133":[0,0,0,0,65,65,22.5,"☆7(0-0-0-1)"],//☆7(0-0-0-1)
"0001216":[0,0,0,0,65,22.5,65,"☆7(0-0-0-12)"],//☆7(0-0-0-12)
"412028":[0,0,0,0,250,50,25,"☆8(4-1-2-0)"],//☆8(4-1-2-0)
"241027":[0,0,0,0,50,250,25,"☆8(2-4-1-0)"],//☆8(2-4-1-0)
"124027":[0,0,0,0,50,25,250,"☆8(1-2-4-0)"],//☆8(1-2-4-0)
"444429":[0,0,0,0,200,200,200,"☆9(4-4-4-4)"],//☆9(4-4-4-4)
"111240":[0,0,0,0,190,190,190,"☆9(1-1-1-2)"],//☆9(1-1-1-2)
"0001815":[0,0,0,0,175,175,175,"☆9(0-0-0-18)"]//☆9(0-0-0-18)
};

var point3ki = {

//3期木岩鉄糧空き地剣弓槍騎弩矛近
"000116":[5,0,0,0,0,0,0,"☆1※"],//☆1※
"100016":[5,0,0,0,0,0,0,"☆1木"],//☆1木
"010016":[5,0,0,0,0,0,0,"☆1岩"],//☆1岩
"001016":[5,0,0,0,0,0,0,"☆1鉄"],//☆1鉄
"300016":[0,10,0.5,0.5,0,0,0,"☆2(3-0-0-0)"],//☆2(3-0-0-0)
"030016":[0,0.5,10,0.5,0,0,0,"☆2(0-3-0-0)"],//☆2(0-3-0-0)
"003016":[0,0.5,0.5,10,0,0,0,"☆2(0-0-3-0)"],//☆2(0-0-3-0)
"111022":[0,9,9,9,0,0,0,"☆3(1-1-1-0)"],//☆3(1-1-1-0)
"000411":[0,6,20,6,0,0,0,"☆3(0-0-0-4)"],//☆3(0-0-0-4)
"000126":[0,22,7,7,0,0,0,"☆3(0-0-0-1)"],//☆3(0-0-0-1)
"222023":[0,16,16,16,0,0,0,"☆4(2-2-2-0)平地23"],//☆4(2-2-2-0)平地23
"222020":[0,7.5,7.5,35,0,0,0,"☆4(2-2-2-0)平地20"],//☆4(2-2-2-0)平地20
"000813":[0,19,19,19,0,0,0,"☆4(0-0-0-8)"],//☆4(0-0-0-8)
"600022":[0,75,12.5,12.5,0,0,0,"☆5(6-0-0-0)"],//☆5(6-0-0-0)
"060022":[0,12.5,75,12.5,0,0,0,"☆5(0-6-0-0)"],//☆5(0-6-0-0)
"006022":[0,12.5,12.5,75,0,0,0,"☆5(0-0-6-0)"],//☆5(0-0-6-0)
"000129":[0,32.5,32.5,32.5,0,0,0,"☆5(0-0-0-1)"],//☆5(0-0-0-1)
"221025":[0,35,35,35,0,0,0,"☆5(2-2-1-0)"],//☆5(2-2-1-0)
"112025":[0,37.5,37.5,37.5,0,0,0,"☆5(1-1-2-0)"],//☆5(1-1-2-0)
"1000020":[0,0,0,0,90,20,20,"☆6(10-0-0-0)"],//☆6(10-0-0-0)
"0100020":[0,0,0,0,20,90,20,"☆6(0-10-0-0)"],//☆6(0-10-0-0)
"0010020":[0,0,0,0,20,20,90,"☆6(0-0-10-0)"],//☆6(0-0-10-0)
"222024":[0,0,0,0,40,40,40,"☆6(2-2-2-0)"],//☆6(2-2-2-0)
"244025":[0,0,0,0,30,110,30,"☆7(2-4-4-0)"],//☆7(2-4-4-0)
"000133":[0,0,0,0,110,110,30,"☆7(0-0-0-1)"],//☆7(0-0-0-1)
"0001216":[0,0,0,0,110,30,30,"☆7(0-0-0-12)"],//☆7(0-0-0-12)
"1400022":[0,0,0,0,75,250,75,"☆8(14-0-0-0)"],//☆8(14-0-0-0)
"0140022":[0,0,0,0,250,75,75,"☆8(0-14-0-0)"],//☆8(0-14-0-0)
"0014022":[0,0,0,0,75,75,250,"☆8(0-0-14-0)"],//☆8(0-0-14-0)
"412028":[0,0,0,0,250,50,25,"☆8(4-1-2-0)"],//☆8(4-1-2-0)
"241027":[0,0,0,0,50,250,25,"☆8(2-4-1-0)"],//☆8(2-4-1-0)
"124027":[0,0,0,0,50,25,250,"☆8(1-2-4-0)"],//☆8(1-2-4-0)
"10008":[0,0,0,0,300,150,150,"☆9(1-0-0-0)"],//☆9(1-0-0-0)
"01008":[0,0,0,0,150,300,150,"☆9(0-1-0-0)"],//☆9(0-1-0-0)
"00108":[0,0,0,0,150,150,300,"☆9(0-0-1-0)"],//☆9(0-0-1-0)
"444429":[0,0,0,0,300,300,300,"☆9(4-4-4-4)"],//☆9(4-4-4-4)
"111240":[0,0,0,0,250,250,250,"☆9(1-1-1-2)"],//☆9(1-1-1-2)
"0001815":[0,0,0,0,200,200,200,"☆9(0-0-0-18)"],//☆9(0-0-0-18)
};	

var point5ki = {

//木岩鉄糧空き地剣弓槍騎弩矛近
"000116":[5,0,0,0,0,0,0,"☆1※"],//☆1※
"100016":[5,0,0,0,0,0,0,"☆1木"],//☆1木
"010016":[5,0,0,0,0,0,0,"☆1岩"],//☆1岩
"001016":[5,0,0,0,0,0,0,"☆1鉄"],//☆1鉄
"300016":[0,12.5,1,1,0,0,0,"☆2(3-0-0-0)"],//☆2(3-0-0-0)
"030016":[0,1,12.5,1,0,0,0,"☆2(0-3-0-0)"],//☆2(0-3-0-0)
"003016":[0,1,1,12.5,0,0,0,"☆2(0-0-3-0)"],//☆2(0-0-3-0)
"111022":[0,15,15,15,0,0,0,"☆3(1-1-1-0)"],//☆3(1-1-1-0)
"000411":[0,12,25,12,0,0,0,"☆3(0-0-0-4)"],//☆3(0-0-0-4)
"000126":[0,25,13,13,0,0,0,"☆3(0-0-0-1)"],//☆3(0-0-0-1)
"222023":[0,33,33,33,0,0,0,"☆4(2-2-2-0)平地23"],//☆4(2-2-2-0)平地23
"222020":[0,30,30,45,0,0,0,"☆4(2-2-2-0)平地20"],//☆4(2-2-2-0)平地20
"000813":[0,36,36,36,0,0,0,"☆4(0-0-0-8)"],//☆4(0-0-0-8)
"600022":[0,111,33,33,0,0,0,"☆5(6-0-0-0)"],//☆5(6-0-0-0)
"060022":[0,33,111,33,0,0,0,"☆5(0-6-0-0)"],//☆5(0-6-0-0)
"006022":[0,33,33,111,0,0,0,"☆5(0-0-6-0)"],//☆5(0-0-6-0)
"000129":[0,55,55,55,0,0,0,"☆5(0-0-0-1)"],//☆5(0-0-0-1)
"221025":[0,60,60,60,0,0,0,"☆5(2-2-1-0)"],//☆5(2-2-1-0)
"112025":[0,70,70,70,0,0,0,"☆5(1-1-2-0)"],//☆5(1-1-2-0)
"1000020":[0,0,0,0,180,50,50,"☆6(10-0-0-0)"],//☆6(10-0-0-0)
"0100020":[0,0,0,0,50,180,50,"☆6(0-10-0-0)"],//☆6(0-10-0-0)
"0010020":[0,0,0,0,50,50,180,"☆6(0-0-10-0)"],//☆6(0-0-10-0)
"222024":[0,0,0,0,85,85,85,"☆6(2-2-2-0)"],//☆6(2-2-2-0)
"244025":[0,0,0,0,110,220,110,"☆7(2-4-4-0)"],//☆7(2-4-4-0)
"000133":[0,0,0,0,110,110,220,"☆7(0-0-0-1)"],//☆7(0-0-0-1)
"0001216":[0,0,0,0,220,110,110,"☆7(0-0-0-12)"],//☆7(0-0-0-12)
"1400022":[0,0,0,0,175,400,175,"☆8(14-0-0-0)"],//☆8(14-0-0-0)
"0140022":[0,0,0,0,400,175,175,"☆8(0-14-0-0)"],//☆8(0-14-0-0)
"0014022":[0,0,0,0,175,175,400,"☆8(0-0-14-0)"],//☆8(0-0-14-0)
"412028":[0,0,0,0,350,200,100,"☆8(4-1-2-0)"],//☆8(4-1-2-0)
"241027":[0,0,0,0,200,350,100,"☆8(2-4-1-0)"],//☆8(2-4-1-0)
"124027":[0,0,0,0,200,100,350,"☆8(1-2-4-0)"],//☆8(1-2-4-0)
"10008":[0,0,0,0,600,400,400,"☆9(1-0-0-0)"],//☆9(1-0-0-0)
"01008":[0,0,0,0,400,600,400,"☆9(0-1-0-0)"],//☆9(0-1-0-0)
"00108":[0,0,0,0,400,400,600,"☆9(0-0-1-0)"],//☆9(0-0-1-0)
"444429":[0,0,0,0,450,450,450,"☆9(4-4-4-4)"],//☆9(4-4-4-4)
"111240":[0,0,0,0,400,400,400,"☆9(1-1-1-2)"],//☆9(1-1-1-2)
"0001815":[0,0,0,0,350,350,350,"☆9(0-0-0-18)"],//☆9(0-0-0-18)
};

var point7ki = {

//木岩鉄糧空き地剣弓槍騎弩矛近
"000116":[5,0,0,0,0,0,0,"☆1※"],//☆1※
"100016":[5,0,0,0,0,0,0,"☆1木"],//☆1木
"010016":[5,0,0,0,0,0,0,"☆1岩"],//☆1岩
"001016":[5,0,0,0,0,0,0,"☆1鉄"],//☆1鉄
"300016":[0,15,2.5,2.5,0,0,0,"☆2(3-0-0-0)"],//☆2(3-0-0-0)
"030016":[0,2.5,15,2.5,0,0,0,"☆2(0-3-0-0)"],//☆2(0-3-0-0)
"003016":[0,2.5,2.5,15,0,0,0,"☆2(0-0-3-0)"],//☆2(0-0-3-0)
"111022":[0,12.5,12.5,12.5,0,0,0,"☆3(1-1-1-0)"],//☆3(1-1-1-0)
"000411":[0,7.5,22.5,7.5,0,0,0,"☆3(0-0-0-4)"],//☆3(0-0-0-4)
"000126":[0,22.5,7.5,7.5,0,0,0,"☆3(0-0-0-1)"],//☆3(0-0-0-1)
"222023":[0,0,0,0,10,10,10,"☆4(2-2-2-0)平地23"],//☆4(2-2-2-0)平地23
"222020":[0,0,0,0,5,5,20,"☆4(2-2-2-0)平地20"],//☆4(2-2-2-0)平地20
"000813":[0,0,0,0,15,15,15,"☆4(0-0-0-8)"],//☆4(0-0-0-8)
"600022":[0,0,0,0,50,20,20,"☆5(6-0-0-0)"],//☆5(6-0-0-0)
"060022":[0,0,0,0,20,50,20,"☆5(0-6-0-0)"],//☆5(0-6-0-0)
"006022":[0,0,0,0,20,20,50,"☆5(0-0-6-0)"],//☆5(0-0-6-0)
"000129":[0,0,0,0,30,30,30,"☆5(0-0-0-1)"],//☆5(0-0-0-1)
"221025":[0,0,0,0,20,20,20,"☆5(2-2-1-0)"],//☆5(2-2-1-0)
"112025":[0,0,0,0,25,25,25,"☆5(1-1-2-0)"],//☆5(1-1-2-0)
"1000020":[0,0,0,0,300,75,75,"☆6(10-0-0-0)"],//☆6(10-0-0-0)
"0100020":[0,0,0,0,50,300,50,"☆6(0-10-0-0)"],//☆6(0-10-0-0)
"0010020":[0,0,0,0,50,50,300,"☆6(0-0-10-0)"],//☆6(0-0-10-0)
"222024":[0,0,0,0,150,150,150,"☆6(2-2-2-0)"],//☆6(2-2-2-0)
"244025":[0,0,0,0,150,400,150,"☆7(2-4-4-0)"],//☆7(2-4-4-0)
"000133":[0,0,0,0,150,150,400,"☆7(0-0-0-1)"],//☆7(0-0-0-1)
"0001216":[0,0,0,0,400,150,150,"☆7(0-0-0-12)"],//☆7(0-0-0-12)
"1400022":[0,0,0,0,300,500,300,"☆8(14-0-0-0)"],//☆8(14-0-0-0)
"0140022":[0,0,0,0,500,300,300,"☆8(0-14-0-0)"],//☆8(0-14-0-0)
"0014022":[0,0,0,0,300,300,500,"☆8(0-0-14-0)"],//☆8(0-0-14-0)
"412028":[0,0,0,0,500,300,200,"☆8(4-1-2-0)"],//☆8(4-1-2-0)
"241027":[0,0,0,0,300,500,200,"☆8(2-4-1-0)"],//☆8(2-4-1-0)
"124027":[0,0,0,0,300,200,500,"☆8(1-2-4-0)"],//☆8(1-2-4-0)
"10008":[0,0,0,0,750,500,500,"☆9(1-0-0-0)"],//☆9(1-0-0-0)
"01008":[0,0,0,0,500,750,500,"☆9(0-1-0-0)"],//☆9(0-1-0-0)
"00108":[0,0,0,0,500,500,750,"☆9(0-0-1-0)"],//☆9(0-0-1-0)
"444429":[0,0,0,0,550,550,550,"☆9(4-4-4-4)"],//☆9(4-4-4-4)
"111240":[0,0,0,0,500,500,500,"☆9(1-1-1-2)"],//☆9(1-1-1-2)
"0001815":[0,0,0,0,450,450,450,"☆9(0-0-0-18)"],//☆9(0-0-0-18)
};

// 実処理用の変数はこれに統合（2011/02/09 Craford）
var point;


//　兵科に対する各ユニットの防御値
var def = {
	//剣,弓,槍,騎,弩,矛,近衛
	"ken":[15,52,50,54,208,200,216],//剣兵防御
	"yari":[10,58,40,28,145,100,70],//槍兵防御
	"yumi":[10,42,25,60,105,63,150],//弓兵防御
	"ki":[10,26,55,44,65,137,110]//騎兵防御
};

//　各ユニットの攻撃力
var atk = {
	"ken":15,
	"yari":40,
	"yumi":42,
	"ki":44,
	"hoko":100,
	"do":105,
	"kono":110
};

//　鍛冶場Lv.
var kaji_lv = {
	"0":0,
	"1":0,
	"2":0.015,
	"3":0.03,
	"4":0.045,
	"5":0.06,
	"6":0.075,
	"7":0.09,
	"8":0.105,
	"9":0.12,
	"10":0.15
};

//　武器強化
var buki_lv = {
	"ken":[0,0.1,0.2,0.3,0.4,0.5,0.6,0.75,0.9,1.1,1.35],
	"yari":[0,0.05,0.1,0.16,0.22,0.3,0.38,0.48,0.58,0.68,0.8],
	"yumi":[0,0.05,0.1,0.16,0.22,0.3,0.38,0.48,0.58,0.68,0.8],
	"ki":[0,0.05,0.1,0.16,0.22,0.3,0.38,0.48,0.58,0.68,0.8],
	"hoko":[0,0.04,0.08,0.12,0.16,0.2,0.24,0.28,0.33,0.38,0.45],
	"do":[0,0.04,0.08,0.12,0.16,0.2,0.24,0.28,0.33,0.38,0.45],
	"kono":[0,0.04,0.08,0.12,0.16,0.2,0.24,0.28,0.33,0.38,0.45]
};


(function(){
		// 鯖バージョンの判別（2011/02/09 Craford）
		var svname = location.hostname.substr(0,location.hostname.indexOf("."));
		var season = 0;

		var sv_world = [];
		var sv_season = [];
		for(i=0;i<serverTable.length;i++){
			var BRO3_TOBATSU_SV	= 'bro3_tobatsu_sv' + i;
			var BRO3_TOBATSU_SEASON	= 'bro3_tobatsu_season' + i;
			if(GM_getValue(BRO3_TOBATSU_SV)){
				sv_world[i] = GM_getValue(BRO3_TOBATSU_SV);
				sv_season[i] = GM_getValue(BRO3_TOBATSU_SEASON);
			}else{
				sv_world[i] = serverTable[i][0];
				sv_season[i] = serverTable[i][1];
				GM_setValue(BRO3_TOBATSU_SV, sv_world[i]);
				GM_setValue(BRO3_TOBATSU_SEASON, sv_season[i]);
			}
			if( sv_world[i] == svname ){
				season = sv_season[i];
			}
		}

		if( season == 1 ){
			// パネルテーブルは1期用を使う
			point = point1ki;
		}
		else if( season == 2 ){
			// パネルテーブルは2期用を使う
			point = point2ki;
		}
		else if( (season == 3) || (season == 4) ){
			// パネルテーブルは3期用を使う
			point = point3ki;
		}
		else if( (season == 5) || (season == 6) ){
			// パネルテーブルは5期用を使う
			point = point5ki;
		}
		else if( season == 7 ){
			// パネルテーブルは2期用を使う
			point = point7ki;
		}

		// 鯖情報を追記（2011/02/09 Craford）
		//var world = document.evaluate('//*[@id="worldtime"]/dl/dt', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		//if(world.snapshotLength == 0){
		//	//本家・ハンゲ鯖対応用。なにこの微妙な仕様変更・・・
		//	world = document.evaluate('//*[@class="world"]/dt', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		//}
		//var world_text = world.snapshotItem(0).textContent + " 第" + season + "期目";
		var world_text = svname + "ワールド 第" + season + "期目";
		com_rack = com_rack + "<br><b><font color='blue'>" + world_text + "</font></b>";

		//　出兵拠点座標の取得
		var areas = document.evaluate('//li[@class="gnavi02"]//a/@href', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		basecord = areas.snapshotItem(0).textContent;
		basecord = basecord.replace(/^.*x=(-?[0-9]+).*y=(-?[0-9]+)/, "$1,$2");
		bcordx = RegExp.$1;
		bcordy = RegExp.$2;

		//　出兵先座標(x)の取得
		areas = document.evaluate('//input[@name="village_x_value"]/@value',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		tocordx = areas.snapshotItem(0).textContent;

		//　出兵先座標(y)の取得
		areas = document.evaluate('//input[@name="village_y_value"]/@value',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		tocordy = areas.snapshotItem(0).textContent;

		//　距離の計算
		length = Math.sqrt(Math.pow(bcordx-tocordx,2)+Math.pow(bcordy-tocordy,2));
		
		if(season>0){

			//　出兵先タイルパターン取得のためのHTTP要求　starに★数、tile[]に各タイル数を格納。
			var url = "http://"+location.hostname+"/land.php?x="+tocordx+"&y="+tocordy;
			GM_xmlhttpRequest({
				method:"GET", 
				url:url,
				onload:function(x){
				//　読み込み後の処理は関数 getFieldType() 内で行う。
				getFieldType(x.responseText);
				}
			});

		}else{
			var msg = "";
	
			//　サーバー情報が見つからない場合。(登録されていないもの)
			msg = msg + "<br><table border=5><tr><td align=left>\n";
			msg = msg + com_rack + "<br>\n";
			msg = msg + "サーバー情報が登録されていません。<a id='svsetting_btn' href='javascript:void(0)'>サーバー情報を設定してください。</a></td>\n";
			msg = msg + "<td align=left rowspan=2>\n";

			msg = msg + "<table id=svsetting align=center style='text-align:center;background:#FFC;color:#C60;display:none;' width=116>\n";
			msg = msg + "<tr><td align=center><b>Server</b></td><td align=center><b>Season</b></td></tr>\n";
			for(var i = 0; i < serverTable.length; i++){
			msg = msg + "<tr><td align=center><input type=text size=2 id=s"+i+"></td><td>第<select id=s"+i+"s><option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7</select>期</td></tr>\n";
			}
			msg = msg + "<tr><td colspan=2>期数はmixi鯖基準</td></tr>\n";
			msg = msg + "<tr><td colspan=2>本家5期→mixi4期<br>本家6期→mixi5期<br>に相当</td></tr>\n";
			msg = msg + "<tr><td colspan=2><input id=svsave_btn type=button value='保存' size=6>&nbsp;<input id=svreset_btn type=button value='初期化' size=8></td></tr>\n";
			msg = msg + "</table>\n";

			msg = msg + "</td></tr>\n";
			msg = msg + "<tr><td align=left>\n";
			msg = msg + se_rack + ver_rack + "<br>\n";
			msg = msg + "<b>　＋　賊討伐シミュレータ by kino. ver"+kino_ver+"</b><br>\n";
			msg = msg + "苦情・文句・情報提供などは 17鯖 <a href="+ url_rack2+" target='_blank'>きの。</a> まで御願いします。<br>\n";
			msg = msg + "元スクリプト作者は→<a href="+ url_rack+" target='_blank'>こちら（配布元）</a><br>\n";
			msg = msg + "</td></tr></table>\n";

			var insertHtml = "<div align=center>" + msg + "</div>";
	
			var insertElem = document.createElement('div');
			insertElem.innerHTML = insertHtml;
			insertElem = insertElem.firstChild;
			var containerElem = document.evaluate('//*[@class=\"controlArea\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			containerElem.snapshotItem(0).appendChild(insertElem);

			var svsetting_btn = document.getElementById("svsetting_btn");
		        svsetting_btn.addEventListener("click", function(){view("svsetting");set_season();}, false);
			var svsave_btn = document.getElementById("svsave_btn");
        		svsave_btn.addEventListener("click", function(){sv_save();}, false);
			var svreset_btn = document.getElementById("svreset_btn");
		        svreset_btn.addEventListener("click", function(){reset_season();}, false);

		}

})();

//　タイルパターンの取得 及び 兵力計算・表示用関数
function getFieldType(x){

	//　ページ内のタイル数をカウントするための変数 初期化
	var panel = {
		"平地":0,
		"森林":0,
		"岩山":0,
		"鉄鉱山":0,
		"穀物":0,
		"荒地":0
	};
	
	//　GM_xmlhttpRequestの取得データをxml形式に変換
    var responseXML = document.createElement('div');
    responseXML.innerHTML = x;
	
	//　ソース中のタイルの行からtitleの文字列を取得
	var panels = document.evaluate('.//*[@id="mapOverlayMap"]//area/@title',
	responseXML, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	//　1行ずつ対応するタイルの変数を加算していく
	for (var i = 0; i < panels.snapshotLength; i++) {
		panel[panels.snapshotItem(i).textContent]++;
	}

	//　タイル数→キー（"111116"など）の作成
	var key = String(panel["森林"])+String(panel["岩山"])+String(panel["鉄鉱山"])+String(panel["穀物"])+String(panel["平地"]);
	//　兵力パラメータの取得
	var list = point[key];

	var i;
	var tmp = 0;
	var sum = 0;
	var kenk = 0;
	var yarik = 0;
	var yumik = 0;
	var kik = 0;

	var tmp2 = 0;
	var sum2 = 0;
	var kenk2 = 0;
	var yarik2 = 0;
	var yumik2 = 0;
	var kik2 = 0;

	var infantry_count = 0;
	var spear_count = 0;
	var archer_count = 0;
	var cavalry_count = 0;
	var halbert_count = 0;
	var crossbow_count = 0;
	var cavalry_guards_count = 0;

	var soltype = "";


	//表示部分Non
	var msg = "";
	
	if(list==undefined){
		//　キーに対応するデータが見つからない場合。(データがないもの)
		msg = msg + "<br><table border=5><tr><td align=left>\n";
		msg = msg + com_rack + "　<a id='svsetting_btn' href='javascript:void(0)'>設定</a><br>\n";
		msg = msg + "有効なデータはありません。<br>※本拠地やNPC砦、未知の領地で有る可能性が有ります。</td>\n";
		msg = msg + "<td align=left rowspan=2>\n";

		msg = msg + "<table id=svsetting align=center style='text-align:center;background:#FFC;color:#C60;display:none;' width=116>\n";
		msg = msg + "<tr><td align=center><b>Server</b></td><td align=center><b>Season</b></td></tr>\n";
		for(var i = 0; i < serverTable.length; i++){
		msg = msg + "<tr><td align=center><input type=text size=2 id=s"+i+"></td><td>第<select id=s"+i+"s><option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7</select>期</td></tr>\n";
		}
		msg = msg + "<tr><td colspan=2>期数はmixi鯖基準</td></tr>\n";
		msg = msg + "<tr><td colspan=2>本家5期→mixi4期<br>本家6期→mixi5期<br>に相当</td></tr>\n";
		msg = msg + "<tr><td colspan=2><input id=svsave_btn type=button value='保存' size=6>&nbsp;<input id=svreset_btn type=button value='初期化' size=8></td></tr>\n";
		msg = msg + "</table>\n";

		msg = msg + "</td></tr>\n";
		msg = msg + "<tr><td align=left>\n";
		msg = msg + se_rack + ver_rack + "<br>\n";
		msg = msg + "<b>　＋　賊討伐シミュレータ by kino. ver"+kino_ver+"</b><br>\n";
		msg = msg + "苦情・文句・情報提供などは 17鯖 <a href="+ url_rack2+" target='_blank'>きの。</a> まで御願いします。<br>\n";
		msg = msg + "元スクリプト作者は→<a href="+ url_rack+" target='_blank'>こちら（配布元）</a><br>\n";
		msg = msg + "</td></tr></table>\n";


		var insertHtml = "<div align=center>" + msg + "</div>";
	
		var insertElem = document.createElement('div');
		insertElem.innerHTML = insertHtml;
		insertElem = insertElem.firstChild;
		var containerElem = document.evaluate('//*[@class=\"controlArea\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		containerElem.snapshotItem(0).appendChild(insertElem);
	}else{
		//MAX計算用
		//for(i=0;i<list.length;i++){
		//距離最大時乗数
		var hentai = (1+length/10)*3;
		//最大出現数計算
		var kenmax = Math.floor(list[0]*hentai);
		var yumimax = Math.floor(list[1]*hentai);
		var yarimax = Math.floor(list[2]*hentai);
		var kimax = Math.floor(list[3]*hentai);
		var domax = Math.floor(list[4]*hentai);
		var hokomax = Math.floor(list[5]*hentai);
		var konomax = Math.floor(list[6]*hentai);
		//最大防御力集計
		var sum = kenmax+yumimax+yarimax+kimax+domax+hokomax+konomax;
		var kenk = kenmax*def["ken"][0]+yumimax*def["ken"][1]+yarimax*def["ken"][2]+kimax*def["ken"][3]+domax*def["ken"][4]+hokomax*def["ken"][5]+konomax*def["ken"][6];
		var yumik = kenmax*def["yumi"][0]+yumimax*def["yumi"][1]+yarimax*def["yumi"][2]+kimax*def["yumi"][3]+domax*def["yumi"][4]+hokomax*def["yumi"][5]+konomax*def["yumi"][6];
		var yarik = kenmax*def["yari"][0]+yumimax*def["yari"][1]+yarimax*def["yari"][2]+kimax*def["yari"][3]+domax*def["yari"][4]+hokomax*def["yari"][5]+konomax*def["yari"][6];
		var kik = kenmax*def["ki"][0]+yumimax*def["ki"][1]+yarimax*def["ki"][2]+kimax*def["ki"][3]+domax*def["ki"][4]+hokomax*def["ki"][5]+konomax*def["ki"][6];

		//距離最小時乗数
		var hentai2 = (1+length/10);
		//最小出現数計算
		var kenmin = Math.floor(list[0]*hentai2);
		var yumimin = Math.floor(list[1]*hentai2);
		var yarimin = Math.floor(list[2]*hentai2);
		var kimin = Math.floor(list[3]*hentai2);
		var domin = Math.floor(list[4]*hentai2);
		var hokomin = Math.floor(list[5]*hentai2);
		var konomin = Math.floor(list[6]*hentai2);

		//最小防御力集計
		var kenk2 = kenmin*def["ken"][0]+yumimin*def["ken"][1]+yarimin*def["ken"][2]+kimin*def["ken"][3]+domin*def["ken"][4]+hokomin*def["ken"][5]+konomin*def["ken"][6];
		var yumik2 = kenmin*def["yumi"][0]+yumimin*def["yumi"][1]+yarimin*def["yumi"][2]+kimin*def["yumi"][3]+domin*def["yumi"][4]+hokomin*def["yumi"][5]+konomin*def["yumi"][6];
		var yarik2 = kenmin*def["yari"][0]+yumimin*def["yari"][1]+yarimin*def["yari"][2]+kimin*def["yari"][3]+domin*def["yari"][4]+hokomin*def["yari"][5]+konomin*def["yari"][6];
		var kik2 = kenmin*def["ki"][0]+yumimin*def["ki"][1]+yarimin*def["ki"][2]+kimin*def["ki"][3]+domin*def["ki"][4]+hokomin*def["ki"][5]+konomin*def["ki"][6];

		//表示部分フォント追加分
		var red_f = "</b></font>\n";
		var red_s = "<font color=red><b>";
		var gre_s = "<font color=blue>";

		if (title.indexOf("出兵(入力)") != -1) {
			pos = document.evaluate("//*[@name='input_troop']/table/tbody/tr[2]/td/table/tbody/tr[1]/td[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			infantry_count = pos.innerHTML.match(/[0-9]+/);

			pos = document.evaluate("//*[@name='input_troop']/table/tbody/tr[2]/td/table/tbody/tr[1]/td[4]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			spear_count = pos.innerHTML.match(/[0-9]+/);

			pos = document.evaluate("//*[@name='input_troop']/table/tbody/tr[2]/td/table/tbody/tr[1]/td[6]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			archer_count = pos.innerHTML.match(/[0-9]+/);

			pos = document.evaluate("//*[@name='input_troop']/table/tbody/tr[2]/td/table/tbody/tr[1]/td[8]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			cavalry_count = pos.innerHTML.match(/[0-9]+/);

			pos = document.evaluate("//*[@name='input_troop']/table/tbody/tr[2]/td/table/tbody/tr[2]/td[2]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			halbert_count = pos.innerHTML.match(/[0-9]+/);

			pos = document.evaluate("//*[@name='input_troop']/table/tbody/tr[2]/td/table/tbody/tr[2]/td[4]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			crossbow_count = pos.innerHTML.match(/[0-9]+/);

			pos = document.evaluate("//*[@name='input_troop']/table/tbody/tr[2]/td/table/tbody/tr[2]/td[6]/span", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			cavalry_guards_count = pos.innerHTML.match(/[0-9]+/);

		} else if (title.indexOf("出兵(確認)") != -1) {

			//　剣兵
			areas = document.evaluate('//input[@name="infantry_count"]/@value', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			infantry_count = areas.snapshotItem(0).textContent;

			//　槍兵
			areas = document.evaluate('//input[@name="spear_count"]/@value', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			spear_count = areas.snapshotItem(0).textContent;

			//　弓兵
			areas = document.evaluate('//input[@name="archer_count"]/@value', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			archer_count = areas.snapshotItem(0).textContent;

			//　騎兵
			areas = document.evaluate('//input[@name="cavalry_count"]/@value', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			cavalry_count = areas.snapshotItem(0).textContent;

			//　矛槍兵
			areas = document.evaluate('//input[@name="halbert_count"]/@value', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			halbert_count = areas.snapshotItem(0).textContent;

			//　弩兵
			areas = document.evaluate('//input[@name="crossbow_count"]/@value', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			crossbow_count = areas.snapshotItem(0).textContent;

			//　近衛騎兵
			areas = document.evaluate('//input[@name="cavalry_guards_count"]/@value', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			cavalry_guards_count = areas.snapshotItem(0).textContent;


			//　総攻撃力
			var power = 0;
			areas = document.evaluate('//strong[@class="size1"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			power = areas.snapshotItem(0).textContent;
			power = power.replace(/,/,'');
			power = power.replace(/,/,'');

			//　武将兵科
			areas = document.evaluate('//span[@class="soltype"]//img/@title', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			soltype = areas.snapshotItem(0).textContent;

		}

		function rec(){

			var b_power = document.getElementById("b_power").value;
			var b_skill = document.getElementById("b_skill").value;
			var b_type = document.getElementById("b_type");
			var b_type2 = b_type.options[b_type.selectedIndex].value;
			var kaji = document.getElementById("kaji");
			kaji = kaji.options[kaji.selectedIndex].value;
			kaji = kaji_lv[kaji];
			var cp = document.getElementById("cp");
			cp = cp.options[cp.selectedIndex].value;

			var infantry_count2 = document.getElementById("infantry_count2").value;
			var ken_skill = document.getElementById("ken_skill").value;
			var ken_kaji = document.getElementById("ken_kaji");
			ken_kaji = ken_kaji.options[ken_kaji.selectedIndex].value;

			var spear_count2 = document.getElementById("spear_count2").value;
			var yari_skill = document.getElementById("yari_skill").value;
			var yari_kaji = document.getElementById("yari_kaji");
			yari_kaji = yari_kaji.options[yari_kaji.selectedIndex].value;

			var archer_count2 = document.getElementById("archer_count2").value;
			var yumi_skill = document.getElementById("yumi_skill").value;
			var yumi_kaji = document.getElementById("yumi_kaji");
			yumi_kaji = yumi_kaji.options[yumi_kaji.selectedIndex].value;

			var cavalry_count2 = document.getElementById("cavalry_count2").value;
			var ki_skill = document.getElementById("ki_skill").value;
			var ki_kaji = document.getElementById("ki_kaji");
			ki_kaji = ki_kaji.options[ki_kaji.selectedIndex].value;

			var halbert_count2 = document.getElementById("halbert_count2").value;
			var hoko_skill = document.getElementById("hoko_skill").value;
			var hoko_kaji = document.getElementById("hoko_kaji");
			hoko_kaji = hoko_kaji.options[hoko_kaji.selectedIndex].value;

			var crossbow_count2 = document.getElementById("crossbow_count2").value;
			var do_skill = document.getElementById("do_skill").value;
			var do_kaji = document.getElementById("do_kaji");
			do_kaji = do_kaji.options[do_kaji.selectedIndex].value;

			var cavalry_guards_count2 = document.getElementById("cavalry_guards_count2").value;
			var konoe_skill = document.getElementById("konoe_skill").value;
			var konoe_kaji = document.getElementById("konoe_kaji");
			konoe_kaji = konoe_kaji.options[konoe_kaji.selectedIndex].value;

			//攻撃側総兵数
			attack_count = 1;
			attack_count += Math.floor(infantry_count2) + Math.floor(spear_count2) + Math.floor(archer_count2) + Math.floor(cavalry_count2) + Math.floor(halbert_count2) + Math.floor(crossbow_count2) + Math.floor(cavalry_guards_count2);

			//歩兵科
			aken = Math.floor(infantry_count2);
			if(b_type2=="0") aken+=1;
			aken /= attack_count;

			//槍兵科
			ayari = Math.floor(spear_count2) + Math.floor(halbert_count2);
			if(b_type2=="1") ayari += 1;
			ayari = ayari / attack_count;

			//弓兵科
			ayumi = Math.floor(archer_count2) + Math.floor(crossbow_count2);
			if(b_type2=="2") ayumi+=1;
			ayumi /= attack_count;

			//騎兵科
			aki = Math.floor(cavalry_count2) + Math.floor(cavalry_guards_count2);
			if(b_type2=="3") aki+=1;
			aki /= attack_count;

			//各兵科攻撃力
			b_power = b_power*(1 + b_skill / 100);
			var infantry_power = infantry_count2 * atk["ken"] * ( 1 + ken_skill / 100 + kaji + buki_lv["ken"][ken_kaji]);
			var spear_power = spear_count2 * atk["yari"] * ( 1 + yari_skill / 100 + kaji + buki_lv["yari"][yari_kaji]);
			var archer_power = archer_count2 * atk["yumi"] * ( 1 + yumi_skill / 100 + kaji + buki_lv["yumi"][yumi_kaji]);
			var cavalry_power = cavalry_count2 * atk["ki"] * ( 1 + ki_skill / 100 + kaji + buki_lv["ki"][ki_kaji]);
			var halbert_power = halbert_count2 * atk["hoko"] * ( 1 + hoko_skill / 100 + kaji + buki_lv["hoko"][hoko_kaji]);
			var crossbow_power = crossbow_count2 * atk["do"] * ( 1 + do_skill / 100 + kaji + buki_lv["do"][do_kaji]);
			var cavalry_guards_power = cavalry_guards_count2 * atk["kono"] * ( 1 + konoe_skill / 100 + kaji + buki_lv["kono"][konoe_kaji]);

			//総攻撃力
			if (title.indexOf("出兵(入力)") != -1) {
				power =   Math.floor(( Math.floor(b_power) + Math.floor(infantry_power) + Math.floor(spear_power) + Math.floor(archer_power) + Math.floor(cavalry_power) + Math.floor(halbert_power) + Math.floor(crossbow_power) + Math.floor(cavalry_guards_power) ) * ( 1 + 0.1*cp));
			}

			//相対防御
			var dkenmax = kenmax*(aken*def["ken"][0]+ayari*def["yari"][0]+ayumi*def["yumi"][0]+aki*def["ki"][0]);
			var dyumimax = yumimax*(aken*def["ken"][1]+ayari*def["yari"][1]+ayumi*def["yumi"][1]+aki*def["ki"][1]);
			var dyarimax = yarimax*(aken*def["ken"][2]+ayari*def["yari"][2]+ayumi*def["yumi"][2]+aki*def["ki"][2]);
			var dkimax = kimax*(aken*def["ken"][3]+ayari*def["yari"][3]+ayumi*def["yumi"][3]+aki*def["ki"][3]);
			var ddomax = domax*(aken*def["ken"][4]+ayari*def["yari"][4]+ayumi*def["yumi"][4]+aki*def["ki"][4]);
			var dhokomax = hokomax*(aken*def["ken"][5]+ayari*def["yari"][5]+ayumi*def["yumi"][5]+aki*def["ki"][5]);
			var dkonomax = konomax*(aken*def["ken"][6]+ayari*def["yari"][6]+ayumi*def["yumi"][6]+aki*def["ki"][6]);

			var dkenmin = kenmin*(aken*def["ken"][0]+ayari*def["yari"][0]+ayumi*def["yumi"][0]+aki*def["ki"][0]);
			var dyumimin = yumimin*(aken*def["ken"][1]+ayari*def["yari"][1]+ayumi*def["yumi"][1]+aki*def["ki"][1]);
			var dyarimin = yarimin*(aken*def["ken"][2]+ayari*def["yari"][2]+ayumi*def["yumi"][2]+aki*def["ki"][2]);
			var dkimin = kimin*(aken*def["ken"][3]+ayari*def["yari"][3]+ayumi*def["yumi"][3]+aki*def["ki"][3]);
			var ddomin = domin*(aken*def["ken"][4]+ayari*def["yari"][4]+ayumi*def["yumi"][4]+aki*def["ki"][4]);
			var dhokomin = hokomin*(aken*def["ken"][5]+ayari*def["yari"][5]+ayumi*def["yumi"][5]+aki*def["ki"][5]);
			var dkonomin = konomin*(aken*def["ken"][6]+ayari*def["yari"][6]+ayumi*def["yumi"][6]+aki*def["ki"][6]);

			//総防御力
			var dmax = dkenmax + dyumimax + dyarimax + dkimax + ddomax + dhokomax + dkonomax ;
			var dmin = dkenmin + dyumimin + dyarimin + dkimin + ddomin + dhokomin + dkonomin ;

			//討伐成功率（簡易）
			//　ver1.02までの計算法。攻撃力と防御力の最大・最小値のみで計算。
			//　実際には防御力の分布が一様でない（中央値付近ほど確率が高い）ので誤差が大きい
			//　ver1.03からは不使用
			//var success_rate = ( power - dmin ) / ( dmax - dmin ) * 100;
			//if(success_rate>=100) success_rate=100;
			//else if(success_rate<=0) success_rate=0;

			//討伐成功率（詳細）
			//　全乱数パターンについて防御力を計算（11通り×3種で1331パターン）
			//　ver.1.03からはこちらを使用
			var cnt = 0;
			var vcnt = 0;

			if(list[0] == 0){
				//☆1以外
				for( var j=0; j < 11; j++){
				for( var k=0; k < 11; k++){
				for( var l=0; l < 11; l++){

					cnt += 1;
					var hentai_j = hentai2*(10+j*2)/10;
					var hentai_k = hentai2*(10+k*2)/10;
					var hentai_l = hentai2*(10+l*2)/10;

					var ken_x = Math.floor(list[0]*hentai_j);
					var yumi_x = Math.floor(list[1]*hentai_j);
					var yari_x = Math.floor(list[2]*hentai_k);
					var ki_x = Math.floor(list[3]*hentai_l);
					var do_x = Math.floor(list[4]*hentai_j);
					var hoko_x = Math.floor(list[5]*hentai_k);
					var kono_x = Math.floor(list[6]*hentai_l);
	
					var dken = ken_x*(aken*def["ken"][0]+ayari*def["yari"][0]+ayumi*def["yumi"][0]+aki*def["ki"][0]);
					var dyumi = yumi_x*(aken*def["ken"][1]+ayari*def["yari"][1]+ayumi*def["yumi"][1]+aki*def["ki"][1]);
					var dyari = yari_x*(aken*def["ken"][2]+ayari*def["yari"][2]+ayumi*def["yumi"][2]+aki*def["ki"][2]);
					var dki = ki_x*(aken*def["ken"][3]+ayari*def["yari"][3]+ayumi*def["yumi"][3]+aki*def["ki"][3]);
					var ddo = do_x*(aken*def["ken"][4]+ayari*def["yari"][4]+ayumi*def["yumi"][4]+aki*def["ki"][4]);
					var dhoko = hoko_x*(aken*def["ken"][5]+ayari*def["yari"][5]+ayumi*def["yumi"][5]+aki*def["ki"][5]);
					var dkono = kono_x*(aken*def["ken"][6]+ayari*def["yari"][6]+ayumi*def["yumi"][6]+aki*def["ki"][6]);

					var d = dken + dyumi + dyari + dki + ddo + dhoko + dkono ;
					if( power > d ) vcnt += 1;

				};
				};
				};
			}else{
				//☆1
				for( var j=0; j < 11; j++){
					cnt += 1;
					var hentai_j = hentai2*(10+j*2)/10;
					var ken_x = Math.floor(list[0]*hentai_j);
					var dken = ken_x*(aken*def["ken"][0]+ayari*def["yari"][0]+ayumi*def["yumi"][0]+aki*def["ki"][0]);
					var d = dken;
					if( power > d ) vcnt += 1;

				};
			}

			var success_rate = vcnt / cnt * 100;
			vcnt2 = document.getElementById("vcnt2");
		        vcnt2.value = vcnt ;
			cnt2 = document.getElementById("cnt2");
		        cnt2.value = cnt ;

			//成功率計算ここまで

			power2 = document.getElementById("power2");
		        power2.value = power;
			dmax2 = document.getElementById("dmax2");
		        dmax2.value = dmax.toFixed(0);
			dmin2 = document.getElementById("dmin2");
		        dmin2.value = dmin.toFixed(0);
			var result = document.getElementById("result");
		        result.value = success_rate.toFixed(1);

		}//function rec()
		//}

		//表示部分
		msg = msg + "<br><table border=5><tr><td align=left colspan=2>\n";
		msg = msg + com_rack + "　<a id='svsetting_btn' href='javascript:void(0)'>設定</a><br>\n";
		msg = msg + "</td>\n";
		msg = msg + "<td align=left rowspan=3>\n";

		msg = msg + "<table id=svsetting align=center style='text-align:center;background:#FFC;color:#C60;display:none;' width=116>\n";
		msg = msg + "<tr><td align=center><b>Server</b></td><td align=center><b>Season</b></td></tr>\n";
		for(var i = 0; i < serverTable.length; i++){
		msg = msg + "<tr><td align=center><input type=text size=2 id=s"+i+"></td><td>第<select id=s"+i+"s><option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7</select>期</td></tr>\n";
		}
		msg = msg + "<tr><td colspan=2>期数はmixi鯖基準</td></tr>\n";
		msg = msg + "<tr><td colspan=2>本家5期→mixi4期<br>本家6期→mixi5期<br>に相当</td></tr>\n";
		msg = msg + "<tr><td colspan=2><input id=svsave_btn type=button value='保存' size=6>&nbsp;<input id=svreset_btn type=button value='初期化' size=8></td></tr>\n";
		msg = msg + "</table>\n";

		msg = msg + "</td></tr><tr><td align=left>\n";
		msg = msg + "<font color=white>最大出現兵数総計：" + String(Math.floor(sum))+ "</font><br>\n";
		msg = msg + "出兵元：<a href='http://"+location.hostname+"/map.php?x=" + bcordx +"&y=" + bcordy + "'>(" + bcordx +"," + bcordy + ")</a><br>\n";
		msg = msg + "◆　距離：" + String(Math.floor(length*100+0.5)/100) + "　◆<br>\n";
		msg = msg + "目的地：<a href='http://"+location.hostname+"/map.php?x=" + tocordx +"&y=" + tocordy + "'>(" + tocordx +"," + tocordy + ")</a>　　地形：" + String(list[7]) + "<br>\n";
		msg = msg + "<font color=red>\n";
		msg = msg + "兵種：最大兵数～最小兵数<br>\n";
		msg = msg + "</font>\n";
		msg = msg + "剣兵：\n"+ red_s + String(kenmax) + red_f;
		msg = msg + "～" + gre_s   + String(kenmin) + red_f + "<br>\n";
		msg = msg + "槍兵：\n"+ red_s + String(yarimax) + red_f;
		msg = msg + "～" + gre_s   + String(yarimin) + red_f + "<br>\n";
		msg = msg + "弓兵：\n"+ red_s + String(yumimax) + red_f;
		msg = msg + "～" + gre_s   + String(yumimin) + red_f + "<br>\n";
		msg = msg + "騎兵：\n"+ red_s + String(kimax) + red_f;
		msg = msg + "～" + gre_s   + String(kimin) + red_f + "<br>\n";
		msg = msg + "矛兵：\n"+ red_s + String(hokomax) + red_f;
		msg = msg + "～" + gre_s   + String(hokomin) + red_f + "<br>\n";
		msg = msg + "弩兵：\n"+ red_s + String(domax) + red_f;
		msg = msg + "～" + gre_s   + String(domin) + red_f + "<br>\n";
		msg = msg + "近衛：\n" + red_s  + String(konomax) + red_f;
		msg = msg + "～" + gre_s   + String(konomin) + red_f + "<br>\n";
		msg = msg + "<span id='simple'><font color=red>\n";
		msg = msg + "対兵科：防御力MAX～MIN<br>\n"
		msg = msg + "</font>\n";
		msg = msg + "剣兵科："+ red_s + String(kenk) + red_f + "～"+ gre_s + String(kenk2) + red_f+ "<br>\n";
		msg = msg + "槍兵科："+ red_s + String(yarik) + red_f + "～"+ gre_s + String(yarik2) + red_f+"<br>\n";
		msg = msg + "弓兵科："+ red_s + String(yumik) + red_f + "～"+ gre_s + String(yumik2) + red_f+"<br>\n";
		msg = msg + "騎兵科："+ red_s + String(kik) + red_f + "～"+ gre_s + String(kik2) + red_f+"<br>\n";
		msg = msg + "<font color=white>The無強化兵士に単純換算<br>\n";
		msg = msg + "剣:"+Math.ceil(kenk/atk["ken"]) + "～" + Math.ceil(kenk2/atk["ken"])+"<br>\n";
		msg = msg + "槍:"+Math.ceil(yarik/atk["yari"]) + "～" + Math.ceil(yarik2/atk["yari"])+"(矛兵"+Math.ceil(yarik/atk["hoko"]) + "～" + Math.ceil(yarik2/atk["hoko"])+"）<br>\n";
		msg = msg + "弓:"+Math.ceil(yumik/atk["yumi"]) + "～" + Math.ceil(yumik2/atk["yumi"])+"(弩兵"+Math.ceil(yumik/atk["do"]) + "～" + Math.ceil(yumik2/atk["do"])+"）<br>\n";
		msg = msg + "騎:"+Math.ceil(kik/atk["ki"]) + "～" + Math.ceil(kik2/atk["ki"])+"(近衛"+Math.ceil(kik/atk["kono"]) + "～" + Math.ceil(kik2/atk["kono"])+"）</font></span><br>\n";

		msg = msg + "</td><td align=center style='text-align:center;background:#FFC;color:#C60;'>\n";

		msg = msg + "<br><b><font size='+1'>賊討伐シミュレータ</font> ver "+kino_ver+"</b><br><br>\n";
		msg = msg + "<form>\n";

		msg = msg + "<div align='right'><input type='button' id='get_kajiba' value='鍛冶場・課金状況取得'></div>\n";
		msg = msg + "<table id='power_tab' border='1' align='center' style='background:white;color:gray;'><tr>\n";
		msg = msg + "<td>武将攻撃力：</td><td><input type='text' value=0 id='b_power' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='b_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武将兵科:<select id='b_type'><option value=0>歩<option value=1>槍<option value=2>弓<option value=3>騎</select>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>スキル：</td><td colspan=3 align=right><select id='skill'><option value=0>武将<option value=1>剣兵・歩兵兵科の武将<option value=2>槍兵・矛槍兵・槍兵兵科の武将<option value=3>弓兵・弩兵・弓兵兵科の武将<option value=4>騎兵・近衛騎兵・騎兵兵科の武将<option value=5>全ての兵士・武将<option value=6>近衛騎兵・矛槍兵・弩兵</select><br>の攻撃力が<input type='text' value=0 id='skill_rate' size=4 style='text-align:right;' />%上昇する</td>\n"
		msg = msg + "</tr><tr>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td></td><td>兵士数</td><td>スキル効果</td><td>鍛冶場Lv:<select id='kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n"
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>剣兵：</td><td><input type='text' value='" + infantry_count + "' id='infantry_count2' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='ken_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武器Lv:<select id='ken_kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>槍兵：</td><td><input type='text' value='" + spear_count + "' id='spear_count2' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='yari_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武器Lv:<select id='yari_kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>弓兵：</td><td><input type='text' value='" + archer_count + "' id='archer_count2' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='yumi_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武器Lv:<select id='yumi_kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>騎兵：</td><td><input type='text' value='" + cavalry_count + "' id='cavalry_count2' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='ki_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武器Lv:<select id='ki_kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>矛槍兵：</td><td><input type='text' value='" + halbert_count + "' id='halbert_count2' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='hoko_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武器Lv:<select id='hoko_kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>弩兵：</td><td><input type='text' value='" + crossbow_count + "' id='crossbow_count2' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='do_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武器Lv:<select id='do_kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td>近衛騎兵：</td><td><input type='text' value='" + cavalry_guards_count + "' id='cavalry_guards_count2' size=5 style='text-align:right;' /></td><td>+<input type='text' value=0 id='konoe_skill' size=4 style='text-align:right;' />%</td>\n";
		msg = msg + "<td>武器Lv:<select id='konoe_kaji'><option value=0>0<option value=1>1<option value=2>2<option value=3>3<option value=4>4<option value=5>5<option value=6>6<option value=7>7<option value=8>8<option value=9>9<option value=10>10</select></td>\n";
		msg = msg + "</tr><tr>\n";
		msg = msg + "<td colspan='4'>課金(またはヨロズダス)による攻撃力上昇：<select id='cp'><option value=0>無<option value=1>有</select></td>\n";
		msg = msg + "</tr></table><br>\n";
		msg = msg + "<span title='部隊の総攻撃力'>部隊攻撃力：<input type='text' id='power2' size='8' style='color:red;border-width:0;'/></span><br>\n";
		msg = msg + "<span title='部隊の構成比から計算される民兵の防御力の最大値・最小値（乱数の最大・最小）。他同盟の領地の場合、援軍および領地レベルは考慮しない。'>民兵防御力：<input type='text' id='dmax2' size='8' style='color:blue;border-width:0;'/>～<input type='text' id='dmin2' size='8' style='color:blue;border-width:0;'/></span><br>\n";
		msg = msg + "<span title='賊討伐が成功する確率（武将のHPが100に満たない場合はこの限りではない）'>討伐成功率：<input type='text' id='result' size='3' style='background-color:black;color:red;font-size:24px;border-width:0;text-align:right;'/>%</span><br>\n";
		msg = msg + "<span style='font-size:11px;' title='全乱数パターンに対する討伐成功パターン数'>（WIN <input type='text'id='vcnt2' size='3' style='background:#FFC;color:#C60;border-width:0;text-align:center;'/>/ALL <input type='text'id='cnt2' size='3' style='background:#FFC;color:#C60;border-width:0;text-align:center;'/>）</span><br>\n";
		msg = msg + "<input type='button' value=再計算 id='recalc'><br><br>\n";
		msg = msg + "</form>\n";

		msg = msg + "</td></tr>\n";

		msg = msg + "<tr><td align=left colspan=2>\n";
		msg = msg + se_rack + ver_rack + "<br>\n";
		msg = msg + "<b>　＋　賊討伐シミュレータ by kino. ver"+kino_ver+"</b><br>\n";
		msg = msg + "苦情・文句・情報提供などは 17鯖 <a href="+ url_rack2+" target='_blank'>きの。</a> まで御願いします。<br>\n";
		msg = msg + "領地敵兵算出機作者は<a href="+ url_rack+" target='_blank'>こちら（配布元）</a><br>\n";
		msg = msg + "</td></tr></table>\n";

		if (title.indexOf("出兵(入力)") != -1) {
		msg = msg + "<div id='deck_iframe' align=left><br><a id='deckview' href='javascript:void(0)'>Deckview</a><br></div>";
		msg = msg + "<div align=right id='deck_display' style='display:none;'><a id='close_view' href='javascript:void(0)'>CLOSE</a><br><iframe id='iframe' width='770' height='600' style='position:absolute;left:0px;'></iframe></div>";
		}

	var insertHtml = "<div align=center>" + msg + "</div>";
	
	var insertElem = document.createElement('div');
	insertElem.innerHTML = insertHtml;
	insertElem = insertElem.firstChild;
	var containerElem = document.evaluate('//*[@class=\"controlArea\"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	containerElem.snapshotItem(0).appendChild(insertElem);
	
	if (title.indexOf("出兵(確認)") != -1) {
		sol_index();
		close("simple");
		close("power_tab");
		close("recalc");
		close("get_kajiba");
		rec();
	}


	if (title.indexOf("出兵(入力)") != -1) {
		var get_kajiba = document.getElementById("get_kajiba");
	        get_kajiba.addEventListener("click", function(){get_kaji_lv();}, false);
	}

	function get_kaji_lv(){
		//鍛冶場Lv・武器強化Lvを自動入力

		var dom3 = document.createElement("div");
		var url4 = "http://"+location.hostname+"/cp/item_list.php#ptop";
		dom3.innerHTML = getContentFromURL(url4);
		dom3.id = 'TempDOM3';
		dom3.style.display = "none";
		document.body.appendChild(dom3);

		var tr_cp = "//div[@id=\"TempDOM3\"]//*[@id='gray02Wrapper']/form//p[@class=\"buy\"]";
		var now_cp = document.evaluate(tr_cp, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; i < now_cp.snapshotLength; i++ ){
			var cp_flg = now_cp.snapshotItem(i).innerHTML;
			if( cp_flg.indexOf("攻撃力10%アップ(7日)") != -1 && cp_flg.indexOf("延長する") != -1){
				var sel_cp = document.getElementById("cp").getElementsByTagName("option")[1];
				sel_cp.selected = 1;
			}
		}

		var dom = document.createElement("div");
		var url = "http://"+location.hostname+"/village.php#ptop";
		dom.innerHTML = getContentFromURL(url);
		dom.id = 'TempDOM1';
		dom.style.display = "none";
		document.body.appendChild(dom);

		var panels2 = document.evaluate('.//*[@id="mapOverlayMap"]//area/@title', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
		for (var i = 0; i < panels2.snapshotLength; i++) {
			var panels3 = panels2.snapshotItem(i).textContent;
			if(panels3.indexOf("鍛冶場") != -1) {
				var kajiba_panel = ".//*[@title='" + panels3+ "']/@href";
				var url3 = document.evaluate(kajiba_panel,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				url3 = "http://"+location.hostname+"/" + url3.snapshotItem(0).textContent;

				var dom2 = document.createElement("div");
				dom2.innerHTML = getContentFromURL(url3);
				dom2.id = 'TempDOM2';
				dom2.style.display = "none";
				document.body.appendChild(dom2);

				var kajiba = document.evaluate("//*[@class='mainTtl']/div", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				kajiba = kajiba.innerHTML.match(/[0-9]+/);
				var sel_kaji = document.getElementById("kaji").getElementsByTagName("option")[kajiba];
				sel_kaji.selected = 1;

				var num = 1;
				var sysmes = document.evaluate("//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
				if (sysmes.indexOf("現在は下記兵種の武器を強化しています") != -1) num += 1;

				var buki_ken = document.evaluate("//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table["+num+"]/tbody/tr[2]/td[2]/b", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				buki_ken = buki_ken.innerHTML.match(/[0-9]+/);
				var sel_ken = document.getElementById("ken_kaji").getElementsByTagName("option")[buki_ken];
				sel_ken.selected = 1;
				var trs = document.evaluate('//div[@id=\"TempDOM2\"]//*[@id="gray02Wrapper"]//table["+num+"]/tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

				for (var i = 1; i < trs.snapshotLength; i++) {
					var xxx_tr = "//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table["+num+"]/tbody/tr["+i+"]";
					xxx_tr = document.evaluate(xxx_tr, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;
	
					if(xxx_tr.indexOf("槍兵") != -1 && xxx_tr.indexOf("矛槍兵") == -1) {
						var tr_yari = i+1;
						tr_yari = "//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table[" + num + "]/tbody/tr[" + tr_yari + "]/td[2]/b";
						var buki_yari = document.evaluate(tr_yari, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.match(/[0-9]+/);
						var sel_yari = document.getElementById("yari_kaji").getElementsByTagName("option")[buki_yari];
						sel_yari.selected = 1;
					}

					if(xxx_tr.indexOf("弓兵") != -1) {
						var tr_yumi = i+1;
						tr_yumi = "//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table[" + num + "]/tbody/tr[" + tr_yumi + "]/td[2]/b";
						var buki_yumi = document.evaluate(tr_yumi, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.match(/[0-9]+/);
						var sel_yumi = document.getElementById("yumi_kaji").getElementsByTagName("option")[buki_yumi];
						sel_yumi.selected = 1;
					}

					if(xxx_tr.indexOf("騎兵") != -1 && xxx_tr.indexOf("近衛騎兵") == -1 && xxx_tr.indexOf("斥候騎兵") == -1) {
						var tr_ki = i+1;
						tr_ki = "//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table[" + num + "]/tbody/tr[" + tr_ki + "]/td[2]/b";
						var buki_ki = document.evaluate(tr_ki, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.match(/[0-9]+/);
						var sel_ki = document.getElementById("ki_kaji").getElementsByTagName("option")[buki_ki];
						sel_ki.selected = 1;
					}

					if(xxx_tr.indexOf("矛槍兵") != -1) {
						var tr_hoko = i+1;
						tr_hoko = "//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table[" + num + "]/tbody/tr[" + tr_hoko + "]/td[2]/b";
						var buki_hoko = document.evaluate(tr_hoko, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.match(/[0-9]+/);
						var sel_hoko = document.getElementById("hoko_kaji").getElementsByTagName("option")[buki_hoko];
						sel_hoko.selected = 1;
					}

					if(xxx_tr.indexOf("弩兵") != -1) {
						var tr_do = i+1;
						tr_do = "//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table[" + num + "]/tbody/tr[" + tr_do + "]/td[2]/b";
						var buki_do = document.evaluate(tr_do, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.match(/[0-9]+/);
						var sel_do = document.getElementById("do_kaji").getElementsByTagName("option")[buki_do];
						sel_do.selected = 1;
					}

					if(xxx_tr.indexOf("近衛騎兵") != -1) {
						var tr_konoe = i+1;
						tr_konoe = "//div[@id=\"TempDOM2\"]//*[@id='gray02Wrapper']/table[" + num + "]/tbody/tr[" + tr_konoe + "]/td[2]/b";
						var buki_konoe = document.evaluate(tr_konoe, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML.match(/[0-9]+/);
						var sel_konoe = document.getElementById("konoe_kaji").getElementsByTagName("option")[buki_konoe];
						sel_konoe.selected = 1;
					}
				}
			}
		}

	}

	function changeskill(){
		var skill_type = document.getElementById("skill");
		skill_type = skill_type.options[skill_type.selectedIndex].value;
		var skill_rate = document.getElementById("skill_rate").value;
		var busho = document.getElementById("b_skill");
		var kenpei = document.getElementById("ken_skill");
		var yarihei = document.getElementById("yari_skill");
		var yumihei = document.getElementById("yumi_skill");
		var kihei = document.getElementById("ki_skill");
		var hokoyarihei = document.getElementById("hoko_skill");
		var dohei = document.getElementById("do_skill");
		var konoekihei = document.getElementById("konoe_skill");
		var b_type = document.getElementById("b_type");
		var b_type2 = b_type.options[b_type.selectedIndex].value;

		if(skill_type == "0"){
			busho.value = skill_rate;
			kenpei.value = 0;
			yarihei.value = 0;
			yumihei.value = 0;
			kihei.value = 0;
			hokoyarihei.value = 0;
			dohei.value = 0;
			konoekihei.value = 0;
		}
		if(skill_type == "1"){
			if(b_type2 == "0"){busho.value = skill_rate;} else {busho.value = 0;};
			kenpei.value = skill_rate;
			yarihei.value = 0;
			yumihei.value = 0;
			kihei.value = 0;
			hokoyarihei.value = 0;
			dohei.value = 0;
			konoekihei.value = 0;
		}
		if(skill_type == "2"){
			if(b_type2 == "1"){busho.value = skill_rate;} else {busho.value = 0;};
			kenpei.value = 0;
			yarihei.value = skill_rate;
			yumihei.value = 0;
			kihei.value = 0;
			hokoyarihei.value = skill_rate;
			dohei.value = 0;
			konoekihei.value = 0;
		}
		if(skill_type == "3"){
			if(b_type2 == "2"){busho.value = skill_rate;} else {busho.value = 0;};
			kenpei.value = 0;
			yarihei.value = 0;
			yumihei.value = skill_rate;
			kihei.value = 0;
			hokoyarihei.value = 0;
			dohei.value = skill_rate;
			konoekihei.value = 0;
		}
		if(skill_type == "4"){
			if(b_type2 == "3"){busho.value = skill_rate;} else {busho.value = 0;};
			kenpei.value = 0;
			yarihei.value = 0;
			yumihei.value = 0;
			kihei.value = skill_rate;
			hokoyarihei.value = 0;
			dohei.value = 0;
			konoekihei.value = skill_rate;
		}
		if(skill_type == "5"){
			busho.value = skill_rate;
			kenpei.value = skill_rate;
			yarihei.value = skill_rate;
			yumihei.value = skill_rate;
			kihei.value = skill_rate;
			hokoyarihei.value = skill_rate;
			dohei.value = skill_rate;
			konoekihei.value = skill_rate;
		}
		if(skill_type == "6"){
			busho.value = 0;
			kenpei.value = 0;
			yarihei.value = 0;
			yumihei.value = 0;
			kihei.value = 0;
			hokoyarihei.value = skill_rate;
			dohei.value = skill_rate;
			konoekihei.value = skill_rate;
		}

	}

	var skill_sel = document.getElementById("skill");
        skill_sel.addEventListener("change", function(){changeskill();}, false);
	var skill_rate = document.getElementById("skill_rate");
        skill_rate.addEventListener("change", function(){changeskill();}, false);
	var b_type = document.getElementById("b_type");
        b_type.addEventListener("change", function(){changeskill();}, false);

	var recalc = document.getElementById("recalc");
        recalc.addEventListener("click", function(){rec();}, false);
	
	var deckview = document.getElementById("deckview");
        deckview.addEventListener("click", function(){view("deck_display");chansrc("iframe");}, false);
	var close_view = document.getElementById("close_view");
        close_view.addEventListener("click", function(){close("deck_display");}, false);

	}

	function sol_index(){
		var s_index = 0;
		if(soltype == "歩兵") s_index = 0;
		else if(soltype == "槍兵") s_index = 1;
		else if(soltype == "弓兵") s_index = 2;
		else if(soltype == "騎兵") s_index = 3;
		var sel_soltype = document.getElementById("b_type").getElementsByTagName("option")[s_index];
		sel_soltype.selected = 1;
	}

	var svsetting_btn = document.getElementById("svsetting_btn");
        svsetting_btn.addEventListener("click", function(){view("svsetting");set_season();}, false);
	var svsave_btn = document.getElementById("svsave_btn");
        svsave_btn.addEventListener("click", function(){sv_save();}, false);
	var svreset_btn = document.getElementById("svreset_btn");
        svreset_btn.addEventListener("click", function(){reset_season();}, false);

}

function view(id){
	document.getElementById(id).style.display = "block";
};

function close(id){
	document.getElementById(id).style.display = "none";
}

function chansrc(id){
	document.getElementById(id).src = "../card/deck.php#filetop"
};

var sv_world = [];
var sv_season = [];
function set_season(){
	for(i=0;i<serverTable.length;i++){
		var BRO3_TOBATSU_SV	= 'bro3_tobatsu_sv' + i;
		var BRO3_TOBATSU_SEASON	= 'bro3_tobatsu_season' + i;
		sv_world[i] = document.getElementById("s"+i);
		sv_season[i] = document.getElementById("s"+i+"s");

			sv_world[i].value = GM_getValue(BRO3_TOBATSU_SV);
		if(GM_getValue(BRO3_TOBATSU_SV)=="NN") sv_world[i].value = "";
		var season = GM_getValue(BRO3_TOBATSU_SEASON) -1;
		sv_season[i].getElementsByTagName("option")[season].selected = 1;
	}
}

function sv_save(){
	for(i=0;i<serverTable.length;i++){
		sv_world[i] = document.getElementById("s"+i).value;
		if(sv_world[i]=="") sv_world[i] = "NN";
		sv_season[i] = document.getElementById("s"+i+"s");
		sv_season[i] = sv_season[i].options[sv_season[i].selectedIndex].value;
		var BRO3_TOBATSU_SV	= 'bro3_tobatsu_sv' + i;
		var BRO3_TOBATSU_SEASON	= 'bro3_tobatsu_season' + i;
		GM_setValue(BRO3_TOBATSU_SV, sv_world[i]);
		GM_setValue(BRO3_TOBATSU_SEASON, sv_season[i]);
	}
	alert("保存しました");
}

function reset_season(){
	for(i=0;i<serverTable.length;i++){
		sv_world[i] = document.getElementById("s"+i);
		sv_season[i] = document.getElementById("s"+i+"s");

		sv_world[i].value = serverTable[i][0];
		var season = serverTable[i][1] - 1;
		sv_season[i].getElementsByTagName("option")[season].selected = 1;
	}
}

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