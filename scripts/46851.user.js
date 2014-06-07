// ==UserScript==
// @name           Beautify RTML Editor
// @namespace      http://userscripts.org/users/87140
// @description    Syntax Highligting and more for yahoo! store RTML editor
// @include        http://*.us-dc*-edit.store.yahoo.net/RT/NEWEDIT.*
// @include        http://us-dc*-edit.store.yahoo.com/RT/MGR.*
// @exclude        http://*.us-dc*-edit.store.yahoo.net/RT/NEWEDIT.*/*.html*
// ==/UserScript==
/*
if (typeof jQuery == 'undefined') { 
	var s = document.createElement('script');
	s.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js');
	document.getElementsByTagName('body')[0].appendChild(s);
	void(s);
}
*/
var s = document.createElement('link');
s.setAttribute('href', 'http://lib.store.yahoo.net/lib/rtmltemplates/kmod-rtml.css');
s.setAttribute('rel', 'stylesheet');
document.getElementsByTagName('body')[0].appendChild(s);
void(s);

var s = document.createElement('script');
s.setAttribute('src', 'http://www.yswhosting.com/RTMLbeauty/kmod-rtml.js');
document.getElementsByTagName('body')[0].appendChild(s);
void(s);