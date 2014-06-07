// ==UserScript==
// @name           IineDayoneSwitcher
// @namespace      matsuitter
// @include        *
// ==/UserScript==

var correctWord = 'だよね！';
var correctWord2 = 'ダヨネ！';
var correctWord3 = 'DA.YO.NE';

function $(id){
  return document.getElementById(id);
}

function walker(node) {
	if (node.nodeType === 3) {
          node.textContent = node.textContent.replace(/いいね！/g, correctWord);
          node.textContent = node.textContent.replace(/イイネ！/g, correctWord2);
          node.textContent = node.textContent.replace(/Like/g, correctWord3);
	} else if (node.nodeType === 1) {
		if(/^(IFRAME|STYLE|SCRIPT)$/i.test(node.tagName)) {
			// TODO
		} else if (/^(INPUT|TEXTAREA)$/i.test(node.tagName)) {
			node.value = node.value.replace(/いいね！/g, correctWord);
            node.value = node.value.replace(/イイネ！/g, correctWord2);
            node.value = node.value.replace(/Like/g, correctWord3);
		} else {
			var childNodes = node.childNodes;
			for (var i = 0, len = childNodes.length; i < len; ++i) {
				walker(childNodes[i]);
			}
		}
	}
}

walker(document.body || document.documentElement);

