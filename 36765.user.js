// ==UserScript==
// @name           Disable Tumbrowser Shortcut Keys
// @namespace      http://cxx.tumblr.com/
// @include        http://mao.s151.xrea.com/tumbrowser/*
// @version        0.2.1
// ==/UserScript==

var w = this.unsafeWindow || window;
w.$(function(){
	w.$.hotkeys.all[w.$('html')[0]].events['keydown'].callbackMap = {};
});
