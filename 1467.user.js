// ==UserScript==
// @name          Dict
// @namespace     http://premshree.org/userscripts
// @description	  Find the meaning of any word on a
//		   web page by double-clicking on it
// @include       *
// ==/UserScript==

/*
 * $premshree$ $2005-07-21 12:25$
 */

window.dict = function(e) {
	d = document;
	text = window.getSelection();
	text = escape(text);
	if (text != '') {
		MyGM_xmlhttpRequest("http://www.onelook.com/?w="+text+"&ls=a", e.clientX+window.scrollX, e.clientY+window.scrollY);
	}
}

window.parse = function(text, x, y) {
	var text_arr = text.split("\n");
	var reg_exp = /^<LI><b><i>.*<\/i>:<\/b>&nbsp;&nbsp; (.*)$/i;
	for (var i=0; i<text_arr.length; i++) {
		var arr = reg_exp.exec(text_arr[i]);
		if (arr) {
			meaning = arr[1].replace(/color=green/, '');
			show_meaning(meaning, x, y);
			break;
		}
	}
}

window.show_meaning = function(meaning, x, y) {
	html = meaning + ' <a href="javascript:void(document.getElementById(\'GmDict\').style.display=\'none\')">[x]</a>';
	if (document.getElementById('GmDict')) {
		div = document.getElementById('GmDict');
		div.innerHTML = '';
	} else {
		var div = document.createElement('DIV');
	}
	div.setAttribute('ID', 'GmDict');
	div.innerHTML = html;
	div.setAttribute('name', 'GmDict');
	div.setAttribute('style', 'position: absolute; left: '+x+'px; top: '+y+'px; border: 0px; z-Index: 999; display: block; width: 150; background: #666; border: #333 solid 1px; -moz-opacity: 0.8; color: #FFF; font-size: 12px; padding: 3px;');
	document.body.insertBefore(div, document.body.firstChild);
}

window.MyGM_xmlhttpRequest = function(url, x, y) {
	GM_xmlhttpRequest ( {
		method : "GET",
		url : url,
		onload : function (details) {
			if (details.readyState == 4) {
				parse(details.responseText, x, y);
			}
		}
	} );
}

window.addEventListener("dblclick", dict, true);