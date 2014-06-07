// ==UserScript==
// @name           bro3-DonateStat
// @version        0.20
// @namespace      http://m21.3gokushi.jp/village.php
// @description    同盟の寄付の合計などの情報を表示。別ツールとの干渉を防ぐために、アラートで情報を返す。
// @include        http://m21.3gokushi.jp/alliance/info.php?id*
// ==/UserScript==
// ver 0.20 同盟内公開
(function () {
	tmpXpath = '/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[2]/td';
	a = document.evaluate(tmpXpath, document, null, 7, null);
	alName=a.snapshotItem(0).textContent;
	tmpXpath ='/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[4]/td';
	a = document.evaluate(tmpXpath, document, null, 7, null);
	alMemNum=a.snapshotItem(0).textContent;
	tmpXpath ='/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr[4]/td[2]';
	a = document.evaluate(tmpXpath, document, null, 7, null);
	alLv=a.snapshotItem(0).textContent;
//	alert(alName+', '+alMemNum+'人, '+'Lv:'+alLv);
	
	myD = new Date();
	timeStr=(myD.getYear()+1900)+'-'+(myD.getMonth()+1)+'-'+myD.getDate()+' '+
	myD.getHours()+':'+myD.getMinutes()+':'+myD.getSeconds();
	
	tmpXpath ='/html/body/div/div[3]/div[2]/div[2]/div/div/table[2]/tbody';
	a=document.evaluate(tmpXpath, document, null, 7, null);
	tbody=a.snapshotItem(0);
//	alert(tbody.rows[0].cells[0].firstChild.data);
//	alert(tbody.rows.length);
	var donateAll=0;
	for (var i = 0; i < alMemNum; i++) {
		donateAll+=Number(tbody.rows[i+2].cells[3].firstChild.data);
	}
	alert(timeStr+', '+alName+', '+alMemNum+'人, '+'Lv:'+alLv+', 寄付合計:'+donateAll);
	
})();
