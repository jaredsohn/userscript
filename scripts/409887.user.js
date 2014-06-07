// ==UserScript==
// @name           RTML Editor Improvements
// @description    RTML Syntax Highlighting editor improvements for yahoo! store
// @include        http://*.us-dc*-edit.store.yahoo.net/RT/NEWEDIT.*
// @include        http://us-dc*-edit.store.yahoo.com/RT/MGR.*
// ==/UserScript==

var s = document.createElement('link');
s.setAttribute('href', 'http://www.yswhosting.com/RTMLbeauty/kmod-rtml.css');
s.setAttribute('rel', 'stylesheet');
document.getElementsByTagName('body')[0].appendChild(s);
void(s);

var s = document.createElement('script');
s.setAttribute('src', 'http://www.yswhosting.com/RTMLbeauty/kmod-rtml.js');
document.getElementsByTagName('body')[0].appendChild(s);
void(s);