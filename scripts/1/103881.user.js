// ==UserScript==
// @name           bro3-StatLook
// @version        0.91
// @namespace      http://m21.3gokushi.jp/village.php
// @description    トレード画面で武将のステータスを表示します。
// @include        http://m*.3gokushi.jp/card/trade**
// ==/UserScript==
// ver 0.90 公開
// ver 0.91 ステ振り判断に、下一桁が０または５でない条件を追加
// ステ振りしていると推測される部分が赤色で表示されます。推測は完全ではありません。
(function () {
	function addGlovalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	var allCard = document.getElementsByClassName('thickbox');
	var allAtt = document.getElementsByClassName('status_att');
	var allInt = document.getElementsByClassName('status_int');
	var allWdef = document.getElementsByClassName('status_wdef');
	var allSdef = document.getElementsByClassName('status_sdef');
	var allBdef = document.getElementsByClassName('status_bdef');
	var allRdef = document.getElementsByClassName('status_rdef');
	var allSpeed = document.getElementsByClassName('status_speed');

	for (var i = 0; i < allCard.length; i++) {
		re = new RegExp("\.00");
		var colInt = "black";
		if (!allInt[i].innerHTML.match(re)) {
			colInt = "red";
		}
		if (Number(allInt[i].innerHTML) >= 30) {
			colInt = "red";
		}

		re = new RegExp("\.0");
		var colSpeed = "black";
		if (!allSpeed[i].innerHTML.match(re)) {
			colSpeed = "red";
		}
		if (Number(allSpeed[i].innerHTML) >= 15.1) {
			colSpeed = "red";
		}
		re = RegExp("[05]$");
		var colAtt = "black";
		if (!allAtt[i].innerHTML.match(re)) {
			colAtt = "red";
		}
		if (Number(allAtt[i].innerHTML) >= 1000) {
			colAtt = "red";
		}
		re = RegExp("[05]$");
		var colDef = "black";
		if ((!allWdef[i].innerHTML.match(re))|| (!allSdef[i].innerHTML.match(re))||(!allBdef[i].innerHTML.match(re))||(!allRdef[i].innerHTML.match(re))){
			colDef = "red";
		}
		if (Number(allWdef[i].innerHTML) >= 1000 || Number(allSdef[i].innerHTML) >= 1000 || Number(allBdef[i].innerHTML) >= 1000 || Number(allRdef[i].innerHTML) >= 1000) {
			colDef = "red";
		}
		tmpStr = '<br>' + '<font color=\"' + colAtt + '\">' + '攻撃: ' + allAtt[i].innerHTML + '</font>' + '\n' + 
		'<font color=\"' + colInt + '\">' + '知力: ' + allInt[i].innerHTML + '</font>' + '<br>' + 
		'<font color=\"' + colDef + '\">' + '歩防: ' + allWdef[i].innerHTML + '\n' + '槍防: ' + allSdef[i].innerHTML + '<br>' + 
		'弓防: ' + allBdef[i].innerHTML + '\n' + '騎防: ' + allRdef[i].innerHTML + '</font>' + '<br>' + 
		'<font color=\"' + colSpeed + '\">' + '移速: ' + allSpeed[i].innerHTML + '</font>';
		newElement = document.createElement('span');
		newElement.setAttribute('style', 'font-size:8pt');
		newElement.innerHTML = tmpStr;
		allCard[i].appendChild(newElement);
	}
})();
