// ==UserScript==
// @name           Web Research Report Customize
// @namespace      ashphy.webResearchReport
// @description    Web研究日誌をカスタマイズします．
// @include        https://lion.cc.kagoshima-u.ac.jp/sreport/std/*
// ==/UserScript==

(function() {
	
	//研究時間を消去する
	var researchTime = xpath('/html/body/div/table[6]/tbody/tr[4]');
	if(researchTime.length)
	{
		researchTime[0].style.display = 'none';
	}

	//登録更新ボタンを押しやすくする
	var submit = xpath('/html/body/div/table[6]/tbody/tr[7]/td[2]');
	if(submit.length)
	{
		//ボタンを押しやすくする処理
		submit[0].addEventListener("click", function(e){
			var form = xpath('/html/body/div/table[6]/form');
			if(form.length)
			{
				form[0].submit();
			}
		}, false);
		
		//ボタンの見栄え向上
		submit[0].style.backgroundColor = '#87cefa';
		submit[0].style.padding = '5px';
		submit[0].style.border = 'solid 2px #6495ed'
	}
	
	function xpath(query) {
		var results = document.evaluate(query, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		for(var i=0; i<results.snapshotLength; i++){
			nodes.push(results.snapshotItem(i));
		}
		return nodes;
	}
})();
