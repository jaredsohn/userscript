// ==UserScript==
// @name           festzeit.ch mark underage user
// @namespace      festzeit.ch underage
// @include        http://www.festzeit.ch/*
// ==/UserScript==

var all_links=document.getElementsByTagName("a");

function get(url, cb, cur_object) {
	GM_xmlhttpRequest({
	 method: "GET",
	 url: url,
	 onload: function(xhr) { cb(xhr.responseText, cur_object); }
	});
}

function set_alter(text, cur_object) {
	var ui=text.split(';');
	alter=ui[6].split('.')[0];
	cur_object.innerHTML+='('+alter+')';
	if(alter<18) {
		cur_object.style.color='red';
	}
}

for(var i=0; i< all_links.length; i++) {
	var link=all_links[i].href;

	Ergebnis = link.match(/member.php\?user=(.*)/);

	if(Ergebnis!=null) {
		var uid=Ergebnis[1];
		get('http://www.festzeit.ch/usrnfo.php?id='+uid, set_alter, all_links[i]);
	}
}