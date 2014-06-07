// ==UserScript==
// @name        				Helvetireader 2 Large - Mescoda ver
// @description 				Fork from http://userscripts.org/scripts/show/114869 for large screen
// @author      				Mescoda on http://mescoda.com/
// @version                     1.1
// @reason						Update for Greasemonkey 1.0 grant
// @include     				https://*.google.com/reader/view/*
// @include     				http://*.google.com/reader/view/*
// @include     				htt*://*.google.*/reader/view*
// @require                     http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @grant        				GM_xmlhttpRequest
// ==/UserScript==

$(document).ready(function() {
	$('#logo-section').hide();
	$('#gbqf').insertBefore('#lhn-add-subscription-section');
	$('#gbqfbw').hide();
	$('#gbqfqw').css({
		"margin-left":"43px","height":"25px","margin-top":"10px",'width':'230px',
	})
})

var cssNode = document.createElement('link');
cssNode.type = 'text/css';
cssNode.rel = 'stylesheet';
cssNode.href = 'http://mescoda.com/helvetigr/helvetigr_new_large.css';
cssNode.media = 'screen';
cssNode.title = 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(cssNode);
