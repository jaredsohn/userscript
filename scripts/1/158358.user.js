// ==UserScript==
// @name           bro3PutAllyDep
// @namespace      bro3PutAllyDep
// @include        http://*.3gokushi.jp/alliance/dependency.php*
// @description    ブラウザ三国志勢力リスト抽出
// @version        0.1.1
// ==/UserScript==

var VERSION = "0.1";
var urlpath;
var maxpage;
var putText = "";

// 共通関数
var d = document;
var $d = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $e = function(key) { return d.evaluate(key, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); };

//----------------//
// メインルーチン //
//----------------//
(function(){

	if (location.pathname == "/alliance/dependency.php") {
		// 勢力リスト画面のみ動作

		//HTML追加
		addHtml();
	}
})();

//------------//
// HTMLの生成 //
//------------//
function addHtml() {

	//--------------------------------------//
	// 画面生成                             //
	//--------------------------------------//

	//----------------//
	// コンテナの取得 //
	//----------------//
	var container;
	var pager = $e('//*[@class="pager"]');
	var bbs = $e('//*[@id="gray02Wrapper"]');
	if (pager.snapshotLength == 0) {
		container = bbs.snapshotItem(0);
	} else {
		container = pager.snapshotItem(0);
	}
	

	//----------------//
	//-- ヘッダー部 --//
	//----------------//
	//-- コントロール配置DIV --//
	var linksDiv = document.createElement("div");
	container.appendChild(linksDiv);

	//-- ツール名称ラベル --//
	var textLabel = document.createElement("span");
	textLabel.id = "toolLabel";
	textLabel.style.fontSize = "16px";
	textLabel.innerHTML = "<br><b>統計抽出 Ver." + VERSION + "</b>";
	textLabel.style.color = "black";
	textLabel.style.width = "725px";
	linksDiv.appendChild(textLabel);

	//-- (改行) --//
	textLabel = document.createElement("span");
	textLabel.innerHTML = "<br>";
	linksDiv.appendChild(textLabel);

	//-- ページ数表示 --//
	var ckLabel = document.createElement("span");
	ckLabel.style.fontSize = "14px";
	ckLabel.style.marginLeft = "16px";
	ckLabel.innerHTML = "履歴ページ数";
	linksDiv.appendChild(ckLabel);

	ckLabel = document.createElement("span");
	ckLabel.style.fontSize = "14px";
	ckLabel.id = "pageNo";
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "0";
	linksDiv.appendChild(ckLabel);

	ckLabel = document.createElement("span");
	ckLabel.style.fontSize = "14px";
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = "/";
	linksDiv.appendChild(ckLabel);

	var data = $e('//ul[@class="pager"]/li[@class="last"]//a[@title="last page"]');
	if( data.snapshotLength > 0 ){
		var ref = data.snapshotItem(0).getAttribute("href");
		maxpage = ref.replace(/^.*\?p=/,"");
		maxpage = maxpage.replace(/#ptop/,"");
		urlpath = ref.replace(/\?p=.*$/,"");
	}
	else{
		var data = $e('//ul[@class="pager"]/li/b');
		if( data.snapshotLength > 0 ){
			maxpage = data.snapshotItem(0).textContent;

			var data = $e('//ul[@class="pager"]/li//a[@title="first page"]');
			var ref = data.snapshotItem(0).getAttribute("href");
			urlpath = ref.replace(/\?p=.*$/,"");
		}
		else{
			maxpage = 1;
		}
	}

	ckLabel = document.createElement("span");
	ckLabel.style.fontSize = "14px";
	ckLabel.id = "lastPageNo";
	ckLabel.style.marginLeft = "4px";
	ckLabel.innerHTML = maxpage;
	linksDiv.appendChild(ckLabel);

	//-- 情報取得ボタン --//
	var button1 = document.createElement("input");
	button1.type = "button";
	button1.id = "ckButton1";
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "16px";
	button1.value = "統計情報を抽出";
	button1.addEventListener("click", function() {getButtonClicked()}, true);
	linksDiv.appendChild(button1);

	//-- 結果全選択ボタン --//
	var button2 = document.createElement("input");
	button2.type = "button";
	button2.id = "ckButton2";
	button2.style.fontSize = "12px";
	button2.style.marginLeft = "16px";
	button2.value = "結果全選択";
	button2.addEventListener("click", function() {selectButtonClicked()}, true);
	linksDiv.appendChild(button2);

	//-- (改行) --//
	textLabel = document.createElement("span");
	textLabel.innerHTML = "<br>";
	linksDiv.appendChild(textLabel);

	// （ギャップ埋め）
	ckLabel = document.createElement("pre");
	ckLabel.style.height = "6px";
	linksDiv.appendChild(ckLabel);

	//----------------------------//
	// 検索結果のテキスト表示領域 //
	//----------------------------//
	textArea = document.createElement("div");
	textArea.innerHTML = "";
	textArea.style.fontSize = "14px";
	textArea.style.color = "black";
	textArea.style.backgroundColor = "#FFDEAD";
	textArea.style.width = "725px";
	textArea.style.height = "200px";
	textArea.style.overflow = "auto";
	textArea.style.border = "solid 2px";
	textArea.style.padding = "2px";
	textArea.style.marginTop = "-2px";
	textArea.style.textAlign = "left";
	linksDiv.appendChild(textArea);

	ckLabel = document.createElement("pre");
	ckLabel.id = "resultText";
	ckLabel.innerHTML = "";
	textArea.appendChild(ckLabel);

	//--------------------------//
	// 他ページ取得情報の設定域 //
	//--------------------------//
	var linksDiv2 = document.createElement("html");
	linksDiv2.id = "hiddenData";
	linksDiv2.style.display = "none";
	container.appendChild(linksDiv2);
}


//------------------------//
// 取得ボタン押下処理処理 //
//------------------------//
function getButtonClicked() {

	var textBox = $e('//*[@id="resultText"]');
	textBox.snapshotItem(0).innerHTML = "データ取得中・・・「終了しました」のダイアログが出るまでお待ち下さい";

	var button = $e('//*[@id="ckButton1"]');
	button.snapshotItem(0).disabled = true;
	button = $e('//*[@id="ckButton2"]');
	button.snapshotItem(0).disabled = true;

	// 見出し
	putText = "ランク\t同盟略称\tポイント\tメンバー\t盟主\t座標\t合流日時<br>";

	if( maxpage > 1 ){
		loadPage(1);
	}
	else{
		// 2ページ目以降
		var data = $e('//table[@class="tables"]//td');
		var text = "";
		for( var i = 0; i < data.snapshotLength/7; i++ ){
			var res = "";
			for( var j = 0; j < 7; j++ ){
				res = res + data.snapshotItem(i*7+j).textContent;
				res = res + "\t";
			}

			text = text + res + "<br>";


		}

		var textBox = $e('//*[@id="resultText"]');
		textBox.snapshotItem(0).innerHTML =putText + text;

		var button = $e('//*[@id="ckButton1"]');
		button.snapshotItem(0).disabled = false;
		button = $e('//*[@id="ckButton2"]');
		button.snapshotItem(0).disabled = false;

		alert("終了しました");
	}
}

//----------------------//
// ページのローディング //
//----------------------//
function loadPage(targetPageNo) {
	var opt = {
		method: 'get',
		url: urlpath + "?p=" + targetPageNo,
		onload: function(res) {
			addResult(targetPageNo, res);
		}
	}
	GM_xmlhttpRequest(opt); 
}

//--------------//
// 取得結果加算 //
//--------------//
function addResult(targetPageNo,res) {
	var pageNo = $e('//*[@id="pageNo"]');
	pageNo.snapshotItem(0).textContent = targetPageNo;

	var hidden = $e('//*[@id="hiddenData"]');
	hidden.snapshotItem(0).innerHTML = res.responseText;

	// 2ページ目以降
	var data = $e('//*[@id="hiddenData"]//table[@class="tables"]//td');
	var text = "";
	for( var i = 0; i < data.snapshotLength/7; i++ ){
		var res = "";
		for( var j = 0; j < 7; j++ ){
			res = res + data.snapshotItem(i*7+j).textContent;
				res = res + "\t";
		}

		text = text + res + "<br>";

	}

	if(maxpage > targetPageNo ){
		putText = putText + text;
		loadPage(parseInt(targetPageNo)+1);
	}
	else{

		var textBox = $e('//*[@id="resultText"]');
		textBox.snapshotItem(0).innerHTML =putText + text;

		var button = $e('//*[@id="ckButton1"]');
		button.snapshotItem(0).disabled = false;
		button = $e('//*[@id="ckButton2"]');
		button.snapshotItem(0).disabled = false;

		alert("終了しました");
	}
}

//--------------//
// 全選択ボタン //
//-------------//
function selectButtonClicked() {
	var textBox = $x('//*[@id="resultText"]');

	var objs = textBox.firstChild;
	var obje = textBox.lastChild;

	var range = document.createRange();
	range.setStart(objs,0);
	range.setEnd(obje,obje.textContent.length);
	var sel = getSelection();
	sel.removeAllRanges();
	sel.addRange(range);
}

