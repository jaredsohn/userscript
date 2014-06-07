// ==UserScript==
// @name           haiku_post_assist
// @namespace      http://d.hatena.ne.jp/m6u/
// @description	   はてなハイク投稿フォームを拡張します
// @include		   http://h1beta.hatena.ne.jp/*
// @include		   http://h.hatena.ne.jp/*
// @include		   http://h.hatena.com/*
// @exclude        http://h1beta.hatena.ne.jp/keywords*
// @exclude        http://h1beta.hatena.ne.jp/hotkeywords*
// @exclude        http://h1beta.hatena.ne.jp/invite*
// @exclude        http://h1beta.hatena.ne.jp/settings*
// @exclude        http://h1beta.hatena.ne.jp/help*
// @exclude        http://h1beta.hatena.ne.jp/api*
// @exclude        http://h.hatena.ne.jp/keywords*
// @exclude        http://h.hatena.ne.jp/hotkeywords*
// @exclude        http://h.hatena.ne.jp/invite*
// @exclude        http://h.hatena.ne.jp/settings*
// @exclude        http://h.hatena.ne.jp/help*
// @exclude        http://h.hatena.ne.jp/api*
// @exclude        http://h.hatena.com/keywords*
// @exclude        http://h.hatena.com/hotkeywords*
// @exclude        http://h.hatena.com/invite*
// @exclude        http://h.hatena.com/settings*
// @exclude        http://h.hatena.com/help*
// @exclude        http://h.hatena.com/api*
// @version        0.3.4
// ==/UserScript==
/******************************************************************************
*
*  1. from記入欄を追加。
*  2. from記入欄に、キーワード依存の定型句を自動設定、
*     もしくは初期値として定型句を自動設定。
*  3. 本文欄に、キーワード依存の定型句を自動設定、
*     もしくは初期値として定型句を自動設定。
*  4. Reply投稿時もキーワードを見つけ出して対応します。（0.2.0で強化！）
*  5. "quote!"ボタンで、選択テキストを引用符付きで挿入します。（0.3.0で強化！）
*
*  注意：
*      拙作の「add_source.user.js」「add_useragent_source.user.js」と
*    機能が重複しているので、インストール前にそれらを無効または
*    アンインストールすること。
*
*  使用方法：
*      default_source に、初期fromテキストを、
*      default_post に、初期投稿テキストを設定する。
*
*      arr_source や arr_post に、キーワード毎のfromテキストや投稿テキストを。
*
*      行頭に「//」があると一行コメントとして無視されます。
*      「\n」があると改行に展開します。
*      「ぼんやり」などの設定例を残しますので、その行をコピーしてお使いください。
*
*      お勧めテンプレートがあれば、ハイク上「id:m6u」にてタレコみよろしく。
*
******************************************************************************/
(function() {

	// from候補
//	const default_source = '招福猫児';
	const default_source = 'web';
	var arr_source = {
		'矢追純一がハイカーズをムー条件で応援するよ': '矢追純一',
		'大槻教授がハイカーズを無条件でプラズマのせいにするよ': '大槻教授',
		'アントニオ猪木がハイカーズを無条件でビンタするよ': 'アントキの猪木',
		'ぼんやり': '（ ´-｀）',
		'うすぼんやり': '（ ´_ 、）',
		'（ ´-｀）（´_ 、 ）': '（ ´-｀）（´_ 、 ）',
		'っﾟ､｡)っ 。o 0 （………） ': 'っﾟ､｡)っ',
		'（ ･3･）＜': '（ ･3･）',
		'( ﾟдﾟ)∩＜': '( ﾟдﾟ)∩',
		'(」ﾟ□ﾟ)」＜': '(」ﾟ□ﾟ)」',
		'( ﾟ⊿ﾟ)＜': '( ﾟ⊿ﾟ)',
		'{ - j - } 。o 0 （………） ': '{ - j - }',
		'＼(^o^)／': '＼(^o^)／',
		'オワタ': '＼(^o^)／',
	};
	
	// 本文テンプレート
	const default_post = '';
	var arr_post = {
		'ぼんやり': '（ ´-｀）。o 0 （...）',
		'うすぼんやり': '（ ´_ 、）。o 0 （...）',
		'（ ´-｀）（´_ 、 ）': '＞（ ´-｀）（´_ 、 ）＜',
		'っﾟ､｡)っ 。o 0 （………） ': 'っﾟ､｡)っ 。o 0 （………） ',
		'（ ･3･）＜': '（ ･3･）＜',
		'( ﾟдﾟ)∩＜': '( ﾟдﾟ)∩＜',
		'(」ﾟ□ﾟ)」＜': '(」ﾟ□ﾟ)」＜',
		'( ﾟ⊿ﾟ)＜': '( ﾟ⊿ﾟ)＜',
		'{ - j - } 。o 0 （………） ': '{ - j - } 。o 0 （………） ',
		'＼(^o^)／': '＼(^o^)／',
		'オワタ': '＼(^o^)／',
		'文章の最後に「ゲーテ」をつけて何でも意味深長': ' \n \nゲーテ',
		'最後に「みつを」をつけてみる': ' \n \nみつを',
		'文章の最後にﾌﾋﾋを付けて嫌な感じにする': ' \n \nﾌﾋﾋ',
	};
	
	// 引用符
	const quote_prefix = '＞ ';		// 引用テキストの前につける文字列
	const quote_suffix = '';		// 引用テキストの後につける文字列
	var is_modify = new Array();

	function xpath(context, query) {
		var elements  = [];
		var snapshots = document.evaluate(
			query, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
		);
		for (var i = 0, elements = []; i < snapshots.snapshotLength; i++) {
			elements.push(snapshots.snapshotItem(i));
		}
		return elements;
	}

	function createElement(type, attributes){
		var node = document.createElement(type);
		for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
			node.setAttribute(attr, attributes[attr]);
		}
		return node;
	}

	function find_keyword(div) {
		var kwd;
		var f = div.parentNode;
		var words = xpath( f, 'input[@name="word"]' );
		if (words.length > 0) {
			kwd = words[0].value;
		}
		else {
			words = xpath( document.body, '//form[@class="entry-form"]/input[@name="word"]' );
			if (words.length > 0) {
				kwd = words[0].value;
			}
			else {
				var listBody = div.parentNode.parentNode;
				var h2_a = xpath( listBody, '//h2[@class="title"]/a' );
				kwd = h2_a.nodeValue;
			}
		}
		return kwd;
	}

	function getSelectText() {
		if (unsafeWindow.getSelection)
			return '' + (unsafeWindow.getSelection() || '');
		else if (document.getSelection)
			return document.getSelection();
		else if (document.selection)
			return document.selection.createRange().text;
		else
			return '';
	}

	function quote_text(){
		var f = this.parentNode;
		var selTxt = getSelectText();
		var tas = xpath( f, './/textarea[@class="entry-body"]' );
		if (selTxt.length != "") {
			var insTxt = '';
			if (selTxt.indexOf("\n") >= 0) {
				var arrTxt = selTxt.split("\n");
				for (var i = 0; i < arrTxt.length; i++) {
					insTxt += quote_prefix + arrTxt[i] + quote_suffix + "\n";
				}
			} else {
				insTxt = quote_prefix + selTxt + quote_suffix + "\n";
			}
			tas[0].value = insTxt + tas[0].value;
		}
	}

	function add_source(div, kwd) {
		var src = arr_source[kwd];
		var pst = arr_post[kwd];
		if (src == undefined) { src = default_source; }
		if (pst == undefined) { pst = default_post; }
		var attr = {
			type: 'text',
			size: '20',
			name: 'source',
		};
		attr['value'] = src;
		div.parentNode.insertBefore(document.createTextNode('from:'), div);
		var elemInp = createElement('input', attr);
		div.parentNode.insertBefore(elemInp, div);
		div.parentNode.insertBefore(document.createTextNode(' '), div);
		var btnAttr = {
			type: 'button',
			name: 'btn_haiku_post_assist_quote',
			value: 'quote!',
		};
		var elemBtn = createElement('input', btnAttr);
		div.parentNode.insertBefore(elemBtn, div);
		elemBtn.addEventListener('click', quote_text, false);
		var tas = xpath( div, 'textarea[@class="entry-body"]' );
		if (tas.length == 1) { tas[0].value = pst; }
	}

	function clickReplyButton() {
		var reply_id = 'reply-' + this.id;
		if (is_modify[reply_id]) {	// 重複実行防止
			return;
		}
		else {
			var kwd = page_keyword;
			var f = document.getElementById(reply_id);
			var listBody = f.parentNode;
			var h2s = xpath( listBody, './/h2[@class="title"]' );
			var as = xpath( h2s[0], './/a' );
			kwd = as[as.length-1].firstChild.nodeValue;
			var divs = xpath( f, 'div[@class="text-container"]' );
			for (var i = 0; i < divs.length; i++) {
				add_source(divs[i], kwd);		// 加工本体
			}
			is_modify[reply_id] = reply_id;
		}
	}

	function insertReplyForm() {
		var elems = xpath( this, './/form[@action="/entry"]');
		if (elems.length > 0) {
			if (elems[0].id.substring(0,6) == 'reply-') {
				var reply_id = elems[0].id;
				if (is_modify[reply_id]) {	// 重複実行防止
					return;
				}
				else {
					is_modify[reply_id] = reply_id;
					var f = document.getElementById(reply_id);
					var a_kwds = xpath( f.parentNode, './/h2[@class="title"]/a');
					var kwd = a_kwds[0].text;
					var listBody = f.parentNode;
					var h2s = xpath( listBody, './/h2[@class="title"]' );
					var as = xpath( h2s[0], './/a' );
					var divs = xpath( f, 'div[@class="text-container"]' );
					for (var i = 0; i < divs.length; i++) {
						add_source(divs[i], kwd);		// 加工本体
					}
				}
			};
		}
	}
	
	// キーワードページ用キーワード取得
	var page_keyword = '';
	var words = xpath( document.body, '//form[@class="entry-form"]/input[@name="word"]' );
	if (words.length > 0) {
		page_keyword =  words[0].value;
	}

	// キーワードページ用の加工
	var divs = xpath( document.body, '//div[@class="text-container"]' );
	for (var i = 0; i < divs.length; i++) {
		add_source(divs[i], page_keyword);
	}

	// Reply用の加工用イベント追加
	//var reply_buttons = xpath( document.body, '//span[@class="reply"]/a[@class="reply"]' );
	//for (var i = 0; i < reply_buttons.length; i++) {
	//	reply_buttons[i].addEventListener('click', clickReplyButton, false);
	//}
	var list_bodys = xpath( document.body, '//div[@class="entry"]/div[@class="list-body"]' );
	for (var i = 0; i < list_bodys.length; i++) {
		list_bodys[i].addEventListener('DOMNodeInserted', insertReplyForm, false);
	}
	
	unsafeWindow.Hatena.Haiku.Pager.addEventListener('loadedEntries', function(div){
	//	var reply_buttons = xpath( document.body, '//span[@class="reply"]/a[@class="reply"]' );
	//	for (var i = 0; i < reply_buttons.length; i++) {
	//		reply_buttons[i].addEventListener('click', clickReplyButton, false);
	//	}
		var list_bodys = xpath( document.body, '//div[@class="entry"]/div[@class="list-body"]' );
		for (var i = 0; i < list_bodys.length; i++) {
			list_bodys[i].addEventListener('DOMNodeInserted', insertReplyForm, false);
		}
	});
})();
