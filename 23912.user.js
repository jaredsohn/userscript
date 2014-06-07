// ==UserScript==
// @name           LibAldebaran
// @namespace      aldebaran
// @description    removes text protectors from HTML content on lib.aldebaran.ru (c) profuel
// @include        http://lib.aldebaran.ru/*
// @version        1.0
// ==/UserScript==

// date: 2008-03-14
// http://profuel.info/gs/aldebaran.htm

if (document.getElementById("chid")) {
	var elements = document.getElementsByTagName('small');
	var i = 0;
	while (i<elements.length && elements[i].className!='path') i++;
	
	if (i<elements.length) {
		var code = 
		" var obj = document.getElementById(\"chid\");"+
		" if (obj) {"+
		" var text = obj.innerHTML; "+
		" txt = new String(text);"+
		// uncomment next line to remove paging navigation 
		//" txt = txt.replace(/<div class=\\\"content\\\">.*?<\\/div>/g, \"\");"+
		" txt = txt.replace(/<span class=\\\"?h\\\"?>.*?<\\/span>/g, \"\");"+
		" document.getElementById(\"chid\").innerHTML = txt;"+
		"document.onmousedown=(function() { return true;}); "+
		"document.ondragstart=(function() { return true;});"+
		"document.onselectstart = (function() { return true;});"+
		"document.ontextmenu = (function() { return true;});"+
		"document.body.oncopy=(function() { return true;});"+
		"document.body.oncontextmenu=(function() { return true;});"+
		"document.body.onclick=(function() { return true;});"+
		"document.onclick=(function() { return true;});"+
		"window.clearTimeout(noSel);"+
		"get_selection = (function(){});"+
		"LockSel = (function(){});"+
		"click = (function(){});"+
		"pBeforeCopy = (function(){});"+
		"}";
		
		elements[i].innerHTML+= "<input type='button' value='Update' onclick='javascript:"+ code +" ' />";
		window.setTimeout(code, 10000);
	}
}

var obj = document.getElementsByTagName('div');
if (obj) {
	obj = obj[0];
	obj.style.display = 'none';
}

obj = document.getElementById("tab_bn");
if (obj)
	obj.style.display = 'none';
