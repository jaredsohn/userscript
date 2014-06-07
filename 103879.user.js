// ==UserScript==
// @name           bro3-inhibitSC
// @version        0.90
// @namespace      
// @description    斥候騎兵の作成をし難くします。mixi21-24サーバで動作を確認しました。
// @include        http://m*.3gokushi.jp/facility/facility*
// ==/UserScript==
// 使い方: 厩舎に行って、斥候騎兵生産ボックスを見る。
(function () {
	var a;
	var ii, noSC=0;
	a = document.evaluate('/html/body/div/div[3]/div[2]/div[2]/div/div/form/table/tbody/tr/th/div/text()', document, null, 7, null);
	if (a.snapshotItem(i).nodeValue.indexOf("厩舎") != -1) { //厩舎ならば以下を全体を実行
		a = document.evaluate('/html/body/div/div[3]/div[2]/div[2]/div/div/table/tbody/tr/th/text()', document, null, 7, null);
		for (var i = 0; i < a.snapshotLength; i++) {
			if (a.snapshotItem(i).nodeValue.indexOf("斥候騎兵") != -1) {
				ii = i;
				break;
			}
			if (i==a.snapshotLength-1){ //最後まで来ても斥候騎兵が見つからない
				noSC=1;
			}
		}

		if (noSC!=1){ //斥候騎兵が存在する場合
			tmpXpath = '/html/body/div/div[3]/div[2]/div[2]/div/div/table[1]/tbody/tr[' + (ii + 8) + ']/td/form/span';
			document.getElementById('unit_value[311]').style.visibility = 'hidden';
			a = document.evaluate(tmpXpath, document, null, 7, null);
			a.snapshotItem(0).style.visibility = 'hidden';
			a.snapshotItem(0).id = 'defnum1';
			tmpXpath = '/html/body/div/div[3]/div[2]/div[2]/div/div/table[1]/tbody/tr[' + (ii + 8) + ']/td';
			a = document.evaluate(tmpXpath, document, null, 7, null);
			for (var i = 0; i < a.snapshotLength; i++) {
				var addB = document.createElement('span');
				addB.id = 'table1';
				addB.innerHTML = '入力可視化';
				addB.style.backgroundColor = '#bbb';
				addB.style.border= '1px solid';
				addB.addEventListener("click", function () {
					if (document.getElementById('table1').innerHTML != '入力可視化') {
						document.getElementById('unit_value[311]').style.visibility = 'hidden';
						document.getElementById('defnum1').style.visibility = 'hidden';
						document.getElementById('table1').innerHTML = '入力可視化';
					} else {
						document.getElementById('unit_value[311]').style.visibility = 'visible';
						document.getElementById('defnum1').style.visibility = 'visible';
						document.getElementById('table1').innerHTML = '入力不可視化';
					}
				}, false); //addEventListenerhはここまで。
				a.snapshotItem(i).insertBefore(addB, a.snapshotItem(i).firstChild);
			}
		}
	}
})();
