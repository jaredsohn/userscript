// ==UserScript==
// @name           ek$i sozluk indeks framei kaldir
// @namespace      http://lunrfarsde.blogspot.com
// @description    soldaki indeks framei kaldirir
// @include        http://sourtimes.org/
// @include        http://sourtimes.org/top.asp
// @include        http://sourtimes.org/default.asp
// @include        http://sozluk.sourtimes.org/
// @include        http://sozluk.sourtimes.org/top.asp
// @include        http://sozluk.sourtimes.org/default.asp
// ==/UserScript==

var frBar = document.getElementsByName('sozbar')[0];	//indeks framei kaldýr
var frS = document.getElementsByTagName('frameset')[1];
var frMain = document.getElementsByName('sozmain')[0];

if (frBar) {													//default.asp
	frBar.parentNode.insertBefore(frMain, frBar.nextSibling);
	frS.parentNode.removeChild(frS);
}

function btAraClick(event) {	//ara butonuna basýlýnca sonuçlarý indeks framei olmadýðý için ana framede göster
	top.wrappedJSObject.sozmain.location.href = 'index.asp?a=sr&kw=' + escape(document.getElementById('t').value);
}

var btRastgele = document.getElementById('a0');	
if (btRastgele) {												//top.asp
	btRastgele.target = 'sozmain';
}

var btBirGun = document.getElementById('a1');	
if (btBirGun) {								
	btBirGun.target = 'sozmain';
}

var btBugun = document.getElementById('a7');	
if (btBugun) {								
	btBugun.target = 'sozmain';
}

var btDun = document.getElementById('a8');	
if (btDun) {								
	btDun.target = 'sozmain';
}

var bt2005 = document.getElementById('a9');	
if (bt2005) {								
	bt2005.target = 'sozmain';
}

var btAra = document.evaluate(
	'//td[@onclick="if(top.sozindex)top.sozindex.location.href=\'index.asp?a=sr&kw=\'+escape(document.getElementById(\'t\').value);"]', 
	document, 
	null, 
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
	null).snapshotItem(0);
if (btAra) {								
	btAra.wrappedJSObject.onclick = null;
	btAra.addEventListener('click', btAraClick, false);
}