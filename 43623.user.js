// ==UserScript==
// @name           add_source
// @namespace      http://d.hatena.ne.jp/m6u/
// @description    はてなハイク投稿時の"from"を変更できるようにします
// @include        http://h.hatena.ne.jp/*
// @include        http://h.hatena.com/*
// @exclude        http://h.hatena.ne.jp/help
// @exclude        http://h.hatena.com/help
// @version        0.0.3
// ==/UserScript==

	const default_source = 'web';		// 初期状態の"from"テキスト
	var sourceArray = new Array();
	//
	//sourceArray['矢追純一がハイカーズをムー条件で応援するよ'] = '矢追純一';				// こんな感じで、特定キーワード用の"from"テキストを記述
	//sourceArray['カミナギ占い']                               = 'bot/Hadzuki X-1 A.C.S';	// こんな感じで、特定キーワード用の"from"テキストを記述
	//
	var source_text = default_source;

	var current_keyword = '';

	function createElement(type, attributes){
		var node = document.createElement(type);
		for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
			node.setAttribute(attr, attributes[attr]);
		}
		return node;
	}
	function clickReplyButton() {
		var str_id = 'reply-' + this.getAttribute('id');
		var elemFormReply = document.getElementById(str_id);
		if (elemFormReply.childNodes[0].getAttribute('class') == 'text-container') {
			var elemDiv = elemFormReply.childNodes[0];
			var attr4inp = new Array();
			attr4inp['type'] = "text";
			attr4inp['size'] = "20";
			attr4inp['name'] = "source";
			attr4inp['value'] = source_text;
			var elemText = document.createTextNode('from:');
			elemFormReply.insertBefore(elemText, elemDiv);
			var elemInp = createElement('input', attr4inp);
			elemFormReply.insertBefore(elemInp, elemDiv);
		}
	}
	
	//
	//  seeking current keyword
	//
	var elemFormAlls = document.getElementsByTagName('form');
	for (var i = 0; i < elemFormAlls.length; i++) {
		var f = elemFormAlls[i]
		if (f.hasChildNodes()) {
			if (f.childNodes.length >= 1) {
				for (j = 0; j < f.childNodes.length; j++) {
					var n = f.childNodes[j];
					var v = n.tagName;
					if ((n.tagName == 'INPUT') && (n.name == 'word')) {
						current_keyword = n.value;
						j = f.childNodes.length;
						i = elemFormAlls.length;
					}
				}
			}
		}
	}
	if (sourceArray[current_keyword]) {
		source_text = sourceArray[current_keyword];
	}
	
	
	//
	//  main
	//
	
	var elemAAlls = document.getElementsByTagName('a');
	for (var i = 0; i < elemAAlls.length; i++) {
		if (elemAAlls[i].getAttribute('class') == 'reply') {
			elemAAlls[i].addEventListener('click', clickReplyButton, false);
		}
	}

	var elemCont;
	var elemDivs = document.getElementsByTagName('div');
	for (var i=0; i<elemDivs.length; i++) {
		if (elemDivs[i].getAttribute('class') == 'text-container') {
			elemCont = elemDivs[i];
		}
	}
	if (elemCont) {
		var attr4inp = new Array();
		attr4inp['type'] = "text";
		attr4inp['size'] = "20";
		attr4inp['name'] = "source";
		attr4inp['value'] = source_text;
		var elemInp = createElement('input', attr4inp);
		elemCont.parentNode.insertBefore(elemInp, elemCont.parentNode.childNodes[4]);
		var elemText = document.createTextNode('from:');
		elemCont.parentNode.insertBefore(elemText, elemCont.parentNode.childNodes[4]);
	}

