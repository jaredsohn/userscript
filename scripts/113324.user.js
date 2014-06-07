// ==UserScript==
// @name           Google Docs to LaTeX-Lab
// @namespace      http://docs.latexlab.org/
// @include        https://docs.google.com/*
// ==/UserScript==

if (window.document.title.search(".tex") != -1) {
	var curlocation = window.location.href;
	curlocation = curlocation.slice(0, curlocation.lastIndexOf("/"));
	window.location = curlocation.replace("https://docs.google.com/document/d/", "http://docs.latexlab.org/docs?docid=");
}