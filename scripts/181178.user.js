// ==UserScript==
// @name       One2uploader Block
// @namespace  http://facebook.com.rayspic
// @version    0.1b
// @description  It's testing . . .
// @match      http://one2uploader.blogspot.com/
// @match      http://one2uploader.blogspot.com/*
// @copyright  2013+, Piyapan Rodkuen
// ==/UserScript==

var foot = document.getElementById('footer');
var parent = foot.parentNode;
parent.removeChild(foot);

var widget = document.getElementById('HTML1');
var parent = widget.parentNode;
parent.removeChild(widget);

var follow = document.getElementById('PlusFollowers1');
var parent = follow.parentNode;
parent.removeChild(follow);

var widget2 = document.getElementById('HTML2');
var parent = widget2.parentNode;
parent.removeChild(widget2);