// ==UserScript==
// @name           UserScripts: Title for Install Chart
// @namespace      http://userscripts.org/users/62850
// @description    Adds title attribute with install count to the install count graph.
// @include        http://userscripts.org/scripts/*
// ==/UserScript==
var x=document.evaluate("//img[contains(@src,'http://chart.apis.google.com/chart?chs=')]", document, null, 9, null).singleNodeValue;
if(x){
	x.title=x.alt
}