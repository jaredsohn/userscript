// TF2 Forum Hat Thread Highlighter
// version 1
// October 1st, 2009
// http://tf2app.com/
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TF2 Forum Hat Sub-Section", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           TF2 Forum Hat Thread Highlighter
// @namespace      http://tf2app.com
// @description    Change the link color of hat-related threads in the TF2 forum to red.
// @include        http://forums.steampowered.com/forums/forumdisplay.php?f=80*
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
_m = 'hat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
hat = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'gibus'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
gibus = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'halo'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
halo = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'what'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
what = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'that'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
that = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'hate'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
hate = _c*1;

_s = my_string.toLowerCase(); // haystack
_m = 'chat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
chat = _c*1;

// Next //

_s = my_str.toLowerCase(); // haystack
_m = 'hat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
hat2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'gibus'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
gibus2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'halo'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
halo2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'what'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
what2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'that'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
that2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'hate'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
hate2 = _c*1;

_s = my_str.toLowerCase(); // haystack
_m = 'chat'; // needle
_c = 0;
for (i=0;i<_s.length;i++) {
	if (_m.toLowerCase() == _s.substr(i,_m.length)) {
		_c++;
	}
}
chat2 = _c*1;

if ((hat+gibus+halo-what-that-hate-chat) >= 1 || (hat2+gibus2+halo2-what2-that2-hate2-chat2) >= 1) {
	a.innerHTML = "<font color='#D95B5B'>"+a.innerHTML+"</font>";
}

}
}

}, 10);