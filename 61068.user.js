// ==UserScript==
// @name           Upsetamat Killer Beta
// @namespace      telefpreen.blogspot.com
// @description    Beta version of removing "UpsetaMat" spammers client-side
// @include        http://forums.cobbtuning.com/*
// ==/UserScript==

window.setTimeout(function() { 

var tds = document.getElementsByTagName('td');
var as = document.getElementsByTagName('a');

y=0;
for (var z = 0; z < as.length; z++) {
lock=0;
var a = as[z];
if (a.id.indexOf('thread_title') == 0) {
	
while (lock == 0) {
	y++;
	var td = tds[y];
	if (td.id.indexOf('td_threadtitle') == 0) {
		lock = 1;
	}
}

my_str = td.title;
my_string = a.innerHTML;

_s = my_string.toLowerCase(); // haystack
_m = 'upsetamat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
upsetamat = _c*1;


// Next //

_s = my_str.toLowerCase(); // haystack
_m = 'upsetamat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
upsetamat2 = _c*1;


if ((upsetamat) >= 1 || (upsetamat2) >= 1) {
	a.parentNode.parentNode.parentNode.style.display = "none";

}

}
}

}, 10);