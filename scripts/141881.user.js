// ==UserScript==
// @name           tieba autosign
// @description    贴吧自动签到
// @include        http://tieba.baidu.com/*
// @author         congxz6688
// @grant          none
// ==/UserScript==

if(document.querySelector(".j_cansign")){
	document.querySelector(".j_cansign").onclick=undefined;
	document.querySelector(".j_cansign").click();
}
