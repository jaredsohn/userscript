// ==UserScript==
// @name          extremecircuits.net_AllowAdblock
// @description   Enables extremecircuits.net even if Adblock was Enabled
// @include       http://extremecircuits.net/*
// @include       http://*.extremecircuits.net/*
// @include       https://extremecircuits.net/*
// @include       https://*.extremecircuits.net/*
// @grant       none
// ==/UserScript==


window.setTimeout(function() { 
    
	document.getElementById("confirmOverlay").style.display = 'none';

}, 1000);


