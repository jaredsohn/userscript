// ==UserScript==
// @name           Washington Post Paywall Remover
// @description    Disables WaPo paywall
// @include        http://washingtonpost.com/*
// @include        http://*.washingtonpost.com/*
// ==/UserScript==

function disable(){
	document.body.style.overflowY = "auto";
	document.getElementById("wp_Signin").style.display="none";
	document.getElementById("exposeMask").style.display="none";
}

window.addEventListener("load",disable,true);
