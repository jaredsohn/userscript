// ==UserScript==
// @name           mashaworld offtop
// @namespace      tf2world.ru
// @include        http://tf2world.ru/forum*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function() {

	function $x(path, root) {
	
		if (!root) root = document;
		var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
		return arr;
	}

	var a=$x("//input[@value='Спойлер']");  
//	a.forEach(function(button) { button.click() });

//	addGlobalStyle('.offtopic { color: #888; font-size: 100%; font-style: normal; }');
//	addGlobalStyle('.offtopic_highlight { color: #888; font-size: 100%; font-style: normal; }');
	addGlobalStyle('.offtopic { color: #999; font-size: xx-small; font-style: normal; }');
	addGlobalStyle('.offtopic_highlight { color: #999; font-size: xx-small; font-style: normal; }');
}                             
)();