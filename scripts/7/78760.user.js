// ==UserScript==
// @name           Google Homepage Wallpaper Remover
// @namespace      com.tim-jarrett.google-homepage-wallpaper-remover
// @include        http://www.google.com/*
// @match          http://www.google.com/*
// @run-at         document-start
// ==/UserScript==
window.addEventListener('load', function() {
	fixGooglesMess();


}, true);

fixGooglesMess();

function fixGooglesMess()
{
	var header = window.document.body;
	var style = window.document.createElement('style');

	header.appendChild(style);

	style.type = "text/css";
	style.innerHTML = "#fpdi { display: none; }";
	style.innerHTML += "#fctr, #fctr a, .sblc a, #cpFooter a, #cpf a, #prm a, #addlang, #addlang a { color: #1111CC; text-decoration: none; text-shadow: none;}";
	style.innerHTML += "#fctr p {color:#767676 !important;text-shadow:none;}";
	style.innerHTML += "#logo {background-image:url('/intl/en_ALL/images/srpr/logo1w.png') !important;}";
	style.innerHTML += '#cpNavTextWrapper { display: none; }';

}