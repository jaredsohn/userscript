// ==UserScript==
// @name        4Shared Direct
// @description Skip the 20 seconds timer when downloading a file from 4Shared
// @include     *4shared.com/get/*
// @grant       none
// @version     1.01
// @homepageURL    http://userscripts.org/scripts/show/165725
// @updateURL      https://userscripts.org/scripts/source/165725.meta.js
// @icon           
// ==/UserScript==

// Retrieve the hidden input
URLInput = document.getElementById("baseDownloadLink");

// If found, redirect to it
if (URLInput)  {
	document.location.href = URLInput.value;
}