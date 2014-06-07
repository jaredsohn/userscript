// ==UserScript==
// @name           G_CN_Suggest
// @namespace      foxwoods.cn@gmail.com,2009-06-27:WJY
// @description    open Google Suggest on g.cn
// @include        http://www.google.cn/*
// @include        http://www.g.cn/*
// @exclude        http://www.google.com/*
// ==/UserScript==

(function() {

function appendScript(myScript) {
	var script = document.createElement("script");
	script.text = myScript;
	document.body.appendChild(script);
}

function get_unsafeWindow() {
	return (typeof unsafeWindow === 'undefined') ? window : unsafeWindow;
}

(function(f) {
	if (!f) {
		return;
	}
	if (typeof get_unsafeWindow().google.ac === 'undefined') {
		var func_this = arguments.callee;
		window.setTimeout(function(){func_this(f)}, 100);
	} else {
		appendScript("google.ac.i(document." + f + ", document." + f + ".q, '', '', '')");
	}
})(document.forms.namedItem('f') ? 'f' : document.forms.namedItem('gs') ? 'gs' : '');

}())

