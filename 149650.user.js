// ==UserScript==
// @name           tieba autosign
// @description    贴吧自动签到
// @include        http://tieba.baidu.com/*
// @author         edc
// @grant          none
// ==/UserScript==

if(document.querySelector(".j_signbtn")){
	document.querySelector(".j_signbtn").onclick=undefined;
	document.querySelector(".j_signbtn").click();
}