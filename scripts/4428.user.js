// ==UserScript==
// @name           ek$i sozluk baslik son sayfa hatirla
// @namespace      http://lunrfarsde.blogspot.com
// @description    bir basliga gidildiginde o baslik icin en son bakilmis olan sayfayi getirir  
// @include        http://sourtimes.org/*
// @include        http://sozluk.sourtimes.org/*
// ==/UserScript==

function PageQuery(q) {
	if(q.length > 1) this.q = q.substring(1, q.length);
	else this.q = null;
	this.keyValuePairs = new Array();
	if(q) {
		for(var i=0; i < this.q.split("&").length; i++) {
			this.keyValuePairs[i] = this.q.split("&")[i];
		}
	}

	this.getKeyValuePairs = function() { return this.keyValuePairs; }

	this.getValue = function(s) {
		for(var j=0; j < this.keyValuePairs.length; j++) {
			if(this.keyValuePairs[j].split("=")[0] == s) return this.keyValuePairs[j].split("=")[1];
		}
		return false;
	}

	this.getParameters = function() {
		var a = new Array(this.getLength());
		for(var j=0; j < this.keyValuePairs.length; j++) {
			a[j] = this.keyValuePairs[j].split("=")[0];
		}
		return a;
	}

	this.getLength = function() { return this.keyValuePairs.length; }
}

function queryString(key){
	var page = new PageQuery(window.location.search);
	return unescape(page.getValue(key));
}

function ekleP(event) {
	var t = document.getElementById('t');
	var p = document.getElementById('p');
	if (p == undefined) {
		p = document.createElement('input');
		p.id = 'p';
		p.name = 'p';
		p.type = 'hidden';
		t.parentNode.insertBefore(p, t);   
	}

	var sayfa = GM_getValue(t.value.replace(/ /g, '+'), 1);
	p.value = sayfa;
}

function btGetirClick(event) {
	ekleP(event);
	document.getElementById('fg').submit();
}

var fg = document.forms.namedItem('fg');    //top.asp
if (fg) {   
	fg.addEventListener('submit', ekleP, true);

	var btGetir = document.evaluate('//a[@href="javascript:document.getElementById(\'fg\').submit()"]', 
		document, 
		null, 
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
		null).snapshotItem(0);
	btGetir.wrappedJSObject.onclick = null;
	btGetir.addEventListener('click', btGetirClick, false);
}

if (document.location.pathname=='/show.asp') {    //show.asp
	var t = queryString('t');
	var p = queryString('p');
	if (p!='false') {
		GM_setValue(t, p);
	}
}
