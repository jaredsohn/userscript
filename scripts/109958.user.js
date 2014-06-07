// ==UserScript==
// @name          BeastBoxy
// @description	  Auto click button
// @auther        http://toolboxy.blogspot.com/
// @include       http://sns.atgames.jp/*
// @version       0.1
// ==/UserScript==
var evt=document.createEvent("MouseEvents");
evt.initEvent("click",true,true);

/*きたよー*/
if(document.getElementById('greetingNegative').style.display=='none'){
	document.getElementById('greetingAct2').dispatchEvent(evt);
}