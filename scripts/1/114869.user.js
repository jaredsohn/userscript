// ==UserScript==
// @name        				Helvetireader 2 - Mescoda ver
// @description 				Helvetireader style for New Google Reader that removes a lot of features you probably won't like
// @author      				Mescoda on http://mescoda.com/
// @version                     2.3
// @include     				https://*.google.com/reader/view/*
// @include     				http://*.google.com/reader/view/*
// @include     				htt*://*.google.*/reader/view*
// @reason						Update for Greasemonkey 1.0 grant
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @grant        				GM_xmlhttpRequest
// ==/UserScript==

$(document).ready(function() {
	$('#top-bar').insertBefore('#lhn-add-subscription-section');
	$('#logo-section').hide();
	$('#gbqf').insertBefore('#lhn-add-subscription-section');
	$('#gbqfbw').hide();
	$('#gbqfqw').css({
		"margin-left":"15px","height":"25px","margin-top":"5px",
	})
})

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://mescoda.com/helvetigr/helvetigr_new.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
