// ==UserScript==
// @name           Mouseover Translate English-Japanese EX
// @description    Mouseover Translate English-Japanese を機能拡張してみました。
// @namespace      http://userscripts.org/users/81100
// @editor         chemera
// @version        1.03.11
// @include        *
// ==/UserScript==

(function(){
/**************************************ユーザー設定**********************************************/
const SEARCH_SITE = "Progressive"            // 翻訳サイト (Exceed(goo)："Exceed")
const LEVEL = 2;                        // ここで指定するレベル以上の単語を翻訳 (英辞郎でのみ有効)
const DELAY = 500;                      // ポップアップするまでの時間[ms] (デフォルト：500)
const BACKGROUND_COLOR = "cornsilk";    // 背景色 (デフォルト：cornsilk)
const FONT_COLOR = "black";             // 文字色 (デフォルト：black)
const FONT_SIZE = "10pt";               // 文字サイズ (デフォルト：10pt)
const CLEAR = "0.92";                   // 透明度 (デフォルト：0.92)
/************************************************************************************************/


// 共通設定
var Conf = {
	site: SEARCH_SITE,
	level: LEVEL,
	delay: DELAY,
	enabled: true,
	settimeout: false,
	regex1: /[a-zA-Z]/,		// catchMouseoverWord mouseoffset用
	regex2: /[^a-zA-Z]/,		// catchMouseoverWord onmousetext用
	regex3: /^[a-zA-Z]{3,}$/	// mousemoveイベント targetword用

};

function $(id) {
	return document.getElementById(id);
}

// ここで他のサイトを追加できる。
// GM_xmlhttprequestに渡すデータ。
// formatResultは、ポップアップ表示のためにhtmlを整形する関数。
// 文字列としてhtmlを受け取り文字列としてhtmlを返す。整形結果が存在しない場合は空文字列を返す。
var SITEINFO = {
	Exceed: {
		name: "goo!辞書 EXCEED英和辞典",
		site_url: "http://dictionary.goo.ne.jp/ej/",
		url: function(word){ return "http://dictionary.goo.ne.jp/freewordsearcher.html?MT="+word+"&mode=1&dict=%E8%BE%9E%E6%9B%B8%E6%A4%9C%E7%B4%A2&id=top&kind=ej"; },
		method: "GET",
		encode: "UTF-8",
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var formathtml = "";
			if(/<div class="prog_block".*?>([\s\S]*?)<\/div><!--\/progressive_ej-->/.test(originalhtml)){
				formathtml = RegExp.$1;
				formathtml = formathtml.replace(/\n/g, "");
				formathtml = formathtml.replace(/<script .*?>.*?<\/script>/g, "");
				formathtml = formathtml.replace(/<noscript>.*?<\/noscript>/g, "");
				formathtml = formathtml.replace(/<embed .*?\/>/g, "");
				formathtml = formathtml.replace(/<img src="/g, '<img src="http://dictionary.goo.ne.jp');
				formathtml = formathtml.replace(/<a .*?>/g, "");
				formathtml = formathtml.replace(/<\/a>/g, "");
				formathtml = formathtml.replace(/<br><br>/g, "");
				formathtml = formathtml.replace(/<br>&nbsp;/g, "<br>");
//				formathtml = formathtml.replace(/<br>/g, "<br>\n");
				var word = formathtml.replace(/\s|\n/g, '');
				if(!word) formathtml = word;
			}
			return formathtml;
		}
	},

	Progressive: {
		name: "Yahoo!辞書 eプログレッシブ英和中辞典",
		site_url: "http://dic.yahoo.co.jp/",
		url: function(word){ return "http://dic.yahoo.co.jp/detail?p="+word+"&stype=0&dtype=1"; },
		method: "GET",
		encode: "UTF-8",
		cleaning: function(formathtml) {
			formathtml = formathtml.replace(/\n/g, "");
			formathtml = formathtml.replace(/<table .*?>/g, "");
			formathtml = formathtml.replace(/<\/table>/g, "");
			formathtml = formathtml.replace(/<tbody>/g, "");
			formathtml = formathtml.replace(/<\/tbody>/g, "");
			formathtml = formathtml.replace(/<tr.*?>/g, "");
			formathtml = formathtml.replace(/<\/tr>/g, "");
			formathtml = formathtml.replace(/<td.*?>/g, "");
			formathtml = formathtml.replace(/<\/td>/g, "");
			formathtml = formathtml.replace(/<small>/g, "");
			formathtml = formathtml.replace(/<\/small>/g, "");
			formathtml = formathtml.replace(/<!--.*?-->/g, "");
			formathtml = formathtml.replace(/<a .*?>.*?<\/a>/g, "");
//			formathtml = formathtml.replace(/<br>/g, "<br>\n");
			var word = formathtml.replace(/\s|\n/g, '');
			if(!word) formathtml = word;
			return formathtml;
		},
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var formathtml = "";
			if(/<!-- source-dic -->([\s\S]*?)<!-- \/source-dic -->/.test(originalhtml)){
				formathtml = RegExp.$1;
				formathtml = this.cleaning(formathtml);
			}
			return formathtml;
		}
	},


// exciteのような一旦候補リストを作るサイトはextract_urlを定義して、htmlからURLを抽出すること。
	excite: {
		name: "excite 研究社 新英和中辞典",
		site_url: "http://www.excite.co.jp/dictionary/english_japanese/",
		url: function(word){ return "http://www.excite.co.jp/dictionary/english_japanese/?match=exact&dictionary=NEW_EJJE&search="+word+"&_submit="+encodeURI(" 検 索 "); },
		method: "GET",
		encode: "UTF-8",
// 必要な部分を含んだブロックを抽出する
		extract_block: function(html) {
			var p = html.indexOf('<blockquote>');
			if(p > 0) {
				html = html.substr(p);
			}
			p = html.indexOf('</blockquote>');
			if(p > 0) {
				html = html.substr(0, p+13);
			}
			return html;
		},
// 不要な部分を取り除く。
		cleaning: function(formathtml) {
			formathtml = formathtml.replace(/\n/g, "");
			formathtml = formathtml.replace(/<a .*?>.*?<\/a>/gi, "");
//			formathtml = formathtml.replace(/<a .*?>/gi, "");
//			formathtml = formathtml.replace(/<\/a>/gi, "");
			formathtml = formathtml.replace(/<br><br>/g, "<br>");
//			formathtml = formathtml.replace(/<br>/g, "<br>\n");
			var word = formathtml.replace(/\s|\n/g, '');
			if(!word) formathtml = word;
			return formathtml;
		},
// 一旦候補リストを作るサイトはextract_urlを定義してURLを配列で返すこと。
		extract_url: function(originalhtml) {
			var html = this.extract_block(originalhtml);
			var doc = document.createElement('div');
			doc.innerHTML = html;
			var nodes = xpath('.//ol/li/a', doc);
			var urls = new Array(0);
			if(nodes.length == 0) return urls;
			for(var i = 0; i < nodes.length; i++) {
				urls.push(this.site_url+nodes[i].getAttribute('href').match(/\?search.*$/));
//GM_log("urls["+i+"]:"+urls[i]);
			}
			return urls;
		},
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var formathtml = "";
			var html = this.extract_block(originalhtml);
			var doc = document.createElement('div');
			doc.innerHTML = html;
			var nodes = xpath('.//p[1]', doc);
			if(nodes.length) {
				formathtml = nodes[0].innerHTML;
				formathtml = this.cleaning(formathtml);
			}
			return formathtml;
		}
	},

	exciteComp: {
		name: "excite 研究社 英和コンピューター用語辞典",
		site_url: "http://www.excite.co.jp/dictionary/english_japanese/",
		url: function(word){ return "http://www.excite.co.jp/dictionary/english_japanese/?match=exact&dictionary=COMP_EJ&search="+word+"&_submit="+encodeURI(" 検 索 "); },
		method: "GET",
		encode: "UTF-8",
		extract_url: function(originalhtml) {
			return SITEINFO.excite.extract_url(originalhtml);
		},
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			return SITEINFO.excite.formatResult(originalhtml);
		}
	},

// BIGLOBEのような一旦候補リストを作るサイトはextract_urlを定義して、htmlからURLを抽出すること。
	BIGLOBE: {
		name: "BIGLOBE エクシード英和辞典",
		site_url: "http://search.biglobe.ne.jp/dic/",
		url: function(word){ return "http://jisyo.search.biglobe.ne.jp/cgi-bin/search_key?q="+word+"&sub=%B8%A1%BA%F7&ej=1&type=2&dic=0&s=1&e=5&mode=0&ns=1&ct=3&dm=%BC%AD"; },
		method: "GET",
		encode: "UTF-8",
// 必要な部分を含んだブロックを抽出する
		extract_block: function(html) {
			var p = html.indexOf('<div id="jisyoContent">');
			if(p > 0) {
				html = html.substr(p);
			}
			p = html.indexOf('<div id="footer">');
			if(p > 0) {
				html = html.substr(0, p);
			}
			return html;
		},
// 不要な部分を取り除く。
		cleaning: function(formathtml) {
			formathtml = formathtml.replace(/\n/g, "");
			formathtml = formathtml.replace(/<div class="jisyoWordHanrei">.*?<\/div>/g, "");
			formathtml = formathtml.replace(/<img src="/g, '<img src="http://search.biglobe.ne.jp');
			formathtml = formathtml.replace(/<a .*?>/gi, "");
			formathtml = formathtml.replace(/<\/a>/gi, "");
			var word = formathtml.replace(/\s|\n/g, '');
			if(!word) formathtml = word;
			return formathtml;
		},
// 上記のブロックから単語の訳の部分を抽出する。
		extract_result: function(doc) {
			var html = '';
			var query = './/div[@id="jisyoHeader"]/big | .//div[@class="jisyoWordDescription"]';
			var nodes = xpath(query, doc);
			if(nodes.length) {
				for(var i = 0; i < nodes.length; i++) {
					html += nodes[i].innerHTML;
				}
				html = this.cleaning(html);
			}
			return html;
		},
// 一旦候補リストを作るサイトはextract_urlを定義してURLを配列で返す事
// ただし、BIGLOBEのように1個目がリンクでなく、HTML内に表示されている場合は、抽出結果を格納する。
		extract_url: function(originalhtml) {
			var html = this.extract_block(originalhtml);
			var doc = document.createElement('div');
			doc.innerHTML = html;
			var query = '//li[@class="jisyoListFocus"]|//div[@class="jisyoList"]/ul/li/a[contains(@href,"search_wd")]';
			var nodes = xpath(query, doc);
			var urls = new Array(0);
			if(nodes.length == 0) return urls;
			for(var i = 0; i < nodes.length; i++) {
				if(nodes[i].tagName == 'A') {
// リンクならURLを格納
					urls.push(nodes[i].getAttribute('href'));
				} else {
// リンクでないならHTMLから単語の訳の部分を抽出して格納する。
					urls.push(this.extract_result(doc));
				}
			}
			return urls;
		},
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var html = this.extract_block(originalhtml);
			var doc = document.createElement('div');
			doc.innerHTML = html;
			return this.extract_result(doc);
		}
	},

	Weblio: {
		name: "Weblio 研究社 新英和中辞典",
		site_url: "http://ejje.weblio.jp/",
		url: function(word){ return "http://ejje.weblio.jp/content_find?query="+word+"&searchType=exact"; },
		method: "GET",
		encode: "UTF-8",
		cleaning: function(formathtml) {
			var p = formathtml.indexOf("<div class=kiji>");
			formathtml = formathtml.substr(p);
			formathtml = formathtml.replace(/\n/g, "");
			formathtml = formathtml.replace(/<object.*?>.*?<\/object>/g, "");
			formathtml = formathtml.replace(/<div class=maegaki>.*?<\/div>/g, "");
			formathtml = formathtml.replace(/<tbody>/g, "");
			formathtml = formathtml.replace(/<\/tbody>/g, "");
			formathtml = formathtml.replace(/<tr.*?>/g, "");
			formathtml = formathtml.replace(/<\/tr>/g, "");
			formathtml = formathtml.replace(/<td.*?>/g, "");
			formathtml = formathtml.replace(/<\/td>/g, "");
			formathtml = formathtml.replace(/<div.*?>/g, "");
			formathtml = formathtml.replace(/<\/div>/g, "<br>");
			formathtml = formathtml.replace(/<img class=onsei.*?>/ig, "");
			formathtml = formathtml.replace(/<span.*?>/g, "");
			formathtml = formathtml.replace(/<\/span>/g, "");
			formathtml = formathtml.replace(/<small>/g, "");
			formathtml = formathtml.replace(/<\/small>/g, "");
			formathtml = formathtml.replace(/<!--.*?-->/g, "");
//			formathtml = formathtml.replace(/<a .*?>.*?<\/a>/gi, "");
			formathtml = formathtml.replace(/<a .*?>/gi, "");
			formathtml = formathtml.replace(/<\/a>/gi, "");
			formathtml = formathtml.replace(/<br><br>/g, "<br>");
			formathtml = formathtml.replace(/<br>/g, "<br>\n");
			var word = formathtml.replace(/\s|\n/g, '');
			if(!word) formathtml = word;
			return formathtml;
		},
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var formathtml = "";
			if(/<!--開始 研究社 新英和中辞典-->([\s\S]*?)<!--終了 研究社 新英和中辞典-->/.test(originalhtml)){
				formathtml = RegExp.$1;
				formathtml = this.cleaning(formathtml);
			}
			return formathtml;
		}
	},

	WeblioComp: {
		name: "Weblio 研究社 英和コンピューター用語辞典",
		site_url: "http://ejje.weblio.jp/",
		url: function(word){ return "http://ejje.weblio.jp/content_find?query="+word+"&searchType=exact"; },
		method: "GET",
		encode: "UTF-8",
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var formathtml = "";
			if(/<!--開始 研究社 英和コンピューター用語辞典-->([\s\S]*?)<!--終了 研究社 英和コンピューター用語辞典-->/.test(originalhtml)){
				formathtml = RegExp.$1;
				formathtml = SITEINFO.Weblio.cleaning(formathtml);
			}
			return formathtml;
		}
	},

// POST型のサイトを追加する場合、headersとdataを追加する必要がある(headersは空のハッシュでもいいかもしれない)。
// ミラーのあるサイトを追加する場合、mirrorとmirror_noを追加する必要がある。
// site_urlはミラー毎に異なるのでどのミラーかを判別する番号を呼び出し元から受け取る。
// this.mirror_noのサイトを表示しないのは、フォーム上のカレントサイトを表示するため。
// urlもミラー毎に異なるのでどのミラーかを自身のmirror_noを使用する。
// こっちは選択確定されているサイトを呼び出すのでthis.mirror_noを使用する。
	WebLSD: {
		name: "WebLSDオンライン辞書",
		mirror: [	// nameはプルダウンの表示用、urlは実際のアクセス先
			{ name:"京都1", url:"http://lsd.pharm.kyoto-u.ac.jp" },
			{ name:"京都2", url:"http://lsd-project.jp" },
			{ name:"東京", url:"http://lsd.bioscinet.org" }
			],
		mirror_no: 0,
		site_url: function(no) { return this.mirror[no].url+"/ja/service/weblsd/index.html" },
		url: function(word){ return this.mirror[this.mirror_no].url+"/cgi-bin/lsdproj/ejlookup04.pl?opt=c"; },
		method: "POST",
		headers: {
			"User-Agent": window.navigator.userAgent,
//			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
//			"Accept-Language": "en-us,ja;q=0.7,en;q=0.3",
//			"Accept-Encoding": "gzip,deflate",
			"Accept-Charset": "Shift_JIS,utf-8;q=0.7,*;q=0.7",
//			"Content-type": "application/x-www-form-urlencoded",
			"Cookie": "language=ja"
		},
		data: function(word){
			return encodeURI("inflect=Ignore&inherit=yes&linkmode=begin%20with&max=200&mode=exactly%20match&query="+word+"&romaji=no");
		},
		encode: "UTF-8",
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var formathtml = "";
			if(/<div class="meaning">([\s\S]*?)<div class="note">/.test(originalhtml)){
				formathtml = RegExp.$1;
				formathtml = formathtml.replace(/\n/g, "");
				formathtml = formathtml.replace(/<span .*?>/g, "");
				formathtml = formathtml.replace(/<\/span>/g, "");
				formathtml = formathtml.replace(/<div.*?>/g, "<br />");
				formathtml = formathtml.replace(/<\/div>/g, "");
				formathtml = formathtml.replace(/<a .*?>/g, "");
				formathtml = formathtml.replace(/<\/a>/g, "");
//				formathtml = formathtml.replace(/<br>/g, "<br />\n");
				var word = formathtml.replace(/\s|\n/g, '');
				if(!word) formathtml = word;
			}
			return formathtml;
		}
	},

// ここから英英辞書
	WorldWebOnline: {
		name: "WorldWeb Online(英英辞書)",
		site_url: "http://www.wordwebonline.com/",
		url: function(word){ return "http://www.wordwebonline.com/en/"+word.toUpperCase(); },
		method: "GET",
		encode: "UTF-8",
// 必要な部分を含んだブロックを抽出する
		extract_block: function(html) {
			var p = html.indexOf('<SPAN CLASS="head">');
			if(p > 0) {
				html = html.substr(p);
			} else {
				return '';
			}
			p = html.indexOf('<P class="rellnk">');
			if(p > 0) {
				html = html.substr(0, p);
			}
			return html;
		},
// 不要な部分を取り除く。
		cleaning: function(formathtml) {
			formathtml = formathtml.replace(/\n/g, "");
			formathtml = formathtml.replace(/<a .*?>/gi, "");
			formathtml = formathtml.replace(/<\/a>/gi, "");
			var word = formathtml.replace(/\s|\n/g, '');
			if(!word) formathtml = word;
			return formathtml;
		},
		temporary_target: true,	// 一時変更対象。拡張機能時のみ。
		formatResult: function(originalhtml){
			var formathtml = this.extract_block(originalhtml);
			formathtml = this.cleaning(formathtml);
			return formathtml;
		}
	}

}

// マウスオーバーされた単語を取得
// マウスオーバーされたノードをEvent.rangeParentで取得し、その中のマウスの位置をEvent.rangeOffsetで取得。
// rangeParentの仕様なのか、文字から離れた部分でも文字と認識してしまうことがあるので、elementFromPointで調整。
// そこにある文字がアルファベットだった場合に、文字の前後を一文字ずつ探索していって、
// アルファベット以外の文字に辿り着いたら探索終了。探索された範囲が単語となる。
// 単語が存在しなかった場合は空文字列を返す。
function catchMouseoverWord(event){
	var onmousenode, onmousetext, mouseoffset, startoffset, endoffset, i;
	var word = "";
	onmousenode = event.rangeParent;

// 動作上は問題ないがFx 3.5.x はテキストボックスの上で、onmousenodeがnullになってコンソールにエラー吐きまくるので条件に追加
	if(onmousenode && onmousenode.nodeType == 3 && onmousenode.parentNode == document.elementFromPoint(event.clientX, event.clientY)){
		onmousetext = onmousenode.nodeValue;
		mouseoffset = event.rangeOffset;
// 正規表現にマッチする語を取得する。
		if(mouseoffset < onmousetext.length && Conf.regex1.test(onmousetext[mouseoffset])){
			for(startoffset=mouseoffset; startoffset>0; startoffset--){
				if(Conf.regex2.test(onmousetext[startoffset - 1])) break;
			}
			for(endoffset=mouseoffset; endoffset<onmousetext.length-1; endoffset++){
				if(Conf.regex2.test(onmousetext[endoffset + 1])) break;
			}
// 拡張機能有効でアポストロフィ含ませる場合の後処理
			if(Extention.extend_mode == true &&
			   Extention.include_apostrophe == true) {
// 最後の'は削除
				if(onmousetext[endoffset] == "'") {
					endoffset--;
				}
// 最初の'も削除
				if(onmousetext[startoffset] == "'") {
					startoffset++;
				}
			}
			for(i=startoffset; i<=endoffset; i++) word += onmousetext[i];
		}
	}
	return word;
}

// 翻訳する単語を整形
// 複数形を単数形にしたり、過去形を現在形にしたりする。単語が変化する傾向に応じて条件を変える。
// 例えばtedで終わる単語は、現在形にするためにはedを消すよりもdのみを消した方が正しい可能性が高い。
function fixWordFormat(word){
	var fixword = word.toLowerCase();
	if(/(.*)ies$/.test(fixword)) fixword = RegExp.$1 + "y";
	if(/(.*)ied$/.test(fixword)) fixword = RegExp.$1 + "y";
	if(/(.*ss)es$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*ss)ed$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*[cgstvz]e)s$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*[cgstvz]e)d$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*)es$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*)ed$/.test(fixword)) fixword = RegExp.$1;
	if(/(.*[^aiuos])s$/.test(fixword)) fixword = RegExp.$1;
	return fixword;
}

// ポップアップを作成
// 生成したエレメントに受け取ったhtmlを挿入。style属性で見た目を指定。
// 基本的に右下に表示するが、ウィンドウからはみ出てしまう場合は上や左に移動。
function makePopup(popuphtml, basispositionx, basispositiony){
	var popup = document.createElement("div");
	popup.id = "motejpopup";
	var horizontalspace = 20;
	var verticalspace = 15;
	with(popup.style) {
		position = "absolute";
		left = basispositionx + horizontalspace + "px";
		top = basispositiony + verticalspace + "px";
		zIndex = "100";
		backgroundColor = BACKGROUND_COLOR;
		border = "1px solid black";
		width = "300px";
		fontSize = FONT_SIZE;
		color = FONT_COLOR;
		textAlign = "left";
		lineHeight = "140%";
		paddingLeft = "10px";
		paddingRight = "10px";
		opacity = CLEAR;
	}
	popup.innerHTML = popuphtml;
	popup = document.body.appendChild(popup);
	if(popup.offsetLeft + popup.offsetWidth - window.scrollX > window.innerWidth) popup.style.left = basispositionx - horizontalspace - popup.offsetWidth + "px";
	if(popup.offsetTop + popup.offsetHeight - window.scrollY > window.innerHeight) popup.style.top = basispositiony - verticalspace - popup.offsetHeight + "px";
	return popup;
}

// ポップアップを消去、もしくは翻訳処理をキャンセル
function deletePopup(){
	clearTimeout(popupTimerID);
	var popupnode = null;
// たまに複数表示されているので、idがmotejpopupであるすべてのnodeを削除するようにした。
	do {
		popupnode = document.getElementById("motejpopup");
		if(popupnode != null) {
			document.body.removeChild(popupnode);
		}
	} while(popupnode);
// 拡張モード時はイベント削除
	if(Extention.extend_mode == true) {
		window.removeEventListener("keydown", Query.Check_Event, false);
	}
	Query.working = false;
}

var Util = {
	// Triming left and right space
	Trim: function(str) {
		return str.replace( /^\s*/, "" ).replace( /\s*$/, "" );
	},

	// Triming right space
	Rtrim: function(str) {
		return str.replace( /\s*$/, "" );
	},

	// Triming left space
	Ltrim: function(str) {
		return str.replace( /^\s*/, "" );
	},

	// no operation
	NoOperation: function() {
	}
};

// Drag and Drop object
var DnD = {
	startX:0,		// Starting mouse X position
	startY:0,		// Starting mouse Y position
	offsetLeft:0,		// Starting drag_obj left position
	offsetTop:0,		// Starting drag_obj top position
	click_obj: null,	// trigger object
	drag_obj: null,		// drag object
	callback: [],		// callback functions
	status: 0,		// drag status

// Initialize DnD object with click_obj and drag_obj.
// click_obj: a trigger object when the mouse button was clicked.
// drag_obj: the object which should be dragged.
// The parameter is allowed string and node object.
// If the parameter is string,it has to be the node ID.
	initialize: function(click_obj, drag_obj) {
		if( typeof click_obj == 'object') {
			this.click_obj = click_obj;
		} else if( typeof click_obj == 'string') {
			this.click_obj = $(click_obj);
		} else {
			return false;
		}
		if( typeof drag_obj == 'object') {
			this.drag_obj = drag_obj;
		} else if( typeof drag_obj == 'string') {
			this.drag_obj = $(drag_obj);
		} else {
			return false;
		}
		this.click_obj.addEventListener('mousedown', 
			function(e){
				DnD.start(e);
			}, 
			true);
		DnD.status = 0;
		document.addEventListener("mousemove", DnD.dragging, true);
		document.addEventListener("mouseup", DnD.stop, true);
	},

// Set a callback function.
// The callback function is called with click_obj and drag_obj parameter before the function phase finished.
	setCallback: function(stat, callback) {
		if( typeof callback == 'function') {
			var phase = ['start','dragging','stop'].indexOf(stat);
			if(phase >= 0) {
				this.callback[phase] = callback;
			}
		}
	},

// Drag start
	start: function(e) {
		DnD.startX = e.clientX;
		DnD.startY = e.clientY;
		DnD.offsetLeft  = DnD.drag_obj.offsetLeft;
		DnD.offsetTop   = DnD.drag_obj.offsetTop;
		e.preventDefault();
		DnD.click_obj.style.cursor = '-moz-grabbing';
		if(DnD.callback[0]) {
			DnD.callback[0](DnD.click_obj, DnD.drag_obj);
		}
		DnD.status = 1;
	},

// Dragging
	dragging: function(e) {
		if(DnD.status != 1) {
			return;
		}
		e.preventDefault();
		var x = DnD.offsetLeft + e.clientX - DnD.startX;
		var y = DnD.offsetTop + e.clientY - DnD.startY;
		DnD.drag_obj.style.left = x + "px";
		DnD.drag_obj.style.top = y + "px";
		if(DnD.callback[1]) {
			DnD.callback[1](DnD.click_obj, DnD.drag_obj);
		}
	},

// Drag stop
	stop: function(e) {
		if(DnD.status != 1) {
			return;
		}
		DnD.status = 0;
		DnD.click_obj.style.cursor = '-moz-grab';
		if(DnD.callback[2]) {
			DnD.callback[2](DnD.click_obj, DnD.drag_obj);
		}
	},

	finalize: function() {
		document.removeEventListener("mousemove", DnD.dragging, true);
		document.removeEventListener("mouseup", DnD.stop, true);
		this.status = 0;
		this.click_obj = null;
		this.drag_obj = null;
		for(var i = 0; i < this.callback.length; i++) this.callback[i] = null;
	}
};

// Balloon(Tooltip)
var	Balloon = {
	parent: null,
	node: null,
	distX: 0,
	distY: 10,
	style: <><![CDATA[
		z-index: 200001;
		width: auto;
		height: auto;
		min-width: 100px;
		color: black;
		position:fixed;
		font-size:12px;
		background-color:#CCFFFF;
		border: 1px solid black;
		padding:4px;
		-moz-border-radius: 10px;
	]]></>+"",
	set_style: function(style) {
		if(!style) {
			this.style = style;
		}
	},
	create: function(e, parent, text, style) {
		if(typeof parent == 'string') {
			parent = $(parent);
		}
		if(typeof parent != 'object') {
			return;
		}
		var node = document.createElement('div');
		node.innerHTML = text;
		if(!style) {
			style = this.style;
		}
		node.setAttribute('style', style);
		parent.appendChild(node);
		var x = e.pageX - window.scrollX - node.offsetWidth/2;
		var y = e.pageY - window.scrollY + this.distY;
		node.style.left = x + "px";
		node.style.top = y + "px";

		this.parent = parent;
		this.node = node;
	},
	destroy: function() {
		if(this.parent) {
			this.parent.removeChild(this.node);
		}
		this.parent = null;
		this.node = null;

	},
};


// Language
var Lang = {
	default_lang: 'ja',
	lang: 'ja',
	set_lang: function(lang) {
		this.lang = lang;
	},
	initialize: function() {
		this.set_lang(navigator.language);
//		this.set_lang('en');	// for test
//		this.set_lang('fr');	// for test
	}
};

// Message
var Msg = {
	help: {
		en: "click: main site<br/>shift + click: mirror site",
		ja: "クリック: メインサイト<br/>shiftキーを押しながらクリック = ミラーサイト"
	},
	msg: function(target) {
		if(Msg[target]) {
			if(Msg[target][Lang.lang]) {
				return Msg[target][Lang.lang];
			} else {
				return Msg[target][Lang.default_lang];
			}
		} else {
			return '';
		}
	}
};

// Help
var Help = {
	site: {
		main: 'http://chemera.coolpage.biz/',
		mirror: 'http://www.chemera.byteact.com/',
	},
	page: {
		ja: 'Mouseover_Translate_English_Japanese_j.html#form'
	},
	url: function(site) {
		if(this.site[site]) {
			if(this.page[Lang.lang]) {
				return this.site[site]+this.page[Lang.lang];
			} else {
				return this.site[site]+this.page[Lang.default_lang];
			}
		} else {
			return '';
		}
	},
	show: function(site) {
		if(Help.url(site)) {
			window.open(Help.url(site));
		}
	}
};

function deserialize(name, def) {
	return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
	GM_setValue(name, uneval(val));
}

// フォーム処理
var	suffix = "_for_MouseoverTranslateEnglishJapaneseEX";
var Form = {
// properties
	margin_x: 20,	// 20 pixel
	margin_y: 20,	// 20 pixel
	x: 0,
	y: 0,
	current_mode: 0,
	default_enabled_sites: ['userscripts.org'],
	default_popup_style: <><![CDATA[
		z-index: 100;
		background-color: cornsilk;
		border: 1px solid black;
		width: auto;
		font-size: 10pt;
		color: black;
		text-align: left;
		line-height: 140%;
		padding-left: 10px;
		padding-right: 10px;
		opacity: 0.92;
		overflow: auto;
		padding: 0 0 4px 3px;
		min-width: 300px;
		max-width: 300px;
	]]></>+"",
	add_enable: true,
	del_enable: false,

	site: SEARCH_SITE,
	dictionary_sites: [],
	work_mirror_no: [],
	mirror_no: 0,
	enabled: true,
	settimeout: false,
	extend_mode: true,
	display_stat_word: false,
	display_stat_site: false,
	display_stat_url: false,
	include_apostrophe: false,
	enabled_sites: [],
	level: LEVEL,
	delay: DELAY,
	popup_style: '',
	temporary_target: {},
	temporary_target_work: {},

	exit_cb: null,

// IDs
	base_id: "gm_base" + suffix,
	base_style_id: "gm_base_style" + suffix,
	div_id: "gm_div" + suffix,
	title_id: "gm_title" + suffix,
	command_id: "gm_command" + suffix,
	reset_id: "gm_reset_button" + suffix,
	save_id: "gm_save_button" + suffix,
	quit_id: "gm_quit_button" + suffix,
	help_id: "gm_help_button" + suffix,
	visit_id: "gm_visit_button" + suffix,
	add_id: "gm_add_button" + suffix,
	del_id: "gm_del_button" + suffix,
	default_id: "gm_default_button" + suffix,
	setting_div_id: "gm_setting_div" + suffix,
	extend_div_id: "gm_extend_div" + suffix,
	dictionary_sites_id: "gm_dictionary_sites" + suffix,
	dictionary_name_id: "gm_dictionary_name" + suffix,
	mirror_id: "gm_mirror" + suffix,
	word_level_id: "gm_word_level" + suffix,
	enabled_sites_div_id: "gm_enabled_sites_div" + suffix,
	enabled_id: "gm_enabled" + suffix,
	settimeout_id: "gm_settimeout" + suffix,
	extend_mode_id: "gm_extend_mode" + suffix,
	include_apostrophe_id: "gm_include_apostrophe" + suffix,
	display_stat_word_id: "gm_display_stat_word" + suffix,
	display_stat_site_id: "gm_display_stat_site" + suffix,
	display_stat_url_id: "gm_display_stat_url" + suffix,
	site_textbox_id: "gm_site_textbox" + suffix,
	enabled_sites_id: "gm_enabled_sites" + suffix,
	level_id: "gm_level" + suffix,
	level_help_id: "gm_level_help" + suffix,
	div_level_help_id: "gm_div_level_help" + suffix,
	delay_id: "gm_delay" + suffix,
	customize_checkbox_id: "gm_customize_checkbox" + suffix,
	textarea_id: "gm_textarea" + suffix,
	temporary_target_id: "gm_temporary_target" + suffix,

// Classes
	label_class: "gm_label" + suffix,
	textbox_class: "gm_textbox" + suffix,
	button_class: "gm_button" + suffix,
	radio_label_class: "gm_radio_label" + suffix,
	radio_button_class: "gm_radio_button" + suffix,
	check_box_class: "gm_check_box" + suffix,
	select_list_class: "gm_select_list" + suffix,
	option_list_class: "gm_option_list" + suffix,
	vertical_line_class: "gm_vertical_line" + suffix,

// Styles
	div_style_close: 'display:none;',
	div_style_open: 'display:block;',
	span_style_close: 'display:none;',
	span_style_open: 'display:inline;',

	style: <><![CDATA[
	#$base_id div { min-width:100px; }
	#$div_id { width:500px;z-index:200000;border: 6px ridge gray;position:fixed;background-color:#DDDDDD;font-weight: bold;text-align:left;color:#000000;cursor:default; }
	#$div_id div{ background-color:#DDDDDD; }
	#$title_id { height:48px; font-size:12px; font-weight:bold;text-align:center;padding-top:6px;color:#FFFFFF;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAAABCAYAAADASJROAAADxklEQVRIiWXD51uVdRwH4F6XWmmlmZUZooBMZchGGYosBUU4bEHZe+912Bw2HDaHDSIbQRkiCkJlWmq5yizThuaf8OnF9/k9z3Ouc1/X/c67auEQf29vhMpN6pHYpB6JzfvYKGzeF4Ut+0U1orFFIxrvcz/QjKFa9EOtWHpAuFU7Dlu147CN1YnHNp14fKTLJvA/1qOf6CVSfbrdIAnbDZKwwyBZeJB+eihF6U7DVOw0TMVnRmwaf5cx1yQdu0zS8Tn3i8MZ1FT4pWkmNaO7zbKw2ywLX5lzLbL5e1jLHOyxzMHXVlTNKpda50HNOg97bYTqNvn0CN13tEDpfttCvoYdK4WGnRSa9lyHImg6FEFL9MCxYqXax0uoI9VxLIWOYyl0T4g6lUHXqQx6XH3ncupSAX2XChiIu1bCwLUSB93oITcZPUkNT1WpNHKvhpF7NYxZjxoYe9TA5DRbyz98hpp61ik1O1tPvYTmXg0w92qAhTdX0ggLSSMsJU2wlDTBykfUVw4rXzmsWb9mWPs1w8afHvFvoQHCowGtNJDaBrXBNqgNduy5dr59MNsB++AOOITQY+c7VR6/0EVDqWOoAo6hCpwI66bh1Cm8h+8cwfbCOaIXLpHcqD64RPXBVdQtup/G0JMxAzSWnoob5Luz8UNwjx+CRwI7DI+EYZxOFJ5JuqjUM3kEnskjOJtySalX6qhK77QxeKeNQZLOjkOSPg6fDNHMCfhkTsCX65c1SbOpf/aUMIcG5E4jIHcagWzeDALzZhCUz17mnyugwQWztJCGSOcQIp3DeekVYRG9UHxVaWjJPEJL5hFWKr6AsNIFhJdxyxcRXr6ICG5kxRKtFEZVXqMyGi1bRrRsGTFV3Orr/Fi2ZgWxNSuIq6XxtTdo3U1+Qj1NrF+lDTSpcU1pctMtfoqcXUeKfB2pzdyWDaS2bCBNNL31G6UZbd/SdprZ/h0/q4PbeRtZnbeRzc3p+p4q7iBHcQe54t13kdt9F3k9NL/nB9pLC/p+VFnYfw+F/fcgZQfuQzpwH0WD4g9QNPgAxUO0ZPgnpaUXf6YjwrKRhygbeYjyS9zRRygffYSK0ceoGH2MyjHR8SeoHH8CGTvxFLKJp6iapNWTvwinaM3Ur3Sa1s48Q+3MM9Sxl3/j18+yz1E/+xwNc7Txyu8qm67+QeepfP4F5PMv0LzwJ10Utiy+RMviS7Qusa/QuvQKbde4y3/x27kd1/+mK7Rz5R96g3bd/JevYFdfQ7H6Gt1r7Bt0r71Bzy1h7/p/Svs23qJv4y3+B1kVaAucXspFAAAAAElFTkSuQmCC");cursor:-moz-grab; }
	#$div_id #$command_id { height:32px; font-weight: bold;text-align:center;color:#FFFFFF;background-color: transparent; margin-bottom: 3px;}
	#$reset_id { }
	#$save_id { }
	#$quit_id { }
	#$help_id { }
	#$visit_id { }
	.$button_class { color:buttontext;background-color:buttonface;height:24px;border:2px outset buttonface;margin:4px 4px 4px 30px; }
	.$button_class:hover { cursor:pointer; }
	.$label_class { font-size:12px;vertical-align:middle;height:36px;margin: 4px; }
	.$textbox_class { font-size:12px;vertical-align:middle;height:20px;margin: 4px; }
	.$radio_label_class { color: #000000; background-color:#DDDDDD; font-size:12px; }
	.$radio_button_class { margin-top:10px;vertical-align:bottom;background-color:#DDDDDD; }
	.$check_box_class { height:16px;width:16px;margin:4px 0px 0px 10px;vertical-align:middle; }
	.$vertical_line_class { height:16px;width:1px;margin:0px 4px 0px 4px;vertical-align:middle; border-left:1px solid black;}
	#$setting_div_id { margin-top: 3px;}
	#$extend_div_id { }
	#$enabled_sites_div_id { }
	#$dictionary_sites_id { }
	#$dictionary_name_id { }
	#$word_level_id { }
	#$enabled_id { margin-left:2px; }
	#$settimeout_id { margin-left:2px; }
	#$extend_mode_id { margin-left:2px; }
	#$include_apostrophe_id { margin-left:2px; }
	#$display_stat_word_id { margin-left:2px; }
	#$display_stat_site_id { margin-left:2px; }
	#$display_stat_url_id { margin-left:2px; }
	#$level_id { padding-left:4px; }
	#$level_help_id { border: 1px solid #888888; background-color:#FFFF88;padding:0 4px 0 4px;}
	#$level_help_id:hover { cursor:help; }
	#$delay_id { padding-left:4px; width:38px; }
	#$site_textbox_id { padding-left:4px; width: 300px; }
	#$add_id { position:relative; top: 0px; left: 120px; color:buttontext; cursor:auto; }
	#$del_id { position:relative; top: 0px; left: 180px; color:buttonshadow; cursor:auto; }
	#$default_id { position:relative; left: 20px; color:buttontext; cursor:auto; }
	#$enabled_sites_id { position:relative; left: 100px; min-width: 300px; max-width: 420px;}
	#$textarea_id { width:95%;height:160px;color:#000000;background-color:#FFFFFF;border:2px inset; margin:10px;font-size: 12px; }
	#$div_id hr { margin: 2px; border-color: #888888; } 
	]]></>+"",

// Form HTML
	html: <><![CDATA[
	<div id="$div_id" style="display: none;">
	<div id="$title_id">Mouseover Translate English-Japanese EX
	<div id="$command_id">
	<input id="$reset_id" type="button" class="$button_class" value="リセット" />
	<input id="$save_id" type="button" class="$button_class" value="保存" />
	<input id="$quit_id" type="button" class="$button_class" value="破棄" />
	<input id="$help_id" type="button" class="$button_class" value="ヘルプ" />
	<input id="$visit_id" type="button" class="$button_class" value="サイトを表示" />
	</div>
	</div>

	<div id="$setting_div_id">
	<span class="$label_class">辞書選択:</span>
	<select id="$dictionary_sites_id">
	</select>
	<span class="$label_class" id="$dictionary_name_id"></span>
	<select id="$mirror_id">
	</select>
	<br />
	<span class="$label_class">翻訳機能:</span>
	<input type="checkbox" class="$check_box_class" id="$enabled_id" ></input><span class="$label_class">有効にする</span>
	<span class="$vertical_line_class"></span>
	<span class="$label_class">疑似setTimeout:</span>
	<input type="checkbox" class="$check_box_class" id="$settimeout_id" ></input><span class="$label_class">有効にする</span>
	<br />

	<span class="$label_class">ポップアップの遅延時間:</span>
	<input type="text" class="$textbox_class" id="$delay_id" size=2></input><span class="$label_class">ミリ秒</span>

	<span id="$word_level_id">
	<span class="$vertical_line_class"></span>
	<span class="$label_class">単語レベル:</span>
	<input type="text" class="$textbox_class" id="$level_id" size=2></input><span class="$label_class">以上</span>
	<span id="$level_help_id">?</span>

	</div>

	<hr />

	<div id="$extend_div_id">
	<span class="$label_class">拡張機能:</span>
	<input type="checkbox" class="$check_box_class" id="$extend_mode_id" ></input><span class="$label_class">有効にする</span>
	<span class="$vertical_line_class"></span>
	<span class="$label_class">アポストロフィ:</span>
	<input type="checkbox" class="$check_box_class" id="$include_apostrophe_id" ></input><span class="$label_class">単語の一部とみなす</span>
	<br />
	<span class="$label_class">状況表示:</span>
	<input type="checkbox" class="$check_box_class" id="$display_stat_word_id" ></input><span class="$label_class">単語</span>
	<input type="checkbox" class="$check_box_class" id="$display_stat_site_id" ></input><span class="$label_class">辞書</span>
	<input type="checkbox" class="$check_box_class" id="$display_stat_url_id" ></input><span class="$label_class">URL</span>
	<span class="$vertical_line_class"></span>
	<span class="$label_class">一時変更:</span>
	<input type="checkbox" class="$check_box_class" id="$temporary_target_id" ></input><span class="$label_class">対象にする</span>

	<div id="$enabled_sites_div_id">
	<span class="$label_class">常時有効サイト:</span>
	<input id="$site_textbox_id" type="text" class="$textbox_class" value="" /></input>

	<div>
	<input id="$add_id" type="button" class="$button_class" value="追加" />
	<input id="$del_id" type="button" class="$button_class" value="削除" />
	</div>

	<select id="$enabled_sites_id" size="5" multiple>
	</select>
	</div>

	<span class="$label_class">ポップアップのCSS:</span>
	<input type="checkbox" class="$check_box_class" id="$customize_checkbox_id" ></input><span class="$label_class">編集する</span>
	<input id="$default_id" type="button" class="$button_class" value="デフォルトのCSSに戻す" />
	<textarea id="$textarea_id" style="display:none;"></textarea>

	</div>
	]]></>+"",

// functions
	replace: function(word) {
		word = word.replace(/\$base_id/g,this.base_id);
		word = word.replace(/\$div_id/g,this.div_id);
		word = word.replace(/\$title_id/g,this.title_id);
		word = word.replace(/\$command_id/g,this.command_id);
		word = word.replace(/\$reset_id/g,this.reset_id);
		word = word.replace(/\$save_id/g,this.save_id);
		word = word.replace(/\$quit_id/g,this.quit_id);
		word = word.replace(/\$help_id/g,this.help_id);
		word = word.replace(/\$visit_id/g,this.visit_id);
		word = word.replace(/\$add_id/g,this.add_id);
		word = word.replace(/\$del_id/g,this.del_id);
		word = word.replace(/\$default_id/g,this.default_id);
		word = word.replace(/\$setting_div_id/g,this.setting_div_id);
		word = word.replace(/\$extend_div_id/g,this.extend_div_id);
		word = word.replace(/\$enabled_sites_div_id/g,this.enabled_sites_div_id);
		word = word.replace(/\$enabled_id/g,this.enabled_id);
		word = word.replace(/\$settimeout_id/g,this.settimeout_id);
		word = word.replace(/\$extend_mode_id/g,this.extend_mode_id);
		word = word.replace(/\$display_stat_word_id/g,this.display_stat_word_id);
		word = word.replace(/\$display_stat_site_id/g,this.display_stat_site_id);
		word = word.replace(/\$display_stat_url_id/g,this.display_stat_url_id);
		word = word.replace(/\$temporary_target_id/g,this.temporary_target_id);
		word = word.replace(/\$include_apostrophe_id/g,this.include_apostrophe_id);
		word = word.replace(/\$site_textbox_id/g,this.site_textbox_id);
		word = word.replace(/\$enabled_sites_id/g,this.enabled_sites_id);
		word = word.replace(/\$dictionary_sites_id/g,this.dictionary_sites_id);
		word = word.replace(/\$mirror_id/g,this.mirror_id);
		word = word.replace(/\$dictionary_name_id/g,this.dictionary_name_id);
		word = word.replace(/\$word_level_id/g,this.word_level_id);
		word = word.replace(/\$level_id/g,this.level_id);
		word = word.replace(/\$level_help_id/g,this.level_help_id);
//		word = word.replace(/\$div_level_help_id/g,this.div_level_help_id);
		word = word.replace(/\$delay_id/g,this.delay_id);
		word = word.replace(/\$customize_checkbox_id/g,this.customize_checkbox_id);
		word = word.replace(/\$textarea_id/g,this.textarea_id);
		word = word.replace(/\$label_class/g,this.label_class);
		word = word.replace(/\$textbox_class/g,this.textbox_class);
		word = word.replace(/\$button_class/g,this.button_class);
		word = word.replace(/\$radio_button_class/g,this.radio_button_class);
		word = word.replace(/\$radio_label_class/g,this.radio_label_class);
		word = word.replace(/\$check_box_class/g,this.check_box_class);
		word = word.replace(/\$vertical_line_class/g,this.vertical_line_class);
		return word;
	},

	initialize: function(exit_cb) {
		this.default_popup_style = this.default_popup_style.replace(/\t|^\n/g,"");
		this.html = this.replace(this.html);
		this.style = this.replace(this.style);
		this.exit_cb = exit_cb;
		var keys;
		this.dictionary_sites = new Array(0);
		this.work_mirror_no = new Array(0);
//		this.temporary_target = new Array(0);
//		this.temporary_target_work = new Array(0);
		for (keys in SITEINFO) {
			this.dictionary_sites.push(keys);
			this.work_mirror_no[keys] = 0;
		}
	},

	addForm: function() {
		// create a new box for adding form
		var	div = document.createElement('div');
		div.id = this.base_id;
		div.innerHTML = this.html;
		var	style = document.createElement('style');
		style.id = this.base_style_id;
		style.innerHTML = this.style;

		// append above code in original page
		var body = document.getElementsByTagName("body");
		body[0].appendChild(style);
		body[0].appendChild(div);
		$(Form.reset_id).addEventListener("click",Form.Reset,true);
		$(Form.quit_id).addEventListener("click",Form.Quit,true);
		$(Form.help_id).addEventListener("click", function(e){ Form.Help(e); },true);
		$(Form.help_id).addEventListener("mouseover",function(e){ Form.Help_Balloon(e, true);},true);
		$(Form.help_id).addEventListener("mouseout",function(e){ Form.Help_Balloon(e, false);},true);
		$(Form.save_id).addEventListener("click",Form.Save,true);
		$(Form.visit_id).addEventListener("click",Visit_Site,true);
		$(Form.level_help_id).addEventListener("mouseover",function(e){Level_Help(e, true);},true);
		$(Form.level_help_id).addEventListener("mouseout",function(e){Level_Help(e, false);},true);
		$(Form.add_id).addEventListener("click",Add_To_List,true);
		$(Form.del_id).addEventListener("click",Del_From_List,true);
		$(Form.default_id).addEventListener("click",Set_Default_CSS,true);
		$(Form.customize_checkbox_id).addEventListener("click",Customize,true);
		$(Form.dictionary_sites_id).addEventListener("change",Dictionary_Selected,true);
		$(Form.dictionary_sites_id).addEventListener("keyup",Dictionary_Selected,true);
		$(Form.mirror_id).addEventListener("change",Mirror_Selected,true);
		$(Form.mirror_id).addEventListener("keyup",Mirror_Selected,true);
		$(Form.site_textbox_id).addEventListener("keyup",Add_Enable,true);
//		$(Form.enabled_sites_id).addEventListener("click",Selected_Site,true);
//		$(Form.enabled_sites_id).addEventListener("select",Selected_Site,true);
		$(Form.enabled_sites_id).addEventListener("keyup",Selected_Site,true);
		$(Form.enabled_sites_id).addEventListener("mouseup",Selected_Site,true);
		$(Form.temporary_target_id).addEventListener("click",ChangeTemporaryTarget,true);

		var parent = $(this.dictionary_sites_id);
		for(var i = 0; i < this.dictionary_sites.length; i++) {
			var node = document.createElement('option');
			node.innerHTML = this.dictionary_sites[i];
			parent.appendChild(node);
		}

		window.removeEventListener("resize", Form.adjust_Form_Position,false);

	},

	delForm: function() {
		var node = $(this.base_id);
		if(node) {
			node.parentNode.removeChild(node);
		}
		node = $(this.base_style_id);
		if(node) {
			node.parentNode.removeChild(node);
		}
		window.removeEventListener("resize", Form.adjust_Form_Position,false);
	},

	outputValues: function() {
	},

	setDefaultValue: function() {
	},

// 保存情報の取得
	getValue: function() {
		this.site = GM_getValue("site", this.site);
// 使用サイトの閉鎖などで、保存していたサイト情報をソースから消した場合、
// undefinedになってしまうので、デフォルト(Exceed(goo))にして保存情報を消す
		if(SITEINFO[this.site] == undefined) {
			this.site = SEARCH_SITE;
			GM_deleteValue("site");
		}
		this.mirror_no = GM_getValue("mirror_no", this.mirror_no);
// ミラーがあるサイトの場合、ミラー番号を作業
		if( SITEINFO[this.site].mirror != undefined ) {
			this.work_mirror_no[this.site] = this.mirror_no;
			SITEINFO[this.site].mirror_no = this.mirror_no;
		}
		for ( var site in SITEINFO) {
			this.temporary_target[site] = SITEINFO[site].temporary_target;
		}
		this.temporary_target = deserialize("temporary_target", this.temporary_target);
		if(this.temporary_target['Eijiro']) {
			delete this.temporary_target['Eijiro'];
		}

		this.enabled = GM_getValue("enabled", this.enabled);
		this.settimeout = GM_getValue("settimeout", this.settimeout);
		this.extend_mode = GM_getValue("extend_mode", this.extend_mode);
		this.include_apostrophe = GM_getValue("include_apostrophe", this.include_apostrophe);
		this.display_stat_word = GM_getValue("display_stat_word", this.display_stat_word);
		this.display_stat_site = GM_getValue("display_stat_site", this.display_stat_site);
		this.display_stat_url = GM_getValue("display_stat_url", this.display_stat_url);
		var work = GM_getValue("enabled_sites", this.default_enabled_sites.join(','));
		if(work) {
			this.enabled_sites = work.split(',');
		} else {
			this.enabled_sites = new Array(0);
		}
		this.level = GM_getValue("level", this.level);
		this.delay = GM_getValue("delay", this.delay);
		this.popup_style = GM_getValue("popup_style", this.default_popup_style);
		this.outputValues();
	},

// 情報の保存
	setValue: function() {
		GM_setValue("site", this.site);
		GM_setValue("mirror_no", this.mirror_no);
		serialize("temporary_target", this.temporary_target);
		GM_setValue("enabled", this.enabled);
		GM_setValue("settimeout", this.settimeout);
		GM_setValue("extend_mode", this.extend_mode);
		GM_setValue("include_apostrophe", this.include_apostrophe);
		GM_setValue("display_stat_word", this.display_stat_word);
		GM_setValue("display_stat_site", this.display_stat_site);
		GM_setValue("display_stat_url", this.display_stat_url);
		if(this.enabled_sites.length) {
			GM_setValue("enabled_sites", this.enabled_sites.join(','));
		} else {
			GM_setValue("enabled_sites", "");
//			GM_deleteValue("enabled_sites");
		}
		GM_setValue("level", this.level);
		GM_setValue("delay", this.delay);
		GM_setValue("popup_style", this.popup_style);
		this.outputValues();
	},

	getFormValue: function() {
		var parent = $(this.dictionary_sites_id);
		var nodes = GetOptionList(this.dictionary_sites_id);
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].selected == true) {
				this.site = nodes[i].value;
				break;
			}
		}
		if(SITEINFO[this.site].mirror) {
			var node = $(this.mirror_id);
			this.mirror_no = node.selectedIndex;
			SITEINFO[this.site].mirror_no = this.mirror_no;
		} else {
			this.mirror_no = 0;
		}
		this.temporary_target_work[this.site] = $(this.temporary_target_id).checked;
		for ( var site in SITEINFO) {
			this.temporary_target[site] = this.temporary_target_work[site];
		}

		this.enabled = $(this.enabled_id).checked;
		this.settimeout = $(this.settimeout_id).checked;
		this.extend_mode = $(this.extend_mode_id).checked;
		this.include_apostrophe = $(this.include_apostrophe_id).checked;
		this.display_stat_word = $(this.display_stat_word_id).checked;
		this.display_stat_site = $(this.display_stat_site_id).checked;
		this.display_stat_url = $(this.display_stat_url_id).checked;
		this.level = parseInt($(this.level_id).value?$(this.level_id).value:0);
		this.delay = parseInt($(this.delay_id).value?$(this.delay_id).value:0);
		parent = $(this.enabled_sites_id);
		nodes = GetOptionList(this.enabled_sites_id);
		var i, j;
		this.enabled_sites = new Array(0);
		for(i = 0; i < nodes.length; i++) {
			this.enabled_sites[i] = nodes[i].textContent;
		}
		this.popup_style = $(this.textarea_id).value;
	},

	setFormValue: function() {
		var parent = $(this.dictionary_sites_id);
		var nodes = GetOptionList(this.dictionary_sites_id);
		for(var i = 0; i < nodes.length; i++) {
			if(this.site == nodes[i].value) {
				nodes[i].selected = true;
				break;
			}
		}
		Dictionary_Selected();
		for ( var site in SITEINFO) {
			this.temporary_target_work[site] = this.temporary_target[site];
		}
		$(this.temporary_target_id).checked = this.temporary_target_work[this.site];

		$(this.enabled_id).checked = this.enabled;
		$(this.settimeout_id).checked = this.settimeout;
		$(this.extend_mode_id).checked = this.extend_mode;
		$(this.include_apostrophe_id).checked = this.include_apostrophe;
		$(this.display_stat_word_id).checked = this.display_stat_word;
		$(this.display_stat_site_id).checked = this.display_stat_site;
		$(this.display_stat_url_id).checked = this.display_stat_url;
		$(this.level_id).value = this.level;
		$(this.delay_id).value = this.delay;
		parent = $(this.enabled_sites_id);
		nodes = GetOptionList(this.enabled_sites_id);
		for(i = 0; i < nodes.length; i++) {
			parent.removeChild(nodes[i]);
		}
		for(var i = 0; i < this.enabled_sites.length; i++) {
			var node = document.createElement('option');
			node.innerHTML = this.enabled_sites[i];
			parent.appendChild(node);
		}
		$(this.site_textbox_id).value = window.location.hostname;
		$(this.textarea_id).value = this.popup_style;
		Add_Enable();
	},

	checkFormValue: function() {
		var parent = $(this.dictionary_sites_id);
		var nodes = GetOptionList(this.dictionary_sites_id);
		var site;
		for(var i = 0; i < nodes.length; i++) {
			if(nodes[i].selected == true) {
				site = nodes[i].value;
				break;
			}
		}
		if(SITEINFO[site].extract_url != undefined &&
		   $(this.extend_mode_id).checked == false) {
			window.alert("指定されたサイトは基本機能では利用できません。\n拡張機能を有効にしてください。");
			return false;
		}
		return true;
	},

	// Open form box
	openForm: function() {
		var div = $(Form.div_id);
		var x = this.x;
		var y = this.y;
		div.setAttribute("style",Form.div_style_open+"top:"+y+"px;left:"+x+"px;");
		this.current_mode = 1;
		DnD.initialize(Form.title_id, div);
		DnD.setCallback('stop', Form.adjustPosition);
		this.adjust_Form_Position();
	},

	// Close form box
	closeForm: function(){
		var div = $(Form.div_id);
		div.setAttribute("style",this.div_style_close);
		this.current_mode = 0;
		DnD.finalize();
	},

	// form opened?
	isFormOpened: function() {
		var div = $(Form.div_id);
		if(!div) return false;
		var style = div.style.display;
		if(style == 'none') {
			return false;
		} else {
			return true;
		}
	},

// Check current mode
	checkCurrentMode: function(mode,false_msg) {
// modify current mode,sometimes current mode is broken
		if(Form.isFormOpened() == true) {
			Form.current_mode = 1;
		} else {
			Form.current_mode = 0;
		}
		if(Form.current_mode == mode) {
			return true;
		} else {
			if(false_msg) {
				if(Form.current_mode == 0) {
					window.alert("Form is not opened");
				} else {
					window.alert("Form is already opened");
				}
			}
			return false;
		}
	},

// callback function for drop
	adjustPosition: function(click_obj, drag_obj) {
		var	div = drag_obj;
		var	div_x = div.offsetLeft;
		var	div_y = div.offsetTop;
		var	win_height = window.innerHeight;
		var	win_width = window.innerWidth;
		var	div_height = div.offsetHeight;
		var	div_width = div.offsetWidth;
		var	margin_x = Form.margin_x;
		var	margin_y = Form.margin_y;
		var	adjust = 0;

		if(div_x + div_width + margin_x > win_width) {
			div_x = win_width - div_width - margin_x;
			adjust++;
		}
		if(div_x < margin_x) {
			div_x = margin_x;
			adjust++;
		}
		if(div_y + div_height + margin_y > win_height) {
			div_y = win_height - div_height - margin_y;
			adjust++;
		}
		if(div_y < margin_y) {
			div_y = margin_y;
			adjust++;
		}
		if(adjust) {
			div.style.left = div_x +"px";
			div.style.top = div_y +"px";
		}
		Form.x = div_x;
		Form.y = div_y;
		return;
	},

// Adjust Form Position
	adjust_Form_Position: function(){
		Form.moveForm(0, 0);
	},

// Move Form
	moveForm: function(dx, dy){
		var	win_height = window.innerHeight;
		var	win_width = window.innerWidth;
		var	x = this.x;
		var	y = this.y;
		var	div = $(Form.div_id);
		var	div_height = div.offsetHeight;
		var	div_width = div.offsetWidth;
		var	margin_x = this.margin_x;
		var	margin_y = this.margin_y;

		x += dx;
		if(x + div_width + margin_x > win_width) {
			x = win_width - div_width - margin_x;
		}
		if(x < margin_x) {
			x = margin_x;
		}
		y += dy;
		if(y + div_height + margin_y > win_height) {
			y = win_height - div_height - margin_y;
		}
		if(y < margin_y) {
			y = margin_y;
		}
		this.x = x;
		this.y = y;
		div.style.left = x +"px";
		div.style.top = y +"px";
	},

// Reset Form
	Reset: function(){
		Form.getValue();
		Form.setFormValue();
//		Clear_List_Box();
	},

// Help
	Help: function(e){
		if(Help.url('mirror') && e.shiftKey) {
			Help.show('mirror');
		} else {
			Help.show('main');
		}
	},

// Balloon of Help
	Help_Balloon: function(e, mode) {
		if(Help.url('mirror')) {
			if(mode == true) {
				Balloon.create(e, Form.div_id, Msg.msg('help'));
			} else {
				Balloon.destroy();
			}
		}

	},


// Quit Form
	Quit: function(){
		var ret = window.confirm('設定を破棄します。よろしいですか?');
		if(ret == true) {
			Form.closeForm();
			Form.delForm();
			if(Form.exit_cb) Form.exit_cb(false);
		}
	},

// Save Form
	Save: function(){
		var ret = window.confirm('設定を保存します。よろしいですか?');
		if(ret == true) {
			ret = Form.checkFormValue();
			if(ret) {
				Form.getFormValue();
				Form.setValue();
				Form.closeForm();
				Form.delForm();
				if(Form.exit_cb) Form.exit_cb(true);
			}
		}
	}

};

// 拡張機能制御
var	Extention = {
	extend_mode: false,
	include_apostrophe: false,
	enabled_sites: [],
	popup_style: '',
	stat_style: <><![CDATA[
		z-index: 100;
		background-color: #CCFFFF;
		border: 1px solid black;
		width: auto;
		font-size: 10pt;
		color: black;
		text-align: left;
		line-height: 140%;
		padding-left: 10px;
		padding-right: 10px;
		opacity: 0.92;
		overflow: auto;
		padding: 0 0 4px 3px;
		min-width: 300px;
		max-width: 300px;
	]]></>+"",
	enabled_site_match: false,
	display_stat_word: false,
	display_stat_site: false,
	display_stat_url: false,

	NoOperation: function(){},

	initialize: function() {
		Form.getValue();
		Extention.getValue(true);

		GM_registerMenuCommand( "======= Mouseover Translate English-Japanese EX ======", Extention.NoOperation);
//		GM_registerMenuCommand( "Configure Mouseover Translate English-Japanese EX", Extention.Configure);
		GM_registerMenuCommand( "Mouseover Translate English-Japanese EXの設定", Extention.Configure);
	},

// Configure
	Configure: function(){
		if(!Form.checkCurrentMode(0, true)) return;
		Form.addForm();
		Form.getValue();
		Form.setFormValue();
		Form.openForm();
	},

	getValue: function(flag) {
		if(flag == false) return;
		Conf.site = Form.site;
		Conf.enabled = Form.enabled;
		Conf.settimeout = Form.settimeout;
		Conf.level = Form.level;
		Conf.delay = Form.delay;
		Extention.extend_mode = Form.extend_mode;
		Extention.include_apostrophe = Form.include_apostrophe;
		Extention.enabled_sites = Form.enabled_sites;
		Extention.popup_style = Form.popup_style;
		Extention.display_stat_site = Form.display_stat_site;
		Extention.display_stat_word = Form.display_stat_word;
		Extention.display_stat_url = Form.display_stat_url;
		if(Extention.extend_mode == true &&
		   Extention.include_apostrophe == true) {
			Conf.regex1 = /[a-zA-Z']/;
			Conf.regex2 = /[^a-zA-Z']/;
			Conf.regex3 = /^[a-zA-Z']{3,}$/;
		} else {
			Conf.regex1 = /[a-zA-Z]/;
			Conf.regex2 = /[^a-zA-Z]/;
			Conf.regex3 = /^[a-zA-Z]{3,}$/;
		}
		Extention.checkEnabledSite();
	},

	checkEnabledSite: function() {
		Extention.enabled_site_match = false;
		if(Extention.extend_mode == true) {
			for(var i = 0; i < Extention.enabled_sites.length; i++) {
				var site = Extention.enabled_sites[i].replace(/\./g, '\\.');
				site = site.replace(/\*/g, '.*');
				site = '^' + site + '$';
				var re = new RegExp(site);
				if(window.location.hostname.match(re)) {
					Extention.enabled_site_match = true;
					break;
				}
			}
		}
		return Extention.enabled_site_match;
	}

};

// 辞書検索制御
var Query = {
	orgword: '',
	targetword: '',
	X: 0,
	Y: 0,
	pattern: 0,
	done: [],
	working: false,
	site: SEARCH_SITE,
	urls: [],
	html: [],

// 辞書再検索
	reQuery: function() {
		this.working = true;
		this.done = new Array(0);
		this.pattern = 0;
		this.Get_Result();
	},

// 辞書検索実行
	execute: function(word, x, y) {
		if(this.working == true) return;
		this.working = true;
		this.orgword = word;
		this.targetword = word;
		this.X = x;
		this.Y = y;
		this.done = new Array(0);
		this.pattern = 0;
		this.site = Conf.site;
		this.Get_Result();
	},

// 次の辞書で再検索(辞書の一時切り換え用)
	Next_Dictionary: function() {
		var nextSite = '';
		var flag = false;
		var site;
		for ( site in SITEINFO) {
			if(flag == true) {
				if(Form.temporary_target[site] == true) {
					nextSite = site;
					flag = false;
					break;
				}
			}
			if(site == this.site) {
				flag = true;
			}
		}
		if(flag == true) {
			if(!nextSite) {	// 最後のサイトか、1個しか定義してないか
				for(site in SITEINFO) {
					if(Form.temporary_target[site] == true) {
						nextSite = site;	// 対象サイトで先頭のサイト
						break;
					}
				}
				if(!nextSite) return;	// 対象サイトがなかった
				if(nextSite == this.site) return;	// 1個だった
			}
		} else {
			if(!nextSite) {	// これが真ならバグ
				return;
			}
		}
		this.site = nextSite;
		Conf.site = this.site;
		this.working = true;
		this.done = new Array(0);
		this.pattern = 0;
		this.Get_Result();
	},
//	Check_Result: function(result) {
////		dump(result);
//		var word = result;
//		word = word.replace(/\s|\n/g, '');
//		if(word) return result;
//		return word;
//	},
	Check_Event: function(event) {
		if(event.shiftKey && !event.ctrlKey) {
			// Shiftキー
			Query.reQuery();
		} else if(!event.shiftKey && event.ctrlKey) {
			// Ctrlキー
			this.working = true;
			Query.pattern++;
			Query.Get_Result();
		} else if(event.shiftKey && event.ctrlKey) {
			// Ctrlキー + Shiftキー
			Query.Next_Dictionary();
 		} else if(event.keyCode == 40 || 
 			  event.keyCode == 38 ||
 			  event.keyCode >= 33 &&
 			  event.keyCode <= 36
 			  ) {
			; //スクロール関連
		} else {
			// その他のキー
			deletePopup();
		}
	},

// ポップアップ作成処理
	Create_Popup_Content: function(result) {
		var work = Query.targetword + " : [" + Query.site + "] ";
		if( SITEINFO[Query.site].level != undefined ) {
			work = work + ": Level="+SITEINFO[Query.site].level;
		}
		result = work + "<br />" + result;
//GM_log(result);
		deletePopup();
		Query.done.push(Query.targetword);
		makePopup2(result, Query.X, Query.Y);
	},

	DispStat: function(url) {
		if(Extention.extend_mode == true && 
		   (Extention.display_stat_word == true ||
		    Extention.display_stat_site == true ||
		    Extention.display_stat_url == true)) {
			var stat = 'Querying';
			if(Extention.display_stat_word == true) {
				stat += ' '+Query.targetword;
			}
			if(Extention.display_stat_site == true) {
				stat += ' ['+Query.site+']';
			}
			if(Extention.display_stat_url == true) {
				stat += ' '+url;
			}
			makePopup2(stat, Query.X, Query.Y, Extention.stat_style);
		}
	},

// 一旦候補リストを作るサイト用(excite辞書など)
	Get_Result_Second_Call: function(response) {
		if( typeof response == 'object') {
			var result = SITEINFO[Query.site].formatResult(response.responseText);
			if(result != ""){
				Query.html.push(result);
			}
			Query.Get_Result_Second_Call();
		} else if(Query.urls.length) {
// リストからURLを一つ取り出して、リクエストを発行する。
			var url = Query.urls.shift();
			if(/^http/.test(url) == false) {
// httpで始まっていないのはhtmlとして格納する(BIGLOBE対応、extract_url内で格納しておく)。
				Query.html.push(url);
				Query.Get_Result_Second_Call();
				return;
			}
			Query.DispStat(url);
			GM_xmlhttpRequest({
				method: "GET",
				url: url,
				onload: Query.Get_Result_Second_Call
			});
		} else {
			var result = Query.html.join('');
			Query.Create_Popup_Content(result);
		}
	},

// 単語の整形処理呼び出しとHTTPリクエスト/レスポンス処理
	Get_Result: function(response) {
		if( typeof response == 'object') {
			if(SITEINFO[Query.site].extract_url != undefined) {
// 一旦候補リストを作るサイト(extract_urlが定義されている)はURLリストを取り出す。
				Query.urls = SITEINFO[Query.site].extract_url(response.responseText);
// リストを取り出せればそれらを全て呼び出す。
				if(Query.urls.length) {
					Query.html = new Array(0);
					Query.Get_Result_Second_Call();
					return;
				}
// リストを取り出せなければヒットしなかったということで、次の候補の処理を行う。
			} else {
// 候補リストを作らないサイトは通常のレスポンス処理
				var result = SITEINFO[Query.site].formatResult(response.responseText);
				if(result != ""){
					Query.Create_Popup_Content(result);
					return;
				}
			}
			Query.pattern++;
		}
// 整形処理呼び出し
		var	word;
		while(word = fixWordFormat2(Query.orgword, Query.pattern)) {
			if(Query.done.indexOf(word) >= 0) {
				Query.pattern++;
			} else {
				break;
			}
		}

		if(word) {
// HTTPリクエスト処理
			Query.targetword = word;
			var opt;
			var url = SITEINFO[Query.site].url(Query.targetword);
			if(SITEINFO[Query.site].method.toUpperCase() == "POST") {
				opt = {
					method: "POST",
					url: url,
					headers: SITEINFO[Query.site].headers,
					overrideMimeType: "text/html; charset=" + SITEINFO[Query.site].encode,
					data: SITEINFO[Query.site].data(Query.targetword),
					onload: Query.Get_Result
				};
			} else {
				opt = {
					method: "GET",
					url: url,
					overrideMimeType: "text/html; charset=" + SITEINFO[Query.site].encode,
					onload: Query.Get_Result
				};
			}
			Query.DispStat(url);
			GM_xmlhttpRequest(opt);
		} else {
			Query.working = false;
		}
	}
};

function nowDate() {
	var dt = new Date();
	return dt.getTime();
}

// デバッグ用の16進ダンプ出力
function dump(str) {
	var	output = '';
	for(var i = 0; i < str.length; i+=16) {
		output = '';
		for(var j = 0; j < 16 && str.length > i+j; j++) {
			output = output + str.charCodeAt(i+j).toString(16) + " ";
		}
		GM_log(output);
	}
}

// 辞書サイトが選択されたときの処理
function Dictionary_Selected() {
	var selnode = $(Form.dictionary_sites_id);
	var nodes = GetOptionList(Form.dictionary_sites_id);
	Form.site = nodes[selnode.selectedIndex].value;
	if(!SITEINFO[Form.site].site_url) {
		$(Form.visit_id).style.display = 'none';
	} else {
		$(Form.visit_id).style.display = '';
	}
	if(SITEINFO[Form.site].level == undefined) {
		$(Form.word_level_id).style.display = 'none';
	} else {
		$(Form.word_level_id).style.display = '';
	}
	var parent = $(Form.mirror_id);
	nodes = GetOptionList(Form.mirror_id);
	for(i = 0; i < nodes.length; i++) {
		parent.removeChild(nodes[i]);
	}
	if( SITEINFO[Form.site].mirror == undefined ) {
		$(Form.mirror_id).style.display = 'none';
	} else {
		for(var i = 0; i < SITEINFO[Form.site].mirror.length; i++) {
			var node = document.createElement('option');
			node.innerHTML = SITEINFO[Form.site].mirror[i].name;
			parent.appendChild(node);
		}
		$(Form.mirror_id).style.display = '';
		Form.mirror_no = Form.work_mirror_no[Form.site];
		$(Form.mirror_id).selectedIndex = Form.mirror_no;
	}

	$(Form.dictionary_name_id).textContent = SITEINFO[Form.site].name;
	$(Form.temporary_target_id).checked = Form.temporary_target_work[Form.site];
}

function Mirror_Selected() {
	Form.mirror_no = $(Form.mirror_id).selectedIndex;
	Form.work_mirror_no[Form.site] = Form.mirror_no;
}

function ChangeTemporaryTarget() {

	Form.temporary_target_work[Form.site] = $(Form.temporary_target_id).checked
}

// OPTIONタグのノードリストを取得
function GetOptionList(sel) {
	var query = '//select[@id="'+sel+'"]/option';
	return xpath(query);
}

// Visitボタンの処理
function Visit_Site() {
	if(typeof(SITEINFO[Form.site].site_url) == 'function') {
		window.open(SITEINFO[Form.site].site_url(Form.mirror_no));
	} else {
		window.open(SITEINFO[Form.site].site_url);
	}
}

// レベルのヘルプ
function Level_Help(e, mode) {
	var parent = $(Form.div_id);
	if(mode == true) {
		var text = "レベル1 ＝　英語の基礎をなす必須単語<br/>"+
			"レベル2 ＝　日常生活で活躍する英単語<br/>"+
			"レベル3 ＝　楽しく会話がはずむ英単語<br/>"+
			"レベル4 ＝　読解の基礎を固める英単語<br/>"+
			"レベル5 ＝　大学受験前に覚える英単語<br/>"+
			"レベル6 ＝　検定試験に挑戦する英単語<br/>"+
			"レベル7 ＝　表現力を豊かにする英単語<br/>"+
			"レベル8 ＝　読解の自信を深める英単語<br/>"+
			"レベル9 ＝　TOEIC高得点を狙う英単語<br/>"+
			"レベル10 ＝　英文雑誌を楽しめる英単語<br/>"+
			"レベル11 ＝　自分の視野を広げる英単語<br/>"+
			"レベル12 ＝　世界をさらに広げる英単語";
		var style = 'position:fixed;font-size:12px;background-color:#FFFFCC;border: 1px solid black;padding:4px;';
		Balloon.create(e, Form.div_id, text, style);
	} else {
		Balloon.destroy();
	}

}


// Addボタンの処理(リストに追加)
function Add_To_List() {
	if(Form.add_enable == false) return;
	var nodes = GetOptionList(Form.enabled_sites_id);
	var sites = Array(0);
	for(i = j = 0; i < nodes.length; i++) {
		sites[j++] = nodes[i].textContent;
	}
	var parent = $(Form.enabled_sites_id);
	var work = $(Form.site_textbox_id).value;
	work = Util.Trim(work);
	if(work.length == 0) return;
	if(sites.indexOf(work) < 0) {
		var node = document.createElement('option');
		node.innerHTML = work;
		parent.appendChild(node);
	}
}

// Delボタンの処理(リストから削除)
function Del_From_List() {
	if(Form.del_enable == false) return;
	var ret = window.confirm('選択サイトを削除します。よろしいですか?');
	if(!ret) return;
	var parent = $(Form.enabled_sites_id);
	var nodes = GetOptionList(Form.enabled_sites_id);
	var i;
	for(i = 0; i < nodes.length; i++) {
		if(nodes[i].selected == true) {
			parent.removeChild(nodes[i]);
		}
	}
	Form.del_enable = false;
	ChangeDelButton();
}

// リストボックスでの項目選択時の処理(Delボタンの制御)
function Selected_Site() {
	var selnode = $(Form.enabled_sites_id);
	var nodes = GetOptionList(Form.enabled_sites_id);
	var i;
	Form.del_enable = false;
	for(i = 0; i < nodes.length; i++) {
		if(nodes[i].selected == true) {
			Form.del_enable = true;
			break;
		}
	}
	ChangeDelButton();
	selnode.focus();
}

// ボタンの状態(スタイル)設定
function ChangeButtonStyle(id, onoff) {
	var button = $(id);
	if(onoff == false) {
		button.style.color = "buttonshadow";
		button.style.cursor = "auto";
	} else {
		button.style.color = "buttontext";
		button.style.cursor = "pointer";
	}
}

// Addボタンの有効化／無効化
function Add_Enable() {
	var work = $(Form.site_textbox_id).value;
	work = Util.Trim(work);
	if(work.length == 0) {
		Form.add_enable = false;
	} else {
		Form.add_enable = true;
	}
	ChangeAddButton();
}

// Addボタンのスタイル設定
function ChangeAddButton() {
	ChangeButtonStyle(Form.add_id, Form.add_enable)
}

// Delボタンのスタイル設定
function ChangeDelButton() {
	ChangeButtonStyle(Form.del_id, Form.del_enable)
}

// ポップアップのカスタマイズ用TEXTAREAの制御
function Customize() {
	var	customize_node = $(Form.customize_checkbox_id);
	var	textarea_node = $(Form.textarea_id);

	if(customize_node.checked == true) {
		textarea_node.setAttribute('style',Form.div_style_open);
		Form.adjust_Form_Position();
	} else {
		textarea_node.setAttribute('style',Form.div_style_close);
	}
}

// Default CSSボタンの処理(デフォルトのCSSに戻す)
function Set_Default_CSS() {
	var ret = window.confirm('CSSをデフォルト設定に戻します。よろしいですか?');
	if(!ret) return;
	$(Form.textarea_id).value = Form.default_popup_style;
}

function xpath(query, doc) {
	var results = document.evaluate(query, doc?doc:document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = new Array();
	for(var i=0; i<results.snapshotLength; i++){
		nodes.push(results.snapshotItem(i));
	}
	return nodes;
}

// 拡張機能用ポップアップの作成。makePopupを元にして改造。
// 位置の調整をこまめにしようとすると、position:absolute だと、Bodyのスクロール量を考慮しないといけないので
// fixedに変えて、マウス位置(basisposition*)からスクロール量を先に引き算して、コンテンツ領域内の絶対座標にする。
// 以後の計算式にwindow.scroll*は考慮する必要がなくなる。
function makePopup2(popuphtml, basispositionx, basispositiony, style){
	var popup = $("motejpopup");
	if(popup == null) popup = document.createElement("div");
	popup.id = "motejpopup";
	var horizontalspace = 20;
	var verticalspace = 15;
	var margin = 20;

	basispositionx = basispositionx - window.scrollX;
	basispositiony = basispositiony - window.scrollY;
	if(style) {
		popup.setAttribute('style', style);
	} else {
		popup.setAttribute('style', Extention.popup_style);
	}
	with(popup.style) {
		position = "fixed";
		left = basispositionx + horizontalspace + "px";
		top = basispositiony + verticalspace + "px";
	}
	popup.innerHTML = popuphtml;
	popup = document.body.appendChild(popup);
	if(popup.offsetLeft + popup.offsetWidth + margin > window.innerWidth) popup.style.left = basispositionx - popup.offsetWidth - margin + "px";
	if(popup.offsetTop + popup.offsetHeight + margin > window.innerHeight) popup.style.top = basispositiony - popup.offsetHeight - margin + "px";

	// ポップアップの位置がコンテンツ領域の上マージンより上になった場合
	if(parseInt(popup.style.top) < margin) {
		popup.style.top = margin + "px";
	}
	// ポップアップの高さがコンテンツ領域の高さより大きくなった場合
	if(popup.offsetTop + popup.offsetHeight + margin*2 > window.innerHeight) {
		// heightを減らしてスクロールバーを付ける(overflow:auto)
//		popup.style.overflow = "auto";	// CSS設定に変更
		popup.style.height = (window.innerHeight - margin*2) + "px";
		// ポップアップ内にマウスカーソルがくるように配置位置を変える
		popup.style.left = (basispositionx - popup.offsetWidth + horizontalspace) + "px";
	}
	// ポップアップの位置がコンテンツ領域の左マージンより左になった場合
	if(parseInt(popup.style.left) < margin) {
		popup.style.left = margin + "px";
	}
	window.addEventListener("keydown", Query.Check_Event, false);
//	popup.focus();
	return popup;
}

// 拡張機能用翻訳する単語を整形。
// pattern == 0: fixWordFormatを呼び出し(正規表現の判定を全部実行するので複数回変換される可能性あり)
// pattern == 1: ターゲットの単語をそのまま返す
// pattern == 2: fixWordFormatの機能で正規表現の判定でマッチすればその変換のみ行って返すのと、変換種類を追加)
// 特に、否定形や現在分詞、過去分詞の原型化、定型の比較級、最上級の原級化
// pattern == 3: pattern == 2の処理の一部を変化させて別の可能性の単語を返す。
// pattern == 4: pattern == 3の処理で変換し残した別の可能性の単語を返す。特に否定形用。
// patternの制御は呼び出し元で行う。
function fixWordFormat2(word, pattern){
	var fixword = word.toLowerCase();
	if(pattern == 0) {
		fixword = fixWordFormat(fixword);
		return fixword;
	} else if(pattern == 1) {
		return fixword;
	} else if(pattern == 2) {
		if(/(.*)ies$/.test(fixword)) { fixword = RegExp.$1 + "y";return fixword;}
		if(/(.*)ied$/.test(fixword)) { fixword = RegExp.$1 + "y";return fixword;}
		if(/(.*ss)es$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		if(/(.*ss)ed$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// feで終わる語の三単現はvesなのでfeに戻す
		if(/(.*)ves$/.test(fixword)) { fixword = RegExp.$1+"fe";return fixword;}
// 単母音+子音は子音を重ねてあるので、一個だけ残す
		if(/(.*[^aiueo][aiueo])([^aiueo])([^aiueo])ing$/.test(fixword) && RegExp.$2 == RegExp.$3) { fixword = RegExp.$1+RegExp.$2;return fixword;}
		if(/(.*[^aiueo][aiueo])([^aiueo])([^aiueo])ed$/.test(fixword) && RegExp.$2 == RegExp.$3) { fixword = RegExp.$1+RegExp.$2;return fixword;}
// cで終わる語はkを補ってあるのでcまでにする
		if(/(.*c)king$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		if(/(.*c)ked$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// ieで終わる語の現在分詞はieをyに変えてあるのでieに戻す
		if(/(.*)ying$/.test(fixword)) { fixword = RegExp.$1+"ie";return fixword;}
// eで終わる語の現在分詞はeが削除されているので付加する
		if(/(.*)ing$/.test(fixword)) { fixword = RegExp.$1+"e";return fixword;}
// yで終わる語の比較級、最上級はieに変えてあるのでyに戻す
		if(/(.*)iest$/.test(fixword)) { fixword = RegExp.$1+"y";return fixword;}
		if(/(.*)ier$/.test(fixword)) { fixword = RegExp.$1+"y";return fixword;}
// 単母音+子音の比較級、最上級は子音を重ねてあるので、一個だけ残す
		if(/(.*[^aiueo][aiueo])([^aiueo])([^aiueo])est$/.test(fixword) && RegExp.$2 == RegExp.$3) { fixword = RegExp.$1+RegExp.$2;return fixword;}
		if(/(.*[^aiueo][aiueo])([^aiueo])([^aiueo])er$/.test(fixword) && RegExp.$2 == RegExp.$3) { fixword = RegExp.$1+RegExp.$2;return fixword;}
// 普通の比較級、最上級はest,erを削除する
		if(/(.*)est$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		if(/(.*)er$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// 普通のes,edで終わる語はes,edを取ってみる。
		if(/(.*)es$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		if(/(.*)ed$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// 最後がnの語の否定(～n't) (e.g. can't)は'tだけ取ってみる
		if(/(.*n)'t$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// 所有格(～'s)は'sを取る
		if(/(.*)'s$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// 三単現はsを取る
		if(/(.*)s$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		return fixword;
	} else if(pattern == 3) {
// fで終わる語の三単現はvesなのでfに戻す
		if(/(.*)ves$/.test(fixword)) { fixword = RegExp.$1+"f";return fixword;}
// es,edで終わる語で原形がeで終わるものかもしれないのでs,dを取ってみる。
		if(/(.*e)d$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		if(/(.*e)s$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// 普通の現在分詞はingをとる。
		if(/(.*)ing$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// eで終わる語の比較級、最上級
		if(/(.*e)st$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		if(/(.*e)r$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
// 否定(～n't)
		if(/(.*)n't$/.test(fixword)) { fixword = RegExp.$1;return fixword;}
		return fixword;
	} else if(pattern == 4) {
// 否定(～n't)
		if(/(.*)n't$/.test(fixword)) fixword = RegExp.$1;
		if(/(.*)es$/.test(fixword)) fixword = RegExp.$1;
		return fixword;
	}
	return '';
}

// 疑似タイマ処理
var	PseudoTimer = {
	start: [],
	targetword: [],
	pageX: [],
	pageY: [],
	count: 0,

	javascript_enabled: false,
	initialize: function() {
		this.checkSetTimeout();
	},


// setTimeoutが使えるか(Javascriptが有効か)どうかのチェック
	checkSetTimeout: function() {
		window.setTimeout(function(){ PseudoTimer.javascript_enabled = true; }, 10);

	},

	setTimer: function(targetword,pageX,pageY) {
// 取り敢えず本物のsetTimeoutを呼び出す。Javascript無効でもTimerIDは返ってくる
		popupTimerID = window.setTimeout(function(){
			Access_Dictionary(targetword,pageX,pageY);
		}, Conf.delay);

// Javascript無効の場合
		if(PseudoTimer.javascript_enabled == false) {
// 疑似setTimeoutを使う指定ならば、現在時刻と必要情報を記憶。
			if(Conf.settimeout == true) {
				var now = (new Date()).getTime();
				var tid = popupTimerID.toString();
				PseudoTimer.start[tid] = now;
				PseudoTimer.targetword[tid] = targetword;
				PseudoTimer.pageX[tid] = pageX;
				PseudoTimer.pageY[tid] = pageY;
				PseudoTimer.count++;
			} else {
// 疑似setTimeoutを使わない指定ならば、すぐに辞書検索する。
				Access_Dictionary(targetword,pageX,pageY);
			}
		}
	},

// 疑似タイマーの時間経過チェック
	checkTimer: function() {
// Javascriptが有効な時は何もせずに戻る
		if(PseudoTimer.javascript_enabled == true) {
			return;
		}
// 疑似setTimeoutが無効の時も何もせずに戻る
		if(Conf.settimeout == false) {
			return;
		}
// 疑似setTimeoutが有効の時にタイマ設定されていれば、経過時間をチェックする
		if(PseudoTimer.count > 0) {
			var now = (new Date()).getTime();
			for(var tid in PseudoTimer.start) {
				if(PseudoTimer.start[tid]+Conf.delay <= now) {
					Access_Dictionary(PseudoTimer.targetword[tid],
						PseudoTimer.pageX[tid],
						PseudoTimer.pageY[tid]);
					PseudoTimer.clearTimeout(tid);
				}
			}
		}
	},

// 疑似タイマーのクリア
	clearTimeout: function(tid) {
		delete PseudoTimer.start[tid];
		delete PseudoTimer.targetword[tid];
		delete PseudoTimer.pageX[tid];
		delete PseudoTimer.pageY[tid];
		PseudoTimer.count--;
	}
};


// 辞書検索呼び出し用の処理
function Access_Dictionary(targetword,pageX,pageY) {
	if(Extention.extend_mode == true) {
		Query.execute(targetword,pageX,pageY);
	} else {
// 一旦候補リストを作るサイトは拡張機能でのみサポート
		if(SITEINFO[Conf.site].extract_url != undefined) {
			return;
		}
		targetword = fixWordFormat(targetword);
// 基本機能でPOST型のサイトに対応
		if(SITEINFO[Conf.site].method.toUpperCase() == "POST") {
			GM_xmlhttpRequest({
				method: "POST",
				url: SITEINFO[Conf.site].url(targetword),
				headers: SITEINFO[Conf.site].headers,
				overrideMimeType: "text/html; charset=" + SITEINFO[Conf.site].encode,
				data: SITEINFO[Conf.site].data(targetword),
				onload: function(response){
					var result = SITEINFO[Conf.site].formatResult(response.responseText);
					if(result != ""){
						result = targetword + ":<br>" + result;
						makePopup(result, pageX, pageY);
					}
				}
			});
		} else {
			GM_xmlhttpRequest({
				method: "get",
				url: SITEINFO[Conf.site].url(targetword),
				overrideMimeType: "text/html; charset=" + SITEINFO[Conf.site].encode,
				onload: function(response){
					var result = SITEINFO[Conf.site].formatResult(response.responseText);
					if(result != ""){
						result = targetword + ":<br>" + result;
						makePopup(result, pageX, pageY);
					}
				}
			});
		}
	}
}

// マウスカーソルがポップアップ上にあるかどうかのチェック
function isMouseOverPopup(e) {
	if(Extention.extend_mode == true) {	// 拡張モード
		var popup = $("motejpopup");
		if(!popup) return false;	// 表示していない
		var x = popup.offsetLeft;
		var y = popup.offsetTop;
		var pageX = e.pageX - window.scrollX;
		var pageY = e.pageY - window.scrollY;
		if(pageX >= x && pageX <= x+popup.offsetWidth &&
		   pageY >= y && pageY <= y+popup.offsetHeight) {
			return true;
		}
	}
	return false;
}

// タイマ、拡張機能の初期化
Lang.initialize();
PseudoTimer.initialize();

//window.addEventListener("load",function() {
	Form.initialize(Extention.getValue);
	Extention.initialize();
//	},false);


//-------------------------------ここからメインの処理-------------------------------

var popupTimerID;
var previousword;
var previousexecdate = new Date;

// mousemoveは負荷が高いので、リアルタイムではなく50ミリ秒ごとに処理を行う。
// 同じ単語内でマウスが動くと何度も同じものを取得してしまうため、
// 取得した単語が一つ前のイベントで取得した単語と異なった場合のみ処理を続行。ここで単語は空文字列の可能性もある。
// 翻訳対象の単語はアルファベット3文字以上に限定。
// マウスが上を通っただけで翻訳処理に入ってしまうのを防ぐため、setTimeoutで遅延を設ける。
// 遅延時間中にマウスが別の場所に移動した場合は前回の翻訳処理をキャンセル。
window.addEventListener("load",function() {

	window.addEventListener("mousemove", function(event){
		if((new Date) - previousexecdate < 50) return;
	// 疑似タイマ、拡張機能対応
		PseudoTimer.checkTimer();
		if(isMouseOverPopup(event)) return;	// ポップアップ上の移動は無視する
		var targetword = catchMouseoverWord(event);
		if(previousword != targetword){
			deletePopup();
			previousword = targetword;
	// 翻訳機能OFFの場合に、
	// 常時有効サイトでもなく、Shiftキー、Ctrlキーも押されてなければ翻訳しない。
			if(Conf.enabled == false) {
				if(Extention.enabled_site_match == false &&
				   !event.shiftKey && !event.ctrlKey ) {
					return;
				}
			}
	// この部分を大幅に変えた、というか拡張して移動させた
			if(targetword && Conf.regex3.test(targetword)){
				PseudoTimer.setTimer(targetword,event.pageX,event.pageY);
			}
		}
		previousexecdate = new Date;
	}, false);

},false);

// マウスをクリックするとポップアップを消去
window.addEventListener("click", deletePopup, false);


})();
