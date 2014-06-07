// ==UserScript==
// @name         bro3_Send_Mail_Supporter
// @namespace    http://at-n2.net/
// @description  ブラウザ三国志 書簡送信アシスタントスクリプト By nottisan
// @include      http://*.3gokushi.jp/message/new.php*
// @include      http://*.3gokushi.jp/false/login_sessionout.php*
// @include      http://*.3gokushi.jp/message/outbox.php*
// @include      http://*.1kibaku.jp/message/new.php*
// @include      http://*.1kibaku.jp/false/login_sessionout.php*
// @include      http://*.1kibaku.jp/message/outbox.php*
// ==/UserScript==

// 開発にご協力感謝致します。
// irc2_yu 様  mattun 様


//2011.03.30 リンク表示位置の修正。（Autobilderと同じようにコピーライト横に表示）
//2011.04.01 リンク表示位置の修正。（書簡の新規作成画面のメニュー横に表示）

//グローバル変数
var VERSION = "0.4.1β";  //バージョン情報
var INTERVAL=1000;  //負荷対策 回線速度によっては正常動作しない時があります。その際は数値を増やしてください。1秒=1000
var HOST = location.hostname; //アクセスURLホスト
var PGNAME = "_MailSendSuppoter_"; //グリモン領域への保存時のPGの名前
var DELIMIT = "#$%";
var DELIMIT2 = "&?@";

var SENDTFLG_NEW = 0;	//新規作成画面
var SENDTFLG_PRE = 1;	//確認画面
var SENDTFLG_END = 2;	//送信履歴画面
var SENDTFLG_CON = 3;	//新規作成画面連続送信中

var ADDRESSCNT = 36; //アドレス帳のカウント(ソース変更必須)


var d = document;


//Main
(function(){
	//操作ボックスの表示リンク追加
	addOpenLinkHtml();
	//通常の送信時に書簡をバックアップする。
	document.forms[0].elements[5].addEventListener("click", function(){ SubjectSave();BodySave();}, false);
	//送信状況の取得
	var Send_Flg = GM_getValue(HOST + PGNAME + "Send_Flg", SENDTFLG_NEW);
	GM_log("Main() Send_Flg=" + Send_Flg);
	//プレビュー時
	if (Send_Flg == SENDTFLG_PRE) {
		openSupportBox();
		var objtextTo = document.getElementsByName("to");
		if (objtextTo[0].type == "hidden"){
			GM_setValue(HOST + PGNAME + "Send_Flg", SENDTFLG_END);
			//document.forms[0].elements[4].click();
			//var tid=setTimeout(function(){document.forms[0].elements[4].click();},INTERVAL);
			var tid=setTimeout(function(){btn=document.getElementById("btn_send");btn.disabled=true;setHiddenValue(btn);btn.form.submit();},INTERVAL);
		}else{
			GM_setValue(HOST + PGNAME + "Send_Flg", SENDTFLG_NEW);
			alert("送信しようとしましたが、エラーで出来ませんでした。");
			return;
		}
	}
	//送信終了時(送信履歴)
	if (Send_Flg == SENDTFLG_END) {
		//openSupportBox();
		GM_setValue(HOST + PGNAME + "Send_Flg", SENDTFLG_CON);
		var tid=setTimeout(function(){location.href = "/message/new.php#ptop";},INTERVAL);
	}
	//連続送信中(新規作成画面)
	if (Send_Flg == SENDTFLG_CON) {
		OneAddressFlgDel();
		openSupportBox();
		//次の送信があるかチェック
		if(SendConti()){
			GM_setValue(HOST + PGNAME + "Send_Flg", SENDTFLG_PRE);
			var tid=setTimeout(function(){document.forms[0].elements[5].click();},INTERVAL);
		}
	}
	//セッションタイムアウト画面
	if (location.pathname == "/false/login_sessionout.php") {
		if (Send_Flg != SENDTFLG_NEW) {
			alert("送信途中でセッションタイムアウトになりました。\n書簡の送信履歴でどこまで送信されているかチェックし\n再度送信してください。");
			GM_setValue(HOST + PGNAME + "Send_Flg", SENDTFLG_NEW);
		}
	}
})();
//送信したアドレスのフラグを消す。
function OneAddressFlgDel(){
	var arrylist = GetSendAddress();
	var arrynewlist ="";
	var SendFLg = true;
	for (var i=0; i < ADDRESSCNT; i++){
		if (arrylist[i] != undefined) {
			if (arrylist[i] != "") {
				GM_log("OneAddressFlgDel() SendFLg=" + SendFLg);
				if (arrylist[i].split(DELIMIT2)[2] == 1 && SendFLg == true){
				GM_log("OneAddressFlgDel() if SendFLg=" + SendFLg);
					arrynewlist += arrylist[i].split(DELIMIT2)[0] + DELIMIT2;
					arrynewlist += arrylist[i].split(DELIMIT2)[1] + DELIMIT2;
					arrynewlist += "0" + DELIMIT;
					SendFLg = false;
				}else{
				GM_log("OneAddressFlgDel() else SendFLg=" + SendFLg);
					arrynewlist += arrylist[i].split(DELIMIT2)[0] + DELIMIT2;
					arrynewlist += arrylist[i].split(DELIMIT2)[1] + DELIMIT2;
					arrynewlist += arrylist[i].split(DELIMIT2)[2] + DELIMIT;
				}
			}
		}
	}
	GM_log("OneAddressFlgDel() arrynewlist=" + arrynewlist);
	GM_setValue(HOST + PGNAME + "addresslist", arrynewlist);
}
//送信開始
function SendConti(){
	//アドレスチェック
	var chkret = AdressCheck();
	if (chkret == false){
		GM_setValue(HOST + PGNAME + "Send_Flg", SENDTFLG_NEW);
		alert("送信が完了しました。\n送信履歴で送信されてるか確認してください。");
		var tid=setTimeout(function(){location.href = "/message/outbox.php";},0);
		return false;
	}

	//送信内容の読込み
	SubjectLoad();
	BodyLoad();
	//送信先のチェック保存
	var arrylist = GetSendAddress();
	var arryflg = new Array();
	for (var i = 0; i < ADDRESSCNT; i++) {
		var objChk = document.getElementById("chk" + i);
		arryflg[i] = false;
		if(objChk.checked == true){
			arryflg[i] = true;
		}
	}
	GM_log("SendConti() arryflg=" + arryflg);
	ChkSendAddress(arryflg);

	var ret = SetSendAddress();
	return true;
}
//リンクHTML追加
function addOpenLinkHtml() {
/*
//	var sidebar = d.evaluate('//*[@id="statusIcon"]', d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var sidebar = d.evaluate('//*[@class="copyright"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	//alert(sidebar.snapshotLength);
//	if (sidebar.snapshotLength == 0) return;
 	if (sidebar.snapshotLength == 0)
        {
//	    sidebar = d.evaluate('//*[@id="navi01"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//	    sidebar = d.evaluate('//*[@id="sidebar"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	    sidebar = d.evaluate('//*[@id="status_left"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if (sidebar.snapshotLength == 0) return;
	    isMixi = false;
	}
	
	//自動移動リンク
	var openLink = document.createElement("a");
	openLink.id = "AutoMoveLink";
	openLink.href = "javascript:void(0);";
	openLink.innerHTML = "  書簡送信サポート  ";
	openLink.style.color = "#000000";
	openLink.addEventListener("click", function() {openSupportBox()}, true);
	sidebar.snapshotItem(0).appendChild(openLink);
*/
	//var lastmenu = d.evaluate('//*[@id="statMenu"]/li[@class="last"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	//lastmenu.className = 'test';

	var menu = d.evaluate('//*[@id="statMenu"]',d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	//alert(menu.snapshotLength);
	if (menu.snapshotLength == 0){GM_log("bro3_send_mail_supporter: htmlが変わってます。判る人は170行目付近のソースを書き換えてください。");return;}
	
	var newmenu = d.createElement("li");
	newmenu.className = "last";
	//メニューリンク
	var openLink = document.createElement("a");
	openLink.id = "AutoMoveLink";
	openLink.href = "javascript:void(0);";
	openLink.innerHTML = "  書簡送信サポート  ";
	openLink.addEventListener("click", function() {openSupportBox()}, true);
	newmenu.appendChild(openLink);
	menu.snapshotItem(0).appendChild(newmenu);
}

//ベースフォームを開く
function openSupportBox() {
	closeSupportBox();
	addSupportHtml();
}
//ベースフォームを閉じる
function closeSupportBox() {
	deleteSupportHtml();
	closeSupportAddressBox();
}
//ベースフォーム表示HTML削除
function deleteSupportHtml() {
	var elem = document.getElementById("SuppContainer");
	if (elem == undefined) return;
	document.body.removeChild(document.getElementById("SuppContainer"));
}

//宛先追加フォームを開く
function openSupportAddressBox() {
	closeSupportAddressBox();
	addSupport_AddressHtml();
}
//宛先追加フォームを閉じる
function closeSupportAddressBox() {
	deleteSupportAddressHtml();
}
//宛先追加HTML削除
function deleteSupportAddressHtml() {
	var elem = document.getElementById("SuppAddresContainer");
	if (elem == undefined) return;
	document.body.removeChild(document.getElementById("SuppAddresContainer"));
}

//ベースフォーム表示HTML追加
function addSupportHtml() {

	var popupLeft = GM_getValue(HOST + "popup_Suppleft", 0);
	var popupTop = GM_getValue(HOST + "popup_Supptop", 0);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;
	
	//表示コンテナ作成
	var SuppContainer = document.createElement("div");
	SuppContainer.id = "SuppContainer";
	SuppContainer.style.position = "absolute";
	SuppContainer.style.backgroundColor = "darkgray";
	SuppContainer.style.border = "outset 2px darkgray";
	SuppContainer.style.left = popupLeft + "px";
	SuppContainer.style.top = popupTop + "px";
	SuppContainer.style.fontSize = "10px";
	SuppContainer.style.padding = "3px";
	SuppContainer.style.zIndex = 253;
	document.body.appendChild(SuppContainer);
	
	//閉じるリンク
	var closeLink = document.createElement("a");
	closeLink.id = "timerCloseLink";
	closeLink.href = "javascript:void(0);";
	closeLink.style.margin = "3px";
	closeLink.innerHTML = "閉じる";
	closeLink.addEventListener("click", function() {closeSupportBox()}, true);
	SuppContainer.appendChild(closeLink);
	
	//バージョン
	var version = document.createElement("span");
	version.style.fontSize = "9px";
	version.style.margin = "3px";
	version.innerHTML = "Ver." + VERSION;
	SuppContainer.appendChild(version);
	
	//入力項目の作成
	var table = document.createElement("div");
	table.innerHTML = <>
	<table width="930" border="1" cellspacing="0" cellpadding="10">
	  <tr>
	    <td colspan='6' style="text-align:center" width="750">宛先</td>
	    <td style="text-align:center" width="180">件名</td>
	  </tr>
	  <tr>
	    <td rowspan="3" width="125">
	      <input id="chk0" type="checkbox" /><span id="chk_name0"></span><br />
	      <input id="chk1" type="checkbox" /><span id="chk_name1"></span><br />
	      <input id="chk2" type="checkbox" /><span id="chk_name2"></span><br />
	      <input id="chk3" type="checkbox" /><span id="chk_name3"></span><br />
	      <input id="chk4" type="checkbox" /><span id="chk_name4"></span><br />
	      <input id="chk5" type="checkbox" /><span id="chk_name5"></span>
	    </td>
	    <td rowspan="3" width="125">
	      <input id="chk6" type="checkbox" /><span id="chk_name6" /><br />
	      <input id="chk7" type="checkbox" /><span id="chk_name7" /><br />
	      <input id="chk8" type="checkbox" /><span id="chk_name8" /><br />
	      <input id="chk9" type="checkbox" /><span id="chk_name9" /><br />
	      <input id="chk10" type="checkbox" /><span id="chk_name10" /><br />
	      <input id="chk11" type="checkbox" /><span id="chk_name11" />
	    </td>
	    <td rowspan="3" width="125">
	      <input id="chk12" type="checkbox" /><span id="chk_name12"></span><br />
	      <input id="chk13" type="checkbox" /><span id="chk_name13"></span><br />
	      <input id="chk14" type="checkbox" /><span id="chk_name14"></span><br />
	      <input id="chk15" type="checkbox" /><span id="chk_name15"></span><br />
	      <input id="chk16" type="checkbox" /><span id="chk_name16"></span><br />
	      <input id="chk17" type="checkbox" /><span id="chk_name17"></span>
	    </td>
	    <td rowspan="3" width="125">
	      <input id="chk18" type="checkbox" /><span id="chk_name18"></span><br />
	      <input id="chk19" type="checkbox" /><span id="chk_name19"></span><br />
	      <input id="chk20" type="checkbox" /><span id="chk_name20"></span><br />
	      <input id="chk21" type="checkbox" /><span id="chk_name21"></span><br />
	      <input id="chk22" type="checkbox" /><span id="chk_name22"></span><br />
	      <input id="chk23" type="checkbox" /><span id="chk_name23"></span>
	    </td>
	    <td rowspan="3" width="125">
	      <input id="chk24" type="checkbox" /><span id="chk_name24"></span><br />
	      <input id="chk25" type="checkbox" /><span id="chk_name25"></span><br />
	      <input id="chk26" type="checkbox" /><span id="chk_name26"></span><br />
	      <input id="chk27" type="checkbox" /><span id="chk_name27"></span><br />
	      <input id="chk28" type="checkbox" /><span id="chk_name28"></span><br />
	      <input id="chk29" type="checkbox" /><span id="chk_name29"></span>
	    </td>
	    <td rowspan="3" width="125">
	      <input id="chk30" type="checkbox" /><span id="chk_name30"></span><br />
	      <input id="chk31" type="checkbox" /><span id="chk_name31"></span><br />
	      <input id="chk32" type="checkbox" /><span id="chk_name32"></span><br />
	      <input id="chk33" type="checkbox" /><span id="chk_name33"></span><br />
	      <input id="chk34" type="checkbox" /><span id="chk_name34"></span><br />
	      <input id="chk35" type="checkbox" /><span id="chk_name35"></span>
	    </td>
	    <td style="text-align:center">
	      <input id='btn_mail_getSubject' type='button' value='件名保存' />
	      <input id='btn_mail_setSubject' type='button' value='件名読込' />
	      <input id='btn_mail_preSubject' type='button' value='保存中の件名表示' />
	    </td>
	  </tr>
	  <tr>
	    <td style="text-align:center">本文(@@@name@@@=正式名称に置換)</td>
	  </tr>
	  <tr>
	    <td style="text-align:center">
	      <input id='btn_mail_getBody' type='button' value='本文保存' />
	      <input id='btn_mail_setBody' type='button' value='本文読込' />
	      <input id='btn_mail_preBody' type='button' value='保存中の本文表示' />
	    </td>
	  </tr>
	    <tr>
	    <td colspan='6' style="text-align:center">
	    <input id='btn_mail_add_list' type='button' value='宛先追加' />
	    <input id='btn_mail_del_list' type='button' value='宛先削除' /> 　　
	    <input id='btn_Adress_checkALL' type='button' value='CheckALL' /> 　　
	    <input id='btn_send_start' type='button' value='送信開始' /></td>
	    <td style="text-align:center"><input id='btn_cls_sub_body' type='button' value='保存件名・本文削除' /></td>
	  </tr>
	</table>
	</>;
	SuppContainer.appendChild(table);

	var arrylist = GetSendAddress();
	var ad = new Array();
	for (var i = 0; i < ADDRESSCNT; i++) {
		if (arrylist[i] !=undefined){
			if (arrylist[i] != "") {
			ad = arrylist[i].split(DELIMIT2);
			var chk_name = document.getElementById("chk_name" + i);
			chk_name.innerHTML = ad[0] + chk_name.innerHTML;
			if (ad[2] != 0) {
				var chkbox = document.getElementById("chk" + i);
				chkbox.checked = true;
			}
			}else{
				var chkbox = document.getElementById("chk" + i);
				chkbox.disabled = true;
			}
		}else{
			var chkbox = document.getElementById("chk" + i);
			chkbox.disabled = true;
		}
	}

	//件名○○ボタンへのイベント登録
	document.getElementById('btn_mail_getSubject').addEventListener("click",function() { SubjectSave(); }, true);
	document.getElementById('btn_mail_setSubject').addEventListener("click",function() { SubjectLoad(); }, true);
	document.getElementById('btn_mail_preSubject').addEventListener("click",function() { SubjectPreview(); }, true);

	//本文○○ボタンへのイベント登録
	document.getElementById('btn_mail_getBody').addEventListener("click",function() { BodySave(); }, true);
	document.getElementById('btn_mail_setBody').addEventListener("click",function() { BodyLoad(); }, true);
	document.getElementById('btn_mail_preBody').addEventListener("click",function() { BodyPreview(); }, true);
	//保存件名・本文削除
	document.getElementById('btn_cls_sub_body').addEventListener("click",function() { Cls_Sub_Body(); }, true);

	//宛先○○ボタンへのイベント登録
	document.getElementById('btn_mail_add_list').addEventListener("click",function() { openSupportAddressBox(); }, true);
	document.getElementById('btn_mail_del_list').addEventListener("click",function() { DellSupportAddress(); }, true);

	//アドレス全部へのチェック
	document.getElementById('btn_Adress_checkALL').addEventListener("click",function() { Adress_checkALL(); }, true);
	//送信開始ボタンへのイベント登録
	document.getElementById('btn_send_start').addEventListener("click",function() { SendStert(); }, true);
}

function Adress_checkALL(){
	for (var i = 0; i < ADDRESSCNT; i++) {
		var objChk = document.getElementById("chk" + i);
		if (objChk.disabled != true){
			if (objChk.checked != true){
				objChk.checked = true;
			}else{
				objChk.checked = false;
			}
		}
	}
}

//送信開始
function SendStert(){
	//アドレスチェック
	var chkret = AdressCheck();
	if (chkret == false){
		alert("送信先をチェックしてください。\n下のフォームの送信先に入力されても送信されません。");
		return;
	}
	//入力チェック
	var objtextsub = document.getElementsByName("subject");
	var objtextbody = document.getElementsByName("body");
	if (objtextsub[0].value == "" || objtextbody[0].value == "") {
		alert("件名・本文ともに入力してください。");
		return;
	}
	var ret = confirm("件名＆本文を保存し、送信を開始します。");
	if (ret == true) {
		//送信内容の保存
		SubjectSave();
		BodySave();
		//送信先のチェック保存
		var arrylist = GetSendAddress();
		var arryflg = new Array();
		for (var i = 0; i < ADDRESSCNT; i++) {
			var objChk = document.getElementById("chk" + i);
			arryflg[i] = false;
			if(objChk.checked == true){
				arryflg[i] = true;
			}
		}
		ChkSendAddress(arryflg);
	}
	var ret = SetSendAddress();
	GM_setValue(HOST + PGNAME + "Send_Flg", SENDTFLG_PRE);
	//alert(document.forms[0].elements[5].value);
	document.forms[0].elements[5].click();
}

//宛先アドレスへフラグのセット
function ChkSendAddress(arryflg) {
	var arrylist = GetSendAddress();
	var arrynewlist ="";
	for (var i=0; i < ADDRESSCNT; i++){
		if (arryflg[i] == false){
			if (arrylist[i] != undefined) {
				if (arrylist[i] != "") {
					arrynewlist += arrylist[i].split(DELIMIT2)[0] + DELIMIT2;
					arrynewlist += arrylist[i].split(DELIMIT2)[1] + DELIMIT2;
					arrynewlist += "0" + DELIMIT;
				}
			}
		}else{
			if (arrylist[i] != undefined) {
				if (arrylist[i] != "") {
					arrynewlist += arrylist[i].split(DELIMIT2)[0] + DELIMIT2;
					arrynewlist += arrylist[i].split(DELIMIT2)[1] + DELIMIT2;
					arrynewlist += "1" + DELIMIT;	//送信フラグのセット
				}
			}
		}
	}
	GM_setValue(HOST + PGNAME + "addresslist", arrynewlist);
}
//送信先がチェックされているかどうか
function AdressCheck() {
	for (var i = 0; i < ADDRESSCNT; i++) {
		var objChk = document.getElementById("chk" + i);
		if(objChk.checked == true){
			return true;
		}
	}
	return false;
}
//送信アドレスのセット 返値 true=送信可能 false=送信リスト終了
function SetSendAddress(){
	var arrylist = GetSendAddress();
	for (var i = 0; i < ADDRESSCNT; i++){
	GM_log("Main() arrylist[i]=" + arrylist[i]);
		if (arrylist[i] != undefined) {
			if (arrylist[i] != "") {
				if (arrylist[i].split(DELIMIT2)[2] == 1){
					var objtextTo = document.getElementsByName("to");
					objtextTo[0].value = arrylist[i].split(DELIMIT2)[0];
					var objtextBody = document.getElementsByName("body");
					objtextBody[0].value = objtextBody[0].value.replace("@@@name@@@", arrylist[i].split(DELIMIT2)[1]);
					return true;
				}
			}
		}
	}
	return false;
}

//宛先追加フォームHTML追加
function addSupport_AddressHtml() {
	var arrylist = GetSendAddress();

	if (arrylist[0] != undefined){
		if (arrylist.length == ADDRESSCNT+1){
			alert("これ以上追加できません。");
			return;
		}
	}
	var popupLeft = GM_getValue(HOST + "popup_SuppAdleft", 150);
	var popupTop = GM_getValue(HOST + "popup_SuppAdtop", 150);
	if (popupLeft < 0) popupLeft = 0;
	if (popupTop < 0) popupTop = 0;
	
	//表示コンテナ作成
	var SuppContainer = document.createElement("div");
	SuppContainer.id = "SuppAddresContainer";
	SuppContainer.style.position = "absolute";
	SuppContainer.style.backgroundColor = "darkgray";
	SuppContainer.style.border = "outset 2px darkgray";
	SuppContainer.style.left = popupLeft + "px";
	SuppContainer.style.top = popupTop + "px";
	SuppContainer.style.fontSize = "10px";
	SuppContainer.style.padding = "3px";
	SuppContainer.style.zIndex = 253;
	document.body.appendChild(SuppContainer);
	
	
	//入力項目の作成
	var table = document.createElement("div");
	table.innerHTML = <>
	<table border="1" cellspacing="1" cellpadding="10">
	  <tr>
	    <td>
	      宛先の追加 ※@は<font color="red">半角</font>でお願いします。※<br />
	      ※宛先名@@@正式名称(nottisan@@@呉越同舟 支部担当 nottisan様)<br />
	    </td>
	  </tr>
	  <tr>
	    <td>
	      <input id="inAddress" type="text" value="" size="65" /><br />
	    </td>
	  </tr>
	  <tr>
	    <td style="text-align:center">
	      <input id='btn_add_ad' type='button' value='宛先保存' />
	      <input id='btn_add_ad_close' type='button' value='閉じる' />
	    </td>
	  </tr>
	</table>
	</>;
	SuppContainer.appendChild(table);

	//ボタンへのイベント登録
	document.getElementById('btn_add_ad').addEventListener("click",function() { SaveAddress(); }, true);
	document.getElementById('btn_add_ad_close').addEventListener("click",function() { closeSupportAddressBox(); }, true);

}
//宛先の削除＆保存、基本フォームのリフレッシュ
function DellSupportAddress() {
	var arrylist = GetSendAddress();
	var arryflg = new Array();
	for (var i = 0; i < ADDRESSCNT; i++) {
		var objChk = document.getElementById("chk" + i);
		arryflg[i] = false;
		if(objChk.checked == true){
			var ret = confirm(arrylist[i].split(DELIMIT2)[0] + "を削除します。");
			if (ret == true) arryflg[i] = true;
		}
	}
	DelSendAddress(arryflg);
	openSupportBox();
}
//宛先アドレスの削除
function DelSendAddress(arryflg) {
	var arrylist = GetSendAddress();
	var arrynewlist =""
	for (var i=0; i < ADDRESSCNT; i++){
		if (arryflg[i] == false){
			if (arrylist[i] != undefined) {
				if (arrylist[i] != "") {
					arrynewlist += arrylist[i] + DELIMIT;
				}
			}
		}
	}
	GM_setValue(HOST + PGNAME + "addresslist", arrynewlist);
}

//宛先の保存後、基本フォームのリフレッシュ
function SaveAddress() {
	var inAddress = document.getElementById('inAddress').value;
	if (inAddress.split("@@@").length < 1){
		alert("書式通りに入力してください。");
		return;
	}
	if (inAddress.length == 0){
		alert("宛先を入力してください。");
		return;
	}
	inAddress = inAddress.replace("@@@",DELIMIT2) + DELIMIT2 + "0";
	var addreslist = GM_getValue(HOST + PGNAME + "addresslist", "");
	addreslist += inAddress + DELIMIT;
	GM_setValue(HOST + PGNAME + "addresslist", addreslist);
	openSupportBox();
	openSupportAddressBox();
}
//件名保存
function SubjectSave() {
	var objtextsub = document.getElementsByName("subject");
	var textsub = objtextsub[0].value;
	GM_setValue(HOST + PGNAME + "SendSubject", textsub);
}
//件名読込み
function SubjectLoad() {
	var textsub = GM_getValue(HOST + PGNAME + "SendSubject", "");
	var objtextsub = document.getElementsByName("subject");
	objtextsub[0].value = textsub;
}
//件名プレビュー
function SubjectPreview() {
	var textsub = GM_getValue(HOST + PGNAME + "SendSubject", "");
	alert(textsub);
}


//本文保存
function BodySave() {
	var objtextbody = document.getElementsByName("body");
	var textbody = objtextbody[0].value;
	GM_setValue(HOST + PGNAME + "SendBody", textbody);
}
//本文読込み
function BodyLoad() {
	var textbody = GM_getValue(HOST + PGNAME + "SendBody", "");
	var objtextbody = document.getElementsByName("body");
	objtextbody[0].value = textbody;
}
//本文プレビュー
function BodyPreview() {
	var textbody = GM_getValue(HOST + PGNAME + "SendBody", "");
	alert(textbody);
}

//件名・本文保存の削除
function Cls_Sub_Body() {
	GM_setValue(HOST + PGNAME + "SendSubject", "");
	GM_setValue(HOST + PGNAME + "SendBody", "");
}

//アドレスの取得(名前)
function GetSendAddress(){
	var addreslist = GM_getValue(HOST + PGNAME + "addresslist", "");
	if (addreslist.length < 1 ) return "";
	var ArryList = new Array();
	ArryList = addreslist.split(DELIMIT);
	return 	ArryList;
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
//デリミタ区切りアドレス文字列生成（宛先：dataArray,正式名称：dataArray2,チェックフラグ：dataArray3, delimiter
function genDelimitString_Adoress(dataArray,dataArray2,dataArray3, delimiter) {
	var ret = "";
	for (var i=0; i < dataArray.length; i++) {
		if (dataArray[i] != undefined) ret += dataArray[i];
		if (i < dataArray.length-1) ret += delimiter;
	}
	return ret;
}

function setHiddenValue(a){
if(a.name){hid=document.createElement("input");
hid.type="hidden";
hid.name=a.name;
hid.value=a.value;
a.form.appendChild(hid);
}}