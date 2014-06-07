// ==UserScript==
// @name           LOR HTML Unescape
// @namespace      http://drdaeman.pp.ru/
// @include        http://www.linux.org.ru/*
// ==/UserScript==

(function() {
    var arrDivs = document.getElementsByTagName('div');
    for (var i = 0; i < arrDivs.length; i++) {
	var objDiv = arrDivs[i];
	if (objDiv.className == 'msg') {
	    var strHTML = objDiv.innerHTML.replace(/&amp;#(\d+)([\r\n]*)(\d*);/g, '&#$1$3;');
	    if (objDiv.innerHTML != strHTML) { objDiv.innerHTML = strHTML; }
	}
    }
})();
