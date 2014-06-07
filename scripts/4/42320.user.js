// ==UserScript==
// @name           Search for TV episodes on TV Calendar at Binsearch / Mininova
// @namespace      http://world3.net
// @description    Adds 'search' links to every episode
// @include        http://www.pogdesign.co.uk/cat/index.php
// ==/UserScript==
/* */

var allSpans;
var lastName;

allSpans = document.getElementsByClassName('seasep');

function padZeros(theNumber, max) { var numStr = String(theNumber); while ( numStr.length < max) { numStr = '0' + numStr; } return numStr; }

for (var i = 0; i < allSpans.length; i++ )
{
	if(allSpans[i].innerHTML.indexOf("Ep:") != -1)
	{
		newline = document.createElement('br');
		gap = document.createElement('span');
		gap.setAttribute('class', 'seasep');
		gap.innerHTML = ' / ';
		
		var ep = allSpans[i].textContent.match(/S: ([0-9]+) - Ep: ([0-9]+)/);

		search = document.createElement('a');
		search.style.color = 'lightblue';
		search.style.textDecoration = 'underline';
		search.appendChild( document.createTextNode('(Binsearch)') );
		search.setAttribute('href', 'http://binsearch.net/index.php?q=' + lastName + ' S' + padZeros(ep[1],2) + 'E' + padZeros(ep[2],2) + ' 720p'+ '&max=100&adv_age=120');

		search2 = document.createElement('a');
		search2.style.color = 'lightblue';
		search2.style.textDecoration = 'underline';
		search2.appendChild( document.createTextNode('(Mininova)') );
		search2.setAttribute('href', 'http://www.mininova.org/search/?search=' + lastName + ' S' + padZeros(ep[1],2) + 'E' + padZeros(ep[2],2) + ' 720p');

		allSpans[i].parentNode.appendChild( newline );
		allSpans[i].parentNode.appendChild( search );
		allSpans[i].parentNode.appendChild( gap );
		allSpans[i].parentNode.appendChild( search2 );
	}
	else
	{
		// Get the program name from previous-previous element
		prev = allSpans[i].previousSibling;
		lastName = prev.previousSibling.innerHTML;
	}
}