// ==UserScript==
// @name           Perpetual Google Scholar Search Link
// @namespace      null
// @description    Add a perpetual link to Google Scholar for the current search just between the "Web" and "Images" google links
// @include        http://*.google.*/*
// ==/UserScript==


//try // Commented out since getElementById returns null, probably because of the page loading time
//{

	var request;
//	if (window.document.getElementsByName('q').length>0)
		request = window.document.getElementsByName('q')[0].value;

	var schlnk = document.createElement('a');
	schlnk.setAttribute('href','http://scholar.google.com/scholar?q='+request);
	schlnk.setAttribute('class','gb1');
	var text = document.createTextNode('Scholar');
	schlnk.appendChild(text);
	var gbar = document.getElementById('gbar').firstChild;
	gbar.insertBefore(schlnk,gbar.childNodes[1]);


//}
//catch(e)
//{
//	alert ('"Perpetual Google Scholar Search Link" error (greasemonkey), please report to the script author :\n' + e);
//}




