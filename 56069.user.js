// ==UserScript==
// @name           mougCustomizer
// @namespace      http://d.hatena.ne.jp/so_blue/
// @description    各カテ板への直リンクメニュー追加 & 給湯室直リンク追加 & ついでに広告とかも削除
// @include        http://www.moug.net/*
// ==/UserScript==

(function(){

	var xpath = 'id("right")/div[@class="boxShadow"]';
	var boxes = document.evaluate(xpath, document, null, 7, null);
	var colR = document.getElementById('right');

	colR.removeChild(boxes.snapshotItem(5));
	colR.removeChild(boxes.snapshotItem(4));
	colR.insertBefore(boxes.snapshotItem(3), boxes.snapshotItem(2));

	//日本語がいい人は、この配列を日本語に変える
	var aryThreadName = [
		'Excel', 'Excel VBA', 'Access',
		'Access VBA', 'Word', 'Word VBA',
		'PowerPoint', 'Outlook', 'Windows',
		'Programming', 'Security', 'Web Create', 
		'Graphic', 'DataBase', 'Accounting', 'Relax'
	];
	//カテゴリー名横に丸いイメージを表示させるためのclass名
	var aryClassName = [
		'ic2', 'ic2', 'ic3', 'ic3',
		'ic1', 'ic1', 'ic4', 'ic5',
		'ic6', 'ic9', 'ic10', 'ic11',
		 'ic8', 'ic7', 'ic0', ''
	];

	var baseURL = 'http://www.moug.net/faq/viewforum.php?f=';
	var elmUL = document.createElement('UL');
	elmUL.setAttribute('style', 'margin: 0; list-style-type: none; padding: 1em; font: bold 1em Verdana;');

	//メニュー用リスト要素を作る
	for (var i = 0; i < aryThreadName.length; i++) {
		var elmLI = document.createElement('LI');
		var elmA  = document.createElement('A');
		elmA.textContent = aryThreadName[i];
		elmLI.setAttribute('style', 'line-height: 1.8em;');
		elmA.setAttribute('href', baseURL + (i + 1));
		elmA.setAttribute('class', aryClassName[i]);
		elmLI.appendChild(elmA);
		elmUL.appendChild(elmLI);
	}

	//作ったメニュー用リストを放り込むdivを作って
	//その中にリストをappendする
	var elmDIV = document.createElement('DIV');
	elmDIV.setAttribute('style', 'background-color: #efefef; border: solid 1px #D1D1D1; margin-bottom: 1em;');
	elmDIV.appendChild(elmUL);
	colR.insertBefore(elmDIV, boxes.snapshotItem(3));

})();