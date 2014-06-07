// ==UserScript==
// @name Ikariam better friends 
// @version	050.1
// @icon http://s3.amazonaws.com/uso_ss/icon/89620/large.png?1289077083
// @namespace	IkaBF
// @description	more featrues to the friends list
// @include	http://s*.ikariam.*/index.php*
// ==/UserScript==

function exportURLs() {
	var str = getImageURL('slot0');
	for( var i=1; i<12; i++) {
		str += ',' + getImageURL('slot'+i);
	};
	alert(str);
};

function importURLs() {
	var str = prompt('friends urls');
	var url = str.split(",");
	for( var i=0; i<url.length && i<12; i++) {
		if (url[i].length>0) { setImageURL('slot'+(i), url[i]) };
	};
	main();
};

function getImageURL(slot) {
	var url = GM_getValue(document.domain + slot,"");
	return url;
};

function setImageURL(slot, url) {
	GM_setValue(document.domain + slot, url);
};

function addButtonTo(node) {
	var div = node.getElementsByTagName('div');
	if (div.length>2) {
		var a=node.getElementsByTagName('a');
		var slotNum = parseInt( div[1].innerHTML )-1;
		var slot = 'slot' + slotNum;
		var url = getImageURL(slot);
		if (!url == "") {
			div[0].innerHTML='<img width="34px" height="34px" src="'+url+'">';
		}
		div[0].addEventListener('click', function () {imageFor(a[0].innerHTML, slot, url, div[0])}, false );
	}
};

function imageFor(username, slot, urlOld, div) {
	var url = prompt(username, urlOld);
	setImageURL(slot, url);
	if (url == "") { div.innerHTML='' }
	else { div.innerHTML='<img width="34px" height="34px" src="'+url+'">'};
};

function main() {
	var li = document.getElementById("js_viewFriends").getElementsByTagName('li');
	for (var i=0; i<li.length; i++) {
		addButtonTo(li[i]);
	};
};

GM_registerMenuCommand("import friends", importURLs);
GM_registerMenuCommand("export friends", exportURLs);
main();