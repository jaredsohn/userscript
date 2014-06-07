// ==UserScript==
// @name LepraNoPost
// @namespace LepraNoPost
// @author DileSoft
// @include http://leprosorium.ru/*
// @include http://www.leprosorium.ru/*
// ==/UserScript==

if (document.getElementById('private').getElementsByTagName('p')[0]) {
	document.getElementById('private').removeChild(document.getElementById('private').getElementsByTagName('p')[0]);
}

var SiteRegEx = /leprosorium.ru\/asylum/g;
if (SiteRegEx.test(location.href)) {
	location.href = 'http://leprosorium.ru';
}