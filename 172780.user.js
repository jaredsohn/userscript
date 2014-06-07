// ==UserScript==
// @name        The Age Paywall Remover
// @namespace   supercalifragalisticexpialadocious
// @include     http://*.theage.com.au/*
// @include		http://*.smh.com.au/*
// @version     1
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeAds() {
	var paywall = document.getElementById('subscription-overlay');
	if(paywall) {
		paywall.parentNode.removeChild(paywall); 
	}
	addGlobalStyle('body { overflow: visible !important; }');
}
removeAds();
