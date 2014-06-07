// ==UserScript==
// @name           google reader eliminate popup messages
// @namespace      http://tweaksthelimbs.org/greasemonkey
// @description    eliminates popup messages in google reader 
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==

var w = unsafeWindow;
var f = function(){return true;};
w.alert_ = w.alert;
w.alert = f;
w.confirm_ = w.confirm;
w.confirm = f;