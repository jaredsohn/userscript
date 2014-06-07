// ==UserScript==
// @name           bro3_put_busyodas_text.user.js
// @namespace      http://homepage3.nifty.com/Craford
// @include        http://*.3gokushi.jp/busyodas/busyodas_history.php*
// @include        http://*.1kibaku.jp/busyodas/busyodas_history.php*
// @include        http://*.bbsr-maql.jp/busyodas/busyodas_history.php*
// @description    ブラウザ三国志ブショーダス履歴テキスト生成
// @version        1.08
// ==/UserScript==
// version date       author
// ver0.01 2011.03.21 Craford 実装テスト
// ver0.02 2011.03.22 Craford ブショーダス履歴が最終ページでもうごくように修正
// ver0.03 2011.03.22 Craford ブショーダス履歴が1ページでもうごくように修正。一騎当千に対応。
// ver0.04 2011.03.22 Craford 出力結果に分析結果を出すようにしてみた。
// ver1.00 2011.03.22 Craford ブショーダス別分析を追加
// ver1.01 2011.03.22 Craford ブショーダスEXの枚数を追加
// ver1.02 2011.03.22 Craford カードをひいていないとき、結果に%NaN%がでる問題に対応。
// ver1.03 2011.03.22 Craford レイアウト変更、その他各種修正、機能追加。
// ver1.04 2011.03.23 Craford パーセンテージ表示の整形、カード取得枚数を降順ソート
// ver1.05 2011.03.23 Craford カード取得枚数にブショーダス別枚数の表示を追加
// ver1.06 2011.03.24 Craford レアカード出力時間に、レア「Ｒ」を追加
// ver1.07 2011.11.12 Craford 集計対象に「SP」を追加
// ver1.08 2011.11.23 Craford 集計対象に「小麗」を追加
// ver1.09 2012.03.01 Craford 集計対象に「大鳳」を追加

var VERSION_KEY = "vtn200";
var VERSION = "1.08";
var urlpath;
var maxpage;
var putText = "";
var card;
var t_rare_count = {}; // ランク別カード数
var g_rare_count = {}; // ランク別カード数
var s_rare_count = {}; // ランク別カード数
var l_rare_count = {}; // ランク別カード数
var sp_rare_count = {}; // ランク別カード数
var sho_rare_count = {}; // ランク別カード数
var tai_rare_count = {}; // ランク別カード数

var xg_rare_count = {}; // ランク別カード数
var xs_rare_count = {}; // ランク別カード数

var total_cards = 0; // 総カード数
var g_total_cards = 0; // 総カード数
var sp_total_cards = 0; // 総カード数
var s_total_cards = 0; // 総カード数
var l_total_cards = 0; // 総カード数
var sho_total_cards = 0; // 総カード数
var tai_total_cards = 0; // 総カード数

var g_ex_cards = 0;
var s_ex_cards = 0;

var srup_text = "";

// 共通関数
var d = document;
var $d = function(id) { return d.getElementById(id); };
var $x = function(xp,dc) { return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; };
var $e = function(key) { return d.evaluate(key, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); };

//----------------//
// メインルーチン //
//----------------//
(function(){

	if (location.pathname == "/busyodas/busyodas_history.php") {
		// ブショーダス履歴画面のみ動作

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
	textLabel.innerHTML = "<br><b>ブショーダス履歴抽出 Ver." + VERSION + "</b>";
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

	//-- 詳細は出さないチェック --//
	var check1 = document.createElement("input");
	check1.type = "checkbox";
	check1.id = "ckcheck1";
	check1.style.marginLeft = "16px";
	linksDiv.appendChild(check1);
	var label2 = document.createElement("span");
	label2.style.fontSize = "12px";
	label2.style.marginLeft = "2px";
	label2.innerHTML = "履歴出力";
	linksDiv.appendChild(label2);

	//-- 情報取得ボタン --//
	var button1 = document.createElement("input");
	button1.type = "button";
	button1.id = "ckButton1";
	button1.style.fontSize = "12px";
	button1.style.marginLeft = "16px";
	button1.value = "ブショーダス履歴を抽出";
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
	// ハッシュテーブル初期化
	card = new Array();
	rare_count = {}; // ランク別カード数

	// レア枚数の初期化
	t_rare_count['C'] = 0;
	t_rare_count['UC'] = 0;
	t_rare_count['R'] = 0;
	t_rare_count['SR'] = 0;
	t_rare_count['UR'] = 0;

	g_rare_count['C'] = 0;
	g_rare_count['UC'] = 0;
	g_rare_count['R'] = 0;
	g_rare_count['SR'] = 0;
	g_rare_count['UR'] = 0;

	s_rare_count['C'] = 0;
	s_rare_count['UC'] = 0;
	s_rare_count['R'] = 0;
	s_rare_count['SR'] = 0;
	s_rare_count['UR'] = 0;

	sp_rare_count['C'] = 0;
	sp_rare_count['UC'] = 0;
	sp_rare_count['R'] = 0;
	sp_rare_count['SR'] = 0;
	sp_rare_count['UR'] = 0;

	sho_rare_count['C'] = 0;
	sho_rare_count['UC'] = 0;
	sho_rare_count['R'] = 0;
	sho_rare_count['SR'] = 0;
	sho_rare_count['UR'] = 0;

	tai_rare_count['C'] = 0;
	tai_rare_count['UC'] = 0;
	tai_rare_count['R'] = 0;
	tai_rare_count['SR'] = 0;
	tai_rare_count['UR'] = 0;

	l_rare_count['C'] = 0;
	l_rare_count['UC'] = 0;
	l_rare_count['R'] = 0;
	l_rare_count['SR'] = 0;
	l_rare_count['UR'] = 0;

	xg_rare_count['C'] = 0;
	xg_rare_count['UC'] = 0;
	xg_rare_count['R'] = 0;
	xg_rare_count['SR'] = 0;
	xg_rare_count['UR'] = 0;

	xs_rare_count['C'] = 0;
	xs_rare_count['UC'] = 0;
	xs_rare_count['R'] = 0;
	xs_rare_count['SR'] = 0;
	xs_rare_count['UR'] = 0;

	total_cards = 0; // 総カード数
	g_total_cards = 0; // 総カード数
	s_total_cards = 0; // 総カード数
	l_total_cards = 0; // 総カード数
	sp_total_cards = 0; // 総カード数
	sho_total_cards = 0; // 総カード数
	tai_total_cards = 0; // 総カード数

	g_ex_cards = 0;
	s_ex_cards = 0;

	srup_text = "";

	var textBox = $e('//*[@id="resultText"]');
	textBox.snapshotItem(0).innerHTML = "データ取得中・・・「終了しました」のダイアログが出るまでお待ち下さい";

	var button = $e('//*[@id="ckButton1"]');
	button.snapshotItem(0).disabled = true;
	button = $e('//*[@id="ckButton2"]');
	button.snapshotItem(0).disabled = true;

	// 見出し
	putText = "カードNo.\tレアリティ\t名前\tレベル\tカード取得日時\tブショーダスタイプ<br>";

	if( maxpage > 1 ){
		loadPage(1);
	}
	else{
		// 2ページ目以降
		var data = $e('//table[@class="commonTables"]//td');
		var text = "";
		for( var i = 0; i < data.snapshotLength/6; i++ ){
			var res = "";
			for( var j = 0; j < 6; j++ ){
				res = res + data.snapshotItem(i*6+j).textContent;
				if( j < 5 ){
					res = res + "\t";
				}
			}
			text = text + res + "<br>";

			var no = data.snapshotItem(i*6+0).textContent;
			var rare = data.snapshotItem(i*6+1).textContent;
			if( (rare == "UR") || (rare == "SR") || (rare == "R") ){
				srup_text = srup_text + res + "<BR>";
			}

			if( card[no] == undefined ){
				card[no] = new Array();
				card[no]['no'] = data.snapshotItem(i*6+0).textContent;
				card[no]['rare'] = data.snapshotItem(i*6+1).textContent;
				card[no]['name'] = data.snapshotItem(i*6+2).textContent;
				card[no]['ct'] = 1;
				card[no]['gld'] = 0;
				card[no]['slv'] = 0;
				card[no]['sho'] = 0;
				card[no]['tai'] = 0;
				card[no]['lgt'] = 0;
			}
			else{
				card[no]['ct'] = card[no]['ct'] + 1;
			}

			t_rare_count[rare] = t_rare_count[rare] + 1;
			total_cards = total_cards + 1;
			if( data.snapshotItem(i*6+5).textContent.indexOf("ゴールド") >= 0 ){
				g_rare_count[rare] = g_rare_count[rare] + 1;
				g_total_cards = g_total_cards + 1;
				card[no]['gld'] = card[no]['gld'] + 1;

				if( data.snapshotItem(i*6+5).textContent.indexOf("EX") >= 0 ){
					xg_rare_count[rare] = xg_rare_count[rare] + 1;
					g_ex_cards = g_ex_cards + 1;
				}
			}
			else if( data.snapshotItem(i*6+5).textContent.indexOf("シルバー") >= 0 ){
				s_rare_count[rare] = s_rare_count[rare] + 1;
				s_total_cards = s_total_cards + 1;
				card[no]['slv'] = card[no]['slv'] + 1;

				if( data.snapshotItem(i*6+5).textContent.indexOf("EX") >= 0 ){
					xs_rare_count[rare] = xs_rare_count[rare] + 1;
					s_ex_cards = s_ex_cards + 1;
				}
			}
			else if( data.snapshotItem(i*6+5).textContent.indexOf("SP") >= 0 ){
				sp_rare_count[rare] = sp_rare_count[rare] + 1;
				sp_total_cards = sp_total_cards + 1;
				card[no]['sp'] = card[no]['sp'] + 1;
			}
			else if( data.snapshotItem(i*6+5).textContent.indexOf("小麗") >= 0 ){
				sho_rare_count[rare] = sho_rare_count[rare] + 1;
				sho_total_cards = sho_total_cards + 1;
				card[no]['sho'] = card[no]['sho'] + 1;
			}
			else if( data.snapshotItem(i*6+5).textContent.indexOf("大鳳") >= 0 ){
				tai_rare_count[rare] = tai_rare_count[rare] + 1;
				tai_total_cards = sho_total_cards + 1;
				card[no]['tai'] = card[no]['tai'] + 1;
			}
			else{
				l_rare_count[rare] = l_rare_count[rare] + 1;
				l_total_cards = l_total_cards + 1;
				card[no]['lgt'] = card[no]['lgt'] + 1;
			}
		}

		var analyze = makeAnalyzeText();

		var checkBox = $e('//*[@id="ckcheck1"]');
		var textBox = $e('//*[@id="resultText"]');
		if( checkBox.checked == true ){
			textBox.snapshotItem(0).innerHTML = analyze +
							    '<BR>ブショーダス履歴<BR>' +
							    '----------------------------------------------------------<BR>' +
							    putText + text;
		}
		else{
			textBox.snapshotItem(0).innerHTML = analyze;
		}

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
	var data = $e('//*[@id="hiddenData"]//table[@class="commonTables"]//td');
	var text = "";
	for( var i = 0; i < data.snapshotLength/6; i++ ){
		var res = "";
		var res2 = "";
		for( var j = 0; j < 6; j++ ){
			res = res + data.snapshotItem(i*6+j).textContent;
			if( j != 3 ){
				res2 = res2 + data.snapshotItem(i*6+j).textContent;
			}
			if( j < 5 ){
				res = res + "\t";
				res2 = res2 + "\t";
			}
		}
		text = text + res + "<br>";

		var no = data.snapshotItem(i*6+0).textContent;
		var rare = data.snapshotItem(i*6+1).textContent;
		if( (rare == "UR") || (rare == "SR") || (rare == "R") ){
			srup_text = srup_text + res2 + "<BR>";
		}

		if( card[no] == undefined ){
			card[no] = new Array();
			card[no]['no'] = data.snapshotItem(i*6+0).textContent;
			card[no]['rare'] = data.snapshotItem(i*6+1).textContent;
			card[no]['name'] = data.snapshotItem(i*6+2).textContent;
			card[no]['ct'] = 1;
			card[no]['gld'] = 0;
			card[no]['slv'] = 0;
			card[no]['sp'] = 0;
			card[no]['sho'] = 0;
			card[no]['tai'] = 0;
			card[no]['lgt'] = 0;
		}
		else{
			card[no]['ct'] = card[no]['ct'] + 1;
		}

		t_rare_count[rare] = t_rare_count[rare] + 1;
		total_cards = total_cards + 1;
		if( data.snapshotItem(i*6+5).textContent.indexOf("ゴールド") >= 0 ){
			g_rare_count[rare] = g_rare_count[rare] + 1;
			g_total_cards = g_total_cards + 1;
			card[no]['gld'] = card[no]['gld'] + 1;

			if( data.snapshotItem(i*6+5).textContent.indexOf("EX") >= 0 ){
				xg_rare_count[rare] = xg_rare_count[rare] + 1;
				g_ex_cards = g_ex_cards + 1;
			}
		}
		else if( data.snapshotItem(i*6+5).textContent.indexOf("シルバー") >= 0 ){
			s_rare_count[rare] = s_rare_count[rare] + 1;
			s_total_cards = s_total_cards + 1;
			card[no]['slv'] = card[no]['slv'] + 1;

			if( data.snapshotItem(i*6+5).textContent.indexOf("EX") >= 0 ){
				xs_rare_count[rare] = xs_rare_count[rare] + 1;
				s_ex_cards = s_ex_cards + 1;
			}
		}
		else if( data.snapshotItem(i*6+5).textContent.indexOf("SP") >= 0 ){
			sp_rare_count[rare] = sp_rare_count[rare] + 1;
			sp_total_cards = sp_total_cards + 1;
			card[no]['sp'] = card[no]['sp'] + 1;
		}
		else if( data.snapshotItem(i*6+5).textContent.indexOf("小麗") >= 0 ){
			sho_rare_count[rare] = sho_rare_count[rare] + 1;
			sho_total_cards = sho_total_cards + 1;
			card[no]['sho'] = card[no]['sho'] + 1;
		}
		else if( data.snapshotItem(i*6+5).textContent.indexOf("大鳳") >= 0 ){
			tai_rare_count[rare] = tai_rare_count[rare] + 1;
			tai_total_cards = tai_total_cards + 1;
			card[no]['tai'] = card[no]['tai'] + 1;
		}
		else{
			l_rare_count[rare] = l_rare_count[rare] + 1;
			l_total_cards = l_total_cards + 1;
			card[no]['lgt'] = card[no]['lgt'] + 1;
		}
	}

	if(maxpage > targetPageNo ){
		putText = putText + text;
		loadPage(parseInt(targetPageNo)+1);
	}
	else{
		var analyze = makeAnalyzeText();

		var checkBox = $e('//*[@id="ckcheck1"]');
		var textBox = $e('//*[@id="resultText"]');
		if( checkBox.checked == true ){
			textBox.snapshotItem(0).innerHTML = analyze +
							    '<BR>ブショーダス履歴<BR>' +
							    '----------------------------------------------------------<BR>' +
							    putText + text;
		}
		else{
			textBox.snapshotItem(0).innerHTML = analyze;
		}

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
	// 構築ルート情報の選択
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


//--------------//
// 分析テキスト //
//-------------//
function makeAnalyzeText(){
	var text = "";

	text = text + "ブショーダス履歴分析結果<BR>";
	text = text + "----------------------------------------------------------<BR>";
	text = text + "【累計】<BR>";
	if( total_cards > 0 ){
		text = text + "　カード枚数：" + total_cards + "枚<BR>";
		text = text + "　　UR・・" + formatRightNumber(t_rare_count["UR"],5) + "枚\t" + calc_per(t_rare_count["UR"],total_cards) + "<BR>";
		text = text + "　　SR・・" + formatRightNumber(t_rare_count["SR"],5) + "枚\t" + calc_per(t_rare_count["SR"],total_cards) + "<BR>";
		text = text + "　　R ・・" + formatRightNumber(t_rare_count["R"],5) + "枚\t" + calc_per(t_rare_count["R"],total_cards) + "<BR>";
		text = text + "　　UC・・" + formatRightNumber(t_rare_count["UC"],5) + "枚\t" + calc_per(t_rare_count["UC"],total_cards) + "<BR>";
		text = text + "　　C ・・" + formatRightNumber(t_rare_count["C"],5) + "枚\t" + calc_per(t_rare_count["C"],total_cards) + "<BR>";
	}
	else{
		text = text + "　1枚も引いていません<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";
	text = text + "【ブショーダスゴールド】<BR>";
	if( g_total_cards > 0 ){
		text = text + "　カード枚数：" + g_total_cards + "枚(EX:" + formatRightNumber(g_ex_cards,2) + "枚)<BR>";
		text = text + "　　UR・・" + formatRightNumber(g_rare_count["UR"],5) + "枚(EX:" + formatRightNumber(xg_rare_count["UR"],2) + "枚)\t" + calc_per(g_rare_count["UR"],g_total_cards) + "<BR>";
		text = text + "　　SR・・" + formatRightNumber(g_rare_count["SR"],5) + "枚(EX:" + formatRightNumber(xg_rare_count["SR"],2) + "枚)\t" + calc_per(g_rare_count["SR"],g_total_cards) + "<BR>";
		text = text + "　　R ・・" + formatRightNumber(g_rare_count["R"],5) + "枚(EX:" + formatRightNumber(xg_rare_count["R"],2) + "枚)\t" + calc_per(g_rare_count["R"],g_total_cards) + "<BR>";
		text = text + "　　UC・・" + formatRightNumber(g_rare_count["UC"],5) + "枚\t\t" + calc_per(g_rare_count["UC"],g_total_cards) + "<BR>";
	}
	else{
		text = text + "　1枚も引いていません<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";
	text = text + "【ブショーダスシルバー】<BR>";
	if( s_total_cards > 0 ){
		text = text + "　カード枚数：" + s_total_cards + "枚(EX:" + formatRightNumber(s_ex_cards,2) + "枚)<BR>";
		text = text + "　　UR・・" + formatRightNumber(s_rare_count["UR"],5) + "枚(EX:" + formatRightNumber(xs_rare_count["UR"],2) + "枚)\t" + calc_per(s_rare_count["UR"],s_total_cards) + "<BR>";
		text = text + "　　SR・・" + formatRightNumber(s_rare_count["SR"],5) + "枚(EX:" + formatRightNumber(xs_rare_count["SR"],2) + "枚)\t" + calc_per(s_rare_count["SR"],s_total_cards) + "<BR>";
		text = text + "　　R ・・" + formatRightNumber(s_rare_count["R"],5) + "枚(EX:" + formatRightNumber(xs_rare_count["R"],2) + "枚)\t" + calc_per(s_rare_count["R"],s_total_cards) + "<BR>";
		text = text + "　　UC・・" + formatRightNumber(s_rare_count["UC"],5) + "枚\t\t" + calc_per(s_rare_count["UC"],s_total_cards) + "<BR>";
		text = text + "　　C ・・" + formatRightNumber(s_rare_count["C"],5) + "枚\t\t" + calc_per(s_rare_count["C"],s_total_cards) + "<BR>";
	}
	else{
		text = text + "　1枚も引いていません<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";
	text = text + "【ブショーダスSP】<BR>";
	if( sp_total_cards > 0 ){
		text = text + "　カード枚数：" + sp_total_cards + "枚<BR>";
		text = text + "　　UR・・" + formatRightNumber(sp_rare_count["UR"],5) + "枚\t" + calc_per(sp_rare_count["UR"],sp_total_cards) + "<BR>";
		text = text + "　　SR・・" + formatRightNumber(sp_rare_count["SR"],5) + "枚\t" + calc_per(sp_rare_count["SR"],sp_total_cards) + "<BR>";
		text = text + "　　R ・・" + formatRightNumber(sp_rare_count["R"],5) + "枚\t" + calc_per(sp_rare_count["R"],sp_total_cards) + "<BR>";
		text = text + "　　UC・・" + formatRightNumber(sp_rare_count["UC"],5) + "枚\t" + calc_per(sp_rare_count["UC"],sp_total_cards) + "<BR>";
		text = text + "　　C ・・" + formatRightNumber(sp_rare_count["C"],5) + "枚\t" + calc_per(sp_rare_count["C"],sp_total_cards) + "<BR>";
	}
	else{
		text = text + "　1枚も引いていません<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";
	text = text + "【ブショーダス大鳳】<BR>";
	if( tai_total_cards > 0 ){
		text = text + "　カード枚数：" + tai_total_cards + "枚<BR>";
		text = text + "　　UR・・" + formatRightNumber(tai_rare_count["UR"],5) + "枚\t" + calc_per(tai_rare_count["UR"],tai_total_cards) + "<BR>";
		text = text + "　　SR・・" + formatRightNumber(tai_rare_count["SR"],5) + "枚\t" + calc_per(tai_rare_count["SR"],tai_total_cards) + "<BR>";
		text = text + "　　R ・・" + formatRightNumber(tai_rare_count["R"],5) + "枚\t" + calc_per(tai_rare_count["R"],tai_total_cards) + "<BR>";
		text = text + "　　UC・・" + formatRightNumber(tai_rare_count["UC"],5) + "枚\t" + calc_per(tai_rare_count["UC"],tai_total_cards) + "<BR>";
		text = text + "　　C ・・" + formatRightNumber(tai_rare_count["C"],5) + "枚\t" + calc_per(tai_rare_count["C"],tai_total_cards) + "<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";
	text = text + "【ブショーダス小麗】<BR>";
	if( sho_total_cards > 0 ){
		text = text + "　カード枚数：" + sho_total_cards + "枚<BR>";
		text = text + "　　UR・・" + formatRightNumber(sho_rare_count["UR"],5) + "枚\t" + calc_per(sho_rare_count["UR"],sho_total_cards) + "<BR>";
		text = text + "　　SR・・" + formatRightNumber(sho_rare_count["SR"],5) + "枚\t" + calc_per(sho_rare_count["SR"],sho_total_cards) + "<BR>";
		text = text + "　　R ・・" + formatRightNumber(sho_rare_count["R"],5) + "枚\t" + calc_per(sho_rare_count["R"],sho_total_cards) + "<BR>";
		text = text + "　　UC・・" + formatRightNumber(sho_rare_count["UC"],5) + "枚\t" + calc_per(sho_rare_count["UC"],sho_total_cards) + "<BR>";
		text = text + "　　C ・・" + formatRightNumber(sho_rare_count["C"],5) + "枚\t" + calc_per(sho_rare_count["C"],sho_total_cards) + "<BR>";
	}
	else{
		text = text + "　1枚も引いていません<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";
	text = text + "【ブショーダスライト】<BR>";
	if( l_total_cards > 0 ){
		text = text + "　カード枚数：" + l_total_cards + "枚<BR>";
		text = text + "　　SR・・" + formatRightNumber(l_rare_count["SR"],4) + "枚\t" + calc_per(l_rare_count["SR"],l_total_cards) + "<BR>";
		text = text + "　　R ・・" + formatRightNumber(l_rare_count["R"],4) + "枚\t" + calc_per(l_rare_count["R"],l_total_cards) + "<BR>";
		text = text + "　　UC・・" + formatRightNumber(l_rare_count["UC"],4) + "枚\t" + calc_per(l_rare_count["UC"],l_total_cards) + "<BR>";
		text = text + "　　C ・・" + formatRightNumber(l_rare_count["C"],4) + "枚\t" + calc_per(l_rare_count["C"],l_total_cards) + "<BR>";
	}
	else{
		text = text + "　1枚も引いていません<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";
	text = text + "<BR>";
	text = text + "UR、SR、R取得詳細<BR>";
	text = text + "----------------------------------------------------------<BR>";
	if( srup_text != "" ){
		text = text + srup_text;
	}
	else{
		text = text + "UR、SR、Rは取得していません<BR>";
	}

	text = text + "----------------------------------------------------------<BR>";

	text = text + "<BR>";
	text = text + "武将カード別取得枚数<BR>";
	text = text + "----------------------------------------------------------<BR>";

	// カードを枚数順でソートする(逆順ソート)
	card.sort(
		function(b1, b2){
			var result = -1;

			if( b1['ct'] < b2['ct'] ){
				// 枚数が小→大の順なので交換
				result = 1;
			}
			else{
				result = -1;
			}

			return result;
		}
	);

	for( var i in card ){
		text = text + "　" + card[i]['no'] + "." + card[i]['rare'] + card[i]['name'] + "\t" + formatRightNumber(card[i]['ct'],4) + "枚\t("
			+ calc_per(card[i]['ct'],total_cards) + ")\t"
			+ "GL:" + formatRightNumber(card[i]['gld'],4) + "枚"
			+ "　SL:" + formatRightNumber(card[i]['slv'],4) + "枚"
			+ "　SP:" + formatRightNumber(card[i]['sp'],4) + "枚"
			+ "　大:" + formatRightNumber(card[i]['tai'],4) + "枚"
			+ "　小:" + formatRightNumber(card[i]['sho'],4) + "枚"
			+ "　LT:" + formatRightNumber(card[i]['lgt'],4) + "枚<BR>";
	}
	text = text + "----------------------------------------------------------<BR>";

	return text;
}

// 小数桁数フォーマッタ
function fm_num(str){
	var temp;
	temp = String(str);

	if( temp.indexOf(".") < 0 ){
		temp = temp + ".00";
	}
	if( temp.indexOf(".") == 1 ){
		temp = "  " + temp;
	}
	if( temp.indexOf(".") == 2 ){
		temp = " " + temp;
	}
	if( temp.length != 6 ){
		temp = temp + "0";
	}

	return temp;
}

// カード枚数から比率を求める
function calc_per(num,base){
	return fm_num(Math.floor(num/base*10000)/100) + "%";
}

// 桁数整形
function formatRightNumber( num, length ){
	var fix = '    ';
	var str;
	var result = '';

	str = num.toString(10);
	if( str.length < length ){
		result = fix.substr(0,length - str.length) + str;
	}
	else{
		result = str;
	}

	return result;
}
