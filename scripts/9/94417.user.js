// ==UserScript==
// @name           Avoid wahoha.com
// @description    Forwards you from wahoha.com page to the one you actually wanted.
// @include        http://wahoha.com/*
// @include        https://wahoha.com/*
// @include        http://www.wahoha.com/*
// @include        https://www.wahoha.com/*
// ==/UserScript==

if(document.location.href.search(/out\//) == -1) {
	document.location.href = document.location.href.replace(/\.com\/(\d+)/, ".com/out/$1/$1").replace('/11', '');
}