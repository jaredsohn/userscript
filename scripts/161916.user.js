// ==UserScript==
// @name        Block Picsity Popup
// @namespace   https://userscripts.org/users/5705
// @description Picsity.com pops up a window that insists you login, with no way to get rid of it. Until now.
// @include     http://picsity.com/*
// @include     https://picsity.com/*
// @include     http://*.picsity.com/*
// @include     https://*.picsity.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @grant		none
// @run-at		document-end
// @version     1
// ==/UserScript==

$(document).ready(function(){
	$( '#welcomePopup,#popupBackground2' ).hide();
});