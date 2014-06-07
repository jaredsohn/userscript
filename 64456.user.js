// ==UserScript==
// @name           HMVPure Spend
// @namespace      freakz
// @include        http://pure.hmv.com/*
// ==/UserScript==

if (document.getElementsByClassName("price_val").length == 1){
	b = document.getElementsByClassName("price_val")[0];
	a = "<br /><span class=\"price_val\">Spend:</span><span class=\"price_cur\">£" + b.innerHTML.split('.')[0]/100 + "</span>";
	document.getElementsByClassName("price")[0].innerHTML = document.getElementsByClassName("price")[0].innerHTML + a;
}