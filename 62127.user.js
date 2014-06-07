// ==UserScript==
// @name hamigaki2onani
// @namespace http://twitter.com/ichiyonnana
// @description 歯磨きをオナニーに置換
// @include *
// @exclude 
// ==/UserScript==
(function()
{
	document.body.innerHTML = document.body.innerHTML.replace(/歯磨き|はみがき|ハミガキ/g, 'オナニー');
	document.body.innerHTML = document.body.innerHTML.replace(/歯を?磨か/g, 'オナニーし');
	document.body.innerHTML = document.body.innerHTML.replace(/歯を磨き/g, 'オナニーし');
	document.body.innerHTML = document.body.innerHTML.replace(/歯を?磨く/g, 'オナニーする');
	document.body.innerHTML = document.body.innerHTML.replace(/歯を?磨けば/g, 'オナニーすれば');
	document.body.innerHTML = document.body.innerHTML.replace(/歯を?磨け/g, 'オナニーしろ');
	document.body.innerHTML = document.body.innerHTML.replace(/歯を?磨こ/g, 'オナニーしよ');
	document.body.innerHTML = document.body.innerHTML.replace(/歯を?磨い/g, 'オナニーし');
})()