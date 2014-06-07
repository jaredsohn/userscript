// ==UserScript==
// @name           Google Bookmarks Total Count
// @namespace      Umakanthan Chandran(cumakt@gmail.com);
// @description    Shows the Total count of bookmarks for Google Bookmarks
// @include        http*://*.google.*/bookmarks/*
// ==/UserScript==

var totalCount = 0;
setTimeout(callme,5000);

function callme()
{
	elements = document.getElementsByClassName("label-count");
	for(var i=0;i<elements.length;i++)
	{
		totalCount = totalCount + parseInt(elements[i].innerHTML,10);
	}
	elem = document.getElementsByClassName("all-labels")[0].getElementsByClassName("label pointer")[0];
	elem.innerHTML = elem.innerHTML + "(" + totalCount + ")";
}