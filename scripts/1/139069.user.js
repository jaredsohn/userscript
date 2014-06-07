// ==UserScript==
// @name         bro3_alert_view
// @namespace    http://homepage3.nifty.com/Craford/
// @description  ブラウザ三国志 敵襲状況チェッカー
// @include      http://*.3gokushi.jp/village.php*
// ==/UserScript==

// 2011.07.26 update Craford 敵襲状況チェッカー
// 2011.07.30 update Craford 所々の問題はあるものの、使えるレベルにした

//グローバル変数
var VERSION = "0.02";			//バージョン情報
var HOST = location.hostname;	//アクセスURLホスト

var d = document;

var $ = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $a = function(xp,dc) { var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); var a=[]; for(var i=0; i<r.snapshotLength; i++){ a.push(r.snapshotItem(i)); } return a; };
var $e = function(e,t,f) { if (!e) return; e.addEventListener(t, f, false); };
var $v = function(key) { return d.evaluate(key, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); };

var svname = location.hostname.substr(0,location.hostname.indexOf("."));

var target = new Array();
var targetName = new Array();
var areatype = new Array();
var droptime = new Array();
var numofenemy = new Array();
var checkurl = new Array();
var count = 0;
var checkcount = 0;
var basename = "";
var basevillageid = "";

// メイン
(function(){
	// 拠点画面なら実行
	if (location.pathname == "/village.php") {
		// 
		viewIcon();
	}
})();

// アイコン表示
function viewIcon() {
	//----------------//
	// コンテナの取得 //
	//----------------//
	var container;
	var container = $v('//*[@id="container"]');
	if (container.snapshotLength != 0) {
		container = container.snapshotItem(0);
	}
	else{
		return;
	}

	//------------------//
    // 現在拠点名の取得 //
	//------------------//
	var data = $v('//title');
	basename = data.snapshotItem(0).textContent;
    basename = trim(basename.substring(0,basename.indexOf(" - ")));

	//--------------------------//
	// 他ページ取得情報の設定域 //
	//--------------------------//
	var linksDiv2 = document.createElement("html");
	linksDiv2.id = "hiddenData_viewStatus";
	linksDiv2.style.display = "none";
	container.appendChild(linksDiv2);

	//------------------//
	// 状況情報の設定域 //
	//------------------//
	var linksDiv3 = document.createElement("html");
	linksDiv3.id = "oldStatusIcon";
	linksDiv3.style.position = "absolute";
	linksDiv3.style.top = "324px";
	linksDiv3.style.left = "-5px";
	linksDiv3.style.width = "195px";
	linksDiv3.style.height = "0px";

	$("basepoint").appendChild(linksDiv3);

	//------------------------//
	// ステータスページの取得 //
	//------------------------//
	loadStatus();

	return;
}

//----------------------//
// ページのローディング //
//----------------------//
function loadStatus() {
	if (location.pathname != "/village.php") {
		exit;
	}

	var url = "http://" + location.hostname + "/user/status.php#ptop";
	var opt = {
		method: 'GET',
		url: url,
		onload: function(res) {
			getStatus(res);
		}
	}
	GM_xmlhttpRequest(opt); 
}

//--------------------//
// ステータス一覧取得 //
//--------------------//
function getStatus(res) {
	var currentVillageName;
	var enemy_status;

	if (location.pathname != "/village.php") {
		exit;
	}

	//--------------------//
	// 取得データのセット //
	//--------------------//
	var hidden = $v('//*[@id="hiddenData_viewStatus"]');
	hidden.snapshotItem(0).innerHTML = res.responseText;

	// 状況チェック
	data = document.evaluate('//*[@id="hiddenData_viewStatus"]//table[@class="commonTables"]//td',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if( data == undefined || data == null ){
		return;
	}

	// 0場所,1名称,2出撃,3帰還,4移動,5敵襲,6援軍
	for(var i = 0; i < data.snapshotLength/7; i++ ){
		// 敵襲
		if( data.snapshotItem(i*7+5).innerHTML != "" ){
			var str = data.snapshotItem(i*7+0).textContent;
			if( str.indexOf("領地") >= 0 ){
				str = '領地';
			}
			areatype[count] = str;

			str = data.snapshotItem(i*7+1).innerHTML;
			str = str.substr(0,str.indexOf("</a>")+4);
			target[count] = str;
			str = data.snapshotItem(i*7+1).textContent;
			str = str.substr(0,str.indexOf(" "));
			targetName[count] = str;

			str = data.snapshotItem(i*7+5).innerHTML;
			numofenemy[count] = str;
			if( areatype[count] == 0 ){
				checkurl[count] = "http://m9.3gokushi.jp/facility/territory_status.php#enemy";
			}
			else{
				str = numofenemy[count];
				str = str.replace("<a href=\"","");
				str = str.substr(0,str.indexOf("\">"));
				str = "http://" + location.hostname + str;
				checkurl[count] = str;
			}

			droptime[count] = "";

			count ++;
		}
	}

	if( count > 0 ){
		loadEnemyStatus(0);
	}
}

//------------------------------------//
// ページのローディング(敵襲チェック) //
//------------------------------------//
function loadEnemyStatus(pos) {
	if (location.pathname != "/village.php") {
		exit;
	}

	var url = checkurl[pos];
	var opt = {
		method: 'GET',
		url: url,
		onload: function(res) {
			getStatus2(res);
		}
	}
	GM_xmlhttpRequest(opt); 
}

//--------------------//
// ステータス一覧取得 //
//--------------------//
function getStatus2(res) {
	var currentVillageName;
	var enemy_status;

	if (location.pathname != "/village.php") {
		exit;
	}

	if( checkcount >= count ){
		if( basevillageid != "" ){
			var url = "http://" + location.hostname + "/user/status.php?" + basevillageid + "&anchor=#enemy";
			basevillageid = "";
			var opt = {
				method: 'GET',
				url: url,
				onload: function(res) {
					getStatus2(res);
				}
			}
			GM_xmlhttpRequest(opt); 
			return;
		}

		var putHtml = "";
		if( count > 0 ){
			putHtml += "<div style='background-color:black; font-size: 9px; border:ridge 2px white; overflow-y:scroll; max-height: 109px; min-height: 0px;'>" +
				       "<table style='background-color:black; border:solid 1px white;'>";
			for( var i = 0; i < count; i++ ){
				droptime[i] = droptime[i].replace("<br>20","<BR>20");
				var strlist = droptime[i].split("<BR>");
		    	putHtml += "<tr style='border:1px solid white'><td style='width:50px; font-size: 12px; color:red;' rowspan='" + strlist.length*2 + "'>敵襲:" + numofenemy[i] + "</td></tr>";
				for( var j = 0; j < strlist.length; j++ ){
					putHtml += "<tr><td style='width:155px; border:solid 1px white;'>" + target[i]
							   + "<br><font color='yellow'>"
							   + strlist[j] + "</font></td></tr>";
				}
			}
			putHtml += "</table>" + "</div>";
		}
		$("oldStatusIcon").innerHTML = putHtml;

		return;
	}

	//--------------------//
	// 取得データのセット //
	//--------------------//
	var hidden = $v('//*[@id="hiddenData_viewStatus"]');
	hidden.snapshotItem(0).innerHTML = res.responseText;

	if( areatype[checkcount] != '領地' ){
		// 状況チェック
		var data = document.evaluate('//*[@id="hiddenData_viewStatus"]//table[@summary="敵襲"]//td[@colspan="7"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if( data == undefined || data == null ){
			return;
		}
		var dataE = document.evaluate('//*[@id="hiddenData_viewStatus"]//table[@summary="敵襲"]//td[@colspan="9"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if( dataE == undefined || dataE == null ){
			return;
		}
		var data2 = document.evaluate('//*[@id="hiddenData_viewStatus"]//input[@name="village"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if( data2 == undefined || data2 == null ){
			return;
		}
		if( basevillageid == "" ){
			for( var i = 0; i < data2.snapshotLength; i++ ){
				var villagename = trim(data2.snapshotItem(i).parentNode.textContent)
				if( villagename == basename ){
					var valuestr = trim(data2.snapshotItem(i).getAttribute("value"));
					if( valuestr != "" ){
						var villageurl = valuestr;
						var pos = villageurl.indexOf(".php?");
						var pos2 = villageurl.indexOf("&from");
						basevillageid = villageurl.substring(pos+5,pos2);
					}
				}
			}
		}

		droptime[checkcount] = "";
		for( var i = 0; i < data.snapshotLength/2; i++ ){
			var str = data.snapshotItem(i).innerHTML;
			var str2 = dataE.snapshotItem(i).innerHTML;
			var list = str2.match(/<a href="(.*)">(.*)<\/a>の<a href="(.*)">(.*)<\/a>(.*)/);
			str = str.substring(0,str.indexOf("&nbsp"));
			if( droptime[checkcount] != "" ){
				droptime[checkcount] += "<br>";
			}
			droptime[checkcount] += str + "<br><a href=\"" + list[1] + "\">" + list[2] + "</a>の<a href=\"" + list[3] + "\">" + list[5] + "</a>";
		}
	}
	else{
		// 状況チェック
		var data = document.evaluate('//*[@id="hiddenData_viewStatus"]//div[@id="enemy"]//td[@width="150"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if( data == undefined || data == null ){
			return;
		}
		var data2 = document.evaluate('//*[@id="hiddenData_viewStatus"]//div[@id="enemy"]//table[@summary="敵襲"]',
			document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if( data2 == undefined || data2 == null ){
			return;
		}

		for( var i = 0; i < data.snapshotLength; i++ ){
			var str = data.snapshotItem(i).innerHTML;
			var pos1 = str.indexOf("\">")+2;
			var pos2 = str.indexOf("</a>");
			str = str.substring(pos1,pos2);
/*
<th class="ttl3 w80">出兵元</th>
<td>
<a href="/user/?user_id=1195">チャグ馬</a>の<a href="../village_change.php?village_id=21859">新規砦2,42</a>(2,42)
</td>
</tr>
*/

			// 時間
			var str2 = data2.snapshotItem(i).innerHTML;
			pos1 = str2.indexOf("到着時刻");
			if( pos1 <= 0 ){
				break;
			}
			pos1 = pos1 + 14;

			pos2 = str2.indexOf("&nbsp");
			str2 = str2.substring(pos1,pos2);
			for( var j = 0; j < count; j++ )
			{
				if( targetName[j] == str ){
					droptime[j] = str2;
					break;
				}
			}
		}
	}

	var newpos = -1;
	for( var i = checkcount+1; i < count; i++ ){
		if( droptime[i] == "" ){
			newpos = i;
			break;
		}
	}
	if( newpos >= 0 ){
		checkcount = newpos;
		loadEnemyStatus(checkcount);
	}
	else{
		checkcount = count;
		loadEnemyStatus(checkcount);
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
