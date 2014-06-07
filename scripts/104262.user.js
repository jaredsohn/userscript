// ==UserScript==
// @name           bro3-getMultiPageInTrade
// @version        0.21
// @namespace      http://m21.3gokushi.jp/village.php
// @description    トレード画面で複数の画面の情報をまとめて表にします。まとめた表の画面ではソートができませんので、あらかじめソートをしておいてください。連続使用や大データの一括取得を禁止する設定にしてあります。まだバグがあります。
// @include        http://m21.3gokushi.jp/card/trade.php*
// ==/UserScript==
// ver 0.20 限定公開　容易に攻撃スクリプトになるため、デフォルトではmixi21-24サーバ専用とする。
// ver 0.21 検索後に画面表示できるようにした
(function () {

	var herePlace;
	var tmpXpath, allRarerity, allLv, allScore,allSuggestedprice,allBidnum,allReleaseday;
	var allSkill1, allSkill2, allSkill3;
	var tmpStr;
	var a;

	tmpStr='';
	function getBusyoData(page){
	var tmpStr='';

	herePlace=document;
	herePlace.body.innerHTML=page.responseText;
	for (var i=2;i<22;i++){
	var tmpXpath='/html/body/div/div[3]/div[2]/div[2]/div/div/div/form/div/table/tbody/tr['+i+']';
	var a=herePlace.evaluate(tmpXpath, herePlace, null, 7, null);
	if (a.snapshotItem(0)){
	var tmpTableIn=a.snapshotItem(0).innerHTML;

	tmpStr=tmpStr+"<tr>"+tmpTableIn+"</tr>";
	}else{break;}
	}
	return tmpStr;
	
}


	var tmpHref=location.href;
	var tmpHref1=String(tmpHref).match(/http.*.php/gi);
//	alert(tmpHref1);
	var tmpHref2=String(tmpHref).match(/php.*$/gi);
	tmpHref2=String(tmpHref2).replace(/php/gim,'');
	tmpHref2=String(tmpHref2).replace(/#ptop/gim,'');
	tmpHref2=String(tmpHref2).replace(/^\?/gim,'');
	tmpHref2=String(tmpHref2).replace(/p=[0-9]*&/gim,'');
//	alert(tmpHref2);

	tmpXpath='/html/body/div/div[3]/div[2]/div[2]/div/div/div/form/div/div';
	a=document.evaluate(tmpXpath, document, null, 7, null);
	var button1 = document.createElement("input");
	button1.type = "button";
	button1.id = "ckButton1";
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "16px";
	button1.value = "2画面抽出";
//	button1.addEventListener("click", function() {loadPage(2)}, true);
	a.snapshotItem(0).parentNode.insertBefore(button1, a.snapshotItem(0).nextSibling);
//	alert(tmpHref1+'?p='+2+'&'+tmpHref2);

	var maxI,tmpI;
	for (var i=1; i<12;i++){
	tmpXpath='/html/body/div/div[3]/div[2]/div[2]/div/div/div/form/div/ul/li['+(i+1)+']';
	a=document.evaluate(tmpXpath, document, null, 7, null);
		if(a.snapshotItem(0)){
	tmpI=String(a.snapshotItem(0).innerHTML).match(/>[0-9]*</gi);
	tmpI=String(tmpI).match(/[0-9]*/g);
	tmpI=String(tmpI).replace(/,/g,'');
//	alert(a.snapshotItem(0).innerHTML);
//	alert(String(tmpI));
	if (tmpI==String(i)){maxI=i;}else{maxI=i-1;break;}
		}else{maxI=1;}
	}
//	alert(maxI);

	button1.value = maxI+"画面抽出";
	button1.addEventListener("click", function() {loadPageWrapper(1)}, true);
	if(maxI=='0'){
	button1.value = "使用不可";
	button1.disabled='true';}

function loadPageWrapper(flag){
	if(flag){loadPage(maxI);}
}

function loadPage(targetPageNo) {
	if (targetPageNo==0){
		tmpHeader='<tr class="tradeTop"><th>カードNo.</th><th>武将名</th><th>Lv.</th><th>所持スキル</th>'+
			'<th>スコア</th><th>落札希望価格</th><th>入札数</th><th>強制公開期限</th><th>&nbsp;</th></tr>';
		var tmpXpath2='/html/body/div/div[3]/div[2]/div[2]/div/div/div/form/div/table/tbody';
		var b=document.evaluate(tmpXpath2, document, null, 7, null);
		b.snapshotItem(0).innerHTML=tmpHeader+tmpStr;
	tmpXpath='/html/body/div/div[3]/div[2]/div[2]/div/div/div/form/div/div';
	a=document.evaluate(tmpXpath, document, null, 7, null);
	var button1 = document.createElement("input");
	button1.type = "button";
	button1.id = "ckButton1";
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "16px";
	button1.value = "連続使用抑制";
	button1.disabled='true';

	a.snapshotItem(0).parentNode.insertBefore(button1, a.snapshotItem(0).nextSibling);

	var scr1 = document.createElement("script");
//	scr1.innerHTML='<script src="/20110531-01/extend_project/w760/js/thickbox/thickbox.js" type="text/javascript">';
	scr1.src='/20110531-01/extend_project/w760/js/thickbox/thickbox.js';
	scr1.type='text/javascript';
	a.snapshotItem(0).parentNode.insertBefore(scr1, a.snapshotItem(0).nextSibling);


    		return 0;
  	}
	var opt = {
		method: 'get',
		url: tmpHref1+'?p='+targetPageNo+'&'+tmpHref2,
		onload: function(res) {
//			alert(tmpHref1+'?p='+targetPageNo+'&'+tmpHref2);
			tmpStr=getBusyoData(res)+tmpStr;
			loadPage(targetPageNo-1);
		}
	}
	GM_xmlhttpRequest(opt);
}

})();
