// dpaste.com Next and Previous
// version 0.1 BETA!
// 20061229
// Creative Commons Attribution 2.5 License
// Author: Dave Hull, dphull@gmail.com
// ==UserScript==
// @name           dpaste.com Next and Previous
// @namespace      http://insipid.com/code/greasemonkey
// @description    Add Next and Previous buttons to dpaste.com
// @include        http://www.dpaste.com/*
// @include        http://dpaste.com/*
// @exclude        http://dpaste.com/about/
// ==/UserScript==

var links, firstLink, nextLink, prevLink, currentPage;

links = document.getElementsByTagName('a');
firstLink = links[0];

if (currentPage = document.baseURI.match(/\d+/)) {

	nextLink = document.createElement('a');
	prevLink = document.createElement('a');

	nextLink.href = 'http://dpaste.com/'.concat(parseInt(currentPage) + 1);
	prevLink.href = 'http://dpaste.com/'.concat(currentPage - 1);

	nextLink.innerHTML = '&#8227; Next &nbsp;';
	prevLink.innerHTML = '&#8227; Previous &nbsp;';

	firstLink.parentNode.insertBefore(prevLink, firstLink);
	firstLink.parentNode.insertBefore(nextLink, firstLink);
}
