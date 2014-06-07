// ==UserScript==
// @name          Illinois CS News Forum Prettifier
// @author        xiaoyao
// @namespace     http://xiaoyao.im
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @description   Prettify the format of Illinois CS News Forum
// @include       https://news.cs.illinois.edu/*
// @match         https://news.cs.illinois.edu/*
// @version       1.0
// ==/UserScript==

function main() {
	console.log("Im running");
    var t = document.getElementsByClassName('fixed')[0];
	t.style.wordBreak = 'break-all';
    t.style.wordWrap = 'break-all';
}
main()
