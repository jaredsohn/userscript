// ==UserScript==
// @name           1kibaku_calcn_1ki
// @namespace      http://ned.bar-sui.net/
// @include        http://s1.1kibaku.jp/facility/castle_send_troop.php*
// @include        http://s2.1kibaku.jp/facility/castle_send_troop.php*
// @include        http://s3.1kibaku.jp/facility/castle_send_troop.php*
// @description    <内蔵版>一騎当千 領地敵兵算出機（1期専用） by ＮｉｃＬ（原版作者 きょう）（Cal1.3 Layout4 Per1）
// @author         BSE,base_Kyou
// @version        2.0.0 1st
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
//  2011.01/10  ver2.0.0 一騎当千に対応(NicL)
//

//バージョン配置用
var ver_rack = "ver2.0.0 1st</b>";

//配布URL
var se_rack = "<b><内蔵版>ブラウザ三国志 領地敵兵算出機 by NicL ";
var url_rack = "http://ned.bar-sui.net/calcn/";
var com_rack = "出現目安です！ ピッカピカの 1期専用"

//　出兵距離格納変数
var length;

//　出兵先のタイル数格納変数（平地、学、体、武、畑、住宅街）の順。
var tile = new Array(0,0,0,0,0,0);

//　出兵先のパネル構成ごとの兵数計算パラメータ
//　[見習い闘士、弓闘士、槍闘士、強襲闘士、弩闘士、矛槍闘士、猛襲闘士]の順に格納。
//

var point = {

//1期学体武畑平見弓槍強弩矛猛
"000116":[5,0,0,0,0,0,0,"☆1※"],//☆1※
"100016":[5,0,0,0,0,0,0,"☆1学"],//☆1学
"010016":[5,0,0,0,0,0,0,"☆1体"],//☆1体
"001016":[5,0,0,0,0,0,0,"☆1武"],//☆1武
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

//　兵科に対する各ユニットの防御値
var def = {
	//見習い,弓,槍,強,弩,矛,猛襲
	"ken":[15,52,50,54,208,200,216],//見習い闘士防御
	"yari":[10,58,40,28,145,100,70],//槍闘士防御
	"yumi":[10,42,25,60,105,63,150],//弓闘士防御
	"ki":[10,26,55,44,65,137,110]//強襲闘士防御
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
		"職員室":0,
		"体育館":0,
		"武道館":0,
		"畑":0,
		"住宅街":0
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
	var key = String(panel["職員室"])+String(panel["体育館"])+String(panel["武道館"])+String(panel["畑"])+String
(panel["平地"]);

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


	

	var msg = "";
	
	if(list==undefined){
		//　キーに対応するデータが見つからない場合。ex.NPC拠点、データがないもの
		msg = "有効なデータはありません。";
	}else{
		//MAX計算用
		for(i=0;i<list.length;i++){
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

}
		//表示部分
		msg = msg + "<table class="+ "commonTables" +"><tr><td align=left colspan="+3+">\n";
		msg = msg + com_rack + "<br>\n";
		msg = msg + "<font color=white>最大出現兵数総計：" + String(Math.floor(sum))+ "</font><br>\n";
		msg = msg + "出兵元：(" + bcordx +"," + bcordy + ")<br>\n";
		msg = msg + "◆　距離：" + String(Math.floor(length*100+0.5)/100) + "　◆<br>\n";
		msg = msg + "目的地：(" + tocordx +"," + tocordy + ")　　地形：" + String(list[7]) + "<br>\n";
		msg = msg + "</td></tr>\n";

		msg = msg + "<tr><td align=left>\n";
		msg = msg + "<font color=red>\n";
		msg = msg + "兵種：最大兵数～最小兵数<br>\n";
		msg = msg + "</font>\n";
		msg = msg + "見習い闘士：\n"+ red_s + String(kenmax) + red_f;
		msg = msg + "～" + gre_s   + String(kenmin) + red_f + "<br>\n";
		msg = msg + "槍闘士：\n"+ red_s + String(yarimax) + red_f;
		msg = msg + "～" + gre_s   + String(yarimin) + red_f + "<br>\n";
		msg = msg + "弓闘士：\n"+ red_s + String(yumimax) + red_f;
		msg = msg + "～" + gre_s   + String(yumimin) + red_f + "<br>\n";
		msg = msg + "強襲闘士：\n"+ red_s + String(kimax) + red_f;
		msg = msg + "～" + gre_s   + String(kimin) + red_f + "<br>\n";
		msg = msg + "矛槍闘士：\n"+ red_s + String(hokomax) + red_f;
		msg = msg + "～" + gre_s   + String(hokomin) + red_f + "<br>\n";
		msg = msg + "弩闘士：\n"+ red_s + String(domax) + red_f;
		msg = msg + "～" + gre_s   + String(domin) + red_f + "<br>\n";
		msg = msg + "猛襲闘士：\n" + red_s  + String(konomax) + red_f;
		msg = msg + "～" + gre_s   + String(konomin) + red_f + "<br>\n";
		msg = msg + "<br><br><br></td>\n";

		msg = msg + "<td align=left>\n";
		msg = msg + "<font color=red>\n";
		msg = msg + "対兵科：防御力MAX～MIN<br>\n"
		msg = msg + "</font>\n";
		msg = msg + "見習い闘士科："+ red_s + String(kenk) + red_f + "～"+ gre_s + String(kenk2) + red_f+ "<br>\n";
		msg = msg + "槍闘士科："+ red_s + String(yarik) + red_f + "～"+ gre_s + String(yarik2) + red_f+"<br>\n";
		msg = msg + "弓闘士科："+ red_s + String(yumik) + red_f + "～"+ gre_s + String(yumik2) + red_f+"<br>\n";
		msg = msg + "強襲闘士科："+ red_s + String(kik) + red_f + "～"+ gre_s + String(kik2) + red_f+"<br><br>\n";
		msg = msg + "<font color=white>The無強化兵士に単純換算<br>\n";
		msg = msg + "見習い:"+Math.ceil(kenk/atk["ken"]) + "～" + Math.ceil(kenk2/atk["ken"])+"<br>\n";
		msg = msg + "槍:"+Math.ceil(yarik/atk["yari"]) + "～" + Math.ceil(yarik2/atk["yari"])+"(矛兵"+Math.ceil(yarik/atk["hoko"]) + "～" + Math.ceil(yarik2/atk["hoko"])+"）<br>\n";
		msg = msg + "弓:"+Math.ceil(yumik/atk["yumi"]) + "～" + Math.ceil(yumik2/atk["yumi"])+"(弩兵"+Math.ceil(yumik/atk["do"]) + "～" + Math.ceil(yumik2/atk["do"])+"）<br>\n";
		msg = msg + "騎:"+Math.ceil(kik/atk["ki"]) + "～" + Math.ceil(kik2/atk["ki"])+"(近衛"+Math.ceil(kik/atk["kono"]) + "～" + Math.ceil(kik2/atk["kono"])+"）</font><br>\n";


		msg = msg + "</td></tr>\n";



		msg = msg + "<tr><td align=left colspan="+3+">\n";
		msg = msg + se_rack + ver_rack + "<br>\n";
		msg = msg + "単一兵科以外での攻撃の場合は別のツールを使いましょ！<br>\n";
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

