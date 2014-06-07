// ==UserScript==
// @name           Google Filter
// @namespace      hirak99
// @description    Filters out search entries from specific sites from Google
// @include       http://www.google.com/search*
// @include       http://www.google.co.uk/search*
// @include       http://www.google.co.in/search*
// @version       2.0 - fixed for new google on 25 Oct, 2009
// ==/UserScript==

var sitesToRemove=[
'^http://www.experts-exchange.com/',
];

var resultsDiv=document.getElementById('res');
var results = resultsDiv.getElementsByClassName('g w0');

var removedSites=new Array();

for (var i=0; i<results.length; ++i) {
	var result = results[i];
	//var cite = result.getElementsByTagName('cite')[0];
	//var site = cite.innerHTML.replace(/<.*?>/g,'');
	//print(site);
	var href=result.getElementsByTagName('a')[0].href;
	//print(href);
	var removeThis = false;
	for (j=0; !removeThis && j<sitesToRemove.length; ++j)
		//if (href.substring(0,sitesToRemove[j].length)==sitesToRemove[j]) removeThis=true;	
		if (href.match(sitesToRemove[j])!=null) removeThis=true;
	if (removeThis) {
		removedSites[removedSites.length]=result;
		//result.style.display='none';
		result.style.setProperty('background-color','#E0E0E0','');
	}
}

if (removedSites.length>0) {
	window.removedSites=removedSites;
	var newElement=document.createElement('div');
	newElement.style.setProperty('color','#7070FF','');
	resultsDiv.insertBefore(newElement,resultsDiv.firstChild)
	var toggleDisplay=function() {
		removedSites=window.removedSites;
		display=removedSites[0].style.display;
		if (display=='') display='none'; else display='';
		for (i=0; i<removedSites.length; ++i)
			removedSites[i].style.display=display;
		newElement.innerHTML='<div style="font-size: x-small">('+
			removedSites.length+' item'+
			(removedSites.length>1?'s':'')+
			' filtered out by GreaseMonkey script - Click to '+(display==''?'hide':'show')+')</div>';
	}
	newElement.addEventListener('click',toggleDisplay,true);
	toggleDisplay();
}