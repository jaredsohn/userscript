// Version: 1.0.0
// ==UserScript==
// @name          Traductor inglés-español
// @namespace     *
// @description	  Traduce al español cualquier palabra que cliques		  
// @include       *
// ==/UserScript==
//Based on the userscript "Dict"

unsafeWindow.diccionario = function(e) {
	d = document;
	text = unsafeWindow.getSelection();
	text = escape(text);
	if (text != '') {
		MyGM_xmlhttpRequest("http://www.wordreference.com/es/translation.asp?tranword="+text+"&dict=enes&B=Buscar", e.clientX+window.scrollX, e.clientY+window.scrollY, text);
	}
}

parse = function(text, x, y) {
	var text_arr = text.split("\n");
	var reg_exp = /.*<span onclick=\'dr4sdgryt2\(event\)\'.*>(.*)<\/span>.*/i;
	for (var i=0; i<text_arr.length; i++) {
		var arr = reg_exp.exec(text_arr[i]);
		if (arr) {
			var meaning = arr[0].replace("\/images\/speaker5.png", "http:\/\/www.wordreference.com\/images\/speaker5.png");
			show_meaning(meaning, x, y);
			break;
		}
	}
}

show_meaning = function(meaning, x, y) {
	var html = "<b>Doubleclick to close</b><br>"+meaning; 
	if (document.getElementById('GmDict')) {
		div = document.getElementById('GmDict');
		div.innerHTML = '';
	} else {
		var div = unsafeWindow.document.createElement('DIV');
	}
	document.addEventListener("dblclick", function() {unsafeWindow.document.getElementById('GmDict').style.display="none"}, true);
	div.setAttribute('ID', 'GmDict');
	div.innerHTML = html;
	div.setAttribute('name', 'GmDict');
	div.setAttribute('style', 'position: absolute; left: '+x+'px; top: '+y+'px; border: 0px; z-Index: 999; display: block; width: 250; background: #ddd; border: #333 solid 1px; -moz-opacity: 0.8; ; font-size: 14px; padding: 3px;');
	document.body.insertBefore(div, document.body.firstChild);
}

MyGM_xmlhttpRequest = function(url, x, y) {
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

unsafeWindow.document.addEventListener("dblclick", unsafeWindow.diccionario, true);
