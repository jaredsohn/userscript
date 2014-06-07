// ==UserScript==
// @name           DoubanNote2GReaderNote
// @namespace      limboy.com
// @description    Convert Douban note to GReader note
// @include        http://www.douban.com/note/*
// @include        http://site.douban.com/widget/notes/*
// @include        http://book.douban.com/annotation/*
// @author         Dexter.Yy (http://www.limboy.com | dexter.yy at gmail.com)
// ==/UserScript==

unsafeWindow.addEventListener("DOMContentLoaded", function(){
	if (unsafeWindow.document)
		main(unsafeWindow, unsafeWindow.document, unsafeWindow.console);
	else
		setTimeout(arguments.callee, 200);
}, false);

function main(window, document, console){

	GM_addStyle('#yybox{position:fixed;bottom:10px;right:10px;width:150px;background:#E9F4E9;padding:20px 10px;text-align:center}#yybox a{padding:6px 10px;background:#2DA653;color:#fff;}');
	var btn = addElm('<div id="yybox"><a href="#">Note to GReader</a></div>');
	document.body.appendChild(btn);

	btn.addEventListener('click', function(){
		var note = elm('pre')[0];
		var table = {
			'\n': '<br/>',
			'\r': '<br/>',
			'\t': '&nbsp;&nbsp;',
			' ': '&nbsp;'
		};
		note.innerHTML = note.innerHTML.replace(/[\t\n\r]/g, function(c){
			return table[c] || c;
		});
		var select = window.getSelection(),
			range = document.createRange();
		range.selectNodeContents(note);
		select.addRange(range)
		globalEval('window.GR________bookmarklet_domain = "https://www.google.com";');
		var s = document.createElement('script');
		s.src='https://www.google.com/reader/ui/link-bookmarklet.js';
		document.body.appendChild(s);
	}, false);


	function elm(selector) {
		try {
			return Array.prototype.slice.call( document.querySelectorAll(selector) );
		} catch(e){
			alert('Update your Firefox to 3.5+, please.');
			return [];
		}
	}

	function addElm(html){
		var tmp = document.createElement('div');
		tmp.innerHTML = html;
		var child = tmp.firstChild;
		if (tmp.childNodes.length == 1)
			return child;
		var fragment = document.createDocumentFragment();
		do {
			fragment.appendChild(child);
		} while (child = tmp.firstChild)
		return fragment;
	}

	function globalEval(src){
		var s = document.createElement('script');
		s.setAttribute("type", "application/javascript");
		s.textContent = src;
		document.body.appendChild(s);
		document.body.removeChild(s);
	}
}
