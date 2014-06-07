// ==UserScript==
// @name           HL-Inside Link Doctor
// @include        http://*hl-inside.ru/comments/*
// @description    Удаляет пробелы из ссылок в комментариях и делает их гиперссылками.
// @version        1.0
// ==/UserScript==

(function() {

	var pat = /https?:\/\/([^\"\'\<\nА-я]+)/gi;
	var ws = /\s/gi;
	function change(s, p1) {
		var p2 = p1.replace(ws,"");
		return "<a href='http://" + p2 + "'>" + p2 + "</a> ";
	}
	function getElementsByXPath(xpath){
		var result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		var nodes = new Array();

		i = 0;
		while (node = result.iterateNext()) {
				nodes[i] = node;
				i++;
			}

		return nodes;
	}

	var posts = getElementsByXPath("//div[@class='comment__text']");

	for(i=0; i<posts.length;i++){
		posts[i].innerHTML = posts[i].innerHTML.replace(pat,change);
	}
})();