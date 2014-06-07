// ==UserScript==
// @name            bro3_mixi_style
// @namespace       http://kirichat.blog.so-net.ne.jp/
// @description     ブラウザ三国志 mixiレイアウト変更 by 霧
// @description     ver 5.03b+5zen v1.10
// @include         http://m*.3gokushi.jp/*
// @version         5.03b+v1.10

// 奇行百出さんで配布されていたサイドバー復活ツールの勝手に改造版です。
// 運営の気まぐれな仕様変更があるとレイアウトが崩れます。
// ランキング枠が邪魔だったので非表示にしました。

// 2011.04.20 何故か30鯖で表示崩れていたので修正
// 2011.04.20 ついでにソースを大幅に簡略化してみました
// 2011.04.20 都市・全体地図 以外のレイアウト調整
// 2011.05.02 簡易出兵をサイドバーに移動
// 2011.05.03 BPTPCP表示の調整(処理変更のみで見た目は同じです）
// 2011.05.03 地図画面のマップ表示切替が最前面になっていたのを修正
// 2011.10.11 上部広告がうざいので削除
// 2011.10.24 下部広告がうざいので削除
// 2012.05.08 2012.05.08 メンテ対応、背景黒い
// ==/UserScript==

(function(){

	// ---- 広告消去 ----
	var adscrpt = xpath('//body/script', document);
	var len = adscrpt.snapshotLength;
	for(var i=0;i<len;i++){
		var dom_obj_parent = adscrpt.snapshotItem(i).parentNode;
		dom_obj_parent.removeChild(adscrpt.snapshotItem(i));
	}
	var ad = xpath('//div[@id="ADDSPACE"]', document);
	var len = ad.snapshotLength;
	for(var i=0;i<len;i++){
		var dom_obj_parent = ad.snapshotItem(i).parentNode;
		dom_obj_parent.removeChild(ad.snapshotItem(i));
	}
	var adscrpt = xpath('//*[@id="ADDSPACE"]/script', document);
	var len = adscrpt.snapshotLength;
	for(var i=0;i<len;i++){
		var dom_obj_parent = adscrpt.snapshotItem(i).parentNode;
		dom_obj_parent.removeChild(adscrpt.snapshotItem(i));
	}


	// ---- ランキング消去 ----
	var rank = xpath('//div[@ID="social"]', document);
	if (rank.snapshotLength) {
		rank.snapshotItem(0).style.display = "none";
	}

	var mixi_ad_head = xpath('//div[@ID="mixi_ad_head"]', document);
	if (mixi_ad_head.snapshotLength) {
		mixi_ad_head.snapshotItem(0).style.display = "none";
	}

	var mixi_ad_groups = xpath('//div[@ID="mixi_ad_groups"]', document);
	if (mixi_ad_groups.snapshotLength) {
		mixi_ad_groups.snapshotItem(0).style.display = "none";
	}

	var footerBunner = xpath('//p[@class="footerBunner"]', document);
	if (footerBunner.snapshotLength) {
		footerBunner.snapshotItem(0).style.display = "none";
	}

footerBunner
	// ---- 画面全体 ----
	var G_Container = xpath('//div[@id="container"]', document);
	G_Container.snapshotItem(0).style.marginTop = "10px";
	G_Container.snapshotItem(0).style.marginLeft = "20px";
	G_Container.snapshotItem(0).style.width = "964px";
//	G_Container.snapshotItem(0).style.height = "724px";

	// ---- 画面黒枠 ----
	var G_Box = xpath('//div[@id="box"]', document);
	G_Box.snapshotItem(0).style.width = '960px';
	G_Box.snapshotItem(0).style.background = 'none';
	G_Box.snapshotItem(0).style.background = 'black';
	G_Box.snapshotItem(0).style.MozBorderRadius = '4px';


	// ---- 画面白枠 ----
	var G_whiteWrapper = xpath('//div[@id="whiteWrapper"]', document);
	G_whiteWrapper.snapshotItem(0).style.width = "760px";

	G_whiteWrapper.snapshotItem(0).style.margin = "0px";
	G_whiteWrapper.snapshotItem(0).style.padding = "10px";
//	G_whiteWrapper.snapshotItem(0).style.background = "pink";
	G_whiteWrapper.snapshotItem(0).style.border = "none";

	// ---- 画面灰枠 ----
	var G_grayWrapper = xpath('//div[@id="grayWrapper"]', document);
	if (G_grayWrapper.snapshotLength) {
		G_grayWrapper.snapshotItem(0).style.padding = "10px";
		G_grayWrapper.snapshotItem(0).style.margin = "0px";
		G_grayWrapper.snapshotItem(0).style.background = "#EFEFEF";

	}
	var G_gray02Wrapper = xpath('//div[@id="gray02Wrapper"]', document);
	if (G_gray02Wrapper.snapshotLength) {
		G_gray02Wrapper.snapshotItem(0).style.margin = 'Auto';
		G_gray02Wrapper.snapshotItem(0).style.border = 'solid 5px gainsboro';

	}

	// ---- サイドバー部分 ----
	var G_boxInner = xpath('//div[@id="boxInner"]', document);
	G_boxInner.snapshotItem(0).style.width = 'Auto';
	G_boxInner.snapshotItem(0).style.paddingLeft = '16px';
//	G_boxInner.snapshotItem(0).style.background = "red"; // チェック用

	// ---- ヘルプ移動 ----
	var Box3 = xpath('//div[@id="supportNavi"]', document);
	Box3.snapshotItem(0).style.position = "absolute";
	Box3.snapshotItem(0).style.left = "800px";

	// ---- プロフィール移動 ----
	var Box1 = xpath('//div[@id="comment"]', document);
	var Box2 = xpath('//div[@id="header_bottom"]', document);
	var Box3 = xpath('//div[@id="supportNavi"]', document);
	Box2.snapshotItem(0).style.position = "absolute";
//	Box2.snapshotItem(0).style.left = "700px";
	Box2.snapshotItem(0).style.top = "5px";
	Box2.snapshotItem(0).style.background = "none";
	Box2.snapshotItem(0).style.width = "120px";
	Box1.snapshotItem(0).style.float = "left";
	Box1.snapshotItem(0).style.display = "inline";
	Box2.snapshotItem(0).style.bckground = "red";

	// @@@@ ワールドタイマー移動 @@@@ 2011.05.22 //
	var Box4 = xpath('//div[@id="worldtime"]', document);
	Box4.snapshotItem(0).style.position = "absolute";
	Box4.snapshotItem(0).style.top = "12px";
	Box4.snapshotItem(0).style.left = "665px";

	// @@@@ タブ位置調整 @@@@ 2011.05.22 //
	var BOX5 = xpath('//div[@id="tabArea"]', document);
	BOX5.snapshotItem(0).style.paddingTop = '8px';



//	Box1.snapshotItem(0).appendChild(Box2.snapshotItem(0));
//	Box1.snapshotItem(0).appendChild(Box3.snapshotItem(0));

	// ---- ボタンエリア移動 ----
	var btn = xpath('//div[@id="btn_area"]', document);
	btn.snapshotItem(0).style.width = "130px";
	btn.snapshotItem(0).style.height = "Auto";
//	btn.snapshotItem(0).style.margin = "0px";
//	btn.snapshotItem(0).style.background = "blue";

	var getContainer = xpath('//div[@id="wrapper"]', document);
	getContainer.snapshotItem(0).style.float = "left";
	var sidebar = document.createElement('div');
	sidebar.id = 'sidebar';
	getContainer.snapshotItem(0).insertBefore(sidebar,getContainer.snapshotItem(0).firstChild);

	// sidebarを取得
	var sidebar = xpath('//*[@id="sidebar"]', document);
	sidebar.snapshotItem(0).style.position = "relative";
	sidebar.snapshotItem(0).style.left = "-10px";

	sidebar.snapshotItem(0).appendChild(btn.snapshotItem(0));

	// 生産値
	var p = xpath('//*[@id="status_left"]/p[@class="status_bottom"]', document);
	var li = p.snapshotItem(0).innerHTML.split(/<span class="sep">&nbsp;\|&nbsp;<\/span>/);

	var box = document.createElement('div');
	box.className = 'sideBox';
	var boxHead = document.createElement('div');
	boxHead.className = 'sideBoxHead';
	boxHead.innerHTML = '<h3><strong><img alt="" src="/20100811-01/img/common/sidebar/icon_production.gif"> 生産 <span class="resourceUp"><a href="/cp/item_list.php">資源UP</a></span> </strong></h3>';
	var boxInner = document.createElement('div');
	boxInner.className = 'sideBoxInner';
	boxInner.id = 'crop';

	var w = document.createElement('li');
	w.innerHTML = li[0].replace(/\.gif/g, '2.gif');
	var s = document.createElement('li');
	s.innerHTML = li[1].replace(/\.gif/g, '2.gif');
	var i = document.createElement('li');
	i.innerHTML = li[2].replace(/ingot.gif/g, 'iron2.gif');
	var r = document.createElement('li');
	r.innerHTML = li[3].replace(/grain.gif/g, 'lice2.gif');
	var t = document.createElement('li');
	t.innerHTML = li[4].replace(/grain.gif/g, 'lice2.gif');

	boxInner.appendChild(w);
	boxInner.appendChild(s);
	boxInner.appendChild(i);
	boxInner.appendChild(r);
	boxInner.appendChild(t);

	box.appendChild(boxHead);
	box.appendChild(boxInner);
	box.style.margin = "4px 0px";

	sidebar.snapshotItem(0).appendChild(box);
//	sidebar.snapshotItem(0).style.background = "red";

	var len = p.snapshotLength;
	for(var i=0;i<len;i++){
		var dom_obj_parent = p.snapshotItem(i).parentNode;
		dom_obj_parent.removeChild(p.snapshotItem(i));
	}

	// 簡易出兵
	var getFooter = xpath('//div[@class="footer_box"]', document);
	getFooter.snapshotItem(0).style.margin = "4px 0px";
//	getFooter.snapshotItem(0).style.display = "none";

	sidebar.snapshotItem(0).appendChild(getFooter.snapshotItem(0));
//	getFooter.snapshotItem(0).style.clear = 'both';

	// BPTPCP
	var status = xpath('//div[@id="status"]', document);
	var b = xpath('//div[@id="bptpcp_area"]', document);
	var btc = b.snapshotItem(0).innerHTML.replace(/<\/?ul>|<\/?li[^>]*>|<\/?span>/g,'');
	var len = b.snapshotLength;
	for(var i=0;i<len;i++){
		var dom_obj_parent = b.snapshotItem(i).parentNode;
		dom_obj_parent.removeChild(b.snapshotItem(i));
	}

	var sRight = document.createElement('div');
		sRight.id = 'status_right';
		sRight.style.position = "absolute";
		sRight.style.cssFloat = "right";
		sRight.style.margin = '4px 0px';
		sRight.style.left = "780px";
		sRight.style.width = "200px";
		sRight.style.height = "30px";
		sRight.innerHTML = btc;
//		sRight.style.background = "red";

//	GM_log(alert.snapshotItem(0).innerHTML);

	// 敵襲
	var Warning = xpath('//img[contains(@src,"/20120508-02/extend_project/w760/img/common/icon_header_status_no.gif")]', document);
	if (Warning.snapshotLength) {
		Warning.snapshotItem(0).style.display = "none";
	}

	var alert = xpath('//div[@id="statusIcon"]', document);
	alert.snapshotItem(0).style.position = "absolute";
	alert.snapshotItem(0).style.top = "-110px";
	alert.snapshotItem(0).style.left = "880px";

/* @@@@ 2011.05.22 @@@
	var span = document.createElement('span');
		span.id = "alert";
		span.innerHTML = alert.snapshotItem(0).innerHTML;
		span.style.width = "Auto";
		span.style.margin = "4px";

//		span.style.background = "blue";

	var len = alert.snapshotLength;
	for(var i=0;i<len;i++){
		var dom_obj_parent = alert.snapshotItem(i).parentNode;
		dom_obj_parent.removeChild(alert.snapshotItem(i));
	}
*/

	status.snapshotItem(0).appendChild(sRight);
//	status.snapshotItem(0).appendChild(span);

	// マップ表示切替 レイヤー順調整
	var mapc = xpath('//div[@id="change-map-scale"]', document);
	if (mapc.snapshotLength)
		{ mapc.snapshotItem(0).style.zIndex = "1"; }

	// ワールドタイム

	var wtime = xpath('//div[@id="worldtime"]//dl', document);
	wtime.snapshotItem(0).style.position = "absolute";
	wtime.snapshotItem(0).style.top = "52px";
	wtime.snapshotItem(0).style.width = "160px";

	wtime.snapshotItem(0).style.left = "116px";

	wtime.snapshotItem(0).style.height = "40px";
	wtime.snapshotItem(0).style.padding = "0px";
	wtime.snapshotItem(0).style.margin = "0px";

	wtime.snapshotItem(0).style.background = "#332C0F";
	wtime.snapshotItem(0).style.MozBorderRadius = "4px";

	var wtime3 = xpath('//div[@id="worldtime"]//dd', document);
	wtime3.snapshotItem(0).style.border = '1px #fd0 solid';
	wtime3.snapshotItem(0).style.backgroundImage  = "none";
	wtime3.snapshotItem(0).style.position = "relative";
	wtime3.snapshotItem(0).style.top = "-5px";
	wtime3.snapshotItem(0).style.right = "15px";
	wtime3.snapshotItem(0).style.height = "auto";
	wtime3.snapshotItem(0).style.padding = "1px";


})();

function xpath(query,targetDoc) {
	return document.evaluate(query, targetDoc, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function trim(str) {
	return str.replace(/^([ 　\t\r\n]|&nbsp;)+|([ 　\t\r\n]|&nbsp;)+$/g, "");
}

function log() { unsafeWindow.console.log.apply(unsafeWindow.console, Array.slice(arguments)) };

