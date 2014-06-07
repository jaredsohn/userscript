// ==UserScript==
// @name           bro3_領地画面から領地名を変更
// @namespace      http://chaki.s27.xrea.com/br3/
// @include        http://*.3gokushi.jp/land.php*
// @description    ブラウザ三国志 領地画面から領地名を変更 by きの。
// @author         kino.
// @version        1.00
// @icon	   http://chaki.s27.xrea.com/br3/icon.png
// ==/UserScript==

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

var host = location.hostname;
var path = location.pathname;

var tMenu = document.getElementById("tMenu");
var xy = document.getElementsByClassName("xy");
xy.item(0).innerHTML.match(/\(([\S]*),([\S]*)\)/);
var x = RegExp.$1
var y = RegExp.$2
var basename = document.getElementsByClassName("basename").item(0).innerHTML;

if( (tMenu.innerHTML.indexOf("レベルアップ")!=-1) || (tMenu.innerHTML.indexOf("拠点")!=-1) || (tMenu.innerHTML.indexOf("破棄")!=-1) ){
	var chgnmlnk = document.createElement("a");
	chgnmlnk.href = "javascript:void(0);";
	chgnmlnk.innerHTML = "領地名の変更";
	chgnmlnk.addEventListener("click",function(){show_btn();},false);

	var chgnmtbx = document.createElement("input");
	chgnmtbx.id = "chgnm_txt";
	chgnmtbx.value = basename;
	chgnmtbx.type = "hidden";

	var chgnmbtn = document.createElement("input");
	chgnmbtn.type = "hidden";

	var area = document.createElement("div");
	tMenu.appendChild(area);

	area.appendChild(chgnmlnk);
	area.appendChild(chgnmtbx);
	area.appendChild(chgnmbtn);
}

function show_btn(){
	chgnmlnk.style.display = "none";
	chgnmtbx.type = "text";
	chgnmtbx.size = "15";
	chgnmbtn.type = "button";
	chgnmbtn.value = "変更";
	chgnmbtn.addEventListener("click",function(){chgname();},false);

	var profile = document.createElement("div");
	var url01 = "http://"+host+"/user/change/change.php#ptop";
	profile.innerHTML = getContentFromURL(url01);
	profile.id = "TempDOM01";
	profile.style.display = "none";
	document.body.appendChild(profile);

	var deck = document.createElement("div")
	var url02 = "http://"+host+"/card/deck.php";
	deck.innerHTML = getContentFromURL(url02);
	deck.id = "TempDOM02";
	deck.style.display = "none";
	document.body.appendChild(deck);
}

function chgname(){
	var new_name = document.getElementById("chgnm_txt").value;
	var position = "<td>"+x+","+y+"</td>";

	var table = '//*[@id="TempDOM01"]//*[@id="gray02Wrapper"]//*[@class="commonTables"]//tr';
	var tr = document.evaluate(table,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var input_name = "";
	for( var i=0; i < tr.snapshotLength; i++ ){
		if( tr.snapshotItem(i).innerHTML.indexOf(position) != -1 ){
			var input = document.evaluate(table+"["+(i+1)+"]//input",document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			input_name = input.name;
			break;
		}
	}

	if( input_name.length > 0 ){
		var add00 = '//*[@id="TempDOM01"]//*[@id="gray02Wrapper"]//form[@name="input_user_profile"]//input';
		var add01 = '//*[@id="TempDOM01"]//*[@id="gray02Wrapper"]//form[@name="input_user_profile"]//textarea';
		var add02 = '//*[@id="TempDOM02"]//*[@id="gray02Wrapper"]//*[@name="ssid"]';
		var input = document.evaluate(add00,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var textarea = document.evaluate(add01,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var ssid = document.evaluate(add02,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		var data = "ssid="+ssid.snapshotItem(0).value;
		for( var i = 0; i < textarea.snapshotLength; i++ ){
			data += "&" + textarea.snapshotItem(i).name + "=" + textarea.snapshotItem(i).innerHTML
		}
		for( var i = 0; i < input.snapshotLength; i++ ){
			if( (input.snapshotItem(i).type == "radio") && (input.snapshotItem(i).checked == false) ){
				continue;
			}
			data += "&";
			if( input.snapshotItem(i).name == input_name ){
				data += input_name + "=" + new_name;
			}else if( input.snapshotItem(i).name == "btn_preview"){
				data += "btn_send=更新"
			}else{
				data += input.snapshotItem(i).name + "=" + input.snapshotItem(i).value
			}
		}
		//alert(data)
		GM_xmlhttpRequest({
			method:"POST", 
			url:"http://" + host + "/user/change/change.php#ptop",
			headers:{"Content-type":"application/x-www-form-urlencoded"},
			data: data,
			onload:function(x){console.log(x.responseText);location.reload();}
		});
	}
}

//getContentFromURL関数
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

