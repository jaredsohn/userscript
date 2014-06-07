// ==UserScript==
// @name          Yahoo News Ad. Blocker
// @namespace     mailto:novemliu@gmail.com
// @description   Hidden the trouble advertisements through out the Yahoo news
// @include       http://hk.news.yahoo.com/*
// ==/UserScript==

init();

//------------------------------------------------------
function init(){
	var head = document.getElementsByTagName('head');
	var cssNode = createStyleNode();
	cssNode.innerHTML = createStyleContent();
	head[0].appendChild(cssNode);
}
//
function createStyleNode(){
	var cssNode = document.createElement('style');
	cssNode.setAttribute('type', 'text/css');
	return cssNode;
}

function createStyleContent(){
	var cssContent = "#adbn_SKY, #adbn_N, #ov_btm_ctnr, #ynstory p table, .ba3{" + '\n' +
						'\t' + "display: none;" + '\n' +
					 "}" + '\n';
	return cssContent;
}