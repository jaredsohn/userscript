// ==UserScript==
// @name           Clear Button for Every Textbox
// @namespace      http://profile.livedoor.com/ronekko/
// @description    テキスト入力欄に消去ボタンを付加する
// @include        http://*
// @include        https://*
// @exclude        http://reader.livedoor.com/reader/
// @exclude        http://reader.livedoor.com/public/*
// ==/UserScript==

const BUTTON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAAEVmidkAAAADFBMVEUAAADDw8OysrL7%2B%2FtTty0RAAAABHRSTlMA%2F%2F%2F%2Fsy1AiAAAABp0RVh0VGl0bGUAYmF0dTNmdXRpbWFydWc5aS5wbmcuUh3OAAAADHRFWHRTb2Z0d2FyZQBWaVisIm5tAAAAXUlEQVR42h2LoQ2AQBAER1EEJRwCPH0R3LeARD0o%2FnIGh6QQKvgKCCEh4cDMJpMdoAFmWkrfyIYhRnVTd4i6w5S9Z82kTLxYxs8XZgNyJEWe4JhOR3jUS3%2BK2Z%2FyAizRIAqWu6MEAAAAAElFTkSuQmCC';
	
var createClearButton = function(node){
	var parent = node.parentNode;
	var button = document.createElement('img');
	var bgColor;
	button.src = BUTTON;
	button.style.cursor = 'pointer';
	
	button.addEventListener('click', function(e){
		var targetColor = node.style.backgroundColor;
		node.value = '';
		node.focus();
		if(node.style.backgroundColor == targetColor){
			node.style.backgroundColor = '';
		}
		bgColor = node.style.backgroundColor;
	}, true);
	
	button.addEventListener('mouseover', function(e){
		bgColor = node.style.backgroundColor;
		node.style.backgroundColor = '#BBBBBB';
	}, true);
	
	button.addEventListener('mouseout', function(e){
		node.style.backgroundColor = bgColor;
	}, true);
	
	parent.insertBefore(button, node);
}

var nodes = [];
Array.prototype.push.apply(nodes, Array.slice(document.getElementsByTagName('input')));
Array.prototype.push.apply(nodes, Array.slice(document.getElementsByTagName('textarea')));
for(var i=0, len=nodes.length; i<len; i++){
	if(nodes[i].type == 'text' || nodes[i].type == 'password' || (nodes[i].tagName.toLowerCase() == 'textarea' && nodes[i].style.display != 'none')){
		createClearButton(nodes[i]);
	}
}