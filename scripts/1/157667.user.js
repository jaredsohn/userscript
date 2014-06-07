// ==UserScript==
// @name          Gooder Ad Remover
// @namespace     http://userstyles.org
// @description	  Remove Advertisment from gooder.us
// @author        MohammadR
// @include       http://gooder.us/*
// @include       https://gooder.us/*
// @include       https://*.gooder.us/*
// @include       http://*.gooder.us/*
// ==/UserScript==
(function() {
	a=document.getElementById("adboard");
	a.parentNode.removeChild(a);
})();
