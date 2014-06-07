// ==UserScript==
// @name           MetaFilter Recent Activity Summary
// @namespace      FishBike
// @description    Inserts list of threads and date/time of most recent comment at top of the MetaFilter recent activity page
// @include        http://www.metafilter.com/contribute/activity/*
// ==/UserScript==

var switchElement;

switchElement = document.getElementById('switch');

var summaryElement;

summaryElement = document.createElement('div');
summaryElement.id = 'rasummary';
summaryElement.className = 'copy';
summaryElement.style.clear = 'both'
summaryElement.style.paddingTop = '10px';

var headingElement;

headingElement=document.createElement('div');
headingElement.innerHTML='<h3>Summary of Recent Activity</h3>';

summaryElement.appendChild(headingElement);

switchElement.parentNode.insertBefore(summaryElement,switchElement.nextSibling);

var acaElement;

acaElement = summaryElement.parentNode;

var x,threadElement;

for (x in acaElement.childNodes)
{
	threadElement = acaElement.childNodes[x];
	if (threadElement.tagName == 'DIV' && threadElement.id.charAt(0)=='a')
	{
		var summaryEntry;

		summaryEntry = document.createElement('div');
		summaryEntry.style.margin='10px 20px';
		summaryEntry.innerHTML=
			threadElement.firstElementChild.firstElementChild.innerHTML
			+'<br><span class="smallcopy">latest comment '
			+threadElement.firstElementChild.nextElementSibling.lastElementChild.lastElementChild.innerHTML
			+'</span>';

		summaryElement.appendChild(summaryEntry);
	}
}
