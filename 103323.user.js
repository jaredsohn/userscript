// ==UserScript==
// @name           lernu 2 wrts
// @namespace      lernu2wrts@aykevanlaethem@gmail.com
// @description    saves Lernu.net words to Wrts
// @include        http://*.lernu.net/kursoj/*/vortoj.php?*=*
// ==/UserScript==

function getlist(text) {
	var start = document.body.innerHTML.indexOf(text)+27;
	var end   = document.body.innerHTML.indexOf("');", start)-start;
	var array = document.body.innerHTML.substr(start, end).split("','");
	return array;
}

var espe_text = 'var word_espe';
var tran_text = 'var word_tran';

pagxotitolo = document.getElementById('pagxotitolo');
var title = 'Lernu.net - ';
title += pagxotitolo.firstChild.firstChild.textContent;
title += ' - Parto ';
title += document.location.href.substr(document.location.href.indexOf('=')+1);

var start = document.body.innerHTML.indexOf('selected="selected">')+20;
var lang = document.body.innerHTML.substr(start, document.body.innerHTML.indexOf('<', start)-start);
lang = lang.substr(0, lang.lastIndexOf(' '));

var xml = '<list><title>'+title+'</title><lang-a>Esperanto</lang-a><lang-b>'+lang+'</lang-b><words>';

if (document.body.innerHTML.indexOf(espe_text) != -1 && document.body.innerHTML.indexOf(tran_text) != -1) {
	var espe = getlist(espe_text);
	var tran = getlist(tran_text);
	var espe_word, tran_word;
	for (var i=0; espe_word=espe[i]; i++) {
		tran_word = tran[i];
		if (!tran_word) break;
		xml += '<word><word-a>'+espe_word+'</word-a><word-b>'+tran_word+'</word-b></word>';
	}
}

function submitToWrds() {
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://www.wrts.nl/api/lists',
		headers: {
			'User-Agent': 'Mozilla Greasemonkey - lernu.net', // just so they know it...
			'Content-Type': 'application/xml',
		},
		data: xml,
		onload: function (details) {
			alert('Words submitted');
			console.log(details);
		},
		onerror: function (details) {
			alert('Error submitting words.');
			console.log(details.statusText);
		}
	});
	// TODO give feedback
}

xml += '</words></list>';

// DEBUG: check whether this is valid XML
//var parser = new DOMParser();
//parser.parseFromString(xml, 'text/xml');
var div = document.createElement('div');
div.style.cssFloat="right";
document.getElementById('enhavo').insertBefore(div, document.getElementById('enhavo').childNodes[2]);
div.innerHTML = '<button>Save to Wrts</button>';
div.firstChild.addEventListener('click', submitToWrds, false);
