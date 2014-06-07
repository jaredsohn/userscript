// ==UserScript==
// @name           bro3_calcn_12ki
// @namespace      http://3g-ws.com/
// @include        http://*.3gokushi.jp/facility/castle_send_troop.php*
// @description    <内蔵版>ブラウザ三国志 領地敵兵算出機（mixi12期 ALMIC版） by BSE
// @author         BSE,base_Kyou + ALMIC
// @version        1.4.b20 11th
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
//　2011.02.09　ver1.3.4g 21鯖をいじいじ
//  2011.03.23 18:06 ver1.4.b1 係数提供　elmoreさん
//  2011.03.23 20:53 ver1.4.b2 スクリプト名を間違えてた
//  2011.03.28  ver1.4.b2s 本家鯖をロックオン！
//  2011.04.14  5鯖　ver変更無し
//  2012.05.18  一部の表示改善要求に対応。
//  2013.01.31  ver1.4.b10  mixi10期対応暫定計算人柱版発行
//  2013.01.31  ver1.4.b11  mixi10期対応暫定版
//  2013.02.01  ver1.4.b12  mixi10期対応版
//  2013.03.03  ver1.4.b13  ☆6(2-2-2-0)基準値修正
//  2013.03.13  ver1.4.b14  基準値の再確認・再計算完了
//  2013.07.12  ver1.4.b17  mixi11期暫定ひとばしら！
//  2013.07.12  ver1.4.b18  mixi11期暫定人柱にっ！
//  2013.08.02  ver1.4.b19  mixi11期 08/01民兵修正領地対応
//  2013.12.01  ver1.4.b20  mixi12期 ALMIC版
//  2013.12.01  ver1.4.b20  mixi12期 ☆4(2220)と☆7(00012)の値を修正　ByNjord
//


//バージョン配置用
var ver_rack = "ver1.4.b20 modified ALMIC</b>";

//配布URL
var se_rack = "<b><内蔵版>ブラウザ三国志 領地敵兵算出機 by BSE を借りました<br>";
//var url_rack = "http://dev.3g-ws.com/?tools";
var com_rack = "mixi12期版（Map f-1）民兵修正版。"
//var hitobashira_rack = "<br><img src="+"http://ms.3g-ws.com/11th-m1.jpg"+" border="+0+">"

//　出兵距離格納変数
var length;

//　出兵先のタイル数格納変数（平地、木、岩、鉄、穀、荒地）の順。
var tile = new Array(0,0,0,0,0,0);

//　出兵先のパネル構成ごとの兵数計算パラメータ
//　[剣兵、弓、槍、騎、弩、矛、近衛]の順に格納。
//

var point = {
//kai-11th
//パターン数列:[剣,盾,弓,槍,馬,大剣,重盾,弩,矛,近衛,"凡例"],
"00209":[6.5,0,0,0,0,0,0,0,0,0,"☆1鉄"],
"20009":[6.5,0,0,0,0,0,0,0,0,0,"☆1森"],
"02009":[6.5,0,0,0,0,0,0,0,0,0,"☆1岩"],
"00029":[6.5,0,0,0,0,0,0,0,0,0,"☆1※"],
"030014":[0,0,1.5,15.5,1.5,0,0,0,0,0,"☆2岩"],
"003014":[0,0,1.5,1.5,15.5,0,0,0,0,0,"☆2鉄"],
"300014":[0,0,15.5,1.5,1.5,0,0,0,0,0,"☆2森"],
"000126":[0,36,6.5,6.5,6.5,0,0,0,0,0,"☆3(0-0-0-1)"],
"111016":[0,0,19,19,19,0,0,0,0,0,"☆3(1-1-1-0)"],
"111121":[0,12,16.5,16.5,16.5,0,0,0,0,0,"☆3(1-1-1-1)"],
"222218":[0,30,31.5,31.5,31.5,0,0,0,0,0,"☆4(2-2-2-2)"],
"000813":[0,70.5,18,18,18,0,0,0,0,0,"☆4(0-0-0-8)"],
"111127":[0,55.5,25,25,25,0,0,0,0,0,"☆4(1-1-1-1)"],
"222019":[0,0,40.5,40.5,40.5,0,0,0,0,0,"☆4(2-2-2-0)"],
"006020":[0,0,41.5,41.5,139,0,0,0,0,0,"☆5(0-0-6-0)"],
"600020":[0,0,139,41.5,41.5,0,0,0,0,0,"☆5(6-0-0-0)"],
"111120":[0,57,56.5,56.5,56.5,0,0,0,0,0,"☆5(1-1-1-1)"],
"000129":[0,129,32.5,32.5,32.5,0,0,0,0,0,"☆5(0-0-0-1)"],
"060020":[0,0,41.5,139,41.5,0,0,0,0,0,"☆5(0-6-0-0)"],
"1000014":[0,0,0,0,0,0,0,225,62.5,62.5,"☆6(10-0-0-0)"],
"000028":[0,0,0,0,0,0,0,106.5,106.5,106.5,"☆6(0-0-0-0)"],
"0010014":[0,0,0,0,0,0,0,62.5,62.5,225,"☆6(0-0-10-0)"],
"0100014":[0,0,0,0,0,0,0,62.5,225,62.5,"☆6(0-10-0-0)"],
"442023":[0,0,0,0,0,0,0,220,220,110,"☆7(4-4-2-0)"],
"244023":[0,0,0,0,0,0,0,110,220,220,"☆7(2-4-4-0)"],
"000029":[0,0,0,0,0,0,0,183.5,183.5,183.5,"☆7(0-0-0-0)"],
"424023":[0,0,0,0,0,0,0,220,110,220,"☆7(4-2-4-0)"],
"0001216":[0,0,0,0,0,0,279,90,90,90,"☆7(0-0-0-12)"],
"544222":[0,0,0,0,0,0,90,316,205,205,"☆8(5-4-4-2)"],
"445222":[0,0,0,0,0,0,90,205,205,316,"☆8(4-4-5-2)"],
"454222":[0,0,0,0,0,0,90,205,316,205,"☆8(4-5-4-2)"],
"0001531":[0,0,0,0,0,0,450,175,175,175,"☆8(0-0-0-15)"],
"000037":[0,0,0,0,0,0,262.5,262.5,262.5,262.5,"☆8(0-0-0-0)"],
"700438":[0,0,0,0,0,0,600,900,125,125,"☆9(7-0-0-4)"],
"000041":[0,0,0,0,0,0,195,600,600,600,"☆9(0-0-0-0)"],
"007438":[0,0,0,0,0,0,600,125,125,900,"☆9(0-0-7-4)"],
"070438":[0,0,0,0,0,0,600,125,900,125,"☆9(0-7-0-4)"],
"333317":[0,0,0,0,0,0,468,469,469,469,"☆9(3-3-3-3)"]};

//　兵科に対する各ユニットの防御値
var def = {
	//剣,盾,弓,槍,馬,大剣,重盾,弩,矛,近衛
	"ken":[15,24,52,50,54,85,60,145,140,151],//剣兵防御
	"yari":[10,108,58,40,28,56,270,145,100,70],//槍兵防御
	"yumi":[10,104,42,25,60,56,260,105,63,150],//弓兵防御
	"ki":[10,112,26,55,44,56,280,65,137,110]//騎兵防御
};

//　各ユニットの攻撃力
var atk = {
	"ken":15,
	"tate":5,
	"yari":40,
	"yumi":42,
	"ki":44,
	"taiken":85,
	"jutate":10,
	"hoko":100,
	"do":105,
	"kono":110
};



(function(){
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


	//表示距離
	var mal_length = Math.floor(length*100+0.5)/100;
	//表示URL
	var mal_url = "http://"+location.hostname+"/land.php?x="+tocordx+"&y="+tocordy;
	//表示部分Non
	var msg = "";
	
	if(list==undefined){
		//　キーに対応するデータが見つからない場合。ex.NPC拠点、データがないもの
		msg = msg + "<table class="+ "commonTables" +"><tr><td align=left>出兵元から、" + mal_length + "の距離にある 目的地<a href=" + mal_url + ">(" + tocordx +"," + tocordy + ")</a>について、有効なデータはありません。<br>※NPCや本拠地など民兵情報が収録されていない領地か<br>未知の領地で有る可能性が有ります。</td></tr>\n";
		msg = msg + "<tr><td align=left>" + se_rack + ver_rack + "<br>\n";
		msg = msg + "単一兵科以外での攻撃の場合は別のツールを使いましょ！<br>\n";
//		msg = msg + "苦情・文句・情報提供などは→<a href="+ url_rack+" target=" + "_blank"+">こちら（配布元）</a>まで御願いします。\n";
		msg = msg + "</td></tr></table>\n";



	}else{
		//MAX計算用
		for(i=0;i<list.length;i++){
	//距離最大時乗数
	var hentai = (1+length/10)*3;
	//最大出現数計算
	var kenmax = Math.floor(list[0]*hentai);
	var tatemax = Math.floor(list[1]*hentai);
	var yumimax = Math.floor(list[2]*hentai);
	var yarimax = Math.floor(list[3]*hentai);
	var kimax = Math.floor(list[4]*hentai);
	var taikenmax = Math.floor(list[5]*hentai);
	var jutatemax = Math.floor(list[6]*hentai);
	var domax = Math.floor(list[7]*hentai);
	var hokomax = Math.floor(list[8]*hentai);
	var konomax = Math.floor(list[9]*hentai);
	//最大防御力集計
	var sum = kenmax+tatemax+yumimax+yarimax+kimax+taikenmax+jutatemax+domax+hokomax+konomax;
	var kenk = kenmax*def["ken"][0]+tatemax*def["ken"][1]+yumimax*def["ken"][2]+yarimax*def["ken"][3]+kimax*def["ken"][4]+taikenmax*def["ken"][5]+jutatemax*def["ken"][6]+domax*def["ken"][7]+hokomax*def["ken"][8]+konomax*def["ken"][9];
	var yumik = kenmax*def["yumi"][0]+tatemax*def["yumi"][1]+yumimax*def["yumi"][2]+yarimax*def["yumi"][3]+kimax*def["yumi"][4]+taikenmax*def["yumi"][5]+jutatemax*def["yumi"][6]+domax*def["yumi"][7]+hokomax*def["yumi"][8]+konomax*def["yumi"][9];
	var yarik = kenmax*def["yari"][0]+tatemax*def["yari"][1]+yumimax*def["yari"][2]+yarimax*def["yari"][3]+kimax*def["yari"][4]+taikenmax*def["yari"][5]+jutatemax*def["yari"][6]+domax*def["yari"][7]+hokomax*def["yari"][8]+konomax*def["yari"][9];
	var kik = kenmax*def["ki"][0]+tatemax*def["ki"][1]+yumimax*def["ki"][2]+yarimax*def["ki"][3]+kimax*def["ki"][4]+taikenmax*def["ki"][5]+jutatemax*def["ki"][6]+domax*def["ki"][7]+hokomax*def["ki"][8]+konomax*def["ki"][9];

	//距離最小時乗数
	var hentai2 = (1+length/10);
	//最小出現数計算
	var kenmin = Math.floor(list[0]*hentai2);
	var tatemin = Math.floor(list[1]*hentai2);
	var yumimin = Math.floor(list[2]*hentai2);
	var yarimin = Math.floor(list[3]*hentai2);
	var kimin = Math.floor(list[4]*hentai2);
	var taikenmin = Math.floor(list[5]*hentai2);
	var jutatemin = Math.floor(list[6]*hentai2);
	var domin = Math.floor(list[7]*hentai2);
	var hokomin = Math.floor(list[8]*hentai2);
	var konomin = Math.floor(list[9]*hentai2);

	//最小防御力集計
	var kenk2 = kenmin*def["ken"][0]+tatemin*def["ken"][1]+yumimin*def["ken"][2]+yarimin*def["ken"][3]+kimin*def["ken"][4]+taikenmin*def["ken"][5]+jutatemin*def["ken"][6]+domin*def["ken"][7]+hokomin*def["ken"][8]+konomin*def["ken"][9];
	var yumik2 = kenmin*def["yumi"][0]+tatemin*def["yumi"][1]+yumimin*def["yumi"][2]+yarimin*def["yumi"][3]+kimin*def["yumi"][4]+taikenmin*def["yumi"][5]+jutatemin*def["yumi"][6]+domin*def["yumi"][7]+hokomin*def["yumi"][8]+konomin*def["yumi"][9];
	var yarik2 = kenmin*def["yari"][0]+tatemin*def["yari"][1]+yumimin*def["yari"][2]+yarimin*def["yari"][3]+kimin*def["yari"][4]+taikenmin*def["yari"][5]+jutatemin*def["yari"][6]+domin*def["yari"][7]+hokomin*def["yari"][8]+konomin*def["yari"][9];
	var kik2 = kenmin*def["ki"][0]+tatemin*def["ki"][1]+yumimin*def["ki"][2]+yarimin*def["ki"][3]+kimin*def["ki"][4]+taikenmin*def["ki"][5]+jutatemin*def["ki"][6]+domin*def["ki"][7]+hokomin*def["ki"][8]+konomin*def["ki"][9];

	//表示部分フォント追加分
	var red_f = "</b></font>\n";
	var red_s = "<font color=red><b>";
	var gre_s = "<font color=blue>";

}

		//表示部分
		msg = msg + "<table class="+ "commonTables" +"><tr><td align=left colspan="+3+">\n";
		msg = msg + com_rack + "<br>\n";
		msg = msg + "<font color=white>最大出現兵数総計：" + String(Math.floor(sum))+ "</font><br>\n";
		msg = msg + "出兵元：(" + bcordx +"," + bcordy + ")<br>\n";
		msg = msg + "◆　距離：" + mal_length + "　◆<br>\n";
		msg = msg + "目的地：<a href=" + mal_url + ">(" + tocordx +"," + tocordy + ")</a>　　地形：" + String(list[10]) + "<br>\n";
		msg = msg + "</td></tr>\n";


		msg = msg + "<tr><td align=left>\n";
		msg = msg + "<font color=red>\n";
		msg = msg + "兵種：最大兵数～最小兵数<br>\n";
		msg = msg + "</font>\n";
		msg = msg + "剣兵：\n"+ red_s + String(kenmax) + red_f;
		msg = msg + "～" + gre_s   + String(kenmin) + red_f + "<br>\n";
		msg = msg + "盾兵：\n"+ red_s + String(tatemax) + red_f;
		msg = msg + "～" + gre_s   + String(tatemin) + red_f + "<br>\n";
		msg = msg + "槍兵：\n"+ red_s + String(yarimax) + red_f;
		msg = msg + "～" + gre_s   + String(yarimin) + red_f + "<br>\n";
		msg = msg + "弓兵：\n"+ red_s + String(yumimax) + red_f;
		msg = msg + "～" + gre_s   + String(yumimin) + red_f + "<br>\n";
		msg = msg + "騎兵：\n"+ red_s + String(kimax) + red_f;
		msg = msg + "～" + gre_s   + String(kimin) + red_f + "<br>\n";
		msg = msg + "大剣兵：\n"+ red_s + String(taikenmax) + red_f;
		msg = msg + "～" + gre_s   + String(taikenmin) + red_f + "<br>\n";
		msg = msg + "重盾兵：\n"+ red_s + String(jutatemax) + red_f;
		msg = msg + "～" + gre_s   + String(jutatemin) + red_f + "<br>\n";
		msg = msg + "矛兵：\n"+ red_s + String(hokomax) + red_f;
		msg = msg + "～" + gre_s   + String(hokomin) + red_f + "<br>\n";
		msg = msg + "弩兵：\n"+ red_s + String(domax) + red_f;
		msg = msg + "～" + gre_s   + String(domin) + red_f + "<br>\n";
		msg = msg + "近衛：\n" + red_s  + String(konomax) + red_f;
		msg = msg + "～" + gre_s   + String(konomin) + red_f + "<br>\n";
		msg = msg + "<br><br><br></td>\n";

		msg = msg + "<td align=left>\n";
		msg = msg + "<font color=red>\n";
		msg = msg + "対兵科：防御力MAX～MIN<br>\n"
		msg = msg + "</font>\n";
		msg = msg + "剣兵科："+ red_s + String(kenk) + red_f + "～"+ gre_s + String(kenk2) + red_f+ "<br>\n";
		msg = msg + "槍兵科："+ red_s + String(yarik) + red_f + "～"+ gre_s + String(yarik2) + red_f+"<br>\n";
		msg = msg + "弓兵科："+ red_s + String(yumik) + red_f + "～"+ gre_s + String(yumik2) + red_f+"<br>\n";
		msg = msg + "騎兵科："+ red_s + String(kik) + red_f + "～"+ gre_s + String(kik2) + red_f+"<br><br>\n";
		msg = msg + "<font color=white>The無強化兵士に単純換算<br>\n";
		msg = msg + "剣:"+Math.ceil(kenk/atk["ken"]) + "～" + Math.ceil(kenk2/atk["ken"])+"<br>\n";
		msg = msg + "槍:"+Math.ceil(yarik/atk["yari"]) + "～" + Math.ceil(yarik2/atk["yari"])+"(矛兵"+Math.ceil(yarik/atk["hoko"]) + "～" + Math.ceil(yarik2/atk["hoko"])+"）<br>\n";
		msg = msg + "弓:"+Math.ceil(yumik/atk["yumi"]) + "～" + Math.ceil(yumik2/atk["yumi"])+"(弩兵"+Math.ceil(yumik/atk["do"]) + "～" + Math.ceil(yumik2/atk["do"])+"）<br>\n";
		msg = msg + "騎:"+Math.ceil(kik/atk["ki"]) + "～" + Math.ceil(kik2/atk["ki"])+"(近衛"+Math.ceil(kik/atk["kono"]) + "～" + Math.ceil(kik2/atk["kono"])+"）</font><br>\n";

		msg = msg + "</td></tr>\n";



		msg = msg + "<tr><td align=left colspan="+3+">\n";
		msg = msg + se_rack + ver_rack + "<br>\n";
		msg = msg + "単一兵科以外での攻撃の場合は別のツールを使いましょ！<br>\n";
//		msg = msg + "苦情・文句・情報提供などは→<a href="+ url_rack+" target=" + "_blank"+">こちら（配布元）</a>まで御願いします。"+hitobashira_rack+"\n";
		msg = msg + "</td></tr></table>\n";



	}

	var insertHtml = "<table><tr><td>" + msg + "</td></tr></table>";
	
	var insertElem = document.createElement('div');
	insertElem.innerHTML = insertHtml;
	insertElem = insertElem.firstChild;
	var containerElem = document.evaluate('//*[@class=\"controlArea\"]',
 document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	containerElem.snapshotItem(0).appendChild(insertElem);
	

	
}

