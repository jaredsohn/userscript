// ==UserScript==
// @name           Store Editor toolBar
// @description    Built for editing items fast in store editor. 2.1
// @namespace      edit.store.yahoo.net
// @include        http://*.us-dc*-edit.store.yahoo.net/RT/NEWEDIT.*
// @exclude        http://us-dc*-order.store.yahoo.net/*
// ==/UserScript==

var launch=window.document.body.getAttribute('launch');
if (launch) { return; }
window.document.body.setAttribute('launch','true');
var s = document.createElement('link');
s.setAttribute('href', 'http://chriswhitney.com/greasemonkey/store_editor_toolbar.css');
s.setAttribute('rel', 'stylesheet');
document.getElementsByTagName('body')[0].appendChild(s);
void(s);

var s = document.createElement('script');
s.setAttribute('src', 'http://chriswhitney.com/greasemonkey/store_editor_toolbar.js');
document.getElementsByTagName('body')[0].appendChild(s);
void(s);

//code is hosted on my server for auto updates